<template>
    <div class="merger">
        <div class="merger-input">
            <SampleContainer :id="id  + '_' + '1'" containerType="merge-in" :pairId="id + '_' + '2'"/>
        </div>
        <div class="merger-output">
            <SampleContainer :id="id + '_' + '2'" containerType="merge-out"/>
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
  padding-bottom: 5px;
}

.merger-input {
    display: flex;
    padding-right: 5px;
    min-height: 5em;
    width: 75%;
}

.merger-output {
    display: flex;
    min-height: 5em;
    width: 25%;
}
</style>