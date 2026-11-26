import type { ImageMetadata } from 'astro';
import type { Locale } from '@/i18n/routes';

import cruising from '@/assets/photos/motor-yacht-cruising-bay-of-kotor.jpg';
import convoy from '@/assets/photos/yachts-underway-boka-bay.jpg';
import stern from '@/assets/photos/yacht-stern-teak-deck-detail.jpg';
import bow from '@/assets/photos/yacht-bow-sun-pad-bay-view.jpg';
import flybridge from '@/assets/photos/flybridge-yacht-marina-arrival.jpg';
import flybridgeHarbour from '@/assets/photos/flybridge-yacht-harbour.jpg';
import hull from '@/assets/photos/yacht-hull-gelcoat-close-up.jpg';
import cockpit from '@/assets/photos/yacht-cockpit-upholstery.jpg';
import dayCruiser from '@/assets/photos/day-cruiser-adriatic.jpg';

export interface Photo {
  src: ImageMetadata;
  alt: Record<Locale, string>;
  /** CSS object-position used when the photo is cropped. */
  focus?: string;
}

/**
 * Client photography. To replace a photo, keep the key and point `src` at the new file.
 * Alt text describes what is actually in the picture (accessibility + image SEO).
 */
export const PHOTOS = {
  cruising: {
    src: cruising,
    focus: '62% 62%',
    alt: {
      en: 'White motor yacht cruising past a waterfront village in the Bay of Kotor, Montenegro',
      me: 'Bijela motorna jahta plovi pored primorskog mjesta u Boki Kotorskoj, Crna Gora',
    },
  },
  convoy: {
    src: convoy,
    focus: '40% 60%',
    alt: {
      en: 'Two motor yachts with guests on board under way in Boka Bay',
      me: 'Dvije motorne jahte sa gostima u plovidbi Bokom Kotorskom',
    },
  },
  stern: {
    src: stern,
    focus: '50% 72%',
    alt: {
      en: 'Stern of a moored day cruiser with teak swim platform, quilted cushions and twin outboard engines',
      me: 'Krma vezane jahte sa platformom od tikovine, prošivenim jastucima i dva vanbrodska motora',
    },
  },
  bow: {
    src: bow,
    focus: '50% 86%',
    alt: {
      en: 'Clean bow sun pad of a yacht facing the mountains of the Bay of Kotor',
      me: 'Uredna pramčana ležaljka jahte okrenuta ka planinama Boke Kotorske',
    },
  },
  flybridge: {
    src: flybridge,
    focus: '50% 52%',
    alt: {
      en: 'Flybridge motor yacht arriving at a marina in the Bay of Kotor',
      me: 'Motorna jahta sa flybridgeom uplovljava u marinu u Boki Kotorskoj',
    },
  },
  flybridgeHarbour: {
    src: flybridgeHarbour,
    focus: '50% 58%',
    alt: {
      en: 'Dark-hulled flybridge yacht passing the harbour front with mountains behind',
      me: 'Jahta tamnog trupa sa flybridgeom prolazi pored rive, u pozadini planine',
    },
  },
  hull: {
    src: hull,
    focus: '50% 88%',
    alt: {
      en: 'Close-up of glossy gelcoat hulls on yachts moored side by side',
      me: 'Detalj sjajnog gelcoata na trupovima jahti vezanih jedna do druge',
    },
  },
  cockpit: {
    src: cockpit,
    focus: '50% 85%',
    alt: {
      en: 'Yacht cockpit with cream upholstery and windscreen, seen from the deck',
      me: 'Kokpit jahte sa krem tapacirungom i vjetrobranom, pogled sa palube',
    },
  },
  dayCruiser: {
    src: dayCruiser,
    focus: '40% 62%',
    alt: {
      en: 'Day cruiser with a T-top under way on open water of the Adriatic',
      me: 'Dnevna jahta sa T-top krovom u plovidbi otvorenim Jadranom',
    },
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;

export interface Film {
  src: string;
  poster: string;
  caption: Record<Locale, string>;
}

/** Short muted loops (encoded 576×1024 H.264, ≈1 MB each), served from /public/media. */
export const FILMS = {
  arrival: {
    src: '/media/yacht-marina-arrival.mp4',
    poster: '/media/yacht-marina-arrival-poster.webp',
    caption: { en: 'Arrival · Boka Bay', me: 'Uplovljavanje · Boka' },
  },
  openWater: {
    src: '/media/day-cruiser-open-water.mp4',
    poster: '/media/day-cruiser-open-water-poster.webp',
    caption: { en: 'Open water · Adriatic', me: 'Otvoreno more · Jadran' },
  },
  marina: {
    src: '/media/marina-yachts-close.mp4',
    poster: '/media/marina-yachts-close-poster.webp',
    caption: { en: 'Alongside', me: 'Uz bok' },
  },
  harbour: {
    src: '/media/flybridge-yacht-harbour.mp4',
    poster: '/media/flybridge-yacht-harbour-poster.webp',
    caption: { en: 'Harbour front · Boka Bay', me: 'Riva · Boka Kotorska' },
  },
  horizon: {
    src: '/media/yacht-on-horizon.mp4',
    poster: '/media/yacht-on-horizon-poster.webp',
    caption: { en: 'On the horizon', me: 'Na horizontu' },
  },
} satisfies Record<string, Film>;
