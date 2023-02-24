<template>
  <GDialog v-model="showDialogState">
    <div class="dialogWrapper">
      <div class="dialogContent">
        <div class="dialogTitle">{{ this.title }}</div>
        {{ this.message }}
      </div>
      <div class="dialogActions">
        <v-btn @click="$emit('okBtn')">{{ this.okText }}</v-btn>
        <v-btn @click="$emit('cancelBtn')">Cancel</v-btn>
      </div>
    </div>
  </GDialog>
</template>
      
<script>

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
  computed:{
    showDialogState: {
      get() {
        return this.showDialog;
      },
    },
  }
};
</script>


<style scoped>
.dialogWrapper {
  color: #000;
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
</style>