<template>
  <GDialog v-model="showDialogState" width="350px" persistent local>
    <div class="dialogWrapper">
      <div class="dialogContent">
        <div class="dialogTitle">{{ this.title }}</div>
        {{ this.message }}
      </div>
      <div class="dialogActions">
        <v-btn class="dialogBtn" @click="$emit('okBtn')">{{ this.okText }}</v-btn>
        <v-btn class="dialogBtn" @click="$emit('cancelBtn')">Cancel</v-btn>
      </div>
    </div>
  </GDialog>
</template>
      
<script>
import { settingsStore } from "../stores/settings";

export default {
  name: "OkCancelDialog",
  props: {
    title: {
        type: String,
        default: "title"
    },
    message: {
        type: String,
        default: "message"
    },
    okText: {
        type: String,
        default: "Ok"
    },
    showDialog: {
        type: Boolean,
        default: false
    },
  },
  setup() {
    const settings = settingsStore();
    return { settings };
  },
  computed:{
    showDialogState: {
      get() {
        return this.showDialog;
      },
      darkMode() {
        return this.settings.getDarkMode;
      },
    },
  }
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
</style>