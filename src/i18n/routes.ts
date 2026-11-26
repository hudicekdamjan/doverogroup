/**
 * Localized URL map. Every page has a stable key and one slug per language.
 * Adding a page: add a key here, a view in src/views, and a case in src/pages/[...path].astro.
 */
export const LOCALES = ['en', 'me'] as const;
export type Locale = (typeof LOCALES)[number];

/** hreflang / html lang values. Montenegrin has no ISO 639-1 code; Google expects
 *  language-region, so Montenegrin pages use sr-ME (Latin script). */
export const LOCALE_META: Record<Locale, { hreflang: string; htmlLang: string; ogLocale: string; label: string; short: string }> = {
  en: { hreflang: 'en', htmlLang: 'en', ogLocale: 'en_US', label: 'English', short: 'EN' },
  me: { hreflang: 'sr-ME', htmlLang: 'sr-Latn-ME', ogLocale: 'sr_ME', label: 'Crnogorski', short: 'ME' },
};

export const ROUTES = {
  home: { en: '', me: '' },
  services: { en: 'services', me: 'usluge' },
  detailing: { en: 'services/yacht-detailing-polishing', me: 'usluge/detailing-i-poliranje-jahti' },
  repairs: { en: 'services/fiberglass-gelcoat-repairs', me: 'usluge/popravke-fiberglasa-i-gelcoata' },
  maintenance: { en: 'services/yacht-maintenance', me: 'usluge/odrzavanje-jahti' },
  storage: { en: 'services/winter-storage', me: 'usluge/zimski-smjestaj-jahti' },
  charter: { en: 'yacht-charter', me: 'najam-jahti' },
  about: { en: 'about-us', me: 'o-nama' },
  contact: { en: 'contact', me: 'kontakt' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof ROUTES;

/** Root-relative URL with trailing slash, e.g. /me/usluge/ */
export function url(key: RouteKey, lang: Locale, hash?: string): string {
  const slug = ROUTES[key][lang];
  return `/${lang}/${slug ? `${slug}/` : ''}${hash ? `#${hash}` : ''}`;
}

export function absoluteUrl(path: string, site: string): string {
  return new URL(path, site).toString();
}
