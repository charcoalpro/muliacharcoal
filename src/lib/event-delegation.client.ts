/**
 * Click delegation — wires every `[data-event]` element to `track()`.
 *
 * Loaded once per page from BaseLayout. Reads:
 *   - `data-event`              → AnalyticsEvent name
 *   - `data-source-component`   → optional UI surface label
 *   - href (when event is `outbound_click` and target is an <a>)
 *
 * Component-specific events that need richer payloads (e.g. `inquiry_submit`
 * with form fields) call `track()` directly from their own client module
 * rather than relying on this delegate.
 */

import { track, type AnalyticsEvent } from './analytics';

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;
  const trigger = target.closest<HTMLElement>('[data-event]');
  if (!trigger) return;
  const event = trigger.dataset.event as AnalyticsEvent | undefined;
  if (!event) return;

  const params: Record<string, unknown> = {
    source_page: window.location.pathname,
  };
  if (trigger.dataset.sourceComponent) {
    params.source_component = trigger.dataset.sourceComponent;
  }
  if (event === 'outbound_click' && trigger instanceof HTMLAnchorElement) {
    params.outbound_url = trigger.href;
  }

  track(event, params);
});
