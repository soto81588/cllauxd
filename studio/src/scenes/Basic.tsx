import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, F, Tone, toneOf} from '../brand';
import {Illustration} from '../illustrations';
import {Bg, Headline, Kicker, Mark, Photo, Wordmark, accentOf, clamp, ease, fg, mutedOf, useEnter} from '../ui';

export type SceneProps = {s: any; dur: number; tone: Tone};

export const TitleScene: React.FC<SceneProps> = ({s, dur}) => {
  const tone = toneOf(s.bg);
  const f = useCurrentFrame();
  const z = interpolate(f, [0, dur], [1, 1.035], clamp);
  return (
    <AbsoluteFill>
      <Bg tone={tone} />
      <AbsoluteFill style={{padding: '0 90px', transform: `scale(${z})`}}>
        <div style={{position: 'absolute', left: 90, right: 90, top: s.text.length > 34 ? 470 : 540}}>
          <Kicker text={s.kicker} tone={tone} style={{marginBottom: 44}} />
          <Headline text={s.text} accent={s.accent} tone={tone} />
          {s.sub && (
            <div style={{marginTop: 36, fontFamily: F.sans, fontWeight: 700, fontSize: 48, color: mutedOf(tone), opacity: ease(f, 14, 26)}}>{s.sub}</div>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const IllusScene: React.FC<SceneProps> = ({s, dur}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, dur], [1, 1.04], clamp);
  const hasText = !!s.text;
  const size = hasText ? 560 : 680;
  return (
    <AbsoluteFill>
      <Bg tone="ink" />
      <AbsoluteFill style={{alignItems: 'center', transform: `scale(${z})`}}>
        <div style={{position: 'absolute', top: 300, width: '100%'}}>
          <Kicker text={s.label} tone="ink" center />
        </div>
        <div style={{position: 'absolute', top: hasText ? 380 : 400}}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle, rgba(197,169,117,0.22) 0%, transparent 62%)',
              transform: 'scale(1.3)',
              opacity: ease(f, 0, 20),
            }}
          />
          <Illustration name={s.icon} size={size} color={C.ivory} accent={C.gold} faintColor={C.muted} />
        </div>
        {hasText && (
          <div style={{position: 'absolute', top: 960, width: 900, textAlign: 'center'}}>
            <Headline text={s.text} accent={s.accent} tone="ink" size={s.text.length > 40 ? 64 : 80} align="center" delay={10} />
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const RINGS: Record<string, [number, number]> = {missed_call_jobsite: [0.555, 0.725]};
const FRAMING: Record<string, {scale: number; y: number}> = {missed_call_jobsite: {scale: 1.24, y: -200}};

export const PhotoScene: React.FC<SceneProps> = ({s, dur}) => {
  return (
    <AbsoluteFill>
      <Photo src={`img/${s.img}.jpg`} move={s.move} dur={dur} ring={RINGS[s.img]} framing={FRAMING[s.img]} />
      <AbsoluteFill style={{padding: '300px 80px 0 80px'}}>
        <Kicker text={s.label} tone="ink" />
        {s.text && (
          <div style={{marginTop: 30}}>
            <Headline text={s.text} tone="ink" size={88} />
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const parseNum = (v: string) => {
  const m = v.replace(/,/g, '').match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : null;
};

export const StatScene: React.FC<SceneProps> = ({s, dur}) => {
  const f = useCurrentFrame();
  const n = parseNum(s.value);
  const p = ease(f, 2, 26);
  let shown = s.value;
  if (s.count && n !== null && n > 0) {
    const cur = Math.round(n * p);
    const hasDec = /\./.test(s.value);
    const body = hasDec ? (n * p).toFixed(1) : cur.toLocaleString('en-US');
    shown = s.value.replace(/[\d,]+(\.\d+)?/, body);
  }
  const col = s.tone === 'red' ? C.bad : C.gold;
  const fs = s.value.length > 7 ? 190 : s.value.length > 4 ? 240 : 300;
  const strike = s.strike ? ease(f, 22, 36) : 0;
  const e = useEnter(0);
  return (
    <AbsoluteFill>
      <Bg tone="ink" />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 520}}>
        <div style={{position: 'relative', marginTop: 260, transform: `scale(${0.9 + 0.1 * e})`, opacity: e}}>
          <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: fs, color: col, letterSpacing: '-0.03em', lineHeight: 1}}>{shown}</div>
          {s.strike && (
            <div style={{position: 'absolute', left: -20, top: '52%', height: 10, width: `${strike * 110}%`, background: C.bad, borderRadius: 6, transform: 'rotate(-4deg)'}} />
          )}
        </div>
        <div style={{marginTop: 34, fontFamily: F.sans, fontWeight: 800, fontSize: 46, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.ivory, opacity: ease(f, 8, 20), textAlign: 'center', maxWidth: 860}}>
          {s.label}
        </div>
        {s.sub && (
          <div style={{marginTop: 22, fontFamily: F.sans, fontWeight: 600, fontSize: 40, color: C.muted, opacity: ease(f, 14, 26)}}>{s.sub}</div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const CtaScene: React.FC<SceneProps> = ({s, dur}) => {
  const f = useCurrentFrame();
  const e = useEnter(0);
  const pulse = 1 + 0.04 * Math.sin(Math.max(0, f - 18) / 5);
  return (
    <AbsoluteFill>
      <Bg tone="ink" grid={false} />
      <AbsoluteFill style={{background: 'radial-gradient(700px 700px at 540px 720px, rgba(197,169,117,0.22), transparent 70%)'}} />
      <AbsoluteFill style={{alignItems: 'center', paddingTop: 380}}>
        <div style={{opacity: e, transform: `translateY(${(1 - e) * 30}px)`}}>
          <Mark size={150} />
        </div>
        <div style={{marginTop: 26, opacity: ease(f, 4, 16)}}>
          <Wordmark tone="ink" size={34} />
        </div>
        <div style={{marginTop: 70, width: 880, textAlign: 'center'}}>
          <Headline text={s.line} tone="ink" size={s.line.length > 30 ? 74 : 88} align="center" delay={6} />
        </div>
        <div
          style={{
            marginTop: 56,
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            padding: '22px 46px',
            borderRadius: 999,
            border: `2px solid ${C.gold}`,
            fontFamily: F.sans,
            fontWeight: 800,
            fontSize: 40,
            color: C.gold,
            opacity: ease(f, 16, 28),
            transform: `scale(${pulse})`,
          }}
        >
          {s.sub}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
