<script setup lang="ts">
import { STRIKE_VALUE, type Roll, isSpare, isStrike } from '@/scoring';
import { computed } from 'vue';

const props = defineProps<{
  index: number,
  rolls: Roll[],
  sum: number | null,
  lastFrame: boolean
}>()

const rolls = computed(() => {
  let rolls: (number | string)[] = props.rolls
  if (isSpare(props.rolls)) rolls[1] = '/'
  rolls = rolls.map(roll => roll === STRIKE_VALUE ? 'X' : roll)

  return rolls;
})
</script>

<template>
  <div class="frame">
    <div class="head">{{ index }}</div>
    <div class="body">
      <div class="scores">
        <div class="score-wrapper" v-for="(_, i) in lastFrame ? 3 : 2" :key="i">
          <span :class="rolls.length <= i ? 'hidden' : ''">
            {{ (rolls.length > i) ? rolls[i] : 0 }}
          </span>
        </div>
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

.scores .score-wrapper {
  flex: 1;
  text-align: center;
  padding: 3px;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
}

.scores .score-wrapper:first-child {
  border: none;
}

.sum {
  margin-top: 20px;
}

.hidden {
  visibility: hidden;
}
</style>