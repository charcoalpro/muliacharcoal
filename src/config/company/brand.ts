/**
 * Brand visual identity tokens.
 *
 * Tailwind utility colors (brand-primary, brand-primary-hover, brand-accent,
 * brand-dark) derive from these via tailwind.config.ts. The same values feed
 * inline SVG fills (Logo, favicon), the <meta name="theme-color"> hint, and
 * the dev swatch page. Change a value here and every surface updates on
 * the next build.
 */
export const brandAssets = {
  colors: {
    /** Deep forest green — primary CTAs, links, logo mark background. */
    primary: '#0f3d2e',
    /** Pressed / hover state for `primary`. */
    primaryHover: '#0a2a1f',
    /** Muted gold — accent text, premium signals, logo letterform. */
    accent: '#c9a24b',
    /** Near-black green — hero backgrounds, footer. */
    dark: '#0a1f17',
  },
} as const;
