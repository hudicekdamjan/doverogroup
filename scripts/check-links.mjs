#!/usr/bin/env node
/**
 * Post-build QA for dist/: run `npm run build && npm run check`.
 * Checks every HTML page for broken internal links/assets, placeholder links,
 * H1 count, unique titles & descriptions, canonical + hreflang, valid JSON-LD,
 * and that only the configured business phone number appears.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const PHONE = '38269273857';
const problems = [];
const warn = (page, msg) => problems.push(`${page}: ${msg}`);

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const pages = walk(DIST).filter((f) => f.endsWith('.html'));
const titles = new Map();
const descs = new Map();

const resolves = (url) => {
  const path = decodeURIComponent(url.split('#')[0].split('?')[0]);
  if (!path) return true;
  const target = join(DIST, path);
  return existsSync(target) && (statSync(target).isFile() || existsSync(join(target, 'index.html')));
};

for (const file of pages) {
  const page = '/' + relative(DIST, file);
  const html = readFileSync(file, 'utf8');
  const isRedirect = html.includes('http-equiv="refresh"');
  if (isRedirect) continue;

  // Links & assets
  for (const [, attr, value] of html.matchAll(/\s(href|src|srcset|poster|data-src|data-full)="([^"]*)"/g)) {
    const urls = attr === 'srcset' ? value.split(',').map((s) => s.trim().split(/\s+/)[0]) : [value];
    for (const u of urls) {
      if (attr === 'href' && (u === '#' || u === '')) warn(page, `placeholder link href="${u}"`);
      if (u.startsWith('/') && !u.startsWith('//') && !resolves(u)) warn(page, `broken internal ${attr}: ${u}`);
    }
  }

  // Phone numbers: only the configured business number may appear in tel:/wa.me/viber links
  for (const [, num] of html.matchAll(/(?:tel:\+?|wa\.me\/|number=%2B)(\d{8,15})/g)) {
    if (num !== PHONE) warn(page, `unexpected phone number in link: ${num}`);
  }

  if (page === '/404.html') continue;

  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) warn(page, `expected exactly one <h1>, found ${h1}`);

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!title) warn(page, 'missing <title>');
  if (!desc) warn(page, 'missing meta description');
  if (title) titles.set(title, [...(titles.get(title) || []), page]);
  if (desc) descs.set(desc, [...(descs.get(desc) || []), page]);
  if (title && title.length > 70) warn(page, `title is ${title.length} chars (consider ≤ 65)`);
  if (desc && (desc.length < 70 || desc.length > 165)) warn(page, `description is ${desc.length} chars`);

  if (!/<link rel="canonical" href="https:\/\/[^"]+"/.test(html)) warn(page, 'missing canonical');
  for (const hl of ['en', 'sr-ME', 'x-default']) {
    if (!html.includes(`hreflang="${hl}"`)) warn(page, `missing hreflang ${hl}`);
  }
  if (!html.includes('<meta name="robots" content="index')) warn(page, 'page is not indexable');

  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(json);
    } catch (e) {
      warn(page, `invalid JSON-LD: ${e.message}`);
    }
  }
  if (/@doverogroup\.me|info@/.test(html)) warn(page, 'placeholder email address found');
}

for (const [t, ps] of titles) if (ps.length > 1) problems.push(`duplicate title "${t}": ${ps.join(', ')}`);
for (const [d, ps] of descs) if (ps.length > 1) problems.push(`duplicate description on: ${ps.join(', ')}`);

// Sitemap & robots
const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const loc of locs) {
  const path = new URL(loc).pathname;
  if (!resolves(path)) problems.push(`sitemap URL has no page: ${loc}`);
}
const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8');
if (/Disallow: \/\s*$/m.test(robots)) problems.push('robots.txt blocks the whole site (staging build?)');

console.log(`Checked ${pages.length} HTML files, ${locs.length} sitemap URLs.`);
if (problems.length) {
  console.log(`\n${problems.length} issue(s):\n` + problems.map((p) => ' • ' + p).join('\n'));
  process.exit(1);
}
console.log('✓ No issues found.');
