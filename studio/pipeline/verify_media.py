"""Automated QC of final library media: dimensions, fps, A/V duration match, loudness, black frames."""
import json, os, subprocess, sys, glob
LIB = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "..", "vantier-instagram-library")
from PIL import Image

def probe(p):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=codec_type,width,height,r_frame_rate,duration,sample_rate", "-of", "json", p], capture_output=True, text=True).stdout
    return json.loads(out)["streams"]

def loud(p):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", p, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
    tail = r[r.rfind("Summary:"):]
    I = float(tail.split("I:")[1].split("LUFS")[0]); P = float(tail.split("Peak:")[1].split("dBFS")[0])
    return I, P

def blacks(p):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", p, "-vf", "blackdetect=d=0.25:pix_th=0.05", "-an", "-f", "null", "-"], capture_output=True, text=True).stderr
    return r.count("black_start")

bad = 0
for p in sorted(glob.glob(os.path.join(LIB, "reels", "*", "*.mp4"))):
    s = probe(p); v = [x for x in s if x["codec_type"] == "video"][0]; a = [x for x in s if x["codec_type"] == "audio"]
    ok = v["width"] == 1080 and v["height"] == 1920 and v["r_frame_rate"] == "30/1" and a
    dv, da = float(v["duration"]), float(a[0]["duration"]) if a else 0
    I, P = loud(p); nb = blacks(p)
    flag = "OK " if ok and abs(dv - da) < 0.15 and -15 < I < -13 and P <= -0.5 and nb == 0 else "BAD"
    bad += flag == "BAD"
    print(f"{flag} {os.path.basename(p)[:40]:40} {v['width']}x{v['height']} {dv:5.1f}s/{da:5.1f}s  {I:5.1f} LUFS  peak {P:5.1f}  black:{nb}  {os.path.getsize(p)/1e6:4.1f}MB")
for d in sorted(glob.glob(os.path.join(LIB, "carousels", "*"))):
    sl = sorted(glob.glob(os.path.join(d, "slide-*.jpg")))
    sizes = {Image.open(x).size for x in sl}
    flag = "OK " if sizes == {(1080, 1350)} and sl else "BAD"
    bad += flag == "BAD"
    print(f"{flag} {os.path.basename(d)[:40]:40} {len(sl)} slides {sizes}")
print("FAILURES:", bad)
