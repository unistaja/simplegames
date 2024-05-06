class Shape {
  gravity = 0.001;

  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.velX = (Math.random() - 0.5) * 0.2;
    this.velY = (Math.random() - 0.5) * 0.2;
    this.ctx = ctx;
    this.created = Date.now();
  }

  draw() {
  }

  checkCollision(shape) {
  }

  getVerticalEdgeDistance() {
    return 0;
  }

  getHorizontalEdgeDistance() {
      return 0;
  }

  checkEdgeCollisions() {
    if (this.x - this.getHorizontalEdgeDistance() <= 0) {
      this.velX = -this.velX * 0.9;
      this.x = this.getHorizontalEdgeDistance();
    }
    if (this.x + this.getHorizontalEdgeDistance() >= width) {
      this.velX = -this.velX * 0.9;
      this.x = width - this.getHorizontalEdgeDistance();
    }

    if (this.y - this.getVerticalEdgeDistance() <= 0) {
       this.velY = -this.velY * 0.95;
       this.y = this.getVerticalEdgeDistance();
    }
    if (this.y + this.getVerticalEdgeDistance() >= height) {
       this.velY = -this.velY * 0.95;
       this.y = height - this.getVerticalEdgeDistance()
    }
  }

  updatePosition(elapsedTime) {
    this.x += elapsedTime * this.velX;
    this.y += elapsedTime * this.velY  + 0.5 * this.gravity * elapsedTime * elapsedTime;
    this.checkEdgeCollisions();
    this.velY += elapsedTime * this.gravity;
  }
}

class Circle extends Shape {
  radius = 25;

  draw() {
      ctx.beginPath();
      ctx.fillStyle = "yellow";
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
  }

  checkCollision(shape) {
    if (shape instanceof Circle) {
        const distanceSquared = (this.x - shape.x) ** 2 + (this.y - shape.y) ** 2;
        if (distanceSquared <= (this.radius + shape.radius) ** 2) {
            // https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional_collision_with_two_moving_objects
            const modifier = ((this.velX - shape.velX) * (this.x - shape.x) + (this.velY - shape.velY) * (this.y - shape.y))/distanceSquared;
            this.velX = this.velX - modifier * (this.x - shape.x);
            this.velY = this.velY - modifier * (this.y - shape.y);
            shape.velX = shape.velX + modifier * (this.x - shape.x);
            shape.velY = shape.velY + modifier * (this.y - shape.y);
        }
    }
  }

  getVerticalEdgeDistance() {
    return this.radius;
  }

  getHorizontalEdgeDistance() {
      return this.radius;
  }
}

class Smiley extends Circle {
  draw() {
      super.draw();
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.stroke();

      const eyeRadius = this.radius * 0.1;

      // eyes
      ctx.beginPath();
      ctx.arc(this.x + this.radius / 3, this.y - this.radius/4, eyeRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.x - this.radius / 3, this.y - this.radius/4, eyeRadius, 0, 2 * Math.PI);
      ctx.fill();

      // mouth
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 0.5, Math.PI / 4, Math.PI - Math.PI / 4);
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
  }
}

class Star extends Circle {
  draw() {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = "#ee0";

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
}