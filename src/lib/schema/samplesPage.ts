/**
 * Samples page JSON-LD builder.
 *
 * Emits a `@graph` with:
 *   1. Organization (slim) — same node the homepage/FAQ graphs use, so the
 *      WebPage `isPartOf`/publisher references resolve.
 *   2. WebPage — the /samples page node (no generic WebPage builder exists,
 *      so it is constructed here, mirroring `aboutPageSchema`'s shape).
 *   3. ImageObject[] — gallery photos, ONLY for shots with a real asset.
 *   4. VideoObject — the explainer, ONLY once the real self-hosted file
 *      exists (see `selfHostedVideoObjectSchema`).
 *
 * No FAQPage node (canonical at /faq) and no Product/Offer (the free
 * sample is not an offer). BreadcrumbList is emitted by the `<Breadcrumbs>`
 * component, so it is not repeated here. Render the page with
 * `includeOrgSchema={false}` so BaseLayout does not also emit Organization.
 *
 * Image/Video nodes stay omitted while the page ships placeholder media —
 * a broken `contentUrl` in ImageObject/VideoObject is flagged in Search
 * Console, so we never advertise media that isn't deployed. They light up
 * automatically when the real assets land.
 */

import { buildOrganization, WEBSITE_ID, siteOrigin } from '~/lib/schema/organization';
import { imageObjectSchema, type ImageObjectInput } from '~/lib/schema/imageObject';
import { selfHostedVideoObjectSchema, type SelfHostedVideoInput } from '~/lib/schema/videoObject';

interface BuildArgs {
  pageTitle: string;
  pageDescription: string;
  /** Gallery photos that have a real, deployed asset (omit placeholders). */
  images?: ImageObjectInput[];
  /** Self-hosted explainer; node is gated internally on a real file. */
  video?: SelfHostedVideoInput | null;
}

export function samplesPageSchema({ pageTitle, pageDescription, images = [], video = null }: BuildArgs) {
  const webPage = {
    '@type': 'WebPage',
    '@id': `${siteOrigin}/samples#webpage`,
    url: `${siteOrigin}/samples`,
    name: pageTitle,
    description: pageDescription,
    inLanguage: 'en',
    isPartOf: { '@id': WEBSITE_ID },
  };

  const videoNode = video ? selfHostedVideoObjectSchema(video) : null;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganization({ mode: 'slim' }),
      webPage,
      ...images.map(imageObjectSchema),
      ...(videoNode ? [videoNode] : []),
    ],
  };
}
