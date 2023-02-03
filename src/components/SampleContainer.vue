<template>
    <!-- TODO Disable drop if not set -->
  <div
    class="sampleContainer"
    @drop="onDrop($event, this.id)"
    @dragover="preventDrop($event)"
    @dragenter="preventDrop($event)"
    @dblclick="spawn()"
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
import SampleDisplay from "@/components/SampleDisplay.vue";

export default {
  name: "SampleContainer",
  components: {
    SampleDisplay,
  },
  props: {
    id: String,
    canSpawn: Boolean,
    canDrop: Boolean,
    maxSamples: Number,
    isSink: {
        "type": Boolean,
        "default": false
    }
  },
  setup() {
    const samples = samplesStore();
    return { samples };
  },
  created() {
    this.samples.init(this.id);
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
      if(this.isSink) {
        this.samples.remove(parentId, uid);
      } else {
        this.samples.move(parentId, uid, newParent);
      }
      
    },
    spawn() {
      if (this.canSpawn) {
        this.samples.spawn(this.id);
      }
    },
    preventDrop(evt) {
        if(this.canDrop) {
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
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
</style>