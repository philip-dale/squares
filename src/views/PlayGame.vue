<template>
  <div class="game">
      <div class="stores">
        <SampleContainer class="spawn" id="1" containerType="spawn"/>
      </div>
      <div class="mergers">
        <SampleMerger id="2"/>
        <SampleMerger id="3"/>
        <SampleMerger id="4"/>
        
      </div>
      <SampleContainer class="sink" id="5" containerType="sink"/>
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
  flex-direction: column;
  justify-content: center;
  margin-left: 0px;
}
.stores {
  width: 100%;
  padding: 5px;
  height: 350px;
}
.spawn {
  width: 100%;
  height: 100%;
}
.mergers {
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  height: 40vh;
  min-height: 40vh;
  width: 100%;
}

.sink {
  height: 10vh;
  min-height: 10vh;
}


</style>