# 🚀 Anmol Gupta — Personal Portfolio

> **Full Stack Developer & AI/ML Engineer**  
> Built from scratch with Three.js, GSAP, vanilla JS, and pure CSS — no frameworks, no build tools, just raw craft.

---

## 🌐 Live Preview

```
Open index.html via any static server:

npx serve .
# or
python -m http.server 3000
# then visit → http://localhost:3000
```

> ⚠️ Must be served over HTTP — ES Modules won't load over `file://` protocol.

---

## 👨‍💻 About This Project

I built this portfolio entirely from the ground up to represent who I am as a developer — someone who doesn't settle for templates or cookie-cutter designs. Every line of code here is intentional.

The design direction was **deep space / futuristic** — dark cosmos background, glowing cyan and violet accents, sharp geometric shapes floating in a live Three.js starfield. The goal was to make visitors feel like they've landed somewhere different, not just another developer portfolio.

Key things I focused on while building it:

- **Zero framework dependency** — no React, no Vue, no bundler. Pure ES Modules loaded directly in the browser.
- **Performance first** — all scroll listeners are `passive`, GPU-composited properties only on hover, `will-change` applied surgically, mobile gets a stripped-down Three.js scene so it never lags.
- **No flicker** — after multiple rounds of debugging, eliminated all repaint issues by removing `mix-blend-mode`, `backdrop-filter`, and `translateY` hover transforms that were causing layout thrashing against the WebGL canvas.
- **Clean architecture** — split from a monolithic HTML file into 15 separated files (5 CSS + 9 JS + 1 HTML) so every concern lives in exactly one place.
- **Real mobile experience** — not just responsive CSS. Custom hamburger drawer, touch-friendly targets, cursor hidden on mobile, Three.js geometry count halved, camera parallax disabled on mobile to prevent scroll jank.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| 3D Background | Three.js r128 |
| Animations | GSAP 3.12 |
| Scroll Effects | Intersection Observer API |
| Styling | Vanilla CSS (CSS Variables, Grid, Flexbox) |
| Scripting | Vanilla JS — ES Modules |
| Fonts | Google Fonts — Orbitron, Space Mono, Syne |
| Email Backend | EmailJS (free tier) |
| Hosting | Any static host — Vercel, Netlify, GitHub Pages |

---

## 📁 Project Structure

```
anmol-portfolio/
│
├── index.html                 ← Pure HTML markup, zero inline styles or scripts
│
├── css/
│   ├── base.css               ← CSS variables, reset, shared utility classes
│   ├── loader-cursor.css      ← Preloader screen + custom animated cursor
│   ├── navbar.css             ← Fixed navbar + hamburger button + mobile drawer
│   ├── sections.css           ← All section styles (Hero → Footer)
│   └── responsive.css         ← All @media breakpoints in one file
│
└── js/
    ├── main.js                ← Entry point — imports and initialises all modules
    ├── utils.js               ← Shared helpers (isMobile detection)
    ├── loader.js              ← Preloader progress animation
    ├── hero.js                ← GSAP staggered entrance animation
    ├── cursor.js              ← Custom cursor with laggy ring effect (desktop)
    ├── navbar.js              ← Scroll-aware nav background + hamburger menu
    ├── scene.js               ← Three.js starfield, floating shapes, camera parallax
    ├── scroll.js              ← Progress bar, scroll reveal, timeline animation
    └── contact.js             ← EmailJS form submission with mailto fallback
```

---

## ✨ Features

### 3D Background Scene
A live Three.js canvas runs as the fixed background — 4,000 stars, 20 floating wireframe geometric shapes (icosahedra, octahedra, tetrahedra), and two decorative torus rings. The scene reacts to mouse position (parallax) and scroll depth (camera drift). On mobile, geometry is automatically halved and parallax is disabled to keep 60fps.

