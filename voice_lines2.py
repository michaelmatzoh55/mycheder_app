"""My Cheder: four voices. Chabad boy = Orus, Chabad girl = Sulafat, Sephardi boy = Iapetus, Sephardi girl = Despina.
Records only what's missing, measures where every word starts (so the yad keeps up), and packs small bundles.
Run from the my-cheder folder. Safe to run again: finished lines are skipped."""
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
VOICE = {"ab": "Orus", "ag": "Sulafat", "sb": "Iapetus", "sg": "Despina"}
OLD = {"ab": "Orus", "ag": "Sulafat", "sb": "Orus", "sg": "Sulafat"}  # who recorded the files already on disk
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


def trim(pcm):
    s = memoryview(pcm).cast("h"); n = len(s); thr = 500
    a = next((i for i in range(n) if abs(s[i]) > thr), 0)
    b = next((i for i in range(n - 1, -1, -1) if abs(s[i]) > thr), n - 1)
    return pcm[max(0, a - int(RATE * .03)) * 2:min(n, b + int(RATE * .15)) * 2]


def to_mp3(pcm):
    enc = lameenc.Encoder(); enc.set_bit_rate(40); enc.set_in_sample_rate(RATE); enc.set_channels(1); enc.set_quality(2)
    return bytes(enc.encode(pcm) + enc.flush())


VOW = re.compile("[\u05B1-\u05BB\u05C7]|\u05D5\u05BC"); LETR = re.compile("[\u05D0-\u05EA]")


def word_times(words, pcm):
    """Where each word starts (ms): find the pauses, share the words out over the spoken parts, then snap to the quiet dips."""
    s = memoryview(pcm).cast("h"); FR = RATE // 100; m = len(s) // FR
    if m == 0 or len(words) < 2:
        return [0] * len(words)
    e = [(sum(v * v for v in s[i * FR:(i + 1) * FR]) / FR) ** .5 + 1e-6 for i in range(m)]
    ref = sorted(e)[int(m * .95)] + 1e-6
    voiced = [20 * __import__("math").log10(x / ref) > -28 for x in e]
    idx = [i for i, v in enumerate(voiced) if v]
    if not idx:
        return [0] * len(words)
    a, b = idx[0], idx[-1]; S = []; cur = a; i = a
    while i <= b:
        if not voiced[i]:
            j = i
            while j <= b and not voiced[j]: j += 1
            if j - i >= 14: S.append((cur * 10, i * 10)); cur = j
            i = j
        else: i += 1
    S.append((cur * 10, (b + 1) * 10))
    W = [1 + len(VOW.findall(w)) + .25 * len(LETR.findall(w)) for w in words]; n = len(W)
    P = [bool(re.search(r"[,.:;]$", w)) for w in words]
    while len(S) > n:
        g = min(range(len(S) - 1), key=lambda k: S[k + 1][0] - S[k][1]); S[g:g + 2] = [(S[g][0], S[g + 1][1])]
    k = len(S); D = [y - x for x, y in S]; TD = sum(D) or 1; TW = sum(W); cw = [0]
    for w in W: cw.append(cw[-1] + w)
    INF = 1e18; dp = [[INF] * (n + 1) for _ in range(k + 1)]; bk = [[0] * (n + 1) for _ in range(k + 1)]; dp[0][0] = 0
    for g in range(1, k + 1):
        for j in range(g, n + 1):
            for i in range(g - 1, j):
                if dp[g - 1][i] >= INF: continue
                c = dp[g - 1][i] + ((cw[j] - cw[i]) / TW - D[g - 1] / TD) ** 2 + (0 if (j == n or P[j - 1]) else .02)
                if c < dp[g][j]: dp[g][j] = c; bk[g][j] = i
    cuts = [n]; j = n
    for g in range(k, 0, -1): j = bk[g][j]; cuts.append(j)
    cuts = cuts[::-1]; T = []
    for g in range(k):
        i0, i1 = cuts[g], cuts[g + 1]; s0, s1 = S[g]; gw = cw[i1] - cw[i0] or 1
        for i in range(i0, i1): T.append(int(s0 + (s1 - s0) * (cw[i] - cw[i0]) / gw))
    sm = [(e[max(0, i - 1)] + e[i] + e[min(m - 1, i + 1)]) / 3 for i in range(m)]
    for i in range(1, len(T)):
        c = T[i] // 10; lo = max(T[i - 1] // 10 + 8, c - 12); hi = min(m - 1, c + 12)
        if hi > lo: T[i] = (lo + min(range(hi - lo + 1), key=lambda q: sm[lo + q])) * 10 + 10
    return T


