/**
 * robots.txt — generated at build time from `/src/config/company.ts`
 * so the Sitemap URL stays in sync with `company.siteUrl` (see
 * CLAUDE.md § "Things to Never Do" — no hardcoded company facts).
 *
 * Disallows `/admin/` (Sveltia CMS) and `/api/` per CLAUDE.md § SEO.
 */
import type { APIRoute } from 'astro';
import { company } from '~/config/company';

export const GET: APIRoute = () => {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin/',
    'Disallow: /api/',
    '',
    `Sitemap: ${company.siteUrl}/sitemap-index.xml`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
