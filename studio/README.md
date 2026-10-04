# Vantier Content Studio

The production source for `../vantier-instagram-library`: the content plan, a Remotion motion system (React), and the Python audio pipeline. Edit a script or scene, re-run, and every Reel re-times and re-renders.

```
content/            the plan (single source of truth)
  dsl.py              scene vocabulary (title, illus, photo, phone, stat, list, split, bars, math, flow, timer, quote, line, calendar, budget, timeline, grid, dots, cta)
  reels_a.py          R01–R17: beats = (spoken line, scene), caption, hashtags, CTA
  reels_b.py          R18–R34
  carousels.py        C01–C18 slides + captions
  build_plan.py       validates (count, uniqueness, banned industries/cities, VO length) -> public/data/plan.json
  image_bank.py       prompts used for photoreal stills
src/                Remotion: Reel, Cover and Slide compositions, scenes/, illustrations.tsx, brand.ts
pipeline/
  vo_kokoro.py        voice-over per beat + word timings + caption chunks -> public/audio/vo, public/data/timing
  audio_assets.py     original music beds (pulse/glass/drive) + SFX kit -> public/audio
  mix.py              VO + ducked music + SFX, mastered to -14 LUFS -> out/<ID>_mix.wav, out/<ID>_vo-sfx.wav
  render.mjs          stills | reels | covers | slides  (headless Chromium, swiftshader GL)
  qc.sh               mid-scene QC frames + contact sheets
  build_library.py    muxes audio, copies media, writes captions/scripts/index/calendar/shot list
```

## Rebuild everything

```bash
npm install                      # Remotion 4 + React 18
pip install kokoro-onnx soundfile numpy scipy pyloudnorm pillow
# Kokoro model files (Apache-2.0), once:
#   https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
#   https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
export KOKORO_DIR=/path/to/kokoro-models

cd content && python3 build_plan.py && cd ..
python3 pipeline/vo_kokoro.py          # all reels (or: R07 R13)
python3 pipeline/audio_assets.py       # deterministic, same output each run
python3 pipeline/mix.py
pipeline/render_all.sh                 # slides, covers, reels (~50 min on 4 CPU cores)
python3 pipeline/build_library.py
```

## Swapping the narrator (e.g. Juan's own voice)

Put one WAV per Reel at `public/audio/vo/<ID>.wav`, read straight through the script in `vantier-instagram-library/reels/<ID>/script.md`. Leave a short pause between sentences. Then re-time the captions to the new audio. Either use an aligner of your choice to produce `public/data/timing/<ID>.json` in the same format, or keep Kokoro's timing and adjust `VO_SPEED` until the lengths match. Then run `mix.py`, `render.mjs reels <ID>` and `build_library.py`.

To use ElevenLabs instead: generate each beat separately (or the whole script with pauses) on a paid plan, so the output is commercially licensed, and follow the same steps.

## Swapping in stock footage

Add a photo scene (`PH("my_clip_still", move="in")`) or extend `PhotoScene` with `<OffthreadVideo>` for licensed 9:16 clips. Timecodes per scene are in each Reel's `script.md` and in `STOCK_SHOTLIST.md`.
