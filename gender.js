
/* ================= BOY / GIRL ================= */
// Rahav, the girl guide: long hair, a headband with a bow, a skirt instead of tzitzis
const RAHAV_HAIR=`<path d="M19.5 46 C15.5 68 17.5 90 27.5 100 C33 95 31 76 32 62 L68 62 C69 76 67 95 72.5 100 C82.5 90 84.5 68 80.5 46 C78.5 24 65 14 50 14 C35 14 21.5 24 19.5 46Z" fill="#6a5543"/>`;
const RAHAV_BAND=`<path d="M25.5 33 C31 17 69 17 74.5 33" stroke="#1d3d8c" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  <path d="M66 21 l9 -7 l2.5 10.5Z M66 21 l-1 -11 l-8.5 6Z" fill="#e3ad3a" stroke="#a87618" stroke-width=".8" stroke-linejoin="round"/><circle cx="66" cy="20" r="2.8" fill="#f4c95f"/>`;
const RAHAV_SKIRT=`<path d="M29.5 103 L70.5 103 L77 119.5 C60 123 40 123 23 119.5Z" fill="#1d3d8c" stroke="#e3ad3a" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M27 116 C42 119 58 119 73 116" stroke="#f4c95f" stroke-width="1.2" fill="none"/>`;
const RAHAV_LASH=`<path d="M33.6 43.6 l-2.2 -1.6 M66.4 43.6 l2.2 -1.6" stroke="#3a2a1e" stroke-width="1.3" stroke-linecap="round"/>`;
function rahavKid(mood){ let s=shlomoKid(mood);
  s=s.replace(KIPPAH,RAHAV_BAND)
     .replace(/<g fill="none" stroke-linecap="round">[\s\S]*?<\/g>/,RAHAV_SKIRT)
     .replace('<circle cx="50" cy="48" r="28"',RAHAV_HAIR+'<circle cx="50" cy="48" r="28"')
     .replace('<g class="eyes">',RAHAV_LASH+'<g class="eyes">');
  return s }
const isGirl=()=>S.gender==="girl";

// Prayer lines that girls say differently (Chabad siddur)
const GENDER_LINES=[
 ["מוֹדֶה אֲנִי לְפָנֶיךָ",{he:"מוֹדָה אֲנִי לְפָנֶיךָ",say:"Mo-doh a-ni l'fo-ne-cho"}],
 ["מוֹדֶה אֲנִי לְפָנֶיךָ, יְיָ אֱלֹהַי וֵאלֹהֵי אֲבוֹתַי",{he:"מוֹדָה אֲנִי לְפָנֶיךָ, יְיָ אֱלֹהַי וֵאלֹהֵי אֲבוֹתַי",say:"mo-doh a-ni l'fo-ne-cho, A-do-noi E-lo-hai vei-lo-hei a-vo-sai"}],
 ["שֶׁלֹּא עָשַׂנִי אִשָּׁה",{he:"שֶׁעָשַׂנִי כִּרְצוֹנוֹ",say:"she-o-sa-ni kir-tzo-no",en:"who made me as He wished.",gl:["who made me","as He wished"],note:""}],
 ["הֲרֵינִי מְקַבֵּל עָלַי",{he:"הֲרֵינִי מְקַבֶּלֶת עָלַי",say:"Ha-rei-ni m'ka-be-les o-lai"}]];
const GEN_SET=[];
function genderPrep(){ if(GEN_SET.length) return; const seen=new Set();
  [B,...SIDDUR.flatMap(g=>g.prayers.flatMap(p=>p.lines.filter(l=>!l.head)))].forEach(l=>{ if(seen.has(l)) return; seen.add(l);
    const m=GENDER_LINES.find(x=>x[0]===l.he); if(!m) return; const g=m[1];
    const boy={he:l.he,en:l.en,gl:l.gl}, gs=Object.assign({},boy,g);
    gs.sef=toSef(gs.he,gs.say)||swapT(gs.say); GEN_SET.push({l,boy,girl:gs}) }) }
