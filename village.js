(function () {

  const rand  = (a, b) => Math.random() * (b - a) + a;
  const randI = (a, b) => Math.floor(rand(a, b));
  const wait  = ms => new Promise(r => setTimeout(r, ms));

  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 1440 260');
  svg.setAttribute('preserveAspectRatio', 'xMidYMax slice');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('landscape');

  // ─── Pixel helpers ───────────────────────────────────────────────────────────
  // Returns a pixel-stepped rectangle path (jagged silhouette top)
  function pixelTop(x, y, w, h, step = 4) {
    let d = '';
    for (let i = 0; i < w; i += step) {
      const jag = Math.floor(i / step) % 2 === 0 ? 0 : step;
      d += `M${x + i},${y + jag} h${step} `;
    }
    return d;
  }

  // Arched window path: rectangle with rounded arch top
  function archWin(x, y, w, h, archH) {
    const r = w / 2;
    const archY = y + archH;
    return `M${x},${y + h} L${x},${archY} Q${x},${y} ${x + r},${y} Q${x + w},${y} ${x + w},${archY} L${x + w},${y + h} Z`;
  }

  // Pixel-stepped triangle roof (looks like NES/SNES tile roof)
  function steppedRoof(x, y, w, peakY, step = 4) {
    const halfW = w / 2;
    const totalH = y - peakY;
    let d = `M${x},${y}`;
    let curX = x;
    let curY = y;
    const steps = Math.ceil(halfW / step);
    for (let i = 0; i < steps; i++) {
      const nx = x + halfW - i * step;
      const ny = y - Math.round((i / steps) * totalH);
      d += ` L${curX},${ny} L${nx},${ny}`;
      curX = nx; curY = ny;
    }
    d += ` L${x + halfW},${peakY}`;
    // mirror
    curX = x + halfW; curY = peakY;
    for (let i = steps - 1; i >= 0; i--) {
      const nx = x + halfW + (steps - i) * step;
      const ny = y - Math.round((i / steps) * totalH);
      d += ` L${nx},${ny} L${curX + step},${ny}`;
      curX = nx;
    }
    d += ` L${x + w},${y} Z`;
    return d;
  }

  // Stone-wall hatching lines as a <g> element string
  function stoneWall(x, y, w, h, id) {
    let lines = '';
    for (let row = y; row < y + h; row += 8) {
      const offset = Math.floor((row - y) / 8) % 2 === 0 ? 0 : 12;
      for (let col = x - offset; col < x + w; col += 24) {
        const lx = Math.max(col, x);
        const rx = Math.min(col + 20, x + w);
        if (rx > lx) lines += `<line x1="${lx}" y1="${row}" x2="${rx}" y2="${row}" stroke="#1a1828" stroke-width="1" opacity="0.5"/>`;
      }
    }
    return lines;
  }

  // Pixel-art pine tree
  function pixelPine(x, baseY, h = 50) {
    const w = Math.round(h * 0.55);
    const layers = 3;
    let d = '';
    for (let i = 0; i < layers; i++) {
      const lx = x - Math.round((w / 2) * ((i + 1) / layers));
      const ly = baseY - h + Math.round((h / layers) * i);
      const lw = Math.round(w * ((i + 1) / layers));
      const lh = Math.round(h / layers) + 4;
      d += `<rect x="${lx}" y="${ly}" width="${lw}" height="${lh}" rx="0"
              fill="${i % 2 === 0 ? '#0a1a0c' : '#0d2010'}" shape-rendering="crispEdges"/>`;
    }
    // trunk
    d += `<rect x="${x - 3}" y="${baseY - 10}" width="6" height="10"
            fill="#2a1608" shape-rendering="crispEdges"/>`;
    return d;
  }

  // Pixel-art lantern post
  function pixelLantern(x, groundY) {
    return `
      <rect x="${x - 1}" y="${groundY - 60}" width="3" height="60" fill="#2a2420" shape-rendering="crispEdges"/>
      <rect x="${x - 6}" y="${groundY - 65}" width="14" height="4" rx="0" fill="#2a2420" shape-rendering="crispEdges"/>
      <rect x="${x - 5}" y="${groundY - 78}" width="12" height="14" rx="0" fill="#2a2420" shape-rendering="crispEdges"/>
      <rect x="${x - 3}" y="${groundY - 76}" width="8"  height="10" rx="0" fill="#ffd84d" opacity="0" id="lamp_fill_${x}" shape-rendering="crispEdges"/>
      <circle cx="${x}" cy="${groundY - 71}" r="16" fill="#ffd84d" opacity="0" id="lamp_glow_${x}"/>
      <circle cx="${x}" cy="${groundY - 71}" r="8"  fill="#ffd84d" opacity="0.9" id="lamp_dot_${x}" filter="url(#pixGlow)"/>
    `;
  }

  // ─── SVG defs ─────────────────────────────────────────────────────────────────
  svg.innerHTML = `
<defs>
  <filter id="pixGlow" x="-80%" y="-80%" width="260%" height="260%">
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
    <feGaussianBlur stdDeviation="6" result="blur"/>
    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <pattern id="stonePattern" x="0" y="0" width="24" height="8" patternUnits="userSpaceOnUse">
    <rect width="24" height="8" fill="#1e1c28"/>
    <rect width="20" height="6" x="0" y="1" fill="#201e2c"/>
    <rect width="20" height="6" x="12" y="5" fill="#201e2c"/>
    <rect x="0"  y="0" width="24" height="1" fill="#161420" opacity="0.6"/>
    <rect x="0"  y="4" width="12" height="1" fill="#161420" opacity="0.4"/>
    <rect x="12" y="4" width="12" height="1" fill="#161420" opacity="0.4"/>
  </pattern>
  <pattern id="roofTile" x="0" y="0" width="8" height="6" patternUnits="userSpaceOnUse">
    <rect width="8" height="6" fill="#1e0e30"/>
    <rect width="8" height="3" fill="#28123c"/>
    <rect x="0" y="0" width="8" height="1" fill="#120828" opacity="0.7"/>
    <rect x="0" y="3" width="8" height="1" fill="#120828" opacity="0.5"/>
  </pattern>
  <pattern id="roofTileRed" x="0" y="0" width="8" height="6" patternUnits="userSpaceOnUse">
    <rect width="8" height="6" fill="#2a0e0e"/>
    <rect width="8" height="3" fill="#380e0e"/>
    <rect x="0" y="0" width="8" height="1" fill="#1a0606" opacity="0.7"/>
    <rect x="0" y="3" width="8" height="1" fill="#1a0606" opacity="0.5"/>
  </pattern>
  <pattern id="roofTileBlue" x="0" y="0" width="8" height="6" patternUnits="userSpaceOnUse">
    <rect width="8" height="6" fill="#0c1a2e"/>
    <rect width="8" height="3" fill="#10223a"/>
    <rect x="0" y="0" width="8" height="1" fill="#081018" opacity="0.7"/>
    <rect x="0" y="3" width="8" height="1" fill="#081018" opacity="0.5"/>
  </pattern>
  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%"   stop-color="#080612"/>
    <stop offset="40%"  stop-color="#0e0c22"/>
    <stop offset="100%" stop-color="#161238"/>
  </linearGradient>
  <linearGradient id="groundFade" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%"   stop-color="#08100a"/>
    <stop offset="100%" stop-color="#050b06"/>
  </linearGradient>
</defs>

<!-- ══ SKY ══════════════════════════════════════════════════════════════════ -->
<rect x="0" y="0" width="1440" height="260" fill="url(#skyGrad)" shape-rendering="crispEdges"/>

<!-- ══ MOON ═════════════════════════════════════════════════════════════════ -->
<circle cx="120" cy="44" r="28" fill="#fff8c0" filter="url(#softGlow)"/>
<circle cx="120" cy="44" r="28" fill="#fffbe0"/>
<!-- moon craters (pixel circles) -->
<circle cx="110" cy="38" r="5"  fill="#e8d070" opacity="0.7"/>
<circle cx="128" cy="52" r="3"  fill="#e8d070" opacity="0.6"/>
<circle cx="116" cy="54" r="2"  fill="#e8d070" opacity="0.5"/>
<!-- moon bite -->
<circle cx="138" cy="34" r="20" fill="#0e0c22"/>

<!-- ══ STARS ══════════════════════════════════════════════════════════════════ -->
<g id="starLayer" shape-rendering="crispEdges">
  <!-- static pixel stars; JS animates opacity -->
  ${Array.from({length: 80}, () => {
    const x = randI(0, 1440), y = randI(0, 80);
    const s = Math.random() < 0.2 ? 3 : Math.random() < 0.4 ? 2 : 1;
    return `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#fffbe8" opacity="${rand(0.3, 0.9).toFixed(2)}" class="star"/>`;
  }).join('')}
