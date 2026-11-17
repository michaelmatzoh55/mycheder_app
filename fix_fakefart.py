"""ThunderCheeks: stop calling real farts fake.
1) Phone tilt is only measured DURING the fart (picking the phone up afterwards no longer counts as "raised to mouth").
2) Tilt is a small hint, not the main judge. The sideways-shake sensor is dropped (iPhone and Android report it differently).
3) Sound check gives real phone-mic farts proper credit (they have more mid/high sound than the old math allowed).
4) "Busted" names only for clearly fake sounds."""
import os, shutil, time, sys

P = os.path.expanduser("~/Documents/GitHub/thunder-cheeks/src/App.jsx")
if len(sys.argv) > 1:
    P = sys.argv[1]
src = open(P, encoding="utf-8").read()
if "FAKE_FIX_V1" in src:
    print("ALREADY DONE"); sys.exit(0)

R = []
# 1. ignore tilt/motion samples once the fart is over
R.append(("""      const onOrient = (e) => {
        if (e.beta === null || e.beta === undefined) return;
        const d = motionDataRef.current;""",
"""      const onOrient = (e) => {
        if (e.beta === null || e.beta === undefined) return;
        /* FAKE_FIX_V1: only the fart itself counts, not lifting the phone afterwards */
        if (soundLastSeenRef.current && Date.now() - soundLastSeenRef.current > 250) return;
        const d = motionDataRef.current;"""))
R.append(("""        const y = e.accelerationIncludingGravity?.y;
        if (y === null || y === undefined) return;
        const d = motionDataRef.current;""",
"""        const y = e.accelerationIncludingGravity?.y;
        if (y === null || y === undefined) return;
        if (soundLastSeenRef.current && Date.now() - soundLastSeenRef.current > 250) return;
        const d = motionDataRef.current;"""))

# 2. sound check tuned for phone mics
R.append(("""      const centScore = spectralCentroid < 300  ? 100
        : spectralCentroid < 600  ? Math.max(0, 100 - (spectralCentroid - 300) * 0.15)
        : spectralCentroid < 1200 ? Math.max(0, 55  - (spectralCentroid - 600) * 0.08)
        : spectralCentroid < 2000 ? Math.max(0, 7   - (spectralCentroid - 1200) * 0.009)
        : 0;""",
"""      const centScore = spectralCentroid < 450  ? 100
        : spectralCentroid < 900  ? 100 - (spectralCentroid - 450) * 0.1
        : spectralCentroid < 1600 ? 55  - (spectralCentroid - 900) * 0.064
        : spectralCentroid < 2400 ? Math.max(0, 10 - (spectralCentroid - 1600) * 0.0125)
        : 0;"""))
R.append(("""      const bassScore = Math.min(100, bassConc * 450);""",
"""      const bassScore = Math.min(100, bassConc * 600);"""))
R.append(("""      const highPenalty = Math.max(0, 100 - highFrac * 200);""",
"""      const highPenalty = Math.max(0, 100 - Math.max(0, highFrac - 0.25) * 220);"""))

# 3. tilt = small hint only, based on the screen-tilt sensor
R.append(("""        const raisedEvidence  = Math.max(0, betaSignal * 0.8) + Math.max(0, accSignal * 3);
        const loweredEvidence = Math.max(0, -betaSignal * 0.8) + Math.max(0, -accSignal * 3);

        if (raisedEvidence > loweredEvidence && raisedEvidence > 3) {
          phoneScore = Math.max(0, 35 - raisedEvidence * 3);""",
"""        const raisedEvidence  = Math.max(0, betaSignal);
        const loweredEvidence = Math.max(0, -betaSignal);

        if (raisedEvidence > loweredEvidence && raisedEvidence > 12) {
          phoneScore = Math.max(20, 50 - raisedEvidence * 1.5);"""))
R.append(("""        } else if (loweredEvidence > raisedEvidence && loweredEvidence > 2) {
          phoneScore = Math.min(100, 72 + loweredEvidence * 4);""",
"""        } else if (loweredEvidence > raisedEvidence && loweredEvidence > 8) {
          phoneScore = Math.min(100, 75 + loweredEvidence * 2);"""))
R.append(("""          phoneScore = 60;
          positionLabel = "PHONE STEADY 📱"; positionColor = "#FF9800";""",
"""          phoneScore = 65;
          positionLabel = "PHONE STEADY 📱"; positionColor = "#FF9800";"""))
R.append(("""      const hasMotion = hasBeta || hasAccY;
      authenticityScore = hasMotion
        ? Math.min(spectralAuth + 15, Math.round(phoneScore * 0.35 + spectralAuth * 0.65))
        : spectralAuth;""",
"""      const hasMotion = hasBeta;
      authenticityScore = hasMotion
        ? Math.min(spectralAuth + 12, Math.round(phoneScore * 0.25 + spectralAuth * 0.75))
        : spectralAuth;"""))
# 4. joke "fake" names only when clearly fake
R.append(("""    const isSuspect  = auth < 42;""", """    const isSuspect  = auth < 30;"""))

missing = [i + 1 for i, (a, _) in enumerate(R) if src.count(a) != 1]
if missing:
    print("ABORT: could not find part(s)", missing, "- nothing was changed."); sys.exit(1)
bak = P + ".bak_fakefix_%d" % time.time()
shutil.copy(P, bak)
for a, b in R:
    src = src.replace(a, b, 1)
open(P, "w", encoding="utf-8").write(src)
print("OK: fake-fart fix applied (backup: %s)" % os.path.basename(bak))
