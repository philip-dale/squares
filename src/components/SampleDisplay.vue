<template>
  <div class="sampleDisplay">
    <div v-for="y in this.settings.getSize.y" v-bind:key="y" class="displayRow">
      <div
        v-for="x in this.settings.getSize.x"
        v-bind:key="x"
        class="displayCell"
      >
        {{ this.samples.sample(this.parent, this.uid).parts[x - 1][y - 1] }}
      </div>
    </div>
  </div>
</template>
  
<script>
import { samplesStore } from "../stores/samplesStore";
import { settingsStore } from "../stores/settings";

export default {
  name: "SampleDisplay",
  props: {
    parent: String,
    uid: String,
  },
  setup() {
    const samples = samplesStore();
    const settings = settingsStore();
    return { samples, settings };
  },
};
</script>
  
<style scoped>
.sampleDisplay {
  background-color: chocolate;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid #5c8d17;
  padding: 1px;
  margin: 2px;
}

.displayRow {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.displayCell {
  width: 1em;
  height: 1em;
}
</style>