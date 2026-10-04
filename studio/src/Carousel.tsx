import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, F, Tone, accentOf, fg, mutedOf} from './brand';
import {FontFaces} from './fonts';
import {Illustration} from './illustrations';
import {Bg, Check, Grain, Headline, Kicker, Mark, Wordmark, splitAccent} from './ui';

// Carousel slides, 1080x1350 (4:5). Stills: every animation is rendered at its end state.
const K = -40;
const CENTER: React.CSSProperties = {position: 'absolute', left: 90, right: 90, top: 110, bottom: 170, display: 'flex', flexDirection: 'column', justifyContent: 'center'}; // negative delay -> entrance animations already complete at frame 0

const Rich: React.FC<{text: string; accent?: string; tone: Tone; size: number; serif?: boolean; center?: boolean}> = ({text, accent, tone, size, serif = true, center}) => (
  <div style={{fontFamily: serif ? F.serif : F.sans, fontWeight: serif ? 600 : 800, fontSize: size, lineHeight: 1.12, letterSpacing: serif ? '-0.01em' : 0, color: fg(tone), textAlign: center ? 'center' : 'left', textWrap: 'balance' as any}}>
    {splitAccent(text, accent).map(({w, a}, i) => (
      <span key={i} style={{fontStyle: a && serif ? 'italic' : 'normal', fontWeight: a && serif ? 500 : undefined, color: a ? accentOf(tone) : undefined}}>{w} </span>
    ))}
  </div>
);

const Footer: React.FC<{tone: Tone; i: number; n: number; swipe?: boolean}> = ({tone, i, n, swipe}) => (
  <div style={{position: 'absolute', left: 90, right: 90, bottom: 70, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <Wordmark tone={tone} size={22} opacity={0.85} />
    <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 22, letterSpacing: '0.18em', color: mutedOf(tone)}}>
      {swipe ? 'SWIPE →' : `${String(i + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`}
    </div>
  </div>
);

const Panel: React.FC<{tone: Tone; gold?: boolean; style?: React.CSSProperties; children: React.ReactNode}> = ({tone, gold, style, children}) => (
  <div style={{background: tone === 'ink' ? 'rgba(33,31,28,0.9)' : '#FBF9F5', border: `2px solid ${gold ? accentOf(tone) : tone === 'ink' ? C.line : C.ivoryLine}`, borderRadius: 28, ...style}}>{children}</div>
);

const AD = {
  hook: 'Homeowners with a roof over 15 years old:',
  problem: 'Worried about leaks, surprise repair bills, or a contractor who disappears after the deposit?',
  offer: 'Book a free 20-minute inspection. You get a photo report of every issue we find.',
  proof: '★ 4.9 from 212 homeowners in your area',
  cta: 'Tap to pick a time. We text to confirm within 10 minutes.',
};

