/* ================= SHABBOS & YOM TOV: a warm "Good Shabbos" screen, and streaks that skip holy days ================= */
(function(){
/* --- Approximate sunset for this device's time zone (no location permission needed) --- */
function sunsetUTCmin(d,lat,lon){ // NOAA-style approximation, minutes after UTC midnight
  const rad=Math.PI/180, start=Date.UTC(d.getFullYear(),0,0), N=Math.floor((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())-start)/864e5);
  const g=2*Math.PI/365*(N-1), eq=229.18*(.000075+.001868*Math.cos(g)-.032077*Math.sin(g)-.014615*Math.cos(2*g)-.040849*Math.sin(2*g));
  const decl=.006918-.399912*Math.cos(g)+.070257*Math.sin(g)-.006758*Math.cos(2*g)+.000907*Math.sin(2*g)-.002697*Math.cos(3*g)+.00148*Math.sin(3*g);
  const ha=Math.acos(Math.cos(90.833*rad)/(Math.cos(lat*rad)*Math.cos(decl))-Math.tan(lat*rad)*Math.tan(decl))/rad;
  return 720-4*(lon-ha)-eq }
function guessPlace(){ const z=(()=>{ try{ return Intl.DateTimeFormat().resolvedOptions().timeZone||"" }catch(e){ return "" } })();
  const KNOWN={"America/New_York":[40.67,-73.94],"America/Chicago":[41.88,-87.63],"America/Denver":[39.74,-104.99],"America/Los_Angeles":[34.05,-118.24],"America/Toronto":[43.65,-79.38],"America/Montreal":[45.5,-73.57],
    "Asia/Jerusalem":[31.78,35.22],"Europe/London":[51.51,-.13],"Europe/Paris":[48.86,2.35],"Australia/Melbourne":[-37.81,144.96],"Australia/Sydney":[-33.87,151.21],"America/Sao_Paulo":[-23.55,-46.63],
    "Africa/Johannesburg":[-26.2,28.05],"America/Argentina/Buenos_Aires":[-34.6,-58.38],"Europe/Moscow":[55.76,37.62],"America/Mexico_City":[19.43,-99.13],"America/Phoenix":[33.45,-112.07]};
  if(KNOWN[z]) return KNOWN[z];
  const std=Math.max(new Date(2026,0,1).getTimezoneOffset(),new Date(2026,6,1).getTimezoneOffset()); return [35,-std/4] }
const PLACE=guessPlace();
function sunset(d){ const m=sunsetUTCmin(d,PLACE[0],PLACE[1]); const t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())+m*6e4); return isNaN(t)?new Date(d.getFullYear(),d.getMonth(),d.getDate(),18):t }
const CANDLE=18, NIGHT=50; // minutes before sunset / after sunset (kept generous, since times are approximate)

/* --- Which civil days are Shabbos or Yom Tov (outside Israel) --- */
const YT={Tishri:{1:"Rosh Hashanah",2:"Rosh Hashanah",10:"Yom Kippur",15:"Sukkos",16:"Sukkos",22:"Shemini Atzeres",23:"Simchas Torah"},Nisan:{15:"Pesach",16:"Pesach",21:"Pesach",22:"Pesach"},Sivan:{6:"Shavuos",7:"Shavuos"}};
const inIsrael=PLACE[0]===31.78;
if(inIsrael){ delete YT.Tishri[2]; YT.Tishri[22]="Shemini Atzeres & Simchas Torah"; delete YT.Tishri[23]; delete YT.Tishri[16]; delete YT.Nisan[16]; delete YT.Nisan[22]; delete YT.Sivan[7]; YT.Tishri[2]="Rosh Hashanah" }
const hf=(()=>{ try{ return new Intl.DateTimeFormat("en-u-ca-hebrew",{day:"numeric",month:"long"}) }catch(e){ return null } })();
function holyName(d){ const noon=new Date(d.getFullYear(),d.getMonth(),d.getDate(),12);
  let yt=null; if(hf){ try{ const p=hf.formatToParts(noon), day=+p.find(x=>x.type==="day").value, mon=p.find(x=>x.type==="month").value; yt=(YT[mon]||{})[day]||null }catch(e){} }
  if(yt) return yt; return noon.getDay()===6?"Shabbos":null }
