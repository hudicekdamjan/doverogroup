/**
 * Inquiry form controller (UI only). Validation + message building live in src/lib/inquiry.ts.
 *
 * Default flow (no email configured):
 *   validate → build WhatsApp message → show "ready" panel → visitor continues to WhatsApp and sends it.
 * Email flow (CONTACT_EMAIL + INQUIRY_ENDPOINT configured):
 *   validate → POST to the serverless endpoint → confirmation only after a successful response;
 *   on failure, the WhatsApp panel is offered instead. Nothing is ever reported as "sent" without proof.
 */
import {
  normalize,
  validate,
  buildMessage,
  buildWhatsAppLink,
  todayISO,
  SERVICE_OPTIONS,
  type InquiryField,
  type MessageContext,
  type ServiceOption,
} from '@/lib/inquiry';

interface Config {
  lang: string;
  locale: string;
  labels: MessageContext['labels'];
  errors: Record<string, string>;
  serviceNames: MessageContext['serviceNames'];
  methodNames: MessageContext['methodNames'];
  copied: string;
  copy: string;
  emailEnabled: boolean;
  endpoint: string;
}

const emit = (event: string, params: Record<string, string> = {}) =>
  window.dispatchEvent(new CustomEvent('dovero:track', { detail: { event, ...params } }));

const FIELD_ORDER: InquiryField[] = ['name', 'phone', 'method', 'email', 'service', 'date', 'message'];

document.querySelectorAll<HTMLElement>('[data-inquiry]').forEach((root) => {
  const cfg = JSON.parse(root.dataset.config || '{}') as Config;
  const form = root.querySelector<HTMLFormElement>('[data-inquiry-form]')!;
  const summary = root.querySelector<HTMLElement>('[data-form-summary]')!;
  const summaryList = root.querySelector<HTMLElement>('[data-form-summary-list]')!;
  const ready = root.querySelector<HTMLElement>('[data-inquiry-ready]')!;
  const sent = root.querySelector<HTMLElement>('[data-inquiry-sent]')!;
  const preview = root.querySelector<HTMLElement>('[data-message-preview]')!;
  const continueBtn = root.querySelector<HTMLAnchorElement>('[data-wa-continue]')!;
  const copyBtn = root.querySelector<HTMLButtonElement>('[data-copy-message]')!;
  const copyLabel = root.querySelector<HTMLElement>('[data-copy-label]')!;
  const editBtn = root.querySelector<HTMLButtonElement>('[data-inquiry-edit]')!;
  const failedNote = root.querySelector<HTMLElement>('[data-email-failed]')!;
  const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  let message = '';
  let attempted = false;

  /* Date can't be in the past */
  const dateInput = form.querySelector<HTMLInputElement>('input[name="date"]');
  if (dateInput) dateInput.min = todayISO();

  /* Pre-select a service from ?service=… (links from service pages) */
  const params = new URLSearchParams(location.search);
  const pre = params.get('service');
  if (pre && SERVICE_OPTIONS.includes(pre as ServiceOption)) {
    const select = form.querySelector<HTMLSelectElement>('select[name="service"]');
    if (select) select.value = pre;
  }

  const read = () => normalize(Object.fromEntries(new FormData(form)) as Record<string, unknown>);

  const fieldEl = (name: string) => form.querySelector<HTMLElement>(`[data-field="${name}"]`);
  const controlFor = (name: string) =>
    form.querySelector<HTMLElement>(`[name="${name}"]:not([type="radio"])`) ?? form.querySelector<HTMLElement>(`[name="${name}"]`);

  function showErrors(errors: Partial<Record<InquiryField, true>>, focusSummary: boolean) {
    summaryList.innerHTML = '';
    FIELD_ORDER.forEach((name) => {
      const wrap = fieldEl(name);
      const err = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
      const control = controlFor(name);
      const has = Boolean(errors[name]);
      wrap?.classList.toggle('has-error', has);
      if (err) err.hidden = !has;
      if (control) control.setAttribute('aria-invalid', String(has));
      if (has && control) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${control.id || ''}`;
        a.textContent = cfg.errors[name];
        a.addEventListener('click', (e) => {
          e.preventDefault();
          control.focus();
        });
        li.appendChild(a);
        summaryList.appendChild(li);
      }
    });
    const any = Object.keys(errors).length > 0;
    summary.hidden = !any;
    if (any && focusSummary) summary.focus();
  }

  // Live re-validation after the first attempt, so errors clear as soon as they are fixed.
  form.addEventListener('input', () => {
    if (attempted) showErrors(validate(read()), false);
  });
  form.addEventListener('change', () => {
    if (attempted) showErrors(validate(read()), false);
  });

  function showPanel(panel: HTMLElement) {
    form.hidden = true;
    ready.hidden = panel !== ready;
    sent.hidden = panel !== sent;
    root.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    panel.focus({ preventScroll: true });
  }

  function prepareWhatsApp(data: ReturnType<typeof read>, emailFailed = false) {
    message = buildMessage(data, {
      labels: cfg.labels,
      serviceNames: cfg.serviceNames,
      methodNames: cfg.methodNames,
      locale: cfg.locale,
      pageUrl: location.origin + location.pathname,
    });
    preview.textContent = message;
    continueBtn.href = buildWhatsAppLink(message);
    failedNote.hidden = !emailFailed;
    showPanel(ready);
    emit('generate_lead', { method: 'whatsapp', service: data.service, preferred_contact: data.method });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    attempted = true;
    const fd = new FormData(form);
    if (String(fd.get('company_website') || '').trim()) return; // bot

    const data = read();
    const errors = validate(data);
    showErrors(errors, true);
    if (Object.keys(errors).length) {
      emit('form_validation_error', { fields: Object.keys(errors).join(',') });
      return;
    }

    if (cfg.emailEnabled && cfg.endpoint) {
      submitBtn.disabled = true;
      try {
        const res = await fetch(cfg.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, lang: cfg.lang, page: location.href }),
        });
        if (!res.ok) throw new Error(String(res.status));
        showPanel(sent);
        emit('generate_lead', { method: 'email', service: data.service, preferred_contact: data.method });
      } catch {
        prepareWhatsApp(data, true);
      } finally {
        submitBtn.disabled = false;
      }
      return;
    }

    prepareWhatsApp(data);
  });

  continueBtn.addEventListener('click', () => emit('inquiry_whatsapp_open', { service: read().service }));

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      // Fallback for older browsers / insecure contexts
      const ta = document.createElement('textarea');
      ta.value = message;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    copyLabel.textContent = cfg.copied;
    emit('inquiry_message_copied');
    setTimeout(() => (copyLabel.textContent = cfg.copy), 2500);
  });

  editBtn.addEventListener('click', () => {
    ready.hidden = true;
    form.hidden = false;
    form.querySelector<HTMLElement>('input, select, textarea')?.focus();
  });
});
