import { defineStore } from 'pinia'

import { settingsStore } from './settings'

function createPart(parts, parentId, uid) {
    return {"parts": parts, "parentId": parentId, "uid": uid, "lives": settingsStore().getMaxLives, "selected": false}
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

function isPureSample(parts) {
    const settings = settingsStore()
    const size = settings.getSize
    const compare = parts[0][0]
    for (let x = 0; x < size.x; x++) {
        for (let y = 0; y < size.y; y++) {
            if (compare != parts[x][y]) {
                return -1
            }
        }
    }
    return compare
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
    state: () => ({allSamples:{}, count:0, storeCapacity:{}, selected:{'parentId':-1, "uid":-1} }),
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
        },
        pureVal: (state) => {
            return (containerId, uid) => isPureSample(state.allSamples[containerId][uid].parts)
        },
        selectedPureVal: (state) => {
            return () => {
                if(state.selected.parentId != -1) {
                    return isPureSample(state.allSamples[state.selected.parentId][state.selected.uid].parts)
                }
                return -1
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
                this.allSamples[newContainerId][newId]["selected"] = false
                delete this.allSamples[containerId][uid]
                
            }
        },
        moveSelected(newContainerId) {
            if(this.selected.parentId != -1 && this.selected.parentId != newContainerId) {
                this.move(this.selected.parentId, this.selected.uid, newContainerId)
                this.selected.parentId = -1
                this.selected.uid = -1
            }
        },
        remove(containerId, uid) {
            delete this.allSamples[containerId][uid]
        },
        removeSelected() {
            if(this.selected.parentId != -1){
                delete this.allSamples[this.selected.parentId][this.selected.uid]
                this.selected.parentId = -1
                this.selected.uid = -1
            }
        },
        merge(containerId, destId) {
            const settings = settingsStore()
            if (Object.keys(this.allSamples[destId]).length < this.storeCapacity[destId] && Object.keys(this.allSamples[containerId]).length >= settings.getMergeInMin) {
                
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
        },
        toggleSelect(containerId, uid) {
            if(this.selected.parentId != -1) {
                this.allSamples[this.selected.parentId][this.selected.uid].selected = false
            }
            if(this.selected.parentId === containerId && this.selected.uid == uid) {
                this.selected.parentId = -1
                this.selected.uid = -1
            } else {
                this.selected.parentId = containerId
                this.selected.uid = uid
                this.allSamples[containerId][uid].selected = true
            }
        }
    },
})