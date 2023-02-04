<template>
  <div class="sampleDisplay">
    <div v-for="y in this.settings.getSize.y" v-bind:key="y" class="displayRow">
      <div
        v-for="x in this.settings.getSize.x"
        v-bind:key="x"
        class="displayCell"
      >
        <PartDisplay :partId="this.samples.sample(this.parent, this.uid).parts[x - 1][y - 1]" :opacity="this.opacity"/>
        <!-- {{ this.samples.sample(this.parent, this.uid).parts[x - 1][y - 1] }} -->
      </div>
    </div>
  </div>
</template>
  
<script>
import { samplesStore } from "../stores/samplesStore";
import { settingsStore } from "../stores/settings";
import PartDisplay from "@/components/PartDisplay.vue";

export default {
  name: "SampleDisplay",
  props: {
    parent: String,
    uid: String,
  },
  components: {
    PartDisplay,
  },
  setup() {
    const samples = samplesStore();
    const settings = settingsStore();
    return { samples, settings };
  },
  computed: {
    opacity() {
      return this.samples.sample(this.parent, this.uid).lives / this.settings.getMaxLives
    }
  }
};
</script>
  
<style scoped>
.sampleDisplay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid #5c8d17;
  padding: 1px;
  margin: 2px;
  width: 4em;
  height: 4em;
}

.displayRow {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-grow: 1
}

.displayCell {
  
  flex-grow: 1
}
</style>