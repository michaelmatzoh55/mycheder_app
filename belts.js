/* ================= READING BELTS ================= */
(function(){
// Each item: [hebrew, ashkenazi sound, sephardi sound]
const SYL=(list)=>list.map(x=>x.split("|"));
const BELTS=[
 {k:"white",name:"White Belt",color:"#f4f1e8",ink:"#1c2340",goal:"Know the first 11 letters by name",kind:"letter",
  items:"א ב ג ד ה ו ז ח ט י כ".split(" ")},
 {k:"yellow",name:"Yellow Belt",color:"#f2c200",ink:"#1c2340",goal:"Know the rest of the letters, and the end-of-word letters",kind:"letter",
  items:"ל מ נ ס ע פ צ ק ר ש ת ך ם ן ף ץ".split(" ")},
 {k:"orange",name:"Orange Belt",color:"#f08a24",ink:"#1c2340",goal:"Read sounds with Kometz and Pasach",kind:"syl",
  items:SYL(["בָּ|bo|ba","מַ|ma|ma","לָ|lo|la","שַׁ|sha|sha","דָּ|do|da","נַ|na|na","רָ|ro|ra","תַּ|ta|ta","גָּ|go|ga","הַ|ha|ha","כָּ|ko|ka","פַּ|pa|pa"])},
 {k:"green",name:"Green Belt",color:"#2c9a4b",ink:"#fff",goal:"Read sounds with Tzeirei, Segol and Sh'va",kind:"syl",
  items:SYL(["בֵּ|bei|be","מֶ|me|me","לְ|l'|l'","שֵׁ|shei|she","נֶ|ne|ne","דְּ|d'|d'","רֵ|rei|re","תֶּ|te|te","כְ|ch'|ch'","הֵ|hei|he","סֶ|se|se","יְ|y'|y'"])},
 {k:"blue",name:"Blue Belt",color:"#2f63c8",ink:"#fff",goal:"Read sounds with Cholam, Chirik, Kubutz and Shuruk",kind:"syl",
  items:SYL(["בּוֹ|bo|bo","מִ|mi|mi","לֻ|lu|lu","שׁוּ|shu|shu","נִי|ni|ni","דֹּ|do|do","רוּ|ru|ru","תִּ|ti|ti","גוֹ|go|go","הֻ|hu|hu","קִי|ki|ki","צוּ|tzu|tzu"])},
 {k:"purple",name:"Purple Belt",color:"#7b3fb0",ink:"#fff",goal:"Read real words from the siddur",kind:"syl",
  items:SYL(["בָּרוּךְ|bo-ruch|ba-ruch","אַתָּה|a-toh|a-tah","מֶלֶךְ|me-lech|me-lech","הָעוֹלָם|ho-o-lom|ha-o-lam","שְׁמַע|sh'ma|sh'ma","יִשְׂרָאֵל|Yis-ro-eil|Yis-ra-el","תּוֹרָה|To-roh|To-rah","מִצְוָה|mitz-voh|mitz-vah","שַׁבָּת|Sha-bos|Sha-bat","אֱמֶת|e-mes|e-met","אֶחָד|e-chod|e-chad","מוֹדֶה|mo-deh|mo-deh"])},
 {k:"brown",name:"Brown Belt",color:"#7a4a22",ink:"#fff",goal:"Read whole lines from your prayers",kind:"line"},
 {k:"black",name:"Black Belt",color:"#16161a",ink:"#ffd77a",goal:"Speed reading: read the Shema paragraph at 60 words a minute",kind:"speed"}
];
const PASS=0.9, SPEED_GOAL=60;
VIEWS.push("belts"); S.belts=S.belts||{}; S.wpm=S.wpm||0;
const sef=()=>S.accent==="sef";
const lname=L=>L[sef()?2:1];
function snd(it,b){ if(b.kind==="letter"){ const L=ALEF.find(x=>x[0]===it)||ALEF.find(x=>x[5]===it); return L?lname(L)+(L[5]===it?" (end form)":""):it } return sef()?it[2]:it[1] }
function heOf(it,b){ return b.kind==="letter"?it:b.kind==="line"?it.he:it[0] }
function unlocked(i){ return i===0||!!S.belts[BELTS[i-1].k] }
function lineItems(){ const seen=new Set(), out=[];
  MORNING.forEach(p=>p.lines.forEach(l=>{ if(l.head||l.bless||seen.has(l.he)) return; const n=l.he.split(" ").length; if(n>=3&&n<=6){ seen.add(l.he); out.push(l) } }));
  return shuffle(out).slice(0,8) }
const lineSay=l=>{ if(!sef()) return l.say; try{ return (typeof SEF_FIX!=="undefined"&&SEF_FIX[l.he])||toSef(l.he,l.say)||l.say }catch(e){ return l.say } };

/* Screen */
$("party").insertAdjacentHTML("beforebegin",`<div class="wrap" id="belts" hidden>
  <div class="toprow"><button class="back" id="btBack" type="button">← Alef-Beis</button></div>
  <div class="phead"><div class="he" lang="he">קְרִיאָה</div><h2 id="btH">Reading Belts</h2><p class="when" id="btWhen"></p></div>
  <div id="btMain" style="display:flex;flex-direction:column;gap:14px"></div>
</div>`);
$("btBack").onclick=()=>{ sfx.tick(); if(BT){ BT=null; renderBelts(); toTop() } else { $("belts").hidden=true; openAbc(-1) } };
document.addEventListener("click",e=>{ if(e.target.closest("[data-nav],#openBlitz,#openBM,#openPa,#openHol,#openSages,.pitem")&&!e.target.closest("#belts")) $("belts").hidden=true },true);

let BT=null;
function mkRun(b,seed,ch){ if(b.kind==="speed") return {b,speed:true};
  const sd=seed||(window.SSCH?SSCH.newSeed():1000), pick=()=>b.kind==="line"?lineItems():shuffle(b.items.slice()).slice(0,10);
  return {b,items:window.SSCH?SSCH.seeded(sd,pick):pick(),i:0,right:0,shown:false,seed:sd,ch:ch||null} }
window.startBeltChallenge=(k,seed,ch)=>{ const b=BELTS.find(x=>x.k===k); if(!b) return; stopPlay(); showOnly("belts"); BT=mkRun(b,seed,ch); renderBelts(); toTop() };
function openBelts(){ stopPlay(); showOnly("belts"); BT=null; renderBelts() }
function beltSvg(c,ink){ return `<svg viewBox="0 0 60 36" aria-hidden="true" class="btsvg"><path d="M2 12h56v10H2z" fill="${c}" stroke="#0003"/><path d="M24 8h12v18H24z" fill="${c}" stroke="#0004"/><path d="M26 25l-6 10 7-2 2-8M34 25l6 10-7-2-2-8" fill="${c}" stroke="#0004"/></svg>` }
function renderBelts(){
  if(BT) return btCard();
  const got=BELTS.filter(b=>S.belts[b.k]).length;
  $("btH").textContent="Reading Belts"; $("btWhen").textContent=`Earn all 8 belts, from White to Black. You have ${got} of 8.`;
  $("btMain").innerHTML=`<div class="buddy compact"><span class="ywrap">${yossi(got?"cheer":"")}</span><div class="bubble"><span class="name">Shlomo</span>Each belt is a reading test. Read each card <b>out loud</b> to a grown-up. Get 9 out of 10 right to earn the belt! 🥋 Each belt is worth <b>+10 gelt</b>, and every practice round gives <b>+1</b>.</div></div>
    <div class="lvls">${BELTS.map((b,i)=>{ const ok=!!S.belts[b.k], open=unlocked(i);
      return `<button class="lvl btlvl" type="button" data-b="${i}" ${open?"":"disabled"}><span class="e">${beltSvg(b.color,b.ink)}</span><span><b>${b.name}</b><span>${open?b.goal:"🔒 Earn the "+BELTS[i-1].name+" first"}${b.k==="black"&&S.wpm?` · best ${S.wpm} words a minute`:""}</span></span><span class="st">${ok?"✓":""}</span></button>` }).join("")}</div>`;
  $("btMain").querySelectorAll("[data-b]").forEach(x=>x.onclick=()=>{ const b=BELTS[+x.dataset.b]; sfx.pop();
    BT=mkRun(b); renderBelts(); toTop() });
}
function btCard(){ const b=BT.b;
  $("btH").textContent=b.name; $("btWhen").textContent=b.goal;
  if(BT.speed) return btSpeed();
  if(BT.i>=BT.items.length) return btDone();
  const it=BT.items[BT.i], he=heOf(it,b), say=b.kind==="line"?lineSay(it):snd(it,b);
  $("btMain").innerHTML=`<div class="bz-hud"><span>Card ${BT.i+1} of ${BT.items.length}</span><span>✓ ${BT.right}</span></div>
    <div class="pabig btcard"><div class="${b.kind==="line"?"btline":"btbig"}" lang="he">${he}</div>
      <p class="btans"${BT.shown?"":" hidden"}>${esc(say)}</p></div>
    <p class="gq" style="text-align:center;margin:0">${BT.shown?"Did you read it right?":"Read it out loud. Then check!"}</p>
    <div class="row" style="justify-content:center;flex-wrap:wrap">${BT.shown
      ?`<button class="btn gold big" id="btYes" type="button">✓ I read it right</button><button class="btn ghost" id="btNo" type="button">✗ Not yet</button>`
      :`<button class="btn gold big" id="btShow" type="button">Check my reading</button>`}<button class="btn ghost" id="btHear" type="button">👂 Hear it</button></div>`;
  $("btHear").onclick=()=>{ if(typeof voiceUnlock==="function") voiceUnlock(); sayWord(b.kind==="letter"?snd(it,b).replace(/ \(end form\)/,""):he) };
  if($("btShow")) $("btShow").onclick=()=>{ BT.shown=true; sfx.tick(); btCard() };
  if($("btYes")) $("btYes").onclick=()=>{ BT.right++; BT.i++; BT.shown=false; sfx.right(BT.right); btCard() };
  if($("btNo")) $("btNo").onclick=()=>{ BT.i++; BT.shown=false; sfx.wrong(); btCard() };
}
function btDone(){ const b=BT.b, n=BT.items.length, ok=BT.right>=Math.ceil(n*PASS), newly=ok&&!S.belts[b.k];
  const d=new Date(), dk=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`; S.beltRounds=S.beltRounds&&S.beltRounds.d===dk?S.beltRounds:{d:dk,n:0};
  const practice=!newly&&S.beltRounds.n<5; if(practice){ S.beltRounds.n++; S.gelt+=1; save(); setTimeout(()=>{ try{ sfx.coin() }catch(e){} toast("Round finished! +1 gelt") },300) }
  if(newly){ S.belts[b.k]=true; S.gelt+=10; save(); party(true); sfx.klezmer(); toast(b.name+" earned! +10 gelt") }
  $("btMain").innerHTML=`<div class="gdone"><div style="width:120px;margin:0 auto">${beltSvg(b.color,b.ink)}</div>
    <h3>${ok?`You earned the ${b.name}! 🥋`:"Almost there!"}</h3><p>${BT.right} of ${n} right${ok?"":` · you need ${Math.ceil(n*PASS)}`}</p>
    ${ok?"":"<p>Practice a little more and try again. You can do it!</p>"}
    <div class="row"><button class="btn gold" id="btAgain" type="button">${ok?"Next belt →":"Try again"}</button><button class="btn ghost" id="btAll" type="button">All belts</button></div></div>${window.SSCH?SSCH.panel(b.k,BT.seed,BT.right,n,BT.ch):""}`;
  $("btAgain").onclick=()=>{ const i=BELTS.indexOf(b), nb=ok?BELTS[i+1]:b; if(!nb){ BT=null; renderBelts(); return }
    BT=mkRun(ok?nb:b); renderBelts(); toTop() };
  $("btAll").onclick=()=>{ BT=null; renderBelts(); toTop() };
}
function btSpeed(){ const words=VEAHAVTA.map(l=>l.he).join(" "), n=words.split(" ").length;
  if(!BT.t0&&!BT.res){
    $("btMain").innerHTML=`<div class="buddy compact"><span class="ywrap">${yossi()}</span><div class="bubble"><span class="name">Shlomo</span>Here's the Black Belt test! Read the first paragraph of Shema (${n} words) out loud to a grown-up. Tap <b>Start</b>, read, then tap <b>Done</b>. Read ${SPEED_GOAL} words a minute or more, with no mistakes, to earn it!</div></div>
      <button class="btn gold big" id="btGo" type="button" style="align-self:center">▶ Start</button>`;
    $("btGo").onclick=()=>{ BT.t0=performance.now(); sfx.pop(); btSpeed() }; return }
  if(BT.t0&&!BT.res){
    $("btMain").innerHTML=`<div class="bz-hud"><span>${n} words</span><span id="btClock">0s</span></div>
      <div class="pabig btcard"><div class="btpass" lang="he">${VEAHAVTA.map(l=>l.he).join("<br>")}</div></div>
      <button class="btn gold big" id="btStop" type="button" style="align-self:center">■ Done</button>`;
    BT.tick=setInterval(()=>{ const c=$("btClock"); if(c) c.textContent=Math.round((performance.now()-BT.t0)/1000)+"s"; else clearInterval(BT.tick) },250);
    $("btStop").onclick=()=>{ clearInterval(BT.tick); const secs=(performance.now()-BT.t0)/1000; BT.res={secs,wpm:Math.round(n/(secs/60))}; sfx.tick(); btSpeed() }; return }
  const {secs,wpm}=BT.res, fast=wpm>=SPEED_GOAL;
  if(wpm>200){ $("btMain").innerHTML=`<div class="gdone"><h3>Whoa, too fast!</h3><p>Nobody can read ${n} words in ${Math.round(secs)} seconds. Read the whole paragraph out loud, then tap Done.</p><div class="row"><button class="btn gold" id="btRe" type="button">Try again</button></div></div>`; $("btRe").onclick=()=>{ BT={b:BT.b,speed:true}; btSpeed() }; return }
  $("btMain").innerHTML=`<div class="gdone"><h3>${wpm} words a minute</h3><p>${Math.round(secs)} seconds for ${n} words</p>
    ${fast?`<p class="gq">Did you read every word right?</p><div class="row"><button class="btn gold" id="btOk" type="button">✓ Yes, no mistakes</button><button class="btn ghost" id="btRe" type="button">I made mistakes</button></div>`
      :`<p>You need ${SPEED_GOAL} to earn the Black Belt. Practice and try again!</p><div class="row"><button class="btn gold" id="btRe" type="button">Try again</button></div>`}
    <button class="btn ghost" id="btAll" type="button" style="align-self:center">All belts</button></div>`;
  if($("btOk")) $("btOk").onclick=()=>{ S.wpm=Math.max(S.wpm||0,wpm); const newly=!S.belts.black; S.belts.black=true; if(newly){ S.gelt+=20; toast("Black Belt! +20 gelt") } save(); party(true); sfx.klezmer();
    $("btMain").innerHTML=`<div class="gdone"><div style="width:140px;margin:0 auto">${beltSvg("#16161a","#ffd77a")}</div><h3>Black Belt Reader! 🥋</h3><p>You can read Hebrew like a champ. Yasher koach!</p><button class="btn gold" id="btAll2" type="button">All belts</button></div>`;
    $("btAll2").onclick=()=>{ BT=null; renderBelts(); toTop() } };
  $("btRe").onclick=()=>{ BT={b:BT.b,speed:true}; btSpeed() };
  $("btAll").onclick=()=>{ BT=null; renderBelts(); toTop() };
}

/* Entry card at the top of the Alef-Beis letter list */
const _rA=renderAbc; renderAbc=function(){ _rA(); if(abcI>=0||$("btEntry")) return;
  const got=BELTS.filter(b=>S.belts[b.k]).length;
  $("abcBox").insertAdjacentHTML("afterbegin",`<button class="blitzcard btentry" id="btEntry" type="button"><span class="em" aria-hidden="true">🥋</span><span><b>Reading Belts</b><span>Read out loud and earn belts, from White to Black!</span></span><span class="bzs">${got} of 8 belts</span></button>`);
  $("btEntry").onclick=()=>{ sfx.pop(); openBelts() } };

document.head.insertAdjacentHTML("beforeend",`<style>
.btentry{background:linear-gradient(135deg,#16161a,#7a4a22 50%,#f08a24);box-shadow:0 5px 0 #000}
.btentry b,.btentry .bzs{color:#ffd77a}
.btsvg{width:100%;height:auto;display:block}
.btlvl .e{width:52px}
.btlvl:disabled{opacity:.5}
.btlvl .st{color:var(--good);font-size:1.3rem;font-weight:700}
.btcard{padding:22px 14px}
.btbig{font-family:var(--he);font-weight:700;font-size:6rem;line-height:1.25;color:var(--ink)}
.btline{font-family:var(--he);font-weight:700;font-size:2.2rem;line-height:1.5;color:var(--ink);direction:rtl}
.btpass{font-family:var(--he);font-weight:500;font-size:1.55rem;line-height:1.9;color:var(--ink);direction:rtl;text-align:right}
.btans{font-family:var(--say);font-weight:700;font-size:1.5rem;color:var(--tech);margin:6px 0 0;font-style:normal}
</style>`);
window.openBelts=openBelts; if(location.hash==="#belts") openBelts();
})();

/* ================= SIDDUR ORDER: end letters sit right after their partner =================
   Like the Alef-Beis in the Chabad siddur: ... כ ך ל מ ם נ ן ס ע פ ף צ ץ ק ר ש ת
   ALEF keeps its old order (progress is saved by letter), only the order on screen changes. */
(function(){
const ORD=[]; ALEF.slice(0,22).forEach((L,i)=>{ ORD.push(i); if(L[5]){ const f=ALEF.findIndex(x=>x[0]===L[5]); if(f>=0) ORD.push(f) } });
ALEF.forEach((L,i)=>{ if(!ORD.includes(i)) ORD.push(i) });
const pos=i=>ORD.indexOf(i);
const firstNew=()=>{ const i=ORD.find(i=>!(S.abc||{})[ALEF[i][0]]); return i==null?-1:i };
window.ABC_ORDER=ORD;

goLetter=function(d){ const p=pos(abcI)+d; if(p<0||p>=ORD.length) return; abcI=ORD[p]; sfx.pop(); renderAbc(); toTop() };
const _oA=openAbc; openAbc=function(i){ const oldNext=ALEF.findIndex(L=>!(S.abc||{})[L[0]]); _oA(i!=null&&i>=0&&i===oldNext?firstNew():i) };

const _rB=renderAbc; renderAbc=function(){ _rB(); const box=$("abcBox");
  if(abcI<0){
    const g=box.querySelector(".lgrid"); if(!g) return;
    g.querySelectorAll(".lfinh").forEach(x=>x.remove());
    ORD.forEach(i=>{ const t=g.querySelector(`[data-li="${i}"]`); if(t){ t.classList.toggle("lsof",i>21); g.appendChild(t) } });
    const nx=firstNew(), go=$("abcGo");
    if(go&&nx>=0){ go.textContent=`Meet ${lname(ALEF[nx])} →`; go.onclick=()=>{ sfx.pop(); abcI=nx; renderAbc(); toTop() };
      const b=go.closest(".bubble"); b&&b.querySelectorAll("b").forEach(x=>{ if(x.textContent===lname(ALEF[ALEF.findIndex(L=>!S.abc[L[0]])])) x.textContent=lname(ALEF[nx]) }) }
    return }
  const p=pos(abcI), prev=ORD[p-1], next=ORD[p+1];
  $("abcWhen").textContent=`Letter ${p+1} of ${ORD.length}`;
  const pv=$("lPrev"), nb=$("lNext"), mid=pv&&pv.nextElementSibling;
  if(pv){ pv.disabled=prev==null; pv.textContent=(prev!=null?lname(ALEF[prev]):"")+" →"; pv.onclick=()=>goLetter(-1) }
  if(nb){ nb.disabled=next==null; nb.textContent="← "+(next!=null?lname(ALEF[next]):""); nb.onclick=()=>goLetter(1) }
  if(mid) mid.textContent=`${p+1} / ${ORD.length}`;
  const gb=$("lGot"), ch=ALEF[abcI][0];
  if(gb) gb.onclick=()=>{ S.abc=S.abc||{}; const L=ALEF[abcI];
    if(S.abc[ch]){ if(next!=null){ abcI=next; renderAbc(); toTop() } return }
    S.abc[ch]=true; S.gelt+=1; save(); sfx.right(abcCount()%7); setTimeout(sfx.coin,180);
    if(abcCount()===ALEF.length){ renderAbc(); danceParty("You know the whole Alef-Beis!"); return }
    party(false); toast(`${lname(L)} learned! +1 gelt`); if(next!=null) abcI=next; renderAbc(); toTop() };
};
document.head.insertAdjacentHTML("beforeend",`<style>.ltile.lsof{border-style:dashed}.ltile.lsof .n{color:var(--gold)}</style>`);
if(!$("abc").hidden) renderAbc();
})();
