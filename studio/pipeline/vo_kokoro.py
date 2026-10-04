"""Voice-over + caption timing for every Reel (Kokoro TTS, Apache-2.0).

Each beat (one sentence/phrase) is synthesized separately, trimmed and joined
with natural pauses, so scene cuts land exactly on the narration. Word timings
inside a beat come from detected pauses (anchored to punctuation) plus
phoneme-weighted spacing. Output:
  public/audio/vo/<ID>.wav         narration (24 kHz mono)
  public/data/timing/<ID>.json     beats, words and caption chunks (seconds)

Usage: python3 pipeline/vo_kokoro.py [R01 R02 ...]
"""
import json, os, re, sys
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.environ.get("KOKORO_DIR", "/tmp/claude-0/-home-user-cllauxd/4043b8c2-8dc3-50ee-8daa-d0bc39a2e959/scratchpad/kokoro")
VOICE = os.environ.get("VO_VOICE", "af_heart")
SPEED = float(os.environ.get("VO_SPEED", "1.06"))
SR = 24000
LEAD_IN, GAP_SENT, GAP_SOFT, TAIL = 0.12, 0.30, 0.16, 1.4

# Spoken-form fixes for the TTS engine only (captions keep the written form).
TTS_FIX = [(r"\bten p\.m\.", "ten PM")]

kokoro = Kokoro(os.path.join(MODEL_DIR, "kokoro-v1.0.onnx"), os.path.join(MODEL_DIR, "voices-v1.0.bin"))


def trim(a, thresh_db=-42):
    if len(a) == 0:
        return a
    env = np.abs(a)
    th = env.max() * (10 ** (thresh_db / 20))
    idx = np.where(env > th)[0]
    if len(idx) == 0:
        return a
    s = max(0, idx[0] - int(0.015 * SR)); e = min(len(a), idx[-1] + int(0.04 * SR))
    return a[s:e]


def phon_len(word):
    w = re.sub(r"[^A-Za-z0-9'\-]", "", word)
    if not w:
        return 1
    try:
        p = kokoro.tokenizer.phonemize(w, "en-us")
    except Exception:
        p = w
    p = re.sub(r"[ˈˌ\s\-\.]", "", p)
    return max(2, len(p))


def silences(a, min_dur=0.075):
    hop = int(0.01 * SR)
    frames = len(a) // hop
    if frames < 3:
        return []
    rms = np.sqrt(np.array([np.mean(a[i * hop:(i + 1) * hop] ** 2) for i in range(frames)]) + 1e-12)
    th = rms.max() * (10 ** (-30 / 20))
    quiet = rms < th
    out, i = [], 0
    while i < frames:
        if quiet[i]:
            j = i
            while j < frames and quiet[j]:
                j += 1
            if (j - i) * 0.01 >= min_dur and i > 2 and j < frames - 2:
                out.append((i * 0.01, j * 0.01))
            i = j
        else:
            i += 1
    return out


def word_times(words, dur, sil):
    """Return [(start, end)] per word inside a beat of length dur."""
    pl = [phon_len(w) for w in words]
    total = sum(pl)
    # expected time of each inter-word boundary (proportional)
    cum = np.cumsum(pl) / total * dur
    punct = [i for i, w in enumerate(words[:-1]) if re.search(r"[,.?!;:—]$", w)]
    anchors = {}  # boundary index after word i -> (sil_start, sil_end)
    used = set()
    for i in punct:
        exp = cum[i]
        best, bd = None, 0.35 * dur + 0.25
        for k, (s, e) in enumerate(sil):
            if k in used:
                continue
            d = abs((s + e) / 2 - exp)
            if d < bd:
                best, bd = k, d
        if best is not None:
            used.add(best); anchors[i] = sil[best]
    # enforce monotonic anchors
    keys = sorted(anchors)
    clean, last = {}, -1
    for i in keys:
        if anchors[i][0] > last:
            clean[i] = anchors[i]; last = anchors[i][1]
    # segments between anchors
    bounds = [(-1, 0.0)] + [(i, clean[i]) for i in sorted(clean)] + [(len(words) - 1, None)]
    times = [None] * len(words)
    for b in range(len(bounds) - 1):
        i0, a0 = bounds[b]
        i1, a1 = bounds[b + 1]
        seg_start = 0.0 if i0 == -1 else a0[1]
        seg_end = dur if a1 is None else a1[0]
        idx = list(range(i0 + 1, i1 + 1))
        sp = sum(pl[j] for j in idx) or 1
        t = seg_start
        for j in idx:
            d = (seg_end - seg_start) * pl[j] / sp
            times[j] = (t, t + d); t += d
    return times


