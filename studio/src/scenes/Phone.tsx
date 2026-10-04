import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {C, F} from '../brand';
import {Illustration} from '../illustrations';
import {Bg, Card, Check, clamp, ease} from '../ui';
import {SceneProps} from './Basic';

const PW = 540, PH = 1100;
const UI = {bg: '#0B0B0A', panel: '#1A1918', panel2: '#242220', text: '#F2EFEA', sub: '#8E887F', blue: '#4C8DFF', red: '#FF5A4E', green: '#3FBF6F'};
const sp = (f: number, d: number, fps: number) => spring({frame: f - d, fps, config: {damping: 15, mass: 0.6, stiffness: 160}});

const StatusBar: React.FC<{light?: boolean}> = ({light}) => (
  <div style={{height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 44px 0 50px', fontFamily: F.sans, fontWeight: 700, fontSize: 26, color: light ? '#111' : UI.text}}>
    <span>9:41</span>
    <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
      <div style={{display: 'flex', gap: 3, alignItems: 'flex-end'}}>{[8, 12, 16, 20].map((h) => <div key={h} style={{width: 5, height: h, borderRadius: 2, background: light ? '#111' : UI.text}} />)}</div>
      <div style={{width: 40, height: 20, borderRadius: 6, border: `2px solid ${light ? '#111' : UI.text}`, padding: 2}}><div style={{width: '75%', height: '100%', borderRadius: 3, background: light ? '#111' : UI.text}} /></div>
    </div>
  </div>
);

const Device: React.FC<{children: React.ReactNode; light?: boolean}> = ({children, light}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const e = spring({frame: f, fps, config: {damping: 18, mass: 0.8, stiffness: 120}});
  const rot = interpolate(e, [0, 1], [-16, -5]);
  const ty = interpolate(e, [0, 1], [140, 0]);
  return (
    <AbsoluteFill>
      <Bg tone="ink" />
      <AbsoluteFill style={{alignItems: 'center', paddingTop: 236, perspective: 1800}}>
        <div style={{width: PW, height: PH, borderRadius: 74, background: '#050505', padding: 14, boxShadow: '0 60px 120px rgba(0,0,0,0.65), 0 0 0 2px #2b2926, inset 0 0 0 2px #3a3733', transform: `translateY(${ty}px) rotateY(${rot}deg) rotateX(4deg)`, opacity: e, position: 'relative'}}>
          <div style={{width: '100%', height: '100%', borderRadius: 60, overflow: 'hidden', background: light ? '#F7F5F1' : UI.bg, position: 'relative'}}>
            <StatusBar light={light} />
            <div style={{position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)', width: 150, height: 40, borderRadius: 20, background: '#000'}} />
            {children}
          </div>
          <div style={{position: 'absolute', inset: 0, borderRadius: 74, background: 'linear-gradient(115deg, rgba(255,255,255,0.10) 0%, transparent 30%)', pointerEvents: 'none'}} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Bubble: React.FC<{me?: boolean; text: string; o: number; y: number; gold?: boolean}> = ({me, text, o, y}) => (
  <div style={{display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start', opacity: o, transform: `translateY(${y}px)`, marginBottom: 18}}>
    <div style={{maxWidth: 380, padding: '20px 26px', borderRadius: 34, borderBottomRightRadius: me ? 10 : 34, borderBottomLeftRadius: me ? 34 : 10, background: me ? C.gold : UI.panel2, color: me ? C.ink : UI.text, fontFamily: F.sans, fontWeight: 600, fontSize: 30, lineHeight: 1.3}}>{text}</div>
  </div>
);

const Avatar: React.FC<{t: string; size?: number; ring?: boolean}> = ({t, size = 64, ring}) => (
  <div style={{width: size, height: size, borderRadius: size / 2, background: 'linear-gradient(140deg,#3a362f,#1f1d1a)', border: ring ? `3px solid ${C.gold}` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.sans, fontWeight: 800, fontSize: size * 0.36, color: C.goldLight, flexShrink: 0}}>{t}</div>
);

const Thread: React.FC<{msgs: string[][]; header: string; dur: number}> = ({msgs, header, dur}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const step = Math.min(30, Math.max(14, Math.floor((dur - 10) / Math.max(1, msgs.length))));
  return (
    <div style={{position: 'absolute', inset: '70px 0 0 0'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '18px 30px 22px', borderBottom: `1px solid ${UI.panel2}`}}>
        <span style={{color: C.gold, fontSize: 44, fontFamily: F.sans}}>‹</span>
        <Avatar t={header.slice(0, 1).toUpperCase()} size={60} />
        <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 30, color: UI.text}}>{header}</div>
      </div>
      <div style={{padding: '40px 28px'}}>
        {msgs.map(([who, t], i) => {
          const d = 6 + i * step;
          const typing = f > d - 12 && f < d && who === 'them';
          const e = sp(f, d, fps);
          return (
            <div key={i}>
              {typing && (
                <div style={{display: 'flex', gap: 8, padding: '22px 26px', background: UI.panel2, borderRadius: 30, width: 110, marginBottom: 18}}>
                  {[0, 1, 2].map((k) => <div key={k} style={{width: 14, height: 14, borderRadius: 7, background: UI.sub, opacity: 0.4 + 0.6 * Math.abs(Math.sin((f + k * 4) / 4))}} />)}
                </div>
              )}
              {f >= d && <Bubble me={who === 'me'} text={t} o={e} y={(1 - e) * 24} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Field: React.FC<{label: string; filled?: string; small?: boolean}> = ({label, filled, small}) => (
  <div style={{marginBottom: small ? 10 : 26}}>
    <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: small ? 18 : 24, color: UI.sub, marginBottom: small ? 4 : 10}}>{label}</div>
    <div style={{height: small ? 38 : 72, borderRadius: small ? 8 : 16, border: `2px solid ${UI.panel2}`, background: UI.panel, padding: small ? '0 12px' : '0 22px', display: 'flex', alignItems: 'center', fontFamily: F.sans, fontWeight: 600, fontSize: small ? 18 : 28, color: UI.text}}>{filled}</div>
  </div>
);

const Btn: React.FC<{t: string; gold?: boolean; scale?: number}> = ({t, gold = true, scale = 1}) => (
  <div style={{height: 84, borderRadius: 42, background: gold ? C.gold : 'transparent', border: gold ? 'none' : `2px solid ${UI.text}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.sans, fontWeight: 800, fontSize: 32, color: gold ? C.ink : UI.text, transform: `scale(${scale})`}}>{t}</div>
);

const Tap: React.FC<{x: number; y: number; at: number}> = ({x, y, at}) => {
  const f = useCurrentFrame();
  const t = f - at;
  if (t < -10 || t > 22) return null;
  const o = t < 0 ? (t + 10) / 10 : 1 - t / 22;
  const r = t < 0 ? 46 : 46 + t * 3;
  return <div style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: r, background: 'rgba(255,255,255,0.25)', border: '3px solid rgba(255,255,255,0.7)', opacity: o}} />;
};

export const PhoneScene: React.FC<SceneProps> = ({s, dur}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const d = s.data || {};
  const ui = s.ui;

  if (ui === 'dash') return <DashScene dur={dur} />;
  if (ui === 'targeting') return <TargetingScene dur={dur} />;

  let body: React.ReactNode = null;
  if (ui === 'missed') {
    body = (
      <div style={{position: 'absolute', inset: '70px 0 0 0', padding: '20px 34px'}}>
        <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 52, color: UI.text, marginBottom: 24}}>Recents</div>
        <div style={{display: 'flex', background: UI.panel, borderRadius: 14, padding: 4, width: 280, marginBottom: 28}}>
          <div style={{flex: 1, textAlign: 'center', padding: 10, fontFamily: F.sans, fontWeight: 700, fontSize: 24, color: UI.sub}}>All</div>
          <div style={{flex: 1, textAlign: 'center', padding: 10, borderRadius: 10, background: UI.panel2, fontFamily: F.sans, fontWeight: 700, fontSize: 24, color: UI.text}}>Missed</div>
        </div>
        {(d.calls || []).map((c: string, i: number) => {
          const e = sp(f, 4 + i * Math.min(10, Math.floor(dur / 6)), fps);
          const [who, time] = c.split(' · ');
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 20, padding: '24px 0', borderBottom: `1px solid ${UI.panel2}`, opacity: e, transform: `translateX(${(1 - e) * 40}px)`}}>
              <svg width={40} height={40} viewBox="0 0 24 24"><path d="M3 15c5-4 13-4 18 0l-2 3-3-1v-2c-2-1-6-1-8 0v2l-3 1z" fill={UI.red} /></svg>
              <div style={{flex: 1}}>
                <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 32, color: UI.red}}>Missed call</div>
                <div style={{fontFamily: F.sans, fontWeight: 600, fontSize: 24, color: UI.sub}}>{who}</div>
              </div>
              <div style={{fontFamily: F.sans, fontWeight: 600, fontSize: 24, color: UI.sub}}>{time}</div>
            </div>
          );
        })}
      </div>
    );
  } else if (ui === 'sms' || ui === 'dm') {
    body = <Thread msgs={d.msgs || []} header={d.header || 'Message'} dur={dur} />;
  } else if (ui === 'notif') {
    const items: string[] = d.items || [];
    body = (
      <div style={{position: 'absolute', inset: '70px 0 0 0', padding: '30px 24px'}}>
        <div style={{textAlign: 'center', fontFamily: F.sans, fontWeight: 300, fontSize: 150, color: UI.text, lineHeight: 1}}>9:41</div>
        <div style={{textAlign: 'center', fontFamily: F.sans, fontWeight: 600, fontSize: 28, color: UI.sub, marginBottom: 40}}>Tuesday, June 10</div>
        {items.map((t, i) => {
          const e = sp(f, 4 + i * Math.min(9, Math.floor(dur / (items.length + 2))), fps);
          return (
            <div key={i} style={{display: 'flex', gap: 18, alignItems: 'center', background: 'rgba(255,255,255,0.10)', borderRadius: 28, padding: '20px 22px', marginBottom: 14, opacity: e, transform: `translateY(${(1 - e) * -30}px) scale(${0.95 + 0.05 * e})`, border: d.lead ? `2px solid ${C.gold}` : 'none'}}>
              <div style={{width: 64, height: 64, borderRadius: 16, background: d.lead ? C.gold : 'linear-gradient(135deg,#f58529,#dd2a7b,#8134af)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34}}>{d.lead ? '✦' : '♥'}</div>
              <div style={{flex: 1}}>
                <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 24, color: UI.text}}>{d.lead ? 'NEW LEAD · now' : 'Instagram · now'}</div>
                <div style={{fontFamily: F.sans, fontWeight: 600, fontSize: 26, color: UI.text, opacity: 0.85}}>{d.lead ? t : `user_${(i * 37) % 900 + 100} ${t}`}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else if (ui === 'form' || ui === 'instant') {
    const fields: string[] = d.fields || ['Full name', 'Phone number', 'Email'];
    const cut = d.cut || 0;
    const phase = cut ? ease(f, dur * 0.42, dur * 0.42 + 10) : 1;
    const review = ui === 'instant' && d.step === 'review';
    body = (
      <div style={{position: 'absolute', inset: '70px 0 0 0', padding: '30px 34px'}}>
        <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 22, letterSpacing: '0.16em', color: C.gold, marginBottom: 10}}>{ui === 'instant' ? (review ? 'REVIEW YOUR INFO' : 'INSTANT FORM') : 'GET YOUR QUOTE'}</div>
        <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 42, color: UI.text, marginBottom: 30, lineHeight: 1.15}}>{review ? 'Is this right?' : ui === 'instant' ? 'Contact information' : 'Tell us about your project'}</div>
        {cut > 0 && phase < 1 && (
          <div style={{opacity: 1 - phase, position: 'absolute', left: 34, right: 34, top: 200}}>
            {[...Array(cut)].map((_, i) => <Field key={i} label={['Full name', 'Phone', 'Email', 'Address', 'City', 'Zip', 'Budget', 'Timeline', 'Project type', 'Square feet', 'How did you hear?', 'Notes'][i % 12]} small />)}
            <div style={{position: 'absolute', right: 0, top: -64, background: UI.red, color: '#fff', fontFamily: F.sans, fontWeight: 800, fontSize: 24, padding: '8px 16px', borderRadius: 10}}>{cut} fields</div>
          </div>
        )}
        <div style={{opacity: phase, transform: `translateY(${(1 - phase) * 30}px)`}}>
          {(ui === 'instant' ? ['Full name', 'Phone number', 'Email'] : fields).map((fl, i) => (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 14}}>
              <div style={{flex: 1}}><Field label={fl} filled={ui === 'instant' ? ['Sarah Mitchell', '(555) 010-4471', 'sarah@email.com'][i] : ''} /></div>
              {review && <div style={{marginTop: 18}}><Check tone="ink" size={44} /></div>}
            </div>
          ))}
          {cut > 0 && <div style={{display: 'inline-block', background: C.gold, color: C.ink, fontFamily: F.sans, fontWeight: 800, fontSize: 24, padding: '8px 16px', borderRadius: 10, marginBottom: 20}}>3 fields</div>}
          <div style={{marginTop: 20}}><Btn t={review ? 'Submit' : ui === 'instant' ? 'Next' : 'Get my quote'} /></div>
          {ui === 'instant' && review && <div style={{marginTop: 22, textAlign: 'center', fontFamily: F.sans, fontWeight: 700, fontSize: 22, color: C.gold}}>HIGHER-INTENT FORM · REVIEW STEP ON</div>}
        </div>
      </div>
    );
  } else if (ui === 'profile') {
    const flash = ease(f, 10, 18);
    body = (
      <div style={{position: 'absolute', inset: '70px 0 0 0', padding: '24px 30px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 30, marginBottom: 22}}>
          <Avatar t="YC" size={130} ring />
          {[['148', 'posts'], ['2,310', 'followers'], ['412', 'following']].map(([a, b]) => (
            <div key={b} style={{textAlign: 'center'}}>
              <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 30, color: UI.text}}>{a}</div>
              <div style={{fontFamily: F.sans, fontWeight: 600, fontSize: 20, color: UI.sub}}>{b}</div>
            </div>
          ))}
        </div>
        <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 30, color: UI.text}}>{d.name}</div>
        {d.tagline && <div style={{fontFamily: F.sans, fontWeight: 600, fontSize: 24, color: UI.sub}}>{d.tagline}</div>}
        <div style={{position: 'relative', marginTop: 10, padding: d.bad || d.good ? '12px 14px' : 0, borderRadius: 14, border: d.bad ? `3px solid rgba(255,90,78,${flash})` : d.good ? `3px solid rgba(197,169,117,${flash})` : 'none'}}>
          <div style={{fontFamily: F.sans, fontWeight: 600, fontSize: 27, color: UI.text, lineHeight: 1.35}}>{d.bio || ''}</div>
          {(d.bad || d.good) && <div style={{position: 'absolute', right: -16, top: -26, opacity: flash}}><Check tone="ink" kind={d.bad ? 'x' : 'check'} size={52} /></div>}
        </div>
        <div style={{display: 'flex', gap: 12, marginTop: 24}}>
          <div style={{flex: 1}}><Btn t={d.book ? 'Book now' : 'Follow'} gold={!!d.book || !d.bad} /></div>
          <div style={{flex: 1}}><Btn t="Message" gold={false} /></div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, marginTop: 28}}>
          {[...Array(9)].map((_, i) => <div key={i} style={{height: 150, background: `linear-gradient(${120 + i * 25}deg, #2a2723, #3d3830)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{width: 40, height: 3, background: 'rgba(197,169,117,0.4)'}} /></div>)}
        </div>
        {d.book && <Tap x={130} y={540} at={Math.floor(dur * 0.55)} />}
      </div>
    );
  } else if (ui === 'booking') {
    const pick = ease(f, dur * 0.45, dur * 0.45 + 6);
    const days = ['Mon 9', 'Tue 10', 'Wed 11', 'Thu 12', 'Fri 13'];
    const slots = ['8:00 AM', '10:00 AM', '12:30 PM', '2:00 PM', '4:30 PM'];
    body = (
      <div style={{position: 'absolute', inset: '70px 0 0 0', padding: '30px 30px'}}>
        <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 42, color: UI.text, marginBottom: 26}}>Pick a time</div>
        <div style={{display: 'flex', gap: 10, marginBottom: 30}}>
          {days.map((dd, i) => <div key={dd} style={{flex: 1, borderRadius: 16, padding: '14px 0', textAlign: 'center', background: i === 3 ? C.gold : UI.panel, color: i === 3 ? C.ink : UI.text, fontFamily: F.sans, fontWeight: 800, fontSize: 22}}>{dd}</div>)}
        </div>
        {slots.map((sl, i) => {
          const on = i === 1 && pick > 0.5;
          return <div key={sl} style={{height: 84, borderRadius: 20, border: `2px solid ${on ? C.gold : UI.panel2}`, background: on ? 'rgba(197,169,117,0.18)' : UI.panel, marginBottom: 14, display: 'flex', alignItems: 'center', padding: '0 26px', fontFamily: F.sans, fontWeight: 800, fontSize: 30, color: on ? C.gold : UI.text}}>{sl}</div>;
        })}
        <Tap x={240} y={330} at={Math.floor(dur * 0.45)} />
        <div style={{marginTop: 16, opacity: ease(f, dur * 0.55, dur * 0.55 + 8), display: 'flex', alignItems: 'center', gap: 14, background: UI.panel2, borderRadius: 20, padding: '18px 22px'}}>
          <Check tone="ink" size={44} /><div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 28, color: UI.text}}>Booked · Thu 10:00 AM</div>
        </div>
      </div>
    );
  } else if (ui === 'feed') {
    const scroll = d.swipe ? interpolate(f, [dur * 0.5, dur * 0.5 + 9], [0, -1000], {...clamp, easing: Easing.in(Easing.cubic)}) : 0;
    body = (
      <div style={{position: 'absolute', inset: '70px 0 0 0', overflow: 'hidden'}}>
        <div style={{transform: `translateY(${scroll}px)`}}>
          {[0, 1].map((k) => (
            <div key={k} style={{opacity: k ? 0.5 : 1, filter: k ? 'blur(2px)' : 'none'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '18px 22px'}}>
                <Avatar t={k ? 'JR' : 'YC'} size={56} ring={!k} />
                <div>
                  <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 26, color: UI.text}}>{k ? 'jordan.rivera' : 'yourcompany'}</div>
                  {!k && d.sponsored && <div style={{fontFamily: F.sans, fontWeight: 600, fontSize: 20, color: UI.sub}}>Sponsored</div>}
                </div>
              </div>
              <div style={{height: 600, background: k ? 'linear-gradient(160deg,#2a2622,#4a4136)' : 'linear-gradient(160deg,#1d1b18,#3a332a)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 30}}>
                {!k && <Illustration name="house" size={260} color={C.ivory} accent={C.gold} faintColor={C.muted} float={false} />}
                {!k && <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: 44, color: d.headline?.startsWith('[') ? C.muted : C.ivory, textAlign: 'center', lineHeight: 1.15}}>{d.headline}</div>}
              </div>
              {!k && (
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', background: UI.panel}}>
                  <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 26, color: UI.text}}>Book now</div>
                  <div style={{fontFamily: F.sans, fontSize: 32, color: UI.text}}>›</div>
                </div>
              )}
              <div style={{display: 'flex', gap: 22, padding: '18px 22px', fontSize: 34, color: UI.text}}>♡ ◯ ➤</div>
            </div>
          ))}
        </div>
        {d.swipe && <div style={{position: 'absolute', left: 230, top: interpolate(f, [dur * 0.45, dur * 0.6], [760, 160], clamp), width: 70, height: 70, borderRadius: 35, background: 'rgba(255,255,255,0.3)', border: '3px solid rgba(255,255,255,0.8)', opacity: interpolate(f, [dur * 0.42, dur * 0.47, dur * 0.6, dur * 0.65], [0, 1, 1, 0], clamp)}} />}
      </div>
    );
  } else if (ui === 'story') {
    const e = sp(f, 4, fps);
    body = (
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(170deg, #2b2620 0%, #14130f 60%, #3b3024 100%)'}}>
        <div style={{position: 'absolute', top: 84, left: 20, right: 20, display: 'flex', gap: 6}}>{[0, 1, 2].map((k) => <div key={k} style={{flex: 1, height: 5, borderRadius: 3, background: k === 0 ? UI.text : 'rgba(255,255,255,0.3)'}} />)}</div>
        <div style={{position: 'absolute', top: 110, left: 24, display: 'flex', alignItems: 'center', gap: 12}}><Avatar t="YS" size={50} ring /><span style={{fontFamily: F.sans, fontWeight: 800, fontSize: 24, color: UI.text}}>yourshop · 2h</span></div>
        <div style={{position: 'absolute', top: 330, left: 40, right: 40, textAlign: 'center', transform: `scale(${0.85 + 0.15 * e}) rotate(-2deg)`, opacity: e}}>
          <div style={{display: 'inline-block', background: C.ivory, color: C.ink, fontFamily: F.sans, fontWeight: 800, fontSize: 50, padding: '22px 30px', borderRadius: 18, lineHeight: 1.15}}>{d.text}</div>
          <div style={{marginTop: 26, fontFamily: F.sans, fontWeight: 800, fontSize: 36, color: C.gold}}>{d.sub}</div>
        </div>
        <div style={{position: 'absolute', bottom: 120, left: '50%', transform: 'translateX(-50%)', background: '#fff', color: '#1a5cff', fontFamily: F.sans, fontWeight: 800, fontSize: 30, padding: '16px 30px', borderRadius: 16, whiteSpace: 'nowrap', opacity: ease(f, 12, 20)}}>🔗 BOOK NOW</div>
      </div>
    );
  } else if (ui === 'contacts') {
    body = (
      <div style={{position: 'absolute', inset: '70px 0 0 0', padding: '24px 32px'}}>
        <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 48, color: UI.text, marginBottom: 10}}>Past customers</div>
        <div style={{fontFamily: F.sans, fontWeight: 600, fontSize: 24, color: UI.sub, marginBottom: 24}}>Last 24 months · 212 contacts</div>
        {(d.names || []).map((nm: string, i: number) => {
          const e = sp(f, 3 + i * 5, fps);
          const [who, job] = nm.split(' — ');
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 20, padding: '20px 0', borderBottom: `1px solid ${UI.panel2}`, opacity: e, transform: `translateX(${(1 - e) * 30}px)`}}>
              <Avatar t={who.slice(0, 1)} size={64} />
              <div>
                <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 30, color: UI.text}}>{who}</div>
                <div style={{fontFamily: F.sans, fontWeight: 600, fontSize: 22, color: UI.sub}}>{job}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else if (ui === 'site') {
    const st = d.state;
    const spin = (f * 12) % 360;
    body = (
      <div style={{position: 'absolute', inset: '70px 0 0 0', background: '#F7F5F1'}}>
        <div style={{margin: '10px 20px', height: 56, borderRadius: 16, background: '#E9E5DD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.sans, fontWeight: 700, fontSize: 22, color: '#555'}}>🔒 yourshop.com</div>
        {st === 'landing' ? (
          <div style={{padding: '30px 34px'}}>
            <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 22, letterSpacing: '0.16em', color: C.goldInk}}>FREE QUOTE</div>
            <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: 52, color: '#141414', lineHeight: 1.08, margin: '14px 0 26px'}}>Get your price in 60 seconds.</div>
            {['Full name', 'Phone number', 'Zip code', 'What do you need done?'].map((l) => (
              <div key={l} style={{marginBottom: 18}}>
                <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 22, color: '#6b655b', marginBottom: 8}}>{l}</div>
                <div style={{height: 64, borderRadius: 14, border: '2px solid #DDD6CA', background: '#fff'}} />
              </div>
            ))}
            <div style={{height: 88, borderRadius: 44, background: '#141414', color: C.goldLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.sans, fontWeight: 800, fontSize: 32, marginTop: 10}}>See my price →</div>
            <div style={{marginTop: 18, textAlign: 'center', fontFamily: F.sans, fontWeight: 700, fontSize: 22, color: '#6b655b'}}>★★★★★ 4.9 · Licensed local pros</div>
          </div>
        ) : st === 'loading' ? (
          <div style={{padding: 40}}>
            <svg width={100} height={100} style={{display: 'block', margin: '80px auto 50px', transform: `rotate(${spin}deg)`}}><circle cx={50} cy={50} r={40} fill="none" stroke="#ccc" strokeWidth={8} /><path d="M50 10 A40 40 0 0 1 90 50" fill="none" stroke={C.goldDeep} strokeWidth={8} strokeLinecap="round" /></svg>
            {[0.9, 0.7, 0.8, 0.5].map((w, i) => <div key={i} style={{height: 34, width: `${w * 100}%`, borderRadius: 10, background: '#E3DED5', marginBottom: 20, opacity: 0.6 + 0.4 * Math.sin((f + i * 6) / 6)}} />)}
          </div>
        ) : (
          <div style={{padding: '30px 34px'}}>
            <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 22, letterSpacing: '0.16em', color: C.goldInk}}>AUTO REPAIR</div>
            <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: 56, color: '#141414', lineHeight: 1.08, margin: '14px 0 18px'}}>Brake & engine repair. Same-day appointments.</div>
            <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 26, color: '#555', marginBottom: 28}}>★★★★★ 4.9 · 380 reviews</div>
            <div style={{transform: `scale(${st === 'call' ? 1 + 0.05 * Math.sin(f / 4) : 1})`, boxShadow: st === 'call' ? `0 0 ${30 + 20 * Math.sin(f / 4)}px rgba(163,137,93,0.6)` : 'none', borderRadius: 46}}>
              <div style={{height: 96, borderRadius: 46, background: '#141414', color: C.goldLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.sans, fontWeight: 800, fontSize: 36}}>📞 Tap to call</div>
            </div>
            <div style={{height: 260, borderRadius: 24, marginTop: 30, background: 'linear-gradient(140deg,#d8d1c4,#b8ad99)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Illustration name="car_wrench" size={220} color="#3a352d" accent={C.goldInk} faintColor="#8a8070" float={false} />
            </div>
            {st === 'call' && <Tap x={230} y={500} at={Math.floor(dur * 0.5)} />}
          </div>
        )}
      </div>
    );
  } else if (ui === 'boost') {
    const tap = Math.floor(dur * 0.35);
    const stamp = ease(f, tap + 10, tap + 18);
    body = (
      <div style={{position: 'absolute', inset: '70px 0 0 0'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '18px 22px'}}><Avatar t="YC" size={56} ring /><div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 26, color: UI.text}}>yourcompany</div></div>
        <div style={{height: 560, background: 'linear-gradient(160deg,#1d1b18,#3a332a)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Illustration name="spray" size={300} color={C.ivory} accent={C.gold} faintColor={C.muted} float={false} />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px'}}>
          <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 24, color: UI.sub}}>View insights</div>
          <div style={{position: 'relative', background: UI.blue, color: '#fff', fontFamily: F.sans, fontWeight: 800, fontSize: 28, padding: '18px 34px', borderRadius: 14}}>
            Boost post
            <div style={{position: 'absolute', inset: -14, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: stamp, transform: `scale(${1.6 - 0.6 * stamp})`}}>
              <svg width={150} height={150} viewBox="0 0 100 100"><circle cx={50} cy={50} r={44} fill="none" stroke={UI.red} strokeWidth={8} /><path d="M20 80 L80 20" stroke={UI.red} strokeWidth={8} /></svg>
            </div>
          </div>
        </div>
        <Tap x={380} y={680} at={tap} />
      </div>
    );
  } else if (ui === 'email') {
    const days = Math.min(9, Math.floor(ease(f, 4, dur - 6) * 9) + 1);
    body = (
      <div style={{position: 'absolute', inset: '70px 0 0 0', padding: '24px 30px'}}>
        <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 48, color: UI.text, marginBottom: 26}}>Sent</div>
        <div style={{background: UI.panel, borderRadius: 24, padding: 26}}>
          <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 28, color: UI.text}}>To: Mark & Lisa Turner</div>
          <div style={{fontFamily: F.sans, fontWeight: 600, fontSize: 24, color: UI.sub, margin: '8px 0 20px'}}>Your kitchen remodel estimate</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, background: UI.panel2, borderRadius: 16, padding: '18px 20px'}}>
            <div style={{width: 54, height: 66, borderRadius: 8, background: UI.red, color: '#fff', fontFamily: F.sans, fontWeight: 800, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>PDF</div>
            <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 24, color: UI.text}}>{d.subject}</div>
          </div>
        </div>
        <div style={{marginTop: 50, textAlign: 'center'}}>
          <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: 120, color: C.gold}}>Day {days}</div>
          <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 30, color: UI.sub}}>No reply</div>
        </div>
      </div>
    );
  }
  return <Device light={ui === 'site'}>{body}</Device>;
};

