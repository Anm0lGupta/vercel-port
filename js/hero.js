// ============================================================
//  hero.js — GSAP staggered entrance animation for hero section
//  Called by loader.js once the preloader finishes
// ============================================================

export function initHero() {
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .to('#he',   { opacity: 1, y: 0, duration: 0.8 }, 0.1)
    .to('#hn',   { opacity: 1, y: 0, duration: 1.0 }, 0.3)
    .to('#ht',   { opacity: 1, y: 0, duration: 0.8 }, 0.7)
    .to('#hd',   { opacity: 1, y: 0, duration: 0.8 }, 0.9)
    .to('#hbts', { opacity: 1, y: 0, duration: 0.8 }, 1.1)
    .to('#hbgs', { opacity: 1, y: 0, duration: 0.8 }, 1.3);
}
