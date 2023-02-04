import { defineStore } from 'pinia'

export const settingsStore = defineStore('settings', {
    state: () => ({ 
        size: { x: 2, y: 3 }, 
        maxParts: 2, 
        colourList: ['#ff0000', '#40ff00', '#0040ff', '#ff00ff', '#ffbf00', '#449c90', '#8000ff', '#00ff80', '#4420db', '#bb639c'],
        maxLives: 3,
        spawnMax: 49,
        mergeInMax: 5,
        mergeInMin: 3,
        mergeOutMax: 1,
        sinkMax: -1,
    }),
    getters: {
        getSize: (state) => {
            return state.size
        },
        getMaxParts: (state) => {
            return state.maxParts
        },
        getColour: (state) => {
            return (partId) => state.colourList[partId]
        },
        getMaxLives: (state) => {
            return state.maxLives
        },
        getContainerMax: (state) => {
            return (containerType) => {
                switch(containerType) {
                    case "spawn":
                        return state.spawnMax
                    case "merge-in":
                        return state.mergeInMax
                    case "merge-out":
                        return state.mergeOutMax
                    case "sink":
                        return state.sinkMax
                }
            }
        },
        getMergeInMin: (state) => {
            return state.mergeInMin
        },
    },
})