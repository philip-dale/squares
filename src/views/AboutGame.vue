<template>
  <div class="about">
    <v-tabs v-model="instructionTab" fixed-tabs>
      <v-tab value="basics">Basics</v-tab>
      <v-tab value="merging">Merging</v-tab>
      <v-tab value="gameModes">Game Modes</v-tab>
    </v-tabs>

    <v-window class="tabsClass" v-model="instructionTab">
        <v-window-item value="basics">
          <div class="instructionRow">
            <div class="instructionItem">
              <img class="instruction_image" v-if="darkMode" :src="require('../assets/top_section_dark.png')"/>
              <img class="instruction_image" v-else :src="require('../assets/top_section_light.png')"/>
            </div>
            <div class="instructionItem">
              <p class="instructionText" style="position: relative; top: 10px;">Samples have 6 Cells which can be 1 of 6 colours</p>
              <p class="instructionText" style="position: relative; top: 30px;">The Top Container is used to store and create new random Samples. To create a new random Sample, double click/tap on the container.</p>
            </div>
          </div>
          <div class="instructionRow">
            <div class="instructionItem">
              <p class="instructionText">Spawn new Samples from the Mergers. Add 3-5 Samples to the Left input, doube click/tap to spawn a new Sapmle. Samples can only be used 3 times</p>
              <p class="instructionText">Move Samples by clicking them, then clicking a new container or dragging them.</p>
            </div>
            <div class="instructionItem">
              <img class="instruction_image"  v-if="darkMode" :src="require('../assets/mid_section_dark.png')"/>
              <img class="instruction_image"  v-else :src="require('../assets/mid_section_light.png')"/>
            </div>
            
          </div>
          <div class="instructionRow">
            <div class="instructionItem">
              <img class="instruction_image"  v-if="darkMode" :src="require('../assets/bot_section_dark.png')"/>
              <img class="instruction_image"  v-else :src="require('../assets/bot_section_light.png')"/>
            </div>
            <div class="instructionItem">
              <p class="instructionText">Move Samples of a single colour into the bottom container to score</p>
            </div>
          </div>
          <!-- <img class="instruction_image" :src="require('../assets/Instructions_basic.png')"/> -->
        </v-window-item>
        <v-window-item value="merging">
          <p class="instructionText">when Merging to create a new sample, the Cells of the input Samples contribute to the new Sample.</p>
          <p class="instructionText">If there is more of one colour contributing to the Cell than any other, it will be the colour of the new Cell.</p>
          <p class="instructionText">If there are more than one colour that are equal largest, then one is picked at random.</p>
          <p class="instructionText">For example, below both the top Cells only have red in them so the output Cells are red. The two centre Cells have 2 red and 1 green Cell each, so the result is red.</p>
          <img class="instruction_image" v-if="darkMode" :src="require('../assets/merge1_dark.png')"/>
          <img class="instruction_image" v-else :src="require('../assets/merge1_light.png')"/>
          <p class="instructionText">In the next example, the top left Cell has a red blue and green input. As no colour is dominant, one is picked at random. This time green is chosen, but each time it could be different.</p>
          <img class="instruction_image" v-if="darkMode" :src="require('../assets/merge2_dark.png')"/>
          <img class="instruction_image" v-else :src="require('../assets/merge2_light.png')"/>
          <p class="instructionText">Each input Sample can only be used 3 times, and it fades each time it is used. After the 3rd use, it will disappear.</p>
          <!-- <img class="instruction_image" :src="require('../assets/Instructions_merge.png')"/> -->
        </v-window-item>
        <v-window-item value="gameModes">
          <p class="instructionHeading">Aim</p>
          <p class="instructionText">The aim of each Game Mode is to create Samples of a single colour using the mergers, then putting them in the Output container.</p>
          <p class="instructionHeading">Standard</p>
          <p class="instructionText">Create as many Single colour samples as possible. Game ends when you run out of space in the top container. Double click to create new random samples. The game level will increase as you go so it will get harder.</p>
          <p class="instructionHeading">Continuous</p>
          <p class="instructionText">This is the same as standard, but new Samples will automatically appear!</p>
          <p class="instructionHeading">One Of Each</p>
          <p class="instructionText">For the selected level, try to create one of each colour, as fast as possible</p>
          <!-- <img class="instruction_image" :src="require('../assets/Instructions_modes.png')"/> -->
        </v-window-item>
    </v-window>
  </div>
</template>

<script>
import { settingsStore } from "../stores/settings";

export default {
  name: "GameInstructions",
  data() {
    return {
      instructionTab: null,
    };
  },
  setup() {
    const settings = settingsStore();
    return {settings};
  },
  computed: {
    darkMode() {
      return this.settings.getDarkMode
    },
  },
}
</script>

<style scoped>
.tabsClass {
  width: 100%;
}

.instruction_image {
  width: 100%;
}

.instructionRow {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.instructionItem {
  width: 50%;
}

.instructionText {
  text-align: left;
  margin: 3px;
}

.instructionHeading {
  text-align: centre;
  margin: 6px;
  font-weight: bolder;
  text-decoration: underline;
}
</style>