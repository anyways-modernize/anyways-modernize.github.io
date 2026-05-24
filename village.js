<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

<title>Medieval JRPG Village</title>

<style>
  html, body {
    margin: 0;
    overflow: hidden;
    background: #0f1724;
    height: 100%;
  }

  canvas {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
    background: #0f1724;
  }
</style>
</head>
<body>

<canvas id="scene"></canvas>

<script>
(() => {

const SCALE = 4;
const W = 320;
const H = 90;

const canvas = document.getElementById("scene");
canvas.width = W * SCALE;
canvas.height = H * SCALE;

const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const rand = (a,b)=>Math.random()*(b-a)+a;
const randI = (a,b)=>Math.floor(rand(a,b));

/* =========================================================
   PALETTE
========================================================= */

const C = {
  sky_top: '#18243a',
  sky_bottom: '#2a3b56',

  moon: '#d9d2b6',

  mtn_far: '#1b2738',
  mtn_mid: '#24364d',

  ground: '#1b241c',
  dirt: '#2a3328',

  wall_dk: '#3a4456',
  wall_md: '#55627a',
  wall_lt: '#73839b',

  roof_dk: '#3b2f3a',
  roof_md: '#58475a',
  roof_lt: '#74607a',

  wood: '#5e4632',

  win_on: '#ffc95e',
  win_hot: '#ffe9a3',
  win_dim: '#c78d35',
  win_off: '#38404f',

  lamp: '#ffd27a',

  tree_1: '#1e3427',
  tree_2: '#294530',
  tree_3: '#35563d',
  tree_4: '#456b4b',

  shadow: '#16181d',
  outline: '#0d1016'
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

function noise(x,y,w,h,amount,color){
  for(let i=0;i<amount;i++){
    dot(
      x + randI(0,w),
      y + randI(0,h),
      color
    );
  }
}

function lerpColor(c1,c2,t){
  const h=s=>parseInt(s,16);

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
   FIREFLIES
========================================================= */

const fireflies = Array.from({length:24},()=>({
  x: rand(0,W),
  y: rand(8,70),
  dx: rand(-0.02,0.02),
  dy: rand(-0.01,0.01),
  a: rand(0.3,1)
}));

/* =========================================================
   WINDOWS
========================================================= */

const wins = [
  {x:24,y:54,w:4,h:5,b:1},
  {x:31,y:54,w:4,h:5,b:0.7},

  {x:72,y:42,w:4,h:5,b:1},
  {x:80,y:42,w:4,h:5,b:0.9},

  {x:122,y:36,w:5,h:6,b:1},

  {x:170,y:50,w:4,h:5,b:0.7},
  {x:178,y:50,w:4,h:5,b:1},

  {x:232,y:46,w:4,h:5,b:0.8},
  {x:240,y:46,w:4,h:5,b:1}
];

/* =========================================================
   BACKGROUND
========================================================= */

function drawSky(){

  const g = ctx.createLinearGradient(
    0,0,0,H*SCALE
  );

  g.addColorStop(0,C.sky_top);
  g.addColorStop(1,C.sky_bottom);

  ctx.fillStyle = g;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // moon glow
  ctx.fillStyle = 'rgba(255,240,210,0.08)';
  ctx.beginPath();
  ctx.arc(
    250*SCALE,
    18*SCALE,
    20*SCALE,
    0,
    Math.PI*2
  );
  ctx.fill();

  // moon
  ctx.fillStyle = C.moon;

  ctx.beginPath();
  ctx.arc(
    250*SCALE,
    18*SCALE,
    8*SCALE,
    0,
    Math.PI*2
  );
  ctx.fill();
}

function drawMountains(){

  ctx.fillStyle = C.mtn_far;

  ctx.beginPath();

  ctx.moveTo(0,canvas.height);

  for(let i=0;i<W;i+=16){

    const y =
      40 +
      Math.sin(i*0.03)*6 +
      Math.sin(i*0.08)*3;

    ctx.lineTo(
      i*SCALE,
      y*SCALE
    );
  }

  ctx.lineTo(canvas.width,canvas.height);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = C.mtn_mid;

  ctx.beginPath();

  ctx.moveTo(0,canvas.height);

  for(let i=0;i<W;i+=12){

    const y =
      52 +
      Math.sin(i*0.02)*4;

    ctx.lineTo(
      i*SCALE,
      y*SCALE
    );
  }

  ctx.lineTo(canvas.width,canvas.height);
  ctx.closePath();
  ctx.fill();
}

/* =========================================================
   BUILDINGS
========================================================= */

function drawWall(x,y,w,h){

  rect(x,y,w,h,C.wall_dk);

  for(let r=y+2;r<y+h;r+=3){
    hline(x+1,r,w-2,C.wall_md);
  }

  noise(x,y,w,h,20,'rgba(255,255,255,0.03)');
  noise(x,y,w,h,18,'rgba(0,0,0,0.08)');
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

  rect(x,y,w,h,C.wood);

  vline(x-1,y,h,C.wall_lt);
  vline(x+w,y,h,C.wall_lt);

  dot(x+w-2,y+h/2,C.lamp);
}

function drawWindow(x,y,w,h,b){

  if(b > 0.1){

    ctx.fillStyle =
      `rgba(255,210,100,${b*0.18})`;

    ctx.fillRect(
      (x-2)*SCALE,
      (y-2)*SCALE,
      (w+4)*SCALE,
      (h+4)*SCALE
    );
  }

  rect(x-1,y-1,w+2,h+2,C.wall_lt);

  const c = lerpColor(
    C.win_off,
    C.win_hot,
    b
  );

  rect(x,y,w,h,c);

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

function drawTree(x,baseY,tall=false){

  rect(x,baseY-4,2,4,'#35281d');

  const tiers = tall
    ? [12,10,8,6,4]
    : [10,8,6,4];

  tiers.forEach((w,i)=>{

    const yy = baseY - 4 - (i*4);

    rect(
      x - Math.floor(w/2),
      yy,
      w,
      4,

      i===0 ? C.tree_1 :
      i===1 ? C.tree_2 :
      i===2 ? C.tree_3 :
      C.tree_4
    );

    dot(
      x - Math.floor(w/2)+1,
      yy,
      '#6e9a71'
    );
  });
}

function drawVillage(){

  // LEFT HOUSE
  drawWall(18,50,22,22);
  drawRoof(29,43,24);
  drawDoor(25,62,6,10);

  // CENTER TOWER
  drawWall(115,30,24,42);
  drawRoof(127,18,26);

  drawDoor(123,60,8,12);

  // RIGHT HOUSE
  drawWall(220,44,30,28);
  drawRoof(235,35,32);

  drawDoor(230,60,8,12);

  // TAVERN
  drawWall(160,46,28,26);
  drawRoof(174,38,30);

  drawDoor(170,60,8,12);

  // trees
  drawTree(60,72,true);
  drawTree(92,72,false);

  drawTree(205,72,true);

  drawTree(280,72,true);
}

/* =========================================================
   GROUND
========================================================= */

function drawGround(){

  rect(0,70,W,20,C.ground);

  rect(0,74,W,16,C.dirt);

  ctx.fillStyle =
    'rgba(180,200,220,0.05)';

  ctx.fillRect(
    0,
    60*SCALE,
    canvas.width,
    12*SCALE
  );
}

/* =========================================================
   LAMPS
========================================================= */

const lamps = [
  {x:104,y:68},
  {x:148,y:68},
  {x:260,y:68}
];

function drawLamps(){

  lamps.forEach(l=>{

    ctx.fillStyle =
      'rgba(255,220,140,0.15)';

    ctx.beginPath();

    ctx.arc(
      l.x*SCALE,
      l.y*SCALE,
      16,
      0,
      Math.PI*2
    );

    ctx.fill();

    vline(l.x,l.y-6,6,C.wall_lt);

    rect(
      l.x-1,
      l.y-8,
      3,
      3,
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

  const vg = ctx.createRadialGradient(
    canvas.width/2,
    canvas.height/2,
    100,

    canvas.width/2,
    canvas.height/2,
    canvas.width/1.1
  );

  vg.addColorStop(
    0,
    'rgba(0,0,0,0)'
  );

  vg.addColorStop(
    1,
    'rgba(0,0,0,0.45)'
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

  drawSky();

  drawMountains();

  drawGround();

  drawVillage();

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

  const w = wins[randI(0,wins.length)];

  w.b = rand(0.2,1);

},600);

})();
</script>

</body>
</html>
