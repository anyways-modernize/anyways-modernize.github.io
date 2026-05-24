// village.js — living village
(function () {

  // ── Landscape SVG (inline for animation control) ──
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 1440 220');
  svg.setAttribute('preserveAspectRatio', 'xMidYMax slice');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('landscape');
  svg.innerHTML = `
    <defs>
      <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0d141c" stop-opacity="0"/>
        <stop offset="100%" stop-color="#070d14" stop-opacity="1"/>
      </linearGradient>
      <!-- window glow filter -->
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    <rect x="0" y="0" width="1440" height="220" fill="url(#skyFade)"/>

    <!-- far mountains -->
    <polygon points="0,160 80,110 160,130 240,95 320,118 400,85 480,108 560,78 640,102 720,72 800,98 880,68 960,95 1040,65 1120,90 1200,62 1280,88 1360,70 1440,85 1440,220 0,220" fill="#0f1a25" opacity="0.9"/>

    <!-- mid hills -->
    <ellipse cx="200"  cy="195" rx="220" ry="45" fill="#0c1520"/>
    <ellipse cx="700"  cy="198" rx="280" ry="40" fill="#0c1520"/>
    <ellipse cx="1200" cy="195" rx="250" ry="42" fill="#0c1520"/>

    <!-- ground -->
    <rect x="0" y="205" width="1440" height="15" fill="#08111a"/>

    <!-- ── LEFT CLUSTER ── -->
    <rect x="95"  y="135" width="52" height="70" fill="#0b1520"/>
    <polygon points="89,137 153,137 121,108" fill="#111e2e"/>
    <rect x="107" y="148" width="13" height="16" fill="#ffd84d" opacity="0.30" class="win" id="w1"/>
    <rect x="127" y="148" width="13" height="16" fill="#ffd84d" opacity="0.20" class="win" id="w2"/>
    <rect x="117" y="172" width="14" height="33" fill="#0b1520"/>
    <rect x="95"  y="128" width="9" height="10" fill="#0b1520"/>
    <rect x="110" y="128" width="9" height="10" fill="#0b1520"/>
    <rect x="125" y="128" width="9" height="10" fill="#0b1520"/>
    <rect x="140" y="128" width="9" height="10" fill="#0b1520"/>
    <rect x="140" y="108" width="6" height="18" fill="#090f18"/>

    <rect x="38"  y="158" width="38" height="47" fill="#0b1520"/>
    <polygon points="33,160 81,160 57,138" fill="#111e2e"/>
    <rect x="48"  y="170" width="10" height="14" fill="#ffd84d" opacity="0.22" class="win" id="w3"/>
    <rect x="63"  y="170" width="10" height="14" fill="#ffd84d" opacity="0.15" class="win" id="w4"/>

    <rect x="160" y="166" width="32" height="39" fill="#0b1520"/>
    <polygon points="155,168 197,168 176,149" fill="#111e2e"/>
    <rect x="169" y="177" width="9" height="12" fill="#ffd84d" opacity="0.18" class="win" id="w5"/>

    <!-- ── CENTRE CLUSTER ── -->
    <rect x="665" y="128" width="38" height="85" fill="#0b1520"/>
    <polygon points="659,130 709,130 687,104" fill="#111e2e"/>
    <rect x="675" y="142" width="11" height="14" fill="#ffd84d" opacity="0.35" class="win" id="w6"/>
    <rect x="675" y="163" width="11" height="14" fill="#ffd84d" opacity="0.18" class="win" id="w7"/>
    <polygon points="684,104 690,104 687,88" fill="#ffd84d" opacity="0.25"/>
    <rect x="665" y="122" width="7" height="9" fill="#0b1520"/>
    <rect x="678" y="122" width="7" height="9" fill="#0b1520"/>
    <rect x="691" y="122" width="7" height="9" fill="#0b1520"/>

    <rect x="615" y="152" width="40" height="55" fill="#0b1520"/>
    <polygon points="610,154 660,154 635,132" fill="#111e2e"/>
    <rect x="624" y="164" width="11" height="15" fill="#ffd84d" opacity="0.24" class="win" id="w8"/>
    <rect x="641" y="164" width="11" height="15" fill="#ffd84d" opacity="0.18" class="win" id="w9"/>

    <rect x="718" y="155" width="36" height="52" fill="#0b1520"/>
    <polygon points="713,157 759,157 736,136" fill="#111e2e"/>
    <rect x="727" y="167" width="10" height="13" fill="#ffd84d" opacity="0.20" class="win" id="w10"/>

    <!-- ── RIGHT CLUSTER ── */
    <rect x="1240" y="140" width="58" height="68" fill="#0b1520"/>
    <polygon points="1234,142 1304,142 1269,115" fill="#111e2e"/>
    <rect x="1250" y="153" width="13" height="17" fill="#ffd84d" opacity="0.28" class="win" id="w11"/>
    <rect x="1272" y="153" width="13" height="17" fill="#ffd84d" opacity="0.22" class="win" id="w12"/>
    <rect x="1256" y="178" width="16" height="30" fill="#0b1520"/>
    <rect x="1244" y="112" width="6" height="20" fill="#090f18"/>
    <rect x="1293" y="112" width="6" height="20" fill="#090f18"/>

    <rect x="1185" y="158" width="38" height="50" fill="#0b1520"/>
    <polygon points="1180,160 1228,160 1204,139" fill="#111e2e"/>
    <rect x="1194" y="170" width="10" height="13" fill="#ffd84d" opacity="0.20" class="win" id="w13"/>
    <rect x="1211" y="170" width="10" height="13" fill="#ffd84d" opacity="0.15" class="win" id="w14"/>

    <rect x="1310" y="165" width="32" height="42" fill="#0b1520"/>
    <polygon points="1305,167 1347,167 1326,148" fill="#111e2e"/>
    <rect x="1319" y="176" width="9" height="12" fill="#ffd84d" opacity="0.18" class="win" id="w15"/>

    <!-- ── TREES ── -->
    <polygon points="215,205 225,168 235,205" fill="#09160e"/>
    <polygon points="213,196 225,160 237,196" fill="#0c1e14"/>
    <polygon points="237,206 246,172 255,206" fill="#09160e"/>
    <polygon points="235,198 246,165 257,198" fill="#0c1e14"/>
    <polygon points="460,150 470,118 480,150" fill="#09160e"/>
    <polygon points="458,142 470,112 482,142" fill="#0c1e14"/>
    <polygon points="485,152 494,125 503,152" fill="#09160e"/>
    <polygon points="760,206 770,172 780,206" fill="#09160e"/>
    <polygon points="758,197 770,165 782,197" fill="#0c1e14"/>
    <polygon points="782,207 791,175 800,207" fill="#09160e"/>
    <polygon points="1140,206 1150,170 1160,206" fill="#09160e"/>
    <polygon points="1138,198 1150,163 1162,198" fill="#0c1e14"/>
    <polygon points="1162,207 1171,174 1180,207" fill="#09160e"/>
    <polygon points="1370,205 1379,172 1388,205" fill="#09160e"/>
    <polygon points="1368,197 1379,165 1390,197" fill="#0c1e14"/>

    <!-- ── LANTERN POSTS ── -->
    <rect x="386" y="178" width="3" height="30" fill="#1a2838"/>
    <circle cx="387" cy="175" r="5" fill="#ffd84d" opacity="0.65" id="lamp1"/>
    <circle cx="387" cy="175" r="10" fill="#ffd84d" opacity="0.10" id="lamp1g"/>

    <rect x="880" y="178" width="3" height="30" fill="#1a2838"/>
    <circle cx="881" cy="175" r="5" fill="#ffd84d" opacity="0.60" id="lamp2"/>
    <circle cx="881" cy="175" r="10" fill="#ffd84d" opacity="0.09" id="lamp2g"/>

    <rect x="1060" y="179" width="3" height="29" fill="#1a2838"/>
    <circle cx="1061" cy="176" r="5" fill="#ffd84d" opacity="0.50" id="lamp3"/>
    <circle cx="1061" cy="176" r="10" fill="#ffd84d" opacity="0.08" id="lamp3g"/>

    <!-- ── SHADOW FIGURE (hidden by default, appears in window w6) ── -->
    <g id="shadow-figure" opacity="0" transform="translate(675, 142)">
      <!-- simple head + body silhouette inside window w6 (11x14) -->
      <ellipse cx="5" cy="3" rx="3" ry="3" fill="#0b1520"/>
      <rect x="2" y="6" width="6" height="7" fill="#0b1520"/>
    </g>

    <!-- ── CREATURE (cat silhouette, walks across ground) ── -->
    <g id="creature" transform="translate(-60, 195)" opacity="0">
      <!-- cat body -->
      <ellipse cx="18" cy="8" rx="12" ry="6" fill="#060e16"/>
      <!-- head -->
      <ellipse cx="28" cy="5" rx="6" ry="5" fill="#060e16"/>
      <!-- ears -->
      <polygon points="25,1 27,-3 29,1" fill="#060e16"/>
      <polygon points="29,1 31,-3 33,1" fill="#060e16"/>
      <!-- tail -->
      <path d="M6,8 Q-2,4 -1,0" stroke="#060e16" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- legs -->
      <rect x="10" y="13" width="3" height="5" fill="#060e16" rx="1"/>
      <rect x="16" y="13" width="3" height="5" fill="#060e16" rx="1"/>
      <rect x="22" y="13" width="3" height="5" fill="#060e16" rx="1"/>
    </g>
  `;
  document.body.appendChild(svg);

  // ── helpers ──
  const rand = (min, max) => Math.random() * (max - min) + min;
  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  // ── Window flicker ──
  const windows = Array.from(svg.querySelectorAll('.win'));
  const baseOpacity = {};
  windows.forEach(w => { baseOpacity[w.id] = parseFloat(w.getAttribute('opacity')); });

  async function flickerWindow(win) {
    const base = baseOpacity[win.id];
    // quick flicker
    const flickers = Math.floor(rand(1, 4));
    for (let i = 0; i < flickers; i++) {
      win.setAttribute('opacity', '0');
      await wait(rand(40, 120));
      win.setAttribute('opacity', base);
      await wait(rand(40, 100));
    }
    // then shut off for a while
    win.setAttribute('opacity', '0');
    await wait(rand(4000, 18000));
    // slowly fade back on
    win.setAttribute('opacity', base * 0.5);
    await wait(300);
    win.setAttribute('opacity', base);
  }

  async function windowLoop() {
    while (true) {
      await wait(rand(3000, 12000));
      const win = windows[Math.floor(Math.random() * windows.length)];
      flickerWindow(win);
    }
  }
  windowLoop();

  // ── Shadow figure in window ──
  const figure = svg.getElementById('shadow-figure');

  async function shadowLoop() {
    while (true) {
      // wait a long random time before appearing
      await wait(rand(15000, 45000));
      const win = svg.getElementById('w6');
      const winOpacity = parseFloat(win.getAttribute('opacity'));
      if (winOpacity < 0.1) continue; // window is off, skip

      // fade figure in
      figure.setAttribute('opacity', '0.85');
      await wait(rand(1500, 4000));
      // slowly move across window
      let x = 675;
      const dir = Math.random() > 0.5 ? 1 : -1;
      const steps = 20;
      for (let i = 0; i < steps; i++) {
        x += dir * 0.3;
        figure.setAttribute('transform', `translate(${x}, 142)`);
        await wait(80);
      }
      // fade out
      figure.setAttribute('opacity', '0');
    }
  }
  shadowLoop();

  // ── Creature walk ──
  const creature = svg.getElementById('creature');
  let creatureFlipped = false;

  async function creatureLoop() {
    while (true) {
      // long random wait before next appearance
      await wait(rand(20000, 60000));

      const startRight = Math.random() > 0.5;
      const startX = startRight ? -60 : 1460;
      const endX   = startRight ? rand(200, 1300) : rand(100, 1200);
      const dir     = startRight ? 1 : -1;

      // flip creature if going left
      if (dir === -1 && !creatureFlipped) {
        creature.setAttribute('transform', `translate(${startX}, 195) scale(-1,1) translate(-34,0)`);
        creatureFlipped = true;
      } else if (dir === 1 && creatureFlipped) {
        creature.setAttribute('transform', `translate(${startX}, 195)`);
        creatureFlipped = false;
      } else {
        creature.setAttribute('transform', `translate(${startX}, 195)`);
      }

      // fade in
      creature.setAttribute('opacity', '0');
      await wait(100);
      creature.setAttribute('opacity', '0.9');

      // walk slowly across
      let x = startX;
      const speed = rand(0.4, 0.9); // px per frame — very slow
      const frameTime = 40; // ms per frame

      while ((dir === 1 && x < endX) || (dir === -1 && x > endX)) {
        x += dir * speed;
        if (creatureFlipped) {
          creature.setAttribute('transform', `translate(${x}, 195) scale(-1,1) translate(-34,0)`);
        } else {
          creature.setAttribute('transform', `translate(${x}, 195)`);
        }
        await wait(frameTime);
      }

      // pause a moment then fade out
      await wait(rand(800, 2500));
      creature.setAttribute('opacity', '0');
    }
  }
  creatureLoop();

  // ── Lantern flicker ──
  const lamps = [
    { dot: svg.getElementById('lamp1'), glow: svg.getElementById('lamp1g'), base: 0.65, baseG: 0.10 },
    { dot: svg.getElementById('lamp2'), glow: svg.getElementById('lamp2g'), base: 0.60, baseG: 0.09 },
    { dot: svg.getElementById('lamp3'), glow: svg.getElementById('lamp3g'), base: 0.50, baseG: 0.08 },
  ];

  async function lampFlicker(lamp) {
    while (true) {
      await wait(rand(2000, 8000));
      const dim = rand(0.3, 0.55);
      lamp.dot.setAttribute('opacity', dim);
      lamp.glow.setAttribute('opacity', dim * 0.15);
      await wait(rand(60, 200));
      lamp.dot.setAttribute('opacity', lamp.base);
      lamp.glow.setAttribute('opacity', lamp.baseG);
    }
  }
  lamps.forEach(l => lampFlicker(l));

  // ── Fireflies ──
  for (let i = 0; i < 18; i++) {
    const f = document.createElement('div');
    f.className = 'firefly';
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

  // ── Mobile nav toggle ──
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

})();
