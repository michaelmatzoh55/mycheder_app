"""My Cheder: four voices for every prayer line AND every single word.
Chabad boy = Orus, Chabad girl = Sulafat (Chabad sounds: Boruch atoh, Beis, Yisroeil)
Sephardi boy = Iapetus, Sephardi girl = Despina (Sephardi sounds).
Run from the my-cheder folder. Safe to run again: whatever is finished is skipped."""
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
WORDS = json.load(open(os.path.join(H, "words.json"), encoding="utf-8"))
RATE = 24000

POINTS = re.compile("[֑-ֽֿׁ-ׂׄ-ׇ]")
MARKS = "[֑-ׇ]*"
LET = "[א-הז-ת]"
FINAL = {"ך": "כ", "ם": "מ", "ן": "נ", "ף": "פ", "ץ": "צ"}
KEEP = {"יי", "יהוה", "אדני", "אלהים", "אלקים", "אלוקים", "אלהי", "אלקי"}
def strip(t): return POINTS.sub("", t).replace("ּ", "")
def kept(w): p=strip(w); return len(p)<=1 or p in KEEP
def old_say(w):
    if kept(w): return w
    return strip(re.sub("(" + LET + ")(" + MARKS + "?[ֳֹֺ]" + MARKS + ")", lambda m: m.group(1)+m.group(2)+"ו", w))
def chabad_word(w):
    if kept(w): return w
    if strip(w)=="השם": return "השם"
    t = re.sub("(" + LET + MARKS + "?[ָֹ]" + MARKS + ")ה$", lambda m: m.group(1), w)          # atoh: drop the silent hei
    t = re.sub("(" + LET + ")(" + MARKS + "?[ֳָֹֺ]" + MARKS + ")(?!ו)", lambda m: m.group(1)+m.group(2)+"ו", t)  # "o"
    t = re.sub("(" + LET + ")(" + MARKS + "?ֵ" + MARKS + ")(י(?![ְ-ׇּׁׂ]))?", lambda m: m.group(1)+m.group(2)+"יי", t)  # tzere = "ei"
    t = re.sub("ת(?![֑-ׇ]*ּ)", "ס", t)   # sav
    t = strip(t)
    t = re.sub("ויו$", "וב", t)
    t = re.sub("[ךםןףץ](?=ו)", lambda m: FINAL[m.group(0)], t)
    return t
def sephardi_word(w): return w if kept(w) else strip(w)
def chabad(text): return " ".join(chabad_word(w) for w in text.split())
def sephardi(text): return " ".join(sephardi_word(w) for w in text.split())


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



def rec(text, voice, mp, tj=None, words=None):
    for attempt in range(6):
        try:
            pcm = trim(synth(text, "he-IL-Chirp3-HD-" + voice))
            open(mp, "wb").write(to_mp3(pcm))
            if tj: json.dump(word_times(words, pcm), open(tj, "w"))
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


def lpath(x):
    f = os.path.join(H, "voice", "L", x["d"], VOICE[x["d"]] + "-2")
    return os.path.join(f, x["h"] + ".mp3"), os.path.join(f, x["h"] + ".json")


def wpath(d, w):
    return os.path.join(H, "voice", "W", d, VOICE[d], w["h"] + ".mp3")


def line_job(x):
    mp, tj = lpath(x)
    if os.path.exists(mp) and os.path.exists(tj): return True
    text = chabad(x["t"]) if x["d"][0] == "a" else sephardi(x["t"])
    return rec(text, VOICE[x["d"]], mp, tj, x["t"].split())


def word_job(job):
    d, w = job; mp = wpath(d, w)
    if os.path.exists(mp) and os.path.getsize(mp) > 0: return True
    if d[0] == "a":
        text = chabad(w["t"])
        old = os.path.join(H, "voice", d[1], w["h"] + ".mp3")       # the old word recording, same voice and same sound: reuse it
        if text == old_say(w["t"]) and os.path.exists(old) and os.path.getsize(old) > 0:
            open(mp, "wb").write(open(old, "rb").read()); return True
    else:
        text = sephardi(w["t"])
    return rec(text, VOICE[d], mp)


def run(name, fn, jobs):
    print(f"{name}: {len(jobs)}")
    done = ok = 0
    with cf.ThreadPoolExecutor(10) as ex:
        for r in ex.map(fn, jobs):
            done += 1; ok += bool(r)
            if done % 50 == 0 or done == len(jobs):
                print(f"\r  {done} of {len(jobs)}", end="", flush=True)
    print(f"\n  {ok} ready.")


for d in VOICE:
    os.makedirs(os.path.join(H, "voice", "L", d, VOICE[d] + "-2"), exist_ok=True)
    os.makedirs(os.path.join(H, "voice", "W", d, VOICE[d]), exist_ok=True)
print("This records the 4 voices. It takes about 45-60 minutes. Leave this window open.")
run("Prayer lines", line_job, LINES)
run("Single words", word_job, [(d, w) for d in VOICE for w in WORDS])


def pack(kind, items, limit):
    out, total, nf = {}, 0, 0
    for d in VOICE:
        folder = os.path.join(H, "voice", kind, d)
        for old in glob.glob(os.path.join(folder, "p_*.bin")): os.remove(old)
        groups, cur, cs = [], [], 0
        for h, mp, extra in items(d):
            if not os.path.exists(mp) or os.path.getsize(mp) == 0: continue
            data = open(mp, "rb").read()
            if cur and cs + len(data) > limit: groups.append(cur); cur, cs = [], 0
            cur.append((h, data, extra)); cs += len(data)
        if cur: groups.append(cur)
        idx = {}
        for gi, g in enumerate(groups):
            blob, parts = bytearray(), []
            for h, data, extra in g: parts.append((h, len(blob), len(data), extra)); blob += data
            stem = f"{gi}.{zlib.crc32(bytes(blob)) & 0xffffff:06x}"
            open(os.path.join(folder, f"p_{stem}.bin"), "wb").write(blob); total += len(blob); nf += 1
            for h, off, ln, extra in parts: idx[h] = [stem, off, ln] + ([extra] if extra is not None else [])
        out[d] = idx
    return out, total, nf


def line_items(d):
    for x in LINES:
        if x["d"] == d:
            mp, tj = lpath(x)
            if os.path.exists(tj): yield x["h"], mp, json.load(open(tj))


def word_items(d):
    seen = set()
    for w in WORDS:
        if w["h"] in seen: continue
        seen.add(w["h"]); yield w["h"], wpath(d, w), None


LPK, t1, n1 = pack("L", line_items, 160000)
open(os.path.join(H, "voice", "lpk.js"), "w").write("window.LPK=" + json.dumps(LPK, separators=(",", ":")) + ";")
WPK, t2, n2 = pack("W", word_items, 120000)
open(os.path.join(H, "voice", "wpk.js"), "w").write("window.WPK=" + json.dumps(WPK, separators=(",", ":")) + ";")
print(f"Packed {n1 + n2} files ({(t1 + t2) / 1e6:.0f} MB).")
print("\nDone! Now go to GitHub Desktop: type  Four voices  in the Summary box, click Commit to main, then click Push origin.")
