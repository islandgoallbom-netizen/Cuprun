const cv=document.getElementById('c'),g=cv.getContext('2d',{alpha:false});
const W=800,H=400,GROUND=320,PX=120,CEIL=70,TAU=Math.PI*2;
let SPEED=6.5;
let BEAT=60/128,PPB=SPEED*60*BEAT,lvl=1;
cv.width=W;cv.height=H;
function fit(){const s=Math.min(innerWidth/W,innerHeight/H);cv.style.width=W*s+'px';cv.style.height=H*s+'px';}
addEventListener('resize',fit);fit();

/* levels: each one is the same every attempt */
const LV={
 1:{name:'Level 1: Neon Run',bpm:128,seed:7,skipA:57,skipB:82,ws:60,we:80,endB:96,gap:150,rest:.2,hardAt:48,wig:110},
 2:{name:'Level 2: Bone Castle',bpm:140,seed:23,skipA:63,skipB:90,ws:66,we:88,endB:104,gap:140,rest:.1,hardAt:34,wig:120},
 3:{name:'Level 3: Skull Inferno',bpm:150,seed:57,skipA:76,skipB:104,ws:80,we:102,endB:130,gap:120,rest:0,hardAt:0,wig:140,adv:1.75,adv4:2.75},
 4:{name:'Level 4: New Coast',bpm:135,seed:91,skipA:69,skipB:96,ws:72,we:94,endB:112,gap:130,rest:.05,hardAt:30,wig:130,adv:1.9,adv4:2.9},
 5:{name:'Level 5: Christmas City',bpm:160,seed:7,skipA:90,skipB:122,ws:94,we:120,endB:150,gap:105,rest:0,hardAt:0,wig:160,adv:1.6,adv4:2.6,speed:8.4},
 6:{name:'Level 6: Monochrome',bpm:150,seed:11,skipA:86,skipB:112,ws:90,we:110,endB:136,gap:125,rest:.05,hardAt:20,wig:150,adv:1.7,adv4:2.7,speed:7.2,saws:true},
 7:{name:'Level 7: ALB',bpm:130,seed:31,gz:[[34,54],[70,90]],skipA:101,skipB:124,ws:104,we:122,endB:138,gap:150,rest:.15,hardAt:20,wig:110}
};
let seed=7;function rnd(){seed=(seed*16807)%2147483647;return seed/2147483647;}
let spikes=[],blocks=[],wcols=[],saws=[],cspikes=[],cblocks=[],gzp=[],LEN=0,WS=0,WE=0;
function build(n){
  const L=LV[n];lvl=n;SPEED=L.speed||6.5;BEAT=60/L.bpm;PPB=SPEED*60*BEAT;seed=L.seed;attempt=0;
  spikes=[];blocks=[];wcols=[];saws=[];cspikes=[];cblocks=[];gzp=(L.gz||[]).map(z=>[z[0]*PPB,z[1]*PPB]);WS=L.ws*PPB;WE=L.we*PPB;
  try{best=+localStorage.getItem('cuberun_best2_'+n)||0;}catch(e){best=0;}
  let b=8;
  while(b<L.endB){
