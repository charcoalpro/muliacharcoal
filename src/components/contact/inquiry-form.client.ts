/**
 * InquiryForm client logic — Block 6 wholesale inquiry form.
 *
 * Hand-written vanilla JS, no framework. Reads its configuration from a
 * `data-form-config` JSON attribute on the form element so error copy and
 * endpoint URLs stay bound to `/src/i18n/en.json` + `/src/config/company.ts`
 * (see CLAUDE.md § company-fact rules).
 *
 * Loaded once per page via Astro's module-script hoisting; bundle target is
 * the inquiry form on `/contact`.
 */

import { track } from '~/lib/analytics';

type ErrorMessages = Record<string, string>;

interface FormConfig {
  errs: ErrorMessages;
  honeypotName: string;
  endpoint: string;
  successHeading: string;
  successBodyTemplate: string;
  successWaLabel: string;
  successWaHref: string;
}

(() => {
  const form = document.getElementById('inquiry-form') as HTMLFormElement | null;
  if (!form) return;

  const raw = form.dataset.formConfig;
  if (!raw) return;
  const { errs, honeypotName, endpoint, successHeading, successBodyTemplate, successWaLabel, successWaHref } =
    JSON.parse(raw) as FormConfig;

  const successPanel = document.getElementById('inquiry-success') as HTMLElement | null;
  const errorPanel = document.getElementById('inquiry-status-error') as HTMLElement | null;
  const submitBtn = document.getElementById('ih-submit') as HTMLButtonElement | null;
  if (!successPanel || !errorPanel || !submitBtn) return;
  const submitLabel = submitBtn.querySelector<HTMLElement>('[data-submit-label]');
  const submittingLabel = submitBtn.querySelector<HTMLElement>('[data-submitting-label]');
  if (!submitLabel || !submittingLabel) return;

  const setError = (id: string, msg: string) => {
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

  const fields = form.elements as HTMLFormControlsCollection & Record<string, HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | RadioNodeList>;

  const validate = (): boolean => {
    let ok = true;

    const fullName = (fields.full_name as HTMLInputElement).value.trim();
    if (!fullName) { setError('ih-fullname-err', errs.required); ok = false; }
    else if (fullName.length < 2 || fullName.length > 80) { setError('ih-fullname-err', errs.fullNameLength); ok = false; }
    else setError('ih-fullname-err', '');

    const companyName = (fields.company_name as HTMLInputElement).value.trim();
    if (!companyName) { setError('ih-company-err', errs.required); ok = false; }
    else if (companyName.length < 2 || companyName.length > 120) { setError('ih-company-err', errs.companyLength); ok = false; }
    else setError('ih-company-err', '');

    if (!(fields.country as HTMLSelectElement).value) { setError('ih-country-err', errs.countryRequired); ok = false; }
    else setError('ih-country-err', '');

    const wa = (fields.whatsapp as HTMLInputElement).value.trim();
    if (!wa) { setError('ih-whatsapp-err', errs.required); ok = false; }
    else if (!/^\+\d{6,20}$/.test(wa.replace(/[\s-]/g, ''))) { setError('ih-whatsapp-err', errs.whatsappFormat); ok = false; }
    else setError('ih-whatsapp-err', '');

    const email = (fields.email as HTMLInputElement).value.trim();
    if (!email) { setError('ih-email-err', errs.required); ok = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('ih-email-err', errs.emailFormat); ok = false; }
    else setError('ih-email-err', '');

    const products = form.querySelectorAll<HTMLInputElement>('input[name="products[]"]:checked');
    if (products.length === 0) { setError('ih-products-err', errs.productsMin); ok = false; }
    else setError('ih-products-err', '');

    if (!(fields.volume as HTMLSelectElement).value) { setError('ih-volume-err', errs.volumeRequired); ok = false; }
    else setError('ih-volume-err', '');

    const fileInput = fields.attachment as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { setError('ih-attachment-err', errs.fileSize); ok = false; }
      else if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) { setError('ih-attachment-err', errs.fileType); ok = false; }
      else setError('ih-attachment-err', '');
    } else {
      setError('ih-attachment-err', '');
    }

    if (!(fields.consent as HTMLInputElement).checked) { setError('ih-consent-err', errs.consentRequired); ok = false; }
    else setError('ih-consent-err', '');

    return ok;
  };

  // Inline blur validation for fast feedback.
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
      const json = await res.json().catch(() => ({} as { success?: boolean; message?: string }));
      if (!res.ok || (json && (json as { success?: boolean }).success === false)) {
        throw new Error((json as { message?: string }).message || 'submit_failed');
      }

      const ref = 'INQ-' + Date.now().toString(36).toUpperCase();
      const emailVal = (fields.email as HTMLInputElement).value.trim();
      const body = successBodyTemplate.replace('{{ref}}', ref).replace('{{email}}', emailVal);
      successPanel.innerHTML =
        '<h3 class="text-xl font-semibold text-neutral-900">' + successHeading + '</h3>' +
        '<p class="mt-2 text-sm text-neutral-700">' + body + '</p>' +
        '<a href="' + successWaHref + '" target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-success px-4 py-2 text-sm font-semibold text-white">' + successWaLabel + '</a>';
      successPanel.classList.remove('hidden');
      form.classList.add('hidden');
      (successPanel as HTMLElement & { focus?: () => void }).focus?.();

      track('inquiry_submit', {
        product_category: Array.from(form.querySelectorAll<HTMLInputElement>('input[name="products[]"]:checked'))
          .map((i) => i.value)
          .join(','),
        estimated_quantity_tons: (fields.volume as HTMLSelectElement).value,
        destination_country: (fields.country as HTMLSelectElement).value,
      });
    } catch {
      errorPanel.textContent = errs.submitFailed;
      errorPanel.classList.remove('hidden');
      submitBtn.disabled = false;
      submitLabel.classList.remove('hidden');
      submittingLabel.classList.add('hidden');
    }
  });
})();
