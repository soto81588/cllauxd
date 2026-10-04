"""Final audio mix per Reel: voice-over + ducked music bed + sound design.

- VO normalized to about -16 LUFS; music sits about 8 dB under it in pauses and is
  ducked a further 6 dB while the narrator speaks (VO stays crystal clear).
- SFX cues come from the scene plan (cut whooshes, UI pops/dings, ticks on
  data reveals, a low impact on big numbers) and are kept quiet.
- Master normalized to -14 LUFS (Instagram) with a -1.5 dBTP true-peak ceiling.
Outputs out/<ID>_mix.wav and out/<ID>_vo-sfx.wav (no music, for swapping in
trending audio inside the Instagram app).

Usage: python3 pipeline/mix.py [R01 ...]
"""
import json, math, os, sys
import numpy as np
import soundfile as sf
import pyloudnorm as pyln
from scipy.signal import resample_poly

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.environ.get("OUT_DIR", os.path.join(ROOT, "out"))
SR = 48000
FPS = 30
meter = pyln.Meter(SR)

SFX_GAIN_DB = {"whoosh": -21, "whoosh_low": -21, "swipe": -23, "tick": -25, "pop": -23, "ding": -25, "impact": -19, "riser": -24}
SCENE_SFX = {
    "title": "whoosh", "illus": "whoosh_low", "photo": "whoosh_low", "phone": "swipe", "stat": "impact",
    "list": "tick", "split": "tick", "bars": "tick", "math": "tick", "flow": "tick", "timer": "tick", "quote": "pop",
    "line": "tick", "calendar": "tick", "budget": "tick", "timeline": "tick", "grid": "tick", "dots": "tick", "cta": "impact",
}