OLDT = {}
try:
    _s = open(os.path.join(H, "voice", "lpk.js")).read(); _L = json.loads(_s[_s.index("{"):_s.rindex("}") + 1])
    OLDT = {d + h: v[3] for d, ix in _L.items() for h, v in ix.items() if len(v) > 3}
except Exception:
    pass


def paths(x):
    d = x["d"]; folder = os.path.join(H, "voice", "L", d, VOICE[d])
    return os.path.join(folder, x["h"] + ".mp3"), os.path.join(folder, x["h"] + ".json")


def record(x):
    mp, tj = paths(x)
    if os.path.exists(mp) and os.path.exists(tj):
        return True
    old = os.path.join(H, "voice", "L", x["d"], x["h"] + ".mp3")   # an earlier run, same voice: reuse it
    if VOICE[x["d"]] == OLD[x["d"]] and os.path.exists(old) and (x["d"] + x["h"]) in OLDT:
        open(mp, "wb").write(open(old, "rb").read()); json.dump(OLDT[x["d"] + x["h"]], open(tj, "w")); return True
    text = chabad(x["t"]) if x["d"][0] == "a" else sephardi(x["t"])
    for attempt in range(6):
        try:
            pcm = trim(synth(text, "he-IL-Chirp3-HD-" + VOICE[x["d"]]))
            open(mp, "wb").write(to_mp3(pcm)); json.dump(word_times(x["t"].split(), pcm), open(tj, "w"))
            return True
        except urllib.error.HTTPError as e:
            if e.code == 403:
                raise SystemExit("STOP: Google said no (" + e.read().decode()[:200] + "). Send Claude a screenshot.")
            if e.code == 400:
                return False
            time.sleep(4 * (attempt + 1))
        except Exception:
            time.sleep(4 * (attempt + 1))
    return False


for d in ("ab", "ag", "sb", "sg"):
    os.makedirs(os.path.join(H, "voice", "L", d, VOICE[d]), exist_ok=True)
print(f"Checking {len(LINES)} prayer lines. New Sephardi voices get recorded now: about 10-15 minutes...")
done = ok = 0
with cf.ThreadPoolExecutor(8) as ex:
    for r in ex.map(record, LINES):
        done += 1; ok += bool(r)
        if done % 25 == 0 or done == len(LINES):
            print(f"\r  {done} of {len(LINES)} lines", end="", flush=True)
print(f"\n  {ok} lines recorded.")

# Pack the lines in prayer order into small files, so a phone only downloads what it is about to say
LPK, total, nf = {}, 0, 0
for d in ("ab", "ag", "sb", "sg"):
    folder = os.path.join(H, "voice", "L", d)
    for old in glob.glob(os.path.join(folder, "p_*.bin")):
        os.remove(old)
    groups, cur, cs = [], [], 0
    for x in LINES:
        if x["d"] != d: continue
        mp, tj = paths(x)
        if not (os.path.exists(mp) and os.path.exists(tj)): continue
        data = open(mp, "rb").read()
        if cur and cs + len(data) > 160000: groups.append(cur); cur, cs = [], 0
        cur.append((x["h"], data, json.load(open(tj)))); cs += len(data)
    if cur: groups.append(cur)
    idx = {}
    for gi, g in enumerate(groups):
        blob, parts = bytearray(), []
        for h, data, tm in g: parts.append((h, len(blob), len(data), tm)); blob += data
        stem = f"{gi}.{zlib.crc32(bytes(blob)) & 0xffffff:06x}"
        open(os.path.join(folder, f"p_{stem}.bin"), "wb").write(blob); total += len(blob); nf += 1
        for h, off, ln, tm in parts: idx[h] = [stem, off, ln, tm]
    LPK[d] = idx
open(os.path.join(H, "voice", "lpk.js"), "w").write("window.LPK=" + json.dumps(LPK, separators=(",", ":")) + ";")
print(f"  Bundled into {nf} files ({total/1e6:.1f} MB).")
print("\nDone! Now go to GitHub Desktop: type  Four voices  in the Summary box, click Commit to main, then click Push origin.")
