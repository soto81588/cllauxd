import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame, Easing} from 'remotion';
import {C} from './brand';

// Line-art illustration system. Every element is stroke-drawn in sequence
// (pathLength=1 + dashoffset), then gently breathes. 600x600 viewBox.
type Opt = {fill?: boolean; faint?: boolean; spin?: [number, number]; accent?: boolean; dash?: boolean; sweep?: boolean; text?: string};
type El = [string, Record<string, any>, Opt?];

const star4 = (x: number, y: number, r: number) =>
  `M${x} ${y - r} L${x + r * 0.28} ${y - r * 0.28} L${x + r} ${y} L${x + r * 0.28} ${y + r * 0.28} L${x} ${y + r} L${x - r * 0.28} ${y + r * 0.28} L${x - r} ${y} L${x - r * 0.28} ${y - r * 0.28} Z`;
const star5 = (cx: number, cy: number, r: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? r : r * 0.45;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return 'M' + pts.join(' L') + ' Z';
};
const pin = (x: number, y: number, s = 1) =>
  `M${x} ${y} C${x - 6 * s} ${y - 14 * s} ${x - 22 * s} ${y - 26 * s} ${x - 22 * s} ${y - 42 * s} A${22 * s} ${22 * s} 0 1 1 ${x + 22 * s} ${y - 42 * s} C${x + 22 * s} ${y - 26 * s} ${x + 6 * s} ${y - 14 * s} ${x} ${y} Z`;
const van = (x: number, y: number): El[] => [
  ['path', {d: `M${x} ${y + 80} V${y + 15} Q${x} ${y} ${x + 15} ${y} H${x + 140} L${x + 185} ${y + 40} H${x + 215} Q${x + 225} ${y + 40} ${x + 225} ${y + 50} V${y + 80} Z`}],
  ['path', {d: `M${x + 146} ${y + 10} L${x + 176} ${y + 40} H${x + 146} Z`}],
  ['circle', {cx: x + 48, cy: y + 82, r: 17}],
  ['circle', {cx: x + 178, cy: y + 82, r: 17}],
  ['line', {x1: x + 20, y1: y + 40, x2: x + 120, y2: y + 40}, {faint: true}],
];
const house = (ox = 0, oy = 0, s = 1): El[] => {
  const X = (v: number) => ox + v * s, Y = (v: number) => oy + v * s;
  return [
    ['path', {d: `M${X(120)} ${Y(290)} L${X(300)} ${Y(140)} L${X(480)} ${Y(290)}`}],
    ['path', {d: `M${X(150)} ${Y(268)} V${Y(490)} H${X(450)} V${Y(268)}`}],
    ['rect', {x: X(265), y: Y(380), width: 70 * s, height: 110 * s, rx: 4}],
    ['rect', {x: X(185), y: Y(315), width: 60 * s, height: 50 * s, rx: 3}],
    ['rect', {x: X(355), y: Y(315), width: 60 * s, height: 50 * s, rx: 3}],
    ['path', {d: `M${X(390)} ${Y(205)} V${Y(160)} H${X(425)} V${Y(234)}`}],
  ];
};
const car = (): El[] => [
  ['path', {d: 'M90 390 V345 Q90 324 112 321 L190 314 L252 258 Q262 248 282 248 H392 Q407 248 417 260 L467 318 L500 322 Q522 326 522 348 V390 Z'}],
  ['path', {d: 'M268 266 H332 V312 H214 Z'}],
  ['path', {d: 'M348 266 H396 L438 312 H348 Z'}],
  ['circle', {cx: 186, cy: 392, r: 40}],
  ['circle', {cx: 420, cy: 392, r: 40}],
  ['circle', {cx: 186, cy: 392, r: 14}, {accent: true}],
  ['circle', {cx: 420, cy: 392, r: 14}, {accent: true}],
  ['line', {x1: 60, y1: 434, x2: 548, y2: 434}, {faint: true}],
];

