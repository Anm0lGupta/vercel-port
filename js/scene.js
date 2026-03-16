// ============================================================
//  scene.js — Three.js starfield + floating shapes background
//  Performance: reduced geometry on mobile, passive listeners,
//  camera parallax disabled on mobile to prevent scroll lag
// ============================================================

import { isMobile } from './utils.js';

export function initScene() {
  const canvas = document.getElementById('bg-canvas');
  const mobile = isMobile();

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !mobile,
    alpha: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // ── Stars ──────────────────────────────────────────────────
  const starCount = mobile ? 1500 : 4000;
  const starGeo   = new THREE.BufferGeometry();
  const starPos   = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 250;
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));

  const stars = new THREE.Points(
    starGeo,
    new THREE.PointsMaterial({ color: 0xffffff, size: mobile ? 0.14 : 0.1, transparent: true, opacity: 0.55 })
  );
  scene.add(stars);

  // ── Floating wireframe shapes ───────────────────────────────
  const shapes     = [];
  const shapeCount = mobile ? 6 : 20;
  const geometries = [
    new THREE.IcosahedronGeometry(0.4, 0),
    new THREE.OctahedronGeometry(0.35, 0),
    new THREE.TetrahedronGeometry(0.4, 0),
  ];
  const matCyan   = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.18 });
  const matPurple = new THREE.MeshBasicMaterial({ color: 0x7c3aed, wireframe: true, transparent: true, opacity: 0.14 });

  for (let i = 0; i < shapeCount; i++) {
    const mesh = new THREE.Mesh(geometries[i % 3], i % 3 === 0 ? matPurple : matCyan);
    mesh.position.set(
      (Math.random() - 0.5) * 22,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 10 - 2
    );
    mesh.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
    shapes.push({
      mesh,
      rotX: (Math.random() - 0.5) * 0.005,
      rotY: (Math.random() - 0.5) * 0.007,
      originY: mesh.position.y,
      floatOffset: Math.random() * Math.PI * 2,
    });
    scene.add(mesh);
  }

  // ── Decorative rings (desktop only) ────────────────────────
  if (!mobile) {
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(3, 0.012, 2, 80),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.07 })
    );
    ring1.rotation.x = Math.PI * 0.3;
    scene.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(5, 0.008, 2, 80),
      new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.05 })
    );
    ring2.rotation.x = Math.PI * 0.4;
    scene.add(ring2);

    scene._ring1 = ring1;
    scene._ring2 = ring2;
  }

  // ── Reactive state ──────────────────────────────────────────
  let scrollY = 0, mouseNX = 0, mouseNY = 0, time = 0;

  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  if (!mobile) {
    document.addEventListener('mousemove', e => {
      mouseNX = (e.clientX / window.innerWidth  - 0.5);
      mouseNY = (e.clientY / window.innerHeight - 0.5);
    }, { passive: true });
  }

  // ── Render loop ─────────────────────────────────────────────
  (function animate() {
    requestAnimationFrame(animate);
    time += 0.008;

    stars.rotation.y += 0.0001;
    if (!mobile) stars.rotation.x += 0.00004;

    if (scene._ring1) {
      scene._ring1.rotation.z += 0.0008;
      scene._ring2.rotation.z -= 0.0005;
    }

    shapes.forEach(({ mesh, rotX, rotY, originY, floatOffset }) => {
      mesh.rotation.x += rotX;
      mesh.rotation.y += rotY;
      mesh.position.y  = originY + Math.sin(time + floatOffset) * 0.5;
    });

    if (!mobile) {
      camera.position.y += ((-scrollY * 0.0015) - camera.position.y) * 0.05;
      scene.rotation.y  += (mouseNX * 0.003 - scene.rotation.y)  * 0.04;
      scene.rotation.x  += (mouseNY * 0.002 - scene.rotation.x)  * 0.04;
    }

    renderer.render(scene, camera);
  })();

  // ── Resize ──────────────────────────────────────────────────
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }, 150);
  });
}
