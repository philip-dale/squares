<template>
  <v-app class="squareApp" dark>
    <v-toolbar :color="darkMode ? 'grey-darken-2': 'gray'">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>Squares</v-toolbar-title>
      <v-spacer></v-spacer>
      <img class="mr-3" :src="require('./assets/squares.png')" height="48" />
    </v-toolbar>
    <div class="infoView">
      {{
        "Mode = " +
        this.gameState.getGameTypeName +
        ", Level = " +
        this.gameState.getGameLevel.toString() +
        ", Score = " +
        this.gameState.getTotalCompleted.toString()
      }}
    </div>
    <div class="mainview">
      <router-view />
    </div>
  </v-app>
  <v-layout class="drawLayout" :color="darkMode ? 'grey-darken-2': 'gray'">
    <v-navigation-drawer v-model="drawer" temporary :color="darkMode ? 'grey-darken-2': 'gray'">
      <v-btn flat :color="darkMode ? 'grey-darken-2': 'gray'">
        <router-link to="/">Play</router-link>
      </v-btn>
      <v-btn flat :color="darkMode ? 'grey-darken-2': 'gray'">
        <router-link to="/instructions">Instructions</router-link>
      </v-btn>
      <v-btn flat :color="darkMode ? 'grey-darken-2': 'gray'">
        <router-link to="/scores">Scores</router-link>
      </v-btn>
      <v-btn flat :color="darkMode ? 'grey-darken-2': 'gray'">
        <router-link to="/settings">Settings</router-link>
      </v-btn>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
import { gameStateStore } from "./stores/gameState";
import { scoreBoardStore } from "./stores/gameScores";
import { settingsStore } from "./stores/settings";

export default {
  setup() {
    const gameState = gameStateStore();
    const gameScores = scoreBoardStore();
    const settings = settingsStore();
    gameState.init();
    gameScores.init();
    return { gameState, settings };
  },
  computed: {
    darkMode() {
      return this.settings.getDarkMode;
    },
  },
  data: () => ({
    drawer: false,
  }),
};
</script>

<style>
@import "./assets/styles/variables.css";

html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  align-self: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.squareApp {
  max-width: 500px;
  min-width: 400px;
  align-self: center;
  align-items: flex-start;
  flex-grow: 1;
  display: flex;
}

.mainview {
  flex-grow: 1;
  background-color: var(--primary-background-colour);
  color: var(--primary-colour);
}

.infoView {
  background-color: var(--primary-background-colour);
  color: var(--primary-colour);
}

nav {
  padding: 20px;
}

nav a {
  font-weight: bold;
  color: var(--primary-colour);
}

nav a.router-link-exact-active {
  color: var(--primary-colour);
}

.drawLayout {
  display: flex;
  max-width: 1px;
}

</style>
