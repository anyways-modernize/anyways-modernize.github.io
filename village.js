(function () {
  'use strict';

  const rand  = (a, b) => Math.random() * (b - a) + a;
  const randI = (a, b) => Math.floor(rand(a, b));
  const wait  = ms => new Promise(r => setTimeout(r, ms));
  const NS    = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 1440 300');
  svg.setAttribute('preserveAspectRatio', 'xMidYMax slice');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('landscape');

  function aw(x,y,w,h,ah){const r=w/2,ay=y+ah;return `M${x},${y+h} L${x},${ay} Q${x},${y} ${x+r},${y} Q${x+w},${y} ${x+w},${ay} L${x+w},${y+h} Z`;}

  const C={
    sky:'#06111e',wall:'#0e1f30',wallS:'#0a1825',wallD:'#162a40',
    roof:'#0b1a28',roofD:'#091422',roofL:'#142236',
    winFr:'#1c3450',door:'#050f18',stone:'#1a3048',trim:'#243e58',
    gold:'#c89040',gnd:'#040d15',hill:'#080f1c',mtns:'#0a1522',
  };

  function house(x,y,w,h,roofH,opts={}){
    const{chimneyX=null,chimneyW=8,chimneyH=20,color=C.wall,colorD=C.wallD}=opts;
    let o='';
    o+=`<rect x="${x+w}" y="${y+6}" width="8" height="${h}" fill="${C.wallS}"/>`;
    o+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>`;
    o+=`<rect x="${x}" y="${y}" width="3" height="${h}" fill="${colorD}" opacity="0.4"/>`;
    o+=`<rect x="${x}" y="${y+h-6}" width="${w}" height="6" fill="${C.stone}" opacity="0.45"/>`;
    const bs=14;
    for(let by=y+bs;by<y+h-6;by+=bs)
      o+=`<line x1="${x}" y1="${by}" x2="${x+w}" y2="${by}" stroke="${C.stone}" stroke-width="0.7" opacity="0.35"/>`;
    for(let by=y+bs;by<y+h-6;by+=bs*2)
      for(let bx=x+w/3;bx<x+w;bx+=w/3)
        o+=`<line x1="${bx}" y1="${by}" x2="${bx}" y2="${by+bs}" stroke="${C.stone}" stroke-width="0.6" opacity="0.2"/>`;
    // chimney drawn BEFORE roof so it peeks above
    if(chimneyX!==null){
      o+=`<rect x="${x+chimneyX}" y="${y-chimneyH}" width="${chimneyW}" height="${chimneyH+4}" fill="${C.wallS}"/>`;
      o+=`<rect x="${x+chimneyX-1}" y="${y-chimneyH}" width="${chimneyW+2}" height="3" fill="${C.stone}"/>`;
    }
    const rx=x-6,peak=x+w/2;
    o+=`<polygon points="${peak},${y-roofH} ${x+w+6},${y} ${x+w+6},${y+4}" fill="${C.roofD}"/>`;
    o+=`<polygon points="${rx},${y} ${peak},${y-roofH} ${x+w+6},${y}" fill="${C.roof}"/>`;
    o+=`<polygon points="${rx},${y} ${peak},${y-roofH} ${peak},${y-roofH+3} ${rx},${y+3}" fill="${C.roofL}" opacity="0.45"/>`;
    o+=`<line x1="${rx}" y1="${y}" x2="${x+w+6}" y2="${y}" stroke="${C.stone}" stroke-width="1" opacity="0.55"/>`;
    o+=`<line x1="${rx}" y1="${y}" x2="${peak}" y2="${y-roofH}" stroke="${C.trim}" stroke-width="1" opacity="0.45"/>`;
    o+=`<line x1="${x+w+6}" y1="${y}" x2="${peak}" y2="${y-roofH}" stroke="${C.trim}" stroke-width="1" opacity="0.45"/>`;
    // chimney cap re-drawn on top of roof to ensure visibility
    if(chimneyX!==null){
      o+=`<rect x="${x+chimneyX-1}" y="${y-chimneyH}" width="${chimneyW+2}" height="3" fill="${C.stone}"/>`;
    }
    return o;
  }

  // window positioned by centre point
  function winAt(cx,cy,w,h,id){
    const x=cx-w/2,y=cy-h/2,ar=h*0.38,path=aw(x,y,w,h,ar);
    let o='';
    o+=`<path d="${path}" fill="${C.winFr}" stroke="${C.stone}" stroke-width="1"/>`;
    o+=`<path d="${path}" fill="#ffd560" opacity="0.22" id="${id}"/>`;
    o+=`<line x1="${x}" y1="${y+h*0.52}" x2="${x+w}" y2="${y+h*0.52}" stroke="${C.winFr}" stroke-width="1.2"/>`;
    o+=`<line x1="${cx}" y1="${y+ar*0.6}" x2="${cx}" y2="${y+h}" stroke="${C.winFr}" stroke-width="1.2"/>`;
    return o;
  }

  function door(x,y,w,h){
    const ar=h*0.35,path=aw(x,y,w,h,ar);
    let o='';
    o+=`<path d="${path}" fill="${C.door}" stroke="${C.winFr}" stroke-width="1.2"/>`;
    o+=`<rect x="${x+3}" y="${y+ar+2}" width="${w/2-5}" height="${h-ar-8}" rx="1" fill="${C.stone}" opacity="0.25"/>`;
    o+=`<rect x="${x+w/2+2}" y="${y+ar+2}" width="${w/2-5}" height="${h-ar-8}" rx="1" fill="${C.stone}" opacity="0.25"/>`;
    o+=`<circle cx="${x+w/2}" cy="${y+h-9}" r="1.5" fill="${C.gold}"/>`;
    return o;
  }

  function tree(cx,base,scale,prefix){
    const s=scale;
    let o=`<rect x="${cx-3*s}" y="${base-30*s}" width="${6*s}" height="${30*s}" fill="#040c06"/>`;
    o+=`<ellipse cx="${cx}" cy="${base}" rx="${18*s}" ry="${7*s}" fill="#030a05" opacity="0.4"/>`;
    o+=`<ellipse cx="${cx}" cy="${base-28*s}" rx="${18*s}" ry="${13*s}" fill="#061008" id="${prefix}e"/>`;
    o+=`<ellipse cx="${cx-4*s}" cy="${base-36*s}" rx="${15*s}" ry="${11*s}" fill="#08160a" id="${prefix}d"/>`;
    o+=`<ellipse cx="${cx+3*s}" cy="${base-44*s}" rx="${13*s}" ry="${10*s}" fill="#0a1e0d" id="${prefix}c"/>`;
    o+=`<ellipse cx="${cx-2*s}" cy="${base-53*s}" rx="${11*s}" ry="${9*s}" fill="#0c2410" id="${prefix}b"/>`;
    o+=`<ellipse cx="${cx}" cy="${base-62*s}" rx="${8*s}" ry="${7*s}" fill="#0e2a13" id="${prefix}a"/>`;
    o+=`<ellipse cx="${cx+2*s}" cy="${base-67*s}" rx="${5*s}" ry="${4*s}" fill="#112e16" opacity="0.7"/>`;
    return o;
  }

  // lantern: post sits ON ground (y=266). Post height = 28px so lamp at y=238.
  function lantern(x,id){
    const groundY=266;
    const postH=28;
    const lampY=groundY-postH;
    let o='';
    o+=`<rect x="${x-2}" y="${lampY+8}" width="4" height="${postH-8}" fill="#1a2e42"/>`;
    o+=`<rect x="${x-5}" y="${lampY}" width="10" height="9" rx="2" fill="#1a2e42"/>`;
    o+=`<polygon points="${x-4},${lampY} ${x+4},${lampY} ${x+3},${lampY-7} ${x-3},${lampY-7}" fill="#1e3450"/>`;
    o+=`<line x1="${x-3}" y1="${lampY-7}" x2="${x+3}" y2="${lampY-7}" stroke="#243e58" stroke-width="1"/>`;
    o+=`<circle cx="${x}" cy="${lampY-3}" r="4.5" fill="#ffd560" opacity="0.78" id="${id}"/>`;
    o+=`<circle cx="${x}" cy="${lampY-3}" r="12" fill="#ffd560" opacity="0.07" id="${id}g"/>`;
    return o;
  }

  // Shadow window constants — must match exactly
  const SW_X=662,SW_Y=188,SW_W=16,SW_H=22,SW_AH=9;
  const WCX=SW_X+SW_W/2; // =670, window centre x
  const WINT_Y=SW_Y+SW_AH+2; // interior top after arch

  svg.innerHTML=`
<defs>
  <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#f6ecd0" stop-opacity="0.22"/>
    <stop offset="100%" stop-color="#f6ecd0" stop-opacity="0"/>
  </radialGradient>
  <filter id="lampglow" x="-150%" y="-150%" width="400%" height="400%">
    <feGaussianBlur stdDeviation="4" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <clipPath id="twclip"><path d="${aw(SW_X,SW_Y,SW_W,SW_H,SW_AH)}"/></clipPath>
</defs>



<!-- Moon only, no stars -->
<polygon points="0,205 60,162 120,180 190,140 265,162 345,120 430,145 510,108 595,132 680,98 765,122 850,90 935,116 1020,84 1105,110 1185,82 1270,106 1355,84 1440,100 1440,300 0,300" fill="${C.mtns}" opacity="0.95"/>
<circle cx="1380" cy="185" r="18" fill="#f5edcc" opacity="0.85"/>
<circle cx="1377" cy="182" r="5" fill="#ede0b8" opacity="0.25"/>
<circle cx="1385" cy="192" r="3" fill="#ede0b8" opacity="0.18"/>
<circle cx="1380" cy="185" r="34" fill="url(#moonGlow)"/>


<!-- Mountains & hills -->







<ellipse cx="200" cy="260" rx="260" ry="58" fill="${C.hill}"/>
<ellipse cx="720" cy="262" rx="340" ry="56" fill="${C.hill}"/>
<ellipse cx="1240" cy="260" rx="300" ry="58" fill="${C.hill}"/>
<rect x="0" y="266" width="1440" height="34" fill="${C.gnd}"/>
<rect x="0" y="266" width="1440" height="2" fill="#0d1e2e" opacity="0.6"/>
<!-- ═══ LEFT CLUSTER ═══ -->
${house(30,214,46,52,34,{chimneyX:4,chimneyH:22})}
${winAt(43,231,13,18,'wL1a')}${winAt(67,231,13,18,'wL1b')}
${door(40,240,16,26)}

${house(88,170,62,96,42,{chimneyX:6,chimneyH:28})}
${winAt(106,190,14,20,'wL2a')}${winAt(132,190,14,20,'wL2b')}
${winAt(106,220,14,18,'wL2c')}${winAt(132,220,14,18,'wL2d')}
<rect x="93" y="243" width="14" height="2" fill="#1a2e42"/>
<rect x="117" y="243" width="14" height="2" fill="#1a2e42"/>
<rect x="90" y="245" width="62" height="13" rx="2" fill="#101e2e" stroke="#1c3450" stroke-width="1"/>
${door(105,253,22,13)}

${house(163,210,40,56,32,{})}
${winAt(178,227,12,17,'wL3a')}${winAt(196,227,12,17,'wL3b')}
${door(172,242,14,24)}

${tree(222,266,1.05,'tL1')}${tree(246,266,0.88,'tL2')}

<!-- ═══ CENTRE CLUSTER ═══ -->
${house(596,198,48,68,36,{chimneyX:5,chimneyH:20})}
${winAt(614,218,13,18,'wC1a')}${winAt(632,218,13,18,'wC1b')}
${winAt(621,244,12,16,'wC1c')}
${door(606,248,18,18)}

<!-- WIZARD TOWER: x=655 w=54 centre=682 -->
${house(655,128,54,138,50,{color:C.wallS,colorD:C.wall})}
<!-- subtle parapet line only -->
<rect x="653" y="117" width="56" height="3" fill="${C.stone}" opacity="0.45"/>
<!-- spire -->
<line x1="682" y1="117" x2="682" y2="74" stroke="${C.stone}" stroke-width="1.5" opacity="0.55"/>
<circle cx="682" cy="74" r="2.5" fill="${C.gold}" opacity="0.85"/>
<circle cx="682" cy="74" r="6" fill="${C.gold}" opacity="0.12"/>
<!-- rose window, centred on 682 -->
<circle cx="682" cy="148" r="10" fill="${C.winFr}" stroke="${C.stone}" stroke-width="1.2"/>
<circle cx="682" cy="148" r="10" fill="#ffd560" opacity="0.26" id="wC2rose"/>
<line x1="682" y1="138" x2="682" y2="158" stroke="${C.wallS}" stroke-width="1.4"/>
<line x1="672" y1="148" x2="692" y2="148" stroke="${C.wallS}" stroke-width="1.4"/>
<line x1="675" y1="141" x2="689" y2="155" stroke="${C.wallS}" stroke-width="1" opacity="0.7"/>
<line x1="689" y1="141" x2="675" y2="155" stroke="${C.wallS}" stroke-width="1" opacity="0.7"/>
<!-- floor 1 windows: left half cx=668, right half cx=696 — centred in wall -->
${winAt(668,171,16,22,'wC2a')}${winAt(696,171,16,22,'wC2b')}
<!-- floor 2: shadow win left, normal win right -->
${winAt(SW_X+SW_W/2,SW_Y+SW_H/2,SW_W,SW_H,'shadow-win')}
<!-- wizard shadow clipped exactly to that window -->
<g clip-path="url(#twclip)" id="shadow-figure" opacity="0">
  <polygon points="${WCX-3},${WINT_Y+3} ${WCX},${WINT_Y-5} ${WCX+3},${WINT_Y+3}" fill="#010508"/>
  <rect x="${WCX-5}" y="${WINT_Y+2}" width="10" height="2" rx="1" fill="#010508"/>
  <ellipse cx="${WCX}" cy="${WINT_Y+7}" rx="3.5" ry="4" fill="#010508"/>
  <path d="M${WCX-5},${WINT_Y+11} Q${WCX},${WINT_Y+9} ${WCX+5},${WINT_Y+11} L${WCX+5},${SW_Y+SW_H} L${WCX-5},${SW_Y+SW_H} Z" fill="#010508"/>
  <line x1="${WCX+5}" y1="${WINT_Y+11}" x2="${WCX+7}" y2="${SW_Y+SW_H}" stroke="#010508" stroke-width="1.5"/>
  <circle cx="${WCX+8}" cy="${WINT_Y+9}" r="1.5" fill="#010508"/>
</g>
${winAt(696,SW_Y+SW_H/2,SW_W,SW_H,'wC2c')}
${door(664,232,24,34)}

<!-- TAVERN -->
${house(720,178,50,88,38,{chimneyX:38,chimneyH:18})}
<line x1="728" y1="180" x2="728" y2="170" stroke="${C.stone}" stroke-width="2"/>
<line x1="748" y1="180" x2="748" y2="170" stroke="${C.stone}" stroke-width="2"/>
<line x1="724" y1="170" x2="752" y2="170" stroke="${C.stone}" stroke-width="1.5"/>

${winAt(734,199,13,18,'wC3a')}${winAt(752,199,13,18,'wC3b')}
${winAt(744,225,12,15,'wC3c')}
${door(728,234,22,32)}

${tree(572,266,0.95,'tC1')}${tree(782,266,1.0,'tC2')}${tree(806,266,0.80,'tC3')}

<!-- ═══ RIGHT CLUSTER ═══ -->
<!-- CHAPEL — no cross, just a plain gabled building -->
${house(1168,178,42,88,38,{chimneyX:4,chimneyH:18})}
<!-- small ornamental finial only, no cross -->
<circle cx="1189" cy="140" r="2.5" fill="${C.gold}" opacity="0.7"/>
<circle cx="1189" cy="198" r="9" fill="${C.winFr}" stroke="${C.stone}" stroke-width="1.2"/>
<circle cx="1189" cy="198" r="9" fill="#ffd560" opacity="0.20" id="wR1rose"/>
<line x1="1189" y1="189" x2="1189" y2="207" stroke="${C.wallS}" stroke-width="1.4"/>
<line x1="1180" y1="198" x2="1198" y2="198" stroke="${C.wallS}" stroke-width="1.4"/>
${winAt(1180,220,12,17,'wR1a')}${winAt(1198,220,12,17,'wR1b')}
${door(1178,235,22,31)}

${house(1218,148,78,118,46,{chimneyX:6,chimneyH:32})}
<rect x="1222" y="186" width="12" height="80" fill="${C.wallS}" opacity="0.7"/>
<polygon points="1216,186 1240,186 1228,168" fill="${C.roofD}"/>
${winAt(1236,172,15,20,'wR2a')}${winAt(1257,172,15,20,'wR2b')}${winAt(1278,172,15,20,'wR2c')}
${winAt(1243,201,14,18,'wR2d')}${winAt(1277,201,14,18,'wR2e')}
${door(1248,228,26,38)}

${house(1310,200,42,66,34,{chimneyX:4,chimneyH:18})}
${winAt(1326,220,12,17,'wR3a')}${winAt(1344,220,12,17,'wR3b')}
${door(1320,234,16,32)}

${tree(1128,266,1.0,'tR1')}${tree(1150,266,0.82,'tR2')}

<!-- ═══ LANTERNS — base of post sits on ground y=266 ═══ -->
${lantern(396,'lamp1')}${lantern(868,'lamp2')}${lantern(1082,'lamp3')}

<!-- ═══ CHIMNEY SMOKE ═══ -->
<g id="smoke1" opacity="0" transform="translate(0,0)">
  <ellipse cx="62" cy="192" rx="4" ry="3" fill="#16283c" opacity="0.55"/>
  <ellipse cx="64" cy="184" rx="5" ry="3.5" fill="#16283c" opacity="0.4"/>
  <ellipse cx="61" cy="176" rx="6.5" ry="4.5" fill="#16283c" opacity="0.25"/>
  <ellipse cx="65" cy="167" rx="8" ry="5.5" fill="#16283c" opacity="0.12"/>
</g>
<g id="smoke2" opacity="0" transform="translate(0,0)">
  <ellipse cx="695" cy="98" rx="4" ry="3" fill="#16283c" opacity="0.55"/>
  <ellipse cx="697" cy="90" rx="5" ry="3.5" fill="#16283c" opacity="0.4"/>
  <ellipse cx="694" cy="82" rx="6.5" ry="4.5" fill="#16283c" opacity="0.25"/>
  <ellipse cx="698" cy="73" rx="8" ry="5.5" fill="#16283c" opacity="0.12"/>
</g>

<!-- ═══ CAT ═══ -->
<g id="cat" opacity="0" transform="translate(-100,0)">
  <path d="M5,260 Q-10,252 -8,240" stroke="#0c1c2e" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="20" cy="260" rx="17" ry="7" fill="#0c1c2e"/>
  <ellipse cx="33" cy="255" rx="5" ry="5" fill="#0c1c2e"/>
  <circle cx="36" cy="248" r="8" fill="#0c1c2e"/>
  <polygon points="31,242 33,233 37,242" fill="#0c1c2e"/>
  <polygon points="35,242 38,233 42,242" fill="#0c1c2e"/>
  <polygon points="32,241 34,235 36,241" fill="#0d1c2a" opacity="0.5"/>
  <circle cx="33" cy="248" r="2.2" fill="#ffd560" opacity="0.95"/>
  <circle cx="39" cy="248" r="2.2" fill="#ffd560" opacity="0.95"/>
  <circle cx="33" cy="248" r="0.9" fill="#020810"/>
  <circle cx="39" cy="248" r="0.9" fill="#020810"/>
  <ellipse cx="36" cy="251.5" rx="1" ry="0.7" fill="#1e3050"/>
  <line x1="37" y1="251" x2="47" y2="249" stroke="#152438" stroke-width="0.8" opacity="0.55"/>
  <line x1="37" y1="252" x2="47" y2="253" stroke="#152438" stroke-width="0.8" opacity="0.55"/>
  <line x1="35" y1="251" x2="25" y2="249" stroke="#152438" stroke-width="0.8" opacity="0.55"/>
  <rect id="cl1" x="8"  y="265" width="6" height="7" rx="2" fill="#0c1c2e"/>
  <rect id="cl2" x="16" y="265" width="6" height="7" rx="2" fill="#0c1c2e"/>
  <rect id="cl3" x="24" y="265" width="6" height="7" rx="2" fill="#0c1c2e"/>
  <rect id="cl4" x="32" y="265" width="6" height="7" rx="2" fill="#0c1c2e"/>
</g>

<!-- ═══ HERO KNIGHT ═══ -->
<g id="hero" opacity="0" transform="translate(500,-6)">
  <line id="hLL" x1="-3" y1="262" x2="-4" y2="272" stroke="#0d1e30" stroke-width="5" stroke-linecap="round"/>
  <line id="hRL" x1=" 3" y1="262" x2=" 4" y2="272" stroke="#0d1e30" stroke-width="5" stroke-linecap="round"/>
  <ellipse id="hLB" cx="-4" cy="272" rx="5" ry="2" fill="#09141e"/>
  <ellipse id="hRB" cx=" 4" cy="272" rx="5" ry="2" fill="#09141e"/>
  <path d="M-5,262 L-7,246 C-6,240 6,240 7,246 L5,262 Z" fill="#162e50"/>
  <rect x="-5" y="257" width="10" height="2.5" rx="1" fill="#0a1828"/>
  <line id="hLA" x1="-6" y1="247" x2="-10" y2="256" stroke="#162e50" stroke-width="3.5" stroke-linecap="round"/>
  <line id="hRA" x1=" 6" y1="247" x2=" 10" y2="256" stroke="#162e50" stroke-width="3.5" stroke-linecap="round"/>
  <ellipse cx="-7" cy="245" rx="4" ry="3" fill="#122640"/>
  <ellipse cx=" 7" cy="245" rx="4" ry="3" fill="#122640"/>
  <rect x="-3" y="236" width="6" height="6" rx="1" fill="#b89868"/>
  <path d="M-6,243 Q-6,233 0,232 Q6,233 6,243 Z" fill="#1a3256"/>
  <rect x="-7" y="242" width="14" height="3" rx="1" fill="#1a3256"/>
  <line x1="-4" y1="239" x2="4" y2="239" stroke="#091828" stroke-width="1.5"/>
  <line x1="0"  y1="236" x2="0" y2="245" stroke="#091828" stroke-width="1"/>
  <line x1="8"  y1="237" x2="9" y2="256" stroke="#3a5878" stroke-width="2" stroke-linecap="round"/>
  <line x1="6"  y1="242" x2="11" y2="242" stroke="#3a5878" stroke-width="1.5" stroke-linecap="round"/>
</g>
`;

  document.body.appendChild(svg);

  /* ── TREE WIND ── */
  ['tL1','tL2','tC1','tC2','tC3','tR1','tR2'].forEach((prefix,gi)=>{
    ['a','b','c','d','e'].forEach((l,i)=>{
      const el=svg.getElementById(prefix+l);if(!el)return;
      const delay=(gi*0.45+i*0.18).toFixed(2);
      const dur=(3.2+Math.random()*2.2).toFixed(2);
      const amt=(1.0+Math.random()*0.9).toFixed(2);
      el.innerHTML=`<animateTransform attributeName="transform" type="translate" values="0,0; ${amt},0; 0,0; ${-amt*0.5},0; 0,0" dur="${dur}s" begin="${delay}s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"/>`;
    });
  });

  /* ── WINDOWS ── */
  const winData=[
    {id:'wL1a',base:0.22},{id:'wL1b',base:0.18},
    {id:'wL2a',base:0.30},{id:'wL2b',base:0.26},{id:'wL2c',base:0.18},{id:'wL2d',base:0.15},
    {id:'wL3a',base:0.16},{id:'wL3b',base:0.13},
    {id:'wC1a',base:0.24},{id:'wC1b',base:0.20},{id:'wC1c',base:0.15},
    {id:'wC2rose',base:0.26},
    {id:'wC2a',base:0.34},{id:'wC2b',base:0.28},{id:'wC2c',base:0.18},
    {id:'wC3a',base:0.26},{id:'wC3b',base:0.22},{id:'wC3c',base:0.16},
    {id:'wR1rose',base:0.20},{id:'wR1a',base:0.18},{id:'wR1b',base:0.15},
    {id:'wR2a',base:0.28},{id:'wR2b',base:0.24},{id:'wR2c',base:0.22},
    {id:'wR2d',base:0.18},{id:'wR2e',base:0.16},
    {id:'wR3a',base:0.18},{id:'wR3b',base:0.14},
    {id:'shadow-win',base:0.22},
  ];
  const wins=winData.map(d=>({el:svg.getElementById(d.id),base:d.base})).filter(d=>d.el);

  async function flickerWin(w){
    const n=randI(1,4);
    for(let i=0;i<n;i++){w.el.setAttribute('opacity','0');await wait(rand(40,140));w.el.setAttribute('opacity',w.base);await wait(rand(50,130));}
    w.el.setAttribute('opacity','0');
    await wait(rand(9000,52000));
    for(let o=0;o<=14;o++){w.el.setAttribute('opacity',(w.base*o/14).toFixed(3));await wait(75);}
  }
  (async function wl(){while(true){await wait(rand(3000,12000));const w=wins[randI(0,wins.length)];if(w.el.id==='shadow-win')continue;flickerWin(w);}})();

  /* ── SHADOW WIZARD ── */
  const figure=svg.getElementById('shadow-figure');
  const shadowWin=svg.getElementById('shadow-win');
  (async function sl(){
    while(true){
      await wait(rand(30000,80000));
      if(parseFloat(shadowWin.getAttribute('opacity')||'0')<0.05)continue;
      for(let o=0;o<=10;o++){figure.setAttribute('opacity',(o/10).toFixed(1));await wait(80);}
      const dir=Math.random()>0.5?1:-1;let dx=0;
      for(let i=0;i<randI(8,18);i++){dx+=dir*0.2;figure.setAttribute('transform',`translate(${dx},0)`);await wait(140);}
      await wait(rand(700,2200));
      for(let o=10;o>=0;o--){figure.setAttribute('opacity',(o/10).toFixed(1));await wait(65);}
      figure.setAttribute('transform','translate(0,0)');
    }
  })();

  /* ── CAT ── */
  const cat=svg.getElementById('cat');
  const cLegs=['cl1','cl2','cl3','cl4'].map(id=>svg.getElementById(id));
  let catLT=null,catLF=0;
  function startCatLegs(ms){catLT=setInterval(()=>{catLF=(catLF+1)%4;cLegs.forEach((l,i)=>{const up=(i%2===0)?catLF<2:catLF>=2;l.setAttribute('y',up?'262':'265');l.setAttribute('height',up?'10':'7');});},ms);}
  function stopCatLegs(){clearInterval(catLT);catLT=null;cLegs.forEach(l=>{l.setAttribute('y','265');l.setAttribute('height','7');});}
  function setCatPos(x,goRight){
    if(goRight){cat.setAttribute('transform',`translate(${x},0)`);}
    else{cat.setAttribute('transform',`translate(${x+46},0) scale(-1,1)`);}
  }
  (async function cl(){
    while(true){
      await wait(rand(18000,55000));
      const goRight=Math.random()>0.5;
      const startX=goRight?-100:1500,endX=goRight?rand(300,1150):rand(240,1100),spd=rand(0.45,0.90);
      setCatPos(startX,goRight);cat.setAttribute('opacity','0');await wait(60);
      cat.setAttribute('opacity','0.95');startCatLegs(110);
      let x=startX;const dir=goRight?1:-1;
      while((goRight&&x<endX)||(!goRight&&x>endX)){x+=dir*spd;setCatPos(x,goRight);await wait(30);}
      stopCatLegs();await wait(rand(1000,4500));
      for(let o=10;o>=0;o--){cat.setAttribute('opacity',(o/10).toFixed(1));await wait(50);}
    }
  })();

  /* ── HERO ── */
  const hero=svg.getElementById('hero');
  const hLL=svg.getElementById('hLL'),hRL=svg.getElementById('hRL');
  const hLA=svg.getElementById('hLA'),hRA=svg.getElementById('hRA');
  const hLB=svg.getElementById('hLB'),hRB=svg.getElementById('hRB');
  let hLT=null,hLF=0;
  function startHeroLegs(ms){hLT=setInterval(()=>{hLF=(hLF+1)%4;const sL=[0,5,0,-5][hLF],sR=[0,-5,0,5][hLF];hLL.setAttribute('x2',String(-4+sL));hLL.setAttribute('y2',String(272+Math.abs(sL)*0.2));hRL.setAttribute('x2',String(4+sR));hRL.setAttribute('y2',String(272+Math.abs(sR)*0.2));hLB.setAttribute('cx',String(-4+sL));hRB.setAttribute('cx',String(4+sR));hLA.setAttribute('x2',String(-10+sR*0.5));hRA.setAttribute('x2',String(10+sL*0.5));},ms);}
  function stopHeroLegs(){clearInterval(hLT);hLT=null;hLL.setAttribute('x2','-4');hRL.setAttribute('x2','4');hLL.setAttribute('y2','272');hRL.setAttribute('y2','272');hLB.setAttribute('cx','-4');hRB.setAttribute('cx','4');hLA.setAttribute('x2','-10');hRA.setAttribute('x2','10');}
  function setHeroPos(x,goRight){
    if(goRight){hero.setAttribute('transform',`translate(${x},-6)`);}
    else{hero.setAttribute('transform',`translate(${x},-6) scale(-1,1)`);}
  }
  (async function hl(){
    await wait(rand(6000,18000));
    while(true){
      const goRight=Math.random()>0.5;
      const startX=goRight?-25:1465,endX=goRight?rand(300,1100):rand(280,1060),spd=rand(0.55,1.0);
      setHeroPos(startX,goRight);hero.setAttribute('opacity','0');await wait(60);
      for(let o=0;o<=10;o++){hero.setAttribute('opacity',(o/10).toFixed(1));await wait(35);}
      startHeroLegs(135);
      let x=startX;const dir=goRight?1:-1;
      while((goRight&&x<endX)||(!goRight&&x>endX)){x+=dir*spd;setHeroPos(x,goRight);await wait(26);}
      stopHeroLegs();await wait(rand(1500,6000));
      for(let o=10;o>=0;o--){hero.setAttribute('opacity',(o/10).toFixed(1));await wait(40);}
      await wait(rand(12000,40000));
    }
  })();

  /* ── LANTERNS ── */
  [{dot:svg.getElementById('lamp1'),glow:svg.getElementById('lamp1g'),base:0.78,bg:0.07},
   {dot:svg.getElementById('lamp2'),glow:svg.getElementById('lamp2g'),base:0.68,bg:0.065},
   {dot:svg.getElementById('lamp3'),glow:svg.getElementById('lamp3g'),base:0.60,bg:0.06}
  ].forEach(async l=>{
    while(true){await wait(rand(1500,7000));const d=rand(0.28,0.50);l.dot.setAttribute('opacity',d);l.glow.setAttribute('opacity',(d*0.09).toFixed(3));await wait(rand(55,210));l.dot.setAttribute('opacity',l.base);l.glow.setAttribute('opacity',l.bg);}
  });

  /* ── SMOKE ── */
  async function smokeLoop(id,delay){
    await wait(delay);const el=svg.getElementById(id);if(!el)return;
    while(true){
      for(let f=0;f<=22;f++){const op=f<11?f/11:(22-f)/11;el.setAttribute('opacity',(op*0.5).toFixed(2));el.setAttribute('transform',`translate(${Math.sin(f*0.45)*2.5},${-f*0.65})`);await wait(110);}
      el.setAttribute('opacity','0');el.setAttribute('transform','translate(0,0)');await wait(rand(2500,7500));
    }
  }
  smokeLoop('smoke1',1800);smokeLoop('smoke2',4500);

  /* ── FIREFLIES (tiny, subtle) ── */
  for(let i=0;i<16;i++){
    const f=document.createElement('div');
    f.className='firefly';
    f.style.cssText=[
      `left:${rand(2,95)}%`,
      `top:${rand(8,58)}%`,
      `--dur:${rand(3,8)}s`,
      `--del:${rand(0,8)}s`,
      `--dx:${(Math.random()-.5)*36}px`,
      `--dy:${(Math.random()-.5)*24}px`,
    ].join(';');
    document.body.appendChild(f);
  }

  /* ── NAV / FOOTER ── */
  const navEl=document.getElementById('nav-inner');
  if(navEl){fetch('/nav.html').then(r=>r.text()).then(html=>{navEl.innerHTML=html;const t=document.querySelector('.nav-toggle'),l=document.querySelector('.nav-links');if(t&&l)t.addEventListener('click',()=>l.classList.toggle('open'));});}
  const footerEl=document.querySelector('footer');
  if(footerEl)fetch('/footer.html').then(r=>r.text()).then(html=>{footerEl.innerHTML=html;});

})();
