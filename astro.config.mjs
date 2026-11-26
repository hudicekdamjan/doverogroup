// @ts-check
import { defineConfig } from 'astro/config';

// Production URL. Override with SITE_URL for staging previews.
const SITE_URL = process.env.SITE_URL || 'https://doverogroup.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  // "/" has no content of its own: English is the default language.
  // Hosts that read public/_redirects (Netlify, Cloudflare Pages) answer with a real 301;
  // everywhere else Astro emits a meta-refresh page with a canonical to /en/.
  redirects: {
    '/': '/en/',
  },
  image: {
    // Responsive srcset + modern formats are produced at build time by sharp.
    breakpoints: [480, 640, 828, 1080, 1280, 1600, 1920, 2400],
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: { enabled: false },
});
