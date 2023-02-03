import { defineStore } from 'pinia'

export const settingsStore = defineStore('settings', {
    state: () => ({size: {x: 3, y: 3}, maxParts: 3}),
    getters: {
        getSize: (state) => {
            return state.size
        },
        getMaxParts: (state) => {
            return state.maxParts
        },
    },
})