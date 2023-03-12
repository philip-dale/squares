<template>
  <div class="sampleDisplay" v-bind:class="{'sampleDisplayStandard': !selected, 'sampleDisplaySelected': selected}" @click.stop='click()'>
    <div v-for="y in this.settings.getSize.y" v-bind:key="y" class="displayRow">
      <div
        v-for="x in this.settings.getSize.x"
        v-bind:key="x"
        class="displayCell"
      >
        <PartDisplay v-if="ghostId === -1" :partId="this.samples.sample(this.parent, this.uid).parts[x - 1][y - 1]" :opacity="this.opacity"/>
        <PartDisplay v-else :partId="ghostId" :opacity="this.opacity"/>

      </div>
    </div>
  </div>
</template>
  
<script>
import { samplesStore } from "../stores/samplesStore";
import { settingsStore } from "../stores/settings";
import { gameStateStore } from "../stores/gameState"
import PartDisplay from "@/components/PartDisplay.vue";

export default {
  name: "SampleDisplay",
  props: {
    parent: String,
    uid: String,
    ghostId: {
      type: Number,
      default: -1,
    }
  },
  components: {
    PartDisplay,
  },
  setup() {
    const samples = samplesStore();
    const settings = settingsStore();
    const gameState = gameStateStore();
    return { samples, settings, gameState };
  },
  computed: {
    opacity() {
      if(this.ghostId === -1) {
        return this.samples.sample(this.parent, this.uid).lives / this.settings.getMaxLives
      } else {
        if(this.gameState.getSamplesCompleted[this.ghostId.toString()] > 0) {
          return 1
        } else {
          return 0.2
        }
      }
      
    },
    selected() {
      return this.samples.isSelected(this.parent, this.uid)
    }
  },
  methods: {
    click() {
      if(this.ghostId === -1) {
        this.samples.toggleSelect(this.parent, this.uid)
      }
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
  border-radius: var(--primary-border-radius);
  border-style: solid;
  border-width: var(--primary-border-width);
  padding: 1px;
  margin: 2px;
  width: 3em;
  height: 3em;
  
}
.sampleDisplayStandard {
  border-color: var(--primary-border);
} 

.sampleDisplaySelected {
  border-color: var(--primary-border-selected);
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