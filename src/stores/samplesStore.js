import { defineStore } from 'pinia'
import { settingsStore } from './settings'
import { gameStateStore } from './gameState'

function createPart(parts, parentId, uid, containerIndex) {
    return { "parts": parts, "parentId": parentId, "uid": uid, "lives": settingsStore().getMaxLives, "selected": false, containerIndex: containerIndex }
}

function generatePart(parts) {
    let maxCount = 0
    let gameState = gameStateStore()

    for (let i = 0; i < gameState.getinputColours; i++) {
        let len = parts.filter(x => x === i).length
        if (len > maxCount) {
            maxCount = len
        }
    }

    let contributingParts = []
    for (let i = 0; i < gameState.getinputColours; i++) {
        if (parts.filter(x => x === i).length === maxCount) {
            contributingParts[contributingParts.length] = i
        }
    }
    let output = contributingParts[Math.floor(Math.random() * contributingParts.length)]
    return output

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
            for (let s = 0; s < sampleCount; s++) {
                partsInput[s] = samples[s][x][y]
            }
            newSampleparts[x][y] = generatePart(partsInput)
        }
    }
    return newSampleparts
}

export const samplesStore = defineStore('samples', {
    state: () => ({ 
        allSamples: {}, 
        count: 0, // keeps track of how may items have been creted since start/reset
        storeCapacity: {}, 
        selected: { 'parentId': -1, "uid": -1 } 
    }),
    getters: {
        getTotalCreated: (state) => {
            return state.count
        },
        containerSamples: (state) => {
            return (containerId) => state.allSamples[containerId]
        },
        sample: (state) => {
            return (containerId, uid) => state.allSamples[containerId][uid]
        },
        isSelected: (state) => {
            return (containerId, uid) => {
                if (containerId in state.allSamples && uid in state.allSamples[containerId]) {
                    return state.allSamples[containerId][uid].selected
                }
                return false
            }
        },
        hasSpace: (state) => {
            return (containerId) => {
                if (state.storeCapacity[containerId] === -1) {
                    return true
                }
                return Object.keys(state.allSamples[containerId]).length < state.storeCapacity[containerId]
            }
        },
        getSelected: (state) => {
            return state.selected
        },
        pureVal: (state) => {
            return (containerId, uid) => isPureSample(state.allSamples[containerId][uid].parts)
        },
        selectedPureVal: (state) => {
            return () => {
                if (state.selected.parentId != -1) {
                    return isPureSample(state.allSamples[state.selected.parentId][state.selected.uid].parts)
                }
                return -1
            }
        },
        canSpawn: () => {
            return (containerType) => {
                switch (containerType) {
                    case "spawn":
                        return true
                }
                return false
            }
        },
        canMoveTo: () => {
            return (containerType) => {
                switch (containerType) {
                    case "spawn":
                    case "merge-in":
                    case "sink":
                        return true
                }
                return false
            }
        },
        canDestroy: () => {
            return (containerType) => {
                switch (containerType) {
                    case "sink":
                        return true
                }
                return false
            }
        },
    },
    actions: {
        init() {
            let storeState = JSON.parse(localStorage.getItem("store_state"))

            if (storeState != null && "count" in storeState) {
                this.count = storeState.count
            }
        },
        subscribe(containerId, capacity) {
            let storeState = JSON.parse(localStorage.getItem("store_state"))
            if (!(containerId in this.allSamples)) {
                if (storeState != null && "allSamples" in storeState && Object.keys(storeState.allSamples).includes(containerId)) {
                    this.allSamples[containerId] = storeState.allSamples[containerId]
                } else {
                    this.allSamples[containerId] = {}
                }
                this.storeCapacity[containerId] = capacity
            }
        },
        reset() {
            for (const key of Object.keys(this.allSamples)) {
                this.allSamples[key] = {}
            }
            this.count = 0,
                this.selected = { 'parentId': -1, "uid": -1 }
            this.setLocalStorage()
        },
        setLocalStorage() {
            var obj = new Object();
            obj.allSamples = this.allSamples
            obj.count = this.count
            obj.storeCapacity = this.storeCapacity
            obj.selected = this.selected
            obj.playTime = this.playTime

            localStorage.setItem("store_state", JSON.stringify(obj))
        },
        clearLocalStorage() {
            localStorage.clear("store_state")
        },
        spawn(containerId) {
            const settings = settingsStore()
            let gameState = gameStateStore()

            let size = settings.getSize
            const levelDetails = gameState.getGameLevelDetails

            const baseSample = Math.floor(Math.random() * levelDetails.inputColours)

            var parts = new Array(size.x);
            for (let x = 0; x < size.x; x++) {
                parts[x] = new Array(size.y).fill(baseSample);
            }

            // Get parts to change
            var locations = []
            let locationsCount = 0
            for (let x = 0; x < size.x; x++) {
                for (let y = 0; y < size.y; y++) {
                    locations[locationsCount] = { "x": x, "y": y }
                    locationsCount++
                }
            }

            let differences = Math.floor(Math.random() * ((levelDetails.maxDifferences + 1) - levelDetails.minDifferences) + levelDetails.minDifferences)

            // Get list of colours we can use for the different cells
            let availableColours = new Array(levelDetails.inputColours - 1);
            let colourStep = 0;
            for (let c = 0; c < levelDetails.inputColours - 1; c++) {
                if (c == baseSample) {
                    colourStep += 1;
                }
                availableColours[c] = colourStep;
                colourStep += 1;
            }

            let ColoursToUse = new Array(levelDetails.difftotalColours)
            for (let c = 0; c < levelDetails.difftotalColours; c++) {
                ColoursToUse[c] = availableColours[Math.floor(Math.random() * availableColours.length)]
            }

            // need to determin new colours before loop using new metric
            for (let p = 0; p < differences; p++) {
                let cPart = ColoursToUse[Math.floor(Math.random() * ColoursToUse.length)]
                let locationIndex = Math.floor(Math.random() * locations.length)
                parts[locations[locationIndex].x][locations[locationIndex].y] = cPart
                locations.splice(locationIndex, 1)
            }
            this.allSamples[containerId][this.count.toString()] = createPart(parts, containerId, this.count.toString(), this.allSamples[containerId].length)
            this.count++
            this.setLocalStorage()
        },
        move(containerId, uid, newContainerId) {
            if (containerId != newContainerId) {
                // const newId = this.count.toString()
                this.count++

                this.allSamples[newContainerId][uid] = this.allSamples[containerId][uid]
                this.allSamples[newContainerId][uid]["parentId"] = newContainerId
                this.allSamples[newContainerId][uid]["uid"] = uid
                this.allSamples[newContainerId][uid]["selected"] = false
                this.allSamples[newContainerId][uid]["containerIndex"] = 0
                delete this.allSamples[containerId][uid]
                this.setLocalStorage()
            }
        },
        moveSelected(newContainerId) {
            if (this.selected.parentId != -1 && this.selected.parentId != newContainerId) {
                this.move(this.selected.parentId, this.selected.uid, newContainerId)
            }
            this.selected.parentId = -1
            this.selected.uid = -1
            this.setLocalStorage()
        },
        moveSelectedToContainer(newContainerType, newContainerId) {
            let gameState = gameStateStore()
            const pureVal = this.selectedPureVal()
            if (this.canDestroy(newContainerType)) {
                if (pureVal != -1) {
                    gameState.addCompletedSample(pureVal)
                    this.removeSelected();
                } else {
                    this.selected.parentId = -1
                    this.selected.uid = -1
                    return "Not Single Colour"
                }
            } else if (this.hasSpace(newContainerId)) {
                this.moveSelected(newContainerId)
            } else {
                this.selected.parentId = -1
                this.selected.uid = -1
                return "No Space"
            }
            this.setLocalStorage()
        },
        remove(containerId, uid) {
            delete this.allSamples[containerId][uid]
            this.setLocalStorage()
        },
        removeSelected() {
            if (this.selected.parentId != -1) {
                delete this.allSamples[this.selected.parentId][this.selected.uid]
                this.selected.parentId = -1
                this.selected.uid = -1
                this.setLocalStorage()
            }
        },
        merge(containerId, destId) {
            const settings = settingsStore()
            if (Object.keys(this.allSamples[destId]).length < this.storeCapacity[destId]) {
                if (Object.keys(this.allSamples[containerId]).length >= settings.getMergeInMin) {

                    let samplesParts = new Array(Object.keys(this.allSamples[containerId]).length);

                    let i = 0
                    for (const [key, value] of Object.entries(this.allSamples[containerId])) {
                        samplesParts[i] = value.parts
                        this.allSamples[containerId][key].lives--
                        if (this.allSamples[containerId][key].lives < 1) {
                            delete this.allSamples[containerId][key]
                        }

                        i++
                    }
                    let newSample = mergeSample(samplesParts)
                    this.allSamples[destId][this.count.toString()] = createPart(newSample, destId, this.count.toString(), this.allSamples[destId].length)
                    this.count++
                    this.setLocalStorage()
                } else {
                    return "Not Enough Inputs"
                }
            } else {
                return "Output Full"
            }
        },
        toggleSelect(containerId, uid) {
            if (this.selected.parentId != -1) {
                this.allSamples[this.selected.parentId][this.selected.uid].selected = false
            }
            if (this.selected.parentId === containerId && this.selected.uid == uid) {
                this.selected.parentId = -1
                this.selected.uid = -1
            } else {
                this.selected.parentId = containerId
                this.selected.uid = uid
                this.allSamples[containerId][uid].selected = true
            }
            this.setLocalStorage()
        },
        organiseContainer(containerId, itemsArray) {
            for (let i = 0; i < itemsArray.length; i++) {
                // TODO There is a bug here when organising!!!!
                // to generate bug add multiple samples into a container, 
                // drag left most to right most, 
                // drag right most to another container

                if (itemsArray[i].uid in this.allSamples[containerId]) {
                    this.allSamples[containerId][itemsArray[i].uid]["containerIndex"] = i;
                }
            }
        }
    },
})