</g>

<!-- ══ DISTANT MOUNTAINS (pixel silhouette) ══════════════════════════════════ -->
<polygon shape-rendering="crispEdges"
  points="0,152 40,120 80,136 130,100 180,118 240,88 300,108 370,76
          440,96 510,68 580,90 650,60 720,82 790,54 860,76 930,50
          1000,72 1070,46 1140,68 1210,44 1280,66 1350,48 1440,62
          1440,200 0,200"
  fill="#111020"/>
<polygon shape-rendering="crispEdges"
  points="0,166 50,145 110,158 170,134 235,150 305,122 375,140
          445,114 520,132 595,108 665,124 740,100 810,118 885,96
          955,114 1025,92 1100,110 1175,88 1250,106 1325,88 1440,100
          1440,200 0,200"
  fill="#161328"/>

<!-- ══ MID HILLS ══════════════════════════════════════════════════════════════ -->
<ellipse cx="200"  cy="220" rx="270" ry="60" fill="#0f1020"/>
<ellipse cx="720"  cy="224" rx="340" ry="56" fill="#0f1020"/>
<ellipse cx="1250" cy="220" rx="300" ry="58" fill="#0f1020"/>

<!-- ══ GROUND ════════════════════════════════════════════════════════════════ -->
<rect x="0" y="200" width="1440" height="60" fill="url(#groundFade)" shape-rendering="crispEdges"/>
<!-- Cobblestone path -->
<rect x="0" y="212" width="1440" height="10" fill="#1c1810" shape-rendering="crispEdges"/>
${Array.from({length: 36}, (_, i) => {
  const cx2 = 20 + i * 40, cy2 = 214;
  return `<rect x="${cx2}" y="${cy2}" width="36" height="6" rx="0" fill="#22201a" stroke="#161410" stroke-width="1" shape-rendering="crispEdges"/>`;
}).join('')}
<!-- grass tufts -->
${Array.from({length: 72}, (_, i) => {
  const gx = i * 20 + randI(-4, 4);
  return `<rect x="${gx}" y="210" width="2" height="4" fill="${Math.random() < 0.5 ? '#0c1a08' : '#101e0a'}" shape-rendering="crispEdges"/>`;
}).join('')}

<!-- ══════════════════════════════════════════════════════════════════════════
     LEFT CLUSTER  –  Cottage Row + Watch Tower
     ══════════════════════════════════════════════════════════════════════════ -->

