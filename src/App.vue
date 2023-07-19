<script setup lang="ts">
import { MAX_PINS, FRAME_COUNT, MAX_BALL_VALUE } from './Scoring'
import store from './store'
import Frame from './components/Frame.vue'
import { computed } from 'vue';
import type { FrameData } from './FrameData';

const frames = computed(() => {
  return store.getFrames()
})

function addBall(ball: number) {
  if (!store.isFull()) store.addBall(ball)
}

function getActiveFrame(): FrameData {
  return frames.value[frames.value.length - 1]
}

function getMaxPins() {
  const activeFrame = getActiveFrame()

  if (activeFrame.isLastFrame()) {
    if (activeFrame.balls.length >= 1 && (activeFrame.balls[0] === MAX_BALL_VALUE || activeFrame.balls.reduce((sum, ball) => sum + ball) === MAX_BALL_VALUE)) {
      return MAX_PINS
    }
  }
  if (!activeFrame.isComplete() && activeFrame.balls.length > 0) {
    return MAX_PINS - activeFrame.balls[0]
  }

  return MAX_PINS
}
</script>

<template>
  <div class="buttons">
    <button class="reset" @click="store.reset()">Reset</button>
    <button v-for="(_, i) in getMaxPins() + 1" @click="addBall(i)">{{ i }}</button>
  </div>
  <div class="frames">
    <Frame v-for="frame in frames" :key="frame.id" :index="frame.id" :balls="frame.balls" :sum="frame.sum" />
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