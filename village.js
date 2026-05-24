(function () {

  const rand  = (a, b) => Math.random() * (b - a) + a;
  const randI = (a, b) => Math.floor(rand(a, b));
  const wait  = ms => new Promise(r => setTimeout(r, ms));

  // ── Canvas pixel art setup ──
  // Draw at 320x60 logical pixels, scale up 4x = 1280x240 display
  // This gives chunky SNES-style pixels
  const SCALE = 4;
  const W = 320;
  const H = 60;

  const canvas = document.createElement('canvas');
  canvas.width  = W * SCALE;
  canvas.height = H * SCALE;
  canvas.style.cssText = [
    'position:fixed',
    'bottom:0',
    'left:0',
    'width:100%',
    'height:auto',
    'max-height:240px',
    'image-rendering:pixelated',
    'image-rendering:crisp-edges',
    '-ms-interpolation-mode:nearest-neighbor',
    'z-index:2',
    'pointer-events:none',
  ].join(';');
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  // ── Pixel helpers ──
  function rect(x, y, w, h, c) {
    ctx.fillStyle = c;
    ctx.fillRect(Math.round(x)*SCALE, Math.round(y)*SCALE, Math.round(w)*SCALE, Math.round(h)*SCALE);
  }
  function dot(x, y, c) { rect(x, y, 1, 1, c); }
  function hline(x, y, w, c) { rect(x, y, w, 1, c); }
  function vline(x, y, h, c) { rect(x, y, 1, h, c); }

  // lerp two hex colors
  function lerpColor(c1, c2, t) {
    const h = s => parseInt(s, 16);
    const r1=h(c1.slice(1,3)),g1=h(c1.slice(3,5)),b1=h(c1.slice(5,7));
    const r2=h(c2.slice(1,3)),g2=h(c2.slice(3,5)),b2=h(c2.slice(5,7));
    return `rgb(${Math.round(r1+(r2-r1)*t)},${Math.round(g1+(g2-g1)*t)},${Math.round(b1+(b2-b1)*t)})`;
  }

  // ── Palette ──
  const C = {
    sky:     '#0a1220',
    mtn_dk:  '#0c1828',
    mtn_md:  '#0f2035',
    ground:  '#060c10',
    dirt:    '#07101a',
    wall_dk: '#091420',
    wall_md: '#0c1c2c',
    wall_lt: '#102438',
    roof_dk: '#081628',
    roof_md: '#0c2040',
    roof_lt: '#112850',
    win_on:  '#ffd84d',
    win_dim: '#c4922a',
    win_off: '#091420',
    win_frm: '#1a3050',
    door:    '#04080f',
    tree_1:  '#061008',
    tree_2:  '#091808',
    tree_3:  '#0d200e',
    tree_4:  '#102614',
    tree_5:  '#142e18',
    lamp:    '#ffd84d',
    shadow:  '#020507',
    black:   '#020406',
  };

  // ── Window state ──
  // Each window: { x, y, w, h, b (brightness 0-1), base }
  // Positioned to sit ON the building walls
  const wins = {
    // Left cottage
    wL1a: {x:7,  y:40, w:3, h:4, b:1, base:1},
    wL1b: {x:12, y:40, w:3, h:4, b:1, base:1},
    // Left inn
    wL2a: {x:25, y:30, w:3, h:5, b:1, base:1},
    wL2b: {x:30, y:30, w:3, h:5, b:1, base:1},
    wL2c: {x:25, y:37, w:3, h:4, b:.7, base:.7},
    wL2d: {x:30, y:37, w:3, h:4, b:.7, base:.7},
    // Left small house
    wL3a: {x:45, y:42, w:3, h:4, b:.8, base:.8},
    wL3b: {x:50, y:42, w:3, h:4, b:.6, base:.6},
    // Centre left house
    wC1a: {x:104,y:35, w:3, h:5, b:1,  base:1},
    wC1b: {x:109,y:35, w:3, h:5, b:1,  base:1},
    // Tower rose window
    wCr:  {x:121,y:22, w:5, h:5, b:1,  base:1},
    // Tower upper windows
    wC2a: {x:119,y:30, w:3, h:5, b:1,  base:1},
    wC2b: {x:124,y:30, w:3, h:5, b:1,  base:1},
    // Tower shadow window
    wCs:  {x:119,y:37, w:3, h:5, b:.8, base:.8},
    wC2c: {x:124,y:37, w:3, h:5, b:.8, base:.8},
    // Tavern
    wC3a: {x:138,y:35, w:3, h:5, b:1,  base:1},
    wC3b: {x:143,y:35, w:3, h:5, b:1,  base:1},
    // Right chapel
    wR1a: {x:232,y:38, w:3, h:4, b:.8, base:.8},
    wR1b: {x:237,y:38, w:3, h:4, b:.7, base:.7},
    // Right manor
    wR2a: {x:250,y:28, w:3, h:5, b:1,  base:1},
    wR2b: {x:255,y:28, w:3, h:5, b:1,  base:1},
    wR2c: {x:260,y:28, w:3, h:5, b:1,  base:1},
    wR2d: {x:250,y:36, w:3, h:4, b:.7, base:.7},
    wR2e: {x:260,y:36, w:3, h:4, b:.7, base:.7},
    // Right house
    wR3a: {x:277,y:38, w:3, h:4, b:.8, base:.8},
    wR3b: {x:282,y:38, w:3, h:4, b:.6, base:.6},
  };

  // Lanterns
  const lamps = [
    {x:78,  y:50, b:1},
    {x:163, y:50, b:1},
    {x:200, y:50, b:1},
  ];

  // Cat state
  const cat = {x:-20, y:52, dir:1, visible:false, frame:0, tick:0, opacity:1};

  // Shadow figure state
  const shadow = {dx:0, opacity:0};

  // ── DRAW STATIC SCENE ──
  function drawBg() {
    // Sky
    rect(0, 0, W, H, C.sky);

    // Mountains — stepped silhouette
    const ridge = [
      0,38, 8,32, 16,35, 26,28, 36,31, 48,24, 60,27,
      72,20, 84,23, 96,17, 108,20, 120,14, 132,17,
      144,12, 156,15, 168,10, 180,13, 192,8,  204,11,
      216,7,  228,10, 240,6,  252,9,  264,5,  276,8,
      288,4,  300,7,  312,3,  320,6,
    ];
    ctx.fillStyle = C.mtn_dk;
    ctx.beginPath();
    ctx.moveTo(0, H * SCALE);
    for (let i = 0; i < ridge.length; i += 2) {
      ctx.lineTo(ridge[i] * SCALE, ridge[i+1] * SCALE);
    }
    ctx.lineTo(W * SCALE, H * SCALE);
    ctx.closePath();
    ctx.fill();

    // Second closer hill
    const hill = [0,48, 40,42, 80,45, 120,40, 160,43, 200,39, 240,42, 280,38, 320,41];
    ctx.fillStyle = C.mtn_md;
    ctx.beginPath();
    ctx.moveTo(0, H * SCALE);
    for (let i = 0; i < hill.length; i += 2) {
      ctx.lineTo(hill[i] * SCALE, hill[i+1] * SCALE);
    }
    ctx.lineTo(W * SCALE, H * SCALE);
    ctx.closePath();
    ctx.fill();

    // Ground
    rect(0, 55, W, 5, C.dirt);
    rect(0, 57, W, 3, C.ground);
  }

  // Draw a pixel-art building wall with stone rows
  function drawWall(x, y, w, h) {
    rect(x, y, w, h, C.wall_dk);
    // stone row highlights every 3px
    for (let row = y+2; row < y+h; row += 3) {
      hline(x+1, row, w-2, C.wall_md);
    }
    // subtle right edge shadow
    vline(x+w-1, y, h, C.wall_dk);
  }

  // Draw pitched roof
  function drawRoof(cx, y, w, steep) {
    // steep: how many px tall per px wide
    const half = Math.floor(w/2);
    for (let i = 0; i <= half; i++) {
      hline(cx - half + i, y + (steep ? i : Math.floor(i*0.7)), w - i*2, i===0 ? C.roof_lt : C.roof_dk);
    }
  }

  // Draw stepped pyramid roof (for tower)
  function drawTowerRoof(cx, baseY, steps) {
    for (let s = 0; s < steps; s++) {
      const w = (steps - s) * 2;
      hline(cx - (steps-s) + 1, baseY - s, w, s < 2 ? C.roof_lt : C.roof_dk);
    }
  }

  // Draw pixel window with frame
  function drawWin(x, y, w, h, brightness) {
    // frame (1px border)
    rect(x-1, y-1, w+2, h+2, C.win_frm);
    // glass
    const color = brightness < 0.05
      ? C.win_off
      : lerpColor(C.win_off, C.win_on, brightness);
    rect(x, y, w, h, color);
    // window divider cross (for larger windows)
    if (w >= 3 && h >= 4) {
      vline(x + Math.floor(w/2), y, h, brightness < 0.05 ? C.wall_md : lerpColor(C.win_on, C.win_frm, 0.6));
      hline(x, y + Math.floor(h/2), w, brightness < 0.05 ? C.wall_md : lerpColor(C.win_on, C.win_frm, 0.6));
    }
  }

  // Draw arched door
  function drawDoor(x, y, w, h) {
    rect(x, y, w, h, C.door);
    // arch top
    rect(x+1, y-1, w-2, 1, C.door);
    // frame
    vline(x-1, y-1, h+1, C.wall_md);
    vline(x+w, y-1, h+1, C.wall_md);
  }

  // Draw JRPG pixel tree
  function drawTree(cx, baseY, tall) {
    const h = tall ? 18 : 14;
    // trunk
    rect(cx, baseY - 4, 2, 4, '#07110a');
    // shadow base ellipse
    rect(cx-3, baseY-1, 8, 2, '#050e07');
    // 4 canopy tiers bottom to top
    const tiers = [
      {w:10, c:C.tree_2},
      {w:8,  c:C.tree_3},
      {w:6,  c:C.tree_4},
      {w:4,  c:C.tree_5},
    ];
    if (tall) tiers.push({w:2, c:'#182e1c'});
    tiers.forEach((t, i) => {
      const ty = baseY - 4 - (i * 4);
      rect(cx - Math.floor(t.w/2), ty, t.w, 4, t.c);
      // highlight top-left of each tier
      dot(cx - Math.floor(t.w/2) + 1, ty, '#142a16');
      // dark right edge
      vline(cx + Math.floor(t.w/2) - 1, ty, 4, C.tree_2);
    });
    // top pixel highlight
    dot(cx, baseY - 4 - tiers.length*4 + 1, '#1a3820');
  }

  // ── SCENE LAYOUT ──
  function drawBuildings() {

    // ═══ FAR LEFT — cottage ═══
    drawWall(4, 44, 18, 13);
    drawRoof(13, 39, 18, false);
    drawDoor(10, 50, 5, 7);

    // ═══ LEFT — inn (tall) ═══
    drawWall(22, 28, 20, 29);
    drawRoof(32, 22, 22, true);
    // battlements
    for (let bx=22; bx<42; bx+=4) rect(bx, 22, 2, 3, C.wall_md);
    // chimney
    drawWall(38, 18, 3, 8);
    drawDoor(28, 44, 7, 13);

    // ═══ LEFT SMALL HOUSE ═══
    drawWall(43, 42, 14, 15);
    drawRoof(50, 37, 14, false);
    drawDoor(47, 50, 5, 7);

    // LEFT TREES
    drawTree(67, 56, true);
    drawTree(74, 56, false);

    // ═══ CENTRE LEFT HOUSE ═══
    drawWall(100, 33, 18, 24);
    drawRoof(109, 27, 20, false);
    drawDoor(106, 47, 6, 10);

    // ═══ WIZARD TOWER (tallest, centre) ═══
    drawWall(115, 20, 20, 37);
    // stepped pyramid roof
    drawTowerRoof(125, 20, 8);
    // spire
    vline(125, 4, 5, C.lamp);
    dot(124, 3, C.lamp); dot(126, 3, C.lamp);
    // battlements
    for (let bx=115; bx<135; bx+=4) rect(bx, 18, 2, 3, C.wall_md);
    // rose window (pixel circle)
    rect(121, 22, 5, 5, C.win_frm);
    rect(122, 21, 3, 7, C.win_frm);
    rect(120, 23, 7, 3, C.win_frm);
    rect(121, 22, 5, 5, C.win_on);
    vline(123, 22, 5, C.wall_md);
    hline(121, 24, 5, C.wall_md);
    // stone rows
    for (let sy=25; sy<56; sy+=4) hline(115, sy, 20, C.wall_md);
    drawDoor(120, 47, 8, 10);

    // ═══ TAVERN ═══
    drawWall(136, 32, 18, 25);
    drawRoof(145, 26, 20, false);
    // hanging sign
    rect(139, 28, 10, 4, '#0d2030');
    hline(139, 27, 10, C.wall_lt);
    drawDoor(141, 46, 6, 11);

    // CENTRE TREES
    drawTree(160, 56, true);
    drawTree(166, 56, false);

    // ═══ RIGHT — chapel ═══
    drawWall(228, 36, 16, 21);
    drawRoof(236, 30, 18, true);
    // finial
    vline(236, 25, 5, C.wall_lt);
    dot(236, 24, C.lamp);
    // rose window
    rect(232, 32, 5, 5, C.win_frm);
    rect(233, 31, 3, 7, C.win_frm);
    rect(231, 33, 7, 3, C.win_frm);
    rect(232, 32, 5, 5, C.win_on);
    vline(234, 32, 5, C.wall_md);
    hline(232, 34, 5, C.wall_md);
    drawDoor(233, 46, 6, 11);

    // ═══ RIGHT — manor (wide) ═══
    drawWall(246, 24, 22, 33);
    drawRoof(257, 18, 24, false);
    for (let bx=246; bx<268; bx+=4) rect(bx, 18, 2, 3, C.wall_md);
    // chimneys
    drawWall(248, 14, 3, 6);
    drawWall(263, 14, 3, 6);
    for (let sy=30; sy<56; sy+=4) hline(246, sy, 22, C.wall_md);
    drawDoor(252, 44, 9, 13);

    // ═══ RIGHT SMALL HOUSE ═══
    drawWall(272, 40, 14, 17);
    drawRoof(279, 34, 16, false);
    drawDoor(276, 50, 5, 7);

    // RIGHT TREES
    drawTree(223, 56, false);
    drawTree(290, 56, true);
    drawTree(297, 56, false);

    // Lantern posts
    lamps.forEach(l => {
      vline(l.x, 50, 7, C.wall_lt);
      rect(l.x-1, 49, 3, 2, C.wall_md);
    });
  }

  // ── DRAW DYNAMIC ELEMENTS ──
  function drawWindows() {
    Object.values(wins).forEach(w => {
      drawWin(w.x, w.y, w.w, w.h, w.b);
    });
  }

  function drawLamps() {
    lamps.forEach(l => {
      // soft glow
      ctx.fillStyle = `rgba(255,216,77,${l.b * 0.20})`;
      ctx.fillRect((l.x-3)*SCALE, (l.y-3)*SCALE, 8*SCALE, 8*SCALE);
      // lamp dot
      rect(l.x, l.y, 2, 2, l.b > 0.5 ? C.lamp : '#8a5800');
    });
  }

  // Cat pixel art: 12x8 sprite, 4 walk frames
  function drawCatSprite(x, y, frame, flip) {
    ctx.save();
    if (flip) {
      ctx.translate((x + 6) * SCALE, 0);
      ctx.scale(-1, 1);
      ctx.translate(-(x + 6) * SCALE, 0);
    }
    const s = C.shadow;
    // body
    rect(x+1, y+2, 7, 4, s);
    // head
    rect(x+7, y+1, 5, 4, s);
    // ears
    dot(x+7, y,   s);
    dot(x+11, y,  s);
    // eye
    dot(x+10, y+2, C.lamp);
    // tail
    rect(x, y+3, 2, 2, s);
    dot(x, y+2, s);
    // legs (4 frames)
    if (frame === 0) {
      rect(x+2, y+5, 2, 3, s);
      rect(x+5, y+5, 2, 3, s);
    } else if (frame === 1) {
      rect(x+2, y+5, 2, 2, s);
      rect(x+1, y+6, 2, 2, s);
      rect(x+5, y+5, 2, 3, s);
      rect(x+6, y+7, 2, 1, s);
    } else if (frame === 2) {
      rect(x+2, y+5, 2, 3, s);
      rect(x+1, y+7, 2, 1, s);
      rect(x+5, y+5, 2, 2, s);
      rect(x+6, y+6, 2, 2, s);
    } else {
      rect(x+2, y+5, 2, 2, s);
      rect(x+3, y+6, 2, 2, s);
      rect(x+5, y+5, 2, 3, s);
    }
    ctx.restore();
  }

  function drawCat() {
    if (!cat.visible) return;
    ctx.save();
    ctx.globalAlpha = cat.opacity;
    drawCatSprite(cat.x, cat.y, cat.frame, cat.dir === -1);
    ctx.restore();
  }

  // Shadow figure inside tower shadow window (wCs: x:119,y:37,w:3,h:5)
  function drawShadow() {
    if (shadow.opacity < 0.02) return;
    ctx.save();
    ctx.globalAlpha = shadow.opacity;
    const wx = wins.wCs.x;
    const wy = wins.wCs.y;
    const sx = wx + 1 + shadow.dx; // constrained inside window
    // head
    dot(sx,   wy,   C.shadow);
    dot(sx+1, wy,   C.shadow);
    // body
    vline(sx,   wy+1, 3, C.shadow);
    vline(sx+1, wy+1, 3, C.shadow);
    // arms
    dot(sx-1, wy+2, C.shadow);
    dot(sx+2, wy+2, C.shadow);
    ctx.restore();
  }

  // ── MAIN RENDER ──
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBg();
    drawBuildings();
    drawWindows();
    drawLamps();
    drawShadow();
    drawCat();
    requestAnimationFrame(render);
  }
  render();

  // ── Window flicker ──
  const winKeys = Object.keys(wins).filter(k => k !== 'wCs');
  async function flickerWin(id) {
    const w = wins[id];
    for (let i = 0; i < randI(1,4); i++) {
      w.b = 0; await wait(rand(40,120));
      w.b = w.base; await wait(rand(50,110));
    }
    w.b = 0;
    await wait(rand(8000, 40000));
    for (let s=0; s<=10; s++) { w.b = w.base*s/10; await wait(60); }
  }
  async function windowLoop() {
    while (true) {
      await wait(rand(4000,12000));
      flickerWin(winKeys[randI(0, winKeys.length)]);
    }
  }
  windowLoop();

  // ── Lamp flicker ──
  async function lampLoop(l) {
    while (true) {
      await wait(rand(1500,6000));
      l.b = rand(0.3, 0.6);
      await wait(rand(50,160));
      l.b = 1;
    }
  }
  lamps.forEach(l => lampLoop(l));

  // ── Cat — walks slowly, hides behind trees ──
  // Tree hide spots in logical px: left trees ~67, centre trees ~160, right trees ~223,290
  const hideSpots = [67, 160, 223, 290];

  async function catLoop() {
    while (true) {
      await wait(rand(15000, 50000));
      const goRight = Math.random() > 0.5;
      cat.dir   = goRight ? 1 : -1;
      cat.x     = goRight ? -14 : W + 2;
      cat.frame = 0;
      cat.tick  = 0;
      cat.opacity = 1;
      cat.visible = true;

      // pick hide spot
      const validSpots = hideSpots.filter(s => goRight ? s > 10 : s < W - 10);
      const hideX = validSpots[randI(0, validSpots.length)] - 6;

      const speed = rand(0.15, 0.30); // very slow — ~0.2 logical px per frame at 30fps
      const framePeriod = Math.round(8 / speed); // animate legs relative to speed

      // walk to hide spot
      let tick = 0;
      while ((goRight && cat.x < hideX) || (!goRight && cat.x > hideX)) {
        cat.x += cat.dir * speed;
        tick++;
        if (tick % framePeriod === 0) cat.frame = (cat.frame + 1) % 4;
        await wait(33); // ~30fps
      }

      // hide
      cat.visible = false;
      await wait(rand(3000, 10000));

      // re-emerge
      cat.visible = true;
      const exitX = goRight ? W + 14 : -14;

      while ((goRight && cat.x < exitX) || (!goRight && cat.x > exitX)) {
        cat.x += cat.dir * speed;
        tick++;
        if (tick % framePeriod === 0) cat.frame = (cat.frame + 1) % 4;
        await wait(33);
      }

      cat.visible = false;
    }
  }
  catLoop();

  // ── Shadow figure ──
  async function shadowLoop() {
    while (true) {
      await wait(rand(20000, 60000));
      if (wins.wCs.b < 0.1) continue;
      shadow.dx = 0;
      for (let s=0; s<=8; s++) { shadow.opacity = s/8; await wait(80); }
      const dir = Math.random() > 0.5 ? 1 : -1;
      for (let i=0; i<randI(4,10); i++) {
        const next = shadow.dx + dir;
        if (next >= 0 && next <= 1) shadow.dx = next;
        await wait(250);
      }
      await wait(rand(500,2000));
      for (let s=8; s>=0; s--) { shadow.opacity = s/8; await wait(70); }
      shadow.dx = 0;
    }
  }
  shadowLoop();

  // ── Fireflies ──
  for (let i=0; i<18; i++) {
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

  // ── Load shared nav ──
  const navEl = document.getElementById('nav-inner');
  if (navEl) {
    fetch('/nav.html')
      .then(r => r.text())
      .then(html => {
        navEl.innerHTML = html;
        const toggle = document.querySelector('.nav-toggle');
        const links  = document.querySelector('.nav-links');
        if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));
      });
  }

})();
