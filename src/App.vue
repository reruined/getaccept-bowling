<script setup lang="ts">
import { type Roll, pinsRemaining, FRAME_COUNT } from './scoring'
import store from './store'
import ScoreFrame from './components/ScoreFrame.vue'
import { computed } from 'vue';
import { FrameData } from './FrameData';
import { splitIntoFrameData } from './scoring';

const frames = computed(() => {
  const frames = splitIntoFrameData(store.rolls)

  // make sure we always have FRAME_COUNT frames
  for (let i = frames.length; i < FRAME_COUNT; i++) {
    frames.push(new FrameData(i + 1))
  }

  return frames
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
    <div class="pin-buttons" v-if="activeFrame">
      <button v-for="(_, i) in pinsRemaining(activeFrame.rolls, activeFrame.isLastFrame()) + 1"
        @click="addRoll(i as Roll)" :key="i">{{ i }}</button>
    </div>
    <span v-else>Total score = {{ frames[frames.length - 1].sum }}</span>
  </div>
  <div class="frames">
    <ScoreFrame v-for="frame in frames" :key="frame.id" :index="frame.id" :rolls="frame.rolls" :sum="frame.sum"
      :last-frame="frame.isLastFrame()" />
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