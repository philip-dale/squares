import { defineStore } from 'pinia'
import { settingsStore } from './settings'
import { useCookies } from "vue3-cookies";

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
        init() {
            const {cookies} = useCookies();
            if(cookies.isKey("game_state") ){
                const settings = settingsStore()
                for(let i=0; i<settings.getMaxParts; i++) {
                    let key = i.toString()
                    if(Object.keys(cookies.get("game_state").samplesCompleted).includes(key)) {
                        this.samplesCompleted[key] = cookies.get("game_state").samplesCompleted[key]
                    } else {
                        this.samplesCompleted[key] = 0
                    }
                }
            } else {
                this.reset()
            }
        },
        reset() {
            const settings = settingsStore()
            for(let i=0; i<settings.getMaxParts; i++) {
                this.samplesCompleted[i.toString()] = 0
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
            this.samplesCompleted[sampleNumber.toString()]++;
            this.setCookie()
        }
    },
})