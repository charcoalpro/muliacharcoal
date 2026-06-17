/**
 * ImageObject and ImageGallery JSON-LD builders.
 *
 * Used by the homepage gallery section to surface each factory and
 * container-loading photograph as structured data, plus a single
 * `ImageGallery` node that anchors the section. The gallery videos
 * emit their own `VideoObject` entries via
 * `~/lib/schema/videoObject.ts`.
 *
 * Emit only when the underlying photographs actually exist on the
 * deployed site — broken `contentUrl`s in ImageObject are flagged in
 * Search Console. Callers gate emission on the `hasAssets` flag in
 * `~/config/gallery.ts`.
 */

import { company } from '~/config/company';
import { ORG_ID, siteOrigin } from '~/lib/schema/organization';

export interface ImageObjectInput {
  /** Stable id; becomes `${siteOrigin}/#image-${id}`. */
  id: string;
  /** Short caption used as Schema.org `name`. */
  name: string;
  /** Long description used as Schema.org `description`. */
  description: string;
  /** Public path or absolute URL to the full-size image. */
  contentUrl: string;
  /** Optional thumbnail public path. */
  thumbnailUrl?: string;
  /** ISO date the photo was taken / published. */
  datePublished: string;
}

function abs(path: string): string {
  if (path.startsWith('http')) return path;
  return `${siteOrigin}${path.startsWith('/') ? path : `/${path}`}`;
}

export function imageObjectSchema(input: ImageObjectInput) {
  return {
    '@type': 'ImageObject' as const,
    '@id': `${siteOrigin}/#image-${input.id}`,
    name: input.name,
    description: input.description,
    contentUrl: abs(input.contentUrl),
    ...(input.thumbnailUrl ? { thumbnailUrl: abs(input.thumbnailUrl) } : {}),
    datePublished: input.datePublished,
    creator: { '@id': ORG_ID },
    creditText: company.brand,
    copyrightHolder: { '@id': ORG_ID },
  };
}

export interface ImageGalleryInput {
  name: string;
  description?: string;
  url: string;
  /** Stable section id; becomes `${siteOrigin}/#${id}`. */
  id: string;
  images: ImageObjectInput[];
  /** Pre-built VideoObject @id refs to associate as media of this gallery. */
  videoRefs?: string[];
}

export function imageGallerySchema(input: ImageGalleryInput) {
  const imageNodes = input.images.map(imageObjectSchema);
  const associatedMediaRefs: Array<{ '@id': string }> = [
    ...imageNodes.map((n) => ({ '@id': n['@id'] })),
    ...(input.videoRefs ?? []).map((id) => ({ '@id': id })),
  ];

  return {
    '@type': 'ImageGallery' as const,
    '@id': `${siteOrigin}/#${input.id}`,
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    url: abs(input.url),
    ...(associatedMediaRefs.length
      ? { associatedMedia: associatedMediaRefs }
      : {}),
  };
}
