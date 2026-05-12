/**
 * Phone number format helpers.
 *
 * Canonical site convention:
 *   - `PhoneNumber.e164` is stored already prefixed with `+` (e.g. `+6282128768545`).
 *   - `WhatsappContact.e164Digits` is stored as bare digits (no `+`, no separators).
 *
 * `toE164` accepts either shape and returns the canonical `+`-prefixed form
 * required by Schema.org `ContactPoint.telephone` and `tel:` URIs.
 */
export function toE164(value: string): string {
  if (!value) return value;
  return value.startsWith('+') ? value : `+${value.replace(/[\s-]/g, '')}`;
}
