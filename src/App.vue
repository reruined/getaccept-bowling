<script setup lang="ts">
import { MAX_PINS, FRAME_COUNT } from './Scoring'
import store from './store'
import Frame from './components/Frame.vue'

const frames = store.getFrames()
</script>

<template>
  <div class="buttons">
    <button v-for="(_, i) in MAX_PINS + 1">{{ i }}</button>
  </div>
  <div class="frames">
    <Frame v-for="frame in frames" :key="frame.id" :index="frame.id" :balls="frame.balls" :sum="frame.sum" />
  </div>
</template>

<style scoped></style>