<!-- tiny shed far left -->
<rect x="0"  y="180" width="32" height="32" fill="url(#stonePattern)" shape-rendering="crispEdges"/>
<path d="${steppedRoof(0, 180, 32, 158)}" fill="url(#roofTile)" stroke="#0c0818" stroke-width="1" shape-rendering="crispEdges"/>
<path d="${archWin(8, 186, 12, 16, 6)}"   fill="#ffd84d" opacity="0.18" id="wShed"/>
<path d="${archWin(8, 186, 12, 16, 6)}"   fill="none"    stroke="#2e2c3a" stroke-width="1"/>

<!-- Cottage L1 -->
<rect x="38"  y="158" width="52" height="54" fill="url(#stonePattern)" shape-rendering="crispEdges"/>
<path d="${steppedRoof(34, 158, 60, 130)}" fill="url(#roofTile)" stroke="#0c0818" stroke-width="1" shape-rendering="crispEdges"/>
<rect x="80"  y="124" width="8"  height="34" fill="#181428" shape-rendering="crispEdges"/>
<rect x="77"  y="122" width="14" height="4"  fill="#201e2c" shape-rendering="crispEdges"/>
<!-- chimney smoke slot -->
<rect x="82"  y="116" width="4"  height="8"  fill="#0c0a14" shape-rendering="crispEdges"/>
<path d="${archWin(46, 167, 14, 18, 7)}" fill="#ffd84d" opacity="0.28" id="wL1a"/>
<path d="${archWin(46, 167, 14, 18, 7)}" fill="none"    stroke="#2e2c3a" stroke-width="1"/>
<path d="${archWin(64, 167, 14, 18, 7)}" fill="#ffd84d" opacity="0.20" id="wL1b"/>
<path d="${archWin(64, 167, 14, 18, 7)}" fill="none"    stroke="#2e2c3a" stroke-width="1"/>
<path d="${archWin(52, 188, 16, 24, 8)}" fill="#0a0c18" stroke="#201e2c" stroke-width="1"/>

<!-- Watch Tower L2 (tallest left) -->
<rect x="100" y="118" width="64" height="94" fill="url(#stonePattern)" shape-rendering="crispEdges"/>
<!-- stepped battlements -->
${[100,115,130,145,152].map(bx =>
  `<rect x="${bx}" y="110" width="11" height="10" rx="0" fill="#1e1c28" stroke="#0c0a18" stroke-width="1" shape-rendering="crispEdges"/>`
).join('')}
<path d="${steppedRoof(96, 118, 72, 84)}" fill="url(#roofTile)" stroke="#0c0818" stroke-width="1" shape-rendering="crispEdges"/>
<!-- chimney pair -->
<rect x="148" y="80"  width="8"  height="38" fill="#181428" shape-rendering="crispEdges"/>
<rect x="144" y="78"  width="16" height="4"  fill="#201e2c" shape-rendering="crispEdges"/>
<rect x="108" y="84"  width="8"  height="34" fill="#181428" shape-rendering="crispEdges"/>
<rect x="105" y="82"  width="14" height="4"  fill="#201e2c" shape-rendering="crispEdges"/>
<!-- windows row 1 -->
<path d="${archWin(110, 126, 16, 22, 9)}" fill="#ffd84d" opacity="0.36" id="wL2a"/>
<path d="${archWin(110, 126, 16, 22, 9)}" fill="none"    stroke="#2e2c3a" stroke-width="1.5"/>
<path d="${archWin(134, 126, 16, 22, 9)}" fill="#ffd84d" opacity="0.28" id="wL2b"/>
<path d="${archWin(134, 126, 16, 22, 9)}" fill="none"    stroke="#2e2c3a" stroke-width="1.5"/>
<!-- windows row 2 -->
<path d="${archWin(110, 158, 16, 20, 8)}" fill="#ffd84d" opacity="0.20" id="wL2c"/>
<path d="${archWin(110, 158, 16, 20, 8)}" fill="none"    stroke="#2e2c3a" stroke-width="1"/>
<path d="${archWin(134, 158, 16, 20, 8)}" fill="#ffd84d" opacity="0.16" id="wL2d"/>
<path d="${archWin(134, 158, 16, 20, 8)}" fill="none"    stroke="#2e2c3a" stroke-width="1"/>
<!-- inn sign -->
<rect x="112" y="186" width="36" height="8"  rx="0" fill="#1e1208" stroke="#2e2010" stroke-width="1" shape-rendering="crispEdges"/>
<rect x="114" y="188" width="32" height="4"  fill="#2a1a0c" shape-rendering="crispEdges"/>
<!-- door -->
<path d="${archWin(116, 196, 22, 30, 12)}" fill="#0a0c18" stroke="#201e2c" stroke-width="1.5"/>
${stoneWall(100, 118, 64, 94)}

<!-- Small house L3 -->
<rect x="178" y="168" width="46" height="44" fill="url(#stonePattern)" shape-rendering="crispEdges"/>
<path d="${steppedRoof(174, 168, 54, 144)}" fill="url(#roofTileRed)" stroke="#180808" stroke-width="1" shape-rendering="crispEdges"/>
<path d="${archWin(186, 176, 13, 18, 7)}" fill="#ffd84d" opacity="0.22" id="wL3a"/>
<path d="${archWin(186, 176, 13, 18, 7)}" fill="none"    stroke="#2e2c3a" stroke-width="1"/>
<path d="${archWin(204, 176, 13, 18, 7)}" fill="#ffd84d" opacity="0.16" id="wL3b"/>
<path d="${archWin(204, 176, 13, 18, 7)}" fill="none"    stroke="#2e2c3a" stroke-width="1"/>
<path d="${archWin(191, 194, 16, 18, 8)}" fill="#0a0c18" stroke="#201e2c" stroke-width="1"/>

<!-- LEFT PINE TREES -->
${pixelPine(240, 212, 46)}
${pixelPine(258, 212, 52)}
${pixelPine(272, 212, 40)}
${pixelPine(12,  212, 44)}
${pixelPine(28,  212, 36)}

