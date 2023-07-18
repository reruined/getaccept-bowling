<script setup lang="ts">
</script>

<template>
  <div class="frame">
    <div class="head">1</div>
    <div class="body">
      <div class="scores">
        <span>2</span>
        <span class="second">3</span>
      </div>
      <div class="sum">
        <span>5</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.frame {
  width: 100px;
  height: 100px;
  background-color: beige;
  margin: 5px;
  display: inline-block;
  border: 1px solid black;
  font-weight: bold;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.head {
  background-color: hwb(60 65% 25%);
  text-align: center;
  border-bottom: 2px solid black;
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