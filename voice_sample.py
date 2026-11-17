"""My Cheder: voice sample. Makes ONE page with 3 ways the voice can read, so you can listen and pick.
Nothing in the app changes. Uses your Google key (~/.mycheder_google_key)."""
import base64, io, json, os, re, subprocess, sys, wave, urllib.request

try:
    import lameenc
except ImportError:
    import site
    for extra in ([], ["--user"], ["--user", "--break-system-packages"]):
        if subprocess.call([sys.executable, "-m", "pip", "install", "--quiet", *extra, "lameenc"]) == 0:
            break
    site.addsitedir(site.getusersitepackages())
    import lameenc

KEY = open(os.path.expanduser("~/.mycheder_google_key")).read().strip()
URL = "https://texttospeech.googleapis.com/v1/text:synthesize?key=" + KEY
RATE = 24000
VOICE = {"boy": "he-IL-Chirp3-HD-Orus", "girl": "he-IL-Chirp3-HD-Sulafat"}

LINES = [
    ("Modeh Ani", "מוֹדֶה אֲנִי לְפָנֶיךָ, מֶלֶךְ חַי וְקַיָּם, שֶׁהֶחֱזַרְתָּ בִּי נִשְׁמָתִי בְּחֶמְלָה, רַבָּה אֱמוּנָתֶךָ"),
    ("Boruch atoh", "בָּרוּךְ אַתָּה הַשֵּׁם, אֱלֹקֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו, וְצִוָּנוּ עַל נְטִילַת יָדָיִם"),
    ("Shema", "שְׁמַע יִשְׂרָאֵל, הַשֵּׁם אֱלֹקֵינוּ, הַשֵּׁם אֶחָד"),
    ("Shabbos (Kiddush)", "וְשַׁבַּת קָדְשׁוֹ בְּאַהֲבָה וּבְרָצוֹן הִנְחִילָנוּ, זִכָּרוֹן לְמַעֲשֵׂה בְרֵאשִׁית"),
]

POINTS = re.compile(r"[֑-ֽֿׁ-ׂׄ-ׇ]")
MARKS = "[֑-ׇ]*"
LET = "[א-הז-ת]"  # every letter except vav (a vav with a dot is already an "o" or "u")
FINAL = {"ך": "כ", "ם": "מ", "ן": "נ", "ף": "פ", "ץ": "צ"}


def plain(text):  # what the app does today: plain letters, an "o" vowel becomes a vav
    t = re.sub("(" + LET + ")(" + MARKS + "?[ֳֹֺ]" + MARKS + ")", lambda m: m.group(1) + m.group(2) + "ו", text)
    return POINTS.sub("", t).replace("ּ", "")


def sephardi(text):  # Israeli Hebrew is read the Sephardi way: just plain letters
    return POINTS.sub("", text).replace("ּ", "")


def chabad(text):  # Chabad sounds: kamatz and cholam say "o", a tav without a dot says "s"
    t = text
    # a kamatz on a letter followed by a silent final hei: drop the hei, the vav carries the "o" (atoh)
    t = re.sub("(" + LET + MARKS + "?ָ" + MARKS + ")ה(?=[\\s,.:;]|$)", lambda m: m.group(1), t)
    t = re.sub("(" + LET + ")(" + MARKS + "?[ֳָֹֺ]" + MARKS + ")(?!ו)", lambda m: m.group(1) + m.group(2) + "ו", t)
    t = re.sub("ת(?![֑-ׇ]*ּ)", "ס", t)  # sav
    t = POINTS.sub("", t).replace("ּ", "")
    t = re.sub("ויו(?=[\\s,.:;]|$)", "וב", t)  # "-oyv" at the end (mitzvosov) is said "ov"
    t = re.sub("[ךםןףץ](?=ו)", lambda m: FINAL[m.group(0)], t)  # no final letters in the middle of a word
    return t


def synth(text, voice):
    body = {"input": {"text": text}, "voice": {"languageCode": "he-IL", "name": voice},
            "audioConfig": {"audioEncoding": "LINEAR16", "sampleRateHertz": RATE, "speakingRate": 0.9}}
    req = urllib.request.Request(URL, json.dumps(body).encode(), {"Content-Type": "application/json"})
    w = wave.open(io.BytesIO(base64.b64decode(json.load(urllib.request.urlopen(req, timeout=60))["audioContent"])))
    return w.readframes(w.getnframes())


def trim(pcm, tail=0.12):
    s = memoryview(pcm).cast("h"); n = len(s); thr = 500
    a = next((i for i in range(n) if abs(s[i]) > thr), 0)
    b = next((i for i in range(n - 1, -1, -1) if abs(s[i]) > thr), n - 1)
    return pcm[max(0, a - int(RATE * .03)) * 2:min(n, b + int(RATE * tail)) * 2]


def mp3(pcm):
    enc = lameenc.Encoder(); enc.set_bit_rate(64); enc.set_in_sample_rate(RATE); enc.set_channels(1); enc.set_quality(2)
    return base64.b64encode(bytes(enc.encode(pcm) + enc.flush())).decode()


def word_by_word(text, voice):  # how it sounds today: each word recorded alone, glued together
    gap = b"\x00\x00" * int(RATE * .08)
    out = b""
    for w in text.split():
        out += trim(synth(plain(w), voice), .02) + gap
    return out


rows = []
for title, he in LINES:
    print("Recording:", title)
    cells = []
    for who in ("boy", "girl"):
        v = VOICE[who]
        cells.append((who, [("A · Today (word by word)", mp3(word_by_word(he, v))),
                            ("B · Smooth, Sephardi sounds", mp3(trim(synth(sephardi(he), v)))),
                            ("C · Smooth, Chabad sounds", mp3(trim(synth(chabad(he), v))))]))
    rows.append((title, he, cells))

html = ["<!doctype html><meta charset=utf-8><meta name=viewport content='width=device-width,initial-scale=1'><title>My Cheder voice sample</title>",
        "<style>body{font-family:-apple-system,sans-serif;max-width:760px;margin:20px auto;padding:0 14px;background:#f6f1e4}h1{color:#1d3d8c}"
        ".card{background:#fff;border-radius:14px;padding:14px 16px;margin:14px 0;box-shadow:0 2px 6px #0002}.he{font-size:1.5em;direction:rtl;margin:6px 0 10px}"
        ".row{display:flex;align-items:center;gap:10px;margin:6px 0}.row b{width:230px;font-size:.95em}audio{height:34px}h3{margin:10px 0 2px;color:#a64f1b}</style>",
        "<h1>My Cheder: which voice sounds best?</h1><p>Play <b>A</b>, <b>B</b> and <b>C</b> for each line. Then tell Claude which letter you like for Chabad and which for Sephardi.</p>"]
for title, he, cells in rows:
    html.append(f"<div class=card><h2>{title}</h2><div class=he>{he}</div>")
    for who, items in cells:
        html.append(f"<h3>{'Boy (Orus)' if who == 'boy' else 'Girl (Sulafat)'}</h3>")
        for label, b64 in items:
            html.append(f"<div class=row><b>{label}</b><audio controls preload=none src='data:audio/mpeg;base64,{b64}'></audio></div>")
    html.append("</div>")
out = os.path.expanduser("~/Downloads/my_cheder_voice_sample.html")
open(out, "w", encoding="utf-8").write("".join(html))
print("Done! Opening the sample page...")
subprocess.call(["open", out])
