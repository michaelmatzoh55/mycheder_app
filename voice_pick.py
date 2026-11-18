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



LINE = "שְׁמַע יִשְׂרָאֵל, אֲדֹנָי אֱלֹהֵינוּ, אֲדֹנָי אֶחָד. בָּרוּךְ אַתָּה אֲדֹנָי אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, הַמּוֹצִיא לֶחֶם מִן הָאָרֶץ"
BOYS = ["Orus", "Charon", "Fenrir", "Puck", "Iapetus"]
GIRLS = ["Sulafat", "Kore", "Aoede", "Leda", "Despina"]
html = ["<!doctype html><meta charset=utf-8><meta name=viewport content='width=device-width,initial-scale=1'><title>Pick the Sephardi voices</title>",
        "<style>body{font-family:-apple-system,sans-serif;max-width:700px;margin:20px auto;padding:0 14px;background:#f6f1e4}h1{color:#1d3d8c}"
        ".card{background:#fff;border-radius:14px;padding:14px 16px;margin:14px 0;box-shadow:0 2px 6px #0002}.row{display:flex;align-items:center;gap:12px;margin:8px 0}"
        ".row b{width:140px;font-size:1.05em}audio{height:34px}</style>",
        "<h1>Pick a boy voice and a girl voice for Sephardi</h1><p>Each one reads the same Sephardi line. Orus and Sulafat are the voices you have now. Tell Claude one boy name and one girl name.</p>"]
for title, names in (("Boy voices", BOYS), ("Girl voices", GIRLS)):
    html.append(f"<div class=card><h2>{title}</h2>")
    for n in names:
        print("Recording", n)
        try:
            b64 = mp3(trim(synth(sephardi(LINE), "he-IL-Chirp3-HD-" + n)))
            html.append(f"<div class=row><b>{n}{' (now)' if n in ('Orus','Sulafat') else ''}</b><audio controls preload=none src='data:audio/mpeg;base64,{b64}'></audio></div>")
        except Exception as e:
            html.append(f"<div class=row><b>{n}</b><i>not available</i></div>")
    html.append("</div>")
out = os.path.expanduser("~/Downloads/my_cheder_pick_voices.html")
open(out, "w", encoding="utf-8").write("".join(html))
print("Done! Opening the page...")
subprocess.call(["open", out])
