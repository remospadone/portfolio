const chars = '!<>-_\\/[]{}—=+*^?#________';
const el = document.querySelector('.scramble-text');

class Scramble {
  constructor(el) {
    this.el = el;
    this.text = el.textContent.trim();
    this.original = this.text;
    this.queue = [];
    this.frame = 0;
    this.resolve = 0;
    this.running = true;
    this.update();
  }

  update() {
    if (!this.running) return;
    const output = [];
    const complete = this.frame - this.resolve;
    for (let i = 0, len = this.text.length; i < len; i++) {
      if (this.text[i] === ' ') {
        output.push(' ');
        continue;
      }
      if (this.frame <= i) {
        output.push(chars[Math.floor(Math.random() * chars.length)]);
      } else if (complete > i) {
        output.push(this.text[i]);
      } else {
        if (Math.random() < 0.28) {
          output.push(chars[Math.floor(Math.random() * chars.length)]);
        } else {
          output.push(this.text[i]);
        }
      }
    }
    this.el.textContent = output.join('');
    if (complete < this.text.length) {
      this.frame += 1;
      requestAnimationFrame(() => this.update());
    } else {
      this.el.classList.add('settled');
      this.running = false;
    }
  }
}

window.addEventListener('load', () => {
  if (!el) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.classList.add('settled');
    return;
  }
  new Scramble(el);
});
