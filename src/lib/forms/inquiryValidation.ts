/**
 * Inquiry-form validation constants.
 *
 * Used by `src/components/contact/InquiryForm.astro`. The Astro frontmatter
 * imports the regex sources and the file-attachment limits, then serializes
 * them via `define:vars` into the inline `<script>`. Keeping the values
 * here lets future tests share them.
 *
 * The validation logic itself stays inline in the form component as a
 * per-field if-else chain. A data-driven rules loop was previously
 * exported from this module but had no consumer; it was removed to keep
 * the public surface honest.
 */

/** Maximum allowed size for the optional `attachment` field, in bytes. */
export const ATTACHMENT_MAX_BYTES = 5 * 1024 * 1024;

/** Allowed MIME types for the optional `attachment` field. */
export const ATTACHMENT_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
] as const;

/** International phone-number format expected by WhatsApp. */
export const WHATSAPP_E164_REGEX = /^\+\d{6,20}$/;

/** Permissive email-shape check matching the inline script's contract. */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
