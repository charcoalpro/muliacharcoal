/**
 * Inquiry-form runtime — typed validation, submission, success-state rendering,
 * and analytics dispatch for the wholesale inquiry form on /contact.
 *
 * The component (`InquiryForm.astro`) embeds its config as a JSON script tag
 * (`#ih-config`) and calls `setupInquiryForm()` from a bundled `<script>`.
 * No DOM access happens at module-eval; everything lives behind `setupInquiryForm`.
 */

import { track } from '~/lib/analytics';

interface ErrorMessages {
  required: string;
  fullNameLength: string;
  companyLength: string;
  countryRequired: string;
  whatsappFormat: string;
  emailFormat: string;
  productsMin: string;
  volumeRequired: string;
  consentRequired: string;
  fileSize: string;
  fileType: string;
  submitFailed: string;
}

export interface InquiryFormConfig {
  endpoint: string;
  honeypotName: string;
  attachmentMaxBytes: number;
  attachmentAcceptedTypes: readonly string[];
  errors: ErrorMessages;
  success: {
    heading: string;
    bodyTemplate: string;
    waLabel: string;
    waHref: string;
  };
}

/**
 * Hydrate and wire up the inquiry form. Idempotent (no-op on a missing form).
 */
export function setupInquiryForm(): void {
  const configEl = document.getElementById('ih-config');
  const form = document.getElementById('inquiry-form') as HTMLFormElement | null;
  if (!configEl?.textContent || !form) return;

  const cfg: InquiryFormConfig = JSON.parse(configEl.textContent);
  const successPanel = document.getElementById('inquiry-success') as HTMLElement;
  const errorPanel = document.getElementById('inquiry-status-error') as HTMLElement;
  const submitBtn = document.getElementById('ih-submit') as HTMLButtonElement;
  const submitLabel = submitBtn.querySelector<HTMLElement>('[data-submit-label]');
  const submittingLabel = submitBtn.querySelector<HTMLElement>('[data-submitting-label]');

  const setError = (errId: string, msg: string): void => {
    const el = document.getElementById(errId);
    const inputId = errId.replace(/-err$/, '');
    const input = document.getElementById(inputId) as HTMLElement | null;
    if (!el) return;
    if (msg) {
      el.textContent = msg;
      el.classList.remove('hidden');
      input?.setAttribute('aria-invalid', 'true');
    } else {
      el.classList.add('hidden');
      el.textContent = '';
      input?.removeAttribute('aria-invalid');
    }
  };

  const trim = (name: string): string => {
    const f = form.elements.namedItem(name) as HTMLInputElement | null;
    return f?.value.trim() ?? '';
  };

  const validate = (): boolean => {
    const e = cfg.errors;
    let ok = true;

    const fullName = trim('full_name');
    if (!fullName) { setError('ih-fullname-err', e.required); ok = false; }
    else if (fullName.length < 2 || fullName.length > 80) { setError('ih-fullname-err', e.fullNameLength); ok = false; }
    else setError('ih-fullname-err', '');

    const companyName = trim('company_name');
    if (!companyName) { setError('ih-company-err', e.required); ok = false; }
    else if (companyName.length < 2 || companyName.length > 120) { setError('ih-company-err', e.companyLength); ok = false; }
    else setError('ih-company-err', '');

    if (!trim('country')) { setError('ih-country-err', e.countryRequired); ok = false; }
    else setError('ih-country-err', '');

    const wa = trim('whatsapp');
    if (!wa) { setError('ih-whatsapp-err', e.required); ok = false; }
    else if (!/^\+\d{6,20}$/.test(wa.replace(/[\s-]/g, ''))) { setError('ih-whatsapp-err', e.whatsappFormat); ok = false; }
    else setError('ih-whatsapp-err', '');

    const email = trim('email');
    if (!email) { setError('ih-email-err', e.required); ok = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('ih-email-err', e.emailFormat); ok = false; }
    else setError('ih-email-err', '');

    const products = form.querySelectorAll('input[name="products[]"]:checked');
    if (products.length === 0) { setError('ih-products-err', e.productsMin); ok = false; }
    else setError('ih-products-err', '');

    if (!trim('volume')) { setError('ih-volume-err', e.volumeRequired); ok = false; }
    else setError('ih-volume-err', '');

    const fileInput = form.elements.namedItem('attachment') as HTMLInputElement | null;
    const file = fileInput?.files?.[0];
    if (file) {
      if (file.size > cfg.attachmentMaxBytes) { setError('ih-attachment-err', e.fileSize); ok = false; }
      else if (!cfg.attachmentAcceptedTypes.includes(file.type)) { setError('ih-attachment-err', e.fileType); ok = false; }
      else setError('ih-attachment-err', '');
    } else {
      setError('ih-attachment-err', '');
    }

    const consent = form.elements.namedItem('consent') as HTMLInputElement | null;
    if (!consent?.checked) { setError('ih-consent-err', e.consentRequired); ok = false; }
    else setError('ih-consent-err', '');

    return ok;
  };

  // Inline blur validation for fast feedback.
  ['ih-fullname', 'ih-company', 'ih-country', 'ih-whatsapp', 'ih-email', 'ih-volume'].forEach((id) => {
    document.getElementById(id)?.addEventListener('blur', () => { validate(); });
  });

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    errorPanel.classList.add('hidden');

    if (!validate()) {
      const firstErr = form.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstErr?.focus();
      return;
    }

    // Honeypot — silently drop if filled.
    const trap = form.elements.namedItem(cfg.honeypotName) as HTMLInputElement | null;
    if (trap?.value) {
      successPanel.classList.remove('hidden');
      successPanel.innerHTML = '<p class="text-success">Thank you.</p>';
      form.classList.add('hidden');
      return;
    }

    submitBtn.disabled = true;
    submitLabel?.classList.add('hidden');
    submittingLabel?.classList.remove('hidden');

    try {
      const data = new FormData(form);
      const res = await fetch(cfg.endpoint, { method: 'POST', body: data });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (!res.ok || json.success === false) throw new Error(json.message || 'submit_failed');

      const ref = 'INQ-' + Date.now().toString(36).toUpperCase();
      const email = trim('email');
      const body = cfg.success.bodyTemplate
        .replace('{{ref}}', ref)
        .replace('{{email}}', email);

      successPanel.innerHTML =
        `<h3 class="text-xl font-semibold text-neutral-900">${cfg.success.heading}</h3>` +
        `<p class="mt-2 text-sm text-neutral-700">${body}</p>` +
        `<a href="${cfg.success.waHref}" target="_blank" rel="noopener noreferrer" ` +
        `class="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-success px-4 py-2 text-sm font-semibold text-white">` +
        `${cfg.success.waLabel}</a>`;
      successPanel.classList.remove('hidden');
      form.classList.add('hidden');
      successPanel.focus?.();

      const checked = Array.from(form.querySelectorAll<HTMLInputElement>('input[name="products[]"]:checked'));
      track('inquiry_submit', {
        product_category: checked.map((i) => i.value).join(','),
        estimated_quantity_tons: trim('volume'),
        destination_country: trim('country'),
      });
    } catch {
      errorPanel.textContent = cfg.errors.submitFailed;
      errorPanel.classList.remove('hidden');
      submitBtn.disabled = false;
      submitLabel?.classList.remove('hidden');
      submittingLabel?.classList.add('hidden');
    }
  });
}
