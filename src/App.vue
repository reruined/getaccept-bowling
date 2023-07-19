<script setup lang="ts">
import { type Roll, pinsRemaining } from './scoring'
import store from './store'
import Frame from './components/Frame.vue'
import { computed } from 'vue';

const frames = computed(() => {
  return store.getFrames()
})

const activeFrame = computed(() => {
  return frames.value.find(frame => !frame.isComplete())
})

function addRoll(roll: Roll) {
  if (!store.isFull()) store.addRoll(roll)
}
</script>

<template>
  <div class="buttons">
    <button class="reset" @click="store.reset()">Reset</button>
    <button v-if="activeFrame" v-for="(_, i) in pinsRemaining(activeFrame.rolls, activeFrame.isLastFrame()) + 1"
      @click="addRoll(i as Roll)">{{ i }}</button>
    <span v-else>Total score = {{ frames[frames.length - 1].sum }}</span>
  </div>
  <div class="frames">
    <Frame v-for="frame in frames" :key="frame.id" :index="frame.id" :rolls="frame.rolls" :sum="frame.sum" />
  </div>
</template>

<style scoped>
.buttons button {
  margin-right: 0.25em;
}

.buttons .reset {
  display: block;
  margin-bottom: 0.25em;
}
</style>