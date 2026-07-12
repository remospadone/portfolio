let nodes = [];
let connections = [];
let time = 0;
let isMobile = false;

function setup() {
  isMobile = windowWidth < 768;
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('works-sketch');
  canvas.style('pointer-events', 'none');
  let count = isMobile ? 10 : 20;
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: random(width), y: random(height),
      vx: random(-0.4, 0.4), vy: random(-0.4, 0.4),
      size: random(2, 4), phase: random(TWO_PI)
    });
  }
}

function draw() {
  if (frameCount % (isMobile ? 3 : 2) !== 0) return;
  clear();
  time += 0.003;
  let mx = mouseX || width / 2;
  let my = mouseY || height / 2;
  for (let n of nodes) {
    let dx = mx - n.x, dy = my - n.y;
    let distN = sqrt(dx * dx + dy * dy);
    if (distN < 250) {
      let force = map(distN, 0, 250, 1.2, 0);
      n.vx += (dx / distN) * force * 0.04;
      n.vy += (dy / distN) * force * 0.04;
    }
    n.vx += sin(time + n.phase) * 0.015;
    n.vy += cos(time + n.phase * 1.3) * 0.015;
    n.vx *= 0.95; n.vy *= 0.95;
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0) n.x = width;
    if (n.x > width) n.x = 0;
    if (n.y < 0) n.y = height;
    if (n.y > height) n.y = 0;
  }
  connections = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      let d = dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
      if (d < 150) connections.push({ a: i, b: j, d: d });
    }
  }
  for (let c of connections) {
    let alpha = map(c.d, 0, 150, 60, 5);
    let sw = map(c.d, 0, 150, 1, 0.3);
    let r = map(c.d, 0, 150, 0, 255);
    let g = map(c.d, 0, 150, 240, 50);
    let b = map(c.d, 0, 150, 255, 100);
    stroke(r, g, b, alpha);
    strokeWeight(sw);
    line(nodes[c.a].x, nodes[c.a].y, nodes[c.b].x, nodes[c.b].y);
  }
  for (let n of nodes) {
    let d = dist(mx, my, n.x, n.y);
    let glow = map(d, 0, 250, 6, 1.5);
    let alpha = map(d, 0, 250, 200, 40);
    noStroke();
    fill(0, 240, 255, alpha);
    ellipse(n.x, n.y, n.size + glow * 0.5);
    fill(255, 255, 255, alpha * 0.4);
    ellipse(n.x, n.y, n.size * 0.4);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  isMobile = windowWidth < 768;
}
