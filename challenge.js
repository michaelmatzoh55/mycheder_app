/* ================= CHALLENGE A FRIEND (codes, no accounts) ================= */
(function(){
const WORDS={before:"APPLE",after:"COOKIE",white:"WHITE",yellow:"YELLOW",orange:"ORANGE",green:"GREEN",blue:"BLUE",purple:"PURPLE",brown:"BROWN"};
const BYWORD=Object.fromEntries(Object.entries(WORDS).map(([k,w])=>[w,k]));
const NAMES={before:"Bracha Blitz: Before you eat",after:"Bracha Blitz: After you eat",white:"White Belt",yellow:"Yellow Belt",orange:"Orange Belt",green:"Green Belt",blue:"Blue Belt",purple:"Purple Belt",brown:"Brown Belt"};
function rng(a){ return function(){ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296 } }
const newSeed=()=>1000+Math.floor(Math.random()*8000);
function seeded(seed,fn){ const r=Math.random; Math.random=rng(seed*7919); try{ return fn() } finally{ Math.random=r } }
const makeCode=(game,seed,score)=>`${WORDS[game]}-${seed*11+score}`;
function parse(txt){ const m=String(txt||"").toUpperCase().replace(/\s+/g,"").match(/^([A-Z]+)-?(\d{5})$/); if(!m) return null;
  const game=BYWORD[m[1]], n=+m[2], seed=Math.floor(n/11), score=n%11; if(!game||seed<1000||seed>8999) return null; return {game,seed,score} }

/* The panel shown at the end of a round */
function panel(game,seed,score,total,ch){
  if(ch){ const win=score>ch.score, tie=score===ch.score;
    if(!ch.paid){ ch.paid=true; const g=win?3:tie?1:0; if(g){ S.gelt+=g; save() } S.chWins=(S.chWins||0)+(win?1:0); save();
      if(win){ party(true); sfx.klezmer() } }
    return `<div class="chbox"><div class="chh">🏆 Challenge result</div>
      <div class="chvs"><div><b>${score}</b><span>You</span></div><i>vs</i><div><b>${ch.score}</b><span>Your friend</span></div></div>
      <p class="chres">${win?"You win! +3 gelt 🎉":tie?"It's a tie! +1 gelt 🤝":"Your friend wins this time. Play again and send them a new code!"}</p></div>`+panel(game,newSeedFor(game,seed),score,total,null).replace("Challenge a friend!","Now challenge them back!") }
  const code=makeCode(game,seed,score);
  return `<div class="chbox"><div class="chh">Challenge a friend!</div>
    <p>Send this code to a friend. They play the <b>same round</b> and try to beat your ${score} of ${total}.</p>
    <div class="chcode" lang="en">${code}</div>
    <button class="btn gold" type="button" data-chcopy="${code}">📋 Copy code</button>
    <p class="chsmall">Your friend taps <b>🏆 Challenge a Friend</b> on the home screen and types it in.</p></div>` }
// When answering a challenge, your own score code uses the same seed so your friend can see it too
const newSeedFor=(g,s)=>s;
document.addEventListener("click",async e=>{ const b=e.target.closest("[data-chcopy]"); if(!b) return;
  try{ await navigator.clipboard.writeText(b.dataset.chcopy); toast("Code copied! Send it to a friend.") }catch(err){ toast("Your code: "+b.dataset.chcopy) } sfx.coin() });
window.SSCH={seeded,newSeed,panel};

/* Bracha Blitz: every round gets a seed, so it can be shared */
let CHB=null;
const _bs=blitzStart; blitzStart=function(lvl,seed,ch){ const sd=seed||newSeed(); seeded(sd,()=>_bs(lvl)); BZ.seed=sd; BZ.ch=ch||null;
  if(ch){ BZ.paceWas=S.pace; S.pace=1 } };
const _be=bzEnd; bzEnd=function(){ if(BZ&&BZ.paceWas!=null){ S.pace=BZ.paceWas; BZ.paceWas=null } const b=BZ; _be();
  const gd=$("bzBox").querySelector(".gdone"); if(gd&&b) gd.insertAdjacentHTML("afterend",panel(b.lvl,b.seed,b.score,b.items.length,b.ch)) };

/* Home card + screen */
VIEWS.push("chal");
const anchor=$("openSages")||$("openHol")||$("openPa");
anchor.insertAdjacentHTML("afterend",`<button class="blitzcard chcard" id="openChal" type="button"><span class="em" aria-hidden="true">🏆</span>
  <span><b>Challenge a Friend</b><span>Got a code from a friend? Play the same round and try to beat them!</span></span><span class="bzs" id="chWins"></span></button>`);
$("party").insertAdjacentHTML("beforebegin",`<div class="wrap" id="chal" hidden>
  <div class="toprow"><button class="back" id="chBack" type="button">← Home</button></div>
  <div class="phead"><div class="he" lang="he">אֶתְגָּר</div><h2>Challenge a Friend</h2><p class="when">Beat your friends, one code at a time!</p></div>
  <div class="buddy compact"><span class="ywrap" id="chY"></span><div class="bubble"><span class="name">Shlomo</span><b>Got a code?</b> Type it in below and play the exact same round your friend played.<br><br><b>Want to send one?</b> Finish a round of Bracha Blitz or a Reading Belt test. You'll get a code to send!</div></div>
  <label class="rplab">Friend's code <input id="chIn" type="text" autocomplete="off" autocapitalize="characters" placeholder="Like APPLE-53097"></label>
  <p class="chsmall" id="chErr" hidden></p>
  <button class="btn gold big" id="chGo" type="button" style="align-self:center">Play the challenge ▶</button>
  <div class="row" style="justify-content:center;flex-wrap:wrap"><button class="btn" id="chB1" type="button">⚡ Bracha Blitz</button><button class="btn" id="chB2" type="button">🥋 Reading Belts</button></div>
  <p class="chsmall" style="text-align:center">Only share codes with friends you know. 🙂</p>
</div>`);
function paintWins(){ const w=S.chWins||0; if($("chWins")) $("chWins").textContent=w?`${w} challenge${w>1?"s":""} won`:"" }
$("openChal").onclick=()=>{ sfx.pop(); stopPlay(); showOnly("chal"); $("chY").innerHTML=yossi(); $("chIn").value=""; $("chErr").hidden=true };
$("chBack").onclick=()=>{ sfx.tick(); $("chal").hidden=true; goHome() };
$("chB1").onclick=()=>{ $("chal").hidden=true; openBlitz("play") };
$("chB2").onclick=()=>{ $("chal").hidden=true; if(window.openBelts) openBelts() };
document.addEventListener("click",e=>{ if(e.target.closest("[data-nav]")) $("chal").hidden=true },true);
$("chIn").onkeydown=e=>{ if(e.key==="Enter") $("chGo").click() };
$("chGo").onclick=()=>{ const c=parse($("chIn").value);
  if(!c){ $("chErr").hidden=false; $("chErr").textContent="Hmm, that code doesn't look right. Check it and try again!"; sfx.wrong(); return }
  sfx.pop(); $("chal").hidden=true;
  if(c.game==="before"||c.game==="after"){ openBlitz("play"); blitzStart(c.game,c.seed,{score:c.score}) }
  else if(window.startBeltChallenge) window.startBeltChallenge(c.game,c.seed,{score:c.score}) };

document.head.insertAdjacentHTML("beforeend",`<style>
.chcard{background:linear-gradient(135deg,#946409,#e3ad3a 50%,#1d3d8c);box-shadow:0 5px 0 #5c3e05}
.chcard b,.chcard .bzs{color:#fff4d6}
.chbox{background:var(--klaf);border:2px dashed var(--gold-hi);border-radius:18px;padding:14px;display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;margin-top:12px}
.chbox p{margin:0}
.chh{font-family:var(--display);font-size:1.35rem;color:var(--tech)}
.chcode{font-family:var(--say);font-weight:700;font-size:1.8rem;letter-spacing:2px;color:var(--gold);background:var(--bg);border-radius:12px;padding:8px 16px;user-select:all}
.chsmall{font-size:.85rem;color:var(--muted)}
.chvs{display:flex;align-items:center;gap:18px}
.chvs div{display:flex;flex-direction:column;align-items:center}
.chvs b{font-family:var(--display);font-size:2.4rem;color:var(--tech);line-height:1}
.chvs span{font-size:.85rem;color:var(--muted);font-weight:700}
.chvs i{font-style:normal;color:var(--gold);font-weight:700}
.chres{font-weight:700;color:var(--ink)}
</style>`);
const _rH=renderHome; renderHome=function(){ _rH(); paintWins() }; paintWins();
})();

