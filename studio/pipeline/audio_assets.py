"""Original music beds + sound effects for the Vantier Reels (synthesized, fully owned).

Three minimal, premium beds tuned to sit under a voice-over:
  pulse  96 BPM  D minor   tension / problem-driven reels
  glass  84 BPM  C major   reflective / educational reels
  drive 112 BPM  E minor   confident playbooks and lists
Plus a small SFX kit (whoosh, swipe, tick, pop, ding, impact, riser).

Usage: python3 pipeline/audio_assets.py   -> public/audio/music/*.wav, public/audio/sfx/*.wav
"""
import os
import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt, fftconvolve

SR = 48000
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
rng = np.random.default_rng(7)


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def env_adsr(n, a, d, s, r, sr=SR):
    a, d, r = int(a * sr), int(d * sr), int(r * sr)
    sus = max(0, n - a - d - r)
    e = np.concatenate([np.linspace(0, 1, max(1, a)), np.linspace(1, s, max(1, d)), np.full(sus, s), np.linspace(s, 0, max(1, r))])
    return e[:n] if len(e) >= n else np.pad(e, (0, n - len(e)))


def saw(f, n, detune=0.0):
    t = np.arange(n) / SR
    out = np.zeros(n)
    k = 1
    while k * f < 9000 and k < 40:  # band-limited additive saw
        out += np.sin(2 * np.pi * k * f * (1 + detune) * t + rng.uniform(0, 6.28)) / k
        k += 1
    return out * 0.6


def lp(x, fc, order=2):
    sos = butter(order, min(fc, SR / 2 - 100) / (SR / 2), btype="low", output="sos")
    return sosfilt(sos, x)


def hp(x, fc, order=2):
    sos = butter(order, fc / (SR / 2), btype="high", output="sos")
    return sosfilt(sos, x)


def bp(x, lo, hi, order=2):
    sos = butter(order, [lo / (SR / 2), hi / (SR / 2)], btype="band", output="sos")
    return sosfilt(sos, x)


def reverb_ir(seconds=2.6, decay=3.2):
    n = int(seconds * SR)
    t = np.arange(n) / SR
    L = rng.standard_normal(n) * np.exp(-decay * t)
    R = rng.standard_normal(n) * np.exp(-decay * t)
    L, R = lp(L, 6000), lp(R, 5500)
    return L / np.abs(L).sum() * 30, R / np.abs(R).sum() * 30


IR = reverb_ir()


def verb(x, wet=0.25):
    L = fftconvolve(x, IR[0])[: len(x)]
    R = fftconvolve(x, IR[1])[: len(x)]
    return np.stack([x * (1 - wet) + L * wet, x * (1 - wet) + R * wet], 1)


def place(buf, sig, t):
    i = int(t * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(sig))
    buf[i:j] += sig[: j - i]


def pad_chord(notes, dur, bright=1400):
    n = int(dur * SR)
    x = sum(saw(midi(m), n, d) for m in notes for d in (-0.004, 0.004))
    x = lp(x, bright, 2) * env_adsr(n, 0.9, 0.5, 0.85, 1.2)
    return x / (len(notes) * 2)


def pluck(f, dur=0.5, bright=1.0):
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = (np.sin(2 * np.pi * f * t) + 0.35 * bright * np.sin(2 * np.pi * 2 * f * t) + 0.12 * bright * np.sin(2 * np.pi * 3 * f * t))
    return x * np.exp(-t * 7.5) * env_adsr(n, 0.004, 0.05, 0.9, 0.08)


def piano(f, dur=1.8):
    n = int(dur * SR)
    t = np.arange(n) / SR
    parts = [(1, 1.0, 2.2), (2, 0.45, 3.0), (3, 0.22, 4.0), (4, 0.1, 5.0), (5.02, 0.05, 6.5)]
    x = sum(a * np.sin(2 * np.pi * f * k * t) * np.exp(-t * dcy) for k, a, dcy in parts)
    hammer = lp(rng.standard_normal(n) * np.exp(-t * 60), 2500) * 0.05
    return (x + hammer) * env_adsr(n, 0.003, 0.05, 1.0, 0.25)


