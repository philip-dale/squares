import { defineStore } from 'pinia'
import { settingsStore } from './settings'
import { useCookies } from "vue3-cookies";

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
            const {cookies} = useCookies();
            if(cookies.isKey("game_state") ){
                const settings = settingsStore()
                for(let i=0; i<settings.getmaxContibuters; i++) {
                    let key = i.toString()
                    if(Object.keys(cookies.get("game_state").samplesCompleted).includes(key)) {
                        this.samplesCompleted[key] = cookies.get("game_state").samplesCompleted[key]
                    } else {
                        this.samplesCompleted[key] = 0
                    }

                    if(Object.keys(cookies.get("game_state").samplesCompletedAtLevel).includes(key)) {
                        this.samplesCompletedAtLevel[key] = cookies.get("game_state").samplesCompletedAtLevel[key]
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
            this.setCookie()
        },
        setCookie() {
            const {cookies} = useCookies();
            cookies.set("game_state", this, Infinity, null, null, true, 'Strict')
        },
        clearCookie() {
            const {cookies} = useCookies();
            cookies.remove("game_state")
        },
        addCompletedSample(sampleNumber) {
            const settings = settingsStore()

            this.samplesCompleted[sampleNumber.toString()]++;
            this.samplesCompletedAtLevel[sampleNumber.toString()]++;

            if(settings.autoIncreaseLevel && (this.getLevelTotalCompleted >= settings.getGameLevelDetails.targetScoreIncrease)) {
                settings.nextLevel()
                this.clearCompletedAtLevel()
            }

            this.setCookie()
        },
        clearCompletedAtLevel() {
            const settings = settingsStore()
            for(let i=0; i<settings.getmaxContibuters; i++) {
                this.samplesCompletedAtLevel[i.toString()] = 0
            }
            this.setCookie()
        },
        setSpawnTimer(func, timeout) {
            clearTimeout(this.spawnTimer)
            this.spawnTimer = setTimeout(func, timeout)
        }
    },
})