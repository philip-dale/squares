<template>
  <div class="outerContainer">
    <div
      class="sampleContainer"
      @drop="onDrop()"
      @dragover="preventDrop($event)"
      @dragenter="preventDrop($event)"
      @dblclick="dbclick()"
      @click="click()"
      :style="{'align-items':alignItems, 'align-content':alignItems, 'justify-content':alignItems}"
    >
      <div class="ifContainer" v-if="showGhosts" >
        <SampleDisplay
          v-for="s in this.settings.getmaxContibuters"
          v-bind:key="s"
          parent="" uid="" 
          :ghostId="s-1"
        />
      </div>
      <div class="ifContainer" v-else>
        <SampleDisplay
          v-for="s in this.samples.containerSamples(this.id)"
          v-bind:key="s"
          draggable="true"
          @dragstart="startDrag(s)"
          :parent="s.parentId"
          :uid="s.uid" 
        />
      </div>
    </div>
    <div class="counter" v-if="destroy">
      {{ this.gameState.getTotalCompleted  }}
    </div>
    <div class="counter" v-else>
      {{ currentItems + " / " + this.maxSamples  }}
    </div>
  </div>
</template>

<script>
import { samplesStore } from "../stores/samplesStore";
import { settingsStore } from "../stores/settings";
import { gameStateStore } from "../stores/gameState"
import SampleDisplay from "@/components/SampleDisplay.vue";


export default {
  name: "SampleContainer",
  components: {
    SampleDisplay,
  },
  props: {
    id: String,
    pairId: {
      type: String,
      default: ""
    },
    data() {
      return {
        timer : null
      }
    },
    containerType: {
      validator(value) {
        return ["spawn", "merge-in", "sink", "merge-out"].includes(value);
      },
    },
  },
  setup() {
    const samples = samplesStore();
    const settings = settingsStore();
    const gameState = gameStateStore();

    return { samples, settings, gameState};
  },
  created() {
    this.samples.init(this.id, this.maxSamples);
    if(this.settings.autoSpawn && this.canSpawn) {
      this.gameState.setSpawnTimer(this.autoSpawn, this.settings.getGameLevelDetails.spawnTime)
    }
  },
  computed: {
    canSpawn() {
      return this.samples.canSpawn(this.containerType)
    },
    canMoveTo() {
      return this.samples.canMoveTo(this.containerType)
    },
    destroy(){
      return this.samples.canDestroy(this.containerType)
    },
    maxSamples() {
      return this.settings.getContainerMax(this.containerType)
    },
    alignItems() {
      if(this.containerType === "spawn") {
        return 'flex-start'
      }
      return 'center'
    },
    showGhosts() {
      return this.containerType === "sink" && this.settings.getGameType === "standard"
    },
    currentItems() {
      return Object.keys(this.samples.containerSamples(this.id)).length
    }
  },
  methods: {
    dbclick() {
      switch(this.containerType) {
        case "spawn":
          this.spawn()
          return
        case "merge-in":
        this.samples.merge(this.id, this.pairId);
          return
      }
    },
    startDrag(sample) {
      this.samples.toggleSelect(sample.parentId, sample.uid)
    },
    onDrop() {
      this.samples.moveSelectedToContainer(this.containerType, this.id)
    },
    click() {
      this.samples.moveSelectedToContainer(this.containerType, this.id)
    },
    spawn() {
      if (this.canSpawn && this.samples.hasSpace(this.id)) {
        this.samples.spawn(this.id);
      }
    },
    autoSpawn() {
      if(this.canSpawn) {
        if(this.samples.hasSpace(this.id)) {
          this.samples.spawn(this.id);
          if(this.settings.autoSpawn && this.containerType === "spawn") {
            this.gameState.setSpawnTimer(this.autoSpawn, this.settings.getGameLevelDetails.spawnTime)
          }
        } else {
          console.log("Game Over")
          // TODO Game Over Message
        }
      }
    },
    preventDrop(evt) {
      if (this.canMoveTo && this.samples.hasSpace(this.id)) {
        evt.preventDefault();
      }
    },
  },
};
</script>

<style scoped>
.outerContainer {
  width: 100%;
  height: 100%;
  position: relative;
}

.sampleContainer {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 25px;
  border: 2px solid #5c8d17;
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
}

.ifContainer {
  display: flex;
  flex-wrap: wrap;
}

.counter {
  top: -0.25em;
  left: 2em;
  position: absolute;
  display: flex;
  border: 2px solid #5c8d17;
  border-radius: 5px;
  background-color: white;
  width: 3.5em;
  text-align: center;
  display: inline-block;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
</style>