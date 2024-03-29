import { defineStore } from 'pinia'
import { settingsStore } from './settings'

let defaultScoreBoards = {}

function createDefualtScoreboard() {
    const settings = settingsStore()

    defaultScoreBoards["standard"] = [];
    defaultScoreBoards["continuous"] = [];
    for(let i=0; i<10; i++) {
        defaultScoreBoards["standard"][i] = { "name": "", "score": i+1, "time": 100000000 }
        defaultScoreBoards["continuous"][i] = { "name": "", "score": i+1, "time": 100000000 }
    }
    defaultScoreBoards["oneOfEach"] = [];
    for(let i=0; i<Object.keys(settings.getGameLevels).length; i++) {
        defaultScoreBoards["oneOfEach"][i] = {"id": (i+1).toString(), "scores": []}
        for(let j=0; j<10; j++) {
            defaultScoreBoards["oneOfEach"][i]["scores"][j] = { "name": "", "score": 0, "time": 1000000000 }
        }
    }
    defaultScoreBoards["challenge"] = [];
    for(let i=0; i<Object.keys(settings.getChallenges).length; i++) {
        defaultScoreBoards["challenge"][i] = {"id": (i+1).toString(), "scores": []}
        for(let j=0; j<10; j++) {
            defaultScoreBoards["challenge"][i]["scores"][j] = { "name": "", "score": 0, "time": 1000000000 }
        }
    }
}

export const scoreBoardStore = defineStore('scoreBoards', {
    state: () => ({
        scoreBoards: defaultScoreBoards
    }),
    getters: {
        getScoreBoards: (state) => {
            return state.scoreBoards
        },
    },
    actions: {
        init() {
            createDefualtScoreboard();
            let scoresState = JSON.parse(localStorage.getItem("scores_state"))

            if(scoresState != null){
                if("scoreBoards" in scoresState) {
                    if("standard" in scoresState.scoreBoards) {
                        this.scoreBoards["standard"] = scoresState.scoreBoards["standard"]
                        // this is a fix for score board issues. Remove in the future
                        if(!("version" in scoresState)) {
                            for(let j=0; j<this.scoreBoards["standard"].length; j++) {
                                if(this.scoreBoards["standard"][j].time === 10000) {
                                    this.scoreBoards["standard"][j].time = 1000000000
                                }
                            }
                        }
                    }
                    if("continuous" in scoresState.scoreBoards) {
                        this.scoreBoards["continuous"] = scoresState.scoreBoards["continuous"]
                        // this is a fix for score board issues. Remove in the future
                        if(!("version" in scoresState)) {
                            for(let j=0; j<this.scoreBoards["continuous"].length; j++) {
                                if(this.scoreBoards["continuous"][j].time === 10000) {
                                    this.scoreBoards["continuous"][j].time = 1000000000
                                }
                            }
                        }
                    }
                    if("oneOfEach" in scoresState.scoreBoards) {
                        for (let i=0; i<this.scoreBoards["oneOfEach"].length; i++) {
                            if( i+1 < scoresState.scoreBoards["oneOfEach"].length) {
                                this.scoreBoards["oneOfEach"][i] = scoresState.scoreBoards["oneOfEach"][i]
                                // this is a fix for score board issues. Remove in the future
                                for(let j=0; j<this.scoreBoards["oneOfEach"][i].scores.length; j++) {
                                    if(!("score" in this.scoreBoards["oneOfEach"][i].scores[j])) {
                                        this.scoreBoards["oneOfEach"][i].scores[j].score = 0;
                                    }

                                    if(!("version" in scoresState)) {
                                        if(this.scoreBoards["oneOfEach"][i].scores[j].time === 10000) {
                                            this.scoreBoards["oneOfEach"][i].scores[j].time = 1000000000
                                        }
                                    }
                                }
                                
                                
                            }
                        }
                    }
                    if("challenge" in scoresState.scoreBoards) {
                        for (let i=0; i<this.scoreBoards["challenge"].length; i++) {
                            if( i+1 < scoresState.scoreBoards["challenge"].length) {
                                this.scoreBoards["challenge"][i] = scoresState.scoreBoards["challenge"][i]
                                // this is a fix for score board issues. Remove in the future
                                
                                for(let j=0; j<this.scoreBoards["challenge"][i].scores.length; j++) {
                                    if(!("score" in this.scoreBoards["challenge"][i].scores[j])) {
                                        this.scoreBoards["challenge"][i].scores[j].score = 0;
                                    }

                                    if(!("version" in scoresState)) {
                                        if(this.scoreBoards["challenge"][i].scores[j].time === 10000) {
                                            this.scoreBoards["challenge"][i].scores[j].time = 1000000000
                                        }
                                    }
                                }
                        }
                        }
                    }
                }
            }

            this.scoreBoards["standard"].sort(function (a, b) {
                if (a.score === b.score) {
                    return a.time - b.time
                } else {
                    return b.score - a.score
                }
            })

            this.scoreBoards["continuous"].sort(function (a, b) {
                if (a.score === b.score) {
                    return a.time - b.time
                } else {
                    return b.score - a.score
                }
            })

            for(let i=0; i<this.scoreBoards["oneOfEach"].length; i++) {
                this.scoreBoards["oneOfEach"][i].scores.sort(function (a, b) { return a.time - b.time })
            }

            for(let i=0; i<this.scoreBoards["challenge"].length; i++) {
                this.scoreBoards["challenge"][i].scores.sort(function (a, b) { return a.time - b.time })
            }
        },
        setLocalStorage() {
            var obj = new Object();
            obj.version = 3
            obj.scoreBoards = this.scoreBoards

            localStorage.setItem("scores_state", JSON.stringify(obj))
        },
        clearLocalStorage() {
            localStorage.clear("scores_state")
        },
        addScore(gameType, score, time, level) {
            if (gameType === "oneOfEach" || gameType === "challenge") {
                this.scoreBoards[gameType][level - 1].scores.push({ "name": "", "score": score, "time": time })
                this.scoreBoards[gameType][level - 1].scores.sort(function (a, b) {
                    if (a.score === b.score) {
                        return a.time - b.time
                    } else {
                        return b.score - a.score
                    }
                })
                if (this.scoreBoards[gameType][level - 1].scores.length > 10) {
                    this.scoreBoards[gameType][level - 1].scores.pop()
                }
            } else {
                this.scoreBoards[gameType].push({ "name": "", "score": score, "time": time })
                this.scoreBoards[gameType].sort(function (a, b) {
                    if (a.score === b.score) {
                        return a.time - b.time
                    } else {
                        return b.score - a.score
                    }
                })
                if (this.scoreBoards[gameType].length > 10) {
                    this.scoreBoards[gameType].pop()
                }
            }
            this.setLocalStorage() 
        },
    }
})