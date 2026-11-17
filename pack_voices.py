"""My Cheder: bundle the ~9,000 little voice clips into ~70 bigger files so Vercel can upload them.
The app reads each word out of its bundle. Run from the my-cheder folder. Safe to run again."""
import json, os, re, zlib, glob

H = os.getcwd()
WORDS = json.load(open(os.path.join(H, "words.json"), encoding="utf-8"))
VPK, total, nfiles = {}, 0, 0
for vd in ("b", "g"):
    folder = os.path.join(H, "voice", vd)
    for old in glob.glob(os.path.join(folder, "p_*.bin")):
        os.remove(old)
    groups = {}
    for w in WORDS:
        p = os.path.join(folder, w["h"] + ".mp3")
        if os.path.exists(p) and os.path.getsize(p) > 0:
            groups.setdefault(w["h"][0], []).append(w["h"])
    idx = {}
    for k, hs in sorted(groups.items()):
        blob, parts = bytearray(), []
        for h in sorted(hs):
            data = open(os.path.join(folder, h + ".mp3"), "rb").read()
            parts.append((h, len(blob), len(data)))
            blob += data
        stem = f"{k}.{zlib.crc32(bytes(blob)) & 0xffffff:06x}"
        open(os.path.join(folder, f"p_{stem}.bin"), "wb").write(blob)
        total += len(blob); nfiles += 1
        for h, off, ln in parts:
            idx[h] = [stem, off, ln]
    VPK[vd] = idx
open(os.path.join(H, "voice", "vpk.js"), "w").write("window.VPK=" + json.dumps(VPK, separators=(",", ":")) + ";")
print(f"  Bundled {sum(len(v) for v in VPK.values())} clips into {nfiles} files ({total/1e6:.1f} MB).")

# index.html: load the bundle map right after vox.js
idx_path = os.path.join(H, "index.html")
s = open(idx_path, encoding="utf-8").read()
if "voice/vpk.js" not in s:
    s = s.replace('<script src="voice/vox.js"></script>', '<script src="voice/vox.js"></script>\n<script src="voice/vpk.js"></script>', 1)
    open(idx_path, "w", encoding="utf-8").write(s)

# hila.js: read each word out of its bundle
hj = os.path.join(H, "hila.js")
s = open(hj, encoding="utf-8").read()
if "VPK_V1" not in s:
    old = re.search(r'  const p=fetch\("voice/"\+h\+"\.mp3[^"]*"\)\.then\(r=>\{ if\(!r\.ok&&r\.status!==0\) throw 0; return r\.arrayBuffer\(\) \}\)', s)
    if not old or "function load(c,h0)" not in s:
        raise SystemExit("ABORT: hila.js is not the version I expected. Send Claude a screenshot.")
    s = s[:old.start()] + '  const p=raw(vd,h0)' + s[old.end():]
    s = s.replace("function load(c,h0){",
        "/* VPK_V1: words come out of bundle files */ const PK=new Map();\n"
        "function raw(vd,h0){ const ix=window.VPK&&VPK[vd]&&VPK[vd][h0];\n"
        "  if(!ix) return fetch(\"voice/\"+vd+\"/\"+h0+\".mp3\").then(r=>{ if(!r.ok&&r.status!==0) throw 0; return r.arrayBuffer() });\n"
        "  const f=\"voice/\"+vd+\"/p_\"+ix[0]+\".bin\"; let pp=PK.get(f);\n"
        "  if(!pp){ pp=fetch(f).then(r=>{ if(!r.ok&&r.status!==0) throw 0; return r.arrayBuffer() }); PK.set(f,pp); pp.catch(()=>PK.delete(f)) }\n"
        "  return pp.then(b=>b.slice(ix[1],ix[1]+ix[2])) }\n"
        "function load(c,h0){", 1)
    open(hj, "w", encoding="utf-8").write(s)
    print("  hila.js reads from the bundles.")

# sw.js: save the bundles for offline use
sw = os.path.join(H, "sw.js")
s = open(sw, encoding="utf-8").read()
if "VPK_V1" not in s:
    a = s.find("async function saveVoice(){"); b = s.find('self.addEventListener("fetch"', a)
    if a < 0 or b < 0:
        raise SystemExit("ABORT: sw.js is not the version I expected. Send Claude a screenshot.")
    s = s[:a] + ('async function saveVoice(){ /* VPK_V1 */ try{ const t=await (await fetch("voice/vpk.js",{cache:"no-store"})).text(); const P=JSON.parse(t.slice(t.indexOf("{"),t.lastIndexOf("}")+1)); const c=await caches.open(VOICE);\n'
                 '  for(const vd of Object.keys(P)){ const fs=new Set(Object.values(P[vd]).map(x=>x[0])); for(const k of fs){ const u="voice/"+vd+"/p_"+k+".bin"; if(await c.match(u)) continue; try{ const r=await fetch(u); if(r.ok) await c.put(u,r) }catch(err){ return } } } }catch(err){} }\n') + s[b:]
    s = s.replace('url.pathname.endsWith(".mp3")', '/\\.(mp3|bin)$/.test(url.pathname)')
    s = re.sub(r'VOICE="my-cheder-voice[^"]*"', 'VOICE="my-cheder-voice-5"', s)
    open(sw, "w", encoding="utf-8").write(s)
    print("  sw.js saves the bundles for offline use.")

# .vercelignore: upload the bundles, not the 9,000 little files
vi = os.path.join(H, ".vercelignore")
lines = open(vi).read().split("\n") if os.path.exists(vi) else []
for x in ["voice/b/*.mp3", "voice/g/*.mp3", "voice/*.mp3", "voice/times.json", "voice/mode.txt", "voice/gmode.txt",
          "voice_test", "voice_test.html", "google_voices", "google_voices.html", "voice_styles", "voice_styles.html",
          "*.py", "*.zip", "words.json", ".git"]:
    if x not in lines:
        lines.append(x)
open(vi, "w").write("\n".join(l for l in lines if l) + "\n")
print("Done! Ready to upload.")