// Generic ads dashboard (no third-party branding).
const DashScene: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const tiles = [['Spend', '$1,240'], ['Leads', '46'], ['Cost / lead', '$27'], ['Booked jobs', '11']];
  return (
    <AbsoluteFill>
      <Bg tone="ink" />
      <AbsoluteFill style={{padding: '320px 80px 0 80px'}}>
        <Card tone="ink" style={{padding: 40}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30}}>
            <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 34, color: C.ivory}}>Ad account · Last 30 days</div>
            <div style={{width: 14, height: 14, borderRadius: 7, background: '#3FBF6F'}} />
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20}}>
            {tiles.map(([a, b], i) => (
              <div key={a} style={{background: 'rgba(245,242,237,0.05)', borderRadius: 20, padding: 26, opacity: ease(f, i * 4, i * 4 + 10), border: i === 3 ? `2px solid ${C.gold}` : `1px solid ${C.line}`}}>
                <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 24, color: C.muted, letterSpacing: '0.08em'}}>{a.toUpperCase()}</div>
                <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: 76, color: i === 3 ? C.gold : C.ivory}}>{b}</div>
              </div>
            ))}
          </div>
          <div style={{display: 'flex', alignItems: 'flex-end', gap: 14, height: 220, marginTop: 34}}>
            {[40, 55, 48, 70, 62, 85, 78, 92, 88, 100, 95, 110].map((h, i) => (
              <div key={i} style={{flex: 1, height: `${h * 1.8 * ease(f, 6 + i, 18 + i)}px`, borderRadius: 8, background: i > 8 ? C.gold : 'rgba(245,242,237,0.22)'}} />
            ))}
          </div>
        </Card>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const TargetingScene: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const chips = ['Home improvement', 'Homeowners', 'DIY', 'Interior design', 'Gardening', 'Real estate', 'Power tools', 'Home & garden'];
  const off = ease(f, dur * 0.25, dur * 0.7);
  const on = ease(f, dur * 0.65, dur * 0.8);
  return (
    <AbsoluteFill>
      <Bg tone="ink" />
      <AbsoluteFill style={{padding: '330px 80px 0 80px'}}>
        <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 26, letterSpacing: '0.3em', color: C.gold, marginBottom: 30}}>AUDIENCE SETTINGS</div>
        <Card tone="ink" style={{padding: 40}}>
          <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 34, color: C.ivory, marginBottom: 26}}>Detailed targeting</div>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 14}}>
            {chips.map((c, i) => {
              const gone = off * chips.length > i;
              return (
                <div key={c} style={{position: 'relative', padding: '14px 22px', borderRadius: 999, border: `2px solid ${C.line}`, fontFamily: F.sans, fontWeight: 700, fontSize: 28, color: gone ? C.muted : C.ivory, opacity: gone ? 0.35 : 1}}>
                  ☐ {c}
                </div>
              );
            })}
          </div>
          <div style={{marginTop: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 26px', borderRadius: 20, background: 'rgba(197,169,117,0.08)', border: `2px solid ${on > 0.5 ? C.gold : C.line}`}}>
            <div style={{fontFamily: F.sans, fontWeight: 800, fontSize: 30, color: C.ivory}}>Broad audience</div>
            <div style={{width: 96, height: 54, borderRadius: 27, background: on > 0.5 ? C.gold : C.line, padding: 5}}>
              <div style={{width: 44, height: 44, borderRadius: 22, background: C.ivory, transform: `translateX(${on * 42}px)`}} />
            </div>
          </div>
        </Card>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
