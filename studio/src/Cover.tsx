import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, F, Tone} from './brand';
import {FontFaces} from './fonts';
import {Illustration} from './illustrations';
import {Bg, Grain, Headline, Kicker, Wordmark, accentOf, mutedOf} from './ui';

// Reel cover (1080x1920). Key content sits inside the centre 4:5 crop
// (y 285–1635) so it also reads on the profile grid.
export const Cover: React.FC<{reel: any; id: string}> = ({reel}) => {
  const n = parseInt(reel.id.slice(1), 10);
  const tone: Tone = n % 2 === 0 ? 'ivory' : 'ink';
  const firstTitle = reel.beats.find((b: any) => b.scene.t === 'title');
  const icon = reel.beats.find((b: any) => b.scene.t === 'illus')?.scene.icon;
  const text = reel.coverText || reel.title;
  const accent = firstTitle && text === firstTitle.scene.text ? firstTitle.scene.accent : null;
  return (
    <AbsoluteFill>
      <FontFaces />
      <Bg tone={tone} />
      {icon && (
        <div style={{position: 'absolute', right: -60, bottom: 330, opacity: tone === 'ink' ? 0.5 : 0.35}}>
          <Illustration name={icon} size={560} color={tone === 'ink' ? C.muted : C.ivoryLine} accent={accentOf(tone)} faintColor={tone === 'ink' ? C.line : C.ivoryLine} start={-200} float={false} />
        </div>
      )}
      <AbsoluteFill style={{padding: '340px 90px 0 90px'}}>
        <Wordmark tone={tone} size={28} />
        <div style={{height: 120}} />
        <Kicker text={reel.pillar} tone={tone} delay={-40} style={{marginBottom: 40}} />
        <Headline text={text} accent={accent} tone={tone} size={text.length > 50 ? 92 : text.length > 34 ? 104 : 124} delay={-60} />
        <div style={{position: 'absolute', left: 90, top: 1500, display: 'flex', gap: 18, alignItems: 'center'}}>
          <div style={{padding: '12px 24px', borderRadius: 999, border: `2px solid ${accentOf(tone)}`, fontFamily: F.sans, fontWeight: 800, fontSize: 26, letterSpacing: '0.14em', color: accentOf(tone), textTransform: 'uppercase'}}>{reel.industry}</div>
          <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 26, letterSpacing: '0.14em', color: mutedOf(tone)}}>WATCH →</div>
        </div>
      </AbsoluteFill>
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};
