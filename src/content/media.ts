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
import polishedHull from '@/assets/photos/polished-dark-blue-hull-marina.jpg';
import polishedReflection from '@/assets/photos/polished-hull-reflection-marina.jpg';
import fiberglassRepair from '@/assets/photos/fiberglass-repair-hull-prepared.jpg';
import keelDamage from '@/assets/photos/keel-gelcoat-damage-before-repair.jpg';
import teakSteps from '@/assets/photos/teak-steps-restored.jpg';
import teakHalf from '@/assets/photos/teak-deck-restoration-half-done.jpg';
import teakSanding from '@/assets/photos/teak-bow-deck-sanding.jpg';
import teakBow from '@/assets/photos/teak-bow-deck-restored.jpg';
import storageHall from '@/assets/photos/winter-storage-hall-yachts.jpg';
import storageHallEmpty from '@/assets/photos/winter-storage-hall-interior.jpg';
import storageStands from '@/assets/photos/winter-storage-hall-boats-on-stands.jpg';
import storageYard from '@/assets/photos/winter-storage-fenced-yard.jpg';
import gelcoatBefore from '@/assets/photos/gelcoat-damage-before-repair.jpg';
import gelcoatDuring from '@/assets/photos/gelcoat-repair-filling-masked.jpg';
import gelcoatAfter from '@/assets/photos/gelcoat-repair-after-lacquering.jpg';
import gelcoatEdge from '@/assets/photos/gelcoat-edge-cracks-before.jpg';

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
  polishedHull: {
    src: polishedHull,
    focus: '50% 55%',
    alt: {
      en: 'Freshly polished dark blue yacht hull with a mirror finish reflecting the marina',
      me: 'Svježe ispoliran tamnoplavi trup jahte sa sjajem u kojem se ogleda marina',
    },
  },
  polishedReflection: {
    src: polishedReflection,
    focus: '40% 45%',
    alt: {
      en: 'Glossy polished hull side of a yacht in a marina, reflecting moored boats and the sky',
      me: 'Sjajna ispolirana bočna strana jahte u marini, u kojoj se ogledaju vezani brodovi i nebo',
    },
  },
  fiberglassRepair: {
    src: fiberglassRepair,
    focus: '45% 40%',
    alt: {
      en: 'Fiberglass hull repair in progress: damaged gelcoat ground back to the laminate and masked off',
      me: 'Popravka fiberglasa u toku: oštećeni gelcoat izbrušen do laminata i oblijepljen trakom',
    },
  },
  keelDamage: {
    src: keelDamage,
    focus: '50% 35%',
    alt: {
      en: 'Damaged gelcoat and fiberglass on a yacht keel before repair, boat supported on blocks',
      me: 'Oštećen gelcoat i fiberglas na kobilici jahte prije popravke, brod oslonjen na podmetače',
    },
  },
  teakSteps: {
    src: teakSteps,
    focus: '50% 55%',
    alt: {
      en: 'Restored teak steps on a yacht swim platform, cleaned and evenly finished',
      me: 'Obnovljene stepenice od tikovine na krmenoj platformi jahte, očišćene i ujednačeno obrađene',
    },
  },
  teakHalf: {
    src: teakHalf,
    focus: '55% 60%',
    alt: {
      en: 'Teak deck restoration halfway done: weathered grey teak next to the restored golden section',
      me: 'Obnova palube od tikovine na pola posla: izbljedjela siva tikovina pored obnovljenog dijela',
    },
  },
  teakSanding: {
    src: teakSanding,
    focus: '50% 55%',
    alt: {
      en: 'Teak bow deck being sanded and restored, with dust extraction equipment on board',
      me: 'Brušenje i obnova pramčane palube od tikovine, uz opremu za usisavanje prašine na jahti',
    },
  },
  teakBow: {
    src: teakBow,
    focus: '50% 50%',
    alt: {
      en: 'Restored teak bow deck with crisp seams, glowing in the sun',
      me: 'Obnovljena pramčana paluba od tikovine sa urednim fugama, na suncu',
    },
  },
  storageHall: {
    src: storageHall,
    focus: '40% 55%',
    alt: {
      en: 'Yachts and jet skis stored on stands inside the DOVERO GROUP winter storage hall',
      me: 'Jahte i jet skiji smješteni na podmetačima u hali za zimski smještaj DOVERO GROUP',
    },
  },
  storageHallEmpty: {
    src: storageHallEmpty,
    focus: '50% 60%',
    alt: {
      en: 'Spacious covered winter storage hall with a boat on a trailer',
      me: 'Prostrana natkrivena hala za zimski smještaj sa čamcem na prikolici',
    },
  },
  storageStands: {
    src: storageStands,
    focus: '50% 55%',
    alt: {
      en: 'Boats on stands in the winter storage hall, prepared for the off-season',
      me: 'Brodovi na podmetačima u hali za zimski smještaj, pripremljeni za van sezone',
    },
  },
  storageYard: {
    src: storageYard,
    focus: '60% 70%',
    alt: {
      en: 'Fenced outdoor storage yard with boats stored on land for the winter',
      me: 'Ograđeni otvoreni plac sa brodovima smještenim na kopnu tokom zime',
    },
  },
  gelcoatBefore: {
    src: gelcoatBefore,
    focus: '45% 35%',
    alt: {
      en: 'Before repair: chipped gelcoat and impact damage along the gunwale of a grey hull',
      me: 'Prije popravke: okrhnut gelcoat i oštećenja od udarca duž ivice sivog trupa',
    },
  },
  gelcoatDuring: {
    src: gelcoatDuring,
    focus: '50% 45%',
    alt: {
      en: 'During repair: damaged areas filled and sanded, the hull masked off ready for lacquering',
      me: 'Tokom popravke: oštećenja kitovana i izbrušena, trup oblijepljen i spreman za lakiranje',
    },
  },
  gelcoatAfter: {
    src: gelcoatAfter,
    focus: '50% 60%',
    alt: {
      en: 'After repair and lacquering: the grey hull side refinished with an even, glossy surface',
      me: 'Poslije popravke i lakiranja: bok sivog trupa obnovljen, ujednačen i sjajan',
    },
  },
  gelcoatEdge: {
    src: gelcoatEdge,
    focus: '50% 45%',
    alt: {
      en: 'Cracked and chipped gelcoat along the edge of a white deck before repair',
      me: 'Ispucao i okrhnut gelcoat duž ivice bijele palube prije popravke',
    },
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;

export interface Film {
  src: string;
  poster: string;
  /** Accessible name for the video (not shown). */
  caption: Record<Locale, string>;
  /** Optional small tag shown on the video (e.g. "Result"). */
  tag?: Record<Locale, string>;
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
  polishing: {
    src: '/media/yacht-polishing-in-progress.mp4',
    poster: '/media/yacht-polishing-in-progress-poster.webp',
    caption: { en: 'Machine polishing a yacht hull on the hard stand', me: 'Mašinsko poliranje trupa jahte na suhom vezu' },
    tag: { en: 'Polishing in progress', me: 'Poliranje u toku' },
  },
  polishingResult: {
    src: '/media/yacht-polishing-result.mp4',
    poster: '/media/yacht-polishing-result-poster.webp',
    caption: { en: 'Polished yacht hull with a deep, glossy finish reflecting the sun', me: 'Ispoliran trup jahte sa dubokim sjajem u kojem se odbija sunce' },
    tag: { en: 'Result', me: 'Rezultat' },
  },
} satisfies Record<string, Film>;
