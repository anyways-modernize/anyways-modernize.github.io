// village.js — drop this before </body> on every page
// Injects the landscape SVG + fireflies. No dependencies.

(function () {
  // ── Landscape ──
  const img = document.createElement('img');
  img.src = '/landscape.svg';
  img.className = 'landscape';
  img.alt = '';
  document.body.appendChild(img);

  // ── Fireflies ──
  for (let i = 0; i < 18; i++) {
    const f = document.createElement('div');
    f.className = 'firefly';
    f.style.cssText = [
      `left:${Math.random() * 95}%`,
      `top:${10 + Math.random() * 60}%`,
      `--dur:${3 + Math.random() * 5}s`,
      `--del:${Math.random() * 6}s`,
      `--dx:${(Math.random() - 0.5) * 40}px`,
      `--dy:${(Math.random() - 0.5) * 30}px`,
    ].join(';');
    document.body.appendChild(f);
  }

  // ── Mobile nav toggle (index only) ──
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }
})();
