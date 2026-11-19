/* ================= BAR MITZVAH TRAINING, the full program =================
   Adds to the Bar Mitzvah screen: a countdown plan, a daily tefillin tracker, a halachos quiz,
   a ma'amar memorizing trainer (with the family's own text), a speech builder, the Rebbe's
   Hebrew-birthday customs, and the Bar Mitzvah parsha. (Girls keep their Bat Mitzvah list from gender.js.) */
(function(){
if(typeof BM_ITEMS==="undefined") return;
S.bm=S.bm||{};
const dk=(d=new Date())=>`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
const hol=d=>!!(window.isHolyDay&&window.isHolyDay(d));
const fmt=d=>d.toLocaleDateString(undefined,{month:"short",day:"numeric"});
const bmDay=()=>S.bm.date?new Date(S.bm.date+"T12:00:00"):null;
const daysLeft=()=>{ const d=bmDay(); return d?Math.ceil((d-new Date())/864e5):null };

/* ---------- The list on the Bar Mitzvah screen ---------- */
const CAL='🗓️';
const NEW=[
  {k:"plan",ic:CAL,t:"My Bar Mitzvah Plan",d:"What to learn each week until the big day.",go:()=>open("plan")},
  null, // Put on Tefillin (existing)
  null, // The Tefillin Bracha (existing)
  {k:"tefDays",ic:"✅",t:"Tefillin Every Day",d:"Check off each weekday you put on tefillin.",go:()=>open("tefDays")},
  {k:"law",ic:"📏",t:"Halachos Quiz",d:"Tefillin, the aliyah, and being 13. What a Bar Mitzvah needs to know.",go:()=>open("law")},
  null, // Your First Aliyah (existing)
  null, // The Aliyah Blessings (existing)
  {k:"maamar",ic:"📖",t:"Your Ma'amar",d:"Memorize the ma'amar of Chassidus, section by section.",go:()=>open("maamar")},
  {k:"speech",ic:"🎤",t:"My Speech",d:"Build your d'var Torah step by step, then practice it.",go:()=>open("speech")},
  {k:"bday",ic:"🎂",t:"Your Hebrew Birthday",d:"The Rebbe's birthday customs, and your new Tehillim chapter.",go:()=>open("bday")},
  {k:"par",ic:"📜",t:"My Bar Mitzvah Parsha",d:"The Torah portion read on your Bar Mitzvah Shabbos.",go:()=>{ S.bm.par=true; save(); if(window.openParsha){ window.openParsha(); setTimeout(()=>{ const b=$("paBM"); if(b&&!b.hidden) b.scrollIntoView({block:"center",behavior:"smooth"}) },300) } }}
];
const OLD=Object.fromEntries(BM_ITEMS.map(x=>[x.k,x]));
const order=["plan","tef","tefB","tefDays","law","ali","aliB","maamar","speech","bday","par"];
BM_ITEMS.length=0;
order.forEach(k=>BM_ITEMS.push(NEW.find(x=>x&&x.k===k)||OLD[k]));
BM_ITEMS.push({k:"haf",ic:"🔒",t:"Haftarah and Leining",d:"Ask your rabbi: in many Chabad shuls the Bar Mitzvah boy gets an aliyah, and leining depends on the shul.",lock:true});

/* ---------- One screen for all the new parts ---------- */
VIEWS.push("bmx");
$("party").insertAdjacentHTML("beforebegin",`<div class="wrap" id="bmx" hidden>
  <div class="toprow"><button class="back" id="bxBk" type="button">← Bar Mitzvah</button></div>
  <div class="phead"><div class="he" lang="he" id="bxHe"></div><h2 id="bxH"></h2><p class="when" id="bxWhen"></p></div>
  <div id="bxMain" style="display:flex;flex-direction:column;gap:14px"></div>
</div>`);
$("bxBk").onclick=()=>{ sfx.tick(); openBM() };
document.addEventListener("click",e=>{ if(e.target.closest("[data-nav]")&&!e.target.closest("#bmx")) $("bmx").hidden=true },true);
let CUR=null;
const TITLES={plan:["תָּכְנִית","My Bar Mitzvah Plan","Step by step until the big day"],tefDays:["תְּפִלִּין","Tefillin Every Day","Every weekday morning, starting about two months before"],
  law:["הֲלָכוֹת","Halachos Quiz","What every Bar Mitzvah bochur needs to know"],maamar:["מַאֲמָר","Your Ma'amar","Say a ma'amar of Chassidus by heart"],
  speech:["דְּבַר תּוֹרָה","My Speech","Your own d'var Torah"],bday:["יוֹם הֻלֶּדֶת","Your Hebrew Birthday","The Rebbe's birthday customs"]};
function open(k){ stopPlay(); CUR=k; showOnly("bmx"); const t=TITLES[k]; $("bxHe").textContent=t[0]; $("bxH").textContent=t[1]; $("bxWhen").textContent=t[2]; ({plan,tefDays,law,maamar,speech,bday})[k]() }
function done(k){ if(!S.bm[k]){ S.bm[k]=true; S.gelt=(S.gelt||0)+5; save(); party(true); try{ sfx.coin() }catch(e){} toast("Yasher koach! +5 gelt"); if(typeof paintBMStars==="function") paintBMStars() } }
const buddy=h=>`<div class="buddy compact"><span class="ywrap">${yossi()}</span><div class="bubble"><span class="name">Shlomo</span>${h}</div></div>`;

/* ---------- 1. The plan ---------- */
const STEPS=[
  [90,"aliB","Learn the aliyah brachos","Word by word, until you can say them smoothly."],
  [90,"law","Learn the halachos","Take the Halachos Quiz until you get them all right."],
  [84,"maamar","Start your ma'amar","Ask your rabbi or teacher which ma'amar, and learn a few lines every day."],
  [60,"tefDays","Start putting on tefillin every day","In Chabad, boys start about two months before the Bar Mitzvah. Ask your rabbi how to begin."],
  [60,"tef","Practice putting on tefillin","The arm, the head and the wraps, until it's easy."],
  [42,"maamarHalf","Half of the ma'amar by heart","Keep going a little every day!"],
  [28,"speech","Write your speech","Use the speech builder, then show it to your teacher."],
  [14,"ali","Practice your aliyah","Walk through it, and say the brachos out loud."],
  [14,"maamarAll","The whole ma'amar by heart","Say it to a parent or teacher without looking."],
  [7,"bday","Get ready for your Hebrew birthday","The Rebbe's birthday customs, and your new Tehillim chapter."]];
function stepDone(k){ if(k==="maamarHalf") return mProgress()>=.5; if(k==="maamarAll") return mProgress()>=1; return typeof bmDone==="function"?bmDone(k):!!S.bm[k] }
function plan(){ const d=bmDay(), left=daysLeft();
  $("bxMain").innerHTML=(d?buddy(left>0?`<b>${left} days</b> until your Bar Mitzvah! Here's your plan. Each step has a date to aim for. Tap a step to start it.`:`Mazel tov, Bar Mitzvah bochur! 🎉 Keep everything strong, especially tefillin every day.`)
      :buddy(`First, tell me <b>when your Bar Mitzvah is</b>. Go back and pick the date at the top of the Bar Mitzvah screen, and I'll make your plan.`))+
   `<div class="bxplan">${STEPS.map(([before,k,t,why])=>{ const when=d?new Date(d.getTime()-before*864e5):null, ok=stepDone(k), late=when&&!ok&&when<new Date();
     return `<button class="bxstep${ok?" ok":""}${late?" late":""}" type="button" data-step="${k}"><span class="bxw">${when?fmt(when):`${Math.round(before/7)} wk before`}</span><span class="bxt"><b>${t}</b><small>${why}</small></span><span class="bxc">${ok?"✅":late?"⏰":"▶"}</span></button>` }).join("")}</div>
   <p class="note">This plan is a guide. Your rabbi or teacher may plan it differently, so follow them!</p>`;
  $("bxMain").querySelectorAll("[data-step]").forEach(b=>b.onclick=()=>{ sfx.pop(); const k=b.dataset.step.replace(/Half|All/,"");
    const it=BM_ITEMS.find(x=>x&&x.k===k); if(it&&it.go) it.go(); });
  if(d) done("plan") }

