// ============================================================
//  navbar.js — scroll-aware background + mobile hamburger menu
// ============================================================

export function initNavbar() {
  const nav    = document.getElementById('nav');
  const hbg    = document.getElementById('hbg');
  const menu   = document.getElementById('mob-menu');
  const overlay = document.getElementById('mob-overlay');

  // ── Scroll-aware background ─────────────────────────────────
  // Handled inside the shared rAF tick in scroll.js → updateNav()
  // Exposed here so scroll.js can call it
  window._updateNav = () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(2,1,10,0.96)';
    } else {
      nav.style.background = 'linear-gradient(180deg,rgba(2,1,10,0.9),transparent)';
    }
  };

  // ── Mobile hamburger ────────────────────────────────────────
  function openMenu() {
    hbg.classList.add('open');
    menu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hbg.classList.remove('open');
    menu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hbg.addEventListener('click', () => {
    hbg.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  document.querySelectorAll('.mob-link').forEach(a => {
    a.addEventListener('click', closeMenu);
  });
}
