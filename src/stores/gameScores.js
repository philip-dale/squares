import { defineStore } from 'pinia'

const defaultScoreBoards = {
    "standard": [{ "score": 10, "time": 10000 },
    { "score": 9, "time": 10000 },
    { "score": 8, "time": 10000 },
    { "score": 7, "time": 10000 },
    { "score": 6, "time": 10000 },
    { "score": 5, "time": 10000 },
    { "score": 4, "time": 10000 },
    { "score": 3, "time": 10000 },
    { "score": 2, "time": 10000 },
    { "score": 1, "time": 10000 }],
    "continuous": [{ "score": 10, "time": 10000 },
    { "score": 9, "time": 10000 },
    { "score": 8, "time": 10000 },
    { "score": 7, "time": 10000 },
    { "score": 6, "time": 10000 },
    { "score": 5, "time": 10000 },
    { "score": 4, "time": 10000 },
    { "score": 3, "time": 10000 },
    { "score": 2, "time": 10000 },
    { "score": 1, "time": 10000 }],
    "oneOfEach": [{
        "id": "1", "scores": [{ "time": 10001 },
        { "time": 10002 },
        { "time": 10003 },
        { "time": 10004 },
        { "time": 10005 },
        { "time": 10006 },
        { "time": 10007 },
        { "time": 10008 },
        { "time": 10009 },
        { "time": 10010 }]
    },
    {
        "id": "2", "scores": [{ "time": 10001 },
        { "time": 10002 },
        { "time": 10003 },
        { "time": 10004 },
        { "time": 10005 },
        { "time": 10006 },
        { "time": 10007 },
        { "time": 10008 },
        { "time": 10009 },
        { "time": 10010 }]
    },
    {
        "id": "3", "scores": [{ "time": 10001 },
        { "time": 10002 },
        { "time": 10003 },
        { "time": 10004 },
        { "time": 10005 },
        { "time": 10006 },
        { "time": 10007 },
        { "time": 10008 },
        { "time": 10009 },
        { "time": 10010 }]
    },
    {
        "id": "4", "scores": [{ "time": 10001 },
        { "time": 10002 },
        { "time": 10003 },
        { "time": 10004 },
        { "time": 10005 },
        { "time": 10006 },
        { "time": 10007 },
        { "time": 10008 },
        { "time": 10009 },
        { "time": 10010 }]
    },
    {
        "id": "5", "scores": [{ "time": 10001 },
        { "time": 10002 },
        { "time": 10003 },
        { "time": 10004 },
        { "time": 10005 },
        { "time": 10006 },
        { "time": 10007 },
        { "time": 10008 },
        { "time": 10009 },
        { "time": 10010 }]
    },
    {
        "id": "6", "scores": [{ "time": 10001 },
        { "time": 10002 },
        { "time": 10003 },
        { "time": 10004 },
        { "time": 10005 },
        { "time": 10006 },
        { "time": 10007 },
        { "time": 10008 },
        { "time": 10009 },
        { "time": 10010 }]
    },
    {
        "id": "7", "scores": [{ "time": 10001 },
        { "time": 10002 },
        { "time": 10003 },
        { "time": 10004 },
        { "time": 10005 },
        { "time": 10006 },
        { "time": 10007 },
        { "time": 10008 },
        { "time": 10009 },
        { "time": 10010 }]
    },
    {
        "id": "8", "scores": [{ "time": 10001 },
        { "time": 10002 },
        { "time": 10003 },
        { "time": 10004 },
        { "time": 10005 },
        { "time": 10006 },
        { "time": 10007 },
        { "time": 10008 },
        { "time": 10009 },
        { "time": 10010 }]
    },
    {
        "id": "9", "scores": [{ "time": 10001 },
        { "time": 10002 },
        { "time": 10003 },
        { "time": 10004 },
        { "time": 10005 },
        { "time": 10006 },
        { "time": 10007 },
        { "time": 10008 },
        { "time": 10009 },
        { "time": 10010 }]
    },
    {
        "id": "10", "scores": [{ "time": 10001 },
        { "time": 10002 },
        { "time": 10003 },
        { "time": 10004 },
        { "time": 10005 },
        { "time": 10006 },
        { "time": 10007 },
        { "time": 10008 },
        { "time": 10009 },
        { "time": 10010 }]
    },
    {
        "id": "11", "scores": [{ "time": 10001 },
        { "time": 10002 },
        { "time": 10003 },
        { "time": 10004 },
        { "time": 10005 },
        { "time": 10006 },
        { "time": 10007 },
        { "time": 10008 },
        { "time": 10009 },
        { "time": 10010 }]
    },
    {
        "id": "12", "scores": [{ "time": 10001 },
        { "time": 10002 },
        { "time": 10003 },
        { "time": 10004 },
        { "time": 10005 },
        { "time": 10006 },
        { "time": 10007 },
        { "time": 10008 },
        { "time": 10009 },
        { "time": 10010 }]
    },
    {
        "id": "13", "scores": [{ "time": 10001 },
        { "time": 10002 },
        { "time": 10003 },
        { "time": 10004 },
        { "time": 10005 },
        { "time": 10006 },
        { "time": 10007 },
        { "time": 10008 },
        { "time": 10009 },
        { "time": 10010 }]
    },
    {
        "id": "14", "scores": [{ "time": 10001 },
        { "time": 10002 },
        { "time": 10003 },
        { "time": 10004 },
        { "time": 10005 },
        { "time": 10006 },
        { "time": 10007 },
        { "time": 10008 },
        { "time": 10009 },
        { "time": 10010 }]
    },
    {
        "id": "15", "scores": [{ "time": 10001 },
        { "time": 10002 },
        { "time": 10003 },
        { "time": 10004 },
        { "time": 10005 },
        { "time": 10006 },
        { "time": 10007 },
        { "time": 10008 },
        { "time": 10009 },
        { "time": 10010 }]
    },
    {
        "id": "16", "scores": [{ "time": 10001 },
        { "time": 10002 },
        { "time": 10003 },
        { "time": 10004 },
        { "time": 10005 },
        { "time": 10006 },
        { "time": 10007 },
        { "time": 10008 },
        { "time": 10009 },
        { "time": 10010 }]
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

        },
        addScore(gameType, score, time, level) {
            if (gameType === "oneOfEach") {
                defaultScoreBoards[gameType][level - 1].scores.push({ "time": time })
                defaultScoreBoards[gameType][level - 1].scores.sort(function (a, b) { return a.time - b.time })
                if (defaultScoreBoards[gameType][level - 1].scores.length > 10) {
                    defaultScoreBoards[gameType][level - 1].scores.pop()
                }
            } else {
                defaultScoreBoards[gameType].push({ "score": score, "time": time })
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
        }
    }
})