/* ================= PROGRESS REPORT for a teacher or parent ================= */
(function(){
let DL=null; try{ if(window.claude&&window.claude.use) window.claude.use("downloads").then(d=>{ DL=d; if(!$("rpt").hidden) renderRpt() }).catch(()=>{}) }catch(e){}
VIEWS.push("rpt");
const foot=document.querySelector("#home footer");
foot.insertAdjacentHTML("beforebegin",`<button class="btn ghost big" id="openRpt" type="button" style="align-self:center">📋 Send my progress to a teacher or parent</button>`);
$("party").insertAdjacentHTML("beforebegin",`<div class="wrap" id="rpt" hidden>
  <div class="toprow"><button class="back" id="rpBack" type="button">← Home</button></div>
  <div class="phead"><div class="he" lang="he">דּוּ״חַ</div><h2>My Progress Report</h2><p class="when">Show your teacher or parent everything you've learned!</p></div>
  <label class="rplab">My name <input id="rpName" type="text" autocomplete="off" placeholder="Type your name"></label>
  <pre class="rptext" id="rpText"></pre>
  <div class="row" style="justify-content:center;flex-wrap:wrap"><button class="btn gold big" id="rpCopy" type="button">📋 Copy report</button><button class="btn" id="rpSave" type="button" hidden>⬇ Save as a file</button></div>
  <p class="when" style="text-align:center">Copy it, then paste it into a text or email to your teacher.</p>
</div>`);
$("openRpt").onclick=()=>{ sfx.pop(); stopPlay(); showOnly("rpt"); renderRpt() };
$("rpBack").onclick=()=>{ sfx.tick(); $("rpt").hidden=true; goHome() };
document.addEventListener("click",e=>{ if(e.target.closest("[data-nav]")) $("rpt").hidden=true },true);
$("rpName").oninput=e=>{ S.rpName=e.target.value.slice(0,40); save(); renderRpt() };

function report(){
  const lit=ALL.filter(p=>S.lit[p.id]), stars=p=>{ try{ return bestStars(p.id) }catch(e){ return 0 } };
  const list=arr=>arr.length?arr.map(x=>"  ✓ "+x).join("\n"):"  (none yet)";
  const prayers=ALL.filter(p=>!p.food&&!p.bm), food=ALL.filter(p=>p.food);
  const letters=ALEF.filter(L=>(S.abc||{})[L[0]]).length;
  const belts=["White","Yellow","Orange","Green","Blue","Purple","Brown","Black"].filter(b=>(S.belts||{})[b.toLowerCase()]);
  const d=new Date().toLocaleDateString(undefined,{year:"numeric",month:"long",day:"numeric"});
  return [
   `SIDDUR STEPS · PROGRESS REPORT`,
   `${S.rpName?S.rpName+" · ":""}${d}`,
   ``,
   `PRAYERS LEARNED: ${prayers.filter(p=>S.lit[p.id]).length} of ${prayers.length}`,
   list(prayers.filter(p=>S.lit[p.id]).map(p=>p.title+(stars(p)?` (${"★".repeat(stars(p))})`:""))),
   ``,
   `FOOD BRACHOS: ${food.filter(p=>S.lit[p.id]).length} of ${food.length}`,
   list(food.filter(p=>S.lit[p.id]).map(p=>p.title)),
   ``,
   `HEBREW READING`,
   `  Letters known: ${letters} of ${ALEF.length}`,
   `  Reading belts: ${belts.length?belts.join(", "):"none yet"}`,
   S.wpm?`  Best reading speed: ${S.wpm} words a minute`:null,
   ``,
   `MORE`,
   `  Bracha Blitz stars: before ${"★".repeat((S.blitz||{}).before||0)||"-"} · after ${"★".repeat((S.blitz||{}).after||0)||"-"}`,
   `  Sages learned: ${Object.keys(S.sages||{}).length}`,
   `  Holidays learned: ${Object.keys((S.hol||{}).read||{}).length}`,
   `  Gelt earned: ${S.gelt}`,
   ``,
   `Pronunciation: ${S.accent==="sef"?"Sephardi":"Ashkenazi"} · Nusach Chabad`
  ].filter(x=>x!==null).join("\n");
}
function renderRpt(){ $("rpName").value=S.rpName||""; $("rpText").textContent=report(); $("rpSave").hidden=!DL }
$("rpCopy").onclick=async()=>{ try{ await navigator.clipboard.writeText(report()); toast("Copied! Now paste it to your teacher."); sfx.coin() }
  catch(e){ const r=document.createRange(); r.selectNodeContents($("rpText")); const s=getSelection(); s.removeAllRanges(); s.addRange(r); toast("Selected. Tap Copy in the menu.") } };
$("rpSave").onclick=async()=>{ if(!DL) return; try{ await DL.save({filename:`siddur-steps-progress${S.rpName?"-"+S.rpName.replace(/[^\w-]+/g,"-"):""}.txt`,data:report()}); toast("Saved!") }catch(e){} };
document.head.insertAdjacentHTML("beforeend",`<style>
.rptext{white-space:pre-wrap;background:var(--klaf);border:2px solid var(--rule);border-radius:16px;padding:14px;font-family:var(--say);font-size:.95rem;line-height:1.5;color:var(--ink);margin:0}
.rplab{display:flex;flex-direction:column;gap:6px;font-weight:700;color:var(--tech)}
.rplab input{font:inherit;font-weight:400;padding:10px 12px;border:2px solid var(--rule);border-radius:12px;background:var(--klaf);color:var(--ink)}
</style>`);
})();
