(function () {

const rand = (a,b)=>Math.random()*(b-a)+a;
const randI = (a,b)=>Math.floor(rand(a,b));

/* =========================================================
   CANVAS
========================================================= */

const SCALE = 4;
const W = 320;
const H = 60;

const canvas = document.createElement('canvas');

canvas.width = W * SCALE;
canvas.height = H * SCALE;

canvas.style.cssText = `
position:fixed;
bottom:0;
left:0;
width:100%;
height:auto;
max-height:240px;
image-rendering:pixelated;
image-rendering:crisp-edges;
z-index:2;
pointer-events:none;
`;

document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

/* =========================================================
   PALETTE
========================================================= */

const C = {

  skyTop: '#1b2a41',
  skyBottom: '#314866',

  moon: '#f3e7c4',

  mtn_far: '#1c2b3d',
  mtn_mid: '#31445f',

  ground: '#1b241f',
  dirt: '#263127',

  wall_dk: '#4c5a70',
  wall_md: '#66758f',
  wall_lt: '#8b9ab3',

  roof_dk: '#403446',
  roof_md: '#5e4c66',
  roof_lt: '#7b6888',

  win_on: '#ffc95e',
  win_hot: '#fff2b5',
  win_dim: '#d39645',
  win_off: '#39424f',

  win_frm: '#26364d',

  tree_1: '#213726',
  tree_2: '#314c38',
  tree_3: '#44674d',
  tree_4: '#5d8664',

  lamp: '#ffd27a',

  shadow: '#16181d',
  black: '#0d1016',

  door: '#57402e'
};

/* =========================================================
   HELPERS
========================================================= */

function rect(x,y,w,h,c){

  ctx.fillStyle = c;

  ctx.fillRect(
    Math.round(x)*SCALE,
    Math.round(y)*SCALE,
    Math.round(w)*SCALE,
    Math.round(h)*SCALE
  );
}

function dot(x,y,c){
  rect(x,y,1,1,c);
}

function hline(x,y,w,c){
  rect(x,y,w,1,c);
}

function vline(x,y,h,c){
  rect(x,y,1,h,c);
}

function lerpColor(c1,c2,t){

  const h = s => parseInt(s,16);

  const r1=h(c1.slice(1,3));
  const g1=h(c1.slice(3,5));
  const b1=h(c1.slice(5,7));

  const r2=h(c2.slice(1,3));
  const g2=h(c2.slice(3,5));
  const b2=h(c2.slice(5,7));

  return `rgb(
    ${Math.round(r1+(r2-r1)*t)},
    ${Math.round(g1+(g2-g1)*t)},
    ${Math.round(b1+(b2-b1)*t)}
  )`;
}

/* =========================================================
   WINDOWS
========================================================= */

const wins = [
  {x:22,y:42,w:4,h:5,b:1},
  {x:30,y:42,w:4,h:5,b:.7},

  {x:118,y:32,w:5,h:6,b:1},

  {x:164,y:38,w:4,h:5,b:.8},
  {x:172,y:38,w:4,h:5,b:1},

  {x:248,y:34,w:4,h:5,b:.9},
  {x:256,y:34,w:4,h:5,b:.8},
];

/* =========================================================
   FIREFLIES
========================================================= */

const fireflies = Array.from({length:18},()=>({
  x: rand(0,W),
  y: rand(4,48),
  dx: rand(-0.03,0.03),
  dy: rand(-0.02,0.02),
  a: rand(0.3,1)
}));

/* =========================================================
   BACKGROUND
========================================================= */

function drawBg(){

  /* SKY */

  const g = ctx.createLinearGradient(
    0,
    0,
    0,
    H*SCALE
  );

  g.addColorStop(0,C.skyTop);
  g.addColorStop(1,C.skyBottom);

  ctx.fillStyle = g;

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  /* MOON GLOW */

  ctx.fillStyle =
    'rgba(255,240,200,0.10)';

  ctx.beginPath();

  ctx.arc(
    255*SCALE,
    16*SCALE,
    18*SCALE,
    0,
    Math.PI*2
  );

  ctx.fill();

  /* MOON */

  ctx.fillStyle = C.moon;

  ctx.beginPath();

  ctx.arc(
    255*SCALE,
    16*SCALE,
    8*SCALE,
    0,
    Math.PI*2
  );

  ctx.fill();

  /* FAR MOUNTAINS */

  ctx.fillStyle = C.mtn_far;

  ctx.beginPath();
  ctx.moveTo(0,H*SCALE);

  for(let i=0;i<W;i+=12){

    const y =
      28 +
      Math.sin(i*0.04)*5;

    ctx.lineTo(
      i*SCALE,
      y*SCALE
    );
  }

  ctx.lineTo(W*SCALE,H*SCALE);
  ctx.closePath();
  ctx.fill();

  /* MID MOUNTAINS */

  ctx.fillStyle = C.mtn_mid;

  ctx.beginPath();
  ctx.moveTo(0,H*SCALE);

  for(let i=0;i<W;i+=10){

    const y =
      38 +
      Math.sin(i*0.03)*3;

    ctx.lineTo(
      i*SCALE,
      y*SCALE
    );
  }

  ctx.lineTo(W*SCALE,H*SCALE);
  ctx.closePath();
  ctx.fill();

  /* FOG */

  ctx.fillStyle =
    'rgba(180,210,255,0.05)';

  ctx.fillRect(
    0,
    42*SCALE,
    canvas.width,
    18*SCALE
  );
}

/* =========================================================
   BUILDINGS
========================================================= */

function drawWall(x,y,w,h){

  rect(x,y,w,h,C.wall_dk);

  /* texture */

  for(let i=0;i<w*h*0.12;i++){

    dot(
      x + randI(0,w),
      y + randI(0,h),

      Math.random() > 0.5
        ? 'rgba(255,255,255,0.03)'
        : 'rgba(0,0,0,0.06)'
    );
  }

  /* stone rows */

  for(let r=y+2;r<y+h;r+=3){

    hline(
      x+1,
      r,
      w-2,
      C.wall_md
    );
  }
}

function drawRoof(cx,y,w){

  const half = Math.floor(w/2);

  for(let i=0;i<=half;i++){

    const yy = y + Math.floor(i*0.7);

    hline(
      cx-half+i,
      yy,
      w-(i*2),

      i < half*0.3
      ? C.roof_lt
      : i < half*0.7
      ? C.roof_md
      : C.roof_dk
    );
  }
}

function drawDoor(x,y,w,h){

  rect(x,y,w,h,C.door);

  vline(x-1,y,h,C.wall_lt);
  vline(x+w,y,h,C.wall_lt);

  dot(x+w-2,y+h/2,C.lamp);
}

function drawWindow(x,y,w,h,b){

  /* glow */

  if(b > 0.05){

    ctx.fillStyle =
      `rgba(255,210,120,${b * 0.18})`;

    ctx.fillRect(
      (x - 2) * SCALE,
      (y - 2) * SCALE,
      (w + 4) * SCALE,
      (h + 4) * SCALE
    );
  }

  rect(
    x-1,
    y-1,
    w+2,
    h+2,
    C.win_frm
  );

  const col = lerpColor(
    C.win_off,
    C.win_hot,
    b
  );

  rect(x,y,w,h,col);

  vline(
    x + Math.floor(w/2),
    y,
    h,
    C.wall_md
  );

  hline(
    x,
    y + Math.floor(h/2),
    w,
    C.wall_md
  );
}

function drawTree(cx,baseY,tall=false){

  rect(cx,baseY-4,2,4,'#4d3826');

  const tiers = tall
    ? [12,10,8,6,4]
    : [10,8,6,4];

  tiers.forEach((w,i)=>{

    const yy =
      baseY - 4 - (i*4);

    rect(
      cx - Math.floor(w/2),
      yy,
      w,
      4,

      i===0 ? C.tree_1 :
      i===1 ? C.tree_2 :
      i===2 ? C.tree_3 :
      C.tree_4
    );

    dot(
      cx - Math.floor(w/2)+1,
      yy,
      '#8ab08d'
    );
  });
}

function drawBuildings(){

  /* LEFT HOUSE */

  drawWall(16,40,22,17);
  drawRoof(27,33,24);

  drawDoor(24,49,6,8);

  /* CENTER TOWER */

  drawWall(112,22,24,35);
  drawRoof(124,12,26);

  drawDoor(120,46,8,11);

  /* TAVERN */

  drawWall(158,34,24,23);
  drawRoof(170,26,28);

  drawDoor(166,47,7,10);

  /* RIGHT HOUSE */

  drawWall(242,30,24,27);
  drawRoof(254,22,28);

  drawDoor(250,46,7,11);

  /* TREES */

  drawTree(64,56,true);
  drawTree(82,56,false);

  drawTree(206,56,true);

  drawTree(290,56,true);
}

/* =========================================================
   GROUND
========================================================= */

function drawGround(){

  rect(0,54,W,6,C.dirt);
  rect(0,57,W,3,C.ground);
}

/* =========================================================
   LAMPS
========================================================= */

const lamps = [
  {x:98,y:50,b:1},
  {x:146,y:50,b:1},
  {x:226,y:50,b:1}
];

function drawLamps(){

  lamps.forEach(l=>{

    ctx.beginPath();

    ctx.fillStyle =
      `rgba(255,220,140,${l.b*0.18})`;

    ctx.arc(
      (l.x+1)*SCALE,
      (l.y+1)*SCALE,
      10*SCALE,
      0,
      Math.PI*2
    );

    ctx.fill();

    vline(l.x,50,7,C.wall_lt);

    rect(
      l.x-1,
      49,
      3,
      2,
      C.lamp
    );
  });
}

/* =========================================================
   FIREFLIES
========================================================= */

function drawFireflies(){

  fireflies.forEach(f=>{

    f.x += f.dx;
    f.y += f.dy;

    if(f.x < 0) f.x = W;
    if(f.x > W) f.x = 0;

    ctx.globalAlpha = f.a;

    ctx.fillStyle = '#ffd76a';

    ctx.fillRect(
      f.x*SCALE,
      f.y*SCALE,
      2,
      2
    );

    ctx.globalAlpha = 1;
  });
}

/* =========================================================
   VIGNETTE
========================================================= */

function drawVignette(){

  const vg =
    ctx.createRadialGradient(

      canvas.width/2,
      canvas.height/2,
      80,

      canvas.width/2,
      canvas.height/2,
      canvas.width/1.2
    );

  vg.addColorStop(
    0,
    'rgba(0,0,0,0)'
  );

  vg.addColorStop(
    1,
    'rgba(0,0,0,0.40)'
  );

  ctx.fillStyle = vg;

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );
}

/* =========================================================
   RENDER
========================================================= */

function render(){

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  drawBg();

  drawGround();

  drawBuildings();

  wins.forEach(w=>{

    drawWindow(
      w.x,
      w.y,
      w.w,
      w.h,
      w.b
    );
  });

  drawLamps();

  drawFireflies();

  drawVignette();

  requestAnimationFrame(render);
}

render();

/* =========================================================
   WINDOW FLICKER
========================================================= */

setInterval(()=>{

  const w =
    wins[randI(0,wins.length)];

  w.b = rand(0.4,1);

},700);

})();
