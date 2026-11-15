/* ================= MITZVOS: what a mitzvah is + a daily mitzvah checklist ================= */
(function(){
// [id, picture, name, when, why, who]  who: "boy" | "girl" | "fri" | "girlfri" | "weekday"
const DAILY=[
 ["modeh","☀️","Say Modeh Ani","Right when you wake up",
  "The very first thing we do each morning is <b>thank Hashem</b> for giving us back our neshamah. You can say it even before washing, because it doesn't have Hashem's name in it."],
 ["negel","💧","Wash negel vasser","Right when you wake up, next to your bed",
  "Keep a cup and bowl <b>next to your bed</b>. As soon as you wake up, before walking around, pour water <b>three times</b> on each hand: right, left, right, left, right, left. It washes off sleep so you're ready for a holy new day."],
 ["tzitzis","🧵","Wear tzitzis","All day","Tzitzis remind us of <b>all 613 mitzvos</b>. The strings and knots add up to 613! Kiss them when you say Shema.","boy"],
 ["shema","📜","Say Shema","In the morning and at bedtime",
  "<span lang='he'>שְׁמַע יִשְׂרָאֵל</span>: we say twice a day that <b>Hashem is One</b>. Cover your eyes so you can think only about the words."],
 ["tzedakah","🪙","Give tzedakah","Before davening or anytime (not on Shabbos)",
  "Put a coin in your <b>pushka</b>. The Rebbe asked every child to have their own pushka. Tzedakah means <b>doing what's right</b>, sharing what Hashem gave you.","weekday"],
 ["brachos","🍎","Make brachos on food","Before and after you eat",
  "Everything comes from Hashem. A bracha is how we say <b>thank you</b> before we enjoy it. Try for 100 brachos a day!"],
 ["torah","📖","Learn Torah","Even just a few minutes",
  "Learn a pasuk, a halacha or the Chumash of the day. Every word of Torah you learn connects your <b>mind</b> to Hashem's wisdom."],
 ["kibud","👨‍👩‍👧","Honor your parents","All day",
  "<b>Kibud av va'em</b> is one of the Ten Commandments! Listen the first time, say thank you, and help without being asked."],
 ["kind","💛","Do a kindness","For anyone",
  "<b>Ahavas Yisroel</b>: love every Jew like yourself. Share, smile, include someone who is alone, or say something nice. Hillel said this is the <b>whole Torah</b>!"],
 ["mezuzah","🚪","Kiss the mezuzah","When you go through a door",
  "Inside every mezuzah is the Shema, written by a sofer. It reminds us <b>Hashem guards our home</b>, whether we're inside or out."],
 ["shabbos","🍷","Help get ready for Shabbos","Friday",
  "Set the table, tidy up, or help with the challah. <b>Kavod Shabbos</b>: we get ready like a queen is coming to visit!","fri"],
 ["candle","🕯️","Light your Shabbos candle","Friday, 18 minutes before sunset",
  "Chabad girls light their own Shabbos candle from age 3. You add <b>light and peace</b> to the whole world!","girlfri"]
];
const ABOUT=[
 ["📜","A mitzvah is a commandment","<b>Mitzvah</b> means <b>commandment</b>, something Hashem asked us to do (or not do) in the Torah. There are <b>613 mitzvos</b>: 248 “do” mitzvos and 365 “don't” mitzvos."],
 ["🔗","A mitzvah connects you","Chassidus teaches that <span lang='he'>מִצְוָה</span> also comes from <b>tzavsa</b>, which means <b>togetherness</b>. Every time you do a mitzvah, you and Hashem are connected, like holding hands."],
 ["🏠","A home for Hashem","Hashem made the world because He wants a <b>home down here</b>. Every mitzvah, even a small one, adds a little more light to that home."],
 ["⚖️","Every mitzvah counts","The Rambam says to think of the whole world as <b>exactly half good and half not</b>. Your next mitzvah could tip the whole world to the good side!"],
 ["🔁","One mitzvah brings another","Pirkei Avos says <b>mitzvah goreres mitzvah</b>: one mitzvah leads to another. Start with one, and the next one gets easier."]
];
const sef=()=>S.accent==="sef", girl=()=>S.gender==="girl";
const tx=s=>{ if(!sef()) return s; try{ return typeof sefNames==="function"?sefNames(swapT(s)):swapT(s) }catch(e){ return s } };
const dkey=(d=new Date())=>`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
const today=()=>{ const d=new Date().getDay(); return DAILY.filter(m=>{ const w=m[5];
  if(w==="boy") return !girl(); if(w==="weekday") return d!==6; if(w==="fri") return d===5; if(w==="girlfri") return d===5&&girl(); return true }) };
S.mz=S.mz||{days:{},best:0};
const doneToday=()=>S.mz.days[dkey()]||(S.mz.days[dkey()]={});
// Shabbos and Yom Tov never break a streak
function streak(){ let n=0; const d=new Date(), has=x=>Object.keys(S.mz.days[dkey(x)]||{}).length>0, hol=x=>!!(window.isHolyDay&&window.isHolyDay(x));
  if(!has(d)) d.setDate(d.getDate()-1);
  for(let k=0;k<800;k++){ if(has(d)) n++; else if(!hol(d)) break; d.setDate(d.getDate()-1) } return n }
function trim(){ const keep=new Set(); const d=new Date(); for(let i=0;i<60;i++){ keep.add(dkey(d)); d.setDate(d.getDate()-1) }
  Object.keys(S.mz.days).forEach(k=>{ if(!keep.has(k)) delete S.mz.days[k] }) }
trim();

VIEWS.push("mitz");
$("party").insertAdjacentHTML("beforebegin",`<div class="wrap" id="mitz" hidden>
  <div class="toprow"><button class="back" id="mzBack" type="button">← Home</button></div>
  <div class="phead"><div class="he" lang="he">מִצְווֹת</div><h2>Mitzvos</h2><p class="when">What a mitzvah is, and your mitzvos for today</p></div>
  <div class="ftabs" role="tablist"><button class="ftab" type="button" role="tab" data-mzt="day">✅ Today's Mitzvos</button><button class="ftab" type="button" role="tab" data-mzt="what">❓ What's a Mitzvah?</button></div>
  <div id="mzMain" style="display:flex;flex-direction:column;gap:12px"></div>
</div>`);
let TAB="day", OPEN=null;
function openMitzvos(tab){ stopPlay(); window._fromBM=false; showOnly("mitz"); TAB=tab||(Object.keys(S.mz.days).length?"day":"what"); OPEN=null; renderMz();
  document.querySelectorAll("[data-nav]").forEach(b=>b.removeAttribute("aria-current")) }
$("mzBack").onclick=()=>{ sfx.tick(); $("mitz").hidden=true; goHome() };
document.addEventListener("click",e=>{ if(e.target.closest("[data-nav],#openAbc,#openWords,#openBlitz,#openBM,#openPa,#openHol,#openSages,#openFacts,#openChal,.pitem")&&!e.target.closest("#mitz")) $("mitz").hidden=true },true);
document.querySelectorAll("[data-mzt]").forEach(b=>b.onclick=()=>{ sfx.tick(); TAB=b.dataset.mzt; renderMz() });

function renderMz(){ document.querySelectorAll("[data-mzt]").forEach(b=>b.setAttribute("aria-selected",b.dataset.mzt===TAB));
  return TAB==="what"?renderWhat():renderDay() }
function renderWhat(){
  $("mzMain").innerHTML=`<div class="buddy compact"><span class="ywrap">${yossi()}</span><div class="bubble"><span class="name">Shlomo</span>Every mitzvah, big or small, is <b>precious to Hashem</b>. Here's what makes them so special!</div></div>
  ${ABOUT.map(([e,t,x])=>`<div class="mzabout"><span class="e">${e}</span><div><b>${tx(t)}</b><p>${tx(x)}</p></div></div>`).join("")}
  <button class="btn gold big" id="mzGoDay" type="button" style="align-self:center">✅ Start today's mitzvos →</button>`;
  $("mzGoDay").onclick=()=>{ sfx.pop(); TAB="day"; renderMz(); toTop() } }
function renderDay(){ const list=today(), done=doneToday(), n=list.filter(m=>done[m[0]]).length, st=streak();
  const dayName=new Date().toLocaleDateString(undefined,{weekday:"long"}), all=n===list.length;
  const spot=list[new Date().getDate()%list.length];
  $("mzMain").innerHTML=`<div class="mzhud"><div><b>${n} / ${list.length}</b><span>done today</span></div><div><b>🔥 ${st}</b><span>day${st===1?"":"s"} in a row</span></div><div><b>${S.mz.best||0}</b><span>best streak</span></div></div>
    <div class="gbar"><i style="width:${Math.round(n/list.length*100)}%"></i></div>
    <div class="buddy compact"><span class="ywrap">${yossi(all?"cheer":"")}</span><div class="bubble"><span class="name">Shlomo</span>${
      all?"You did <b>every mitzvah</b> today! The whole world is a little brighter. 🌟"
      :n?`Great job! <b>${list.length-n}</b> more to go today.`
      :`Happy ${dayName}! Tap each mitzvah when you've done it. Today's special one: <b>${tx(spot[2])}</b> ${spot[1]}`}</div></div>
    <div class="mzlist">${list.map(m=>{ const ok=!!done[m[0]], op=OPEN===m[0];
      return `<div class="mzi${ok?" ok":""}${m===spot?" spot":""}"><button class="mzchk" type="button" data-mz="${m[0]}" aria-pressed="${ok}" aria-label="${esc(tx(m[2]))}${ok?", done":""}"><span class="e">${m[1]}</span><span class="t"><b>${tx(m[2])}</b><small>${tx(m[3])}</small></span><span class="box">${ok?"✓":""}</span></button>
        <button class="mzwhy" type="button" data-mzw="${m[0]}" aria-expanded="${op}">${op?"Hide":"Why?"}</button>${op?`<p class="mzx">${tx(m[4])}</p>`:""}</div>` }).join("")}</div>
    ${new Date().getDay()===6?`<p class="note">🕯️ It's Shabbos! We don't touch money on Shabbos, so tzedakah waits until tomorrow.</p>`:""}
    <p class="when" style="text-align:center;font-size:.9rem">A new list starts every day. +1 gelt for each mitzvah, +3 bonus for doing them all!</p>`;
  $("mzMain").querySelectorAll("[data-mz]").forEach(b=>b.onclick=()=>{ const id=b.dataset.mz, d=doneToday();
    if(d[id]){ delete d[id]; S.gelt=Math.max(0,(S.gelt||0)-1); sfx.tick() }
    else{ d[id]=true; S.gelt=(S.gelt||0)+1; sfx.right(Object.keys(d).length%7); setTimeout(sfx.coin,160);
      const L=today(); if(L.every(m=>d[m[0]])&&!d._bonus){ d._bonus=true; S.gelt+=3; setTimeout(()=>{ party(true); toast("Every mitzvah today! +3 gelt") },250) } else toast(pick(["Mitzvah done! +1 gelt","Yasher koach! +1 gelt","Another mitzvah! +1 gelt"])) }
    S.mz.best=Math.max(S.mz.best||0,streak()); save(); paintMzHome(); const y=scrollY; renderDay(); scrollTo(0,y) });
  $("mzMain").querySelectorAll("[data-mzw]").forEach(b=>b.onclick=()=>{ sfx.tick(); OPEN=OPEN===b.dataset.mzw?null:b.dataset.mzw; const y=scrollY; renderDay(); scrollTo(0,y) }) }

/* Home card, next to Did You Know? */
const anchor=$("openFacts")||$("openSages")||$("openPa");
anchor.insertAdjacentHTML("beforebegin",`<button class="blitzcard mzcard" id="openMitz" type="button"><span class="em" aria-hidden="true">✅</span>
  <span><b>Daily Mitzvos</b><span>What's a mitzvah? Check off your mitzvos every day!</span></span><span class="bzs" id="mzProg"></span></button>`);
$("openMitz").onclick=()=>{ sfx.pop(); openMitzvos("day") };
function paintMzHome(){ const p=$("mzProg"); if(!p) return; const L=today(), d=S.mz.days[dkey()]||{}, n=L.filter(m=>d[m[0]]).length, s=streak();
  p.textContent=`${n} of ${L.length} today${s?` · 🔥 ${s} day${s===1?"":"s"}`:""}` }
const _rH=renderHome; renderHome=function(){ _rH(); paintMzHome() };

document.head.insertAdjacentHTML("beforeend",`<style>
.mzcard{background:linear-gradient(135deg,#2c7549,#3f9e66 55%,#e3ad3a);box-shadow:0 5px 0 #1c5233}
.mzcard b,.mzcard .bzs{color:#fff6dc}
.mzhud{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.mzhud div{background:var(--klaf);border:1.5px solid var(--rule);border-radius:14px;padding:8px;text-align:center}
.mzhud b{display:block;font-family:var(--display);font-weight:400;font-size:1.35rem;color:var(--tech)}
.mzhud span{font-size:.75rem;color:var(--muted);font-weight:700}
.mzlist{display:flex;flex-direction:column;gap:8px}
.mzi{background:var(--klaf);border:2px solid var(--rule);border-radius:16px;padding:4px 10px 8px;transition:border-color .2s,background .2s}
.mzi.spot{border-color:var(--gold-hi)}
.mzi.ok{border-color:var(--good);background:color-mix(in srgb,var(--good) 10%,var(--klaf))}
.mzchk{width:100%;display:grid;grid-template-columns:40px 1fr 36px;gap:10px;align-items:center;text-align:left;border:0;background:none;padding:6px 0}
.mzchk .e{font-size:1.9rem;text-align:center}
.mzchk b{display:block;font-family:var(--display);font-weight:400;font-size:1.15rem;color:var(--tech);line-height:1.2}
.mzchk small{display:block;color:var(--muted);font-size:.82rem}
.mzchk .box{width:32px;height:32px;border-radius:10px;border:2.5px solid var(--rule);display:grid;place-items:center;font-weight:700;font-size:1.2rem;color:#fff;transition:transform .2s}
.mzi.ok .box{background:var(--good);border-color:var(--good);animation:bump .35s}
.mzi.ok .t b{text-decoration:line-through;text-decoration-color:color-mix(in srgb,var(--good) 60%,transparent)}
.mzwhy{border:0;background:none;color:var(--gold);font-weight:700;font-size:.85rem;padding:0 0 0 50px}
.mzx{margin:6px 0 2px 50px;font-family:var(--text);font-size:1.02rem;line-height:1.45}
.mzx span[lang=he],.mzabout span[lang=he]{font-family:var(--he);color:var(--gold)}
.mzabout{display:grid;grid-template-columns:44px 1fr;gap:12px;background:var(--klaf);border:2px solid var(--rule);border-radius:16px;padding:12px 14px}
.mzabout .e{font-size:2rem;text-align:center}
.mzabout b{font-family:var(--display);font-weight:400;font-size:1.2rem;color:var(--tech)}
.mzabout p{margin:4px 0 0;font-family:var(--text);font-size:1.04rem;line-height:1.45}
</style>`);
window.openMitzvos=openMitzvos; paintMzHome(); if(location.hash==="#mitzvos") openMitzvos();
})();
