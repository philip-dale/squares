<template>
  <div>
    <div class="totalCount" v-if="ghostId != -1">{{ this.totalCount }}</div>
    <div class="outerDiv" v-bind:class="{'sampleDisplayStandard': !selected, 'sampleDisplaySelected': selected}">
      <div class="overlay" :style="this.overlayVisible"></div>
      <div class="left" :style="this.leftVisible"></div>
      <div class="right" :style="this.lifeRotation"></div>
      <div class="sampleDisplay" @click.stop='click()' @dblclick.stop='dbclick()'>
        <div v-for="y in this.settings.getSize.y" v-bind:key="y" class="displayRow">
          <div
            v-for="x in this.settings.getSize.x"
            v-bind:key="x"
            class="displayCell"
          >
            <PartDisplay v-if="ghostId === -1" :partId="this.samples.sample(this.parent, this.uid).parts[x - 1][y - 1]"/>
            <PartDisplay v-else :partId="ghostId"/>
          </div>
        </div>
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
    selected() {
      return this.samples.isSelected(this.parent, this.uid)
    },
    lifeRotation() {
      if(this.ghostId === -1) {
        let ratio = 1 - this.samples.sample(this.parent, this.uid).lives / this.settings.getMaxLives
        let offset = 180
        return "transform: rotate(" + (offset + (ratio * 360)).toString() + "deg);"
      }
      return "transform: rotate(180deg);"
    },
    leftVisible() {
      if(this.ghostId === -1) {
        if ((this.samples.sample(this.parent, this.uid).lives / this.settings.getMaxLives) > 0.5) {
          return "visibility: visible;"
        }
        return "visibility: hidden;"
      }
      return "visibility: visible;"
    },
    overlayVisible() {
      if(this.ghostId === -1) {
        if ((this.samples.sample(this.parent, this.uid).lives / this.settings.getMaxLives) > 0.5) {
          return "visibility: hidden;"
        }
        return "visibility: visible;"
      }
      return "visibility: hidden;"
    },
    totalCount() {
      if (this.gameState.getSamplesCompleted[this.ghostId] == null) {
        return 0
      }
      return this.gameState.getSamplesCompleted[this.ghostId]
    }
  },
  methods: {
    click() {
      if(this.ghostId === -1) {
        this.samples.toggleSelect(this.parent, this.uid)
      }
    },
    dbclick() {
      if(this.samples.pureVal(this.parent, this.uid) != -1) {
        this.samples.clearSelected()
        this.samples.removeContainerCompletedItem(this.parent, this.uid)
      }
    },
  }
};
</script>
  
<style scoped>

.outerDiv {
  overflow: hidden;
  border-radius: var(--primary-border-radius);
  border-style: solid;
  border-width: var(--primary-border-width);
  padding: 1px;
  margin: 2px;
  width: 3em;
  height: 3em;
  position: relative;
}

.overlay {
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: var(--primary-background-colour);
  transform-origin: right;
  transform: rotate(180deg);
}

.left{
  background-color: var(--life-bar-colour);
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.right {
  background-color: var(--life-bar-colour);
  width: 100%;
  height: 200%;
  position: absolute;
  top: -50%;
  left: -50%;
  transform-origin: right;
}

.sampleDisplay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  width: 2.4em;
  height: 2.4em;
  position: absolute;
  top: 0.18em;
  left: 0.18em;
  z-index: 2;
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

.totalCount {
  padding-top: 7px;
}
</style>