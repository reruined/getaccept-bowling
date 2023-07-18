<script setup lang="ts">
import { MAX_PINS, FRAME_COUNT } from './Scoring'
import Frame from './components/Frame.vue'
</script>

<template>
  <div class="buttons">
    <button v-for="(n, i) in MAX_PINS + 1">{{ i }}</button>
  </div>
  <div class="frames">
    <Frame v-for="n in FRAME_COUNT" :index="n" :first-score="2" :second-score="3" :sum="5" />
  </div>
</template>

<style scoped></style>