/* ================= MY CHEDER letters: tap a letter to jump to that part of the app ================= */
(function(){
const box=document.querySelector("#home .acro"); if(!box) return;
const click=sel=>()=>{ const b=document.querySelector(sel); if(b) b.click() };
const GO=[
 ["Mitzvos",()=>{ if(window.openMitzvos) window.openMitzvos() }], // M  Mitzvah
 ["Holidays",click("#openHol")],                       // Y  Yom Tov
 ["this week's Parsha",click('[data-nav="parsha"]')],  // C  Chumash
 ["100 Hebrew Words",()=>{ if(window.openWords) window.openWords(); else click('[data-nav="abc"]')() }], // H  Hebrew
 ["Food brachos",click('[data-nav="blitz"]')],         // E  Eating
 ["Prayers",()=>{ const g=$("groups"); if(g) g.scrollIntoView({behavior:"smooth",block:"start"}) }], // D  Davening
 ["Earn & Grow",()=>{ if(window.openEarn) window.openEarn(); else if(window.openBelts) window.openBelts() }], // E  Earn
 ["the Sages",click("#openSages")]                     // R  Rebbes
];
box.querySelectorAll("span").forEach((s,i)=>{ const g=GO[i]; if(!g) return;
  s.setAttribute("role","button"); s.tabIndex=0; s.setAttribute("aria-label",`${s.textContent.slice(1)}: go to ${g[0]}`); s.style.setProperty("--i",i);
  const go=()=>{ if(typeof sfx!=="undefined") sfx.pop(); s.classList.remove("tapd"); void s.offsetWidth; s.classList.add("tapd"); setTimeout(g[1],140) };
  s.onclick=go; s.onkeydown=e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); go() } } });
