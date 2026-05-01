/**
 * Contact-page data builders.
 *
 * `src/pages/contact.astro` is a long, multi-block page; the pure
 * data-shaping it needs (trust badges, channel rows, hotel grouping,
 * lebaran body, payment warning) lives here so the .astro file stays
 * close to pure templating.
 *
 * Every helper takes the i18n contact section (`en.contact`) and the
 * relevant slice of `~/config/company` so the output is testable and
 * the function is purely derivational.
 */

import en from '~/i18n/en.json';
import { fill } from '~/lib/interpolate';
import {
  company,
  waLinkFor,
  mailto,
  yearsInBusiness,
  type Hotel,
} from '~/config/company';

type ContactT = typeof en.contact;

// -------------------------------------------------------------------------
// Block 2 — trust strip
// -------------------------------------------------------------------------

export interface TrustItem {
  iconText: string;
  label: string;
  value: string;
}

export function buildTrustItems(t: ContactT): TrustItem[] {
  const years = yearsInBusiness();
  return [
    {
      iconText: '★',
      label: t.trust.exportingSinceTemplate.replace('{{year}}', String(company.foundingYear)),
      value: fill(t.trust.yearsLabelTemplate, { years: String(years) }),
    },
    {
      iconText: '§',
      label: t.trust.legalLabel,
      value: company.legalName,
    },
    {
      iconText: 'N',
      label: t.trust.nibLabel,
      value: company.registration.nib,
    },
    {
      iconText: 'T',
      label: t.trust.npwpLabel,
      value: company.registration.taxId,
    },
    {
      iconText: '✓',
      label: t.trust.isoLabel,
      value: `Audited by ${company.certifications.iso9001.auditors.join(' & ')}`,
    },
    {
      iconText: '⚓',
      label: t.trust.imdgLabel,
      value: company.certifications.imdg.classDescription,
    },
    {
      iconText: '◉',
      label: t.trust.directorLabel,
      value: company.people.owner.name,
    },
  ];
}

// -------------------------------------------------------------------------
// Block 5 — contact channels
// -------------------------------------------------------------------------

export interface ContactChannel {
  channel: string;
  handle: string;
  href: string;
  iconText?: string;
  ctaLabel?: string;
}

export function buildContactChannels(t: ContactT): ContactChannel[] {
  const phoneE164 = company.phone.e164;
  const phoneDisplay = company.phone.display;

  const base: ContactChannel[] = [
    { channel: 'WhatsApp chat',       handle: phoneDisplay, href: waLinkFor('salesGeneral'),      iconText: '💬' },
    { channel: 'WhatsApp voice call', handle: phoneDisplay, href: waLinkFor('salesGeneral'),      iconText: '📞' },
    { channel: 'WhatsApp video call', handle: phoneDisplay, href: waLinkFor('videoCallRequest'), iconText: '🎥' },
    { channel: 'Direct phone call',   handle: phoneDisplay, href: `tel:${phoneE164}`,             iconText: '☎' },
    { channel: 'SMS',                 handle: phoneDisplay, href: `sms:${phoneE164}`,             iconText: '✉' },
    { channel: 'Email',               handle: company.email, href: mailto('Wholesale inquiry'),    iconText: '@' },
    {
      channel: 'Inquiry form',
      handle: t.channels.anchorButton,
      href: '#inquiry',
      iconText: '📝',
      ctaLabel: t.channels.anchorButton,
    },
  ];

  const c = company.channels;
  const optional: ContactChannel[] = [];
  if (c.zoom?.schedulingUrl) {
    optional.push({ channel: 'Zoom / Google Meet', handle: t.channels.videoMeetingLabel, href: c.zoom.schedulingUrl, iconText: '🎦' });
  }
  if (c.wechat?.id) {
    optional.push({ channel: 'WeChat', handle: c.wechat.id, href: `weixin://dl/chat?${c.wechat.id}`, iconText: '微' });
  }
  if (c.telegram?.url) {
    optional.push({ channel: 'Telegram', handle: c.telegram.handle, href: c.telegram.url, iconText: 'T' });
  }
  if (c.messenger?.url) {
    optional.push({ channel: 'Messenger', handle: c.messenger.handle, href: c.messenger.url, iconText: 'M' });
  }
  if (c.botim) {
    optional.push({ channel: 'Botim', handle: c.botim, href: `tel:${c.botim}`, iconText: 'B' });
  }
  if (c.max) {
    optional.push({ channel: 'Max', handle: c.max, href: `https://max.ru/${c.max}`, iconText: 'X' });
  }
  if (c.line) {
    optional.push({ channel: 'Line', handle: c.line, href: `https://line.me/ti/p/~${c.line}`, iconText: 'L' });
  }
  if (c.viber) {
    optional.push({ channel: 'Viber', handle: c.viber, href: `viber://chat?number=${encodeURIComponent(c.viber)}`, iconText: 'V' });
  }

  return [...base, ...optional];
}

// -------------------------------------------------------------------------
// Block 8 — Lebaran callout body
// -------------------------------------------------------------------------

export function buildLebaranBody(t: ContactT): string {
  const lebaran = company.lebaranShutdown;
  return fill(t.hours.lebaranBodyTemplate, {
    from: lebaran.from,
    to: lebaran.to,
    cutoff: lebaran.orderCutoff,
  });
}

// -------------------------------------------------------------------------
// Block 10 — hotels grouped by star tier
// -------------------------------------------------------------------------

export interface HotelTier {
  stars: number;
  hotels: Hotel[];
}

/**
 * Returns hotel tiers ordered 5★ → 4★ → 3★. Empty tiers are dropped so
 * the page can `.map()` without an extra filter.
 */
export function groupHotelsByTier(hotels: readonly Hotel[]): HotelTier[] {
  return [5, 4, 3]
    .map((stars) => ({ stars, hotels: hotels.filter((h) => h.stars === stars) }))
    .filter((tier) => tier.hotels.length > 0);
}

// -------------------------------------------------------------------------
// Block 11 — payment fraud warning body
// -------------------------------------------------------------------------

export function buildPaymentWarningBody(t: ContactT): string {
  return fill(t.payment.warningBodyTemplate, {
    director: company.people.owner.name,
  });
}
