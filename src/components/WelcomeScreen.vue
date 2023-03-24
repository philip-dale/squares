<template>
  <GDialog v-model="showDialogState" width="350px" persistent local style="z-index: 999999;">
    <div class="dialogWrapper">
      <div class="dialogContent">
        <div class="dialogTitle">Welcome To Squares Game</div>
        <p class="instructionText">The purpose of the game is to create squares of a single colour by merging other squares together.</p>
        <p class="instructionText">In Standard mode double click/tap the top box to create new samples.</p>
        <p class="instructionText">Drag them to one of the 3 mergers in the middle on the left. When you have 3 or more in there double tap and a new square will appear on the right. Squares are made of Cells. If there is more of one colour contributing to the Cell than any other, it will be the colour of the new Cell. If there are more than one colour that are equal largest, then one is picked at random.</p>
        <p class="instructionText">See instructions for full details and other game modes</p>
      </div>
      <div class="dialogActions">
        <v-btn class="dialogBtn" @click="$emit('playBtn')">Play</v-btn>
        <v-checkbox-btn v-model="showWelcome" label="Show Welcome Screen"></v-checkbox-btn>
      </div>
    </div>
  </GDialog>
</template>
        
<script>
import { settingsStore } from "../stores/settings";

export default {
  name: "WelcomeScreen",
  setup() {
    const settings = settingsStore();
    return { settings };
  },
  props: {
    showDialog: {
        type: Boolean,
        default: false
    },
  },
  computed: {
    showWelcome: {
      get() {
        return this.settings.getShowWelcome
      },
      set(val) {
        this.settings.setShowWelcome(val)
      }
    },
    showDialogState: {
      get() {
        return this.showDialog;
      },
    },
  },
};
</script>
  
  
  <style scoped>
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

.instructionText {
  text-align: left;
  margin: 10px;

}
</style>