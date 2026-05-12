/**
 * Inquiry-form client logic — extracted from the inline `<script>` block in
 * `InquiryForm.astro` for type safety, testability, and bundle caching.
 *
 * Configuration the script needs (regex sources, i18n error strings,
 * endpoint, file constraints, the success-panel HTML bits) crosses the
 * server/client boundary as a JSON blob on `data-inquiry-config` of the
 * form element. The script reads and parses it once at init time.
 *
 * Public entry point: `initInquiryForm()`. Pages call it once at module
 * top level; it bails harmlessly if the form is not on the page.
 */

import {
  ATTACHMENT_MAX_BYTES,
  ATTACHMENT_MIME_TYPES,
  EMAIL_REGEX,
  WHATSAPP_E164_REGEX,
} from './inquiryValidation';

/** Error-message dictionary supplied from i18n at build time. */
export interface InquiryErrorMessages {
  required: string;
  fullNameLength: string;
  companyLength: string;
  countryRequired: string;
  whatsappFormat: string;
  emailFormat: string;
  productsMin: string;
  volumeRequired: string;
  fileSize: string;
  fileType: string;
  consentRequired: string;
  submitFailed: string;
}

/** Everything the client script needs that is computed at build time. */
export interface InquiryFormConfig {
  errs: InquiryErrorMessages;
  honeypotName: string;
  endpoint: string;
  successHeading: string;
  successBodyTemplate: string;
  successWaLabel: string;
  successWaHref: string;
  newTabSr: string;
}

/**
 * Serialize an `InquiryFormConfig` for embedding on the form element via
 * `data-inquiry-config={serializeConfig(config)}`. Keeping the function
 * here (rather than ad-hoc inline JSON.stringify in the .astro file) is
 * what makes the contract reusable in tests.
 */
export function serializeInquiryConfig(config: InquiryFormConfig): string {
  return JSON.stringify(config);
}

/** Build the success-panel HTML once the Web3Forms POST succeeds. */
export function buildSuccessHtml(
  config: InquiryFormConfig,
  email: string,
  ref: string,
): string {
  const body = config.successBodyTemplate
    .replace('{{ref}}', ref)
    .replace('{{email}}', email);
  return (
    `<h3 class="text-xl font-semibold text-neutral-900">${config.successHeading}</h3>` +
    `<p class="mt-2 text-sm text-neutral-700">${body}</p>` +
    `<a href="${config.successWaHref}" target="_blank" rel="noopener noreferrer" ` +
    `class="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-success px-4 py-2 text-sm font-semibold text-white">` +
    `${config.successWaLabel}<span class="sr-only"> ${config.newTabSr}</span></a>`
  );
}

// =======================================================================
// DOM-bound runtime (browser only)
// =======================================================================

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function setError(id: string, msg: string): void {
  const el = document.getElementById(id);
  const input = document.getElementById(id.replace(/-err$/, ''));
  if (!el) return;
  if (msg) {
    el.textContent = msg;
    el.classList.remove('hidden');
    if (input) input.setAttribute('aria-invalid', 'true');
  } else {
    el.classList.add('hidden');
    el.textContent = '';
    if (input) input.removeAttribute('aria-invalid');
  }
}

/**
 * Run the per-field validation rules against the current form state. Returns
 * true when every field is valid. Mutates the DOM with per-field error
 * messages as a side effect (consistent with the original inline script).
 */
