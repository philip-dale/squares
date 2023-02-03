<template>
  <div class="game">
      <div class="stores">
        <SampleContainer id="1" :canSpawn="true" :canDrop="true" :maxSamples="30"/>
      </div>
      <div class="mergers">
        <SampleMerger id="2"/>
        <SampleMerger id="3"/>
        <SampleMerger id="4"/>
        <SampleContainer id="5" :canSpawn="false" :canDrop="true" :maxSamples="-1" :isSink="true"/>
      </div>
  </div>
</template>

<script>
import SampleContainer from "@/components/SampleContainer.vue";
import SampleMerger from "@/components/SampleMerger.vue";
export default {
  name: "GameView",
  components: {
    SampleContainer,
    SampleMerger,
  },
}
</script>

<style scoped>
.game {
  margin-top: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 0px;
}
.stores {
  width: 50%;
  padding: 10px;
}

.mergers {
  width: 50%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>