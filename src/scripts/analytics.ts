/**
 * Conversion tracking. Events are pushed to window.dataLayer (GTM) or sent with gtag (GA4).
 * If neither is configured in src/config/site.ts, nothing is sent anywhere.
 *
 * Events: whatsapp_click · viber_click · phone_click · email_click · quote_request
 *         generate_lead (form completed) · inquiry_whatsapp_open · contact_panel_open · language_switch
 */
type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Params = {}): void {
  const payload = { page_path: location.pathname, page_language: document.documentElement.lang, ...params };
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, payload);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...payload });
  }
}

document.addEventListener(
  'click',
  (e) => {
    const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-track]');
    if (!el) return;
    track(el.dataset.track!, {
      placement: el.dataset.trackLabel,
      link_url: el instanceof HTMLAnchorElement ? el.href : undefined,
    });
  },
  { capture: true },
);

window.addEventListener('dovero:track', (e) => {
  const { event, ...params } = (e as CustomEvent<{ event: string } & Params>).detail;
  track(event, params);
});
