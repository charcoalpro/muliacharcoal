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

import { buildOrganization } from '~/lib/schema/organization';
import { ORG_ID, siteOrigin } from '~/lib/schema/ids';
import { webPageNode } from '~/lib/schema/webPage';

interface BuildArgs {
  pageTitle: string;
  pageDescription: string;
}

export function aboutPageSchema({ pageTitle, pageDescription }: BuildArgs) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageNode({
        type: 'AboutPage',
        idFragment: 'aboutpage',
        pageUrl: `${siteOrigin}/about`,
        name: pageTitle,
        description: pageDescription,
        mainEntityId: ORG_ID,
      }),
      buildOrganization({ mode: 'rich' }),
    ],
  };
}
