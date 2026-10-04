"""Validate the content plan and export it for the renderer.

Usage: python3 build_plan.py
Writes ../public/data/plan.json and vo_script.txt.
"""
import json, re, sys, os
from collections import Counter
sys.path.insert(0, os.path.dirname(__file__))
from reels_a import REELS_A
from reels_b import REELS_B
from carousels import CAROUSELS

REELS = REELS_A + REELS_B
BANNED = [r"restaurant", r"med ?spa", r"\bspa\b", r"dentist", r"dental", r"chiropract", r"law firm", r"lawyer",
          r"attorney", r"accounting", r"accountant", r"\bcpa\b", r"insurance", r"insured", r"miami", r"hialeah", r"florida"]

def text_blobs(item):
    out = [item["title"], item["caption"], " ".join(item["tags"])]
    out += [json.dumps(b, ensure_ascii=False) for b in item.get("beats", [])]
    out += [json.dumps(s, ensure_ascii=False) for s in item.get("slides", [])]
    return "\n".join(out)

errors = []
ids = [x["id"] for x in REELS + CAROUSELS]
slugs = [x["slug"] for x in REELS + CAROUSELS]
titles = [x["title"].lower() for x in REELS + CAROUSELS]
for name, vals in (("id", ids), ("slug", slugs), ("title", titles)):
    d = [k for k, c in Counter(vals).items() if c > 1]
    if d: errors.append(f"duplicate {name}: {d}")

for item in REELS + CAROUSELS:
    blob = text_blobs(item).lower()
    for pat in BANNED:
        if re.search(pat, blob):
            errors.append(f"{item['id']}: banned term /{pat}/")
    if len(item["tags"]) > 6: errors.append(f"{item['id']}: too many hashtags")

words_total, chars_total = 0, 0
reel_stats = []
for r in REELS:
    vo = " ".join(b[0] for b in r["beats"])
    w = len(vo.split()); words_total += w; chars_total += len(vo)
    reel_stats.append((r["id"], w, len(vo), len(r["beats"])))
    if r["beats"][-1][1]["t"] != "cta": errors.append(f"{r['id']}: last beat must be CTA")
    if w > 110: errors.append(f"{r['id']}: VO too long ({w} words)")

pillars = Counter(x["pillar"] for x in REELS + CAROUSELS)
print(f"Reels: {len(REELS)}  Carousels: {len(CAROUSELS)}  TOTAL: {len(REELS)+len(CAROUSELS)}")
print(f"VO words: {words_total}  chars: {chars_total}  avg words/reel: {words_total/len(REELS):.0f}  est. minutes: {words_total/160:.1f}")
print("Pillars:", dict(pillars))
print("Longest reels:", sorted(reel_stats, key=lambda x: -x[1])[:5])
if errors:
    print("\nERRORS:"); [print(" -", e) for e in errors]; sys.exit(1)

plan = dict(
    reels=[dict(r, beats=[dict(vo=b[0], scene=b[1]) for b in r["beats"]]) for r in REELS],
    carousels=CAROUSELS,
)
os.makedirs("../public/data", exist_ok=True)
json.dump(plan, open("../public/data/plan.json", "w"), ensure_ascii=False, indent=1)
with open("vo_script.txt", "w") as f:
    for r in REELS:
        f.write(f"### {r['id']}\n" + " ".join(b[0] for b in r["beats"]) + "\n\n")
print("\nOK: wrote ../public/data/plan.json and vo_script.txt")
