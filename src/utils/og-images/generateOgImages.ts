import sharp from 'sharp';
import type { ImageConfig } from './types';
import type { CollectionEntry } from 'astro:content';
import { generatePostOgSvg } from './templates/postTemplate';
import { generateSiteOgSvg } from './templates/siteTemplate';
import { DEFAULT_IMAGE, DEFAULT_SVG, DEFAULT_FONTS } from './config';

export async function svgBufferToImageBuffer(
  svg: string,
  config: ImageConfig = DEFAULT_IMAGE
) {
  const sharpInstance = sharp(Buffer.from(svg));

  const formatOptions = {
    webp: (sharpInstance: sharp.Sharp) =>
      sharpInstance.webp(config.webpOptions),
    jpeg: (sharpInstance: sharp.Sharp) =>
      sharpInstance.jpeg(config.jpegOptions),
    avif: (sharpInstance: sharp.Sharp) =>
      sharpInstance.avif(config.avifOptions),
  };

  return formatOptions[config.format]?.(sharpInstance).toBuffer();
}

export async function generateOgImageForPost(post: CollectionEntry<'blog'>) {
  const svg = await generatePostOgSvg(post, DEFAULT_SVG, DEFAULT_FONTS);

  return await svgBufferToImageBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await generateSiteOgSvg(DEFAULT_SVG, DEFAULT_FONTS);

  return await svgBufferToImageBuffer(svg);
}
