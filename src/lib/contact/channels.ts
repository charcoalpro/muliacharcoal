/**
 * Channel data for /contact Block 5.
 *
 * Returns a typed array combining the always-present base channels (WhatsApp
 * variants, phone, SMS, email, inquiry-form anchor) with whichever optional
 * channels in `company.channels` have a non-null/non-placeholder handle set.
 *
 * The Contact page renders one `<ChannelCard>` per entry — when a channel's
 * handle is absent, its card simply doesn't render. Pre-launch: set unused
 * channels in `company.channels` to `null` so they drop out automatically.
 */

import { company, mailto, waLinkFor } from '~/config/company';
import en from '~/i18n/en.json';

export interface Channel {
  channel: string;
  handle: string;
  href: string;
  iconText?: string;
  ctaLabel?: string;
}

export function buildContactChannels(): Channel[] {
  const t = en.contact;
  const phoneE164 = company.phone.e164;
  const phoneDisplay = company.phone.display;

  const base: Channel[] = [
    {
      channel: 'WhatsApp chat',
      handle: phoneDisplay,
      href: waLinkFor('salesGeneral'),
      iconText: '💬',
    },
    {
      channel: 'WhatsApp voice call',
      handle: phoneDisplay,
      href: waLinkFor('salesGeneral'),
      iconText: '📞',
    },
    {
      channel: 'WhatsApp video call',
      handle: phoneDisplay,
      href: waLinkFor('videoCallRequest'),
      iconText: '🎥',
    },
    {
      channel: 'Direct phone call',
      handle: phoneDisplay,
      href: `tel:${phoneE164}`,
      iconText: '☎',
    },
    {
      channel: 'SMS',
      handle: phoneDisplay,
      href: `sms:${phoneE164}`,
      iconText: '✉',
    },
    {
      channel: 'Email',
      handle: company.email,
      href: mailto('Wholesale inquiry'),
      iconText: '@',
    },
    {
      channel: 'Inquiry form',
      handle: t.channels.anchorButton,
      href: '#inquiry',
      iconText: '📝',
      ctaLabel: t.channels.anchorButton,
    },
  ];

  const c = company.channels;
  const optional: Channel[] = [];
  if (c.zoom?.schedulingUrl) {
    optional.push({
      channel: 'Zoom / Google Meet',
      handle: t.channels.videoMeetingLabel,
      href: c.zoom.schedulingUrl,
      iconText: '🎦',
    });
  }
  if (c.wechat?.id) {
    optional.push({
      channel: 'WeChat',
      handle: c.wechat.id,
      href: `weixin://dl/chat?${c.wechat.id}`,
      iconText: '微',
    });
  }
  if (c.telegram?.url) {
    optional.push({
      channel: 'Telegram',
      handle: c.telegram.handle,
      href: c.telegram.url,
      iconText: 'T',
    });
  }
  if (c.messenger?.url) {
    optional.push({
      channel: 'Messenger',
      handle: c.messenger.handle,
      href: c.messenger.url,
      iconText: 'M',
    });
  }
  if (c.botim) {
    optional.push({
      channel: 'Botim',
      handle: c.botim,
      href: `tel:${c.botim}`,
      iconText: 'B',
    });
  }
  if (c.max) {
    optional.push({
      channel: 'Max',
      handle: c.max,
      href: `https://max.ru/${c.max}`,
      iconText: 'X',
    });
  }
  if (c.line) {
    optional.push({
      channel: 'Line',
      handle: c.line,
      href: `https://line.me/ti/p/~${c.line}`,
      iconText: 'L',
    });
  }
  if (c.viber) {
    optional.push({
      channel: 'Viber',
      handle: c.viber,
      href: `viber://chat?number=${encodeURIComponent(c.viber)}`,
      iconText: 'V',
    });
  }

  return [...base, ...optional];
}
