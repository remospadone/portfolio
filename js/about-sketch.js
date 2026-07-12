let rings = [];
let time = 0;
let isMobile = false;

function setup() {
  isMobile = windowWidth < 768;
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('about-sketch');
  canvas.style('pointer-events', 'none');
  let count = isMobile ? 4 : 6;
  for (let i = 0; i < count; i++) {
    rings.push({
      radius: 80 + i * 50,
      speed: random(-0.006, 0.006),
      phase: random(TWO_PI),
      weight: random(0.5, 1.5),
      sides: floor(random(3, 7)),
      hueOffset: random(TWO_PI)
    });
  }
}

function draw() {
  if (frameCount % (isMobile ? 3 : 2) !== 0) return;
  clear();
  time += 0.01;
  let mx = mouseX || width / 2;
  let my = mouseY || height / 2;
  let cx = width / 2, cy = height / 2;
  let distortion = dist(mx, my, cx, cy) * 0.02;
  push();
  translate(cx, cy);
  for (let i = 0; i < rings.length; i++) {
    let r = rings[i];
    let rot = time * r.speed * 20 + r.phase;
    let warp = sin(time * 2 + r.phase) * distortion * 0.3;
    let hueAngle = (time * 0.5 + r.hueOffset) % TWO_PI;
    let cr = map(sin(hueAngle), -1, 1, 0, 200);
    let cg = map(sin(hueAngle + TWO_PI / 3), -1, 1, 100, 255);
    let cb = map(sin(hueAngle + 2 * TWO_PI / 3), -1, 1, 100, 255);
    let alpha = map(distortion, 0, 30, 12, 35);
    let currentRadius = r.radius + sin(time * 1.5 + r.phase) * 10;
    stroke(cr, cg, cb, alpha);
    strokeWeight(r.weight);
    noFill();
    rotate(rot);
    if (r.sides === 0) {
      ellipse(0, warp, currentRadius * 2);
    } else {
      beginShape();
      for (let a = 0; a < TWO_PI; a += TWO_PI / r.sides) {
        let x = cos(a) * (currentRadius + warp);
        let y = sin(a) * (currentRadius + warp);
        vertex(x, y);
      }
      endShape(CLOSE);
    }
  }
  pop();
  let glowAlpha = map(distortion, 0, 30, 2, 10);
  let dotCount = isMobile ? 8 : 12;
  for (let i = 0; i < dotCount; i++) {
    let angle = time * 2 + i * TWO_PI / dotCount + (isMobile ? 0 : mouseX * 0.001);
    let rad = 140 + sin(time + i) * 30;
    let px = cx + cos(angle) * rad;
    let py = cy + sin(angle) * rad;
    noStroke();
    fill(0, 240, 255, glowAlpha);
    ellipse(px, py, 1 + glowAlpha * 0.15);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  isMobile = windowWidth < 768;
}
