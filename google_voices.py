"""My Cheder: hear every Google Chirp 3 HD Hebrew voice and pick favorites.
Needs your Google key saved in ~/.mycheder_google_key . Run from the my-cheder folder."""
import base64, json, os, subprocess, urllib.request, urllib.error, html, concurrent.futures as cf

KEY = open(os.path.expanduser("~/.mycheder_google_key")).read().strip()
API = "https://texttospeech.googleapis.com/v1/"
OUT = os.path.join(os.getcwd(), "google_voices")
os.makedirs(OUT, exist_ok=True)

SAMPLE = "תודה. שלום. ברוך אתה. מודה אני לפניך מלך חי וקים. שמע ישראל."


def call(path, body=None):
    req = urllib.request.Request(API + path + ("&" if "?" in path else "?") + "key=" + KEY,
                                 data=json.dumps(body).encode() if body else None,
                                 headers={"Content-Type": "application/json"})
    try:
        return json.load(urllib.request.urlopen(req, timeout=60))
    except urllib.error.HTTPError as e:
        raise SystemExit("Google said: " + e.read().decode()[:400])


voices = [v for v in call("voices?languageCode=he-IL")["voices"] if "Chirp3-HD" in v["name"]]
if not voices:
    raise SystemExit("No Chirp 3 HD Hebrew voices found. Send Claude a screenshot.")
print(f"Found {len(voices)} Hebrew voices. Recording a sample of each...")


def rec(v):
    r = call("text:synthesize", {"input": {"text": SAMPLE},
                                 "voice": {"languageCode": "he-IL", "name": v["name"]},
                                 "audioConfig": {"audioEncoding": "MP3"}})
    short = v["name"].split("-")[-1]
    open(os.path.join(OUT, short + ".mp3"), "wb").write(base64.b64decode(r["audioContent"]))
    return short, v.get("ssmlGender", "").title()


with cf.ThreadPoolExecutor(6) as ex:
    done = sorted(ex.map(rec, voices), key=lambda x: (x[1], x[0]))

cards = "".join(
    f"<div class=c><b>{html.escape(n)}</b><small>{'👩 Female' if g == 'Female' else '👨 Male'}</small>"
    f"<button onclick=\"new Audio('google_voices/{n}.mp3').play()\">▶ Play</button></div>" for n, g in done)
page = ("<meta charset=utf-8><style>body{font:18px -apple-system;padding:20px}"
        ".g{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px}"
        ".c{border:1px solid #ddd;border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:6px}"
        "button{font-size:18px;padding:6px}</style>"
        "<h2>Google Hebrew voices</h2><p>Each says: Todah. Shalom. Baruch Atah. Modeh Ani... Shema Yisrael.<br>"
        "Pick your favorite girl voice and your favorite boy voice.</p>"
        f"<div class=g>{cards}</div>")
p = os.path.join(os.getcwd(), "google_voices.html")
open(p, "w", encoding="utf-8").write(page)
subprocess.run(["open", p])
print("Done. A page opened in your browser.")
