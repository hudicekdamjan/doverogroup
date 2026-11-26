/**
 * Inquiry logic — validation and message formatting, independent of any UI.
 * Used by the browser form today and reusable by a serverless email function later.
 */
import { whatsappUrl } from '@/config/site';

export const CONTACT_METHODS = ['whatsapp', 'viber', 'phone'] as const;
export const SERVICE_OPTIONS = ['detailing', 'repairs', 'maintenance', 'storage', 'charter', 'other'] as const;

export type ContactMethod = (typeof CONTACT_METHODS)[number];
export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

export interface InquiryData {
  name: string;
  phone: string;
  method: ContactMethod | '';
  email: string;
  yachtName: string;
  yachtType: string;
  yachtLength: string;
  service: ServiceOption | '';
  date: string; // yyyy-mm-dd
  message: string;
}

export type InquiryField = keyof InquiryData;
export type InquiryErrors = Partial<Record<InquiryField, true>>;

export const LIMITS: Record<InquiryField, number> = {
  name: 100,
  phone: 30,
  method: 10,
  email: 120,
  yachtName: 80,
  yachtType: 80,
  yachtLength: 30,
  service: 20,
  date: 10,
  message: 2000,
};

const clean = (v: unknown, max: number) =>
  String(v ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);

export function normalize(raw: Record<string, unknown>): InquiryData {
  const d = {} as InquiryData;
  (Object.keys(LIMITS) as InquiryField[]).forEach((k) => {
    (d as unknown as Record<string, string>)[k] = clean(raw[k], LIMITS[k]);
  });
  d.name = d.name.replace(/\s+/g, ' ');
  if (!CONTACT_METHODS.includes(d.method as ContactMethod)) d.method = '';
  if (!SERVICE_OPTIONS.includes(d.service as ServiceOption)) d.service = '';
  return d;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARS_RE = /^\+?[\d\s().\-/]+$/;

/** `today` as yyyy-mm-dd in the visitor's local time. */
export function todayISO(now = new Date()): string {
  const off = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - off).toISOString().slice(0, 10);
}

export function validate(d: InquiryData, today = todayISO()): InquiryErrors {
  const e: InquiryErrors = {};
  if (d.name.length < 2) e.name = true;
  const digits = d.phone.replace(/\D/g, '');
  if (!PHONE_CHARS_RE.test(d.phone) || digits.length < 7 || digits.length > 15) e.phone = true;
  if (!d.method) e.method = true;
  if (d.email && !EMAIL_RE.test(d.email)) e.email = true;
  if (!d.service) e.service = true;
  if (d.date && (!/^\d{4}-\d{2}-\d{2}$/.test(d.date) || d.date < today)) e.date = true;
  if (d.message.length < 10) e.message = true;
  return e;
}

export interface MessageLabels {
  greeting: string;
  title: string;
  name: string;
  phone: string;
  method: string;
  email: string;
  yacht: string;
  yachtName: string;
  yachtType: string;
  yachtLength: string;
  service: string;
  date: string;
  message: string;
  page: string;
}

export interface MessageContext {
  labels: MessageLabels;
  serviceNames: Record<ServiceOption, string>;
  methodNames: Record<ContactMethod, string>;
  locale: string;
  pageUrl?: string;
}

function formatDate(iso: string, locale: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  try {
    return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(y, m - 1, d));
  } catch {
    return iso;
  }
}

/** Plain-text message, formatted for WhatsApp (*bold* is rendered by WhatsApp). */
export function buildMessage(d: InquiryData, ctx: MessageContext): string {
  const L = ctx.labels;
  const lines: string[] = [L.greeting, '', `*${L.title}*`, ''];
  lines.push(`*${L.service}:* ${d.service ? ctx.serviceNames[d.service] : '—'}`);
  if (d.date) lines.push(`*${L.date}:* ${formatDate(d.date, ctx.locale)}`);
  lines.push('');
  lines.push(`*${L.name}:* ${d.name}`);
  lines.push(`*${L.phone}:* ${d.phone}`);
  if (d.method) lines.push(`*${L.method}:* ${ctx.methodNames[d.method]}`);
  if (d.email) lines.push(`*${L.email}:* ${d.email}`);

  const yacht = [
    d.yachtName && `${L.yachtName}: ${d.yachtName}`,
    d.yachtType && `${L.yachtType}: ${d.yachtType}`,
    d.yachtLength && `${L.yachtLength}: ${d.yachtLength}`,
  ].filter(Boolean);
  if (yacht.length) {
    lines.push('', `*${L.yacht}*`);
    yacht.forEach((y) => lines.push(`• ${y}`));
  }

  lines.push('', `*${L.message}:*`, d.message);
  if (ctx.pageUrl) lines.push('', `— ${L.page}: ${ctx.pageUrl}`);
  return lines.join('\n');
}

export function buildWhatsAppLink(message: string): string {
  return whatsappUrl(message);
}
