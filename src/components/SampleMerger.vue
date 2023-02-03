<template>
    <div class="merger">
        <div class="merger-input">
            <SampleContainer :id="id  + '_' + '1'" :canSpawn="false" :canDrop="true" :maxSamples="5"/>
        </div>
        <div class="merger-output">
            <SampleContainer :id="id + '_' + '2'" :canSpawn="false" :canDrop="false" :maxSamples="1"/>
        </div>
    </div>
</template>
  
<script>
import { samplesStore } from "../stores/samplesStore";
import SampleContainer from "@/components/SampleContainer.vue";

export default {
  name: "SampleMerger",
  components: {
    SampleContainer,
  },
  props: {
    id: String,
  },
  setup() {
    const samples = samplesStore();
    return { samples };
  },
};
</script>
  
<style scoped>
.merger {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
}

.merger-input {
    display: flex;
    flex-grow: 4;
    padding-right: 10px;
}

.merger-output {
    display: flex;
    flex-grow: 1
}
</style>