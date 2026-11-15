/* ================= MEET THE SAGES ================= */
(function(){
// [name, hebrew, emoji, when, story steps, lesson]
const SAGE_SVG=`<svg class="sgimg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"> <defs>  <radialGradient id="bg" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#fff3cf"/><stop offset="1" stop-color="#e3ad3a"/></radialGradient>  <linearGradient id="beard" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d9d9e0"/></linearGradient> </defs> <circle cx="60" cy="60" r="58" fill="url(#bg)"/>  <path d="M14 120 C18 92 34 82 60 80 C86 82 102 92 106 120Z" fill="#1d3d8c"/>  <path d="M24 120 C22 86 26 50 38 32 C46 20 74 20 82 32 C94 50 98 86 96 120 L82 120 C82 92 78 70 74 58 L46 58 C42 70 38 92 38 120Z" fill="#f7f4ea" stroke="#d8d0b8" stroke-width="1"/> <path d="M27 104 C27 96 28 90 29 84 M93 104 C93 96 92 90 91 84" stroke="#1d3d8c" stroke-width="4" fill="none"/> <path d="M26 112 L37 112 M83 112 L94 112" stroke="#1d3d8c" stroke-width="3"/>  <ellipse cx="60" cy="52" rx="16" ry="19" fill="#e9b98f"/>  <path d="M40 40 C48 30 72 30 80 40 C74 36 46 36 40 40Z" fill="#f7f4ea" stroke="#d8d0b8"/> <path d="M42 39 C50 33 70 33 78 39" stroke="#1d3d8c" stroke-width="2.5" fill="none"/>  <path d="M49 47 Q53 44 57 47 M63 47 Q67 44 71 47" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none"/> <path d="M50 52 Q53 54 56 52 M64 52 Q67 54 70 52" stroke="#4a2c12" stroke-width="1.8" stroke-linecap="round" fill="none"/> <path d="M60 52 Q58 58 61 60" stroke="#c98f66" stroke-width="1.6" fill="none" stroke-linecap="round"/>  <path d="M43 54 C42 64 44 72 46 80 C48 90 52 98 56 100 Q60 103 64 100 C68 98 72 90 74 80 C76 72 78 64 77 54 C73 61 68 63 60 63 C52 63 47 61 43 54Z" fill="url(#beard)" stroke="#c9c9d2" stroke-width=".8"/> <path d="M50 65 Q55 60 60 63 Q65 60 70 65 Q65 68 60 66 Q55 68 50 65Z" fill="#ffffff" stroke="#d6d6de" stroke-width=".6"/> <path d="M52 74 Q53 84 56 92 M60 72 L60 96 M68 74 Q67 84 64 92" stroke="#c9c9d2" stroke-width="1" stroke-linecap="round"/>  <path d="M34 104 L60 100 L86 104 L86 118 L60 114 L34 118Z" fill="#6a3e1c"/> <path d="M37 103 L59 100 L59 113 L37 116Z" fill="#fffbf0"/> <path d="M61 100 L83 103 L83 116 L61 113Z" fill="#fffbf0"/> <path d="M41 106 L55 104 M41 109 L55 107 M65 104 L79 106 M65 107 L79 109" stroke="#946409" stroke-width="1"/>  <ellipse cx="38" cy="108" rx="5" ry="4" fill="#e9b98f"/> <ellipse cx="82" cy="108" rx="5" ry="4" fill="#e9b98f"/></svg>`;
let _sgN=0; const sageSvg=()=>{ const n=++_sgN; return SAGE_SVG.replace(/id="(bg|beard)"/g,`id="$1${n}"`).replace(/url\(#(bg|beard)\)/g,`url(#$1${n})`) };
const SAGES=[
 ["Avraham Avinu","אַבְרָהָם אָבִינוּ","⛺","About 3,700 years ago",
  ["Avraham grew up in a place where everyone bowed down to idols made of wood and stone. His father Terach even sold idols in a shop.",
   "Avraham looked up at the sun, the moon and the stars and thought: “Someone had to make all of this!” All by himself, he figured out that there is one Hashem who made the whole world.",
   "Hashem told him: “Lech lecha, go to the land I will show you,” the Land of Israel. Avraham kept his tent open on all four sides so guests could come in from every direction. He fed them and taught them about Hashem."],
  "Welcome every guest with kindness, and share what you know about Hashem."],
 ["Yitzchak Avinu","יִצְחָק אָבִינוּ","🐏","About 3,600 years ago",
  ["Yitzchak was born when his father Avraham was 100 years old and his mother Sarah was 90! Sarah laughed with joy, so they named him Yitzchak, which means “he will laugh.”",
   "When Hashem tested Avraham at the Akeidah, Yitzchak was ready to do whatever Hashem wanted. At the last moment, Hashem sent a ram instead.",
   "Yitzchak dug wells for water. When the Plishtim filled them up with dirt, he didn't give up. He dug them again! He also started Mincha, the afternoon prayer, praying out in the field."],
  "Don't give up. If something you built gets ruined, build it again."],
 ["Yaakov Avinu","יַעֲקֹב אָבִינוּ","🪜","About 3,550 years ago",
  ["One night Yaakov slept on the ground with a rock for a pillow. He dreamed of a ladder reaching up to Heaven, with angels going up and down, and Hashem promised to protect him.",
   "He worked for his uncle Lavan for 20 years. Lavan tricked him again and again, but Yaakov always stayed honest and worked hard.",
   "Yaakov wrestled with an angel and won! The angel gave him a new name: Yisroel. That's why the Jewish people are called Bnei Yisroel, the children of Israel. His 12 sons became the 12 tribes."],
  "Stay honest, even when others aren't. We are all Yaakov's children."],
 ["Moshe Rabbeinu","מֹשֶׁה רַבֵּנוּ","🔥","About 3,300 years ago",
  ["When Moshe was a baby, Pharaoh wanted to hurt the Jewish boys. His mother hid him in a basket on the river, and Pharaoh's own daughter found him and raised him in the palace.",
   "When he grew up, Moshe became a shepherd. One day a little lamb ran away, and Moshe chased it all the way to a stream and carried it back. Hashem said: “Someone who cares this much for one lamb should take care of My people.”",
   "Hashem spoke to Moshe from a burning bush. Moshe led the Jewish people out of Egypt and brought us the Torah from Har Sinai."],
  "Hashem picks people who care about others, even the smallest ones."],
 ["Hillel","הִלֵּל הַזָּקֵן","🦶","About 2,000 years ago",
  ["Hillel was very poor. Every day he paid half of his tiny pay to get into the Torah study hall.",
   "One winter day he had no money, so he climbed onto the roof and listened through the window. It snowed on him all night! In the morning the teachers found him and brought him inside to warm up.",
   "Later, a man asked Hillel: “Teach me the whole Torah while I stand on one foot!” Hillel said: “What you don't like, don't do to your friend. The rest is the explanation. Now go learn it!”"],
  "Treat other people the way you want to be treated."],
 ["Rabbi Akiva","רַבִּי עֲקִיבָא","💧","About 1,900 years ago",
  ["Akiva was a shepherd who never learned to read. When he was 40 years old, he still didn't know the Alef-Beis.",
   "One day he saw a rock with a hole in it. Drops of water had dripped on it, one by one, until they made a hole! He thought: “If soft water can carve hard stone, Torah can go into my heart too.”",
   "So he started with Alef-Beis, sitting with little children. His wife Rachel helped him, and he became one of the greatest teachers ever, with thousands of students."],
  "It's never too late to learn. A little bit every day adds up to a lot."],
 ["Rabbi Shimon bar Yochai","רַבִּי שִׁמְעוֹן בַּר יוֹחָאי","🏕️","About 1,850 years ago",
  ["The Romans made a law that Jews couldn't learn Torah, and they wanted to catch Rabbi Shimon.",
   "So he and his son hid in a cave for 13 years! Hashem made a carob tree and a spring of water appear, so they had food and drink. They learned Torah all day long.",
   "He taught the deep secrets of the Torah, written in the Zohar. On Lag Ba'omer we light bonfires to remember the light of his teachings. 🔥"],
  "Torah is a light that nobody can put out."],
 ["Rashi","רַשִׁ״י","🍇","About 950 years ago, in France",
  ["Rashi lived in France and earned money growing grapes and making wine.",
   "He wrote short, clear explanations on almost every verse of the Chumash and the Gemara, so that even a child could understand.",
   "Today, when kids start learning Chumash, they learn it with Rashi. His explanations are printed in almost every Chumash in the world!"],
  "Explain things clearly so everyone can understand."],
 ["The Rambam","הָרַמְבַּ״ם","🩺","About 850 years ago, Spain and Egypt",
  ["The Rambam's real name was Rabbi Moshe ben Maimon. He was born in Spain, and his family had to run away and move to Egypt.",
   "He was such a great doctor that he took care of the Sultan, the king of Egypt! He worked all day, and still found time to write.",
   "He wrote a giant book with all the laws of the Torah, and the 13 things every Jew believes, the “Ani Maamin.” People say: “From Moshe to Moshe, there was nobody like Moshe!”"],
  "You can be busy and still make time for Torah every day."],
 ["Rabbi Yosef Karo","רַבִּי יוֹסֵף קָארוֹ","📚","About 500 years ago, Tzfas",
  ["When Rabbi Yosef Karo was a little boy, all the Jews were kicked out of Spain. His family wandered for years.",
   "Finally he settled in Tzfas, in the Land of Israel.",
   "He wrote the Shulchan Aruch, which means “the set table.” It lays out the laws so neatly, like a table set for dinner, that any Jew can find what to do. Jews everywhere still use it."],
  "Make it easy for others to do the right thing."],
 ["The Baal Shem Tov","הַבַּעַל שֵׁם טוֹב","🎶","About 300 years ago, Ukraine",
  ["Rabbi Yisroel, the Baal Shem Tov, was an orphan. Before he died, his father told him: “Fear nothing but Hashem, and love every Jew with all your heart.”",
   "One Yom Kippur, a shepherd boy came to shul. He couldn't read the prayers, so he took out his whistle and blew it as loud as he could! People were upset, but the Baal Shem Tov said his whistle opened the gates of Heaven, because it came from his whole heart.",
   "He started Chassidus, teaching that every Jew is precious to Hashem, and that we serve Hashem with joy."],
  "Hashem loves a prayer that comes from the heart, even a simple one."],
 ["The Maggid of Mezritch","הַמַּגִּיד מִמֶּזְרִיטְשׁ","🧒","1704 to 1772, Ukraine",
  ["Rabbi DovBer, the Maggid, was a great Torah scholar, but he was often sick and weak. He traveled to the Baal Shem Tov, who taught him the ways of Chassidus.",
   "After the Baal Shem Tov passed away, the Maggid became the leader of the Chassidim. He sent his students all over to teach. One of them was the Alter Rebbe!",
   "He taught: “Learn three things from a little child. A child is always happy, is never lazy, and when he wants something, he cries for it.” We should want Hashem that much!"],
  "Serve Hashem with the happiness and energy of a little child."],
 ["The Alter Rebbe","אַדְמוּ״ר הַזָּקֵן","🍼","1745 to 1812 · 1st Chabad Rebbe",
  ["The Alter Rebbe, Rabbi Schneur Zalman, was the first Chabad Rebbe. He wrote the Tanya, and he arranged the Chabad siddur, the same prayers you're learning in this app!",
   "One night his son was learning Torah so hard that he didn't hear his baby crying. The Alter Rebbe heard it from upstairs. He came down and rocked the baby back to sleep.",
   "Then he told his son: “No matter how busy you are, even with Torah, you must always hear a child who cries.”"],
  "Always notice when someone needs help."],
 ["The Mitteler Rebbe","אַדְמוּ״ר הָאֶמְצָעִי","🏘️","1773 to 1827 · 2nd Chabad Rebbe",
  ["Rabbi DovBer, the Mitteler Rebbe, was the Alter Rebbe's son. “Mitteler” means “middle,” because he came between his father and the next Rebbe.",
   "He moved to a little town called Lubavitch. That's where the name Chabad-Lubavitch comes from!",
   "When he prayed, he stood completely still, thinking so deeply about Hashem that he didn't notice anything around him. He also helped poor Jewish families get land to farm."],
  "Pray with your whole mind and your whole heart."],
 ["The Tzemach Tzedek","הַצֶּמַח צֶדֶק","📗","1789 to 1866 · 3rd Chabad Rebbe",
  ["Rabbi Menachem Mendel was the Alter Rebbe's grandson. His mother passed away when he was little, and his grandfather raised him and taught him Torah.",
   "He wrote books of Jewish law called “Tzemach Tzedek,” and that became his name.",
   "The Russian government wanted to take Jewish children away from Torah. The Tzemach Tzedek stood up to them again and again, even when it was dangerous."],
  "Stand up for every Jewish child."],
 ["The Rebbe Maharash","הָרַבִּי מַהֲרַ״שׁ","🦘","1834 to 1882 · 4th Chabad Rebbe",
  ["Rabbi Shmuel, the Rebbe Maharash, was the youngest son of the Tzemach Tzedek.",
   "He traveled all over Europe to meet government leaders and help Jews who were being treated badly.",
   "He taught: “People say, if you can't go under a problem, try to go over it. I say: go over it right from the start!” In Yiddish: “Lechatchila ariber!”"],
  "Don't look for the easy way around. Jump right over the problem!"],
 ["The Rebbe Rashab","הָרַבִּי רַשַׁ״ב","🏫","1860 to 1920 · 5th Chabad Rebbe",
  ["When Rabbi Sholom DovBer was a little boy, he cried to his grandfather, the Tzemach Tzedek: “Why did Hashem show Himself to Avraham, but not to me?”",
   "His grandfather answered: “When a tzaddik who is 99 years old decides to do what Hashem wants, he deserves for Hashem to show Himself to him.”",
   "When he grew up, he started the yeshiva Tomchei Temimim. He called his students “lamplighters,” because they would light up the world with Torah."],
  "Want to be close to Hashem, and do what He wants, even when it's hard."],
 ["The Frierdiker Rebbe","הָרַבִּי רַיַּ״ץ","🗽","1880 to 1950 · 6th Chabad Rebbe",
  ["Rabbi Yosef Yitzchak lived in Russia when the Communists tried to stop all Jewish life. He secretly kept schools, shuls and mikvahs open.",
   "In 1927 they arrested him and wanted to kill him. But Hashem saved him, and he was set free on the 12th of Tammuz, a day Chassidim still celebrate!",
   "In 1940 he came to America. People said Torah couldn't grow there, but he said: “America is not different!” He started schools and moved into 770 Eastern Parkway."],
  "Never be afraid to stand up for Torah."],
 ["The Lubavitcher Rebbe","הָרַבִּי","🕯️","1902 to 1994 · 7th Chabad Rebbe",
  ["The Rebbe, Rabbi Menachem Mendel Schneerson, was the seventh Chabad Rebbe. He was the son-in-law of the Frierdiker Rebbe, and he lived at 770 Eastern Parkway in Brooklyn.",
   "He sent thousands of Jewish families, called shluchim, all over the world to help every Jew, from big cities to tiny islands.",
   "On Sundays he stood for hours handing out dollars for tzedakah to everyone in line, sometimes thousands of people!"],
  "A little bit of light pushes away a lot of darkness. Every mitzvah counts."]
];

VIEWS.push("sages"); S.sages=S.sages||{};

/* Home card: after the holidays card */
$(document.getElementById("openHol")?"openHol":"openPa").insertAdjacentHTML("afterend",`<button class="blitzcard sagecard" id="openSages" type="button"><span class="em sgem">${sageSvg()}</span>
  <span><b>Meet the Sages</b><span>Stories about the great teachers of the Jewish people.</span></span><span class="bzs" id="sgProg"></span></button>`);
$("openSages").onclick=()=>{ sfx.pop(); openSages() };
function paintSgHome(){ const n=SAGES.filter(s=>S.sages[s[0]]).length; if($("sgProg")) $("sgProg").textContent=n?`${n} of ${SAGES.length} learned`:"" }

/* Screen */
$("party").insertAdjacentHTML("beforebegin",`<div class="wrap" id="sages" hidden>
  <div class="toprow"><button class="back" id="sgBack" type="button">← Home</button><button class="back" id="sgList" type="button" hidden>All sages</button></div>
  <div class="phead"><div class="he" lang="he">חֲכָמִים</div><h2 id="sgH">Meet the Sages</h2><p class="when" id="sgWhen"></p></div>
  <div id="sgMain" style="display:flex;flex-direction:column;gap:16px"></div>
  <div class="buddy"><span class="ywrap" id="sgY"></span><div class="bubble" id="sgBubble" aria-live="polite"></div></div>
  <div class="bmact" id="sgAct"></div>
</div>`);
$("sgBack").onclick=()=>{ sfx.tick(); $("sages").hidden=true; goHome() };
$("sgList").onclick=()=>{ sfx.tick(); SV=null; renderSg(); toTop() };
document.addEventListener("click",e=>{ if(e.target.closest("[data-nav],#openAbc,#openBlitz,#openBM,#openPa,#openHol,.pitem")&&!e.target.closest("#sages")) $("sages").hidden=true },true);

let SV=null;
function openSages(i){ stopPlay(); window._fromBM=false; showOnly("sages"); SV=i>=0?{i,step:0}:null; renderSg();
  document.querySelectorAll("[data-nav]").forEach(b=>b.removeAttribute("aria-current")) }
function renderSg(){ $("sgY").innerHTML=yossi(); $("sgList").hidden=!SV;
  if(!SV) return renderSgList();
  const s=SAGES[SV.i];
  $("sgH").textContent=s[0]; $("sgWhen").textContent=s[3];
  $("sgMain").innerHTML=`<div class="pabig"><div class="sgbig">${sageSvg()}</div><div class="pahe" lang="he">${s[1]}</div><h3>${esc(s[0])}</h3><p>${esc(s[3])}</p></div>
    <div class="pasteps">${s[4].map((t,k)=>`<div class="pastep"${k>SV.step?" hidden":""}><span class="n">${k+1}</span><span>${esc(t)}</span></div>`).join("")}</div>`;
  sgCoach() }
function renderSgList(){ $("sgH").textContent="Meet the Sages"; $("sgWhen").textContent="Tap a sage to hear their story. They're in order, oldest first.";
  const SGHEAD={"Avraham Avinu":"Our Fathers, the Avos","Moshe Rabbeinu":"Great Teachers","The Baal Shem Tov":"Chassidus and the Chabad Rebbes"};
  $("sgMain").innerHTML=`<div class="plist">${SAGES.map((s,i)=>`${SGHEAD[s[0]]?`<h3 class="fg-h">${SGHEAD[s[0]]}</h3>`:""}<button class="pitem" type="button" data-sg="${i}"><span class="sgsm">${sageSvg()}</span>
     <span class="pname"><b>${esc(s[0])}</b><span>${esc(s[3])}${S.sages[s[0]]?" · learned ✓":""}</span></span>
     <span class="pright"><span class="he" lang="he">${s[1]}</span></span></button>`).join("")}</div>`;
  document.querySelectorAll("[data-sg]").forEach(b=>b.onclick=()=>{ sfx.pop(); SV={i:+b.dataset.sg,step:0}; renderSg(); toTop() });
  const next=SAGES.findIndex(s=>!S.sages[s[0]]);
  bubble("sgBubble",next<0?"You learned about every sage! Yasher koach! 🎉":`These are the great teachers of our people. Let's start with <b>${esc(SAGES[next][0])}</b>!`);
  $("sgAct").innerHTML="" }
function sgCoach(){ const s=SAGES[SV.i], act=$("sgAct");
  if(SV.step<s[4].length-1){ bubble("sgBubble",SV.step===0?`Let me tell you about <b>${esc(s[0])}</b>! ${s[2]}`:pick(["And then…","Now here's the amazing part!","Listen to this…"]));
    act.innerHTML=`<button class="btn gold big" id="sgNx" type="button">What happened next? →</button>`;
    $("sgNx").onclick=()=>{ sfx.tick(); SV.step++; const el=document.querySelectorAll("#sgMain .pastep")[SV.step]; if(el){ el.hidden=false; el.scrollIntoView({block:"center",behavior:"smooth"}) } sgCoach() }; return }
  bubble("sgBubble",`<b>Lesson:</b> ${esc(s[5])}`); mood($("sgY"),"cheer");
  const done=!!S.sages[s[0]], nx=SV.i+1<SAGES.length?SV.i+1:-1;
  act.innerHTML=`${done?"":`<button class="btn gold big" id="sgGot" type="button">I learned it! +2 gelt ✓</button>`}${nx>=0?`<button class="btn${done?" gold big":""}" id="sgNext" type="button">Next: ${esc(SAGES[nx][0])} →</button>`:""}<button class="btn ghost" id="sgAll" type="button">← All sages</button>`;
  if($("sgGot")) $("sgGot").onclick=()=>{ S.sages[s[0]]=true; S.gelt+=2; save(); party(true); sfx.klezmer(); toast(s[0]+" learned! +2 gelt"); paintSgHome(); sgCoach() };
  if($("sgNext")) $("sgNext").onclick=()=>{ sfx.pop(); SV={i:nx,step:0}; renderSg(); toTop() };
  $("sgAll").onclick=()=>{ sfx.tick(); SV=null; renderSg(); toTop() } }

document.head.insertAdjacentHTML("beforeend",`<style>
.sagecard{background:linear-gradient(135deg,#4a2c12,#946409 55%,#1d3d8c);box-shadow:0 5px 0 #2e1a08}
.sagecard .sgem{animation:none;width:58px;height:58px}
.sgimg{width:100%;height:100%;display:block}
.sgbig{width:120px;height:120px}
.sgsm{width:44px;height:44px;flex:none}
.sagecard b,.sagecard .bzs{color:#fff4d6}
[data-acc="sef"] .sagecard{background:linear-gradient(135deg,#5a2a10,#c06a2a 55%,#0d6b69);box-shadow:0 5px 0 #2e1a08}
</style>`);
const _rH=renderHome; renderHome=function(){ _rH(); paintSgHome() };
window.openSages=openSages; paintSgHome(); if(location.hash==="#sages") openSages();
})();