def kick(dur=0.45, level=1.0):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = 45 + 75 * np.exp(-t * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 9) * level


def hat(dur=0.06, level=1.0):
    n = int(dur * SR)
    t = np.arange(n) / SR
    return hp(rng.standard_normal(n), 7000) * np.exp(-t * 70) * level


def clap(level=1.0):
    n = int(0.25 * SR)
    t = np.arange(n) / SR
    x = bp(rng.standard_normal(n), 900, 4000) * (np.exp(-t * 25) + 0.4 * np.exp(-((t - 0.012) ** 2) / 1e-5))
    return x * level


def sub(f, dur, level=1.0):
    n = int(dur * SR)
    t = np.arange(n) / SR
    return np.sin(2 * np.pi * f * t) * env_adsr(n, 0.01, 0.12, 0.6, 0.08) * level


def master(stereo, target_peak=0.8):
    stereo = np.tanh(stereo * 1.15) / np.tanh(1.15)
    return stereo / (np.abs(stereo).max() + 1e-9) * target_peak


def sidechain(n, beat_times, depth=0.45, rel=0.22):
    g = np.ones(n)
    for bt in beat_times:
        i = int(bt * SR)
        k = int(rel * SR)
        if i >= n:
            continue
        seg = 1 - depth * np.exp(-np.arange(min(k, n - i)) / (rel * SR / 4))
        g[i:i + len(seg)] = np.minimum(g[i:i + len(seg)], seg)
    return g


def track(name, bpm, prog, bars=24, style="pulse"):
    beat = 60 / bpm
    bar = beat * 4
    total = bars * bar + 2.5
    n = int(total * SR)
    pads, bass, perc, top = np.zeros(n), np.zeros(n), np.zeros(n), np.zeros(n)
    kicks = []
    for b in range(bars):
        chord = prog[b % len(prog)]
        t0 = b * bar
        intro = b < 2
        place(pads, pad_chord([c + 12 for c in chord[1:]], bar + 1.2, 1100 if style == "glass" else 1500) * (0.6 if intro else 1.0), t0)
        root = chord[0]
        for s in range(8 if style != "drive" else 16):
            step = beat / (2 if style != "drive" else 4)
            t = t0 + s * step
            if style == "glass":
                if s % 4 == 0:
                    place(bass, sub(midi(root), beat * 1.8, 0.8), t)
            elif not intro or s % 2 == 0:
                place(bass, sub(midi(root), step * 0.9, 0.85 if s % 2 == 0 else 0.55), t)
        for q in range(4):
            t = t0 + q * beat
            if style == "drive":
                if not intro:
                    place(perc, kick(level=0.9), t); kicks.append(t)
                if q in (1, 3) and b >= 4:
                    place(perc, clap(0.35), t)
                place(perc, hat(level=0.22), t + beat / 2)
            elif style == "pulse":
                if q in (0, 2) and not intro:
                    place(perc, kick(level=0.8), t); kicks.append(t)
                place(perc, hat(level=0.16), t + beat / 2)
            else:  # glass
                if q == 0 and b >= 2:
                    place(perc, kick(level=0.45), t); kicks.append(t)
                if q in (1, 3) and b >= 4:
                    place(perc, bp(rng.standard_normal(int(0.18 * SR)), 1500, 6000) * np.exp(-np.arange(int(0.18 * SR)) / SR * 22) * 0.12, t)
        # top line
        tones = [c + 24 for c in chord[1:]]
        if style == "glass":
            for i, step in enumerate([0, 1.5, 2, 3]):
                place(top, piano(midi(tones[i % len(tones)])) * 0.5, t0 + step * beat)
        elif style == "pulse":
            if b >= 4:
                for s in range(8):
                    if s in (0, 3, 5, 6):
                        place(top, pluck(midi(tones[s % len(tones)] + 12), 0.4, 0.6) * 0.35, t0 + s * beat / 2)
        else:
            if b >= 2:
                for s in range(16):
                    if s % 3 == 0:
                        place(top, pluck(midi(tones[s % len(tones)] + 12), 0.25, 1.0) * 0.3, t0 + s * beat / 4)
    g = sidechain(n, kicks, 0.5 if style == "drive" else 0.35)
    pads *= g
    bass = lp(bass, 220) * g
    dry = pads * 0.55 + bass * 0.9 + perc * 0.6 + top * 0.5
    st = verb(pads * 0.55 + top * 0.6, 0.38) + np.stack([bass * 0.9 + perc * 0.55] * 2, 1)
    fade = np.ones(n)
    fade[: int(0.8 * SR)] = np.linspace(0, 1, int(0.8 * SR))
    st *= fade[:, None]
    st = master(st)
    os.makedirs(os.path.join(ROOT, "public/audio/music"), exist_ok=True)
    sf.write(os.path.join(ROOT, f"public/audio/music/{name}.wav"), st.astype(np.float32), SR)
    print(name, f"{total:.1f}s")


