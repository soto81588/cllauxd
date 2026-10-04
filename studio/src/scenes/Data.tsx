import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {C, F} from '../brand';
import {Illustration} from '../illustrations';
import {Bg, Card, Check, Kicker, clamp, ease, useEnter} from '../ui';
import {SceneProps} from './Basic';

const Frame: React.FC<{kicker?: string; children: React.ReactNode; top?: number}> = ({kicker, children, top = 300}) => (
  <AbsoluteFill>
    <Bg tone="ink" />
    <AbsoluteFill style={{padding: `${top}px 90px 0 90px`}}>
      {kicker && <Kicker text={kicker} tone="ink" style={{marginBottom: 46}} />}
      {children}
    </AbsoluteFill>
  </AbsoluteFill>
);

const sp = (f: number, d: number, fps: number) => spring({frame: f - d, fps, config: {damping: 15, mass: 0.6, stiffness: 150}});

// ---------------- List ----------------
export const ListScene: React.FC<SceneProps> = ({s, dur}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const items: string[] = s.items;
  const prog = s.hl !== null && s.hl !== undefined;
  const n = items.length;
  const step = prog ? 0 : Math.min(14, Math.max(6, Math.floor((dur * 0.55) / n)));
  if (s.mode === 'plain') {
    return (
      <Frame top={420}>
        {items.map((t, i) => {
          const e = sp(f, 4 + i * Math.min(16, Math.floor(dur / (n + 1))), fps);
          const last = i === n - 1;
          return (
            <div key={i} style={{fontFamily: F.serif, fontWeight: 600, fontSize: 104, lineHeight: 1.15, color: last ? C.gold : C.ivory, fontStyle: last ? 'italic' : 'normal', opacity: e, transform: `translateY(${(1 - e) * 40}px)`}}>
              {t}
            </div>
          );
        })}
      </Frame>
    );
  }
  return (
    <Frame kicker={s.title} top={n >= 4 ? 400 : 470}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 46}}>
        {items.map((t, i) => {
          let o = 1, y = 0, active = false;
          if (prog) {
            if (i < s.hl) { o = 0.5; }
            else if (i === s.hl) { const e = sp(f, 2, fps); o = e; y = (1 - e) * 30; active = true; }
            else o = 0.14;
          } else {
            const e = sp(f, 3 + i * step, fps);
            o = e; y = (1 - e) * 30;
          }
          const kind = s.mode === 'check' ? 'check' : s.mode === 'x' ? 'x' : s.mode === 'mixed' ? (i === n - 1 ? 'x' : 'check') : null;
          const strike = s.mode === 'strike' ? ease(f, 10 + i * step, 22 + i * step) : 0;
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 32, opacity: o, transform: `translateY(${y}px)`}}>
              {kind ? (
                <Check tone="ink" kind={kind as any} size={84} />
              ) : s.mode === 'strike' ? (
                <Check tone="ink" kind="x" size={84} />
              ) : (
                <div style={{width: 110, fontFamily: F.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 76, color: C.gold}}>{String(i + 1).padStart(2, '0')}</div>
              )}
              <div style={{position: 'relative', fontFamily: F.sans, fontWeight: 800, fontSize: items.some((x) => x.length > 30) ? 56 : items.some((x) => x.length > 20) ? 62 : 72, color: active ? C.gold : C.ivory, lineHeight: 1.15, maxWidth: 780}}>
                {t}
                {s.mode === 'strike' && <div style={{position: 'absolute', left: 0, top: '54%', height: 6, width: `${strike * 100}%`, background: C.bad, borderRadius: 4}} />}
              </div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
};

