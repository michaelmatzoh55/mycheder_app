/* ================= FIND A SHUL: links out to Chabad.org and the phone's map app ================= */
(function(){
const SHUL_SVG=`<svg class="shulart" viewBox="0 0 320 200" role="img" aria-label="A synagogue with a Magen David window and the Luchos on the roof">
 <defs>
  <linearGradient id="shSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fc0f2"/><stop offset="1" stop-color="#e8f0fc"/></linearGradient>
  <linearGradient id="shWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7ead0"/><stop offset="1" stop-color="#e6cf9f"/></linearGradient>
  <linearGradient id="shRoof" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b53b4"/><stop offset="1" stop-color="#1d3d8c"/></linearGradient>
  <linearGradient id="shGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2c2"/><stop offset=".5" stop-color="#e3ad3a"/><stop offset="1" stop-color="#a87618"/></linearGradient>
  <radialGradient id="shWin" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#fff7d6"/><stop offset=".6" stop-color="#f5cf6b"/><stop offset="1" stop-color="#d9962a"/></radialGradient>
 </defs>
 <rect width="320" height="200" rx="18" fill="url(#shSky)"/>
 <circle cx="268" cy="38" r="16" fill="#fff4c8" opacity=".9"/>
 <g fill="#fff" opacity=".85"><ellipse cx="60" cy="40" rx="26" ry="9"/><ellipse cx="78" cy="34" rx="16" ry="9"/><ellipse cx="222" cy="60" rx="20" ry="7"/></g>
 <rect y="168" width="320" height="32" fill="#8cc47a"/><rect y="166" width="320" height="5" fill="#76b064"/>
 <g><rect x="30" y="122" width="7" height="48" fill="#7a4a22"/><circle cx="33" cy="112" r="22" fill="#4f9a55"/><circle cx="24" cy="120" r="14" fill="#5fae63"/>
  <rect x="283" y="122" width="7" height="48" fill="#7a4a22"/><circle cx="287" cy="112" r="22" fill="#4f9a55"/><circle cx="296" cy="120" r="14" fill="#5fae63"/></g>
 <rect x="70" y="82" width="180" height="86" fill="url(#shWall)" stroke="#b88d45" stroke-width="2"/>
 <path d="M60 84 L160 40 L260 84Z" fill="url(#shRoof)" stroke="#0f2459" stroke-width="2" stroke-linejoin="round"/>
 <path d="M66 84 H254" stroke="#e3ad3a" stroke-width="4"/>
 <g transform="translate(160 22)"><path d="M-17 18 V-4 A8.5 8.5 0 0 1 0 -4 V18Z M0 18 V-4 A8.5 8.5 0 0 1 17 -4 V18Z" fill="url(#shGold)" stroke="#7d5310" stroke-width="1.5"/>
  <g stroke="#7d5310" stroke-width="1.2" stroke-linecap="round"><path d="M-13 1h9M-13 6h9M-13 11h9M4 1h9M4 6h9M4 11h9"/></g></g>
 <circle cx="160" cy="68" r="15" fill="url(#shWin)" stroke="#a87618" stroke-width="2"/>
 <path d="M160 57 L169.5 73.5 H150.5Z M160 79 L150.5 62.5 H169.5Z" fill="none" stroke="#1d3d8c" stroke-width="2" stroke-linejoin="round"/>
 <g fill="url(#shWin)" stroke="#a87618" stroke-width="1.6">
  <path d="M86 150 V112 A10 10 0 0 1 106 112 V150Z"/><path d="M214 150 V112 A10 10 0 0 1 234 112 V150Z"/>
  <path d="M116 150 V112 A10 10 0 0 1 136 112 V150Z" opacity=".95"/><path d="M184 150 V112 A10 10 0 0 1 204 112 V150Z" opacity=".95"/></g>
 <g stroke="#a87618" stroke-width="1.2"><path d="M96 104V150M86 128H106M226 104V150M214 128H234M126 104V150M116 128H136M194 104V150M184 128H204"/></g>
 <path d="M144 168 V122 A16 16 0 0 1 176 122 V168Z" fill="#7a4a22" stroke="#4a2a10" stroke-width="2"/>
 <path d="M160 108 V168" stroke="#4a2a10" stroke-width="1.6"/><circle cx="155" cy="142" r="1.8" fill="#e3ad3a"/><circle cx="165" cy="142" r="1.8" fill="#e3ad3a"/>
 <rect x="176" y="128" width="3" height="10" rx="1.2" fill="#e3ad3a" transform="rotate(-20 177 133)"/>
 <path d="M128 168 H192 L198 174 H122Z M118 174 H202 L206 179 H114Z" fill="#d8c39a" stroke="#b39a6c" stroke-width="1"/>
 <g font-family="Frank Ruhl Libre, Noto Serif Hebrew, serif" font-weight="700" font-size="11" fill="#1d3d8c" text-anchor="middle"><text x="160" y="96" direction="rtl">בֵּית כְּנֶסֶת</text></g>
</svg>`;
const CHABAD="https://www.chabad.org/centers/default_cdo/jewish/Centers.htm";
const iOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
const MAPS=iOS?"https://maps.apple.com/?q=synagogue":"https://www.google.com/maps/search/synagogue+near+me";
const TIPS=[
 ["🧢","Boys and men wear a <b>kippah</b>. Most shuls have extras by the door."],
 ["📖","Grab a <b>siddur</b> so you can daven along. Ask someone what page they're on. People love to help!"],
 ["🤫","Stay quiet during davening, especially during the <b>Shema</b> and the Amidah, when everyone stands silently."],
 ["👂","When someone finishes a <b>bracha</b>, answer <b>Amen</b>!"],
 ["📜","On Shabbos, Monday and Thursday the <b>Torah</b> is taken out and read. Some people walk up to kiss it as it passes."],
 ["🍪","Many shuls have a <b>Kiddush</b> after davening on Shabbos, with treats. Say “Good Shabbos” to everyone!"]
];
const isKid=()=>!sessionStorage.getItem("shulOk");
let Q=null;
const newQ=()=>{ const a=6+Math.floor(Math.random()*4), b=6+Math.floor(Math.random()*4), r=a*b, w=new Set([r]); while(w.size<3) w.add(r+(Math.floor(Math.random()*9)-4||5));
  return {a,b,r,opts:shuffle([...w])} };

VIEWS.push("shul");
$("party").insertAdjacentHTML("beforebegin",`<div class="wrap" id="shul" hidden>
  <div class="toprow"><button class="back" id="shBack" type="button">← Home</button></div>
  <div class="phead"><div class="he" lang="he">בֵּית כְּנֶסֶת</div><h2>Find a Shul</h2><p class="when">A shul is a Jewish house of prayer. Find one near you!</p></div>
  <div class="shulpic">${SHUL_SVG}</div>
  <div id="shMain" style="display:flex;flex-direction:column;gap:12px"></div>
  <h3 class="fg-h">Your first visit to shul</h3>
  <div class="shtips">${TIPS.map(([e,t])=>`<div><span class="e">${e}</span><p>${t}</p></div>`).join("")}</div>
</div>`);
function renderShul(){
  // The same content shows in the pop-up sheet (from the home picture) or the full screen
  const box=inSheet?$("shShMain"):$("shMain"), other=inSheet?$("shMain"):$("shShMain"); if(other) other.innerHTML="";
  if(isKid()){ Q=Q||newQ();
    box.innerHTML=`<div class="buddy compact"><span class="ywrap">${yossi()}</span><div class="bubble"><span class="name">Shlomo</span>Finding a shul uses a map, so <b>ask a grown-up</b> to help you with this part!</div></div>
      <div class="shgate"><b>Grown-ups: what is ${Q.a} × ${Q.b}?</b><div class="row" style="justify-content:center">${Q.opts.map(o=>`<button class="btn ghost" type="button" data-shq="${o}">${o}</button>`).join("")}</div><small id="shErr" hidden>Not quite. Ask a grown-up to help! 🙂</small></div>`;
    box.querySelectorAll("[data-shq]").forEach(b=>b.onclick=()=>{ if(+b.dataset.shq===Q.r){ try{ sessionStorage.setItem("shulOk","1") }catch(e){} sfx.pop(); renderShul() } else { sfx.wrong(); Q=newQ(); renderShul(); $("shErr").hidden=false } });
    return }
  box.innerHTML=`<a class="shlink" href="${CHABAD}" target="_blank" rel="noopener noreferrer"><span class="e">🕍</span><span><b>Find a Chabad House near me</b><small>Chabad.org's directory of shuls and centers worldwide, with addresses, phone numbers and davening times</small></span><span class="ar">↗</span></a>
    <a class="shlink" href="${MAPS}" target="_blank" rel="noopener noreferrer"><span class="e">🗺️</span><span><b>Shuls near me on the map</b><small>Opens ${iOS?"Apple":"Google"} Maps and searches for synagogues around you</small></span><span class="ar">↗</span></a>
    <p class="note">💡 Davening times can change, especially on Shabbos and Yom Tov. It's a good idea to call ahead, and the rabbi will be happy to welcome you!</p>`;
}
function openShul(){ stopPlay(); window._fromBM=false; showOnly("shul"); renderShul(); document.querySelectorAll("[data-nav]").forEach(b=>b.removeAttribute("aria-current")) }
$("shBack").onclick=()=>{ sfx.tick(); $("shul").hidden=true; goHome() };
document.addEventListener("click",e=>{ if(e.target.closest("[data-nav],#openAbc,#openWords,#openBlitz,#openBM,#openPa,#openHol,#openSages,#openFacts,#openChal,#openMitz,.pitem")&&!e.target.closest("#shul")) $("shul").hidden=true },true);

/* A little synagogue button in the top-left corner of the bar, next to the ב״ה */
const SHUL_ICON=`<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 6 L35 16 H5Z" fill="#2b53b4" stroke="#f4c95f" stroke-width="1.6" stroke-linejoin="round"/>
 <rect x="8" y="16" width="24" height="17" fill="#f7ead0" stroke="#f4c95f" stroke-width="1.4"/><path d="M16.5 33 V26 A3.5 3.5 0 0 1 23.5 26 V33Z" fill="#7a4a22"/>
 <path d="M10.5 26 V22 A1.8 1.8 0 0 1 14.1 22 V26Z M25.9 26 V22 A1.8 1.8 0 0 1 29.5 22 V26Z" fill="#f5cf6b"/>
 <path d="M20 9.6 L22.6 14.1 H17.4Z M20 15.6 L17.4 11.1 H22.6Z" fill="none" stroke="#f4c95f" stroke-width="1"/><rect x="5" y="33" width="30" height="2.5" rx="1" fill="#f4c95f"/></svg>`;
const bar=document.querySelector(".appbar-in"), bh=bar&&bar.querySelector(".bh");
const btnHTML=`<button class="abtn shtop" id="openShul" type="button" aria-haspopup="dialog" aria-label="Find a shul near you" title="Find a shul near you">${SHUL_ICON}</button>`;
/* Symmetrical top line: [shul] ... [Ashkenazi | Sephardi] ... [sound][settings] */
if(bar){ if(bh) bh.remove();
  bar.insertAdjacentHTML("afterbegin",`<div class="abside abl">${btnHTML}</div>`);
  const r=document.createElement("div"); r.className="abside abr"; const g=$("aGear"); if(g) r.appendChild(g); bar.appendChild(r);
  /* Sound on/off already lives in the ⚙️ menu, so the top line keeps just one button per side */
  const sn=$("aSnd"); if(sn){ sn.hidden=true; r.appendChild(sn) }
  bar.classList.add("absym") }
document.body.insertAdjacentHTML("beforeend",`<div class="shsheet" id="shSheet" hidden><div class="shsh-in" role="dialog" aria-label="Find a shul near you">
  <button class="glx" id="shShX" type="button" aria-label="Close">✕</button><h3 class="fg-h" style="margin:0 0 4px">Find a shul near you</h3><div id="shShMain" style="display:flex;flex-direction:column;gap:10px"></div>
  <button class="fg-go" id="shTips" type="button">First time at shul? See what to expect →</button></div></div>`);
let inSheet=false;
const closeSheet=()=>{ $("shSheet").hidden=true; inSheet=false };
$("openShul").onclick=()=>{ sfx.pop(); inSheet=true; $("shSheet").hidden=false; renderShul() };
$("shShX").onclick=closeSheet;
$("shSheet").onclick=e=>{ if(e.target.id==="shSheet") closeSheet() };
$("shTips").onclick=()=>{ closeSheet(); openShul(); setTimeout(()=>{ const t=document.querySelector("#shul .shtips"); if(t) t.scrollIntoView({behavior:"smooth",block:"start"}) },150) };

document.head.insertAdjacentHTML("beforeend",`<style>
.appbar .shtop{padding:3px;background:rgba(255,255,255,.14)}.appbar .shtop svg{width:100%;height:100%;display:block}
.appbar .shtop:active{transform:scale(.92)}
.appbar-in.absym{--abw:40px;display:grid!important;grid-template-columns:var(--abw) minmax(0,1fr) var(--abw);gap:8px!important;align-items:center}
.absym .abside{display:flex;gap:6px;align-items:center}.absym .abl{justify-content:flex-start}.absym .abr{justify-content:flex-end}
.absym .abtn[hidden]{display:none!important}
.absym .abtn{width:var(--abw)!important;height:var(--abw)!important;margin:0!important}
.absym .accseg{margin-inline:auto;width:100%;max-width:330px;min-width:0}
@media (max-width:440px){.appbar-in.absym{--abw:36px;gap:6px!important}}
@media (max-width:380px){.appbar-in.absym{--abw:32px;gap:5px!important;padding-inline:6px!important}}
.shmini{align-self:center;width:min(220px,62vw);display:flex;flex-direction:column;align-items:stretch;gap:0;padding:0;border:3px solid var(--gold-hi);border-radius:18px;overflow:hidden;background:var(--klaf);box-shadow:0 4px 0 color-mix(in srgb,var(--gold-hi) 55%,#5a3b05);transition:transform .12s,box-shadow .12s}
.shmini:hover{transform:translateY(-2px)}.shmini:active{transform:translateY(3px);box-shadow:0 1px 0 color-mix(in srgb,var(--gold-hi) 55%,#5a3b05)}
.shmini span{display:block;padding:7px 8px 8px;font-family:var(--display);font-size:1.05rem;color:var(--tech);text-align:center}
.shsheet{position:fixed;inset:0;z-index:44;background:rgba(10,20,50,.45);display:flex;align-items:flex-end;justify-content:center;padding:12px;padding-bottom:max(12px,env(safe-area-inset-bottom,0px));animation:celein .2s ease-out}
.shsheet[hidden]{display:none!important}
.shsh-in{position:relative;width:100%;max-width:520px;max-height:85dvh;overflow:auto;box-sizing:border-box;background:var(--bg);border:2px solid var(--gold-hi);border-radius:22px;padding:16px 14px 14px;display:flex;flex-direction:column;gap:10px;animation:popin .3s ease-out}
.shulpic{border:3px solid var(--gold-hi);border-radius:22px;overflow:hidden;box-shadow:0 4px 0 color-mix(in srgb,var(--gold-hi) 55%,#5a3b05)}
.shulart{display:block;width:100%;height:auto}
.shgate{background:var(--klaf);border:2px dashed var(--gold-hi);border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:10px;text-align:center}
.shgate b{font-family:var(--display);font-weight:400;font-size:1.25rem;color:var(--tech)}
.shgate .btn{min-width:72px;font-size:1.1rem}
.shgate small{color:var(--bad);font-weight:700}
.shlink{display:grid;grid-template-columns:44px 1fr auto;gap:12px;align-items:center;text-decoration:none;color:var(--ink);background:var(--klaf);border:2px solid var(--gold-hi);border-radius:16px;padding:14px;box-shadow:0 3px 0 color-mix(in srgb,var(--gold-hi) 55%,transparent)}
.shlink:active{transform:translateY(2px)}
.shlink .e{font-size:2rem;text-align:center}
.shlink b{display:block;font-family:var(--display);font-weight:400;font-size:1.2rem;color:var(--tech)}
.shlink small{display:block;color:var(--muted);font-size:.86rem;line-height:1.35}
.shlink .ar{font-size:1.4rem;color:var(--gold);font-weight:700}
.shtips{display:flex;flex-direction:column;gap:8px}
.shtips div{display:grid;grid-template-columns:40px 1fr;gap:10px;align-items:center;background:var(--klaf);border:1.5px solid var(--rule);border-radius:14px;padding:10px 12px}
.shtips .e{font-size:1.6rem;text-align:center}
.shtips p{margin:0;font-family:var(--text);font-size:1.03rem;line-height:1.4}
</style>`);
window.openShul=openShul; if(location.hash==="#shul") openShul();
})();
