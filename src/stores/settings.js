import { defineStore } from 'pinia'

const gameLevels = {
    1: { inputColours: 2, maxDifferences: 1, minDifferences: 1, difftotalColours: 1, targetScoreIncrease: 6, spawnTime: 10000 },
    2: { inputColours: 3, maxDifferences: 1, minDifferences: 1, difftotalColours: 1, targetScoreIncrease: 10, spawnTime: 10000 },
    3: { inputColours: 3, maxDifferences: 2, minDifferences: 1, difftotalColours: 1, targetScoreIncrease: 10, spawnTime: 9000 },
    4: { inputColours: 3, maxDifferences: 2, minDifferences: 1, difftotalColours: 2, targetScoreIncrease: 10, spawnTime: 9000 },
    5: { inputColours: 4, maxDifferences: 3, minDifferences: 1, difftotalColours: 2, targetScoreIncrease: 10, spawnTime: 8000 },
    6: { inputColours: 4, maxDifferences: 3, minDifferences: 2, difftotalColours: 2, targetScoreIncrease: 10, spawnTime: 8000 },
    7: { inputColours: 4, maxDifferences: 3, minDifferences: 2, difftotalColours: 2, targetScoreIncrease: 10, spawnTime: 7000 },
    8: { inputColours: 4, maxDifferences: 4, minDifferences: 2, difftotalColours: 2, targetScoreIncrease: 10, spawnTime: 7000 },
    9: { inputColours: 5, maxDifferences: 3, minDifferences: 1, difftotalColours: 2, targetScoreIncrease: 10, spawnTime: 7000 },
    10: { inputColours: 5, maxDifferences: 3, minDifferences: 2, difftotalColours: 2, targetScoreIncrease: 10, spawnTime: 7000 },
    11: { inputColours: 5, maxDifferences: 3, minDifferences: 2, difftotalColours: 2, targetScoreIncrease: 10, spawnTime: 7000 },
    12: { inputColours: 5, maxDifferences: 4, minDifferences: 2, difftotalColours: 2, targetScoreIncrease: 10, spawnTime: 7000 },
    13: { inputColours: 5, maxDifferences: 4, minDifferences: 3, difftotalColours: 3, targetScoreIncrease: 10, spawnTime: 6000 },
    14: { inputColours: 6, maxDifferences: 4, minDifferences: 3, difftotalColours: 3, targetScoreIncrease: 10, spawnTime: 6000 },
    15: { inputColours: 6, maxDifferences: 5, minDifferences: 3, difftotalColours: 3, targetScoreIncrease: 10, spawnTime: 5000 },
    16: { inputColours: 6, maxDifferences: 6, minDifferences: 3, difftotalColours: 3, targetScoreIncrease: 10, spawnTime: 5000 },
    17: { inputColours: 6, maxDifferences: 6, minDifferences: 4, difftotalColours: 4, targetScoreIncrease: 10, spawnTime: 4000 },
    18: { inputColours: 6, maxDifferences: 6, minDifferences: 5, difftotalColours: 5, targetScoreIncrease: 10, spawnTime: 4000 },
    19: { inputColours: 6, maxDifferences: 6, minDifferences: 6, difftotalColours: 5, targetScoreIncrease: 10, spawnTime: 4000 },
}

export const settingsStore = defineStore('settings', {
    state: () => ({
        size: { x: 2, y: 3 },
        colourList: ['#ff0000', '#40ff00', '#0040ff', '#ff00ff', '#ffbf00', '#449c90'],
        maxLives: 3,
        spawnMax: 40,
        mergeInMax: 5,
        mergeInMin: 3,
        mergeOutMax: 1,
        sinkMax: -1,
        darkMode: false,
    }),
    getters: {
        getSize: (state) => {
            return state.size
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
        getGameLevels: () => {
            return gameLevels
        },
        getDarkMode: (state) => {
            return state.darkMode
        }

    },
    actions: {
        init() {
            let settingsState = JSON.parse(localStorage.getItem("settings_state"))

            if(settingsState != null){
                if("darkMode" in settingsState) {
                    this.setDarkMode(settingsState.darkMode)
                }
            }
        },
        setLocalStorage() {
            var obj = new Object();
            obj.darkMode = this.darkMode

            localStorage.setItem("settings_state", JSON.stringify(obj))
        },
        clearLocalStorage() {
            localStorage.clear("settings_state")
        },
        setDarkMode(val) {
            if (val) {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
            }
            this.darkMode = val;
            this.setLocalStorage()
        }
    }
})