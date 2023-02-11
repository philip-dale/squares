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
        getTotalCompleted: (state) => {
            const settings = settingsStore()
            let total = 0
            for(let i=0; i<settings.getMaxParts; i++) {
                total += state.samplesCompleted[i.toString()]
            }
            return total
        }
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