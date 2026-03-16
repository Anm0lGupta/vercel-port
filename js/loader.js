// ============================================================
//  loader.js — preloader progress bar animation
//  Calls initHero() (defined in hero.js) once complete
// ============================================================

export function initLoader(onComplete) {
  const fill = document.getElementById('lbf');
  const pct  = document.getElementById('lpct');
  const ldr  = document.getElementById('ldr');
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 10 + 3;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        ldr.classList.add('hd');
        if (typeof onComplete === 'function') onComplete();
      }, 350);
    }
    fill.style.width = progress + '%';
    pct.textContent  = Math.round(progress) + '%';
  }, 60);
}
