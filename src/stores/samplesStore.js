import { defineStore } from 'pinia'

import { settingsStore } from './settings'

function createPart(parts, parentId, uid) {
    return {"parts": parts, "parentId": parentId, "uid": uid, "lives": settingsStore().getMaxLives}
}

function generatePart(parts) {
    let maxCount = 0
    const settings = settingsStore()

    for(let i=0; i < settings.getMaxParts; i++){
        let len = parts.filter(x => x === i).length
        if (len > maxCount) {
            maxCount = len
        }
    }

    let contributingParts = []
    for(let i=0; i < settings.getMaxParts; i++){
        if(parts.filter(x => x === i).length === maxCount) {
            contributingParts[contributingParts.length] = i
        }
    }

    return contributingParts[Math.floor(Math.random() * contributingParts.length)]

}

function mergeSample(samples) {
    const sampleCount = samples.length
    const settings = settingsStore()
    const size = settings.getSize

    var newSampleparts = new Array(size.x);
    for (let x = 0; x < size.x; x++) {
        newSampleparts[x] = new Array(size.y);
        for (let y = 0; y < size.y; y++) {

            var partsInput = new Array(sampleCount);
            for(let s = 0; s < sampleCount; s++) {
                partsInput[s] = samples[s][x][y]
            }
            newSampleparts[x][y] = generatePart(partsInput)
        }
    }
    return newSampleparts
}

export const samplesStore = defineStore('samples', {
    state: () => ({allSamples:{}, count:0, storeCapacity:{}}),
    getters: {
        containerSamples: (state) => {
            return (containerId) => state.allSamples[containerId]
        },
        sample: (state) => {
            return (containerId, uid) => state.allSamples[containerId][uid]
        },
        hasSpace: (state) => {
            return (containerId) => {
                if(state.storeCapacity[containerId] === -1) {
                    return true
                }
                return Object.keys(state.allSamples[containerId]).length < state.storeCapacity[containerId]
            }
        }
    },
    actions: {
        init(containerId, capacity) {
            if(!(containerId in this.allSamples )) {
                this.allSamples[containerId] = {}
                this.storeCapacity[containerId] = capacity
            }
        },
        spawn(containerId) {
            const settings = settingsStore()
            let size = settings.getSize
            var parts = new Array(size.x);
            for (let x = 0; x < size.x; x++) {
                parts[x] = new Array(size.y);
                for (let y = 0; y < size.y; y++) {
                    parts[x][y] = Math.floor(Math.random() * settings.getMaxParts);
                }
            }

            this.allSamples[containerId][this.count.toString()] = createPart(parts, containerId, this.count.toString())
            this.count++
        },
        move(containerId, uid, newContainerId) {
            if(containerId != newContainerId) {
                const newId = this.count.toString()
                this.count++

                this.allSamples[newContainerId][newId] = this.allSamples[containerId][uid]
                this.allSamples[newContainerId][newId]["parentId"] = newContainerId
                this.allSamples[newContainerId][newId]["uid"] = newId
                delete this.allSamples[containerId][uid]
                
            }
        },
        remove(containerId, uid) {
            delete this.allSamples[containerId][uid]
        },
        merge(containerId, destId) {
            if (Object.keys(this.allSamples[destId]).length < this.storeCapacity[destId] && Object.keys(this.allSamples[containerId]).length > 0) {
                
                let samplesParts = new Array(Object.keys(this.allSamples[containerId]).length);

                let i = 0
                for (const [key, value] of Object.entries(this.allSamples[containerId])) {
                    samplesParts[i] = value.parts
                    this.allSamples[containerId][key].lives--
                    if(this.allSamples[containerId][key].lives < 1) {
                        delete this.allSamples[containerId][key]
                    }

                    i++
                }
                let newSample = mergeSample(samplesParts)
                this.allSamples[destId][this.count.toString()] = createPart(newSample, destId, this.count.toString())
                this.count++
            }
        }
    },
})