# ---------- caption display normalization (spoken words -> numerals) ----------
UNITS = {"zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9,
         "ten": 10, "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14, "fifteen": 15, "sixteen": 16,
         "seventeen": 17, "eighteen": 18, "nineteen": 19}
TENS = {"twenty": 20, "thirty": 30, "forty": 40, "fifty": 50, "sixty": 60, "seventy": 70, "eighty": 80, "ninety": 90}
SCALES = {"hundred": 100, "thousand": 1000, "million": 1000000}
UNIT_WORDS = {"dollars", "dollar", "bucks", "percent", "minutes", "minute", "seconds", "second", "days", "day", "weeks",
              "years", "hours", "views", "homes", "times", "field", "visits"}


def _core(tok):
    return re.sub(r"[^a-z\-]", "", tok.lower())


def parse_number(tokens, i):
    """Try to parse a spoken number starting at tokens[i]. Returns (value, n_tokens) or None."""
    j, total, cur, seen = i, 0, 0, False
    if _core(tokens[j]).split("-")[0] in SCALES:
        return None
    if _core(tokens[j]) == "a" and j + 1 < len(tokens) and _core(tokens[j + 1]).split("-")[0] in ("hundred", "thousand", "million"):
        cur, j, seen = 1, j + 1, True
    while j < len(tokens):
        c = _core(tokens[j])
        parts = c.split("-")
        ok = True
        for p in parts:
            if p in UNITS: cur += UNITS[p]
            elif p in TENS: cur += TENS[p]
            elif p == "hundred": cur = max(cur, 1) * 100
            elif p in ("thousand", "million"): total += max(cur, 1) * SCALES[p]; cur = 0
            elif p in ("dollar", "and") and seen: pass
            else: ok = False; break
        if not ok:
            break
        seen = True
        j += 1
        if re.search(r"[,.?!;:]$", tokens[j - 1]):
            break
        if j < len(tokens) and _core(tokens[j]) == "and" and j + 1 < len(tokens) and _core(tokens[j + 1]).split("-")[0] in TENS.keys() | UNITS.keys():
            j += 1
    if not seen:
        return None
    return total + cur, j - i


def display_tokens(words):
    """Group spoken words into display tokens; returns [(display, [word indices])]."""
    out, i = [], 0
    while i < len(words):
        r = parse_number(words, i)
        if r:
            val, n = r
            span = words[i:i + n]
            nxt = _core(words[i + n]) if i + n < len(words) else ""
            last_core = _core(span[-1])
            multi = n > 1 or "-" in span[0]
            sentence_enum = bool(re.match(r"^(One|Two|Three|Four|Five|Six)\.$", span[0])) and n == 1
            unit_follow = nxt in UNIT_WORDS
            if multi or val >= 10 or unit_follow or sentence_enum:
                trail = re.search(r"[,.?!;:]+$", span[-1])
                trail = trail.group(0) if trail else ""
                num = f"{val:,}"
                money = "dollar" in " ".join(_core(w) for w in span) or nxt in ("dollars", "bucks", "dollar")
                consumed = n
                if nxt in ("dollars", "bucks", "dollar") and i + n < len(words):
                    trail = re.search(r"[,.?!;:]+$", words[i + n]); trail = trail.group(0) if trail else ""
                    consumed += 1
                if nxt == "percent":
                    trail = re.search(r"[,.?!;:]+$", words[i + n]); trail = trail.group(0) if trail else ""
                    out.append((f"{num}%{trail}", list(range(i, i + n + 1)))); i += n + 1; continue
                if val == 2009 and "thousand" in " ".join(span):
                    num = "2009"
                txt = (f"${num}" if money else num) + trail
                if "-" in span[-1] and last_core.endswith("dollar") is False and "-" in span[0] and n == 1 and not money:
                    rest = span[0].split("-", 1)
                    if rest[0].lower() in UNITS or rest[0].lower() in TENS:
                        pass
                out.append((txt, list(range(i, i + consumed)))); i += consumed; continue
        out.append((words[i], [i])); i += 1
    # hyphenated compounds like five-minute / fourteen-day / hundred-fifty-dollar
    fixed = []
    for txt, idx in out:
        m = re.match(r"^([a-z]+(?:-[a-z]+)*)-(minute|day|second|star|field|dollar)(\W*)$", txt, re.I)
        if m:
            r = parse_number([m.group(1)], 0)
            if r and r[0] >= 1:
                pre = f"{r[0]:,}"
                txt = f"${pre}{m.group(3)}" if m.group(2).lower() == "dollar" else f"{pre}-{m.group(2)}{m.group(3)}"
        fixed.append((txt.replace("p.m.", "PM"), idx))
    return fixed


