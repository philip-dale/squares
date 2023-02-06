<template>
  <div
    class="sampleContainer"
    @drop="onDrop($event, this.id)"
    @dragover="preventDrop($event)"
    @dragenter="preventDrop($event)"
    @dblclick="dbclick()"
    @click="click()"
    :style="{'align-items':alignItems, 'align-content':alignItems, 'justify-content':alignItems}"
  >
  <div class="ifContainer" v-if="showGhosts" >
      <div
        v-for="s in this.settings.getMaxParts"
        v-bind:key="s"
      >
        <SampleDisplay parent="" uid="" :ghostId="s-1"/>
      </div>
    </div>
    <div class="ifContainer" v-else>
      <div
        v-for="s in this.samples.containerSamples(this.id)"
        v-bind:key="s"
        draggable="true"
        @dragstart="startDrag($event, s)"
      >
        <SampleDisplay :parent="s.parentId" :uid="s.uid" />
      </div>
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
    return { samples, settings, gameState };
  },
  created() {
    this.samples.init(this.id, this.maxSamples);
  },
  computed: {
    canSpawn() {
      switch(this.containerType) {
        case "spawn":
          return true
      }
      return false
    },
    canDrop() {
      switch(this.containerType) {
        case "spawn":
        case "merge-in":
        case "sink":
          return true
      }
      return false
    },
    destroy(){
      switch(this.containerType) {
        case "sink":
          return true
      }
      return false
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
    }
  },
  methods: {
    startDrag(evt, sample) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("uid", sample.uid);
      evt.dataTransfer.setData("parentId", sample.parentId);
    },
    onDrop(evt, newParent) {
      const uid = evt.dataTransfer.getData("uid");
      const parentId = evt.dataTransfer.getData("parentId");
      if(uid == "" ) {
        return
      }
      const pureVal = this.samples.pureVal(parentId, uid)
      if (this.destroy) {
        if(pureVal != -1) {
          this.gameState.addCompletedSample(pureVal)
          this.samples.remove(parentId, uid);
        }
      } else {
        this.samples.move(parentId, uid, newParent);
      }
    },
    dbclick() {
      switch(this.containerType) {
        case "spawn":
          this.spawn()
          return
        case "merge-in":
          this.merge()
          return
      }
    },
    click() {
      const pureVal = this.samples.selectedPureVal()
      if (this.destroy) {
        if(pureVal != -1) {
          this.gameState.addCompletedSample(pureVal)
          this.samples.removeSelected();
        }
      } else if (this.samples.hasSpace(this.id)){
        this.samples.moveSelected(this.id)
      }
    },
    merge() {
      this.samples.merge(this.id, this.pairId);
    },
    spawn() {
      if (this.canSpawn && this.samples.hasSpace(this.id)) {
        this.samples.spawn(this.id);
      }
    },
    preventDrop(evt) {
      if (this.canDrop && this.samples.hasSpace(this.id)) {
        evt.preventDefault();
      }
    },
  },
};
</script>

<style scoped>
.sampleContainer {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 25px;
  border: 2px solid #5c8d17;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}

.ifContainer {
  display: flex;
  flex-wrap: wrap;
}

</style>