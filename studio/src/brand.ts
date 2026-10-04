// Vantier brand tokens, taken from the Vantier OS design system
// (ivory #F5F2ED / ink #1A1A1A / gold #A3895D; dark: #141414 / #C5A975).
export const C = {
  ink: '#0F0E0D',
  ink2: '#171614',
  ink3: '#211F1C',
  line: '#34312C',
  ivory: '#F5F2ED',
  ivory2: '#EEE8DE',
  ivoryLine: '#DDD6CA',
  muted: '#A39C90',
  mutedInk: '#6B655B',
  gold: '#C5A975',
  goldDeep: '#A3895D',
  goldInk: '#7E6740',
  goldLight: '#D9C196',
  bad: '#E07B6F',
  badDeep: '#A33A2F',
  white: '#FFFFFF',
};

export const F = {
  serif: '"Playfair Display", Georgia, serif',
  sans: 'Manrope, system-ui, sans-serif',
};

export const W = 1080;
export const H = 1920;
export const FPS = 30;

// Instagram Reels safe zones (px): top UI, bottom caption/username, right action rail.
export const SAFE = {top: 250, bottom: 1540, left: 80, right: 940};
export const CAPTION_Y = 1395; // vertical center of the subtitle band

export type Tone = 'ink' | 'ivory' | 'gold';
export const toneOf = (bg?: string): Tone => (bg === 'ivory' ? 'ivory' : bg === 'gold' ? 'gold' : 'ink');
export const fg = (t: Tone) => (t === 'ink' ? C.ivory : C.ink);
export const accentOf = (t: Tone) => (t === 'ink' ? C.gold : t === 'ivory' ? C.goldDeep : C.ink);
export const mutedOf = (t: Tone) => (t === 'ink' ? C.muted : t === 'ivory' ? C.mutedInk : '#3d3427');
export const bgOf = (t: Tone) => (t === 'ink' ? C.ink : t === 'ivory' ? C.ivory : C.gold);
