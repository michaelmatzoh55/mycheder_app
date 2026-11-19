/* ================= CHANUKAH: light the menorah night by night, the brachos, the story and how to celebrate ================= */
(function(){
const sef=()=>S.accent==="sef", prac=()=>false; // prayers are said with Adonai
const tx=s=>{ if(!sef()) return s; try{ return typeof sefNames==="function"?sefNames(swapT(s)):swapT(s) }catch(e){ return s } };
const nameFix=s=>prac()?s.replace(/A-do-n(oi|ai)/g,"Hashem").replace(/E-lo-h/g,"E-lo-k"):s;
const sayOf=(he,say)=>{ let out=say; if(sef()){ try{ const t=typeof toSef==="function"&&toSef(he,say); out=(t&&t.split(" ").length===he.split(" ").length)?t:swapT(say) }catch(e){} } return nameFix(out).split(" ") };
const spk=t=>window.practiceSpeak?window.practiceSpeak(t):t;

/* ---------- Dates: find this year's first night from the Hebrew calendar ---------- */
const hf=(()=>{ try{ return new Intl.DateTimeFormat("en-u-ca-hebrew",{day:"numeric",month:"long"}) }catch(e){ return null } })();
function hparts(d){ try{ const p=hf.formatToParts(new Date(d.getFullYear(),d.getMonth(),d.getDate(),12)); return {day:+p.find(x=>x.type==="day").value,mon:p.find(x=>x.type==="month").value} }catch(e){ return null } }
const day0=d=>new Date(d.getFullYear(),d.getMonth(),d.getDate());
function firstNight(){ // the evening before 25 Kislev; search from 40 days back to 380 days ahead
  const t=day0(new Date()); for(let k=-40;k<380;k++){ const d=new Date(t); d.setDate(d.getDate()+k); const h=hparts(d); if(h&&h.mon==="Kislev"&&h.day===25){ const e=new Date(d); e.setDate(e.getDate()-1); if(k>=-9) return e } } return null }
const FN=hf?firstNight():null;
function nightInfo(){ if(!FN) return null; const t=day0(new Date()), diff=Math.round((t-FN)/864e5); return {diff, night:diff>=0&&diff<8?diff+1:0, date:FN} }
const fmt=d=>d.toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"});

/* ---------- Brachos (Nusach Chabad) ---------- */
const BRACHOS=[
 ["בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם","Bo-ruch a-toh A-do-noi E-lo-hei-nu me-lech ho-o-lom","Blessed|are You|Hashem|our G-d|King of|the world","Every bracha starts this way."],
 ["אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לְהַדְלִיק נֵר חֲנֻכָּה","a-sher ki-d'sho-nu b'mitz-vo-sov v'tzi-vo-nu l'had-lik neir Cha-nu-koh","who|made us holy|with His mitzvos|and commanded us|to light|the light of|Chanukah","Bracha 1, every night: “…who commanded us to light the Chanukah light.”"],
 ["שֶׁעָשָׂה נִסִּים לַאֲבוֹתֵינוּ בַּיָּמִים הָהֵם בִּזְמַן הַזֶּה","she-o-so ni-sim la-a-vo-sei-nu ba-yo-mim ho-heim biz-man ha-zeh","who did|miracles|for our fathers|in those days|those|at this time|this","Bracha 2, every night: “…who did miracles for our fathers in those days, at this time of year.”"],
 ["שֶׁהֶחֱיָנוּ וְקִיְּמָנוּ וְהִגִּיעָנוּ לַזְּמַן הַזֶּה","she-he-che-yo-nu v'ki-y'mo-nu v'hi-gi-o-nu la-z'man ha-zeh","who kept us alive|and sustained us|and brought us|to the time|this","Bracha 3, only the first night: Shehecheyanu!"]
];
function stack(i){ const x=BRACHOS[i], he=x[0].split(" "), so=sayOf(x[0],x[1]), gl=x[2].split("|");
  return `<div class="papsk chb"><div class="papskh" data-noglo><b>${i===0?"Start":"Then say"}</b><span>${esc(x[3])}</span></div>
   <div class="il" dir="rtl">${he.map((w,n)=>`<button class="wc" type="button" data-cbw="${i}:${n}"><span class="h" lang="he">${w}</span><span class="s">${esc(so[n]||"")}</span><span class="g">${esc(gl[n]||"")}</span></button>`).join("")}</div>
   <button class="btn ghost" type="button" data-cball="${i}">🔊 Hear it</button></div>` }

/* ---------- Menorah (straight diagonal branches, as the Rebbe taught from the Rambam's drawing) ---------- */
const X=[34,66,98,130,190,222,254,286]; // 8 lights, left to right; shamash in the middle, higher
function menorah(n,lit,shamLit){ // n candles tonight (on the right); lit = set of lit positions (0..7)
  const cups=X.map((x,i)=>{ const has=i>=8-n, on=lit.has(i);
    return `<g class="mcup${has?" has":""}${on?" on":""}" data-pos="${i}">
      <rect x="${x-9}" y="44" width="18" height="8" rx="3" fill="url(#mg)"/>
      ${has?`<rect x="${x-5}" y="16" width="10" height="28" rx="3" fill="${["#f0f4ff","#ffe4ea","#e8f6ff","#fff3d6"][i%4]}" stroke="#9aa3b5" stroke-width="1"/><path d="M${x} 16 v-4" stroke="#333" stroke-width="1.4"/>`:""}
      ${on?`<g class="mfl"><ellipse cx="${x}" cy="4" rx="6" ry="10" fill="url(#mfo)"/><ellipse cx="${x}" cy="6" rx="2.8" ry="5.5" fill="#fff8d6"/></g>`:""}
      ${has?`<rect x="${x-14}" y="0" width="28" height="52" fill="transparent"/>`:""}</g>` }).join("");
  const arms=X.map(x=>`<path d="M${x} 52 L160 ${118-Math.abs(x-160)*.18}" stroke="url(#mg)" stroke-width="5" stroke-linecap="round"/>`).join("");
  return `<svg class="menorah2" viewBox="0 -14 320 196" aria-label="Menorah with ${n} candles tonight">
   <defs><linearGradient id="mg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="320" y2="0" spreadMethod="reflect" gradientTransform="scale(.1 1)"><stop offset="0" stop-color="#a87618"/><stop offset=".5" stop-color="#ffe29a"/><stop offset="1" stop-color="#a87618"/></linearGradient>
   <radialGradient id="mfo" cx=".5" cy=".7" r=".6"><stop offset="0" stop-color="#fff2b0"/><stop offset=".55" stop-color="#ffb43c"/><stop offset="1" stop-color="#ff7a1a" stop-opacity="0"/></radialGradient></defs>
   ${arms}<path d="M160 30 V168" stroke="url(#mg)" stroke-width="8" stroke-linecap="round"/><path d="M118 172 H202" stroke="url(#mg)" stroke-width="10" stroke-linecap="round"/>
   <path d="M20 52 H300" stroke="url(#mg)" stroke-width="3" opacity=".0"/>
   <g class="mcup has${shamLit?" on":""}" data-pos="sh"><rect x="151" y="22" width="18" height="8" rx="3" fill="url(#mg)"/><rect x="155" y="-6" width="10" height="28" rx="3" fill="#fffbe8" stroke="#9aa3b5"/><path d="M160 -6 v-4" stroke="#333" stroke-width="1.4"/>
    ${shamLit?`<g class="mfl"><ellipse cx="160" cy="-18" rx="6" ry="10" fill="url(#mfo)"/><ellipse cx="160" cy="-16" rx="2.8" ry="5.5" fill="#fff8d6"/></g>`:""}<rect x="146" y="-26" width="28" height="56" fill="transparent"/></g>
   ${cups}</svg>` }

/* ---------- Screen ---------- */
S.chan=S.chan||{};
const yr=()=>FN?FN.getFullYear():new Date().getFullYear();
const litNights=()=>S.chan[yr()]=S.chan[yr()]||{};
VIEWS.push("chan");
$("party").insertAdjacentHTML("beforebegin",`<div class="wrap" id="chan" hidden>
  <div class="toprow"><button class="back" id="cnBk" type="button">← Home</button></div>
  <div class="phead"><div class="he" lang="he">חֲנֻכָּה</div><h2>Chanukah</h2><p class="when" id="cnWhen"></p></div>
  <div class="ftabs" role="tablist" id="cnTabs"></div>
  <div id="cnMain" style="display:flex;flex-direction:column;gap:14px"></div>
</div>`);
let TAB="light", G=null;
const TABS=[["light","🕎 Light"],["brachos","📜 Brachos"],["story","📖 The Story"],["how","✨ Celebrate"]];
function openChanukah(t){ stopPlay(); window._fromBM=false; showOnly("chan"); if(t) TAB=t; G=null; render(); document.querySelectorAll("[data-nav]").forEach(b=>b.removeAttribute("aria-current")) }
$("cnBk").onclick=()=>{ sfx.tick(); $("chan").hidden=true; goHome() };
document.addEventListener("click",e=>{ if(e.target.closest("[data-nav],#openAbc,#openWords,#openBlitz,#openBM,#openPa,#openHol,#openSages,#openFacts,#openChal,#openMitz,#openChit,#openChs,#openShop,.pitem")&&!e.target.closest("#chan")) $("chan").hidden=true },true);
function render(){ const ni=nightInfo();
  $("cnWhen").innerHTML=!ni?"The Festival of Lights":ni.night?`Tonight is the <b>${["","1st","2nd","3rd","4th","5th","6th","7th","8th"][ni.night]} night</b> of Chanukah!`:ni.diff<0?`Chanukah starts <b>${fmt(ni.date)}</b> at night, in ${-ni.diff} day${ni.diff===-1?"":"s"}!`:"Chanukah is over for this year. See you next year!";
  $("cnTabs").innerHTML=TABS.map(([k,n])=>`<button class="ftab" type="button" role="tab" data-cnt="${k}" aria-selected="${k===TAB}">${n}</button>`).join("");
  $("cnTabs").querySelectorAll("[data-cnt]").forEach(b=>b.onclick=()=>{ sfx.tick(); TAB=b.dataset.cnt; G=null; render() });
  ({light:renderLight,brachos:renderBrachos,story:renderStory,how:renderHow})[TAB]() }

/* --- Light: practice lighting in the right order, and mark tonight as lit --- */
function renderLight(){ const ni=nightInfo(), tonight=ni&&ni.night?ni.night:0;
  if(!G) G={n:tonight||1,lit:new Set(),sham:false,done:false,mistakes:0};
  const n=G.n, ln=litNights(), order=[...Array(n)].map((_,k)=>8-n+k); // newest (leftmost) first
  const next=G.sham?order.find(p=>!G.lit.has(p)):"sh";
  $("cnMain").innerHTML=`<div class="buddy compact"><span class="ywrap">${yossi(G.done?"cheer":"")}</span><div class="bubble"><span class="name">Shlomo</span>${
    G.done?`Beautiful! You lit <b>${n} candle${n>1?"s":""}</b> the right way. Now sing, and watch the lights for half an hour! 🎶`
    :!G.sham?`Night <b>${n}</b>: we put <b>${n} candle${n>1?"s":""}</b> in the menorah, starting from the <b>right</b>. First, tap the <b>shamash</b> (the helper candle) to light it.`
    :`Now say the brachos, then light the <b>newest candle first</b>, the one on the <b>left</b>, and move to the right. Tap the next candle!`}</div></div>
   <div class="nights">${[1,2,3,4,5,6,7,8].map(k=>`<button class="nt${k===n?" on":""}${ln[k]?" got":""}" type="button" data-nt="${k}">${k}${ln[k]?"✓":""}</button>`).join("")}</div>
   <div class="mstage${G.done?" glow":""}" id="mStage">${menorah(n,G.lit,G.sham)}</div>
   <div class="mhint" id="mHint">${G.done?"🕎 Chag Urim Sameach!":G.sham?`Tap candle ${G.lit.size+1} of ${n}`:"Tap the shamash in the middle"}</div>
   ${G.done?`<div class="row" style="justify-content:center;flex-wrap:wrap">${tonight===n&&!ln[n]?`<button class="btn gold big" id="mDone" type="button">✓ We lit tonight's candles! +3 gelt</button>`:""}<button class="btn ghost" id="mAgain" type="button">↻ Practice again</button></div>`:""}
   ${tonight?"":`<p class="note">You can practice any night now. During Chanukah, you'll be able to mark each night after your family lights.</p>`}
   <div class="cnfacts"><div><span>🚪</span><p>In Chabad, the menorah stands in the <b>doorway</b>, on the <b>left</b> side, across from the mezuzah, so we're surrounded by mitzvos.</p></div>
    <div><span>🌇</span><p>Light right <b>after sunset</b>. The lights should burn for at least <b>half an hour</b> after dark.</p></div>
    <div><span>🕯️</span><p><b>Friday:</b> light the menorah <b>before</b> Shabbos candles, with bigger candles that last. <b>Motzei Shabbos:</b> at home, after Havdalah.</p></div>
    <div><span>🙅</span><p>The Chanukah lights are only for <b>looking at</b>, not for reading or working by. That's why we have the shamash!</p></div></div>`;
  $("cnMain").querySelectorAll("[data-nt]").forEach(b=>b.onclick=()=>{ sfx.tick(); G={n:+b.dataset.nt,lit:new Set(),sham:false,done:false,mistakes:0}; renderLight() });
  $("mStage").querySelectorAll(".mcup.has").forEach(c=>c.onclick=()=>{ if(G.done) return; const pos=c.dataset.pos;
    if(String(next)===pos){ if(pos==="sh") G.sham=true; else G.lit.add(+pos); sfx.right(G.lit.size%7); if(G.lit.size===n){ G.done=true; setTimeout(()=>{ party(false); try{ sfx.klezmer() }catch(e){} },200) } renderLight() }
    else { G.mistakes++; sfx.wrong(); $("mHint").innerHTML=pos==="sh"?"The shamash is already lit. Now the candles!":!G.sham?"First light the <b>shamash</b> in the middle!":"Not that one. Light the <b>newest</b> candle first: the one furthest to the <b>left</b>, then move right."; c.classList.remove("shake"); void c.getBoundingClientRect(); c.classList.add("shake") } });
  const d=$("mDone"); if(d) d.onclick=()=>{ ln[n]=true; S.gelt=(S.gelt||0)+3; save(); party(true); try{ sfx.coin() }catch(e){} toast(`Night ${n} lit! +3 gelt 🕎`); paintCnHome(); renderLight() };
  const a=$("mAgain"); if(a) a.onclick=()=>{ G={n,lit:new Set(),sham:false,done:false,mistakes:0}; renderLight() } }

/* --- Brachos --- */
function renderBrachos(){ const ni=nightInfo();
  $("cnMain").innerHTML=`<div class="buddy compact"><span class="ywrap">${yossi()}</span><div class="bubble"><span class="name">Shlomo</span>Light the shamash, hold it, and say the brachos. Then light! On the <b>first night</b> we add a third bracha, Shehecheyanu.${prac()?" (Practice mode is on, so we say “Hashem.”)":""}</div></div>
   ${stack(0)}${stack(1)}${stack(2)}${stack(3)}
   <p class="note">After lighting, many say <b>Haneiros Halalu</b> from the siddur, and sing happy Chanukah songs.</p>
   ${S.chan.brachos?"":`<button class="btn gold big" id="cnBr" type="button" style="align-self:center">I learned the brachos! +2 gelt ✓</button>`}`;
  $("cnMain").querySelectorAll("[data-cbw]").forEach(b=>b.onclick=()=>{ const [i,n]=b.dataset.cbw.split(":").map(Number); sfx.tick(); b.parentNode.querySelectorAll(".wc.on").forEach(y=>y.classList.remove("on")); b.classList.add("on"); speakPhrase(spk(BRACHOS[i][0].split(" ")[n])) });
  $("cnMain").querySelectorAll("[data-cball]").forEach(b=>b.onclick=()=>{ sfx.tick(); speakPhrase(spk(BRACHOS[+b.dataset.cball][0])) });
  const g=$("cnBr"); if(g) g.onclick=()=>{ S.chan.brachos=true; S.gelt=(S.gelt||0)+2; save(); party(false); try{ sfx.coin() }catch(e){} toast("Brachos learned! +2 gelt"); renderBrachos() } }

/* --- Story --- */
const STORY=[
 ["🏛️","About 2,200 years ago, the <b>Greeks</b> ruled Eretz Yisroel. Their king, Antiochus, wanted the Jews to stop keeping the Torah: no Shabbos, no learning Torah, no bris."],
 ["🗡️","They made the Beis Hamikdash <b>tamei</b> (impure) and put idols inside. Many Jews were afraid, but some stood strong."],
 ["🛡️","Matisyahu the Kohen and his five sons, the <b>Maccabees</b>, said: “Whoever is for Hashem, come with me!” A small group of Jews fought the huge Greek army."],
 ["✨","With Hashem's help, <b>the few beat the many</b>, and the weak beat the strong! They took back Yerushalayim and cleaned the Beis Hamikdash."],
 ["🫒","They wanted to light the Menorah, but found only <b>one small jar of pure oil</b> with the Kohen Gadol's seal, enough for just one day."],
 ["🕎","A miracle! The oil burned for <b>eight days</b>, until new pure oil was made. That's why we light for eight nights."],
 ["💡","The Rebbe taught: each night we add <b>one more light</b>. It's not enough to stay the same. Every day, add more goodness and light, and a little light pushes away a lot of darkness!"]];
function renderStory(){ $("cnMain").innerHTML=`<div class="cnstory">${STORY.map((s,i)=>`<div class="cns"><span class="n">${s[0]}</span><p>${tx(s[1])}</p></div>`).join("")}</div>`+
  `<div class="papsk"><div class="papskh" data-noglo><b>🎲 The dreidel letters</b><span>${sef()?"In Eretz Yisroel":"Outside Eretz Yisroel"}</span></div><p class="papsken" style="font-style:normal"><span lang="he" style="font-family:var(--he);font-weight:700;font-size:1.5rem;color:var(--tech)">נֵס גָּדוֹל הָיָה ${sef()?"פֹּה":"שָׁם"}</span><br>A great miracle happened ${sef()?"here":"there"}!</p>${window.openShop?`<button class="btn" id="cnDr" type="button" style="align-self:center">🎲 Spin the dreidel</button>`:""}</div>`;
  const d=$("cnDr"); if(d) d.onclick=()=>{ sfx.pop(); $("chan").hidden=true; window.openShop("dr") } }

/* --- Celebrate --- */
function renderHow(){ const W=[
  ["🕎","Help others light","Chabad sets up big public menorahs everywhere, so every Jew can see the light. Bring a friend or neighbor to a menorah lighting, or give someone a menorah!"],
  ["🪙","Chanukah gelt","Parents give children gelt, and children give some to tzedakah. Many families give extra tzedakah each night of Chanukah."],
  ["🥔","Foods with oil","We eat latkes and sufganiyos (doughnuts) to remember the miracle of the oil."],
  ["🙏","Al Hanissim and Hallel","In davening and in Birkas Hamazon we add <b>Al Hanissim</b>, thanking Hashem for the miracles, and we say <b>Hallel</b> every morning of Chanukah."],
  ["📖","Learn more Torah","The Greeks wanted us to forget the Torah, so on Chanukah we learn even more!"],
  ["👀","Watch the lights","Sit near the menorah for the first half hour. Tell Chanukah stories and sing together."]];
  $("cnMain").innerHTML=`<div class="cnfacts">${W.map(w=>`<div><span>${w[0]}</span><p><b>${w[1]}</b><br>${tx(w[2])}</p></div>`).join("")}</div>` }

/* ---------- Home card: near the top from Rosh Chodesh Kislev through Chanukah ---------- */
function season(){ const ni=nightInfo(); return ni&&ni.diff>=-25&&ni.diff<8 }
const anchor=season()&&$("hY")?$("hY").closest(".buddy"):($("openHol")||$("openPa"));
anchor.insertAdjacentHTML("afterend",`<button class="blitzcard cncard" id="openChan" type="button"><span class="em" aria-hidden="true">🕎</span>
  <span><b>Chanukah</b><span id="cnHomeS">Light the menorah, learn the brachos and the story!</span></span><span class="bzs" id="cnHomeR"></span></button>`);
$("openChan").onclick=()=>{ sfx.pop(); openChanukah() };
function paintCnHome(){ const s=$("cnHomeS"), r=$("cnHomeR"); if(!s) return; const ni=nightInfo();
  if(ni&&ni.night){ s.innerHTML=`Tonight is night <b>${ni.night}</b>! Light ${ni.night+1} candles (with the shamash).`; r.textContent=litNights()[ni.night]?"✓ Lit tonight":"" }
  else if(ni&&ni.diff<0&&ni.diff>=-25){ s.innerHTML=`Chanukah starts in <b>${-ni.diff} day${ni.diff===-1?"":"s"}</b>! Practice lighting now.`; r.textContent="" }
  else { s.textContent="Light the menorah, learn the brachos and the story!"; r.textContent="" } }
const _rH=renderHome; renderHome=function(){ _rH(); paintCnHome() };

document.head.insertAdjacentHTML("beforeend",`<style>
.nights{display:grid;grid-template-columns:repeat(8,1fr);gap:5px}
.nt{border:2px solid var(--rule);background:var(--klaf);border-radius:10px;padding:7px 0;font-weight:700;color:var(--tech);font-size:.95rem}
.nt.on{background:var(--tech);border-color:var(--tech);color:#fff}.nt.got{border-color:var(--good)}.nt.got:not(.on){color:var(--good)}
.mstage{background:radial-gradient(ellipse at 50% 30%,#22386f,#0b1530 80%);border:3px solid var(--gold-hi);border-radius:22px;padding:24px 10px 8px;transition:box-shadow .4s}
.mstage.glow{box-shadow:0 0 30px rgba(255,190,80,.55)}
.menorah2{width:100%;height:auto;display:block;overflow:visible}
.menorah2 .mcup.has{cursor:pointer}
.menorah2 .mcup.shake{animation:shake .35s}
.mfl{transform-box:fill-box;transform-origin:50% 100%;animation:flick 1.3s ease-in-out infinite}
.mhint{text-align:center;font-weight:700;color:var(--tech);min-height:1.4em;font-size:1.02rem}
.cnfacts{display:flex;flex-direction:column;gap:8px}
.cnfacts div{display:grid;grid-template-columns:40px 1fr;gap:10px;align-items:center;background:var(--klaf);border:2px solid var(--rule);border-radius:14px;padding:10px 12px}
.cnfacts span{font-size:1.7rem;text-align:center}.cnfacts p{margin:0;font-family:var(--text);font-size:1.04rem;line-height:1.45}.cnfacts b{color:var(--tech)}
.cnstory{display:flex;flex-direction:column;gap:8px}
.cns{display:grid;grid-template-columns:44px 1fr;gap:10px;align-items:center;background:var(--klaf);border:2px solid var(--rule);border-left:5px solid var(--gold-hi);border-radius:14px;padding:10px 12px}
.cns .n{font-size:1.8rem;text-align:center}.cns p{margin:0;font-family:var(--text);font-size:1.06rem;line-height:1.5}.cns b{color:var(--tech)}
.chb .il{justify-content:center}.chb .wc{border:1.5px solid transparent;background:none;cursor:pointer;font:inherit;color:inherit}.chb .wc.on{background:color-mix(in srgb,var(--gold-hi) 32%,transparent);border-color:var(--gold-hi)}.chb .btn{align-self:center}
</style>`);
window.openChanukah=openChanukah; paintCnHome(); if(location.hash==="#chanukah") openChanukah();
})();
