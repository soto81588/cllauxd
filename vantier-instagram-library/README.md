# Vantier — Instagram Content Library

**52 finished pieces · 34 Reels + 18 carousels · STATUS: DRAFT (every piece)**

Built to win organic, inbound clients for Vantier from service-business owners nationwide:
**attention → trust → profile visit → follow → DM → sales conversation → client.**
Teach first, sell second. Every piece makes one specific, useful point a roofer, HVAC owner, cleaner, detailer, barber or contractor can act on today. Vantier earns the DM by being obviously good at this.

| | |
|---|---|
| Reels | 34 × 9:16 MP4 (1080×1920, 30 fps, H.264, AAC 48 kHz), 23–36 s each, voice-over + word-synced captions + music + sound design, mastered to -14 LUFS |
| Carousels | 18 × 4:5 JPG sets (1080×1350), 7–10 slides each, 147 slides total |
| Per piece | Final file(s), cover (Reels), Instagram caption with hashtags, script / edit decision list, stock-swap notes |
| Index | [`CONTENT_INDEX.md`](CONTENT_INDEX.md) · [`content_index.csv`](content_index.csv) |
| Calendar | [`CONTENT_CALENDAR.md`](CONTENT_CALENDAR.md): 8 weeks, one post a day, slotted to the Vantier OS publisher times |
| Vantier OS import | [`vantier_os_drafts.json`](vantier_os_drafts.json): all 52 posts as drafts with caption, hashtags, media paths and the calendar's scheduled time (ET). Not loaded into Vantier OS yet |
| Brand rules | [`BRAND_SYSTEM.md`](BRAND_SYSTEM.md) |
| Stock upgrades | [`STOCK_SHOTLIST.md`](STOCK_SHOTLIST.md): optional licensed clips to swap in, by timecode |

## Folder layout

```
reels/R01-not-a-lead-problem/
  R01-not-a-lead-problem.mp4          final Reel (upload this)
  cover.jpg                            Reel cover (hook stays inside the 4:5 grid crop)
  caption.txt                          Instagram caption + hashtags
  script.md                            hook, VO script, timecoded edit list, stock swaps, music, SFX
  audio-stem_vo-sfx_no-music.m4a       voice + SFX only (for adding a trending sound in-app)
carousels/C01-meta-ad-setup-mistakes/
  slide-01.jpg … slide-08.jpg          upload in order
  caption.txt
  slides.md
```

## The strategy

**Audience:** owners of service businesses only. Roofing, HVAC, plumbing, electrical, landscaping and lawn care, cleaning, auto detailing, auto repair, moving, construction and remodeling, pest control, gyms, salons and barbershops, real estate. Nationwide, with no city dependence.

**Excluded by design:** restaurants, med spas, dentists, chiropractors, law firms, accounting firms and insurance agencies never appear in any hook, script, caption or example. A validation script scans the whole plan for those terms (and for city names) before every build.

**All 15 content pillars covered**

| Pillar | Pieces |
|---|---|
| Paid Advertising | R02 R11 R23 R26 · C02 C07 C11 C13 |
| Lead Generation | R07 R22 · C08 |
| Customer Acquisition | R06 R13 R20 · C09 C10 C14 |
| Marketing Psychology | R17 R21 R30 R33 · C12 C15 |
| Social Media Marketing | R05 R29 · C05 C16 |
| Business Growth | R03 R15 R19 · C03 |
| Advertising Mistakes | R08 · C01 |
| Marketing Mistakes | R09 R24 |
| Offer Creation | R10 R28 · C04 |
| Conversion | R01 R16 R18 R27 |
| Retargeting | R12 |
| Business Owner Pain Points | R32 |
| Marketing Myths | R14 · C06 |
| Competitor / Market Analysis | R04 · C17 |
| Vantier Authority | R25 R31 R34 · C18 |

**Built for organic reach**
- **Hooks:** every Reel opens on a pattern interrupt that names a specific problem ("Your business doesn't have a lead problem."), fully on screen at frame 0.
- **Shares:** CTAs like "Send this to an owner who's still boosting" turn viewers into distribution among business owners.
- **Saves:** playbooks, math, swipe files, templates and checklists (C03, C04, C08, R03, R15) are built to be saved and come back to.
- **Comments:** keyword and opinion prompts ("Comment your trade", "YES or NO", "score out of 3") feed the algorithm and open DMs.
- **DMs:** reserved for the authority pieces (R25 AUDIT, R34 SYSTEM, C02 tear-down, C18 VANTIER) after weeks of value.
- **CTA mix:** Save 18 · Follow 11 · Share 10 · Comment 8 · DM 4 · Tag 1. The calendar never puts the same ask on two posts in a row.
- **Instagram SEO:** natural keywords in captions (marketing agency, service business marketing, Facebook ads, Instagram ads, lead generation, customer acquisition, local business marketing, advertising strategy) plus 5 relevant hashtags per post. No stuffing.

