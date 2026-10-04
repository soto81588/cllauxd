"""Build the private review board (HTML + thumbnails + compressed previews).

Usage: python3 pipeline/review_page.py <out_dir>
Reads ../vantier-instagram-library (final media) and public/data/plan.json.
"""
import json, os, subprocess, sys, html
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIB = os.path.join(os.path.dirname(ROOT), "vantier-instagram-library")
OUT = sys.argv[1]
plan = json.load(open(os.path.join(ROOT, "public/data/plan.json")))
src = open(os.path.join(ROOT, "pipeline/build_library.py")).read()
ns = {}
exec(src[src.index("ORDER = ["):src.index("\n\n\ndef calendar")], ns)
ORDER = ns["ORDER"]
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
                      folder=f"reels/{rid}-{r['slug']}"))
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
                      thumb=slides[0], slides=slides, folder=f"carousels/{cid}-{c['slug']}"))

data = dict(items=items, order=ORDER, start="2026-10-05")
tpl = open(os.path.join(ROOT, "pipeline/review_template.html")).read()
open(os.path.join(OUT, "index.html"), "w").write(tpl.replace("/*__DATA__*/null", json.dumps(data, ensure_ascii=False)))
size = sum(os.path.getsize(os.path.join(dp, f)) for dp, _, fs in os.walk(OUT) for f in fs)
print(f"review board: {len(items)} items, {size / 1e6:.1f} MB -> {OUT}")
