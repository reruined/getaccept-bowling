<script setup lang="ts">
const props = defineProps<{
  index: number,
  balls?: number[],
  sum?: number
}>()

function toScoreChar(ball: number) {
  return ball === 10 ? 'X' : ball
}

</script>

<template>
  <div class="frame">
    <div class="head">{{ index }}</div>
    <div class="body">
      <div class="scores">
        <span>{{ balls && toScoreChar(balls[0]) }}</span>
        <span class="second">{{ balls && toScoreChar(balls[1]) }}</span>
        <span v-if="balls && balls.length === 3" class="second">{{ balls && toScoreChar(balls[2]) }}</span>
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