/* ---------- 2. Tefillin every day ---------- */
S.bm.tefLog=(S.bm.tefLog&&typeof S.bm.tefLog==="object")?S.bm.tefLog:{};
function tefStreak(){ let n=0; const d=new Date(); if(!S.bm.tefLog[dk(d)]) d.setDate(d.getDate()-1);
  for(let k=0;k<800;k++){ if(S.bm.tefLog[dk(d)]) n++; else if(!hol(d)) break; d.setDate(d.getDate()-1) } return n }
function tefDays(){ const today=new Date(), holy=hol(today), got=!!S.bm.tefLog[dk()], total=Object.keys(S.bm.tefLog).length, st=tefStreak();
  const week=[...Array(7)].map((_,i)=>{ const d=new Date(today); d.setDate(d.getDate()-(6-i)); return d });
  $("bxMain").innerHTML=buddy(holy?`Today is <b>Shabbos or Yom Tov</b>. We don't put on tefillin today, because the day itself is a sign between us and Hashem. Your streak is safe! 😊`
     :got?`Yasher koach! You put on tefillin today. 💪`:`Did you put on tefillin this morning? Tap the big button when you're done.`)+
   `<div class="mzhud"><div><b>${total}</b><span>days so far</span></div><div><b>🔥 ${st}</b><span>in a row</span></div><div><b>${S.bm.tefBest||0}</b><span>best streak</span></div></div>
   <div class="tfweek">${week.map(d=>{ const k=dk(d), h=hol(d); return `<div class="${S.bm.tefLog[k]?"ok":""}${h?" hol":""}"><small>${d.toLocaleDateString(undefined,{weekday:"short"})}</small><b>${h?"🕯️":S.bm.tefLog[k]?"✓":"·"}</b></div>` }).join("")}</div>
   ${holy?"":`<button class="btn ${got?"ghost":"gold big"}" id="tfGo" type="button" style="align-self:center">${got?"↺ Undo today":"✓ I put on tefillin today! +1 gelt"}</button>`}
   <div class="cnfacts"><div><span>🌅</span><p>Put on tefillin every weekday <b>morning</b>, ideally while davening Shacharis. At the very least, say the <b>Shema</b> while wearing them.</p></div>
    <div><span>🕯️</span><p><b>No tefillin on Shabbos or Yom Tov</b>, and in Chabad, not on Chol Hamoed either.</p></div>
    <div><span>📦</span><p>Chabad Chassidim put on two pairs every weekday: <b>Rashi</b> tefillin during davening, and <b>Rabbeinu Tam</b> tefillin after.</p></div>
    <div><span>🤝</span><p>When you're older, help other Jews put on tefillin too. That's <b>Mivtza Tefillin</b>, one of the Rebbe's mitzvah campaigns!</p></div></div>`;
  const g=$("tfGo"); if(g) g.onclick=()=>{ const k=dk(); if(S.bm.tefLog[k]){ delete S.bm.tefLog[k]; S.gelt=Math.max(0,(S.gelt||0)-1); sfx.tick() } else { S.bm.tefLog[k]=true; S.gelt=(S.gelt||0)+1; sfx.right(3); setTimeout(()=>{ try{ sfx.coin() }catch(e){} },150); toast("Tefillin today! +1 gelt 💪") }
    S.bm.tefBest=Math.max(S.bm.tefBest||0,tefStreak()); if(Object.keys(S.bm.tefLog).length>=7) S.bm.tefDays=true; save(); if(typeof paintBMStars==="function") paintBMStars(); tefDays() } }