<!-- ══════════════════════════════════════════════════════════════════════════
     CENTRE CLUSTER  –  Wizard Tower + Tavern + Market
     ══════════════════════════════════════════════════════════════════════════ -->

<!-- Market stall / house CL -->
<rect x="570" y="162" width="50" height="50" fill="url(#stonePattern)" shape-rendering="crispEdges"/>
<path d="${steppedRoof(565, 162, 60, 136)}" fill="url(#roofTileRed)" stroke="#180808" stroke-width="1" shape-rendering="crispEdges"/>
<path d="${archWin(580, 170, 13, 18, 7)}" fill="#ffd84d" opacity="0.26" id="wCLa"/>
<path d="${archWin(580, 170, 13, 18, 7)}" fill="none"    stroke="#2e2c3a" stroke-width="1"/>
<path d="${archWin(598, 170, 13, 18, 7)}" fill="#ffd84d" opacity="0.20" id="wCLb"/>
<path d="${archWin(598, 170, 13, 18, 7)}" fill="none"    stroke="#2e2c3a" stroke-width="1"/>
<path d="${archWin(578, 194, 16, 18, 8)}" fill="#0a0c18" stroke="#201e2c" stroke-width="1"/>

<!-- WIZARD / CLOCK TOWER  –  centrepiece -->
<!-- base body -->
<rect x="630" y="110" width="62" height="102" fill="url(#stonePattern)" shape-rendering="crispEdges"/>
<!-- stepped battlements top -->
${[630,643,656,669,682].map(bx =>
  `<rect x="${bx}" y="102" width="11" height="10" rx="0" fill="#1e1c28" stroke="#0c0a18" stroke-width="1" shape-rendering="crispEdges"/>`
).join('')}
<!-- pixel-stepped conical roof -->
${Array.from({length: 14}, (_, i) => {
  const rw = 62 - i * 4;
  const rx2 = 630 + (62 - rw) / 2;
  const ry = 102 - i * 4;
  return `<rect x="${rx2}" y="${ry}" width="${rw}" height="5" rx="0" fill="${i < 7 ? '#18083a' : '#200e48'}" shape-rendering="crispEdges"/>`;
}).join('')}
<!-- spire -->
<rect x="659" y="42" width="4" height="18" fill="#2a1858" shape-rendering="crispEdges"/>
<rect x="657" y="36" width="8" height="8"  fill="#ffd84d" opacity="0.5" id="spireGlow"/>
<circle cx="661" cy="38" r="4" fill="#ffd84d" opacity="0.7" filter="url(#pixGlow)"/>

<!-- Rose window on tower -->
<circle cx="661" cy="124" r="11" fill="#0e0a1e" stroke="#2e2a40" stroke-width="1.5"/>
<circle cx="661" cy="124" r="11" fill="#5090e0" opacity="0.22" id="wTowerRose"/>
<!-- cross in rose window -->
<rect x="660" y="113" width="2" height="22" fill="#1a1630"/>
<rect x="650" y="123" width="22" height="2" fill="#1a1630"/>
<!-- 4 petal diamonds -->
${[[661,115],[661,133],[650,124],[672,124]].map(([px,py]) =>
  `<rect x="${px-3}" y="${py-3}" width="6" height="6" rx="0" fill="#4080c0" opacity="0.3" transform="rotate(45,${px},${py})"/>`
).join('')}

<!-- Tower arch windows row 1 -->
<path d="${archWin(637, 140, 18, 26, 10)}" fill="#ffd84d" opacity="0.38" id="wTa"/>
<path d="${archWin(637, 140, 18, 26, 10)}" fill="none"    stroke="#2e2c3a" stroke-width="1.5"/>
<path d="${archWin(663, 140, 18, 26, 10)}" fill="#ffd84d" opacity="0.30" id="wTb"/>
<path d="${archWin(663, 140, 18, 26, 10)}" fill="none"    stroke="#2e2c3a" stroke-width="1.5"/>
<!-- Tower windows row 2 (shadow window on left) -->
<path d="${archWin(637, 172, 18, 24, 10)}" fill="#ffd84d" opacity="0.24" id="shadow-win"/>
<path d="${archWin(637, 172, 18, 24, 10)}" fill="none"    stroke="#2e2c3a" stroke-width="1.5"/>
<path d="${archWin(663, 172, 18, 24, 10)}" fill="#ffd84d" opacity="0.18" id="wTc"/>
<path d="${archWin(663, 172, 18, 24, 10)}" fill="none"    stroke="#2e2c3a" stroke-width="1.5"/>
<!-- Tower door -->
<path d="${archWin(643, 196, 24, 36, 14)}" fill="#0a0c18" stroke="#201e2c" stroke-width="1.5"/>
${stoneWall(630, 110, 62, 102)}

<!-- SHADOW FIGURE inside tower -->
<g id="shadow-figure" opacity="0">
  <ellipse cx="646" cy="177" rx="5" ry="5"   fill="#04060e"/>
  <path d="M641,182 Q640,198 646,198 Q652,198 651,182 Z" fill="#04060e"/>
  <!-- wizard hat silhouette -->
  <polygon points="641,177 646,163 651,177" fill="#04060e"/>
</g>

