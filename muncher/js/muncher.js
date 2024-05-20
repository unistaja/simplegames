const canvas = document.getElementById("myCanvas");
const width = (canvas.width = window.innerWidth);
let height = (canvas.height = 250);
const groundHeight = 50;
const ctx = canvas.getContext("2d");

drawBackground(width, height, groundHeight);
const muncher = new Muncher(150, 135, 65);
muncher.draw();
let munchie = new Munchie(190);
const munchieTypes = [Apple, Cherry, Pear];

function createRandomMunchie() {
    const munchieType = munchieTypes[Math.floor(Math.random() * munchieTypes.length)];
    let munchieX = Math.random() * (width - 2*munchie.radius) + munchie.radius;
    const newMunchie = new munchieType(munchieX);
    while (muncher.signedDistanceTo(newMunchie) < 0 && muncher.signedDistanceTo(newMunchie) > -2* muncher.radius) {
        newMunchie.x = Math.random() * (width - 2*munchie.radius) + munchie.radius;
    }
    return newMunchie;
}

window.addEventListener("keydown", (e)=> {
    if (e.keyCode == '37') {
       muncher.facingRight = false;
       muncher.isMoving = true;
    }
    else if (e.keyCode == '39') {
       muncher.facingRight = true;
       muncher.isMoving = true;
    }
});
window.addEventListener("keyup", ()=> {muncher.isMoving = false});

// main animation loop
let previousTimestamp = document.timeline.currentTime;
function animate(timestamp) {
    let elapsed = timestamp - previousTimestamp;
    if (elapsed > 100) { // game lost focus
        elapsed = 16;
    }
    previousTimestamp = timestamp;
    drawBackground(width, height, groundHeight);
    muncher.updatePosition(elapsed, munchie);
    if (muncher.checkEaten(munchie)) {
        munchie = createRandomMunchie();
    }
    muncher.draw();
    munchie.draw();

    window.requestAnimationFrame(animate)
 }
 animate(previousTimestamp);