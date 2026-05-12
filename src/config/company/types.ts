/**
 * Shared types for the company config facets.
 */

/**
 * Tags that drive where a `Person` row surfaces on the site. A single
 * person can carry multiple tags (e.g. owner + executive + contact-team).
 */
export type DisplayTag =
  | 'owner'
  | 'executive'
  | 'operations'
  | 'contact-team'
  | 'whatsapp-director'
  | 'whatsapp-sales';

/** Phone (landline / mobile) — NOT WhatsApp. Use `WhatsappContact` for that. */
export interface PhoneNumber {
  display: string;
  e164: string;
}

/**
 * WhatsApp routing for a Person. `e164Digits` is the bare digit form
 * required by `wa.me/<digits>` URLs (no `+`, no separators).
 */
export interface WhatsappContact {
  e164Digits: string;
  display: string;
  preset?: string;
}

/**
 * A named individual the site references — staff, owner, consultant.
 * Single source of truth for every team / executive / operations entry.
 */
export interface Person {
  name: string;
  role: string;
  bio?: string | null;
  email?: string | null;
  phone?: PhoneNumber | null;
  whatsapp?: WhatsappContact | null;
  linkedin?: string | null;
  photo?: string | null;
  languages?: string[];
  displayIn: DisplayTag[];
}