function applyGender(){ genderPrep(); const gi=isGirl(), sef=S.accent==="sef";
  GEN_SET.forEach(({l,boy,girl:g})=>{ const v=gi?g:boy; l.he=v.he; l.en=v.en; l.gl=v.gl; if(gi){ l.say=sef?g.sef:g.say; if(g.note!==undefined) l.note=g.note } });
  const hr=BYID.hareini; if(hr){ hr.title=gi?"Hareini Mekabeles":"Hareini Mekabel"; hr.he=gi?"הֲרֵינִי מְקַבֶּלֶת":"הֲרֵינִי מְקַבֵּל" }
  const md=BYID.modeh; if(md){ md.title=gi?"Modah Ani":"Modeh Ani"; md.he=gi?"מוֹדָה אֲנִי":"מוֹדֶה אֲנִי" }
  document.documentElement.dataset.gen=gi?"girl":"boy" }

/* ----- Bat Mitzvah: Shabbos candles ----- */
SIDDUR.find(g=>g.bm).prayers.push({id:"candles",bm:true,title:"Shabbos Candles",he:"נֵר שֶׁל שַׁבָּת",
  when:"Friday afternoon, 18 minutes before sunset. Light the candle first, then cover your eyes and say the bracha.",
  note:"In Chabad, girls light their own Shabbos candle starting from age 3. After the bracha, it's a special time to pray for anything you want.",
  lines:[B,
   L("אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו","a-sher ki-d'sho-nu b'mitz-vo-sov","who made us holy with His commandments",{gl:["who","made us holy","with His mitzvos"]}),
   L("וְצִוָּנוּ לְהַדְלִיק נֵר שֶׁל שַׁבָּת קֹדֶשׁ","v'tzi-vo-nu l'had-lik neir shel Sha-bos ko-desh","and commanded us to light the candle of the holy Shabbos.",{gl:["and commanded us","to light","the candle","of","Shabbos","holy"]})]});
ALL.push(BYID.candles=SIDDUR.find(g=>g.bm).prayers.find(p=>p.id==="candles"));
LESSONS.candles={big:"Bring the light of Shabbos",steps:[
  "Every Friday, right before Shabbos starts, Jewish women and girls light <b>Shabbos candles</b>. 🕯️",
  "The candles fill the home with light and peace. When you light yours, you add light to the whole world!",
  "First light the candle. Then wave your hands around it three times, cover your eyes, and say the bracha.",
  "Then, with your eyes still covered, you can ask Hashem for anything. It's a very special moment. Let's learn the bracha!"]};
const candleIdx=()=>ALL.findIndex(p=>p.id==="candles");
const BAT_ITEMS=[
  {k:"can",ic:"🕯️",t:"Light Shabbos Candles",d:"The bracha a Jewish girl says every Friday before sunset.",go:()=>openPrayerBM(candleIdx())},
  {k:"par",ic:"📖",t:"My Bat Mitzvah Parsha",d:"See which Torah portion is read on your big day.",go:()=>{ S.bm.par=true; save(); if(window.openParsha) window.openParsha() }},
  {k:"chl",ic:"🔒",t:"Separating Challah",d:"Coming soon",lock:true},
  {k:"spk",ic:"🔒",t:"My Speech",d:"Coming soon: a d'var Torah of your own",lock:true}];
function bmItemsNow(){ return isGirl()?BAT_ITEMS:BM_ITEMS }

/* ----- Swap names in any text on screen: Shlomo ↔ Rahav, Bar ↔ Bat Mitzvah ----- */
function genSwap(t){ return isGirl()
  ? t.replace(/Shlomo/g,"Rahav").replace(/Bar Mitzvah boy/g,"Bat Mitzvah girl").replace(/Bar Mitzvah bochur/g,"Bat Mitzvah girl").replace(/Bar Mitzvah/g,"Bat Mitzvah").replace(/בַּר מִצְוָה/g,"בַּת מִצְוָה")
  : t.replace(/Rahav/g,"Shlomo").replace(/Bat Mitzvah girl/g,"Bar Mitzvah boy").replace(/Bat Mitzvah/g,"Bar Mitzvah").replace(/בַּת מִצְוָה/g,"בַּר מִצְוָה") }
