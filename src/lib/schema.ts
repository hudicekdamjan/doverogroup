/**
 * JSON-LD builders. Only confirmed business facts are emitted:
 * no address, ratings, reviews, opening hours or coordinates are invented.
 */
import { SITE, CONTACT, CONTACT_EMAIL, SERVICE_AREAS, ADDRESS, SOCIAL } from '@/config/site';
import { url, LOCALE_META, type Locale, type RouteKey } from '@/i18n/routes';
import type { ServiceContent } from '@/content/services';

const abs = (path: string) => new URL(path, SITE.url).toString();
export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

function areaServed() {
  return [
    ...SERVICE_AREAS.map((a) => ({ '@type': 'City', name: a.name, containedInPlace: { '@type': 'Country', name: 'Montenegro' } })),
    { '@type': 'Place', name: 'Bay of Kotor' },
  ];
}

export function organizationSchema(lang: Locale, logoUrl: string) {
  const org: Record<string, unknown> = {
    '@context': 'https://schema.org',
    // ProfessionalService is a LocalBusiness subtype; only claimed as such once an address exists.
    '@type': ADDRESS ? ['Organization', 'ProfessionalService'] : 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: abs(url('home', lang)),
    logo: abs(logoUrl),
    image: abs('/og/dovero-group.jpg'),
    telephone: CONTACT.phoneE164,
    areaServed: areaServed(),
    knowsLanguage: ['en', 'sr-ME'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: CONTACT.phoneE164,
        contactType: 'customer service',
        areaServed: 'ME',
        availableLanguage: ['English', 'Montenegrin'],
        ...(CONTACT_EMAIL ? { email: CONTACT_EMAIL } : {}),
      },
    ],
  };
  if (CONTACT_EMAIL) org.email = CONTACT_EMAIL;
  if (SOCIAL.length) org.sameAs = SOCIAL.map((s) => s.url);
  if (ADDRESS) {
    org.address = {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    };
  }
  return org;
}

export function websiteSchema(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE.name,
    url: abs(url('home', lang)),
    inLanguage: LOCALE_META[lang].hreflang,
    publisher: { '@id': ORG_ID },
  };
}

export function serviceSchema(service: ServiceContent, lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${abs(url(service.route, lang))}#service`,
    name: service.name[lang],
    serviceType: service.serviceType,
    description: service.seo[lang].description,
    url: abs(url(service.route, lang)),
    provider: { '@id': ORG_ID },
    areaServed: areaServed(),
    inLanguage: LOCALE_META[lang].hreflang,
  };
}

export function breadcrumbSchema(items: { name: string; route: RouteKey }[], lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(url(item.route, lang)),
    })),
  };
}

export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}
