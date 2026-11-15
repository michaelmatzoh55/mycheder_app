/* ================= FIRST 100 HEBREW WORDS (Rosetta Stone style: picture + sound, no English needed) ================= */
(function(){
// Each group: [key, english name, hebrew name, picture, words]
// Each word: [hebrew, sound-out, english, picture, girl hebrew?, girl sound-out?]
const W100=[
 ["hello","Hello & Thank You","שָׁלוֹם וְתוֹדָה","👋",[
  ["שָׁלוֹם","sha-LOM","hello","👋"],["תּוֹדָה","to-DAH","thank you","🎁"],["בְּבַקָּשָׁה","be-va-ka-SHAH","please","🥺"],
  ["כֵּן","KEN","yes","✅"],["לֹא","LO","no","❌"],["בֹּקֶר טוֹב","BO-ker TOV","good morning","🌅"],
  ["לַיְלָה טוֹב","LAI-la TOV","good night","😴"],["סְלִיחָה","sli-CHAH","sorry","🙇"],["מָה נִשְׁמָע","mah nish-MA","what's up?","🙂"],
  ["לְהִתְרָאוֹת","le-hit-ra-OT","see you later","🖐️"]]],
 ["family","Family","מִשְׁפָּחָה","👨‍👩‍👧",[
  ["אַבָּא","AB-ba","dad","👨"],["אִמָּא","IM-ma","mom","👩"],["סַבָּא","SAB-ba","grandpa","👴"],["סַבְתָּא","SAV-ta","grandma","👵"],
  ["אָח","ACH","brother","👦"],["אָחוֹת","a-CHOT","sister","👧"],["תִּינוֹק","ti-NOK","baby","👶"],["יֶלֶד","YE-led","boy","🧒"],
  ["יַלְדָּה","yal-DAH","girl","🎀"],["מִשְׁפָּחָה","mish-pa-CHAH","family","👨‍👩‍👧‍👦"]]],
 ["body","My Body","הַגּוּף","🙂",[
  ["רֹאשׁ","ROSH","head","👤"],["עַיִן","A-yin","eye","👁️"],["אֹזֶן","O-zen","ear","👂"],["אַף","AF","nose","👃"],
  ["פֶּה","PEH","mouth","👄"],["יָד","YAD","hand","✋"],["רֶגֶל","RE-gel","foot","🦶"],["לֵב","LEV","heart","❤️"],
  ["שֵׂעָר","se-AR","hair","💇"],["שִׁנַּיִם","shi-NA-yim","teeth","🦷"]]],
 ["food","Food","אֹכֶל","🍎",[
  ["לֶחֶם","LE-chem","bread","🍞"],["מַיִם","MA-yim","water","💧"],["חָלָב","cha-LAV","milk","🥛"],["תַּפּוּחַ","ta-PU-ach","apple","🍎"],
  ["בָּנָנָה","ba-NA-na","banana","🍌"],["גְּבִינָה","gvi-NAH","cheese","🧀"],["בֵּיצָה","bei-TZAH","egg","🥚"],["עוּגָה","u-GAH","cake","🍰"],
  ["דָּג","DAG","fish","🐟"],["גְּלִידָה","gli-DAH","ice cream","🍦"]]],
 ["home","At Home","בַּבַּיִת","🏠",[
  ["בַּיִת","BA-yit","house","🏠"],["דֶּלֶת","DE-let","door","🚪"],["חַלּוֹן","cha-LON","window","🪟"],["שֻׁלְחָן","shul-CHAN","table","🍽️"],
  ["כִּסֵּא","ki-SEH","chair","🪑"],["מִטָּה","mi-TAH","bed","🛏️"],["סֵפֶר","SE-fer","book","📖"],["כּוֹס","KOS","cup","🥤"],
  ["מַפְתֵּחַ","maf-TE-ach","key","🔑"],["אוֹר","OR","light","💡"]]],
 ["animals","Animals","חַיּוֹת","🦁",[
  ["כֶּלֶב","KE-lev","dog","🐕"],["חָתוּל","cha-TUL","cat","🐈"],["סוּס","SUS","horse","🐎"],["פָּרָה","pa-RAH","cow","🐄"],
  ["צִפּוֹר","tzi-POR","bird","🐦"],["אַרְיֵה","ar-YEH","lion","🦁"],["דֹּב","DOV","bear","🐻"],["קוֹף","KOF","monkey","🐒"],
  ["פִּיל","PIL","elephant","🐘"],["כֶּבֶשׂ","KE-ves","sheep","🐑"]]],
 ["colors","Colors","צְבָעִים","🎨",[
  ["אָדֹם","a-DOM","red","🔴"],["כָּחֹל","ka-CHOL","blue","🔵"],["צָהֹב","tza-HOV","yellow","🟡"],["יָרֹק","ya-ROK","green","🟢"],
  ["לָבָן","la-VAN","white","⚪"],["שָׁחֹר","sha-CHOR","black","⚫"],["כָּתֹם","ka-TOM","orange","🟠"],["סָגֹל","sa-GOL","purple","🟣"],
  ["וָרֹד","va-ROD","pink","🩷"],["חוּם","CHUM","brown","🟤"]]],
 ["numbers","Numbers 1 to 10","מִסְפָּרִים","🔢",[
  ["אַחַת","a-CHAT","one","1️⃣"],["שְׁתַּיִם","SHTA-yim","two","2️⃣"],["שָׁלֹשׁ","sha-LOSH","three","3️⃣"],["אַרְבַּע","ar-BA","four","4️⃣"],
  ["חָמֵשׁ","cha-MESH","five","5️⃣"],["שֵׁשׁ","SHESH","six","6️⃣"],["שֶׁבַע","SHE-va","seven","7️⃣"],["שְׁמוֹנֶה","shmo-NEH","eight","8️⃣"],
  ["תֵּשַׁע","TE-sha","nine","9️⃣"],["עֶשֶׂר","E-ser","ten","🔟"]]],
 ["shabbos","Shabbos & Shul","שַׁבָּת וּבֵית כְּנֶסֶת","🕯️",[
  ["שַׁבָּת שָׁלוֹם","sha-BAT sha-LOM","good Shabbos","✨"],["נֵרוֹת","ne-ROT","candles","🕯️"],["חַלָּה","cha-LAH","challah","🥖"],
  ["בֵּית כְּנֶסֶת","beit KNE-set","shul","🕍"],["סִדּוּר","si-DUR","siddur","📘"],["כִּפָּה","ki-PAH","kippah","🧢"],
  ["מִצְוָה","mitz-VAH","mitzvah","💝"],["צְדָקָה","tze-da-KAH","tzedakah","🪙"],["תּוֹרָה","to-RAH","Torah","📜"],["בְּרָכָה","bra-CHAH","blessing","🙌"]]],
 ["feel","Feelings & More","מַרְגִּישִׁים","😄",[
  ["שָׂמֵחַ","sa-ME-ach","happy","😄","שְׂמֵחָה","sme-CHAH"],["עָצוּב","a-TZUV","sad","😢","עֲצוּבָה","a-tzu-VAH"],
  ["גָּדוֹל","ga-DOL","big","🏔️"],["קָטָן","ka-TAN","small","🐜"],["חַם","CHAM","hot","🔥"],["קַר","KAR","cold","🧊"],
  ["יוֹם","YOM","day","☀️"],["לַיְלָה","LAI-la","night","🌙"],["אֲנִי","a-NI","me","🙋"],["אוֹהֵב","o-HEV","love","💕","אוֹהֶבֶת","o-HE-vet"]]]
];
const girl=()=>S.gender==="girl";
const he=w=>girl()&&w[4]?w[4]:w[0], tr=w=>girl()&&w[5]?w[5]:w[1];
const key=(g,i)=>g[0]+"."+i;
VIEWS.push("words"); S.w100=S.w100||{}; S.w100show=S.w100show!==false;
const learned=()=>Object.keys(S.w100).filter(k=>S.w100[k]).length;
const gLearned=g=>g[4].filter((w,i)=>S.w100[key(g,i)]).length;

/* Spoken Hebrew: the device's Hebrew voice, said the way people talk today */
function wSay(t){ try{ if(!voiceOn()) return; speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(t.replace(/[?!.]/g,"")); u.voice=HEV; u.lang=HEV.lang; u.rate=[.7,.82,.95][S.pace]||.82; KEEP.push(u); if(KEEP.length>20) KEEP.shift(); speechSynthesis.speak(u) }catch(e){} }

/* Home card: right after the Alef-Beis card */
$("openAbc").insertAdjacentHTML("afterend",`<button class="blitzcard wordcard" id="openWords" type="button"><span class="em">💬</span>
  <span><b>First 100 Hebrew Words</b><span>Speak Hebrew! See it, hear it, say it. No English needed.</span></span><span class="bzs" id="wProg"></span></button>`);
$("openWords").onclick=()=>{ sfx.pop(); openWords() };
function paintWHome(){ const n=learned(); if($("wProg")) $("wProg").textContent=n?`${n} of 100 words learned`:"" }

/* Screen */
$("party").insertAdjacentHTML("beforebegin",`<div class="wrap" id="words" hidden>
  <div class="toprow"><button class="back" id="wBack" type="button">← Home</button><button class="back" id="wList" type="button" hidden>All groups</button></div>
  <div class="phead"><div class="he" lang="he">מִלִּים רִאשׁוֹנוֹת</div><h2 id="wH">First 100 Hebrew Words</h2><p class="when" id="wWhen"></p></div>
  <div class="buddy"><span class="ywrap" id="wY"></span><div class="bubble" id="wBubble" aria-live="polite"></div></div>
  <div id="wMain" style="display:flex;flex-direction:column;gap:14px"></div>
</div>`);
$("wBack").onclick=()=>{ sfx.tick(); speechSynthesis&&speechSynthesis.cancel(); $("words").hidden=true; goHome() };
$("wList").onclick=()=>{ sfx.tick(); WV=null; renderW(); toTop() };
document.addEventListener("click",e=>{ if(e.target.closest("[data-nav],#openAbc,#openBlitz,#openBM,#openPa,#openHol,#openSages,.pitem")&&!e.target.closest("#words")) $("words").hidden=true },true);

let WV=null; // {g, mode:"learn"|"quiz", i, q:[], score}
function openWords(gi){ stopPlay(); window._fromBM=false; showOnly("words"); WV=gi>=0?{g:gi,mode:"learn",i:0}:null; renderW();
  document.querySelectorAll("[data-nav]").forEach(b=>b.removeAttribute("aria-current")) }
function renderW(){ $("wY").innerHTML=yossi(); $("wList").hidden=!WV;
  if(!WV) return renderWList();
  if(WV.mode==="quiz") return renderQuiz();
  renderLearn() }

function renderWList(){ $("wH").textContent="First 100 Hebrew Words"; $("wWhen").textContent="Spoken Hebrew, the way kids talk in Eretz Yisrael. 10 groups, 10 words each.";
  $("wMain").innerHTML=`<div class="plist">${W100.map((g,gi)=>{ const n=gLearned(g);
    return `<button class="pitem" type="button" data-wg="${gi}"><span class="wgem">${g[3]}</span>
      <span class="pname"><b>${esc(g[1])}</b><span>${n?`${n} of 10 learned${n===10?" ✓":""}`:"10 words"}</span></span>
      <span class="pright"><span class="he" lang="he">${g[2]}</span></span></button>` }).join("")}</div>`;
  document.querySelectorAll("[data-wg]").forEach(b=>b.onclick=()=>{ sfx.pop(); WV={g:+b.dataset.wg,mode:"learn",i:0}; renderW(); toTop() });
  const nx=W100.findIndex(g=>gLearned(g)<10), n=learned();
  bubble("wBubble",n===100?"You know all 100 words! Kol hakavod! 🎉":n?`You know <b>${n}</b> words already! Let's keep going with <b>${esc(W100[nx][1])}</b>.`:"Let's learn to <b>speak Hebrew</b>! Look at the picture, listen, and say it out loud. Start with <b>Hello & Thank You</b>.") }

/* Learn: one big picture card at a time, like flashcards */
function renderLearn(){ const g=W100[WV.g], w=g[4][WV.i];
  $("wH").textContent=g[1]; $("wWhen").innerHTML=`<span lang="he" class="wsubhe">${g[2]}</span> · word ${WV.i+1} of 10`;
  $("wMain").innerHTML=`<div class="wcard" id="wCard" role="button" tabindex="0" aria-label="Hear it">
      <div class="wpic">${w[3]}</div>
      <div class="whe" lang="he">${he(w)}</div>
      <div class="wtr">${esc(tr(w))}</div>
      <div class="wen${S.w100show?"":" hid"}">${esc(w[2])}</div>
      <div class="wtap">🔊 Tap to hear it again</div>
    </div>
    <div class="wdots">${g[4].map((x,i)=>`<span class="${i===WV.i?"on":""}${S.w100[key(g,i)]?" got":""}"></span>`).join("")}</div>
    <div class="wnav"><button class="btn" id="wPrev" type="button"${WV.i?"":" disabled"}>←</button>
      <button class="btn gold big" id="wNext" type="button">${WV.i<9?"Next word →":"I'm ready! Quiz me ⭐"}</button></div>
    <div class="wrow"><button class="chip${S.w100show?" on":""}" id="wEn" type="button">${S.w100show?"Hide English":"Show English"}</button><button class="chip" id="wQuiz" type="button">⭐ Quiz me now</button></div>`;
  const hear=()=>{ wSay(he(w)); const c=$("wCard"); c.classList.remove("pulse"); void c.offsetWidth; c.classList.add("pulse") };
  $("wCard").onclick=hear; setTimeout(hear,250);
  $("wPrev").onclick=()=>{ sfx.tick(); WV.i--; renderLearn() };
  $("wNext").onclick=()=>{ sfx.tick(); if(WV.i<9){ WV.i++; renderLearn() } else startQuiz() };
  $("wEn").onclick=()=>{ sfx.tick(); S.w100show=!S.w100show; save(); renderLearn() };
  $("wQuiz").onclick=()=>{ sfx.pop(); startQuiz() };
  bubble("wBubble",WV.i===0?`Look at the picture and listen. Then <b>say it out loud</b>: <b>${esc(tr(w))}</b>!`:pick([`Say it with me: <b>${esc(tr(w))}</b>!`,`Your turn! Say <b>${esc(tr(w))}</b>.`,`Listen… <b>${esc(tr(w))}</b>. Now you!`])) }

/* Quiz, Rosetta Stone style: hear the word and tap the right picture, or see the picture and tap the right word */
function startQuiz(){ const g=W100[WV.g]; const order=[...g[4].keys()].sort(()=>Math.random()-.5);
  WV={g:WV.g,mode:"quiz",q:order.map((wi,n)=>({wi,type:n%2?"word":"pic"})),n:0,score:0,miss:false}; renderW(); toTop() }
function renderQuiz(){ const g=W100[WV.g], Q=WV.q[WV.n], w=g[4][Q.wi];
  $("wH").textContent=g[1]; $("wWhen").innerHTML=`Quiz · ${WV.n+1} of ${WV.q.length} · ⭐ ${WV.score}`;
  const others=[...g[4].keys()].filter(i=>i!==Q.wi).sort(()=>Math.random()-.5).slice(0,3), opts=[Q.wi,...others].sort(()=>Math.random()-.5);
  $("wMain").innerHTML=Q.type==="pic"
    ? `<div class="wask"><button class="wplay" id="wPlay" type="button">🔊</button><div class="whe" lang="he">${he(w)}</div><div class="wtr">${esc(tr(w))}</div></div>
       <div class="wopts pics">${opts.map(i=>`<button class="wopt" type="button" data-o="${i}"><span class="wpic">${g[4][i][3]}</span></button>`).join("")}</div>`
    : `<div class="wask"><div class="wpic">${w[3]}</div></div>
       <div class="wopts words">${opts.map(i=>`<button class="wopt" type="button" data-o="${i}"><span class="whe" lang="he">${he(g[4][i])}</span><span class="wtr">${esc(tr(g[4][i]))}</span></button>`).join("")}</div>`;
  if($("wPlay")){ $("wPlay").onclick=()=>wSay(he(w)); setTimeout(()=>wSay(he(w)),250) }
  bubble("wBubble",Q.type==="pic"?"Listen! Which picture is it?":"What's this in Hebrew? Tap the word.");
  WV.miss=false;
  document.querySelectorAll("#wMain [data-o]").forEach(b=>b.onclick=()=>{ const ok=+b.dataset.o===Q.wi;
    if(ok){ b.classList.add("right"); sfx.right(); wSay(he(w)); if(!WV.miss){ WV.score++; S.w100[key(g,Q.wi)]=true; save() }
      document.querySelectorAll("#wMain [data-o]").forEach(x=>x.disabled=true);
      setTimeout(()=>{ WV.n++; if(WV.n<WV.q.length) renderQuiz(); else quizDone() },900) }
    else { b.classList.add("wrong"); b.disabled=true; sfx.wrong(); WV.miss=true; bubble("wBubble",pick(["Almost! Try again.","Not that one. Listen again!","Oops! Try another one."])) } }) }
function quizDone(){ const g=W100[WV.g], s=WV.score, all=gLearned(g)===10;
  if(s>=8){ S.gelt+=s>=10?3:2; save(); party(true); sfx.klezmer() } else sfx.coin();
  $("wWhen").textContent=`Quiz done!`; mood($("wY"),s>=8?"cheer":"think");
  $("wMain").innerHTML=`<div class="wdone"><div class="wbig">${"⭐".repeat(Math.max(1,Math.round(s/10*3)))}</div><b>${s} of 10 right the first time!</b>
    <p>${all?`You learned all 10 <b>${esc(g[1])}</b> words!`:`${gLearned(g)} of 10 words learned. Practice again to get them all!`}</p></div>
    <div class="wnav col">${W100[WV.g+1]?`<button class="btn gold big" id="wNg" type="button">Next: ${esc(W100[WV.g+1][1])} →</button>`:""}
      <button class="btn" id="wAgain" type="button">Practice these again</button><button class="btn ghost" id="wAll" type="button">All groups</button></div>`;
  bubble("wBubble",s>=8?`Yasher koach! +${s>=10?3:2} gelt! You're speaking Hebrew! 🎉`:"Good try! Let's look at the pictures again and try once more.");
  if($("wNg")) $("wNg").onclick=()=>{ sfx.pop(); WV={g:WV.g+1,mode:"learn",i:0}; renderW(); toTop() };
  $("wAgain").onclick=()=>{ sfx.pop(); WV={g:WV.g,mode:"learn",i:0}; renderW(); toTop() };
  $("wAll").onclick=()=>{ sfx.tick(); WV=null; renderW(); toTop() };
  paintWHome() }

document.head.insertAdjacentHTML("beforeend",`<style>
.wordcard .em{animation:none}
.wgem{font-size:2rem;width:46px;text-align:center;line-height:1}
.wsubhe{font-family:var(--he);font-weight:700;color:var(--gold)}
.wcard{display:flex;flex-direction:column;align-items:center;gap:4px;padding:22px 16px 16px;border-radius:22px;cursor:pointer;
  background:linear-gradient(180deg,color-mix(in srgb,var(--gold-hi) 16%,var(--klaf)),var(--klaf));border:2px solid var(--gold-hi);box-shadow:0 6px 0 color-mix(in srgb,var(--gold-hi) 60%,#5a3b05),0 14px 24px -14px rgba(20,32,80,.5)}
.wcard .wpic{font-size:7rem;line-height:1.1;filter:drop-shadow(0 6px 6px rgba(0,0,0,.18))}
.wcard.pulse .wpic{animation:wpop .5s cubic-bezier(.3,1.7,.5,1)}
@keyframes wpop{40%{transform:scale(1.15) rotate(-4deg)}}
.whe{font-family:var(--he);font-weight:700;font-size:2.6rem;color:var(--gold);line-height:1.3;direction:rtl}
.wtr{font-weight:700;font-size:1.3rem;color:var(--tech);letter-spacing:.02em}
.wen{font-family:var(--text);font-style:italic;font-size:1.1rem;color:var(--muted)}.wen.hid{visibility:hidden}
.wtap{font-size:.82rem;font-weight:700;color:var(--muted);margin-top:6px}
.wdots{display:flex;justify-content:center;gap:6px}.wdots span{width:10px;height:10px;border-radius:50%;background:var(--rule)}
.wdots span.got{background:var(--gold-hi)}.wdots span.on{background:var(--tech);transform:scale(1.3)}
.wnav{display:grid;grid-template-columns:auto 1fr;gap:10px}.wnav.col{grid-template-columns:1fr}
.wrow{display:flex;justify-content:center;gap:8px;flex-wrap:wrap}.chip.on{background:var(--tech-soft)}
.wask{display:flex;flex-direction:column;align-items:center;gap:4px;padding:14px;border-radius:20px;background:var(--klaf);border:2px solid var(--gold-hi)}
.wask .wpic{font-size:6.5rem;line-height:1.1}
.wplay{border:0;border-radius:50%;width:58px;height:58px;font-size:1.6rem;background:linear-gradient(180deg,#ffeeb5,#f5cf6b 45%,#dda23a);box-shadow:0 4px 0 #a8741c;cursor:pointer}
.wopts{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.wopt{border:2px solid var(--rule);background:var(--klaf);border-radius:18px;padding:12px 8px;display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;
  box-shadow:0 4px 0 var(--rule);transition:transform .12s}
.wopt:active{transform:translateY(2px)}
.wopts.pics .wpic{font-size:4.2rem;line-height:1.15}
.wopts.words .whe{font-size:1.9rem}.wopts.words .wtr{font-size:1rem}
.wopt.right{border-color:#2c7549;background:color-mix(in srgb,#2c7549 16%,var(--klaf));box-shadow:0 4px 0 #2c7549}
.wopt.wrong{opacity:.4;animation:wshake .35s}
@keyframes wshake{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
.wdone{text-align:center;padding:18px;border-radius:20px;background:var(--klaf);border:2px solid var(--gold-hi);display:flex;flex-direction:column;gap:6px;font-size:1.1rem}
.wdone .wbig{font-size:2.6rem}
</style>`);
const _rH=renderHome; renderHome=function(){ _rH(); paintWHome() };
window.openWords=openWords; paintWHome(); if(location.hash==="#words") openWords();
})();