def sfx():
    out = os.path.join(ROOT, "public/audio/sfx")
    os.makedirs(out, exist_ok=True)

    def save(name, x, stereo=None):
        x = x / (np.abs(x).max() + 1e-9) * 0.9
        st = stereo if stereo is not None else np.stack([x, x], 1)
        sf.write(os.path.join(out, name + ".wav"), st.astype(np.float32), SR)

    def whoosh(dur, lo, hi, name):
        n = int(dur * SR)
        t = np.linspace(0, 1, n)
        noise = rng.standard_normal(n)
        # sweep a band-pass by blending fixed bands
        bands = [bp(noise, f * 0.7, f * 1.3) for f in np.geomspace(lo, hi, 6)]
        w = np.stack([np.exp(-((t - k / 5) ** 2) / 0.02) for k in range(6)])
        x = (np.stack(bands) * w).sum(0)
        e = np.sin(np.pi * t) ** 2.2
        x = x * e
        pan = t
        save(name, x, np.stack([x * (1 - pan * 0.6), x * (0.4 + pan * 0.6)], 1) / (np.abs(x).max() + 1e-9) * 0.9)

    whoosh(0.5, 300, 3500, "whoosh")
    whoosh(0.65, 180, 1600, "whoosh_low")
    whoosh(0.22, 1200, 7000, "swipe")
    n = int(0.06 * SR); t = np.arange(n) / SR
    save("tick", np.sin(2 * np.pi * 2600 * t) * np.exp(-t * 140) + hp(rng.standard_normal(n), 4000) * np.exp(-t * 400) * 0.4)
    n = int(0.18 * SR); t = np.arange(n) / SR
    f = 880 + 500 * (t < 0.05)
    save("pop", np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 22))
    n = int(0.9 * SR); t = np.arange(n) / SR
    save("ding", (np.sin(2 * np.pi * 1318.5 * t) + 0.6 * np.sin(2 * np.pi * 1975.5 * t) * (t > 0.09)) * np.exp(-t * 5.5))
    n = int(0.9 * SR); t = np.arange(n) / SR
    fb = 34 + 40 * np.exp(-t * 18)
    save("impact", np.sin(2 * np.pi * np.cumsum(fb) / SR) * np.exp(-t * 5) + lp(rng.standard_normal(n), 1800) * np.exp(-t * 30) * 0.5)
    n = int(1.0 * SR); t = np.arange(n) / SR
    save("riser", (bp(rng.standard_normal(n), 800, 6000) * 0.5 + np.sin(2 * np.pi * (300 + 900 * t ** 2) * t) * 0.3) * (t ** 2) * np.exp(-((t - 1) ** 2) * 0))
    print("sfx ok")


if __name__ == "__main__":
    track("pulse", 96, [[38, 50, 53, 57, 60], [34, 46, 50, 53, 57], [41, 53, 57, 60, 64], [36, 48, 52, 55, 59]], bars=18, style="pulse")
    track("glass", 84, [[36, 48, 52, 55, 59], [33, 45, 48, 52, 55], [41, 53, 57, 60, 64], [43, 55, 59, 62, 64]], bars=16, style="glass")
    track("drive", 112, [[40, 52, 55, 59, 62], [36, 48, 52, 55, 59], [43, 55, 59, 62, 66], [38, 50, 54, 57, 62]], bars=20, style="drive")
    sfx()