<!-- TAVERN  CR -->
<rect x="702" y="150" width="56" height="62" fill="url(#stonePattern)" shape-rendering="crispEdges"/>
<path d="${steppedRoof(697, 150, 66, 122)}" fill="url(#roofTileRed)" stroke="#180808" stroke-width="1" shape-rendering="crispEdges"/>
<!-- chimney -->
<rect x="740" y="116" width="10" height="34" fill="#181428" shape-rendering="crispEdges"/>
<rect x="737" y="114" width="16" height="4"  fill="#201e2c" shape-rendering="crispEdges"/>
<!-- hanging sign -->
<line x1="712" y1="150" x2="712" y2="140" stroke="#2a1e10" stroke-width="2"/>
<line x1="738" y1="150" x2="738" y2="140" stroke="#2a1e10" stroke-width="2"/>
<rect x="706" y="130" width="36" height="10" rx="0" fill="#1e1208" stroke="#2e2010" stroke-width="1" shape-rendering="crispEdges"/>
<rect x="708" y="132" width="32" height="6"       fill="#2a1a0c" shape-rendering="crispEdges"/>
<path d="${archWin(710, 158, 14, 20, 8)}" fill="#ffd84d" opacity="0.30" id="wCRa"/>
<path d="${archWin(710, 158, 14, 20, 8)}" fill="none"    stroke="#2e2c3a" stroke-width="1"/>
<path d="${archWin(730, 158, 14, 20, 8)}" fill="#ffd84d" opacity="0.22" id="wCRb"/>
<path d="${archWin(730, 158, 14, 20, 8)}" fill="none"    stroke="#2e2c3a" stroke-width="1"/>
<path d="${archWin(718, 180, 12, 16, 6)}" fill="#ffd84d" opacity="0.16" id="wCRc"/>
<path d="${archWin(718, 180, 12, 16, 6)}" fill="none"    stroke="#2e2c3a" stroke-width="1"/>
<path d="${archWin(710, 196, 24, 28, 14)}" fill="#0a0c18" stroke="#201e2c" stroke-width="1.5"/>
${stoneWall(702, 150, 56, 62)}

<!-- CENTRE PINES -->
${pixelPine(545, 212, 50)}
${pixelPine(562, 212, 44)}
${pixelPine(766, 212, 52)}
${pixelPine(783, 212, 44)}
${pixelPine(797, 212, 36)}

<!-- ══════════════════════════════════════════════════════════════════════════
     RIGHT CLUSTER  –  Chapel + Manor House
     ══════════════════════════════════════════════════════════════════════════ -->

<!-- CHAPEL  R1 -->
<rect x="1130" y="150" width="48" height="62" fill="url(#stonePattern)" shape-rendering="crispEdges"/>
<path d="${steppedRoof(1124, 150, 60, 118)}" fill="url(#roofTileBlue)" stroke="#080c14" stroke-width="1" shape-rendering="crispEdges"/>
<!-- cross on roof -->
<rect x="1151" y="108" width="6"  height="26" fill="#c8c0a8" shape-rendering="crispEdges"/>
<rect x="1143" y="118" width="22" height="6"  fill="#c8c0a8" shape-rendering="crispEdges"/>
<!-- Large rose window -->
<circle cx="1154" cy="166" r="12" fill="#0e0a1e" stroke="#2e2a40" stroke-width="1.5"/>
<circle cx="1154" cy="166" r="12" fill="#ffd84d" opacity="0.20" id="wR1rose"/>
<rect x="1153" y="154" width="2" height="24" fill="#1a1630"/>
<rect x="1142" y="165" width="24" height="2" fill="#1a1630"/>
<!-- diagonal spokes -->
${[[1146,158],[1162,158],[1146,174],[1162,174]].map(([px,py]) =>
  `<rect x="${px-2}" y="${py-2}" width="4" height="4" rx="0" fill="#c8b040" opacity="0.25" transform="rotate(45,${px},${py})"/>`
).join('')}
<path d="${archWin(1136, 180, 14, 22, 8)}" fill="#ffd84d" opacity="0.20" id="wR1a"/>
<path d="${archWin(1136, 180, 14, 22, 8)}" fill="none"    stroke="#2e2c3a" stroke-width="1"/>
<path d="${archWin(1158, 180, 14, 22, 8)}" fill="#ffd84d" opacity="0.16" id="wR1b"/>
<path d="${archWin(1158, 180, 14, 22, 8)}" fill="none"    stroke="#2e2c3a" stroke-width="1"/>
<path d="${archWin(1141, 202, 18, 22, 10)}" fill="#0a0c18" stroke="#201e2c" stroke-width="1"/>
${stoneWall(1130, 150, 48, 62)}

