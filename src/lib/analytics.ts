/**
 * Analytics — single dispatcher for the events listed in CLAUDE.md.
 *
 * Pushes every event to both Google Analytics 4 (`window.dataLayer`) and
 * Meta Pixel (`window.fbq`). When either pipeline isn't loaded — e.g. in
 * `astro dev` where the production analytics scripts are gated off — the
 * call is a silent no-op so component code stays the same in every env.
 *
 * Use `track('event_name', params)` from any module. Use the
 * `data-event="…"` + optional `data-source-component="…"` /
 * `data-param-X="…"` attribute pattern on links/buttons to dispatch via
 * the delegated click handler installed by `setupAnalytics()`.
 *
 * Events covered (per CLAUDE.md § Conversion Tracking):
 *   whatsapp_click | inquiry_submit | sample_request |
 *   scroll_75      | engaged_time   | language_switch | outbound_click
 */

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent =
  | 'whatsapp_click'
  | 'inquiry_submit'
  | 'sample_request'
  | 'scroll_75'
  | 'engaged_time'
  | 'language_switch'
  | 'outbound_click';

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

/**
 * Fire an analytics event on every active sink. Strips `undefined` values
 * so the dataLayer entry stays compact.
 */
export function track(event: AnalyticsEvent, params: AnalyticsParams = {}): void {
  const cleaned: AnalyticsParams = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) cleaned[k] = v;
  }
  // GA4 dataLayer (gtag picks it up).
  window.dataLayer?.push({ event, ...cleaned });
  // Meta Pixel: 'trackCustom' is required for non-standard event names.
  // Cast to unknown first because TS's exactOptionalPropertyTypes can mask
  // the spread shape; fbq is variadic and accepts arbitrary objects.
  window.fbq?.('trackCustom', event, cleaned as unknown as Record<string, unknown>);
}

/**
 * Resolve the source page for an event. Pure function so it works in tests.
 */
function sourcePage(): string {
  return typeof location !== 'undefined' ? location.pathname : '/';
}

let installed = false;

/**
 * Install delegated click + scroll + engagement listeners. Idempotent —
 * BaseLayout calls this once per page load via a bundled `<script>`.
 */
export function setupAnalytics(): void {
  if (installed) return;
  installed = true;

  // -------------------------------------------------------------------
  // Delegated click — any element (or descendant) carrying `data-event`
  // dispatches that event with `source_component` and any
  // `data-param-X="value"` extras.
  // -------------------------------------------------------------------
  document.addEventListener('click', (ev) => {
    const target = (ev.target as Element | null)?.closest('[data-event]');
    if (!target) return;
    const event = target.getAttribute('data-event') as AnalyticsEvent | null;
    if (!event) return;
    const params: AnalyticsParams = { source_page: sourcePage() };
    const sc = target.getAttribute('data-source-component');
    if (sc) params.source_component = sc;
    for (const attr of Array.from(target.attributes)) {
      if (attr.name.startsWith('data-param-')) {
        const key = attr.name.slice('data-param-'.length).replace(/-/g, '_');
        params[key] = attr.value;
      }
    }
    track(event, params);
  });

  // -------------------------------------------------------------------
  // scroll_75 — fire once when the user passes 75% of the document.
  // -------------------------------------------------------------------
  let scrollFired = false;
  const onScroll = (): void => {
    if (scrollFired) return;
    const doc = document.documentElement;
    const total = doc.scrollHeight - doc.clientHeight;
    if (total <= 0) return;
    if (window.scrollY / total >= 0.75) {
      scrollFired = true;
      track('scroll_75', { source_page: sourcePage() });
      window.removeEventListener('scroll', onScroll);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // -------------------------------------------------------------------
  // engaged_time — fire once after 60 seconds of *active* page time.
  // The tab being hidden pauses accumulation, so the metric represents
  // attention rather than wall-clock time.
  // -------------------------------------------------------------------
  let activeMs = 0;
  let lastTick = performance.now();
  let engagedFired = false;
  const interval = window.setInterval(() => {
    if (engagedFired) return;
    if (document.visibilityState === 'visible') {
      const now = performance.now();
      activeMs += now - lastTick;
      lastTick = now;
      if (activeMs >= 60_000) {
        engagedFired = true;
        track('engaged_time', { source_page: sourcePage(), seconds: 60 });
        window.clearInterval(interval);
      }
    } else {
      lastTick = performance.now();
    }
  }, 1000);
}
