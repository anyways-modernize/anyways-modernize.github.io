(function () {

  const rand  = (a, b) => Math.random() * (b - a) + a;
  const randI = (a, b) => Math.floor(rand(a, b));
  const wait  = ms => new Promise(r => setTimeout(r, ms));

  // ── Pixel art palette ──
  // Everything is multiples of 2px on a 480x80 canvas scaled up 3x
  // Colors inspired by SNES era RPGs (Chrono Trigger / FF6)
  const P = {
    sky:      '#0d141c',
    mtn1:     '#0f1e2e',
    mtn2:     '#122438',
    ground:   '#060c12',
    dirt:     '#080f18',
    stone1:   '#0a1520',  // dark stone
    stone2:   '#0d1c2a',  // mid stone
    stone3:   '#112233',  // light stone edge
    roof1:    '#091828',  // dark roof
    roof2:    '#0c2035',  // roof highlight
    win_on:   '#ffd84d',  // window lit
    win_dim:  '#c4922a',  // window dim
    win_off:  '#091420',  // window off (same as stone)
    win_frm:  '#1a3048',  // window frame
    door:     '#050c16',
    tree_dk:  '#061008',
    tree_md:  '#0a1c0e',
    tree_lt:  '#0d2412',
    tree_hi:  '#122e18',
    lamp:     '#ffd84d',
    lamp_dim: '#b86a00',
    black:    '#020507',
  };

  // ── Canvas approach: draw pixel art to canvas, animate with JS ──
  const SCALE  = 3;   // upscale factor (3x = chunky SNES look)
  const W      = 480; // logical pixel width
  const H      = 80;  // logical pixel height

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
    'z-index:2',
    'pointer-events:none',
  ].join(';');
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  // ── Draw helpers — all coords in logical pixels ──
  function px(color) { ctx.fillStyle = color; }
  function rect(x, y, w, h, color) {
    if (color) ctx.fillStyle = color;
    ctx.fillRect(x * SCALE, y * SCALE, w * SCALE, h * SCALE);
  }
  function line(x, y, w, color) { rect(x, y, w, 1, color); } // horizontal line
  function col(x, y, h, color)  { rect(x, y, 1, h, color); } // vertical line
  function dot(x, y, color)     { rect(x, y, 1, 1, color); }

  // Draw an arched window in pixel art: rect with top 2px rounded by removing corners
  function pixWin(x, y, w, h, color) {
    rect(x, y+1, w, h-1, color);      // body
    rect(x+1, y, w-2, 1, color);      // arch top row (minus corners)
  }

  // ── State ──
  // Window states: 0=off, 1=on, fading values between
  const windows = {
    // id: { x, y, w, h, brightness (0-1), base }
    wL1a: { x:10,  y:44, w:4, h:5, b:1, base:1 },
    wL1b: { x:16,  y:44, w:4, h:5, b:1, base:1 },
    wL2a: { x:32,  y:36, w:4, h:6, b:1, base:1 },
    wL2b: { x:38,  y:36, w:4, h:6, b:1, base:1 },
    wL2c: { x:32,  y:45, w:4, h:5, b:0.7, base:0.7 },
    wC1a: { x:194, y:38, w:4, h:6, b:1, base:1 },
    wC1b: { x:200, y:38, w:4, h:6, b:1, base:1 },
    wC2a: { x:218, y:32, w:4, h:6, b:1, base:1 },
    wC2b: { x:224, y:32, w:4, h:6, b:1, base:1 },
    wC2c: { x:218, y:42, w:4, h:6, b:0.8, base:0.8 },
    // shadow window — special
    wCs:  { x:224, y:42, w:4, h:6, b:0.8, base:0.8 },
    wC3a: { x:242, y:38, w:4, h:6, b:1, base:1 },
    wC3b: { x:248, y:38, w:4, h:6, b:1, base:1 },
    wR1a: { x:398, y:44, w:4, h:5, b:0.8, base:0.8 },
    wR1b: { x:404, y:44, w:4, h:5, b:0.8, base:0.8 },
    wR2a: { x:422, y:34, w:4, h:6, b:1, base:1 },
    wR2b: { x:428, y:34, w:4, h:6, b:1, base:1 },
    wR2c: { x:434, y:34, w:4, h:6, b:1, base:1 },
    wR2d: { x:422, y:44, w:4, h:5, b:0.7, base:0.7 },
    wR2e: { x:434, y:44, w:4, h:5, b:0.7, base:0.7 },
    wR3a: { x:454, y:44, w:4, h:5, b:0.8, base:0.8 },
    wR3b: { x:460, y:44, w:4, h:5, b:0.6, base:0.6 },
  };

  // Lantern positions
  const lanterns = [
    { x:130, y:56, b:1 },
    { x:290, y:56, b:1 },
    { x:350, y:56, b:1 },
  ];

  // Cat state
  const cat = { x:-16, y:68, dir:1, visible:false, walking:false, frame:0, frameTimer:0 };

  // Shadow figure state
  const shadow = { x:0, dx:0, opacity:0, active:false };

  // ── DRAW STATIC SCENE ──
  function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // sky gradient (pixel rows)
    for (let y = 0; y < 50; y++) {
      const t = y / 50;
      const alpha = t * 0.85;
      ctx.fillStyle = `rgba(8,15,24,${alpha})`;
      ctx.fillRect(0, y * SCALE, canvas.width, SCALE);
    }
    rect(0, 50, W, 30, '#07101a');

    // mountains — pixel stepped silhouette
    const mtn = [
      [0,52],[12,44],[24,48],[40,40],[56,44],[72,36],[90,40],[108,34],
      [126,38],[144,30],[162,34],[180,28],[198,32],[216,26],[234,30],
      [252,24],[270,28],[288,22],[306,26],[324,20],[342,24],[360,18],
      [378,22],[396,16],[414,20],[432,14],[448,18],[464,12],[480,16],
    ];
    ctx.fillStyle = P.mtn1;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    for (let i = 0; i < mtn.length; i++) {
      const [mx, my] = mtn[i];
      ctx.lineTo(mx * SCALE, my * SCALE);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.closePath();
    ctx.fill();

    // ground
    rect(0, 70, W, 10, P.ground);
    rect(0, 68, W, 2,  P.dirt);

    // ═══ LEFT CLUSTER ═══
    // cottage
    rect(6,  52, 22, 18, P.stone1);
    rect(4,  46, 26,  7, P.roof1);
    rect(6,  44, 22,  3, P.roof2);
    rect(14, 60, 6,  10, P.door);

    // inn (tall)
    rect(30, 38, 28, 32, P.stone1);
    rect(28, 30, 32,  9, P.roof1);
    rect(30, 28, 28,  3, P.roof2);
    // battlements
    for (let bx = 30; bx < 58; bx += 4) { rect(bx, 26, 2, 4, P.stone2); }
    rect(36, 56, 8, 14, P.door);
    // chimney
    rect(52, 22, 4, 10, P.stone2);

    // small house
    rect(62, 52, 18, 18, P.stone1);
    rect(60, 46, 22,  7, P.roof1);
    rect(62, 44, 18,  3, P.roof2);

    // LEFT TREES (pixel art — layered triangular with rounded top)
    drawTree(80, 54, P.tree_dk, P.tree_md, P.tree_lt, P.tree_hi);
    drawTree(90, 56, P.tree_dk, P.tree_md, P.tree_lt, P.tree_hi);

    // ═══ CENTRE CLUSTER ═══
    // house C1
    rect(188, 44, 22, 26, P.stone1);
    rect(186, 37, 26,  8, P.roof1);
    rect(188, 35, 22,  3, P.roof2);
    rect(195, 58, 8,  12, P.door);

    // wizard tower (tallest)
    rect(212, 28, 26, 42, P.stone1);
    // conical roof — pixel stepped
    rect(214, 22, 22, 7, P.roof1);
    rect(216, 18, 18, 5, P.roof1);
    rect(218, 14, 14, 5, P.roof2);
    rect(220, 10, 10, 5, P.roof2);
    rect(222,  7,  6, 4, P.roof2);
    rect(223,  5,  4, 3, P.roof2);
    // spire
    rect(224,  2,  2, 4, P.lamp);
    // battlements
    for (let bx = 212; bx < 238; bx += 4) { rect(bx, 20, 2, 3, P.stone2); }
    // rose window (pixel circle)
    rect(220, 25, 10, 1, P.win_frm);
    rect(218, 26, 14, 5, P.win_frm);
    rect(220, 31, 10, 1, P.win_frm);
    rect(219, 26, 12, 5, P.win_on);
    // cross divider
    rect(224, 25, 2, 7, P.stone1);
    rect(220, 28, 10, 2, P.stone1);
    // stone layers
    for (let sy = 34; sy < 70; sy += 6) { line(212, sy, 26, P.stone2); }
    rect(218, 60, 14, 10, P.door);

    // tavern C3
    rect(240, 42, 22, 28, P.stone1);
    rect(238, 35, 26,  8, P.roof1);
    rect(240, 33, 22,  3, P.roof2);
    // hanging sign
    rect(244, 32, 14, 3, P.stone3);
    rect(246, 29, 10, 3, '#0d2030');
    rect(247, 60, 8,  10, P.door);

    // CENTRE TREES
    drawTree(178, 56, P.tree_dk, P.tree_md, P.tree_lt, P.tree_hi);
    drawTree(265, 54, P.tree_dk, P.tree_md, P.tree_lt, P.tree_hi);
    drawTree(272, 57, P.tree_dk, P.tree_md, P.tree_lt, P.tree_hi);

    // ═══ RIGHT CLUSTER ═══
    // chapel
    rect(392, 46, 20, 24, P.stone1);
    rect(390, 38, 24,  9, P.roof1);
    rect(392, 36, 20,  3, P.roof2);
    // finial
    rect(401, 33, 2, 4, P.stone3);
    dot(402, 32, P.lamp);
    rect(396, 58, 8,  12, P.door);

    // manor (wide)
    rect(416, 30, 30, 40, P.stone1);
    rect(414, 22, 34,  9, P.roof1);
    rect(416, 20, 30,  3, P.roof2);
    for (let bx = 416; bx < 446; bx += 4) { rect(bx, 18, 2, 4, P.stone2); }
    // chimneys
    rect(418, 14, 4, 8, P.stone2);
    rect(438, 14, 4, 8, P.stone2);
    // stone layers
    for (let sy = 36; sy < 70; sy += 6) { line(416, sy, 30, P.stone2); }
    rect(426, 58, 14, 12, P.door);

    // house R3
    rect(450, 48, 22, 22, P.stone1);
    rect(448, 42, 26,  7, P.roof1);
    rect(450, 40, 22,  3, P.roof2);

    // RIGHT TREES
    drawTree(382, 56, P.tree_dk, P.tree_md, P.tree_lt, P.tree_hi);
    drawTree(390, 58, P.tree_dk, P.tree_md, P.tree_lt, P.tree_hi);

    // lantern posts
    lanterns.forEach(l => {
      col(l.x, 57, 14, P.stone2);
      rect(l.x-1, 55, 3, 2, P.stone3);
    });
  }

  // Pixel art tree: layered triangles
  function drawTree(cx, baseY, c1, c2, c3, c4) {
    // trunk
    col(cx,   baseY,   4, '#06100a');
    col(cx+1, baseY,   4, '#07130b');
    // layer 4 (widest, bottom)
    rect(cx-4, baseY-4, 10, 4, c1);
    dot(cx-4, baseY-4, c2); dot(cx+5, baseY-4, c2);
    // layer 3
    rect(cx-3, baseY-8, 8, 4, c2);
    dot(cx-3, baseY-8, c3); dot(cx+4, baseY-8, c3);
    // layer 2
    rect(cx-2, baseY-12, 6, 4, c3);
    dot(cx-2, baseY-12, c4); dot(cx+3, baseY-12, c4);
    // layer 1 (top)
    rect(cx-1, baseY-16, 4, 4, c4);
    // highlight pixel
    dot(cx,   baseY-16, '#193820');
    dot(cx+1, baseY-17, '#193820');
  }

  // ── DRAW DYNAMIC LAYER (windows, lanterns, cat, shadow) ──
  function drawWindows() {
    Object.entries(windows).forEach(([id, w]) => {
      const color = w.b > 0.05
        ? lerpColor(P.win_off, P.win_on, w.b)
        : P.win_off;
      // frame
      pixWin(w.x, w.y, w.w, w.h, P.win_frm);
      // light fill
      pixWin(w.x+1, w.y+1, w.w-2, w.h-2, color);
    });
  }

  function drawLanterns() {
    lanterns.forEach(l => {
      const c = l.b > 0.5 ? P.lamp : P.lamp_dim;
      dot(l.x,   l.y, c);
      dot(l.x+1, l.y, c);
      // glow: soft 1px halo
      ctx.fillStyle = `rgba(255,216,77,${l.b * 0.25})`;
      ctx.fillRect((l.x-1)*SCALE, (l.y-1)*SCALE, 4*SCALE, 4*SCALE);
    });
  }

  // Cat pixel art frames (facing right)
  const CAT_FRAMES = [
    // frame 0: legs down
    (x, y) => {
      rect(x,   y,   7, 4, P.black); // body
      rect(x+5, y-1, 4, 3, P.black); // head
      dot(x+8, y-1, P.lamp);          // eye
      rect(x+1, y+3, 2, 2, P.black); // front legs down
      rect(x+4, y+3, 2, 2, P.black); // back legs down
      rect(x-2, y+1, 2, 1, P.black); // tail
      rect(x-3, y,   1, 2, P.black);
    },
    // frame 1: legs mid
    (x, y) => {
      rect(x,   y,   7, 4, P.black);
      rect(x+5, y-1, 4, 3, P.black);
      dot(x+8, y-1, P.lamp);
      rect(x+1, y+3, 2, 3, P.black); // front leg down
      rect(x+4, y+2, 2, 2, P.black); // back leg up
      rect(x-2, y+1, 2, 1, P.black);
      rect(x-3, y,   1, 2, P.black);
    },
    // frame 2: legs stride
    (x, y) => {
      rect(x,   y,   7, 4, P.black);
      rect(x+5, y-1, 4, 3, P.black);
      dot(x+8, y-1, P.lamp);
      rect(x+1, y+2, 2, 2, P.black); // front leg up
      rect(x+4, y+3, 2, 3, P.black); // back leg down
      rect(x-2, y+1, 2, 1, P.black);
      rect(x-3, y,   1, 2, P.black);
    },
    // frame 3: legs other mid
    (x, y) => {
      rect(x,   y,   7, 4, P.black);
      rect(x+5, y-1, 4, 3, P.black);
      dot(x+8, y-1, P.lamp);
      rect(x+1, y+3, 2, 2, P.black);
      rect(x+4, y+3, 2, 2, P.black);
      rect(x-2, y+2, 2, 1, P.black); // tail low
      rect(x-3, y+1, 1, 2, P.black);
    },
  ];

  function drawCat() {
    if (!cat.visible) return;
    ctx.save();
    if (cat.dir === -1) {
      // flip horizontally around cat center
      ctx.translate((cat.x + 5) * SCALE, 0);
      ctx.scale(-1, 1);
      ctx.translate(-(cat.x + 5) * SCALE, 0);
    }
    CAT_FRAMES[cat.frame](cat.x, cat.y);
    ctx.restore();
  }

  // Shadow figure pixel art (inside window wCs at x:224,y:42,w:4,h:6)
  function drawShadow() {
    if (shadow.opacity < 0.05) return;
    ctx.save();
    ctx.globalAlpha = shadow.opacity;
    const sx = 225 + shadow.dx;
    const sy = 42;
    dot(sx,   sy,   P.black);   // head top
    rect(sx-1, sy+1, 4, 2, P.black); // head
    rect(sx,   sy+3, 2, 3, P.black); // body
    dot(sx-1,  sy+3, P.black);  // shoulder L
    dot(sx+2,  sy+3, P.black);  // shoulder R
    ctx.restore();
  }

  // Color lerp helper
  function lerpColor(c1, c2, t) {
    const h = s => parseInt(s, 16);
    const r1=h(c1.slice(1,3)),g1=h(c1.slice(3,5)),b1=h(c1.slice(5,7));
    const r2=h(c2.slice(1,3)),g2=h(c2.slice(3,5)),b2=h(c2.slice(5,7));
    const r=Math.round(r1+(r2-r1)*t);
    const g=Math.round(g1+(g2-g1)*t);
    const b=Math.round(b1+(b2-b1)*t);
    return `rgb(${r},${g},${b})`;
  }

  // ── MAIN RENDER LOOP ──
  function render() {
    drawScene();
    drawWindows();
    drawLanterns();
    drawShadow();
    drawCat();
    requestAnimationFrame(render);
  }
  render();

  // ══════════════════════════════════════
  // Window flicker logic
  // ══════════════════════════════════════
  const winIds = Object.keys(windows).filter(k => k !== 'wCs');

  async function flickerWin(id) {
    const w = windows[id];
    const flickers = randI(1, 4);
    for (let i = 0; i < flickers; i++) {
      w.b = 0;
      await wait(rand(40, 120));
      w.b = w.base;
      await wait(rand(50, 110));
    }
    w.b = 0;
    await wait(rand(8000, 40000));
    // fade back on
    for (let s = 0; s <= 10; s++) {
      w.b = w.base * s / 10;
      await wait(60);
    }
  }

  async function windowLoop() {
    while (true) {
      await wait(rand(4000, 12000));
      const id = winIds[randI(0, winIds.length)];
      flickerWin(id);
    }
  }
  windowLoop();

  // ══════════════════════════════════════
  // Lantern flicker
  // ══════════════════════════════════════
  async function lampLoop(l) {
    while (true) {
      await wait(rand(1500, 6000));
      l.b = rand(0.3, 0.6);
      await wait(rand(50, 160));
      l.b = 1;
    }
  }
  lanterns.forEach(l => lampLoop(l));

  // ══════════════════════════════════════
  // Cat — walks behind buildings/trees
  // Hide spots: behind left trees (x≈80), behind centre trees (x≈178 or 265), behind right trees (x≈382)
  // ══════════════════════════════════════
  const hideSpots = [82, 180, 267, 384];

  async function catWalk() {
    while (true) {
      await wait(rand(15000, 45000));

      const goRight = Math.random() > 0.5;
      cat.dir = goRight ? 1 : -1;
      cat.x   = goRight ? -16 : W + 2;

      // pick a hide spot in the right direction
      const spots = goRight
        ? hideSpots.filter(s => s > 20 && s < W - 20)
        : hideSpots.filter(s => s > 20 && s < W - 20).reverse();
      const hideX = spots[randI(0, spots.length)];

      cat.visible = true;
      cat.walking = true;
      cat.frameTimer = 0;

      const speed = rand(0.4, 0.8);

      // walk to hide spot
      while ((goRight && cat.x < hideX) || (!goRight && cat.x > hideX)) {
        cat.x += cat.dir * speed;
        cat.frameTimer += speed;
        if (cat.frameTimer > 4) {
          cat.frame = (cat.frame + 1) % 4;
          cat.frameTimer = 0;
        }
        await wait(30);
      }

      // hide behind tree/building
      cat.visible = false;
      cat.walking = false;
      await wait(rand(2000, 8000));

      // re-emerge and walk off screen
      cat.visible = true;
      cat.walking = true;
      const exitX = goRight ? W + 2 : -16;

      while ((goRight && cat.x < exitX) || (!goRight && cat.x > exitX)) {
        cat.x += cat.dir * speed;
        cat.frameTimer += speed;
        if (cat.frameTimer > 4) {
          cat.frame = (cat.frame + 1) % 4;
          cat.frameTimer = 0;
        }
        await wait(30);
      }

      cat.visible = false;
    }
  }
  catWalk();

  // ══════════════════════════════════════
  // Shadow figure — inside tower window (wCs)
  // ══════════════════════════════════════
  async function shadowLoop() {
    while (true) {
      await wait(rand(20000, 60000));
      if (windows['wCs'].b < 0.1) continue;

      shadow.dx = 0;
      // fade in
      for (let s = 0; s <= 8; s++) {
        shadow.opacity = s / 8;
        await wait(80);
      }

      // drift across window (constrained to 2px so it stays inside 4px window)
      const dir = Math.random() > 0.5 ? 1 : -1;
      for (let i = 0; i < randI(6, 14); i++) {
        const next = shadow.dx + dir;
        if (next >= -1 && next <= 1) shadow.dx = next;
        await wait(200);
      }

      await wait(rand(500, 2000));

      // fade out
      for (let s = 8; s >= 0; s--) {
        shadow.opacity = s / 8;
        await wait(70);
      }
      shadow.dx = 0;
    }
  }
  shadowLoop();

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
