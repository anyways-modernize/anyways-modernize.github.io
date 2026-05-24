// village.js — drop before </body> on every page
(function () {

  // ── Landscape ──
  const img = document.createElement('img');
  img.src = '/css/landscape.svg';
  img.className = 'landscape';
  img.alt = '';
  document.body.appendChild(img);

  // ── Fireflies — stay BEHIND cards (z-index 1) ──
  for (let i = 0; i < 18; i++) {
    const f = document.createElement('div');
    f.className = 'firefly';
    // keep them in the upper 55% so they don't float over the landscape
    f.style.cssText = [
      `left:${Math.random() * 95}%`,
      `top:${5 + Math.random() * 50}%`,
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
