/**
 * Derived label builders, URL builders, and people-roster accessors.
 *
 * Imports facets directly (not via the barrel) to avoid circular imports.
 * The label builders compute human-readable strings from structured fields
 * — never cache their output back into config, as the whole point is that
 * changing a number reflows every rendered label.
 */

import { identity } from './identity';
import { email, whatsapp } from './contact';
import { commercial } from './commercial';
import { certifications } from './production';
import { people } from './people';
import type { DisplayTag, Person } from './types';

// =======================================================================
// URL builders
// =======================================================================

/**
 * Build a WhatsApp click-to-chat URL (wa.me).
 *
 * @param text Optional message body to pre-fill in the chat. Defaults to
 *             `whatsapp.defaultMessage`. URI-encoded into the query string.
 */
export function waLink(text: string = whatsapp.defaultMessage): string {
  return `https://wa.me/${whatsapp.e164Digits}?text=${encodeURIComponent(text)}`;
}

/**
 * Build a `mailto:` URL for the primary company email.
 *
 * @param subject Optional subject line. URI-encoded into the query string.
 *                When omitted the bare `mailto:` form is returned.
 */
export function mailto(subject?: string): string {
  if (!subject) return `mailto:${email}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

/**
 * Build a WhatsApp click-to-chat URL using a preset message keyed by context.
 * Pass an explicit `e164Digits` to target a specific staff member's number;
 * otherwise the primary site number is used.
 */
export function waLinkFor(
  presetKey: keyof typeof whatsapp.presetMessages,
  e164Digits: string | undefined = whatsapp.e164Digits,
): string {
  const text = whatsapp.presetMessages[presetKey];
  const digits = e164Digits ?? whatsapp.e164Digits;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

// =======================================================================
// Label derivations
// =======================================================================

/**
 * Integer years the company has been in business.
 * @param now Override the "current" date for deterministic tests.
 */
export function yearsInBusiness(now: Date = new Date()): number {
  return now.getFullYear() - identity.foundingYear;
}

/** "18 tons (one 20ft container)" — MOQ as a single phrase. */
export function moqLabel(): string {
  const { tons, containers, containerType } = commercial.moq;
  const count = containers === 1 ? 'one' : String(containers);
  const plural = containers === 1 ? '' : 's';
  return `${tons} tons (${count} ${containerType} container${plural})`;
}

/** "FOB Semarang, Indonesia" — port of loading with Incoterm prefix. */
export function portOfLoadingLabel(): string {
  const { incoterm, name, country } = commercial.portOfLoading;
  return `${incoterm} ${name}, ${country}`;
}

/** "14–21 days" — lead-time range using an en-dash (U+2013). */
export function leadTimeLabel(): string {
  const { minDays, maxDays } = commercial.leadTime;
  return `${minDays}–${maxDays} days`;
}

/** "IMDG Code UN 1361 Class 4.2 (spontaneous combustion)" — phrased for buyers. */
export function imdgLabel(): string {
  const { unNumber, class: unClass, classDescription } = certifications.imdg;
  return `IMDG Code ${unNumber} Class ${unClass} (${classDescription})`;
}

/**
 * "08:00–16:00 (GMT+7)" — derived business-hours range used by Block 8
 * weekly-hours table. Returns the same time string for every working day.
 */
export function businessHoursRange(): string {
  return '08:00–16:00 (GMT+7)';
}

// =======================================================================
// People — helper accessors
// =======================================================================

/** Filter the people roster by `displayIn` tag. */
export function getByDisplayTag(tag: DisplayTag): Person[] {
  return people.filter((p) => p.displayIn.includes(tag));
}

/** First person tagged with `tag`, or `undefined` if none exists. */
export function getOneByDisplayTag(tag: DisplayTag): Person | undefined {
  return people.find((p) => p.displayIn.includes(tag));
}

/** Registered owner. Exactly one person should carry the `'owner'` tag. */
export function getOwner(): Person | undefined {
  return getOneByDisplayTag('owner');
}

/** Director / consultant entries — Footer + About Organization graph. */
export function getExecutives(): Person[] {
  return getByDisplayTag('executive');
}

/** Operations heads-of-department — /about Block 5. */
export function getOperations(): Person[] {
  return getByDisplayTag('operations');
}

/** Sales / export-desk members — /contact Block 4. */
export function getContactTeam(): Person[] {
  return getByDisplayTag('contact-team');
}

/** Person reachable via the director-intro WhatsApp preset. */
export function getDirector(): Person | undefined {
  return getOneByDisplayTag('whatsapp-director');
}

/** Person reachable via the sales-general WhatsApp preset. */
export function getSales(): Person | undefined {
  return getOneByDisplayTag('whatsapp-sales');
}

// =======================================================================
// Predicates
// =======================================================================

/**
 * Predicate: is this value a confirmed company fact (vs a placeholder)?
 *
 * Returns `false` for `null`, empty strings, the numeric sentinel `0`,
 * empty arrays, and any string that starts with `TODO_PLACEHOLDER`.
 * Returns `true` otherwise.
 */
export function hasFact(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') {
    if (value.length === 0) return false;
    if (value.startsWith('TODO_PLACEHOLDER')) return false;
    return true;
  }
  if (typeof value === 'number') return value !== 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value as object).length > 0;
  return Boolean(value);
}
