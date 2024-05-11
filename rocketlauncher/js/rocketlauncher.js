const canvas = document.getElementById("myCanvas");
const width = (canvas.width = 400);
let height = (canvas.height = window.innerHeight);
const groundHeight = 100;
const ctx = canvas.getContext("2d");

let isFlying = false;
const rocketSpeed = 0.2;
let currentY = height - 350;
let hasBeeped = false;
let context = null;

// beep code from https://stackoverflow.com/questions/879152/how-do-i-make-javascript-beep
const beep = (freq = 200, duration = 300, vol = 100) => {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.connect(gain);
  oscillator.frequency.value = freq;
  oscillator.type = "sine";
  gain.connect(context.destination);
  gain.gain.value = vol * 0.01;
  oscillator.start(context.currentTime);
  oscillator.stop(context.currentTime + duration * 0.001);
}

// main animation loop
let previousTimestamp = document.timeline.currentTime;
function animate(timestamp) {
  let elapsed = timestamp - previousTimestamp;
  if (elapsed > 100) { // game lost focus
    elapsed = 16;
  }
  previousTimestamp = timestamp;
  drawBackground(width, height, groundHeight);

  currentY = isFlying ? Math.max(currentY - elapsed * rocketSpeed, 275) : Math.min(currentY + elapsed * rocketSpeed, height - 350);
  if (currentY === 275) {
    if (!hasBeeped) {
      hasBeeped = true;
      beep();
    }
    drawSmiley();
  } else {
    hasBeeped = false;
    drawMoon();
  }
  if (isFlying) {
    drawFlamingRocket(width/2, currentY);
  } else {
    drawRocket(width/2, currentY);
  }


  window.requestAnimationFrame(animate)
 }
 animate(previousTimestamp);

 window.addEventListener("keydown", ()=> {isFlying = true; context = context ?? new AudioContext()});
 window.addEventListener("keyup", ()=> {isFlying = false});