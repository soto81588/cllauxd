# Vantier Visual & Audio System (Instagram)

Built from the existing Vantier identity: the gold "V" mark, the VANTIER wordmark, and the Vantier OS design tokens. Every Reel and carousel in this library follows these rules, so the grid reads as one company.

## Color

| Token | Hex | Use |
|---|---|---|
| Ink | `#0F0E0D` / `#141414` | Primary background (dark) |
| Panel | `#211F1C` | Cards, phone UI panels |
| Ivory | `#F5F2ED` | Light-theme background, primary text on dark |
| Gold | `#C5A975` (dark) / `#A3895D` (light) | Accent words, active caption word, key numbers, winners |
| Gold ink | `#7E6740` | Gold text on ivory (contrast-safe) |
| Muted | `#A39C90` / `#6B655B` | Secondary text |
| Signal red | `#E07B6F` | Only for "bad" metrics, strike-throughs, missed calls |

Rules: gold is the only accent. Red is used sparingly and only to signal a problem. No gradients except soft radial glows and the gold bar fill. There are three background tones: ink (default), ivory (contrast beats) and solid gold (one punchline per Reel at most).

## Typography

- **Playfair Display** (500–600, italic for accents): headlines, numbers, quotes. Tight leading (1.05) and slight negative tracking.
- **Manrope** (600–800): captions, UI, labels, body.
- **Kicker labels**: Manrope 700, 26 px, 0.3em tracking, uppercase, gold, with a 64 px gold hairline.
- **Accent words**: set in Playfair italic, gold. One accent phrase per headline.

## Layout (Reels, 1080×1920)

- Instagram safe zones respected: nothing important above y=250 (Reels header) or below y=1540 (username, caption, audio); right rail (x>940) kept clear below y=1000.
- Subtitle band centered at y≈1395, max width 860 px, one line.
- Headline blocks anchored at y≈540; data scenes start at y≈330–470.
- Persistent chrome: small VANTIER wordmark + pillar label at top-left (y=178), 78% opacity. Never a large logo. The mark appears only on the end card.

## Motion

- Cuts land on the narration: every scene is one spoken beat (about 2–3.5 s).
- Entrances: spring rise of 30–46 px + fade, words staggered by 2 frames; scene cut-ins settle from 104% to 100% over 8 frames.
- Illustrations draw on stroke by stroke (about 1 s), then breathe slowly.
- Data animates to make the point: bars grow, numbers count up, the timer ring fills, strike-throughs draw.
- Continuous subtle zoom (about 3–4%) keeps every frame alive. Film grain overlay at 7%.
- The hook is fully on screen at frame 0 (first scene pre-rolled 1 s) for retention and the grid thumbnail.

## Captions / subtitles

- Burned in, word-synced to the voice-over. Manrope ExtraBold 58–66 px, 2–3 words per chunk, broken at punctuation.
- Spoken words not yet said sit at 55% opacity, the active word is gold, and said words are white (ink on light scenes).
- Numbers are shown as numerals ("$1,000", "5-minute") even though they're spoken as words.

## Iconography

Custom line-art set (40+ icons) in a single stroke weight with rounded caps: house, roof, storm roof, AC condenser, breaker panel, shower, kitchen, bath, mower, leaf, snow, spray bottle, car (shine and wrench), moving truck, van fleet, pest shield, dumbbell, kettlebell, scissors, map pins, plans, price tag, team, review bubble, laptop at night, camera phone, dashboard, calculator, calendar, chat, search, hook, split. Ivory lines with gold accent details.

## Carousels (1080×1350)

- Alternating ink and ivory themes across the series so the grid has rhythm.
- Slide 1: kicker, a Playfair hook with gold italic accent, a line icon top-right, "SWIPE →".
- Middle slides: one idea per slide, a big italic numeral, the headline, and at most two lines of body copy.
- Final slide: the mark, the wordmark, a one-line CTA, and an @official.vantier pill.
- Footer on every slide: the wordmark and a slide counter.

## Audio identity

- **Voice:** one consistent narrator across all Reels. Confident, conversational, short sentences.
- **Music:** three original Vantier beds (Pulse, Glass, Drive), fully owned, minimal and premium. Ducked about 6 dB under the voice.
- **SFX:** soft cut whooshes, UI pops and dings, data ticks, a low impact on the hook and big numbers. All about -20 dB under the voice.
- **Loudness:** master at -14 LUFS, -1.5 dBFS peak ceiling.

## Don'ts

No stock "entrepreneur" clichés, no emoji walls, no neon gradients, no Canva template frames, no giant logos, no text below the safe line, and never more than one accent color.
