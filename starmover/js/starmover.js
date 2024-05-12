const canvas = document.getElementById("myCanvas");
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d");

class Star {
    constructor(x, y, radius, color = "#ee0") {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color
    }
    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;

        ctx.moveTo(this.x, this.y - this.radius);
        ctx.lineTo(this.getCirclePointX(0.8 * Math.PI), this.getCirclePointY(0.8 * Math.PI));
        ctx.lineTo(this.getCirclePointX(-0.4 * Math.PI), this.getCirclePointY(-0.4 * Math.PI));
        ctx.lineTo(this.getCirclePointX(0.4 * Math.PI), this.getCirclePointY(0.4 * Math.PI));
        ctx.lineTo(this.getCirclePointX(-0.8 * Math.PI), this.getCirclePointY(-0.8 * Math.PI));
        ctx.fill();

        ctx.restore();
    }

    getCirclePointX(angle) {
        return this.x + this.radius * Math.cos(-Math.PI/2 + angle)
    }

    getCirclePointY(angle) {
        return this.y + this.radius * Math.sin(-Math.PI/2 + angle)
    }

    checkCollision(star) {
        const distanceSquared = (this.x - star.x) ** 2 + (this.y - star.y) ** 2;
        return (distanceSquared <= (this.radius + star.radius) ** 2) 
    }
    
}

const targetStarRadius = 30;
const targetStar = new Star(Math.random() * (width - 2* targetStarRadius) + targetStarRadius, Math.random() * (height - 2* targetStarRadius) + targetStarRadius, targetStarRadius, "blue");

canvas.onmousemove = (e) => {
    const radius = 50;
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,width,height);
    const star = new Star(e.clientX, e.clientY, radius);
    if (star.checkCollision(targetStar)) {
        targetStar.x = Math.random() * (width - 2* targetStarRadius) + targetStarRadius;
        targetStar.y = Math.random() * (height - 2* targetStarRadius) + targetStarRadius;

    }
    targetStar.draw();

    star.draw();

}