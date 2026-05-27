(function () {
  'use strict';

  const rand  = (a, b) => Math.random() * (b - a) + a;
  const randI = (a, b) => Math.floor(rand(a, b));
  const wait  = ms => new Promise(r => setTimeout(r, ms));

  // ── CLEANUP TRACKING ──
  const _intervals = [];
  const _aborted = { value: false };
 
  window.addEventListener('beforeunload', () => {
    _aborted.value = true;
    _intervals.forEach(clearInterval);
    document.querySelectorAll('.firefly').forEach(f => f.remove());
    const landscape = document.querySelector('.landscape');
    if (landscape) landscape.remove();
  });
  

  // ── Inject SVG from Inkscape ──
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `<svg viewBox="0 0 1440 300" xmlns="http://www.w3.org/2000/svg" class="landscape">
  <defs
     id="defs2">
    <radialGradient
       id="moonGlow"
       cx="50%"
       cy="50%"
       r="50%">
      <stop
         offset="0%"
         stop-color="#f6ecd0"
         stop-opacity="0.22"
         id="stop1" />
      <stop
         offset="100%"
         stop-color="#f6ecd0"
         stop-opacity="0"
         id="stop2" />
    </radialGradient>
    <clipPath
       id="twclip">
      <path
         d="M662,210 L662,197 Q662,188 670,188 Q678,188 678,197 L678,210 Z"
         id="path2" />
    </clipPath>
  </defs>
  <!-- Sky -->
  <!-- Moon -->
  <circle
     cx="1300"
     cy="42"
     r="26"
     fill="#f5edcc"
     opacity="0.90"
     id="circle2" />
  <circle
     cx="1296"
     cy="38"
     r="7"
     fill="#ede0b8"
     opacity="0.28"
     id="circle3" />
  <circle
     cx="1310"
     cy="50"
     r="4"
     fill="#ede0b8"
     opacity="0.20"
     id="circle4" />
  <circle
     cx="1300"
     cy="42"
     fill="url(#moonGlow)"
     id="circle5"
     r="50" />
  <!-- Mountains -->
  <polygon
     points="0,205 60,162 120,180 190,140 265,162 345,120 430,145 510,108 595,132 680,98 765,122 850,90 935,116 1020,84 1105,110 1185,82 1270,106 1355,84 1440,100 1440,300 0,300"
     fill="#0a1522"
     opacity="0.95"
     id="polygon5" />
  <ellipse
     cx="200"
     cy="260"
     rx="260"
     ry="58"
     fill="#080f1c"
     id="ellipse5" />
  <ellipse
     cx="720"
     cy="262"
     rx="340"
     ry="56"
     fill="#080f1c"
     id="ellipse6" />
  <ellipse
     cx="1238"
     cy="260"
     rx="300"
     ry="58"
     fill="#080f1c"
     id="ellipse7" />
  <rect
     x="0"
     y="266"
     width="1440"
     height="34"
     fill="#040d15"
     id="rect7" />
  <rect
     x="0"
     y="266"
     width="1440"
     height="2"
     fill="#0d1e2e"
     opacity="0.6"
     id="rect8" />
  <!-- LEFT CLUSTER -->
  <rect
     x="69.973213"
     y="214.67635"
     width="8"
     height="52"
     fill="#0a1825"
     id="rect9" />
  <rect
     x="30"
     y="214"
     width="46"
     height="52"
     fill="#0e1f30"
     id="rect10" />
  <rect
     x="30"
     y="214"
     width="3"
     height="52"
     fill="#162a40"
     opacity="0.4"
     id="rect11" />
  <rect
     x="30"
     y="260"
     width="46"
     height="6"
     fill="#1a3048"
     opacity="0.45"
     id="rect12" />
  <line
     x1="30"
     y1="228"
     x2="76"
     y2="228"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line12" />
  <line
     x1="30"
     y1="242"
     x2="76"
     y2="242"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line13" />
  <line
     x1="30"
     y1="256"
     x2="76"
     y2="256"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line14" />
  <line
     x1="45.333333333333336"
     y1="228"
     x2="45.333333333333336"
     y2="242"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line15" />
  <line
     x1="60.66666666666667"
     y1="228"
     x2="60.66666666666667"
     y2="242"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line16" />
  <line
     x1="45.333333333333336"
     y1="256"
     x2="45.333333333333336"
     y2="270"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line17" />
  <line
     x1="60.66666666666667"
     y1="256"
     x2="60.66666666666667"
     y2="270"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line18" />
  <rect
     x="34"
     y="192"
     width="8"
     height="19.772322"
     fill="#0a1825"
     id="rect18"
     style="stroke-width:0.872052" />
  <rect
     x="33"
     y="192"
     width="10"
     height="3"
     fill="#1a3048"
     id="rect19" />
  <polygon
     points="82,214 82,218 53,180 "
     fill="#091422"
     id="polygon19"
     transform="matrix(1.0138547,0,0,0.93391682,-0.73429803,11.894972)" />
  <polygon
     points="24,214 53,180 82,214"
     fill="#0b1a28"
     id="polygon20" />
  <polygon
     points="24,214 53,180 53,183 24,217"
     fill="#142236"
     opacity="0.45"
     id="polygon21" />
  <line
     x1="24"
     y1="214"
     x2="82"
     y2="214"
     stroke="#1a3048"
     stroke-width="1"
     opacity="0.55"
     id="line21" />
  <line
     x1="24"
     y1="214"
     x2="53"
     y2="180"
     stroke="#243e58"
     stroke-width="1"
     opacity="0.45"
     id="line22" />
  <line
     x1="82"
     y1="214"
     x2="53"
     y2="180"
     stroke="#243e58"
     stroke-width="1"
     opacity="0.45"
     id="line23" />
  <rect
     x="33"
     y="192"
     width="9.7991076"
     height="3"
     fill="#1a3048"
     id="rect23"
     style="stroke-width:0.989904" />
  <path
     d="m 34.5,240 v -11.16 q 0,-6.84 6.5,-6.84 6.5,0 6.5,6.84 V 240 Z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path23" />
  <path
     d="m 34.5,240 v -11.16 q 0,-6.84 6.5,-6.84 6.5,0 6.5,6.84 V 240 Z"
     fill="#ffd560"
     opacity="0.22"
     id="wL1a" />
  <line
     x1="34.5"
     y1="231.36"
     x2="47.5"
     y2="231.36"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line24" />
  <line
     x1="41"
     y1="221.96672"
     x2="41"
     y2="240"
     stroke="#1c3450"
     stroke-width="1.36702"
     id="line25" />
  <path
     d="m 60.5,240 v -11.16 q 0,-6.84 6.5,-6.84 6.5,0 6.5,6.84 V 240 Z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path25" />
  <path
     d="m 60.5,240 v -11.16 q 0,-6.84 6.5,-6.84 6.5,0 6.5,6.84 V 240 Z"
     fill="#ffd560"
     opacity="0.22"
     id="wL1b" />
  <line
     x1="60.5"
     y1="231.36"
     x2="73.5"
     y2="231.36"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line26" />
  <line
     x1="67"
     y1="222.03775"
     x2="67"
     y2="240"
     stroke="#1c3450"
     stroke-width="1.36432"
     id="line27" />
  <path
     d="m 46,266 v -16.9 q 0,-9.1 8,-9.1 8,0 8,9.1 V 266 Z"
     fill="#050f18"
     stroke="#1c3450"
     stroke-width="1.2"
     id="path27" />
  <rect
     x="49"
     y="251.10001"
     width="3"
     height="8.8999996"
     rx="1"
     fill="#1a3048"
     opacity="0.25"
     id="rect27" />
  <rect
     x="56"
     y="251.10001"
     width="3"
     height="8.8999996"
     rx="1"
     fill="#1a3048"
     opacity="0.25"
     id="rect28" />
  <circle
     cx="54"
     cy="257"
     r="1.5"
     fill="#c89040"
     id="circle28" />
  <rect
     x="144.27455"
     y="171.17857"
     width="8"
     height="96"
     fill="#0a1825"
     id="rect29" />
  <rect
     x="88"
     y="170"
     width="62"
     height="96"
     fill="#0e1f30"
     id="rect30" />
  <rect
     x="88"
     y="170"
     width="3"
     height="96"
     fill="#162a40"
     opacity="0.4"
     id="rect31" />
  <rect
     x="88"
     y="260"
     width="62"
     height="6"
     fill="#1a3048"
     opacity="0.45"
     id="rect32" />
  <line
     x1="88"
     y1="184"
     x2="150"
     y2="184"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line32" />
  <line
     x1="88"
     y1="198"
     x2="150"
     y2="198"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line33" />
  <line
     x1="88"
     y1="212"
     x2="150"
     y2="212"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line34" />
  <line
     x1="88"
     y1="226"
     x2="150"
     y2="226"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line35" />
  <line
     x1="88"
     y1="240"
     x2="150"
     y2="240"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line36" />
  <line
     x1="88"
     y1="254"
     x2="150"
     y2="254"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line37" />
  <line
     x1="108.66666666666667"
     y1="184"
     x2="108.66666666666667"
     y2="198"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line38" />
  <line
     x1="129.33333333333334"
     y1="184"
     x2="129.33333333333334"
     y2="198"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line39" />
  <line
     x1="108.66666666666667"
     y1="212"
     x2="108.66666666666667"
     y2="226"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line40" />
  <line
     x1="129.33333333333334"
     y1="212"
     x2="129.33333333333334"
     y2="226"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line41" />
  <line
     x1="108.66666666666667"
     y1="240"
     x2="108.66666666666667"
     y2="254"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line42" />
  <line
     x1="129.33333333333334"
     y1="240"
     x2="129.33333333333334"
     y2="254"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line43" />
  <rect
     x="94"
     y="142"
     width="8"
     height="26.977678"
     fill="#0a1825"
     id="rect43"
     style="stroke-width:0.918179" />
  <rect
     x="93"
     y="142"
     width="10"
     height="3"
     fill="#1a3048"
     id="rect44" />
  <polygon
     points="119,128 156,170 156,174"
     fill="#091422"
     id="polygon44" />
  <polygon
     points="82,170 119,128 156,170"
     fill="#0b1a28"
     id="polygon45" />
  <polygon
     points="82,170 119,128 119,131 82,173"
     fill="#142236"
     opacity="0.45"
     id="polygon46" />
  <line
     x1="82"
     y1="170"
     x2="156"
     y2="170"
     stroke="#1a3048"
     stroke-width="1"
     opacity="0.55"
     id="line46" />
  <line
     x1="82"
     y1="170"
     x2="119"
     y2="128"
     stroke="#243e58"
     stroke-width="1"
     opacity="0.45"
     id="line47" />
  <line
     x1="156"
     y1="170"
     x2="119"
     y2="128"
     stroke="#243e58"
     stroke-width="1"
     opacity="0.45"
     id="line48" />
  <rect
     x="93"
     y="142"
     width="10"
     height="3"
     fill="#1a3048"
     id="rect48" />
  <path
     d="M99,200 L99,187.6 Q99,180 106,180 Q113,180 113,187.6 L113,200 Z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path48" />
  <path
     d="M99,200 L99,187.6 Q99,180 106,180 Q113,180 113,187.6 L113,200 Z"
     fill="#ffd560"
     opacity="0.22"
     id="wL2a" />
  <line
     x1="99"
     y1="190.4"
     x2="113"
     y2="190.4"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line49" />
  <line
     x1="106"
     y1="179.95694"
     x2="106"
     y2="200"
     stroke="#1c3450"
     stroke-width="1.36722"
     id="line50" />
  <path
     d="M125,200 L125,187.6 Q125,180 132,180 Q139,180 139,187.6 L139,200 Z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path50" />
  <path
     d="M125,200 L125,187.6 Q125,180 132,180 Q139,180 139,187.6 L139,200 Z"
     fill="#ffd560"
     opacity="0.22"
     id="wL2b" />
  <line
     x1="125"
     y1="190.4"
     x2="139"
     y2="190.4"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line51" />
  <line
     x1="132"
     y1="179.88924"
     x2="132"
     y2="200"
     stroke="#1c3450"
     stroke-width="1.36953"
     id="line52" />
  <path
     d="M99,229 L99,217.84 Q99,211 106,211 Q113,211 113,217.84 L113,229 Z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path52" />
  <path
     d="M99,229 L99,217.84 Q99,211 106,211 Q113,211 113,217.84 L113,229 Z"
     fill="#ffd560"
     opacity="0.22"
     id="wL2c" />
  <line
     x1="99"
     y1="220.36"
     x2="113"
     y2="220.36"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line53" />
  <line
     x1="106"
     y1="210.88525"
     x2="106"
     y2="229"
     stroke="#1c3450"
     stroke-width="1.3701"
     id="line54" />
  <path
     d="M125,229 L125,217.84 Q125,211 132,211 Q139,211 139,217.84 L139,229 Z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path54" />
  <path
     d="M125,229 L125,217.84 Q125,211 132,211 Q139,211 139,217.84 L139,229 Z"
     fill="#ffd560"
     opacity="0.22"
     id="wL2d" />
  <line
     x1="125"
     y1="220.36"
     x2="139"
     y2="220.36"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line55" />
  <line
     x1="132"
     y1="210.86014"
     x2="132"
     y2="229"
     stroke="#1c3450"
     stroke-width="1.37105"
     id="line56" />
  <rect
     x="93"
     y="243"
     width="14"
     height="2"
     fill="#1a2e42"
     id="rect56" />
  <rect
     x="131"
     y="243"
     width="14"
     height="2"
     fill="#1a2e42"
     id="rect57" />
  <path
     d="m 109.2156,265.7844 v -15.9258 q 0,-8.57543 10.7844,-8.57543 10.7844,0 10.7844,8.57543 v 15.9258 z"
     fill="#050f18"
     stroke="#1c3450"
     stroke-width="1.63119"
     id="path58" />
  <rect
     x="112"
     y="259.54999"
     width="6"
     height="0.44999999"
     rx="1"
     fill="#1a3048"
     opacity="0.25"
     id="rect59" />
  <rect
     x="122"
     y="259.54999"
     width="6"
     height="0.44999999"
     rx="1"
     fill="#1a3048"
     opacity="0.25"
     id="rect60" />
  <circle
     cx="120"
     cy="257"
     r="1.5"
     fill="#c89040"
     id="circle60" />
  <rect
     x="196.97322"
     y="210.27455"
     width="8"
     height="56"
     fill="#0a1825"
     id="rect61" />
  <rect
     x="163"
     y="210"
     width="40"
     height="56"
     fill="#0e1f30"
     id="rect62" />
  <rect
     x="163"
     y="210"
     width="3"
     height="56"
     fill="#162a40"
     opacity="0.4"
     id="rect63" />
  <rect
     x="163"
     y="260"
     width="40"
     height="6"
     fill="#1a3048"
     opacity="0.45"
     id="rect64" />
  <line
     x1="163"
     y1="224"
     x2="203"
     y2="224"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line64" />
  <line
     x1="163"
     y1="238"
     x2="203"
     y2="238"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line65" />
  <line
     x1="163"
     y1="252"
     x2="203"
     y2="252"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line66" />
  <line
     x1="174.33333"
     y1="224"
     x2="174.33333"
     y2="238"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line67" />
  <line
     x1="187.66667"
     y1="224"
     x2="187.66667"
     y2="238"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line68" />
  <line
     x1="180.33333"
     y1="252"
     x2="180.33333"
     y2="266"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line69" />
  <line
     x1="189.66666666666669"
     y1="252"
     x2="189.66666666666669"
     y2="266"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line70" />
  <polygon
     points="183,178 209,210 209,214"
     fill="#091422"
     id="polygon70" />
  <polygon
     points="157,210 183,178 209,210"
     fill="#0b1a28"
     id="polygon71" />
  <polygon
     points="157,210 183,178 183,181 157,213"
     fill="#142236"
     opacity="0.45"
     id="polygon72" />
  <line
     x1="157"
     y1="210"
     x2="209"
     y2="210"
     stroke="#1a3048"
     stroke-width="1"
     opacity="0.55"
     id="line72" />
  <line
     x1="157"
     y1="210"
     x2="183"
     y2="178"
     stroke="#243e58"
     stroke-width="1"
     opacity="0.45"
     id="line73" />
  <line
     x1="209"
     y1="210"
     x2="183"
     y2="178"
     stroke="#243e58"
     stroke-width="1"
     opacity="0.45"
     id="line74" />
  <path
     d="m 168,235.5 v -10.54 q 0,-6.46 6,-6.46 6,0 6,6.46 v 10.54 z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path74" />
  <path
     d="m 168,235.5 v -10.54 q 0,-6.46 6,-6.46 6,0 6,6.46 v 10.54 z"
     fill="#ffd560"
     opacity="0.22"
     id="wL3a" />
  <line
     x1="168"
     y1="227.34"
     x2="180"
     y2="227.34"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line75" />
  <line
     x1="174"
     y1="218.4586"
     x2="174"
     y2="235.5"
     stroke="#1c3450"
     stroke-width="1.36742"
     id="line76" />
  <path
     d="m 188,235.5 v -10.54 q 0,-6.46 6,-6.46 6,0 6,6.46 v 10.54 z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path76" />
  <path
     d="m 188,235.5 v -10.54 q 0,-6.46 6,-6.46 6,0 6,6.46 v 10.54 z"
     fill="#ffd560"
     opacity="0.22"
     id="wL3b" />
  <line
     x1="188"
     y1="227.34"
     x2="200"
     y2="227.34"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line77" />
  <line
     x1="194"
     y1="218.4837"
     x2="194"
     y2="235.5"
     stroke="#1c3450"
     stroke-width="1.36641"
     id="line78" />
  <path
     d="m 176,266 v -15.6 q 0,-8.4 7,-8.4 7,0 7,8.4 V 266 Z"
     fill="#050f18"
     stroke="#1c3450"
     stroke-width="1.2"
     id="path78" />
  <rect
     x="179"
     y="252.39999"
     width="2"
     height="7.5999999"
     rx="1"
     fill="#1a3048"
     opacity="0.25"
     id="rect78" />
  <rect
     x="185"
     y="252.39999"
     width="2"
     height="7.5999999"
     rx="1"
     fill="#1a3048"
     opacity="0.25"
     id="rect79" />
  <circle
     cx="183"
     cy="257"
     r="1.5"
     fill="#c89040"
     id="circle79" />
  <rect
     x="218.85"
     y="234.5"
     width="6.300000000000001"
     height="31.5"
     fill="#040c06"
     id="rect80" />
  <ellipse
     cx="222"
     cy="266"
     rx="18.9"
     ry="2.3071289"
     fill="#030a05"
     opacity="0.4"
     id="ellipse80" />
  <ellipse
     cx="222"
     cy="236.6"
     rx="18.900000000000002"
     ry="13.65"
     fill="#061008"
     id="ellipse81" />
  <ellipse
     cx="217.8"
     cy="228.2"
     rx="15.75"
     ry="11.55"
     fill="#08160a"
     id="ellipse82" />
  <ellipse
     cx="225.15"
     cy="219.8"
     rx="13.65"
     ry="10.5"
     fill="#0a1e0d"
     id="ellipse83" />
  <ellipse
     cx="219.9"
     cy="210.35"
     rx="11.55"
     ry="9.450000000000001"
     fill="#0c2410"
     id="ellipse84" />
  <ellipse
     cx="222"
     cy="200.89999999999998"
     rx="8.4"
     ry="7.3500000000000005"
     fill="#0e2a13"
     id="ellipse85" />
  <ellipse
     cx="224.1"
     cy="195.64999999999998"
     rx="5.25"
     ry="4.2"
     fill="#112e16"
     opacity="0.7"
     id="ellipse86" />
  <rect
     x="243.36"
     y="239.6"
     width="5.28"
     height="26.4"
     fill="#040c06"
     id="rect86" />
  <ellipse
     cx="246"
     cy="266"
     rx="15.84"
     ry="1.9694451"
     fill="#030a05"
     opacity="0.4"
     id="ellipse87" />
  <ellipse
     cx="246"
     cy="241.36"
     rx="15.84"
     ry="11.44"
     fill="#061008"
     id="ellipse88" />
  <ellipse
     cx="242.48"
     cy="234.32"
     rx="13.2"
     ry="9.68"
     fill="#08160a"
     id="ellipse89" />
  <ellipse
     cx="248.64"
     cy="227.28"
     rx="11.44"
     ry="8.8"
     fill="#0a1e0d"
     id="ellipse90" />
  <ellipse
     cx="244.24"
     cy="219.36"
     rx="9.68"
     ry="7.92"
     fill="#0c2410"
     id="ellipse91" />
  <ellipse
     cx="246"
     cy="211.44"
     rx="7.04"
     ry="6.16"
     fill="#0e2a13"
     id="ellipse92" />
  <ellipse
     cx="247.76"
     cy="207.04"
     rx="4.4"
     ry="3.52"
     fill="#112e16"
     opacity="0.7"
     id="ellipse93" />
  <!-- CENTRE CLUSTER -->
  <rect
     x="638.17584"
     y="198.45995"
     width="8"
     height="68"
     fill="#0a1825"
     id="rect93" />
  <rect
     x="596"
     y="198"
     width="48"
     height="68"
     fill="#0e1f30"
     id="rect94" />
  <rect
     x="596"
     y="198"
     width="3"
     height="68"
     fill="#162a40"
     opacity="0.4"
     id="rect95" />
  <rect
     x="596"
     y="260"
     width="48"
     height="6"
     fill="#1a3048"
     opacity="0.45"
     id="rect96" />
  <line
     x1="596"
     y1="212"
     x2="644"
     y2="212"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line96" />
  <line
     x1="596"
     y1="226"
     x2="644"
     y2="226"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line97" />
  <line
     x1="596"
     y1="240"
     x2="644"
     y2="240"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line98" />
  <line
     x1="596"
     y1="254"
     x2="644"
     y2="254"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line99" />
  <line
     x1="607.31226"
     y1="204.82634"
     x2="607.31226"
     y2="218.82634"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line100" />
  <line
     x1="630.98309"
     y1="205.39455"
     x2="630.98309"
     y2="219.39455"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line101" />
  <line
     x1="612"
     y1="240"
     x2="612"
     y2="254"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line102" />
  <line
     x1="628"
     y1="240"
     x2="628"
     y2="254"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line103" />
  <rect
     x="601"
     y="172"
     width="8"
     height="24"
     fill="#0a1825"
     id="rect103" />
  <rect
     x="600"
     y="170"
     width="10"
     height="3"
     fill="#1a3048"
     id="rect104" />
  <polygon
     points="620,162 650,198 650,202"
     fill="#091422"
     id="polygon104" />
  <polygon
     points="590,198 620,162 650,198"
     fill="#0b1a28"
     id="polygon105" />
  <polygon
     points="590,198 620,162 620,165 590,201"
     fill="#142236"
     opacity="0.45"
     id="polygon106" />
  <line
     x1="590"
     y1="198"
     x2="650"
     y2="198"
     stroke="#1a3048"
     stroke-width="1"
     opacity="0.55"
     id="line106" />
  <line
     x1="590"
     y1="198"
     x2="620"
     y2="162"
     stroke="#243e58"
     stroke-width="1"
     opacity="0.45"
     id="line107" />
  <line
     x1="650"
     y1="198"
     x2="620"
     y2="162"
     stroke="#243e58"
     stroke-width="1"
     opacity="0.45"
     id="line108" />
  <rect
     x="600"
     y="170"
     width="10"
     height="3"
     fill="#1a3048"
     id="rect108" />
  <path
     d="m 600.4261,220.42902 v -11.16 q 0,-6.84 6.5,-6.84 6.5,0 6.5,6.84 v 11.16 z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path108" />
  <path
     d="m 600.4261,220.42902 v -11.16 q 0,-6.84 6.5,-6.84 6.5,0 6.5,6.84 v 11.16 z"
     fill="#ffd560"
     opacity="0.22"
     id="wC1a" />
  <line
     x1="600.42609"
     y1="211.78902"
     x2="613.42609"
     y2="211.78902"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line109" />
  <line
     x1="606.92609"
     y1="202.26405"
     x2="606.92609"
     y2="220.42902"
     stroke="#1c3450"
     stroke-width="1.372"
     id="line110" />
  <path
     d="m 628.48311,220.39455 v -11.16 q 0,-6.84 6.5,-6.84 6.5,0 6.5,6.84 v 11.16 z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path110" />
  <path
     d="m 628.48311,220.39455 v -11.16 q 0,-6.84 6.5,-6.84 6.5,0 6.5,6.84 v 11.16 z"
     fill="#ffd560"
     opacity="0.22"
     id="wC1b" />
  <line
     x1="628.48309"
     y1="211.75455"
     x2="641.48309"
     y2="211.75455"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line111" />
  <line
     x1="634.98309"
     y1="202.38025"
     x2="634.98309"
     y2="220.39455"
     stroke="#1c3450"
     stroke-width="1.3663"
     id="line112" />
  <path
     d="m 614.42053,241.2525 v -9.92 q 0,-6.08 6,-6.08 6,0 6,6.08 v 9.92 z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path112" />
  <path
     d="m 614.42053,241.2525 v -9.92 q 0,-6.08 6,-6.08 6,0 6,6.08 v 9.92 z"
     fill="#ffd560"
     opacity="0.22"
     id="wC1c" />
  <line
     x1="614.42053"
     y1="233.57251"
     x2="626.42053"
     y2="233.57251"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line113" />
  <line
     x1="620.42053"
     y1="225.13376"
     x2="620.42053"
     y2="241.2525"
     stroke="#1c3450"
     stroke-width="1.37081"
     id="line114" />
  <path
     d="m 611.87511,266.02007 v -13.84978 q 0,-7.45758 8.94905,-7.45758 8.94905,0 8.94905,7.45758 v 13.84978 z"
     fill="#050f18"
     stroke="#1c3450"
     stroke-width="1.3019"
     id="path114" />
  <rect
     x="615.03723"
     y="256.44205"
     width="4"
     height="3.7"
     rx="1"
     fill="#1a3048"
     opacity="0.25"
     id="rect114" />
  <rect
     x="623.03723"
     y="256.44205"
     width="4"
     height="3.7"
     rx="1"
     fill="#1a3048"
     opacity="0.25"
     id="rect115" />
  <circle
     cx="621.03723"
     cy="257.14206"
     fill="#c89040"
     id="circle115"
     r="1.5" />
  <!-- WIZARD TOWER -->
  <rect
     x="701.18707"
     y="128.45995"
     width="8"
     height="138"
     fill="#0a1825"
     id="rect116" />
  <rect
     x="655"
     y="128"
     width="54"
     height="138"
     fill="#0a1825"
     id="rect117" />
  <rect
     x="655"
     y="128"
     width="3"
     height="138"
     fill="#0e1f30"
     opacity="0.4"
     id="rect118" />
  <rect
     x="655"
     y="260"
     width="54"
     height="6"
     fill="#1a3048"
     opacity="0.45"
     id="rect119" />
  <line
     x1="655"
     y1="142"
     x2="709"
     y2="142"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line119" />
  <line
     x1="655"
     y1="156"
     x2="709"
     y2="156"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line120" />
  <line
     x1="655"
     y1="170"
     x2="709"
     y2="170"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line121" />
  <line
     x1="655"
     y1="184"
     x2="709"
     y2="184"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line122" />
  <line
     x1="655"
     y1="198"
     x2="709"
     y2="198"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line123" />
  <line
     x1="655"
     y1="212"
     x2="709"
     y2="212"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line124" />
  <line
     x1="655"
     y1="226"
     x2="709"
     y2="226"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line125" />
  <line
     x1="655"
     y1="240"
     x2="709"
     y2="240"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line126" />
  <line
     x1="655"
     y1="254"
     x2="709"
     y2="254"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line127" />
  <line
     x1="673"
     y1="142"
     x2="673"
     y2="156"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line128" />
  <line
     x1="691"
     y1="142"
     x2="691"
     y2="156"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line129" />
  <line
     x1="673"
     y1="170"
     x2="673"
     y2="184"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line130" />
  <line
     x1="691"
     y1="170"
     x2="691"
     y2="184"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line131" />
  <line
     x1="673"
     y1="198"
     x2="673"
     y2="212"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line132" />
  <line
     x1="691"
     y1="198"
     x2="691"
     y2="212"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line133" />
  <line
     x1="673"
     y1="226"
     x2="673"
     y2="240"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line134" />
  <line
     x1="691"
     y1="226"
     x2="691"
     y2="240"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line135" />
  <line
     x1="673"
     y1="254"
     x2="673"
     y2="265.99106"
     stroke="#1a3048"
     stroke-width="0.555285"
     opacity="0.2"
     id="line136" />
  <line
     x1="691"
     y1="254"
     x2="691"
     y2="266.59375"
     stroke="#1a3048"
     stroke-width="0.569069"
     opacity="0.2"
     id="line137" />
  <polygon
     points="682,78 715,128 715,132"
     fill="#091422"
     id="polygon137" />
  <polygon
     points="649,128 682,78 715,128"
     fill="#0b1a28"
     id="polygon138" />
  <polygon
     points="649,128 682,78 682,81 649,131"
     fill="#142236"
     opacity="0.45"
     id="polygon139" />
  <line
     x1="649"
     y1="128"
     x2="715"
     y2="128"
     stroke="#1a3048"
     stroke-width="1"
     opacity="0.55"
     id="line139" />
  <line
     x1="649"
     y1="128"
     x2="682"
     y2="78"
     stroke="#243e58"
     stroke-width="1"
     opacity="0.45"
     id="line140" />
  <line
     x1="715"
     y1="128"
     x2="682"
     y2="78"
     stroke="#243e58"
     stroke-width="1"
     opacity="0.45"
     id="line141" />
  <rect
     x="655.85175"
     y="117"
     width="52.445114"
     height="3"
     fill="#1a3048"
     opacity="0.45"
     id="rect141"
     style="stroke-width:0.96774" />
  <line
     x1="682"
     y1="117"
     x2="682"
     y2="74"
     stroke="#1a3048"
     stroke-width="1.5"
     opacity="0.55"
     id="line142" />
  <circle
     cx="682"
     cy="74"
     r="2.5"
     fill="#c89040"
     opacity="0.85"
     id="circle142" />
  <circle
     cx="682"
     cy="74"
     r="6"
     fill="#c89040"
     opacity="0.12"
     id="circle143" />
  <circle
     cx="682"
     cy="148"
     r="10"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1.2"
     id="circle144" />
  <circle
     cx="682"
     cy="148"
     r="10"
     fill="#ffd560"
     opacity="0.26"
     id="circle145" />
  <line
     x1="682"
     y1="138"
     x2="682"
     y2="158"
     stroke="#0a1825"
     stroke-width="1.4"
     id="line145" />
  <line
     x1="672"
     y1="148"
     x2="692"
     y2="148"
     stroke="#0a1825"
     stroke-width="1.4"
     id="line146" />
  <line
     x1="675"
     y1="141"
     x2="689"
     y2="155"
     stroke="#0a1825"
     stroke-width="1"
     opacity="0.7"
     id="line147" />
  <line
     x1="689"
     y1="141"
     x2="675"
     y2="155"
     stroke="#0a1825"
     stroke-width="1"
     opacity="0.7"
     id="line148" />
  <path
     d="M660,182 L660,168.36 Q660,160 668,160 Q676,160 676,168.36 L676,182 Z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path148" />
  <path
     d="M660,182 L660,168.36 Q660,160 668,160 Q676,160 676,168.36 L676,182 Z"
     fill="#ffd560"
     opacity="0.22"
     id="wC2a" />
  <line
     x1="660"
     y1="171.44"
     x2="676"
     y2="171.44"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line149" />
  <line
     x1="668"
     y1="159.99368"
     x2="668"
     y2="182"
     stroke="#1c3450"
     stroke-width="1.36595"
     id="line150" />
  <path
     d="M688,182 L688,168.36 Q688,160 696,160 Q704,160 704,168.36 L704,182 Z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path150" />
  <path
     d="M688,182 L688,168.36 Q688,160 696,160 Q704,160 704,168.36 L704,182 Z"
     fill="#ffd560"
     opacity="0.22"
     id="wC2b" />
  <line
     x1="688"
     y1="171.44"
     x2="704"
     y2="171.44"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line151" />
  <line
     x1="696"
     y1="159.89323"
     x2="696"
     y2="182"
     stroke="#1c3450"
     stroke-width="1.36906"
     id="line152" />
  <path
     d="M662,210 L662,196.36 Q662,188 670,188 Q678,188 678,196.36 L678,210 Z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path152" />
  <g
     clip-path="url(#twclip)"
     id="shadow-figure">
    <polygon
       points="667,202 670,194 673,202"
       fill="#010508"
       id="polygon154" />
    <rect
       x="665"
       y="201"
       width="10"
       height="2"
       rx="1"
       fill="#010508"
       id="rect154" />
    <ellipse
       cx="670"
       cy="206"
       rx="3.5"
       ry="4"
       fill="#010508"
       id="ellipse154" />
    <path
       d="M665,210 Q670,208 675,210 L675,210 L665,210 Z"
       fill="#010508"
       id="path154" />
  </g>
  <path
     d="M662,210 L662,196.36 Q662,188 670,188 Q678,188 678,196.36 L678,210 Z"
     fill="#ffd560"
     opacity="0.22"
     id="shadow-win" />
  <line
     x1="662"
     y1="199.44"
     x2="678"
     y2="199.44"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line153" />
  <line
     x1="670"
     y1="187.89323"
     x2="670"
     y2="210"
     stroke="#1c3450"
     stroke-width="1.36906"
     id="line154" />
  <path
     d="M688,210 L688,196.36 Q688,188 696,188 Q704,188 704,196.36 L704,210 Z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path155" />
  <path
     d="M688,210 L688,196.36 Q688,188 696,188 Q704,188 704,196.36 L704,210 Z"
     fill="#ffd560"
     opacity="0.22"
     id="wC2c" />
  <line
     x1="688"
     y1="199.44"
     x2="704"
     y2="199.44"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line155" />
  <line
     x1="696"
     y1="187.79279"
     x2="696"
     y2="210"
     stroke="#1c3450"
     stroke-width="1.37217"
     id="line156" />
  <path
     d="m 672,266 v -22.1 q 0,-11.9 12,-11.9 12,0 12,11.9 V 266 Z"
     fill="#050f18"
     stroke="#1c3450"
     stroke-width="1.2"
     id="path156" />
  <rect
     x="675"
     y="245.89999"
     width="7"
     height="14.1"
     rx="1"
     fill="#1a3048"
     opacity="0.25"
     id="rect156" />
  <rect
     x="686"
     y="245.89999"
     width="7"
     height="14.1"
     rx="1"
     fill="#1a3048"
     opacity="0.25"
     id="rect157" />
  <circle
     cx="684"
     cy="257"
     r="1.5"
     fill="#c89040"
     id="circle157" />
  <!-- TAVERN -->
  <rect
     x="764.03381"
     y="178.74405"
     width="8"
     height="88"
     fill="#0a1825"
     id="rect158" />
  <rect
     x="720"
     y="178"
     width="50"
     height="88"
     fill="#0e1f30"
     id="rect159" />
  <rect
     x="720"
     y="178"
     width="3"
     height="88"
     fill="#162a40"
     opacity="0.4"
     id="rect160" />
  <rect
     x="720"
     y="260"
     width="50"
     height="6"
     fill="#1a3048"
     opacity="0.45"
     id="rect161" />
  <line
     x1="720"
     y1="192"
     x2="770"
     y2="192"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line161" />
  <line
     x1="720"
     y1="206"
     x2="770"
     y2="206"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line162" />
  <line
     x1="720"
     y1="220"
     x2="770"
     y2="220"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line163" />
  <line
     x1="720"
     y1="234"
     x2="770"
     y2="234"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line164" />
  <line
     x1="720"
     y1="248"
     x2="770"
     y2="248"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line165" />
  <line
     x1="736.6666666666666"
     y1="192"
     x2="736.6666666666666"
     y2="206"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line166" />
  <line
     x1="753.3333333333333"
     y1="192"
     x2="753.3333333333333"
     y2="206"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line167" />
  <line
     x1="769.9999999999999"
     y1="192"
     x2="769.9999999999999"
     y2="206"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line168" />
  <line
     x1="736.6666666666666"
     y1="220"
     x2="736.6666666666666"
     y2="234"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line169" />
  <line
     x1="753.3333333333333"
     y1="220"
     x2="753.3333333333333"
     y2="234"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line170" />
  <line
     x1="769.9999999999999"
     y1="220"
     x2="769.9999999999999"
     y2="234"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line171" />
  <line
     x1="736.6666666666666"
     y1="248"
     x2="736.6666666666666"
     y2="262"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line172" />
  <line
     x1="753.3333333333333"
     y1="248"
     x2="753.3333333333333"
     y2="262"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line173" />
  <line
     x1="769.9999999999999"
     y1="248"
     x2="769.9999999999999"
     y2="262"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line174" />
  <rect
     x="758"
     y="152"
     width="8"
     height="22"
     fill="#0a1825"
     id="rect174" />
  <rect
     x="757"
     y="150"
     width="10"
     height="3"
     fill="#1a3048"
     id="rect175" />
  <polygon
     points="745,140 776,178 776,182"
     fill="#091422"
     id="polygon175" />
  <polygon
     points="714,178 745,140 776,178"
     fill="#0b1a28"
     id="polygon176" />
  <polygon
     points="714,178 745,140 745,143 714,181"
     fill="#142236"
     opacity="0.45"
     id="polygon177" />
  <line
     x1="714"
     y1="178"
     x2="776"
     y2="178"
     stroke="#1a3048"
     stroke-width="1"
     opacity="0.55"
     id="line177" />
  <line
     x1="714"
     y1="178"
     x2="745"
     y2="140"
     stroke="#243e58"
     stroke-width="1"
     opacity="0.45"
     id="line178" />
  <line
     x1="776"
     y1="178"
     x2="745"
     y2="140"
     stroke="#243e58"
     stroke-width="1"
     opacity="0.45"
     id="line179" />
  <rect
     x="757"
     y="150"
     width="10"
     height="3"
     fill="#1a3048"
     id="rect179" />
  <path
     d="m 725.5,208 v -11.16 q 0,-6.84 6.5,-6.84 6.5,0 6.5,6.84 V 208 Z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path182" />
  <path
     d="m 725.5,208 v -11.16 q 0,-6.84 6.5,-6.84 6.5,0 6.5,6.84 V 208 Z"
     fill="#ffd560"
     opacity="0.22"
     id="wC3a" />
  <line
     x1="725.5"
     y1="199.36"
     x2="738.5"
     y2="199.36"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line183" />
  <line
     x1="732"
     y1="189.73589"
     x2="732"
     y2="208"
     stroke="#1c3450"
     stroke-width="1.37574"
     id="line184" />
  <path
     d="m 753.5,208 v -11.16 q 0,-6.84 6.5,-6.84 6.5,0 6.5,6.84 V 208 Z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path184" />
  <path
     d="m 753.5,208 v -11.16 q 0,-6.84 6.5,-6.84 6.5,0 6.5,6.84 V 208 Z"
     fill="#ffd560"
     opacity="0.22"
     id="wC3b" />
  <line
     x1="753.5"
     y1="199.36"
     x2="766.5"
     y2="199.36"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line185" />
  <line
     x1="760"
     y1="189.94896"
     x2="760"
     y2="208"
     stroke="#1c3450"
     stroke-width="1.36769"
     id="line186" />
  <path
     d="m 739.89955,230.34933 v -9.3 q 0,-5.7 6,-5.7 6,0 6,5.7 v 9.3 z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path186" />
  <path
     d="m 739.89955,230.34933 v -9.3 q 0,-5.7 6,-5.7 6,0 6,5.7 v 9.3 z"
     fill="#ffd560"
     opacity="0.22"
     id="wC3c" />
  <line
     x1="739.8996"
     y1="223.14934"
     x2="751.8996"
     y2="223.14934"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line187" />
  <line
     x1="745.8996"
     y1="215.1825"
     x2="745.8996"
     y2="230.34935"
     stroke="#1c3450"
     stroke-width="1.37333"
     id="line188" />
  <path
     d="m 734.68873,266.07103 v -20.8 q 0,-11.2 11,-11.2 11,0 11,11.2 v 20.8 z"
     fill="#050f18"
     stroke="#1c3450"
     stroke-width="1.2"
     id="path188" />
  <rect
     x="737.68872"
     y="247.27103"
     width="6"
     height="12.8"
     rx="1"
     fill="#1a3048"
     opacity="0.25"
     id="rect188" />
  <rect
     x="747.68872"
     y="247.27103"
     width="6"
     height="12.8"
     rx="1"
     fill="#1a3048"
     opacity="0.25"
     id="rect189" />
  <circle
     cx="745.68872"
     cy="257.07101"
     r="1.5"
     fill="#c89040"
     id="circle189" />
  <rect
     x="569.15"
     y="237.5"
     width="5.699999999999999"
     height="28.5"
     fill="#040c06"
     id="rect190" />
  <ellipse
     cx="572"
     cy="266"
     rx="17.099999999999998"
     ry="6.6499999999999995"
     fill="#030a05"
     opacity="0.4"
     id="ellipse190" />
  <ellipse
     cx="572"
     cy="239.4"
     rx="17.099999999999998"
     ry="12.35"
     fill="#061008"
     id="ellipse191" />
  <ellipse
     cx="568.2"
     cy="231.8"
     rx="14.25"
     ry="10.45"
     fill="#08160a"
     id="ellipse192" />
  <ellipse
     cx="574.85"
     cy="224.2"
     rx="12.35"
     ry="9.5"
     fill="#0a1e0d"
     id="ellipse193" />
  <ellipse
     cx="570.1"
     cy="215.65"
     rx="10.45"
     ry="8.549999999999999"
     fill="#0c2410"
     id="ellipse194" />
  <ellipse
     cx="572"
     cy="207.1"
     rx="7.6"
     ry="6.6499999999999995"
     fill="#0e2a13"
     id="ellipse195" />
  <ellipse
     cx="573.9"
     cy="202.35"
     rx="4.75"
     ry="3.8"
     fill="#112e16"
     opacity="0.7"
     id="ellipse196" />
  <rect
     x="779"
     y="236"
     width="6"
     height="30"
     fill="#040c06"
     id="rect196" />
  <ellipse
     cx="782"
     cy="266"
     rx="18"
     ry="7"
     fill="#030a05"
     opacity="0.4"
     id="ellipse197" />
  <ellipse
     cx="782"
     cy="238"
     rx="18"
     ry="13"
     fill="#061008"
     id="ellipse198" />
  <ellipse
     cx="778"
     cy="230"
     rx="15"
     ry="11"
     fill="#08160a"
     id="ellipse199" />
  <ellipse
     cx="785"
     cy="222"
     rx="13"
     ry="10"
     fill="#0a1e0d"
     id="ellipse200" />
  <ellipse
     cx="780"
     cy="213"
     rx="11"
     ry="9"
     fill="#0c2410"
     id="ellipse201" />
  <ellipse
     cx="782"
     cy="204"
     rx="8"
     ry="7"
     fill="#0e2a13"
     id="ellipse202" />
  <ellipse
     cx="784"
     cy="199"
     rx="5"
     ry="4"
     fill="#112e16"
     opacity="0.7"
     id="ellipse203" />
  <rect
     x="803.6"
     y="242"
     width="4.800000000000001"
     height="24"
     fill="#040c06"
     id="rect203" />
  <ellipse
     cx="806"
     cy="266"
     rx="14.4"
     ry="5.6000000000000005"
     fill="#030a05"
     opacity="0.4"
     id="ellipse204" />
  <ellipse
     cx="806"
     cy="243.6"
     rx="14.4"
     ry="10.4"
     fill="#061008"
     id="ellipse205" />
  <ellipse
     cx="802.8"
     cy="237.2"
     rx="12"
     ry="8.8"
     fill="#08160a"
     id="ellipse206" />
  <ellipse
     cx="808.4"
     cy="230.8"
     rx="10.4"
     ry="8"
     fill="#0a1e0d"
     id="ellipse207" />
  <ellipse
     cx="804.4"
     cy="223.6"
     rx="8.8"
     ry="7.2"
     fill="#0c2410"
     id="ellipse208" />
  <ellipse
     cx="806"
     cy="216.4"
     rx="6.4"
     ry="5.6000000000000005"
     fill="#0e2a13"
     id="ellipse209" />
  <ellipse
     cx="807.6"
     cy="212.4"
     rx="4"
     ry="3.2"
     fill="#112e16"
     opacity="0.7"
     id="ellipse210" />
  <!-- RIGHT CLUSTER -->
  <rect
     x="1203.8917"
     y="179.45432"
     width="8"
     height="88"
     fill="#0a1825"
     id="rect210" />
  <rect
     x="1168"
     y="178"
     width="42"
     height="88"
     fill="#0e1f30"
     id="rect211" />
  <rect
     x="1168"
     y="178"
     width="3"
     height="88"
     fill="#162a40"
     opacity="0.4"
     id="rect212" />
  <rect
     x="1168"
     y="260"
     width="42"
     height="6"
     fill="#1a3048"
     opacity="0.45"
     id="rect213" />
  <line
     x1="1168"
     y1="192"
     x2="1210"
     y2="192"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line213" />
  <line
     x1="1168"
     y1="206"
     x2="1210"
     y2="206"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line214" />
  <line
     x1="1168"
     y1="220"
     x2="1210"
     y2="220"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line215" />
  <line
     x1="1168"
     y1="234"
     x2="1210"
     y2="234"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line216" />
  <line
     x1="1168"
     y1="248"
     x2="1210"
     y2="248"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line217" />
  <line
     x1="1182"
     y1="192"
     x2="1182"
     y2="206"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line218" />
  <line
     x1="1196"
     y1="192"
     x2="1196"
     y2="206"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line219" />
  <line
     x1="1182"
     y1="220"
     x2="1182"
     y2="234"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line220" />
  <line
     x1="1196"
     y1="220"
     x2="1196"
     y2="234"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line221" />
  <line
     x1="1182"
     y1="248"
     x2="1182"
     y2="262"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line222" />
  <line
     x1="1196"
     y1="248"
     x2="1196"
     y2="262"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line223" />
  <rect
     x="1168"
     y="152"
     width="8"
     height="22"
     fill="#0a1825"
     id="rect223" />
  <rect
     x="1167"
     y="150"
     width="10"
     height="3"
     fill="#1a3048"
     id="rect224" />
  <polygon
     points="1189,140 1216,178 1216,182"
     fill="#091422"
     id="polygon224" />
  <polygon
     points="1162,178 1189,140 1216,178"
     fill="#0b1a28"
     id="polygon225" />
  <polygon
     points="1162,178 1189,140 1189,143 1162,181"
     fill="#142236"
     opacity="0.45"
     id="polygon226" />
  <line
     x1="1162"
     y1="178"
     x2="1216"
     y2="178"
     stroke="#1a3048"
     stroke-width="1"
     opacity="0.55"
     id="line226" />
  <line
     x1="1162"
     y1="178"
     x2="1189"
     y2="140"
     stroke="#243e58"
     stroke-width="1"
     opacity="0.45"
     id="line227" />
  <line
     x1="1216"
     y1="178"
     x2="1189"
     y2="140"
     stroke="#243e58"
     stroke-width="1"
     opacity="0.45"
     id="line228" />
  <rect
     x="1167"
     y="150"
     width="10"
     height="3"
     fill="#1a3048"
     id="rect228" />
  <circle
     cx="1188.929"
     cy="138.50845"
     r="2.5"
     fill="#c89040"
     opacity="0.7"
     id="circle228" />
  <circle
     cx="1189"
     cy="198"
     r="9"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1.2"
     id="circle229" />
  <circle
     cx="1189"
     cy="198"
     r="9"
     fill="#ffd560"
     opacity="0.20"
     id="circle230" />
  <line
     x1="1189"
     y1="189"
     x2="1189"
     y2="207"
     stroke="#0a1825"
     stroke-width="1.4"
     id="line230" />
  <line
     x1="1180"
     y1="198"
     x2="1198"
     y2="198"
     stroke="#0a1825"
     stroke-width="1.4"
     id="line231" />
  <path
     d="m 1172,228.5 v -10.54 q 0,-6.46 6,-6.46 6,0 6,6.46 v 10.54 z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path231" />
  <path
     d="m 1172,228.5 v -10.54 q 0,-6.46 6,-6.46 6,0 6,6.46 v 10.54 z"
     fill="#ffd560"
     opacity="0.22"
     id="wR1a" />
  <line
     x1="1172"
     y1="220.34"
     x2="1184"
     y2="220.34"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line232" />
  <line
     x1="1178"
     y1="211.39853"
     x2="1178"
     y2="228.5"
     stroke="#1c3450"
     stroke-width="1.36982"
     id="line233" />
  <path
     d="m 1194,228.5 v -10.54 q 0,-6.46 6,-6.46 6,0 6,6.46 v 10.54 z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path233" />
  <path
     d="m 1194,228.5 v -10.54 q 0,-6.46 6,-6.46 6,0 6,6.46 v 10.54 z"
     fill="#ffd560"
     opacity="0.22"
     id="wR1b" />
  <line
     x1="1194"
     y1="220.34"
     x2="1206"
     y2="220.34"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line234" />
  <line
     x1="1200"
     y1="211.3275"
     x2="1200"
     y2="228.5"
     stroke="#1c3450"
     stroke-width="1.37267"
     id="line235" />
  <path
     d="M1178,266 L1178,245.85 Q1178,235 1189,235 Q1200,235 1200,245.85 L1200,266 Z"
     fill="#050f18"
     stroke="#1c3450"
     stroke-width="1.2"
     id="path235" />
  <rect
     x="1181"
     y="247.85"
     width="6"
     height="12.149999999999999"
     rx="1"
     fill="#1a3048"
     opacity="0.25"
     id="rect235" />
  <rect
     x="1191"
     y="247.85"
     width="6"
     height="12.149999999999999"
     rx="1"
     fill="#1a3048"
     opacity="0.25"
     id="rect236" />
  <circle
     cx="1189"
     cy="257"
     r="1.5"
     fill="#c89040"
     id="circle236" />
  <rect
     x="1289.8917"
     y="148.60199"
     width="8"
     height="118"
     fill="#0a1825"
     id="rect237" />
  <rect
     x="1218"
     y="148"
     width="78"
     height="118"
     fill="#0e1f30"
     id="rect238" />
  <rect
     x="1218"
     y="148"
     width="3"
     height="118"
     fill="#162a40"
     opacity="0.4"
     id="rect239" />
  <rect
     x="1218"
     y="260"
     width="78"
     height="6"
     fill="#1a3048"
     opacity="0.45"
     id="rect240" />
  <line
     x1="1218"
     y1="162"
     x2="1296"
     y2="162"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line240" />
  <line
     x1="1218"
     y1="176"
     x2="1296"
     y2="176"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line241" />
  <line
     x1="1218"
     y1="190"
     x2="1296"
     y2="190"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line242" />
  <line
     x1="1218"
     y1="204"
     x2="1296"
     y2="204"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line243" />
  <line
     x1="1218"
     y1="218"
     x2="1296"
     y2="218"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line244" />
  <line
     x1="1218"
     y1="232"
     x2="1296"
     y2="232"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line245" />
  <line
     x1="1218"
     y1="246"
     x2="1296"
     y2="246"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line246" />
  <line
     x1="1244"
     y1="162"
     x2="1244"
     y2="176"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line247" />
  <line
     x1="1270"
     y1="162"
     x2="1270"
     y2="176"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line248" />
  <line
     x1="1244"
     y1="190"
     x2="1244"
     y2="204"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line249" />
  <line
     x1="1261.2611"
     y1="197.18192"
     x2="1261.2611"
     y2="211.18192"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line250" />
  <line
     x1="1244"
     y1="218"
     x2="1244"
     y2="232"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line251" />
  <line
     x1="1270"
     y1="218"
     x2="1270"
     y2="232"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line252" />
  <line
     x1="1239.916"
     y1="246.14206"
     x2="1239.916"
     y2="260.14206"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line253" />
  <line
     x1="1265.916"
     y1="246.14206"
     x2="1265.916"
     y2="260.14206"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line254" />
  <rect
     x="1224"
     y="116"
     width="8"
     height="29.571428"
     fill="#0a1825"
     id="rect254"
     style="stroke-width:0.906327" />
  <rect
     x="1223"
     y="116"
     width="10"
     height="3"
     fill="#1a3048"
     id="rect255" />
  <polygon
     points="1257,102 1302,148 1302,152"
     fill="#091422"
     id="polygon255" />
  <polygon
     points="1212,148 1257,102 1302,148"
     fill="#0b1a28"
     id="polygon256" />
  <polygon
     points="1212,148 1257,102 1257,105 1212,151"
     fill="#142236"
     opacity="0.45"
     id="polygon257" />
  <line
     x1="1212"
     y1="148"
     x2="1302"
     y2="148"
     stroke="#1a3048"
     stroke-width="1"
     opacity="0.55"
     id="line257" />
  <line
     x1="1212"
     y1="148"
     x2="1257"
     y2="102"
     stroke="#243e58"
     stroke-width="1"
     opacity="0.45"
     id="line258" />
  <line
     x1="1302"
     y1="148"
     x2="1257"
     y2="102"
     stroke="#243e58"
     stroke-width="1"
     opacity="0.45"
     id="line259" />
  <rect
     x="1223"
     y="116"
     width="10"
     height="3"
     fill="#1a3048"
     id="rect259" />
  <path
     d="M1228.5,182 L1228.5,169.6 Q1228.5,162 1236,162 Q1243.5,162 1243.5,169.6 L1243.5,182 Z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path260" />
  <path
     d="M1228.5,182 L1228.5,169.6 Q1228.5,162 1236,162 Q1243.5,162 1243.5,169.6 L1243.5,182 Z"
     fill="#ffd560"
     opacity="0.22"
     id="wR2a" />
  <line
     x1="1228.5"
     y1="172.4"
     x2="1243.5"
     y2="172.4"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line260" />
  <line
     x1="1236"
     y1="161.80124"
     x2="1236"
     y2="182"
     stroke="#1c3450"
     stroke-width="1.37252"
     id="line261" />
  <path
     d="M1249.5,182 L1249.5,169.6 Q1249.5,162 1257,162 Q1264.5,162 1264.5,169.6 L1264.5,182 Z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path261" />
  <path
     d="M1249.5,182 L1249.5,169.6 Q1249.5,162 1257,162 Q1264.5,162 1264.5,169.6 L1264.5,182 Z"
     fill="#ffd560"
     opacity="0.22"
     id="wR2b" />
  <line
     x1="1249.5"
     y1="172.4"
     x2="1264.5"
     y2="172.4"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line262" />
  <line
     x1="1257"
     y1="161.80124"
     x2="1257"
     y2="182"
     stroke="#1c3450"
     stroke-width="1.37252"
     id="line263" />
  <path
     d="M1270.5,182 L1270.5,169.6 Q1270.5,162 1278,162 Q1285.5,162 1285.5,169.6 L1285.5,182 Z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path263" />
  <path
     d="M1270.5,182 L1270.5,169.6 Q1270.5,162 1278,162 Q1285.5,162 1285.5,169.6 L1285.5,182 Z"
     fill="#ffd560"
     opacity="0.22"
     id="wR2c" />
  <line
     x1="1270.5"
     y1="172.4"
     x2="1285.5"
     y2="172.4"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line264" />
  <line
     x1="1278"
     y1="161.80124"
     x2="1278"
     y2="182"
     stroke="#1c3450"
     stroke-width="1.37252"
     id="line265" />
  <path
     d="m 1239.2734,217.10491 v -11.16 q 0,-6.84 7,-6.84 7,0 7,6.84 v 11.16 z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path265" />
  <path
     d="m 1239.2734,217.10491 v -11.16 q 0,-6.84 7,-6.84 7,0 7,6.84 v 11.16 z"
     fill="#ffd560"
     opacity="0.22"
     id="wR2d" />
  <line
     x1="1239.2734"
     y1="208.4649"
     x2="1253.2734"
     y2="208.4649"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line266" />
  <line
     x1="1246.2734"
     y1="198.94733"
     x2="1246.2734"
     y2="217.1049"
     stroke="#1c3450"
     stroke-width="1.37172"
     id="line267" />
  <path
     d="m 1261.2612,217.18192 v -11.16 q 0,-6.84 7,-6.84 7,0 7,6.84 v 11.16 z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path267" />
  <path
     d="m 1261.2612,217.18192 v -11.16 q 0,-6.84 7,-6.84 7,0 7,6.84 v 11.16 z"
     fill="#ffd560"
     opacity="0.22"
     id="wR2e" />
  <line
     x1="1261.2611"
     y1="208.54192"
     x2="1275.2611"
     y2="208.54192"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line268" />
  <line
     x1="1268.2611"
     y1="199.02434"
     x2="1268.2611"
     y2="217.18192"
     stroke="#1c3450"
     stroke-width="1.37172"
     id="line269" />
  <path
     d="m 1243.916,266.14205 v -24.7 q 0,-13.3 13,-13.3 13,0 13,13.3 v 24.7 z"
     fill="#050f18"
     stroke="#1c3450"
     stroke-width="1.2"
     id="path269" />
  <rect
     x="1246.916"
     y="243.44206"
     width="8"
     height="16.700001"
     rx="1"
     fill="#1a3048"
     opacity="0.25"
     id="rect269" />
  <rect
     x="1258.916"
     y="243.44206"
     width="8"
     height="16.700001"
     rx="1"
     fill="#1a3048"
     opacity="0.25"
     id="rect270" />
  <circle
     cx="1256.916"
     cy="257.14206"
     r="1.5"
     fill="#c89040"
     id="circle270" />
  <rect
     x="1346.0338"
     y="200.45995"
     width="8"
     height="66"
     fill="#0a1825"
     id="rect271" />
  <rect
     x="1310"
     y="200"
     width="42"
     height="66"
     fill="#0e1f30"
     id="rect272" />
  <rect
     x="1310"
     y="200"
     width="3"
     height="66"
     fill="#162a40"
     opacity="0.4"
     id="rect273" />
  <rect
     x="1310"
     y="260"
     width="42"
     height="6"
     fill="#1a3048"
     opacity="0.45"
     id="rect274" />
  <line
     x1="1310"
     y1="214"
     x2="1352"
     y2="214"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line274" />
  <line
     x1="1310"
     y1="228"
     x2="1352"
     y2="228"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line275" />
  <line
     x1="1310"
     y1="242"
     x2="1352"
     y2="242"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line276" />
  <line
     x1="1310"
     y1="256"
     x2="1352"
     y2="256"
     stroke="#1a3048"
     stroke-width="0.7"
     opacity="0.35"
     id="line277" />
  <line
     x1="1318"
     y1="214"
     x2="1318"
     y2="228"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line278" />
  <line
     x1="1336"
     y1="214"
     x2="1336"
     y2="228"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line279" />
  <line
     x1="1327.4727"
     y1="242"
     x2="1327.4727"
     y2="256"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line280" />
  <line
     x1="1344"
     y1="242"
     x2="1344"
     y2="256"
     stroke="#1a3048"
     stroke-width="0.6"
     opacity="0.2"
     id="line281" />
  <rect
     x="1310"
     y="178"
     width="8"
     height="22"
     fill="#0a1825"
     id="rect281" />
  <rect
     x="1309"
     y="178"
     width="10"
     height="3"
     fill="#1a3048"
     id="rect282" />
  <polygon
     points="1331,166 1358,200 1358,204"
     fill="#091422"
     id="polygon282" />
  <polygon
     points="1304,200 1331,166 1358,200"
     fill="#0b1a28"
     id="polygon283" />
  <polygon
     points="1304,200 1331,166 1331,169 1304,203"
     fill="#142236"
     opacity="0.45"
     id="polygon284" />
  <line
     x1="1304"
     y1="200"
     x2="1358"
     y2="200"
     stroke="#1a3048"
     stroke-width="1"
     opacity="0.55"
     id="line284" />
  <line
     x1="1304"
     y1="200"
     x2="1331"
     y2="166"
     stroke="#243e58"
     stroke-width="1"
     opacity="0.45"
     id="line285" />
  <line
     x1="1358"
     y1="200"
     x2="1331"
     y2="166"
     stroke="#243e58"
     stroke-width="1"
     opacity="0.45"
     id="line286" />
  <rect
     x="1309"
     y="178"
     width="10"
     height="3"
     fill="#1a3048"
     id="rect286" />
  <path
     d="m 1314,228.5 v -10.54 q 0,-6.46 6,-6.46 6,0 6,6.46 v 10.54 z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path286" />
  <path
     d="m 1314,228.5 v -10.54 q 0,-6.46 6,-6.46 6,0 6,6.46 v 10.54 z"
     fill="#ffd560"
     opacity="0.22"
     id="wR3a" />
  <line
     x1="1314"
     y1="220.34"
     x2="1326"
     y2="220.34"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line287" />
  <line
     x1="1320"
     y1="211.39853"
     x2="1320"
     y2="228.5"
     stroke="#1c3450"
     stroke-width="1.36982"
     id="line288" />
  <path
     d="m 1336,228.5 v -10.54 q 0,-6.46 6,-6.46 6,0 6,6.46 v 10.54 z"
     fill="#1c3450"
     stroke="#1a3048"
     stroke-width="1"
     id="path288" />
  <path
     d="m 1336,228.5 v -10.54 q 0,-6.46 6,-6.46 6,0 6,6.46 v 10.54 z"
     fill="#ffd560"
     opacity="0.22"
     id="wR3b" />
  <line
     x1="1336"
     y1="220.34"
     x2="1348"
     y2="220.34"
     stroke="#1c3450"
     stroke-width="1.2"
     id="line289" />
  <line
     x1="1342"
     y1="211.68263"
     x2="1342"
     y2="228.5"
     stroke="#1c3450"
     stroke-width="1.3584"
     id="line290" />
  <path
     d="m 1323.4727,266 v -20.8 q 0,-11.2 8,-11.2 8,0 8,11.2 V 266 Z"
     fill="#050f18"
     stroke="#1c3450"
     stroke-width="1.2"
     id="path290" />
  <rect
     x="1326.4727"
     y="247.2"
     width="3"
     height="12.8"
     rx="1"
     fill="#1a3048"
     opacity="0.25"
     id="rect290" />
  <rect
     x="1333.4727"
     y="247.2"
     width="3"
     height="12.8"
     rx="1"
     fill="#1a3048"
     opacity="0.25"
     id="rect291" />
  <circle
     cx="1331.4727"
     cy="257"
     r="1.5"
     fill="#c89040"
     id="circle291" />
  <rect
     x="1125"
     y="236"
     width="6"
     height="30"
     fill="#040c06"
     id="rect292" />
  <ellipse
     cx="1128"
     cy="266"
     rx="18"
     ry="7"
     fill="#030a05"
     opacity="0.4"
     id="ellipse292" />
  <ellipse
     cx="1128"
     cy="238"
     rx="18"
     ry="13"
     fill="#061008"
     id="ellipse293" />
  <ellipse
     cx="1124"
     cy="230"
     rx="15"
     ry="11"
     fill="#08160a"
     id="ellipse294" />
  <ellipse
     cx="1131"
     cy="222"
     rx="13"
     ry="10"
     fill="#0a1e0d"
     id="ellipse295" />
  <ellipse
     cx="1126"
     cy="213"
     rx="11"
     ry="9"
     fill="#0c2410"
     id="ellipse296" />
  <ellipse
     cx="1128"
     cy="204"
     rx="8"
     ry="7"
     fill="#0e2a13"
     id="ellipse297" />
  <ellipse
     cx="1130"
     cy="199"
     rx="5"
     ry="4"
     fill="#112e16"
     opacity="0.7"
     id="ellipse298" />
  <rect
     x="1147.54"
     y="241.4"
     width="4.92"
     height="24.599999999999998"
     fill="#040c06"
     id="rect298" />
  <ellipse
     cx="1150"
     cy="266"
     rx="14.76"
     ry="5.739999999999999"
     fill="#030a05"
     opacity="0.4"
     id="ellipse299" />
  <ellipse
     cx="1150"
     cy="243.04"
     rx="14.76"
     ry="10.66"
     fill="#061008"
     id="ellipse300" />
  <ellipse
     cx="1146.72"
     cy="236.48"
     rx="12.299999999999999"
     ry="9.02"
     fill="#08160a"
     id="ellipse301" />
  <ellipse
     cx="1152.46"
     cy="229.92000000000002"
     rx="10.66"
     ry="8.2"
     fill="#0a1e0d"
     id="ellipse302" />
  <ellipse
     cx="1148.36"
     cy="222.54"
     rx="9.02"
     ry="7.38"
     fill="#0c2410"
     id="ellipse303" />
  <ellipse
     cx="1150"
     cy="215.16"
     rx="6.56"
     ry="5.739999999999999"
     fill="#0e2a13"
     id="ellipse304" />
  <ellipse
     cx="1151.64"
     cy="211.06"
     rx="4.1"
     ry="3.28"
     fill="#112e16"
     opacity="0.7"
     id="ellipse305" />
  <!-- LANTERNS -->
  <rect
     x="394"
     y="246"
     width="4"
     height="20"
     fill="#1a2e42"
     id="rect305" />
  <rect
     x="391"
     y="238"
     width="10"
     height="9"
     rx="2"
     fill="#1a2e42"
     id="rect306" />
  <polygon
     points="392,238 400,238 399,231 393,231"
     fill="#1e3450"
     id="polygon306" />
  <line
     x1="393"
     y1="231"
     x2="399"
     y2="231"
     stroke="#243e58"
     stroke-width="1"
     id="line306" />
  <circle
     cx="396"
     cy="235"
     r="4.5"
     fill="#ffd560"
     opacity="0.78"
     id="circle306" />
  <circle
     cx="396"
     cy="235"
     r="12"
     fill="#ffd560"
     opacity="0.07"
     id="circle307" />
  <rect
     x="866"
     y="246"
     width="4"
     height="20"
     fill="#1a2e42"
     id="rect307" />
  <rect
     x="863"
     y="238"
     width="10"
     height="9"
     rx="2"
     fill="#1a2e42"
     id="rect308" />
  <polygon
     points="864,238 872,238 871,231 865,231"
     fill="#1e3450"
     id="polygon308" />
  <line
     x1="865"
     y1="231"
     x2="871"
     y2="231"
     stroke="#243e58"
     stroke-width="1"
     id="line308" />
  <circle
     cx="868"
     cy="235"
     r="4.5"
     fill="#ffd560"
     opacity="0.78"
     id="circle308" />
  <circle
     cx="868"
     cy="235"
     r="12"
     fill="#ffd560"
     opacity="0.07"
     id="circle309" />
  <rect
     x="1080"
     y="246"
     width="4"
     height="20"
     fill="#1a2e42"
     id="rect309" />
  <rect
     x="1077"
     y="238"
     width="10"
     height="9"
     rx="2"
     fill="#1a2e42"
     id="rect310" />
  <polygon
     points="1078,238 1086,238 1085,231 1079,231"
     fill="#1e3450"
     id="polygon310" />
  <line
     x1="1079"
     y1="231"
     x2="1085"
     y2="231"
     stroke="#243e58"
     stroke-width="1"
     id="line310" />
  <circle
     cx="1082"
     cy="235"
     r="4.5"
     fill="#ffd560"
     opacity="0.78"
     id="circle310" />
  <circle
     cx="1082"
     cy="235"
     r="12"
     fill="#ffd560"
     opacity="0.07"
     id="circle311" />
</svg>
`;
  const svg = wrapper.firstElementChild;
  document.body.appendChild(svg);

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
  (async function wl(){while(!_aborted.value){await wait(rand(3000,12000));const w=wins[randI(0,wins.length)];if(w.el.id==='shadow-win')continue;flickerWin(w);}})();

  /* ── SHADOW WIZARD ── */
  const figure = svg.getElementById('shadow-figure');
  const shadowWin = svg.getElementById('shadow-win');
  (async function sl(){
    while(!_aborted.value){
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
  function startCatLegs(ms){catLT=setInterval(()=>{catLF=(catLF+1)%4;cLegs.forEach((l,i)=>{const up=(i%2===0)?catLF<2:catLF>=2;l.setAttribute('y',up?'262':'265');l.setAttribute('height',up?'10':'7');});},ms);_intervals.push(catLT);}
  function stopCatLegs(){clearInterval(catLT);catLT=null;cLegs.forEach(l=>{l.setAttribute('y','265');l.setAttribute('height','7');});}
  function setCatPos(x,r){if(r){cat.setAttribute('transform',`translate(${x},0)`);}else{cat.setAttribute('transform',`translate(${x+46},0) scale(-1,1)`);}}
  (async function cl(){
    while(!_aborted.value){
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
  function startHeroLegs(ms){hLT=setInterval(()=>{hLF=(hLF+1)%4;const sL=[0,5,0,-5][hLF],sR=[0,-5,0,5][hLF];hLL.setAttribute('x2',String(-4+sL));hLL.setAttribute('y2',String(272+Math.abs(sL)*0.2));hRL.setAttribute('x2',String(4+sR));hRL.setAttribute('y2',String(272+Math.abs(sR)*0.2));hLB.setAttribute('cx',String(-4+sL));hRB.setAttribute('cx',String(4+sR));hLA.setAttribute('x2',String(-10+sR*0.5));hRA.setAttribute('x2',String(10+sL*0.5));},ms);_intervals.push(hLT);}
  function stopHeroLegs(){clearInterval(hLT);hLT=null;hLL.setAttribute('x2','-4');hRL.setAttribute('x2','4');hLL.setAttribute('y2','272');hRL.setAttribute('y2','272');hLB.setAttribute('cx','-4');hRB.setAttribute('cx','4');hLA.setAttribute('x2','-10');hRA.setAttribute('x2','10');}
  function setHeroPos(x,r){if(r){hero.setAttribute('transform',`translate(${x},-6)`);}else{hero.setAttribute('transform',`translate(${x},-6) scale(-1,1)`);}}
  (async function hl(){
    await wait(rand(6000,18000));
    while(!_aborted.value){
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
    while(!_aborted.value){
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

  /* ── NAV / FOOTER ── */
  const navEl=document.getElementById('nav-inner');
  if(navEl){fetch('/nav.html').then(r=>r.text()).then(html=>{navEl.innerHTML=html;const t=document.querySelector('.nav-toggle'),l=document.querySelector('.nav-links');if(t&&l)t.addEventListener('click',()=>l.classList.toggle('open'));});}
  const footerEl=document.querySelector('footer');
  if(footerEl)fetch('/footer.html').then(r=>r.text()).then(html=>{footerEl.innerHTML=html;});

})();
