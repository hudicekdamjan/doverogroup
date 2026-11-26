import type { APIRoute } from 'astro';
import { SITE, ALLOW_INDEXING } from '@/config/site';

/** Production allows everything. Staging builds (ALLOW_INDEXING=false) block all crawlers. */
export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL(SITE.url)).toString();
  const body = ALLOW_INDEXING
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', base)}\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
