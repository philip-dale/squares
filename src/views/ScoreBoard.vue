<template>
  <v-tabs v-model="tabGameType" fixed-tabs>
    <v-tab v-for="b in this.boards" :value="b.id" v-bind:key="b">{{
      b.name
    }}</v-tab>
  </v-tabs>

  <v-card-text>
    <v-window v-model="tabGameType">
      <v-window-item v-for="b in this.boards" :value="b.id" v-bind:key="b">
        <v-card v-if="b.id === 'oneOfEach' || b.id === 'challenge'">
          <v-tabs
            class="tabsClass"
            v-model="tabLevel"
            show-arrows
          >
            <v-tab v-for="l in b.values" :value="l.id" v-bind:key="l">{{
              l.id
            }}</v-tab>
          </v-tabs>
          <v-card-text class="tabsClass">
            <v-window v-model="tabLevel">
              <v-window-item v-for="l in b.values" :value="l.id" v-bind:key="l">
                <table>
                  <tr>
                    <th>Time</th>
                  </tr>
                  <tr v-for="s in l.scores" v-bind:key="s">
                    <td>{{ s.time/100 }}s</td>
                  </tr>
                </table>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
        <v-card v-else>
          <table>
            <tr>
              <th>Score</th>
              <th>Time</th>
            </tr>
            <tr v-for="s in b.values" v-bind:key="s">
              <td>{{ s.score }}</td>
              <td>{{ s.time/100 }}s</td>
            </tr>
          </table>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card-text>
</template>

<script>
import { gameStateStore } from "../stores/gameState";
import { scoreBoardStore } from "../stores/gameScores";

export default {
  name: "GameView",
  setup() {
    const gameState = gameStateStore();
    const scoreBoards = scoreBoardStore();
    return { gameState, scoreBoards };
  },
  data() {
    return {
      tabGameType: null,
      tabLevel: null,
    };
  },
  computed: {
    boards() {
      return Object.keys(this.scoreBoards.getScoreBoards).map((key) => ({
        id: key,
        name: this.gameState.getGameTypes[key].name,
        values: this.scoreBoards.getScoreBoards[key],
      }));
    },
  },
};
</script>

<style scoped>
th,
td {
  border: 1px solid;
}

table {
  border: 1px solid;
  width: 100%;
  background-color: var(--primary-background-colour);
  color: var(--primary-colour);
}

.tabsClass {
  background-color: var(--primary-background-colour);
  color: var(--primary-colour);
}
</style>