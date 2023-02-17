import { defineStore } from 'pinia'


const gameLevels = {
    1:  { maxContibuters: 2, maxDifferences: 1, minDifferences: 1, targetScoreIncrease: 6,  spawnTime: 10000},
    2:  { maxContibuters: 3, maxDifferences: 1, minDifferences: 1, targetScoreIncrease: 10, spawnTime: 10000},
    3:  { maxContibuters: 3, maxDifferences: 2, minDifferences: 1, targetScoreIncrease: 10, spawnTime: 9000 },
    4:  { maxContibuters: 4, maxDifferences: 2, minDifferences: 1, targetScoreIncrease: 10, spawnTime: 9000 },
    5:  { maxContibuters: 4, maxDifferences: 3, minDifferences: 1, targetScoreIncrease: 10, spawnTime: 8000 },
    6:  { maxContibuters: 4, maxDifferences: 3, minDifferences: 2, targetScoreIncrease: 10, spawnTime: 8000 },
    7:  { maxContibuters: 5, maxDifferences: 3, minDifferences: 2, targetScoreIncrease: 10, spawnTime: 7000 },
    8:  { maxContibuters: 5, maxDifferences: 4, minDifferences: 2, targetScoreIncrease: 10, spawnTime: 7000 },
    9:  { maxContibuters: 5, maxDifferences: 4, minDifferences: 3, targetScoreIncrease: 10, spawnTime: 6000 },
    10: { maxContibuters: 6, maxDifferences: 4, minDifferences: 3, targetScoreIncrease: 10, spawnTime: 6000 },
    11: { maxContibuters: 6, maxDifferences: 5, minDifferences: 3, targetScoreIncrease: 10, spawnTime: 5000 },
    12: { maxContibuters: 6, maxDifferences: 6, minDifferences: 3, targetScoreIncrease: 10, spawnTime: 5000 },
    13: { maxContibuters: 6, maxDifferences: 6, minDifferences: 4, targetScoreIncrease: 10, spawnTime: 4000 },
    14: { maxContibuters: 6, maxDifferences: 6, minDifferences: 5, targetScoreIncrease: 10, spawnTime: 4000 },
    15: { maxContibuters: 6, maxDifferences: 6, minDifferences: 6, targetScoreIncrease: 10, spawnTime: 4000 },
}

export const settingsStore = defineStore('settings', {
    state: () => ({
        size: { x: 2, y: 3 },
        gameLevel: 1,
        colourList: ['#ff0000', '#40ff00', '#0040ff', '#ff00ff', '#ffbf00', '#449c90'],
        maxLives: 3,
        spawnMax: 49,
        mergeInMax: 5,
        mergeInMin: 3,
        mergeOutMax: 1,
        sinkMax: -1,
        gameType: "standard",
        autoIncreaseLevel: true,
        autoSpawn: true,
    }),
    getters: {
        getSize: (state) => {
            return state.size
        },
        getmaxContibuters: (state) => {
            return gameLevels[state.gameLevel].maxContibuters
        },
        getColour: (state) => {
            return (partId) => state.colourList[partId]
        },
        getMaxLives: (state) => {
            return state.maxLives
        },
        getContainerMax: (state) => {
            return (containerType) => {
                switch (containerType) {
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
        getGameType: (state) => {
            return state.gameType
        },
        getGameLevel: (state) => {
            return state.gameLevel
        },
        getGameLevelDetails: (state) => {
            return gameLevels[state.gameLevel]
        },
        getGameLevels: () => {
            return gameLevels
        },
        getAutoSpawn: (state) => {
            return state.autoSpawn
        },
        getAutoIncreaseLevel: (state) => {
            return state.autoIncreaseLevel
        }
    },
    actions: {
        init() {
            let settingsState = JSON.parse(localStorage.getItem("settings_state"))
            if(settingsState != null){
                this.gameLevel = parseInt(settingsState.gameLevel)
                this.autoIncreaseLevel = settingsState.autoIncreaseLevel
                this.autoSpawn = settingsState.autoSpawn
            }
        },
        setLocalStorage() {
            localStorage.setItem("settings_state", JSON.stringify(this))
        },
        clearLocalStorage() {
            localStorage.clear("settings_state")
        },
        setLevel(level) {
            this.gameLevel = level
            this.setLocalStorage()
        },
        nextLevel() {
            if(this.gameLevel < Object.keys(gameLevels).length) {
                this.gameLevel++
            }
            this.setLocalStorage()
        },
        setAutoIncreaseLevel(val) {
            this.autoIncreaseLevel = val
            this.setLocalStorage()
        },
        setAutoSpawn(val) {
            this,this.autoSpawn = val
            this.setLocalStorage()
        }
    }
})