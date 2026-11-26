/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DOVERO GROUP — CENTRAL SITE CONFIGURATION
 *  Every phone number, messaging link, email, tracking ID and service area used
 *  anywhere on the website comes from this file. Change it here, rebuild, done.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const SITE = {
  name: 'DOVERO GROUP',
  legalName: 'DOVERO GROUP',
  /** Must match `site` in astro.config.mjs (used for canonical URLs, sitemap, hreflang). */
  url: 'https://doverogroup.com',
  defaultLocale: 'en' as const,
};

/**
 * Business phone in E.164 format, without spaces. All links are generated from it.
 */
const PHONE_E164 = '+38269273857';

export const CONTACT = {
  phoneE164: PHONE_E164,
  phoneDisplay: '+382 69 273 857',
  /** wa.me requires the number without "+" or spaces. */
  whatsappNumber: PHONE_E164.replace('+', ''),
  viberNumber: PHONE_E164,
};

/**
 * Professional business email — NOT AVAILABLE YET.
 * Leave empty until the real mailbox exists. While it is empty:
 *   • no email address is displayed anywhere on the website,
 *   • the inquiry form submits through WhatsApp only.
 * See README → "Connecting the business email".
 */
export const CONTACT_EMAIL = '';

/**
 * URL of the serverless function that emails inquiries (e.g. "/api/inquiry").
 * Leave empty until CONTACT_EMAIL and an email provider are configured.
 * When BOTH are set, the form sends by email and keeps WhatsApp as an alternative.
 */
export const INQUIRY_ENDPOINT = '';

export const LINKS = {
  tel: `tel:${PHONE_E164}`,
  whatsapp: `https://wa.me/${CONTACT.whatsappNumber}`,
  viber: `viber://chat?number=${encodeURIComponent(PHONE_E164)}`,
  email: CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}` : '',
};

/** Builds a WhatsApp click-to-chat URL with a pre-filled, URL-encoded message. */
export function whatsappUrl(message?: string): string {
  return message ? `${LINKS.whatsapp}?text=${encodeURIComponent(message)}` : LINKS.whatsapp;
}

/**
 * Locations where DOVERO GROUP confirmed it works.
 * Used in copy, the footer and structured data (`areaServed`). Only list confirmed places.
 */
export const SERVICE_AREAS = [
  { id: 'tivat', name: 'Tivat', detail: 'Porto Montenegro' },
  { id: 'kotor', name: 'Kotor', detail: '' },
  { id: 'herceg-novi', name: 'Herceg Novi', detail: '' },
  { id: 'budva', name: 'Budva', detail: '' },
] as const;

export const REGION = { en: 'Bay of Kotor, Montenegro', me: 'Boka Kotorska, Crna Gora' };

/**
 * Physical address — not supplied yet. While null, no address is shown and the
 * structured data does not claim a LocalBusiness location.
 */
export const ADDRESS: null | {
  street: string;
  city: string;
  postalCode: string;
  country: 'ME';
} = null;

/** Social profiles — add full URLs when available; empty entries are hidden. */
export const SOCIAL: { label: string; url: string }[] = [
  // { label: 'Instagram', url: 'https://www.instagram.com/…' },
];

/**
 * Analytics — leave empty to load no tracking scripts at all.
 * Use ONE of them: GTM (recommended, configure GA4 inside GTM) or GA4 directly.
 */
export const ANALYTICS = {
  GTM_ID: '', // e.g. 'GTM-XXXXXXX'
  GA4_ID: '', // e.g. 'G-XXXXXXXXXX'
};

/** Google Search Console HTML-tag verification token (content value only). */
export const GOOGLE_SITE_VERIFICATION = '';

/**
 * Set to false on staging deployments to add <meta name="robots" content="noindex">
 * and a disallow-all robots.txt. Production must stay true.
 */
export const ALLOW_INDEXING = import.meta.env.ALLOW_INDEXING !== 'false';
