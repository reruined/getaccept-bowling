<script setup lang="ts">
import type { Roll } from '@/scoring';

const props = defineProps<{
  index: number,
  rolls?: Roll[],
  sum?: number
}>()

function toScoreChar(roll: Roll) {
  return roll === 10 ? 'X' : roll
}

</script>

<template>
  <div class="frame">
    <div class="head">{{ index }}</div>
    <div class="body">
      <div class="scores">
        <span>{{ rolls && toScoreChar(rolls[0]) }}</span>
        <span class="second">{{ rolls && toScoreChar(rolls[1]) }}</span>
        <span v-if="rolls && rolls.length === 3" class="second">{{ rolls && toScoreChar(rolls[2]) }}</span>
      </div>
      <div class="sum">
        <span>{{ sum }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.frame {
  width: 100px;
  height: 100px;
  background-color: beige;
  margin: 5px 5px 5px 0;
  display: inline-block;
  border: 1px solid black;
  font-weight: bold;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.head {
  background-color: hwb(60 65% 25%);
  text-align: center;
  border-bottom: 2px solid black;
  padding: 3px 0;
}

.body {
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;
  justify-content: space-evenly;
}

.scores {
  display: flex;
  justify-content: space-evenly;
}

.scores span {
  flex: 1;
  text-align: center;
  padding: 3px;
}

.scores .second {
  border-left: 1px solid black;
  border-bottom: 1px solid black;
}

.sum {
  margin-top: 20px;
}
</style>