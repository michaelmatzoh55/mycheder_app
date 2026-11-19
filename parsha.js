/* ================= WEEKLY PARSHA ================= */
(function(){
// [ashName, sefName, hebrew, emoji, what the name means, [story steps], Shlomo's lesson]
const PARSHIOS=[
["Bereishis","Bereshit","בְּרֵאשִׁית","🌍","“In the beginning”",["Hashem creates the whole world in six days: light, sky, sea, land, plants, sun, moon, stars, fish, birds, animals, and people.","On the seventh day Hashem rests. That's the very first Shabbos!","Adam and Chava live in Gan Eden, but they eat from the one tree Hashem told them not to."],"Every single thing in the world was made by Hashem on purpose, including you!"],
["Noach","Noach","נֹחַ","🌈","“Noah”",["People become very mean, so Hashem tells Noach to build a giant teivah (ark).","Noach brings his family and the animals inside, two by two, and a great flood covers the earth.","After the flood, Hashem puts a rainbow in the sky as a promise never to flood the whole world again."],"Noach did the right thing even when everyone around him didn't."],
["Lech Lecha","Lech Lecha","לֶךְ לְךָ","🧳","“Go for yourself”",["Hashem tells Avram to leave his home and go to a new land, the land of Canaan.","Avram trusts Hashem and goes, with Sarai and his nephew Lot.","Hashem promises Avram that his children will be as many as the stars. His name becomes Avraham."],"When Hashem asks us to do something new, we can trust Him and go!"],
["Vayeira","Vayera","וַיֵּרָא","⛺","“And He appeared”",["Avraham sits at his tent on a hot day and runs to welcome three guests. They're really angels!","The angels promise that Sarah will have a baby, and Yitzchak is born.","Avraham passes his biggest test, the Akeidah, showing he'll do anything Hashem asks."],"Hachnasas orchim, welcoming guests, is so big that Avraham ran to do it."],
["Chayei Sarah","Chayei Sarah","חַיֵּי שָׂרָה","🐪","“The life of Sarah”",["Sarah passes away, and Avraham buys the Cave of Machpeilah in Chevron to bury her.","Avraham's servant Eliezer goes to find a wife for Yitzchak, with ten camels.","Rivkah gives water to Eliezer and all his camels. That kindness shows she's the one!"],"Rivkah did extra kindness without being asked. That's a real tzaddekes!"],
["Toldos","Toldot","תּוֹלְדֹת","🥣","“Generations”",["Yitzchak and Rivkah have twins: Eisav the hunter and Yaakov who loves to learn.","Eisav trades his special firstborn rights to Yaakov for a bowl of red lentil soup.","Yaakov gets Yitzchak's blessing, and then has to run away from Eisav."],"Don't trade something precious for something quick, like a bowl of soup!"],
["Vayeitzei","Vayetze","וַיֵּצֵא","🪜","“And he went out”",["Yaakov sleeps on the way and dreams of a ladder with angels going up and down.","He works for his uncle Lavan for many years and marries Rochel and Leah.","Yaakov has a big family, and Lavan keeps trying to trick him, but Hashem protects him."],"Wherever you go, Hashem is right there with you, just like in Yaakov's dream."],
["Vayishlach","Vayishlach","וַיִּשְׁלַח","🤼","“And he sent”",["Yaakov sends gifts to Eisav to make peace.","At night Yaakov wrestles with an angel and wins. His new name is Yisrael!","Yaakov and Eisav meet and hug. Later Rochel has Binyamin, the twelfth son."],"Yaakov got ready three ways: gifts, prayer, and being prepared. Smart!"],
["Vayeishev","Vayeshev","וַיֵּשֶׁב","🧥","“And he settled”",["Yaakov gives Yosef a special colorful coat, and his brothers get jealous.","Yosef dreams that his brothers bow to him. The brothers sell him, and he ends up in Egypt.","Yosef is put in jail, but he correctly explains the dreams of Pharaoh's butler and baker."],"Jealousy hurts everyone. Be happy for other people's good things."],
["Mikeitz","Miketz","מִקֵּץ","🌾","“At the end”",["Pharaoh dreams of seven fat cows and seven skinny cows, and nobody can explain it.","Yosef says: seven years of plenty, then seven years of hunger. Pharaoh makes him the ruler of Egypt!","Yosef's brothers come to buy food and bow to him, but they don't know who he is."],"Yosef always said “it's from Hashem, not me.” Be humble about your gifts."],
["Vayigash","Vayigash","וַיִּגַּשׁ","🤗","“And he approached”",["Yehudah steps up to protect his little brother Binyamin.","Yosef can't hold it in anymore and cries: “I am Yosef!”","Yaakov finds out Yosef is alive, and the whole family moves to Egypt."],"Yehudah stood up for his brother. Always look out for each other."],
["Vayechi","Vayechi","וַיְחִי","👴","“And he lived”",["Yaakov lives his last 17 years in Egypt, near Yosef.","He blesses Yosef's sons, Ephraim and Menashe. Parents still bless their kids with their names!","Yaakov blesses all twelve sons. That ends Sefer Bereishis: Chazak, chazak, v'nischazeik!"],"Every Friday night, parents bless their children just like Yaakov did."],
["Shemos","Shemot","שְׁמוֹת","🔥","“Names”",["A new Pharaoh makes the Jewish people slaves in Egypt.","Baby Moshe is put in a basket on the river, and Pharaoh's daughter saves him.","Hashem speaks to Moshe from a burning bush that doesn't burn up and sends him to free the Jews."],"Moshe stopped to look at the bush. Notice the little miracles around you!"],
["Va'eira","Vaera","וָאֵרָא","🐸","“And I appeared”",["Moshe and Aharon tell Pharaoh: “Let My people go!” Pharaoh says no.","The plagues begin: blood, frogs, lice, wild animals, sick animals, boils, and hail.","Every time, Pharaoh promises to let them go, then changes his mind."],"Keep your promises, even after the trouble is over. Don't be like Pharaoh!"],
["Bo","Bo","בֹּא","🦗","“Come”",["The last plagues: locusts, darkness, and the plague of the firstborn.","The Jews eat the first Korban Pesach and put its blood on their doorposts.","The Jewish people finally leave Egypt, so fast their bread has no time to rise. That's matzah!"],"We remember leaving Egypt every day, and especially on Pesach."],
["Beshalach","Beshalach","בְּשַׁלַּח","🌊","“When he sent”",["Pharaoh chases the Jews to the sea. Hashem splits the sea and they walk through on dry land!","Moshe and the Jews sing Az Yashir. Miriam leads the women with drums and dancing.","Hashem sends mon (manna) from the sky, a double portion on Friday for Shabbos."],"When things look stuck, keep going forward and trust Hashem."],
["Yisro","Yitro","יִתְרוֹ","⛰️","“Yisro”",["Moshe's father-in-law Yisro comes and gives him good advice about judges.","The Jewish people camp at Har Sinai and say “Na'aseh v'nishma: we will do and we will listen.”","Hashem gives the Ten Commandments with thunder, lightning, and a great shofar blast!"],"We said “we will do” before “we will understand.” That's real trust."],
["Mishpatim","Mishpatim","מִשְׁפָּטִים","⚖️","“Laws”",["Hashem gives laws about being fair and honest with people.","Be kind to the stranger, the orphan, and the widow. Help even your enemy's donkey!","Moshe goes up Har Sinai for forty days to learn the whole Torah."],"Being a mensch with people is also a mitzvah from Hashem."],
["Terumah","Terumah","תְּרוּמָה","🏛️","“Offering”",["Hashem asks everyone to bring gifts to build the Mishkan, a home for Him.","Inside: the Aron with the Luchos, covered by two golden Keruvim.","Also the golden Menorah, the Shulchan table with the special breads, and the walls and curtains."],"You can make your own home a little Mishkan, a place where Hashem feels at home."],
["Tetzaveh","Tetzaveh","תְּצַוֶּה","💎","“You shall command”",["Pure olive oil for the Menorah, to light it every day.","Special clothes for the Kohanim, and for the Kohen Gadol a breastplate with twelve jewels, one for each tribe.","Aharon and his sons are made Kohanim to serve in the Mishkan."],"Each tribe had its own stone, and each Jew has their own special shine."],
["Ki Sisa","Ki Tisa","כִּי תִשָּׂא","🐄","“When you count”",["Every Jew gives a half-shekel coin to be counted.","While Moshe is on the mountain, some people make a golden calf.","Moshe breaks the Luchos, prays for the people, and brings down a second set."],"Even after a big mistake, you can say sorry and start again."],
["Vayakhel","Vayakhel","וַיַּקְהֵל","🛠️","“And he gathered”",["Moshe gathers everyone and reminds them about Shabbos.","The people bring so many gifts that Moshe has to say: “Stop, that's enough!”","Betzalel and the craftsmen build all the parts of the Mishkan."],"When we all work together for a mitzvah, amazing things get built."],
["Pekudei","Pekudei","פְקוּדֵי","📋","“Accounts”",["Moshe counts up all the gold, silver, and copper, so everyone knows it was used honestly.","The clothes of the Kohanim are finished.","The Mishkan is set up, and a cloud of Hashem's glory fills it. Chazak!"],"Moshe showed where every coin went. Always be honest, even when nobody asks."],
["Vayikra","Vayikra","וַיִּקְרָא","🐑","“And He called”",["Hashem calls to Moshe from the Mishkan.","He teaches about korbanos, offerings people bring to come close to Hashem.","Even a poor person could bring a small bird or some flour, and it was just as precious."],"Today our prayers are like korbanos. Hashem loves what comes from the heart."],
["Tzav","Tzav","צַו","🔥","“Command”",["The fire on the mizbei'ach (altar) must never go out.","The Kohanim learn their daily jobs, like cleaning the ashes every morning.","Aharon and his sons spend seven days getting ready to serve."],"Keep a little fire of goodness burning in you every single day."],
["Shemini","Shemini","שְׁמִינִי","🐟","“Eighth”",["On the eighth day, the Mishkan starts working and a fire from Hashem comes down.","Aharon's sons Nadav and Avihu bring a fire that Hashem didn't ask for.","Hashem teaches the kosher signs: animals with split hooves that chew their cud, and fish with fins and scales."],"Eating kosher is a way to keep our body and soul holy."],
["Tazria","Tazria","תַזְרִיעַ","🩺","“Conceives”",["Mitzvos about when a baby is born, and the bris on the eighth day.","A special skin sickness called tzara'as.","The Kohen would look at it and decide what to do."],"Our Sages say tzara'as came from lashon hora. Words are powerful!"],
["Metzora","Metzora","מְצֹרָע","🏠","“The person with tzara'as”",["How a person with tzara'as becomes pure again.","They bring two birds as part of the process.","Tzara'as could even show up on the walls of a house!"],"Use your words to build people up, never to tear them down."],
["Acharei Mos","Acharei Mot","אַחֲרֵי מוֹת","🕊️","“After”",["Hashem teaches about the special service of Yom Kippur.","Only on Yom Kippur would the Kohen Gadol go into the Kodesh HaKodashim, the holiest room.","Hashem tells the Jews to live holy lives, not like the nations around them."],"Yom Kippur shows Hashem always gives us a fresh start."],
["Kedoshim","Kedoshim","קְדֹשִׁים","❤️","“Holy”",["“Be holy, because I, Hashem, am holy.”","Leave the corners of your field for the poor. Don't trick a blind person or curse a deaf one.","V'ahavta l'rei'acha kamocha: love your fellow Jew like yourself!"],"Rabbi Akiva said loving others like yourself is the biggest rule in the Torah."],
["Emor","Emor","אֱמֹר","📅","“Say”",["Special rules for the Kohanim.","The Jewish holidays: Shabbos, Pesach, Shavuos, Rosh Hashanah, Yom Kippur, and Sukkos.","The mitzvah of Sefiras HaOmer, counting the days from Pesach to Shavuos."],"Each day counts! Every day is a chance to grow a little bit."],
["Behar","Behar","בְּהַר","🌱","“On the mountain”",["Every seventh year is Shemittah: the land rests and nobody plants.","Every fiftieth year is Yovel: land goes back to its first family and slaves go free.","Be fair in business and help a person who is falling on hard times."],"Shemittah teaches us that everything we have really comes from Hashem."],
["Bechukosai","Bechukotai","בְּחֻקֹּתַי","🌧️","“In My laws”",["If we follow Hashem's mitzvos, there will be rain, food, and peace.","If not, hard times will come, but Hashem will never leave us.","Hashem promises to always remember His covenant with Avraham, Yitzchak, and Yaakov. Chazak!"],"No matter what, Hashem never gives up on the Jewish people."],
["Bamidbar","Bamidbar","בְּמִדְבַּר","🏕️","“In the desert”",["Moshe counts the Jewish people in the desert.","Each tribe camps in its own spot around the Mishkan, with its own flag.","The Levi'im get their special jobs carrying the Mishkan."],"Every single Jew counts, and each one has a special place."],
["Naso","Naso","נָשֹׂא","🙌","“Lift up”",["More counting and jobs for the Levi'im.","Birkas Kohanim: “Yevarechecha Hashem v'yishmerecha,” the blessing of the Kohanim.","The twelve leaders each bring gifts for the Mishkan, one on each day."],"You can learn Birkas Kohanim in the Prayers tab. It's the blessing parents give too!"],
["Beha'aloscha","Behaalotcha","בְּהַעֲלֹתְךָ","🕎","“When you light”",["Aharon lights the Menorah in the Mishkan.","The Jews travel when the cloud moves, and stop when it stops.","Some people complain about the mon, and Miriam speaks badly about Moshe."],"Aharon lit the flame until it burned by itself. Help others shine on their own."],
["Shelach","Shelach","שְׁלַח","🍇","“Send”",["Moshe sends twelve spies to see the land of Israel.","They bring back giant grapes, but ten spies say: “We can't win!”","Only Yehoshua and Calev say: “With Hashem, we can do it!” Also, the mitzvah of tzitzis."],"Look at things with a good eye, and remember that with Hashem we can do it."],
["Korach","Korach","קֹרַח","⚡","“Korach”",["Korach starts a fight against Moshe and Aharon. He wants to be the leader.","The ground opens up and swallows Korach and his group.","Aharon's staff grows flowers and almonds overnight, showing Hashem chose him."],"Fighting and jealousy never end well. Be a rodef shalom, someone who chases peace."],
["Chukas","Chukat","חֻקַּת","🪨","“The law”",["The Parah Adumah, the red cow, a mitzvah we do even without understanding it.","Miriam passes away, and the well that followed her dries up.","Moshe hits the rock instead of talking to it, and water comes out."],"Some mitzvos we do just because Hashem asked, and that's beautiful."],
["Balak","Balak","בָּלָק","🫏","“Balak”",["King Balak hires Bilam to curse the Jewish people.","Bilam's donkey sees an angel and talks!","Every time Bilam tries to curse, blessings come out instead: “Mah tovu ohalecha Yaakov!”"],"Mah Tovu, which we say walking into shul, comes from this parsha!"],
["Pinchas","Pinchas","פִּינְחָס","📏","“Pinchas”",["Hashem gives Pinchas a covenant of peace.","The daughters of Tzelofchad ask for a share of the land, and Hashem says they're right!","Yehoshua is chosen to lead after Moshe. Also, the korbanos for every holiday."],"The daughters of Tzelofchad asked politely and bravely. Speak up for what's right."],
["Matos","Matot","מַטּוֹת","🗣️","“Tribes”",["If you make a promise, you have to keep it.","The tribes of Reuven and Gad want to live on the other side of the Jordan River.","Moshe says yes, as long as they help their brothers first."],"Your word is precious. Keep your promises."],
["Masei","Masei","מַסְעֵי","🗺️","“Journeys”",["A list of all 42 stops the Jews made in the desert.","The borders of the land of Israel.","Cities of refuge, safe cities for someone who hurt another person by accident. Chazak!"],"Every stop in life is part of the journey, even the hard ones."],
["Devarim","Devarim","דְּבָרִים","📢","“Words”",["Moshe starts his last big speech to the Jewish people.","He reminds them of everything that happened in the desert.","Usually read on Shabbos Chazon, right before Tisha B'Av."],"Moshe taught with love, like a parent talking to children."],
["Va'eschanan","Vaetchanan","וָאֶתְחַנַּן","👂","“And I pleaded”",["Moshe begs Hashem to let him go into Israel, 515 times!","Moshe repeats the Ten Commandments.","The Shema! “Shema Yisrael, Hashem Elokeinu, Hashem Echad.”"],"The Shema is here. Practice it in the Prayers tab!"],
["Eikev","Ekev","עֵקֶב","🍞","“Because”",["If we keep the mitzvos, Hashem will bless us.","The mitzvah of Birkas Hamazon: “You will eat, be full, and bless Hashem.”","The second paragraph of the Shema, “V'hayah im shamoa.”"],"After we eat, we say thank you to Hashem with Birkas Hamazon."],
["Re'eh","Reeh","רְאֵה","👀","“See”",["“See, I put before you a blessing and a curse.” Choose the blessing!","Give tzedakah with an open hand and a happy heart.","Kosher animals again, and the three holidays: Pesach, Shavuos, and Sukkos."],"Give tzedakah every day, even a coin. It makes the world better."],
["Shoftim","Shoftim","שֹׁפְטִים","👨‍⚖️","“Judges”",["Set up judges in every city, and be fair to everyone.","“Tzedek, tzedek tirdof”: chase after justice!","Rules about kings, prophets, and even about not cutting down fruit trees in a war."],"Being fair and honest is something we chase after, every day."],
["Ki Seitzei","Ki Tetzei","כִּי תֵצֵא","🐦","“When you go out”",["74 mitzvos, the most of any parsha!","Shiluach haken: send away the mother bird before taking the eggs.","Return lost things, and remember what Amalek did."],"Hashem cares even about a mother bird. We should be kind to animals."],
["Ki Savo","Ki Tavo","כִּי תָבוֹא","🧺","“When you come”",["Bikkurim: farmers bring their first fruits to the Beis Hamikdash in a basket.","The blessings and curses, read on two mountains.","“Serve Hashem with joy!”"],"Saying thank you for the first and best of what we have is a big deal."],
["Nitzavim","Nitzavim","נִצָּבִים","🤝","“Standing”",["“You are all standing here today,” every Jew, from the leaders to the water carriers.","Teshuvah, coming back to Hashem, is always possible.","The Torah is not far away in the sky. It's close to you, in your mouth and your heart."],"The Torah isn't too hard for you. It's right here for you to learn!"],
["Vayeilech","Vayelech","וַיֵּלֶךְ","✍️","“And he went”",["Moshe, 120 years old, tells everyone that Yehoshua will lead them next.","Hakhel: every seven years all the Jews gather to hear the king read the Torah.","The last mitzvah: every Jew should write a Sefer Torah."],"Kids can buy a letter in a Sefer Torah. Ask your parents!"],
["Haazinu","Haazinu","הַאֲזִינוּ","🎵","“Listen”",["Moshe sings a song to the Jewish people, with heaven and earth as witnesses.","The song reminds them how Hashem took care of them, like an eagle carrying its babies.","Hashem tells Moshe to go up Har Nevo and see the land from far away."],"Hashem carries us like an eagle carries its babies, safe on its wings."],
["V'zos Habrachah","Vezot Haberachah","וְזֹאת הַבְּרָכָה","🎉","“And this is the blessing”",["Moshe blesses every tribe, one by one.","Moshe passes away, and Hashem Himself buries him.","We read it on Simchas Torah, then start again from Bereishis right away!"],"The Torah never ends. When we finish, we start again!"]
];
// Key Hebrew words + a deeper idea for each parsha: [[hebrew, sound-out, meaning, why it matters] ×3, deeper meaning]
const KW=[
[["בְּרֵאשִׁית","B'rei-shis","In the beginning","The very first word of the Torah. Rashi says the world was made for the sake of things called “reishis,” first: the Torah and the Jewish people."],
 ["יְהִי אוֹר","Y'hi or","Let there be light","The first thing Hashem said. Hashem created the world with <b>words</b>!"],
 ["אָדָם","O-dom","Person","Comes from <span lang='he'>אֲדָמָה</span>, ground. Adam was formed from the earth, then Hashem breathed a neshamah into him."],
 "Chassidus teaches that Hashem's words “Let there be light” didn't just happen once. They are <b>still inside</b> every rock, tree and star right now, keeping it alive every second. If Hashem stopped “saying” them, the world would disappear. So the whole world is full of Hashem's words!"],
[["תֵּבָה","Tei-voh","Ark","Noach's big boat. But <span lang='he'>תֵּבָה</span> also means <b>word</b>!"],
 ["צַדִּיק","Tza-dik","Righteous person","The Torah calls Noach a tzadik, someone who does what's right even when everyone around him doesn't."],
 ["קֶשֶׁת","Ke-shes","Rainbow","Hashem's sign of His promise never to flood the whole world again. We say a special bracha when we see one."],
 "The Baal Shem Tov taught: “Come into the teivah” means <b>come into the words</b> of Torah and davening. Just like the ark kept Noach safe from the stormy flood, the holy words we say keep us safe from the “floods” of worries around us."],
[["לֶךְ לְךָ","Lech l'cho","Go for yourself","Literally “go <b>to</b> yourself.” Hashem tells Avram to leave home."],
 ["בְּרָכָה","B'ro-choh","Blessing","Hashem tells Avram “<span lang='he'>וֶהְיֵה בְּרָכָה</span>,” you will <b>be</b> a blessing. Not just get blessings, but be one for others!"],
 ["בְּרִית","B'ris","Covenant, a forever promise","Hashem makes a bris with Avraham. That's why a Jewish baby boy has a bris milah."],
 "Why does it say “go <b>to</b> yourself”? Chassidus explains: every time we go somewhere new or try something hard for Hashem, we discover who we <b>really</b> are deep inside. Avraham's journey wasn't just to a new land. It was a journey to become his truest self."],
[["אֹהֶל","O-hel","Tent","Avraham's tent had doors on <b>all four sides</b> so guests could come in from any direction."],
 ["מַלְאָךְ","Mal-och","Angel, messenger","The three guests were angels, each sent with one job. A mal-och is a messenger of Hashem."],
 ["הִנֵּנִי","Hi-ne-ni","Here I am","Avraham's answer whenever Hashem called him: ready for anything!"],
 "Avraham was in the middle of talking with Hashem when the guests came, and he asked Hashem to wait! The Gemara learns from this that <b>welcoming guests is even greater than greeting the Shechinah</b>. Hashem loves it when we take care of His children."],
[["חַיֵּי","Cha-yei","The life of","The parsha is about Sarah passing away, yet it's called “the <b>life</b> of Sarah.”"],
 ["חֶסֶד","Che-sed","Kindness","Eliezer asks Hashem to show chesed. Rivkah's kindness to a stranger proves she's the right wife for Yitzchak."],
 ["גְּמַלִּים","G'ma-lim","Camels","Ten thirsty camels drink a LOT of water. Rivkah offered to water them all, without being asked!"],
 "Why is it called “the life of Sarah” when she passes away? Because a tzadik's life <b>keeps going</b> through the people and good deeds they leave behind. Sarah's kindness lived on in Rivkah, who continued exactly what Sarah did in her tent."],
[["תּוֹלְדֹת","To-l'dos","Generations, offspring","Rashi says a good person's real “offspring” are their <b>good deeds</b>."],
 ["בְּכֹרָה","B'cho-roh","Firstborn rights","Eisav traded this holy gift for a bowl of red lentil soup."],
 ["בְּאֵר","B'eir","Well","Yitzchak re-dug the wells his father Avraham had dug, and found fresh water."],
 "Yitzchak's life was all about <b>digging wells</b>. Chassidus says every Jew has a hidden well of love for Hashem deep inside, covered by “dirt.” Our job is to keep digging (with Torah and mitzvos) until the fresh water flows!"],
[["סֻלָּם","Su-lom","Ladder","Yaakov's dream: a ladder standing on the ground with its top in heaven."],
 ["מָקוֹם","Mo-kom","Place","Yaakov “met the place.” One of Hashem's names is <b>HaMakom</b>, because He is the place of the whole world."],
 ["בֵּית אֵל","Beis Eil","House of G-d","Yaakov woke up and said: Hashem was here and I didn't know it!"],
 "The gematria of <span lang='he'>סֻלָּם</span> (ladder) is 130, the same as <span lang='he'>סִינַי</span> (Sinai)! The Torah is our ladder: our feet stay on the ground doing everyday mitzvos, while our heads reach all the way up to Hashem. Davening is a ladder too, step by step, higher and higher."],
[["יִשְׂרָאֵל","Yis-ro-eil","Yisrael, “you won with G-d”","Yaakov's new name after he beat the angel. Now all of us are called <b>B'nei Yisrael</b>!"],
 ["מִנְחָה","Min-choh","Gift","Yaakov sent gifts to Eisav to make peace. Afternoon prayer is also called Mincha."],
 ["קָטֹנְתִּי","Ko-ton-ti","I am too small","Yaakov said: I don't deserve all the kindness Hashem gave me. Real humility!"],
 "The name Yisrael means you struggled and <b>won</b>. Every Jew is a “Yisrael.” Even when something feels hard, like the angel Yaakov wrestled all night, you have the strength from Hashem to win. And the dawn always comes!"],
[["כְּתֹנֶת פַּסִּים","K'so-nes pa-sim","Striped coat","Yaakov's special gift to Yosef, which made the brothers jealous."],
 ["חֲלוֹם","Cha-lom","Dream","Yosef dreams that his brothers' bundles bow to his, and the sun, moon and stars bow too."],
 ["אַחַי","A-chai","My brothers","Yosef tells a stranger: “<span lang='he'>אֶת אַחַי אָנֹכִי מְבַקֵּשׁ</span>,” I am looking for my brothers."],
 "Even after his brothers were mean to him, Yosef was <b>searching for his brothers</b>. The Rebbe taught that these words are a lesson for every Jew: always be looking for your brothers and sisters, other Jews, to help them and bring them closer. That's ahavas Yisroel!"],
[["מִקֵּץ","Mi-keitz","At the end","At the end of two years in jail, Yosef is suddenly freed and made a ruler."],
 ["בִּלְעָדָי","Bil-o-dai","It's not me","Yosef tells Pharaoh: “It's not me. <b>Hashem</b> will give the answer.”"],
 ["שָׂבָע","So-vo","Plenty","Seven years of plenty, then seven years of hunger. Yosef saved food to get ready."],
 "Mikeitz is almost always read on <b>Chanukah</b>. Both teach the same thing: after a long, dark time, Hashem can turn everything around in one moment. Yosef went from prisoner to prince in a single day, and a tiny jar of oil lit up eight days!"],
[["וַיִּגַּשׁ","Va-yi-gash","And he came close","Yehudah walked right up to the powerful ruler to protect his little brother Binyamin."],
 ["אֲנִי יוֹסֵף","A-ni Yo-seif","I am Yosef","The moment Yosef finally tells his brothers who he is."],
 ["עֲגָלוֹת","A-go-los","Wagons","Yosef sent wagons to bring Yaakov down to Egypt."],
 "Rashi says the <b>wagons</b> were a secret message. The last thing Yaakov had learned with Yosef, 22 years earlier, was about the <i>eglah arufah</i> (<span lang='he'>עֶגְלָה</span>), which sounds like wagon. When Yaakov saw them, he knew Yosef still remembered their Torah learning, and his spirit came back to life!"],
[["וַיְחִי","Vay-chi","And he lived","Yaakov lived his last 17 years in Egypt, his best ones."],
 ["יְשִׂמְךָ","Y'sim-cho","May Hashem make you","Yaakov blessed: “May Hashem make you like Ephraim and Menashe.” Parents still bless their children this way every Friday night!"],
 ["חֲזַק","Cha-zak","Be strong","When we finish each book of the Torah, everyone says: Chazak, chazak, v'nischazeik!"],
 "Yaakov's 17 years in Egypt were his happiest. The gematria of <span lang='he'>טוֹב</span>, good, is 17! Even far from home, in exile, a Jew can live a truly good and holy life."],
[["שְׁמוֹת","Sh'mos","Names","The parsha starts by counting the Jewish families by name."],
 ["סְנֶה","S'neh","Thorn bush","The bush that burned but didn't burn up."],
 ["אֶהְיֶה","Eh-yeh","I will be","Hashem tells Moshe: “I will be with them in this trouble, and I will be with them in the future.”"],
 "Why did Hashem appear in a lowly <b>thorn bush</b> and not a tall, beautiful tree? Rashi says: to show that Hashem is <b>with us when we suffer</b>. And the bush that burns but never burns up is like the Jewish people: hard times come, but we are never destroyed."],
[["וָאֵרָא","Vo-ei-ro","And I appeared","Hashem reminds Moshe: I appeared to Avraham, Yitzchak and Yaakov."],
 ["צְפַרְדֵּעַ","Tz'far-dei-a","Frog","The second plague. Frogs were everywhere, even in Pharaoh's ovens!"],
 ["וְהוֹצֵאתִי","V'ho-tzei-si","I will take you out","One of Hashem's <b>four promises</b> of freedom."],
 "Hashem promised to free us in four ways: I will <b>take you out</b>, <b>save</b> you, <b>redeem</b> you and <b>take you</b> as My people. That's why we drink <b>four cups</b> of wine at the Pesach Seder!"],
[["בֹּא","Bo","Come","Hashem tells Moshe: “<b>Come</b> to Pharaoh,” not “go.”"],
 ["מַצָּה","Ma-tzoh","Matzah","The Jews left so fast their dough had no time to rise."],
 ["פֶּסַח","Pe-sach","Passed over","Hashem passed over the Jewish homes during the last plague."],
 "Why “come” and not “go”? The Zohar explains that Hashem was saying: “<b>Come with Me.</b> I'm going there with you.” Pharaoh was scary, but Moshe wasn't alone. Whenever we have to face something hard, Hashem says: come, I'm right there with you."],
[["יָם סוּף","Yam Suf","The Sea of Reeds","The sea that split so the Jews could walk through on dry land."],
 ["שִׁירָה","Shi-roh","Song","After the sea split, everyone sang <i>Az Yashir</i>. We still sing it in davening every morning!"],
 ["מָן","Mon","Manna","Food from heaven every morning, and a double portion on Friday for Shabbos."],
 "The mann came <b>one day at a time</b>. Nobody could save extra (except for Shabbos). It taught the Jews <b>bitachon</b>, trusting Hashem. We don't need to worry about tomorrow, because the same Hashem who takes care of us today will take care of us tomorrow too."],
[["אָנֹכִי","O-no-chi","I am","The first word of the Ten Commandments: “I am Hashem your G-d.”"],
 ["עֲשֶׂרֶת הַדִּבְּרוֹת","A-se-res ha-dib'ros","The Ten Commandments","Hashem spoke them out loud to the whole Jewish people at Har Sinai."],
 ["כְּאִישׁ אֶחָד","K'ish e-chod","Like one person","Rashi: at Sinai the Jews camped “like one person with one heart.”"],
 "The Midrash says that when Hashem gave the Torah, the whole world went <b>silent</b>. No bird chirped, no cow mooed, the sea didn't move. Everything stopped to listen. And the Jews were united “like one person with one heart.” Hashem gave the Torah only when we were <b>together</b>."],
[["מִשְׁפָּטִים","Mish-po-tim","Laws","Rules for being fair and honest with other people."],
 ["נַעֲשֶׂה","Na-a-seh","We will do","Before even hearing all the mitzvos, the Jews said: we will do them!"],
 ["וְנִשְׁמָע","V'nish-mo","And we will understand","First we do, and then we learn to understand."],
 "The Jews said <b>“Na'aseh v'nishma,”</b> we will do and then understand. The Gemara says angels came down and gave every Jew <b>two crowns</b> for saying it! It's like a child who trusts their parent: you do it because you trust, and the understanding comes later."],
[["תְּרוּמָה","T'ru-moh","A gift you lift up","Everyone brought gifts to build the Mishkan, from gold to goat hair."],
 ["מִשְׁכָּן","Mish-kon","The Mishkan","The holy traveling Temple in the desert."],
 ["בְּתוֹכָם","B'so-chom","Inside them","Hashem says: build Me a Mishkan, and I will live <b>inside them</b>."],
 "Look closely: Hashem says “I will live inside <b>them</b>,” not “inside <b>it</b>.” Our sages explain that Hashem wants to live inside <b>every single Jew</b>. Each of us can be a little Mishkan, a home for Hashem, through our mitzvos."],
[["שֶׁמֶן זַיִת","She-men za-yis","Olive oil","Pure olive oil for the Menorah, from olives that were <b>crushed</b>."],
 ["נֵר תָּמִיד","Neir To-mid","Always-lit light","A light that burned constantly. Shuls have one today too!"],
 ["בִּגְדֵי כְהֻנָּה","Big-dei ch'hu-noh","Clothes of the kohanim","Special holy clothes “for honor and for beauty.”"],
 "Moshe's name doesn't appear <b>even once</b> in this parsha! Why? In the next parsha Moshe begs Hashem to forgive the Jews, saying “if not, erase me from Your book.” Moshe cared about his people more than about his own name. That kind of love is so big, it's hidden but felt everywhere."],
[["מַחֲצִית הַשֶּׁקֶל","Ma-cha-tzis ha-she-kel","Half a shekel","Every Jew gave exactly half a coin to be counted."],
 ["עֵגֶל","Ei-gel","Calf","The golden calf, the big mistake. But Hashem forgave."],
 ["לֻחֹת","Lu-chos","Tablets","Moshe brought down a second set of Luchos on Yom Kippur."],
 "Why <b>half</b> a shekel, not a whole one? To teach that no Jew is complete alone. We need each other! Rich or poor, everyone gave the same half, because in Hashem's eyes every Jew counts exactly the same."],
[["וַיַּקְהֵל","Va-yak-heil","And he gathered","Moshe gathered the whole Jewish people together."],
 ["נְדִיב לֵב","N'div leiv","A generous heart","People brought so much for the Mishkan that Moshe had to tell them to stop!"],
 ["מַרְאֹת","Mar-os","Mirrors","The women gave their copper mirrors to make the kiyor, the washing basin."],
 "Moshe wasn't sure he should use the women's mirrors, because they were used for looking pretty. Hashem said: “These are the <b>most precious</b> of all!” In Egypt, the women used them to stay hopeful and keep their families going. When something is used for a good purpose, it becomes holy."],
[["פְקוּדֵי","P'ku-dei","Accounts, counting","Moshe gave an exact list of every bit of gold and silver used."],
 ["עָנָן","O-non","Cloud","When the Mishkan was finished, Hashem's cloud filled it."],
 ["כַּאֲשֶׁר צִוָּה","Ka-a-sher tzi-voh","As Hashem commanded","Said again and again: everything was made exactly as Hashem asked."],
 "Moshe was the most trusted person ever, but he still gave a full account of every coin. Our sages learn: <b>be honest and clear</b>, even when nobody would suspect you. And when we build something honestly and exactly as Hashem asks, His presence fills it, like the cloud filled the Mishkan."],
[["וַיִּקְרָא","Va-yik-ro","And He called","Written in the Torah with a <b>tiny alef</b> at the end!"],
 ["קָרְבָּן","Kor-bon","Offering","Comes from <span lang='he'>קָרוֹב</span>, close. A korban brings you <b>close</b> to Hashem."],
 ["מֶלַח","Me-lach","Salt","Every offering needed salt. That's why we dip our challah in salt!"],
 "The Torah says “<b>a person from you</b> who brings an offering.” Chassidus explains: the real offering is <b>from you</b>, from inside yourself. When you give up something you want, to do what Hashem wants, you're bringing a korban today, even without a Beis Hamikdash."],
[["צַו","Tzav","Command","Also related to <span lang='he'>צַוְתָּא</span>, togetherness. A mitzvah connects us to Hashem."],
 ["אֵשׁ תָּמִיד","Eish to-mid","A fire always","A fire burned on the Mizbeach all the time, day and night."],
 ["תּוֹדָה","To-doh","Thank-you offering","Brought by someone who was saved from danger. Today we say Birchas HaGomel."],
 "“<b>A fire shall always burn on the Mizbeach. It must not go out.</b>” The Rebbe taught that every Jew's heart is a Mizbeach, with a fire of love for Hashem. Our job is to keep that fire going every day with Torah, mitzvos and davening, so it never goes out."],
[["שְׁמִינִי","Sh'mi-ni","Eighth","The eighth day: the day the Mishkan started working."],
 ["כָּשֵׁר","Ko-sheir","Kosher","This parsha teaches which animals, fish and birds are kosher."],
 ["סְנַפִּיר וְקַשְׂקֶשֶׂת","S'na-pir v'kas-ke-ses","Fins and scales","The two signs of a kosher fish."],
 "Seven is the number of nature (seven days of the week). <b>Eight</b> is above nature. That's why a bris is on the 8th day and Chanukah has 8 nights. The Mishkan began working on the eighth day, because that's when Hashem's presence came down beyond nature."],
[["תַזְרִיעַ","Saz-ri-a","Plants a seed","Talks about a new baby being born."],
 ["צָרַעַת","Tzo-ra-as","A special skin sickness","Not a regular sickness. It came from saying mean words about others."],
 ["כֹּהֵן","Ko-hein","Kohen","Only a kohen could look at the tzaraas and say if it was tamei."],
 "Our sages say tzaraas came from <b>lashon hara</b>, mean talk. The person had to stay outside the camp alone for a while. Why? They had separated people with their words, so they got time to feel what separation feels like, and to think about using words to <b>bring people together</b>."],
[["מְצֹרָע","M'tzo-ra","Person with tzaraas","Our sages read it as <span lang='he'>מוֹצִיא רָע</span>, “one who lets out bad” words."],
 ["לָשׁוֹן הָרָע","Lo-shon ho-ra","Bad talk","Saying negative things about others, even if they're true."],
 ["בַּיִת","Ba-yis","House","Even a house could get tzaraas on its walls!"],
 "When a house got tzaraas, the stones had to be taken out. Rashi says the Canaanites had hidden <b>gold treasures</b> inside the walls, and this is how the Jews found them! Sometimes something that looks bad is really Hashem's way of uncovering a hidden treasure."],
[["אַחֲרֵי מוֹת","A-cha-rei mos","After the death","After Aharon's two sons passed away."],
 ["יוֹם כִּפּוּרִים","Yom Ki-pu-rim","Yom Kippur","The day Hashem forgives us. This parsha teaches the Yom Kippur service."],
 ["וָחַי בָּהֶם","Vo-chai bo-hem","And live by them","Live with the mitzvos, joyfully and fully."],
 "On Yom Kippur, the <b>holiest person</b> (the Kohen Gadol) went into the <b>holiest place</b> (the Kodesh HaKodashim) on the <b>holiest day</b>. Chassidus says every Jew has a holiest place inside too, a spark that is never touched by anything bad, and Yom Kippur lets it shine."],
[["קְדֹשִׁים","K'do-shim","Holy","“You shall be holy, because I, Hashem, am holy.”"],
 ["וְאָהַבְתָּ לְרֵעֲךָ כָּמוֹךָ","V'o-hav-to l'rei-a-cho ko-mo-cho","Love your friend like yourself","Rabbi Akiva said this is a great rule of the whole Torah."],
 ["לִפְנֵי עִוֵּר","Lif-nei i-veir","Before a blind person","Don't put a stumbling block in front of a blind person. Never trick anyone!"],
 "Being “holy” doesn't mean living on a mountaintop. Look at the mitzvos in this parsha: leave food for the poor, be honest, pay workers on time, respect elders. <b>Holiness happens in everyday life</b>: in how you speak, play fair and treat people."],
[["אֱמֹר","E-mor","Say","Hashem tells Moshe to say the rules to the kohanim."],
 ["מוֹעֲדִים","Mo-a-dim","Holidays","This parsha lists all the Yomim Tovim."],
 ["סְפִירַת הָעֹמֶר","S'fi-ras ho-o-mer","Counting the Omer","Counting 49 days from Pesach to Shavuos."],
 "The parsha begins “<b>say</b> to the kohanim … and you shall <b>say</b> to them,” two times! Rashi explains: the grown-ups should teach the young ones. When you learn something good, <b>say it to someone else</b> too. That's how the Torah passes from generation to generation."],
[["שְׁמִטָּה","Sh'mi-toh","Rest year","Every 7th year, the land in Eretz Yisroel rests. No planting!"],
 ["יוֹבֵל","Yo-veil","Jubilee","Every 50th year: land goes back to its first family and slaves go free."],
 ["כִּי לִי הָאָרֶץ","Ki li ho-o-retz","The land is Mine","Hashem reminds us: everything really belongs to Him."],
 "Imagine a farmer not planting for a whole year! It takes huge <b>trust in Hashem</b>. Hashem promised a triple harvest in the 6th year. Shemitah teaches that our food and money really come from Hashem, not just from our hard work."],
[["בְּחֻקֹּתַי","B'chu-ko-sai","My laws","“If you walk in My laws…” Rashi: if you work hard learning Torah."],
 ["בְּרָכוֹת","B'ro-chos","Blessings","Rain in its time, plenty of food and peace in the land."],
 ["וְהִתְהַלַּכְתִּי","V'his-ha-lach-ti","I will walk","Hashem promises: I will walk among you."],
 "<span lang='he'>חֹק</span> comes from <span lang='he'>חָקַק</span>, <b>to engrave</b>. Ink can be erased from paper, but letters engraved in stone become part of the stone forever. When we learn Torah with real effort, it becomes <b>engraved in us</b>, part of who we are."],
[["בְּמִדְבַּר","B'mid-bar","In the desert","The Torah was given in an empty desert."],
 ["מִסְפָּר","Mis-por","Number","Hashem counted the Jews again and again."],
 ["דְּגָלִים","D'go-lim","Flags","Each tribe camped under its own flag, all around the Mishkan."],
 "Why give the Torah in a <b>desert</b>, which belongs to nobody? To teach that the Torah belongs to <b>everyone</b>. And to receive it, a person should be like a desert: humble and open, ready to be filled. Rashi adds that Hashem counts us often because <b>we're precious to Him</b>, like someone counting their treasures."],
[["נָשֹׂא","No-so","Lift up","Literally “lift up the heads,” counting and giving honor."],
 ["יְבָרֶכְךָ","Y'vo-re-ch'cho","May He bless you","The start of Birkas Kohanim, the priestly blessing. Parents say it on Friday night!"],
 ["שָׁלוֹם","Sho-lom","Peace","The blessing ends with peace, the greatest blessing of all."],
 "Before blessing the people, the kohanim say a bracha that ends “<b>b'ahavah</b>,” <b>with love</b>. A blessing works best when it comes from a heart full of love. That's a lesson for us too: when you wish someone well, really mean it!"],
[["בְּהַעֲלֹתְךָ","B'ha-a-los-cho","When you lift up","When Aharon lights the Menorah."],
 ["מְנוֹרָה","M'no-roh","Menorah","The seven-branched golden lamp in the Mishkan."],
 ["פֶּסַח שֵׁנִי","Pe-sach Shei-ni","Second Pesach","A second chance for people who missed bringing the Pesach offering."],
 "Rashi says Aharon held the flame to the wick “<b>until it went up by itself</b>.” That's how to teach and help others: don't just do it for them. Help them until they can shine <b>on their own</b>. And Pesach Sheni teaches: <b>it's never too late</b>, there's always a second chance."],
[["שְׁלַח","Sh'lach","Send","Moshe sends twelve spies to see the land."],
 ["עָלֹה נַעֲלֶה","O-loh na-a-leh","We can surely go up","Calev's brave words: “We can do it!”"],
 ["צִיצִית","Tzi-tzis","Tzitzis","The mitzvah of tzitzis is at the end of this parsha. We say it in the Shema."],
 "Ten spies saw giants and said “we can't.” Calev and Yehoshua saw the same land and said “<b>we can!</b>” What made the difference? Trusting Hashem. When Hashem asks us to do something, He also gives us the strength to do it."],
[["קֹרַח","Ko-rach","Korach","He started an argument against Moshe and Aharon."],
 ["מַחְלֹקֶת","Mach-lo-kes","Argument","Pirkei Avos says an argument for selfish reasons doesn't last."],
 ["שְׁקֵדִים","Sh'kei-dim","Almonds","Aharon's staff blossomed with almonds overnight, proving Hashem chose him."],
 "Korach's name comes from <span lang='he'>קֵרֵחַ</span>, a <b>bald spot</b>, a gap. Korach made a split between people. The almond tree is the first to blossom, very fast. Aharon, who loved peace, was rewarded with a staff that grew quickly. <b>Peace makes things grow</b>, and fighting makes empty spaces."],
[["חֻקָּה","Chu-koh","A law beyond understanding","Like the red heifer: we do it because Hashem said so."],
 ["פָּרָה אֲדֻמָּה","Po-roh a-du-moh","Red heifer","Its ashes made people pure. Even King Shlomo said he couldn't understand it!"],
 ["סֶלַע","Se-la","Rock","Moshe hit the rock instead of speaking to it."],
 "Hashem told Moshe to <b>speak</b> to the rock. Rashi says: if a rock, which doesn't hear or need anything, listens to Hashem's word, how much more should we! Our sages add: words have power. Speaking kindly can soften even a stone heart, more than hitting ever could."],
[["בָּלָק","Bo-lok","Balak","The king who hired Bilaam to curse the Jews."],
 ["אָתוֹן","A-son","Donkey","Bilaam's donkey saw the angel and spoke!"],
 ["מַה טֹּבוּ","Mah to-vu","How good","“How good are your tents, Yaakov.” We say it every morning when we walk into shul!"],
 "Bilaam came to curse, but saw that the Jews' tent doors <b>didn't face each other</b>, so nobody could peek into anyone else's home. He was so impressed he blessed us instead! Respecting other people's privacy and keeping our homes modest is so special that even an enemy saw it."],
[["פִּינְחָס","Pin-chos","Pinchas","Hashem gave him a “covenant of peace.”"],
 ["בְּנוֹת צְלָפְחָד","B'nos Tz'lof-chod","Tzelofchad's daughters","Five sisters who asked for their father's portion in Eretz Yisroel."],
 ["תָּמִיד","To-mid","Always, daily","The daily offerings, morning and afternoon. Our daily davening takes their place."],
 "The five daughters of Tzelofchad <b>loved Eretz Yisroel</b> so much that they asked Moshe for their own share of it. Moshe asked Hashem, and Hashem said: <b>they are right!</b> Our sages praise them for being wise and loving the Land, at a time when others didn't."],
[["מַטּוֹת","Ma-tos","Tribes, staffs","The heads of the tribes. A <span lang='he'>מַטֶּה</span> is also a strong, hard stick."],
 ["נֶדֶר","Ne-der","Promise, vow","“He shall not break his word.” Keep your promises!"],
 ["חֲלוּצִים","Cha-lu-tzim","Front-line soldiers","The tribes of Gad and Reuven promised to fight first for their brothers."],
 "A <b>staff</b> is a branch cut off the tree. It's no longer soft and moist, it's hard and strong. Chassidus says that in exile, away from home, a Jew becomes like a staff: <b>firm and strong</b> in Torah and mitzvos, and nothing can bend us."],
[["מַסְעֵי","Mas-ei","Journeys","The 42 stops the Jews made in the desert, listed one by one."],
 ["עָרֵי מִקְלָט","O-rei mik-lot","Cities of refuge","Safe cities for someone who hurt another person by accident."],
 ["נַחֲלָה","Na-cha-loh","Inheritance","Each tribe's share of Eretz Yisroel."],
 "The Baal Shem Tov taught that the <b>42 journeys</b> are like the journeys of every Jew's life, from birth until Moshiach. Every place we go, every stage of life, has a purpose: to bring holiness there. Even the hard “desert” stops lead us closer to the Promised Land."],
[["דְּבָרִים","D'vo-rim","Words","Moshe's last speeches to the Jewish people."],
 ["אֵיכָה","Ei-choh","How?","Moshe says “How can I carry you alone?” We read this tune on Tisha B'Av."],
 ["אֶחָד עָשָׂר יוֹם","A-chad o-sor yom","Eleven days","The trip from Sinai should have taken 11 days, but took 40 years."],
 "Moshe wanted to remind the Jews of their mistakes, but he didn't shout. He just mentioned the <b>names of places</b> where they had sinned, as gentle hints. This is how to correct someone: <b>quietly and kindly</b>, so they don't feel embarrassed."],
[["וָאֶתְחַנַּן","Vo-es-cha-nan","And I pleaded","Moshe begged Hashem to let him enter Eretz Yisroel."],
 ["שְׁמַע יִשְׂרָאֵל","Sh'ma Yis-ro-eil","Hear, O Israel","The Shema is in this parsha!"],
 ["וְאָהַבְתָּ","V'o-hav-to","And you shall love","Love Hashem with all your heart, soul and might."],
 "The gematria of <span lang='he'>וָאֶתְחַנַּן</span> is <b>515</b>. Our sages say that's how many times Moshe prayed! Even when the answer was no, he kept davening with all his heart. Never stop praying. Every tefillah counts."],
[["עֵקֶב","Ei-kev","Because, heel","Also means <b>heel</b>, the bottom of your foot."],
 ["וְאָכַלְתָּ וְשָׂבָעְתָּ","V'o-chal-to v'so-vo-to","You will eat and be full","Then you will bless Hashem. That's the mitzvah of Birkas HaMazon!"],
 ["לֶחֶם","Le-chem","Bread","“A person doesn't live by bread alone.”"],
 "Rashi says <b>eikev</b> hints to the “small” mitzvos that people step on with their <b>heel</b>, thinking they don't matter. But every mitzvah matters to Hashem! A little smile, a short bracha, holding the door: none of them are small."],
[["רְאֵה","R'ei","See","“See, I put before you today a blessing and a curse.”"],
 ["בְּחִירָה","B'chi-roh","Choice","Hashem lets us choose, and asks us to choose good."],
 ["פָּתֹחַ תִּפְתַּח","Po-so-ach tif-tach","You shall surely open","Open your hand to give tzedakah, again and again."],
 "“See” is said to <b>one person</b>, but then “before <b>you all</b>.” Every single Jew is asked to <b>see</b> for themselves and choose. Hashem doesn't force us to be good. He shows us the way and trusts us to pick the blessing."],
[["שֹׁפְטִים","Shof-tim","Judges","Set up judges and officers in all your gates."],
 ["צֶדֶק צֶדֶק תִּרְדֹּף","Tze-dek tze-dek tir-dof","Justice, justice you shall chase","Not just do what's fair. <b>Run after it!</b>"],
 ["עֵץ הַשָּׂדֶה","Eitz ha-so-deh","Tree of the field","“A person is like a tree of the field.”"],
 "Chassidus explains: “set judges in <b>all your gates</b>” is also about <b>you</b>. Your body has gates: eyes, ears and mouth. Put a “judge” at each gate to decide what goes in and what comes out. Is this good to see? To hear? To say?"],
[["כִּי תֵצֵא","Ki seitzei","When you go out","The parsha with the most mitzvos: 74!"],
 ["שִׁלּוּחַ הַקֵּן","Shi-lu-ach ha-kein","Sending away the mother bird","Send the mother bird away before taking her eggs."],
 ["מַעֲקֶה","Ma-a-keh","Railing","Build a fence on your roof so nobody falls."],
 "Rashi says the mitzvos here are in a special order: do the mitzvah of the <b>bird's nest</b>, and you'll merit to build a <b>new house</b> with a railing, then a vineyard, and more. That's <b>mitzvah goreres mitzvah</b>: one mitzvah leads to the next!"],
[["כִּי תָבוֹא","Ki so-vo","When you come","When you come into Eretz Yisroel…"],
 ["בִּכּוּרִים","Bi-ku-rim","First fruits","The first fruits of the year, brought to the Beis Hamikdash with music and joy."],
 ["שִׂמְחָה","Sim-choh","Joy","Serve Hashem with joy and a good heart."],
 "The farmer brought his <b>very first and best</b> fruits to Hashem, not the leftovers. Later the parsha warns about not serving Hashem “<b>with joy</b>.” Together they teach: give Hashem the best of you, and do it happily! The Rebbe often said <b>simcha</b> breaks through every wall."],
[["נִצָּבִים","Ni-tzo-vim","Standing","“You are all standing here today,” from the leaders to the water carriers."],
 ["קָרוֹב","Ko-rov","Close","The Torah is “<b>very close</b> to you, in your mouth and your heart.”"],
 ["הַיּוֹם","Ha-yom","Today","Always read before Rosh Hashanah. “Today” hints to the Day of Judgment."],
 "“<span lang='he'>כִּי קָרוֹב אֵלֶיךָ הַדָּבָר מְאֹד</span>”: the Torah is <b>very close</b> to you. The Alter Rebbe built the whole Tanya on this pasuk! It means that keeping the Torah isn't too far or too hard. It's right here in your mouth, your heart and your hands."],
[["וַיֵּלֶךְ","Va-yei-lech","And he went","On his very last day, Moshe went to every tent to say goodbye."],
 ["הַקְהֵל","Hak-heil","Gather","Every 7 years, everyone gathered to hear the king read the Torah."],
 ["סֵפֶר תּוֹרָה","Se-fer To-roh","Torah scroll","The last mitzvah in the Torah: write a Sefer Torah."],
 "Even on the last day of his life, Moshe <b>kept going</b>. The Rebbe taught: a Jew never stands still. No matter how much you've done, there's always another step higher. And Hakhel teaches that even little children came, because everyone counts."],
[["הַאֲזִינוּ","Ha-a-zi-nu","Listen","“Listen, heavens, and I will speak.”"],
 ["כְּנֶשֶׁר","K'ne-sher","Like an eagle","Hashem carries us like an eagle carries its babies."],
 ["צוּר","Tzur","Rock","Hashem is called “the Rock,” strong and always there."],
 "Rashi explains: other birds carry their babies in their <b>feet</b>, but the eagle carries them <b>on its wings</b>. It says: “Let the arrow hit me, not my children!” That's how Hashem carries the Jewish people: above everything, protecting us with love."],
[["וְזֹאת הַבְּרָכָה","V'zos ha-b'ro-choh","And this is the blessing","Moshe's last blessing to every tribe."],
 ["מוֹרָשָׁה","Mo-ro-shoh","Inheritance","“<span lang='he'>תּוֹרָה צִוָּה לָנוּ מֹשֶׁה מוֹרָשָׁה</span>”: the first pasuk a Jewish child learns!"],
 ["לְעֵינֵי כָּל יִשְׂרָאֵל","L'ei-nei kol Yis-ro-eil","Before the eyes of all Israel","The very last words of the Torah."],
 "The Torah is a <b>morashah</b>, an inheritance. An inheritance belongs to <b>every</b> child equally, whether they're big or small, a great scholar or just starting out. The whole Torah is yours! And its last letter, <span lang='he'>ל</span>, joins its first letter, <span lang='he'>ב</span>, to spell <span lang='he'>לֵב</span>, <b>heart</b>."]
];

// One pasuk (or part of one) from each parsha, word by word: [book, "chapter:verse", hebrew, sound-out, meanings separated by |, English]
const PSK=[
[0,"1:1","בְּרֵאשִׁית בָּרָא אֱלֹקִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ","B'rei-shis bo-ro E-lo-kim eis ha-sho-ma-yim v'eis ho-o-retz","In the beginning|created|G-d|(the)|the heavens|and (the)|the earth","In the beginning G-d created the heavens and the earth."],
[0,"6:9","נֹחַ אִישׁ צַדִּיק תָּמִים הָיָה בְּדֹרֹתָיו","No-ach ish tza-dik to-mim ho-yoh b'do-ro-sov","Noach|a man|righteous|complete|was|in his generations","Noach was a righteous man, complete in his generations."],
[0,"12:1","לֶךְ לְךָ מֵאַרְצְךָ וּמִמּוֹלַדְתְּךָ וּמִבֵּית אָבִיךָ","Lech l'cho mei-ar-tz'cho u-mi-mo-lad-t'cho u-mi-beis o-vi-cho","Go|for yourself|from your land|and from your birthplace|and from the house of|your father","Go for yourself, from your land, your birthplace and your father's house."],
[0,"22:1","וַיֹּאמֶר אֵלָיו אַבְרָהָם וַיֹּאמֶר הִנֵּנִי","Va-yo-mer ei-lov Av-ro-hom va-yo-mer hi-ne-ni","And He said|to him|Avraham!|and he said|here I am","He said to him, “Avraham!” And he said, “Here I am.”"],
[0,"23:1","וַיִּהְיוּ חַיֵּי שָׂרָה מֵאָה שָׁנָה וְעֶשְׂרִים שָׁנָה וְשֶׁבַע שָׁנִים","Va-yih-yu cha-yei So-roh mei-oh sho-noh v'es-rim sho-noh v'she-va sho-nim","And were|the life of|Sarah|a hundred|year|and twenty|year|and seven|years","Sarah's life was one hundred years, twenty years and seven years."],
[0,"25:19","וְאֵלֶּה תּוֹלְדֹת יִצְחָק בֶּן אַבְרָהָם","V'ei-leh to-l'dos Yitz-chok ben Av-ro-hom","And these are|the generations of|Yitzchak|son of|Avraham","These are the generations of Yitzchak, son of Avraham."],
[0,"28:12","וְהִנֵּה סֻלָּם מֻצָּב אַרְצָה וְרֹאשׁוֹ מַגִּיעַ הַשָּׁמָיְמָה","V'hi-neih su-lom mu-tzov ar-tzoh v'ro-sho ma-gi-a ha-sho-may-moh","And behold|a ladder|standing|on the ground|and its top|reaching|to the heavens","And behold, a ladder stood on the ground, and its top reached the heavens."],
[0,"32:29","לֹא יַעֲקֹב יֵאָמֵר עוֹד שִׁמְךָ כִּי אִם יִשְׂרָאֵל","Lo Ya-a-kov yei-o-meir od shim-cho ki im Yis-ro-eil","Not|Yaakov|will be said|anymore|your name|but|rather|Yisrael","Your name will no longer be Yaakov, but Yisrael."],
[0,"37:16","אֶת אַחַי אָנֹכִי מְבַקֵּשׁ","Es a-chai o-no-chi m'va-keish","(the)|my brothers|I|am looking for","I am looking for my brothers."],
[0,"41:16","בִּלְעָדָי אֱלֹקִים יַעֲנֶה אֶת שְׁלוֹם פַּרְעֹה","Bil-o-dai E-lo-kim ya-a-neh es sh'lom Par-oh","Not me|G-d|will answer|(the)|the peace of|Pharaoh","It's not me. G-d will give Pharaoh a good answer."],
[0,"45:3","אֲנִי יוֹסֵף הַעוֹד אָבִי חָי","A-ni Yo-seif ha-od o-vi chai","I am|Yosef|is still|my father|alive?","I am Yosef. Is my father still alive?"],
[0,"48:20","יְשִׂמְךָ אֱלֹקִים כְּאֶפְרַיִם וְכִמְנַשֶּׁה","Y'sim-cho E-lo-kim k'Ef-ra-yim v'chi-Me-na-sheh","May He make you|G-d|like Ephraim|and like Menashe","May G-d make you like Ephraim and Menashe."],
[1,"3:2","וְהִנֵּה הַסְּנֶה בֹּעֵר בָּאֵשׁ וְהַסְּנֶה אֵינֶנּוּ אֻכָּל","V'hi-neih ha-s'neh bo-eir bo-eish v'ha-s'neh ei-ne-nu u-kol","And behold|the bush|was burning|in fire|and the bush|was not|burned up","The bush was burning with fire, but the bush was not burned up."],
[1,"6:6","וְהוֹצֵאתִי אֶתְכֶם מִתַּחַת סִבְלֹת מִצְרַיִם","V'ho-tzei-si es-chem mi-ta-chas siv-los Mitz-ra-yim","And I will take out|you|from under|the heavy work of|Egypt","I will take you out from under the heavy work of Egypt."],
[1,"10:1","בֹּא אֶל פַּרְעֹה כִּי אֲנִי הִכְבַּדְתִּי אֶת לִבּוֹ","Bo el Par-oh ki a-ni hich-bad-ti es li-bo","Come|to|Pharaoh|because|I|made heavy|(the)|his heart","Come to Pharaoh, because I have made his heart stubborn."],
[1,"15:1","אָז יָשִׁיר מֹשֶׁה וּבְנֵי יִשְׂרָאֵל אֶת הַשִּׁירָה הַזֹּאת","Oz yo-shir Mo-sheh u-v'nei Yis-ro-eil es ha-shi-roh ha-zos","Then|sang|Moshe|and the children of|Israel|(the)|the song|this","Then Moshe and the Jewish people sang this song."],
[1,"20:2","אָנֹכִי ה׳ אֱלֹקֶיךָ אֲשֶׁר הוֹצֵאתִיךָ מֵאֶרֶץ מִצְרַיִם","O-no-chi Hashem E-lo-ke-cho a-sher ho-tzei-si-cho mei-e-retz Mitz-ra-yim","I am|Hashem|your G-d|who|took you out|from the land of|Egypt","I am Hashem your G-d, who took you out of the land of Egypt."],
[1,"24:7","כֹּל אֲשֶׁר דִּבֶּר ה׳ נַעֲשֶׂה וְנִשְׁמָע","Kol a-sher di-ber Hashem na-a-seh v'nish-mo","All|that|spoke|Hashem|we will do|and we will hear","Everything Hashem said, we will do and we will listen."],
[1,"25:8","וְעָשׂוּ לִי מִקְדָּשׁ וְשָׁכַנְתִּי בְּתוֹכָם","V'o-su li mik-dosh v'sho-chan-ti b'so-chom","And they shall make|for Me|a Mikdash|and I will live|inside them","Make Me a holy place, and I will live inside them."],
[1,"27:20","שֶׁמֶן זַיִת זָךְ כָּתִית לַמָּאוֹר לְהַעֲלֹת נֵר תָּמִיד","She-men za-yis zoch ko-sis la-mo-or l'ha-a-los neir to-mid","Oil of|olive|pure|crushed|for the light|to raise up|a lamp|always","Pure, crushed olive oil for the light, to keep a lamp burning always."],
[1,"30:15","הֶעָשִׁיר לֹא יַרְבֶּה וְהַדַּל לֹא יַמְעִיט","He-o-shir lo yar-beh v'ha-dal lo yam-it","The rich person|not|shall give more|and the poor person|not|shall give less","The rich may not give more, and the poor may not give less."],
[1,"35:21","וַיָּבֹאוּ כָּל אִישׁ אֲשֶׁר נְשָׂאוֹ לִבּוֹ","Va-yo-vo-u kol ish a-sher n'so-o li-bo","And they came|every|person|whose|lifted him up|his heart","Everyone whose heart lifted them up came to give."],
[1,"40:34","וַיְכַס הֶעָנָן אֶת אֹהֶל מוֹעֵד וּכְבוֹד ה׳ מָלֵא אֶת הַמִּשְׁכָּן","Vay-chas he-o-non es o-hel mo-eid u-ch'vod Hashem mo-lei es ha-mish-kon","And covered|the cloud|(the)|the Tent of|Meeting|and the glory of|Hashem|filled|(the)|the Mishkan","The cloud covered the Tent of Meeting, and Hashem's glory filled the Mishkan."],
[2,"1:2","אָדָם כִּי יַקְרִיב מִכֶּם קָרְבָּן לַה׳","O-dom ki yak-riv mi-kem kor-bon la-Shem","A person|when|brings close|from you|an offering|to Hashem","When a person from you brings an offering to Hashem…"],
[2,"6:6","אֵשׁ תָּמִיד תּוּקַד עַל הַמִּזְבֵּחַ לֹא תִכְבֶּה","Eish to-mid tu-kad al ha-miz-bei-ach lo sich-beh","A fire|always|shall burn|on|the Mizbeach|not|shall it go out","A fire shall always burn on the Mizbeach. It must not go out."],
[2,"11:9","כֹּל אֲשֶׁר לוֹ סְנַפִּיר וְקַשְׂקֶשֶׂת בַּמַּיִם בַּיַּמִּים וּבַנְּחָלִים אֹתָם תֹּאכֵלוּ","Kol a-sher lo s'na-pir v'kas-ke-ses ba-ma-yim ba-ya-mim u-va-n'cho-lim o-som to-chei-lu","Every one|that|has|fins|and scales|in the water|in the seas|and in the rivers|them|you may eat","Anything in the water with fins and scales, in the seas and rivers, you may eat."],
[2,"13:46","בָּדָד יֵשֵׁב מִחוּץ לַמַּחֲנֶה מוֹשָׁבוֹ","Bo-dod yei-sheiv mi-chutz la-ma-cha-neh mo-sho-vo","Alone|he shall sit|outside|the camp|his place","He shall stay alone, his place outside the camp."],
[2,"14:2","זֹאת תִּהְיֶה תּוֹרַת הַמְּצֹרָע","Zos tih-yeh to-ras ha-m'tzo-ra","This|shall be|the law of|the metzora","This is the law for the person with tzaraas."],
[2,"16:30","כִּי בַיּוֹם הַזֶּה יְכַפֵּר עֲלֵיכֶם לְטַהֵר אֶתְכֶם","Ki va-yom ha-zeh y'cha-peir a-lei-chem l'ta-heir es-chem","Because|on the day|this|He will forgive|for you|to make pure|you","On this day He will forgive you, to make you pure."],
[2,"19:2","קְדֹשִׁים תִּהְיוּ כִּי קָדוֹשׁ אֲנִי ה׳ אֱלֹקֵיכֶם","K'do-shim tih-yu ki ko-dosh a-ni Hashem E-lo-kei-chem","Holy|you shall be|because|holy|am I|Hashem|your G-d","You shall be holy, because I, Hashem your G-d, am holy."],
[2,"21:1","אֱמֹר אֶל הַכֹּהֲנִים בְּנֵי אַהֲרֹן וְאָמַרְתָּ אֲלֵהֶם","E-mor el ha-ko-ha-nim b'nei A-ha-ron v'o-mar-to a-lei-hem","Say|to|the kohanim|the sons of|Aharon|and you shall say|to them","Say to the kohanim, the sons of Aharon, and tell them…"],
[2,"25:23","וְהָאָרֶץ לֹא תִמָּכֵר לִצְמִתֻת כִּי לִי הָאָרֶץ","V'ho-o-retz lo si-mo-cheir litz-mi-sus ki li ho-o-retz","And the land|not|shall be sold|forever|because|Mine|is the land","The land may not be sold forever, because the land is Mine."],
[2,"26:3","אִם בְּחֻקֹּתַי תֵּלֵכוּ וְאֶת מִצְוֹתַי תִּשְׁמְרוּ","Im b'chu-ko-sai tei-lei-chu v'es mitz-vo-sai tish-m'ru","If|in My laws|you walk|and (the)|My mitzvos|you keep","If you walk in My laws and keep My mitzvos…"],
[3,"1:1","וַיְדַבֵּר ה׳ אֶל מֹשֶׁה בְּמִדְבַּר סִינַי","Vay-da-beir Hashem el Mo-sheh b'mid-bar Si-nai","And spoke|Hashem|to|Moshe|in the desert of|Sinai","Hashem spoke to Moshe in the desert of Sinai."],
[3,"6:24","יְבָרֶכְךָ ה׳ וְיִשְׁמְרֶךָ","Y'vo-re-ch'cho Hashem v'yish-m're-cho","May He bless you|Hashem|and protect you","May Hashem bless you and protect you."],
[3,"8:2","בְּהַעֲלֹתְךָ אֶת הַנֵּרֹת אֶל מוּל פְּנֵי הַמְּנוֹרָה יָאִירוּ שִׁבְעַת הַנֵּרוֹת","B'ha-a-los-cho es ha-nei-ros el mul p'nei ha-m'no-roh yo-i-ru shiv-as ha-nei-ros","When you raise up|(the)|the lamps|toward|facing|the front of|the Menorah|shall shine|the seven|lamps","When you light the lamps, the seven lamps shall shine toward the front of the Menorah."],
[3,"13:30","עָלֹה נַעֲלֶה וְיָרַשְׁנוּ אֹתָהּ כִּי יָכוֹל נוּכַל לָהּ","O-loh na-a-leh v'yo-rash-nu o-soh ki yo-chol nu-chal loh","Surely go up|we will go up|and we will inherit|it|because|surely able|we can do|it","We can surely go up and take the land, because we can surely do it!"],
[3,"17:23","וַיֹּצֵא פֶרַח וַיָּצֵץ צִיץ וַיִּגְמֹל שְׁקֵדִים","Va-yo-tzei fe-rach va-yo-tzeitz tzitz va-yig-mol sh'kei-dim","It brought out|a bud|and it sprouted|a blossom|and it grew|almonds","It brought out buds, sprouted blossoms and grew almonds."],
[3,"20:8","וְדִבַּרְתֶּם אֶל הַסֶּלַע לְעֵינֵיהֶם וְנָתַן מֵימָיו","V'di-bar-tem el ha-se-la l'ei-nei-hem v'no-san mei-mov","And you shall speak|to|the rock|before their eyes|and it will give|its water","Speak to the rock in front of them, and it will give its water."],
[3,"24:5","מַה טֹּבוּ אֹהָלֶיךָ יַעֲקֹב מִשְׁכְּנֹתֶיךָ יִשְׂרָאֵל","Mah to-vu o-ho-le-cho Ya-a-kov mish-k'no-se-cho Yis-ro-eil","How|good are|your tents|Yaakov|your homes|Yisrael","How good are your tents, Yaakov, your homes, Yisrael!"],
[3,"27:7","כֵּן בְּנוֹת צְלָפְחָד דֹּבְרֹת","Kein b'nos Tz'lof-chod dov-ros","Right|the daughters of|Tzelofchad|are speaking","The daughters of Tzelofchad are right."],
[3,"30:3","לֹא יַחֵל דְּבָרוֹ כְּכָל הַיֹּצֵא מִפִּיו יַעֲשֶׂה","Lo ya-cheil d'vo-ro k'chol ha-yo-tzei mi-piv ya-a-seh","Not|shall he break|his word|like all|that comes out|of his mouth|he shall do","He must not break his word. He must do everything he said."],
[3,"33:1","אֵלֶּה מַסְעֵי בְנֵי יִשְׂרָאֵל","Ei-leh mas-ei v'nei Yis-ro-eil","These are|the journeys of|the children of|Israel","These are the journeys of the Jewish people."],
[4,"1:1","אֵלֶּה הַדְּבָרִים אֲשֶׁר דִּבֶּר מֹשֶׁה אֶל כָּל יִשְׂרָאֵל","Ei-leh ha-d'vo-rim a-sher di-ber Mo-sheh el kol Yis-ro-eil","These are|the words|that|spoke|Moshe|to|all|Israel","These are the words Moshe spoke to all of Israel."],
[4,"6:4","שְׁמַע יִשְׂרָאֵל ה׳ אֱלֹקֵינוּ ה׳ אֶחָד","Sh'ma Yis-ro-eil Hashem E-lo-kei-nu Hashem E-chod","Hear|Israel|Hashem|is our G-d|Hashem|is One","Hear, O Israel: Hashem is our G-d, Hashem is One."],
[4,"8:10","וְאָכַלְתָּ וְשָׂבָעְתָּ וּבֵרַכְתָּ אֶת ה׳ אֱלֹקֶיךָ","V'o-chal-to v'so-vo-to u-vei-rach-to es Hashem E-lo-ke-cho","And you will eat|and be full|and you shall bless|(the)|Hashem|your G-d","You will eat and be full, and bless Hashem your G-d."],
[4,"11:26","רְאֵה אָנֹכִי נֹתֵן לִפְנֵיכֶם הַיּוֹם בְּרָכָה וּקְלָלָה","R'ei o-no-chi no-sein lif-nei-chem ha-yom b'ro-choh u-k'lo-loh","See|I|am placing|before you|today|a blessing|and a curse","See, I am placing before you today a blessing and a curse."],
[4,"16:20","צֶדֶק צֶדֶק תִּרְדֹּף לְמַעַן תִּחְיֶה","Tze-dek tze-dek tir-dof l'ma-an tich-yeh","Justice|justice|you shall chase|so that|you will live","Justice, justice you shall chase, so that you will live."],
[4,"22:7","שַׁלֵּחַ תְּשַׁלַּח אֶת הָאֵם וְאֶת הַבָּנִים תִּקַּח לָךְ","Sha-lei-ach t'sha-lach es ho-eim v'es ha-bo-nim ti-kach loch","Surely send away|you shall send|(the)|the mother|and (the)|the young ones|you may take|for yourself","Send the mother bird away, and then you may take the young."],
[4,"26:2","וְלָקַחְתָּ מֵרֵאשִׁית כָּל פְּרִי הָאֲדָמָה","V'lo-kach-to mei-rei-shis kol p'ri ho-a-do-moh","And you shall take|from the first|of all|the fruit of|the ground","Take from the first of all the fruit of the land."],
[4,"30:14","כִּי קָרוֹב אֵלֶיךָ הַדָּבָר מְאֹד בְּפִיךָ וּבִלְבָבְךָ לַעֲשֹׂתוֹ","Ki ko-rov ei-le-cho ha-do-vor m'od b'fi-cho u-vil-vov-cho la-a-so-so","Because|close|to you|the thing is|very|in your mouth|and in your heart|to do it","It is very close to you, in your mouth and your heart, to do it."],
[4,"31:12","הַקְהֵל אֶת הָעָם הָאֲנָשִׁים וְהַנָּשִׁים וְהַטַּף","Hak-heil es ho-om ho-a-no-shim v'ha-no-shim v'ha-taf","Gather|(the)|the people|the men|and the women|and the little children","Gather the people: the men, the women and the little children."],
[4,"32:1","הַאֲזִינוּ הַשָּׁמַיִם וַאֲדַבֵּרָה וְתִשְׁמַע הָאָרֶץ אִמְרֵי פִי","Ha-a-zi-nu ha-sho-ma-yim va-a-da-bei-roh v'sish-ma ho-o-retz im-rei fi","Listen|heavens|and I will speak|and let hear|the earth|the words of|my mouth","Listen, heavens, and I will speak. Let the earth hear the words of my mouth."],
[4,"33:4","תּוֹרָה צִוָּה לָנוּ מֹשֶׁה מוֹרָשָׁה קְהִלַּת יַעֲקֹב","To-roh tzi-voh lo-nu Mo-sheh mo-ro-shoh k'hi-las Ya-a-kov","The Torah|commanded|us|Moshe|an inheritance|of the community of|Yaakov","Moshe commanded us the Torah, an inheritance for the community of Yaakov."]
];

// One well-known Rashi for each parsha: [book, "chapter:verse", Rashi's words, sound-out, meanings separated by |, what Rashi is teaching]
const RASHI=[
[0,"1:1","לֹא הָיָה צָרִיךְ לְהַתְחִיל אֶת הַתּוֹרָה אֶלָּא מֵהַחֹדֶשׁ הַזֶּה לָכֶם","Lo ho-yoh tzo-rich l'has-chil es ha-To-roh e-lo mei-ha-cho-desh ha-zeh lo-chem","Not|was|necessary|to begin|(the)|the Torah|except|from “This month|this|is for you”","Rashi asks: the Torah is a book of mitzvos, so why not start with the first mitzvah, <i>Hachodesh hazeh lachem</i>? He answers: the Torah starts with creation so that if the nations ever say the Jews stole Eretz Yisroel, we can answer: <b>Hashem made the whole world</b>, and He gave the land to us."],
[0,"6:9","כָּל שֶׁכֵּן שֶׁאִלּוּ הָיָה בְּדוֹר צַדִּיקִים הָיָה צַדִּיק יוֹתֵר","Kol she-kein she-i-lu ho-yoh b'dor tza-di-kim ho-yoh tza-dik yo-seir","All|the more so|that if|he was|in a generation of|tzaddikim|he would be|righteous|even more","Why does the Torah say Noach was a tzadik “<b>in his generation</b>”? Some of our sages say it's praise: if he stayed good among bad people, imagine how great he would have been among good people!"],
[0,"12:1","לַהֲנָאָתְךָ וּלְטוֹבָתְךָ","La-ha-no-os-cho u-l'to-vo-s'cho","For your pleasure|and for your good","Why “go <b>for yourself</b>”? Rashi says: it's <b>for your own good</b>. Hashem promised that in the new land Avraham would have children and become famous. When Hashem asks something hard, it's really for our good."],
[0,"18:1","לְבַקֵּר אֶת הַחוֹלֶה","L'va-keir es ha-cho-leh","To visit|(the)|the sick person","Avraham had just had his bris, and Hashem appeared to him. Why? Rashi says Hashem came <b>to visit the sick</b>! Hashem Himself does bikur cholim, so we should too."],
[0,"23:1","כֻּלָּן שָׁוִין לְטוֹבָה","Ku-lon sho-vin l'to-voh","All of them|were equal|for good","Why does the pasuk count Sarah's years in three parts: 100 years, 20 years and 7 years? Rashi: at 100 she was as free of sin as at 20, and at 20 as beautiful as at 7. <b>All her years were equally good.</b>"],
[0,"25:22","כְּשֶׁהָיְתָה עוֹבֶרֶת עַל פִּתְחֵי תוֹרָה שֶׁל שֵׁם וָעֵבֶר יַעֲקֹב רָץ וּמְפַרְכֵּס לָצֵאת","K'she-hoy-soh o-ve-res al pis-chei So-roh shel Sheim vo-Ei-ver Ya-a-kov rotz u-m'far-keis lo-tzeis","When she|passed|by|the doors of|Torah|of|Sheim|and Eiver|Yaakov|ran|and kicked|to get out","Before the twins were born, Rivkah felt them pushing inside her. Rashi says: when she walked past the <b>Torah school</b> of Sheim and Eiver, baby <b>Yaakov kicked to get out</b>. He wanted to learn Torah even before he was born!"],
[0,"28:10","יְצִיאַת צַדִּיק מִן הַמָּקוֹם עוֹשָׂה רֹשֶׁם","Y'tzi-as tza-dik min ha-mo-kom o-soh ro-shem","The leaving of|a tzadik|from|the place|makes|an impression","Why does the Torah tell us Yaakov <b>left</b> Be'er Sheva? Rashi: when a tzadik leaves a town, it <b>leaves a mark</b>. Its glow, beauty and shine leave with him. A good person makes a difference just by being there."],
[0,"32:5","עִם לָבָן הָרָשָׁע גַּרְתִּי וְתַרְיַ״ג מִצְוֹת שָׁמַרְתִּי","Im Lo-von ho-ro-sho gar-ti v'tar-yag mitz-vos sho-mar-ti","With|Lavan|the wicked|I lived|and the 613|mitzvos|I kept","Yaakov sends a message to Eisav: <span lang='he'>עִם לָבָן גַּרְתִּי</span>, “I lived with Lavan.” The gematria of <span lang='he'>גַּרְתִּי</span> is <b>613</b>! Rashi says it means: I lived with wicked Lavan, but I still <b>kept all 613 mitzvos</b> and didn't learn from his bad ways."],
[0,"37:2","בִּקֵּשׁ יַעֲקֹב לֵישֵׁב בְּשַׁלְוָה קָפַץ עָלָיו רָגְזוֹ שֶׁל יוֹסֵף","Bi-keish Ya-a-kov lei-sheiv b'shal-voh ko-fatz o-lov rog-zo shel Yo-seif","Wanted|Yaakov|to settle|in calm|jumped|on him|the trouble|of|Yosef","After all his hard years, Yaakov <b>wanted to rest in peace and quiet</b>. Right away, the trouble with Yosef jumped on him. Rashi teaches: tzaddikim don't look for an easy life in this world. There's always more work to do."],
[0,"41:16","אֵין הַחָכְמָה מִשֶּׁלִּי אֶלָּא אֱלֹקִים יַעֲנֶה","Ein ha-choch-moh mi-she-li e-lo E-lo-kim ya-a-neh","Not|the wisdom|is mine|but rather|G-d|will answer","Pharaoh said, “I heard you can explain dreams.” Yosef answered: <b>the wisdom isn't mine</b>. Hashem gives it. Even standing before a king, Yosef gave the credit to Hashem."],
[0,"45:27","סִימָן מָסַר לָהֶם בַּמֶּה הָיָה עוֹסֵק כְּשֶׁפֵּרַשׁ מִמֶּנּוּ בְּפָרָשַׁת עֶגְלָה עֲרוּפָה","Si-mon mo-sar lo-hem ba-meh ho-yoh o-seik k'she-pei-rash mi-me-nu b'fo-ro-shas eg-loh a-ru-foh","A sign|he gave|them|in what|he was|busy learning|when he left|from him|in the section of|the calf|whose neck is broken","Yosef sent wagons, <span lang='he'>עֲגָלוֹת</span>. Rashi says this was a <b>secret sign</b>: the last Torah topic Yaakov and Yosef learned together was the <i>eglah arufah</i>. The wagons said: “I still remember our learning!”"],
[0,"48:20","הַבָּא לְבָרֵךְ אֶת בָּנָיו יְבָרְכֵם בְּבִרְכָתָם","Ha-bo l'vo-reich es bo-nov y'vor-cheim b'vir-cho-som","Whoever comes|to bless|(the)|his sons|will bless them|with their blessing","Rashi says that from now on, <b>whoever blesses his sons</b> will use the blessing of Ephraim and Menashe: “May G-d make you like Ephraim and Menashe.” That's exactly what Jewish parents still say every Friday night!"],
[1,"3:2","וְלֹא אִילָן אַחֵר מִשּׁוּם עִמּוֹ אָנֹכִי בְצָרָה","V'lo i-lon a-cheir mi-shum i-mo o-no-chi v'tzo-roh","And not|tree|another|because|with him|I am|in trouble","Why did Hashem speak from a thorn bush and <b>not any other tree</b>? Rashi: because “<b>I am with him in his trouble</b>.” The Jews were suffering in Egypt, so Hashem chose a painful, thorny bush. Hashem feels our pain."],
[1,"8:2","צְפַרְדֵּעַ אַחַת הָיְתָה וְהָיוּ מַכִּים אוֹתָהּ וְהִיא מַתֶּזֶת נְחִילִים נְחִילִים","Tz'far-dei-a a-chas hoy-soh v'ho-yu ma-kim o-soh v'hi ma-te-zes n'chi-lim n'chi-lim","A frog|one|there was|and they were|hitting|it|and it|sprayed out|swarms|swarms","The pasuk says “<b>the frog</b> came up,” just one! Rashi: it was <b>one frog</b>. The Egyptians hit it, and it sprayed out swarms and swarms of frogs. The more they hit, the more frogs came!"],
[1,"12:2","הֶרְאָהוּ לְבָנָה בְּחִדּוּשָׁהּ","Her-o-hu l'vo-noh b'chi-du-shoh","He showed him|the moon|when it was new","Moshe wasn't sure exactly what a new moon looks like. Rashi says Hashem <b>showed him the moon</b> when it was new and said: “When you see this, it's Rosh Chodesh.” The Jewish calendar follows the moon!"],
[1,"15:2","רָאֲתָה שִׁפְחָה עַל הַיָּם מַה שֶּׁלֹּא רָאוּ יְשַׁעְיָה וִיחֶזְקֵאל","Ro-a-soh shif-choh al ha-yom mah she-lo ro-u Y'sha-yoh vi-Y'chez-keil","Saw|a maidservant|at|the sea|what|that not|saw|Yeshayahu|and Yechezkel","At the sea, the Jews pointed and sang “<span lang='he'>זֶה אֵלִי</span>, <b>this</b> is my G-d!” Rashi: Hashem's glory was so clear that a simple <b>maidservant saw more than the great prophets</b> Yeshayahu and Yechezkel ever saw."],
[1,"19:2","כְּאִישׁ אֶחָד בְּלֵב אֶחָד","K'ish e-chod b'leiv e-chod","Like a man|one|with a heart|one","The pasuk says “<b>Yisrael camped</b>” in the singular form. Rashi: the whole Jewish people camped at Sinai <b>like one person, with one heart</b>. No arguing, just unity. That's how we got the Torah."],
[1,"21:1","מָה הָרִאשׁוֹנִים מִסִּינַי אַף אֵלּוּ מִסִּינַי","Mah ha-ri-sho-nim mi-Si-nai af ei-lu mi-Si-nai","Just as|the first ones|are from Sinai|also|these|are from Sinai","The parsha starts with “<b>And</b> these are the laws.” Rashi: the word “and” connects it to last week. Just as the Ten Commandments are <b>from Sinai</b>, so are these everyday laws about being fair. All of the Torah is from Hashem."],
[1,"25:2","לִי לִשְׁמִי","Li lish-mi","For Me|for My Name","“Take <b>for Me</b> a gift.” Rashi: <b>for My sake</b>. Give to the Mishkan because Hashem asked, not to show off. The reason we do a mitzvah matters too."],
[1,"27:20","כָּל לַיְלָה וְלַיְלָה קָרוּי תָּמִיד","Kol lai-loh v'lai-loh ko-ruy to-mid","Every|night|and night|is called|always","The Menorah was a “<b>ner tamid</b>,” a lamp that's always lit. But it was only lit at night! Rashi: something done <b>every single night</b> is called “always.” Doing a mitzvah every day, even a small one, makes it “tamid.”"],
[1,"30:13","הֶרְאָהוּ כְּמִין מַטְבֵּעַ שֶׁל אֵשׁ","Her-o-hu k'min mat-bei-a shel eish","He showed him|a kind of|coin|of|fire","Hashem told Moshe: “<b>This</b> they shall give: a half-shekel.” Rashi: Hashem <b>showed Moshe a coin made of fire</b>. Chassidus explains: even a small coin of tzedakah can be full of fire when given with warmth and love."],
[1,"38:8","אֵלּוּ חֲבִיבִין עָלַי מִן הַכֹּל","Ei-lu cha-vi-vin o-lai min ha-kol","These|are dear|to Me|than|everything","Moshe didn't want to use the women's mirrors for the Mishkan. Hashem said: <b>these are dearer to Me than everything</b>! In Egypt, the women used them to keep their families strong and hopeful."],
[1,"38:21","הַמִּשְׁכָּן מִשְׁכַּן שְׁנֵי פְעָמִים רֶמֶז לַמִּקְדָּשׁ שֶׁנִּתְמַשְׁכֵּן","Ha-mish-kon mish-kan sh'nei f'o-mim re-mez la-mik-dosh she-nis-mash-kein","The Mishkan|the Mishkan of|two|times|a hint|to the Mikdash|that was taken as a pledge","Why does the pasuk say “<b>Mishkan</b>” twice? Rashi: it hints to the two Batei Mikdash. The word sounds like <span lang='he'>מַשְׁכּוֹן</span>, a <b>pledge</b>: something you hold onto and later <b>give back</b>. Hashem will give us back the Beis Hamikdash with Moshiach!"],
[2,"1:1","לְשׁוֹן חִבָּה","L'shon chi-boh","A word of|love","Before Hashem spoke to Moshe, He first <b>called</b> him: <span lang='he'>וַיִּקְרָא</span>. Rashi: calling someone by name is <b>a sign of love</b>, the way the angels call to each other. Hashem calls each of us with love."],
[2,"6:2","אֵין צַו אֶלָּא לְשׁוֹן זֵרוּז מִיָּד וּלְדוֹרוֹת","Ein tzav e-lo l'shon zei-ruz mi-yad u-l'do-ros","Not|“tzav”|except|a word of|hurrying|right away|and for all generations","Why “<b>tzav</b>” (command)? Rashi: it means <b>do it with energy, right away</b>, and forever. A mitzvah should be done with zerizus, with excitement, not slowly."],
[2,"11:2","לְשׁוֹן חַיִּים לְפִי שֶׁיִּשְׂרָאֵל דְּבוּקִים בַּמָּקוֹם","L'shon cha-yim l'fi she-Yis-ro-eil d'vu-kim ba-Mo-kom","A word of|life|because|Israel|are attached|to Hashem","The pasuk calls kosher animals “<span lang='he'>חַיָּה</span>.” Rashi: it's a word of <b>life</b>, because the Jewish people are <b>attached to Hashem</b>, the source of life. Eating kosher keeps that connection healthy."],
[2,"13:46","הוֹאִיל וְהוּא הִבְדִּיל בְּלָשׁוֹן הָרָע בֵּין אִישׁ לְאִשְׁתּוֹ וּבֵין אִישׁ לְרֵעֵהוּ אַף הוּא יִבָּדֵל","Ho-il v'hu hiv-dil b'lo-shon ho-ra bein ish l'ish-to u-vein ish l'rei-ei-hu af hu yi-bo-deil","Since|he|separated|with talk|bad|between|a man|and his wife|and between|a man|and his friend|also|he|will be separated","Why did the person with tzaraas have to sit <b>alone</b>? Rashi: with lashon hara he <b>separated people</b> from each other, so now he is separated, to feel what that's like and to fix it."],
[2,"14:4","לְפִי שֶׁהַנְּגָעִים בָּאִין עַל לָשׁוֹן הָרָע שֶׁהוּא מַעֲשֵׂה פִטְפּוּטֵי דְבָרִים","L'fi she-ha-n'go-im bo-in al lo-shon ho-ra she-hu ma-a-sei fit-pu-tei d'vo-rim","Because|the tzaraas|comes|for|talk|bad|which is|an act of|chattering|words","To become pure, the person brought two <b>birds</b>. Why birds? Rashi: tzaraas came from <b>chattering</b> lashon hara, and birds chirp and chatter all day. A reminder to think before we talk!"],
[2,"16:1","אַל תֹּאכַל צוֹנֵן וְאַל תִּשְׁכַּב בְּטַחַב","Al to-chal tzo-nein v'al tish-kav b'ta-chav","Don't|eat|cold food|and don't|lie down|in a damp place","Why does the Yom Kippur parsha start “<b>after the death</b> of Aharon's sons”? Rashi tells a mashal: one doctor tells a sick person “don't eat cold food and don't lie in a damp place.” A second doctor says the same, but adds “so you don't die like so-and-so.” The second warning works better. Hashem gave Aharon the rules with a real example so he would be careful."],
[2,"19:18","אָמַר רַבִּי עֲקִיבָא זֶה כְּלָל גָּדוֹל בַּתּוֹרָה","O-mar Ra-bi A-ki-voh zeh k'lol go-dol ba-To-roh","Said|Rabbi|Akiva|this is|a rule|great|in the Torah","On “<b>Love your friend like yourself</b>,” Rashi brings Rabbi Akiva's words: <b>this is a great rule of the Torah</b>. So much of the Torah is about loving and caring for each other."],
[2,"21:1","לְהַזְהִיר גְּדוֹלִים עַל הַקְּטַנִּים","L'haz-hir g'do-lim al ha-k'ta-nim","To warn|the grown-ups|about|the little ones","Why does the pasuk say “<b>say</b>” twice? Rashi: to teach <b>the grown-ups to guide the children</b>. Big people are responsible for teaching little people the right way."],
[2,"25:1","מָה עִנְיַן שְׁמִטָּה אֵצֶל הַר סִינַי","Mah in-yan sh'mi-toh ei-tzel Har Si-nai","What|does … have to do with|Shemitah|next to|Mount|Sinai","This is one of Rashi's most famous questions: <b>what does Shemitah have to do with Har Sinai?</b> All the mitzvos came from Sinai! His answer: just as Shemitah was taught in full detail at Sinai, <b>every</b> mitzvah was taught with all its details at Sinai."],
[2,"26:3","שֶׁתִּהְיוּ עֲמֵלִים בַּתּוֹרָה","She-tih-yu a-mei-lim ba-To-roh","That you will be|working hard|in the Torah","“If you <b>walk</b> in My laws.” What does walking mean here? Rashi: <b>that you work hard learning Torah</b>. Not just reading it, but really thinking, asking and reviewing."],
[3,"1:1","מִתּוֹךְ חִבָּתָן לְפָנָיו מוֹנֶה אוֹתָם כָּל שָׁעָה","Mi-toch chi-bo-son l'fo-nov mo-neh o-som kol sho-oh","Because of|their dearness|before Him|He counts|them|every|time","Why does Hashem count the Jews again and again? Rashi: <b>because they are so dear to Him</b>, He counts them all the time, the way you count something you treasure."],
[3,"6:23","בְּכַוָּנָה וּבְלֵב שָׁלֵם","B'cha-vo-noh u-v'leiv sho-leim","With concentration|and with a heart|whole","How should the kohanim bless the people? Rashi: not in a rush, but <b>with kavanah and a whole heart</b>. A blessing should come from deep inside."],
[3,"8:2","עַד שֶׁתְּהֵא שַׁלְהֶבֶת עוֹלָה מֵאֵלֶיהָ","Ad she-t'hei shal-he-ves o-loh mei-ei-le-ho","Until|will be|the flame|going up|by itself","Why does the Torah say “<b>when you raise up</b>” the lamps? Rashi: hold the fire to the wick <b>until the flame rises by itself</b>. That's how to teach: help others until their own light shines."],
[3,"13:2","לְדַעְתְּךָ אֲנִי אֵינִי מְצַוֶּה לְךָ","L'da-t'cho a-ni ei-ni m'tza-veh l'cho","By your choice|I|am not|commanding|you","“<b>Send for yourself</b> men.” Rashi: Hashem said: “<b>I am not commanding you.</b> Send them if you want to.” The Jews wanted spies, and Hashem let them choose, even though it didn't turn out well."],
[3,"16:1","לָקַח אֶת עַצְמוֹ לְצַד אֶחָד","Lo-kach es atz-mo l'tzad e-chod","He took|(the)|himself|to a side|one","“<b>And Korach took</b>.” Took what? Rashi: he <b>took himself to one side</b>, separating from everyone to start a fight. Machlokes begins when someone pulls away from the group."],
[3,"20:12","מַה סֶּלַע זֶה שֶׁאֵינוֹ מְדַבֵּר וְאֵינוֹ שׁוֹמֵעַ וְאֵינוֹ צָרִיךְ לְפַרְנָסָה מְקַיֵּם דִּבּוּרוֹ שֶׁל מָקוֹם קַל וָחֹמֶר אָנוּ","Mah se-la zeh she-ei-no m'da-beir v'ei-no sho-mei-a v'ei-no tzo-rich l'far-no-soh m'ka-yeim di-bu-ro shel Mo-kom kal vo-cho-mer o-nu","If|a rock|this|that doesn't|speak|and doesn't|hear|and doesn't|need|food|keeps|the word|of|Hashem|how much|more so|we","If Moshe had <b>spoken</b> to the rock, everyone would have said: “<b>This rock</b>, which doesn't talk, hear or need food, does what Hashem says. <b>How much more should we!</b>”"],
[3,"24:5","עַל שֶׁרָאָה פִּתְחֵיהֶם שֶׁאֵינָן מְכֻוָּנִין זֶה מוּל זֶה","Al she-ro-oh pis-chei-hem she-ei-non m'chu-vo-nin zeh mul zeh","Because|he saw|their doors|that were not|lined up|this|facing|this","Why did Bilaam say “<b>how good are your tents</b>”? Rashi: because he saw that their <b>tent doors didn't face each other</b>. Nobody could peek into their neighbor's home."],
[3,"27:7","מַגִּיד שֶׁרָאֲתָה עֵינָן מַה שֶּׁלֹּא רָאֲתָה עֵינוֹ שֶׁל מֹשֶׁה","Ma-gid she-ro-a-soh ei-non mah she-lo ro-a-soh ei-no shel Mo-sheh","It tells us|that saw|their eye|what|that not|saw|the eye|of|Moshe","Hashem said “<b>the daughters of Tzelofchad are right</b>.” Rashi: this shows their eyes <b>saw something even Moshe didn't see</b>. Their love for Eretz Yisroel gave them special understanding."],
[3,"30:3","לֹא יַעֲשֶׂה דְבָרָיו חֻלִּין","Lo ya-a-seh d'vo-rov chu-lin","Not|shall he make|his words|ordinary","“<b>He shall not break his word</b>.” Rashi: he must not make his words <b>chulin</b>, cheap and unimportant. A Jew's words are holy, so keep your promises!"],
[3,"33:1","כָּאן יָשַׁנְנוּ כָּאן הוּקַרְנוּ כָּאן חָשַׁשְׁתָּ אֶת רֹאשְׁךָ","Kon yo-shan-nu kon hu-kar-nu kon cho-shash-to es rosh-cho","Here|we slept|here|we were cold|here|you hurt|(the)|your head","Why list all 42 stops? Rashi tells a mashal: a king took his sick son on a long trip to be healed. On the way home, the king pointed: “<b>Here we slept, here we were cold, here your head hurt.</b>” Hashem remembers every step of our journey, with love."],
[4,"1:1","סָתַם אֶת הַדְּבָרִים וְהִזְכִּירָן בְּרֶמֶז מִפְּנֵי כְבוֹדָן שֶׁל יִשְׂרָאֵל","So-sam es ha-d'vo-rim v'hiz-ki-ron b're-mez mi-p'nei ch'vo-don shel Yis-ro-eil","He kept unclear|(the)|the things|and mentioned them|with a hint|because of|the honor|of|Israel","Moshe had to remind the Jews of their mistakes. Rashi: he <b>only hinted</b> at them by naming places, <b>to protect the honor of the Jewish people</b>. Correct others gently!"],
[4,"3:23","אֵין חִנּוּן בְּכָל מָקוֹם אֶלָּא לְשׁוֹן מַתְּנַת חִנָּם","Ein chi-nun b'chol mo-kom e-lo l'shon ma-t'nas chi-nom","Not|“chinun”|in every|place|except|a word of|a gift|free","Moshe “<b>pleaded</b>,” <span lang='he'>וָאֶתְחַנַּן</span>. Rashi: this word always means asking for a <b>free gift</b>. Even Moshe, with all his good deeds, didn't ask Hashem for what he “earned,” only for a gift."],
[4,"7:12","אִם הַמִּצְוֹת הַקַּלּוֹת שֶׁאָדָם דָּשׁ בַּעֲקֵבָיו תִּשְׁמְעוּן","Im ha-mitz-vos ha-ka-los she-o-dom dosh ba-a-kei-vov tish-m'un","If|the mitzvos|the light ones|that a person|steps on|with his heels|you will listen to","“<span lang='he'>עֵקֶב</span> you will listen.” Rashi: if you keep even the <b>“small” mitzvos that people step on with their heels</b>, Hashem will bless you. No mitzvah is too small!"],
[4,"11:27","עַל מְנָת אֲשֶׁר תִּשְׁמְעוּ","Al m'nas a-sher tish-m'u","On|condition|that|you will listen","Hashem puts before us “<b>the blessing</b>.” Rashi: the blessing comes <b>if you listen</b> to the mitzvos. We choose, and our choice brings the blessing."],
[4,"16:20","הֵלֵךְ אַחַר בֵּית דִּין יָפֶה","Hei-leich a-char beis din yo-feh","Go|after|a house of|judgment|good","“Justice, justice you shall <b>chase</b>.” Rashi: <b>go and find a good beis din</b>, judges who are wise and fair. Sometimes you have to work hard to find what's right."],
[4,"22:8","שֶׁמִּצְוָה גּוֹרֶרֶת מִצְוָה","She-mitz-voh go-re-res mitz-voh","Because a mitzvah|pulls along|a mitzvah","Why does the mitzvah of a roof railing come right after sending away the mother bird? Rashi: if you do the bird mitzvah, you'll merit to build a <b>new house</b> and do the railing mitzvah, <b>because one mitzvah pulls along another</b>!"],
[4,"26:16","בְּכָל יוֹם יִהְיוּ בְעֵינֶיךָ כַּחֲדָשִׁים","B'chol yom yih-yu v'ei-ne-cho ka-cha-do-shim","Every|day|they should be|in your eyes|like new","“<b>This day</b> Hashem commands you.” But the Torah was given long ago! Rashi: <b>every day the mitzvos should feel brand new</b>, as if you just got them today."],
[4,"29:12","הִתְחִיל מֹשֶׁה לְפַיְּסָם אַתֶּם נִצָּבִים הַיּוֹם","His-chil Mo-sheh l'fa-y'som a-tem ni-tzo-vim ha-yom","Began|Moshe|to comfort them|you|are standing|today","The Jews heard the scary warnings in the last parsha and got pale. Rashi: <b>Moshe began to comfort them</b>: “<b>You are all still standing here today!</b>” Hashem never gives up on us."],
[4,"31:12","הַטַּף לָמָּה בָאִין כְּדֵי לִתֵּן שָׂכָר לִמְבִיאֵיהֶם","Ha-taf lo-moh vo-in k'dei li-tein so-char lim-vi-ei-hem","The little ones|why|do they come|in order|to give|reward|to those who bring them","At Hakhel, the babies were too young to understand. <b>So why bring them?</b> Rashi: <b>to give reward to the parents who bring them</b>. Bringing kids to holy places is a mitzvah, even before they understand!"],
[4,"32:11","מוּטָב יִכָּנֵס הַחֵץ בִּי וְלֹא בְּבָנַי","Mu-tov yi-ko-neis ha-cheitz bi v'lo b'vo-nai","Better|it should enter|the arrow|into me|and not|into my children","Why is Hashem compared to an <b>eagle</b>? Rashi: other birds carry their young in their feet, but the eagle carries them on its wings and says: “<b>Better the arrow hit me and not my children.</b>”"],
[4,"34:12","שֶׁנְּשָׂאוֹ לִבּוֹ לִשְׁבֹּר הַלּוּחוֹת לְעֵינֵיהֶם","She-n'so-o li-bo lish-bor ha-lu-chos l'ei-nei-hem","That lifted him|his heart|to break|the Luchos|before their eyes","The last words of the Torah, “<b>before the eyes of all Israel</b>.” Rashi: this hints to when Moshe <b>broke the Luchos in front of everyone</b>, and Hashem agreed with him. The Torah ends by praising Moshe's courage."]
];

// Every Shabbos 2025–2032 (outside Israel): date, parsha number(s) or holiday, Hebrew day, Hebrew month
const PCAL="250104,10,4,Teves;250111,11,11,Teves;250118,12,18,Teves;250125,13,25,Teves;250201,14,3,Shevat;250208,15,10,Shevat;250215,16,17,Shevat;250222,17,24,Shevat;250301,18,1,Adar;250308,19,8,Adar;250315,20,15,Adar;250322,21,22,Adar;250329,22,29,Adar;250405,23,7,Nissan;250412,24,14,Nissan;250419,Pesach,21,Nissan;250426,25,28,Nissan;250503,26+27,5,Iyar;250510,28+29,12,Iyar;250517,30,19,Iyar;250524,31+32,26,Iyar;250531,33,4,Sivan;250607,34,11,Sivan;250614,35,18,Sivan;250621,36,25,Sivan;250628,37,2,Tammuz;250705,38,9,Tammuz;250712,39,16,Tammuz;250719,40,23,Tammuz;250726,41+42,1,Av;250802,43,8,Av;250809,44,15,Av;250816,45,22,Av;250823,46,29,Av;250830,47,6,Elul;250906,48,13,Elul;250913,49,20,Elul;250920,50,27,Elul;250927,51,5,Tishrei;251004,52,12,Tishrei;251011,Succos,19,Tishrei;251018,0,26,Tishrei;251025,1,3,Cheshvan;251101,2,10,Cheshvan;251108,3,17,Cheshvan;251115,4,24,Cheshvan;251122,5,2,Kislev;251129,6,9,Kislev;251206,7,16,Kislev;251213,8,23,Kislev;251220,9,30,Kislev;251227,10,7,Teves;260103,11,14,Teves;260110,12,21,Teves;260117,13,28,Teves;260124,14,6,Shevat;260131,15,13,Shevat;260207,16,20,Shevat;260214,17,27,Shevat;260221,18,4,Adar;260228,19,11,Adar;260307,20,18,Adar;260314,21+22,25,Adar;260321,23,3,Nissan;260328,24,10,Nissan;260404,Pesach,17,Nissan;260411,25,24,Nissan;260418,26+27,1,Iyar;260425,28+29,8,Iyar;260502,30,15,Iyar;260509,31+32,22,Iyar;260516,33,29,Iyar;260523,Shavuos,7,Sivan;260530,34,14,Sivan;260606,35,21,Sivan;260613,36,28,Sivan;260620,37,5,Tammuz;260627,38+39,12,Tammuz;260704,40,19,Tammuz;260711,41+42,26,Tammuz;260718,43,4,Av;260725,44,11,Av;260801,45,18,Av;260808,46,25,Av;260815,47,2,Elul;260822,48,9,Elul;260829,49,16,Elul;260905,50+51,23,Elul;260912,Rosh Hashana,1,Tishrei;260919,52,8,Tishrei;260926,Succos,15,Tishrei;261003,Shmini Atzeres,22,Tishrei;261010,0,29,Tishrei;261017,1,6,Cheshvan;261024,2,13,Cheshvan;261031,3,20,Cheshvan;261107,4,27,Cheshvan;261114,5,4,Kislev;261121,6,11,Kislev;261128,7,18,Kislev;261205,8,25,Kislev;261212,9,2,Teves;261219,10,9,Teves;261226,11,16,Teves;270102,12,23,Teves;270109,13,1,Shevat;270116,14,8,Shevat;270123,15,15,Shevat;270130,16,22,Shevat;270206,17,29,Shevat;270213,18,6,Adar 1;270220,19,13,Adar 1;270227,20,20,Adar 1;270306,21,27,Adar 1;270313,22,4,Adar 2;270320,23,11,Adar 2;270327,24,18,Adar 2;270403,25,25,Adar 2;270410,26,3,Nissan;270417,27,10,Nissan;270424,Pesach,17,Nissan;270501,28,24,Nissan;270508,29,1,Iyar;270515,30,8,Iyar;270522,31,15,Iyar;270529,32,22,Iyar;270605,33,29,Iyar;270612,Shavuos,7,Sivan;270619,34,14,Sivan;270626,35,21,Sivan;270703,36,28,Sivan;270710,37,5,Tammuz;270717,38+39,12,Tammuz;270724,40,19,Tammuz;270731,41+42,26,Tammuz;270807,43,4,Av;270814,44,11,Av;270821,45,18,Av;270828,46,25,Av;270904,47,2,Elul;270911,48,9,Elul;270918,49,16,Elul;270925,50+51,23,Elul;271002,Rosh Hashana,1,Tishrei;271009,52,8,Tishrei;271016,Succos,15,Tishrei;271023,Shmini Atzeres,22,Tishrei;271030,0,29,Tishrei;271106,1,6,Cheshvan;271113,2,13,Cheshvan;271120,3,20,Cheshvan;271127,4,27,Cheshvan;271204,5,4,Kislev;271211,6,11,Kislev;271218,7,18,Kislev;271225,8,25,Kislev;280101,9,2,Teves;280108,10,9,Teves;280115,11,16,Teves;280122,12,23,Teves;280129,13,1,Shevat;280205,14,8,Shevat;280212,15,15,Shevat;280219,16,22,Shevat;280226,17,29,Shevat;280304,18,6,Adar;280311,19,13,Adar;280318,20,20,Adar;280325,21+22,27,Adar;280401,23,5,Nissan;280408,24,12,Nissan;280415,Pesach,19,Nissan;280422,25,26,Nissan;280429,26+27,3,Iyar;280506,28+29,10,Iyar;280513,30,17,Iyar;280520,31+32,24,Iyar;280527,33,2,Sivan;280603,34,9,Sivan;280610,35,16,Sivan;280617,36,23,Sivan;280624,37,30,Sivan;280701,38,7,Tammuz;280708,39,14,Tammuz;280715,40,21,Tammuz;280722,41+42,28,Tammuz;280729,43,6,Av;280805,44,13,Av;280812,45,20,Av;280819,46,27,Av;280826,47,4,Elul;280902,48,11,Elul;280909,49,18,Elul;280916,50+51,25,Elul;280923,52,3,Tishrei;280930,Yom Kippur,10,Tishrei;281007,Succos,17,Tishrei;281014,0,24,Tishrei;281021,1,1,Cheshvan;281028,2,8,Cheshvan;281104,3,15,Cheshvan;281111,4,22,Cheshvan;281118,5,29,Cheshvan;281125,6,7,Kislev;281202,7,14,Kislev;281209,8,21,Kislev;281216,9,28,Kislev;281223,10,5,Teves;281230,11,12,Teves;290106,12,19,Teves;290113,13,26,Teves;290120,14,4,Shevat;290127,15,11,Shevat;290203,16,18,Shevat;290210,17,25,Shevat;290217,18,2,Adar;290224,19,9,Adar;290303,20,16,Adar;290310,21+22,23,Adar;290317,23,1,Nissan;290324,24,8,Nissan;290331,Pesach,15,Nissan;290407,Pesach,22,Nissan;290414,25,29,Nissan;290421,26+27,6,Iyar;290428,28+29,13,Iyar;290505,30,20,Iyar;290512,31+32,27,Iyar;290519,33,5,Sivan;290526,34,12,Sivan;290602,35,19,Sivan;290609,36,26,Sivan;290616,37,3,Tammuz;290623,38,10,Tammuz;290630,39,17,Tammuz;290707,40,24,Tammuz;290714,41+42,2,Av;290721,43,9,Av;290728,44,16,Av;290804,45,23,Av;290811,46,30,Av;290818,47,7,Elul;290825,48,14,Elul;290901,49,21,Elul;290908,50,28,Elul;290915,51,6,Tishrei;290922,52,13,Tishrei;290929,Succos,20,Tishrei;291006,0,27,Tishrei;291013,1,4,Cheshvan;291020,2,11,Cheshvan;291027,3,18,Cheshvan;291103,4,25,Cheshvan;291110,5,3,Kislev;291117,6,10,Kislev;291124,7,17,Kislev;291201,8,24,Kislev;291208,9,2,Teves;291215,10,9,Teves;291222,11,16,Teves;291229,12,23,Teves;300105,13,1,Shevat;300112,14,8,Shevat;300119,15,15,Shevat;300126,16,22,Shevat;300202,17,29,Shevat;300209,18,6,Adar 1;300216,19,13,Adar 1;300223,20,20,Adar 1;300302,21,27,Adar 1;300309,22,4,Adar 2;300316,23,11,Adar 2;300323,24,18,Adar 2;300330,25,25,Adar 2;300406,26,3,Nissan;300413,27,10,Nissan;300420,Pesach,17,Nissan;300427,28,24,Nissan;300504,29,1,Iyar;300511,30,8,Iyar;300518,31,15,Iyar;300525,32,22,Iyar;300601,33,29,Iyar;300608,Shavuos,7,Sivan;300615,34,14,Sivan;300622,35,21,Sivan;300629,36,28,Sivan;300706,37,5,Tammuz;300713,38+39,12,Tammuz;300720,40,19,Tammuz;300727,41+42,26,Tammuz;300803,43,4,Av;300810,44,11,Av;300817,45,18,Av;300824,46,25,Av;300831,47,2,Elul;300907,48,9,Elul;300914,49,16,Elul;300921,50+51,23,Elul;300928,Rosh Hashana,1,Tishrei;301005,52,8,Tishrei;301012,Succos,15,Tishrei;301019,Shmini Atzeres,22,Tishrei;301026,0,29,Tishrei;301102,1,6,Cheshvan;301109,2,13,Cheshvan;301116,3,20,Cheshvan;301123,4,27,Cheshvan;301130,5,4,Kislev;301207,6,11,Kislev;301214,7,18,Kislev;301221,8,25,Kislev;301228,9,2,Teves;310104,10,9,Teves;310111,11,16,Teves;310118,12,23,Teves;310125,13,1,Shevat;310201,14,8,Shevat;310208,15,15,Shevat;310215,16,22,Shevat;310222,17,29,Shevat;310301,18,6,Adar;310308,19,13,Adar;310315,20,20,Adar;310322,21+22,27,Adar;310329,23,5,Nissan;310405,24,12,Nissan;310412,Pesach,19,Nissan;310419,25,26,Nissan;310426,26+27,3,Iyar;310503,28+29,10,Iyar;310510,30,17,Iyar;310517,31+32,24,Iyar;310524,33,2,Sivan;310531,34,9,Sivan;310607,35,16,Sivan;310614,36,23,Sivan;310621,37,30,Sivan;310628,38,7,Tammuz;310705,39,14,Tammuz;310712,40,21,Tammuz;310719,41+42,28,Tammuz;310726,43,6,Av;310802,44,13,Av;310809,45,20,Av;310816,46,27,Av;310823,47,4,Elul;310830,48,11,Elul;310906,49,18,Elul;310913,50+51,25,Elul;310920,52,3,Tishrei;310927,Yom Kippur,10,Tishrei;311004,Succos,17,Tishrei;311011,0,24,Tishrei;311018,1,1,Cheshvan;311025,2,8,Cheshvan;311101,3,15,Cheshvan;311108,4,22,Cheshvan;311115,5,29,Cheshvan;311122,6,7,Kislev;311129,7,14,Kislev;311206,8,21,Kislev;311213,9,28,Kislev;311220,10,5,Teves;311227,11,12,Teves;320103,12,19,Teves;320110,13,26,Teves;320117,14,4,Shevat;320124,15,11,Shevat;320131,16,18,Shevat;320207,17,25,Shevat;320214,18,2,Adar;320221,19,9,Adar;320228,20,16,Adar;320306,21+22,23,Adar;320313,23,1,Nissan;320320,24,8,Nissan;320327,Pesach,15,Nissan;320403,Pesach,22,Nissan;320410,25,29,Nissan;320417,26+27,6,Iyar;320424,28+29,13,Iyar;320501,30,20,Iyar;320508,31+32,27,Iyar;320515,33,5,Sivan;320522,34,12,Sivan;320529,35,19,Sivan;320605,36,26,Sivan;320612,37,3,Tammuz;320619,38,10,Tammuz;320626,39,17,Tammuz;320703,40,24,Tammuz;320710,41+42,2,Av;320717,43,9,Av;320724,44,16,Av;320731,45,23,Av;320807,46,30,Av;320814,47,7,Elul;320821,48,14,Elul;320828,49,21,Elul;320904,50,28,Elul;320911,51,6,Tishrei;320918,52,13,Tishrei;320925,Succos,20,Tishrei;321002,0,27,Tishrei;321009,1,4,Cheshvan;321016,2,11,Cheshvan;321023,3,18,Cheshvan;321030,4,25,Cheshvan;321106,5,3,Kislev;321113,6,10,Kislev;321120,7,17,Kislev;321127,8,24,Kislev;321204,9,2,Teves;321211,10,9,Teves;321218,11,16,Teves;321225,12,23,Teves".split(";").map(r=>{ const [d,p,hd,hm]=r.split(","); const n=/^\d/.test(p); return {d, ps:n?p.split("+").map(Number):null, hol:n?null:p, hd, hm} });
const BOOKS=[["Bereishis","Bereshit","בְּרֵאשִׁית",0],["Shemos","Shemot","שְׁמוֹת",12],["Vayikra","Vayikra","וַיִּקְרָא",23],["Bamidbar","Bamidbar","בְּמִדְבַּר",33],["Devarim","Devarim","דְּבָרִים",43]];
VIEWS.push("parsha"); S.parsha=S.parsha||{}; S.parsha.read=S.parsha.read||{}; S.parsha.quiz=S.parsha.quiz||{};
const pnm=i=>PARSHIOS[i][sefA()?1:0], pnms=ps=>ps.map(pnm).join("–"), phe=ps=>ps.map(i=>PARSHIOS[i][2]).join("־");
const bookOf=i=>{ let b=BOOKS[0]; BOOKS.forEach(x=>{ if(i>=x[3]) b=x }); return b };
const ymd=dt=>String(dt.getFullYear()%100).padStart(2,"0")+String(dt.getMonth()+1).padStart(2,"0")+String(dt.getDate()).padStart(2,"0");
const pdate=d=>new Date(2000+ +d.slice(0,2),+d.slice(2,4)-1,+d.slice(4,6));
const pdateStr=d=>pdate(d).toLocaleDateString("en-US",{month:"long",day:"numeric"});
const pholName=h=>sefA()?h.replace("Succos","Sukkot").replace("Shavuos","Shavuot").replace("Shmini Atzeres","Shemini Atzeret").replace("Rosh Hashana","Rosh Hashanah"):h.replace("Succos","Sukkos").replace("Rosh Hashana","Rosh Hashanah");
const pword=()=>sefA()?"Parashat":"Parshas";
const kwSay=w=>{ if(!sefA()) return w[1]; try{ return (typeof toSef==="function"&&toSef(w[0],w[1]))||swapT(w[1]) }catch(e){ return w[1] } };
const pskSay=x=>{ const he=x[2].split(" "), ash=x[3].split(" "); if(!sefA()) return ash;
  try{ const t=typeof toSef==="function"&&toSef(x[2],x[3]); if(t&&t.split(" ").length===he.length) return t.split(" ") }catch(e){} return ash.map(w=>{ try{ return swapT(w) }catch(e){ return w } }) };
const spk=he=>he.replace(/ה׳/g,"הַשֵּׁם");
const kwT=t=>{ if(!sefA()) return t; try{ return typeof sefNames==="function"?sefNames(swapT(t)):swapT(t) }catch(e){ return t } };
const isRead=ps=>ps.every(p=>S.parsha.read[p]);
function shabbosFrom(dt){ const k=ymd(dt); return PCAL.findIndex(x=>x.d>=k) }
function nextRegular(i){ let j=i; while(j<PCAL.length&&!PCAL[j].ps) j++; return j<PCAL.length?j:-1 }
function thisWeek(){ const i=shabbosFrom(new Date()); return i<0?null:i }
let PA=null;

/* ----- The yad: follows each word when the pasuk or Rashi is read aloud ----- */
const YADSVG=(()=>{ const a=document.querySelector("#yad .yadart"); return a?a.outerHTML:"" })();
let paYadN=0, PY=null;
function paYad(box){ let y=box.querySelector(".payad"); if(y) return y; const n=++paYadN;
  box.insertAdjacentHTML("beforeend",`<div class="yad payad" hidden aria-hidden="true">${YADSVG.replace(/\b(ySil|yGld|yGem)\b/g,"$1p"+n)}</div>`); return box.querySelector(".payad") }
function paMoveYad(st,w){ const y=st.yad, r=w.getBoundingClientRect(), c=st.box.getBoundingClientRect();
  const x=r.left-c.left+r.width/2, top=r.top-c.top+6, T=(px,py)=>`translate(${px}px,${py}px)`;
  if(r.top<130||r.bottom>innerHeight-20) w.scrollIntoView({block:"center",behavior:"smooth"});
  const fresh=y.hidden||!st.at; y.hidden=false;
  // Start from where the yad is on screen right now, even in the middle of a glide, so it never snaps back
  let from=fresh?{x:x+80,y:top-110}:st.at, moving=false;
  try{ const an=y.getAnimations(); if(!fresh&&an.length&&an.some(a=>a.playState==="running")){ const m=new DOMMatrixReadOnly(getComputedStyle(y).transform); from={x:m.m41,y:m.m42}; moving=true } an.forEach(a=>a.cancel()) }catch(e){}
  if(Math.abs(from.x-x)<1&&Math.abs(from.y-top)<1&&!fresh){ y.style.transform=`translate(${x}px,${top}px)`; st.at={x,y:top}; return }
  const hop=!fresh&&Math.abs(from.y-top)>20;
  const mid={x:(from.x+x)/2,y:Math.min(from.y,top)-(fresh?20:hop?(moving?28:46):(moving?6:16))}, dur=fresh?560:hop?460:(moving?240:300);
  y.style.transform=T(x,top);
  if(y.animate) y.animate([{transform:T(from.x,from.y),opacity:fresh?0:1},{transform:T(mid.x,mid.y),opacity:1,offset:.55},{transform:T(x,top),opacity:1}],{duration:dur,easing:"cubic-bezier(.3,.7,.35,1)"});
  st.at={x,y:top};
  clearTimeout(y._tap); y._tap=setTimeout(()=>{ if(y.hidden||st.stop) return; const a=y.querySelector(".yadart"); if(!a) return; a.classList.remove("tap"); void a.getBoundingClientRect(); a.classList.add("tap");
    if(typeof yadSpark==="function") yadSpark(st.box,x,top) },Math.round(dur*.8)) }
function paStop(){ const st=PY; if(!st) return; PY=null; st.stop=true; st.timers.forEach(clearTimeout); try{ speechSynthesis.cancel() }catch(e){}
  st.box.querySelectorAll(".wc.on").forEach(x=>x.classList.remove("on")); st.yad.hidden=true; st.btn.textContent=st.label }
function paFollow(box,he,btn,label){
  if(PY&&PY.box===box){ sfx.tick(); paStop(); return }
  paStop(); stopPlay();
  if(!voiceOn()){ toast("Turn on Shlomo's voice in ⚙️ to hear it"); return }
  if(typeof voiceUnlock==="function") voiceUnlock();
  sfx.tick();
  const ws=[...box.querySelectorAll(".il .wc")], hw=he.split(" ");
  const words=hw.map(w=>speakText(w)+(/,\s*$/.test(w)?",":""));
  const starts=[]; let pos=0; words.forEach(w=>{ starts.push(pos); pos+=w.length+1 });
  const rate=[.78,.9,1][S.pace]||.9;
  const st={box,btn,label,yad:paYad(box),timers:[],stop:false,at:null}; PY=st; btn.textContent="■ Stop";
  let cur=-1, heard=false, done=false;
  const light=k=>{ if(st.stop||k<=cur||k>=ws.length) return; cur=k; box.querySelectorAll(".wc.on").forEach(x=>x.classList.remove("on")); ws[k].classList.add("on"); paMoveYad(st,ws[k]) };
  const finish=()=>{ if(done||st.stop) return; done=true; st.timers.forEach(clearTimeout);
    setTimeout(()=>{ if(PY===st) paStop() },650) };
  // Backup timing if the voice doesn't report word positions: about 4 syllables a second, plus a breath at commas
  // It starts when the voice actually starts talking (phones often wait a moment), so the yad never runs ahead.
  let t=0; const plan=[]; ws.forEach((w,k)=>{ plan.push([k,t]); const s=w.querySelector(".s");
    const syl=s&&s.textContent.trim()?s.textContent.trim().split(/[-·\s]+/).length:2; t+=(syl*235+70)/rate+(/,\s*$/.test(hw[k]||"")?220:0) });
  let backup=false; const runBackup=()=>{ if(heard||backup||done||st.stop) return; backup=true; plan.forEach(([k,d])=>{ if(k>0) st.timers.push(setTimeout(()=>{ if(!heard) light(k) },d)) }) };
  try{ const u=new SpeechSynthesisUtterance(words.join(" ")); u.voice=HEV; u.lang=HEV.lang; u.rate=rate;
    u.onstart=()=>{ st.timers.push(setTimeout(runBackup,450)) }; st.timers.push(setTimeout(runBackup,2500));
    u.onboundary=e=>{ if(e.name&&e.name!=="word") return; let k=0; while(k+1<starts.length&&starts[k+1]<=e.charIndex) k++;
      if(!heard){ heard=true; if(k<cur) cur=k-1 } light(k) };
    u.onend=()=>{ light(ws.length-1); finish() }; u.onerror=()=>finish();
    KEEP.push(u); speechSynthesis.cancel(); speechSynthesis.speak(u); light(0) }catch(e){ finish() }
  st.timers.push(setTimeout(finish,t*1.8+4000)) }
const _paSP=stopPlay; stopPlay=function(){ paStop(); _paSP() };

/* ----- Home card ----- */
$("openBM").insertAdjacentHTML("beforebegin",`<button class="blitzcard pacard" id="openPa" type="button"><span class="em" id="paHomeE" aria-hidden="true">📖</span>
  <span><b id="paHomeT">The Weekly Parsha</b><span id="paHomeS">This Shabbos's Torah portion: the story, key Hebrew words and a deeper meaning.</span></span><span class="bzs" id="paHomeR"></span></button>`);
$("openPa").onclick=()=>{ sfx.pop(); openParsha() };
function paintPaHome(){ const el=$("paHomeT"); if(!el) return; const i=thisWeek(); if(i===null) return;
  const w=PCAL[i], j=nextRegular(i);
  el.textContent=w.hol?`This Shabbos: ${pholName(w.hol)}`:`This week: ${pword()} ${pnms(w.ps)}`;
  $("paHomeS").textContent=w.hol?(j>=0?`A special holiday reading. Next up: ${pnms(PCAL[j].ps)}`:"A special holiday reading."):`This Shabbos's Torah portion: the story, key Hebrew words and a deeper meaning.`;
  $("paHomeE").textContent=w.hol?"🎉":PARSHIOS[w.ps[0]][3];
  $("paHomeR").textContent=w.ps&&isRead(w.ps)?"✓ Learned this week":"" }

/* ----- Screen ----- */
$("party").insertAdjacentHTML("beforebegin",`<div class="wrap" id="parsha" hidden>
  <div class="phead"><div class="he" lang="he">פָּרָשַׁת הַשָּׁבוּעַ</div><h2 id="paH">This Week's Parsha</h2><p class="when" id="paWhen"></p></div>
  <div id="paMain" style="display:flex;flex-direction:column;gap:16px"></div>
  <div class="buddy"><span class="ywrap" id="paY"></span><div class="bubble" id="paBubble" aria-live="polite"></div></div>
  <div class="bmact" id="paAct"></div>
  <div id="paKW" style="display:flex;flex-direction:column;gap:14px"></div>
  <section class="bmcount" id="paBM" hidden></section>
  <section class="group" id="paNextS"><h2>Coming up</h2><div class="plist" id="paNext"></div></section>
  <details class="guide" id="paAll"><summary>📚 All 54 parshiyos</summary><div id="paList" style="display:flex;flex-direction:column;gap:14px;padding-bottom:14px"></div></details>
  <footer>Weekly schedule for outside Israel. Stories and ideas are explained simply, based on Rashi, the Midrash and Chassidus. Ask your rabbi to learn more!</footer>
</div>`);
function openParsha(ps,d){ stopPlay(); window._fromBM=false; if(typeof bzStopTimer==="function"&&!$("blitz").hidden){ bzStopTimer(); BZ=null }
  showOnly("parsha");
  if(ps) PA={ps,d:d||null,step:0}; else { const i=thisWeek(); PA=i===null?{ps:[0],d:null,step:0}:{wi:i,step:0} }
  renderParsha(); paintNav() }
function renderParsha(){ paStop();
  $("paY").innerHTML=yossi();
  let ps=PA.ps, d=PA.d, hol=null; const isWeek=PA.wi!=null;
  if(isWeek){ const w=PCAL[PA.wi]; if(w.ps){ ps=w.ps; d=w.d } else { hol=w; const j=nextRegular(PA.wi); ps=j>=0?PCAL[j].ps:[0]; d=j>=0?PCAL[j].d:null } }
  PA.cur=ps;
  const w=d&&PCAL.find(x=>x.d===d), b=bookOf(ps[0]), sef=sefA();
  $("paH").textContent=isWeek?"This Week's Parsha":"Parsha Explorer";
  $("paWhen").innerHTML=hol?`This Shabbos, ${pdateStr(hol.d)}, is <b>${esc(pholName(hol.hol))}</b>, so we read a special holiday portion. Here's the next weekly one, on ${pdateStr(d)}:`
    : w?`Read on Shabbos, <b>${pdateStr(d)}</b> · ${w.hd} ${esc(w.hm)}` : `From Sefer ${esc(b[sef?1:0])}`;
  const steps=ps.flatMap(i=>PARSHIOS[i][5]);
  $("paMain").innerHTML=`<div class="pabig">
      <span class="badge">Sefer ${esc(b[sef?1:0])} · ${ps.map(i=>"#"+(i+1)).join(" & ")} of 54</span>
      <div class="pahe" lang="he">${phe(ps)}</div>
      <h3>${esc(pword())} ${esc(pnms(ps))}</h3>
      <p>Means ${ps.map(i=>esc(PARSHIOS[i][4])).join(" & ")}</p>
      <button class="btn ghost" id="paHear" type="button">🔊 Hear the name</button></div>
    ${ps.filter(i=>PSK[i]).map(i=>{ const x=PSK[i], he=x[2].split(" "), so=pskSay(x), gl=x[4].split("|");
      return `<section class="papsk"><div class="papskh" data-noglo><b>📖 From the Torah</b><span>${esc(BOOKS[x[0]][sef?1:0])} ${x[1]}</span></div>
      <div class="il" dir="rtl">${he.map((w,n)=>`<button class="wc" type="button" data-pw="${i}:${n}"><span class="h" lang="he">${w}</span><span class="s">${esc(so[n]||"")}</span><span class="g">${esc(kwT(gl[n]))}</span></button>`).join("")}</div>
      <p class="papsken">“${esc(kwT(x[5]))}”</p>
      <button class="btn ghost" type="button" data-pall="${i}">▶ Follow the yad</button></section>` }).join("")}
    <div class="pasteps">${steps.map((s,k)=>`<div class="pastep"${k>PA.step?" hidden":""}><span class="n">${k+1}</span><span>${esc(s)}</span></div>`).join("")}</div>`;
  $("paKW").innerHTML=`${ps.filter(i=>KW[i]).map(i=>`<section class="pakw"><h3 class="pakwh">📜 Hebrew words in ${esc(pnm(i))}<small>Tap a word to hear it</small></h3>
      ${KW[i].slice(0,3).map((w,n)=>`<div class="kwc"><button class="kwhe" type="button" data-kw="${i}:${n}" aria-label="Hear ${esc(kwSay(w))}"><span class="h" lang="he">${w[0]}</span><span class="s">${esc(kwSay(w))} 🔊</span></button>
        <div class="kwt"><b>${kwT(w[2])}</b><p>${kwT(w[3])}</p></div></div>`).join("")}
      <div class="padeep"><h3>💎 Go deeper</h3><p>${kwT(KW[i][3])}</p></div>
      ${RASHI[i]?(()=>{ const x=RASHI[i], he=x[2].split(" "), so=pskSay(x), gl=x[4].split("|");
        return `<div class="parashi"><div class="papskh" data-noglo><b>📜 Rashi says</b><span>Rashi on ${esc(BOOKS[x[0]][sef?1:0])} ${x[1]}</span></div>
        <div class="il" dir="rtl">${he.map((w,n)=>`<button class="wc" type="button" data-rw="${i}:${n}"><span class="h" lang="he">${w}</span><span class="s">${esc(so[n]||"")}</span><span class="g">${esc(kwT(gl[n]))}</span></button>`).join("")}</div>
        <button class="btn ghost" type="button" data-rall="${i}">▶ Follow the yad</button>
        <div class="rashiwhy"><b>What Rashi is teaching</b><p>${kwT(x[5])}</p></div></div>` })():""}</section>`).join("")}`;
  $("paHear").onclick=()=>speakPhrase(ps.map(i=>PARSHIOS[i][2]).join(" "));
  $("paMain").querySelectorAll("[data-pw]").forEach(b=>b.onclick=()=>{ const [i,n]=b.dataset.pw.split(":").map(Number); paStop(); sfx.tick();
    $("paMain").querySelectorAll(".papsk .wc.on").forEach(x=>x.classList.remove("on")); b.classList.add("on"); speakPhrase(spk(PSK[i][2].split(" ")[n])) });
  $("paMain").querySelectorAll("[data-pall]").forEach(b=>b.onclick=()=>paFollow(b.closest(".papsk"),spk(PSK[+b.dataset.pall][2]),b,"▶ Follow the yad"));
  $("paKW").querySelectorAll("[data-rw]").forEach(b=>b.onclick=()=>{ const [i,n]=b.dataset.rw.split(":").map(Number); paStop(); sfx.tick();
    $("paKW").querySelectorAll(".parashi .wc.on").forEach(x=>x.classList.remove("on")); b.classList.add("on"); speakPhrase(spk(RASHI[i][2].split(" ")[n])) });
  $("paKW").querySelectorAll("[data-rall]").forEach(b=>b.onclick=()=>paFollow(b.closest(".parashi"),spk(RASHI[+b.dataset.rall][2]),b,"▶ Follow the yad"));
  $("paKW").querySelectorAll("[data-kw]").forEach(b=>b.onclick=()=>{ const [i,n]=b.dataset.kw.split(":").map(Number); sfx.tick(); b.classList.remove("tapd"); void b.offsetWidth; b.classList.add("tapd"); speakPhrase(KW[i][n][0]) });
  paCoach(steps);
  // Bar Mitzvah parsha
  const bm=S.bm&&S.bm.date, bx=$("paBM"); bx.hidden=!bm;
  if(bm){ const k=shabbosFrom(new Date(bm+"T12:00:00")), x=k>=0?PCAL[k]:null;
    bx.innerHTML=!x?`<b>📜 Your Bar Mitzvah Shabbos</b><small>That date is too far away for my calendar. Ask your rabbi!</small>`
      :`<b>📜 Your Bar Mitzvah Shabbos</b><span>${pdateStr(x.d)}, ${pdate(x.d).getFullYear()}</span>${x.ps?`<span class="big">${esc(pnms(x.ps))}</span><button class="btn gold" id="paBMgo" type="button">Learn my parsha →</button>`
      :`<span>That's <b>${esc(pholName(x.hol))}</b>, a holiday reading. Ask your rabbi which portion you'll read!</span>`}<small>From the date you picked in Bar Mitzvah Training. Your rabbi will confirm it.</small>`;
    if($("paBMgo")) $("paBMgo").onclick=()=>{ sfx.pop(); PA={ps:x.ps,d:x.d,step:0}; renderParsha(); toTop() } }
  // Coming up
  const t=thisWeek(); $("paNextS").hidden=t===null;
  if(t!==null){ $("paNext").innerHTML=PCAL.slice(t+1,t+5).map(x=>`<button class="pitem" type="button" data-pd="${x.d}"><span class="ficon on" aria-hidden="true">${x.ps?PARSHIOS[x.ps[0]][3]:"🎉"}</span>
      <span class="pname"><b>${esc(x.ps?pnms(x.ps):pholName(x.hol))}</b><span>${pdateStr(x.d)} · ${x.hd} ${esc(x.hm)}${x.ps&&isRead(x.ps)?" · learned ✓":""}</span></span>
      <span class="pright"><span class="he" lang="he">${x.ps?phe(x.ps):""}</span></span></button>`).join("");
    document.querySelectorAll("#paNext [data-pd]").forEach(el=>el.onclick=()=>{ const x=PCAL.find(y=>y.d===el.dataset.pd); sfx.tick();
      if(x.ps){ PA={ps:x.ps,d:x.d,step:0}; renderParsha(); toTop() } else toast(pholName(x.hol)+": a holiday reading!") }) }
  // All 54
  $("paList").innerHTML=BOOKS.map((bk,n)=>{ const end=n<4?BOOKS[n+1][3]:54;
    return `<div class="lsec"><h3>${esc(bk[sef?1:0])} · <span lang="he" style="font-family:var(--he)">${bk[2]}</span></h3><div class="chips">${PARSHIOS.slice(bk[3],end).map((p,k)=>{ const i=bk[3]+k;
      return `<button class="chip" type="button" data-pi="${i}" aria-pressed="${ps.includes(i)}">${p[3]} ${esc(p[sef?1:0])}${S.parsha.read[i]?" ✓":""}</button>` }).join("")}</div></div>` }).join("");
  document.querySelectorAll("#paList [data-pi]").forEach(el=>el.onclick=()=>{ sfx.tick(); const i=+el.dataset.pi, x=PCAL.slice(Math.max(0,thisWeek()||0)).find(y=>y.ps&&y.ps.includes(i));
    PA={ps:x?x.ps:[i],d:x?x.d:null,step:0}; renderParsha(); toTop() });
}
function paCoach(steps){ const ps=PA.cur, act=$("paAct");
  if(PA.quiz) return paQuiz();
  if(PA.step<steps.length-1){
    bubble("paBubble",PA.step===0?`Let me tell you the story of <b>${esc(pnms(ps))}</b>. Read step 1 with me, out loud if you can!`:pick(["Ooh, and then…","Now listen to this part!","Here's what happened next…","Are you ready? Here comes the best part!"]));
    act.innerHTML=`<button class="btn gold big" id="paNx" type="button">What happened next? →</button>`;
    $("paNx").onclick=()=>{ sfx.tick(); PA.step++; const el=document.querySelectorAll("#paMain .pastep")[PA.step]; if(el){ el.hidden=false; el.scrollIntoView({block:"center",behavior:"smooth"}) } paCoach(steps) };
    return }
  const done=isRead(ps);
  bubble("paBubble",`<b>Shlomo's lesson:</b> ${ps.map(i=>esc(PARSHIOS[i][6])).join(" ")}`); mood($("paY"),"cheer");
  act.innerHTML=`${done?"":`<button class="btn gold big" id="paGot" type="button">I learned it! +2 gelt ✓</button>`}<button class="btn${done?" gold big":""}" id="paQz" type="button">🧠 Quiz me</button><button class="btn ghost" id="paAgain" type="button">↺ Tell it again</button>`;
  if($("paGot")) $("paGot").onclick=()=>{ ps.forEach(p=>S.parsha.read[p]=true); S.gelt+=2; save(); party(true); sfx.right(3); setTimeout(sfx.coin,200); toast(pnms(ps)+" learned! +2 gelt"); paintPaHome(); paCoach(steps) };
  $("paQz").onclick=()=>{ sfx.pop(); PA.quiz={n:0,right:0,used:[]}; paQuiz() };
  $("paAgain").onclick=()=>{ sfx.tick(); PA.step=0; renderParsha() } }
function paQuiz(){ const Q=PA.quiz, base=PA.cur[0], act=$("paAct");
  const pool=base===0?[0,1,2]:base===53?[51,52,53]:[base-1,base,base+1];
  if(Q.n>=4){ const st=Q.right>=4?3:Q.right>=3?2:Q.right>=1?1:0; S.parsha.quiz[base]=Math.max(S.parsha.quiz[base]||0,st); save();
    if(st>=2){ party(true); sfx.right(4) } mood($("paY"),st?"cheer":"oy");
    bubble("paBubble",`<b>${Q.right} of 4 right!</b> ${"★".repeat(st)+"☆".repeat(3-st)}<br>${st===3?"You really know your parsha! 🎉":st>=1?"Nice work! Read the story once more and try again.":"Let's read the story again together."}`);
    act.innerHTML=`<button class="btn gold big" id="paQz" type="button">Play again</button><button class="btn ghost" id="paBk" type="button">← Back to the story</button>`;
    $("paQz").onclick=()=>{ PA.quiz={n:0,right:0,used:[]}; paQuiz() }; $("paBk").onclick=()=>{ PA.quiz=null; renderParsha() }; return }
  if((Q.n===1||Q.n===3)&&KW[base]){ const cur=PA.cur.filter(i=>KW[i]), qi=pick(cur), w=pick(KW[qi].slice(0,3).filter(x=>!Q.used.includes(x[0])))||KW[qi][0]; Q.used.push(w[0]);
    const others=shuffle(KW.flatMap((k,j)=>j===qi?[]:k.slice(0,3)).filter(x=>x[2]!==w[2])).slice(0,2), opts=shuffle([w,...others]); let first=true;
    bubble("paBubble",`<b>Question ${Q.n+1} of 4.</b> What does this word mean?<div class="paq kwq"><span lang="he">${w[0]}</span><small>${esc(kwSay(w))}</small></div>`);
    act.innerHTML=`<div class="opts">${opts.map((o,n)=>`<button class="opt paopt" type="button" data-wo="${n}"><span>${esc(kwT(o[2]))}</span></button>`).join("")}</div>`;
    act.querySelectorAll("[data-wo]").forEach(bt=>bt.onclick=()=>{
      if(opts[+bt.dataset.wo]===w){ bt.classList.add("right"); sfx.right(Q.n); if(first){ Q.right++; S.gelt++; save(); setTimeout(sfx.coin,150) } mood($("paY"),"cheer");
        act.querySelectorAll("[data-wo]").forEach(x=>x.onclick=null); setTimeout(()=>{ Q.n++; paQuiz() },900) }
      else { first=false; bt.classList.add("wrong"); bt.onclick=null; sfx.wrong(); mood($("paY"),"oy") } }); return }
  let pi, si, tries=0; do{ pi=Q.n<2?base:pick(pool); si=Math.floor(Math.random()*3); tries++ } while(Q.used.includes(pi+":"+si)&&tries<40); Q.used.push(pi+":"+si);
  const opts=[...pool].sort(()=>Math.random()-.5); let first=true;
  bubble("paBubble",`<b>Question ${Q.n+1} of 4.</b> Which parsha is this from?<div class="paq">“${esc(PARSHIOS[pi][5][si])}”</div>`);
  act.innerHTML=`<div class="opts">${opts.map(o=>`<button class="opt paopt" type="button" data-o="${o}"><span>${PARSHIOS[o][3]} ${esc(pnm(o))}</span><span class="h" lang="he">${PARSHIOS[o][2]}</span></button>`).join("")}</div>`;
  act.querySelectorAll("[data-o]").forEach(bt=>bt.onclick=()=>{
    if(+bt.dataset.o===pi){ bt.classList.add("right"); sfx.right(Q.n); if(first){ Q.right++; S.gelt++; save(); setTimeout(sfx.coin,150) } mood($("paY"),"cheer");
      act.querySelectorAll("[data-o]").forEach(x=>x.onclick=null); setTimeout(()=>{ Q.n++; paQuiz() },900) }
    else { first=false; bt.classList.add("wrong"); bt.onclick=null; sfx.wrong(); mood($("paY"),"oy") } }) }
const _rHome=renderHome; renderHome=function(){ _rHome(); paintPaHome() };
document.addEventListener("click",e=>{ if(e.target.closest("[data-setacc]")) setTimeout(()=>{ paintPaHome(); if(!$("parsha").hidden) renderParsha() },0) });
document.head.insertAdjacentHTML("beforeend",`<style>
/* Hebrew names on the right of list cards: bigger, lighter weight, room for the nikkud */
.pitem .pright{min-width:0;align-self:center}
.pitem .pright .he{font-family:"Frank Ruhl Libre","Noto Serif Hebrew",serif;font-weight:500;font-size:1.6rem;line-height:1.7;letter-spacing:.03em;word-spacing:.15em;
  color:var(--gold);direction:rtl;white-space:nowrap;padding:0 12px;border-radius:12px;background:color-mix(in srgb,var(--gold-hi) 13%,transparent);
  text-shadow:0 1px 0 color-mix(in srgb,var(--klaf) 70%,transparent)}
.pitem .pright .he:empty{display:none}
@media (max-width:400px){.pitem .pright .he{font-size:1.35rem;padding:0 9px}}
.parashi,.papsk{position:relative}
.parashi{background:var(--klaf);border:2px solid var(--rule);border-top:5px solid var(--tech);border-radius:18px;padding:14px 12px;display:flex;flex-direction:column;gap:10px}
.parashi .il{justify-content:center}
.parashi .wc{border:1.5px solid transparent;background:none;cursor:pointer;font:inherit;color:inherit}
.parashi .wc .h{font-weight:500}
.parashi .wc.on{background:color-mix(in srgb,var(--gold-hi) 32%,transparent);border-color:var(--gold-hi)}
.parashi .btn{align-self:center}
.rashiwhy{background:var(--tech-soft);border-radius:12px;padding:10px 12px}
.rashiwhy>b{display:block;font-family:var(--display);font-weight:400;font-size:1.1rem;color:var(--tech)}
.rashiwhy p{margin:4px 0 0;font-family:var(--text);font-size:1.04rem;line-height:1.5}
.rashiwhy span[lang=he]{font-family:var(--he);color:var(--gold);font-weight:700}
.papsk{background:var(--klaf);border:2px solid var(--gold-hi);border-radius:18px;padding:14px 12px;display:flex;flex-direction:column;gap:10px;box-shadow:0 4px 0 color-mix(in srgb,var(--gold-hi) 45%,transparent)}
.papskh{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
.papskh b{font-family:var(--display);font-weight:400;font-size:1.25rem;color:var(--tech)}
.papskh span{font-size:.85rem;font-weight:700;color:var(--gold)}
.papsk .il{justify-content:center}
.papsk .wc{border:1.5px solid transparent;background:none;cursor:pointer;font:inherit;color:inherit}
.papsk .wc .h{font-weight:600}
.papsk .wc.on{background:color-mix(in srgb,var(--gold-hi) 32%,transparent);border-color:var(--gold-hi)}
.papsken{margin:0;text-align:center;font-family:var(--text);font-style:italic;font-size:1.08rem;color:var(--muted)}
.papsk .btn{align-self:center}
.pakw{display:flex;flex-direction:column;gap:10px;margin-top:6px}
.pakwh{font-family:var(--display);font-weight:400;font-size:1.3rem;color:var(--tech);display:flex;flex-direction:column;gap:0}
.pakwh small{font-family:var(--say);font-size:.8rem;color:var(--muted)}
.kwc{display:grid;grid-template-columns:minmax(96px,auto) 1fr;gap:12px;align-items:start;background:var(--klaf);border:2px solid var(--rule);border-left:5px solid var(--gold-hi);border-radius:16px;padding:12px}
.kwhe{display:flex;flex-direction:column;align-items:center;gap:2px;border:0;background:var(--tech-soft);border-radius:12px;padding:8px 10px}
.kwhe .h{font-family:var(--he);font-weight:700;font-size:1.7rem;line-height:1.3;color:var(--tech);direction:rtl;text-align:center}
.kwhe .s{font-size:.82rem;font-weight:700;color:var(--gold);white-space:nowrap}
.kwhe.tapd{animation:bump .35s}
.kwt>b{display:block;font-family:var(--display);font-weight:400;font-size:1.15rem;color:var(--tech);line-height:1.25}
.kwt p{margin:4px 0 0;font-family:var(--text);font-size:1.02rem;line-height:1.45}
.kwt p span[lang=he],.padeep span[lang=he]{font-family:var(--he);color:var(--gold);font-weight:700}
.padeep{background:linear-gradient(160deg,#142c72,#2b53b4);color:#f4f0e2;border:2px solid var(--gold-hi);border-radius:18px;padding:14px 16px;box-shadow:0 4px 0 #a87618}
.padeep h3{font-family:var(--display);font-weight:400;font-size:1.25rem;color:#f4c95f;margin:0 0 6px}
.padeep p{margin:0;font-family:var(--text);font-size:1.07rem;line-height:1.5}
.padeep b{color:#fff}.padeep span[lang=he]{color:#f4c95f!important}
[data-acc="sef"] .padeep{background:linear-gradient(160deg,#0a5655,#13827d)}
.kwq{display:flex;flex-direction:column;align-items:center}.kwq span{font-family:var(--he);font-size:2rem;font-weight:700;color:var(--tech)}.kwq small{font-weight:700;color:var(--gold)}
@media (max-width:380px){.kwc{grid-template-columns:1fr}.kwhe{flex-direction:row;justify-content:center;gap:10px}}
</style>`);
window.openParsha=openParsha;
paintPaHome(); if(location.hash==="#parsha") openParsha();
})();