/* ---------- 3. Halachos quiz ---------- */
const QZ=[
 ["Tefillin","Which tefillin do you put on first?",["The one on the arm (shel yad)","The one on the head (shel rosh)","It doesn't matter"],0,"First the <b>shel yad</b>, then the <b>shel rosh</b>. The Torah mentions the arm first: “bind them as a sign on your arm, and they shall be tefillin between your eyes.”"],
 ["Tefillin","Which arm does the shel yad go on, if you're right-handed?",["Your right arm","Your left arm","Either one"],1,"On your <b>weaker</b> arm: the <b>left</b> arm for a right-handed person. A lefty puts it on the right arm."],
 ["Tefillin","Where on the arm does the box of the shel yad sit?",["On the wrist","On the muscle of the upper arm, facing the heart","On the elbow"],1,"On the <b>biceps</b>, tilted toward your <b>heart</b>, so your heart and mind are both connected to Hashem."],
 ["Tefillin","In Chabad, how many brachos do we say on tefillin?",["One, on the shel yad","Two, one on each","None"],0,"Chabad follows the Arizal and says <b>one bracha</b>, “<i>l'haniach tefillin</i>,” on the shel yad. It covers the shel rosh too."],
 ["Tefillin","May you talk between putting on the shel yad and the shel rosh?",["Yes, quietly","No, not at all","Only to say good morning"],1,"<b>No talking</b> in between, so the two tefillin stay together as one mitzvah."],
 ["Tefillin","How many times does the strap wrap around the forearm?",["3","7","10"],1,"<b>Seven</b> times around the arm, below the elbow. Then the strap goes around the hand and fingers."],
 ["Tefillin","Where does the shel rosh go?",["In the middle of the forehead","Above the hairline, centered between the eyes","On top of the head, anywhere"],1,"The box sits <b>above where your hair starts</b>, centered over the space between your eyes, and the knot sits at the back of your head."],
 ["Tefillin","When you take tefillin off, which comes off first?",["The shel rosh","The shel yad","Both together"],0,"First unwind the strap from your fingers, then take off the <b>shel rosh</b>, then the <b>shel yad</b>. The opposite order of putting them on."],
 ["Tefillin","Do we put on tefillin on Shabbos?",["Yes","No","Only in the afternoon"],1,"<b>No.</b> Tefillin are called a “sign,” and Shabbos and Yom Tov are a sign themselves."],
 ["Tefillin","Which two kinds of tefillin do Chabad Chassidim wear?",["Rashi and Rabbeinu Tam","Small and big","Black and brown"],0,"<b>Rashi</b> tefillin and <b>Rabbeinu Tam</b> tefillin. The parshiyos inside are in a different order."],
 ["Aliyah","When you're called to the Torah, how do you kiss the place to be read?",["With your hand","Touch it with your tallis or the tzitzis, then kiss them","You don't"],1,"Touch the place with the <b>tzitzis or the edge of the tallis</b> (never your bare finger), then kiss the tzitzis."],
 ["Aliyah","What do you say first, before the bracha?",["Baruch Hashem","Barchu es Hashem hamevorach","Shalom aleichem"],1,"“<b>Barchu</b>,” and the congregation answers “Baruch Hashem hamevorach l'olam va'ed,” which you repeat."],
 ["Aliyah","What do you do while the ba'al korei reads your aliyah?",["Sit down","Follow along quietly in the Torah","Talk to the gabbai"],1,"Stand and <b>follow along quietly</b> in the Torah scroll while it's read."],
 ["Aliyah","After your aliyah, when do you go back to your seat?",["Right away","After the next person's aliyah","Before the bracha after"],1,"Stay at the bimah until the <b>next aliyah</b> is finished, then go back the <b>longer way</b>, so it doesn't look like you're running from the Torah."],
 ["Being 13","What changes when a boy turns 13?",["He is now obligated in all the mitzvos","Nothing","He can stop learning Torah"],0,"He's now <b>obligated in all the mitzvos</b> and responsible for his own actions. A big honor!"],
 ["Being 13","After his Bar Mitzvah, can he count for a minyan?",["Yes","No","Only on Shabbos"],0,"<b>Yes!</b> He's one of the ten men needed for a minyan."],
 ["Being 13","How many times a day do we say the Shema?",["Once","Twice: morning and night","Three times"],1,"<b>Twice a day</b>, morning and evening, plus the Shema at bedtime."],
 ["Being 13","What does “Bar Mitzvah” mean?",["Son of a commandment: someone who keeps the mitzvos","Party","Big boy"],0,"It means a <b>son of the mitzvah</b>: someone who now carries out the mitzvos himself."]];
