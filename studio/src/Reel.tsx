import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, CAPTION_Y, F, Tone, toneOf} from './brand';
import {FontFaces} from './fonts';
import {Grain, Wordmark, clamp} from './ui';
import {CtaScene, IllusScene, PhotoScene, StatScene, TitleScene} from './scenes/Basic';
import {BarsScene, BudgetScene, CalendarScene, DotsScene, FlowScene, GridScene, LineScene, ListScene, MathScene, QuoteScene, SplitScene, TimelineScene, TimerScene} from './scenes/Data';
import {PhoneScene} from './scenes/Phone';

export type Timing = {
  duration: number;
  beats: {s: number; e: number; scene_s: number; scene_e: number}[];
  chunks: {beat: number; s: number; e: number; words: {w: string; s: number; e: number}[]}[];
};
export type ReelProps = {reel: any; timing: Timing};

const SCENES: Record<string, React.FC<any>> = {
  title: TitleScene, illus: IllusScene, photo: PhotoScene, stat: StatScene, cta: CtaScene,
  list: ListScene, split: SplitScene, bars: BarsScene, math: MathScene, flow: FlowScene, timer: TimerScene,
  quote: QuoteScene, line: LineScene, calendar: CalendarScene, budget: BudgetScene, timeline: TimelineScene,
  grid: GridScene, dots: DotsScene, phone: PhoneScene,
};

export const sceneTone = (s: any): Tone => (s.t === 'title' ? toneOf(s.bg) : 'ink');

const Captions: React.FC<{timing: Timing; tones: Tone[]}> = ({timing, tones}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const chunks = timing.chunks;
  let idx = -1;
  for (let i = 0; i < chunks.length; i++) {
    const c = chunks[i];
    const next = chunks[i + 1];
    const end = next && next.beat === c.beat ? next.s : c.e + 0.35;
    if (t >= c.s - 0.04 && t < end) { idx = i; break; }
  }
  if (idx < 0) return null;
  const c = chunks[idx];
  const tone = tones[c.beat] || 'ink';
  const light = tone !== 'ink';
  const appear = interpolate(t, [c.s - 0.04, c.s + 0.08], [0, 1], clamp);
  const text = c.words.map((w) => w.w).join(' ');
  const fs = text.length > 18 ? 58 : 66;
  return (
    <div style={{position: 'absolute', left: 80, width: 860, top: CAPTION_Y - 60, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          fontFamily: F.sans,
          fontWeight: 800,
          fontSize: fs,
          letterSpacing: '-0.01em',
          textAlign: 'center',
          lineHeight: 1.1,
          transform: `scale(${0.94 + 0.06 * appear}) translateY(${(1 - appear) * 10}px)`,
          opacity: appear,
          textShadow: light ? 'none' : '0 4px 28px rgba(0,0,0,0.65), 0 1px 3px rgba(0,0,0,0.5)',
          whiteSpace: 'nowrap',
        }}
      >
        {c.words.map((w, i) => {
          const active = t >= w.s - 0.02 && t < (c.words[i + 1]?.s ?? w.e + 0.25);
          const said = t >= w.s - 0.02;
          return (
            <span key={i} style={{color: active ? (light ? (tone === 'gold' ? C.ink : C.goldInk) : C.gold) : light ? C.ink : C.white, opacity: said ? 1 : 0.55, marginRight: i < c.words.length - 1 ? '0.26em' : 0}}>
              {w.w}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const Chrome: React.FC<{tone: Tone; pillar: string}> = ({tone, pillar}) => {
  const light = tone !== 'ink';
  return (
    <div style={{position: 'absolute', top: 178, left: 80, display: 'flex', alignItems: 'center', gap: 18, opacity: 0.78}}>
      <Wordmark tone={light ? 'ivory' : 'ink'} size={22} />
      <div style={{width: 1, height: 22, background: light ? C.ink : C.ivory, opacity: 0.4}} />
      <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 18, letterSpacing: '0.22em', color: light ? C.ink : C.muted, textTransform: 'uppercase'}}>{pillar}</div>
    </div>
  );
};

export const Reel: React.FC<ReelProps> = ({reel, timing}) => {
  const {fps} = useVideoConfig();
  const f = useCurrentFrame();
  const beats = reel.beats;
  const tones = beats.map((b: any) => sceneTone(b.scene));
  const t = f / fps;
  let cur = 0;
  timing.beats.forEach((b, i) => { if (t >= b.scene_s) cur = i; });
  const isCta = beats[cur]?.scene?.t === 'cta';
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <FontFaces />
      {beats.map((b: any, i: number) => {
        const tb = timing.beats[i];
        // First scene is pre-rolled so the hook is already on screen at frame 0.
        const from = i === 0 ? -30 : Math.round(tb.scene_s * fps);
        const to = Math.round(tb.scene_e * fps);
        const Comp = SCENES[b.scene.t] || TitleScene;
        return (
          <Sequence key={i} from={from} durationInFrames={Math.max(1, to - from)} layout="none">
            <AbsoluteFill>
              <SceneWrap skip={i === 0}>
                <Comp s={b.scene} dur={Math.max(1, to - from)} tone={tones[i]} />
              </SceneWrap>
            </AbsoluteFill>
          </Sequence>
        );
      })}
      {!isCta && <Chrome tone={tones[cur]} pillar={reel.pillar} />}
      <Captions timing={timing} tones={tones} />
      <Grain />
    </AbsoluteFill>
  );
};

// Quick cut-in: slight zoom settle + flash of opacity for punchy edits.
const SceneWrap: React.FC<{children: React.ReactNode; skip?: boolean}> = ({children, skip}) => {
  const f = useCurrentFrame();
  if (skip) return <AbsoluteFill>{children}</AbsoluteFill>;
  const o = interpolate(f, [0, 4], [0.0, 1], clamp);
  const s = interpolate(f, [0, 8], [1.04, 1], clamp);
  return <AbsoluteFill style={{opacity: o, transform: `scale(${s})`}}>{children}</AbsoluteFill>;
};
