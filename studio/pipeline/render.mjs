// Render driver: bundles the Remotion project once, then renders what you ask for.
//   node pipeline/render.mjs stills R01:0,60,200 R03:30      -> QC frames (PNG)
//   node pipeline/render.mjs reels [R01 R02 ...]              -> silent 1080x1920 MP4s
//   node pipeline/render.mjs covers [R01 ...]                 -> reel cover JPGs
//   node pipeline/render.mjs slides [C01 ...]                 -> carousel slide JPGs
import {bundle} from '@remotion/bundler';
import {renderMedia, renderStill, selectComposition} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = process.env.OUT_DIR || path.join(ROOT, 'out');
const BROWSER = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const [mode, ...args] = process.argv.slice(2);
const plan = JSON.parse(fs.readFileSync(path.join(ROOT, 'public/data/plan.json'), 'utf8'));

const serveUrl = await bundle({entryPoint: path.join(ROOT, 'src/index.ts'), publicDir: path.join(ROOT, 'public')});
const GL = process.env.GL || 'swiftshader';
const common = {serveUrl, browserExecutable: BROWSER, chromiumOptions: {gl: GL === 'default' ? null : GL}, logLevel: 'error'};
fs.mkdirSync(OUT, {recursive: true});

const comp = (id, inputProps) => selectComposition({...common, id, inputProps});

if (mode === 'stills') {
  for (const a of args) {
    const [id, frames] = a.split(':');
    const c = await comp('Reel', {id});
    for (const fr of frames.split(',').map(Number)) {
      const out = path.join(OUT, `qc_${id}_${fr}.png`);
      await renderStill({...common, composition: c, frame: Math.min(fr, c.durationInFrames - 1), output: out, inputProps: {id}});
      console.log(out);
    }
  }
} else if (mode === 'reels') {
  const ids = args.length ? args : plan.reels.map((r) => r.id);
  for (const id of ids) {
    const t0 = Date.now();
    const c = await comp('Reel', {id});
    const out = path.join(OUT, `${id}_video.mp4`);
    await renderMedia({
      ...common,
      composition: c,
      codec: 'h264',
      crf: 18,
      muted: true,
      outputLocation: out,
      inputProps: {id},
      concurrency: Number(process.env.CONC || Math.max(1, os.cpus().length)),
      frameRange: process.env.RANGE ? process.env.RANGE.split('-').map(Number) : undefined,
      imageFormat: 'jpeg',
      jpegQuality: 92,
    });
    console.log(`${id}: ${c.durationInFrames} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s -> ${out}`);
  }
} else if (mode === 'covers') {
  const ids = args.length ? args : plan.reels.map((r) => r.id);
  for (const id of ids) {
    const c = await comp('Cover', {id});
    const out = path.join(OUT, `${id}_cover.jpg`);
    await renderStill({...common, composition: c, frame: 0, output: out, inputProps: {id}, imageFormat: 'jpeg', jpegQuality: 94});
    console.log(out);
  }
} else if (mode === 'slides') {
  const ids = args.length ? args : plan.carousels.map((c) => c.id);
  for (const id of ids) {
    const car = plan.carousels.find((c) => c.id === id);
    for (let i = 0; i < car.slides.length; i++) {
      const c = await comp('Slide', {id, index: i});
      const out = path.join(OUT, `${id}_slide${String(i + 1).padStart(2, '0')}.jpg`);
      await renderStill({...common, composition: c, frame: 0, output: out, inputProps: {id, index: i}, imageFormat: 'jpeg', jpegQuality: 94});
    }
    console.log(`${id}: ${car.slides.length} slides`);
  }
}