let LQ=null;
function law(){ if(!LQ){ $("bxMain").innerHTML=buddy(`There are <b>${QZ.length} questions</b> about tefillin, your aliyah and being 13. Get them all right to finish! You can try as many times as you want.`)+
   `<div class="lvls">${["Tefillin","Aliyah","Being 13"].map(c=>`<div class="lvl" style="cursor:default"><span class="e">${c==="Tefillin"?"📦":c==="Aliyah"?"📜":"🎉"}</span><span><b>${c}</b><span>${QZ.filter(q=>q[0]===c).length} questions</span></span><span class="st">${S.bm["law_"+c]?"✓":""}</span></div>`).join("")}</div>
   <button class="btn gold big" id="lqGo" type="button" style="align-self:center">Start the quiz ▶</button>`;
   $("lqGo").onclick=()=>{ sfx.pop(); LQ={i:0,right:0,first:true}; law() }; return }
  if(LQ.i>=QZ.length){ const all=LQ.right===QZ.length; if(LQ.right>=QZ.length-2) done("law");
    $("bxMain").innerHTML=`<div class="gdone"><div class="stars">${all?"★★★":LQ.right>=QZ.length*.7?"★★☆":"★☆☆"}</div><h3>${LQ.right} of ${QZ.length} right on the first try</h3><p>${all?"You know your halachos! 🎉":LQ.right>=QZ.length-2?"Excellent! You know your halachos. 🎉":"Great work! Try again to get at least "+(QZ.length-2)+" right."}</p><div class="row"><button class="btn gold" id="lqAgain" type="button">Try again</button><button class="btn ghost" id="lqBack" type="button">← Bar Mitzvah</button></div></div>`;
    $("lqAgain").onclick=()=>{ LQ={i:0,right:0,first:true}; law() }; $("lqBack").onclick=()=>{ LQ=null; openBM() }; return }
  const q=QZ[LQ.i];
  $("bxMain").innerHTML=`<div class="bz-hud"><span>${q[0]} · question ${LQ.i+1} of ${QZ.length}</span><span>✓ ${LQ.right}</span></div><div class="gbar"><i style="width:${LQ.i/QZ.length*100}%"></i></div>
   <p class="gq" style="font-size:1.2rem;margin:0"><b>${q[1]}</b></p>
   <div class="opts">${q[2].map((o,n)=>`<button class="opt" type="button" data-lq="${n}">${o}</button>`).join("")}</div><div id="lqWhy"></div>`;
  $("bxMain").querySelectorAll("[data-lq]").forEach(b=>b.onclick=()=>{ const n=+b.dataset.lq;
    if(n===q[3]){ b.classList.add("right"); if(LQ.first){ LQ.right++; S.gelt=(S.gelt||0)+1; save() } sfx.right(LQ.right%7);
      $("bxMain").querySelectorAll("[data-lq]").forEach(x=>x.onclick=null);
      $("lqWhy").innerHTML=`<div class="bz-fb ok"><b>Right!</b><p class="why" style="margin:0">${q[4]}</p><button class="btn gold" id="lqNext" type="button" style="align-self:flex-end">Next →</button></div>`;
      $("lqNext").onclick=()=>{ LQ.i++; LQ.first=true; law(); toTop() } }
    else { LQ.first=false; b.classList.add("wrong"); b.onclick=null; sfx.wrong() } }) }