function genWalk(root){ if(!root) return; if(root.nodeType===3){ const p=root.parentNode; if(p&&p.closest&&p.closest("[data-keep]")) return; const v=genSwap(root.nodeValue); if(v!==root.nodeValue) root.nodeValue=v; return }
  if(root.nodeType!==1||root.closest("[data-keep]")) return; const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT); let n; const todo=[];
  while((n=w.nextNode())) todo.push(n); todo.forEach(genWalk);
  root.querySelectorAll&&root.querySelectorAll("[aria-label]").forEach(e=>{ const v=genSwap(e.getAttribute("aria-label")); if(v!==e.getAttribute("aria-label")) e.setAttribute("aria-label",v) }) }
try{ new MutationObserver(ms=>ms.forEach(m=>{ if(m.type==="characterData") genWalk(m.target); else m.addedNodes.forEach(genWalk) }))
  .observe(document.body,{childList:true,subtree:true,characterData:true}) }catch(e){}

/* ----- Picking boy or girl ----- */
$("apanel").querySelector('[data-setpace]').closest(".arow").insertAdjacentHTML("beforebegin",`<div class="arow col" data-keep><b>Who's learning?</b><small>Changes the guide, a few prayer words, and Bar or Bat Mitzvah</small><div class="aseg3" style="grid-template-columns:1fr 1fr" role="group" aria-label="Boy or girl"><button type="button" data-setgen="boy"><span class="acchd" data-gh="boy" aria-hidden="true"></span>Boy · Shlomo</button><button type="button" data-setgen="girl"><span class="acchd" data-gh="girl" aria-hidden="true"></span>Girl · Rahav</button></div></div>`);
document.querySelector("#home .hero").insertAdjacentHTML("afterend",`<section class="accbox" id="genBox" data-keep hidden><b>Who's learning today?</b>
  <div class="seg"><button type="button" data-setgen="boy"><span class="acchd big" data-gh="boy" aria-hidden="true"></span>A boy<small>Learn with Shlomo</small></button><button type="button" data-setgen="girl"><span class="acchd big" data-gh="girl" aria-hidden="true"></span>A girl<small>Learn with Rahav</small></button></div>
  <small style="color:var(--muted)">Boys and girls say a few words differently. You can change this anytime in ⚙️.</small></section>`);
document.head.insertAdjacentHTML("beforeend",`<style>.appbar-in{gap:6px}#aGen{font-size:1.25rem}@media (max-width:400px){.appbar .bh{display:none}.accseg button{font-size:.8rem}}</style>`);
// Boy and girl side by side in the top bar, drawn as the app's own Shlomo and Rahav faces
$("aGear").insertAdjacentHTML("beforebegin",`<div class="genseg" id="aGen" data-keep role="group" aria-label="Boy or girl"><button type="button" data-setgen="boy" aria-label="Boy, learning with Shlomo"><span class="acchd" data-gh="boy" aria-hidden="true"></span></button><button type="button" data-setgen="girl" aria-label="Girl, learning with Rahav"><span class="acchd" data-gh="girl" aria-hidden="true"></span></button></div>`);
/* Top bar: each accent button holds its own girl (left) and boy (right) face */
{const ag=$("aGen"); if(ag) ag.remove();
 document.querySelectorAll(".appbar .accseg [data-setacc]").forEach(b=>{ const a=b.dataset.setacc, lbl=a==="sef"?"Sephardi":"Ashkenazi";
   b.innerHTML=`<span class="gpick" data-gpick="girl" data-pa="${a}" role="img" aria-label="${lbl} girl"></span><span class="glbl">${lbl}</span><span class="gpick" data-gpick="boy" data-pa="${a}" role="img" aria-label="${lbl} boy"></span>` }) }
