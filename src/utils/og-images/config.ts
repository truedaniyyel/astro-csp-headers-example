import { readFileSync } from 'fs';
import type { ImageConfig, SvgConfig } from './types';
import type { Font } from 'satori';

const interRegular = readFileSync(
  `${process.cwd()}/public/og-fonts/inter-v18-latin-regular.ttf`
);
const interBlack = readFileSync(
  `${process.cwd()}/public/og-fonts/inter-v18-latin-900.ttf`
);

export const DEFAULT_IMAGE: ImageConfig = {
  format: 'webp',
  webpOptions: {
    quality: 90,
  },
};

export const DEFAULT_SVG: SvgConfig = {
  width: 1200,
  height: 630,
  embedFont: true,
};

export const DEFAULT_FONTS: Font[] = [
  {
    name: 'Inter',
    data: interRegular,
    weight: 400,
    style: 'normal',
  },
  {
    name: 'Inter',
    data: interBlack,
    weight: 900,
    style: 'normal',
  },
];
