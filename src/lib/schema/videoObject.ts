/**
 * VideoObject schema builder for the homepage factory tour video.
 *
 * Returns null when the source video isn't real yet (the YouTube ID is
 * still TODO_PLACEHOLDER) so we never ship a VideoObject node that
 * points at nothing — search engines penalise broken VideoObject
 * markers harder than missing ones.
 *
 * `duration` follows ISO 8601 (e.g. "PT3M" for 3 minutes); `uploadDate`
 * follows ISO 8601 date format ("YYYY-MM-DD").
 */

import { hasFact } from '~/config/company';
import { siteOrigin } from '~/lib/schema/organization';

interface VideoInput {
  youtubeId: string;
  name: string;
  description: string;
  durationISO: string;
  uploadDate: string;
}

export function videoObjectSchema(input: VideoInput) {
  if (!hasFact(input.youtubeId) || !hasFact(input.uploadDate)) return null;

  return {
    '@type': 'VideoObject',
    '@id': `${siteOrigin}/#video-factory-tour`,
    name: input.name,
    description: input.description,
    thumbnailUrl: `https://i.ytimg.com/vi/${input.youtubeId}/hqdefault.jpg`,
    uploadDate: input.uploadDate,
    contentUrl: `https://www.youtube.com/watch?v=${input.youtubeId}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${input.youtubeId}`,
    duration: input.durationISO,
  };
}
