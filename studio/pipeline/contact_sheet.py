"""Tile QC frames into one contact sheet: python3 contact_sheet.py out.jpg frame1.png frame2.png ..."""
import sys
from PIL import Image, ImageDraw
out, files = sys.argv[1], sys.argv[2:]
w, h = 300, 533
cols = min(6, len(files))
rows = (len(files) + cols - 1) // cols
sheet = Image.new("RGB", (cols * w + (cols + 1) * 8, rows * h + (rows + 1) * 8), (40, 40, 40))
for i, f in enumerate(files):
    im = Image.open(f).convert("RGB")
    im.thumbnail((w, h * 2))
    im = im.resize((w, int(im.height * w / im.width)))
    x, y = 8 + (i % cols) * (w + 8), 8 + (i // cols) * (h + 8)
    sheet.paste(im, (x, y))
    ImageDraw.Draw(sheet).text((x + 6, y + 6), f.split("_")[-1].split(".")[0], fill=(255, 80, 80))
sheet.save(out, quality=88)
print(out, sheet.size)
