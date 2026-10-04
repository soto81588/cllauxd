"""Assemble the deliverable library from rendered media + the content plan.

Usage: python3 pipeline/build_library.py   (expects out/ to contain rendered media)
Writes ../vantier-instagram-library/
"""
import csv, json, os, shutil, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "out")
LIB = os.path.join(os.path.dirname(ROOT), "vantier-instagram-library")
plan = json.load(open(os.path.join(ROOT, "public/data/plan.json")))
REELS, CARS = plan["reels"], plan["carousels"]

MUSIC_DESC = {
    "pulse": "Vantier Original — “Pulse” (96 BPM, D minor; sub pulse, muted plucks, soft pads). Tension / problem-driven.",
    "glass": "Vantier Original — “Glass” (84 BPM, C major; felt-piano motif, warm pad). Reflective / educational.",
    "drive": "Vantier Original — “Drive” (112 BPM, E minor; four-on-the-floor, pluck arp). Confident playbooks and lists.",
}
TRENDING_HINT = {
    "pulse": "a slow-building, minimal tension track (dark ambient / cinematic pulse)",
    "glass": "a soft lo-fi or felt-piano instrumental",
    "drive": "an upbeat minimal house / corporate-tech instrumental",
}


def tc(sec):
    return f"{int(sec // 60):02d}:{sec % 60:04.1f}"


def describe(s):
    t = s["t"]
    if t == "title":
        return f"Kinetic headline ({s.get('bg', 'ink')} background): “{s['text']}”" + (f" — kicker {s['kicker']}" if s.get("kicker") else "")
    if t == "illus":
        return f"Line-art illustration ({s['icon']}) drawn on in gold" + (f", label “{s['label']}”" if s.get("label") else "") + (f", headline “{s['text']}”" if s.get("text") else "")
    if t == "photo":
        return f"Photoreal still ({s['img']}) with a slow {s.get('move', 'in')} camera move"
    if t == "phone":
        return f"Phone mockup — {s['ui']} screen" + (f": {json.dumps(s.get('data'), ensure_ascii=False)}" if s.get("data") else "")
    if t == "stat":
        return f"Big number: {s['value']} — {s['label']}" + (f" ({s['sub']})" if s.get("sub") else "")
    if t == "list":
        return f"List ({s.get('mode', 'num')}): " + " / ".join(s["items"])
    if t == "split":
        return f"Comparison: {s['left']['h']} vs {s['right']['h']}"
    if t == "bars":
        return f"Bar chart “{s['title']}”: " + ", ".join(f"{b['l']} {b['d']}" for b in s["bars"])
    if t == "math":
        return "Math reveal: " + "; ".join(f"{r['a']} {r['b']} = {r['r']}" for r in s["rows"])
    if t == "flow":
        return "System flow: " + " → ".join(s["nodes"])
    if t == "timer":
        return f"Animated timer — {s['label']}"
    if t == "quote":
        return f"{s['kind'].title()} card: " + " / ".join(s["lines"])
    if t == "line":
        return f"Line chart — {s['title']}"
    if t == "calendar":
        return f"Calendar filling to {int(s['fill'] * 100)}% — {s['label']}"
    if t == "budget":
        return "Budget split: " + ", ".join(f"${p['v']} {p['l']}" for p in s["parts"])
    if t == "timeline":
        return "Timeline: " + " → ".join(f"{x['d']}: {x['t']}" for x in s["steps"])
    if t == "grid":
        return "Card grid: " + ", ".join(s["cards"])
    if t == "dots":
        return f"Dot matrix: {s['hl']} of {s['total']} highlighted — {s['label']}"
    if t == "cta":
        return f"End card: Vantier mark + “{s['line']}” + {s['sub']}"
    return t


def stock_for(s):
    if s.get("stock"):
        return s["stock"]
    t = s["t"]
    if t == "phone":
        return "Optional: real screen recording of this exact phone flow"
    return None


def run(cmd):
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def caption_text(item):
    return item["caption"].strip() + "\n\n" + " ".join("#" + t for t in item["tags"]) + "\n"


