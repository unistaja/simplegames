const canvas = document.getElementById("myCanvas");
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d");

let shapes = [new Smiley(200, 0)];

function addNewShape() {
  if (Math.random() <= 0.5) {
    shapes.push(new Smiley(Math.random() * width, 0, ctx));
  } else {
    shapes.push(new Star(Math.random() * width, 0, ctx));
  }
}
window.addEventListener("keydown", addNewShape);
canvas.addEventListener("touchstart", addNewShape);
window.addEventListener("resize", () => {
  width = (canvas.width = window.innerWidth);
  height = (canvas.height = window.innerHeight);
})

// main animation loop
let previousTimestamp = document.timeline.currentTime;
function animate(timestamp) {
  let elapsed = timestamp - previousTimestamp;
  if (elapsed > 100) { // game lost focus
    elapsed = 16;
  }
  previousTimestamp = timestamp;
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, width, height)

  shapes = shapes.filter(shape => shape.created > Date.now() - 20000);
  for (shape of shapes) {
    shape.updatePosition(elapsed);
    shape.draw();
  }

  for (let i = 0; i < shapes.length; i++) {
    for (let j = i+1; j < shapes.length; j++) {
      shapes[i].checkCollision(shapes[j]);
    }

  }

  window.requestAnimationFrame(animate)
 }
 animate(previousTimestamp);