box.setAttribute("role","group"); box.setAttribute("aria-label","MY CHEDER: tap a letter to go there");
document.head.insertAdjacentHTML("beforeend",`<style>
.acro span[role=button]{cursor:pointer;transition:transform .12s,background .15s;-webkit-tap-highlight-color:transparent}
.acro span[role=button]:hover{background:rgba(0,0,0,.3);transform:translateY(-2px)}
.acro span[role=button]:focus-visible{outline:2px solid #f4c95f;outline-offset:2px}
.acro span.tapd{animation:acrotap .3s ease-out}
@keyframes acrotap{40%{transform:scale(.9);background:rgba(242,198,94,.35)}}
/* Marquee lights: a soft gold glow runs across the letters, then rests, so people know they can tap */
.acro span[role=button]{position:relative;isolation:isolate}
.acro span[role=button]::after{content:"";position:absolute;inset:-1px;border-radius:inherit;pointer-events:none;z-index:-1;opacity:0;
  background:radial-gradient(ellipse at 50% 35%,rgba(255,226,140,.28),transparent 70%);box-shadow:0 0 0 2px rgba(255,226,150,.95),0 0 16px 4px rgba(255,200,80,.6),inset 0 0 14px rgba(255,220,130,.45);
  animation:acroglow 5.6s linear infinite;animation-delay:calc(var(--i,0) * .7s - 5.6s)}
.acro span[role=button] b{animation:acrotext 5.6s linear infinite;animation-delay:calc(var(--i,0) * .7s - 5.6s)}
@keyframes acroglow{0%{opacity:0}9%{opacity:.6}15%{opacity:1}21%{opacity:.6}30%{opacity:0}100%{opacity:0}}
@keyframes acrotext{0%{filter:none}15%{filter:drop-shadow(0 0 7px rgba(255,214,110,1)) brightness(1.25)}30%{filter:none}100%{filter:none}}
.acro:hover span[role=button]::after,.acro:focus-within span[role=button]::after{animation-play-state:paused}
@media (prefers-reduced-motion:reduce){.acro span[role=button]::after{animation:none;opacity:.55}.acro span[role=button] b{animation:none}}
</style>`);
})();