window.isHolyDay=d=>!!holyName(d);
function holyNow(){ const now=new Date(), today=new Date(now.getFullYear(),now.getMonth(),now.getDate()), tom=new Date(today); tom.setDate(tom.getDate()+1);
  const t=holyName(today), n=holyName(tom), ss=sunset(today);
  if(t&&now<new Date(ss.getTime()+NIGHT*6e4)) return {name:t,ends:new Date(ss.getTime()+NIGHT*6e4)};
  if(n&&now>=new Date(ss.getTime()-CANDLE*6e4)) return {name:n,ends:null};
  return null }
window.holyNow=holyNow;

/* --- The screen --- */
const mode=()=>S.shabMode||"gentle"; // gentle | rest | off
const THOUGHTS=["Shabbos is a gift from Hashem's treasure house. Enjoy every minute!","On Shabbos we rest like Hashem rested after creating the world.","Shabbos is a taste of the World to Come.","Every Shabbos, a Jew gets an extra soul, a neshamah yeseirah!","Shabbos is the time for family, davening, singing and learning from a real sefer."];
document.body.insertAdjacentHTML("beforeend",`<div id="shabScr" hidden><div class="shbin" role="dialog" aria-labelledby="shbH" data-noglo>
  <div class="shbc">🕯️🕯️</div><h2 id="shbH">Good Shabbos!</h2><div class="shbhe" lang="he" id="shbHe">שַׁבָּת שָׁלוֹם</div>
  <p id="shbP"></p><p class="shbt" id="shbT"></p><p class="shbpa" id="shbPa"></p>
  <button class="btn ghost" id="shbGo" type="button">Continue to the app</button>
  <button class="fg-go" id="shbGrown" type="button" hidden>Grown-ups</button><div id="shbQ" class="shbq" hidden></div>
  <small class="shbn">Times are approximate for your area.</small></div></div>`);
function show(h){ const yt=h.name!=="Shabbos", sef=S.accent==="sef";
  $("shbH").textContent=yt?(sef?"Chag Sameach!":"Gut Yom Tov!"):(sef?"Shabbat Shalom!":"Good Shabbos!");
  $("shbHe").textContent=yt?"חַג שָׂמֵחַ":"שַׁבָּת שָׁלוֹם";
  $("shbP").innerHTML=`It's <b>${h.name}</b>, a holy day to rest, daven, eat with family and learn Torah from a real sefer. ${yt?"":"See you after <b>Havdalah</b>! 🕯️"}`;
  $("shbT").textContent="💭 "+THOUGHTS[new Date().getDate()%THOUGHTS.length];
  const pa=$("paHomeT"); $("shbPa").textContent=pa&&!yt?"📖 "+pa.textContent.replace(/^This week: /,"This week's parsha: "):"";
  $("shbGo").hidden=mode()==="rest"; $("shbGrown").hidden=mode()!=="rest";
  $("shabScr").hidden=false; document.body.classList.add("shbopen"); try{ stopPlay() }catch(e){} }
const key=h=>"shabOk:"+h.name+":"+new Date().toDateString();
function check(){ $("shbQ").hidden=true; $("shabScr").hidden=true; document.body.classList.remove("shbopen"); if(mode()==="off") return; const h=holyNow(); if(!h) return;
  try{ if(mode()==="gentle"&&sessionStorage.getItem(key(h))) return }catch(e){} show(h) }
