<template>
  <div>
    <div class="settings">
      <h1>Game Settings Page</h1>
    </div>
    <v-btn @click="restartGameRequest()" :color="darkMode ? 'grey-darken-2': 'gray'">Restart Game</v-btn>
    <v-select
      label="Select Game Mode"
      :items="gameTypes"
      v-model="gameType"
      :color="darkMode ? 'grey-darken-2': 'gray'"
    ></v-select>
    <v-select
      label="Select Level"
      :items="Object.keys(this.settings.getGameLevels)"
      v-model="currentLevel"
      :color="darkMode ? 'grey-darken-2': 'gray'"
      :disabled="this.disableLevelSelect"
    ></v-select>
    <v-select
      label="Select Challenge"
      :items="challenges"
      v-model="challenge"
      :color="darkMode ? 'grey-darken-2': 'gray'"
      :disabled="this.gameType != 'challenge'"
    ></v-select>
    <v-checkbox-btn v-model="darkMode">Dark Mode</v-checkbox-btn>
  </div>
  <OkCancelDialog title="Restart Game" message="All progress will be cleared if you restart the game" 
                   okText="Restart Game" :showDialog="this.restartDialogState" 
                   @okBtn="{this.restartDialogState = false; restartGame()}"
                   @cancelBtn="this.restartDialogState = false"
                   />
  <OkCancelDialog title="Change Game Mode" message="All progress will be cleared if you change the game mode" 
                   okText="Change Game Mode" :showDialog="this.changeGameDialogState" 
                   @okBtn="{this.changeGameDialogState = false; changeMode()}"
                   @cancelBtn="this.changeGameDialogState = false"
                   />
  <OkCancelDialog title="Change Level" message="All progress will be cleared if you change the level" 
                   okText="Change Level" :showDialog="this.changeLevelDialogState" 
                   @okBtn="{this.changeLevelDialogState = false; changeLevel()}"
                   @cancelBtn="this.changeLevelDialogState = false"
                   />
  <OkCancelDialog title="Change Challenge" message="All progress will be cleared if you change the Challenge" 
                   okText="Change Challenge" :showDialog="this.changeChallengeDialogState" 
                   @okBtn="{this.changeChallengeDialogState = false; changeChallenge()}"
                   @cancelBtn="this.changeChallengeDialogState = false"
                   />
</template>

<script>
import { samplesStore } from "../stores/samplesStore";
import { settingsStore } from "../stores/settings";
import { gameStateStore } from "../stores/gameState";

import OkCancelDialog from "@/components/OkCancelDialog.vue";

export default {
  name: "GameSettings",
  components: {
    OkCancelDialog
  },
  data: () => ({
    restartDialogState: false,
    changeGameDialogState: false,
    changeLevelDialogState: false,
    changeChallengeDialogState: false,
    requestedGameType: null,
    requestedLevel: null,
    requestedChallenge: null
  }),
  setup() {
    const samples = samplesStore();
    const settings = settingsStore();
    const gameState = gameStateStore();
    return { samples, settings, gameState };
  },
  computed: {
    currentLevel: {
      get() {
        return this.gameState.getGameLevel;
      },
      set(val) {
        this.requestedLevel = val
        this.changeLevelDialogState = true
      }
    },
    gameType: {
      get() {
        return this.gameState.getGameType;
      },
      set(val) {
        this.requestedGameType = val
        this.changeGameDialogState = true
      },
    },
    darkMode: {
      get() {
        return this.settings.getDarkMode
      },
      set(val) {
        this.settings.setDarkMode(val)
      }
    },
    gameTypes() {
      return Object.keys(this.gameState.getGameTypes).map((key) => ({title:this.gameState.getGameTypes[key].name, value:key}))
    },
    disableLevelSelect() {
      if(this.gameType == "oneOfEach") {
        return false
      }
      return true
    },
    challenges() {
      return Object.keys(this.settings.getChallenges).map((key) => ({title:key + ": " + this.settings.getChallenges[key].name, value:key}))
    },
    challenge: {
      get() {
        return this.gameState.getChallenge
      },
      set(val) {
        this.requestedChallenge = val
        this.changeChallengeDialogState = true
      }
    }
  },
  methods: {
    restartGameRequest() {
      this.restartDialogState = true
    },
    restartGame() {
      this.gameState.reset();
      this.samples.reset();
    },
    changeMode() {
      this.gameState.setGameType(this.requestedGameType);
      this.restartGame()
    },
    changeLevel() {
      this.gameState.setLevel(this.requestedLevel);
      this.restartGame()
    },
    changeChallenge() {
      this.gameState.setChallenge(this.requestedChallenge)
      this.restartGame()
    }
  },
};
</script>