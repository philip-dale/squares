import { defineStore } from 'pinia'
import { settingsStore } from './settings'

export const gameStateStore = defineStore('gameState', {
    state: () => ({ 
        samplesCompleted: {},
        samplesCompletedAtLevel: {},
        spawnTimer: null
    }),
    getters: {
        getSamplesCompleted: (state) => {
            return state.samplesCompleted
        },
        getTotalCompleted: (state) => {
            const settings = settingsStore()
            let total = 0
            for(let i=0; i<settings.getmaxContibuters; i++) {
                if(i.toString() in state.samplesCompleted ) {
                    total += state.samplesCompleted[i.toString()]
                }
            }
            return total
        },
        getLevelSamplesCompleted: (state) => {
            return state.samplesCompletedAtLevel
        },
        getLevelTotalCompleted: (state) => {
            const settings = settingsStore()
            let total = 0
            for(let i=0; i<settings.getmaxContibuters; i++) {
                if(i.toString() in state.samplesCompletedAtLevel ) {
                    total += state.samplesCompletedAtLevel[i.toString()]
                }
            }
            return total
        }
    },
    actions: {
        init() {

            let gameState = JSON.parse(localStorage.getItem("game_state"))

            if(gameState != null){
                const settings = settingsStore()
                for(let i=0; i<settings.getmaxContibuters; i++) {
                    let key = i.toString()
                    if(Object.keys(gameState.samplesCompleted).includes(key)) {
                        this.samplesCompleted[key] = gameState.samplesCompleted[key]
                    } else {
                        this.samplesCompleted[key] = 0
                    }

                    if(Object.keys(gameState.samplesCompletedAtLevel).includes(key)) {
                        this.samplesCompletedAtLevel[key] = gameState.samplesCompletedAtLevel[key]
                    } else {
                        this.samplesCompletedAtLevel[key] = 0
                    }
                }
                
            } else {
                this.reset()
            }
        },
        reset() {
            const settings = settingsStore()
            for(let i=0; i<settings.getmaxContibuters; i++) {
                this.samplesCompleted[i.toString()] = 0
                this.samplesCompletedAtLevel[i.toString()] = 0
            }
            this.setLocalStorage()
        },
        setLocalStorage() {
            localStorage.setItem("game_state", JSON.stringify(this))
        },
        clearLocalStorage() {
            localStorage.clear("game_state")
        },
        addCompletedSample(sampleNumber) {
            const settings = settingsStore()

            if(sampleNumber.toString() in this.samplesCompleted) {
                this.samplesCompleted[sampleNumber.toString()]++;
                this.samplesCompletedAtLevel[sampleNumber.toString()]++;
            } else {
                this.samplesCompleted[sampleNumber.toString()] = 1
                this.samplesCompletedAtLevel[sampleNumber.toString()] = 1
            }
            
            if(settings.autoIncreaseLevel && (this.getLevelTotalCompleted >= settings.getGameLevelDetails.targetScoreIncrease)) {
                settings.nextLevel()
                this.clearCompletedAtLevel()
            }

            this.setLocalStorage()
        },
        clearCompletedAtLevel() {
            const settings = settingsStore()
            for(let i=0; i<settings.getmaxContibuters; i++) {
                this.samplesCompletedAtLevel[i.toString()] = 0
            }
            this.setLocalStorage()
        },
        setSpawnTimer(func, timeout) {
            clearTimeout(this.spawnTimer)
            this.spawnTimer = setTimeout(func, timeout)
        }
    },
})