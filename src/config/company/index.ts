/**
 * Company — single source of truth for every company fact on this site.
 *
 * PT Coco Reina Global Charcoal Indonesia (brand: Mulia Charcoal).
 *
 * Every piece of factual data about the company (legal name, registration
 * numbers, address, contact details, production specs, certifications,
 * personnel, banking) lives in this folder. No other file in this repository
 * may hardcode any of these values — components, pages, JSON-LD schema
 * emitters, i18n files, MDX bodies, and tests must import from here.
 *
 * Update a value in the relevant facet file and every consumer automatically
 * inherits the new value on the next build. See CLAUDE.md § "Things to
 * Never Do" for the enforcing rule.
 *
 * Values marked `TODO_PLACEHOLDER` are pending confirmation from the
 * business owner. Do NOT ship the site to production with a TODO still
 * in place for a publicly rendered field. The pre-launch checklist at
 * the bottom of this file enumerates every placeholder.
 *
 * Facet layout:
 *   - identity.ts        legal name, brand, founding year, domain, siteUrl
 *   - brand.ts           visual identity tokens (colors)
 *   - legal.ts           Indonesian registration (NIB, NPWP) + governing law
 *   - address.ts         factory / mailing address, Google Maps link
 *   - contact.ts         email, phone, WhatsApp, hours, social, channels
 *   - commercial.ts      MOQ, port, lead time, payment, bank, form config
 *   - production.ts      capacity, ovens, sourcing, certifications
 *   - people.ts          roster of named individuals
 *   - visit.ts           holidays, factory shutdown, hotels, travel hubs
 *   - meta.ts            priority markets, analytics IDs
 *   - helpers.ts         derived label / URL builders, people accessors
 *   - types.ts           shared interfaces (Person, PhoneNumber, ...)
 */

import { identity } from './identity';
import { brandAssets } from './brand';
import { registration, legal } from './legal';
import { address, googleMapsUrl } from './address';
import {
  email,
  phone,
  phones,
  whatsapp,
  hours,
  social,
  channels,
} from './contact';
import { commercial, form, payment, bank } from './commercial';
import { production, certifications } from './production';
import { people } from './people';
import { holidays2026, lebaranShutdown, hotels, travelHubs } from './visit';
import { priorityMarkets, analytics } from './meta';

export const company = {
  ...identity,
  brandAssets,
  registration,
  address,
  googleMapsUrl,
  email,
  phone,
  phones,
  whatsapp,
  hours,
  social,
  commercial,
  production,
  people,
  certifications,
  legal,
  channels,
  holidays2026,
  lebaranShutdown,
  hotels,
  travelHubs,
  form,
  payment,
  bank,
  priorityMarkets,
  analytics,
} as const;

// =======================================================================
// Re-exports (helpers + types) — preserves the public import surface
// =======================================================================

export {
  // URL builders
  waLink,
  mailto,
  waLinkFor,
  // Label derivations
  yearsInBusiness,
  moqLabel,
  portOfLoadingLabel,
  leadTimeLabel,
  imdgLabel,
  businessHoursRange,
  // People accessors
  getByDisplayTag,
  getOneByDisplayTag,
  getOwner,
  getExecutives,
  getOperations,
  getContactTeam,
  getDirector,
  getSales,
  // Predicates
  hasFact,
} from './helpers';

export type { DisplayTag, PhoneNumber, WhatsappContact, Person } from './types';

// =======================================================================
// Derived public types
// =======================================================================

export type Company = typeof company;
export type SocialPlatform = keyof typeof company.social;
export type PriorityMarket = (typeof company.priorityMarkets)[number];
export type Hotel = (typeof company.hotels)[number];
export type TravelHub = (typeof company.travelHubs)[number];
export type Holiday = (typeof company.holidays2026)[number];
export type WhatsappPresetKey = keyof typeof company.whatsapp.presetMessages;

// =======================================================================
// Pre-launch replacement checklist
// =======================================================================
//
// Every TODO_PLACEHOLDER value across the facet files MUST be replaced
// before this site is deployed to production. Search the company/ folder
// for "TODO_PLACEHOLDER" to locate each one. The Contact page renders all
// of these publicly; shipping with placeholders is a trust- and fraud-risk.
//
//  [ ] address.street, address.district, address.postalCode
//  [ ] address.latitude / address.longitude (replace Semarang central
//      fallback with exact factory GPS)
//  [ ] people[1] (Sales Manager) and people[2] (Export Coordinator) — fill
//      in real names, roles, languages, photos, contact details, OR remove
//      the entries until real staff are confirmed
//  [ ] channels.wechat.id, channels.telegram, channels.messenger,
//      channels.botim, channels.max, channels.line, channels.viber,
//      channels.zoom.schedulingUrl — set to null/undefined any channel
//      that is not used so its card does not render
//  [ ] holidays2026 — re-verify against the official 2026 SKB 3 Menteri
//      decree once published
//  [ ] lebaranShutdown.from / .to / .orderCutoff
//  [ ] hotels — replace all TODO_PLACEHOLDER entries with real local
//      recommendations OR set hotels: [] to hide Block 10
//  [ ] travelHubs distance / drive-time figures
//  [ ] form.web3formsKey — paste the public Web3Forms access key
//  [ ] form.captcha.hcaptchaSiteKey — only required if provider switched
//      to 'hcaptcha'
//  [ ] bank.bankName / branch / bankAddress / accountNumber / swiftCode —
//      verify by phone/video call with the director, then update
//      bank.lastVerified to today's ISO date
//  [ ] production.factoryAreaSqm — confirm sqm of the briquetting facility
//  [ ] production.palmTreesCount / sourcingVillages / sourcingRegion
//  [ ] production.carbonizationPlant — set to { city, region } if there
//      is a separate upstream plant; leave null otherwise
//  [ ] commercial.shippingLines — confirm direct-booking carrier list
//  [ ] commercial.exportMarkets — confirm full destination list
//  [ ] certifications.patents — append { id, title } entries for any
//      patented technology
//  [ ] certifications.halal — populate when LPPOM-MUI certificate issues
//  [ ] social.youtube / twitter / googleBusiness — paste profile URLs
//  [ ] people[0] owner.email / phone / linkedin / bio — confirm with the
//      director; bio under 280 characters
//  [ ] people operations entries — replace TODO_PLACEHOLDER names and
//      contact details for the seven operations roles, OR delete rows for
//      positions that do not exist
//  [ ] payment.acceptsCrypto — set to true only if finance approves USDT
//      stablecoin payments
//
// =======================================================================