def build():
    os.makedirs(LIB, exist_ok=True)
    rows = []
    shot_md = ["# Stock Footage Shot List (optional upgrades)\n",
               "Every Reel is finished and postable as rendered. Where a scene uses an illustration, mockup or photoreal still, "
               "this list names the licensed stock clip an editor can drop in instead (Storyblocks, Artgrid, Pexels, Envato). "
               "Match the timecodes; keep clips 9:16 and graded warm and slightly desaturated to fit the Vantier look.\n"]
    for r in REELS:
        rid = r["id"]
        name = f"{rid}-{r['slug']}"
        d = os.path.join(LIB, "reels", name)
        os.makedirs(d, exist_ok=True)
        timing = json.load(open(os.path.join(ROOT, f"public/data/timing/{rid}.json")))
        vid = os.path.join(OUT, f"{rid}_video.mp4")
        mixw = os.path.join(OUT, f"{rid}_mix.wav")
        final = os.path.join(d, f"{name}.mp4")
        if os.path.exists(vid) and os.path.exists(mixw):
            if not (os.path.exists(final) and os.path.getmtime(final) > max(os.path.getmtime(vid), os.path.getmtime(mixw))):
                run(["ffmpeg", "-y", "-i", vid, "-i", mixw, "-map", "0:v", "-map", "1:a", "-c:v", "libx264", "-preset", "medium", "-crf", "20",
                     "-pix_fmt", "yuv420p", "-profile:v", "high", "-r", "30", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest",
                     "-movflags", "+faststart", final])
        stem = os.path.join(OUT, f"{rid}_vo-sfx.wav")
        if os.path.exists(stem):
            run(["ffmpeg", "-y", "-i", stem, "-c:a", "aac", "-b:a", "160k", os.path.join(d, "audio-stem_vo-sfx_no-music.m4a")])
        cover = os.path.join(OUT, f"{rid}_cover.jpg")
        if os.path.exists(cover):
            shutil.copy(cover, os.path.join(d, "cover.jpg"))
        open(os.path.join(d, "caption.txt"), "w").write(caption_text(r))
        hook = r["beats"][0]
        lines = [f"# {rid} — {r['title']}", "", "**STATUS: DRAFT**", "",
                 f"| | |\n|---|---|\n| Format | Instagram Reel, 9:16, 1080×1920, 30 fps |\n| Length | {timing['duration']:.1f} s |\n| Pillar | {r['pillar']} |\n| Industry focus | {r['industry']} |\n| CTA type | {r['cta']} |\n| Voice-over | Kokoro TTS · af_heart (Apache-2.0) |\n| Music | {MUSIC_DESC[r['music']]} |\n| Captions | Burned-in, word-synced (Manrope ExtraBold, gold active word) |",
                 "", "## Hook (first 2 seconds)", f"- **On screen:** {describe(hook['scene'])}", f"- **Spoken:** “{hook['vo']}”", "",
                 "## Voice-over script", "", " ".join(b["vo"] for b in r["beats"]), "",
                 "## Edit decision list", "", "| Time | Scene | Voice-over | Stock swap (optional) |", "|---|---|---|---|"]
        shot_md.append(f"\n## {rid} — {r['title']}\n")
        for b, tb in zip(r["beats"], timing["beats"]):
            st = stock_for(b["scene"]) or "—"
            lines.append(f"| {tc(tb['scene_s'])}–{tc(tb['scene_e'])} | {describe(b['scene'])} | {b['vo']} | {st} |")
            if b["scene"].get("stock"):
                shot_md.append(f"- `{tc(tb['scene_s'])}–{tc(tb['scene_e'])}` — **{b['scene']['stock']}** (replaces: {b['scene']['t']} · {b['scene'].get('icon') or b['scene'].get('img')})")
        lines += ["", "## Sound design", "Cut whooshes on scene changes, UI pops/dings on phone messages, ticks on data reveals, a low impact on the hook and big numbers. Music ducks about 6 dB under the voice. Master at -14 LUFS with a -1.5 dBFS peak ceiling.", "",
                  "## Trending-audio option", f"`audio-stem_vo-sfx_no-music.m4a` is the voice + SFX without music. To use a trending sound, post the Reel, add the sound in Instagram at about 8–12% volume and lower original audio to 100%. Look for {TRENDING_HINT[r['music']]}.", "",
                  "## Instagram caption", "", "```", caption_text(r).strip(), "```", ""]
        open(os.path.join(d, "script.md"), "w").write("\n".join(lines))
        rows.append(dict(id=rid, type="Reel", status="DRAFT", title=r["title"], pillar=r["pillar"], industry=r["industry"],
                         hook=hook["vo"], length=f"{timing['duration']:.0f}s", cta=r["cta"], folder=f"reels/{name}"))

    for c in CARS:
        cid = c["id"]
        name = f"{cid}-{c['slug']}"
        d = os.path.join(LIB, "carousels", name)
        os.makedirs(d, exist_ok=True)
        for i in range(len(c["slides"])):
            src = os.path.join(OUT, f"{cid}_slide{i + 1:02d}.jpg")
            if os.path.exists(src):
                shutil.copy(src, os.path.join(d, f"slide-{i + 1:02d}.jpg"))
        open(os.path.join(d, "caption.txt"), "w").write(caption_text(c))
        md = [f"# {cid} — {c['title']}", "", "**STATUS: DRAFT**", "",
              f"| | |\n|---|---|\n| Format | Instagram carousel, 4:5, 1080×1350 JPG |\n| Slides | {len(c['slides'])} |\n| Pillar | {c['pillar']} |\n| Industry focus | {c['industry']} |\n| Theme | {c['theme']} |\n| CTA type | {c['cta']} |",
              "", "## Slides", ""]
        for i, s in enumerate(c["slides"]):
            txt = s.get("title") or s.get("head") or s.get("text") or s.get("line") or s.get("myth") or s.get("name") or s.get("label") or ""
            extra = s.get("body") or s.get("truth") or s.get("signal") or " / ".join(s.get("lines", []) or s.get("items", [])) or ""
            md.append(f"{i + 1}. **{s['k']}** — {txt}" + (f" — {extra}" if extra else ""))
        md += ["", "## Instagram caption", "", "```", caption_text(c).strip(), "```", ""]
        open(os.path.join(d, "slides.md"), "w").write("\n".join(md))
        rows.append(dict(id=cid, type="Carousel", status="DRAFT", title=c["title"], pillar=c["pillar"], industry=c["industry"],
                         hook=c["slides"][0].get("title", ""), length=f"{len(c['slides'])} slides", cta=c["cta"], folder=f"carousels/{name}"))

    with open(os.path.join(LIB, "content_index.csv"), "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader(); w.writerows(rows)
    idx = ["# Content Index — 52 pieces", "", "Every piece: **STATUS: DRAFT**. Click a folder for the file, caption and script.", "",
           "| # | Type | Title | Pillar | Industry | Length | CTA | Folder |", "|---|---|---|---|---|---|---|---|"]
    for r in rows:
        idx.append(f"| {r['id']} | {r['type']} | {r['title']} | {r['pillar']} | {r['industry']} | {r['length']} | {r['cta']} | [{r['folder']}]({r['folder']}/) |")
    open(os.path.join(LIB, "CONTENT_INDEX.md"), "w").write("\n".join(idx) + "\n")
    open(os.path.join(LIB, "STOCK_SHOTLIST.md"), "w").write("\n".join(shot_md) + "\n")
    print(f"library: {len(rows)} pieces -> {LIB}")


# 8-week rollout: strongest share/save hooks first, authority + DM pieces spaced out
# once trust is built, pillars and industries rotated so no two neighbours repeat.
ORDER = [
    ["R01", "C01", "R13", "R07", "C03", "R02", "R04"],
    ["R03", "R09", "C04", "R17", "C08", "R10", "R25"],
    ["R06", "C02", "R05", "R16", "C12", "R14", "R27"],
    ["R11", "C07", "R18", "R20", "R22", "C06", "R31"],
    ["C11", "R15", "R23", "R28", "C13", "R12", "R34"],
    ["R08", "C17", "R21", "C14", "R30", "R29", "R24"],
    ["R19", "R26", "C05", "R33", "C10", "R32", "C15"],
    ["C09", "C16", "C18"],
]


def calendar():
    import datetime as dt
    by_id = {x["id"]: x for x in REELS + CARS}
    flat = [i for w in ORDER for i in w]
    assert sorted(flat) == sorted(by_id), "calendar must cover every piece exactly once"
    start = dt.date(2026, 10, 5)
    md = ["# 8-Week Posting Calendar", "",
          "One post a day for 7 weeks, plus a 3-post closing week. 52 posts in total. Every piece starts as **STATUS: DRAFT** and is approved before scheduling.",
          "Times match the Vantier OS Instagram publisher slots (ET): Reels at **6:50 PM**, when owners are off the job and scrolling; carousels at **10:50 AM**, a save-it-for-later window.",
          "",
          "Why this order: week 1 opens with high-share, high-save pattern interrupts (lead leaks, Meta mistakes, cost-per-lead math). Authority and DM-ask pieces (R25, R31, R34, C18) arrive once the account has given value for a few weeks. Pillars and industries rotate so the grid never repeats two similar posts in a row.", ""]
    day = 0
    for wi, week in enumerate(ORDER):
        md += [f"## Week {wi + 1}", "", "| Date | Slot (ET) | Piece | Type | Pillar | Industry | CTA |", "|---|---|---|---|---|---|---|"]
        for pid in week:
            d = start + dt.timedelta(days=day); day += 1
            x = by_id[pid]
            typ = "Reel" if pid.startswith("R") else "Carousel"
            slot = "6:50 PM" if typ == "Reel" else "10:50 AM"
            md.append(f"| {d.strftime('%a %b %d')} | {slot} | **{pid}** — {x['title']} | {typ} | {x['pillar']} | {x['industry']} | {x['cta']} |")
        md.append("")
    md += ["## Engagement routine (every post)", "",
           "- Reply to every comment within the first hour; questions in comments become future Reels.",
           "- For posts that ask people to comment a keyword (AUDIT, SYSTEM, VANTIER), reply in DMs the same day with a personal note, not a template blast.",
           "- Share each Reel to Stories with a poll or question sticker 2–3 hours after posting.",
           "- Pin R34 (system), R25 (audit) and C18 (how Vantier works) to the profile grid once they're live.", ""]
    open(os.path.join(LIB, "CONTENT_CALENDAR.md"), "w").write("\n".join(md))
    # Vantier OS import file (Content -> posts). Status stays "draft"; media paths are repo-relative
    # and must be swapped for public URLs (e.g. raw GitHub links) before Instagram can fetch them.
    posts, day = [], 0
    for week in ORDER:
        for pid in week:
            d = start + dt.timedelta(days=day); day += 1
            x = by_id[pid]
            reel = pid.startswith("R")
            hh, mm = (18, 50) if reel else (10, 50)
            off = "-04:00" if d < dt.date(2026, 11, 1) else "-05:00"
            folder = f"reels/{pid}-{x['slug']}" if reel else f"carousels/{pid}-{x['slug']}"
            media = [f"{folder}/{pid}-{x['slug']}.mp4"] if reel else [f"{folder}/slide-{i + 1:02d}.jpg" for i in range(len(x['slides']))]
            posts.append(dict(doc_id=f"lib-{pid.lower()}", title=f"{pid} · {x['title']}", post_type="reel" if reel else "carousel",
                              status="draft", scheduled_at=f"{d.isoformat()}T{hh:02d}:{mm:02d}:00{off}",
                              caption=caption_text(x).strip(), media_paths=media, cover_path=f"{folder}/cover.jpg" if reel else None,
                              pillar=x["pillar"], industry=x["industry"], cta=x["cta"]))
    json.dump(dict(note="All posts are drafts. Replace media_paths with public URLs before approving; Instagram must be able to download them.", posts=posts),
              open(os.path.join(LIB, "vantier_os_drafts.json"), "w"), ensure_ascii=False, indent=1)
    print("calendar ok")


if __name__ == "__main__":
    build()
    calendar()
