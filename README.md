# DOVERO GROUP — website

Bilingual (English / Montenegrin) website for DOVERO GROUP yacht services, Bay of Kotor, Montenegro.
Static site built with [Astro](https://astro.build): no client framework, ~2–8 KB of JavaScript per page, images converted to AVIF/WebP at build time.

```
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/
npm run check      # QA of dist/: links, H1s, meta, canonical, hreflang, JSON-LD, phone numbers
npm run preview    # serve dist/ locally
```

Requires Node 20+.

---

## Where things live

| What | File |
| --- | --- |
| **Phone, WhatsApp, Viber, email, service areas, analytics IDs** | `src/config/site.ts` |
| URLs for every page in both languages | `src/i18n/routes.ts` |
| Interface text (menu, buttons, form labels, validation, WhatsApp message labels) | `src/i18n/ui.ts` |
| Service page content + SEO (all 5 services, EN + ME) | `src/content/services.ts` |
| Photos & videos registry (with EN/ME alt text and focal points) | `src/content/media.ts` |
| Gallery items + before/after pairs | `src/content/gallery.ts` |
| Home / Services / About / Contact copy | `src/views/*View.astro` (copy object at the top of each file) |
| Design tokens (colours, type, spacing) | `src/styles/global.css` |
| Inquiry validation + WhatsApp message builder (no UI) | `src/lib/inquiry.ts` |
| Inquiry form UI controller | `src/scripts/inquiry-form.ts` |
| Structured data (JSON-LD) | `src/lib/schema.ts` |
| Sitemap / robots | `src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts` |

### URL structure

| Page | English | Montenegrin |
| --- | --- | --- |
| Home | `/en/` | `/me/` |
| Services | `/en/services/` | `/me/usluge/` |
| Detailing & Polishing | `/en/services/yacht-detailing-polishing/` | `/me/usluge/detailing-i-poliranje-jahti/` |
| Fiberglass & Gelcoat | `/en/services/fiberglass-gelcoat-repairs/` | `/me/usluge/popravke-fiberglasa-i-gelcoata/` |
| Maintenance | `/en/services/yacht-maintenance/` | `/me/usluge/odrzavanje-jahti/` |
| Winter Storage | `/en/services/winter-storage/` | `/me/usluge/zimski-smjestaj-jahti/` |
| About | `/en/about-us/` | `/me/o-nama/` |
| Contact | `/en/contact/` | `/me/kontakt/` |

`/` redirects to `/en/` (301 via `public/_redirects` on Netlify/Cloudflare; meta-refresh + canonical elsewhere).
Montenegrin pages use `hreflang="sr-ME"` / `lang="sr-Latn-ME"`: Montenegrin has no ISO 639-1 code, and Google's hreflang requires one (`me` is a country code and would be ignored). The visible URL prefix stays `/me/`.

---

## Contact system

All numbers and links come from `src/config/site.ts` (`+382 69 273 857`).

**Inquiry form flow (current):**
1. Visitor fills the form (name, phone, preferred contact method and message are required; service is required).
2. Fields are validated in the browser, with inline errors and a focusable error summary.
3. A formatted WhatsApp message is generated with all submitted information.
4. A "Your inquiry is ready" panel shows a preview and **Continue to WhatsApp** (`https://wa.me/38269273857?text=…`, URL-encoded).
5. The visitor sends the message in WhatsApp. The site never claims the inquiry was delivered.
6. Fallbacks in the same panel: **Copy message**, **Viber** and **Call**.

Service pages link to `/contact/?service=<key>#inquiry`, which pre-selects the service.

### Connecting the business email (later)

1. Create the mailbox (e.g. `info@doverogroup.com`).
2. In `src/config/site.ts` set `CONTACT_EMAIL = 'info@doverogroup.com'`. The address then appears in the footer, contact page and structured data.
3. To also **send the form by email**, deploy `serverless/inquiry.example.ts` as a function (instructions at the top of the file), add `RESEND_API_KEY`, `CONTACT_EMAIL` and `MAIL_FROM` as environment variables on the host, and set `INQUIRY_ENDPOINT = '/api/inquiry'`.
4. Rebuild and deploy. The form shows "sent" only after the function returns success. On any error it falls back to WhatsApp.

API keys stay on the server. Nothing secret goes into frontend code.

---

## Analytics

Set **one** of `ANALYTICS.GTM_ID` (recommended) or `ANALYTICS.GA4_ID` in `src/config/site.ts`. With both empty, no tracking script loads.
Tracked events: `whatsapp_click`, `viber_click`, `phone_click`, `email_click`, `quote_request`, `generate_lead`, `inquiry_whatsapp_open`, `inquiry_message_copied`, `form_validation_error`, `contact_panel_open`, `language_switch`. Each event includes `placement` (where the click happened).
Add a cookie-consent solution (GTM Consent Mode) before enabling analytics for EU visitors.

---

## Photos & videos

- Photos: `src/assets/photos/` → registered in `src/content/media.ts` (key, EN/ME alt text, `focus` = CSS object-position).
  To swap a photo, replace the file and keep the key; every page using that key updates.
- Gallery: add files to `src/assets/gallery/` and entries to `src/content/gallery.ts`. Before/after pairs go in `BEFORE_AFTER`; the comparison slider appears automatically.
- Videos: `public/media/*.mp4` (576 px wide, H.264, muted, ~1 MB) + `*-poster.webp`. Encode new clips with:
  ```
  ffmpeg -i input.mov -t 6 -an -vf "scale=576:-2,fps=30" -c:v libx264 -crf 30 -maxrate 1400k -bufsize 2800k -pix_fmt yuv420p -movflags +faststart public/media/name.mp4
  ```
- Logo: `src/assets/brand/logo.png` (transparent PNG supplied by the client). A vector (SVG/AI/PDF) original would let it render perfectly sharp at every size.

---

## Deployment — Render.com (static site)

The site is 100% static: `npm run build` produces plain HTML/CSS/images in `dist/`. No server or database is needed.

**With the Blueprint (recommended):** push this project to GitHub/GitLab → Render dashboard → **New → Blueprint** → pick the repository. `render.yaml` sets everything up:
build `npm ci && npm run build`, publish directory `dist`, Node 22, a 301 from `/` to `/en/`, security headers and long-term caching.

**Manually:** Render → **New → Static Site** → Build Command `npm ci && npm run build`, Publish Directory `dist`, environment variable `NODE_VERSION=22`. Then add the redirect `/` → `/en/` under *Redirects/Rewrites* and the headers from `render.yaml` under *Headers*.

**Custom domain:** Render → the site → *Settings → Custom Domains* → add `doverogroup.com` and `www.doverogroup.com`, then create the DNS records Render shows at your domain registrar. Render issues the HTTPS certificate automatically and redirects `www` to the root domain.
Unknown URLs are answered by `dist/404.html` (the bilingual 404 page).
Every push to `main` redeploys automatically.

### Other static hosts

Any static host works (Netlify, Cloudflare Pages, Vercel, or an Nginx/Apache server):

- Build command `npm run build`, output directory `dist`.
- `public/_redirects` and `public/_headers` are picked up by Netlify / Cloudflare Pages (301 from `/`, security headers, long-term caching of hashed assets).
- Enable HTTPS and redirect `www.doverogroup.com` → `doverogroup.com` (or the reverse, consistently with `SITE.url` and `site` in `astro.config.mjs`).
- For preview/staging deployments set `ALLOW_INDEXING=false` so they are not indexed.

After launch: verify the domain in Google Search Console (`GOOGLE_SITE_VERIFICATION` in config), submit `https://doverogroup.com/sitemap.xml`, and create or claim the Google Business Profile with the same name and phone number.
