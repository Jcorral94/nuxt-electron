<script setup>
import { SnowBall } from '../js/snow/SnowBall';
import { SnowBalls } from '../js/snow/SnowBalls';
const CANVAS = ref();
let CTX = ref();
const CANVAS_BACKGROUND_COLOR = 'black';
const NUMBER_OF_SNOWBALLS = 100;
const MAX_SNOWBALL_SIZE = 0.7;

let snowballs;
let snowBallWorld;

onMounted(() =>{
  console.log('canvas.......',CANVAS.value);
  CTX.value = CANVAS.value.getContext('2d');
  init();
});

window.addEventListener('resize', () => {
  canvasSize(innerWidth, innerHeight);
});
function init() {
  canvasSize(innerWidth, innerHeight);
  updateCanvas();
  snowballs = Array.from({ length: NUMBER_OF_SNOWBALLS }, (_, i) => {
    // return new SnowBall(CTX, CANVAS.width / 2, CANVAS.height / 2, 2, CANVAS);
    return new SnowBall(CTX.value, Math.random() * CANVAS.value.width, Math.random() * -10, Math.random() * MAX_SNOWBALL_SIZE, CANVAS.value);
  });
  snowBallWorld = new SnowBalls(snowballs);
  window.requestAnimationFrame(draw);
}
function canvasSize(width, height) {
  if (!CANVAS.value) return;

  CANVAS.value.width = width;
  CANVAS.value.height = height;
}
function updateCanvas() {
  CTX.value.fillStyle = CANVAS_BACKGROUND_COLOR;
  CTX.value.fillRect(0, 0, CANVAS.value.width, CANVAS.value.height);
}
function draw(timestamp) {
  updateCanvas();
  snowBallWorld.show(timestamp);
  window.requestAnimationFrame(draw);
}
</script>

<template>
  <header>
    Snow trickle
  </header>
  <main>
    <section>
      <canvas ref="CANVAS"></canvas>
    </section>
  </main>
  <footer>
    Made with ❤️
  </footer>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
body, #__nuxt{
  height: 100vh;
  width: 100vw;
}
header{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  height: 10%;
}
footer{
  display: flex;
  justify-content: center;
  height: 10%;
}
main{
  height: 80%;
}
</style>