function validate(form: HTMLFormElement, errs: InquiryErrorMessages): boolean {
  let ok = true;

  const fullName = (form.elements.namedItem('full_name') as HTMLInputElement).value.trim();
  if (!fullName) { setError('ih-fullname-err', errs.required); ok = false; }
  else if (fullName.length < 2 || fullName.length > 80) { setError('ih-fullname-err', errs.fullNameLength); ok = false; }
  else setError('ih-fullname-err', '');

  const companyName = (form.elements.namedItem('company_name') as HTMLInputElement).value.trim();
  if (!companyName) { setError('ih-company-err', errs.required); ok = false; }
  else if (companyName.length < 2 || companyName.length > 120) { setError('ih-company-err', errs.companyLength); ok = false; }
  else setError('ih-company-err', '');

  if (!(form.elements.namedItem('country') as HTMLSelectElement).value) {
    setError('ih-country-err', errs.countryRequired);
    ok = false;
  } else {
    setError('ih-country-err', '');
  }

  const wa = (form.elements.namedItem('whatsapp') as HTMLInputElement).value.trim();
  if (!wa) { setError('ih-whatsapp-err', errs.required); ok = false; }
  else if (!WHATSAPP_E164_REGEX.test(wa.replace(/[\s-]/g, ''))) {
    setError('ih-whatsapp-err', errs.whatsappFormat); ok = false;
  } else setError('ih-whatsapp-err', '');

  const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
  if (!email) { setError('ih-email-err', errs.required); ok = false; }
  else if (!EMAIL_REGEX.test(email)) { setError('ih-email-err', errs.emailFormat); ok = false; }
  else setError('ih-email-err', '');

  const products = form.querySelectorAll<HTMLInputElement>('input[name="products[]"]:checked');
  if (products.length === 0) { setError('ih-products-err', errs.productsMin); ok = false; }
  else setError('ih-products-err', '');

  if (!(form.elements.namedItem('volume') as HTMLSelectElement).value) {
    setError('ih-volume-err', errs.volumeRequired); ok = false;
  } else setError('ih-volume-err', '');

  const file = (form.elements.namedItem('attachment') as HTMLInputElement).files?.[0];
  if (file) {
    if (file.size > ATTACHMENT_MAX_BYTES) { setError('ih-attachment-err', errs.fileSize); ok = false; }
    else if (!(ATTACHMENT_MIME_TYPES as readonly string[]).includes(file.type)) {
      setError('ih-attachment-err', errs.fileType); ok = false;
    } else setError('ih-attachment-err', '');
  } else {
    setError('ih-attachment-err', '');
  }

  if (!(form.elements.namedItem('consent') as HTMLInputElement).checked) {
    setError('ih-consent-err', errs.consentRequired); ok = false;
  } else setError('ih-consent-err', '');

  return ok;
}

/**
 * Wire up validation, honeypot, Web3Forms submission, and analytics on the
 * `#inquiry-form` element if present. Safe to call on any page — bails
 * silently when the form is not in the DOM.
 */
export function initInquiryForm(): void {
  const form = document.getElementById('inquiry-form') as HTMLFormElement | null;
  if (!form) return;

  const rawConfig = form.dataset.inquiryConfig;
  if (!rawConfig) return;
  const config: InquiryFormConfig = JSON.parse(rawConfig);
  const { errs, honeypotName, endpoint } = config;

  const successPanel = document.getElementById('inquiry-success');
  const errorPanel = document.getElementById('inquiry-status-error');
  const submitBtn = document.getElementById('ih-submit') as HTMLButtonElement | null;
  if (!successPanel || !errorPanel || !submitBtn) return;
  const submitLabel = submitBtn.querySelector('[data-submit-label]');
  const submittingLabel = submitBtn.querySelector('[data-submitting-label]');

  // Inline blur validation for fast feedback.
  for (const id of ['ih-fullname', 'ih-company', 'ih-country', 'ih-whatsapp', 'ih-email', 'ih-volume']) {
    document.getElementById(id)?.addEventListener('blur', () => validate(form, errs));
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorPanel.classList.add('hidden');
    if (!validate(form, errs)) {
      const firstErr = form.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstErr?.focus();
      return;
    }

    // Honeypot — silently drop if filled.
    const trap = form.elements.namedItem(honeypotName) as HTMLInputElement | null;
    if (trap && trap.value) {
      successPanel.classList.remove('hidden');
      successPanel.innerHTML = '<p class="text-success">Thank you.</p>';
      form.classList.add('hidden');
      return;
    }

    const data = new FormData(form);
    submitBtn.disabled = true;
    submitLabel?.classList.add('hidden');
    submittingLabel?.classList.remove('hidden');

    try {
      const res = await fetch(endpoint, { method: 'POST', body: data });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || (json && json.success === false)) {
        throw new Error(json?.message || 'submit_failed');
      }

      const ref = 'INQ-' + Date.now().toString(36).toUpperCase();
      const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
      successPanel.innerHTML = buildSuccessHtml(config, email, ref);
      successPanel.classList.remove('hidden');
      form.classList.add('hidden');
      (successPanel as HTMLElement & { focus?: () => void }).focus?.();

      if (window.dataLayer) {
        const products = Array.from(
          form.querySelectorAll<HTMLInputElement>('input[name="products[]"]:checked'),
        ).map((i) => i.value).join(',');
        window.dataLayer.push({
          event: 'inquiry_submit',
          product_category: products,
          estimated_quantity_tons: (form.elements.namedItem('volume') as HTMLSelectElement).value,
          destination_country: (form.elements.namedItem('country') as HTMLSelectElement).value,
        });
      }
    } catch {
      errorPanel.textContent = errs.submitFailed;
      errorPanel.classList.remove('hidden');
      submitBtn.disabled = false;
      submitLabel?.classList.remove('hidden');
      submittingLabel?.classList.add('hidden');
    }
  });
}
