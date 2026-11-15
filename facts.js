/* ================= DID YOU KNOW? Fun facts + quiet kindness ================= */
(function(){
const hy=(()=>{ try{ return new Intl.DateTimeFormat("en-u-ca-hebrew",{year:"numeric"}).format(new Date()).replace(/\D/g,"") }catch(e){ return "" } })();
// [picture, title, text]
const FUN=[
 ["📜","5,845 pesukim","The whole Torah has <b>5,845 pesukim</b>. The longest parsha is <b>Naso</b>, with 176 pesukim. And the longest chapter in all of Tanach, Tehillim 119, also has exactly <b>176</b> pesukim!"],
 ["✋","248 words in the Shema","The Shema has <b>245</b> words. We add three more, <i>Keil Melech Ne'eman</i> or the chazzan's “Hashem Elokeichem Emes,” to make <b>248</b>, matching the 248 limbs of the body. All of you says Shema!"],
 ["🖋️","Moshe's busiest day","The Midrash says that on his very last day, Moshe wrote <b>13 Sifrei Torah</b>: one for each of the 12 tribes, and one to keep in the Aron."],
 ["🪜","Angels going up first","In Yaakov's dream the angels were “going <b>up</b> and down,” up first! Rashi explains: the angels who guarded Yaakov in Eretz Yisroel went up, and new angels came down to guard him outside the Land."],
 ["📰","Columns that start with Vav","Most columns in a Sefer Torah begin with the letter <span lang='he'>ו</span>. The sofrim call it <b>Vavei HaAmudim</b>, the “hooks of the columns,” like the hooks that held up the Mishkan's curtains!"],
 ["📘","Tanya everywhere","The Rebbe asked that the <b>Tanya</b> be printed all over the world, so it has been printed in <b>thousands</b> of cities and towns, from big cities to faraway army bases."],
 ["📜","304,805 letters","A Torah scroll has <b>304,805 letters</b>, and a sofer writes every one by hand with a feather quill. If even <b>one letter</b> is missing, the whole Torah isn't kosher until it's fixed. Writing one takes about a <b>year</b>!"],
 ["🦴","613 mitzvos, all of you","There are <b>613 mitzvos</b>. The <b>248</b> “do” mitzvos match the 248 limbs of the body, and the <b>365</b> “don't” mitzvos match the 365 days of the year. Your whole body, every day of the year!"],
 ["🔤","Big Beis, big Alef","The Torah starts with a <b>big Beis</b>: <span lang='he'>בְּרֵאשִׁית</span>. The Ten Commandments start with an <b>Alef</b>: <span lang='he'>אָנֹכִי</span>. Hashem started the world with Beis and the Torah's big speech with Alef!"],
 ["🌙","Days start at night","A Jewish day starts at <b>night</b>, not in the morning. The Torah says “there was evening, and there was morning, one day.” That's why Shabbos starts Friday night!"],
 ["🍞","Why two challahs?","On Shabbos we make a bracha on <b>two challahs</b>. In the desert, Hashem sent a <b>double portion of mann</b> every Friday, so nobody had to collect food on Shabbos."],
 ["🐟","Fins and scales","A kosher fish needs <b>fins and scales</b>. Salmon and tuna: yes! Shrimp and catfish: no."],
 ["🗣️","A language that woke up","For about 2,000 years, Jews used Hebrew mostly to <b>daven and learn</b>. Then Eliezer Ben-Yehuda helped bring it back as an everyday language. His son Itamar was raised speaking only Hebrew. Today millions of kids speak it at recess!"],
 ["🏺","The shepherd's discovery","Around 1947, a shepherd boy looking for a lost goat threw a stone into a cave near the Dead Sea and heard pottery break. Inside were the <b>Dead Sea Scrolls</b>, about 2,000 years old, including a scroll of Yeshayahu almost word for word like ours today!"],
 ["📖","Four times a week","The Torah is read in shul <b>four times every week</b>: Monday, Thursday, Shabbos morning and Shabbos afternoon. That way we never go three days without Torah."],
 ["🎺","100 shofar blasts","On Rosh Hashanah, the custom is to hear <b>100 blasts</b> of the shofar. It's like a royal trumpet for crowning Hashem as King."],
 ["🌍","A Shabbos meal almost anywhere","Chabad shluchim live in <b>more than 100 countries</b>. That means a Jewish traveler can find a Shabbos meal, a minyan or a friendly face almost anywhere in the world, from Alaska to Vietnam!"],
 ["📅",hy?`It's the year ${hy}`:"A very old calendar",hy?`On the Jewish calendar it's the year <b>${hy}</b>. We count from the creation of the world, starting with Adam HaRishon.`:"The Jewish calendar counts the years from the creation of the world, starting with Adam HaRishon."],
 ["👖","Jeans!","Blue jeans with metal rivets were patented in 1873 by two Jewish immigrants: <b>Levi Strauss</b> and a tailor named <b>Jacob Davis</b>. Now people all over the world wear them."],
 ["🧸","The first teddy bear","In 1903, <b>Morris and Rose Michtom</b>, Jewish immigrants in Brooklyn, sold one of the very first teddy bears in their little candy shop. They named it “Teddy's Bear” after President Theodore Roosevelt."],
 ["🍎","Newton and the Beis Hamikdash","Sir Isaac Newton, the famous scientist of gravity, <b>wasn't Jewish</b>, but he loved the Torah's Hebrew. He learned Hebrew and spent years studying the exact measurements of the <b>Beis Hamikdash</b>, drawing his own plans of it!"],
 ["🧱","Giant stones of the Kosel","Some stones in the Western Wall tunnels are <b>enormous</b>. The biggest one is about <b>13 meters long</b>, longer than a school bus, and weighs hundreds of tons. Nobody knows exactly how they moved it 2,000 years ago!"],
 ["🌊","The lowest place on land","The <b>Dead Sea</b> in Eretz Yisroel is the lowest place on land on the whole planet, about 430 meters below sea level. It's so salty that you <b>float</b> like a cork!"],
 ["🐏","Why a ram's horn?","A shofar is usually made from a <b>ram's horn</b>, to remind Hashem of the ram that Avraham offered instead of Yitzchak. A cow's horn isn't allowed, because it would remind us of the golden calf!"],
 ["⏱️","The 18-minute matzah","Kosher-for-Pesach matzah must go into the oven before <b>18 minutes</b> pass from when the water touches the flour. After that, the dough could start to rise and become chametz!"],
 ["📏","The middle of the Torah","The Gemara says the scribes counted every letter of the Torah. The <b>middle letter</b> is the Vav in the word <span lang='he'>גָחוֹן</span> (Vayikra 11:42), and in a Sefer Torah it's written <b>extra big</b>!"],
 ["🚪","Why the mezuzah is tilted","Rashi said the mezuzah should stand straight up. His grandson Rabbeinu Tam said it should lie flat. So Ashkenazim <b>tilt it</b>, to follow both opinions! Sephardim hang it straight up."],
 ["🧵","Sewn with sinew","The sheets of a Sefer Torah aren't glued or stapled. They're <b>sewn together</b> with <b>gidin</b>, threads made from the sinews of a kosher animal."]

];
const KIND=[
 ["💉","He gave it away","Dr. <b>Jonas Salk</b> made the first polio vaccine, and polio had been hurting thousands of kids every year. When asked who owned the patent, he said: “The people, I would say. There is no patent. Could you patent the sun?”"],
 ["🏫","Almost 5,000 schools","<b>Julius Rosenwald</b>, the Jewish head of Sears, helped build <b>4,977 schools</b> for Black children in the American South between 1912 and 1932, when many of them had no decent school at all. By 1932, about a third of Black students in the South learned in a Rosenwald school."],
 ["🏥","A hospital that opened its doors","In 1852, Jews in New York started <b>The Jews' Hospital</b>, because Jewish patients and doctors often weren't welcome elsewhere. During the Civil War it cared for wounded soldiers, and it opened to everyone. Today it's the famous <b>Mount Sinai Hospital</b>."],
 ["🩺","Care for everyone","In 1912, <b>Henrietta Szold</b> started Hadassah to bring nurses and doctors to the Land of Israel. She insisted on treating <b>Jews, Arabs and Christians alike</b>, and Hadassah hospitals in Jerusalem still treat everyone today."],
 ["💊","Saving kids with leukemia","<b>Gertrude Elion</b>, the daughter of Jewish immigrants, made the first medicine that worked against childhood leukemia. Used with other medicines, it helps cure most kids who have it. She also made medicines that make organ transplants possible, and won the Nobel Prize in 1988."],
 ["🦠","Beating a terrible sickness","<b>Selman Waksman</b>, a Jewish scientist, discovered streptomycin, the first medicine that could cure <b>tuberculosis</b>, a sickness that had taken millions of lives. He won the Nobel Prize in 1952."],
 ["💧","More food, less water","Israeli engineer <b>Simcha Blass</b> noticed one tree growing bigger than the rest because of a tiny leak. That gave him the idea for <b>drip irrigation</b>, which waters plants drop by drop. Today farmers in more than 100 countries grow more food with much less water."],
 ["🚑","Help from far away","After a huge earthquake hit Turkey in 2023, Israel flew in rescue teams and set up a <b>field hospital</b>. The teams pulled 19 people out from under the rubble alive, and the hospital treated about 500 injured people."],
 ["🚨","Volunteers who run","<b>Hatzalah</b> is a Jewish volunteer ambulance group. Its members are regular people who stop what they're doing, even in the middle of dinner, and rush to help anyone who calls, for free."],
 ["🏆","A tiny people, a big gift","Jews are only about <b>0.2%</b> of the people in the world, about 1 out of every 500. Yet about <b>22%</b> of all Nobel Prize winners have been Jewish, many for discoveries in medicine that help everyone."],
 ["💛","Tzedakah every day","Giving <b>tzedakah</b> isn't just being nice. It's a mitzvah! Many Jewish families give a <b>tenth</b> of what they earn (maaser), and kids drop coins in a pushka before Shabbos candles. That habit has quietly built schools, hospitals and food banks all over the world."]
];
const MINDS=[
 ["🧠","Albert Einstein","Einstein discovered the theory of <b>relativity</b> and the famous formula <b>E = mc²</b>, which explains how matter and energy are connected. He won the Nobel Prize in 1921. He was proud to be part of the Jewish people, and in 1952 he was even <b>offered the job of President of Israel</b>! He politely said no."],
 ["💡","Albert Michelson","In 1907 Michelson became the <b>first American ever</b> to win a Nobel Prize in science. He measured the <b>speed of light</b> more exactly than anyone before him, using mirrors and clever experiments."],
 ["🎯","Paul Ehrlich","Dr. Ehrlich dreamed of a “<b>magic bullet</b>”: a medicine that attacks only the germ and not the person. He made one of the first modern medicines that did exactly that, and won the Nobel Prize in 1908."],
 ["🧲","Isidor Isaac Rabi","Rabi grew up in a religious Jewish home in New York. He discovered how to measure the tiny magnets inside atoms, and won the Nobel Prize in 1944. His work later helped doctors invent the <b>MRI machine</b> that sees inside the body. His mother used to ask him after school: “Did you ask a <b>good question</b> today?”"],
 ["🧬","Rosalind Franklin","Using X-rays, Rosalind Franklin took a famous picture called “<b>Photo 51</b>.” It helped scientists discover the shape of <b>DNA</b>, the twisted ladder that holds the instructions for every living thing."],
 ["🔬","Rita Levi-Montalcini","When she wasn't allowed to work at a university because she was Jewish, she built a tiny <b>science lab in her bedroom</b>! There she made discoveries about how nerves grow, and later won the Nobel Prize in 1986."],
 ["💉","Baruch Blumberg","Dr. Blumberg went to a yeshiva day school in Brooklyn, where he said learning Gemara taught him to think and argue carefully. He discovered the <b>hepatitis B</b> virus and helped create a vaccine that protects millions of children. Nobel Prize, 1976."],
 ["🎲","Robert Aumann","Professor Aumann is an Orthodox Jew in Yerushalayim who studies “<b>game theory</b>,” the math of how people make choices together. He won the Nobel Prize in 2005, and he has even used Gemara puzzles in his research!"],
 ["💎","Dan Shechtman","When Israeli scientist Dan Shechtman discovered a new kind of crystal, many experts <b>laughed at him</b> and said it was impossible. He didn't give up. Years later, he won the Nobel Prize in 2011. Lesson: if you're right, stand strong!"],
 ["🧪","Ada Yonath","Ada Yonath grew up poor in Yerushalayim. She spent over 20 years figuring out the shape of the <b>ribosome</b>, the tiny factory inside every cell that builds proteins. She won the Nobel Prize in 2009, the first Israeli woman to win one."],
 ["🎮","Ralph Baer","As a boy, Ralph Baer escaped Nazi Germany with his Jewish family. In America he invented the <b>first home video game console</b>, the Magnavox Odyssey, in 1972. He's called the “Father of Video Games”!"],
 ["🎵","Emile Berliner","Emile Berliner, a Jewish immigrant to America, invented the <b>gramophone</b> with flat disc records, the way people listened to music for about 100 years! He also improved the telephone microphone."],
 ["🥁","Richard Feynman","Feynman was a fun-loving physicist who played the bongo drums and loved solving puzzles. He won the Nobel Prize in 1965. Once, he showed what went wrong with a space shuttle using just a <b>cup of ice water</b> and a rubber ring!"],
 ["📜","The Rambam","The Rambam (Maimonides) was one of the greatest minds ever: he wrote the <b>Mishneh Torah</b>, a book of <b>all</b> the Torah's laws, and he was also a famous <b>doctor</b> who cared for the royal court in Egypt. Doctors still study his medical writings!"],
 ["💰","Don Yitzchak Abarbanel","Abarbanel was a great Torah scholar and the <b>finance minister</b> of Spain. When the king expelled the Jews in 1492, he was offered to stay, but he chose to <b>leave with his people</b>. He wrote famous commentaries on the Torah."]
];
const SETS={fun:{n:"Fun Facts",em:"🤩",list:FUN},minds:{n:"Great Minds",em:"🧠",list:MINDS},kind:{n:"Quiet Kindness",em:"💛",list:KIND}};
VIEWS.push("facts"); S.facts=S.facts||{};
const seen=k=>Object.keys(S.facts).filter(x=>x.startsWith(k+".")).length;
const total=FUN.length+MINDS.length+KIND.length;

/* Home card: after the Sages card */
$(document.getElementById("openSages")?"openSages":"openPa").insertAdjacentHTML("afterend",`<button class="blitzcard factcard" id="openFacts" type="button"><span class="em">💡</span>
  <span><b>Did You Know?</b><span>Amazing Jewish facts, great Jewish minds, and quiet kindness.</span></span><span class="bzs" id="fProg"></span></button>`);
$("openFacts").onclick=()=>{ sfx.pop(); openFacts() };
function paintFHome(){ const n=seen("fun")+seen("minds")+seen("kind"); if($("fProg")) $("fProg").textContent=n?`${n} of ${total} facts read`:"" }

$("party").insertAdjacentHTML("beforebegin",`<div class="wrap" id="facts" hidden>
  <div class="toprow"><button class="back" id="fBack" type="button">← Home</button></div>
  <div class="phead"><div class="he" lang="he">הֲיָדַעְתָּ?</div><h2>Did You Know?</h2><p class="when" id="fWhen"></p></div>
  <div class="ftabs" role="tablist">${Object.entries(SETS).map(([k,s])=>`<button class="ftab" type="button" role="tab" data-fset="${k}">${s.em} ${s.n}</button>`).join("")}</div>
  <div id="fMain"></div>
  <div class="buddy"><span class="ywrap" id="fY"></span><div class="bubble" id="fBubble" aria-live="polite"></div></div>
</div>`);
$("fBack").onclick=()=>{ sfx.tick(); $("facts").hidden=true; goHome() };
document.addEventListener("click",e=>{ if(e.target.closest("[data-nav],#openAbc,#openWords,#openBlitz,#openBM,#openPa,#openHol,#openSages,.pitem")&&!e.target.closest("#facts")) $("facts").hidden=true },true);
document.querySelectorAll("[data-fset]").forEach(b=>b.onclick=()=>{ sfx.tick(); FV={set:b.dataset.fset,i:0}; renderF() });

let FV={set:"fun",i:0};
function openFacts(){ stopPlay(); window._fromBM=false; showOnly("facts"); const f=SETS.fun.list.findIndex((x,i)=>!S.facts["fun."+i]);
  FV={set:"fun",i:f<0?0:f}; renderF(); document.querySelectorAll("[data-nav]").forEach(b=>b.removeAttribute("aria-current")) }
function renderF(){ const set=SETS[FV.set], L=set.list, f=L[FV.i], key=FV.set+"."+FV.i, first=!S.facts[key];
  S.facts[key]=true; save(); paintFHome();
  document.querySelectorAll("[data-fset]").forEach(b=>b.setAttribute("aria-selected",b.dataset.fset===FV.set));
  $("fWhen").textContent={fun:"Cool things about Torah, mitzvos and Jewish life.",minds:"Jewish scientists, inventors and thinkers who changed the world.",kind:"Good things Jewish people did that most people never heard about."}[FV.set];
  $("fY").innerHTML=yossi(first?"cheer":"");
  $("fMain").innerHTML=`<div class="fcard ${FV.set}" id="fCard">
      <div class="fcount">${set.em} ${FV.i+1} of ${L.length}</div>
      <div class="fpic">${f[0]}</div><h3>${f[1]}</h3><p>${f[2]}</p></div>
    <div class="fnav"><button class="btn" id="fPrev" type="button"${FV.i?"":" disabled"}>← Back</button>
      <button class="btn gold big" id="fNext" type="button">${FV.i<L.length-1?"Next fact →":(()=>{ const k=Object.keys(SETS), nx=SETS[k[(k.indexOf(FV.set)+1)%k.length]]; return nx.em+" "+nx.n+" →" })()}</button></div>
    <div class="fdots">${L.map((x,i)=>`<span class="${i===FV.i?"on":""}${S.facts[FV.set+"."+i]?" got":""}"></span>`).join("")}</div>`;
  $("fPrev").onclick=()=>{ sfx.tick(); FV.i--; renderF() };
  $("fNext").onclick=()=>{ sfx.pop(); if(FV.i<L.length-1) FV.i++; else { const k=Object.keys(SETS); FV={set:k[(k.indexOf(FV.set)+1)%k.length],i:0} } renderF(); $("fCard").scrollIntoView({block:"nearest",behavior:"smooth"}) };
  if(first){ S.gelt=(S.gelt||0)+1; save(); sfx.coin() }
  bubble("fBubble",(first?"+1 gelt! ":"")+pick(FV.set==="minds"?["What a mind! 🧠","Hashem gives each person special talents. Use yours!","Maybe one day YOU will discover something amazing!"]:FV.set==="fun"?["Wow! Did you know that? 🤯","Tell your family this one at the Shabbos table!","Pretty amazing, right?"]:["That's a real kiddush Hashem. 💛","Doing good quietly is the best kind of good.","Now you know a story most people never heard!"])) }

document.head.insertAdjacentHTML("beforeend",`<style>
.factcard .em{animation:none}
.ftabs{display:flex;gap:8px;justify-content:center;margin:4px 0 12px}
.ftab{border:2px solid var(--gold-hi);background:var(--klaf);color:var(--tech);border-radius:999px;padding:8px 14px;font-weight:700;font-size:.95rem;cursor:pointer}
.ftab[aria-selected="true"]{background:linear-gradient(180deg,#ffeeb5,#f5cf6b 45%,#dda23a);color:#3a2604;box-shadow:0 3px 0 #a8741c}
.fcard{position:relative;text-align:center;padding:20px 18px 18px;border-radius:22px;border:2px solid var(--gold-hi);
  background:linear-gradient(180deg,color-mix(in srgb,#4f86ff 16%,var(--klaf)),var(--klaf) 60%);box-shadow:0 6px 0 color-mix(in srgb,var(--gold-hi) 60%,#5a3b05),0 14px 24px -14px rgba(20,32,80,.5)}
.fcard.minds{background:linear-gradient(180deg,color-mix(in srgb,#8b5cf6 16%,var(--klaf)),var(--klaf) 60%)}
.fcard.kind{background:linear-gradient(180deg,color-mix(in srgb,#f0657a 16%,var(--klaf)),var(--klaf) 60%)}
.fcount{font-size:.8rem;font-weight:700;color:var(--muted);letter-spacing:.04em}
.fpic{font-size:4.6rem;line-height:1.15;margin:6px 0;filter:drop-shadow(0 5px 5px rgba(0,0,0,.18));animation:wpop .5s cubic-bezier(.3,1.7,.5,1)}
.fcard h3{font-family:var(--display);font-size:1.5rem;color:var(--tech);margin:2px 0 8px}
.fcard p{font-size:1.08rem;line-height:1.55;text-align:left;margin:0}
.fcard p span[lang=he]{font-family:var(--he);font-size:1.2em;color:var(--gold)}
.fnav{display:grid;grid-template-columns:auto 1fr;gap:10px;margin-top:14px}
.fdots{display:flex;flex-wrap:wrap;justify-content:center;gap:5px;margin-top:10px}.fdots span{width:9px;height:9px;border-radius:50%;background:var(--rule)}
.fdots span.got{background:var(--gold-hi)}.fdots span.on{background:var(--tech);transform:scale(1.3)}
@keyframes wpop{40%{transform:scale(1.15) rotate(-4deg)}}
</style>`);
const _rH=renderHome; renderHome=function(){ _rH(); paintFHome() };
window.openFacts=openFacts; paintFHome(); if(location.hash==="#facts") openFacts();
})();
