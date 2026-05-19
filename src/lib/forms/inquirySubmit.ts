/**
 * Inquiry-form runtime — initialises the InquiryForm component on /contact.
 *
 * Behaviour-identical extraction of the inline IIFE that used to live in
 * `src/components/contact/InquiryForm.astro`. The form component now emits
 * a `<script type="application/json" id="inquiry-form-config">` block
 * carrying server-rendered strings and validation constants, plus a small
 * bundled `<script>` that imports `initInquiryForm()` and calls it.
 *
 * Lifecycle:
 *   1. Inline blur validation on every required field for fast feedback.
 *   2. Submit handler: per-field validate(), honeypot silent-success,
 *      `fetch()` POST to Web3Forms, inline DOM swap for the success panel,
 *      `dataLayer.push({ event: 'inquiry_submit', ... })` for GTM.
 *
 * Stable selectors (kept identical to the Astro component):
 *   - form#inquiry-form
 *   - error region #inquiry-status-error
 *   - success region #inquiry-success
 *   - submit button #ih-submit (with `[data-submit-label]` / `[data-submitting-label]`)
 *   - per-field error <p>: `#ih-{field}-err`
 *
 * Constants like `WHATSAPP_E164_REGEX`, `ATTACHMENT_MAX_BYTES`, and
 * `ATTACHMENT_MIME_TYPES` live in `inquiryValidation.ts`; the Astro
 * frontmatter copies them into the `config` blob below.
 */

export interface InquirySubmitConfig {
  /** Web3Forms POST endpoint. */
  endpoint: string;
  /** Name of the honeypot input — bots tend to fill plausibly-named fields. */
  honeypotName: string;
  /** `WHATSAPP_E164_REGEX.source` — recompiled in the browser. */
  whatsappPattern: string;
  /** `EMAIL_REGEX.source` — recompiled in the browser. */
  emailPattern: string;
  /** Attachment max bytes (5 MB by default). */
  attachmentMaxBytes: number;
  /** Allowed attachment MIME types. */
  attachmentMimeTypes: readonly string[];
  /** Localized strings used by the success-panel innerHTML swap. */
  successHeading: string;
  successBodyTemplate: string;
  successWaLabel: string;
  successWaHref: string;
  /** Localized error messages keyed by validation rule. */
  errors: Record<string, string>;
  /** Toast message dispatched on successful submit (alongside the in-place success panel). */
  toastSuccessMsg: string;
  /** Toast message dispatched when the submit fetch fails. */
  toastErrorMsg: string;
}

interface GtmWindow extends Window {
  dataLayer?: Array<Record<string, unknown>>;
}

