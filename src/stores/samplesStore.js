import { defineStore } from 'pinia'

import { settingsStore } from './settings'

export const samplesStore = defineStore('samples', {
    state: () => ({allSamples:{}, count:0}),
    getters: {
        containerSamples: (state) => {
            return (containerId) => state.allSamples[containerId]
        },
        sample: (state) => {
            return (containerId, uid) => state.allSamples[containerId][uid]
        },
    },
    actions: {
        init(containerId) {
            this.allSamples[containerId] = {}
        },
        spawn(containerId) {
            const settings = settingsStore()
            let size = settings.getSize
            var parts = new Array(size.x);
            for (let x = 0; x < size.x; x++) {
                parts[x] = new Array(size.y);
                for (let y = 0; y < size.y; y++) {
                    parts[x][y] = Math.floor(Math.random() * settings.getMaxParts);
                }
            }

            this.allSamples[containerId][this.count.toString()] = {"parts": parts, "parentId": containerId, "uid": this.count.toString()}
            this.count++
        },
        move(containerId, uid, newContainerId) {
            if(containerId != newContainerId) {
                this.allSamples[newContainerId][this.count.toString()] = this.allSamples[containerId][uid]
                this.allSamples[newContainerId][this.count.toString()]["parentId"] = newContainerId
                this.allSamples[newContainerId][this.count.toString()]["uid"] = this.count.toString()
                delete this.allSamples[containerId][uid]
                this.count++
            }
        },
        remove(containerId, uid) {
            delete this.allSamples[containerId][uid]
        }
    },
})