let waves = [];
let particles = [];
let time = 0;
let isMobile = false;

function setup() {
  isMobile = windowWidth < 768;
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('home-sketch');
  canvas.style('pointer-events', 'none');
  for (let i = 0; i < 3; i++) {
    waves.push({
      yoff: random(1000),
      amp: random(40, 80),
      freq: random(0.005, 0.012),
      speed: random(0.002, 0.005),
      color: [random([0, 255]), random([0, 240, 255]), random([0, 170, 255]), 25]
    });
  }
  let count = isMobile ? 12 : 30;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: random(width), y: random(height),
      size: random(2, 5),
      vx: random(-0.2, 0.2), vy: random(-0.2, 0.2),
      type: random(['circle', 'triangle', 'square']),
      hue: random([0, 60, 180, 300])
    });
  }
}

function draw() {
  if (frameCount % (isMobile ? 3 : 2) !== 0) return;
  clear();
  time += 0.005;
  for (let w of waves) {
    beginShape();
    let xoff = w.yoff;
    let step = isMobile ? 25 : 15;
    for (let x = -20; x <= width + 20; x += step) {
      let y = height / 2 + sin(x * w.freq + time * 3) * w.amp * 0.3;
      y += noise(xoff, time) * w.amp * 0.7;
      let alpha = map(sin(time * 2 + x * 0.01), -1, 1, 10, 35);
      stroke(w.color[0], w.color[1], w.color[2], alpha);
      strokeWeight(1);
      noFill();
      curveVertex(x, y + sin(time + w.yoff) * 20);
      xoff += 0.01;
    }
    endShape();
    w.yoff += w.speed;
  }
  let mx = mouseX || width / 2;
  let my = mouseY || height / 2;
  for (let p of particles) {
    let dx = mx - p.x, dy = my - p.y;
    let distP = sqrt(dx * dx + dy * dy);
    if (distP < 200) {
      let force = map(distP, 0, 200, 1.5, 0);
      p.vx += (dx / distP) * force * 0.015;
      p.vy += (dy / distP) * force * 0.015;
    }
    p.vx *= 0.97; p.vy *= 0.97;
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
    let alpha = map(distP, 0, 300, 180, 30);
    let r = 0, g = 0, b = 0;
    if (p.hue === 0) { r = 255; g = 0; b = 170; }
    else if (p.hue === 60) { r = 255; g = 204; b = 0; }
    else if (p.hue === 180) { r = 0; g = 240; b = 255; }
    else { r = 100; g = 50; b = 255; }
    fill(r, g, b, alpha);
    noStroke();
    push();
    translate(p.x, p.y);
    if (p.type === 'circle') ellipse(0, 0, p.size);
    else if (p.type === 'triangle') triangle(-p.size, p.size, p.size, p.size, 0, -p.size);
    else rectMode(CENTER);
    rect(0, 0, p.size, p.size);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  isMobile = windowWidth < 768;
}
