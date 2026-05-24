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

  // arched window path: x,y = top-left, w=width, h=height, archH=arch height
  // Returns a path string for a rectangle with rounded arch top
  function archWin(x, y, w, h, archH) {
    const r = w / 2;
    const archY = y + archH;
    return `M${x},${y + h} L${x},${archY} Q${x},${y} ${x + r},${y} Q${x + w},${y} ${x + w},${archY} L${x + w},${y + h} Z`;
  }

  svg.innerHTML = `
<defs>
  <linearGradient id="gnd" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%"   stop-color="#0d141c" stop-opacity="0"/>
    <stop offset="55%"  stop-color="#080f18" stop-opacity="0.9"/>
    <stop offset="100%" stop-color="#050b12" stop-opacity="1"/>
  </linearGradient>
  <filter id="glow">
    <feGaussianBlur stdDeviation="2.5" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>

<!-- full bleed background fade -->
<rect x="0" y="0" width="1440" height="260" fill="url(#gnd)"/>

<!-- ── DISTANT MOUNTAINS ── -->
<polygon points="
  0,185 50,148 110,165 180,128 250,150 330,112
  410,135 490,102 575,125 660,95 745,118 830,88
  915,112 1000,82 1085,108 1165,80 1250,104 1335,82 1440,98
  1440,260 0,260"
  fill="#0b1824" opacity="0.9"/>

<!-- mid hills -->
<ellipse cx="160"  cy="230" rx="240" ry="52" fill="#08101c"/>
<ellipse cx="720"  cy="234" rx="320" ry="50" fill="#08101c"/>
<ellipse cx="1280" cy="230" rx="280" ry="52" fill="#08101c"/>

<!-- ground -->
<rect x="0" y="238" width="1440" height="22" fill="#050b12"/>

<!-- ════════════════════════════════════
     LEFT CLUSTER — cottage + tall inn
     ════════════════════════════════════ -->

<!-- tiny shed far left -->
<rect x="0" y="205" width="28" height="38" fill="#091420"/>
<polygon points="-4,207 32,207 14,185" fill="#0c1c2e"/>

<!-- cottage L1 — steep pitched roof, narrow -->
<rect x="32" y="188" width="42" height="55" fill="#091420"/>
<polygon points="26,190 78,190 52,160" fill="#0c1c2e"/>
<!-- stone detail lines -->
<line x1="32" y1="205" x2="74" y2="205" stroke="#0b1828" stroke-width="1" opacity="0.6"/>
<line x1="32" y1="220" x2="74" y2="220" stroke="#0b1828" stroke-width="1" opacity="0.6"/>
<!-- arched windows L1 -->
<path d="${archWin(40,196,10,14,5)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(40,196,10,14,5)}" fill="#ffd84d" opacity="0.20" id="wL1a"/>
<path d="${archWin(56,196,10,14,5)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(56,196,10,14,5)}" fill="#ffd84d" opacity="0.15" id="wL1b"/>
<!-- door arch -->
<path d="${archWin(45,220,14,23,7)}" fill="#050d18" stroke="#122030" stroke-width="1"/>

<!-- inn L2 — tallest left, crenellated tower -->
<rect x="82" y="150" width="56" height="93" fill="#091420"/>
<polygon points="76,152 144,152 110,120" fill="#0c1c2e"/>
<!-- battlements -->
<rect x="82" y="142" width="11" height="13" rx="1" fill="#091420"/>
<rect x="97" y="142" width="11" height="13" rx="1" fill="#091420"/>
<rect x="112" y="142" width="11" height="13" rx="1" fill="#091420"/>
<rect x="127" y="142" width="11" height="13" rx="1" fill="#091420"/>
<!-- chimney -->
<rect x="134" y="118" width="8" height="26" fill="#07101a"/>
<!-- stone layers -->
<line x1="82" y1="175" x2="138" y2="175" stroke="#0b1828" stroke-width="1" opacity="0.5"/>
<line x1="82" y1="195" x2="138" y2="195" stroke="#0b1828" stroke-width="1" opacity="0.5"/>
<line x1="82" y1="215" x2="138" y2="215" stroke="#0b1828" stroke-width="1" opacity="0.5"/>
<!-- arched windows inn -->
<path d="${archWin(92,158,13,18,7)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(92,158,13,18,7)}" fill="#ffd84d" opacity="0.32" id="wL2a"/>
<path d="${archWin(113,158,13,18,7)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(113,158,13,18,7)}" fill="#ffd84d" opacity="0.26" id="wL2b"/>
<path d="${archWin(92,183,13,18,7)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(92,183,13,18,7)}" fill="#ffd84d" opacity="0.18" id="wL2c"/>
<!-- inn sign -->
<rect x="96" y="210" width="28" height="6" rx="1" fill="#0d2030" stroke="#1a3048" stroke-width="1"/>
<!-- door -->
<path d="${archWin(101,220,18,23,9)}" fill="#050d18" stroke="#122030" stroke-width="1"/>

<!-- small house L3 -->
<rect x="150" y="195" width="36" height="48" fill="#091420"/>
<polygon points="144,197 190,197 167,172" fill="#0c1c2e"/>
<path d="${archWin(158,204,10,14,5)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(158,204,10,14,5)}" fill="#ffd84d" opacity="0.14" id="wL3a"/>
<path d="${archWin(172,204,10,14,5)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(172,204,10,14,5)}" fill="#ffd84d" opacity="0.12" id="wL3b"/>

<!-- LEFT PINE TREES -->
<polygon points="205,243 215,208 225,243" fill="#071410"/>
<polygon points="203,234 215,200 227,234" fill="#0a1d16"/>
<polygon points="225,244 234,212 243,244" fill="#071410"/>
<polygon points="223,235 234,204 245,235" fill="#0a1d16"/>

<!-- ════════════════════════════════════
     CENTRE CLUSTER — wizard tower + tavern
     ════════════════════════════════════ -->

<!-- house C1 left -->
<rect x="588" y="172" width="44" height="71" fill="#091420"/>
<polygon points="582,174 638,174 610,148" fill="#0c1c2e"/>
<line x1="588" y1="195" x2="632" y2="195" stroke="#0b1828" stroke-width="1" opacity="0.5"/>
<path d="${archWin(597,180,11,16,6)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(597,180,11,16,6)}" fill="#ffd84d" opacity="0.24" id="wC1a"/>
<path d="${archWin(615,180,11,16,6)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(615,180,11,16,6)}" fill="#ffd84d" opacity="0.20" id="wC1b"/>
<path d="${archWin(604,202,10,14,5)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(604,202,10,14,5)}" fill="#ffd84d" opacity="0.14" id="wC1c"/>
<path d="${archWin(600,220,18,23,9)}" fill="#050d18" stroke="#122030" stroke-width="1"/>

<!-- wizard / clock tower C2 — tallest -->
<rect x="648" y="125" width="50" height="118" fill="#091420"/>
<!-- conical roof -->
<polygon points="641,127 705,127 673,90" fill="#0a1928"/>
<!-- spire -->
<line x1="673" y1="90" x2="673" y2="75" stroke="#ffd84d" stroke-width="2" opacity="0.4"/>
<circle cx="673" cy="74" r="3" fill="#ffd84d" opacity="0.5"/>
<!-- battlements -->
<rect x="648" y="117" width="9" height="11" rx="1" fill="#091420"/>
<rect x="661" y="117" width="9" height="11" rx="1" fill="#091420"/>
<rect x="674" y="117" width="9" height="11" rx="1" fill="#091420"/>
<rect x="687" y="117" width="9" height="11" rx="1" fill="#091420"/>
<!-- stone -->
<line x1="648" y1="152" x2="698" y2="152" stroke="#0b1828" stroke-width="1" opacity="0.5"/>
<line x1="648" y1="175" x2="698" y2="175" stroke="#0b1828" stroke-width="1" opacity="0.5"/>
<line x1="648" y1="200" x2="698" y2="200" stroke="#0b1828" stroke-width="1" opacity="0.5"/>
<!-- rose window (circular) at top -->
<circle cx="673" cy="138" r="8" fill="#091420" stroke="#182840" stroke-width="1.5"/>
<circle cx="673" cy="138" r="8" fill="#ffd84d" opacity="0.28" id="wC2rose"/>
<!-- cross divider in rose window -->
<line x1="673" y1="130" x2="673" y2="146" stroke="#091420" stroke-width="1.5"/>
<line x1="665" y1="138" x2="681" y2="138" stroke="#091420" stroke-width="1.5"/>
<!-- tall arched windows -->
<path d="${archWin(655,158,14,20,8)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(655,158,14,20,8)}" fill="#ffd84d" opacity="0.36" id="wC2a"/>
<path d="${archWin(677,158,14,20,8)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(677,158,14,20,8)}" fill="#ffd84d" opacity="0.30" id="wC2b"/>
<!-- shadow figure window -->
<path d="${archWin(655,184,14,20,8)}" fill="#091420" stroke="#182840" stroke-width="1" id="shadow-win-frame"/>
<path d="${archWin(655,184,14,20,8)}" fill="#ffd84d" opacity="0.24" id="shadow-win"/>
<path d="${archWin(677,184,14,20,8)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(677,184,14,20,8)}" fill="#ffd84d" opacity="0.18" id="wC2c"/>
<!-- door -->
<path d="${archWin(661,213,20,30,12)}" fill="#050d18" stroke="#122030" stroke-width="1.5"/>

<!-- tavern C3 right -->
<rect x="710" y="168" width="46" height="75" fill="#091420"/>
<polygon points="704,170 762,170 733,143" fill="#0c1c2e"/>
<!-- tavern sign hanging -->
<line x1="720" y1="168" x2="720" y2="162" stroke="#0d1e30" stroke-width="1.5"/>
<rect x="714" y="155" width="26" height="8" rx="1" fill="#0d2030" stroke="#1a3048" stroke-width="1"/>
<line x1="740" y1="168" x2="740" y2="162" stroke="#0d1e30" stroke-width="1.5"/>
<path d="${archWin(718,178,11,16,6)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(718,178,11,16,6)}" fill="#ffd84d" opacity="0.26" id="wC3a"/>
<path d="${archWin(736,178,11,16,6)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(736,178,11,16,6)}" fill="#ffd84d" opacity="0.20" id="wC3b"/>
<path d="${archWin(725,200,10,14,5)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(725,200,10,14,5)}" fill="#ffd84d" opacity="0.15" id="wC3c"/>
<path d="${archWin(718,218,22,25,11)}" fill="#050d18" stroke="#122030" stroke-width="1.5"/>

<!-- CENTRE PINES -->
<polygon points="557,243 566,210 575,243" fill="#071410"/>
<polygon points="555,234 566,202 577,234" fill="#0a1d16"/>
<polygon points="762,244 771,211 780,244" fill="#071410"/>
<polygon points="760,235 771,203 782,235" fill="#0a1d16"/>
<polygon points="782,244 790,214 798,244" fill="#071410"/>

<!-- ════════════════════════════════════
     RIGHT CLUSTER — manor + chapel
     ════════════════════════════════════ -->

<!-- chapel R1 — narrow tall with cross -->
<rect x="1162" y="168" width="38" height="75" fill="#091420"/>
<polygon points="1156,170 1206,170 1181,140" fill="#0c1c2e"/>
<!-- cross on roof -->
<line x1="1181" y1="135" x2="1181" y2="118" stroke="#ffd84d" stroke-width="2" opacity="0.35"/>
<line x1="1174" y1="126" x2="1188" y2="126" stroke="#ffd84d" stroke-width="2" opacity="0.35"/>
<!-- rose window -->
<circle cx="1181" cy="180" r="7" fill="#091420" stroke="#182840" stroke-width="1.5"/>
<circle cx="1181" cy="180" r="7" fill="#ffd84d" opacity="0.22" id="wR1rose"/>
<line x1="1181" y1="173" x2="1181" y2="187" stroke="#091420" stroke-width="1.5"/>
<line x1="1174" y1="180" x2="1188" y2="180" stroke="#091420" stroke-width="1.5"/>
<path d="${archWin(1170,193,11,16,6)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(1170,193,11,16,6)}" fill="#ffd84d" opacity="0.18" id="wR1a"/>
<path d="${archWin(1186,193,11,16,6)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(1186,193,11,16,6)}" fill="#ffd84d" opacity="0.15" id="wR1b"/>
<path d="${archWin(1173,213,14,30,9)}" fill="#050d18" stroke="#122030" stroke-width="1"/>

<!-- manor R2 — wide, imposing -->
<rect x="1212" y="140" width="74" height="103" fill="#091420"/>
<polygon points="1205,142 1292,142 1249,108" fill="#0c1c2e"/>
<!-- battlements -->
<rect x="1212" y="131" width="11" height="13" rx="1" fill="#091420"/>
<rect x="1227" y="131" width="11" height="13" rx="1" fill="#091420"/>
<rect x="1242" y="131" width="11" height="13" rx="1" fill="#091420"/>
<rect x="1257" y="131" width="11" height="13" rx="1" fill="#091420"/>
<rect x="1272" y="131" width="11" height="13" rx="1" fill="#091420"/>
<!-- chimneys -->
<rect x="1218" y="105" width="8" height="28" fill="#07101a"/>
<rect x="1278" y="105" width="8" height="28" fill="#07101a"/>
<!-- stone layers -->
<line x1="1212" y1="165" x2="1286" y2="165" stroke="#0b1828" stroke-width="1" opacity="0.5"/>
<line x1="1212" y1="188" x2="1286" y2="188" stroke="#0b1828" stroke-width="1" opacity="0.5"/>
<line x1="1212" y1="210" x2="1286" y2="210" stroke="#0b1828" stroke-width="1" opacity="0.5"/>
<!-- arched windows manor -->
<path d="${archWin(1220,148,13,20,8)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(1220,148,13,20,8)}" fill="#ffd84d" opacity="0.28" id="wR2a"/>
<path d="${archWin(1242,148,13,20,8)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(1242,148,13,20,8)}" fill="#ffd84d" opacity="0.24" id="wR2b"/>
<path d="${archWin(1264,148,13,20,8)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(1264,148,13,20,8)}" fill="#ffd84d" opacity="0.22" id="wR2c"/>
<path d="${archWin(1220,175,13,18,7)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(1220,175,13,18,7)}" fill="#ffd84d" opacity="0.18" id="wR2d"/>
<path d="${archWin(1264,175,13,18,7)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(1264,175,13,18,7)}" fill="#ffd84d" opacity="0.16" id="wR2e"/>
<!-- grand door -->
<path d="${archWin(1236,200,28,43,16)}" fill="#050d18" stroke="#122030" stroke-width="1.5"/>

<!-- house R3 -->
<rect x="1300" y="182" width="40" height="61" fill="#091420"/>
<polygon points="1294,184 1346,184 1320,158" fill="#0c1c2e"/>
<path d="${archWin(1308,192,11,16,6)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(1308,192,11,16,6)}" fill="#ffd84d" opacity="0.18" id="wR3a"/>
<path d="${archWin(1324,192,11,16,6)}" fill="#091420" stroke="#182840" stroke-width="1"/>
<path d="${archWin(1324,192,11,16,6)}" fill="#ffd84d" opacity="0.14" id="wR3b"/>

<!-- far right shed -->
<rect x="1352" y="208" width="32" height="35" fill="#091420"/>
<polygon points="1348,210 1388,210 1368,190" fill="#0c1c2e"/>

<!-- RIGHT PINES -->
<polygon points="1120,244 1130,210 1140,244" fill="#071410"/>
<polygon points="1118,235 1130,202 1142,235" fill="#0a1d16"/>
<polygon points="1140,244 1149,213 1158,244" fill="#071410"/>
<polygon points="1392,242 1401,212 1410,242" fill="#071410"/>
<polygon points="1410,243 1419,215 1428,243" fill="#071410"/>

<!-- ════════════════════════════════════
     LANTERN POSTS
     ════════════════════════════════════ -->
<rect x="392" y="196" width="3" height="46" fill="#1a2838"/>
<rect x="387" y="193" width="13" height="6" rx="2" fill="#1a2838"/>
<circle cx="393" cy="191" r="6" fill="#ffd84d" opacity="0.70" id="lamp1" filter="url(#glow)"/>
<circle cx="393" cy="191" r="14" fill="#ffd84d" opacity="0.08" id="lamp1g"/>

<rect x="862" y="196" width="3" height="46" fill="#1a2838"/>
<rect x="857" y="193" width="13" height="6" rx="2" fill="#1a2838"/>
<circle cx="863" cy="191" r="6" fill="#ffd84d" opacity="0.62" id="lamp2" filter="url(#glow)"/>
<circle cx="863" cy="191" r="14" fill="#ffd84d" opacity="0.07" id="lamp2g"/>

<rect x="1075" y="196" width="3" height="46" fill="#1a2838"/>
<rect x="1070" y="193" width="13" height="6" rx="2" fill="#1a2838"/>
<circle cx="1076" cy="191" r="6" fill="#ffd84d" opacity="0.55" id="lamp3" filter="url(#glow)"/>
<circle cx="1076" cy="191" r="14" fill="#ffd84d" opacity="0.06" id="lamp3g"/>

<!-- ════════════════════════════════════
     SHADOW FIGURE — inside tower window
     ════════════════════════════════════ -->
<g id="shadow-figure" opacity="0">
  <ellipse cx="662" cy="188" rx="4" ry="4" fill="#04090f"/>
  <path d="M658,192 Q658,205 662,205 Q666,205 666,192 Z" fill="#04090f"/>
</g>

<!-- ════════════════════════════════════
     CAT
     ════════════════════════════════════ -->
<g id="cat" opacity="0" transform="translate(-80,222)">
  <!-- body -->
  <ellipse cx="20" cy="7" rx="15" ry="7" fill="#0c1c2c"/>
  <!-- head -->
  <ellipse cx="33" cy="3" rx="7" ry="6" fill="#0c1c2c"/>
  <!-- ears -->
  <polygon points="29,-1 31,-7 34,-1" fill="#0c1c2c"/>
  <polygon points="33,-1 36,-7 38,-1" fill="#0c1c2c"/>
  <!-- eye -->
  <ellipse cx="35" cy="2" rx="1.5" ry="1" fill="#ffd84d" opacity="0.95"/>
  <!-- tail -->
  <path d="M5,6 Q-6,2 -5,-5" stroke="#0c1c2c" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- legs -->
  <rect id="cl1" x="10" y="13" width="4" height="7" rx="2" fill="#0c1c2c"/>
  <rect id="cl2" x="17" y="13" width="4" height="7" rx="2" fill="#0c1c2c"/>
  <rect id="cl3" x="24" y="13" width="4" height="7" rx="2" fill="#0c1c2c"/>
  <rect id="cl4" x="31" y="13" width="4" height="7" rx="2" fill="#0c1c2c"/>
</g>
  `;

  document.body.appendChild(svg);

  // ══════════════════════════════════════
  // Windows
  // ══════════════════════════════════════
  const winData = [
    { id:'wL1a', base:0.20 }, { id:'wL1b', base:0.15 },
    { id:'wL2a', base:0.32 }, { id:'wL2b', base:0.26 }, { id:'wL2c', base:0.18 },
    { id:'wL3a', base:0.14 }, { id:'wL3b', base:0.12 },
    { id:'wC1a', base:0.24 }, { id:'wC1b', base:0.20 }, { id:'wC1c', base:0.14 },
    { id:'wC2rose', base:0.28 },
    { id:'wC2a',  base:0.36 }, { id:'wC2b', base:0.30 },
    { id:'wC2c',  base:0.18 },
    { id:'wC3a',  base:0.26 }, { id:'wC3b', base:0.20 }, { id:'wC3c', base:0.15 },
    { id:'wR1rose', base:0.22 },
    { id:'wR1a',  base:0.18 }, { id:'wR1b', base:0.15 },
    { id:'wR2a',  base:0.28 }, { id:'wR2b', base:0.24 }, { id:'wR2c', base:0.22 },
    { id:'wR2d',  base:0.18 }, { id:'wR2e', base:0.16 },
    { id:'wR3a',  base:0.18 }, { id:'wR3b', base:0.14 },
    { id:'shadow-win', base:0.24 },
  ];

  const wins = winData.map(d => ({ el: svg.getElementById(d.id), base: d.base }))
                      .filter(d => d.el);

  async function flickerWin(w) {
    const flickers = randI(1, 4);
    for (let i = 0; i < flickers; i++) {
      w.el.setAttribute('opacity', '0');
      await wait(rand(40, 130));
      w.el.setAttribute('opacity', w.base);
      await wait(rand(50, 120));
    }
    w.el.setAttribute('opacity', '0');
    await wait(rand(8000, 45000));
    for (let o = 0; o <= 12; o++) {
      w.el.setAttribute('opacity', (w.base * o / 12).toFixed(3));
      await wait(80);
    }
  }

  async function windowLoop() {
    while (true) {
      await wait(rand(4000, 14000));
      const w = wins[randI(0, wins.length)];
      if (w.el.id === 'shadow-win') continue;
      flickerWin(w);
    }
  }
  windowLoop();

  // ══════════════════════════════════════
  // Shadow figure
  // ══════════════════════════════════════
  const figure    = svg.getElementById('shadow-figure');
  const shadowWin = svg.getElementById('shadow-win');

  async function shadowLoop() {
    while (true) {
      await wait(rand(25000, 70000));
      if (parseFloat(shadowWin.getAttribute('opacity')) < 0.05) continue;
      figure.setAttribute('opacity', '0.88');
      const dir   = Math.random() > 0.5 ? 1 : -1;
      let   dx    = 0;
      const steps = randI(12, 28);
      for (let i = 0; i < steps; i++) {
        dx += dir * 0.3;
        figure.setAttribute('transform', `translate(${dx},0)`);
        await wait(100);
      }
      await wait(rand(800, 2500));
      figure.setAttribute('opacity', '0');
      figure.setAttribute('transform', 'translate(0,0)');
    }
  }
  shadowLoop();

  // ══════════════════════════════════════
  // Cat
  // ══════════════════════════════════════
  const cat  = svg.getElementById('cat');
  const legs = ['cl1','cl2','cl3','cl4'].map(id => svg.getElementById(id));
  let legFrame = 0, legTimer = null;

  function startLegs(ms) {
    legTimer = setInterval(() => {
      legFrame = (legFrame + 1) % 4;
      legs.forEach((l, i) => {
        const up = (i % 2 === 0) ? legFrame < 2 : legFrame >= 2;
        l.setAttribute('y',      up ? '11' : '13');
        l.setAttribute('height', up ? '9'  : '7');
      });
    }, ms);
  }
  function stopLegs() {
    clearInterval(legTimer); legTimer = null;
    legs.forEach(l => { l.setAttribute('y','13'); l.setAttribute('height','7'); });
  }

  async function catLoop() {
    while (true) {
      await wait(rand(18000, 55000));
      const goRight = Math.random() > 0.5;
      const startX  = goRight ? -80 : 1500;
      const endX    = goRight ? rand(350, 1200) : rand(200, 1050);
      const speed   = rand(0.5, 1.0);

      const setPos = x => {
        if (!goRight) {
          cat.setAttribute('transform', `translate(${x + 40},222) scale(-1,1) translate(-40,0)`);
        } else {
          cat.setAttribute('transform', `translate(${x},222)`);
        }
      };

      setPos(startX);
      cat.setAttribute('opacity', '0');
      await wait(80);
      cat.setAttribute('opacity', '0.93');
      startLegs(110);

      let x = startX;
      const dir = goRight ? 1 : -1;
      while ((goRight && x < endX) || (!goRight && x > endX)) {
        x += dir * speed;
        setPos(x);
        await wait(32);
      }

      stopLegs();
      await wait(rand(1000, 4000));
      for (let o = 9; o >= 0; o--) {
        cat.setAttribute('opacity', (o / 10).toFixed(1));
        await wait(55);
      }
    }
  }
  catLoop();

  // ══════════════════════════════════════
  // Lantern flicker
  // ══════════════════════════════════════
  const lamps = [
    { dot: svg.getElementById('lamp1'), glow: svg.getElementById('lamp1g'), base:0.70, baseG:0.08 },
    { dot: svg.getElementById('lamp2'), glow: svg.getElementById('lamp2g'), base:0.62, baseG:0.07 },
    { dot: svg.getElementById('lamp3'), glow: svg.getElementById('lamp3g'), base:0.55, baseG:0.06 },
  ];
  async function lampFlicker(l) {
    while (true) {
      await wait(rand(1500, 6000));
      const d = rand(0.3, 0.55);
      l.dot.setAttribute('opacity', d);
      l.glow.setAttribute('opacity', d * 0.11);
      await wait(rand(50, 180));
      l.dot.setAttribute('opacity', l.base);
      l.glow.setAttribute('opacity', l.baseG);
    }
  }
  lamps.forEach(l => lampFlicker(l));

  // ══════════════════════════════════════
  // Fireflies
  // ══════════════════════════════════════
  for (let i = 0; i < 18; i++) {
    const f = document.createElement('div');
    f.className = 'firefly';
    f.style.cssText = [
      `left:${rand(2,95)}%`,
      `top:${rand(5,52)}%`,
      `--dur:${rand(3,7)}s`,
      `--del:${rand(0,7)}s`,
      `--dx:${(Math.random()-.5)*40}px`,
      `--dy:${(Math.random()-.5)*28}px`,
    ].join(';');
    document.body.appendChild(f);
  }

  // ══════════════════════════════════════
  // Mobile nav
  // ══════════════════════════════════════
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));

})();
