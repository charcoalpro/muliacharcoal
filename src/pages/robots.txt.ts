/**
 * robots.txt — generated at build time from `/src/config/company.ts`
 * so the Sitemap URL stays in sync with `company.siteUrl` (see
 * CLAUDE.md § "Things to Never Do" — no hardcoded company facts).
 *
 * Policy: all crawlers welcome (SEO + GEO friendly).
 *
 * A single `User-agent: *` block applies to every bot — search
 * engines and AI/LLM agents alike. The commented list below is
 * documentation only: naming a bot explicitly would give it its own
 * rule group, which under the robots.txt spec means it would stop
 * reading the wildcard block entirely (and inherit only what we
 * repeat under its name). The wildcard is the correct shape.
 *
 * Only `/admin/` (Sveltia CMS), `/api/` (reserved), and `/dev/`
 * (internal QA gallery) are off-limits. Every other path is
 * crawlable and citeable.
 */
import type { APIRoute } from 'astro';
import { company } from '~/config/company';

export const GET: APIRoute = () => {
  const body = [
    `# ${company.brand} — SEO + GEO friendly robots policy.`,
    '#',
    '# All crawlers are allowed full access. AI/LLM agents explicitly',
    '# welcomed (covered by the wildcard rule below, listed here for',
    '# transparency):',
    '#',
    '#   OpenAI       GPTBot, ChatGPT-User, OAI-SearchBot',
    '#   Anthropic    ClaudeBot, anthropic-ai, Claude-Web',
    '#   Google       Googlebot, Google-Extended, GoogleOther',
    '#   Microsoft    Bingbot',
    '#   Perplexity   PerplexityBot, Perplexity-User',
    '#   Apple        Applebot, Applebot-Extended',
    '#   Meta         Meta-ExternalAgent, FacebookBot',
    '#   Amazon       Amazonbot',
    '#   ByteDance    Bytespider',
    '#   Common Crawl CCBot',
    '#   DuckDuckGo   DuckDuckBot, DuckAssistBot',
    '#   You.com      YouBot',
    '#   Cohere       cohere-ai',
    '#   Diffbot      Diffbot',
    '#   Timpi        Timpibot',
    '',
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin/',
    'Disallow: /api/',
    'Disallow: /dev/',
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
