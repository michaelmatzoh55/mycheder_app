/* ================= GELT SHOP: give tzedakah, earn prizes from parents, spin the dreidel ================= */
(function(){
// Levels use all gelt ever earned (S.gelt). Spending only lowers the "to spend" balance.
S.shop=S.shop||{spent:0,tz:{},tzTotal:0,prizes:null,hist:[],spin:""};
if(!S.shop.prizes) S.shop.prizes=[];
const bal=()=>Math.max(0,(S.gelt||0)-(S.shop.spent||0));
const spend=n=>{ S.shop.spent=(S.shop.spent||0)+n; save() };
const dk=(d=new Date())=>`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
const sef=()=>S.accent==="sef";

const CAUSES=[
 ["🍲","Shabbos meals","Help a family have a beautiful Shabbos meal."],
 ["📚","Seforim for a yeshiva","Buy Chumashim and siddurim for students."],
 ["🧸","Toys for kids in the hospital","Bring a smile to a child who is sick."],
 ["🏗️","Build a shul","Help build a new shul for a Jewish community."],
 ["🕎","Chanukah gelt for kids","Give children in need a happy Chanukah."],
 ["🇮🇱","Help in Eretz Yisroel","Support families in the Holy Land."]
];
const SUGGEST=[["🍦","Ice cream",50],["🍰","Pick the Shabbos dessert",30],["🌙","Stay up 15 minutes late",40],["🛝","Trip to the park",60],["📖","A new Jewish book",100],["📚","Special learning time with a parent",45]];

/* Chanukah: 25 Kislev to 2 or 3 Teves */
function isChanukah(){ try{ const p=new Intl.DateTimeFormat("en-u-ca-hebrew",{day:"numeric",month:"long"}).formatToParts(new Date()); const d=+p.find(x=>x.type==="day").value, m=p.find(x=>x.type==="month").value;
  return (m==="Kislev"&&d>=25)||(m==="Tevet"&&d<=3) }catch(e){ return false } }
const spinOn=()=>S.noDreidel!==true;
/* Spins: 1 free a day + 1 for every 5 gelt earned by learning (dreidel winnings don't count). Up to 10 saved. */
const PER=5, CAP=10;
S.shop.drG=S.shop.drG||0; S.shop.spUsed=S.shop.spUsed||0;
const learnG=()=>(S.gelt||0)-(S.shop.drG||0);
if(S.shop.spBase==null) S.shop.spBase=learnG();
function earnedSpins(){ let e=Math.floor((learnG()-S.shop.spBase)/PER)-S.shop.spUsed; if(e>CAP){ S.shop.spBase+=(e-CAP)*PER; e=CAP } return Math.max(0,e) }
const dailyLeft=()=>S.shop.spin!==dk()?1:0;
const spinsLeft=()=>Math.min(CAP,dailyLeft()+earnedSpins());
const toNext=()=>PER-((learnG()-S.shop.spBase)%PER+PER)%PER;
const canSpin=()=>isChanukah()||spinsLeft()>0;
function useSpin(){ if(isChanukah()) return; if(dailyLeft()) S.shop.spin=dk(); else S.shop.spUsed++ }

VIEWS.push("shop");
$("party").insertAdjacentHTML("beforebegin",`<div class="wrap" id="shop" hidden>
  <div class="toprow"><button class="back" id="spBk" type="button">← Home</button></div>
  <div class="phead"><div class="he" lang="he">גֶּעלְט</div><h2>Gelt Shop</h2><p class="when">Use the gelt you earned for good things!</p></div>
  <div class="spbal"><span class="coin">✡</span><div><b id="spBal">0</b><span>gelt to spend</span></div><div class="spearn"><b id="spEarn">0</b><span>earned in all</span></div></div>
  <div class="ftabs" role="tablist" id="spTabs"></div>
  <div id="spMain" style="display:flex;flex-direction:column;gap:12px"></div>
  <button class="btn ghost" id="spEarnGo" type="button" style="align-self:center">📈 Learn how money and mitzvos grow →</button>
</div>`);
$("spEarnGo").onclick=()=>{ sfx.pop(); $("shop").hidden=true; if(window.openEarn) window.openEarn() };
let TAB="tz";
function tabs(){ const T=[["tz","🪙 Pushka"],["pr","🎁 Prizes"]].concat(spinOn()?[["dr","🎲 Dreidel"]]:[]); if(!T.find(t=>t[0]===TAB)) TAB="tz";
  $("spTabs").innerHTML=T.map(([k,n])=>`<button class="ftab" type="button" role="tab" data-spt="${k}" aria-selected="${k===TAB}">${n}</button>`).join("");
  $("spTabs").querySelectorAll("[data-spt]").forEach(b=>b.onclick=()=>{ sfx.tick(); TAB=b.dataset.spt; render() }) }
function openShop(tab){ stopPlay(); window._fromBM=false; showOnly("shop"); if(tab) TAB=tab; render(); document.querySelectorAll("[data-nav]").forEach(b=>b.removeAttribute("aria-current")) }
$("spBk").onclick=()=>{ sfx.tick(); $("shop").hidden=true; goHome() };
document.addEventListener("click",e=>{ if(e.target.closest("[data-nav],#openAbc,#openWords,#openBlitz,#openBM,#openPa,#openHol,#openSages,#openFacts,#openChal,#openMitz,#openChit,#openChs,.pitem")&&!e.target.closest("#shop")) $("shop").hidden=true },true);
function render(){ $("spBal").textContent=bal(); $("spEarn").textContent=S.gelt||0; tabs(); ({tz:renderTz,pr:renderPr,dr:renderDr})[TAB]() }

/* ---------- Pushka ---------- */
const PUSHKA=`<svg class="pushka" viewBox="0 0 120 120" aria-hidden="true">
 <rect x="22" y="30" width="76" height="80" rx="10" fill="#1d3d8c" stroke="#e3ad3a" stroke-width="4"/>
 <rect x="22" y="30" width="76" height="16" rx="8" fill="#2b53b4"/>
 <rect x="44" y="34" width="32" height="6" rx="3" fill="#0b1530"/>
 <text x="60" y="84" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="700" font-size="22" fill="#f4c95f">צְדָקָה</text>
 <path d="M30 100 H90" stroke="#e3ad3a" stroke-width="2" opacity=".6"/></svg>`;
function renderTz(){ const giv=S.shop.tzTotal||0, earned=S.gelt||0, maaser=Math.floor(earned/10), b=bal();
  $("spMain").innerHTML=`<div class="buddy compact"><span class="ywrap">${yossi(giv?"cheer":"")}</span><div class="bubble"><span class="name">Shlomo</span>
    Many Jews give <b>maaser</b>: one tenth of what they get goes to tzedakah. You earned <b>${earned}</b> gelt, so your maaser is <b>${maaser}</b>. You've given <b>${giv}</b>!${giv>=maaser&&maaser>0?" Yasher koach! 🎉":""}</div></div>
   <div class="pkwrap"><div class="pkbox" id="pkBox">${PUSHKA}</div><div class="pktot"><b>${giv}</b><span>gelt given to tzedakah</span></div></div>
   <h3 class="fg-h">Choose where your tzedakah goes</h3>
   <div class="pklist">${CAUSES.map((c,i)=>`<div class="pkc"><span class="e">${c[0]}</span><div><b>${c[1]}</b><small>${c[2]}</small>${S.shop.tz[i]?`<span class="pkg">You gave ${S.shop.tz[i]} gelt</span>`:""}</div>
     <div class="pkbtns">${[1,5,10].map(n=>`<button class="btn ghost" type="button" data-give="${i}:${n}" ${b<n?"disabled":""}>${n}</button>`).join("")}</div></div>`).join("")}</div>
   <p class="note">💡 This is practice tzedakah with your app gelt. Ask a grown-up if you can also put a <b>real coin</b> in your pushka today!</p>`;
  $("spMain").querySelectorAll("[data-give]").forEach(btn=>btn.onclick=()=>{ const [i,n]=btn.dataset.give.split(":").map(Number); if(bal()<n) return;
    spend(n); S.shop.tz[i]=(S.shop.tz[i]||0)+n; S.shop.tzTotal=(S.shop.tzTotal||0)+n; save();
    dropCoins(Math.min(n,6)); try{ sfx.coin() }catch(e){} toast(pick(["Tzedakah given! 💛","Yasher koach! 💛","What a mitzvah! 💛"]));
    setTimeout(()=>{ const y=scrollY; render(); scrollTo(0,y) },700) }) }
function dropCoins(n){ const box=$("pkBox"); if(!box) return; for(let k=0;k<n;k++){ const c=document.createElement("span"); c.className="coin pkcoin"; c.textContent="✡"; c.style.left=(42+Math.random()*16)+"%"; c.style.animationDelay=(k*90)+"ms"; box.appendChild(c); setTimeout(()=>c.remove(),900+k*90) }
  box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake") }

/* ---------- Prizes ---------- */
let PARENT=false, Q=null;
const newQ=()=>{ const a=6+Math.floor(Math.random()*4), b=6+Math.floor(Math.random()*4), r=a*b, w=new Set([r]); while(w.size<3) w.add(r+(Math.floor(Math.random()*9)-4||5)); return {a,b,r,opts:shuffle([...w])} };
function renderPr(){ const P=S.shop.prizes, b=bal();
  if(PARENT) return renderParent();
  $("spMain").innerHTML=`<div class="buddy compact"><span class="ywrap">${yossi()}</span><div class="bubble"><span class="name">Shlomo</span>${P.length?"Save up your gelt for a prize from your parents! When you have enough, tap <b>Get it!</b>":"No prizes yet! Ask a <b>grown-up</b> to set up prizes for you. They tap the button below."}</div></div>
   <div class="przlist">${P.map((p,i)=>{ const ok=b>=p[2], pct=Math.min(100,Math.round(b/p[2]*100));
     return `<div class="prz${ok?" ok":""}"><span class="e">${p[0]}</span><div><b>${esc(p[1])}</b><small>${p[2]} gelt${ok?" · you have enough!":` · ${p[2]-b} more to go`}</small><div class="gbar"><i style="width:${pct}%"></i></div></div>
       <button class="btn ${ok?"gold":"ghost"}" type="button" data-get="${i}" ${ok?"":"disabled"}>Get it!</button></div>` }).join("")}</div>
   ${S.shop.hist.length?`<details class="guide"><summary>🏆 Prizes I got (${S.shop.hist.length})</summary><div class="przh">${S.shop.hist.slice().reverse().map(h=>`<div><span>${h[0]} ${esc(h[1])}</span><small>${h[3]}${h[4]?" · ✓ given":""}</small></div>`).join("")}</div></details>`:""}
   <button class="btn ghost" id="przParent" type="button" style="align-self:center">👨‍👩‍👧 Grown-ups: set up prizes</button>`;
  $("spMain").querySelectorAll("[data-get]").forEach(btn=>btn.onclick=()=>{ const p=P[+btn.dataset.get]; if(!p||bal()<p[2]) return;
    spend(p[2]); const d=new Date().toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"}); S.shop.hist.push([p[0],p[1],p[2],d,false]); save();
    party(true); try{ sfx.klezmer() }catch(e){} certificate(p,d); render() });
  $("przParent").onclick=()=>{ sfx.tick(); Q=newQ(); gate() } }
function gate(){ $("spMain").innerHTML=`<div class="shgate"><b>Grown-ups: what is ${Q.a} × ${Q.b}?</b><div class="row" style="justify-content:center">${Q.opts.map(o=>`<button class="btn ghost" type="button" data-pq="${o}">${o}</button>`).join("")}</div>
   <button class="fg-go" id="pqBack" type="button" style="align-self:center">← Back</button></div>`;
  $("spMain").querySelectorAll("[data-pq]").forEach(b=>b.onclick=()=>{ if(+b.dataset.pq===Q.r){ PARENT=true; sfx.pop(); renderParent() } else { sfx.wrong(); Q=newQ(); gate() } });
  $("pqBack").onclick=()=>{ renderPr() } }
function renderParent(){ const P=S.shop.prizes;
  $("spMain").innerHTML=`<div class="przpar"><h3 class="fg-h" style="margin:0">Prizes for your child</h3>
   <p class="when" style="margin:0;text-align:left">Your child earns about 1–3 gelt for each thing they learn. Pick prizes and prices that work for your family.</p>
   ${P.length?`<div class="przlist">${P.map((p,i)=>`<div class="prz"><span class="e">${p[0]}</span><div><b>${esc(p[1])}</b><small>${p[2]} gelt</small></div><button class="btn ghost" type="button" data-del="${i}">Remove</button></div>`).join("")}</div>`:""}
   <div class="przadd"><label>Prize <input id="pzName" type="text" maxlength="40" placeholder="Like: ice cream"></label><label>Gelt <input id="pzCost" type="number" min="1" max="999" value="50" inputmode="numeric"></label><button class="btn gold" id="pzAdd" type="button">Add</button></div>
   <small style="color:var(--muted);font-weight:700">Quick ideas:</small>
   <div class="chips">${SUGGEST.filter(s=>!P.find(p=>p[1]===s[1])).map((s,i)=>`<button class="chip" type="button" data-sug="${SUGGEST.indexOf(s)}">${s[0]} ${s[1]} · ${s[2]}</button>`).join("")}</div>
   ${S.shop.hist.length?`<h3 class="fg-h" style="margin:8px 0 0">Prizes your child got</h3><div class="przh">${S.shop.hist.map((h,i)=>`<div><span>${h[0]} ${esc(h[1])} · ${h[3]}</span>${h[4]?`<small>✓ given</small>`:`<button class="btn ghost" type="button" data-given="${i}">Mark as given</button>`}</div>`).join("")}</div>`:""}
   <label class="spsw"><span><b>🎲 Dreidel spins</b><small>Spins earned by learning (plus 1 free a day). Gives bonus gelt, never takes it away.</small></span><button class="sw" id="pzDr" type="button" role="switch" aria-checked="${spinOn()}"></button></label>
   <button class="btn" id="pzDone" type="button" style="align-self:center">Done</button></div>`;
  const add=(e,n,c)=>{ n=String(n||"").trim().slice(0,40); c=Math.max(1,Math.min(999,Math.round(+c||0))); if(!n||!c) return; P.push([e||"🎁",n,c]); save(); sfx.pop(); renderParent() };
  $("pzAdd").onclick=()=>add("🎁",$("pzName").value,$("pzCost").value);
  $("spMain").querySelectorAll("[data-sug]").forEach(b=>b.onclick=()=>{ const s=SUGGEST[+b.dataset.sug]; add(s[0],s[1],s[2]) });
  $("spMain").querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{ P.splice(+b.dataset.del,1); save(); renderParent() });
  $("spMain").querySelectorAll("[data-given]").forEach(b=>b.onclick=()=>{ S.shop.hist[+b.dataset.given][4]=true; save(); renderParent() });
  $("pzDr").onclick=()=>{ S.noDreidel=spinOn(); save(); paintDrSw(); renderParent(); tabs() };
  $("pzDone").onclick=()=>{ PARENT=false; sfx.tick(); render() } }
function certificate(p,d){ const old=$("przCert"); if(old) old.remove();
  document.body.insertAdjacentHTML("beforeend",`<div class="shsheet" id="przCert" data-noglo><div class="shsh-in przcert" role="dialog" aria-label="Prize certificate">
    <div class="pcbig">${p[0]}</div><small>PRIZE EARNED</small><h3>${esc(p[1])}</h3><p>${S.rpName?esc(S.rpName)+" earned this with ":"Earned with "}<b>${p[2]} gelt</b> from learning!</p><p class="pcd">${d}</p>
    <p class="pcshow">📣 Show this to your parent!</p><button class="btn gold" type="button" id="pcOk">Yay! 🎉</button></div></div>`);
  $("pcOk").onclick=()=>$("przCert").remove() }

/* ---------- Dreidel ---------- */
const DR=()=>sef()?[["נ","Nes","A miracle",1],["ג","Gadol","Great",3],["ה","Haya","Happened",2],["פ","Po","Here!",1]]:[["נ","Nes","A miracle",1],["ג","Godol","Great",3],["ה","Hoyoh","Happened",2],["ש","Shom","There",1]];
function bigDreidel(k){ const c1=sef()?"#0d6b69":"#1d3d8c", c2=sef()?"#1b9a92":"#3a6fd8";
  return `<svg viewBox="0 0 80 112" aria-hidden="true"><rect x="34" y="2" width="12" height="22" rx="5" fill="#e3ad3a" stroke="#8a6212" stroke-width="1.5"/>
   <path d="M12 24 H68 V72 L40 108 L12 72Z" fill="${c1}" stroke="#e3ad3a" stroke-width="3.5" stroke-linejoin="round"/><path d="M12 24 H40 V108 L12 72Z" fill="${c2}" opacity=".5"/>
   <text x="40" y="62" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="700" font-size="34" fill="#ffd77a">${k}</text></svg>` }
function spinLine(){ if(isChanukah()) return `<b>∞</b> Chanukah spins!`; const n=spinsLeft();
  return `<b>🎲 ${n}</b> spin${n===1?"":"s"} left${n>=CAP?" (max saved)":` · <span>${toNext()} more gelt of learning for the next spin</span>`}` }
function renderDr(){ const can=canSpin(), ch=isChanukah(), L=DR();
  $("spMain").innerHTML=`<div class="buddy compact"><span class="ywrap">${yossi()}</span><div class="bubble"><span class="name">Shlomo</span>${ch?"It's <b>Chanukah</b>! Spin as much as you want! 🕎":`You get <b>1 free spin every day</b>, plus <b>1 more spin for every ${PER} gelt</b> you earn by learning! Every letter wins something!`}</div></div>
   <div class="drstage"><div class="drspin" id="drSpin">${bigDreidel(L[0][0])}</div><div class="dshadow"></div></div>
   <div class="drcount" id="drCount">${spinLine()}</div>
   <div class="drmsg" id="drMsg" aria-live="polite">${can?"Ready to spin?":"No spins left. Go learn something to earn more!"}</div>
   <button class="btn gold big" id="drGo" type="button" style="align-self:center" ${can?"":"disabled"}>🎲 Spin the dreidel!</button>
   <div class="drkey">${L.map(l=>`<div><span lang="he">${l[0]}</span><b>${l[1]}</b><small>${l[2]} · +${l[3]}</small></div>`).join("")}</div>
   <p class="note" style="text-align:center"><span lang="he" style="font-family:var(--he);font-weight:700;font-size:1.15em">נֵס גָּדוֹל הָיָה ${sef()?"פֹּה":"שָׁם"}</span><br>A great miracle happened ${sef()?"here":"there"}!</p>
   <section class="risk"><h3>🧠 Smart risks vs. gambling</h3>
    <p>Did you know? Some say Jewish children played dreidel to <b>hide their Torah learning</b> from Greek soldiers. When soldiers came, they pulled out their dreidels and pretended to just be playing!</p>
    <p>Our dreidel can only <b>give</b> you gelt. But real <b>gambling</b> is different: you bet money and hope to win more. Let's see what happens…</p>
    <div class="rsim"><div class="rsimh"><b>Pretend game</b><small>Each spin costs <b>1 coin</b>. Win <b>5 coins</b> if you land on ג. (Only 1 out of 6 spins lands on ג!)</small></div>
     <div class="rbars" id="rBars"></div><div class="rres" id="rRes">You start with <b>20 pretend coins</b>.</div>
     <button class="btn" id="rGo" type="button">▶ Try 50 pretend spins</button></div>
    <div class="rlesson" id="rLesson" hidden>
     <p><b>What happened?</b> Most of the time you end up with <b>fewer coins</b>. Games like this are built so that <b>the owner wins</b> in the end. That's why gambling can be dangerous: people keep playing to win back what they lost, and lose even more.</p>
     <p class="rtorah"><b>📜 What the Torah says:</b> The Gemara (Sanhedrin 24b) says someone who makes a living playing dice, <span lang="he">מְשַׂחֵק בְּקֻבְיָא</span>, can't even be a witness in a Jewish court. Why? Because he isn't doing anything to <b>help build the world</b>.</p>
     <h4>💪 But some risks are GOOD!</h4>
     <p>Hashem wants us to be brave and take <b>healthy risks</b>: trying something hard, where even if it doesn't work out, you grow.</p>
     <div class="rgood">
      <div><span>🌊</span><p><b>Nachshon</b> walked into the Yam Suf first, before it split. The Midrash says the sea split in his merit!</p></div>
      <div><span>🧳</span><p><b>Avraham</b> left everything he knew because Hashem said <i>Lech Lecha</i>, go!</p></div>
      <div><span>👑</span><p><b>Esther</b> went to the king without being called to save her people.</p></div>
      <div><span>🙋</span><p><b>You</b> can raise your hand in class, try out for something new, make a new friend, or say sorry first!</p></div>
     </div>
     <p class="rq"><b>Ask yourself before any risk:</b> Is it safe? Is it good? Would my parents be proud? If yes, go for it!</p>
    </div></section>`;
  $("drGo").onclick=()=>{ if(!canSpin()) return; const btn=$("drGo"); btn.disabled=true; const pickL=L[Math.floor(Math.random()*4)], sp=$("drSpin");
    sp.classList.add("go"); try{ sfx.tick() }catch(e){} let n=0; const iv=setInterval(()=>{ sp.innerHTML=bigDreidel(L[n++%4][0]); try{ if(n%3===0) sfx.tick() }catch(e){} },110);
    setTimeout(()=>{ clearInterval(iv); sp.classList.remove("go"); sp.innerHTML=bigDreidel(pickL[0]); sp.classList.add("land");
      useSpin(); S.gelt=(S.gelt||0)+pickL[3]; S.shop.drG=(S.shop.drG||0)+pickL[3]; save(); try{ sfx.coin() }catch(e){} if(pickL[3]>=3) party(false);
      $("drMsg").innerHTML=`<b>${pickL[1]}</b> <span lang="he">${pickL[0]}</span>: ${pickL[2]}! <b>+${pickL[3]} gelt</b> 🎉`;
      $("spBal").textContent=bal(); $("spEarn").textContent=S.gelt; $("drCount").innerHTML=spinLine(); if(canSpin()) btn.disabled=false; else btn.textContent="Learn to earn more spins! 📖"; paintShopHome() },1600) }
  $("rGo").onclick=()=>{ const bars=$("rBars"), res=$("rRes"), go=$("rGo"); go.disabled=true; bars.innerHTML=""; let c=20, n=0, wins=0;
    const iv=setInterval(()=>{ if(n>=50||c<=0){ clearInterval(iv); go.disabled=false; go.textContent="↻ Try again";
        res.innerHTML=c<20?`You won ${wins} time${wins===1?"":"s"}, but ended with <b>${c} coins</b>. You <b>lost ${20-c}</b>! 😬`:c===20?`You ended with exactly 20. Lucky this time, but try again and see!`:`You ended with <b>${c}</b>. Lucky this time! Try again: over many games, the owner always wins.`;
        $("rLesson").hidden=false; try{ c<20?sfx.wrong():sfx.tick() }catch(e){} return }
      n++; c--; if(Math.random()<1/6){ c+=5; wins++ } const h=Math.max(2,Math.min(100,c/40*100));
      bars.insertAdjacentHTML("beforeend",`<i style="height:${h}%" class="${c<20?"lo":"hi"}"></i>`); res.innerHTML=`Spin ${n}: <b>${c}</b> coins`; try{ if(n%5===0) sfx.tick() }catch(e){} },70) } }

/* ---------- Settings switch + home card + tap the gelt box ---------- */
$("aDone").insertAdjacentHTML("beforebegin",`<div class="arow" data-noglo><span><b>🎲 Dreidel spins</b><small>Spins earned by learning in the Gelt Shop. Gives bonus gelt, never takes it away.</small></span><button class="sw" id="swDr" type="button" role="switch"></button></div>`);
function paintDrSw(){ const b=$("swDr"); if(b) b.setAttribute("aria-checked",String(spinOn())) }
$("swDr").onclick=()=>{ S.noDreidel=spinOn(); save(); paintDrSw(); if(!$("shop").hidden) render() };
paintDrSw();
const anchor=$("openChs")||$("openMitz")||$("openPa");
anchor.insertAdjacentHTML("afterend",`<button class="blitzcard" id="openShop" type="button"><span class="em" aria-hidden="true">🪙</span>
  <span><b>Gelt Shop</b><span>Give tzedakah, save up for prizes${spinOn()?" and spin the dreidel":""}!</span></span><span class="bzs" id="shopHomeR"></span></button>`);
$("openShop").onclick=()=>{ sfx.pop(); openShop() };
const gs=$("geltN")&&$("geltN").closest(".stat"); if(gs){ gs.classList.add("statbtn"); gs.setAttribute("role","button"); gs.tabIndex=0; gs.setAttribute("aria-label","Open the Gelt Shop");
  const lab=gs.querySelector("span:not(.coin)"); if(lab) lab.innerHTML="gelt earned · <b class=\"gshop\">shop ›</b>";
  gs.onclick=()=>{ sfx.pop(); openShop() }; gs.onkeydown=e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); openShop() } } }
function paintShopHome(){ const r=$("shopHomeR"); if(!r) return; const b=bal(); r.textContent=`${b} gelt to spend${spinOn()?(isChanukah()?" · 🎲 Chanukah spins!":spinsLeft()?` · 🎲 ${spinsLeft()} spin${spinsLeft()===1?"":"s"}`:""):""}` }
const _rH=renderHome; renderHome=function(){ _rH(); paintShopHome() };

document.head.insertAdjacentHTML("beforeend",`<style>
.spbal{display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;background:var(--klaf);border:2px solid var(--gold-hi);border-radius:18px;padding:12px 16px}
.spbal .coin{width:44px;height:44px;font-size:1.3rem}
.spbal b{display:block;font-family:var(--display);font-weight:400;font-size:2rem;color:var(--tech);line-height:1}
.spbal span{font-size:.85rem;font-weight:700;color:var(--muted)}
.spearn{text-align:right}.spearn b{font-size:1.2rem!important;color:var(--gold)!important}
.pkwrap{display:flex;align-items:center;justify-content:center;gap:16px}
.pkbox{position:relative;width:120px;height:120px}.pkbox.shake{animation:shake .4s .45s}
.pushka{width:100%;height:100%;display:block;filter:drop-shadow(0 4px 3px rgba(0,0,0,.25))}
.pkcoin{position:absolute;top:-30px;width:24px!important;height:24px!important;font-size:.7rem!important;animation:pkdrop .55s ease-in forwards}
@keyframes pkdrop{0%{transform:translate(-50%,0) scale(1);opacity:1}85%{transform:translate(-50%,58px) scale(.85);opacity:1}100%{transform:translate(-50%,64px) scale(.3);opacity:0}}
.pktot b{display:block;font-family:var(--display);font-weight:400;font-size:2.4rem;color:var(--good);line-height:1}
.pktot span{font-size:.9rem;font-weight:700;color:var(--muted)}
.pklist,.przlist{display:flex;flex-direction:column;gap:8px}
.pkc,.prz{display:grid;grid-template-columns:44px 1fr auto;gap:10px;align-items:center;background:var(--klaf);border:2px solid var(--rule);border-radius:16px;padding:10px 12px}
.pkc .e,.prz .e{font-size:1.9rem;text-align:center}
.pkc b,.prz b{display:block;font-family:var(--display);font-weight:400;font-size:1.12rem;color:var(--tech);line-height:1.2}
.pkc small,.prz small{display:block;font-size:.85rem;color:var(--muted);line-height:1.3}
.pkg{display:block;font-size:.8rem;font-weight:700;color:var(--good);margin-top:2px}
.pkbtns{display:flex;gap:5px}.pkbtns .btn{padding:8px 10px;min-width:40px;font-size:.95rem}
.pkbtns .btn:disabled,.prz .btn:disabled{opacity:.4}
@media (max-width:400px){.pkc{grid-template-columns:36px 1fr}.pkbtns{grid-column:1/-1;justify-content:flex-end}}
.prz.ok{border-color:var(--gold-hi);background:color-mix(in srgb,var(--gold-hi) 12%,var(--klaf))}
.prz .gbar{margin-top:5px;height:7px}
.przh{display:flex;flex-direction:column;gap:6px;padding-bottom:10px}
.przh div{display:flex;justify-content:space-between;align-items:center;gap:8px;background:var(--bg);border-radius:10px;padding:8px 10px;font-weight:700}
.przh small{color:var(--good);font-weight:700}.przh .btn{padding:6px 10px;font-size:.85rem}
.przpar{background:var(--klaf);border:2px dashed var(--gold-hi);border-radius:18px;padding:14px;display:flex;flex-direction:column;gap:10px}
.przadd{display:grid;grid-template-columns:minmax(0,1fr) 80px auto;gap:8px;align-items:end}
.przadd label{display:flex;flex-direction:column;gap:4px;font-weight:700;font-size:.85rem;color:var(--tech);min-width:0}
.przadd input{width:100%;box-sizing:border-box}
@media (max-width:420px){.przadd{grid-template-columns:1fr 76px}.przadd #pzAdd{grid-column:1/-1}}
.przadd input{font:inherit;font-weight:400;padding:9px 10px;border:2px solid var(--rule);border-radius:10px;background:var(--bg);color:var(--ink);min-width:0}
.spsw{display:flex;justify-content:space-between;align-items:center;gap:12px;border-top:1px solid var(--rule);padding-top:10px}
.spsw b{display:block;color:var(--tech)}.spsw small{display:block;color:var(--muted);font-size:.82rem}
.przcert{align-items:center;text-align:center;background:linear-gradient(180deg,#fff7dc,var(--klaf))!important;border:4px double var(--gold-hi)!important}
.przcert .pcbig{font-size:4rem;line-height:1}
.przcert small{font-weight:700;letter-spacing:.15em;color:var(--gold)}
.przcert h3{font-family:var(--display);font-weight:400;font-size:2rem;color:var(--tech);margin:0}
.przcert p{margin:0;font-family:var(--text);font-size:1.1rem}.pcd{color:var(--muted)}.pcshow{font-weight:700;color:var(--tech)}
.drstage{display:flex;flex-direction:column;align-items:center;padding:6px 0}
.drspin{width:110px;height:154px}.drspin svg{width:100%;height:100%;display:block}
.drspin.go{animation:drwob .22s linear infinite}.drspin.land{animation:dland .6s cubic-bezier(.3,1.6,.5,1)}
@keyframes drwob{0%{transform:rotate(-10deg) scaleX(1)}50%{transform:rotate(10deg) scaleX(.55)}100%{transform:rotate(-10deg) scaleX(1)}}
.drcount{text-align:center;font-weight:700;color:var(--muted);font-size:.95rem}.drcount b{font-family:var(--display);font-weight:400;font-size:1.5rem;color:var(--tech)}.drcount span{display:inline-block}
.drmsg{text-align:center;font-family:var(--display);font-size:1.3rem;color:var(--tech);min-height:1.6em}
.drmsg span{font-family:var(--he);font-weight:700;color:var(--gold)}
.drkey{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.drkey div{display:flex;flex-direction:column;align-items:center;background:var(--klaf);border:2px solid var(--rule);border-radius:14px;padding:8px 4px}
.drkey span{font-family:var(--he);font-weight:700;font-size:1.8rem;color:var(--tech);line-height:1.2}
.drkey b{font-size:.9rem;color:var(--ink)}.drkey small{font-size:.75rem;color:var(--muted);text-align:center}
.risk{background:var(--klaf);border:2px solid var(--rule);border-radius:20px;padding:14px;display:flex;flex-direction:column;gap:10px}
.risk h3{font-family:var(--display);font-weight:400;font-size:1.35rem;color:var(--tech);margin:0}
.risk h4{font-family:var(--display);font-weight:400;font-size:1.2rem;color:var(--good);margin:6px 0 0}
.risk p{margin:0;font-family:var(--text);font-size:1.05rem;line-height:1.5}
.risk p b{color:var(--tech)}
.rsim{background:var(--bg);border-radius:14px;padding:12px;display:flex;flex-direction:column;gap:8px}
.rsimh>b{display:block;color:var(--tech)}.rsimh small b{color:var(--tech)}.rsimh small{display:block;color:var(--muted);font-size:.88rem}
.rbars{display:flex;align-items:flex-end;gap:2px;height:90px;border-bottom:2px solid var(--rule);background:linear-gradient(to top,transparent calc(50% - 1px),color-mix(in srgb,var(--gold-hi) 60%,transparent) 50%,transparent calc(50% + 1px))}
.rbars i{flex:1;max-width:8px;border-radius:2px 2px 0 0;transition:height .1s}.rbars i.hi{background:var(--good)}.rbars i.lo{background:var(--bad)}
.rres{font-weight:700;text-align:center;min-height:1.4em}
.rsim .btn{align-self:center}
.rtorah{background:var(--tech-soft);border-radius:12px;padding:10px 12px}
.rtorah span[lang=he]{font-family:var(--he);font-weight:700;color:var(--gold)}
.rgood{display:grid;gap:8px}
.rgood div{display:grid;grid-template-columns:36px 1fr;gap:10px;align-items:center;background:color-mix(in srgb,var(--good) 10%,var(--klaf));border-radius:12px;padding:8px 10px}
.rgood>div>span{font-size:1.6rem;text-align:center}
.rq{text-align:center;font-weight:700}
.gshop{color:var(--gold);font-weight:700}
</style>`);
window.openShop=openShop; paintShopHome(); if(location.hash==="#shop") openShop();
})();
