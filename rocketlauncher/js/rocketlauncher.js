const canvas = document.getElementById("myCanvas");
const width = (canvas.width = 400);
let height = (canvas.height = window.innerHeight);
const groundHeight = 100;
const ctx = canvas.getContext("2d");

let isFlying = false;
const rocketSpeed = 0.2;

function drawBackground() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "green";
  ctx.fillRect(0, height - groundHeight, width, height);
}

// (x, y) - coordinates of rocket tip
function drawRocket(x, y) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(x + 25, y + 130);
  ctx.quadraticCurveTo(x + 70, y + 180, x + 50, y + 250);
  ctx.quadraticCurveTo(x + 45, y + 210, x + 25, y + 200);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x - 25, y + 130);
  ctx.quadraticCurveTo(x - 70, y + 180, x - 50, y + 250);
  ctx.quadraticCurveTo(x - 45, y + 210, x - 25, y + 200);
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x + 50, y + 100, x + 25, y + 200);
  ctx.lineTo(x - 25, y + 200);
  ctx.quadraticCurveTo(x - 50, y + 100, x, y);
  ctx.fill();

  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x + 19, y + 40, x + 17, y + 40);
  ctx.lineTo(x - 17, y + 40);
  ctx.quadraticCurveTo(x - 19, y + 40, x, y);
  ctx.fill();

  ctx.fillRect(x - 20, y + 200, 40, 10);

  ctx.fillStyle = "grey";
  ctx.beginPath();
  ctx.arc(x, y + 95, 18, 0, 2*Math.PI);
  ctx.fill();

  ctx.fillStyle = "lightblue";
  ctx.beginPath();
  ctx.arc(x, y + 95, 16, 0, 2*Math.PI);
  ctx.fill();
}

// (x, y) - coordinates of rocket tip
function drawFlamingRocket(x, y) {
  drawRocket(x, y);

  ctx.fillStyle = "orange";
  ctx.beginPath();
  ctx.moveTo(x + 18, y + 210);
  ctx.quadraticCurveTo(x + 19, y + 235, x, y + 250);
  ctx.quadraticCurveTo(x - 19, y + 235, x - 18, y + 210);
  ctx.fill();

  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.moveTo(x + 15, y + 210);
  ctx.quadraticCurveTo(x + 16, y + 230, x, y + 247);
  ctx.quadraticCurveTo(x - 16, y + 230, x - 15, y + 210);
  ctx.fill();
}

let currentY = height - 350;

// main animation loop
let previousTimestamp = document.timeline.currentTime;
function animate(timestamp) {
  let elapsed = timestamp - previousTimestamp;
  if (elapsed > 100) { // game lost focus
    elapsed = 16;
  }
  previousTimestamp = timestamp;
  drawBackground();

  currentY = isFlying ? Math.max(currentY - elapsed * rocketSpeed, 0) : Math.min(currentY + elapsed * rocketSpeed, height - 350);
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