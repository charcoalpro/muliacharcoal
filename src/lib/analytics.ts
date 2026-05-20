/**
 * Analytics — fans events out to GA4 (gtag) and Meta Pixel (fbq).
 *
 * Per CLAUDE.md § Conversion Tracking, every event must fire on BOTH vendors.
 * The vendor loaders are injected in BaseLayout.astro and are gated by env
 * vars (PUBLIC_GA_MEASUREMENT_ID, PUBLIC_META_PIXEL_ID). When the env vars
 * are unset (e.g. local dev), `window.gtag` / `window.fbq` are undefined and
 * trackEvent silently no-ops — that lets the rest of the code call the
 * helper without conditionals.
 *
 * Click delegation: components emit `data-event="event_name"` plus extra
 * `data-foo-bar="value"` attributes. `initAnalytics()` listens on the
 * document, finds the nearest [data-event] ancestor of a click, and fires
 * `trackEvent(name, gatheredParams)`. Outbound link clicks without an
 * explicit data-event still fire `outbound_click`.
 *
 * Page engagement: scroll_75 and engaged_time fire once per page load.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return;

  const payload: EventParams = {
    source_page: window.location.pathname,
    ...params,
  };

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, payload);
  }
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', name, payload);
  }
}

function camelize(s: string): string {
  return s.replace(/-(\w)/g, (_, c: string) => c.toUpperCase());
}

function gatherDataParams(el: HTMLElement): EventParams {
  const params: EventParams = {};
  for (const attr of Array.from(el.attributes)) {
    if (!attr.name.startsWith('data-')) continue;
    if (attr.name === 'data-event') continue;
    const key = camelize(attr.name.slice('data-'.length));
    params[key] = attr.value;
  }
  return params;
}

function isOutbound(href: string): boolean {
  if (!href) return false;
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  try {
    const url = new URL(href, window.location.origin);
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function onClick(e: MouseEvent): void {
  const path = e.composedPath();
  for (const node of path) {
    if (!(node instanceof HTMLElement)) continue;
    const eventName = node.getAttribute('data-event');
    if (eventName) {
      trackEvent(eventName, gatherDataParams(node));
      return;
    }
  }
  for (const node of path) {
    if (node instanceof HTMLAnchorElement && isOutbound(node.href)) {
      trackEvent('outbound_click', { url: node.href });
      return;
    }
  }
}

let scrollFired = false;
function onScroll(): void {
  if (scrollFired) return;
  const scrolled = window.scrollY + window.innerHeight;
  const total = document.documentElement.scrollHeight;
  if (total > 0 && scrolled / total >= 0.75) {
    scrollFired = true;
    trackEvent('scroll_75');
    window.removeEventListener('scroll', onScroll);
  }
}

function startEngagedTimer(): void {
  const THRESHOLD_MS = 60_000;
  let visibleMs = 0;
  let lastTick = Date.now();
  let fired = false;

  const interval = window.setInterval(() => {
    if (document.hidden || fired) {
      lastTick = Date.now();
      return;
    }
    const now = Date.now();
    visibleMs += now - lastTick;
    lastTick = now;
    if (visibleMs >= THRESHOLD_MS) {
      fired = true;
      trackEvent('engaged_time', { seconds: 60 });
      window.clearInterval(interval);
    }
  }, 5_000);

  document.addEventListener('visibilitychange', () => {
    lastTick = Date.now();
  });
}

export function initAnalytics(): void {
  if (typeof window === 'undefined') return;
  document.addEventListener('click', onClick, { capture: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  if (document.readyState === 'complete') {
    startEngagedTimer();
  } else {
    window.addEventListener('load', startEngagedTimer, { once: true });
  }
}
