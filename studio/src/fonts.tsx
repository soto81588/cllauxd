import React, {useEffect, useState} from 'react';
import {continueRender, delayRender, staticFile} from 'remotion';

// Self-hosted Google Fonts (variable): Playfair Display + Manrope.
// Rendering waits until the faces are loaded so no frame uses a fallback font.
const FACES: [string, string, FontFaceDescriptors][] = [
  ['Playfair Display', 'fonts/PlayfairDisplay-var.woff2', {style: 'normal', weight: '400 900'}],
  ['Playfair Display', 'fonts/PlayfairDisplay-italic-var.woff2', {style: 'italic', weight: '400 900'}],
  ['Manrope', 'fonts/Manrope-var.woff2', {style: 'normal', weight: '200 800'}],
];

let loaded: Promise<void> | null = null;
const loadAll = () => {
  if (!loaded) {
    loaded = Promise.all(
      FACES.map(([fam, url, desc]) => new FontFace(fam, `url(${staticFile(url)}) format("woff2")`, desc).load()),
    ).then((faces) => {
      faces.forEach((ff) => (document.fonts as any).add(ff));
    });
  }
  return loaded;
};

export const FontFaces: React.FC = () => {
  const [handle] = useState(() => delayRender('Loading brand fonts'));
  useEffect(() => {
    loadAll().then(() => continueRender(handle)).catch(() => continueRender(handle));
  }, [handle]);
  return <style>{`*{box-sizing:border-box}`}</style>;
};
