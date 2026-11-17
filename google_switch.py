"""My Cheder: switch the Hebrew voice to Google's Orus (boys) and Sulafat (girls).
Records every word twice into voice/b/ (Orus) and voice/g/ (Sulafat), then points the app at them.
Safe to run again: words already recorded are skipped. Run from the my-cheder folder."""
import base64, io, json, os, re, subprocess, sys, time, wave, urllib.request, urllib.error
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
KEY = open(os.path.expanduser("~/.mycheder_google_key")).read().strip()
URL = "https://texttospeech.googleapis.com/v1/text:synthesize?key=" + KEY
VOICES = {"b": "he-IL-Chirp3-HD-Orus", "g": "he-IL-Chirp3-HD-Sulafat"}
RATE = 24000
WORDS = json.load(open(os.path.join(H, "words.json"), encoding="utf-8"))

_POINTS = re.compile(r"[֑-ֽֿׁ-ׂׄ-ׇ]")
_KEEP = {"יי", "יהוה", "אדני", "אלהים", "אלקים", "אלוקים", "אלהי", "אלקי"}


def say(text):  # plain letters read best; single letters and Hashem's names keep their vowels
    plain = _POINTS.sub("", text)
    return text if len(plain) <= 1 or plain in _KEEP else plain


def synth(text, voice, use_rate=True):
    cfg = {"audioEncoding": "LINEAR16", "sampleRateHertz": RATE}
    if use_rate:
        cfg["speakingRate"] = 0.92
    body = {"input": {"text": text}, "voice": {"languageCode": "he-IL", "name": voice}, "audioConfig": cfg}
    req = urllib.request.Request(URL, json.dumps(body).encode(), {"Content-Type": "application/json"})
    return base64.b64decode(json.load(urllib.request.urlopen(req, timeout=60))["audioContent"])


def to_mp3(wav_bytes):
    w = wave.open(io.BytesIO(wav_bytes))
    pcm = w.readframes(w.getnframes())
    n = len(pcm) // 2
    s = memoryview(pcm).cast("h")
    thr = 500
    first = next((i for i in range(n) if abs(s[i]) > thr), 0)
    last = next((i for i in range(n - 1, -1, -1) if abs(s[i]) > thr), n - 1)
    a = max(0, first - int(RATE * 0.03))
    b = min(n, last + int(RATE * 0.12))
    enc = lameenc.Encoder()
    enc.set_bit_rate(48); enc.set_in_sample_rate(RATE); enc.set_channels(1); enc.set_quality(2)
    return bytes(enc.encode(pcm[a * 2:b * 2]) + enc.flush())


USE_RATE = [True]


def record(job):
    d, w = job
    path = os.path.join(H, "voice", d, w["h"] + ".mp3")
    if os.path.exists(path) and os.path.getsize(path) > 0:
        return True
    for attempt in range(6):
        try:
            data = to_mp3(synth(say(w["t"]), VOICES[d], USE_RATE[0]))
            open(path, "wb").write(data)
            return True
        except urllib.error.HTTPError as e:
            msg = e.read().decode()[:300]
            if e.code == 400 and "speaking" in msg.lower() and USE_RATE[0]:
                USE_RATE[0] = False; continue
            if e.code == 400:
                return False  # Google can't say this one (junk character)
            time.sleep(3 * (attempt + 1))
        except Exception:
            time.sleep(3 * (attempt + 1))
    return False


for d in VOICES:
    os.makedirs(os.path.join(H, "voice", d), exist_ok=True)
jobs = [(d, w) for d in VOICES for w in WORDS]
print(f"Recording {len(WORDS)} words in 2 Google voices (Orus + Sulafat). About 10-20 minutes...")
done = ok = 0
with cf.ThreadPoolExecutor(8) as ex:
    for r in ex.map(record, jobs):
        done += 1; ok += bool(r)
        if done % 100 == 0 or done == len(jobs):
            print(f"\r  {done} of {len(jobs)} recordings", end="", flush=True)
print()
good = {w["h"]: [0, 0] for w in WORDS
        if all(os.path.exists(os.path.join(H, "voice", d, w["h"] + ".mp3")) for d in VOICES)}
open(os.path.join(H, "voice", "vox.js"), "w").write("window.VOX=" + json.dumps(good, separators=(",", ":")) + ";")
print(f"  {len(good)} words ready in both voices.")

# Point the app at the new voices: boys hear Orus, girls hear Sulafat
hj = os.path.join(H, "hila.js")
s = open(hj, encoding="utf-8").read()
if "VDIR_V1" not in s:
    s2 = re.sub(r'fetch\("voice/"\+h\+"\.mp3[^"]*"\)', 'fetch("voice/"+vd+"/"+h+".mp3")', s)
    s2 = s2.replace("function load(c,h){ if(BUF.has(h)) return BUF.get(h);",
                    "/* VDIR_V1: girls hear Sulafat, everyone else Orus */\n"
                    "const vdir=()=>{ try{ return S.gender===\"girl\"?\"g\":\"b\" }catch(e){ return \"b\" } };\n"
                    "function load(c,h0){ const vd=vdir(), h=vd+\"/\"+h0; if(BUF.has(h)) return BUF.get(h);")
    s2 = s2.replace('fetch("voice/"+vd+"/"+h+".mp3")', 'fetch("voice/"+h+".mp3")')
    if s2.count("VDIR_V1") != 1 or 'fetch("voice/"+h+".mp3")' not in s2:
        raise SystemExit("ABORT: could not update hila.js. Send Claude a screenshot.")
    open(hj, "w", encoding="utf-8").write(s2)
    print("  hila.js: boys hear Orus, girls hear Sulafat.")

sw = os.path.join(H, "sw.js")
if os.path.exists(sw):
    t = open(sw, encoding="utf-8").read()
    t = re.sub(r'VOICE="my-cheder-voice[^"]*"', 'VOICE="my-cheder-voice-3"', t)
    t = t.replace('const u="voice/"+h+".mp3";', 'for(const vd of ["b","g"]){ const u="voice/"+vd+"/"+h+".mp3";')
    t = t.replace("catch(err){ return } } }catch(err){} }", "catch(err){ return } } } }catch(err){} }")
    open(sw, "w", encoding="utf-8").write(t)
print("Done!")
