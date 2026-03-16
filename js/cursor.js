// ============================================================
//  cursor.js — custom animated cursor (desktop only)
//  Uses transform instead of left/top to avoid layout reflow
// ============================================================

import { isMobile } from './utils.js';

export function initCursor() {
  if (isMobile()) return;

  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  // Move dot instantly — no lag
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
  }, { passive: true });

  // Ring follows with smooth lerp
  (function trackRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
    requestAnimationFrame(trackRing);
  })();

  // Grow ring on interactive elements
  document.querySelectorAll('a, button, .skc, .pc, .hi, .stc, .cit').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cg'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cg'));
  });
}