export const ICONS: Record<string, El[]> = {
  house: [...house(), ['line', {x1: 70, y1: 490, x2: 530, y2: 490}, {faint: true}]],
  house_tech: [
    ...house(-40, 30, 0.85),
    ['circle', {cx: 468, cy: 330, r: 28}],
    ['path', {d: 'M468 360 V440 M468 382 L440 420 M468 382 L497 412 M468 440 L448 505 M468 440 L490 505'}],
    ['rect', {x: 492, y: 410, width: 54, height: 36, rx: 4}, {accent: true}],
    ['path', {d: 'M506 410 V398 H532 V410'}, {accent: true}],
    ['line', {x1: 50, y1: 505, x2: 570, y2: 505}, {faint: true}],
  ],
  van_fleet: [...van(70, 140), ...van(170, 280), ...van(270, 420)],
  car_shine: [...car(), ['path', {d: star4(150, 200, 30)}, {accent: true, fill: true}], ['path', {d: star4(470, 190, 22)}, {accent: true, fill: true}], ['path', {d: star4(520, 260, 14)}, {accent: true, fill: true}], ['line', {x1: 230, y1: 230, x2: 330, y2: 420}, {sweep: true}]],
  car_wrench: [
    ...car(),
    ['path', {d: 'M300 210 L390 120'}, {accent: true}],
    ['path', {d: 'M378 108 A34 34 0 1 1 402 132 L414 120 A18 18 0 1 0 390 96 Z'}, {accent: true}],
    ['circle', {cx: 296, cy: 214, r: 8}, {accent: true}],
  ],
  roof: [
    ['path', {d: 'M80 330 L300 130 L520 330'}],
    ['path', {d: 'M223 200 H377 M179 240 H421 M135 280 H465 M91 320 H509'}, {faint: true}],
    ['path', {d: 'M260 200 V240 M330 200 V240 M215 240 V280 M300 240 V280 M385 240 V280 M175 280 V320 M260 280 V320 M345 280 V320 M430 280 V320'}, {faint: true}],
    ['path', {d: 'M120 318 V500 H480 V318'}],
    ['rect', {x: 265, y: 400, width: 70, height: 100, rx: 4}],
    ['rect', {x: 160, y: 360, width: 60, height: 50, rx: 3}],
    ['rect', {x: 380, y: 360, width: 60, height: 50, rx: 3}],
    ['circle', {cx: 495, cy: 135, r: 30}, {accent: true}],
    ['path', {d: 'M495 85 V70 M545 135 H560 M530 100 L541 89 M459 100 L448 89'}, {accent: true}],
    ['line', {x1: 60, y1: 500, x2: 540, y2: 500}, {faint: true}],
  ],
  storm_roof: [
    ['path', {d: 'M160 205 A42 42 0 0 1 228 160 A58 58 0 0 1 336 168 A44 44 0 0 1 362 245 H178 A38 38 0 0 1 160 205 Z'}],
    ['path', {d: 'M200 275 L188 305 M250 275 L238 305 M300 275 L288 305 M350 275 L338 305 M225 320 L213 350 M275 320 L263 350'}, {faint: true}],
    ['path', {d: 'M410 200 L382 262 H412 L388 320'}, {accent: true}],
    ['path', {d: 'M80 450 L300 300 L520 450'}],
    ['path', {d: 'M190 375 H250 M300 375 H410 M140 410 H230 M300 410 H460'}, {faint: true}],
    ['path', {d: 'M262 362 L282 352 M248 398 L270 386'}, {accent: true}],
    ['path', {d: 'M120 440 V545 H480 V440'}],
    ['line', {x1: 60, y1: 545, x2: 540, y2: 545}, {faint: true}],
  ],
  map: [
    ['path', {d: 'M90 170 L230 120 L370 170 L510 120 V430 L370 480 L230 430 L90 480 Z'}],
    ['path', {d: 'M230 120 V430 M370 170 V480'}, {faint: true}],
    ['path', {d: 'M120 260 C200 240 260 330 340 300 S460 230 500 280'}, {faint: true}],
    ['circle', {cx: 300, cy: 300, r: 120}, {accent: true, dash: true}],
    ['path', {d: pin(300, 300, 1)}, {accent: true, fill: true}],
    ['path', {d: pin(238, 352, 0.7)}, {accent: true}],
    ['path', {d: pin(372, 345, 0.7)}, {accent: true}],
    ['path', {d: pin(330, 228, 0.6)}, {accent: true}],
  ],
  kitchen: [
    ['rect', {x: 90, y: 130, width: 420, height: 110, rx: 4}],
    ['path', {d: 'M195 130 V240 M300 130 V240 M405 130 V240'}, {faint: true}],
    ['path', {d: 'M200 60 V100 M400 60 V100'}],
    ['path', {d: 'M176 112 Q200 84 224 112 Z M376 112 Q400 84 424 112 Z'}, {accent: true}],
    ['line', {x1: 66, y1: 360, x2: 534, y2: 360}],
    ['rect', {x: 90, y: 362, width: 420, height: 150, rx: 4}],
    ['path', {d: 'M195 362 V512 M300 362 V512 M405 362 V512 M90 400 H510'}, {faint: true}],
    ['path', {d: 'M248 360 V318 Q248 298 268 298 H286 V316'}, {accent: true}],
    ['path', {d: 'M150 440 H170 M245 440 H265 M350 440 H370 M455 440 H475'}, {faint: true}],
  ],
  mower: [
    ['path', {d: 'M60 440 H540 M60 480 H540 M60 520 H540'}, {faint: true}],
    ['path', {d: 'M110 430 L70 540 M210 430 L190 540 M300 430 L300 540 M390 430 L410 540 M490 430 L530 540'}, {faint: true}],
    ['path', {d: 'M195 400 L238 330 H398 L430 400 Z'}],
    ['line', {x1: 398, y1: 332, x2: 488, y2: 210}],
    ['line', {x1: 470, y1: 200, x2: 508, y2: 224}, {accent: true}],
    ['circle', {cx: 236, cy: 410, r: 24}],
    ['circle', {cx: 410, cy: 410, r: 24}],
    ['path', {d: 'M150 410 l6 -26 M162 410 l-2 -22 M470 410 l6 -24 M482 410 l-4 -20 M120 412 l4 -18'}, {accent: true}],
  ],
  leaf: [
    ['path', {d: 'M300 110 C420 150 470 280 420 400 C384 474 300 500 300 500 C300 500 216 474 180 400 C130 280 180 150 300 110 Z'}],
    ['path', {d: 'M300 140 V545'}],
    ['path', {d: 'M300 220 L360 188 M300 220 L240 188 M300 290 L382 248 M300 290 L218 248 M300 360 L392 318 M300 360 L208 318 M300 430 L370 398 M300 430 L230 398'}, {faint: true}],
    ['path', {d: star4(470, 150, 18)}, {accent: true, fill: true}],
  ],
  bath: [
    ['path', {d: 'M150 120 V330 M225 120 V330 M300 120 V330 M375 120 V330 M450 120 V330 M90 170 H510 M90 220 H510 M90 270 H510'}, {faint: true}],
    ['path', {d: 'M80 330 H520 V382 Q520 472 430 472 H170 Q80 472 80 382 Z'}],
    ['path', {d: 'M150 472 L138 505 M450 472 L462 505'}],
    ['path', {d: 'M452 330 V252 Q452 232 472 232 H500'}, {accent: true}],
    ['circle', {cx: 200, cy: 312, r: 14}, {accent: true}],
    ['circle', {cx: 238, cy: 296, r: 10}, {accent: true}],
    ['circle', {cx: 276, cy: 314, r: 12}, {accent: true}],
  ],
  truck: [
    ['rect', {x: 60, y: 190, width: 310, height: 210, rx: 6}],
    ['path', {d: 'M370 255 H452 L505 322 V400 H370'}],
    ['path', {d: 'M386 272 H446 L482 318 H386 Z'}],
    ['rect', {x: 95, y: 290, width: 86, height: 86, rx: 3}, {accent: true}],
    ['rect', {x: 190, y: 316, width: 72, height: 60, rx: 3}, {accent: true}],
    ['path', {d: 'M95 318 H181 M190 338 H262'}, {faint: true}],
    ['circle', {cx: 148, cy: 410, r: 34}],
    ['circle', {cx: 318, cy: 410, r: 34}],
    ['circle', {cx: 446, cy: 410, r: 34}],
    ['line', {x1: 40, y1: 446, x2: 560, y2: 446}, {faint: true}],
  ],
  panel: [
    ['rect', {x: 170, y: 100, width: 260, height: 400, rx: 12}],
    ['rect', {x: 198, y: 138, width: 204, height: 324, rx: 6}, {faint: true}],
    ...[170, 215, 260, 305, 350, 395].flatMap((y): El[] => [
      ['rect', {x: 216, y, width: 64, height: 26, rx: 4}],
      ['rect', {x: 320, y, width: 64, height: 26, rx: 4}],
    ]),
    ['path', {d: 'M488 200 L446 296 H486 L452 392'}, {accent: true}],
    ['path', {d: 'M240 500 V560 M300 500 V560 M360 500 V560'}, {faint: true}],
  ],
  shield_bug: [
    ['path', {d: 'M300 105 L472 168 V300 C472 412 392 482 300 522 C208 482 128 412 128 300 V168 Z'}],
    ['ellipse', {cx: 300, cy: 330, rx: 50, ry: 70}, {accent: true}],
    ['circle', {cx: 300, cy: 242, r: 24}, {accent: true}],
    ['path', {d: 'M252 300 L210 282 M250 335 L205 335 M252 370 L212 392 M348 300 L390 282 M350 335 L395 335 M348 370 L388 392 M290 222 L272 196 M310 222 L328 196'}, {accent: true}],
    ['line', {x1: 205, y1: 230, x2: 400, y2: 430}],
  ],
  shower: [
    ['path', {d: 'M170 150 H300 Q330 150 330 180 V200'}],
    ['path', {d: 'M282 200 H378 L398 242 H262 Z'}],
    ['path', {d: 'M280 268 V300 M300 268 V330 M320 268 V300 M340 268 V330 M360 268 V300 M290 340 V372 M330 344 V380 M350 314 V350 M310 352 V392'}, {accent: true}],
    ['path', {d: 'M190 420 q22 -22 0 -44 q-22 -22 0 -44 M440 430 q22 -22 0 -44 q-22 -22 0 -44 M480 360 q16 -16 0 -32 q-16 -16 0 -32'}, {faint: true}],
    ['line', {x1: 150, y1: 470, x2: 470, y2: 470}],
    ['ellipse', {cx: 320, cy: 470, rx: 70, ry: 10}, {faint: true}],
  ],
  snow: [
    ['path', {d: 'M300 110 V370 M187 175 L413 305 M187 305 L413 175'}],
    ['path', {d: 'M300 150 L275 128 M300 150 L325 128 M300 330 L275 352 M300 330 L325 352 M222 195 L190 200 M222 195 L214 165 M378 285 L410 280 M378 285 L386 315 M222 285 L214 315 M222 285 L190 280 M378 195 L386 165 M378 195 L410 200'}, {accent: true}],
    ['path', {d: 'M180 470 L300 400 L420 470'}],
    ['path', {d: 'M200 462 V545 H400 V462'}],
    ['path', {d: 'M60 545 Q160 520 300 545 T540 545'}, {faint: true}],
    ['circle', {cx: 110, cy: 160, r: 6}, {accent: true, fill: true}],
    ['circle', {cx: 500, cy: 140, r: 5}, {accent: true, fill: true}],
    ['circle', {cx: 470, cy: 380, r: 6}, {accent: true, fill: true}],
    ['circle', {cx: 130, cy: 360, r: 5}, {accent: true, fill: true}],
  ],
  review: [
    ['path', {d: 'M110 160 H490 Q520 160 520 190 V380 Q520 410 490 410 H262 L190 482 V410 H110 Q80 410 80 380 V190 Q80 160 110 160 Z'}],
    ...[170, 235, 300, 365, 430].map((x): El => ['path', {d: star5(x, 255, 30)}, {accent: true, fill: true}]),
    ['path', {d: 'M150 330 H450 M150 365 H372'}, {faint: true}],
  ],
  driveway: [
    ['path', {d: 'M130 545 L232 150 H368 L470 545 Z'}],
    ['path', {d: 'M206 250 H394 M180 350 H420 M153 450 H447'}, {faint: true}],
    ['path', {d: 'M300 150 V545'}, {faint: true}],
    ['path', {d: star4(470, 200, 24)}, {accent: true, fill: true}],
    ['path', {d: star4(130, 300, 16)}, {accent: true, fill: true}],
  ],
  plans: [
    ['rect', {x: 100, y: 120, width: 400, height: 330, rx: 6}],
    ['path', {d: 'M150 170 H450 V400 H150 Z'}],
    ['path', {d: 'M300 170 V300 M150 300 H380 M380 300 V400'}],
    ['path', {d: 'M300 260 A40 40 0 0 1 340 300 M380 360 A40 40 0 0 0 420 400'}, {faint: true}],
    ['path', {d: 'M392 478 L512 358 L536 382 L416 502 Z M392 478 L384 510 L416 502'}, {accent: true}],
  ],
  dumbbell: [
    ['line', {x1: 150, y1: 300, x2: 450, y2: 300}],
    ['rect', {x: 120, y: 214, width: 40, height: 172, rx: 8}],
    ['rect', {x: 76, y: 246, width: 40, height: 108, rx: 8}],
    ['rect', {x: 440, y: 214, width: 40, height: 172, rx: 8}],
    ['rect', {x: 484, y: 246, width: 40, height: 108, rx: 8}],
    ['path', {d: 'M250 288 V312 M270 288 V312 M290 288 V312 M310 288 V312 M330 288 V312 M350 288 V312'}, {accent: true}],
  ],
  kettlebell: [
    ['path', {d: 'M236 236 Q236 150 300 150 Q364 150 364 236'}],
    ['path', {d: 'M262 236 Q262 182 300 182 Q338 182 338 236'}, {faint: true}],
    ['circle', {cx: 300, cy: 340, r: 112}],
    ['line', {x1: 228, y1: 444, x2: 372, y2: 444}],
    ['path', {d: 'M110 260 H160 M96 320 H156 M110 380 H160 M440 260 H490 M444 320 H504 M440 380 H490'}, {accent: true}],
  ],
  scissors: [
    ['circle', {cx: 214, cy: 430, r: 46}],
    ['circle', {cx: 346, cy: 430, r: 46}],
    ['path', {d: 'M244 395 L410 128 M316 395 L150 128'}],
    ['circle', {cx: 280, cy: 290, r: 8}, {accent: true, fill: true}],
    ['rect', {x: 420, y: 170, width: 120, height: 30, rx: 6}, {accent: true}],
    ['path', {d: 'M432 200 V236 M448 200 V236 M464 200 V236 M480 200 V236 M496 200 V236 M512 200 V236 M528 200 V236'}, {accent: true}],
  ],
  tag: [
    ['path', {d: 'M140 300 L290 150 H450 V310 L300 460 Z'}],
    ['circle', {cx: 400, cy: 200, r: 18}],
    ['path', {d: 'M440 150 Q520 90 540 170'}, {faint: true}],
    ['text', {x: 290, y: 360, fontSize: 150, textAnchor: 'middle'}, {text: '$', accent: true}],
  ],
  team: [
    ['circle', {cx: 196, cy: 250, r: 40}],
    ['circle', {cx: 300, cy: 214, r: 48}, {accent: true}],
    ['circle', {cx: 404, cy: 250, r: 40}],
    ['path', {d: 'M126 410 Q196 300 266 410'}],
    ['path', {d: 'M214 410 Q300 272 386 410'}, {accent: true}],
    ['path', {d: 'M334 410 Q404 300 474 410'}],
    ['line', {x1: 90, y1: 410, x2: 510, y2: 410}, {faint: true}],
  ],
  night_desk: [
    ['path', {d: 'M440 110 A62 62 0 1 0 500 196 A50 50 0 1 1 440 110 Z'}, {accent: true}],
    ['circle', {cx: 140, cy: 140, r: 5}, {accent: true, fill: true}],
    ['circle', {cx: 220, cy: 100, r: 4}, {accent: true, fill: true}],
    ['circle', {cx: 360, cy: 150, r: 4}, {accent: true, fill: true}],
    ['rect', {x: 168, y: 260, width: 264, height: 170, rx: 10}],
    ['path', {d: 'M128 432 H472 L444 462 H156 Z'}],
    ['path', {d: 'M200 300 H330 M200 335 H390 M200 370 H300'}, {faint: true}],
    ['rect', {x: 478, y: 392, width: 50, height: 62, rx: 6}],
    ['path', {d: 'M528 406 Q552 406 552 423 Q552 440 528 440'}],
    ['path', {d: 'M60 462 H560'}, {faint: true}],
  ],
  camera_phone: [
    ['rect', {x: 210, y: 100, width: 180, height: 370, rx: 28}],
    ['rect', {x: 226, y: 130, width: 148, height: 300, rx: 10}, {faint: true}],
    ['path', {d: 'M246 156 H270 M246 156 V180 M354 156 H330 M354 156 V180 M246 404 H270 M246 404 V380 M354 404 H330 M354 404 V380'}, {accent: true}],
    ['circle', {cx: 300, cy: 250, r: 26}],
    ['path', {d: 'M252 340 Q300 280 348 340'}],
    ['circle', {cx: 300, cy: 448, r: 10}, {accent: true, fill: true}],
    ['path', {d: 'M440 210 L500 180 V330 L440 300'}, {faint: true}],
  ],
  ac: [
    ['rect', {x: 140, y: 160, width: 320, height: 300, rx: 14}],
    ['circle', {cx: 300, cy: 312, r: 108}],
    ['circle', {cx: 300, cy: 312, r: 18}, {accent: true}],
    ['path', {d: 'M300 294 C300 250 330 230 350 240 C340 260 320 280 300 294 M318 320 C356 342 360 378 342 390 C330 372 320 346 318 320 M282 320 C246 344 214 330 214 308 C236 308 262 314 282 320'}, {accent: true, spin: [300, 312]}],
    ['path', {d: 'M170 186 H430'}, {faint: true}],
    ['path', {d: 'M170 460 V490 M430 460 V490'}],
  ],
  spray: [
    ['path', {d: 'M232 262 H352 L372 330 V478 Q372 500 350 500 H234 Q212 500 212 478 V330 Z'}],
    ['rect', {x: 262, y: 206, width: 60, height: 56, rx: 4}],
    ['path', {d: 'M248 206 H356 L384 178 H300 L282 152 H248 Z'}],
    ['path', {d: 'M330 206 L350 252'}],
    ['path', {d: 'M232 380 H352'}, {faint: true}],
    ['circle', {cx: 200, cy: 160, r: 6}, {accent: true, fill: true}],
    ['circle', {cx: 172, cy: 186, r: 5}, {accent: true, fill: true}],
    ['circle', {cx: 160, cy: 140, r: 4}, {accent: true, fill: true}],
    ['path', {d: star4(120, 250, 26)}, {accent: true, fill: true}],
    ['path', {d: star4(470, 260, 20)}, {accent: true, fill: true}],
  ],
  dash: [
    ['rect', {x: 100, y: 140, width: 400, height: 320, rx: 18}],
    ['path', {d: 'M100 196 H500'}, {faint: true}],
    ['rect', {x: 160, y: 330, width: 44, height: 90, rx: 4}],
    ['rect', {x: 232, y: 290, width: 44, height: 130, rx: 4}],
    ['rect', {x: 304, y: 250, width: 44, height: 170, rx: 4}],
    ['rect', {x: 376, y: 222, width: 44, height: 198, rx: 4}, {accent: true}],
    ['path', {d: 'M150 300 L220 270 L300 236 L400 206 L450 214'}, {accent: true}],
  ],
  calc: [
    ['rect', {x: 180, y: 110, width: 240, height: 380, rx: 22}],
    ['rect', {x: 210, y: 140, width: 180, height: 70, rx: 8}, {accent: true}],
    ...[0, 1, 2].flatMap((c) => [0, 1, 2, 3].map((r): El => ['rect', {x: 212 + c * 62, y: 236 + r * 60, width: 50, height: 42, rx: 8}, c === 2 && r === 3 ? {accent: true, fill: true} : undefined])),
  ],
  calendar: [
    ['rect', {x: 120, y: 150, width: 360, height: 320, rx: 18}],
    ['path', {d: 'M120 214 H480'}],
    ['path', {d: 'M200 118 V182 M400 118 V182'}, {accent: true}],
    ...[0, 1, 2, 3, 4].flatMap((c) => [0, 1, 2, 3].map((r): El => ['rect', {x: 150 + c * 62, y: 238 + r * 56, width: 40, height: 36, rx: 6}, (c + r) % 3 === 0 ? {accent: true, fill: true} : {faint: true}])),
  ],
  sms: [
    ['path', {d: 'M100 150 H380 Q410 150 410 180 V290 Q410 320 380 320 H190 L140 370 V320 H100 Q70 320 70 290 V180 Q70 150 100 150 Z'}],
    ['path', {d: 'M220 340 H500 Q530 340 530 370 V460 Q530 490 500 490 H460 V540 L410 490 H220 Q190 490 190 460 V370 Q190 340 220 340 Z'}, {accent: true}],
    ['path', {d: 'M120 215 H340 M120 255 H280'}, {faint: true}],
    ['path', {d: 'M240 400 H480 M240 440 H420'}, {faint: true}],
  ],
  x: [
    ['circle', {cx: 300, cy: 300, r: 190}],
    ['path', {d: 'M220 220 L380 380 M380 220 L220 380'}, {accent: true}],
  ],
  key_house: [
    ...house(-30, -10, 0.9),
    ['circle', {cx: 440, cy: 400, r: 42}, {accent: true}],
    ['path', {d: 'M410 430 L300 540 M330 510 L352 532 M356 484 L378 506'}, {accent: true}],
  ],
  split: [
    ['path', {d: 'M300 520 V330 Q300 280 250 240 L150 160 M300 330 Q300 280 350 240 L450 160'}],
    ['path', {d: 'M150 160 L150 220 M150 160 L210 160'}, {accent: true}],
    ['path', {d: 'M450 160 L450 220 M450 160 L390 160'}, {accent: true}],
    ['circle', {cx: 300, cy: 520, r: 14}, {accent: true, fill: true}],
  ],
  hook: [
    ['path', {d: 'M300 60 V120'}, {faint: true}],
    ['circle', {cx: 300, cy: 134, r: 14}],
    ['path', {d: 'M300 148 V380 A78 78 0 1 1 222 302'}],
    ['path', {d: 'M222 302 L248 330 M222 302 L208 338'}, {accent: true}],
  ],
  search: [
    ['circle', {cx: 262, cy: 262, r: 132}],
    ['line', {x1: 358, y1: 358, x2: 488, y2: 488}],
    ['path', {d: 'M200 230 Q230 180 290 180'}, {accent: true}],
    ['path', {d: 'M200 300 H330 M200 336 H300'}, {faint: true}],
  ],
};

