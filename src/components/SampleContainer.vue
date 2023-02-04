<template>
  <div
    class="sampleContainer"
    @drop="onDrop($event, this.id)"
    @dragover="preventDrop($event)"
    @dragenter="preventDrop($event)"
    @dblclick="dbclick()"
    :style="{'align-items':alignItems}"
  >
    <div
      v-for="s in this.samples.containerSamples(this.id)"
      v-bind:key="s"
      draggable="true"
      @dragstart="startDrag($event, s)"
    >
      <SampleDisplay :parent="s.parentId" :uid="s.uid" />
    </div>
  </div>
</template>

<script>
import { samplesStore } from "../stores/samplesStore";
import { settingsStore } from "../stores/settings";
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
    return { samples, settings };
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
      if (this.destroy) {
        this.samples.remove(parentId, uid);
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
  align-content: flex-start;
  justify-content: center;
  /* align-items: center; */
}
</style>