$("shbGo").onclick=()=>{ const h=holyNow(); try{ if(h) sessionStorage.setItem(key(h),"1") }catch(e){} $("shabScr").hidden=true; document.body.classList.remove("shbopen") };
$("shbGrown").onclick=()=>{ const a=6+Math.floor(Math.random()*4), b=6+Math.floor(Math.random()*4), r=a*b, w=new Set([r]); while(w.size<3) w.add(r+(Math.floor(Math.random()*9)-4||5));
  $("shbQ").hidden=false; $("shbQ").innerHTML=`<b>Grown-ups: what is ${a} × ${b}?</b><div class="row" style="justify-content:center">${shuffle([...w]).map(o=>`<button class="btn ghost" type="button" data-sq="${o}">${o}</button>`).join("")}</div>`;
  $("shbQ").querySelectorAll("[data-sq]").forEach(x=>x.onclick=()=>{ if(+x.dataset.sq===r){ $("shbQ").hidden=true; $("shabScr").hidden=true; document.body.classList.remove("shbopen") } else $("shbGrown").click() }) };
document.addEventListener("visibilitychange",()=>{ if(!document.hidden) check() });
setInterval(check,5*60*1000);

/* --- Settings --- */
$("aDone").insertAdjacentHTML("beforebegin",`<div class="arow col" data-noglo><b>🕯️ Shabbos &amp; Yom Tov</b><small>What the app shows from candle-lighting until after Havdalah</small>
  <div class="aseg3" role="group" aria-label="Shabbos mode"><button type="button" data-shm="gentle">Gentle</button><button type="button" data-shm="rest">Full rest</button><button type="button" data-shm="off">Off</button></div>
  <small id="shmNote"></small></div>`);
const NOTES={gentle:"Shows a “Good Shabbos” screen with a button to continue.",rest:"Shows a “Good Shabbos” screen. Only a grown-up can open the app.",off:"The app works the same every day."};
function paintSet(){ document.querySelectorAll("[data-shm]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.shm===mode()))); $("shmNote").textContent=NOTES[mode()] }
document.querySelectorAll("[data-shm]").forEach(b=>b.onclick=()=>{ S.shabMode=b.dataset.shm; save(); paintSet(); sfx.tick() });
paintSet();

document.head.insertAdjacentHTML("beforeend",`<style>
#shabScr{position:fixed;inset:0;z-index:70;display:grid;place-items:center;padding:20px;background:radial-gradient(ellipse at 50% 30%,#2b4a9a,#0b1530 75%);color:#f4ead1}
#shabScr[hidden]{display:none!important}
body.shbopen{overflow:hidden}
.shbin{max-width:420px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center}
.shbc{font-size:3.4rem;filter:drop-shadow(0 0 18px rgba(255,200,90,.8));animation:shbflick 2.4s ease-in-out infinite}
@keyframes shbflick{50%{filter:drop-shadow(0 0 28px rgba(255,210,110,1))}}
.shbin h2{font-family:var(--display);font-weight:400;font-size:2.4rem;color:#ffd77a;margin:0}
.shbhe{font-family:var(--he);font-weight:700;font-size:1.8rem;color:#f4c95f}
.shbin p{margin:0;font-family:var(--text);font-size:1.15rem;line-height:1.5}
.shbin p b{color:#ffd77a}
.shbt{font-style:italic;color:#dbe4f7}
.shbpa{font-weight:700;color:#f4c95f;font-family:var(--say)!important;font-size:1rem!important}
#shbGo{margin-top:6px;background:rgba(255,255,255,.12);color:#f4ead1;border-color:rgba(255,255,255,.35)}
#shbGrown{color:#c7d3ef}
.shbn{color:#9fb0d6;font-size:.8rem}
.shbq{display:flex;flex-direction:column;gap:8px;align-items:center}.shbq b{color:#ffd77a}.shbq .btn{background:rgba(255,255,255,.12);color:#f4ead1;min-width:64px}
@media (prefers-reduced-motion:reduce){.shbc{animation:none}}
</style>`);
check();
})();
