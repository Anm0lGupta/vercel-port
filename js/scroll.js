// ============================================================
//  scroll.js — progress bar, section reveal, timeline animate
//  All scroll listeners are passive; updates batched in rAF
// ============================================================

export function initScroll() {
  const progressBar = document.getElementById('prog');
  let ticking = false;

  // ── Throttled scroll handler ────────────────────────────────
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        // Progress bar
        const scrolled = document.documentElement.scrollTop;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = (scrolled / maxScroll * 100) + '%';

        // Nav background (set up by navbar.js)
        if (typeof window._updateNav === 'function') window._updateNav();

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ── Intersection Observer: fade-in reveal ──────────────────
export function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('vs');

      // Animate skill bar if present
      const bar = entry.target.querySelector('.skbf');
      if (bar) {
        bar.style.transform = `scaleX(${entry.target.dataset.level || 0.8})`;
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.rv').forEach(el => observer.observe(el));
}

// ── Intersection Observer: timeline slide-in ───────────────
export function initTimeline() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      gsap.to(entry.target, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        delay: i * 0.15,
        ease: 'power3.out',
      });
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.tli').forEach(el => observer.observe(el));
}
