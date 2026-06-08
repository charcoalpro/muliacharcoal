/**
 * Company — single source of truth for every company fact on this site.
 *
 * PT Coco Reina Global Charcoal Indonesia (brand: Mulia Charcoal).
 *
 * The factual values now live in JSON under `/src/data/` so they can be
 * edited from the Sveltia CMS at `/admin/`. This module imports those
 * JSON files, applies type-widening casts for values that may be
 * assigned non-default shapes in the future (`null` slots, empty
 * arrays, finite string unions), and re-exports the assembled
 * `company` object plus all helper functions.
 *
 * Editing options:
 *   • For editors: open `/admin/` in a browser, log in with GitHub,
 *     edit a field, click save. Sveltia commits the JSON change and
 *     CI rebuilds the site.
 *   • For developers: edit the JSON files directly in `/src/data/` and
 *     commit. The TypeScript types in this module enforce shape.
 *
 * No other file in this repository may hardcode any of these values —
 * components, pages, JSON-LD schema emitters, i18n files, MDX bodies,
 * and tests must import from this module.
 *
 * Values marked `TODO_PLACEHOLDER` are pending confirmation from the
 * business owner. Do NOT ship the site to production with a TODO still
 * in place for a publicly rendered field.
 */

import rawCompanyData from '../data/company.json';
import rawPeopleData from '../data/people.json';
import rawHolidaysData from '../data/holidays.json';
import rawHotelsData from '../data/hotels.json';
import rawTravelHubsData from '../data/travel-hubs.json';

// =======================================================================
// People — types
// =======================================================================

/**
 * Tags that drive where a `Person` row surfaces on the site. A single
 * person can carry multiple tags (e.g. owner + executive + contact-team).
 * Renderers filter `company.people` by tag using the helper getters
 * (`getOwner`, `getExecutives`, `getOperations`, `getContactTeam`,
 * `getDirector`, `getSales`).
 */
export type DisplayTag =
  | 'owner'
  | 'executive'
  | 'operations'
  | 'contact-team'
  | 'whatsapp-director'
  | 'whatsapp-sales';

/** Phone (landline / mobile) — NOT WhatsApp. Use `whatsapp` for that. */
export interface PhoneNumber {
  display: string;
  e164: string;
}

/**
 * WhatsApp routing for a Person. `e164Digits` is the bare digit form
 * required by `wa.me/<digits>` URLs (no `+`, no separators). `preset`
 * is the default click-to-chat message body for this person.
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

// =======================================================================
// Type-widening casts on the JSON imports.
//
// JSON imports come back with the narrowest possible TypeScript types
// (literal strings, `null` not `string | null`, `never[]` not `string[]`).
// Widen the slots that consumers expect to assume looser shapes — these
// are the fields most likely to receive real values in the future.
// =======================================================================

const companyData = rawCompanyData as typeof rawCompanyData & {
  social: Record<keyof typeof rawCompanyData.social, string | null>;
  production: typeof rawCompanyData.production & {
    carbonizationPlant: { city: string; region: string } | null;
  };
  commercial: typeof rawCompanyData.commercial & {
    shippingLines: string[];
    exportMarkets: string[];
    // Container payload by box type. `bulkKg` (loose, no inner box) is
    // pending a weigh-in, so it widens to `number | null`.
    containerCapacity: {
      ft20: { fullKg: number; bulkKg: number | null };
      ft40: { fullKg: number; bulkKg: number | null };
    };
    // Single source for the volume-discount tier table. `maxTons: null`
    // marks the open-ended top bracket; `discountPercent: null` marks a
    // bracket whose rate is pending owner confirmation (rendered muted).
    volumeDiscountTiers: Array<{
      minTons: number;
      maxTons: number | null;
      discountPercent: number | null;
    }>;
    // Sub-container / trial entry point below the full-container MOQ.
    // `null` = full container only; samples are the entry point.
    trialMinimum: { tons: number; note: string } | null;
    // Customs commodity (HS) code for coconut shell charcoal — pending
    // confirmation, so widens to `string | null` (rendered muted until set).
    hsCode: string | null;
  };
  certifications: typeof rawCompanyData.certifications & {
    patents: Array<{ id: string; title: string }>;
    halal: { certified: boolean; body?: string } | null;
  };
  payment: typeof rawCompanyData.payment & {
    mode: 'public' | 'gated';
  };
  form: typeof rawCompanyData.form & {
    captcha: typeof rawCompanyData.form.captcha & {
      provider: 'web3forms-builtin' | 'hcaptcha' | 'none';
    };
  };
  bank: typeof rawCompanyData.bank & {
    iban: string | null;
  };
  packaging: typeof rawCompanyData.packaging & {
    // Inner-plastic film gauge, pending confirmation → widens to number | null.
    innerPlastic: typeof rawCompanyData.packaging.innerPlastic & {
      micron: number | null;
    };
  };
  phones: Array<{ label: string; display: string; e164: string }>;
};

// The four list-of-objects JSON files are object-wrapped (e.g.
// `{ "people": [...] }`) so Sveltia's file-collection mode can edit
// them. Dereference the wrapper key here to keep `company.people`
// etc. as plain arrays for consumers.
const people = rawPeopleData.people as Person[];
const holidays = rawHolidaysData.holidays as Array<{ date: string; day: string; name: string }>;
const hotels = rawHotelsData.hotels;
const travelHubs = rawTravelHubsData.travelHubs;

// =======================================================================
// Assembled company object
// =======================================================================

export const company = {
  ...companyData,
  people,
  hotels,
  travelHubs,
  holidays2026: holidays,
} as const;

// =======================================================================
// Helpers
// =======================================================================

/**
 * Build a WhatsApp click-to-chat URL (wa.me).
 *
 * @param text Optional message body to pre-fill in the chat. Defaults to
 *             `company.whatsapp.defaultMessage`. The value is URI-encoded
 *             into the `text` query parameter.
 * @returns    An `https://wa.me/<digits>?text=...` URL safe for `href`.
 *
 * @example
 *   <a href={waLink()}>Chat on WhatsApp</a>
 *   <a href={waLink('Quote request for 22x50mm hexagonal cubes')}>…</a>
 */