const AdMock: React.FC<{tone: Tone; focus?: string | null}> = ({tone, focus}) => {
  const part = (key: keyof typeof AD, style: React.CSSProperties) => {
    const on = focus === key;
    const dim = focus && !on;
    return (
      <div style={{position: 'relative', padding: '10px 14px', margin: '0 -14px', borderRadius: 14, border: on ? `3px solid ${C.gold}` : '3px solid transparent', background: on ? 'rgba(197,169,117,0.12)' : 'transparent', opacity: dim ? 0.32 : 1, ...style}}>
        {AD[key]}
      </div>
    );
  };
  return (
    <div style={{width: 720, background: '#121110', borderRadius: 30, border: `2px solid ${C.line}`, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.35)'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '22px 26px'}}>
        <div style={{width: 58, height: 58, borderRadius: 29, border: `3px solid ${C.gold}`, background: '#2a2622'}} />
        <div>
          <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 26, color: C.ivory}}>Your Roofing Co.</div>
          <div style={{fontFamily: F.sans, fontWeight: 600, fontSize: 20, color: C.muted}}>Sponsored</div>
        </div>
      </div>
      <div style={{padding: '0 26px 18px', fontFamily: F.sans, fontWeight: 600, fontSize: 25, color: C.ivory, lineHeight: 1.35}}>
        {part('hook', {fontWeight: 800})}
        {part('problem', {})}
        {part('offer', {})}
        {part('proof', {color: C.goldLight})}
      </div>
      <div style={{height: 300, background: 'linear-gradient(160deg,#1d1b18,#3a332a)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: focus ? 0.4 : 1}}>
        <Illustration name="roof" size={270} color={C.ivory} accent={C.gold} faintColor={C.muted} start={-200} float={false} />
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 26px', gap: 20}}>
        <div style={{flex: 1, fontFamily: F.sans, fontWeight: 700, fontSize: 21, color: C.ivory, lineHeight: 1.3}}>{part('cta', {})}</div>
        <div style={{padding: '14px 22px', borderRadius: 12, background: C.gold, color: C.ink, fontFamily: F.sans, fontWeight: 800, fontSize: 22, whiteSpace: 'nowrap', opacity: focus && focus !== 'cta' ? 0.35 : 1}}>Book now</div>
      </div>
    </div>
  );
};

export const Slide: React.FC<{car: any; index: number}> = ({car, index}) => {
  const tone: Tone = car.theme === 'ivory' ? 'ivory' : 'ink';
  const sl = car.slides[index];
  const n = car.slides.length;
  const acc = accentOf(tone);
  const mut = mutedOf(tone);
  let body: React.ReactNode = null;

  switch (sl.k) {
    case 'cover':
      body = (
        <>
          <div style={{position: 'absolute', right: 40, top: 120, opacity: 0.95}}>
            <Illustration name={sl.icon} size={360} color={tone === 'ink' ? C.ivory : C.ink} accent={acc} faintColor={mut} start={-200} float={false} stroke={5} />
          </div>
          <div style={{position: 'absolute', left: 90, right: 90, top: 520}}>
            <Kicker text={sl.kicker} tone={tone} delay={K} style={{marginBottom: 36}} />
            <Rich text={sl.title} accent={sl.accent} tone={tone} size={sl.title.length > 48 ? 88 : sl.title.length > 34 ? 100 : 112} />
          </div>
        </>
      );
      break;
    case 'point':
      body = (
        <div style={CENTER}>
          <div style={{fontFamily: F.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 220, lineHeight: 1, color: acc, opacity: 0.9}}>{sl.n}</div>
          <div style={{width: 90, height: 3, background: acc, margin: '40px 0 44px'}} />
          <Rich text={sl.head} tone={tone} size={sl.head.length > 30 ? 74 : 86} />
          <div style={{marginTop: 34, fontFamily: F.sans, fontWeight: 500, fontSize: 46, lineHeight: 1.42, color: mut, maxWidth: 880}}>{sl.body}</div>
        </div>
      );
      break;
    case 'statement':
      body = (
        <div style={{position: 'absolute', left: 90, right: 90, top: 0, bottom: 0, display: 'flex', alignItems: 'center'}}>
          <div>
            <div style={{fontFamily: F.serif, fontSize: 160, lineHeight: 0.6, color: acc, marginBottom: 30}}>“</div>
            <Rich text={sl.text} accent={sl.accent} tone={tone} size={sl.text.length > 70 ? 74 : 88} />
          </div>
        </div>
      );
      break;
    case 'quote':
      body = (
        <div style={CENTER}>
          {sl.icon && <div style={{marginBottom: 30}}><Illustration name={sl.icon} size={300} color={tone === 'ink' ? C.ivory : C.ink} accent={acc} faintColor={mut} start={-200} float={false} /></div>}
          <Kicker text={sl.label} tone={tone} delay={K} style={{marginBottom: 30}} />
          <Panel tone={tone} gold style={{padding: '48px 46px'}}>
            {sl.lines.map((t: string, i: number) => (
              <div key={i} style={{fontFamily: F.serif, fontStyle: 'italic', fontWeight: 500, fontSize: t.length > 70 ? 54 : 62, lineHeight: 1.25, color: fg(tone)}}>“{t}”</div>
            ))}
          </Panel>
        </div>
      );
      break;
    case 'eq':
      body = (
        <div style={CENTER}>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 24}}>
            <div style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: 120, color: acc}}>{sl.n}</div>
            <Rich text={sl.head} tone={tone} size={72} />
          </div>
          <Panel tone={tone} style={{padding: '50px 46px', marginTop: 50}}>
            {sl.rows.map((r: string[], i: number) => (
              <div key={i}>
                <div style={{display: 'flex', alignItems: 'baseline', gap: 22, flexWrap: 'wrap'}}>
                  <span style={{fontFamily: F.serif, fontWeight: 600, fontSize: 96, color: fg(tone)}}>{r[0]}</span>
                  <span style={{fontFamily: F.sans, fontWeight: 700, fontSize: 52, color: mut}}>{r[1]}</span>
                </div>
                <div style={{display: 'flex', alignItems: 'baseline', gap: 22, marginTop: 10}}>
                  <span style={{fontFamily: F.sans, fontWeight: 700, fontSize: 60, color: mut}}>=</span>
                  <span style={{fontFamily: F.serif, fontWeight: 600, fontSize: 150, color: acc, letterSpacing: '-0.02em'}}>{r[2]}</span>
                </div>
              </div>
            ))}
          </Panel>
          <div style={{marginTop: 34, fontFamily: F.sans, fontWeight: 600, fontSize: 38, color: mut}}>{sl.note}</div>
        </div>
      );
      break;
    case 'sms':
      body = (
        <div style={CENTER}>
          <Kicker text={sl.label} tone={tone} delay={K} style={{marginBottom: 60}} />
          {sl.msgs.map(([who, t]: string[], i: number) => (
            <div key={i} style={{display: 'flex', justifyContent: who === 'me' ? 'flex-end' : 'flex-start'}}>
              <div style={{maxWidth: 820, padding: '40px 46px', borderRadius: 48, borderBottomRightRadius: who === 'me' ? 14 : 48, background: who === 'me' ? C.gold : tone === 'ink' ? C.ink3 : C.ivory2, color: who === 'me' ? C.ink : fg(tone), fontFamily: F.sans, fontWeight: 600, fontSize: 50, lineHeight: 1.36}}>{t}</div>
            </div>
          ))}
          <div style={{textAlign: 'right', marginTop: 18, fontFamily: F.sans, fontWeight: 700, fontSize: 26, color: mut}}>Delivered</div>
        </div>
      );
      break;
    case 'compare':
      body = (
        <div style={{position: 'absolute', left: 70, right: 70, top: 230, display: 'flex', gap: 24}}>
          {(['left', 'right'] as const).map((side) => {
            const d = sl[side];
            return (
              <Panel key={side} tone={tone} gold={side === 'right'} style={{flex: 1, padding: '46px 36px', minHeight: 760}}>
                <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: 86, color: side === 'right' ? acc : fg(tone), marginBottom: 36}}>{d.h}</div>
                {d.l.map((t: string, i: number) => (
                  <div key={i} style={{fontFamily: i === 0 ? F.sans : F.sans, fontWeight: i === 0 ? 800 : 600, fontSize: i === 0 ? 46 : 40, lineHeight: 1.3, color: i === 0 ? fg(tone) : mut, marginBottom: 26, fontStyle: i === 2 ? 'italic' : 'normal'}}>{t}</div>
                ))}
              </Panel>
            );
          })}
        </div>
      );
      break;
    case 'list':
      body = (
        <div style={CENTER}>
          <Kicker text={sl.title} tone={tone} delay={K} style={{marginBottom: 56}} />
          {sl.items.map((t: string, i: number) => (
            <div key={i} style={{display: 'flex', gap: 30, alignItems: 'flex-start', marginBottom: sl.mode === 'quote' ? 60 : 44}}>
              {sl.mode === 'quote' ? (
                <div style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: 72, color: acc, width: 90, flexShrink: 0, lineHeight: 1}}>{String((sl.start || 1) + i).padStart(2, '0')}</div>
              ) : (
                <div style={{marginTop: 4}}><Check tone={tone} size={66} /></div>
              )}
              <div style={{fontFamily: sl.mode === 'quote' ? F.serif : F.sans, fontStyle: sl.mode === 'quote' ? 'italic' : 'normal', fontWeight: sl.mode === 'quote' ? 500 : 800, fontSize: sl.mode === 'quote' ? 58 : 58, lineHeight: 1.25, color: fg(tone)}}>{t}</div>
            </div>
          ))}
        </div>
      );
      break;
    case 'myth':
      body = (
        <div style={CENTER}>
          <div style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: 120, color: acc, lineHeight: 1}}>{sl.n}</div>
          <div style={{marginTop: 50, fontFamily: F.sans, fontWeight: 800, fontSize: 28, letterSpacing: '0.3em', color: C.badDeep}}>MYTH</div>
          <div style={{position: 'relative', marginTop: 16, fontFamily: F.serif, fontWeight: 600, fontSize: 76, lineHeight: 1.12, color: mut}}>
            “{sl.myth}”
          </div>
          <div style={{height: 2, background: tone === 'ink' ? C.line : C.ivoryLine, margin: '50px 0'}} />
          <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 28, letterSpacing: '0.3em', color: acc}}>TRUTH</div>
          <div style={{marginTop: 16, fontFamily: F.serif, fontWeight: 600, fontSize: 70, lineHeight: 1.16, color: fg(tone)}}>{sl.truth}</div>
        </div>
      );
      break;
    case 'metric':
      body = (
        <div style={CENTER}>
          <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: sl.name.length > 12 ? 110 : 150, color: acc, lineHeight: 1}}>{sl.name}</div>
          <div style={{marginTop: 40, fontFamily: F.sans, fontWeight: 700, fontSize: 52, lineHeight: 1.3, color: fg(tone)}}>{sl.what}</div>
          <div style={{height: 2, background: tone === 'ink' ? C.line : C.ivoryLine, margin: '60px 0 44px'}} />
          <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 26, letterSpacing: '0.3em', color: acc}}>WHAT IT TELLS YOU</div>
          <div style={{marginTop: 20, fontFamily: F.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 60, lineHeight: 1.22, color: fg(tone)}}>{sl.signal}</div>
        </div>
      );
      break;
    case 'ad': {
      const PARTS = ['hook', 'problem', 'offer', 'proof', 'cta'];
      if (!sl.focus) {
        body = (
          <div style={{position: 'absolute', left: 0, right: 0, top: 120, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Kicker text={sl.label} tone={tone} delay={K} center style={{marginBottom: 30}} />
            <div style={{transform: 'scale(1.18)', transformOrigin: 'top center'}}>
              <AdMock tone={tone} focus={null} />
            </div>
          </div>
        );
        break;
      }
      const pi = PARTS.indexOf(sl.focus);
      body = (
        <div style={CENTER}>
          <Kicker text={sl.label} tone={tone} delay={K} style={{marginBottom: 40}} />
          <div style={{background: '#121110', borderRadius: 30, border: `3px solid ${C.gold}`, padding: '34px 40px', boxShadow: '0 30px 80px rgba(0,0,0,0.25)'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 26}}>
              <div style={{width: 52, height: 52, borderRadius: 26, border: `3px solid ${C.gold}`, background: '#2a2622'}} />
              <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 26, color: C.ivory}}>Your Roofing Co. <span style={{color: C.muted, fontWeight: 600}}>· Sponsored</span></div>
            </div>
            <div style={{fontFamily: F.sans, fontWeight: sl.focus === 'hook' ? 800 : 700, fontSize: 52, lineHeight: 1.28, color: sl.focus === 'proof' ? C.goldLight : C.ivory}}>{(AD as any)[sl.focus]}</div>
          </div>
          <div style={{display: 'flex', gap: 12, margin: '34px 0 40px'}}>
            {PARTS.map((p, k) => (
              <div key={p} style={{flex: 1, height: 8, borderRadius: 4, background: k === pi ? acc : tone === 'ink' ? C.line : C.ivoryLine}} />
            ))}
          </div>
          <Rich text={sl.body} tone={tone} size={60} />
        </div>
      );
      break;
    }
    case 'day':
      body = (
        <div style={CENTER}>
          <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: sl.day.length > 4 ? 150 : 200, color: acc, lineHeight: 1, letterSpacing: '0.02em'}}>{sl.day}</div>
          <div style={{width: 90, height: 3, background: acc, margin: '50px 0'}} />
          <Rich text={sl.head} tone={tone} size={90} />
          <div style={{marginTop: 34, fontFamily: F.sans, fontWeight: 500, fontSize: 46, lineHeight: 1.4, color: mut}}>{sl.body}</div>
        </div>
      );
      break;
    case 'search':
      body = (
        <div style={{position: 'absolute', left: 90, right: 90, top: 190}}>
          <Panel tone={tone} style={{padding: 34}}>
            <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 26, letterSpacing: '0.2em', color: acc, marginBottom: 20}}>AD LIBRARY</div>
            <div style={{display: 'flex', gap: 14, marginBottom: 18}}>
              {['All ads', 'United States'].map((c) => <div key={c} style={{padding: '12px 22px', borderRadius: 999, border: `2px solid ${sl.step === '02' ? acc : tone === 'ink' ? C.line : C.ivoryLine}`, fontFamily: F.sans, fontWeight: 700, fontSize: 26, color: fg(tone)}}>{c} ▾</div>)}
            </div>
            <div style={{height: 84, borderRadius: 42, border: `2px solid ${acc}`, display: 'flex', alignItems: 'center', gap: 18, padding: '0 30px', fontFamily: F.sans, fontWeight: 600, fontSize: 32, color: fg(tone)}}>
              <span style={{fontSize: 34}}>⌕</span>{sl.step === '01' ? 'Search ads' : 'Competitor Roofing Co.'}
            </div>
            {sl.step >= '03' && (
              <div style={{display: 'flex', gap: 16, marginTop: 24}}>
                {['Active · 4 months', 'Active · 2 weeks'].map((t, i) => (
                  <div key={t} style={{flex: 1, padding: 20, borderRadius: 18, border: `2px solid ${i === 0 ? acc : tone === 'ink' ? C.line : C.ivoryLine}`, fontFamily: F.sans, fontWeight: 700, fontSize: 24, color: i === 0 ? acc : mut}}>
                    <div style={{height: 120, borderRadius: 10, background: tone === 'ink' ? C.ink3 : C.ivory2, marginBottom: 14}} />{t}
                  </div>
                ))}
              </div>
            )}
          </Panel>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 22, marginTop: 56}}>
            <div style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: 110, color: acc, lineHeight: 1}}>{sl.step}</div>
            <Rich text={sl.head} tone={tone} size={66} />
          </div>
          <div style={{marginTop: 26, fontFamily: F.sans, fontWeight: 500, fontSize: 42, lineHeight: 1.4, color: mut}}>{sl.body}</div>
        </div>
      );
      break;
    case 'final':
      body = (
        <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 90px 80px'}}>
          <Mark size={150} />
          <div style={{marginTop: 26}}><Wordmark tone={tone} size={34} /></div>
          <div style={{marginTop: 80}}><Rich text={sl.line} tone={tone} size={sl.line.length > 40 ? 76 : 88} center /></div>
          <div style={{marginTop: 54, padding: '22px 44px', borderRadius: 999, border: `2px solid ${acc}`, fontFamily: F.sans, fontWeight: 800, fontSize: 36, color: acc}}>{sl.sub}</div>
        </div>
      );
      break;
  }

  return (
    <AbsoluteFill>
      <FontFaces />
      <Bg tone={tone} />
      {body}
      <Footer tone={tone} i={index} n={n} swipe={sl.k === 'cover'} />
      <Grain opacity={0.045} />
    </AbsoluteFill>
  );
};