def load(path):
    x, sr = sf.read(path, dtype="float32", always_2d=True)
    if sr != SR:
        g = math.gcd(sr, SR)
        x = resample_poly(x, SR // g, sr // g, axis=0).astype(np.float32)
    return x


SFX = {k: load(os.path.join(ROOT, f"public/audio/sfx/{k}.wav")) for k in SFX_GAIN_DB}
MUSIC = {k: load(os.path.join(ROOT, f"public/audio/music/{k}.wav")) for k in ("pulse", "glass", "drive")}


def lufs_gain(x, target):
    l = meter.integrated_loudness(x)
    return 10 ** ((target - l) / 20) if np.isfinite(l) else 1.0


def envelope(mono, att=0.03, rel=0.35):
    hop = int(0.01 * SR)
    n = int(math.ceil(len(mono) / hop))
    padded = np.pad(mono, (0, n * hop - len(mono)))
    rms = np.sqrt(np.mean(padded.reshape(n, hop) ** 2, axis=1) + 1e-12)
    rms = np.clip(rms / (np.percentile(rms, 95) + 1e-9), 0, 1)
    env = np.zeros_like(rms)
    a, r = math.exp(-0.01 / att), math.exp(-0.01 / rel)
    for i in range(1, n):
        c = a if rms[i] > env[i - 1] else r
        env[i] = c * env[i - 1] + (1 - c) * rms[i]
    return np.repeat(env, hop)[: len(mono)]


def limit(x, ceiling=0.84, look=0.005, rel=0.08):
    """Look-ahead true-peak limiter (instant attack inside the look-ahead window, smooth release).
    Peaks are detected on a 4x oversampled copy so inter-sample overs don't survive the AAC encode."""
    from scipy.ndimage import minimum_filter1d
    from scipy.signal import lfilter
    up = np.abs(resample_poly(x, 4, 1, axis=0)).max(axis=1)
    peak = np.maximum(np.abs(x).max(axis=1), up[: 4 * len(x)].reshape(-1, 4).max(axis=1))
    need = np.minimum(1.0, ceiling / np.maximum(peak, 1e-9))
    w = int(look * SR) * 2 + 1
    g = minimum_filter1d(need, size=w, origin=0)
    a = math.exp(-1 / (rel * SR))
    # release smoothing: follow drops immediately, recover slowly
    sm = lfilter([1 - a], [1, -a], g)
    g = np.minimum(g, sm)
    return x * g[:, None]


def master_to(x, target=-14.0):
    for _ in range(3):
        x = x * lufs_gain(x, target)
        x = limit(x)
    return x


def sfx_cues(reel, timing):
    cues = []
    for i, (b, tb) in enumerate(zip(reel["beats"], timing["beats"])):
        s = b["scene"]
        t0 = tb["scene_s"]
        dur = int(round((tb["scene_e"] - tb["scene_s"]) * FPS))
        kind = SCENE_SFX.get(s["t"])
        if i == 0:
            cues.append(("impact", 0.0, -4))
        elif kind:
            cues.append((kind, max(0, t0 - (0.12 if kind.startswith("whoosh") or kind == "swipe" else 0)), 0))
        if s["t"] == "phone":
            d = s.get("data", {})
            if s["ui"] in ("sms", "dm"):
                msgs = d.get("msgs", [])
                step = min(30, max(14, (dur - 10) // max(1, len(msgs))))
                for k, (who, _) in enumerate(msgs):
                    cues.append(("ding" if who == "them" else "pop", t0 + (6 + k * step) / FPS, -2))
            elif s["ui"] == "notif":
                items = d.get("items", [])
                step = min(9, dur // (len(items) + 2))
                for k in range(len(items)):
                    cues.append(("pop", t0 + (4 + k * step) / FPS, -3))
            elif s["ui"] == "missed":
                for k in range(len(d.get("calls", []))):
                    cues.append(("tick", t0 + (4 + k * min(10, dur // 6)) / FPS, 0))
            elif s["ui"] in ("booking", "boost", "profile", "site"):
                cues.append(("tick", t0 + (dur * 0.45) / FPS, 0))
        if s["t"] == "list" and s.get("hl") is None and s.get("mode") != "plain":
            n = len(s["items"])
            step = min(14, max(6, int(dur * 0.55 / n)))
            for k in range(1, n):
                cues.append(("tick", t0 + (3 + k * step) / FPS, -2))
    return cues


def mix(reel):
    rid = reel["id"]
    timing = json.load(open(os.path.join(ROOT, f"public/data/timing/{rid}.json")))
    vo = load(os.path.join(ROOT, f"public/audio/vo/{rid}.wav"))[:, 0]
    n = int(timing["duration"] * SR)
    vo = np.pad(vo, (0, max(0, n - len(vo))))[:n]
    vo *= lufs_gain(np.stack([vo, vo], 1), -16)

    mus = MUSIC[reel.get("music", "glass")]
    mus = np.pad(mus, ((0, max(0, n - len(mus))), (0, 0)))[:n].copy()
    mus *= lufs_gain(mus, -24)
    fade_in, fade_out = int(0.25 * SR), int(1.6 * SR)
    mus[:fade_in] *= np.linspace(0, 1, fade_in)[:, None]
    mus[-fade_out:] *= np.linspace(1, 0, fade_out)[:, None]
    duck = 1 - 0.5 * envelope(vo)
    mus *= duck[:, None]

    fx = np.zeros((n, 2), dtype=np.float32)
    for name, t, extra in sfx_cues(reel, timing):
        clip = SFX[name] * (10 ** ((SFX_GAIN_DB[name] + extra) / 20))
        i = int(t * SR)
        if i >= n:
            continue
        j = min(n, i + len(clip))
        fx[i:j] += clip[: j - i]

    voice = np.stack([vo, vo], 1)
    master = master_to(voice + mus + fx)
    stem = master_to(voice + fx)
    os.makedirs(OUT, exist_ok=True)
    sf.write(os.path.join(OUT, f"{rid}_mix.wav"), master.astype(np.float32), SR)
    sf.write(os.path.join(OUT, f"{rid}_vo-sfx.wav"), stem.astype(np.float32), SR)
    return meter.integrated_loudness(master), np.abs(master).max()


if __name__ == "__main__":
    plan = json.load(open(os.path.join(ROOT, "public/data/plan.json")))
    want = set(sys.argv[1:])
    for r in plan["reels"]:
        if want and r["id"] not in want:
            continue
        l, p = mix(r)
        print(f"{r['id']}: {l:.1f} LUFS, peak {20 * math.log10(p):.1f} dBFS")
