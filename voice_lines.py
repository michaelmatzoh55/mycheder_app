"""My Cheder: record every prayer line in one smooth breath.
Chabad mode = Chabad sounds (you picked C). Sephardi mode = Sephardi sounds (you picked B).
Boys hear Orus, girls hear Sulafat. Run from the my-cheder folder. Safe to run again: finished lines are skipped."""
import base64, io, json, os, re, subprocess, sys, time, wave, zlib, glob, urllib.request, urllib.error
import concurrent.futures as cf

try:
    import lameenc
except ImportError:
    import site
    for extra in ([], ["--user"], ["--user", "--break-system-packages"]):
        if subprocess.call([sys.executable, "-m", "pip", "install", "--quiet", *extra, "lameenc"]) == 0:
            break
    site.addsitedir(site.getusersitepackages())
    import lameenc

H = os.getcwd()
MAN = os.path.join(H, "voice", "lines.json")
if not os.path.exists(MAN):
    raise SystemExit("STOP: I can't find voice/lines.json. In GitHub Desktop, click Fetch origin, then Pull origin, then run this again.")
LINES = json.load(open(MAN, encoding="utf-8"))
KEY = open(os.path.expanduser("~/.mycheder_google_key")).read().strip()
URL = "https://texttospeech.googleapis.com/v1/text:synthesize?key=" + KEY
VOICE = {"b": "he-IL-Chirp3-HD-Orus", "g": "he-IL-Chirp3-HD-Sulafat"}
RATE = 24000

POINTS = re.compile("[֑-ֽֿׁ-ׂׄ-ׇ]")
MARKS = "[֑-ׇ]*"
LET = "[א-הז-ת]"  # every letter except vav
FINAL = {"ך": "כ", "ם": "מ", "ן": "נ", "ף": "פ", "ץ": "צ"}
NAMES = {"יי", "יהוה", "אדני"}  # spoken the Sephardi way with their vowels


def strip(t):
    return POINTS.sub("", t).replace("ּ", "")


def sephardi(text):  # choice B: plain letters, read the Israeli/Sephardi way
    return " ".join(w if strip(w) in NAMES else strip(w) for w in text.split())


def chabad(text):  # choice C: kamatz and cholam say "o", a tav without a dot says "s"
    t = re.sub("(" + LET + MARKS + "?ָ" + MARKS + ")ה(?=[\\s,.:;]|$)", lambda m: m.group(1), text)
    t = re.sub("(" + LET + ")(" + MARKS + "?[ֳָֹֺ]" + MARKS + ")(?!ו)", lambda m: m.group(1) + m.group(2) + "ו", t)
    t = re.sub("ת(?![֑-ׇ]*ּ)", "ס", t)
    t = strip(t)
    t = re.sub("ויו(?=[\\s,.:;]|$)", "וב", t)
    t = re.sub("[ךםןףץ](?=ו)", lambda m: FINAL[m.group(0)], t)
    return t


def synth(text, voice):
    body = {"input": {"text": text}, "voice": {"languageCode": "he-IL", "name": voice},
            "audioConfig": {"audioEncoding": "LINEAR16", "sampleRateHertz": RATE, "speakingRate": 0.9}}
    req = urllib.request.Request(URL, json.dumps(body).encode(), {"Content-Type": "application/json"})
    w = wave.open(io.BytesIO(base64.b64decode(json.load(urllib.request.urlopen(req, timeout=90))["audioContent"])))
    return w.readframes(w.getnframes())


def to_mp3(pcm):
    s = memoryview(pcm).cast("h"); n = len(s); thr = 500
    a = next((i for i in range(n) if abs(s[i]) > thr), 0)
    b = next((i for i in range(n - 1, -1, -1) if abs(s[i]) > thr), n - 1)
    pcm = pcm[max(0, a - int(RATE * .03)) * 2:min(n, b + int(RATE * .15)) * 2]
    enc = lameenc.Encoder(); enc.set_bit_rate(40); enc.set_in_sample_rate(RATE); enc.set_channels(1); enc.set_quality(2)
    return bytes(enc.encode(pcm) + enc.flush())


def record(x):
    path = os.path.join(H, "voice", "L", x["d"], x["h"] + ".mp3")
    if os.path.exists(path) and os.path.getsize(path) > 0:
        return True
    text = chabad(x["t"]) if x["d"][0] == "a" else sephardi(x["t"])
    for attempt in range(6):
        try:
            open(path, "wb").write(to_mp3(synth(text, VOICE[x["d"][1]])))
            return True
        except urllib.error.HTTPError as e:
            if e.code in (400, 403):
                msg = e.read().decode()[:200]
                if e.code == 403:
                    raise SystemExit("STOP: Google said no (" + msg + "). Send Claude a screenshot.")
                return False
            time.sleep(4 * (attempt + 1))
        except Exception:
            time.sleep(4 * (attempt + 1))
    return False


for d in ("ab", "ag", "sb", "sg"):
    os.makedirs(os.path.join(H, "voice", "L", d), exist_ok=True)
print(f"Recording {len(LINES)} prayer lines (Chabad + Sephardi, boy + girl). This takes about 15-25 minutes...")
done = ok = 0
with cf.ThreadPoolExecutor(8) as ex:
    for r in ex.map(record, LINES):
        done += 1; ok += bool(r)
        if done % 25 == 0 or done == len(LINES):
            print(f"\r  {done} of {len(LINES)} lines", end="", flush=True)
print(f"\n  {ok} lines recorded.")

# Bundle the lines into a few bigger files (Vercel and phones like fewer files)
LPK, total, nf = {}, 0, 0
for d in ("ab", "ag", "sb", "sg"):
    folder = os.path.join(H, "voice", "L", d)
    for old in glob.glob(os.path.join(folder, "p_*.bin")):
        os.remove(old)
    groups = {}
    for x in LINES:
        if x["d"] == d and os.path.exists(os.path.join(folder, x["h"] + ".mp3")):
            groups.setdefault(x["h"][1], set()).add(x["h"])
    idx = {}
    for k, hs in sorted(groups.items()):
        blob, parts = bytearray(), []
        for h in sorted(hs):
            data = open(os.path.join(folder, h + ".mp3"), "rb").read()
            parts.append((h, len(blob), len(data))); blob += data
        stem = f"{k}.{zlib.crc32(bytes(blob)) & 0xffffff:06x}"
        open(os.path.join(folder, f"p_{stem}.bin"), "wb").write(blob)
        total += len(blob); nf += 1
        for h, off, ln in parts:
            idx[h] = [stem, off, ln]
    LPK[d] = idx
open(os.path.join(H, "voice", "lpk.js"), "w").write("window.LPK=" + json.dumps(LPK, separators=(",", ":")) + ";")
print(f"  Bundled into {nf} files ({total/1e6:.1f} MB).")
print("\nDone! Now go to GitHub Desktop: type  Smooth voices  in the Summary box, click Commit to main, then click Push origin.")
