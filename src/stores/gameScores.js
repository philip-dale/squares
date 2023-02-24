import { defineStore } from 'pinia'

const defaultScoreBoards = {
    "standard": [{ "name": "", "score": 10, "time": 10000 },
    { "name": "", "score": 9, "time": 10000 },
    { "name": "", "score": 8, "time": 10000 },
    { "name": "", "score": 7, "time": 10000 },
    { "name": "", "score": 6, "time": 10000 },
    { "name": "", "score": 5, "time": 10000 },
    { "name": "", "score": 4, "time": 10000 },
    { "name": "", "score": 3, "time": 10000 },
    { "name": "", "score": 2, "time": 10000 },
    { "name": "", "score": 1, "time": 10000 }],
    "continuous": [{ "score": 10, "time": 10000 },
    { "name": "", "score": 9, "time": 10000 },
    { "name": "", "score": 8, "time": 10000 },
    { "name": "", "score": 7, "time": 10000 },
    { "name": "", "score": 6, "time": 10000 },
    { "name": "", "score": 5, "time": 10000 },
    { "name": "", "score": 4, "time": 10000 },
    { "name": "", "score": 3, "time": 10000 },
    { "name": "", "score": 2, "time": 10000 },
    { "name": "", "score": 1, "time": 10000 }],
    "oneOfEach": [{
        "id": "1", "scores": [{ "name": "", "time": 10001 },
        { "name": "", "time": 10002 },
        { "name": "", "time": 10003 },
        { "name": "", "time": 10004 },
        { "name": "", "time": 10005 },
        { "name": "", "time": 10006 },
        { "name": "", "time": 10007 },
        { "name": "", "time": 10008 },
        { "name": "", "time": 10009 },
        { "name": "", "time": 10010 }]
    },
    {
        "id": "2", "scores": [{ "name": "", "time": 10001 },
        { "name": "", "time": 10002 },
        { "name": "", "time": 10003 },
        { "name": "", "time": 10004 },
        { "name": "", "time": 10005 },
        { "name": "", "time": 10006 },
        { "name": "", "time": 10007 },
        { "name": "", "time": 10008 },
        { "name": "", "time": 10009 },
        { "name": "", "time": 10010 }]
    },
    {
        "id": "3", "scores": [{ "name": "", "time": 10001 },
        { "name": "", "time": 10002 },
        { "name": "", "time": 10003 },
        { "name": "", "time": 10004 },
        { "name": "", "time": 10005 },
        { "name": "", "time": 10006 },
        { "name": "", "time": 10007 },
        { "name": "", "time": 10008 },
        { "name": "", "time": 10009 },
        { "name": "", "time": 10010 }]
    },
    {
        "id": "4", "scores": [{ "name": "", "time": 10001 },
        { "name": "", "time": 10002 },
        { "name": "", "time": 10003 },
        { "name": "", "time": 10004 },
        { "name": "", "time": 10005 },
        { "name": "", "time": 10006 },
        { "name": "", "time": 10007 },
        { "name": "", "time": 10008 },
        { "name": "", "time": 10009 },
        { "name": "", "time": 10010 }]
    },
    {
        "id": "5", "scores": [{ "name": "", "time": 10001 },
        { "name": "", "time": 10002 },
        { "name": "", "time": 10003 },
        { "name": "", "time": 10004 },
        { "name": "", "time": 10005 },
        { "name": "", "time": 10006 },
        { "name": "", "time": 10007 },
        { "name": "", "time": 10008 },
        { "name": "", "time": 10009 },
        { "name": "", "time": 10010 }]
    },
    {
        "id": "6", "scores": [{ "name": "", "time": 10001 },
        { "name": "", "time": 10002 },
        { "name": "", "time": 10003 },
        { "name": "", "time": 10004 },
        { "name": "", "time": 10005 },
        { "name": "", "time": 10006 },
        { "name": "", "time": 10007 },
        { "name": "", "time": 10008 },
        { "name": "", "time": 10009 },
        { "name": "", "time": 10010 }]
    },
    {
        "id": "7", "scores": [{ "name": "", "time": 10001 },
        { "name": "", "time": 10002 },
        { "name": "", "time": 10003 },
        { "name": "", "time": 10004 },
        { "name": "", "time": 10005 },
        { "name": "", "time": 10006 },
        { "name": "", "time": 10007 },
        { "name": "", "time": 10008 },
        { "name": "", "time": 10009 },
        { "name": "", "time": 10010 }]
    },
    {
        "id": "8", "scores": [{ "name": "", "time": 10001 },
        { "name": "", "time": 10002 },
        { "name": "", "time": 10003 },
        { "name": "", "time": 10004 },
        { "name": "", "time": 10005 },
        { "name": "", "time": 10006 },
        { "name": "", "time": 10007 },
        { "name": "", "time": 10008 },
        { "name": "", "time": 10009 },
        { "name": "", "time": 10010 }]
    },
    {
        "id": "9", "scores": [{ "name": "", "time": 10001 },
        { "name": "", "time": 10002 },
        { "name": "", "time": 10003 },
        { "name": "", "time": 10004 },
        { "name": "", "time": 10005 },
        { "name": "", "time": 10006 },
        { "name": "", "time": 10007 },
        { "name": "", "time": 10008 },
        { "name": "", "time": 10009 },
        { "name": "", "time": 10010 }]
    },
    {
        "id": "10", "scores": [{ "name": "", "time": 10001 },
        { "name": "", "time": 10002 },
        { "name": "", "time": 10003 },
        { "name": "", "time": 10004 },
        { "name": "", "time": 10005 },
        { "name": "", "time": 10006 },
        { "name": "", "time": 10007 },
        { "name": "", "time": 10008 },
        { "name": "", "time": 10009 },
        { "name": "", "time": 10010 }]
    },
    {
        "id": "11", "scores": [{ "name": "", "time": 10001 },
        { "name": "", "time": 10002 },
        { "name": "", "time": 10003 },
        { "name": "", "time": 10004 },
        { "name": "", "time": 10005 },
        { "name": "", "time": 10006 },
        { "name": "", "time": 10007 },
        { "name": "", "time": 10008 },
        { "name": "", "time": 10009 },
        { "name": "", "time": 10010 }]
    },
    {
        "id": "12", "scores": [{ "name": "", "time": 10001 },
        { "name": "", "time": 10002 },
        { "name": "", "time": 10003 },
        { "name": "", "time": 10004 },
        { "name": "", "time": 10005 },
        { "name": "", "time": 10006 },
        { "name": "", "time": 10007 },
        { "name": "", "time": 10008 },
        { "name": "", "time": 10009 },
        { "name": "", "time": 10010 }]
    },
    {
        "id": "13", "scores": [{ "name": "", "time": 10001 },
        { "name": "", "time": 10002 },
        { "name": "", "time": 10003 },
        { "name": "", "time": 10004 },
        { "name": "", "time": 10005 },
        { "name": "", "time": 10006 },
        { "name": "", "time": 10007 },
        { "name": "", "time": 10008 },
        { "name": "", "time": 10009 },
        { "name": "", "time": 10010 }]
    },
    {
        "id": "14", "scores": [{ "name": "", "time": 10001 },
        { "name": "", "time": 10002 },
        { "name": "", "time": 10003 },
        { "name": "", "time": 10004 },
        { "name": "", "time": 10005 },
        { "name": "", "time": 10006 },
        { "name": "", "time": 10007 },
        { "name": "", "time": 10008 },
        { "name": "", "time": 10009 },
        { "name": "", "time": 10010 }]
    },
    {
        "id": "15", "scores": [{ "name": "", "time": 10001 },
        { "name": "", "time": 10002 },
        { "name": "", "time": 10003 },
        { "name": "", "time": 10004 },
        { "name": "", "time": 10005 },
        { "name": "", "time": 10006 },
        { "name": "", "time": 10007 },
        { "name": "", "time": 10008 },
        { "name": "", "time": 10009 },
        { "name": "", "time": 10010 }]
    },
    {
        "id": "16", "scores": [{ "name": "", "time": 10001 },
        { "name": "", "time": 10002 },
        { "name": "", "time": 10003 },
        { "name": "", "time": 10004 },
        { "name": "", "time": 10005 },
        { "name": "", "time": 10006 },
        { "name": "", "time": 10007 },
        { "name": "", "time": 10008 },
        { "name": "", "time": 10009 },
        { "name": "", "time": 10010 }]
    },
    ],
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
            let scoresState = JSON.parse(localStorage.getItem("scores_state"))

            if(scoresState != null){
                if("scoreBoards" in scoresState) {
                    this.scoreBoards = parseInt(scoresState.scoreBoards)
                }
            }

            defaultScoreBoards["standard"].sort(function (a, b) {
                if (a.score === b.score) {
                    return a.time - b.time
                } else {
                    return b.score - a.score
                }
            })

            defaultScoreBoards["continuous"].sort(function (a, b) {
                if (a.score === b.score) {
                    return a.time - b.time
                } else {
                    return b.score - a.score
                }
            })

            for(let i=0; i<defaultScoreBoards["oneOfEach"].length; i++) {
                defaultScoreBoards["oneOfEach"][i].scores.sort(function (a, b) { return a.time - b.time })
            }
        },
        setLocalStorage() {
            var obj = new Object();
            obj.scoreBoards = this.scoreBoards

            localStorage.setItem("scores_state", JSON.stringify(obj))
        },
        clearLocalStorage() {
            localStorage.clear("scores_state")
        },
        addScore(gameType, score, time, level) {
            if (gameType === "oneOfEach") {
                defaultScoreBoards[gameType][level - 1].scores.push({ "name": "", "time": time })
                defaultScoreBoards[gameType][level - 1].scores.sort(function (a, b) { return a.time - b.time })
                if (defaultScoreBoards[gameType][level - 1].scores.length > 10) {
                    defaultScoreBoards[gameType][level - 1].scores.pop()
                }
            } else {
                defaultScoreBoards[gameType].push({ "name": "", "score": score, "time": time })
                defaultScoreBoards[gameType].sort(function (a, b) {
                    if (a.score === b.score) {
                        return a.time - b.time
                    } else {
                        return b.score - a.score
                    }
                })
                if (defaultScoreBoards[gameType].length > 10) {
                    defaultScoreBoards[gameType].pop()
                }
            }
            this.setLocalStorage() 
        },
    }
})