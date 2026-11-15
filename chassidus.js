/* ================= CHASSIDUS: a daily teaching + the Chassidic calendar ================= */
(function(){
// [emoji, title, hebrew, sound-out, meanings by word (|), source, teaching, story or mashal, do it today]
const T=[
["🍃","Hashem guides every little thing","אֵין עוֹד מִלְבַדּוֹ","Ein od mil-va-do","There is no|other|besides Him","Devarim 4:35",
 "The Baal Shem Tov taught <b>hashgacha pratis</b>: Hashem watches over and guides <b>every single detail</b> in the world, even a leaf blowing in the wind.",
 "The Baal Shem Tov once showed his students a leaf blowing in the wind. He told them: Hashem decided exactly where that leaf would land, because a little worm underneath needed shade. Nothing happens by accident!",
 "When something happens today, big or small, ask yourself: what is Hashem showing me?"],
["👥","Two souls inside you","נֶפֶשׁ אֱלֹקִית","Ne-fesh E-lo-kis","A soul|G-dly","Tanya, chapters 1–2",
 "The Tanya teaches that every Jew has <b>two souls</b>. The <b>nefesh habahamis</b> (animal soul) wants what feels good right now. The <b>nefesh Elokis</b> (G-dly soul) wants to be close to Hashem.",
 "Mashal: it's like two kids in one car who both want to steer. Your job is to let the G-dly soul hold the wheel, and teach the other one to come along for the ride.",
 "Next time you feel a tug to do something wrong, say to yourself: “My G-dly soul is in charge!”"],
["✨","A piece of Hashem","חֵלֶק אֱלוֹקַהּ מִמַּעַל מַמָּשׁ","Chei-lek E-lo-kah mi-ma-al ma-mosh","A part of|G-d|from above|truly","Tanya, chapter 2",
 "The Alter Rebbe writes that the soul of every Jew is “<b>truly a part of Hashem above</b>.” That means every Jew you meet has something holy and precious inside.",
 "Mashal: when a child is born, it comes from the deepest part of the parents. In the same way, our neshamah comes from the deepest place in Hashem.",
 "Treat everyone today, even someone who annoys you, like they have a piece of Hashem inside. Because they do!"],
["🧠","Your head can lead your heart","מוֹחַ שַׁלִּיט עַל הַלֵּב","Mo-ach sha-lit al ha-leiv","The mind|rules|over|the heart","Tanya, chapter 12",
 "Hashem made people so that the <b>mind can rule over the heart</b>. You can't always choose how you feel, but you can always choose what you <b>think, say and do</b>.",
 "Mashal: a horse is strong, but the rider decides where to go. Your feelings are the horse. Your mind is the rider holding the reins.",
 "When you feel angry or lazy today, stop and let your head decide what to do next."],
["😊","Serve Hashem with joy","עִבְדוּ אֶת ה׳ בְּשִׂמְחָה","Iv-du es Hashem b'sim-choh","Serve|(the)|Hashem|with joy","Tehillim 100:2",
 "Chassidus teaches that <b>simcha</b> is not a “bonus.” It's part of serving Hashem. A mitzvah done happily has a special shine.",
 "Mashal: a king gets two gifts. One is brought with a frown, one with a big smile. Which one makes the king happier?",
 "Do one mitzvah today with a big smile, even one you usually find boring."],
["👶","Ahavas Yisroel comes first","וְאָהַבְתָּ לְרֵעֲךָ כָּמוֹךָ","V'o-hav-to l'rei-a-cho ko-mo-cho","And you shall love|your friend|like yourself","Vayikra 19:18",
 "The Baal Shem Tov taught that we must love <b>every Jew</b>, even one we've never met. The Alter Rebbe said ahavas Yisroel is the doorway to loving Hashem.",
 "The Alter Rebbe's son was once learning Torah so deeply that he didn't hear a baby crying in the house. The Alter Rebbe came down and comforted the baby himself, then told his son: no matter how high your learning is, you must always hear a child who cries.",
 "Notice someone who needs help today, and help them before they ask."],
["🕯️","A little light pushes away a lot of darkness","מְעַט מִן הָאוֹר דּוֹחֶה הַרְבֵּה מִן הַחֹשֶׁךְ","M'at min ha-or do-cheh har-beh min ha-cho-shech","A little|of|the light|pushes away|a lot|of|the darkness","A Chassidic teaching",
 "You don't need to fight darkness with a stick. Just <b>turn on a light</b>, and the darkness disappears by itself. One good deed chases away a lot of bad.",
 "Think of a dark room. Even one small candle lights up the whole space, and you can see everything.",
 "Do one extra mitzvah today. You're adding light to the whole world!"],
["🏠","Make a home for Hashem","דִּירָה בַּתַּחְתּוֹנִים","Di-roh ba-tach-to-nim","A home|in the lower worlds","Midrash Tanchuma; Tanya, chapter 36",
 "Why did Hashem make the world? The Midrash says: Hashem wanted a <b>home down here</b>, in our everyday world. Every mitzvah adds another “room” to that home.",
 "Mashal: a king has many palaces, but he is most at home in the house his children built for him with their own hands.",
 "Make your own room a little more holy today: put a tzedakah box, a siddur or a Chumash where you can see it."],
["👕","Three garments of the soul","מַחֲשָׁבָה דִּבּוּר וּמַעֲשֶׂה","Ma-cha-sho-voh di-bur u-ma-a-seh","Thought|speech|and action","Tanya, chapter 4",
 "The Tanya says the soul wears three “garments”: <b>thought, speech and action</b>. When we think Torah, speak words of kindness and do mitzvos, our soul is dressed in beautiful clothes.",
 "Just as clothes show the world who you are, your thoughts, words and actions show the world your neshamah.",
 "Check your three garments today: one good thought, one kind word and one mitzvah."],
["💭","Think good and it will be good","טְרַאכְט גוּט וֶועט זַיין גוּט","Tracht gut vet zain gut","Think|good|will|be|good","The Tzemach Tzedek (Yiddish)",
 "The Tzemach Tzedek taught: <b>think good, and it will be good</b>. Trusting with all your heart that Hashem will make things good actually helps bring the good.",
 "A chassid once came to the Tzemach Tzedek, very worried about his sick son. The Rebbe answered with these words: “Tracht gut vet zain gut.” The chassid went home trusting, and his son got better.",
 "When you start worrying today, say to yourself: “Tracht gut vet zain gut!”"],
["📅","Live with the parsha","לֶעבְּן מִיט דֶער צַייט","Lebn mit der tzait","Live|with|the|time","The Alter Rebbe (Yiddish)",
 "The Alter Rebbe said we should “<b>live with the times</b>,” meaning with the weekly <b>parsha</b>. Each week's parsha has a lesson for what's happening in your life that very week.",
 "When the parsha is about Avraham welcoming guests, it's a week to be extra welcoming. When it's about the Mishkan, it's a week to make your home holy.",
 "Open the Parsha section and find one lesson for this week."],
["🔦","Be a lamplighter","נֵר ה׳ נִשְׁמַת אָדָם","Neir Hashem nish-mas o-dom","The candle of|Hashem|is the soul of|a person","Mishlei 20:27",
 "Every Jewish soul is like a candle waiting to be lit. Chassidim say we should be like the old-time <b>lamplighters</b>, who walked the streets lighting every lamp, one by one.",
 "A lamplighter didn't skip any lamp, even the ones far away on a dark street. Every soul is worth lighting!",
 "Help someone do a mitzvah today: remind a friend to say a bracha, or share something you learned."],
["🔎","Learn from everything","מִכָּל מְלַמְּדַי הִשְׂכַּלְתִּי","Mi-kol m'lam'dai his-kal-ti","From all|my teachers|I became wise","Tehillim 119:99",
 "The Baal Shem Tov taught that <b>everything you see or hear</b> can teach you a lesson in serving Hashem, if you look for it.",
 "A train teaches: one minute late and you miss it, so don't waste time. A telephone teaches: what you say here is heard there. A telegram teaches: every word counts!",
 "Find one lesson today from something ordinary you see."],
["🌍","Hashem in everything you do","בְּכָל דְּרָכֶיךָ דָעֵהוּ","B'chol d'ro-che-cho do-ei-hu","In all|your ways|know Him","Mishlei 3:6",
 "Serving Hashem isn't only in shul. Chassidus teaches we can serve Hashem <b>in everything</b>: eating to have strength, sleeping to learn better, playing to be happy and healthy.",
 "Even food becomes holy when you say a bracha first and use the energy to do good things.",
 "Before eating or playing today, think: “I'm doing this so I can serve Hashem better.”"],
["🎶","Hashem wants the heart","רַחֲמָנָא לִבָּא בָּעֵי","Ra-cha-mo-no li-bo bo-ei","The Merciful One|the heart|wants","Gemara, Sanhedrin 106b",
 "Hashem cares most about <b>what's in your heart</b>, not how fancy your words are.",
 "A simple shepherd boy came to the Baal Shem Tov's shul on Yom Kippur. He couldn't read, so he blew a loud whistle with all his heart. People were upset, but the Baal Shem Tov said: that whistle opened the gates of heaven for everyone's prayers!",
 "Say one prayer today slowly, really meaning every word."],
["🧭","Spread out in every direction","וּפָרַצְתָּ יָמָּה וָקֵדְמָה וְצָפֹנָה וָנֶגְבָּה","U-fo-ratz-to yo-moh vo-keid-moh v'tzo-fo-noh vo-neg-boh","And you will spread out|west|and east|and north|and south","Bereishis 28:14",
 "Hashem promised Yaakov his children would <b>spread out everywhere</b>. Chabad took this as its motto: bring Torah and mitzvos to every corner of the world.",
 "That's why the Rebbe sent shluchim to every place, from big cities to tiny towns, so every Jew has someone nearby to help them.",
 "Bring a little Judaism somewhere new today: a bracha out loud at a friend's house, or a Shabbos candle reminder."],
["👑","Waiting for Moshiach","אֲנִי מַאֲמִין בֶּאֱמוּנָה שְׁלֵמָה בְּבִיאַת הַמָּשִׁיחַ","A-ni ma-a-min be-e-mu-noh sh'lei-moh b'vi-as ha-Mo-shi-ach","I|believe|with faith|complete|in the coming of|Moshiach","The Rambam's 13 principles",
 "We believe Moshiach will come and bring peace to the whole world. We don't just wait. We <b>get ready</b> by adding in mitzvos and kindness.",
 "The Rebbe taught that every single mitzvah could be the one that tips the scale and brings Moshiach.",
 "Do one mitzvah today with the thought: “This one is for Moshiach!”"],
["🤲","Trust Hashem","הַשְׁלֵךְ עַל ה׳ יְהָבְךָ","Hash-leich al Hashem y'hov-cho","Throw|onto|Hashem|your burden","Tehillim 55:23",
 "<b>Bitachon</b> means trusting that Hashem takes care of us. We do our part, and we let Hashem carry the heavy worries.",
 "Mashal: a little child on a parent's shoulders doesn't worry about the road. They know they're being carried.",
 "Pick one worry today and “give it to Hashem.” Then smile!"],
["💰","Tzedakah brings the Geulah","גְּדוֹלָה צְדָקָה שֶׁמְּקָרֶבֶת אֶת הַגְּאֻלָּה","G'do-loh tz'do-koh she-m'ka-re-ves es ha-g'u-loh","Great is|tzedakah|because it brings close|(the)|the redemption","Gemara, Bava Basra 10a",
 "Tzedakah is so great that it <b>brings the Geulah closer</b>. That's why Chassidim give a coin before davening every weekday.",
 "For many years, on Sundays, the Rebbe stood for hours handing out dollars to thousands of people, so that each person would give it to tzedakah.",
 "Put a coin in your pushka today (if it's not Shabbos or Yom Tov)."],
["📖","Learn a little every day","וְהָגִיתָ בּוֹ יוֹמָם וָלַיְלָה","V'ho-gi-so bo yo-mom vo-lai-loh","And you shall think|in it|day|and night","Yehoshua 1:8",
 "Torah learning should be part of <b>every day and every night</b>. The Frierdiker Rebbe asked every Jew to learn <b>Chitas</b>, a little Chumash, Tehillim and Tanya each day.",
 "Just like your body needs food every day, your neshamah needs Torah every day.",
 "Learn the parsha's pasuk in this app today, or say one chapter of Tehillim."],
["🌱","Small steps, big growth","כָּל הַתְחָלוֹת קָשׁוֹת","Kol has-cho-los ko-shos","All|beginnings|are hard","Rashi, Shemos 19:5",
 "Starting something new is hard, but it gets easier. In serving Hashem, we go <b>step by step</b>, higher and higher.",
 "Remember learning to ride a bike? At first you wobbled. Now you don't even think about it. Mitzvos work the same way.",
 "Start one new good habit today, even a tiny one."],
["🎉","Joy breaks through walls","שִׂמְחָה פּוֹרֶצֶת גֶּדֶר","Sim-choh po-re-tzes ge-der","Joy|breaks through|a fence","A Chassidic saying",
 "When we're truly happy, we can do things we thought were impossible. <b>Simcha breaks through</b> every limit.",
 "At a Chassidic farbrengen, people sing and dance together, and suddenly they feel strong enough to take on big new goals.",
 "Sing a niggun or a happy song today, and then try something hard."],
["🌟","Hashem fills the whole world","מְלֹא כָל הָאָרֶץ כְּבוֹדוֹ","M'lo chol ho-o-retz k'vo-do","Full is|all|the earth|of His glory","Yeshayahu 6:3",
 "Hashem is not only in heaven or in shul. His glory <b>fills the entire world</b>, every place and every moment.",
 "A famous Chassidic story: someone told a little boy, “I'll give you a coin if you tell me where Hashem is.” The boy answered: “I'll give you two coins if you tell me where He <b>isn't</b>!”",
 "Look around today and find one place you feel Hashem: in nature, in a kind person, or in a happy moment."],
["🙏","Hashem is always waiting","שׁוּבוּ אֵלַי וְאָשׁוּבָה אֲלֵיכֶם","Shu-vu ei-lai v'o-shu-voh a-lei-chem","Return|to Me|and I will return|to you","Malachi 3:7",
 "<b>Teshuvah</b> isn't only for Yom Kippur. Any moment is a chance to come back to Hashem, and Hashem comes toward us too.",
 "Mashal: a child who wandered away hears their parent calling. The moment they turn around, the parent is already running toward them.",
 "If you did something wrong today, say sorry, to the person and to Hashem, and start fresh."],
["🧒","Teach each child their way","חֲנֹךְ לַנַּעַר עַל פִּי דַרְכּוֹ","Cha-noch la-na-ar al pi dar-ko","Teach|the child|according|to|his way","Mishlei 22:6",
 "Every child is different. Chinuch means teaching each child <b>in the way that fits them</b>, so the Torah stays with them their whole life.",
 "The Rebbe paid special attention to children: he set up Tzivos Hashem so every kid could feel like a soldier in Hashem's army.",
 "Teach a younger sibling or friend something you learned in this app."],
["🕊️","The world is built on kindness","עוֹלָם חֶסֶד יִבָּנֶה","O-lom che-sed yi-bo-neh","The world|with kindness|will be built","Tehillim 89:3",
 "Hashem built the world with <b>chesed</b>, kindness, and we keep building it with our own acts of kindness.",
 "Every kind act is like a brick. Brick by brick, we build a world that's ready for Moshiach.",
 "Do three acts of kindness today and count them!"],
["🗣️","Guard your tongue","נְצֹר לְשׁוֹנְךָ מֵרָע","N'tzor l'shon-cho mei-ra","Guard|your tongue|from bad","Tehillim 34:14",
 "Words are powerful. Chassidus teaches that speech is one of the soul's garments. Using it for <b>good words only</b> makes your neshamah shine.",
 "A feather pillow ripped open in the wind can't be collected again. Hurtful words are the same. Once they're out, it's hard to take them back.",
 "Say only good things about other people today. If you can't, say nothing!"],
["😌","Humble like Moshe","וְהָאִישׁ מֹשֶׁה עָנָיו מְאֹד","V'ho-ish Mo-sheh o-nov m'od","And the man|Moshe|was humble|very","Bamidbar 12:3",
 "Moshe was the greatest leader, yet the <b>most humble</b>. He knew all his talents were gifts from Hashem.",
 "The Tanya explains that Moshe thought: if someone else had my gifts, maybe they would do even more with them.",
 "When you do something great today, quietly thank Hashem for giving you the strength."],
["🕯️","Shabbos lights up the week","זָכוֹר אֶת יוֹם הַשַּׁבָּת לְקַדְּשׁוֹ","Zo-chor es yom ha-Sha-bos l'ka-d'sho","Remember|(the)|the day of|Shabbos|to make it holy","Shemos 20:8",
 "We <b>remember Shabbos all week long</b>. The Ramban says when you find something special on Sunday or Monday, save it for Shabbos!",
 "Many Chassidim count the days of the week toward Shabbos: “Today is the first day toward Shabbos…”",
 "Do one thing today to get ready for Shabbos, even if it's days away."]
];
// Chassidic calendar: [day, month (as the calendar names it), title, Hebrew name, what happened, link to the Sages card (index) or -1]
const DATES=[
[13,"Tishri","Yom Hilula of the Rebbe Maharash","י״ג תִּשְׁרֵי","The day of the histalkus of the fourth Chabad Rebbe, Rabbi Shmuel, in 5643 (1882). He taught “<b>Lechatchilah ariber</b>”: don't go around an obstacle, go right over it!",12],
[20,"Heshvan","The Rebbe Rashab's birthday","כ׳ מַרְחֶשְׁוָן","The fifth Rebbe, Rabbi Sholom DovBer, was born in 5621 (1860). He founded the Tomchei Temimim yeshiva.",13],
[9,"Kislev","The Mitteler Rebbe's birthday and Yom Hilula","ט׳ כִּסְלֵו","The second Rebbe, Rabbi DovBer, was born on this day in 5534 (1773), and his histalkus was on the same date in 5588 (1827).",-1],
[10,"Kislev","Yud Kislev: the Mitteler Rebbe's release","י׳ כִּסְלֵו","In 5587 (1826) the Mitteler Rebbe was freed from prison, where he had been put because of false accusations.",-1],
[14,"Kislev","The Rebbe's wedding","י״ד כִּסְלֵו","The Rebbe married Rebbetzin Chaya Mushka, daughter of the Frierdiker Rebbe, in 5689 (1928) in Warsaw.",15],
[19,"Kislev","Yud-Tes Kislev: Rosh Hashanah of Chassidus","י״ט כִּסְלֵו","In 5559 (1798) the <b>Alter Rebbe</b> was freed from prison in Petersburg. Chassidim celebrate it as the “<b>Rosh Hashanah of Chassidus</b>,” the day Chassidus was allowed to spread everywhere. It's also the Yom Hilula of the Maggid of Mezritch. Farbrengen and learn Tanya!",10],
[5,"Tevet","Hei Teves: Didan Notzach","ה׳ טֵבֵת","In 5747 (1987), an American court decided that the library of the Chabad Rebbeim belongs to the Chassidim, not to any one person. Chassidim call it “<b>Didan Notzach</b>,” we won! Many buy new seforim on this day.",15],
[24,"Tevet","Yom Hilula of the Alter Rebbe","כ״ד טֵבֵת","The day of the histalkus of the Alter Rebbe, author of the Tanya and the Shulchan Aruch HaRav, in 5573 (1812).",10],
[10,"Shevat","Yud Shevat","י׳ שְׁבָט","The Yom Hilula of the <b>Frierdiker Rebbe</b>, whose histalkus was in 5710 (1950). One year later, on this day in 5711 (1951), <b>the Rebbe</b> accepted the leadership of Chabad.",14],
[22,"Shevat","Chof-Beis Shevat","כ״ב שְׁבָט","The yahrzeit of <b>Rebbetzin Chaya Mushka</b>, the Rebbe's wife, in 5748 (1988). Many Jewish girls are named after her.",-1],
[2,"Nisan","Yom Hilula of the Rebbe Rashab","ב׳ נִיסָן","The day of the histalkus of the fifth Rebbe in 5680 (1920). Before his histalkus he said: “Chassidim, I'm going to heaven, and I'm leaving you the writings.”",13],
[11,"Nisan","Yud-Alef Nissan: the Rebbe's birthday","י״א נִיסָן","<b>The Rebbe</b> was born in 5662 (1902). Chassidim start saying the next chapter of Tehillim, matching the Rebbe's new age.",15],
[13,"Nisan","Yom Hilula of the Tzemach Tzedek","י״ג נִיסָן","The day of the histalkus of the third Rebbe, Rabbi Menachem Mendel, in 5626 (1866). He wrote thousands of pages of Torah, Halacha and Chassidus.",11],
[2,"Iyar","The Rebbe Maharash's birthday","ב׳ אִיָּיר","The fourth Rebbe was born in 5594 (1834).",12],
[28,"Sivan","Chof-Ches Sivan: arriving in America","כ״ח סִיוָן","In 5701 (1941), the Rebbe and Rebbetzin escaped war-torn Europe and arrived safely in America. It's the start of a new chapter of spreading Yiddishkeit.",15],
[3,"Tamuz","Gimmel Tammuz","ג׳ תַּמּוּז","The day of <b>the Rebbe's</b> histalkus, in 5754 (1994). Many people visit the Ohel to pray. It's a day to strengthen our connection to the Rebbe by adding in Torah, mitzvos and the Rebbe's teachings.",15],
[12,"Tamuz","Yud-Beis Tammuz: Chag HaGeulah","י״ב תַּמּוּז","The <b>Frierdiker Rebbe's</b> birthday (5640/1880) and the day in 5687 (1927) he was freed from Soviet prison, where he had been arrested for spreading Judaism.",14],
[20,"Av","Chof Av","כ׳ מְנַחֵם אָב","The yahrzeit of <b>Rabbi Levi Yitzchak Schneerson</b>, the Rebbe's father, in 5704 (1944). He was exiled by the Soviets for teaching Torah.",-1],
[15,"Elul","Founding of Tomchei Temimim","ט״ו אֱלוּל","In 5657 (1897) the Rebbe Rashab founded the yeshiva <b>Tomchei Temimim</b>, whose students would be like “lamplighters.”",13],
[18,"Elul","Chai Elul","ח״י אֱלוּל","The birthday of the <b>Baal Shem Tov</b> (5458/1698) and the <b>Alter Rebbe</b> (5505/1745), the founders of Chassidus and of Chabad Chassidus. Chai means “life”: this day brings new life into the coming year.",9]
];
const MON={Tishri:"Tishrei",Heshvan:"Cheshvan",Kislev:"Kislev",Tevet:"Teves",Shevat:"Shevat","Adar I":"Adar I","Adar II":"Adar II",Adar:"Adar",Nisan:"Nissan",Iyar:"Iyar",Sivan:"Sivan",Tamuz:"Tammuz",Av:"Av",Elul:"Elul"};
const MONS={Tishri:"Tishrei",Heshvan:"Cheshvan",Tevet:"Tevet",Nisan:"Nisan",Tamuz:"Tamuz"};
const hfmt=(()=>{ try{ return new Intl.DateTimeFormat("en-u-ca-hebrew",{day:"numeric",month:"long",year:"numeric"}) }catch(e){ return null } })();
function hdate(d){ if(!hfmt) return null; try{ const p=hfmt.formatToParts(d); return {day:+p.find(x=>x.type==="day").value, mon:p.find(x=>x.type==="month").value, yr:p.find(x=>x.type==="year").value} }catch(e){ return null } }
const sef=()=>S.accent==="sef";
const monName=m=>sef()?(MONS[m]||MON[m]||m):(MON[m]||m);
const tx=s=>{ if(!sef()) return s; try{ return typeof sefNames==="function"?sefNames(swapT(s)):swapT(s) }catch(e){ return s } };
const sayOf=x=>{ if(!sef()) return x[3].split(" "); try{ const t=typeof toSef==="function"&&toSef(x[2],x[3]); if(t&&t.split(" ").length===x[2].split(" ").length) return t.split(" ") }catch(e){} return x[3].split(" ").map(w=>{ try{ return swapT(w) }catch(e){ return w } }) };
const spk=he=>he.replace(/ה׳/g,"הַשֵּׁם");
function upcoming(n){ const out=[], d=new Date(); d.setHours(12,0,0,0);
  for(let k=0;k<400&&out.length<n;k++){ const h=hdate(d); if(h){ DATES.forEach(x=>{ const m=x[1]==="Adar"?/^Adar/.test(h.mon)&&h.mon!=="Adar I":h.mon===x[1]; if(m&&h.day===x[0]) out.push({x,days:k,date:new Date(d)}) }) } d.setDate(d.getDate()+1) }
  return out }
const dayNum=()=>{ const d=new Date(); return Math.floor((d-new Date(d.getFullYear(),0,0))/864e5)+d.getFullYear()*366 };
const dk=(d=new Date())=>`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
S.chs=S.chs||{days:{},seen:{},best:0};
// Shabbos and Yom Tov never break a streak
function streak(){ let n=0; const d=new Date(), hol=x=>!!(window.isHolyDay&&window.isHolyDay(x)); if(!S.chs.days[dk(d)]) d.setDate(d.getDate()-1);
  for(let k=0;k<800;k++){ if(S.chs.days[dk(d)]) n++; else if(!hol(d)) break; d.setDate(d.getDate()-1) } return n }

VIEWS.push("chs");
$("party").insertAdjacentHTML("beforebegin",`<div class="wrap" id="chs" hidden>
  <div class="toprow"><button class="back" id="chBk" type="button">← Home</button></div>
  <div class="phead"><div class="he" lang="he">חֲסִידוּת</div><h2>Chassidus</h2><p class="when" id="chWhen"></p></div>
  <div id="chBanner"></div>
  <div class="ftabs" role="tablist"><button class="ftab" type="button" role="tab" data-cht="day">🔥 Today's Teaching</button><button class="ftab" type="button" role="tab" data-cht="cal">📅 Chassidic Calendar</button></div>
  <div id="chMain" style="display:flex;flex-direction:column;gap:14px"></div>
  <footer>Teachings are explained simply in our own words, based on the Tanya, the Baal Shem Tov and the Rebbeim. Ask your rabbi to learn more!</footer>
</div>`);
let TAB="day", IDX=null;
function openChassidus(tab){ stopPlay(); window._fromBM=false; showOnly("chs"); TAB=tab||"day"; IDX=null; renderCh(); document.querySelectorAll("[data-nav]").forEach(b=>b.removeAttribute("aria-current")) }
$("chBk").onclick=()=>{ sfx.tick(); $("chs").hidden=true; goHome() };
document.addEventListener("click",e=>{ if(e.target.closest("[data-nav],#openAbc,#openWords,#openBlitz,#openBM,#openPa,#openHol,#openSages,#openFacts,#openChal,#openMitz,.pitem")&&!e.target.closest("#chs")) $("chs").hidden=true },true);
document.querySelectorAll("[data-cht]").forEach(b=>b.onclick=()=>{ sfx.tick(); TAB=b.dataset.cht; IDX=null; renderCh() });

function banner(){ const u=upcoming(1)[0]; if(!u) return "";
  const when=u.days===0?"Today":u.days===1?"Tomorrow":`In ${u.days} days`;
  return `<button class="chban${u.days===0?" today":""}" type="button" data-chd="${DATES.indexOf(u.x)}"><span class="e">${u.days===0?"🎉":"⏳"}</span><span><small>${when}</small><b>${tx(u.x[2])}</b><span lang="he">${u.x[3]}</span></span><span class="ar">›</span></button>` }
function renderCh(){ const h=hdate(new Date());
  $("chWhen").textContent=h?`Today is ${h.day} ${monName(h.mon)} ${h.yr}`:"Daily learning and special days";
  $("chBanner").innerHTML=banner(); bindDates($("chBanner"));
  document.querySelectorAll("[data-cht]").forEach(b=>b.setAttribute("aria-selected",b.dataset.cht===TAB));
  return TAB==="cal"?renderCal():renderDay() }
function renderDay(){ const today=dayNum()%T.length, i=IDX==null?today:IDX, x=T[i], he=x[2].split(" "), so=sayOf(x), gl=x[4].split("|"), done=!!S.chs.days[dk()], st=streak(), isToday=i===today;
  $("chMain").innerHTML=`<div class="mzhud"><div><b>🔥 ${st}</b><span>day${st===1?"":"s"} in a row</span></div><div><b>${Object.keys(S.chs.seen).length} / ${T.length}</b><span>teachings learned</span></div><div><b>${S.chs.best||0}</b><span>best streak</span></div></div>
   <article class="chtcard">
    <div class="chtop"><span class="e">${x[0]}</span><div><small>${isToday?"Today's teaching":"Teaching "+(i+1)+" of "+T.length}</small><h3>${tx(x[1])}</h3></div></div>
    <div class="papsk"><div class="papskh" data-noglo><b>Key words</b><span>${esc(tx(x[5]))}</span></div>
      <div class="il" dir="rtl">${he.map((w,n)=>`<button class="wc" type="button" data-chw="${n}"><span class="h" lang="he">${w}</span><span class="s">${esc(so[n]||"")}</span><span class="g">${esc(tx(gl[n]||""))}</span></button>`).join("")}</div>
      <button class="btn ghost" type="button" id="chHear">🔊 Hear it</button></div>
    <p class="chtext">${tx(x[6])}</p>
    <div class="chstory"><b>${/Rebbe|Baal Shem Tov|Tzemach|chassid|shepherd|little boy/.test(x[7])?"📖 A story":"💡 Think about it"}</b><p>${tx(x[7].replace(/^Mashal: /,""))}</p></div>
    <div class="chdo"><b>✅ Do it today</b><p>${tx(x[8])}</p></div>
   </article>
   <div class="row" style="justify-content:center;flex-wrap:wrap">${isToday?(done?`<span class="chdone">✓ Learned today! Come back tomorrow for a new one.</span>`:`<button class="btn gold big" id="chGot" type="button">I learned it! +1 gelt ✓</button>`):`<button class="btn gold" id="chToday" type="button">← Back to today's teaching</button>`}</div>
   <details class="guide"><summary>📚 All ${T.length} teachings</summary><div class="chips" style="padding-bottom:12px">${T.map((t,k)=>`<button class="chip" type="button" data-chi="${k}" aria-pressed="${k===i}">${t[0]} ${esc(tx(t[1]))}${S.chs.seen[k]?" ✓":""}</button>`).join("")}</div></details>`;
  $("chMain").querySelectorAll("[data-chw]").forEach(b=>b.onclick=()=>{ sfx.tick(); $("chMain").querySelectorAll(".wc.on").forEach(y=>y.classList.remove("on")); b.classList.add("on"); speakPhrase(spk(he[+b.dataset.chw])) });
  $("chHear").onclick=()=>{ sfx.tick(); speakPhrase(spk(x[2])) };
  if($("chGot")) $("chGot").onclick=()=>{ S.chs.days[dk()]=true; S.chs.seen[i]=true; S.gelt=(S.gelt||0)+1; S.chs.best=Math.max(S.chs.best||0,streak()); save(); sfx.right(3); setTimeout(sfx.coin,160); party(false); toast("Yasher koach! +1 gelt"); paintChHome(); renderDay() };
  if($("chToday")) $("chToday").onclick=()=>{ sfx.tick(); IDX=null; renderDay(); toTop() };
  $("chMain").querySelectorAll("[data-chi]").forEach(b=>b.onclick=()=>{ sfx.tick(); IDX=+b.dataset.chi; S.chs.seen[IDX]=true; save(); renderDay(); toTop() }) }
/* ---------- Chitas: Chumash, Tehillim, Tanya every day (the Frierdiker Rebbe's takanah) + Hayom Yom ---------- */
const TEH=["","1–9","10–17","18–22","23–28","29–34","35–38","39–43","44–48","49–54","55–59","60–65","66–68","69–71","72–76","77–78","79–82","83–87","88–89","90–96","97–103","104–105","106–107","108–112","113–118","119:1–96","119:97–176","120–134","135–139","140–144","145–150"];
const ALIYA=["Rishon (1st)","Sheini (2nd)","Shlishi (3rd)","Revi'i (4th)","Chamishi (5th)","Shishi (6th)","Shevi'i (7th)"];
const LINK={c:"https://www.chabad.org/dailystudy/torahreading.asp",t:"https://www.chabad.org/dailystudy/tehillim.asp",y:"https://www.chabad.org/dailystudy/tanya.asp",h:"https://www.chabad.org/dailystudy/hayomyom.asp"};
S.chit=S.chit||{days:{},best:0};
function chitToday(){ return S.chit.days[dk()]=S.chit.days[dk()]||{} }
function chitAll(d){ const x=S.chit.days[dk(d)]; return !!(x&&x.c&&x.t&&x.y) }
function chitStreak(){ let n=0; const d=new Date(), hol=x=>!!(window.isHolyDay&&window.isHolyDay(x)); if(!chitAll(d)) d.setDate(d.getDate()-1);
  for(let k=0;k<800;k++){ if(chitAll(d)) n++; else if(!hol(d)) break; d.setDate(d.getDate()-1) } return n }
function renderChitas(){ const now=new Date(), h=hdate(now), tom=new Date(now); tom.setDate(tom.getDate()+1); const ht=hdate(tom);
  let teh=h?TEH[h.day]:""; if(h&&h.day===29&&ht&&ht.day===1) teh="140–150";
  const pa=$("paHomeT"), parsha=pa?pa.textContent.replace(/^This week: /,"").replace(/^This Shabbos: /,""):"this week's parsha";
  const t=chitToday(), st=chitStreak();
  const row=(k,e,name,he,what)=>`<div class="ctrow${t[k]?" ok":""}"><button class="ctchk" type="button" data-ct="${k}" aria-pressed="${!!t[k]}" aria-label="${name}${t[k]?", done":""}"><span class="box">${t[k]?"✓":""}</span></button>
    <div><b>${e} ${name} <span lang="he">${he}</span></b><small>${what}</small><a class="ctlink" href="${LINK[k]}" target="_blank" rel="noopener noreferrer">Learn today's ${name} on Chabad.org ↗</a></div></div>`;
  $("ctMain").innerHTML=`<div class="buddy compact"><span class="ywrap">${yossi(t.c&&t.t&&t.y?"cheer":"")}</span><div class="bubble"><span class="name">Shlomo</span>The Frierdiker Rebbe asked every Jew to learn <b>Chitas</b> every day: a bit of <b>Ch</b>umash, <b>T</b>ehillim and Tany<b>a</b>. The Rebbe said it brings blessing and protection all day!</div></div>
   <div class="mzhud"><div><b>${["c","t","y"].filter(k=>t[k]).length} / 3</b><span>done today</span></div><div><b>🔥 ${st}</b><span>day${st===1?"":"s"} in a row</span></div><div><b>${S.chit.best||0}</b><span>best streak</span></div></div>
   <div class="ctlist">
    ${row("c","📖","Chumash","חוּמָשׁ",`${esc(parsha)}: today is <b>${ALIYA[now.getDay()]}</b>, with Rashi.`)}
    ${row("t","🎵","Tehillim","תְּהִלִּים",h?`Day ${h.day} of ${monName(h.mon)}: chapters <b>${teh}</b>.`:"Today's chapters from the monthly cycle.")}
    ${row("y","💡","Tanya","תַּנְיָא","Today's portion of the Tanya, from the yearly cycle.")}
   </div>
   <div class="ctyom"><b>📜 Hayom Yom</b><p>The Rebbe's book with a <b>short teaching for every day</b> of the year: a custom, a story or a Chassidic thought.</p>
    <a class="btn gold" href="${LINK.h}" target="_blank" rel="noopener noreferrer">Read today's Hayom Yom ↗</a></div>
   <p class="note">💡 A grown-up can help you open the links. On <b>Shabbos</b>, learn Chitas from a real Chumash, Tehillim and Tanya, and your streak stays safe!</p>`;
  $("ctMain").querySelectorAll("[data-ct]").forEach(b=>b.onclick=()=>{ const k=b.dataset.ct, x=chitToday();
    if(x[k]){ delete x[k]; S.gelt=Math.max(0,(S.gelt||0)-1); sfx.tick() } else { x[k]=true; S.gelt=(S.gelt||0)+1; sfx.right(2); setTimeout(sfx.coin,150); if(x.c&&x.t&&x.y){ setTimeout(()=>{ party(true); toast("Chitas complete! 🎉") },250) } else toast("+1 gelt") }
    S.chit.best=Math.max(S.chit.best||0,chitStreak()); save(); paintChitHome(); const y=scrollY; renderChitas(); scrollTo(0,y) }) }
/* Chitas has its own screen and its own Home card, right after Daily Mitzvos */
VIEWS.push("chit");
$("party").insertAdjacentHTML("beforebegin",`<div class="wrap" id="chit" hidden>
  <div class="toprow"><button class="back" id="ctBk" type="button">← Home</button></div>
  <div class="phead"><div class="he" lang="he">חִת״ת</div><h2>Chitas</h2><p class="when" id="ctWhen">Chumash, Tehillim and Tanya, every day</p></div>
  <div id="ctMain" style="display:flex;flex-direction:column;gap:14px"></div>
</div>`);
function openChitas(){ stopPlay(); window._fromBM=false; showOnly("chit"); const h=hdate(new Date()); $("ctWhen").textContent=h?`Today is ${h.day} ${monName(h.mon)} ${h.yr}`:"Chumash, Tehillim and Tanya, every day"; renderChitas(); document.querySelectorAll("[data-nav]").forEach(b=>b.removeAttribute("aria-current")) }
$("ctBk").onclick=()=>{ sfx.tick(); $("chit").hidden=true; goHome() };
document.addEventListener("click",e=>{ if(e.target.closest("[data-nav],#openAbc,#openWords,#openBlitz,#openBM,#openPa,#openHol,#openSages,#openFacts,#openChal,#openMitz,#openChs,#openShop,#openChan,.pitem")&&!e.target.closest("#chit")) $("chit").hidden=true },true);
($("openMitz")||$("openFacts")||$("openPa")).insertAdjacentHTML("afterend",`<button class="blitzcard" id="openChit" type="button"><span class="em" aria-hidden="true">📚</span>
  <span><b>Chitas</b><span>A little Chumash, Tehillim and Tanya every day.</span></span><span class="bzs" id="ctHomeR"></span></button>`);
$("openChit").onclick=()=>{ sfx.pop(); openChitas() };
function paintChitHome(){ const r=$("ctHomeR"); if(!r) return; const t=S.chit.days[dk()]||{}, n=["c","t","y"].filter(k=>t[k]).length, st=chitStreak();
  r.textContent=n===3?`✓ Done today${st?` · 🔥 ${st}`:""}`:`${n} of 3 today${st?` · 🔥 ${st}`:""}` }
window.openChitas=openChitas;
function renderCal(){ const up=upcoming(DATES.length);
  $("chMain").innerHTML=`<p class="when" style="text-align:center;margin:0">Special days in Chabad history, starting from today</p>
   <div class="chcal">${up.map(u=>{ const x=u.x, d=u.date.toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"});
     return `<div class="chdate${u.days===0?" today":""}"><div class="chdh"><div><b>${tx(x[2])}</b><small>${x[0]} ${monName(x[1])} · ${d}${u.days===0?" · <em>Today!</em>":u.days===1?" · tomorrow":` · in ${u.days} days`}</small></div><span lang="he">${x[3]}</span></div>
       <p>${tx(x[4])}</p>${x[5]>=0&&window.openSages?`<button class="fg-go" type="button" data-sg="${x[5]}">Meet this Rebbe in Sages →</button>`:""}</div>` }).join("")}</div>`;
  $("chMain").querySelectorAll("[data-sg]").forEach(b=>b.onclick=()=>{ sfx.pop(); $("chs").hidden=true; window.openSages(+b.dataset.sg) }) }
function bindDates(root){ root.querySelectorAll("[data-chd]").forEach(b=>b.onclick=()=>{ sfx.tick(); TAB="cal"; renderCh(); setTimeout(()=>{ const el=$("chMain").querySelector(".chdate"); if(el) el.scrollIntoView({block:"center",behavior:"smooth"}) },60) }) }

/* Home card, after Daily Mitzvos */
const anchor=$("openMitz")||$("openFacts")||$("openPa");
anchor.insertAdjacentHTML("afterend",`<button class="blitzcard chcard2" id="openChs" type="button"><span class="em" aria-hidden="true">🔥</span>
  <span><b>Chassidus</b><span id="chHomeS">A new Chassidic teaching every day, and special days in Chabad history.</span></span><span class="bzs" id="chHomeR"></span></button>`);
$("openChs").onclick=()=>{ sfx.pop(); openChassidus() };
function paintChHome(){ const r=$("chHomeR"), s=$("chHomeS"); if(!r) return; const u=upcoming(1)[0], st=streak();
  if(u&&u.days<=14) s.innerHTML=u.days===0?`🎉 Today is <b>${tx(u.x[2])}</b>!`:`📅 ${tx(u.x[2])} is in ${u.days} day${u.days===1?"":"s"}`;
  else s.textContent="A new Chassidic teaching every day, and special days in Chabad history.";
  r.textContent=S.chs.days[dk()]?`✓ Learned today${st?` · 🔥 ${st}`:""}`:st?`🔥 ${st} day${st===1?"":"s"} in a row`:"" }
const _rH=renderHome; renderHome=function(){ _rH(); paintChHome(); paintChitHome() };
document.addEventListener("click",e=>{ if(e.target.closest("[data-setacc]")) setTimeout(()=>{ paintChHome(); if(!$("chs").hidden) renderCh() },0) });

document.head.insertAdjacentHTML("beforeend",`<style>
.chcard2{background:linear-gradient(135deg,#7a1f1f,#c2410c 55%,#e3ad3a);box-shadow:0 5px 0 #4a1010}
.chcard2 b,.chcard2 .bzs{color:#fff4d6}.chcard2 span span b{color:#fff}
[data-acc="sef"] .chcard2{background:linear-gradient(135deg,#7a2a10,#c06a2a 55%,#0d6b69)}
.chban{display:grid;grid-template-columns:40px 1fr auto;gap:10px;align-items:center;text-align:left;width:100%;border:2px solid var(--gold-hi);background:var(--klaf);border-radius:16px;padding:10px 14px;color:var(--ink)}
.chban.today{background:linear-gradient(135deg,#fff3c4,#f5cf6b);color:#3a2604}
.chban .e{font-size:1.8rem;text-align:center}
.chban small{display:block;font-size:.8rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--gold)}.chban.today small{color:#5a3b05}
.chban>span>b{display:block;font-family:var(--display);font-weight:400;font-size:1.2rem;color:var(--tech)}.chban.today b{color:#3a2604}
.chban span[lang=he]{font-family:var(--he);font-weight:600;color:var(--gold);font-size:1.05rem}
.chban .ar{font-size:1.6rem;color:var(--gold)}
.chtcard{background:var(--klaf);border:2px solid var(--rule);border-radius:20px;padding:16px 14px;display:flex;flex-direction:column;gap:12px}
.chtop{display:grid;grid-template-columns:52px 1fr;gap:12px;align-items:center}
.chtop .e{font-size:2.6rem;text-align:center}
.chtop small{font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gold)}
.chtop h3{font-family:var(--display);font-weight:400;font-size:1.5rem;color:var(--tech);line-height:1.15}
.chtcard .papsk{box-shadow:none}
.chtext{margin:0;font-family:var(--text);font-size:1.12rem;line-height:1.55}
.chtext b,.chstory b+p b,.chdo p b{color:var(--tech)}
.chstory,.chdo{border-radius:14px;padding:10px 12px}
.chstory{background:var(--tech-soft)}.chdo{background:color-mix(in srgb,var(--good) 13%,transparent)}
.chstory>b,.chdo>b{display:block;font-family:var(--display);font-weight:400;font-size:1.12rem;color:var(--tech)}
.chdo>b{color:var(--good)}
.chstory p,.chdo p{margin:4px 0 0;font-family:var(--text);font-size:1.05rem;line-height:1.5}
.chdone{font-weight:700;color:var(--good);text-align:center}
.chcal{display:flex;flex-direction:column;gap:10px}
.chdate{background:var(--klaf);border:2px solid var(--rule);border-left:6px solid var(--tech);border-radius:16px;padding:12px 14px}
.chdate.today{border-color:var(--gold-hi);background:color-mix(in srgb,var(--gold-hi) 14%,var(--klaf))}
.chdh{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}
.chdh b{display:block;font-family:var(--display);font-weight:400;font-size:1.2rem;color:var(--tech);line-height:1.2}
.chdh small{display:block;color:var(--muted);font-size:.84rem;margin-top:2px}.chdh em{color:var(--gold);font-style:normal;font-weight:700}
.chdh span[lang=he]{font-family:var(--he);font-weight:600;font-size:1.25rem;color:var(--gold);white-space:nowrap;line-height:1.5}
.chdate p{margin:8px 0 0;font-family:var(--text);font-size:1.03rem;line-height:1.5}
.chdate p b{color:var(--tech)}
.ctlist{display:flex;flex-direction:column;gap:8px}
.ctrow{display:grid;grid-template-columns:48px 1fr;gap:10px;align-items:center;background:var(--klaf);border:2px solid var(--rule);border-radius:16px;padding:10px 12px}
.ctrow.ok{border-color:var(--good);background:color-mix(in srgb,var(--good) 10%,var(--klaf))}
.ctchk{border:0;background:none;padding:0;display:grid;place-items:center}
.ctchk .box{width:38px;height:38px;border-radius:12px;border:3px solid var(--rule);display:grid;place-items:center;font-weight:700;font-size:1.4rem;color:#fff}
.ctrow.ok .box{background:var(--good);border-color:var(--good);animation:bump .35s}
.ctrow b{display:block;font-family:var(--display);font-weight:400;font-size:1.2rem;color:var(--tech)}
.ctrow b span[lang=he]{font-family:var(--he);font-weight:700;color:var(--gold);font-size:1.05rem}
.ctrow small{display:block;font-size:.92rem;color:var(--ink);line-height:1.35}.ctrow small b{display:inline;font-family:inherit;font-size:inherit}
.ctlink{display:inline-block;margin-top:4px;font-size:.85rem;font-weight:700;color:var(--tech)}
.ctyom{background:linear-gradient(160deg,#142c72,#2b53b4);color:#f4f0e2;border:2px solid var(--gold-hi);border-radius:18px;padding:14px;display:flex;flex-direction:column;gap:8px;align-items:flex-start}
.ctyom>b{font-family:var(--display);font-weight:400;font-size:1.3rem;color:#f4c95f}.ctyom p{margin:0;font-family:var(--text);font-size:1.04rem}.ctyom p b{color:#fff}
.ctyom .btn{text-decoration:none}
[data-acc="sef"] .ctyom{background:linear-gradient(160deg,#0a5655,#13827d)}
</style>`);
{ const m=$("openMitz"), c=$("openChit"); if(m&&c) m.after(c) }
window.openChassidus=openChassidus; paintChHome(); paintChitHome(); if(location.hash==="#chitas") openChitas(); if(location.hash==="#chassidus") openChassidus();
})();