<!-- MANOR R2  –  wide, imposing -->
<rect x="1192" y="120" width="90" height="92" fill="url(#stonePattern)" shape-rendering="crispEdges"/>
<!-- battlements -->
${[1192,1206,1220,1234,1248,1262,1270].map(bx =>
  `<rect x="${bx}" y="112" width="10" height="10" rx="0" fill="#1e1c28" stroke="#0c0a18" stroke-width="1" shape-rendering="crispEdges"/>`
).join('')}
<path d="${steppedRoof(1186, 120, 102, 82)}" fill="url(#roofTile)" stroke="#0c0818" stroke-width="1" shape-rendering="crispEdges"/>
<!-- twin chimneys -->
<rect x="1200" y="78"  width="10" height="42" fill="#181428" shape-rendering="crispEdges"/>
<rect x="1196" y="76"  width="18" height="4"  fill="#201e2c" shape-rendering="crispEdges"/>
<rect x="1266" y="78"  width="10" height="42" fill="#181428" shape-rendering="crispEdges"/>
<rect x="1262" y="76"  width="18" height="4"  fill="#201e2c" shape-rendering="crispEdges"/>
<!-- flag pole -->
<rect x="1237" y="72"  width="3"  height="28" fill="#2a2420" shape-rendering="crispEdges"/>
<rect x="1240" y="72"  width="18" height="10" fill="#1e2860" shape-rendering="crispEdges"/>
<!-- manor windows row 1 -->
<path d="${archWin(1200, 128, 16, 24, 10)}" fill="#ffd84d" opacity="0.30" id="wR2a"/>
<path d="${archWin(1200, 128, 16, 24, 10)}" fill="none"    stroke="#2e2c3a" stroke-width="1.5"/>
<path d="${archWin(1224, 128, 16, 24, 10)}" fill="#ffd84d" opacity="0.26" id="wR2b"/>
<path d="${archWin(1224, 128, 16, 24, 10)}" fill="none"    stroke="#2e2c3a" stroke-width="1.5"/>
<path d="${archWin(1250, 128, 16, 24, 10)}" fill="#ffd84d" opacity="0.24" id="wR2c"/>
<path d="${archWin(1250, 128, 16, 24, 10)}" fill="none"    stroke="#2e2c3a" stroke-width="1.5"/>
<!-- manor windows row 2 -->
<path d="${archWin(1200, 160, 16, 20, 8)}" fill="#ffd84d" opacity="0.20" id="wR2d"/>
<path d="${archWin(1200, 160, 16, 20, 8)}" fill="none"    stroke="#2e2c3a" stroke-width="1"/>
<path d="${archWin(1250, 160, 16, 20, 8)}" fill="#ffd84d" opacity="0.18" id="wR2e"/>
<path d="${archWin(1250, 160, 16, 20, 8)}" fill="none"    stroke="#2e2c3a" stroke-width="1"/>
<!-- grand door -->
<path d="${archWin(1222, 180, 34, 52, 18)}" fill="#0a0c18" stroke="#201e2c" stroke-width="2"/>
<!-- door details -->
<rect x="1225" y="200" width="13" height="2" fill="#201e2c" shape-rendering="crispEdges"/>
<rect x="1243" y="200" width="13" height="2" fill="#201e2c" shape-rendering="crispEdges"/>
${stoneWall(1192, 120, 90, 92)}

<!-- Far right house -->
<rect x="1295" y="166" width="48" height="46" fill="url(#stonePattern)" shape-rendering="crispEdges"/>
<path d="${steppedRoof(1290, 166, 58, 140)}" fill="url(#roofTileRed)" stroke="#180808" stroke-width="1" shape-rendering="crispEdges"/>
<path d="${archWin(1303, 174, 13, 18, 7)}" fill="#ffd84d" opacity="0.22" id="wR3a"/>
<path d="${archWin(1303, 174, 13, 18, 7)}" fill="none"    stroke="#2e2c3a" stroke-width="1"/>
<path d="${archWin(1320, 174, 13, 18, 7)}" fill="#ffd84d" opacity="0.16" id="wR3b"/>
<path d="${archWin(1320, 174, 13, 18, 7)}" fill="none"    stroke="#2e2c3a" stroke-width="1"/>

<!-- Far right shed -->
<rect x="1354" y="184" width="36" height="28" fill="url(#stonePattern)" shape-rendering="crispEdges"/>
<path d="${steppedRoof(1350, 184, 44, 164)}" fill="url(#roofTile)" stroke="#0c0818" stroke-width="1" shape-rendering="crispEdges"/>

<!-- RIGHT PINES -->
${pixelPine(1092, 212, 52)}
${pixelPine(1110, 212, 44)}
${pixelPine(1124, 212, 36)}
${pixelPine(1396, 212, 46)}
${pixelPine(1414, 212, 40)}
${pixelPine(1430, 212, 32)}

<!-- ══ LANTERN POSTS ══════════════════════════════════════════════════════════ -->
${pixelLantern(400, 212)}
${pixelLantern(860, 212)}
${pixelLantern(1074, 212)}

<!-- ══ CAT ════════════════════════════════════════════════════════════════════ -->
<g id="cat" opacity="0" transform="translate(-100,192)">
  <!-- body -->
  <rect x="0"  y="0"  width="32" height="14" rx="0" fill="#141c28" shape-rendering="crispEdges"/>
  <rect x="1"  y="1"  width="30" height="12" rx="0" fill="#1a2232" shape-rendering="crispEdges"/>
  <!-- head -->
  <rect x="24" y="-10" width="18" height="16" rx="0" fill="#141c28" shape-rendering="crispEdges"/>
  <!-- ears (pixel triangles) -->
  <rect x="24" y="-16" width="4" height="6"  rx="0" fill="#141c28" shape-rendering="crispEdges"/>
  <rect x="36" y="-16" width="4" height="6"  rx="0" fill="#141c28" shape-rendering="crispEdges"/>
  <!-- eye -->
  <rect x="37" y="-6"  width="4" height="3"  rx="0" fill="#ffd84d" shape-rendering="crispEdges"/>
  <rect x="38" y="-5"  width="2" height="1"  rx="0" fill="#c8a020" shape-rendering="crispEdges"/>
  <!-- nose -->
  <rect x="39" y="-2"  width="2" height="2"  rx="0" fill="#e08080" shape-rendering="crispEdges"/>
  <!-- tail -->
  <rect x="-10" y="-4" width="12" height="4" rx="0" fill="#141c28" shape-rendering="crispEdges"/>
  <rect x="-14" y="-10" width="4" height="8" rx="0" fill="#141c28" shape-rendering="crispEdges"/>
  <!-- legs -->
  <rect id="cl1" x="4"  y="14" width="6" height="10" rx="0" fill="#141c28" shape-rendering="crispEdges"/>
  <rect id="cl2" x="12" y="14" width="6" height="10" rx="0" fill="#141c28" shape-rendering="crispEdges"/>
  <rect id="cl3" x="20" y="14" width="6" height="10" rx="0" fill="#141c28" shape-rendering="crispEdges"/>
  <rect id="cl4" x="28" y="14" width="6" height="10" rx="0" fill="#141c28" shape-rendering="crispEdges"/>
