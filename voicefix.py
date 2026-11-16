"""My Cheder voice fix: Hila reads each word from plain Hebrew letters (no vowel marks),
which she pronounces correctly (to-DAH, not tv-dah). Run from the my-cheder folder."""
import os, re

H = os.getcwd()
mv = os.path.join(H, "make_voice.py")
t = open(mv, encoding="utf-8").read()

if "def say(" not in t:
    helper = '''
MODE = "plain-1"
_POINTS = re.compile(r"[\\u0591-\\u05bd\\u05bf\\u05c1-\\u05c2\\u05c4-\\u05c7]")
_KEEP = {"יי", "יהוה", "אדני", "אלהים", "אלקים", "אלוקים", "אלהי", "אלקי"}


def say(text):
    """What Hila is given to read: the word without vowel marks.
    Single letters and names of Hashem keep their vowels, so they sound as before."""
    plain = _POINTS.sub("", text)
    if len(plain) <= 1 or plain in _KEEP:
        return text
    return plain


_MODE_FILE = os.path.join(OUT, "mode.txt")
if not os.path.exists(_MODE_FILE) or open(_MODE_FILE).read().strip() != MODE:
    TIMES = {}  # new way of reading: record every word again
    open(_MODE_FILE, "w").write(MODE)
'''
    anchor = "TIMES = json.load(open(TIMES_FILE)) if os.path.exists(TIMES_FILE) else {}\n"
    if anchor not in t:
        raise SystemExit("Could not find the spot in make_voice.py. Send Claude a screenshot.")
    t = t.replace(anchor, anchor + helper, 1)
    t = t.replace("edge_tts.Communicate(text,", "edge_tts.Communicate(say(text),")
    open(mv, "w", encoding="utf-8").write(t)
    print("make_voice.py: Hila now reads plain Hebrew letters.")
else:
    print("make_voice.py already fixed.")

# Phones must forget the old recordings
sw = os.path.join(H, "sw.js")
if os.path.exists(sw):
    s = open(sw, encoding="utf-8").read()
    s2 = re.sub(r'VOICE="my-cheder-voice[^"]*"', 'VOICE="my-cheder-voice-2"', s)
    if s2 != s:
        open(sw, "w", encoding="utf-8").write(s2)
        print("sw.js: old recordings will be cleared from phones.")
hj = os.path.join(H, "hila.js")
if os.path.exists(hj):
    s = open(hj, encoding="utf-8").read()
    s2 = s.replace('fetch("voice/"+h+".mp3")', 'fetch("voice/"+h+".mp3?v=2")')
    if s2 != s:
        open(hj, "w", encoding="utf-8").write(s2)
        print("hila.js: loads the new recordings.")
