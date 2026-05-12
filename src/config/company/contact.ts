/**
 * Contact channels — phone, email, WhatsApp, hours, social, alternate channels.
 */

export const email = 'export@muliacharcoal.com';

/** Primary phone. `display` is the pretty form for humans; `e164` is what `tel:` expects. */
export const phone = {
  display: '+62 821 287 68 545',
  e164: '+6282128768545',
} as const;

/** Additional phone numbers (sales lines, logistics desk). Empty until confirmed. */
export const phones: ReadonlyArray<{ label: string; display: string; e164: string }> = [];

/**
 * WhatsApp click-to-chat. `e164Digits` is bare digits (no `+`, no separators).
 * The top-level number is the primary one used by the floating site-wide button.
 *
 * Per-person WhatsApp routing lives on `people[]` entries tagged with
 * `displayIn: ['whatsapp-director']` or `'whatsapp-sales'`.
 */
export const whatsapp = {
  e164Digits: '6282128768545', // TODO: confirm the production number before launch
  defaultMessage: 'Hello, I am interested in your coconut charcoal briquettes.',
  /** Pre-filled message bodies keyed by CTA context. Use `waLinkFor()` to build URLs. */
  presetMessages: {
    heroCta:
      'Hello PT Coco Reina — I would like to request a wholesale quote for coconut shisha charcoal briquettes. Could you share your price list and MOQ details?',
    salesGeneral:
      'Hello, I am a wholesale buyer interested in your coconut shisha charcoal briquettes. Please share specifications, pricing, and lead time.',
    directorIntro:
      'Hello Mr. Gosalim — I would like to discuss a wholesale order of coconut shisha charcoal directly with you.',
    videoCallRequest:
      'Hello, I would like to schedule a WhatsApp video call to see your factory and discuss a wholesale order. What times work for you in GMT+7?',
    piRequest:
      'Hello, I would like to request a Proforma Invoice for coconut shisha charcoal briquettes. Please share your bank details and payment terms after KYC.',
    sampleRequest:
      'Hello, I would like to request a paid sample of your coconut shisha charcoal briquettes shipped to my address. Please confirm sample fee and shipping cost.',
  },
} as const;

export const hours = {
  timezone: 'Asia/Jakarta', // GMT+7, no DST
  weekdays: 'Monday – Saturday 08:00 – 16:00 (GMT+7)',
  sunday: 'Closed',
} as const;

/**
 * Social profiles. Every slot is either a full `https://...` URL or `null`
 * if the profile does not yet exist. Keep keys even when null so consumers
 * can enumerate the list without worrying about missing keys.
 */
export const social = {
  facebook: null as string | null,
  instagram: null as string | null,
  linkedin: null as string | null,
  youtube: null as string | null,
  twitter: null as string | null,
  googleBusiness: null as string | null,
};

/**
 * Alternate contact channels — Contact page Block 5.
 *
 * Each card renders only when its handle is set. v1 seeds every channel
 * with TODO_PLACEHOLDER values; channels with no real handle should be
 * set to `null` before launch so their cards are hidden.
 */
export const channels = {
  wechat: {
    id: 'TODO_PLACEHOLDER_WECHAT_ID',
    qrImage: null as string | null,
  },
  telegram: {
    handle: '@TODO_PLACEHOLDER_TG',
    url: 'https://t.me/TODO_PLACEHOLDER_TG',
  },
  messenger: {
    handle: 'TODO_PLACEHOLDER_FB',
    url: 'https://m.me/TODO_PLACEHOLDER_FB',
  },
  botim: '+6280000000010', // TODO: confirm Botim number (E.164)
  max: 'TODO_PLACEHOLDER_MAX_HANDLE',
  line: 'TODO_PLACEHOLDER_LINE_ID',
  viber: '+6280000000011', // TODO: confirm Viber number (E.164)
  zoom: {
    schedulingUrl: 'TODO_PLACEHOLDER_ZOOM_SCHEDULING_URL',
  },
  /** Subject line for the "Schedule a video meeting" mailto fallback. */
  videoCallEmailSubject: 'Schedule a video meeting',
} as const;
