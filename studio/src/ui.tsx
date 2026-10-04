import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {C, F, Tone, accentOf, bgOf, fg, mutedOf} from './brand';

export const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

export const useEnter = (delay = 0, damping = 16, mass = 0.7) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - delay, fps, config: {damping, mass, stiffness: 140}});
};

export const ease = (f: number, a: number, b: number, from = 0, to = 1, e = Easing.out(Easing.cubic)) =>
  interpolate(f, [a, b], [from, to], {...clamp, easing: e});

// Grain overlay (cycled tiles) for a filmic finish.
export const Grain: React.FC<{opacity?: number}> = ({opacity = 0.07}) => {
  const f = useCurrentFrame();
  const i = Math.floor(f / 2) % 4;
  const ox = (f * 37) % 540, oy = (f * 61) % 540;
  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url(${staticFile(`fx/grain${i}.png`)})`,
        backgroundPosition: `${ox}px ${oy}px`,
        mixBlendMode: 'overlay',
        opacity,
        pointerEvents: 'none',
      }}
    />
  );
};

export const Bg: React.FC<{tone: Tone; glow?: boolean; grid?: boolean}> = ({tone, glow = true, grid = true}) => {
  const f = useCurrentFrame();
  const base = bgOf(tone);
  const gl = tone === 'ink' ? 'rgba(197,169,117,0.16)' : tone === 'ivory' ? 'rgba(163,137,93,0.12)' : 'rgba(255,255,255,0.18)';
  const gridCol = tone === 'ink' ? 'rgba(245,242,237,0.035)' : 'rgba(26,26,26,0.05)';
  const drift = Math.sin(f / 60) * 40;
  return (
    <AbsoluteFill style={{background: base}}>
      {glow && (
        <AbsoluteFill
          style={{background: `radial-gradient(900px 900px at ${540 + drift}px 640px, ${gl}, transparent 70%)`}}
        />
      )}
      {grid && (
        <AbsoluteFill
          style={{
            backgroundImage: `linear-gradient(${gridCol} 1px, transparent 1px), linear-gradient(90deg, ${gridCol} 1px, transparent 1px)`,
            backgroundSize: '120px 120px',
            backgroundPosition: '0px 0px',
            maskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)',
          }}
        />
      )}
      {tone === 'ink' && (
        <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)'}} />
      )}
    </AbsoluteFill>
  );
};

export const Kicker: React.FC<{text?: string; tone: Tone; delay?: number; center?: boolean; style?: React.CSSProperties}> = ({
  text,
  tone,
  delay = 0,
  center = false,
  style,
}) => {
  const f = useCurrentFrame();
  if (!text) return null;
  const o = ease(f, delay, delay + 10);
  const w = ease(f, delay, delay + 14, 0, 64);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: center ? 'center' : 'flex-start',
        gap: 18,
        opacity: o,
        fontFamily: F.sans,
        fontWeight: 700,
        fontSize: 26,
        letterSpacing: '0.3em',
        color: accentOf(tone),
        textTransform: 'uppercase',
        ...style,
      }}
    >
      <div style={{width: w, height: 2, background: accentOf(tone)}} />
      <span>{text}</span>
      {center && <div style={{width: w, height: 2, background: accentOf(tone)}} />}
    </div>
  );
};

// Split a headline into words, marking the accent substring.
export const splitAccent = (text: string, accent?: string | null) => {
  const words = text.split(' ');
  if (!accent) return words.map((w) => ({w, a: false}));
  const start = text.indexOf(accent);
  if (start < 0) return words.map((w) => ({w, a: false}));
  const end = start + accent.length;
  let pos = 0;
  return words.map((w) => {
    const s = pos, e = pos + w.length;
    pos = e + 1;
    return {w, a: s < end && e > start};
  });
};

export const Headline: React.FC<{
  text: string;
  accent?: string | null;
  tone: Tone;
  size?: number;
  delay?: number;
  align?: 'left' | 'center';
  maxWidth?: number;
  stagger?: number;
}> = ({text, accent, tone, size, delay = 0, align = 'left', maxWidth = 900, stagger = 2.2}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const L = text.length;
  const fs = size || (L <= 22 ? 124 : L <= 32 ? 110 : L <= 44 ? 96 : 84);
  const parts = splitAccent(text, accent);
  return (
    <div
      style={{
        fontFamily: F.serif,
        fontWeight: 600,
        fontSize: fs,
        lineHeight: 1.06,
        letterSpacing: '-0.015em',
        color: fg(tone),
        textAlign: align,
        maxWidth,
        textWrap: 'balance' as any,
      }}
    >
      {parts.map(({w, a}, i) => {
        const s = spring({frame: f - delay - i * stagger, fps, config: {damping: 15, mass: 0.6, stiffness: 150}});
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              marginRight: '0.24em',
              transform: `translateY(${(1 - s) * 46}px)`,
              opacity: s,
              fontStyle: a ? 'italic' : 'normal',
              color: a ? accentOf(tone) : undefined,
              fontWeight: a ? 500 : 600,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

export const Photo: React.FC<{src: string; move?: string; dur: number; ring?: [number, number]; framing?: {scale: number; y: number}}> = ({src, move = 'in', dur, ring, framing}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, Math.max(1, dur)], [0, 1], clamp);
  let s = 1.08, x = 0, y = 0;
  if (move === 'in') s = 1.06 + 0.12 * p;
  if (move === 'out') s = 1.2 - 0.12 * p;
  if (move === 'left') { s = 1.16; x = 40 - 80 * p; }
  if (move === 'right') { s = 1.16; x = -40 + 80 * p; }
  if (move === 'up') { s = 1.14; y = 50 - 100 * p; }
  const fr = framing || {scale: 1, y: 0};
  const tr = `translateY(${fr.y}px) scale(${s * fr.scale}) translate(${x}px, ${y}px)`;
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: C.ink}}>
      <AbsoluteFill style={{transform: tr, transformOrigin: '50% 55%'}}>
        <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.06) saturate(0.88) sepia(0.06)'}} />
        {ring &&
          [0, 1, 2].map((k) => {
            const t = ((f + k * 12) % 36) / 36;
            return (
              <div
                key={k}
                style={{
                  position: 'absolute',
                  left: `${ring[0] * 100}%`,
                  top: `${ring[1] * 100}%`,
                  width: 120 + t * 260,
                  height: 120 + t * 260,
                  marginLeft: -(60 + t * 130),
                  marginTop: -(60 + t * 130),
                  borderRadius: '50%',
                  border: `3px solid ${C.gold}`,
                  opacity: (1 - t) * 0.8,
                }}
              />
            );
          })}
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(10,10,9,0.55) 0%, rgba(10,10,9,0) 26%, rgba(10,10,9,0) 52%, rgba(10,10,9,0.78) 78%, rgba(10,10,9,0.92) 100%)'}} />
    </AbsoluteFill>
  );
};

export const Card: React.FC<{tone: Tone; gold?: boolean; style?: React.CSSProperties; children: React.ReactNode}> = ({tone, gold, style, children}) => (
  <div
    style={{
      background: tone === 'ink' ? 'rgba(33,31,28,0.86)' : '#FBF9F5',
      border: `2px solid ${gold ? accentOf(tone) : tone === 'ink' ? C.line : C.ivoryLine}`,
      borderRadius: 28,
      boxShadow: gold ? `0 0 60px rgba(197,169,117,0.18)` : '0 20px 60px rgba(0,0,0,0.25)',
      ...style,
    }}
  >
    {children}
  </div>
);

export const Mark: React.FC<{size?: number; opacity?: number}> = ({size = 120, opacity = 1}) => (
  <Img src={staticFile('vantier-mark.png')} style={{width: size, height: 'auto', opacity}} />
);

export const Wordmark: React.FC<{tone: Tone; size?: number; opacity?: number}> = ({tone, size = 26, opacity = 1}) => (
  <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: size, letterSpacing: '0.34em', color: fg(tone), opacity}}>VANTIER</div>
);

export const Check: React.FC<{tone: Tone; kind?: 'check' | 'x' | 'dot'; size?: number}> = ({tone, kind = 'check', size = 56}) => {
  const col = kind === 'x' ? C.bad : accentOf(tone);
  return (
    <svg width={size} height={size} viewBox="0 0 56 56">
      <circle cx="28" cy="28" r="25" fill="none" stroke={col} strokeWidth="3" />
      {kind === 'check' && <path d="M17 29 L25 37 L40 20" fill="none" stroke={col} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}
      {kind === 'x' && <path d="M19 19 L37 37 M37 19 L19 37" fill="none" stroke={col} strokeWidth="4" strokeLinecap="round" />}
      {kind === 'dot' && <circle cx="28" cy="28" r="8" fill={col} />}
    </svg>
  );
};

export {mutedOf, accentOf, fg};
