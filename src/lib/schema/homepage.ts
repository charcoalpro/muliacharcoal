/**
 * Homepage JSON-LD `@graph` builder.
 *
 * Returns one `@graph` document containing every schema node the
 * homepage needs: Organization, WebSite, LocalBusiness, ItemList of
 * the six product shapes, three Grade Product variants, and a one-item
 * BreadcrumbList. Pass the result to `BaseLayout`'s `schema` prop — it
 * serialises the whole graph as a single
 * `<script type="application/ld+json">`.
 *
 * FAQPage schema is intentionally NOT emitted here. /faq is the
 * canonical home for cross-cutting buyer-operations questions and
 * carries the FAQPage `@graph` for them; /glossary keeps a separate
 * FAQPage for terminology-comparison questions. The homepage retains
 * its visible Q&A blocks (Buyer FAQ, Specs glossary, OEM FAQ) as
 * teasers that link up to /faq — no duplicate schema across URLs.
 */

import { company } from '~/config/company';
import { buildOrganization, buildWebSite } from '~/lib/schema/organization';
import { localBusinessSchema } from '~/lib/schema/localBusiness';
import { productItemListSchema } from '~/lib/schema/itemList';
import { gradeProductsSchema } from '~/lib/schema/grades';
import { breadcrumbListSchema } from '~/lib/schema/breadcrumbList';
import { videoObjectSchema } from '~/lib/schema/videoObject';
import { imageGallerySchema, imageObjectSchema } from '~/lib/schema/imageObject';
import { productShapes } from '~/config/products';
import {
  galleryPhotos,
  galleryVideos,
  galleryLastUpdated,
  hasAssets as hasGalleryAssets,
} from '~/config/gallery';
import { siteOrigin } from '~/lib/schema/organization';

export function buildHomepageGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganization({ mode: 'slim' }),
      buildWebSite(),
      // Strip the outer @context off LocalBusiness — it's already on @graph.
      (() => {
        const { '@context': _ctx, ...rest } = localBusinessSchema as { '@context': string } & Record<
          string,
          unknown
        >;
        return rest;
      })(),
      productItemListSchema(
        productShapes.map((p) => ({
          slug: p.slug,
          name: p.name,
          description: p.description,
          // `p.image` (/products/*.svg) is a placeholder path with no asset on
          // disk yet, so omit it — productItemListSchema falls back to the real
          // logo rather than advertising a 404 image to crawlers. Pass the real
          // product photo here once it lands.
          category: p.category,
          material: p.material,
          sizes: p.sizes,
        })),
      ),
      ...gradeProductsSchema(),
      breadcrumbListSchema([{ name: 'Home', path: '/' }]),
      // Append the factory-tour VideoObject only when the YouTube ID
      // and upload date are real — `videoObjectSchema` returns null
      // otherwise. The .filter(Boolean) below drops the null.
      videoObjectSchema({ ...company.factoryTourVideo, id: 'factory-tour' }),
      // Gallery schema — only emit ImageObject + ImageGallery when
      // `hasGalleryAssets` is flipped true (i.e. real photos have
      // landed at /public/gallery/). Until then, we never advertise
      // broken contentUrls to search engines.
      ...(hasGalleryAssets
        ? [
            ...galleryPhotos.map((p) =>
              imageObjectSchema({
                id: p.id,
                name: p.caption,
                description: p.alt,
                contentUrl: p.contentPath,
                thumbnailUrl: p.thumbnailPath,
                datePublished: p.datePublished,
              }),
            ),
            ...galleryVideos
              .map((v) =>
                videoObjectSchema({
                  id: v.id,
                  youtubeId: v.youtubeId,
                  name: v.title,
                  description: v.description,
                  durationISO: v.durationISO,
                  uploadDate: v.uploadDate,
                  thumbnailUrl: v.posterPath,
                }),
              )
              .filter(Boolean),
            imageGallerySchema({
              id: 'home-gallery',
              name: `${company.brand} factory and container-loading gallery`,
              description: `Photographs and short vertical videos taken on the production floor and loading bay of the ${company.brand} coconut shell briquetting factory in ${company.address.city}, ${company.address.region} — refreshed ${galleryLastUpdated}.`,
              url: `${siteOrigin}/#home-gallery-section`,
              images: galleryPhotos.map((p) => ({
                id: p.id,
                name: p.caption,
                description: p.alt,
                contentUrl: p.contentPath,
                thumbnailUrl: p.thumbnailPath,
                datePublished: p.datePublished,
              })),
              videoRefs: galleryVideos
                .filter((v) => v.youtubeId.indexOf('TODO_PLACEHOLDER') === -1)
                .map((v) => `${siteOrigin}/#video-${v.id}`),
            }),
          ]
        : []),
    ].filter(Boolean) as Array<Record<string, unknown>>,
  };
}
