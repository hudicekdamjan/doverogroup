/**
 * PROJECT GALLERY
 * ───────────────
 * To add a photo:
 *   1. Put the file in src/assets/gallery/ (JPG/PNG/WebP, long side ≥ 2000 px, descriptive file name).
 *   2. Import it below and add an entry with an English + Montenegrin alt text.
 *   3. Choose a layout size: 'wide' (landscape), 'tall' (portrait) or 'square'.
 * To add a before/after comparison, add an entry to BEFORE_AFTER instead.
 * Images are converted to AVIF/WebP and resized automatically at build time.
 */
import type { ImageMetadata } from 'astro';
import type { Locale } from '@/i18n/routes';
import { PHOTOS } from './media';

export type GalleryCategory = 'detailing' | 'repairs' | 'maintenance' | 'finished' | 'charter';

export interface GalleryItem {
  src: ImageMetadata;
  alt: Record<Locale, string>;
  category: GalleryCategory;
  size: 'wide' | 'tall' | 'square';
  focus?: string;
}

export interface BeforeAfterItem {
  before: ImageMetadata;
  after: ImageMetadata;
  alt: Record<Locale, string>;
  category: GalleryCategory;
}

export const GALLERY_CATEGORIES: Record<GalleryCategory, Record<Locale, string>> = {
  detailing: { en: 'Detailing & polishing', me: 'Detailing i poliranje' },
  repairs: { en: 'Fiberglass & gelcoat', me: 'Fiberglas i gelcoat' },
  maintenance: { en: 'Maintenance', me: 'Održavanje' },
  finished: { en: 'Finished yachts', me: 'Uređene jahte' },
  charter: { en: 'On the water', me: 'Na moru' },
};

const p = (key: keyof typeof PHOTOS) => ({ src: PHOTOS[key].src, alt: PHOTOS[key].alt, focus: PHOTOS[key].focus });

export const GALLERY: GalleryItem[] = [
  { ...p('cruising'), category: 'charter', size: 'wide' },
  { ...p('stern'), category: 'detailing', size: 'tall' },
  { ...p('flybridge'), category: 'finished', size: 'tall' },
  { ...p('bow'), category: 'detailing', size: 'tall' },
  { ...p('hull'), category: 'finished', size: 'square' },
  { ...p('convoy'), category: 'charter', size: 'tall' },
  { ...p('cockpit'), category: 'detailing', size: 'square' },
  { ...p('dayCruiser'), category: 'charter', size: 'tall' },
];

/** Before/after pairs — shown in a comparison slider when entries exist. */
export const BEFORE_AFTER: BeforeAfterItem[] = [
  // {
  //   before: hullBefore, after: hullAfter, category: 'detailing',
  //   alt: { en: 'Oxidised hull before and after machine polishing', me: 'Oksidisani trup prije i poslije mašinskog poliranja' },
  // },
];
