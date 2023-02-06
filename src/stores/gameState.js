import { defineStore } from 'pinia'
import { settingsStore } from './settings'

export const gameStateStore = defineStore('gameState', {
    state: () => ({ 
        samplesCompleted: {},
    }),
    getters: {
        getSamplesCompleted: (state) => {
            return state.samplesCompleted
        },
    },
    actions: {
        reset() {
            const settings = settingsStore()
            for(let i=0; i<settings.getMaxParts; i++) {
                this.samplesCompleted[i.toString()] = 0
            }
        },
        addCompletedSample(sampleNumber) {
            this.samplesCompleted[sampleNumber.toString()]++;
        }
    },
})