/* ---------- 4. The ma'amar trainer (the family types or pastes the text from their own sefer) ---------- */
S.bm.m=S.bm.m||{text:"",got:{},mode:"read"};
const secs=()=>{ const t=(S.bm.m.text||"").replace(/\r/g,"").trim(); if(!t) return [];
  let parts=t.split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
  if(parts.length<3) parts=t.split(/(?<=[.:;!?׃])\s+/).map(x=>x.trim()).filter(Boolean);
  const out=[]; parts.forEach(p=>{ const w=p.split(/\s+/); for(let i=0;i<w.length;i+=45) out.push(w.slice(i,i+45).join(" ")) }); return out };
function mProgress(){ const s=secs(); return s.length?s.filter((_,i)=>S.bm.m.got[i]).length/s.length:0 }
const hide=(t,mode)=>mode==="first"?t.split(/\s+/).map(w=>{ const m=w.match(/^([^֑-ׇ]?)([֑-ׇ]*)/); return `<span class="mfl">${w.charAt(0)}</span>` }).join(" "):mode==="hide"?t.replace(/[^\s]/g,"•").replace(/•+/g,m=>`<span class="mdot">${"•".repeat(Math.min(6,m.length))}</span>`):esc(t);
let MO={editing:false,open:-1};
function maamar(){ const s=secs(), m=S.bm.m, n=s.filter((_,i)=>m.got[i]).length, left=daysLeft();
  if(!s.length||MO.editing){
    $("bxMain").innerHTML=buddy(`In Chabad, a Bar Mitzvah bochur says a <b>ma'amar of Chassidus</b> by heart at his Bar Mitzvah, usually <b>“Isa B'Midrash Tillim.”</b> Ask your rabbi or teacher which one. Then <b>type or paste it from your own sefer</b> below, and I'll help you memorize it, a little at a time.`)+
     `<label class="rplab">The ma'amar text (from your sefer)<textarea id="mText" rows="10" dir="auto" placeholder="Paste or type the ma'amar here. Leave an empty line between sections.">${esc(m.text||"")}</textarea></label>
     <p class="chsmall">Tip: leave an <b>empty line</b> between sections, so each one is a nice size to learn. Long sections are split for you automatically.</p>
     <div class="row" style="justify-content:center"><button class="btn gold big" id="mSave" type="button">Save and start ▶</button>${s.length?`<button class="btn ghost" id="mCancel" type="button">Cancel</button>`:""}</div>`;
    $("mSave").onclick=()=>{ const v=$("mText").value; if(v.trim()!==(m.text||"").trim()) m.got={}; m.text=v; MO.editing=false; save(); sfx.pop(); maamar() };
    const c=$("mCancel"); if(c) c.onclick=()=>{ MO.editing=false; maamar() }; return }
  const perDay=left&&left>0?Math.max(1,Math.ceil((s.length-n)/Math.max(1,left-14))):null;
  $("bxMain").innerHTML=buddy(n===s.length?`You know <b>the whole ma'amar</b>! 🎉 Say it to a parent or teacher without looking.`:`You know <b>${n} of ${s.length}</b> sections.${perDay?` To finish two weeks before your Bar Mitzvah, learn about <b>${perDay} section${perDay>1?"s":""} a day</b>.`:""}`)+
   `<div class="gbar" style="height:12px"><i style="width:${Math.round(n/s.length*100)}%"></i></div>
   <div class="ftabs">${[["read","📖 Read"],["first","🔤 First letters"],["hide","🙈 Hidden"]].map(([k,t])=>`<button class="ftab" type="button" data-mm="${k}" aria-selected="${m.mode===k}">${t}</button>`).join("")}</div>
   <p class="chsmall" style="text-align:center;margin:0">${m.mode==="read"?"Read each section a few times, out loud.":m.mode==="first"?"Only the first letter of each word. Can you say the whole section?":"Say the section by heart, then tap it to check yourself."}</p>
   <div class="mlist">${s.map((t,i)=>{ const show=m.mode==="read"||MO.open===i; return `<div class="msec${m.got[i]?" ok":""}"><div class="mhd"><b>Section ${i+1}</b><button class="mgot" type="button" data-mg="${i}">${m.got[i]?"✓ I know it":"I know it"}</button></div>
     <div class="mtxt" dir="rtl" lang="he" data-mo="${i}">${show?esc(t):hide(t,m.mode)}</div>${voiceOn()?`<button class="fg-go" type="button" data-ms="${i}">🔊 Hear it</button>`:""}</div>` }).join("")}</div>
   <button class="btn ghost" id="mEdit" type="button" style="align-self:center">✏️ Change the text</button>`;
  $("bxMain").querySelectorAll("[data-mm]").forEach(b=>b.onclick=()=>{ sfx.tick(); m.mode=b.dataset.mm; MO.open=-1; save(); maamar() });
  $("bxMain").querySelectorAll("[data-mo]").forEach(b=>b.onclick=()=>{ if(m.mode==="read") return; sfx.tick(); MO.open=MO.open===+b.dataset.mo?-1:+b.dataset.mo; const y=scrollY; maamar(); scrollTo(0,y) });
  $("bxMain").querySelectorAll("[data-mg]").forEach(b=>b.onclick=()=>{ const i=+b.dataset.mg; if(m.got[i]) delete m.got[i]; else { m.got[i]=true; S.gelt=(S.gelt||0)+1; sfx.right(3); toast("+1 gelt") }
    save(); if(mProgress()>=1) done("maamar"); const y=scrollY; maamar(); scrollTo(0,y) });
  $("bxMain").querySelectorAll("[data-ms]").forEach(b=>b.onclick=()=>{ sfx.tick(); speakPhrase(s[+b.dataset.ms]) });
  $("mEdit").onclick=()=>{ MO.editing=true; maamar() } }

