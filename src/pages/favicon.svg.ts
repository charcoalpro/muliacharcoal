/**
 * /favicon.svg — emitted dynamically so the mark colours track
 * `company.brandAssets.colors`. No separate public/favicon.svg exists;
 * that file was removed to keep the brand palette single-sourced.
 *
 * BaseLayout references this via `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`.
 */
import type { APIRoute } from 'astro';
import { company } from '~/config/company';

export const GET: APIRoute = () => {
  const { primary, accent } = company.brandAssets.colors;
  const initial = company.brand.charAt(0).toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="${primary}"/><text x="32" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="700" text-anchor="middle" fill="${accent}">${initial}</text></svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
