/**
 * Brand-mark builder.
 *
 * Today the mark is a placeholder: a rounded square in `brand.primary` with
 * a single capital letter (the brand initial) in `brand.accent`. Both the
 * inline `<Logo>` component and the dynamic `/favicon.svg` route use this
 * helper so the mark only changes in one place when a real logo lands.
 *
 * Returns SVG strings — not VNodes — because one consumer renders inline
 * (Astro template) and the other emits to an HTTP response.
 */

import { company } from '~/config/company';

export interface LogoSvgOptions {
  /** Override the initial letter. Defaults to the first character of `company.brand`. */
  initial?: string;
  /** Background fill. Defaults to `company.brandAssets.colors.primary`. */
  primary?: string;
  /** Letter fill. Defaults to `company.brandAssets.colors.accent`. */
  accent?: string;
  /** When true, omit the outer `<svg …>` wrapper and return only the inner shapes. */
  innerOnly?: boolean;
}

/**
 * Stable inner geometry of the mark — the `<rect>` plus `<text>` pair.
 * Produced once so callers can choose to wrap it themselves (Astro template
 * literals can't easily slot raw SVG nodes).
 */
export function logoSvgInner(opts: LogoSvgOptions = {}): string {
  const primary = opts.primary ?? company.brandAssets.colors.primary;
  const accent = opts.accent ?? company.brandAssets.colors.accent;
  const initial = (opts.initial ?? company.brand).charAt(0).toUpperCase();
  return (
    `<rect width="64" height="64" rx="12" fill="${primary}"/>` +
    `<text x="32" y="42" font-family="system-ui, -apple-system, sans-serif" ` +
    `font-size="32" font-weight="700" text-anchor="middle" fill="${accent}">${initial}</text>`
  );
}

/**
 * Full standalone SVG document — used by `/favicon.svg.ts`.
 */
export function logoSvg(opts: LogoSvgOptions = {}): string {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
    logoSvgInner(opts) +
    `</svg>`
  );
}
