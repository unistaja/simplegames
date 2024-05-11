function drawBackground(width, height, groundHeight) {
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

  function drawMoon() {
    ctx.fillStyle="yellow";
    const startAngle = 5*Math.PI/3;
    const endAngle = startAngle - Math.PI;
    const radius = 75;
    ctx.beginPath();
    ctx.arc(200, 200, radius, startAngle, endAngle);

    const headingAngle = (startAngle + endAngle) / 2;
    const eclipseRadius = 90;
    const angle = Math.asin(radius / eclipseRadius);                
    const centerDistance = Math.cos(angle) * eclipseRadius;

    ctx.arc(Math.cos(headingAngle)*centerDistance + 200, Math.sin(headingAngle)*centerDistance + 200, eclipseRadius,  Math.PI + angle + headingAngle,  Math.PI - angle + headingAngle, true);
    ctx.fill();

  }

 function drawSmiley() {
    const center = 200;
    const radius = 75;

    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.fill();

    const eyeRadius = radius * 0.1;

    // eyes
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(center + radius / 3, center - radius/4, eyeRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(center - radius / 3, center - radius/4, eyeRadius, 0, 2 * Math.PI);
    ctx.fill();

    // mouth
    ctx.beginPath();
    ctx.arc(center, center, radius * 0.5, Math.PI / 4, Math.PI - Math.PI / 4);
    ctx.lineWidth = 2;
    ctx.stroke();
}