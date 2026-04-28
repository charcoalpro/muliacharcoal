/**
 * /favicon.svg — emitted dynamically so the mark colours track
 * `company.brandAssets.colors`. The SVG geometry is built by `logoSvg()`,
 * shared with `<Logo>`; both update in lockstep when the brand changes.
 *
 * BaseLayout references this via `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`.
 */
import type { APIRoute } from 'astro';
import { logoSvg } from '~/lib/branding';

export const GET: APIRoute = () => {
  return new Response(logoSvg(), {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
