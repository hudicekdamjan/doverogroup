import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export interface ResponsiveSet {
  avif: string;
  webp: string;
  fallback: string;
  width: number;
  height: number;
}

/** Builds AVIF + WebP srcsets for one source image (used for art-directed hero images + preload). */
export async function responsiveSet(src: ImageMetadata, widths: number[], quality = 70): Promise<ResponsiveSet> {
  const usable = widths.filter((w) => w <= src.width);
  if (!usable.includes(Math.min(src.width, widths[widths.length - 1]))) usable.push(Math.min(src.width, widths[widths.length - 1]));
  const [avif, webp] = await Promise.all([
    getImage({ src, widths: usable, format: 'avif', quality: quality - 12 }),
    getImage({ src, widths: usable, format: 'webp', quality }),
  ]);
  return {
    avif: avif.srcSet.attribute,
    webp: webp.srcSet.attribute,
    fallback: webp.src,
    width: src.width,
    height: src.height,
  };
}

/** 1200×630 JPEG for Open Graph / social sharing. */
export async function ogImage(src: ImageMetadata) {
  const img = await getImage({ src, width: 1200, height: 630, fit: 'cover', format: 'jpg', quality: 78 });
  return { src: img.src, width: 1200, height: 630 };
}