</g>

<!-- ══ NPC WANDERER ════════════════════════════════════════════════════════════ -->
<g id="npc" opacity="0.92" transform="translate(310,186)">
  <!-- cloak body -->
  <rect x="0"  y="0"  width="16" height="22" rx="0" fill="#1c1030" shape-rendering="crispEdges"/>
  <rect x="2"  y="2"  width="12" height="18" rx="0" fill="#281440" shape-rendering="crispEdges"/>
  <!-- hood / head -->
  <rect x="2"  y="-10" width="12" height="12" rx="0" fill="#e0c880" shape-rendering="crispEdges"/>
  <rect x="0"  y="-12" width="16" height="6"  rx="0" fill="#1c1030" shape-rendering="crispEdges"/>
  <!-- eyes -->
  <rect x="5"  y="-6"  width="2"  height="2"  fill="#0a0816" shape-rendering="crispEdges"/>
  <rect x="9"  y="-6"  width="2"  height="2"  fill="#0a0816" shape-rendering="crispEdges"/>
  <!-- lantern arm -->
  <rect x="16" y="4"   width="3"  height="10" rx="0" fill="#1e1830" shape-rendering="crispEdges"/>
  <rect x="14" y="2"   width="7"  height="8"  rx="0" fill="#2a2238" shape-rendering="crispEdges"/>
  <rect x="15" y="3"   width="5"  height="6"  rx="0" fill="#ffd84d" opacity="0.7" id="npcLamp"/>
  <!-- legs -->
  <rect id="nl1" x="2"  y="22" width="5" height="8" rx="0" fill="#1c1030" shape-rendering="crispEdges"/>
  <rect id="nl2" x="9"  y="22" width="5" height="8" rx="0" fill="#1c1030" shape-rendering="crispEdges"/>
