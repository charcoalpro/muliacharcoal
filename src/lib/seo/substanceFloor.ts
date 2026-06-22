/**
 * Substance floor — thin-content guard for link-dense pages.
 *
 * A step-list-with-links (ordering process, import checklist) is the easiest
 * page to make accidentally thin / doorway-ish. This guard measures the page's
 * own assembled body prose (the same string a page already builds for
 * `readingTime()`) and, when it falls below the word threshold, returns a
 * `noindex, follow` directive AND logs a build-time warning so the regression
 * is visible in CI output. `follow` (not `nofollow`) is deliberate: a thin page
 * should still pass its internal-link equity down to the cocoon it routes to.
 *
 * The page passes `result.robots` straight to `<BaseLayout robots={...}>`.
 * On a healthy page the result is `'index'` and nothing is logged — the guard
 * is a safety net, not a gate that fires in normal operation.
 *
 * Reusable: any future link-dense page (e.g. the logistics import children)
 * can adopt the same guard with one call.
 */

export interface SubstanceInput {
  /** Root-relative page path, for the warning message (e.g. `/guide/how-to-order-shisha-charcoal`). */
  path: string;
  /** The page's assembled, token-filled body prose (same input as `readingTime`). */
  prose: string;
  /** Minimum word count to count as substantive. Default 600. */
  minWords?: number;
}

export interface SubstanceResult {
  passes: boolean;
  wordCount: number;
  /** Feed straight to `<BaseLayout robots={...}>`. */
  robots: 'index' | 'noindex-follow';
}

export function substanceFloor({ path, prose, minWords = 600 }: SubstanceInput): SubstanceResult {
  const trimmed = prose.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  const passes = wordCount >= minWords;
  if (!passes) {
    // eslint-disable-next-line no-console
    console.warn(
      `[substance-floor] ${path}: ${wordCount} words < ${minWords} — emitting noindex,follow`,
    );
  }
  return { passes, wordCount, robots: passes ? 'index' : 'noindex-follow' };
}
