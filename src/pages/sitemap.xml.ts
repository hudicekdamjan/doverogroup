/**
 * XML sitemap with hreflang alternates for every localized page.
 * https://developers.google.com/search/docs/specialty/international/localized-versions#sitemap
 */
import type { APIRoute } from 'astro';
import { LOCALES, LOCALE_META, ROUTES, url, type RouteKey } from '@/i18n/routes';
import { SITE } from '@/config/site';

const PRIORITY: Partial<Record<RouteKey, string>> = { home: '1.0', services: '0.9', contact: '0.8' };

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL(SITE.url)).toString();
  const abs = (p: string) => new URL(p, base).toString();
  const lastmod = new Date().toISOString().slice(0, 10);
  const keys = Object.keys(ROUTES) as RouteKey[];

  const entries = keys.flatMap((key) =>
    LOCALES.map((lang) => {
      const links = LOCALES.map((l) => `    <xhtml:link rel="alternate" hreflang="${LOCALE_META[l].hreflang}" href="${abs(url(key, l))}"/>`).join('\n');
      return `  <url>
    <loc>${abs(url(key, lang))}</loc>
${links}
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(url(key, SITE.defaultLocale))}"/>
    <lastmod>${lastmod}</lastmod>
    <priority>${PRIORITY[key] ?? '0.8'}</priority>
  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