export function initInquiryForm(form: HTMLFormElement, config: InquirySubmitConfig): void {
  const {
    endpoint,
    honeypotName,
    whatsappPattern,
    emailPattern,
    attachmentMaxBytes,
    attachmentMimeTypes,
    successHeading,
    successBodyTemplate,
    successWaLabel,
    successWaHref,
    errors: errs,
    toastSuccessMsg,
    toastErrorMsg,
  } = config;

  const successPanel = document.getElementById('inquiry-success');
  const errorPanel = document.getElementById('inquiry-status-error');
  const submitBtn = document.getElementById('ih-submit') as HTMLButtonElement | null;
  if (!successPanel || !errorPanel || !submitBtn) return;
  const submitLabel = submitBtn.querySelector<HTMLElement>('[data-submit-label]');
  const submittingLabel = submitBtn.querySelector<HTMLElement>('[data-submitting-label]');
  if (!submitLabel || !submittingLabel) return;

  // Form field accessors — HTMLFormElement supports JS property access by
  // name attribute, but TS doesn't model that. We narrow once per call site.
  const field = <T extends HTMLElement = HTMLInputElement>(name: string): T | null =>
    form.elements.namedItem(name) as T | null;

  const setError = (id: string, msg: string): void => {
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
  };

  const validate = (): boolean => {
    let ok = true;

    const fullName = field<HTMLInputElement>('full_name')?.value.trim() ?? '';
    if (!fullName) { setError('ih-fullname-err', errs.required); ok = false; }
    else if (fullName.length < 2 || fullName.length > 80) { setError('ih-fullname-err', errs.fullNameLength); ok = false; }
    else setError('ih-fullname-err', '');

    const companyName = field<HTMLInputElement>('company_name')?.value.trim() ?? '';
    if (!companyName) { setError('ih-company-err', errs.required); ok = false; }
    else if (companyName.length < 2 || companyName.length > 120) { setError('ih-company-err', errs.companyLength); ok = false; }
    else setError('ih-company-err', '');

    const country = field<HTMLSelectElement>('country')?.value ?? '';
    if (!country) { setError('ih-country-err', errs.countryRequired); ok = false; }
    else setError('ih-country-err', '');

    const wa = field<HTMLInputElement>('whatsapp')?.value.trim() ?? '';
    const waRe = new RegExp(whatsappPattern);
    if (!wa) { setError('ih-whatsapp-err', errs.required); ok = false; }
    else if (!waRe.test(wa.replace(/[\s-]/g, ''))) { setError('ih-whatsapp-err', errs.whatsappFormat); ok = false; }
    else setError('ih-whatsapp-err', '');

    const email = field<HTMLInputElement>('email')?.value.trim() ?? '';
    const emailRe = new RegExp(emailPattern);
    if (!email) { setError('ih-email-err', errs.required); ok = false; }
    else if (!emailRe.test(email)) { setError('ih-email-err', errs.emailFormat); ok = false; }
    else setError('ih-email-err', '');

    const products = form.querySelectorAll('input[name="products[]"]:checked');
    if (products.length === 0) { setError('ih-products-err', errs.productsMin); ok = false; }
    else setError('ih-products-err', '');

    const volume = field<HTMLSelectElement>('volume')?.value ?? '';
    if (!volume) { setError('ih-volume-err', errs.volumeRequired); ok = false; }
    else setError('ih-volume-err', '');

    const attachment = field<HTMLInputElement>('attachment');
    const file = attachment?.files?.[0];
    if (file) {
      if (file.size > attachmentMaxBytes) { setError('ih-attachment-err', errs.fileSize); ok = false; }
      else if (!attachmentMimeTypes.includes(file.type)) { setError('ih-attachment-err', errs.fileType); ok = false; }
      else setError('ih-attachment-err', '');
    } else {
      setError('ih-attachment-err', '');
    }

    const consent = field<HTMLInputElement>('consent');
    if (!consent?.checked) { setError('ih-consent-err', errs.consentRequired); ok = false; }
    else setError('ih-consent-err', '');

    return ok;
  };

  // Inline blur validation for fast feedback on the required fields.
  ['ih-fullname', 'ih-company', 'ih-country', 'ih-whatsapp', 'ih-email', 'ih-volume'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('blur', validate);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorPanel.classList.add('hidden');
    if (!validate()) {
      const firstErr = form.querySelector<HTMLElement>('[aria-invalid="true"]');
      if (firstErr) firstErr.focus();
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
    submitLabel.classList.add('hidden');
    submittingLabel.classList.remove('hidden');

    try {
      const res = await fetch(endpoint, { method: 'POST', body: data });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || (json && json.success === false)) {
        throw new Error(json?.message || 'submit_failed');
      }

      const ref = 'INQ-' + Date.now().toString(36).toUpperCase();
      const emailValue = field<HTMLInputElement>('email')?.value.trim() ?? '';
      const body = successBodyTemplate.replace('{{ref}}', ref).replace('{{email}}', emailValue);
      successPanel.innerHTML =
        '<h3 class="text-xl font-semibold text-neutral-900">' + successHeading + '</h3>' +
        '<p class="mt-2 text-sm text-neutral-700">' + body + '</p>' +
        '<a href="' + successWaHref + '" target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-success px-4 py-2 text-sm font-semibold text-white">' + successWaLabel + '</a>';
      successPanel.classList.remove('hidden');
      form.classList.add('hidden');
      successPanel.focus?.();
      document.dispatchEvent(new CustomEvent('toast', { detail: { message: toastSuccessMsg, type: 'success', durationMs: 5000 } }));
      const w = window as GtmWindow;
      if (w.dataLayer) {
        w.dataLayer.push({
          event: 'inquiry_submit',
          product_category: Array.from(form.querySelectorAll<HTMLInputElement>('input[name="products[]"]:checked')).map((i) => i.value).join(','),
          estimated_quantity_tons: field<HTMLSelectElement>('volume')?.value ?? '',
          destination_country: field<HTMLSelectElement>('country')?.value ?? '',
        });
      }
    } catch {
      errorPanel.textContent = errs.submitFailed;
      errorPanel.classList.remove('hidden');
      submitBtn.disabled = false;
      submitLabel.classList.remove('hidden');
      submittingLabel.classList.add('hidden');
      document.dispatchEvent(new CustomEvent('toast', { detail: { message: toastErrorMsg, type: 'error' } }));
    }
  });
}
