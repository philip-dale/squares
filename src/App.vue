<template>
  <v-app style="max-width: 500px; min-width: 400px; align-self: center; align-items: start;">
  <v-toolbar >
    <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-toolbar-title>Squares</v-toolbar-title>
    <v-spacer></v-spacer>
    <img class="mr-3" :src="require('./assets/squares.png')" height="48"/>
  </v-toolbar>
  <div>
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
<v-layout>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-btn flat>
        <router-link to="/">Play</router-link>
      </v-btn>
      <v-btn flat>
        <router-link to="/instructions">Instructions</router-link>
      </v-btn>
      <v-btn flat>
        <router-link to="/scores">Scores</router-link>
      </v-btn>
      <v-btn flat>
        <router-link to="/settings">Settings</router-link>
      </v-btn>
  </v-navigation-drawer>
</v-layout>
</template>

<script>
import { gameStateStore } from "./stores/gameState";

export default {
  setup() {
    const gameState = gameStateStore();
    gameState.init();
    return { gameState };
  },
  data: () => ({
    drawer: false,
  })
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
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
  flex-direction: column;
}
.mainview {
  flex-grow: 1;
}

nav {
  padding: 20px;
}

nav a {
  font-weight: bold;
  color: #2c4850;
}

nav a.router-link-exact-active {
  color: #425eb9;
}
</style>
