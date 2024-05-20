function drawBackground(width, height, groundHeight) {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "green";
    ctx.fillRect(0, height - groundHeight, width, height);
}

class Muncher {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.facingRight = true;
        this.isMoving = false;
        this.mouthWidth = Math.PI/4; 
        this.mouthWidth = Math.PI/3; 
        this.speed = 0.2;
        this.mouthSpeed = 0.003;
        this.isMouthOpening = true;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        if (!this.facingRight) {
            ctx.scale(-1, 1);
        }
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc(0, 0, this.radius, 0, this.mouthWidth, true);
        ctx.lineTo(0, 0);
        ctx.lineTo(this.radius, 0);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "white";
        ctx.beginPath();
        const eyeRadius = this.radius*0.15;
        ctx.arc(this.radius/3, -this.radius*0.45, eyeRadius, 0, 2* Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "black";
        const pupilRadius = eyeRadius*0.7;
        ctx.arc(this.radius/3 + eyeRadius - pupilRadius, -this.radius*0.45, pupilRadius, 0, 2* Math.PI);
        ctx.fill();

        ctx.restore();
    }

    updatePosition(elapsedTime, munchie) {
        if (!this.isMoving) {
            return;
        }
        this.x += elapsedTime * this.speed * (this.facingRight ? 1 : -1);
        this.x = Math.max(Math.min(this.x, width - this.radius), this.radius);
        if (this.isCloseTo(munchie)) {
            this.isMouthOpening = false;
            this.mouthWidth = Math.PI/3;
        } else if (this.checkEaten(munchie)) {
            this.isMouthOpening = true;
            this.mouthWidth = 0.0001; // ensure not zero or muncher drawing will break
        } else {
            if (this.isMouthOpening) {
                this.mouthWidth += this.mouthSpeed * elapsedTime;
                if (this.mouthWidth >= Math.PI/3) {
                    this.isMouthOpening = false;
                    this.mouthWidth = 2*Math.PI/3 - this.mouthWidth;
                }
            } else {
                this.mouthWidth -= this.mouthSpeed * elapsedTime;
                if (this.mouthWidth <= 0.0001) {
                    this.isMouthOpening = true;
                    this.mouthWidth = -this.mouthWidth;
                }
            }
        }
    }

    signedDistanceTo(munchie) {
        if (this.facingRight) {
            return (munchie.x + munchie.radius) - (this.x + this.radius) ;
        } else {
            return (this.x - this.radius) - (munchie.x - munchie.radius);
        }
    }

    isCloseTo(munchie) {
        const dist = this.signedDistanceTo(munchie);
        return dist < this.radius && dist > 0; 
    }

    checkEaten(munchie) {
        const dist = this.signedDistanceTo(munchie);
        return dist <= 0 && dist > -(this.radius - 2* munchie.radius);
    }
    
}

class Munchie {
    constructor(x, y = 158, radius = 17) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw() {
        ctx.save();

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2* Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.restore();
    }

    drawLeaf(x, y, length, rotation, color="green") {
        ctx.save();
        ctx.fillStyle = color;
        ctx.translate(x, y);
        ctx.scale(length, length);
        ctx.rotate(rotation);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(0.3, -0.5, 1, 0);
        ctx.quadraticCurveTo(0.3, 0.5, 0, 0);
        ctx.fill();

        ctx.restore();
    }

}

class Cherry extends Munchie {
    draw() {
        ctx.save();
        const cherryRadius = this.radius/3;
        const dist = (this.radius - cherryRadius)/Math.SQRT2;

        ctx.strokeStyle = "sienna";
        ctx.lineWidth = cherryRadius/3;
        ctx.beginPath();
        ctx.moveTo(this.x - dist, this.y + dist);
        ctx.lineTo(this.x, this.y - 0.6*this.radius);
        ctx.lineTo(this.x + dist, this.y + dist);
        ctx.stroke();

        ctx.fillStyle = "crimson";
        ctx.beginPath();
        ctx.arc(this.x - dist, this.y + dist, cherryRadius, 0, 2* Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + dist, this.y + dist, this.radius/3, 0, 2* Math.PI);
        ctx.fill();

        this.drawLeaf(this.x, this.y - 0.6*this.radius, this.radius, 0);
        this.drawLeaf(this.x, this.y - 0.6*this.radius, this.radius, Math.PI);

        ctx.restore();
    }

}

class Apple extends Munchie {
    draw() {
        ctx.save();
        const appleStart = this.y - this.radius*0.5;

        ctx.strokeStyle = "sienna";
        ctx.lineWidth = this.radius/7;
        ctx.beginPath();
        ctx.moveTo(this.x, appleStart);
        ctx.quadraticCurveTo(this.x, this.y - this.radius, this.x + 0.1*this.radius, this.y - 0.9*this.radius);
        ctx.stroke();

        ctx.fillStyle = "crimson";
        ctx.beginPath();
        ctx.moveTo(this.x, appleStart);
        ctx.bezierCurveTo(this.x + 1.4*this.radius, this.y - 1.1*this.radius, this.x + 1.1*this.radius, this.y + 1.2*this.radius, this.x, this.y + this.radius * 0.8);
        ctx.bezierCurveTo(this.x - 1.1*this.radius, this.y + 1.2*this.radius, this.x - 1.4*this.radius, this.y - 1.1*this.radius, this.x, appleStart);
        ctx.fill();

        this.drawLeaf(this.x, this.y - 0.7*this.radius, 0.7*this.radius, 1.1*Math.PI);
        
        ctx.restore();
    }
}

class Pear extends Munchie {
    draw() {
        ctx.save();
        const pearMidY = this.y;
        const pearHalfWidth = this.radius*0.35;

        ctx.strokeStyle = "sienna";
        ctx.lineWidth = this.radius/7;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.radius*0.5);
        ctx.quadraticCurveTo(this.x, this.y - this.radius, this.x + 0.1*this.radius, this.y - 0.9*this.radius);
        ctx.stroke();

        ctx.fillStyle = "OliveDrab";
        ctx.beginPath();
        ctx.moveTo(this.x - pearHalfWidth, pearMidY);
        ctx.bezierCurveTo(this.x - pearHalfWidth, this.y - 0.9*this.radius, this.x + pearHalfWidth, this.y - 0.9*this.radius, this.x + pearHalfWidth, pearMidY);
        ctx.bezierCurveTo(this.x + 0.6*this.radius, this.y + 0.2*this.radius, this.x + 0.6*this.radius, this.y + this.radius, this.x, this.y + this.radius * 0.8);
        ctx.bezierCurveTo(this.x - 0.6*this.radius, this.y + this.radius, this.x - 0.6*this.radius, this.y + 0.2*this.radius, this.x - pearHalfWidth, pearMidY);
        
        ctx.fill();
        
        ctx.restore();
    }
}