<template>
  <div class="partDisplay" v-bind:style="{ background: this.settings.getColour(this.partId), opacity: this.opacity }"></div>
</template>
    
  <script>
  import { settingsStore } from "../stores/settings";
  
  export default {
    name: "PartDisplay",
    props: {
      partId: Number,
      opacity: Number,
    },
    setup() {
      const settings = settingsStore();
      return { settings };
    },
  };
  </script>
    
  <style scoped>
  .partDisplay {
    height: 100%;
    width: 100%;
    border-width: 1px;
    border-color: black;
    border-style: dotted;
    box-sizing: border-box;
  }
  
  </style>