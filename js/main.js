// ============================================================
//  main.js — application entry point
//  Imports and wires every module in correct order
// ============================================================

import { initLoader }   from './loader.js';
import { initHero }     from './hero.js';
import { initCursor }   from './cursor.js';
import { initNavbar }   from './navbar.js';
import { initScene }    from './scene.js';
import { initScroll, initReveal, initTimeline } from './scroll.js';
import { initContact }  from './contact.js';

// Loader fires first; hands off to hero once complete
initLoader(initHero);

// Everything else can start immediately
initCursor();
initNavbar();
initScene();
initScroll();
initReveal();
initTimeline();
initContact();
