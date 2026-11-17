"""My Cheder: hear Hila in a few different styles and pick one. Run from the my-cheder folder."""
import asyncio, os, html, subprocess
import edge_tts

VOICE = "he-IL-HilaNeural"
OUT = os.path.join(os.getcwd(), "voice_styles")
os.makedirs(OUT, exist_ok=True)

SAMPLES = [("תודה", "to-DAH"), ("שלום", "sha-LOM"), ("ברוך", "ba-RUCH"),
           ("מודה אני לפניך מלך חי וקים", "Modeh ani..."),
           ("שמע ישראל", "Shema Yisrael")]

STYLES = [  # letter, description, rate, pitch
    ("A", "now", "-10%", "+0Hz"),
    ("B", "a little brighter", "-10%", "+12Hz"),
    ("C", "younger, kid-like", "-8%", "+28Hz"),
    ("D", "softer and slower", "-22%", "+5Hz"),
    ("E", "a little deeper", "-10%", "-14Hz"),
]


async def rec(text, rate, pitch, path):
    for _ in range(3):
        try:
            await edge_tts.Communicate(text, VOICE, rate=rate, pitch=pitch).save(path)
            return
        except Exception:
            await asyncio.sleep(2)


async def main():
    print("Recording samples...")
    await asyncio.gather(*(rec(t, r, p, os.path.join(OUT, f"{n}{s}.mp3"))
                           for n, (t, _) in enumerate(SAMPLES) for s, _, r, p in STYLES))
    head = "".join(f"<th>{s}<br><small>{html.escape(d)}</small></th>" for s, d, _, _ in STYLES)
    rows = "".join(
        f"<tr><td class=he>{t}</td><td>{html.escape(say)}</td>"
        + "".join(f"<td><button onclick=\"new Audio('voice_styles/{n}{s}.mp3').play()\">▶ {s}</button></td>" for s, _, _, _ in STYLES)
        + "</tr>" for n, (t, say) in enumerate(SAMPLES))
    page = ("<meta charset=utf-8><style>body{font:18px -apple-system;padding:20px}td,th{padding:8px 12px;border-bottom:1px solid #ddd}"
            ".he{font-size:26px;direction:rtl}button{font-size:18px;padding:6px 14px}</style>"
            f"<h2>Which Hila do you like best?</h2><table><tr><th>Hebrew</th><th>Sounds like</th>{head}</tr>{rows}</table>")
    p = os.path.join(os.getcwd(), "voice_styles.html")
    open(p, "w", encoding="utf-8").write(page)
    subprocess.run(["open", p])
    print("Done. A page opened in your browser.")


asyncio.run(main())
