/* ================= EARN & GROW: respect, honest money, compound growth, and mitzvos that grow ================= */
(function(){
// Hebrew sources, word by word: [hebrew, sound-out, meanings |, source, English]
const SRC={
 respect:["אֵיזֶהוּ מְכֻבָּד הַמְכַבֵּד אֶת הַבְּרִיּוֹת","Ei-ze-hu m'chu-bod ha-m'cha-beid es ha-b'ri-yos","Who is|respected?|The one who respects|(the)|people","Pirkei Avos 4:1","Who is respected? The one who respects other people."],
 rich:["אֵיזֶהוּ עָשִׁיר הַשָּׂמֵחַ בְּחֶלְקוֹ","Ei-ze-hu o-shir ha-so-mei-ach b'chel-ko","Who is|rich?|The one who is happy|with his portion","Pirkei Avos 4:1","Who is rich? The one who is happy with what he has."],
 work:["יְגִיעַ כַּפֶּיךָ כִּי תֹאכֵל אַשְׁרֶיךָ","Y'gi-a ka-pe-cho ki so-cheil ash-re-cho","The hard work of|your hands|when|you eat|you are fortunate","Tehillim 128:2","When you eat from the work of your own hands, you are fortunate."],
 split:["יְשַׁלֵּשׁ אָדָם אֶת מְעוֹתָיו","Y'sha-leish o-dom es m'o-sov","Should divide in three|a person|(the)|his money","Gemara, Bava Metzia 42a","A person should split his money into three parts."],
 fruit:["שֶׁאָדָם אוֹכֵל פֵּרוֹתֵיהֶם בָּעוֹלָם הַזֶּה וְהַקֶּרֶן קַיֶּמֶת לָעוֹלָם הַבָּא","She-o-dom o-cheil pei-ro-sei-hem bo-o-lom ha-zeh v'ha-ke-ren ka-ye-mes lo-o-lom ha-bo","That a person|eats|their fruits|in the world|this|and the principal|stays|for the world|to come","Mishnah, Pe'ah 1:1","A person eats their “fruits” in this world, and the “principal” stays for the World to Come."]
};
const sef=()=>S.accent==="sef";
const tx=s=>{ if(!sef()) return s; try{ return typeof sefNames==="function"?sefNames(swapT(s)):swapT(s) }catch(e){ return s } };
const sayOf=x=>{ if(!sef()) return x[1].split(" "); try{ const t=typeof toSef==="function"&&toSef(x[0],x[1]); if(t&&t.split(" ").length===x[0].split(" ").length) return t.split(" ") }catch(e){} return x[1].split(" ").map(w=>{ try{ return swapT(w) }catch(e){ return w } }) };
function verse(k){ const x=SRC[k], he=x[0].split(" "), so=sayOf(x), gl=x[2].split("|");
  return `<div class="papsk egsrc"><div class="papskh" data-noglo><b>📜 Source</b><span>${esc(x[3])}</span></div>
   <div class="il" dir="rtl">${he.map((w,n)=>`<button class="wc" type="button" data-egw="${k}:${n}"><span class="h" lang="he">${w}</span><span class="s">${esc(so[n]||"")}</span><span class="g">${esc(gl[n]||"")}</span></button>`).join("")}</div>
   <p class="papsken">“${esc(x[4])}”</p></div>` }
S.earn=S.earn||{};
const LESSONS=[["respect","🤝","Respect"],["money","💰","Money"],["grow","📈","Grow"],["mitzvos","✨","Mitzvos grow"]];
let TAB="respect";

VIEWS.push("earn");
$("party").insertAdjacentHTML("beforebegin",`<div class="wrap" id="earn" hidden>
  <div class="toprow"><button class="back" id="egBk" type="button">← Home</button></div>
  <div class="phead"><div class="he" lang="he">לִגְדּוֹל</div><h2>Earn &amp; Grow</h2><p class="when">How respect, money and mitzvos all grow, a little at a time</p></div>
  <div class="ftabs egtabs" role="tablist" id="egTabs"></div>
  <div id="egMain" style="display:flex;flex-direction:column;gap:14px"></div>
</div>`);
function openEarn(t){ stopPlay(); window._fromBM=false; showOnly("earn"); if(t) TAB=t; render(); document.querySelectorAll("[data-nav]").forEach(b=>b.removeAttribute("aria-current")) }
$("egBk").onclick=()=>{ sfx.tick(); $("earn").hidden=true; goHome() };
document.addEventListener("click",e=>{ if(e.target.closest("[data-nav],#openAbc,#openWords,#openBlitz,#openBM,#openPa,#openHol,#openSages,#openFacts,#openChal,#openMitz,#openChit,#openChs,#openShop,.pitem")&&!e.target.closest("#earn")) $("earn").hidden=true },true);
function render(){ $("egTabs").innerHTML=LESSONS.map(([k,e,n])=>`<button class="ftab" type="button" role="tab" data-egt="${k}" aria-selected="${k===TAB}">${e} ${n}${S.earn[k]?" ✓":""}</button>`).join("");
  $("egTabs").querySelectorAll("[data-egt]").forEach(b=>b.onclick=()=>{ sfx.tick(); TAB=b.dataset.egt; render(); toTop() });
  $("egMain").innerHTML=({respect,money,grow,mitzvos})[TAB]()+doneBtn();
  $("egMain").querySelectorAll("[data-egw]").forEach(b=>b.onclick=()=>{ const [k,n]=b.dataset.egw.split(":"); sfx.tick(); b.parentNode.querySelectorAll(".wc.on").forEach(y=>y.classList.remove("on")); b.classList.add("on"); speakPhrase(SRC[k][0].split(" ")[+n].replace(/ה׳/g,"הַשֵּׁם")) });
  const d=$("egDone"); if(d) d.onclick=()=>{ if(!S.earn[TAB]){ S.earn[TAB]=true; S.gelt=(S.gelt||0)+2; save(); party(false); try{ sfx.coin() }catch(e){} toast("Lesson learned! +2 gelt") }
    const i=LESSONS.findIndex(l=>l[0]===TAB); if(i<LESSONS.length-1){ TAB=LESSONS[i+1][0]; render(); toTop() } else render() };
  if(TAB==="grow") wireGrow(); if(TAB==="mitzvos") wireOnePct(); }
function doneBtn(){ const i=LESSONS.findIndex(l=>l[0]===TAB), last=i===LESSONS.length-1;
  return `<button class="btn gold big" id="egDone" type="button" style="align-self:center">${S.earn[TAB]?(last?"✓ All lessons done!":"Next lesson →"):"I learned it! +2 gelt ✓"}</button>` }
const card=(e,t,body)=>`<div class="egcard"><div class="egh"><span>${e}</span><h3>${t}</h3></div>${body}</div>`;

/* ---------- 1. Respect ---------- */
function respect(){ return `<div class="buddy compact"><span class="ywrap">${yossi()}</span><div class="bubble"><span class="name">Shlomo</span>Respect is like money in the bank: you <b>earn it slowly</b>, one good action at a time, and you can lose it fast. Here's how to earn it!</div></div>
 ${verse("respect")}
 ${card("💡","The secret: give it first",`<p>Ben Zoma teaches that the way to <b>get</b> respect is to <b>give</b> respect, to everyone. Not only to grown-ups and teachers, but to little kids, new kids, and people who are different from you.</p>`)}
 ${card("🏦","Deposits into your “respect bank”",`<ul class="eglist"><li>✅ <b>Keep your promises</b>, even small ones.</li><li>✅ <b>Tell the truth</b>, even when it's hard.</li><li>✅ <b>Say thank you</b> and please.</li><li>✅ <b>Work hard</b> and finish what you start.</li><li>✅ <b>Stand up</b> for someone who is being picked on.</li></ul>
   <p class="egsmall">Every deposit makes people trust you a little more. After many deposits, you have a <b>good name</b>: a <i>shem tov</i>. Pirkei Avos says a good name is greater than a crown!</p>`)}
 ${card("⚠️","Withdrawals",`<p>Lying, making fun of people, or breaking promises takes respect <b>out</b> of the bank, and it can take a long time to earn it back. Then again, saying sorry and fixing it is always a big deposit!</p>`)}` }

/* ---------- 2. Money ---------- */
function money(){ return `<div class="buddy compact"><span class="ywrap">${yossi()}</span><div class="bubble"><span class="name">Shlomo</span>Money is a tool Hashem gives us. Let's learn how to <b>earn it honestly</b> and <b>use it wisely</b>!</div></div>
 ${verse("work")}
 ${card("🛠️","Earn it honestly",`<p>The Torah wants us to work and earn our own money, <b>honestly</b>. Yaakov worked for Lavan for 20 years and worked hard every day, even when Lavan tricked him. Being honest is part of being a mentsch.</p>`)}
 ${card("🫙","Three jars: Give, Save, Spend",`<div class="jars"><div><span>💛</span><b>Give</b><small>At least 10% to tzedakah (maaser)</small></div><div><span>🐷</span><b>Save</b><small>For something bigger later</small></div><div><span>🛍️</span><b>Spend</b><small>For things you want now</small></div></div>
   <p class="egsmall">Every time you get money, split it into the three jars. Giving comes <b>first</b>!</p>`)}
 ${verse("split")}
 ${card("🧺","Don't put all your eggs in one basket",`<p>About 1,700 years ago, the Gemara gave advice that money experts still give today: split your money into three parts: a third in <b>land</b>, a third in <b>business</b>, and a third <b>ready to use</b>. That way, if one thing goes badly, you still have the others. Today this is called <b>diversifying</b>.</p>`)}
 ${verse("rich")}
 ${card("😊","The richest person",`<p>Pirkei Avos says the richest person isn't the one with the most money. It's the one who is <b>happy with what he has</b>. Money is good, but being grateful is even better!</p>`)}` }

/* ---------- 3. Grow: compound interest ---------- */
function grow(){ return `<div class="buddy compact"><span class="ywrap">${yossi()}</span><div class="bubble"><span class="name">Shlomo</span>Saved money can <b>grow by itself</b>! When your money earns more money, and then that new money earns money too, it's called <b>compound interest</b>. Try it!</div></div>
 ${card("🌱","Like planting a tree",`<p>Plant a seed and you get a tree. The tree makes fruit, the fruit has seeds, the seeds grow more trees… Soon you have a whole <b>orchard</b> from one seed! That's how compounding works: growth on top of growth.</p>`)}
 <div class="egcalc">
  <h3>📈 Watch your money grow</h3>
  <label>Start with <b id="cStartV">$20</b><input type="range" id="cStart" min="0" max="500" step="10" value="20"></label>
  <label>Add every month <b id="cMonV">$5</b><input type="range" id="cMon" min="0" max="100" step="1" value="5"></label>
  <label>For <b id="cYrV">20 years</b><input type="range" id="cYr" min="1" max="50" step="1" value="20"></label>
  <div class="cleg"><span><i class="c1"></i>Money you put in</span><span><i class="c2"></i>Savings account (2%)</span><span><i class="c3"></i>Long-term investing (7%)</span></div>
  <div class="cbars" id="cBars"></div>
  <div class="cres" id="cRes"></div>
  <p class="egsmall">The 7% is about what the stock market has grown on average over many years. It's <b>not guaranteed</b>: some years go up and some go down. That's why grown-ups invest for a <b>long time</b>. Ask a grown-up about opening a savings account!</p>
 </div>
 ${card("⏰","The magic ingredient: TIME",`<p>The longer you wait, the faster it grows. Someone who starts saving as a kid can end up with <b>much more</b> than someone who saves more money but starts later. Try moving the years slider and watch!</p>`)}
 ${card("📜","Interest and the Torah",`<p>The Torah says Jews may <b>not charge each other interest</b> on loans. It's called <i>ribbis</i>. Instead, we give <b>free loans</b> to help each other: a <b>gemach</b>. Investing in a business, where you share in the profit and the risk, is different, and rabbis have a special way to set it up, called a <i>heter iska</i>.</p>`)}` }
function wireGrow(){ const s=$("cStart"), m=$("cMon"), y=$("cYr");
  const fmt=n=>"$"+Math.round(n).toLocaleString();
  const fv=(P,M,r,n)=>{ let v=P; for(let k=0;k<n*12;k++){ v=v*(1+r/12)+M } return v };
  function draw(){ const P=+s.value, M=+m.value, N=+y.value; $("cStartV").textContent=fmt(P); $("cMonV").textContent=fmt(M); $("cYrV").textContent=N+" year"+(N===1?"":"s");
    const step=N<=10?1:N<=25?Math.ceil(N/10):Math.ceil(N/10), ys=[]; for(let k=step;k<=N;k+=step) ys.push(k); if(ys[ys.length-1]!==N) ys.push(N);
    const rows=ys.map(k=>({k,put:P+M*12*k,sav:fv(P,M,.02,k),inv:fv(P,M,.07,k)})), max=Math.max(1,...rows.map(r=>r.inv));
    $("cBars").innerHTML=rows.map(r=>`<div class="cb"><div class="cbs"><i class="c1" style="height:${r.put/max*100}%"></i><i class="c2" style="height:${r.sav/max*100}%"></i><i class="c3" style="height:${r.inv/max*100}%"></i></div><small>${r.k}y</small></div>`).join("");
    const L=rows[rows.length-1];
    $("cRes").innerHTML=`After <b>${N} year${N===1?"":"s"}</b>, you put in <b>${fmt(L.put)}</b>.<br>In savings: <b class="t2">${fmt(L.sav)}</b> · Invested: <b class="t3">${fmt(L.inv)}</b><br><span>That's <b>${fmt(L.inv-L.put)}</b> your money earned by itself! 🌳</span>` }
  [s,m,y].forEach(e=>e.oninput=draw); draw() }

/* ---------- 4. Mitzvos grow ---------- */
function mitzvos(){ return `<div class="buddy compact"><span class="ywrap">${yossi("cheer")}</span><div class="bubble"><span class="name">Shlomo</span>Guess what? The Mishnah uses <b>investing words</b> to talk about mitzvos!</div></div>
 ${verse("fruit")}
 ${card("💎","Fruits and principal",`<p>In investing, the money you put in is the <b>principal</b> (<span lang="he">קֶרֶן</span>), and what it earns is the <b>fruit</b> (<span lang="he">פֵּרוֹת</span>). The Mishnah says some mitzvos, like honoring parents, kindness, bringing peace and learning Torah, are like the best investment ever: you enjoy the <b>fruits now</b>, and the <b>principal is saved forever</b> for the World to Come.</p>`)}
 ${card("🔗","Mitzvah goreres mitzvah",`<p>Pirkei Avos says “<span lang="he">מִצְוָה גּוֹרֶרֶת מִצְוָה</span>”: <b>one mitzvah pulls along another</b>. Say a bracha, and next time it's easier. Help someone once, and you start noticing more people to help. Your mitzvos <b>compound</b>, just like interest!</p>`)}
 <div class="egcalc">
  <h3>✨ Just 1% better every day</h3>
  <p class="egsmall" style="margin:0">If you grow just a tiny bit each day, by adding one small mitzvah, being a little kinder, or learning one more pasuk, see what happens:</p>
  <label>After <b id="pDV">30 days</b><input type="range" id="pD" min="1" max="365" step="1" value="30"></label>
  <div class="pgrow"><div><b id="pX">1.3×</b><small>better</small></div><div class="pplant" id="pPlant">🌱</div></div>
  <p class="egsmall" id="pNote"></p>
 </div>
 ${card("🌳","Start small, start today",`<p>The Rebbe taught that every single mitzvah counts, and even a small one can tip the whole world to the good. Don't wait for a big mitzvah. Do a small one <b>today</b>, and let it grow!</p>`)}` }
function wireOnePct(){ const d=$("pD");
  function draw(){ const n=+d.value, x=Math.pow(1.01,n); $("pDV").textContent=n+" day"+(n===1?"":"s"); $("pX").textContent=(x<10?x.toFixed(1):Math.round(x))+"×";
    $("pPlant").textContent=n<30?"🌱":n<90?"🌿":n<180?"🪴":n<300?"🌳":"🌳🌳🌳"; $("pPlant").style.fontSize=(2+Math.min(3,Math.log(x)))+"rem";
    $("pNote").innerHTML=n>=365?"In one year, 1% a day makes you about <b>38 times</b> better! 🤯":"Keep sliding to see a whole year!" }
  d.oninput=draw; draw() }

/* ---------- Links: the E letter and the Gelt Shop ---------- */
window.openEarn=openEarn;
document.head.insertAdjacentHTML("beforeend",`<style>
.egtabs{flex-wrap:wrap}
.egcard{background:var(--klaf);border:2px solid var(--rule);border-radius:18px;padding:14px;display:flex;flex-direction:column;gap:8px}
.egh{display:flex;align-items:center;gap:10px}.egh span{font-size:1.8rem}
.egh h3{font-family:var(--display);font-weight:400;font-size:1.3rem;color:var(--tech);margin:0}
.egcard p{margin:0;font-family:var(--text);font-size:1.06rem;line-height:1.5}
.egcard p b{color:var(--tech)}.egcard span[lang=he]{font-family:var(--he);font-weight:700;color:var(--gold)}
.egsmall{font-family:var(--text);font-size:.98rem!important;color:var(--muted);line-height:1.45}
.eglist{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:6px;font-size:1.02rem}
.eglist b{color:var(--tech)}
.jars{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.jars div{display:flex;flex-direction:column;align-items:center;text-align:center;background:var(--bg);border-radius:14px;padding:10px 6px}
.jars span{font-size:2rem}.jars b{color:var(--tech);font-size:1.05rem}.jars small{font-size:.8rem;color:var(--muted);line-height:1.3}
.egcalc{background:var(--klaf);border:2px solid var(--gold-hi);border-radius:18px;padding:14px;display:flex;flex-direction:column;gap:10px}
.egcalc h3{font-family:var(--display);font-weight:400;font-size:1.3rem;color:var(--tech);margin:0}
.egcalc label{display:flex;flex-direction:column;gap:4px;font-weight:700;color:var(--ink)}
.egcalc label b{color:var(--tech)}
.egcalc input[type=range]{width:100%;accent-color:var(--tech);height:28px}
.cleg{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:.82rem;font-weight:700;color:var(--muted)}
.cleg i{display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:5px;vertical-align:-1px}
.c1{background:#9aa3b5}.c2{background:#5b8def}.c3{background:var(--good)}
.cbars{display:flex;align-items:flex-end;gap:4px;height:170px;border-bottom:2px solid var(--rule);padding-top:6px}
.cb{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;height:100%;justify-content:flex-end;min-width:0}
.cbs{display:flex;align-items:flex-end;gap:1px;width:100%;height:calc(100% - 16px)}
.cbs i{flex:1;border-radius:3px 3px 0 0;min-height:2px;transition:height .25s}
.cb small{font-size:.66rem;color:var(--muted);font-weight:700}
.cres{text-align:center;font-size:1.02rem;line-height:1.55}.cres b{color:var(--tech)}.cres .t2{color:#3d6fd6}.cres .t3{color:var(--good)}.cres span{font-weight:700;color:var(--good)}
.pgrow{display:flex;align-items:center;justify-content:center;gap:24px;min-height:110px}
.pgrow b{display:block;font-family:var(--display);font-weight:400;font-size:2.6rem;color:var(--good);line-height:1}
.pgrow small{font-weight:700;color:var(--muted)}
.pplant{transition:font-size .2s;line-height:1}
</style>`);
})();
