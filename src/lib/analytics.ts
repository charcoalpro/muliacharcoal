/**
 * Analytics dual-dispatch helper.
 *
 * Every conversion event on this site fires on BOTH Google Analytics 4
 * (`gtag`) and Meta Pixel (`fbq`). Use this helper from inline scripts
 * (form submit, video play, etc.) instead of calling either SDK directly,
 * so the event name stays in lockstep across the two backends.
 *
 * The sitewide delegated click listener in `Analytics.astro` covers all
 * `[data-event]` clicks automatically — only call `track()` from JS that
 * isn't a click (form submit, scroll-depth observer, video play).
 *
 * Both SDKs are loaded prod-only; in dev/preview this helper is a safe no-op.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export interface AnalyticsPayload {
  /** Logical section / surface the event came from (e.g. 'hero', 'contact'). */
  section?: string;
  /** Source component identifier (matches `data-source-component`). */
  source?: string;
  /** Optional extra params; passed through to both backends. */
  [key: string]: unknown;
}

/**
 * Fire `event` on GA4 and Meta Pixel with the same payload.
 * Comma-separated event names dispatch as multiple events (used when one
 * click is meaningful in two analytics dimensions, e.g. samples + whatsapp).
 */
export function track(event: string, payload: AnalyticsPayload = {}): void {
  if (typeof window === 'undefined') return;

  const events = event
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);

  for (const name of events) {
    try {
      window.gtag?.('event', name, payload);
    } catch {
      /* swallow: never break the page on analytics failure */
    }
    try {
      window.fbq?.('trackCustom', name, payload);
    } catch {
      /* swallow */
    }
  }
}
