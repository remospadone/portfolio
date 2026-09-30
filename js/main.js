const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!isTouchDevice && cursor && cursorDot) {
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let dragging = false;
  let rafId = null;

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX - 2}px, ${mouseY - 2}px)`;
  }

  function animateCursor() {
    if (!dragging) {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      const s = cursor.classList.contains('cursor-hover') ? ' scale(1.8)' : '';
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)${s}`;
    }
    rafId = requestAnimationFrame(animateCursor);
  }

  document.addEventListener('mousemove', onMouseMove, { passive: true });

  document.addEventListener('dragstart', () => {
    dragging = true;
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
  });

  document.addEventListener('dragend', () => {
    dragging = false;
    cursor.style.opacity = '';
    cursorDot.style.opacity = '';
  });

  animateCursor();

  document.addEventListener('mouseover', (event) => {
    cursor.classList.toggle('cursor-hover', Boolean(event.target.closest('a, button, .work-card, .service-card, .skill-item, .social-link, .tool-tag, .contact-detail')));
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-grid').forEach(el => observer.observe(el));

const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

if (navbar && !reducedMotion) {
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    navbar.classList.toggle('nav-hidden', currentScrollY > lastScrollY && currentScrollY > 160);
    lastScrollY = currentScrollY;
  }, { passive: true });
}

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const mobileOverlay = document.getElementById('mobile-overlay');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('active');
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    mobileOverlay?.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      mobileOverlay?.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  mobileOverlay?.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    mobileOverlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
}

if (isTouchDevice && cursor) {
  cursor.style.display = 'none';
  if (cursorDot) cursorDot.style.display = 'none';
}
