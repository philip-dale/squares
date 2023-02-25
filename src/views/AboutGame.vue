<template>
  <div class="about">
    <v-tabs v-model="instructionTab" fixed-tabs>
      <v-tab value="basics">Basics</v-tab>
      <v-tab value="merging">Merging</v-tab>
      <v-tab value="gameModes">Game Modes</v-tab>
    </v-tabs>

    <v-window class="tabsClass" v-model="instructionTab">
        <v-window-item value="basics">
          <img class="instruction_image" :src="require('../assets/Instructions_basic.png')"/>
        </v-window-item>
        <v-window-item value="merging">
          <img class="instruction_image" :src="require('../assets/Instructions_merge.png')"/>
        </v-window-item>
        <v-window-item value="gameModes">
          <img class="instruction_image" :src="require('../assets/Instructions_modes.png')"/>
        </v-window-item>
    </v-window>
  </div>
</template>

<script>
export default {
  name: "AboutGame",
  data() {
    return {
      instructionTab: null,
    };
  }
}
</script>

<style scoped>
.tabsClass {
  width: 100%;
}

.instruction_image {
  width: 100%;
}

</style>