let points = [];
let time = 0;
let palette = { r1: 255, g1: 0, b1: 170, r2: 0, g2: 240, b2: 255 };
let isMobile = false;

function setup() {
  isMobile = windowWidth < 768;
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('work-detail-sketch');
  canvas.style('pointer-events', 'none');
  let el = document.getElementById('work-detail-sketch');
  if (el && el.dataset.color) {
    let c = el.dataset.color.split(',');
    if (c.length === 6) {
      palette = { r1: +c[0], g1: +c[1], b1: +c[2], r2: +c[3], g2: +c[4], b2: +c[5] };
    }
  }
  let count = isMobile ? 12 : 25;
  for (let i = 0; i < count; i++) {
    points.push({
      x: random(width), y: random(height),
      z: random(0.5, 1.5),
      vx: random(-0.3, 0.3), vy: random(-0.3, 0.3),
      phase: random(TWO_PI)
    });
  }
}

function draw() {
  if (frameCount % (isMobile ? 3 : 2) !== 0) return;
  clear();
  time += 0.003;
  let mx = mouseX || width / 2;
  let my = mouseY || height / 2;
  for (let p of points) {
    let dx = mx - p.x, dy = my - p.y;
    let d = sqrt(dx * dx + dy * dy);
    if (d < 180) {
      let force = map(d, 0, 180, 1.5, 0);
      p.vx += (dx / d) * force * 0.015;
      p.vy += (dy / d) * force * 0.015;
    }
    p.vx += sin(time + p.phase) * 0.01;
    p.vy += cos(time * 0.7 + p.phase * 1.3) * 0.01;
    p.vx *= 0.96; p.vy *= 0.96;
    p.x += p.vx; p.y += p.vy;
    if (p.x < -50) p.x = width + 50;
    if (p.x > width + 50) p.x = -50;
    if (p.y < -50) p.y = height + 50;
    if (p.y > height + 50) p.y = -50;
  }
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let d = dist(points[i].x, points[i].y, points[j].x, points[j].y);
      if (d < 120) {
        let alpha = map(d, 0, 120, 30, 3);
        let r = lerp(palette.r1, palette.r2, d / 120);
        let g = lerp(palette.g1, palette.g2, d / 120);
        let b = lerp(palette.b1, palette.b2, d / 120);
        stroke(r, g, b, alpha);
        strokeWeight(0.4 + (points[i].z + points[j].z) * 0.15);
        line(points[i].x, points[i].y, points[j].x, points[j].y);
      }
    }
  }
  for (let p of points) {
    let d = dist(mx, my, p.x, p.y);
    let size = p.z * 2.5 + map(d, 0, 200, 3, 0);
    let alpha = map(d, 0, 300, 150, 15);
    let r = lerp(palette.r1, palette.r2, p.z);
    let g = lerp(palette.g1, palette.g2, p.z);
    let b = lerp(palette.b1, palette.b2, p.z);
    noStroke();
    fill(r, g, b, alpha);
    ellipse(p.x, p.y, size);
    if (p.z > 0.8) {
      fill(255, 255, 255, alpha * 0.15);
      ellipse(p.x, p.y, size * 0.35);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  isMobile = windowWidth < 768;
}