// ---------------- Split ----------------
export const SplitScene: React.FC<SceneProps> = ({s}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const col = (side: 'left' | 'right', d: number) => {
    const e = sp(f, d, fps);
    const win = s.win === side;
    const lose = s.win !== 'none' && s.win !== side && !!s.win;
    const data = s[side];
    return (
      <div style={{flex: 1, opacity: e, transform: `translateX(${(1 - e) * (side === 'left' ? -60 : 60)}px)`}}>
        <Card tone="ink" gold={win} style={{padding: '44px 36px', minHeight: 560, opacity: lose ? 0.7 : 1}}>
          <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: data.h.length > 12 ? 52 : 64, color: win ? C.gold : C.ivory, lineHeight: 1.05, marginBottom: 34}}>{data.h}</div>
          {data.l.map((t: string, i: number) => (
            <div key={i} style={{display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 22, opacity: ease(f, d + 8 + i * 5, d + 16 + i * 5)}}>
              <div style={{width: 12, height: 12, borderRadius: 6, marginTop: 18, background: win ? C.gold : lose ? C.bad : C.muted, flexShrink: 0}} />
              <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 42, color: lose ? C.muted : C.ivory, lineHeight: 1.2}}>{t}</div>
            </div>
          ))}
        </Card>
      </div>
    );
  };
  return (
    <Frame kicker={s.title} top={s.title ? 330 : 400}>
      <div style={{display: 'flex', gap: 28, alignItems: 'stretch', position: 'relative'}}>
        {col('left', 0)}
        <div style={{position: 'absolute', left: '50%', top: 250, transform: 'translate(-50%, 0)', width: 76, height: 76, borderRadius: 38, background: C.ink, border: `2px solid ${C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.serif, fontStyle: 'italic', fontSize: 34, color: C.gold, zIndex: 2, opacity: ease(f, 6, 14)}}>vs</div>
        {col('right', 6)}
      </div>
    </Frame>
  );
};

// ---------------- Bars ----------------
export const BarsScene: React.FC<SceneProps> = ({s}) => {
  const f = useCurrentFrame();
  const bars = s.bars;
  const max = Math.max(...bars.map((b: any) => b.v), 1);
  return (
    <Frame kicker={s.title} top={360}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 46, marginTop: 10}}>
        {bars.map((b: any, i: number) => {
          const p = ease(f, 4 + i * 6, 30 + i * 6, 0, 1, Easing.out(Easing.quad));
          const win = s.win === i;
          const w = Math.max(0.035, b.v / max) * 760 * p;
          return (
            <div key={i}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14}}>
                <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 40, color: win ? C.gold : C.ivory, opacity: ease(f, i * 6, i * 6 + 10)}}>{b.l}</div>
                <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: 70, color: win ? C.gold : C.ivory, opacity: ease(f, 14 + i * 6, 24 + i * 6)}}>{b.d}</div>
              </div>
              <div style={{height: 64, width: 900, borderRadius: 14, background: 'rgba(245,242,237,0.06)', overflow: 'hidden'}}>
                <div style={{height: '100%', width: w, borderRadius: 14, background: win ? `linear-gradient(90deg, ${C.goldDeep}, ${C.goldLight})` : 'rgba(245,242,237,0.32)', boxShadow: win ? '0 0 40px rgba(197,169,117,0.35)' : 'none'}} />
              </div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
};

// ---------------- Math ----------------
export const MathScene: React.FC<SceneProps> = ({s}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const rows = s.rows;
  const lastNew = rows.length - 1;
  return (
    <Frame kicker={s.note} top={380}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 40}}>
        {rows.map((r: any, i: number) => {
          const isNew = i === lastNew;
          const e = isNew ? sp(f, 2, fps) : 1;
          const res = isNew ? ease(f, 12, 24) : 1;
          return (
            <div key={i} style={{opacity: isNew ? e : 0.55, transform: `translateY(${(1 - e) * 30}px)`, borderBottom: `1px solid ${C.line}`, paddingBottom: 30}}>
              <div style={{display: 'flex', alignItems: 'baseline', gap: 24, flexWrap: 'wrap'}}>
                <span style={{fontFamily: F.serif, fontWeight: 600, fontSize: 92, color: C.ivory}}>{r.a}</span>
                <span style={{fontFamily: F.sans, fontWeight: 700, fontSize: 52, color: C.muted}}>{r.b}</span>
              </div>
              <div style={{display: 'flex', alignItems: 'baseline', gap: 22, opacity: res, marginTop: 6}}>
                <span style={{fontFamily: F.sans, fontWeight: 700, fontSize: 56, color: C.muted}}>=</span>
                <span style={{fontFamily: F.serif, fontWeight: 600, fontSize: isNew ? 128 : 96, color: C.gold, letterSpacing: '-0.02em'}}>{r.r}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
};

// ---------------- Flow ----------------
export const FlowScene: React.FC<SceneProps> = ({s}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const nodes: string[] = s.nodes;
  const n = nodes.length;
  const h = n > 4 ? 96 : 112, gap = n > 4 ? 38 : 56;
  const top = s.title ? 0 : 40;
  const all = s.active === 99;
  return (
    <Frame kicker={s.title} top={s.title ? 330 : 360}>
      <div style={{position: 'relative', marginTop: top, width: 900}}>
        {nodes.map((t, i) => {
          const isA = all || s.active === i;
          const past = !all && s.active !== null && s.active !== undefined && s.active >= 0 && i < s.active;
          const fresh = s.active === undefined || s.active === null;
          const e = fresh ? sp(f, 2 + i * 7, fps) : 1;
          const glow = isA ? ease(f, 0, 10) : 0;
          return (
            <div key={i}>
              <div
                style={{
                  height: h,
                  width: 720,
                  borderRadius: h / 2,
                  border: `2px solid ${isA ? C.gold : past ? C.goldDeep : C.line}`,
                  background: isA && !all ? C.gold : 'rgba(33,31,28,0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 26,
                  padding: '0 40px',
                  opacity: e * (s.active === -1 ? 0.75 : 1),
                  transform: `translateX(${(1 - e) * -40}px) scale(${isA && !all ? 1 + 0.03 * glow : 1})`,
                  boxShadow: isA ? `0 0 ${50 * glow}px rgba(197,169,117,0.45)` : 'none',
                }}
              >
                <span style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: 44, color: isA && !all ? C.ink : C.gold, width: 56}}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{fontFamily: F.sans, fontWeight: 800, fontSize: n > 4 ? 44 : 48, color: isA && !all ? C.ink : C.ivory}}>{t}</span>
              </div>
              {i < n - 1 && (
                <div style={{marginLeft: 80, width: 3, height: gap, background: past || all || (isA && false) ? C.gold : C.line, position: 'relative'}}>
                  {(isA || all) && <div style={{position: 'absolute', left: -6, top: ((f * 2) % gap) - 6, width: 15, height: 15, borderRadius: 8, background: C.gold}} />}
                </div>
              )}
            </div>
          );
        })}
        {s.loop && (
          <svg style={{position: 'absolute', left: 720, top: h / 2, overflow: 'visible'}} width={160} height={(n - 1) * (h + gap)}>
            <path
              d={`M0 ${(n - 1) * (h + gap)} C 120 ${(n - 1) * (h + gap)} 120 0 0 0`}
              fill="none"
              stroke={all || s.active === n - 1 ? C.gold : C.line}
              strokeWidth={3}
              strokeDasharray="10 12"
              strokeDashoffset={-f * 1.5}
            />
            <path d="M14 -10 L0 0 L14 10" fill="none" stroke={all || s.active === n - 1 ? C.gold : C.line} strokeWidth={3} />
          </svg>
        )}
      </div>
    </Frame>
  );
};

// ---------------- Timer ----------------
export const TimerScene: React.FC<SceneProps> = ({s, dur}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [3, Math.max(8, dur - 6)], [0, 1], {...clamp, easing: Easing.inOut(Easing.quad)});
  const col = s.tone === 'red' ? C.bad : C.gold;
  const val = s.to * p;
  let txt = '';
  if (s.unit === 'sec') txt = s.to <= 3 ? `${Math.max(0, Math.ceil(s.to - val))}` : `${val.toFixed(1)}s`;
  else {
    const m = Math.floor(val / 60), sec = Math.floor(val % 60);
    txt = `${m}:${String(sec).padStart(2, '0')}`;
  }
  const R = 250, Cc = 2 * Math.PI * R;
  const e = useEnter(0);
  return (
    <AbsoluteFill>
      <Bg tone="ink" />
      <AbsoluteFill style={{alignItems: 'center', paddingTop: 340}}>
        <div style={{position: 'relative', width: 600, height: 600, transform: `scale(${0.92 + 0.08 * e})`, opacity: e}}>
          <svg width={600} height={600} style={{position: 'absolute'}}>
            <circle cx={300} cy={300} r={R} fill="none" stroke="rgba(245,242,237,0.08)" strokeWidth={14} />
            {[...Array(60)].map((_, i) => {
              const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
              const r1 = R + 26, r2 = R + (i % 5 === 0 ? 46 : 36);
              return <line key={i} x1={300 + r1 * Math.cos(a)} y1={300 + r1 * Math.sin(a)} x2={300 + r2 * Math.cos(a)} y2={300 + r2 * Math.sin(a)} stroke="rgba(245,242,237,0.18)" strokeWidth={i % 5 === 0 ? 4 : 2} />;
            })}
            <circle cx={300} cy={300} r={R} fill="none" stroke={col} strokeWidth={14} strokeLinecap="round" strokeDasharray={Cc} strokeDashoffset={Cc * (1 - p)} transform="rotate(-90 300 300)" style={{filter: `drop-shadow(0 0 18px ${col})`}} />
          </svg>
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.serif, fontWeight: 600, fontSize: txt.length > 5 ? 150 : 180, color: C.ivory, fontVariantNumeric: 'tabular-nums'}}>{txt}</div>
        </div>
        <div style={{marginTop: 56, fontFamily: F.sans, fontWeight: 800, fontSize: 46, letterSpacing: '0.06em', textTransform: 'uppercase', color: col, opacity: ease(f, 6, 18), textAlign: 'center', maxWidth: 880}}>{s.label}</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------------- Quote ----------------
export const QuoteScene: React.FC<SceneProps> = ({s, dur}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const lines: string[] = s.lines;
  if (s.kind === 'thought') {
    const pos = [[90, 420], [260, 700], [120, 980]];
    return (
      <AbsoluteFill>
        <Bg tone="ink" />
        {lines.map((t, i) => {
          const d = 2 + i * Math.min(14, Math.floor(dur / (lines.length + 1)));
          const e = sp(f, d, fps);
          return (
            <div key={i} style={{position: 'absolute', left: pos[i % 3][0], top: pos[i % 3][1], opacity: e, transform: `translateY(${(1 - e) * 30 + Math.sin((f + i * 20) / 18) * 6}px)`}}>
              <div style={{padding: '30px 42px', borderRadius: 40, background: 'rgba(245,242,237,0.08)', border: `1px solid ${C.line}`, fontFamily: F.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 58, color: C.ivory, maxWidth: 780}}>{t}</div>
            </div>
          );
        })}
      </AbsoluteFill>
    );
  }
  const gold = s.kind === 'offer';
  const bad = s.kind === 'bad';
  const review = s.kind === 'review';
  const stamp = bad ? ease(f, Math.min(24, dur * 0.5), Math.min(32, dur * 0.5 + 8)) : 0;
  return (
    <Frame top={review ? 330 : 400}>
      <Kicker text={s.label} tone="ink" style={{marginBottom: 40}} />
      {review && s.icon && (
        <div style={{position: 'absolute', right: 90, top: 250, opacity: 0.9}}>
          <Illustration name={s.icon} size={220} color={C.muted} accent={C.gold} faintColor={C.line} />
        </div>
      )}
      <Card tone="ink" gold={gold || review} style={{padding: '56px 52px', position: 'relative', opacity: bad ? 0.92 : 1}}>
        {review && (
          <div style={{display: 'flex', gap: 10, marginBottom: 30}}>
            {[0, 1, 2, 3, 4].map((k) => (
              <svg key={k} width={52} height={52} viewBox="0 0 24 24" style={{opacity: ease(f, 2 + k * 3, 8 + k * 3)}}>
                <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z" fill={C.gold} />
              </svg>
            ))}
          </div>
        )}
        {lines.map((t, i) => {
          const e = sp(f, 3 + i * 8, fps);
          return (
            <div key={i} style={{display: 'flex', gap: 22, alignItems: 'flex-start', marginBottom: i < lines.length - 1 ? 26 : 0, opacity: e, transform: `translateY(${(1 - e) * 24}px)`}}>
              {gold && <div style={{marginTop: 8}}><Check tone="ink" size={52} /></div>}
              <div
                style={{
                  fontFamily: bad || review ? F.serif : F.sans,
                  fontStyle: bad || review ? 'italic' : 'normal',
                  fontWeight: bad || review ? 500 : 800,
                  fontSize: review ? 54 : gold ? (t.length > 34 ? 48 : 56) : 72,
                  lineHeight: 1.22,
                  color: bad ? C.muted : gold && i === 0 ? C.gold : C.ivory,
                }}
              >
                {t}
              </div>
            </div>
          );
        })}
        {review && s.who && <div style={{marginTop: 34, fontFamily: F.sans, fontWeight: 700, fontSize: 38, color: C.gold, opacity: ease(f, 16, 26)}}>— {s.who}</div>}
        {bad && (
          <div style={{position: 'absolute', right: -24, top: -34, transform: `scale(${1.6 - 0.6 * stamp}) rotate(-10deg)`, opacity: stamp}}>
            <div style={{border: `5px solid ${C.bad}`, color: C.bad, fontFamily: F.sans, fontWeight: 800, fontSize: 40, letterSpacing: '0.18em', padding: '10px 22px', borderRadius: 10, background: 'rgba(15,14,13,0.9)'}}>GENERIC</div>
          </div>
        )}
      </Card>
    </Frame>
  );
};

// ---------------- Line chart ----------------
export const LineScene: React.FC<SceneProps> = ({s, dur}) => {
  const f = useCurrentFrame();
  const pts: number[] = s.points;
  const W = 880, H = 560;
  const min = Math.min(...pts) * 0.7, max = Math.max(...pts) * 1.15;
  const xy = pts.map((v, i) => [(i / (pts.length - 1)) * W, H - ((v - min) / (max - min)) * H]);
  const d = xy.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const p = ease(f, 4, Math.min(dur - 4, 40), 0, 1, Easing.inOut(Easing.quad));
  const markX = s.mark !== null && s.mark !== undefined ? xy[s.mark][0] : null;
  const col = s.good ? C.gold : C.gold;
  return (
    <Frame kicker={s.title} top={340}>
      <svg width={W + 40} height={H + 80} style={{overflow: 'visible', marginTop: 20}}>
        {[0, 1, 2, 3].map((k) => (
          <line key={k} x1={0} x2={W} y1={(k / 3) * H} y2={(k / 3) * H} stroke="rgba(245,242,237,0.07)" strokeWidth={2} />
        ))}
        <defs>
          <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={col} stopOpacity="0.28" />
            <stop offset="1" stopColor={col} stopOpacity="0" />
          </linearGradient>
          <clipPath id="lc"><rect x={0} y={-40} width={W * p + 2} height={H + 80} /></clipPath>
        </defs>
        <g clipPath="url(#lc)">
          <path d={`${d} L${W} ${H} L0 ${H} Z`} fill="url(#lg)" />
          <path d={d} fill="none" stroke={col} strokeWidth={8} strokeLinejoin="round" strokeLinecap="round" />
          {markX !== null && <path d={xy.slice(s.mark).map((q, i) => `${i ? 'L' : 'M'}${q[0]} ${q[1]}`).join(' ')} fill="none" stroke={C.bad} strokeWidth={8} strokeLinejoin="round" strokeLinecap="round" />}
        </g>
        {markX !== null && p > s.mark / (pts.length - 1) && (
          <g opacity={ease(f, 20, 30)}>
            <line x1={markX} x2={markX} y1={0} y2={H} stroke={C.muted} strokeWidth={3} strokeDasharray="10 10" />
            <text x={markX + 16} y={40} fill={C.muted} style={{fontFamily: F.sans, fontWeight: 700, fontSize: 34}}>DAY 14</text>
          </g>
        )}
        {(s.refresh || []).map((r: number, i: number) =>
          p > r / (pts.length - 1) ? (
            <g key={i} transform={`translate(${xy[r][0]} ${xy[r][1]})`} opacity={1}>
              <rect x={-14} y={-14} width={28} height={28} transform="rotate(45)" fill={C.ink} stroke={C.gold} strokeWidth={4} />
              <text x={0} y={-36} textAnchor="middle" fill={C.goldLight} style={{fontFamily: F.sans, fontWeight: 700, fontSize: 26}}>NEW</text>
            </g>
          ) : null,
        )}
        <text x={0} y={H + 56} fill={C.muted} style={{fontFamily: F.sans, fontWeight: 700, fontSize: 28}}>WEEK 1</text>
        <text x={W} y={H + 56} textAnchor="end" fill={C.muted} style={{fontFamily: F.sans, fontWeight: 700, fontSize: 28}}>WEEK 5</text>
      </svg>
    </Frame>
  );
};

// ---------------- Calendar ----------------
export const CalendarScene: React.FC<SceneProps> = ({s, dur}) => {
  const f = useCurrentFrame();
  const cols = 5, rows = 4, N = cols * rows;
  const target = Math.round(N * s.fill);
  const order = [...Array(N).keys()].sort((a, b) => ((a * 7919) % 23) - ((b * 7919) % 23));
  const filled = Math.round(target * ease(f, 4, Math.min(dur - 2, 40)));
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const cell = s.cell || 'BOOKED';
  const noun = s.noun || 'slots';
  return (
    <Frame kicker={s.label} top={330}>
      <div style={{display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 18, width: 900}}>
        {days.map((d) => (
          <div key={d} style={{fontFamily: F.sans, fontWeight: 700, fontSize: 28, letterSpacing: '0.16em', color: C.muted, textAlign: 'center'}}>{d}</div>
        ))}
        {[...Array(N)].map((_, i) => {
          const on = order.indexOf(i) < filled;
          return (
            <div key={i} style={{height: 128, borderRadius: 18, border: `2px solid ${on ? C.gold : C.line}`, background: on ? 'linear-gradient(160deg, rgba(197,169,117,0.95), rgba(163,137,93,0.95))' : 'rgba(33,31,28,0.7)', display: 'flex', alignItems: 'flex-end', padding: 14, fontFamily: F.sans, fontWeight: 800, fontSize: 24, color: on ? C.ink : C.muted}}>
              {on ? cell : ''}
            </div>
          );
        })}
      </div>
      <div style={{marginTop: 50, fontFamily: F.serif, fontWeight: 600, fontSize: 96, color: C.ivory}}>
        {filled}<span style={{color: C.muted, fontSize: 60}}> / {N} {noun}</span>
      </div>
    </Frame>
  );
};

// ---------------- Budget ----------------
export const BudgetScene: React.FC<SceneProps> = ({s}) => {
  const f = useCurrentFrame();
  const parts = s.parts;
  const grow = ease(f, 0, 18);
  return (
    <Frame kicker="$1,000 BUDGET" top={360}>
      <div style={{display: 'flex', height: 120, width: 900, borderRadius: 22, overflow: 'hidden', gap: 6}}>
        {parts.map((p: any, i: number) => {
          const on = s.hl === i;
          return (
            <div key={i} style={{width: `${(p.v / s.total) * 100 * grow}%`, background: on ? `linear-gradient(90deg, ${C.goldDeep}, ${C.goldLight})` : 'rgba(245,242,237,0.12)', boxShadow: on ? '0 0 50px rgba(197,169,117,0.4)' : 'none', transition: 'none'}} />
          );
        })}
      </div>
      <div style={{marginTop: 60, display: 'flex', flexDirection: 'column', gap: 30}}>
        {parts.map((p: any, i: number) => {
          const on = s.hl === i;
          return (
            <div key={i} style={{display: 'flex', alignItems: 'baseline', gap: 34, opacity: on ? 1 : 0.42}}>
              <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: on ? 120 : 76, color: on ? C.gold : C.ivory, width: on ? 330 : 240}}>${p.v}</div>
              <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: on ? 52 : 40, color: C.ivory}}>{p.l}</div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
};

// ---------------- Timeline ----------------
export const TimelineScene: React.FC<SceneProps> = ({s}) => {
  const f = useCurrentFrame();
  const steps = s.steps;
  return (
    <Frame top={380}>
      <div style={{position: 'relative', paddingLeft: 80}}>
        <div style={{position: 'absolute', left: 30, top: 20, bottom: 20, width: 3, background: C.line}} />
        {steps.map((st: any, i: number) => {
          const on = s.active === i;
          const past = s.active > i;
          const e = on ? ease(f, 0, 12) : 1;
          return (
            <div key={i} style={{position: 'relative', marginBottom: 54, opacity: on ? 1 : past ? 0.6 : 0.28}}>
              <div style={{position: 'absolute', left: -66, top: 22, width: 36, height: 36, borderRadius: 18, background: on || past ? C.gold : C.ink, border: `3px solid ${on || past ? C.gold : C.line}`, boxShadow: on ? `0 0 ${30 * e}px rgba(197,169,117,0.8)` : 'none'}} />
              <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 30, letterSpacing: '0.2em', color: C.gold}}>{st.d.toUpperCase()}</div>
              <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: on ? 70 : 56, color: C.ivory, lineHeight: 1.12, marginTop: 8, transform: `translateX(${(1 - e) * 30}px)`}}>{st.t}</div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
};

// ---------------- Grid ----------------
export const GridScene: React.FC<SceneProps> = ({s}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cards: string[] = s.cards;
  const cols = cards.length <= 3 ? 1 : 2;
  const you = cards.indexOf('You');
  return (
    <Frame kicker={s.label} top={330}>
      <div style={{display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 24, width: 900}}>
        {cards.map((t, i) => {
          const e = sp(f, 2 + i * 4, fps);
          const isYou = i === you;
          return (
            <div key={i} style={{opacity: e, transform: `scale(${0.9 + 0.1 * e})`}}>
              <Card tone="ink" gold={isYou} style={{padding: cols === 1 ? '34px 40px' : '30px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: cols === 1 ? 170 : 200}}>
                <div>
                  <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 24, letterSpacing: '0.14em', color: C.muted, marginBottom: 12}}>{cols === 1 ? 'LEAD FORM' : 'SPONSORED'}</div>
                  <div style={{fontFamily: cols === 1 ? F.sans : F.serif, fontWeight: cols === 1 ? 800 : 600, fontSize: cols === 1 ? 54 : 44, color: isYou ? C.gold : C.ivory}}>{t}</div>
                </div>
                {cols === 1 && <Check tone="ink" size={66} />}
              </Card>
            </div>
          );
        })}
      </div>
    </Frame>
  );
};

// ---------------- Dots ----------------
export const DotsScene: React.FC<SceneProps> = ({s, dur}) => {
  const f = useCurrentFrame();
  const total = s.total, cols = 10;
  const hlIdx = new Set([23, 58, 81].slice(0, s.hl));
  const lit = ease(f, 14, 26);
  return (
    <Frame kicker={s.sub ? `${s.sub}` : undefined} top={330}>
      <div style={{display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 24, width: 680}}>
        {[...Array(total)].map((_, i) => {
          const on = hlIdx.has(i);
          const appear = ease(f, (i % 10) * 0.8 + Math.floor(i / 10) * 0.8, (i % 10) * 0.8 + Math.floor(i / 10) * 0.8 + 6);
          return <div key={i} style={{width: 44, height: 44, borderRadius: 22, background: on ? (lit > 0.1 ? C.gold : 'rgba(245,242,237,0.16)') : 'rgba(245,242,237,0.16)', opacity: appear, transform: on ? `scale(${1 + 0.25 * lit})` : 'none', boxShadow: on ? `0 0 ${40 * lit}px rgba(197,169,117,0.8)` : 'none'}} />;
        })}
      </div>
      <div style={{marginTop: 44, fontFamily: F.serif, fontWeight: 600, fontSize: 84, color: C.gold, opacity: lit}}>
        {s.hl} <span style={{color: C.ivory, fontSize: 56}}>in {total}</span>
      </div>
      <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 40, color: C.ivory, opacity: lit, marginTop: 8}}>{s.label}</div>
    </Frame>
  );
};
