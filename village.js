(function () {

  // ── helpers ──
  const rand  = (a, b) => Math.random() * (b - a) + a;
  const randI = (a, b) => Math.floor(rand(a, b));
  const wait  = ms => new Promise(r => setTimeout(r, ms));

  // ── Inline SVG village ──
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 1440 240');
  svg.setAttribute('preserveAspectRatio', 'xMidYMax slice');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('landscape');

  svg.innerHTML = `
<defs>
  <linearGradient id="gnd" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#0d141c" stop-opacity="0"/>
    <stop offset="60%" stop-color="#080f18" stop-opacity="0.85"/>
    <stop offset="100%" stop-color="#060c14" stop-opacity="1"/>
  </linearGradient>
  <filter id="glow">
    <feGaussianBlur stdDeviation="2.5" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="softglow">
    <feGaussianBlur stdDeviation="4" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>

<!-- sky-to-ground fade — fills the full rectangle so no cliff -->
<rect x="0" y="0" width="1440" height="240" fill="url(#gnd)"/>

<!-- distant mountain silhouette -->
<polygon points="
  0,175 60,135 130,155 200,118 280,140 360,105
  440,128 520,98  600,120 680,90  760,115 840,85
  920,110 1000,80 1080,105 1160,78 1240,100 1320,82 1440,95
  1440,240 0,240"
  fill="#0b1824" opacity="0.95"/>

<!-- mid ground hills — blend into ground -->
<ellipse cx="180"  cy="215" rx="230" ry="50" fill="#090f1c"/>
<ellipse cx="720"  cy="218" rx="310" ry="48" fill="#090f1c"/>
<ellipse cx="1260" cy="215" rx="270" ry="50" fill="#090f1c"/>

<!-- flat ground plane -->
<rect x="0" y="220" width="1440" height="20" fill="#060c14"/>

<!-- ═══════════════ LEFT CLUSTER ═══════════════ -->

<!-- small cottage L1 -->
<rect x="30" y="170" width="44" height="55" rx="1" fill="#0a1520"/>
<polygon points="25,172 79,172 52,148" fill="#0d1e30"/>
<rect x="38" y="182" width="12" height="16" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1" id="wL1a-frame"/>
<rect x="38" y="182" width="12" height="16" rx="1" fill="#ffd84d" opacity="0.22" id="wL1a"/>
<rect x="56" y="182" width="12" height="16" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1" id="wL1b-frame"/>
<rect x="56" y="182" width="12" height="16" rx="1" fill="#ffd84d" opacity="0.18" id="wL1b"/>
<rect x="44" y="198" width="14" height="27" fill="#091219"/>

<!-- inn / tavern L2 (tallest) -->
<rect x="88" y="145" width="58" height="80" rx="1" fill="#0a1520"/>
<polygon points="82,147 152,147 120,118" fill="#0d1e30"/>
<!-- battlements -->
<rect x="88" y="138" width="10" height="12" fill="#0a1520"/>
<rect x="102" y="138" width="10" height="12" fill="#0a1520"/>
<rect x="116" y="138" width="10" height="12" fill="#0a1520"/>
<rect x="130" y="138" width="10" height="12" fill="#0a1520"/>
<rect x="144" y="138" width="10" height="12" fill="#0a1520"/>
<rect x="142" y="116" width="7" height="22" fill="#091219"/>
<!-- windows with outlines -->
<rect x="98"  y="158" width="14" height="18" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1"/>
<rect x="98"  y="158" width="14" height="18" rx="1" fill="#ffd84d" opacity="0.35" id="wL2a"/>
<rect x="120" y="158" width="14" height="18" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1"/>
<rect x="120" y="158" width="14" height="18" rx="1" fill="#ffd84d" opacity="0.28" id="wL2b"/>
<rect x="98"  y="184" width="14" height="18" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1"/>
<rect x="98"  y="184" width="14" height="18" rx="1" fill="#ffd84d" opacity="0.20" id="wL2c"/>
<!-- door -->
<rect x="113" y="196" width="18" height="29" rx="2" fill="#091219" stroke="#1a2838" stroke-width="1"/>

<!-- small house L3 -->
<rect x="162" y="178" width="36" height="47" rx="1" fill="#0a1520"/>
<polygon points="157,180 203,180 180,160" fill="#0d1e30"/>
<rect x="170" y="190" width="10" height="13" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1"/>
<rect x="170" y="190" width="10" height="13" rx="1" fill="#ffd84d" opacity="0.16" id="wL3a"/>
<rect x="183" y="190" width="10" height="13" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1"/>
<rect x="183" y="190" width="10" height="13" rx="1" fill="#ffd84d" opacity="0.14" id="wL3b"/>

<!-- LEFT PINES -->
<polygon points="222,225 232,192 242,225" fill="#081510"/>
<polygon points="220,216 232,185 244,216" fill="#0b1d15"/>
<polygon points="244,225 253,196 262,225" fill="#081510"/>
<polygon points="242,217 253,188 264,217" fill="#0b1d15"/>

<!-- ═══════════════ CENTRE CLUSTER ═══════════════ -->

<!-- house C1 -->
<rect x="595" y="162" width="46" height="63" rx="1" fill="#0a1520"/>
<polygon points="589,164 647,164 618,140" fill="#0d1e30"/>
<rect x="604" y="175" width="13" height="17" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1"/>
<rect x="604" y="175" width="13" height="17" rx="1" fill="#ffd84d" opacity="0.26" id="wC1a"/>
<rect x="623" y="175" width="13" height="17" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1"/>
<rect x="623" y="175" width="13" height="17" rx="1" fill="#ffd84d" opacity="0.20" id="wC1b"/>

<!-- tower C2 (tallest centre) -->
<rect x="655" y="130" width="44" height="95" rx="1" fill="#0a1520"/>
<polygon points="648,132 706,132 677,105" fill="#0d1e30"/>
<polygon points="674,105 680,105 677,88" fill="#ffd84d" opacity="0.3"/>
<rect x="655" y="123" width="8" height="10" fill="#0a1520"/>
<rect x="668" y="123" width="8" height="10" fill="#0a1520"/>
<rect x="681" y="123" width="8" height="10" fill="#0a1520"/>
<rect x="694" y="123" width="8" height="10" fill="#0a1520"/>
<!-- tower windows — w/ outlines + shadow window -->
<rect x="663" y="145" width="13" height="17" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1" id="wC2a-frame"/>
<rect x="663" y="145" width="13" height="17" rx="1" fill="#ffd84d" opacity="0.38" id="wC2a"/>
<rect x="681" y="145" width="13" height="17" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1" id="wC2b-frame"/>
<rect x="681" y="145" width="13" height="17" rx="1" fill="#ffd84d" opacity="0.30" id="wC2b"/>
<rect x="663" y="170" width="13" height="17" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1"/>
<rect x="663" y="170" width="13" height="17" rx="1" fill="#ffd84d" opacity="0.18" id="wC2c"/>
<!-- shadow figure window -->
<rect x="681" y="170" width="13" height="17" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1" id="shadow-win-frame"/>
<rect x="681" y="170" width="13" height="17" rx="1" fill="#ffd84d" opacity="0.22" id="shadow-win"/>
<!-- door -->
<rect x="669" y="196" width="16" height="29" rx="2" fill="#091219" stroke="#1a2838" stroke-width="1"/>

<!-- house C3 -->
<rect x="712" y="165" width="40" height="60" rx="1" fill="#0a1520"/>
<polygon points="706,167 758,167 732,144" fill="#0d1e30"/>
<rect x="720" y="178" width="11" height="15" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1"/>
<rect x="720" y="178" width="11" height="15" rx="1" fill="#ffd84d" opacity="0.22" id="wC3a"/>
<rect x="736" y="178" width="11" height="15" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1"/>
<rect x="736" y="178" width="11" height="15" rx="1" fill="#ffd84d" opacity="0.18" id="wC3b"/>

<!-- CENTRE PINES -->
<polygon points="565,225 574,196 583,225" fill="#081510"/>
<polygon points="563,217 574,188 585,217" fill="#0b1d15"/>
<polygon points="758,225 767,196 776,225" fill="#081510"/>
<polygon points="756,216 767,188 778,216" fill="#0b1d15"/>
<polygon points="778,226 787,198 796,226" fill="#081510"/>

<!-- ═══════════════ RIGHT CLUSTER ═══════════════ -->

<!-- house R1 -->
<rect x="1168" y="170" width="44" height="55" rx="1" fill="#0a1520"/>
<polygon points="1162,172 1218,172 1190,148" fill="#0d1e30"/>
<rect x="1176" y="182" width="12" height="16" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1"/>
<rect x="1176" y="182" width="12" height="16" rx="1" fill="#ffd84d" opacity="0.22" id="wR1a"/>
<rect x="1194" y="182" width="12" height="16" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1"/>
<rect x="1194" y="182" width="12" height="16" rx="1" fill="#ffd84d" opacity="0.17" id="wR1b"/>

<!-- manor R2 (tallest right) -->
<rect x="1224" y="142" width="66" height="83" rx="1" fill="#0a1520"/>
<polygon points="1218,144 1296,144 1257,115" fill="#0d1e30"/>
<rect x="1224" y="134" width="10" height="12" fill="#0a1520"/>
<rect x="1238" y="134" width="10" height="12" fill="#0a1520"/>
<rect x="1252" y="134" width="10" height="12" fill="#0a1520"/>
<rect x="1266" y="134" width="10" height="12" fill="#0a1520"/>
<rect x="1280" y="134" width="10" height="12" fill="#0a1520"/>
<rect x="1228" y="112" width="7" height="24" fill="#091219"/>
<rect x="1279" y="112" width="7" height="24" fill="#091219"/>
<rect x="1234" y="155" width="14" height="19" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1"/>
<rect x="1234" y="155" width="14" height="19" rx="1" fill="#ffd84d" opacity="0.30" id="wR2a"/>
<rect x="1255" y="155" width="14" height="19" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1"/>
<rect x="1255" y="155" width="14" height="19" rx="1" fill="#ffd84d" opacity="0.25" id="wR2b"/>
<rect x="1276" y="155" width="14" height="19" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1"/>
<rect x="1276" y="155" width="14" height="19" rx="1" fill="#ffd84d" opacity="0.22" id="wR2c"/>
<rect x="1244" y="182" width="26" height="43" rx="2" fill="#091219" stroke="#1a2838" stroke-width="1"/>

<!-- house R3 -->
<rect x="1305" y="175" width="38" height="50" rx="1" fill="#0a1520"/>
<polygon points="1299,177 1349,177 1324,155" fill="#0d1e30"/>
<rect x="1313" y="187" width="11" height="15" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1"/>
<rect x="1313" y="187" width="11" height="15" rx="1" fill="#ffd84d" opacity="0.19" id="wR3a"/>
<rect x="1329" y="187" width="11" height="15" rx="1" fill="#0a1520" stroke="#1a2d40" stroke-width="1"/>
<rect x="1329" y="187" width="11" height="15" rx="1" fill="#ffd84d" opacity="0.15" id="wR3b"/>

<!-- RIGHT PINES -->
<polygon points="1128,225 1137,194 1146,225" fill="#081510"/>
<polygon points="1126,216 1137,186 1148,216" fill="#0b1d15"/>
<polygon points="1148,225 1157,197 1166,225" fill="#081510"/>
<polygon points="1358,224 1367,194 1376,224" fill="#081510"/>
<polygon points="1356,215 1367,186 1378,215" fill="#0b1d15"/>
<polygon points="1378,225 1387,197 1396,225" fill="#081510"/>

<!-- ═══════════════ LANTERN POSTS ═══════════════ -->
<rect x="388" y="188" width="3" height="35" fill="#1a2838"/>
<rect x="384" y="186" width="11" height="5" rx="1" fill="#1a2838"/>
<circle cx="389" cy="184" r="5" fill="#ffd84d" opacity="0.7" id="lamp1" filter="url(#glow)"/>
<circle cx="389" cy="184" r="12" fill="#ffd84d" opacity="0.08" id="lamp1g"/>

<rect x="860" y="188" width="3" height="35" fill="#1a2838"/>
<rect x="856" y="186" width="11" height="5" rx="1" fill="#1a2838"/>
<circle cx="861" cy="184" r="5" fill="#ffd84d" opacity="0.62" id="lamp2" filter="url(#glow)"/>
<circle cx="861" cy="184" r="12" fill="#ffd84d" opacity="0.07" id="lamp2g"/>

<rect x="1070" y="188" width="3" height="35" fill="#1a2838"/>
<rect x="1066" y="186" width="11" height="5" rx="1" fill="#1a2838"/>
<circle cx="1071" cy="184" r="5" fill="#ffd84d" opacity="0.55" id="lamp3" filter="url(#glow)"/>
<circle cx="1071" cy="184" r="12" fill="#ffd84d" opacity="0.06" id="lamp3g"/>

<!-- ═══════════════ SHADOW FIGURE ═══════════════ -->
<!-- sits inside the shadow-win window (681,170,13,17) -->
<g id="shadow-figure" opacity="0">
  <!-- head -->
  <ellipse cx="687" cy="173" rx="3.5" ry="3.5" fill="#050c14"/>
  <!-- body -->
  <rect x="684" y="177" width="7" height="8" rx="1" fill="#050c14"/>
</g>

<!-- ═══════════════ CAT ═══════════════ -->
<!-- animated walking cat, starts offscreen -->
<g id="cat" opacity="0" transform="translate(-80,210)">
  <!-- body -->
  <ellipse cx="20" cy="6" rx="14" ry="7" fill="#0d1e2e"/>
  <!-- head -->
  <ellipse cx="32" cy="2" rx="7" ry="6" fill="#0d1e2e"/>
  <!-- ears -->
  <polygon points="28,-2 30,-7 33,-2" fill="#0d1e2e"/>
  <polygon points="32,-2 35,-7 37,-2" fill="#0d1e2e"/>
  <!-- eye -->
  <circle cx="34" cy="1" r="1.2" fill="#ffd84d" opacity="0.9"/>
  <!-- tail curve -->
  <path d="M6,5 Q-4,1 -3,-5" stroke="#0d1e2e" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- legs (4 rects, animated via JS) -->
  <rect id="cat-leg1" x="10" y="12" width="4" height="7" rx="2" fill="#0d1e2e"/>
  <rect id="cat-leg2" x="17" y="12" width="4" height="7" rx="2" fill="#0d1e2e"/>
  <rect id="cat-leg3" x="24" y="12" width="4" height="7" rx="2" fill="#0d1e2e"/>
  <rect id="cat-leg4" x="31" y="12" width="4" height="7" rx="2" fill="#0d1e2e"/>
</g>
  `;

  document.body.appendChild(svg);

  // ══════════════════════════════════════════════
  // Windows — IDs and base opacity
  // ══════════════════════════════════════════════
  const winData = [
    { id:'wL1a', base:0.22 }, { id:'wL1b', base:0.18 },
    { id:'wL2a', base:0.35 }, { id:'wL2b', base:0.28 }, { id:'wL2c', base:0.20 },
    { id:'wL3a', base:0.16 }, { id:'wL3b', base:0.14 },
    { id:'wC1a', base:0.26 }, { id:'wC1b', base:0.20 },
    { id:'wC2a', base:0.38 }, { id:'wC2b', base:0.30 }, { id:'wC2c', base:0.18 },
    { id:'wC3a', base:0.22 }, { id:'wC3b', base:0.18 },
    { id:'wR1a', base:0.22 }, { id:'wR1b', base:0.17 },
    { id:'wR2a', base:0.30 }, { id:'wR2b', base:0.25 }, { id:'wR2c', base:0.22 },
    { id:'wR3a', base:0.19 }, { id:'wR3b', base:0.15 },
    // shadow win handled separately
    { id:'shadow-win', base:0.22 },
  ];

  const wins = winData.map(d => ({ el: svg.getElementById(d.id), base: d.base }))
                      .filter(d => d.el);

  // Flicker a window: brief flicker then lights-out, outline stays
  async function flickerWin(w) {
    const flickers = randI(1, 4);
    for (let i = 0; i < flickers; i++) {
      w.el.setAttribute('opacity', '0');
      await wait(rand(40, 130));
      w.el.setAttribute('opacity', w.base);
      await wait(rand(50, 120));
    }
    w.el.setAttribute('opacity', '0'); // light off — stroke outline stays
    await wait(rand(8000, 40000));     // 8s–40s off
    // slow fade back on
    for (let o = 0; o <= 10; o++) {
      w.el.setAttribute('opacity', (w.base * o / 10).toFixed(3));
      await wait(80);
    }
  }

  async function windowLoop() {
    while (true) {
      await wait(rand(4000, 14000));
      const w = wins[randI(0, wins.length)];
      // don't flicker the shadow window here
      if (w.el.id === 'shadow-win') continue;
      flickerWin(w);
    }
  }
  windowLoop();

  // ══════════════════════════════════════════════
  // Shadow figure
  // ══════════════════════════════════════════════
  const figure   = svg.getElementById('shadow-figure');
  const shadowWin = svg.getElementById('shadow-win');

  async function shadowLoop() {
    while (true) {
      await wait(rand(20000, 60000));
      if (parseFloat(shadowWin.getAttribute('opacity')) < 0.05) continue;

      figure.setAttribute('opacity', '0.9');
      // drift slowly left/right inside window
      const dir   = Math.random() > 0.5 ? 1 : -1;
      let   cx    = 687;
      const steps = randI(15, 30);
      for (let i = 0; i < steps; i++) {
        cx += dir * 0.25;
        // move head and body together via the group transform
        figure.setAttribute('transform', `translate(${cx - 687},0)`);
        await wait(90);
      }
      await wait(rand(600, 1800));
      figure.setAttribute('opacity', '0');
      figure.setAttribute('transform', 'translate(0,0)');
    }
  }
  shadowLoop();

  // ══════════════════════════════════════════════
  // Cat walking animation
  // ══════════════════════════════════════════════
  const cat  = svg.getElementById('cat');
  const legs = [
    svg.getElementById('cat-leg1'),
    svg.getElementById('cat-leg2'),
    svg.getElementById('cat-leg3'),
    svg.getElementById('cat-leg4'),
  ];

  // leg walk cycle: pairs (0,2) and (1,3) alternate
  let legFrame = 0;
  let legTimer = null;

  function startLegs(speed) {
    // speed in ms per frame
    legTimer = setInterval(() => {
      legFrame = (legFrame + 1) % 4;
      legs.forEach((l, i) => {
        // alternate: even legs up when legFrame is 0 or 2, odd legs up when 1 or 3
        const up = (i % 2 === 0) ? (legFrame < 2) : (legFrame >= 2);
        l.setAttribute('y', up ? '10' : '12');
        l.setAttribute('height', up ? '9' : '7');
      });
    }, speed);
  }
  function stopLegs() {
    if (legTimer) { clearInterval(legTimer); legTimer = null; }
    legs.forEach(l => { l.setAttribute('y', '12'); l.setAttribute('height', '7'); });
  }

  async function catLoop() {
    while (true) {
      await wait(rand(15000, 45000));

      const goRight  = Math.random() > 0.5;
      const startX   = goRight ? -80 : 1480;
      const endX     = goRight ? rand(300, 1200) : rand(200, 1100);
      const speed    = rand(0.5, 1.1); // px per frame
      const frameMs  = 35;

      // position and flip
      const flip = !goRight;
      const setPos = x => {
        if (flip) {
          cat.setAttribute('transform', `translate(${x + 40},210) scale(-1,1) translate(-40,0)`);
        } else {
          cat.setAttribute('transform', `translate(${x},210)`);
        }
      };

      setPos(startX);
      cat.setAttribute('opacity', '0');
      await wait(100);
      cat.setAttribute('opacity', '0.92');
      startLegs(120);

      let x = startX;
      const dir = goRight ? 1 : -1;
      while ((goRight && x < endX) || (!goRight && x > endX)) {
        x += dir * speed;
        setPos(x);
        await wait(frameMs);
      }

      // sit for a moment
      stopLegs();
      await wait(rand(1200, 4000));

      // fade out
      for (let o = 9; o >= 0; o--) {
        cat.setAttribute('opacity', (o / 10).toFixed(1));
        await wait(60);
      }
      cat.setAttribute('opacity', '0');
    }
  }
  catLoop();

  // ══════════════════════════════════════════════
  // Lantern flicker
  // ══════════════════════════════════════════════
  const lamps = [
    { dot: svg.getElementById('lamp1'), glow: svg.getElementById('lamp1g'), base: 0.70, baseG: 0.08 },
    { dot: svg.getElementById('lamp2'), glow: svg.getElementById('lamp2g'), base: 0.62, baseG: 0.07 },
    { dot: svg.getElementById('lamp3'), glow: svg.getElementById('lamp3g'), base: 0.55, baseG: 0.06 },
  ];
  async function lampFlicker(lamp) {
    while (true) {
      await wait(rand(1500, 6000));
      const dim = rand(0.35, 0.55);
      lamp.dot.setAttribute('opacity', dim);
      lamp.glow.setAttribute('opacity', dim * 0.12);
      await wait(rand(50, 180));
      lamp.dot.setAttribute('opacity', lamp.base);
      lamp.glow.setAttribute('opacity', lamp.baseG);
    }
  }
  lamps.forEach(l => lampFlicker(l));

  // ══════════════════════════════════════════════
  // Fireflies
  // ══════════════════════════════════════════════
  for (let i = 0; i < 18; i++) {
    const f = document.createElement('div');
    f.className = 'firefly';
    f.style.cssText = [
      `left:${rand(2, 95)}%`,
      `top:${rand(5, 52)}%`,
      `--dur:${rand(3, 7)}s`,
      `--del:${rand(0, 7)}s`,
      `--dx:${(Math.random() - 0.5) * 40}px`,
      `--dy:${(Math.random() - 0.5) * 28}px`,
    ].join(';');
    document.body.appendChild(f);
  }

  // ══════════════════════════════════════════════
  // Mobile nav toggle
  // ══════════════════════════════════════════════
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));

})();
