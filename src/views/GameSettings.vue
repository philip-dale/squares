<template>
  <div class="settings">
    <h1>Settings Page</h1>
  </div>
  <button @click="clearDataBtn()">Clear Data</button>
</template>

<script>
import { samplesStore } from "../stores/samplesStore";
import { settingsStore } from "../stores/settings";
import { gameStateStore } from "../stores/gameState"

export default {
  name: "GameSettings",
  setup() {
    const samples = samplesStore();
    const settings = settingsStore();
    const gameState = gameStateStore();
    return { samples, settings, gameState };
  },
  methods: {
    clearDataBtn() {
      this.samples.reset()
      this.gameState.reset()
      this.samples.clearCookie()
    },
  },
};
</script>
