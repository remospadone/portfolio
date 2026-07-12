let stars = [];
let time = 0;
let isMobile = false;

function setup() {
  isMobile = windowWidth < 768;
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('contacts-sketch');
  canvas.style('pointer-events', 'none');
  let count = isMobile ? 20 : 40;
  for (let i = 0; i < count; i++) {
    stars.push({
      x: random(width), y: random(height),
      z: random(0.3, 1), phase: random(TWO_PI),
      vx: random(-0.15, 0.15), vy: random(-0.15, 0.15),
      pulseSpeed: random(0.01, 0.025)
    });
  }
}

function draw() {
  if (frameCount % (isMobile ? 3 : 2) !== 0) return;
  clear();
  time += 0.002;
  let mx = mouseX || width / 2;
  let my = mouseY || height / 2;
  for (let s of stars) {
    let dx = mx - s.x, dy = my - s.y;
    let d = sqrt(dx * dx + dy * dy);
    if (d < 200) {
      let force = map(d, 0, 200, 2, 0);
      s.vx += (dx / d) * force * 0.008;
      s.vy += (dy / d) * force * 0.008;
      s.z = map(d, 0, 200, 1.5, 0.3);
    } else {
      s.z = lerp(s.z, 1, 0.02);
    }
    s.vx *= 0.96; s.vy *= 0.96;
    s.x += s.vx; s.y += s.vy;
    if (s.x < 0) s.x = width;
    if (s.x > width) s.x = 0;
    if (s.y < 0) s.y = height;
    if (s.y > height) s.y = 0;
  }
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      let d = dist(stars[i].x, stars[i].y, stars[j].x, stars[j].y);
      if (d < 100) {
        let alpha = map(d, 0, 100, 40, 2);
        let avgZ = (stars[i].z + stars[j].z) / 2;
        let r = map(avgZ, 0.3, 1.5, 50, 0);
        let g = map(avgZ, 0.3, 1.5, 200, 240);
        let b = 255;
        stroke(r, g, b, alpha);
        strokeWeight(avgZ * 0.4);
        line(stars[i].x, stars[i].y, stars[j].x, stars[j].y);
      }
    }
  }
  for (let s of stars) {
    let pulse = sin(time * 10 + s.phase) * 0.3 + 0.7;
    let size = s.z * 3.5 * pulse;
    let d = dist(mx, my, s.x, s.y);
    let alpha = map(d, 0, 300, 150, 30);
    let r = map(s.z, 0.3, 1.5, 100, 0);
    let g = map(s.z, 0.3, 1.5, 200, 240);
    let b = 255;
    noStroke();
    fill(r, g, b, alpha);
    ellipse(s.x, s.y, size);
    if (s.z > 0.8) {
      fill(255, 255, 255, alpha * 0.25);
      ellipse(s.x, s.y, size * 0.35);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  isMobile = windowWidth < 768;
}
