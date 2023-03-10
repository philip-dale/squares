<template>
  <div class="outerContainer">
    <div
      class="sampleContainer"
      @dblclick.stop="dbclick()"
      @click.stop="click()"
      :style="{
        'align-items': alignItems,
        'align-content': alignItems,
        'justify-content': alignItems,
      }"
    >
      <div
        class="ifContainer"
        v-if="showGhosts"
        :style="{
          'align-items': alignItems,
          'align-content': alignItems,
          'justify-content': alignItems,
        }"
      >
        <SampleDisplay
          v-for="s in this.gameState.getmaxContibuters"
          v-bind:key="s"
          parent=""
          uid=""
          :ghostId="s - 1"
        />
      </div>
      <draggable
        class="sinkDropClass"
        ghostClass="sinkGhostClass"
        v-if="showGhosts"
        v-model="ghostSamples"
        item-key="id"
        group="samples">
        <template #item="{element}">
          <SampleDisplay
            parent=""
            uid=""
            :ghostId="element.id"
          />
        </template>
      </draggable>

      <draggable
        class="ifContainer"
        v-else
        :style="{
          'align-items': alignItems,
          'align-content': alignItems,
          'justify-content': alignItems,
        }"
        v-model="containerSamples"
        @start="startDrag($event)"
        group="samples"
        item-key="id"
      >
        <template #item="{ element }">
          <SampleDisplay :parent="element.parentId" :uid="element.uid" />
        </template>
      </draggable>
    </div>
    <div class="counter" v-if="destroy">
      {{ this.gameState.getTotalCompleted }}
    </div>
    <div class="counter" v-else>
      {{ currentItems + " / " + this.maxSamples }}
    </div>
    <v-snackbar v-model="this.snackbar" timeout="2000">
      {{ snackMessage }}
    </v-snackbar>
  </div>
</template>

<script>
import { samplesStore } from "../stores/samplesStore";
import { settingsStore } from "../stores/settings";
import { gameStateStore } from "../stores/gameState";
import SampleDisplay from "@/components/SampleDisplay.vue";

import draggable from "vuedraggable";

export default {
  name: "SampleContainer",
  components: {
    SampleDisplay,
    draggable,
  },
  props: {
    id: String,
    pairId: {
      type: String,
      default: "",
    },
    containerType: {
      validator(value) {
        return ["spawn", "merge-in", "sink", "merge-out"].includes(value);
      },
    },
  },
  data() {
    return {
      snackMessage: "",
      snackbar: false,
    };
  },
  setup() {
    const samples = samplesStore();
    const settings = settingsStore();
    const gameState = gameStateStore();

    return { samples, settings, gameState };
  },
  created() {
    this.samples.init(this.id, this.maxSamples);
    if (this.canSpawn) {
      this.gameState.setSpawnTimer(
        this.autoSpawn,
        this.gameState.getGameLevelDetails.spawnTime
      );
    }
  },
  computed: {
    canSpawn() {
      return this.samples.canSpawn(this.containerType);
    },
    canMoveTo() {
      return this.samples.canMoveTo(this.containerType);
    },
    destroy() {
      return this.samples.canDestroy(this.containerType);
    },
    maxSamples() {
      return this.settings.getContainerMax(this.containerType);
    },
    alignItems() {
      if (this.containerType === "spawn") {
        return "flex-start";
      }
      return "center";
    },
    showGhosts() {
      return this.containerType === "sink";
    },
    currentItems() {
      return Object.keys(this.samples.containerSamples(this.id)).length;
    },
    containerSamples: {
      get() {
        let ret = Object.keys(this.samples.containerSamples(this.id)).map(
          (key) => ({
            uid: key,
            parentId: this.samples.containerSamples(this.id)[key].parentId,
            sortId: this.samples.containerSamples(this.id)[key].containerIndex,
          })
        );
        ret.sort(function (a, b) {
          return a.sortId - b.sortId;
        });
        return ret;
      },
      set(val) {
        this.onDrop();
        if (val.length > 1) {
          this.samples.organiseContainer(this.id, val);
        }
      },
    },
    ghostSamples: {
      get() {
        let ret = [];
        return ret;
      },
      set() {
        this.onDrop(-1);
      },
    },
  },
  methods: {
    dbclick() {
      let ret = null;
      switch (this.containerType) {
        case "spawn":
          this.spawn();
          return;
        case "merge-in":
          ret = this.samples.merge(this.id, this.pairId);
          if (ret != null) {
            this.snackMessage = ret;
            this.snackbar = true;
          }
          return;
      }
    },
    startDrag(evt) {
      let sample = this.containerSamples[evt.oldIndex];
      this.samples.toggleSelect(sample.parentId, sample.uid);
    },
    onDrop() {
      if (this.canMoveTo) {
        const ret = this.samples.moveSelectedToContainer(
          this.containerType,
          this.id
        );
        if (ret != null) {
          this.snackMessage = ret;
          this.snackbar = true;
        }
      }
    },
    click() {
      if (this.canMoveTo) {
        const ret = this.samples.moveSelectedToContainer(
          this.containerType,
          this.id
        );
        if (ret != null) {
          this.snackMessage = ret;
          this.snackbar = true;
        }
      } else {
        this.snackMessage = "Cannot Move here";
        this.snackbar = true;
      }
    },
    spawn() {
      if (this.canSpawn) {
        if (this.samples.hasSpace(this.id)) {
          this.samples.spawn(this.id);
        } else {
          this.gameState.spawnFull();
        }
      }
    },
    autoSpawn() {
      if (this.canSpawn) {
        if (this.samples.hasSpace(this.id)) {
          this.samples.spawn(this.id);
          if (this.canSpawn) {
            this.gameState.setSpawnTimer(
              this.autoSpawn,
              this.gameState.getGameLevelDetails.spawnTime
            );
          }
          this.snackMessage = "Auto Spawn";
          this.snackbar = true;
        } else {
          this.gameState.spawnFull();
        }
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
  /* min-height: 100%; */
  height: 100%;
  box-sizing: border-box;
  border-radius: 20px;
  border: 2px solid #5c8d17;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
}

.ifContainer {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
}

.counter {
  top: -0.25em;
  left: 1.2em;
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

.sinkGhostClass {
  opacity: 0;
  width: 0px;
  padding: 0px;
  border: 0px;
}

.sinkDropClass {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>