export const hasIcon = (n: string) => n === 'mark' || n in ICONS || n.startsWith('driveway');

export const Illustration: React.FC<{
  name: string;
  size: number;
  color?: string;
  accent?: string;
  faintColor?: string;
  start?: number;
  drawFrames?: number;
  stroke?: number;
  mode?: string;
  float?: boolean;
}> = ({name, size, color = C.ivory, accent = C.gold, faintColor, start = 0, drawFrames = 32, stroke = 5, float = true}) => {
  const frame = useCurrentFrame() - start;
  if (name === 'mark') {
    const o = interpolate(frame, [0, 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    return <Img src={staticFile('vantier-mark.png')} style={{width: size * 0.6, opacity: o}} />;
  }
  const base = name.startsWith('driveway') ? 'driveway' : name;
  const els = ICONS[base] || ICONS.house;
  const n = els.length;
  const p = interpolate(frame, [0, drawFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const fy = float ? Math.sin(frame / 22) * 6 : 0;
  const dirty = name === 'driveway_dirty' || name === 'driveway_reveal';
  const reveal = name === 'driveway_reveal' ? interpolate(frame, [6, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)}) : 0;
  return (
    <svg width={size} height={size} viewBox="0 0 600 600" style={{transform: `translateY(${fy}px)`, overflow: 'visible'}}>
      <defs>
        <clipPath id="dw">
          <path d="M130 545 L232 150 H368 L470 545 Z" />
        </clipPath>
        <linearGradient id="grime" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.55" />
          <stop offset="1" stopColor="#000" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      {dirty && (
        <g clipPath="url(#dw)" opacity={interpolate(frame, [0, 10], [0, 1], {extrapolateRight: 'clamp'})}>
          <rect x={0} y={0} width={600} height={600} fill="#3a3329" />
          {[...Array(26)].map((_, i) => (
            <ellipse key={i} cx={150 + ((i * 97) % 300)} cy={170 + ((i * 53) % 370)} rx={20 + ((i * 7) % 40)} ry={8 + ((i * 5) % 18)} fill="url(#grime)" opacity={0.7} />
          ))}
          {reveal > 0 && <rect x={300 - 80} y={600 - reveal * 460} width={160} height={reveal * 460} fill={C.ivory} opacity={0.92} />}
        </g>
      )}
      {els.map(([tag, props, opt = {}], i) => {
        const t0 = (i / Math.max(1, n)) * 0.55;
        const local = Math.max(0, Math.min(1, (p - t0) / 0.45));
        const col = opt.accent ? accent : opt.faint ? faintColor || color : color;
        const common: any = {
          key: i,
          fill: 'none',
          stroke: col,
          strokeWidth: opt.faint ? stroke * 0.55 : stroke,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          pathLength: 1,
          strokeDasharray: opt.dash ? '0.02 0.02' : 1,
          strokeDashoffset: opt.dash ? 0 : 1 - local,
          opacity: opt.faint ? 0.45 * (opt.dash ? local : 1) : opt.dash ? local : 1,
        };
        if (opt.fill) {
          common.fill = col;
          common.fillOpacity = Math.max(0, (local - 0.6) / 0.4);
        }
        if (opt.spin) {
          const ang = Math.max(0, frame - drawFrames * 0.6) * 4;
          common.transform = `rotate(${ang} ${opt.spin[0]} ${opt.spin[1]})`;
        }
        if (opt.sweep) {
          const s = ((frame % 75) / 75) * 1.6 - 0.3;
          return <line key={i} x1={150 + s * 300} y1={220} x2={250 + s * 300} y2={430} stroke={C.white} strokeWidth={10} strokeLinecap="round" opacity={0.35 * local} />;
        }
        if (tag === 'text') {
          return (
            <text key={i} {...props} fill={col} opacity={local} style={{fontFamily: '"Playfair Display", serif', fontWeight: 600}}>
              {opt.text}
            </text>
          );
        }
        return React.createElement(tag, {...props, ...common});
      })}
    </svg>
  );
};
