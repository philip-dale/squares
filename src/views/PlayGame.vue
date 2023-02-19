<template>
  <div class="game">
      <div class="stores">
        <SampleContainer class="spawn" id="1" containerType="spawn"/>
      </div>
      <div class="mergers">
        <SampleMerger id="2"/>
        <SampleMerger id="3"/>
        <SampleMerger id="4"/>
        <SampleContainer class="sink" id="5" containerType="sink"/>
      </div>
  </div>

  <GDialog v-model="gamePausedDialog">
    <div class="dialogWrapper">
      <div class="dialogContent">
        <div class="dialogTitle">Game Paused</div>
        Game Paused
      </div>
      <div class="actions">
        <v-btn @click="this.gamePausedDialog = false">Play</v-btn>
      </div>
    </div>
  </GDialog>
</template>

<script>
import SampleContainer from "@/components/SampleContainer.vue";
import SampleMerger from "@/components/SampleMerger.vue";
import { gameStateStore } from "../stores/gameState"

export default {
  name: "GameView",
  components: {
    SampleContainer,
    SampleMerger,
  },
  setup() {
    const gameState = gameStateStore();
    window.addEventListener('blur', () => {gameState.setGamePaused(true)});
    return {gameState};
  },
  created() {
    this.gameState.setGamePaused(true)
  },
  beforeUnmount() {
    this.gameState.setGamePaused(true)
  },
  computed: {
    gamePausedDialog: {
      get() {
        return this.gameState.getGamePaused
      },
      set(val) {
        this.gameState.setGamePaused(val)
      }
    }
  }
}
</script>

<style scoped>
.game {
  margin-top: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 0px;
}
.stores {
  width: 50%;
  padding: 5px;
}

.mergers {
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  height: 65vh;
  min-height: 65vh;
}

.sink {
  height: 6em;
  min-height: 6em;
  width: 49vw;
  min-width: 49vw;
  height: 16vh;
  min-height: 16vh;
}

.spawn {
  width: 49vw;
  min-width: 49vw;
}
</style>