/* ---------- 5. Speech builder ---------- */
S.bm.sp=S.bm.sp||{};
const SP=[["open","Start with thanks","Thank Hashem, your parents, and everyone who came.","Thank you to Hashem for bringing me to this day, and thank you to my parents and to all of you for coming."],
 ["parsha","Your parsha","Which parsha is read at your Bar Mitzvah, and what happens in it? (2 or 3 sentences)",""],
 ["q","A question","Something in the parsha that made you wonder. Rashi often asks great questions!",""],
 ["a","The answer","An answer from Rashi, the Midrash, Chassidus or the Rebbe. Ask your teacher for help.",""],
 ["lesson","The lesson for me","What does this teach you, now that you're Bar Mitzvah?",""],
 ["hach","A good resolution","One mitzvah you'll take on or do better from now on (a hachlata).","With Hashem's help, from today on I will "],
 ["thanks","Final thanks","Your rabbi, teachers, grandparents, family and friends.","Thank you to my teachers and my rabbi, to my grandparents, and to my whole family. May we all greet Moshiach very soon!"]];
let SPT=null;
function speech(){ const sp=S.bm.sp, full=SP.map(([k,,,dflt])=>(sp[k]||"").trim()).filter(Boolean).join("\n\n"), words=full.split(/\s+/).filter(Boolean).length, mins=Math.max(1,Math.round(words/120));
  const pa=$("paHomeT");
  $("bxMain").innerHTML=buddy(`Let's write your speech together, one part at a time. Keep it short and from the heart. <b>Show it to your teacher</b> before the big day.`)+
   SP.map(([k,t,help,dflt],i)=>`<div class="spbox"><label for="sp_${k}"><b>${i+1}. ${t}</b><small>${help}${k==="parsha"&&S.bm.date?" (Check “My Bar Mitzvah Parsha” for yours.)":""}</small></label>
     <textarea id="sp_${k}" data-sp="${k}" rows="${k==="open"||k==="thanks"?2:3}">${esc(sp[k]!=null?sp[k]:dflt)}</textarea></div>`).join("")+
   `<div class="mzhud"><div><b>${words}</b><span>words</span></div><div><b>~${mins} min</b><span>to say it</span></div><div><b id="spClock">0:00</b><span>practice timer</span></div></div>
   <div class="row" style="justify-content:center;flex-wrap:wrap"><button class="btn gold" id="spPrac" type="button">⏱️ Practice out loud</button><button class="btn" id="spCopy" type="button">📋 Copy my speech</button></div>`;
  const count=()=>{ const w=SP.map(([k])=>(sp[k]||"").trim()).join(" ").split(/\s+/).filter(Boolean).length, h=$("bxMain").querySelectorAll(".mzhud b"); if(h.length>1){ h[0].textContent=w; h[1].textContent="~"+Math.max(1,Math.round(w/120))+" min" } };
  $("bxMain").querySelectorAll("[data-sp]").forEach(t=>{ if(sp[t.dataset.sp]==null){ sp[t.dataset.sp]=t.value } t.oninput=()=>{ sp[t.dataset.sp]=t.value; save(); count();
    if(SP.every(([k])=>(sp[k]||"").trim().length>3)) done("speech") } });
  save(); count();
  $("spCopy").onclick=async()=>{ const txt=SP.map(([k])=>(sp[k]||"").trim()).filter(Boolean).join("\n\n"); try{ await navigator.clipboard.writeText(txt); toast("Copied! Send it to your teacher.") }catch(e){ toast("Select the text and copy it") } };
  $("spPrac").onclick=()=>{ if(SPT){ clearInterval(SPT.iv); SPT=null; $("spPrac").textContent="⏱️ Practice out loud"; return } const t0=Date.now(); $("spPrac").textContent="■ Stop";
    SPT={iv:setInterval(()=>{ const s=Math.round((Date.now()-t0)/1000), c=$("spClock"); if(!c){ clearInterval(SPT.iv); SPT=null; return } c.textContent=`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}` },500)} } }

