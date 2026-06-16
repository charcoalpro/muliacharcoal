/**
 * VideoObject schema builder.
 *
 * Returns null when the source video isn't real yet (the YouTube ID is
 * still TODO_PLACEHOLDER) so we never ship a VideoObject node that
 * points at nothing — search engines penalise broken VideoObject
 * markers harder than missing ones.
 *
 * `duration` follows ISO 8601 (e.g. "PT3M" for 3 minutes); `uploadDate`
 * follows ISO 8601 date format ("YYYY-MM-DD").
 *
 * Pass a unique `id` (kebab-case) so multiple VideoObject nodes on the
 * same page get distinct `@id` values: `${siteOrigin}/#video-${id}`.
 */

import { hasFact } from '~/config/company';
import { siteOrigin } from '~/lib/schema/organization';

export interface VideoObjectInput {
  /** Stable kebab-case id; defaults to 'factory-tour'. */
  id?: string;
  youtubeId: string;
  name: string;
  description: string;
  durationISO: string;
  uploadDate: string;
  /** Optional poster path; falls back to YouTube auto-thumbnail. */
  thumbnailUrl?: string;
}

export function videoObjectSchema(input: VideoObjectInput) {
  // Valid-or-omit: a VideoObject missing its duration draws Rich Results
  // warnings, so an unset duration suppresses the node entirely (same
  // rule as youtubeId/uploadDate — see packaging hub prompt v6 §6 [A6]).
  if (!hasFact(input.youtubeId) || !hasFact(input.uploadDate) || !hasFact(input.durationISO)) return null;
  const id = input.id ?? 'factory-tour';

  const thumbnail = input.thumbnailUrl
    ? input.thumbnailUrl.startsWith('http')
      ? input.thumbnailUrl
      : `${siteOrigin}${input.thumbnailUrl.startsWith('/') ? input.thumbnailUrl : `/${input.thumbnailUrl}`}`
    : `https://i.ytimg.com/vi/${input.youtubeId}/hqdefault.jpg`;

  return {
    '@type': 'VideoObject' as const,
    '@id': `${siteOrigin}/#video-${id}`,
    name: input.name,
    description: input.description,
    thumbnailUrl: thumbnail,
    uploadDate: input.uploadDate,
    contentUrl: `https://www.youtube.com/watch?v=${input.youtubeId}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${input.youtubeId}`,
    duration: input.durationISO,
  };
}
