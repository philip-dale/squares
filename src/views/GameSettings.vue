<template>
  <div>
    <div class="settings">
      <h1>Settings Page</h1>
    </div>
    <v-btn @click="clearDataBtn()">Clear Data</v-btn>
    <v-select
      label="Select Level"
      :items="Object.keys(this.settings.getGameLevels)"
      v-model="currentLevel"
    ></v-select>
    <v-checkbox label="Auto Increase Level" v-model="autoIncreaseLevel"></v-checkbox>
    <v-checkbox label="Auto Spawn" v-model="autoSpawn"></v-checkbox>
  </div>
</template>

<script>
import { samplesStore } from "../stores/samplesStore";
import { settingsStore } from "../stores/settings";
import { gameStateStore } from "../stores/gameState";

export default {
  name: "GameSettings",
  setup() {
    const samples = samplesStore();
    const settings = settingsStore();
    const gameState = gameStateStore();
    return { samples, settings, gameState };
  },
  computed: {
    currentLevel: {
      get() {
        return this.settings.getGameLevel;
      },
      set(val) {
        this.settings.setLevel(val);
      },
    },
    autoIncreaseLevel: {
      get() {
        return this.settings.getAutoIncreaseLevel;
      },
      set(val) {
        this.settings.setAutoIncreaseLevel(val);
      },
    },
    autoSpawn: {
      get() {
        return this.settings.getAutoSpawn;
      },
      set(val) {
        this.settings.setAutoSpawn(val);
      },
    },
  },
  methods: {
    clearDataBtn() {
      this.gameState.reset();
      this.gameState.clearCookie();
      this.samples.reset();
      this.samples.clearCookie();
      this.settings.clearCookie();
    },
  },
};
</script>
