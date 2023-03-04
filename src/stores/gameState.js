import { defineStore } from 'pinia'
import { settingsStore } from './settings'
import { scoreBoardStore} from './gameScores'

const gameTypes = {
    "standard":{"name": "Standard", "autoSpawn":false, "autoIncreaseLevel": true, "oneOfEach":false}, 
    "continuous":{"name": "Continuous", "autoSpawn":true, "autoIncreaseLevel": true, "oneOfEach":false}, 
    "oneOfEach":{"name": "One Of Each", "autoSpawn":false, "autoIncreaseLevel": false, "oneOfEach":true}
}

const playtimeIncrement = 100

export const gameStateStore = defineStore('gameState', {
    state: () => ({ 
        samplesCompleted: {},
        samplesCompletedAtLevel: {},
        spawnTimer: null,
        gameType: "standard",
        gameLevel: 1,
        gamePaused: true,
        playTime: 0,
        gameOver: false,
    }),
    getters: {
        getSamplesCompleted: (state) => {
            return state.samplesCompleted
        },
        getTotalCompleted: (state) => {
            let total = 0
            for(let i=0; i<state.getmaxContibuters; i++) {
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
            let total = 0
            for(let i=0; i<state.getmaxContibuters; i++) {
                if(i.toString() in state.samplesCompletedAtLevel ) {
                    total += state.samplesCompletedAtLevel[i.toString()]
                }
            }
            return total
        },
        getGameType: (state) => {
            return state.gameType
        },
        getAutoSpawn: (state) => {
            return gameTypes[state.gameType].autoSpawn
        },
        getAutoIncreaseLevel: (state) => {
            return gameTypes[state.gameType].autoIncreaseLevel
        },
        getGameLevel: (state) => {
            return state.gameLevel
        },
        getGameLevelDetails: (state) => {
            const settings = settingsStore()
            return settings.getGameLevels[state.gameLevel]
        },
        getmaxContibuters: (state) => {
            const settings = settingsStore()
            return settings.getGameLevels[state.gameLevel].maxContibuters
        },
        getGameTypes: () => {
            return gameTypes
        },
        getGameTypeName: (state) => {
            return gameTypes[state.gameType].name
        },
        getGamePaused: (state) => {
            return state.gamePaused
        },
        isGameOver: (state) => {
            return state.gameOver
        }

    },
    actions: {
        init() {
            let gameState = JSON.parse(localStorage.getItem("game_state"))

            if(gameState != null){

                if("gameLevel" in gameState) {
                    this.gameLevel = parseInt(gameState.gameLevel)
                }

                if("gameType" in gameState) {
                    this.gameType = gameState.gameType
                }

                if("playTime" in gameState) {
                    this.playTime = parseInt(gameState.playTime)
                }

                if("gameOver" in gameState) {
                    this.gameOver = gameState.gameOver
                }
                
                setInterval(
                    () => {
                        if(!this.gamePaused) {
                            this.playTime++;
                        }
                    }, 
                    playtimeIncrement
                )
                
                for(let i=0; i<this.getmaxContibuters; i++) {
                    let key = i.toString()
                    if("samplesCompleted" in gameState) {
                        if(Object.keys(gameState.samplesCompleted).includes(key)) {
                            this.samplesCompleted[key] = gameState.samplesCompleted[key]
                        } else {
                            this.samplesCompleted[key] = 0
                        }
                    }
                    
                    if("samplesCompletedAtLevel" in gameState) {
                        if(Object.keys(gameState.samplesCompletedAtLevel).includes(key)) {
                            this.samplesCompletedAtLevel[key] = gameState.samplesCompletedAtLevel[key]
                        } else {
                            this.samplesCompletedAtLevel[key] = 0
                        }
                    }
                }
            } else {
                this.reset()
            }
        },
        reset() {
            for(let i=0; i<this.getmaxContibuters; i++) {
                this.samplesCompleted[i.toString()] = 0
                this.samplesCompletedAtLevel[i.toString()] = 0
            }
            this.playTime = 0
            setInterval(
                () => {
                    if(!this.gamePaused) {
                        this.playTime++;
                    }
                }, 
                playtimeIncrement
            )
            this.gamePaused = true
            this.gameOver = false
            this.setLocalStorage()
        },
        setLocalStorage() {
            var obj = new Object();
            obj.samplesCompleted = this.samplesCompleted
            obj.samplesCompletedAtLevel = this.samplesCompletedAtLevel
            obj.gameType = this.gameType
            obj.gameLevel = this.gameLevel
            obj.playTime = this.playTime
            obj.gameOver = this.gameOver
            
            localStorage.setItem("game_state", JSON.stringify(obj))
        },
        clearLocalStorage() {
            localStorage.clear("game_state")
        },
        addCompletedSample(sampleNumber) {
            if(sampleNumber.toString() in this.samplesCompleted) {
                this.samplesCompleted[sampleNumber.toString()]++;
                this.samplesCompletedAtLevel[sampleNumber.toString()]++;
            } else {
                this.samplesCompleted[sampleNumber.toString()] = 1
                this.samplesCompletedAtLevel[sampleNumber.toString()] = 1
            }

            if(this.getAutoIncreaseLevel && (this.getLevelTotalCompleted >= this.getGameLevelDetails.targetScoreIncrease)) {
                this.nextLevel()
                this.clearCompletedAtLevel()
            }

            if(this.gameType === "oneOfEach"){
                let oneOfEach = true;
                for(let i=0; i<this.getmaxContibuters; i++) {
                    if(this.samplesCompletedAtLevel[i.toString()] === 0) {
                        oneOfEach = false
                        break
                    }
                }
                if(oneOfEach) {
                    const board = scoreBoardStore()
                    board.addScore(this.getGameType, -1, this.playTime, this.gameLevel)
                    this.gameOver = true
                }
            }
            
            this.setLocalStorage()
        },
        clearCompletedAtLevel() {
            for(let i=0; i<this.getmaxContibuters; i++) {
                this.samplesCompletedAtLevel[i.toString()] = 0
            }
            this.setLocalStorage()
        },
        setSpawnTimer(func, timeout) {
            clearTimeout(this.spawnTimer)
            this.spawnTimer = setInterval(
                () => {
                    if(this.getAutoSpawn && !this.gamePaused) {
                        func();
                    }
                }, 
                timeout
            )
        },
        setLevel(level) {
            this.gameLevel = level
            this.setLocalStorage()
        },
        nextLevel() {
            const settings = settingsStore()
            if(this.gameLevel < Object.keys(settings.getGameLevels).length) {
                this.gameLevel++
            }
            this.setLocalStorage()
        },
        setGameType(val) {
            this.gameType = val
            this.setLocalStorage()
        },
        spawnFull() {
            const board = scoreBoardStore()
            board.addScore(this.getGameType, this.getTotalCompleted, this.playTime, this.gameLevel)
            this.gameOver = true
        },
        setGamePaused(val) {
            this.gamePaused = val
        }
    },
})