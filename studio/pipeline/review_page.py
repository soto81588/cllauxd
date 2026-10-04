"""Build the private review board (HTML + thumbnails + compressed previews).

Usage: python3 pipeline/review_page.py <out_dir>
Reads ../vantier-instagram-library (final media) and public/data/plan.json.
"""
import json, os, subprocess, sys, html
from datetime import date, timedelta
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIB = os.path.join(os.path.dirname(ROOT), "vantier-instagram-library")
OUT = sys.argv[1]
plan = json.load(open(os.path.join(ROOT, "public/data/plan.json")))
src = open(os.path.join(ROOT, "pipeline/build_library.py")).read()
ns = {}
exec(src[src.index("ORDER = ["):src.index("\n\n\ndef calendar")], ns)
ORDER = ns["ORDER"]
# Public copies Instagram downloads from (pushed to the repo's reels-media branch under library/).
RAW = "https://raw.githubusercontent.com/soto81588/cllauxd/reels-media/library/"
# Proposed slots for the library drafts: one a day from Nov 1, 2026 (after the queue already approved in Vantier OS),
# in calendar order. Reels 6:00 PM ET (6:50 run), carousels 1:00 PM ET (1:50 run). Nov 1 onward is EST (UTC-5).
SLOT_START = date(2026, 11, 1)
SLOT_ORDER = [i for week in ORDER for i in week]
def slot(pid, kind):
    d = SLOT_START + timedelta(days=SLOT_ORDER.index(pid))
    return f"{d.isoformat()}T{'23' if kind == 'reel' else '18'}:00:00.000Z"
for d in ("thumbs", "slides", "video"):
    os.makedirs(os.path.join(OUT, d), exist_ok=True)


def thumb(src_path, dst, crop_45=False, w=432):
    im = Image.open(src_path).convert("RGB")
    if crop_45:
        im = im.crop((0, 285, 1080, 1635))
    im = im.resize((w, int(im.height * w / im.width)), Image.LANCZOS)
    im.save(dst, quality=80, optimize=True, progressive=True)


items = []
for r in plan["reels"]:
    rid = r["id"]
    folder = os.path.join(LIB, "reels", f"{rid}-{r['slug']}")
    timing = json.load(open(os.path.join(ROOT, f"public/data/timing/{rid}.json")))
    thumb(os.path.join(folder, "cover.jpg"), os.path.join(OUT, "thumbs", f"{rid}.jpg"), crop_45=True)
    mp4 = os.path.join(folder, f"{rid}-{r['slug']}.mp4")
    prev = os.path.join(OUT, "video", f"{rid}.mp4")
    if os.path.exists(mp4) and not os.path.exists(prev):
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", mp4, "-vf", "scale=540:960", "-c:v", "libx264", "-preset", "slow", "-crf", "27",
                        "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", prev], check=True)
    items.append(dict(id=rid, type="reel", title=r["title"], pillar=r["pillar"], industry=r["industry"], cta=r["cta"],
                      dur=round(timing["duration"]), hook=r["beats"][0]["vo"], vo=" ".join(b["vo"] for b in r["beats"]),
                      caption=r["caption"].strip(), tags=r["tags"], music=r["music"],
                      thumb=f"thumbs/{rid}.jpg", video=f"video/{rid}.mp4" if os.path.exists(prev) else None,
                      folder=f"reels/{rid}-{r['slug']}",
                      media_urls=[f"{RAW}reels/{rid}-{r['slug']}.mp4"], cover_url=f"{RAW}reels/{rid}-{r['slug']}.cover.jpg",
                      sched=slot(rid, "reel")))
for c in plan["carousels"]:
    cid = c["id"]
    folder = os.path.join(LIB, "carousels", f"{cid}-{c['slug']}")
    slides = []
    for i in range(len(c["slides"])):
        s = os.path.join(folder, f"slide-{i + 1:02d}.jpg")
        dst = os.path.join(OUT, "slides", f"{cid}-{i + 1:02d}.jpg")
        thumb(s, dst, w=540)
        slides.append(f"slides/{cid}-{i + 1:02d}.jpg")
    items.append(dict(id=cid, type="carousel", title=c["title"], pillar=c["pillar"], industry=c["industry"], cta=c["cta"],
                      n=len(slides), hook=c["slides"][0].get("title", ""), caption=c["caption"].strip(), tags=c["tags"],
                      thumb=slides[0], slides=slides, folder=f"carousels/{cid}-{c['slug']}",
                      media_urls=[f"{RAW}carousels/{cid}-{c['slug']}/slide-{i + 1:02d}.jpg" for i in range(len(slides))],
                      sched=slot(cid, "carousel")))

data = dict(items=items, order=ORDER, start="2026-10-05")
tpl = open(os.path.join(ROOT, "pipeline/review_template.html")).read()
open(os.path.join(OUT, "index.html"), "w").write(tpl.replace("/*__DATA__*/null", json.dumps(data, ensure_ascii=False)))
size = sum(os.path.getsize(os.path.join(dp, f)) for dp, _, fs in os.walk(OUT) for f in fs)
print(f"review board: {len(items)} items, {size / 1e6:.1f} MB -> {OUT}")