/* ---------- 6. Hebrew birthday ---------- */
function bday(){ const age=S.gender==="girl"?12:13;
  const C=[["🙏","Daven with extra feeling","Spend a few extra moments in davening, especially the Shema."],
   ["🪙","Give tzedakah","Before Shacharis and before Mincha, and on Shabbos or Yom Tov, give the day before."],
   ["🎵",`Say your new Tehillim chapter`,`On your ${age===12?"12th":"13th"} Hebrew birthday you start saying <b>chapter ${age+1}</b> of Tehillim every day, the chapter of your new year.`],
   ["📖","Learn extra Torah","Add some learning, and learn something from the Rebbe's teachings."],
   ["📜","An aliyah","Get an aliyah on the Shabbos before your birthday, or on the day itself if the Torah is read."],
   ["🎉","Farbreng with friends","A happy get-together with friends and family, with good resolutions for the new year."],
   ["💭","Think about the year","Look back at the past year, and decide how to grow in the coming one."],
   ["⭐","A new hiddur","Take on one new mitzvah, or a nicer way to do one, from now on."]];
  $("bxMain").innerHTML=buddy(`The Rebbe taught that a <b>Hebrew birthday</b> is a special day, like a personal Rosh Hashanah. Here's how to celebrate it, especially your Bar Mitzvah birthday!`)+
   `<div class="cnfacts">${C.map(c=>`<div><span>${c[0]}</span><p><b>${c[1]}</b><br>${c[2]}</p></div>`).join("")}</div>
   <button class="btn gold big" id="bdOk" type="button" style="align-self:center">${S.bm.bday?"✓ Learned":"I learned the birthday customs! +5 gelt"}</button>`;
  $("bdOk").onclick=()=>{ done("bday"); bday() } }

