const canvas = document.getElementById("myCanvas");
const width = (canvas.width = 400);
let height = (canvas.height = window.innerHeight);
const groundHeight = 100;
const ctx = canvas.getContext("2d");

let isFlying = false;
const rocketSpeed = 0.2;



let currentY = height - 350;

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
    drawSmiley();
  } else {
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

 window.addEventListener("keydown", ()=> {isFlying = true});
 window.addEventListener("keyup", ()=> {isFlying = false});