</g>
  `;

  document.body.appendChild(svg);

  // ═══════════════════════════════════════════════════════
  // Window flicker system
  // ═══════════════════════════════════════════════════════
  const winData = [
    { id:'wShed',   base:0.18 },
    { id:'wL1a',    base:0.28 }, { id:'wL1b', base:0.20 },
    { id:'wL2a',    base:0.36 }, { id:'wL2b', base:0.28 },
    { id:'wL2c',    base:0.20 }, { id:'wL2d', base:0.16 },
    { id:'wL3a',    base:0.22 }, { id:'wL3b', base:0.16 },
    { id:'wCLa',    base:0.26 }, { id:'wCLb', base:0.20 },
    { id:'wTowerRose', base:0.22 },
    { id:'wTa',     base:0.38 }, { id:'wTb',  base:0.30 },
    { id:'wTc',     base:0.18 },
    { id:'wCRa',    base:0.30 }, { id:'wCRb', base:0.22 }, { id:'wCRc', base:0.16 },
    { id:'wR1rose', base:0.20 },
    { id:'wR1a',    base:0.20 }, { id:'wR1b', base:0.16 },
    { id:'wR2a',    base:0.30 }, { id:'wR2b', base:0.26 }, { id:'wR2c', base:0.24 },
    { id:'wR2d',    base:0.20 }, { id:'wR2e', base:0.18 },
    { id:'wR3a',    base:0.22 }, { id:'wR3b', base:0.16 },
    { id:'shadow-win', base:0.24 },
  ];

  const wins = winData
    .map(d => ({ el: svg.getElementById(d.id), base: d.base }))
    .filter(d => d.el);

  async function flickerWin(w) {
    const flickers = randI(1, 5);
    for (let i = 0; i < flickers; i++) {
      w.el.setAttribute('opacity', '0');
      await wait(rand(30, 100));
      w.el.setAttribute('opacity', w.base);
      await wait(rand(40, 110));
    }
    w.el.setAttribute('opacity', '0');
    await wait(rand(6000, 40000));
    for (let o = 0; o <= 16; o++) {
      w.el.setAttribute('opacity', (w.base * o / 16).toFixed(3));
      await wait(60);
    }
  }

  async function windowLoop() {
    while (true) {
      await wait(rand(3000, 12000));
      const w = wins[randI(0, wins.length)];
      if (w.el.id === 'shadow-win') continue;
      flickerWin(w);
    }
  }
  windowLoop();

  // ═══════════════════════════════════════════════════════
  // Shadow figure in wizard tower window
  // ═══════════════════════════════════════════════════════
  const figure    = svg.getElementById('shadow-figure');
  const shadowWin = svg.getElementById('shadow-win');

  async function shadowLoop() {
    while (true) {
      await wait(rand(20000, 60000));
      if (parseFloat(shadowWin.getAttribute('opacity')) < 0.05) continue;
      figure.setAttribute('opacity', '0.92');
      const dir   = Math.random() > 0.5 ? 1 : -1;
      let   dx    = 0;
      const steps = randI(10, 24);
      for (let i = 0; i < steps; i++) {
        dx += dir * 0.4;
        figure.setAttribute('transform', `translate(${dx},0)`);
        await wait(90);
      }
      await wait(rand(600, 2200));
      figure.setAttribute('opacity', '0');
      figure.setAttribute('transform', 'translate(0,0)');
    }
  }
  shadowLoop();

  // ═══════════════════════════════════════════════════════
  // Pixel cat walk
  // ═══════════════════════════════════════════════════════
  const cat  = svg.getElementById('cat');
  const legs = ['cl1','cl2','cl3','cl4'].map(id => svg.getElementById(id));
  let legFrame = 0, legTimer = null;

  function startLegs(ms) {
    legTimer = setInterval(() => {
      legFrame = (legFrame + 1) % 4;
      legs.forEach((l, i) => {
        const up = (i % 2 === 0) ? legFrame < 2 : legFrame >= 2;
        l.setAttribute('y',      up ? '11' : '14');
        l.setAttribute('height', up ? '12' : '10');
      });
    }, ms);
  }
  function stopLegs() {
    clearInterval(legTimer); legTimer = null;
    legs.forEach(l => { l.setAttribute('y','14'); l.setAttribute('height','10'); });
  }

  async function catLoop() {
    while (true) {
      await wait(rand(15000, 50000));
      const goRight = Math.random() > 0.5;
      const startX  = goRight ? -120 : 1560;
      const endX    = goRight ? rand(300, 1200) : rand(200, 1100);
      const speed   = rand(0.6, 1.2);

      const setPos = x => {
        if (!goRight) {
          cat.setAttribute('transform', `translate(${x + 50},192) scale(-1,1) translate(-50,0)`);
        } else {
          cat.setAttribute('transform', `translate(${x},192)`);
        }
      };

      setPos(startX);
      cat.setAttribute('opacity', '0');
      await wait(80);
      cat.setAttribute('opacity', '0.94');
      startLegs(100);

      let x = startX;
      const dir = goRight ? 1 : -1;
      while ((goRight && x < endX) || (!goRight && x > endX)) {
        x += dir * speed;
        setPos(x);
        await wait(28);
      }
      stopLegs();
      await wait(rand(800, 3500));
      for (let o = 9; o >= 0; o--) {
        cat.setAttribute('opacity', (o / 10).toFixed(1));
        await wait(50);
      }
    }
  }
  catLoop();

  // ═══════════════════════════════════════════════════════
  // NPC wander
  // ═══════════════════════════════════════════════════════
  const npc    = svg.getElementById('npc');
  const npcL1  = svg.getElementById('nl1');
  const npcL2  = svg.getElementById('nl2');
  let npcX = 310, npcDir = 1, npcPause = 0, npcLegT = 0;

  async function npcLoop() {
    while (true) {
      await wait(40);
      if (npcPause > 0) {
        npcPause--;
        // breathe bob
        npc.setAttribute('transform', `translate(${npcX},${186 + Math.sin(Date.now() * 0.002) * 1})`);
      } else {
        npcX += npcDir * 0.35;
        npcLegT++;
        const legUp = npcLegT % 20 < 10;
        npcL1.setAttribute('y', legUp ? '20' : '22');
        npcL2.setAttribute('y', legUp ? '22' : '20');
        npc.setAttribute('transform', `translate(${npcX},186) scale(${npcDir > 0 ? 1 : -1},1) translate(${npcDir > 0 ? 0 : -16},0)`);
        if (npcX < 240 || npcX > 440) { npcDir *= -1; npcPause = randI(60, 180); }
      }
      // lantern flicker
      const lEl = svg.getElementById('npcLamp');
      if (lEl) lEl.setAttribute('opacity', (0.55 + Math.sin(Date.now() * 0.003) * 0.2).toFixed(2));
    }
  }
  npcLoop();

  // ═══════════════════════════════════════════════════════
  // Lantern flicker
  // ═══════════════════════════════════════════════════════
  const lampXs = [400, 860, 1074];
  const lamps = lampXs.map(lx => ({
    dot:  svg.getElementById(`lamp_dot_${lx}`),
    glow: svg.getElementById(`lamp_glow_${lx}`),
    fill: svg.getElementById(`lamp_fill_${lx}`),
    base: 0.8, baseG: 0.12
  })).filter(l => l.dot);

  async function lampFlicker(l) {
    while (true) {
      await wait(rand(1200, 5000));
      const d = rand(0.25, 0.55);
      l.dot.setAttribute('opacity', d);
      if (l.glow) l.glow.setAttribute('opacity', d * 0.13);
      await wait(rand(40, 160));
      l.dot.setAttribute('opacity', l.base);
      if (l.glow) l.glow.setAttribute('opacity', l.baseG);
    }
  }
  lamps.forEach(l => lampFlicker(l));

  // ═══════════════════════════════════════════════════════
  // Spire glow pulse
  // ═══════════════════════════════════════════════════════
  const spire = svg.getElementById('spireGlow');
  if (spire) {
    (async () => {
      while (true) {
        await wait(40);
        spire.setAttribute('opacity', (0.35 + 0.25 * Math.sin(Date.now() * 0.0015)).toFixed(2));
      }
    })();
  }

  // ═══════════════════════════════════════════════════════
  // Star twinkle
  // ═══════════════════════════════════════════════════════
  const starEls = [...svg.querySelectorAll('.star')];
  starEls.forEach(s => {
    const base = parseFloat(s.getAttribute('opacity'));
    (async () => {
      let t = Math.random() * Math.PI * 2;
      while (true) {
        await wait(60 + Math.random() * 40);
        t += 0.06 + Math.random() * 0.04;
        s.setAttribute('opacity', Math.max(0.1, base * (0.5 + 0.5 * Math.sin(t))).toFixed(2));
      }
    })();
  });

  // ═══════════════════════════════════════════════════════
  // Fireflies (DOM divs — keep original system)
  // ═══════════════════════════════════════════════════════
  for (let i = 0; i < 22; i++) {
    const f = document.createElement('div');
    f.className = 'firefly';
    f.style.cssText = [
      `left:${rand(2, 95)}%`,
      `top:${rand(4, 48)}%`,
      `--dur:${rand(3, 7)}s`,
      `--del:${rand(0, 8)}s`,
      `--dx:${(Math.random() - .5) * 44}px`,
      `--dy:${(Math.random() - .5) * 30}px`,
    ].join(';');
    document.body.appendChild(f);
  }

  // ═══════════════════════════════════════════════════════
  // Mobile nav toggle (keep original)
  // ═══════════════════════════════════════════════════════
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));

})();
