/**
 * OPTIONAL — email delivery for the inquiry form (not active).
 *
 * Activate only once the professional mailbox exists:
 *   1. Set CONTACT_EMAIL and INQUIRY_ENDPOINT (e.g. '/api/inquiry') in src/config/site.ts.
 *   2. Deploy this file as a serverless function on your host, e.g.
 *        Netlify:          netlify/functions/inquiry.ts   (+ redirect /api/inquiry → /.netlify/functions/inquiry)
 *        Cloudflare Pages: functions/api/inquiry.ts       (export onRequestPost instead of default)
 *        Vercel:           api/inquiry.ts
 *   3. Add environment variables in the hosting dashboard (never in the code):
 *        RESEND_API_KEY   – API key from https://resend.com (or adapt to Postmark/SendGrid/SMTP)
 *        CONTACT_EMAIL    – the business inbox that receives inquiries
 *        MAIL_FROM        – a verified sender, e.g. "DOVERO GROUP Website <web@doverogroup.com>"
 *
 * The browser only shows "sent" after this function returns 200. On any error it falls back to WhatsApp.
 */
import { normalize, validate, buildMessage } from '../src/lib/inquiry';
import { UI } from '../src/i18n/ui';

const env = (k: string) => (globalThis as any).process?.env?.[k] ?? (globalThis as any)[k] ?? '';

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return new Response('Bad request', { status: 400 });
  }
  if (String(raw.company_website ?? '').trim()) return new Response('OK', { status: 200 }); // honeypot

  const data = normalize(raw);
  const errors = validate(data);
  if (Object.keys(errors).length) return Response.json({ errors }, { status: 422 });

  const lang = raw.lang === 'me' ? 'me' : 'en';
  const f = UI[lang].form;
  const text = buildMessage(data, {
    labels: f.wa,
    serviceNames: f.services,
    methodNames: f.methods,
    locale: lang === 'me' ? 'sr-Latn-ME' : 'en',
    pageUrl: String(raw.page ?? ''),
  }).replace(/\*/g, '');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env('RESEND_API_KEY')}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env('MAIL_FROM'),
      to: [env('CONTACT_EMAIL')],
      reply_to: data.email || undefined,
      subject: `Website inquiry — ${f.services[data.service as keyof typeof f.services] ?? ''} — ${data.name}`,
      text,
    }),
  });

  return res.ok ? Response.json({ ok: true }) : new Response('Email provider error', { status: 502 });
}