/* ---------- styles ---------- */
document.head.insertAdjacentHTML("beforeend",`<style>
.bxplan{display:flex;flex-direction:column;gap:8px}
.bxstep{display:grid;grid-template-columns:64px 1fr 30px;gap:10px;align-items:center;text-align:left;background:var(--klaf);border:2px solid var(--rule);border-left:6px solid var(--tech);border-radius:14px;padding:10px 12px;color:var(--ink)}
.bxstep.ok{border-left-color:var(--good);background:color-mix(in srgb,var(--good) 9%,var(--klaf))}.bxstep.late{border-left-color:var(--bad)}
.bxw{font-weight:700;color:var(--gold);font-size:.88rem;text-align:center;line-height:1.2}
.bxt b{display:block;font-family:var(--display);font-weight:400;font-size:1.1rem;color:var(--tech);line-height:1.2}.bxt small{display:block;color:var(--muted);font-size:.86rem;line-height:1.3}
.bxc{font-size:1.2rem;text-align:center}
.tfweek{display:grid;grid-template-columns:repeat(7,1fr);gap:5px}
.tfweek div{display:flex;flex-direction:column;align-items:center;background:var(--klaf);border:2px solid var(--rule);border-radius:12px;padding:6px 0}
.tfweek div.ok{border-color:var(--good);background:color-mix(in srgb,var(--good) 14%,var(--klaf))}.tfweek div.hol{opacity:.75}
.tfweek small{font-size:.72rem;font-weight:700;color:var(--muted)}.tfweek b{font-size:1.2rem;color:var(--good)}
.mlist{display:flex;flex-direction:column;gap:10px}
.msec{background:var(--klaf);border:2px solid var(--rule);border-radius:16px;padding:10px 12px}
.msec.ok{border-color:var(--good)}
.mhd{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px}.mhd b{color:var(--tech)}
.mgot{border:2px solid var(--rule);background:var(--bg);border-radius:999px;padding:5px 12px;font-weight:700;color:var(--tech);font-size:.85rem}
.msec.ok .mgot{background:var(--good);border-color:var(--good);color:#fff}
.mtxt{font-family:var(--he);font-size:1.45rem;line-height:1.9;color:var(--ink);cursor:pointer;word-spacing:.08em}
.mfl{display:inline-block;min-width:.9em;color:var(--tech);font-weight:700}
.mdot{color:var(--rule);letter-spacing:-.05em}
.rplab textarea,.spbox textarea{font:inherit;font-weight:400;padding:10px 12px;border:2px solid var(--rule);border-radius:12px;background:var(--klaf);color:var(--ink);width:100%;box-sizing:border-box;resize:vertical}
.rplab textarea{font-family:var(--he);font-size:1.2rem;line-height:1.7}
.spbox{display:flex;flex-direction:column;gap:6px}
.spbox label b{display:block;font-family:var(--display);font-weight:400;font-size:1.15rem;color:var(--tech)}.spbox label small{display:block;color:var(--muted);font-size:.88rem}
.spbox textarea{font-family:var(--text);font-size:1.05rem;line-height:1.5}
</style>`);
if(typeof BAT_ITEMS!=="undefined"){ const sp=BAT_ITEMS.find(x=>x.k==="spk"); if(sp){ Object.assign(sp,{ic:"🎤",t:"My Speech",d:"Build your d'var Torah step by step, then practice it.",lock:false,go:()=>open("speech")}); sp.k="speech" }
  if(!BAT_ITEMS.find(x=>x.k==="bday")) BAT_ITEMS.splice(Math.max(0,BAT_ITEMS.length-1),0,{k:"bday",ic:"🎂",t:"Your Hebrew Birthday",d:"The Rebbe's birthday customs, and your new Tehillim chapter.",go:()=>open("bday")}) }
window.openBMX=open;
})();
