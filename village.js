(function () {
  'use strict';

  const rand  = (a, b) => Math.random() * (b - a) + a;
  const randI = (a, b) => Math.floor(rand(a, b));
  const wait  = ms => new Promise(r => setTimeout(r, ms));

  // ── Load static artwork, then animate ──
  const reduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  const SELF = document.currentScript;
  const SVG_URL = new URL('village-landscape.svg', (SELF && SELF.src) || location.href).href;

  fetch(SVG_URL).then(function (r) { return r.text(); }).then(function (markup) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = markup;
    const svg = wrapper.firstElementChild;
    document.body.appendChild(svg);

    if (!reduce) {
/* ── WINDOW FLICKER ── */
  const winData=[
    {id:'wL1a',base:0.22},{id:'wL1b',base:0.18},
    {id:'wL2a',base:0.30},{id:'wL2b',base:0.26},{id:'wL2c',base:0.18},{id:'wL2d',base:0.15},
    {id:'wL3a',base:0.16},{id:'wL3b',base:0.13},
    {id:'wC1a',base:0.24},{id:'wC1b',base:0.20},{id:'wC1c',base:0.15},
    {id:'wC2a',base:0.34},{id:'wC2b',base:0.28},{id:'wC2c',base:0.18},
    {id:'wC3a',base:0.26},{id:'wC3b',base:0.22},{id:'wC3c',base:0.16},
    {id:'wR1a',base:0.18},{id:'wR1b',base:0.15},
    {id:'wR2a',base:0.28},{id:'wR2b',base:0.24},{id:'wR2c',base:0.22},
    {id:'wR2d',base:0.18},{id:'wR2e',base:0.16},
    {id:'wR3a',base:0.18},{id:'wR3b',base:0.14},
    {id:'shadow-win',base:0.22},
  ];
  const wins = winData.map(d=>({el:svg.getElementById(d.id),base:d.base})).filter(d=>d.el);

  async function flickerWin(w){
    const n=randI(1,4);
    for(let i=0;i<n;i++){w.el.setAttribute('opacity','0');await wait(rand(40,140));w.el.setAttribute('opacity',w.base);await wait(rand(50,130));}
    w.el.setAttribute('opacity','0');
    await wait(rand(9000,52000));
    for(let o=0;o<=14;o++){w.el.setAttribute('opacity',(w.base*o/14).toFixed(3));await wait(75);}
  }
  (async function wl(){while(true){await wait(rand(3000,12000));const w=wins[randI(0,wins.length)];if(w.el.id==='shadow-win')continue;flickerWin(w);}})();

  /* ── SHADOW WIZARD ── */
  const figure = svg.getElementById('shadow-figure');
  const shadowWin = svg.getElementById('shadow-win');
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
  const catSVG = `<g id="cat" opacity="0" transform="translate(-100,0)">
    <path d="M5,260 Q-10,252 -8,240" stroke="#0c1c2e" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="20" cy="260" rx="17" ry="7" fill="#0c1c2e"/>
    <ellipse cx="33" cy="255" rx="5" ry="5" fill="#0c1c2e"/>
    <circle cx="36" cy="248" r="8" fill="#0c1c2e"/>
    <polygon points="31,242 33,233 37,242" fill="#0c1c2e"/>
    <polygon points="35,242 38,233 42,242" fill="#0c1c2e"/>
    <circle cx="33" cy="248" r="2.2" fill="#ffd560" opacity="0.95"/>
    <circle cx="39" cy="248" r="2.2" fill="#ffd560" opacity="0.95"/>
    <circle cx="33" cy="248" r="0.9" fill="#020810"/>
    <circle cx="39" cy="248" r="0.9" fill="#020810"/>
    <line x1="37" y1="251" x2="47" y2="249" stroke="#152438" stroke-width="0.8" opacity="0.55"/>
    <line x1="35" y1="251" x2="25" y2="249" stroke="#152438" stroke-width="0.8" opacity="0.55"/>
    <rect id="cl1" x="8" y="265" width="6" height="7" rx="2" fill="#0c1c2e"/>
    <rect id="cl2" x="16" y="265" width="6" height="7" rx="2" fill="#0c1c2e"/>
    <rect id="cl3" x="24" y="265" width="6" height="7" rx="2" fill="#0c1c2e"/>
    <rect id="cl4" x="32" y="265" width="6" height="7" rx="2" fill="#0c1c2e"/>
  </g>`;
  svg.insertAdjacentHTML('beforeend', catSVG);
  const cat = svg.getElementById('cat');
  const cLegs = ['cl1','cl2','cl3','cl4'].map(id=>svg.getElementById(id));
  let catLT=null,catLF=0;
  function startCatLegs(ms){catLT=setInterval(()=>{catLF=(catLF+1)%4;cLegs.forEach((l,i)=>{const up=(i%2===0)?catLF<2:catLF>=2;l.setAttribute('y',up?'262':'265');l.setAttribute('height',up?'10':'7');});},ms);}
  function stopCatLegs(){clearInterval(catLT);catLT=null;cLegs.forEach(l=>{l.setAttribute('y','265');l.setAttribute('height','7');});}
  function setCatPos(x,r){if(r){cat.setAttribute('transform',`translate(${x},0)`);}else{cat.setAttribute('transform',`translate(${x+46},0) scale(-1,1)`);}}
  (async function cl(){
    while(true){
      await wait(rand(18000,55000));
      const r=Math.random()>0.5;
      const sx=r?-100:1500,ex=r?rand(300,1150):rand(240,1100),sp=rand(0.45,0.90);
      setCatPos(sx,r);cat.setAttribute('opacity','0');await wait(60);
      cat.setAttribute('opacity','0.95');startCatLegs(110);
      let x=sx;const d=r?1:-1;
      while((r&&x<ex)||(!r&&x>ex)){x+=d*sp;setCatPos(x,r);await wait(30);}
      stopCatLegs();await wait(rand(1000,4500));
      for(let o=10;o>=0;o--){cat.setAttribute('opacity',(o/10).toFixed(1));await wait(50);}
    }
  })();

  /* ── HERO ── */
  const heroSVG = `<g id="hero" opacity="0" transform="translate(500,-6)">
    <line id="hLL" x1="-3" y1="262" x2="-4" y2="272" stroke="#0d1e30" stroke-width="5" stroke-linecap="round"/>
    <line id="hRL" x1="3" y1="262" x2="4" y2="272" stroke="#0d1e30" stroke-width="5" stroke-linecap="round"/>
    <ellipse id="hLB" cx="-4" cy="272" rx="5" ry="2" fill="#09141e"/>
    <ellipse id="hRB" cx="4" cy="272" rx="5" ry="2" fill="#09141e"/>
    <path d="M-5,262 L-7,246 C-6,240 6,240 7,246 L5,262 Z" fill="#162e50"/>
    <rect x="-5" y="257" width="10" height="2.5" rx="1" fill="#0a1828"/>
    <line id="hLA" x1="-6" y1="247" x2="-10" y2="256" stroke="#162e50" stroke-width="3.5" stroke-linecap="round"/>
    <line id="hRA" x1="6" y1="247" x2="10" y2="256" stroke="#162e50" stroke-width="3.5" stroke-linecap="round"/>
    <ellipse cx="-7" cy="245" rx="4" ry="3" fill="#122640"/>
    <ellipse cx="7" cy="245" rx="4" ry="3" fill="#122640"/>
    <rect x="-3" y="236" width="6" height="6" rx="1" fill="#b89868"/>
    <path d="M-6,243 Q-6,233 0,232 Q6,233 6,243 Z" fill="#1a3256"/>
    <rect x="-7" y="242" width="14" height="3" rx="1" fill="#1a3256"/>
    <line x1="-4" y1="239" x2="4" y2="239" stroke="#091828" stroke-width="1.5"/>
    <line x1="0" y1="236" x2="0" y2="245" stroke="#091828" stroke-width="1"/>
    <line x1="8" y1="237" x2="9" y2="256" stroke="#3a5878" stroke-width="2" stroke-linecap="round"/>
    <line x1="6" y1="242" x2="11" y2="242" stroke="#3a5878" stroke-width="1.5" stroke-linecap="round"/>
  </g>`;
  svg.insertAdjacentHTML('beforeend', heroSVG);
  const hero=svg.getElementById('hero');
  const hLL=svg.getElementById('hLL'),hRL=svg.getElementById('hRL');
  const hLA=svg.getElementById('hLA'),hRA=svg.getElementById('hRA');
  const hLB=svg.getElementById('hLB'),hRB=svg.getElementById('hRB');
  let hLT=null,hLF=0;
  function startHeroLegs(ms){hLT=setInterval(()=>{hLF=(hLF+1)%4;const sL=[0,5,0,-5][hLF],sR=[0,-5,0,5][hLF];hLL.setAttribute('x2',String(-4+sL));hLL.setAttribute('y2',String(272+Math.abs(sL)*0.2));hRL.setAttribute('x2',String(4+sR));hRL.setAttribute('y2',String(272+Math.abs(sR)*0.2));hLB.setAttribute('cx',String(-4+sL));hRB.setAttribute('cx',String(4+sR));hLA.setAttribute('x2',String(-10+sR*0.5));hRA.setAttribute('x2',String(10+sL*0.5));},ms);}
  function stopHeroLegs(){clearInterval(hLT);hLT=null;hLL.setAttribute('x2','-4');hRL.setAttribute('x2','4');hLL.setAttribute('y2','272');hRL.setAttribute('y2','272');hLB.setAttribute('cx','-4');hRB.setAttribute('cx','4');hLA.setAttribute('x2','-10');hRA.setAttribute('x2','10');}
  function setHeroPos(x,r){if(r){hero.setAttribute('transform',`translate(${x},-6)`);}else{hero.setAttribute('transform',`translate(${x},-6) scale(-1,1)`);}}
  (async function hl(){
    await wait(rand(6000,18000));
    while(true){
      const r=Math.random()>0.5;
      const sx=r?-20:1460,ex=r?rand(300,1100):rand(280,1060),sp=rand(0.55,1.0);
      setHeroPos(sx,r);hero.setAttribute('opacity','0');await wait(60);
      for(let o=0;o<=10;o++){hero.setAttribute('opacity',(o/10).toFixed(1));await wait(35);}
      startHeroLegs(135);
      let x=sx;const d=r?1:-1;
      while((r&&x<ex)||(!r&&x>ex)){x+=d*sp;setHeroPos(x,r);await wait(26);}
      stopHeroLegs();await wait(rand(1500,6000));
      for(let o=10;o>=0;o--){hero.setAttribute('opacity',(o/10).toFixed(1));await wait(40);}
      await wait(rand(12000,40000));
    }
  })();

  /* ── LANTERNS ── */
  [{dot:'circle306',glow:'circle307',base:0.78,bg:0.07},
   {dot:'circle308',glow:'circle309',base:0.68,bg:0.065},
   {dot:'circle310',glow:'circle311',base:0.60,bg:0.06}
  ].forEach(async l=>{
    const dot=svg.getElementById(l.dot),glo=svg.getElementById(l.glow);
    if(!dot||!glo)return;
    while(true){
      await wait(rand(1500,7000));
      const v=rand(0.28,0.50);
      dot.setAttribute('opacity',v);glo.setAttribute('opacity',(v*0.09).toFixed(3));
      await wait(rand(55,210));
      dot.setAttribute('opacity',l.base);glo.setAttribute('opacity',l.bg);
    }
  });

  /* ── FIREFLIES ── */
  document.querySelectorAll('.firefly').forEach(f => f.remove());
  for(let i=0;i<16;i++){
    const f=document.createElement('div');
    f.className='firefly';
    f.style.cssText=[`left:${rand(2,95)}%`,`top:${rand(8,58)}%`,`--dur:${rand(3,8)}s`,`--del:${rand(0,8)}s`,`--dx:${(Math.random()-.5)*36}px`,`--dy:${(Math.random()-.5)*24}px`].join(';');
    document.body.appendChild(f);
  }
    }

  /* ── NAV / FOOTER ── */
  const navEl=document.getElementById('nav-inner');
  if(navEl){fetch('/nav.html').then(r=>r.text()).then(html=>{navEl.innerHTML=html;const t=document.querySelector('.nav-toggle'),l=document.querySelector('.nav-links');if(t&&l)t.addEventListener('click',()=>l.classList.toggle('open'));});}
  const footerEl=document.querySelector('footer');
  if(footerEl)fetch('/footer.html').then(r=>r.text()).then(html=>{footerEl.innerHTML=html;});
  }).catch(function (e) { console.warn('village: landscape failed to load', e); });

})();
