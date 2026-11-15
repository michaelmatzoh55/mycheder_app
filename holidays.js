/* ================= JEWISH HOLIDAYS ================= */
(function(){
// key: [ashName, sefName, hebrew, emoji, days, greeting, story steps, what we do, foods, lesson, prayer ids to practice]
const HOL={
 rh:["Rosh Hashanah","Rosh Hashanah","רֹאשׁ הַשָּׁנָה","🍎",2,"Shanah Tovah! / K'sivah v'chasimah tovah",
  ["Rosh Hashanah is the Jewish New Year, the birthday of the world. Actually, it's the birthday of Adam, the first person!","On this day Hashem looks at the whole world and decides what the new year will be like.","We crown Hashem as our King, and the shofar blast is like trumpets at a king's crowning. 👑"],
  ["Hear the shofar blown 100 times in shul","Dip apple in honey for a sweet new year 🍯","Tashlich: say prayers near water with fish"],
  "Apples and honey, round challah, pomegranates, fish head","Hashem is our King, and He loves us. Ask Him for a sweet year!",["shehecheyanu","hagafen","hamotzi"]],
 yk:["Yom Kippur","Yom Kippur","יוֹם כִּפּוּר","🤍",1,"G'mar chasimah tovah!",
  ["Yom Kippur is the holiest day of the year, the Day of Atonement.","After the golden calf, Moshe brought down the second Luchos on Yom Kippur, and Hashem forgave the Jewish people.","Grown-ups fast for 25 hours. Everyone prays and says sorry to Hashem. At the end, a long shofar blast!"],
  ["Say sorry to people before Yom Kippur","Grown-ups fast, and many wear white","Pray in shul, ending with Ne'ilah and one long shofar blast"],
  "A big meal before the fast, and a happy meal after","Hashem always forgives when we say sorry from the heart and try to do better.",[]],
 suk:["Sukkos","Sukkot","סֻכּוֹת","🌿",7,"Gut Yom Tov! / Chag Sameach!",
  ["In the desert, Hashem protected the Jewish people with Clouds of Glory, like a giant hug. ☁️","To remember, we live in a sukkah, a little hut with a roof of branches, for seven days.","It's called “the time of our joy.” In the Beis Hamikdash they danced all night at the Simchas Beis Hashoeivah!"],
  ["Eat (and even sleep!) in the sukkah","Shake the lulav and esrog every day except Shabbos","Celebrate! Chabad has music and dancing every night"],
  "Everything tastes better in the sukkah! Stuffed foods, kreplach","Hashem protects us like a sukkah all around us.",["shehecheyanu","hagafen"]],
 sa:["Shemini Atzeres & Simchas Torah","Shemini Atzeret & Simchat Torah","שְׁמִינִי עֲצֶרֶת","📜",2,"Gut Yom Tov! / Chag Sameach!",
  ["After Sukkos, Hashem says: “Stay with Me one more day!” That's Shemini Atzeres.","The next day is Simchas Torah. We finish reading the whole Torah and start again from Bereishis!","Everyone dances around the bimah with the Torah scrolls: seven hakafos, singing and dancing in circles. 💃🕺"],
  ["Dance with the Torah in seven hakafos","Kids get flags, candy, and a turn under the big tallis","Finish V'zos Habrachah and start Bereishis"],
  "Candy, candy, candy! And a big festive meal","The Torah never ends, and we celebrate it with all our heart and feet!",["hatorah"]],
 yt:["Yud-Tes Kislev","Yud-Tet Kislev","י״ט כִּסְלֵו","📚",1,"L'shanah tovah b'limud haChassidus u'vedarkei haChassidus!",
  ["The Alter Rebbe, the first Chabad Rebbe, was put in jail in Russia because people told lies about him.","On the 19th of Kislev, in the year 1798, he was set free!","It's called the New Year of Chassidus, the day Chassidus could spread everywhere. 🎉"],
  ["Farbrengens: get together, sing niggunim and share stories","Learn some Chassidus, like the Tanya","Make a good resolution for the new year"],
  "Farbrengen treats: l'chaim (grape juice for kids!), cake, and herring","Even in hard times, Hashem's light comes out. Share it with others!",["hagafen","mezonos"]],
 chan:["Chanukah","Chanukah","חֲנֻכָּה","🕎",8,"Happy Chanukah! / Freilichen Chanukah!",
  ["The Greeks ruled Israel and wouldn't let the Jews learn Torah or keep mitzvos.","A small group called the Maccabees fought the big Greek army and won! It was a miracle.","In the Beis Hamikdash they found only one jar of pure oil, enough for one day. It lasted eight days! 🫒"],
  ["Light the menorah each night, adding one candle","Say the brachos: “l'hadlik ner Chanukah”","Play dreidel and give Chanukah gelt"],
  "Latkes and sufganiyot (jelly donuts), fried in oil","A little light pushes away a lot of darkness. Be a light!",["shehecheyanu"]],
 tub:["Tu B'Shvat","Tu Bishvat","ט״וּ בִּשְׁבָט","🌳",1,"Happy Tu B'Shvat!",
  ["Tu B'Shvat is the New Year for trees! 🌳","In Israel, this is when the sap starts rising and trees get ready to make new fruit.","The Torah says a person is like a tree of the field. We grow too!"],
  ["Eat fruits, especially from the seven species of Israel","Try a new fruit and say Shehecheyanu","Plant a tree or a seed"],
  "Dates, figs, grapes, olives, pomegranates, carob","Like a tree, keep growing in Torah and good deeds.",["haetz","shehecheyanu","haadamah"]],
 pur:["Purim","Purim","פּוּרִים","🎭",1,"Freilichen Purim! / Happy Purim!",
  ["Wicked Haman wanted to destroy all the Jews in Persia.","Queen Esther bravely went to King Achashverosh and told him the truth.","Haman's plan flipped upside down, and the Jews were saved! Hashem's name isn't in the Megillah, but He was there all along."],
  ["Hear the Megillah, night and day. Make noise for Haman!","Send mishloach manos: two foods to a friend","Give gifts to two poor people, and eat a festive meal"],
  "Hamantaschen, and lots of treats in mishloach manos","Even when we can't see Hashem, He's always working behind the scenes.",["mezonos","shehakol"]],
 pes:["Pesach","Pesach","פֶּסַח","🍷",8,"Chag kasher v'sameach!",
  ["The Jews were slaves in Egypt, and Pharaoh wouldn't let them go.","Hashem sent ten plagues, and the Jews left Egypt so fast that their bread didn't have time to rise.","Hashem split the sea and the Jews walked through on dry land. We were free!"],
  ["Clean out all the chametz from the house","The Seder: Four Questions, four cups, and the Haggadah","Eat matzah, and maror (bitter herbs)"],
  "Matzah (Chabad eats handmade shmurah matzah), charoses, and no chametz all week","Every day we can go out of our own little “Egypt” and become more free.",["hagafen","shehecheyanu","hamotzi"]],
 lag:["Lag BaOmer","Lag BaOmer","ל״ג בָּעֹמֶר","🔥",1,"Happy Lag BaOmer!",
  ["Lag BaOmer is the 33rd day of counting the Omer.","Rabbi Akiva's students stopped getting sick on this day.","It's also the day of Rabbi Shimon bar Yochai, who taught the deepest secrets of the Torah."],
  ["Big parades and rallies with Jewish kids","Bonfires and outings","Bows and arrows for kids! 🏹"],
  "Barbecues and picnics outside","Show Jewish pride and joy, out in the open for everyone to see!",[]],
 shav:["Shavuos","Shavuot","שָׁבוּעוֹת","⛰️",2,"Gut Yom Tov! / Chag Sameach!",
  ["Seven weeks after leaving Egypt, the Jews camped at Har Sinai.","Hashem gave the Torah and said the Ten Commandments to everyone, with thunder and a shofar blast!","The kids were Hashem's guarantors: He gave the Torah because of the children! 👧👦"],
  ["Everyone, even babies, goes to shul to hear the Ten Commandments","Many stay up all night learning Torah","Decorate with flowers and greenery"],
  "Dairy: cheesecake, blintzes and ice cream","Hashem gave the Torah to every Jew, especially to the children. It's yours!",["hatorah","shehecheyanu"]],
 tba:["Tisha B'Av","Tisha B'Av","תִּשְׁעָה בְּאָב","🕯️",1,"(We don't greet each other on this day)",
  ["Tisha B'Av, the 9th of Av, is the saddest day of the Jewish year.","On this day both the first and the second Beis Hamikdash were destroyed.","But the Sages teach that Moshiach will be born on this day, and it will become a happy holiday!"],
  ["Grown-ups fast and sit low, like when someone is sad","Read Eichah, the book of Lamentations","Be extra kind to others, since the Temple was destroyed because of hatred"],
  "A simple meal before the fast","Doing kindness for no reason helps bring Moshiach!",[]]};
const HCAL="250213,tub,15,Shevat;250314,pur,14,Adar;250413,pes,15,Nissan;250516,lag,18,Iyar;250602,shav,6,Sivan;250803,tba,9,Av;250923,rh,1,Tishrei;251002,yk,10,Tishrei;251007,suk,15,Tishrei;251014,sa,22,Tishrei;251209,yt,19,Kislev;251215,chan,25,Kislev;260202,tub,15,Shevat;260303,pur,14,Adar;260402,pes,15,Nissan;260505,lag,18,Iyar;260522,shav,6,Sivan;260723,tba,9,Av;260912,rh,1,Tishrei;260921,yk,10,Tishrei;260926,suk,15,Tishrei;261003,sa,22,Tishrei;261129,yt,19,Kislev;261205,chan,25,Kislev;270123,tub,15,Shevat;270323,pur,14,Adar 2;270422,pes,15,Nissan;270525,lag,18,Iyar;270611,shav,6,Sivan;270812,tba,9,Av;271002,rh,1,Tishrei;271011,yk,10,Tishrei;271016,suk,15,Tishrei;271023,sa,22,Tishrei;271219,yt,19,Kislev;271225,chan,25,Kislev;280212,tub,15,Shevat;280312,pur,14,Adar;280411,pes,15,Nissan;280514,lag,18,Iyar;280531,shav,6,Sivan;280801,tba,9,Av;280921,rh,1,Tishrei;280930,yk,10,Tishrei;281005,suk,15,Tishrei;281012,sa,22,Tishrei;281207,yt,19,Kislev;281213,chan,25,Kislev;290131,tub,15,Shevat;290301,pur,14,Adar;290331,pes,15,Nissan;290503,lag,18,Iyar;290520,shav,6,Sivan;290722,tba,9,Av;290910,rh,1,Tishrei;290919,yk,10,Tishrei;290924,suk,15,Tishrei;291001,sa,22,Tishrei;291126,yt,19,Kislev;291202,chan,25,Kislev;300119,tub,15,Shevat;300319,pur,14,Adar 2;300418,pes,15,Nissan;300521,lag,18,Iyar;300607,shav,6,Sivan;300808,tba,9,Av;300928,rh,1,Tishrei;301007,yk,10,Tishrei;301012,suk,15,Tishrei;301019,sa,22,Tishrei;301215,yt,19,Kislev;301221,chan,25,Kislev;310208,tub,15,Shevat;310309,pur,14,Adar;310408,pes,15,Nissan;310511,lag,18,Iyar;310528,shav,6,Sivan;310729,tba,9,Av;310918,rh,1,Tishrei;310927,yk,10,Tishrei;311002,suk,15,Tishrei;311009,sa,22,Tishrei;311204,yt,19,Kislev;311210,chan,25,Kislev;320128,tub,15,Shevat;320226,pur,14,Adar;320327,pes,15,Nissan;320429,lag,18,Iyar;320516,shav,6,Sivan;320718,tba,9,Av;320906,rh,1,Tishrei;320915,yk,10,Tishrei;320920,suk,15,Tishrei;320927,sa,22,Tishrei;321122,yt,19,Kislev;321128,chan,25,Kislev".split(";").map(r=>{ const [d,k,hd,hm]=r.split(","); return {d,k,hd,hm} });
VIEWS.push("hol"); S.hol=S.hol||{}; S.hol.read=S.hol.read||{}; S.hol.quiz=S.hol.quiz||{};
const sef=()=>S.accent==="sef", hn=k=>HOL[k][sef()?1:0];
const ymd=dt=>String(dt.getFullYear()%100).padStart(2,"0")+String(dt.getMonth()+1).padStart(2,"0")+String(dt.getDate()).padStart(2,"0");
const hdate=d=>new Date(2000+ +d.slice(0,2),+d.slice(2,4)-1,+d.slice(4,6));
const fmt=(dt,o)=>dt.toLocaleDateString("en-US",o||{weekday:"long",month:"long",day:"numeric"});
function upcoming(){ const t=new Date(); t.setHours(0,0,0,0); const today=ymd(t);
  return HCAL.filter(x=>{ const end=hdate(x.d); end.setDate(end.getDate()+HOL[x.k][4]-1); return ymd(end)>=today }) }
function daysTo(x){ const t=new Date(); t.setHours(0,0,0,0); return Math.round((hdate(x.d)-t)/864e5) }
function when(x){ const n=daysTo(x), last=HOL[x.k][4];
  if(n<=0) return n>-last?`🎉 Happening now! Day ${1-n} of ${last}`:"";
  return n===1?"Starts tonight at sundown!":`In <b>${n}</b> days` }
function eve(x){ const e=hdate(x.d); e.setDate(e.getDate()-1); return e }

/* Home card */
$("openPa").insertAdjacentHTML("afterend",`<button class="blitzcard holcard" id="openHol" type="button"><span class="em" id="holHomeE" aria-hidden="true">🎉</span>
  <span><b id="holHomeT">Jewish Holidays</b><span id="holHomeS">Every holiday: the story, what we do, and the yummy foods.</span></span><span class="bzs" id="holHomeR"></span></button>`);
$("openHol").onclick=()=>{ sfx.pop(); openHol() };
function paintHolHome(){ const u=upcoming()[0]; if(!u||!$("holHomeT")) return; const n=daysTo(u);
  $("holHomeE").textContent=HOL[u.k][3]; $("holHomeT").textContent=n<=0?`${hn(u.k)} is here!`:`Next: ${hn(u.k)}`;
  $("holHomeS").textContent=n<=0?"Tap to learn all about it!":n===1?"Starts tonight at sundown!":`In ${n} days · ${fmt(eve(u),{weekday:"short",month:"short",day:"numeric"})} at sundown`;
  $("holHomeR").textContent=S.hol.read[u.k]?"✓ Learned":"" }

/* Screen */
$("party").insertAdjacentHTML("beforebegin",`<div class="wrap" id="hol" hidden>
  <div class="toprow"><button class="back" id="holBack" type="button">← Home</button><button class="back" id="holList" type="button" hidden>All holidays</button></div>
  <div class="phead"><div class="he" lang="he">חַגִּים וּמוֹעֲדִים</div><h2 id="holH">Jewish Holidays</h2><p class="when" id="holWhen"></p></div>
  <div id="holMain" style="display:flex;flex-direction:column;gap:16px"></div>
  <div class="buddy" id="holBud"><span class="ywrap" id="holY"></span><div class="bubble" id="holBubble" aria-live="polite"></div></div>
  <div class="bmact" id="holAct"></div>
  <footer>Dates are for outside Israel. Every holiday starts at sundown the evening before. Ask your rabbi for the exact times!</footer>
</div>`);
$("holBack").onclick=()=>{ sfx.tick(); $("hol").hidden=true; goHome() };
$("holList").onclick=()=>{ sfx.tick(); HV=null; renderHol(); toTop() };
// Leaving: hide this screen whenever another section is opened
document.addEventListener("click",e=>{ if(e.target.closest("[data-nav],#openAbc,#openBlitz,#openBM,#openPa,.pitem")&&!e.target.closest("#hol")) $("hol").hidden=true },true);
let HV=null;
function openHol(k){ stopPlay(); window._fromBM=false; showOnly("hol"); HV=k?{k,step:0}:null; renderHol();
  document.querySelectorAll("[data-nav]").forEach(b=>b.removeAttribute("aria-current")) }
function renderHol(){ $("holY").innerHTML=yossi(); $("holList").hidden=!HV;
  if(!HV) return renderHolList();
  const k=HV.k, h=HOL[k], x=upcoming().find(y=>y.k===k)||HCAL.find(y=>y.k===k);
  $("holH").textContent=hn(k); $("holWhen").innerHTML=x?`${when(x)?when(x)+" · ":""}Starts ${fmt(eve(x))} at sundown · ${x.hd} ${esc(x.hm)}`:"";
  const steps=h[6];
  $("holMain").innerHTML=`<div class="pabig"><div style="font-size:3.4rem;line-height:1">${h[3]}</div><div class="pahe" lang="he">${h[2]}</div><h3>${esc(hn(k))}</h3>
      <p>${h[4]>1?h[4]+" days":"1 day"} · ${esc(h[5])}</p></div>
    <div class="pasteps">${steps.map((s,i)=>`<div class="pastep"${i>HV.step?" hidden":""}><span class="n">${i+1}</span><span>${esc(s)}</span></div>`).join("")}</div>
    <section class="holdo" id="holDo" ${HV.step<steps.length-1?"hidden":""}><h3>What we do</h3>${h[7].map(t=>`<div>✨ ${esc(t)}</div>`).join("")}<h3>Yummy foods</h3><div>🍽️ ${esc(h[8])}</div>
      ${h[10].length?`<h3>Brachos to practice</h3><div class="chips">${h[10].map(id=>{ const p=BYID[id]; return p?`<button class="chip" type="button" data-hp="${id}">${p.icon||"📖"} ${esc(p.title)}</button>`:"" }).join("")}</div>`:""}</section>`;
  document.querySelectorAll("[data-hp]").forEach(b=>b.onclick=()=>{ $("hol").hidden=true; openPrayer(ALL.findIndex(p=>p.id===b.dataset.hp)) });
  holCoach() }
function renderHolList(){ $("holH").textContent="Jewish Holidays"; $("holWhen").textContent="Tap a holiday to hear its story.";
  const u=upcoming(), seen=new Set(), next=u.filter(x=>!seen.has(x.k)&&seen.add(x.k));
  $("holMain").innerHTML=`<div class="plist">${next.map((x,i)=>`<button class="pitem" type="button" data-hk="${x.k}"><span class="ficon on" aria-hidden="true">${HOL[x.k][3]}</span>
     <span class="pname"><b>${esc(hn(x.k))}</b><span>${when(x)?when(x).replace(/<\/?b>/g,"")+" · ":""}${fmt(hdate(x.d),{month:"short",day:"numeric",year:i>5?"numeric":undefined})}${S.hol.read[x.k]?" · learned ✓":""}</span></span>
     <span class="pright"><span class="he" lang="he">${HOL[x.k][2]}</span></span></button>`).join("")}</div>`;
  document.querySelectorAll("[data-hk]").forEach(b=>b.onclick=()=>{ sfx.pop(); HV={k:b.dataset.hk,step:0}; renderHol(); toTop() });
  const n=next[0]; bubble("holBubble",n?`The next holiday is <b>${esc(hn(n.k))}</b>${daysTo(n)>0?`, in ${daysTo(n)} days`:", and it's happening now"}! Tap it and I'll tell you all about it. ${HOL[n.k][3]}`:"Pick a holiday!");
  $("holAct").innerHTML=Object.keys(S.hol.read).length?`<button class="btn" id="holQz" type="button">🧠 Holiday quiz</button>`:"";
  if($("holQz")) $("holQz").onclick=()=>{ sfx.pop(); HV={k:next[0].k,quiz:{n:0,right:0,used:[]},list:true}; holQuiz() } }
function holCoach(){ const k=HV.k, h=HOL[k], steps=h[6], act=$("holAct");
  if(HV.quiz) return holQuiz();
  if(HV.step<steps.length-1){ bubble("holBubble",HV.step===0?`Let me tell you about <b>${esc(hn(k))}</b>! ${h[3]} Read part 1 with me.`:pick(["And then…","Now here's the amazing part!","Listen to this…"]));
    act.innerHTML=`<button class="btn gold big" id="holNx" type="button">What happened next? →</button>`;
    $("holNx").onclick=()=>{ sfx.tick(); HV.step++; const el=document.querySelectorAll("#holMain .pastep")[HV.step]; if(el){ el.hidden=false; el.scrollIntoView({block:"center",behavior:"smooth"}) }
      if(HV.step>=steps.length-1) $("holDo").hidden=false; holCoach() }; return }
  bubble("holBubble",`<b>Lesson:</b> ${esc(h[9])}`); mood($("holY"),"cheer");
  const done=!!S.hol.read[k];
  act.innerHTML=`${done?"":`<button class="btn gold big" id="holGot" type="button">I learned it! +2 gelt ✓</button>`}<button class="btn${done?" gold big":""}" id="holQz" type="button">🧠 Quiz me</button><button class="btn ghost" id="holAll" type="button">← All holidays</button>`;
  if($("holGot")) $("holGot").onclick=()=>{ S.hol.read[k]=true; S.gelt+=2; save(); party(true); sfx.klezmer(); toast(hn(k)+" learned! +2 gelt"); paintHolHome(); holCoach() };
  $("holQz").onclick=()=>{ sfx.pop(); HV.quiz={n:0,right:0,used:[]}; holQuiz() };
  $("holAll").onclick=()=>{ sfx.tick(); HV=null; renderHol(); toTop() } }
function holQuiz(){ const Q=HV.quiz, act=$("holAct"), keys=Object.keys(HOL);
  if(Q.n>=4){ const st=Q.right>=4?3:Q.right>=3?2:Q.right>=1?1:0; S.hol.quiz[HV.k]=Math.max(S.hol.quiz[HV.k]||0,st); save(); if(st>=2){ party(true); sfx.right(4) }
    bubble("holBubble",`<b>${Q.right} of 4 right!</b> ${"★".repeat(st)+"☆".repeat(3-st)}<br>${st===3?"You're a holiday expert! 🎉":"Nice! Read the story again and try once more."}`);
    act.innerHTML=`<button class="btn gold big" id="holQz" type="button">Play again</button><button class="btn ghost" id="holAll" type="button">← All holidays</button>`;
    $("holQz").onclick=()=>{ HV.quiz={n:0,right:0,used:[]}; holQuiz() }; $("holAll").onclick=()=>{ HV=null; renderHol(); toTop() }; return }
  let k, fact, tries=0; do{ k=Q.n<2&&!HV.list?HV.k:pick(keys); const pool=[...HOL[k][6],...HOL[k][7]]; fact=pick(pool); tries++ } while(Q.used.includes(fact)&&tries<40); Q.used.push(fact);
  const opts=shuffle([k,...shuffle(keys.filter(x=>x!==k)).slice(0,2)]); let first=true;
  bubble("holBubble",`<b>Question ${Q.n+1} of 4.</b> Which holiday is this?<div class="paq">“${esc(fact)}”</div>`);
  act.innerHTML=`<div class="opts">${opts.map(o=>`<button class="opt paopt" type="button" data-o="${o}"><span>${HOL[o][3]} ${esc(hn(o))}</span><span class="h" lang="he">${HOL[o][2]}</span></button>`).join("")}</div>`;
  act.querySelectorAll("[data-o]").forEach(b=>b.onclick=()=>{
    if(b.dataset.o===k){ b.classList.add("right"); sfx.right(Q.n); if(first){ Q.right++; S.gelt++; save(); setTimeout(sfx.coin,150) } mood($("holY"),"cheer");
      act.querySelectorAll("[data-o]").forEach(x=>x.onclick=null); setTimeout(()=>{ Q.n++; holQuiz() },900) }
    else { first=false; b.classList.add("wrong"); b.onclick=null; sfx.wrong(); mood($("holY"),"oy") } }) }
document.head.insertAdjacentHTML("beforeend",`<style>
.holcard{background:linear-gradient(135deg,#ad4034,#e3ad3a 55%,#1d3d8c);box-shadow:0 5px 0 #6e2018}
.holcard b,.holcard .bzs{color:#fff4d6}
[data-acc="sef"] .holcard{background:linear-gradient(135deg,#b03a2e,#e0893a 55%,#0d6b69);box-shadow:0 5px 0 #6e2018}
.holdo{background:var(--klaf);border:2px solid var(--gold-hi);border-radius:18px;padding:12px 16px 16px;display:flex;flex-direction:column;gap:8px;font-family:var(--text);font-size:1.1rem;animation:popin .4s ease-out}
.holdo h3{font-family:var(--say);font-size:.78rem;text-transform:uppercase;letter-spacing:.12em;color:var(--tech);margin-top:6px}
</style>`);
const _rH=renderHome; renderHome=function(){ _rH(); paintHolHome() };
document.addEventListener("click",e=>{ if(e.target.closest("[data-setacc]")) setTimeout(()=>{ paintHolHome(); if(!$("hol").hidden) renderHol() },0) });
window.openHol=openHol; paintHolHome(); if(location.hash==="#holidays") openHol();
})();