### Custom Animated Cursor
A glowing cyan dot with a lagging ring follower. Positioned via `transform: translate()` (not `left/top`) to avoid layout reflow. Grows on hover over interactive elements. Hidden on touch devices.

### Sections
- **Hero** — staggered GSAP entrance with name, title, description, CTA buttons, and hackathon badges
- **About** — orbital "AG" orb with floating stat chips, bio, and tech stack tags
- **Skills** — 6 skill cards with animated progress bars that fill on scroll into view
- **Achievements** — stat counters, full hackathon trail (5 winners, 3 finalists, 2 organisers), awards
- **Projects** — 6 featured projects with top-border reveal animation on hover
- **Experience** — animated timeline that slides in from the left as you scroll
- **Contact** — info panel with all links + fully functional contact form

### Contact Form
Integrates with [EmailJS](https://www.emailjs.com/) for in-page sending (no server required). Falls back gracefully to `mailto:` if EmailJS isn't configured. See setup below.

### Mobile
- Hamburger button → slide-in drawer from the right
- Dark overlay with tap-to-close
- Body scroll locked while drawer is open
- All touch targets properly sized
- Three.js performance scaled down automatically

---

## ⚡ Performance Decisions

| Problem | Solution |
|---|---|
| Scroll lag | All `addEventListener('scroll', ...)` use `{ passive: true }` |
| Button/card hover flicker | Removed `translateY` transforms; hover only changes `box-shadow` + `opacity` (GPU-only) |
| Canvas repainting UI | `contain: strict` + `isolation: isolate` on `#bg-canvas` separates it from the paint tree |
| Cursor causing repaints | Removed `mix-blend-mode: screen`; cursor moves via `transform` not `left/top` |
| Backdrop-filter jank | Removed from all elements (nav, drawer, stat chips) — replaced with solid backgrounds |
| Mobile Three.js lag | Stars: 1,500 vs 4,000 · Shapes: 6 vs 20 · Rings: skipped · Pixel ratio capped at 1× |
| Scroll + rAF conflicts | Progress bar update and nav background change batched into single `requestAnimationFrame` |

---

## 📧 Setting Up the Contact Form

1. Create a free account at **[emailjs.com](https://www.emailjs.com/)**
2. Add an Email Service (Gmail works great)
3. Create an Email Template — use these variables in your template:
   - `{{from_name}}` — sender's name
   - `{{from_email}}` — sender's email
   - `{{subject}}` — message subject
   - `{{budget}}` — budget (optional)
   - `{{message}}` — the message body
4. Open `js/contact.js` and replace the three constants at the top:

```js
const EMAILJS_SERVICE  = 'your_service_id';
const EMAILJS_TEMPLATE = 'your_template_id';
const EMAILJS_KEY      = 'your_public_key';
```

Done. No backend, no server, completely free up to 200 emails/month.

---

## 🚀 Deployment

### Vercel (recommended — 30 seconds)
```bash
npm i -g vercel
cd anmol-portfolio
vercel
```

### Netlify
Drag and drop the `anmol-portfolio/` folder into [netlify.com/drop](https://app.netlify.com/drop)

### GitHub Pages
```bash
git init
git add .
git commit -m "initial commit"
gh repo create anmol-portfolio --public --source=. --push
# Enable Pages in repo Settings → Pages → Deploy from main branch
```

---

## 📬 Contact

| | |
|---|---|
| **Email** | anmol.8.gupta@gmail.com |
| **Phone** | +91 8076772278 |
| **GitHub** | [github.com/Anm0lGupta](https://github.com/Anm0lGupta) |
| **LinkedIn** | [linkedin.com/in/AnmolGupta](https://www.linkedin.com/in/AnmolGupta) |

---

## 📄 License

This portfolio is open for inspiration — feel free to study the code. Please don't deploy it as-is with your own name on it. Build your own thing; that's the whole point.

---

<div align="center">

**Designed & Built by Anmol Gupta**  
*"Experiences that don't just work — they wow."*

</div>