document.addEventListener("click",e=>{ const f=e.target.closest(".accseg [data-gpick]"); if(f&&f.dataset.gpick!==S.gender) setGender(f.dataset.gpick) },true);
if(typeof paintHeads==="function"){ const _ph=paintHeads; paintHeads=function(){ _ph(); const ka=S.accent,kg=S.gender;
  document.querySelectorAll(".accseg [data-gpick]").forEach(el=>{ S.accent=el.dataset.pa; S.gender=el.dataset.gpick; el.innerHTML=yossi().replace('viewBox="0 0 100 130"','viewBox="16 1 68 68"');
    el.classList.toggle("on",el.dataset.pa===(ka==="sef"?"sef":"ash")&&el.dataset.gpick===(kg||"boy")) }); S.accent=ka; S.gender=kg } }
document.head.insertAdjacentHTML("beforeend",`<style>.appbar .accseg{max-width:330px}.appbar .accseg button{display:flex;align-items:center;justify-content:space-between;gap:4px!important;padding:3px!important}
.glbl{flex:1;text-align:center}.gpick{flex:none;width:28px;height:28px;border-radius:50%;overflow:hidden;background:#fff6e0;opacity:.5;transition:opacity .2s,transform .2s,box-shadow .2s;cursor:pointer}
.gpick svg{width:100%;height:100%;display:block}.gpick .bob,.gpick .eyes{animation:none!important}
.gpick.on{opacity:1;transform:scale(1.1);box-shadow:0 0 0 2px #fff,0 0 0 4px rgba(0,0,0,.25)}.accseg button[aria-pressed="true"] .gpick{opacity:.75}.accseg button[aria-pressed="true"] .gpick.on{opacity:1}
@media (max-width:440px){.gpick{width:24px;height:24px}.appbar .accseg button{font-size:.72rem!important}}@media (max-width:360px){.gpick{width:20px;height:20px}.appbar .accseg button{font-size:.64rem!important}}</style>`);
document.head.insertAdjacentHTML("beforeend",`<style>.genseg{display:flex;gap:3px;background:rgba(0,0,0,.22);border-radius:999px;padding:3px;flex:none}.genseg button{border:0;background:none;border-radius:50%;padding:2px;display:grid;place-items:center;opacity:.6;transition:opacity .2s,transform .2s}.genseg button[aria-pressed="true"]{opacity:1;background:var(--gold-hi);transform:scale(1.06)}.genseg .acchd{width:30px;height:30px}.acchd.big{width:42px;height:42px;margin:0 auto 4px}[data-setgen] .acchd{display:block}.aseg3 [data-setgen]{display:flex;align-items:center;justify-content:center;gap:6px}.aseg3 [data-setgen] .acchd{width:26px;height:26px}@media (max-width:440px){.appbar-in{gap:5px!important}.appbar .abtn{width:34px;height:34px;font-size:.95rem}.accseg button{font-size:.74rem!important;gap:4px;padding:3px 7px 3px 3px}.accseg .acchd{width:24px;height:24px}.genseg .acchd{width:24px;height:24px}}@media (max-width:360px){.accseg .acchd,.genseg .acchd{width:20px;height:20px}.accseg button{font-size:.68rem!important}}</style>`);
document.addEventListener("click",e=>{ const b=e.target.closest("[data-setgen]"); if(b) setGender(b.dataset.setgen) });
function paintGender(){ const keepG=S.gender; document.querySelectorAll("[data-gh]").forEach(el=>{ S.gender=el.dataset.gh; el.innerHTML=yossi().replace('viewBox="0 0 100 130"','viewBox="16 1 68 68"') }); S.gender=keepG; if(typeof paintHeads==="function") paintHeads(); document.querySelectorAll("[data-setgen]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.setgen===(S.gender||"")))); const gb=$("genBox"); if(gb) gb.hidden=!!S.gender;
  const d=$("bmDesc"); if(d) d.textContent=isGirl()?"Shabbos candles, your parsha and more. Get ready for the big day!":"Tefillin, your first aliyah and more. Get ready for the big day!";
  genWalk(document.body) }
function setGender(g){ const was=S.gender; S.gender=g; save(); stopPlay(); applyAccent(); paintGender();
  if(!$("view").hidden) renderPrayer(); if(!$("home").hidden) renderHome(); if(!$("bmv").hidden) renderBM(); if($("parsha")&&!$("parsha").hidden&&window.openParsha) window.openParsha();
  if(!$("bmw").hidden&&g==="girl") openBM();
  document.querySelectorAll("[data-yossi]").forEach(el=>el.innerHTML=yossi());
  if(was!==g){ sfx.pop(); const gt=g==="girl"?"I'm Rahav!":"I'm Shlomo!"; if(document.querySelector(".appbar .glbl")) barFlash(S.accent==="sef"?"sef":"ash",gt,true); else toast("Hi! "+gt+" 👋") } }
/* A tiny celebration right inside the accent button instead of a pop-up that covers the screen */
let barFlashT=null;
function barFlash(acc,text,face){ document.querySelectorAll(".appbar .glbl").forEach(l=>{ if(l.dataset.orig){ l.textContent=l.dataset.orig; l.classList.remove("flip") } });
  const b=document.querySelector(`.appbar [data-setacc="${acc}"]`), l=b&&b.querySelector(".glbl"); if(!l) return;
  l.dataset.orig=l.dataset.orig||l.textContent; l.textContent=text; l.classList.remove("flip"); void l.offsetWidth; l.classList.add("flip");
  b.classList.remove("shine"); void b.offsetWidth; b.classList.add("shine");
  if(face){ const f=b.querySelector(".gpick.on"); if(f){ f.classList.remove("hop"); void f.offsetWidth; f.classList.add("hop") } }
  clearTimeout(barFlashT); barFlashT=setTimeout(()=>{ l.classList.remove("flip"); l.classList.add("flipback"); setTimeout(()=>{ l.textContent=l.dataset.orig; l.classList.remove("flipback") },160) },1700) }
document.head.insertAdjacentHTML("beforeend",`<style>.glbl{display:inline-block;white-space:nowrap}
.glbl.flip{animation:glflip .38s cubic-bezier(.3,1.6,.5,1)}.glbl.flipback{animation:glout .16s ease-in forwards}
@keyframes glflip{0%{transform:rotateX(90deg);opacity:0}100%{transform:none;opacity:1}}@keyframes glout{to{transform:rotateX(90deg);opacity:0}}
.appbar .accseg button{position:relative;overflow:hidden}
.appbar .accseg button.shine::after{content:"";position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.75) 50%,transparent 65%);transform:translateX(-120%);animation:glshine .8s ease-out;pointer-events:none}
@keyframes glshine{to{transform:translateX(120%)}}
.gpick.hop{animation:gphop .55s cubic-bezier(.3,1.8,.5,1)}@keyframes gphop{0%{transform:none}40%{transform:translateY(-3px) scale(1.15) rotate(-10deg)}100%{transform:none}}</style><style>/* Phone top line: more breathing room */
.appbar-in{height:60px}
.gpick.on{transform:none;box-shadow:0 0 0 2px #fff}
.appbar .accseg{padding:4px;gap:4px}
.appbar .accseg button{padding:3px!important;gap:6px!important}
@media (max-width:440px){.appbar-in{gap:6px!important;padding-inline:8px!important}.appbar .accseg button{font-size:.76rem!important;letter-spacing:.01em}
 .gpick{width:26px;height:26px}.appbar .abtn{width:36px;height:36px;font-size:1rem}}
@media (max-width:380px){.gpick{width:23px;height:23px}.appbar .accseg button{font-size:.7rem!important;gap:4px!important}.appbar .abtn{width:33px;height:33px;font-size:.92rem}}
@media (max-width:340px){.gpick{width:20px;height:20px}.appbar .accseg button{font-size:.64rem!important}}</style>`);
/* ----- Start ----- */
BYID.candles.lines.filter(l=>!l.head&&l!==B).forEach(l=>ACC.push([l,"say",l.say,toSef(l.he,l.say)||l.say]));
["title","when","note"].forEach(k=>ACC.push([BYID.candles,k,BYID.candles[k],swapT(BYID.candles[k])]));
LESSONS.candles.steps.forEach((x,i)=>ACC.push([LESSONS.candles.steps,i,x,swapT(x)]));
applyAccent(); paintGender(); renderHome(); if(!$("view").hidden) renderPrayer(); if(!$("bmv").hidden) renderBM();