def chunk(display, wtimes, beat_idx):
    chunks, cur, chars = [], [], 0
    for txt, idx in display:
        s = wtimes[idx[0]][0]; e = wtimes[idx[-1]][1]
        tok = dict(w=txt, s=round(s, 3), e=round(e, 3))
        if cur and (len(cur) >= 3 or chars + len(txt) > 20):
            chunks.append(cur); cur, chars = [], 0
        cur.append(tok); chars += len(txt) + 1
        if re.search(r"[.?!,;:—]$", txt) and len(cur) >= 1:
            chunks.append(cur); cur, chars = [], 0
    if cur:
        chunks.append(cur)
    return [dict(beat=beat_idx, s=c[0]["s"], e=c[-1]["e"], words=c) for c in chunks]


# Per-reel caption display fixes (token -> display), for money said without "dollars".
DISPLAY_FIX = {
    "R03": {"600": "$600", "200": "$200"},
    "R11": {"two": "2"},
    "R12": {"one,": "1,", "four,": "4,"},
    "R27": {"two,": "2,", "five,": "5,"},
    "R13": {"45.": "$45.", "180.": "$180.", "one": "1", "One": "1", "four": "4"},
    "R15": {"150": "$150", "1,800.": "$1,800."},
}


def build(reel):
    pieces, beats, words_out, chunks = [np.zeros(int(LEAD_IN * SR), dtype=np.float32)], [], [], []
    t = LEAD_IN
    for bi, b in enumerate(reel["beats"]):
        text = b["vo"]
        spoken = text
        for pat, rep in TTS_FIX:
            spoken = re.sub(pat, rep, spoken, flags=re.I)
        a, sr = kokoro.create(spoken, voice=VOICE, speed=SPEED, lang="en-us")
        assert sr == SR
        a = trim(a.astype(np.float32))
        dur = len(a) / SR
        words = text.split()
        wt = word_times(words, dur, silences(a))
        wt_abs = [(t + s, t + e) for s, e in wt]
        beats.append(dict(s=round(t, 3), e=round(t + dur, 3)))
        for w, (s, e) in zip(words, wt_abs):
            words_out.append(dict(w=w, s=round(s, 3), e=round(e, 3), beat=bi))
        disp = [(DISPLAY_FIX.get(reel["id"], {}).get(d, d), ix) for d, ix in display_tokens(words)]
        chunks += chunk(disp, wt_abs, bi)
        pieces.append(a)
        t += dur
        last = bi == len(reel["beats"]) - 1
        gap = TAIL if last else (GAP_SENT if re.search(r"[.?!]$", text) else GAP_SOFT)
        pieces.append(np.zeros(int(gap * SR), dtype=np.float32))
        t += gap
    audio = np.concatenate(pieces)
    # scene boundaries: each beat's scene runs from its start until the next beat starts
    for i in range(len(beats)):
        beats[i]["scene_s"] = 0.0 if i == 0 else round(beats[i]["s"] - 0.06, 3)
        beats[i]["scene_e"] = round(beats[i + 1]["s"] - 0.06, 3) if i + 1 < len(beats) else round(len(audio) / SR, 3)
    return audio, dict(id=reel["id"], duration=round(len(audio) / SR, 3), beats=beats, words=words_out, chunks=chunks,
                       voice=f"kokoro:{VOICE}@{SPEED}")


if __name__ == "__main__":
    plan = json.load(open(os.path.join(ROOT, "public/data/plan.json")))
    want = set(sys.argv[1:])
    os.makedirs(os.path.join(ROOT, "public/audio/vo"), exist_ok=True)
    os.makedirs(os.path.join(ROOT, "public/data/timing"), exist_ok=True)
    for r in plan["reels"]:
        if want and r["id"] not in want:
            continue
        audio, timing = build(r)
        peak = np.abs(audio).max() or 1
        sf.write(os.path.join(ROOT, f"public/audio/vo/{r['id']}.wav"), (audio / peak * 0.89).astype(np.float32), SR)
        json.dump(timing, open(os.path.join(ROOT, f"public/data/timing/{r['id']}.json"), "w"), indent=1)
        print(f"{r['id']}: {timing['duration']:.1f}s, {len(timing['chunks'])} caption chunks")
