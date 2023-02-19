<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/settings">Settings</router-link>
  </nav>
  <div>{{ "Mode = " +  this.gameState.getGameTypeName + ", Level = " + this.gameState.getGameLevel.toString() + ", Score = " + this.gameState.getTotalCompleted.toString() }}</div>
  <div class="mainview">
    <router-view/>
  </div>
</template>

<script>
import { gameStateStore } from "./stores/gameState"

export default {
  setup() {
    const gameState = gameStateStore();
    gameState.init()
    return {gameState};
  },
}
</script>

<style>
html, body {
   height: 100%;
   width : 100%;
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
