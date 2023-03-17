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
      <div class="sinks">
        <SampleContainer class="sink" id="5" containerType="sink"/>
      </div>
  </div>

  <GDialog v-model="gamePausedDialog" persistent width="350px" local>
    <div class="dialogWrapper">
      <div class="dialogContent">
        <div class="dialogTitle">Game Paused</div>
        Game Paused
      </div>
      <div class="actions">
        <v-btn class="dialogBtn" @click="this.gamePausedDialog = false">Play</v-btn>
      </div>
    </div>
  </GDialog>

  <GDialog v-model="gameOverDialog" persistent width="350px" local>
    <div class="dialogWrapper">
      <div class="dialogContent">
        <div class="dialogTitle">Game Over</div>
        Game Over, would you like to play again?
      </div>
      <div class="dialogActions">
        <v-btn class="dialogBtn" @click="this.gameState.reset(); this.samples.reset();">Play Again</v-btn>
      </div>
    </div>
  </GDialog>
</template>

<script>
import SampleContainer from "@/components/SampleContainer.vue";
import SampleMerger from "@/components/SampleMerger.vue";
import { gameStateStore } from "../stores/gameState"
import { samplesStore } from "../stores/samplesStore";

export default {
  name: "GameView",
  components: {
    SampleContainer,
    SampleMerger,
  },
  setup() {
    const gameState = gameStateStore();
    const samples = samplesStore();
    window.addEventListener('blur', () => {gameState.setGamePaused(true); gameState.setLocalStorage(); });
    window.addEventListener('onbeforeunload', () => {gameState.setLocalStorage()})
    return {gameState, samples};
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
    },
    gameOverDialog: {
      get() {
        return this.gameState.isGameOver
      }
    }
  }
}
</script>

<style scoped>
.game {
  margin-top: 0px;
  width: 100%;
  /* height: 100%; */
  display:block;
  flex-direction: column;
  justify-content: center;
  margin-left: 0px;
}
.stores {
  width: 100%;
  padding: 5px;
  height: 400px;
}
.sinks {
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
  height: 11vh;
  min-height: 11vh;
}

.spawn {
  width: 100%;
  height: 100%;
}
.mergers {
  padding-left: 5px;
  padding-right: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  height: 34vh;
  min-height: 34vh;
  width: 100%;
}

.sink {
  height: 8vh;
  min-height: 8vh;
}

.dialogWrapper {
  color: var(--primary-colour);
  background: var(--primary-background-colour);
}

.dialogContent {
  padding: 20px;
}

.dialogTitle {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
}

.dialogActions {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.dialogBtn {
  background-color: var(--btn-color-bg);
  color: var(--primary-colour);
}

</style>