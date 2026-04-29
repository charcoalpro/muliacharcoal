/**
 * Analytics — single entrypoint for tracking events across providers.
 *
 * Pushes to GA4 via `window.dataLayer` and to Meta Pixel via `window.fbq`,
 * gracefully no-ops if either provider is absent (e.g. dev mode, or while
 * the Pixel ID is still the TODO placeholder).
 *
 * Event vocabulary matches CLAUDE.md § Conversion Tracking. Add to
 * `AnalyticsEvent` when introducing a new event so call sites stay typed.
 */

export type AnalyticsEvent =
  | 'whatsapp_click'
  | 'inquiry_submit'
  | 'sample_request'
  | 'outbound_click'
  | 'language_switch'
  | 'scroll_75'
  | 'engaged_time';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;

  // GA4 — pushes to the dataLayer that Analytics.astro initialises.
  window.dataLayer?.push({ event, ...params });

  // Meta Pixel — `fbq` is only defined when the Pixel snippet ships
  // (i.e. company.analytics.metaPixelId is configured and we're in prod).
  window.fbq?.('trackCustom', event, params);
}
