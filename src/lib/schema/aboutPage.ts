/**
 * AboutPage JSON-LD builder.
 *
 * Emits a `@graph` with two nodes:
 *   1. AboutPage — links the page to the Organization via `mainEntity`.
 *   2. Organization (rich) — built by `buildOrganization({ mode: 'rich' })`
 *      so the founder, identifier[], and taxID fields appear here while
 *      the homepage uses the slim shape.
 *
 * The /about page is rendered with `includeOrgSchema={false}` so the
 * BaseLayout does NOT also emit the slim Organization graph.
 */

import { buildOrganization, ORG_ID, WEBSITE_ID, siteOrigin } from '~/lib/schema/organization';

interface BuildArgs {
  pageTitle: string;
  pageDescription: string;
}

export function aboutPageSchema({ pageTitle, pageDescription }: BuildArgs) {
  const aboutId = `${siteOrigin}/about#aboutpage`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': aboutId,
        url: `${siteOrigin}/about`,
        name: pageTitle,
        description: pageDescription,
        inLanguage: 'en',
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': ORG_ID },
      },
      buildOrganization({ mode: 'rich' }),
    ],
  };
}