export function waLink(text: string = company.whatsapp.defaultMessage): string {
  return `https://wa.me/${company.whatsapp.e164Digits}?text=${encodeURIComponent(text)}`;
}

/**
 * Build a `mailto:` URL for the primary company email.
 *
 * @param subject Optional subject line. URL-encoded into the query string.
 *                When omitted the bare `mailto:` form is returned so the
 *                user's mail client does not prefill an empty subject.
 * @returns       `mailto:export@charcoal.pro` or
 *                `mailto:export@charcoal.pro?subject=…`.
 *
 * @example
 *   <a href={mailto()}>Email us</a>
 *   <a href={mailto('Quote: 20ft container to Jeddah')}>Request a quote</a>
 */
export function mailto(subject?: string): string {
  if (!subject) return `mailto:${company.email}`;
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}`;
}

/**
 * Build a `mailto:` URL for the careers inbox.
 *
 * Routes job applications to the careers-only address so HR routing
 * stays independent of the wholesale-sales inbox. Used by the /careers
 * Apply buttons.
 *
 * @param subject Optional subject line, URL-encoded. The /careers page
 *                passes `"Application: <role title>"`.
 *
 * @example
 *   <a href={careersMailto('Application: Head of Production')}>Apply</a>
 */
export function careersMailto(subject?: string): string {
  if (!subject) return `mailto:${company.careersEmail}`;
  return `mailto:${company.careersEmail}?subject=${encodeURIComponent(subject)}`;
}

/**
 * Integer years the company has been in business.
 *
 * Called at build time (the site is statically rendered by Astro), so the
 * value is frozen into the HTML on each deploy and refreshes automatically
 * on the next build.
 *
 * @param now Override the "current" date for deterministic tests.
 * @returns   Whole-number years since `company.foundingYear`.
 *
 * @example
 *   `${yearsInBusiness()} years exporting coconut charcoal`
 */
export function yearsInBusiness(now: Date = new Date()): number {
  return now.getFullYear() - company.foundingYear;
}

// -----------------------------------------------------------------------
// Label derivations
//
// Human-readable strings computed from structured fields above. Never
// cache these back into the config object — the whole point is that
// changing a number (e.g. `moq.tons`) automatically reflows every
// rendered label.
// -----------------------------------------------------------------------

/**
 * "18 tons (one 20ft container)" — MOQ as a single phrase.
 *
 * Singular containers read as "one" per export-trade convention;
 * plural containers read as a numeral.
 */
export function moqLabel(): string {
  const { tons, containers, containerType } = company.commercial.moq;
  const count = containers === 1 ? 'one' : String(containers);
  const plural = containers === 1 ? '' : 's';
  return `${tons} tons (${count} ${containerType} container${plural})`;
}

/**
 * "FOB Semarang, Indonesia" — port of loading with Incoterm prefix.
 */
export function portOfLoadingLabel(): string {
  const { incoterm, name, country } = company.commercial.portOfLoading;
  return `${incoterm} ${name}, ${country}`;
}

/**
 * "14–21 days" — lead-time range using an en-dash (U+2013), matching
 * Indonesian export-trade convention.
 */
export function leadTimeLabel(): string {
  const { minDays, maxDays } = company.commercial.leadTime;
  return `${minDays}–${maxDays} days`;
}

/**
 * "IMDG Code UN 1361 Class 4.2 (spontaneous combustion)" — maritime
 * dangerous-goods classification phrased for buyers.
 */
export function imdgLabel(): string {
  const { unNumber, class: unClass, classDescription } = company.certifications.imdg;
  return `IMDG Code ${unNumber} Class ${unClass} (${classDescription})`;
}

/**
 * Build a WhatsApp click-to-chat URL using a preset message keyed by
 * context. Pass an explicit `e164Digits` to target a specific staff
 * member's number; otherwise the primary site number is used.
 *
 * @example
 *   <a href={waLinkFor('heroCta')}>WhatsApp us</a>
 *   <a href={waLinkFor('directorIntro', getDirector()?.whatsapp?.e164Digits)}>…</a>
 */
export function waLinkFor(
  presetKey: keyof typeof company.whatsapp.presetMessages,
  e164Digits: string | undefined = company.whatsapp.e164Digits,
): string {
  const text = company.whatsapp.presetMessages[presetKey];
  const digits = e164Digits ?? company.whatsapp.e164Digits;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

// =======================================================================
// People — helper accessors
//
// Renderers should read people via these helpers, not by filtering
// `company.people` inline. A single source of "what does each tag mean"
// keeps drift impossible.
// =======================================================================

/** Filter the people roster by `displayIn` tag. */
export function getByDisplayTag(tag: DisplayTag): Person[] {
  return company.people.filter((p) => p.displayIn.includes(tag));
}

/** First person tagged with `tag`, or `undefined` if none exists. */
export function getOneByDisplayTag(tag: DisplayTag): Person | undefined {
  return company.people.find((p) => p.displayIn.includes(tag));
}

/** Registered owner. Exactly one person should carry the `'owner'` tag. */
export function getOwner(): Person | undefined {
  return getOneByDisplayTag('owner');
}

/** Director / consultant entries shown in the Footer + About Organization graph. */
export function getExecutives(): Person[] {
  return getByDisplayTag('executive');
}

/** Operations heads-of-department shown in /about Block 5. */
export function getOperations(): Person[] {
  return getByDisplayTag('operations');
}

/** Sales / export-desk members shown in /contact Block 4. */
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

/**
 * Predicate: is this value a confirmed company fact (vs a placeholder)?
 *
 * Pages should gate render of any badge, sentence, or table row whose
 * underlying field is still a TODO. Returns `false` for `null`, empty
 * strings, the numeric sentinel `0`, empty arrays, and any string that
 * starts with `TODO_PLACEHOLDER`. Returns `true` otherwise.
 *
 * @example
 *   {hasFact(company.production.palmTreesCount) && <Badge ... />}
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

/**
 * "08:00–16:00 (GMT+7)" — derived business-hours range used by Block 8
 * weekly-hours table. Returns the same time string for every working
 * day; days with `closed: true` should render "Closed" instead.
 */
export function businessHoursRange(): string {
  return '08:00–16:00 (GMT+7)';
}

// =======================================================================
// Types
// =======================================================================

export type Company = typeof company;
export type SocialPlatform = keyof typeof company.social;
export type PriorityMarket = (typeof company.priorityMarkets)[number];
export type Hotel = (typeof company.hotels)[number];
export type TravelHub = (typeof company.travelHubs)[number];
export type Holiday = (typeof company.holidays2026)[number];
export type WhatsappPresetKey = keyof typeof company.whatsapp.presetMessages;
// Person, DisplayTag, PhoneNumber, WhatsappContact are declared above.