## How to publish

1. Review each piece and change its status from DRAFT to APPROVED (Vantier OS → Content, or your own checklist).
2. **Reel:** upload the `.mp4`, set `cover.jpg` as the cover, and paste `caption.txt`.
3. **Carousel:** upload `slide-01 … slide-NN` in order and paste `caption.txt`.
4. Follow the calendar's engagement routine: reply to comments in the first hour, and share to Stories with a sticker.

**Trending audio (optional):** each Reel ships with original, fully owned music mixed under the voice. To ride a trending sound, upload the Reel, add the sound in Instagram at about 8–12% volume, or rebuild it over `audio-stem_vo-sfx_no-music.m4a`. Each `script.md` notes what style of track fits.

## Production notes: read before approving

These are the honest constraints this library was produced under, and what was done about each.

1. **Stock footage.** This build environment's network policy blocks the stock libraries (Pexels, Pixabay, Mixkit, Storyblocks and others). Instead of placeholder footage, every Reel is built from a premium motion system that fits Vantier's minimal identity:
   - **Custom line-art illustrations** for each trade.
   - **Product-style UI mockups:** phones, ads, forms, dashboards, texts, profiles and calendars.
   - **Kinetic typography and animated data.**

   The visuals match the narration beat by beat. Where real footage would add punch, [`STOCK_SHOTLIST.md`](STOCK_SHOTLIST.md) names the exact clip to swap in, by timecode.
2. **Photoreal images.** Three AI photoreal stills (HVAC technician, missed call on a job site) appear in R01, R09, R20 and R25. They were generated on the ElevenLabs free plan, which then hit its daily image limit. **ElevenLabs' free tier is generally not licensed for commercial use.** Before posting those four Reels, either confirm your ElevenLabs plan covers commercial use, or swap those scenes for licensed stock (listed in the shot list).
3. **Voice-over.** The ElevenLabs account had 1,909 of 10,000 monthly credits left, not enough to voice 34 Reels in one consistent voice. Every Reel is narrated with **Kokoro TTS (voice `af_heart`)**, an open-source model under the Apache-2.0 license, so it is commercially safe. For maximum founder trust, the strongest upgrade is to re-voice in Juan's own voice: record it yourself, or clone your voice on a paid ElevenLabs plan. The scripts are in each `script.md`, and the studio re-times and re-renders everything automatically (see `../studio/README.md`).
4. **Music and SFX.** All original, synthesized for Vantier, and fully owned. There are no licensing claims on them.
5. **Numbers and examples.** All dollar figures, close rates and the review in R21 are clearly framed as examples ("Say you…", "example numbers", "EXAMPLE REVIEW"). No client results are claimed. Phone numbers in mockups use the reserved fictional 555-01xx range.
6. **Offer language.** Guarantee or offer examples (e.g., "breaks again in 90 days? the visit's on us") are templates for clients, not promises from Vantier.

## Quality control: what was checked on every piece

| Check | Result |
|---|---|
| ≥ 50 unique concepts, no duplicates disguised as new titles | **52** (34 Reels + 18 carousels); unique core idea per piece, validated |
| Strong hook in the first 1–3 s | Hook on screen at frame 0, spoken in the first ~2 s |
| Clear target audience | Named trade or owner scenario in every piece |
| Visuals match narration | One scene per spoken beat; scene cuts timed to the VO |
| Motion graphics | Every Reel |
| Voice-over | All 34 Reels |
| Synchronized captions | All 34 Reels, word-level highlight, inside safe zones |
| Music + sound design | All 34 Reels; music ducked under VO; -14 LUFS / -1.5 dBFS peak ceiling |
| Mobile readability | Captions 58–66 px; slide headlines 60–150 px, body 38–60 px; every Reel and carousel reviewed on QC contact sheets |
| Instagram dimensions | Reels 1080×1920 9:16 · carousels 1080×1350 4:5 |
| Branding | Vantier palette, type, mark and wordmark; small chrome, logo only on end cards |
| Excluded industries / city dependence | Automated scan: none found |
| Clear, varied CTA | Every piece; 6 CTA types rotated |
| Caption + hashtags | Every piece (5 relevant hashtags each) |
