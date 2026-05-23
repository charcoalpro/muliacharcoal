/**
 * Homepage Gallery — list of 9 real factory / container-loading
 * photos plus 2 vertical YouTube walkthrough videos.
 *
 * `hasAssets` gates the ImageObject / VideoObject schema emission:
 * leave `false` until real photographs are uploaded to the public
 * paths below, so the homepage @graph never advertises broken
 * resources to search engines. When the JPG/AVIF assets land at
 * `/public/gallery/<id>.avif` (and matching .webp / .jpg fallbacks)
 * AND the YouTube IDs are real, flip `hasAssets` to `true`.
 *
 * Alt text pattern: "{what is happening} at {legalName} factory in
 * {city} — {YYYY-MM}". Every alt is unique and contextual; never
 * "factory photo" or "image". Company-fact tokens (legalName, brand,
 * city) are interpolated from `~/config/company` so a rebrand or
 * legal-name change updates every alt string automatically.
 */

import { company } from '~/config/company';

const legalName = company.legalName;
const brand = company.brand;
const city = company.address.city;

export interface GalleryPhoto {
  type: 'photo';
  id: string;
  /** Public path for the full-size image (used by lightbox + schema). */
  contentPath: string;
  /** Public path for the thumbnail. */
  thumbnailPath: string;
  alt: string;
  /** Short caption for the schema `name` and lightbox caption. */
  caption: string;
  /** ISO `YYYY-MM-DD` — date the photo was taken on the factory floor. */
  datePublished: string;
  /** Aspect ratio class — currently every photo is 4:3. */
  aspect: '4/3';
}

export interface GalleryVideo {
  type: 'video';
  id: string;
  youtubeId: string;
  /** Title shown to screen readers and used as schema `name`. */
  title: string;
  description: string;
  /** ISO 8601 duration string (e.g. "PT1M30S"). */
  durationISO: string;
  /** ISO `YYYY-MM-DD` — when the video was uploaded. */
  uploadDate: string;
  /** Optional poster image path; falls back to YouTube's auto thumbnail. */
  posterPath?: string;
  /** Aspect ratio for vertical phone-shot videos. */
  aspect: '9/16';
}

export type GalleryItem = GalleryPhoto | GalleryVideo;

const SHARED_DATE = '2026-04-25';
const SHARED_MONTH_LABEL = SHARED_DATE.slice(0, 7);

/**
 * Set to `true` once the 9 photos exist at /public/gallery/<id>.* and
 * the 2 YouTube IDs are real. The homepage gallery section renders
 * either way (using ImagePlaceholder slots until then); only the
 * structured-data emission is gated, so placeholders never advertise
 * broken resources.
 */
export const hasAssets = false;

export const galleryLastUpdated = SHARED_DATE;

const factoryPhotos: GalleryPhoto[] = [
  {
    type: 'photo',
    id: 'factory-production-line',
    contentPath: '/gallery/factory-production-line.avif',
    thumbnailPath: '/gallery/factory-production-line-thumb.avif',
    alt: `Workers operating the briquetting extrusion line at ${legalName} factory in ${city} — ${SHARED_MONTH_LABEL}.`,
    caption: 'Briquetting extrusion line in operation',
    datePublished: SHARED_DATE,
    aspect: '4/3',
  },
  {
    type: 'photo',
    id: 'factory-kiln',
    contentPath: '/gallery/factory-kiln.avif',
    thumbnailPath: '/gallery/factory-kiln-thumb.avif',
    alt: `Carbonization kiln being charged with coconut shells at ${legalName} factory in ${city} — ${SHARED_MONTH_LABEL}.`,
    caption: 'Carbonization kiln charging',
    datePublished: SHARED_DATE,
    aspect: '4/3',
  },
  {
    type: 'photo',
    id: 'factory-press',
    contentPath: '/gallery/factory-press.avif',
    thumbnailPath: '/gallery/factory-press-thumb.avif',
    alt: `Briquetting press shaping 25-millimetre coconut charcoal cubes at ${legalName} factory in ${city} — ${SHARED_MONTH_LABEL}.`,
    caption: 'Briquetting press — 25 mm cubes',
    datePublished: SHARED_DATE,
    aspect: '4/3',
  },
  {
    type: 'photo',
    id: 'factory-milling',
    contentPath: '/gallery/factory-milling.avif',
    thumbnailPath: '/gallery/factory-milling-thumb.avif',
    alt: `Coconut shell charcoal milling and grading station at ${legalName} factory in ${city} — ${SHARED_MONTH_LABEL}.`,
    caption: 'Coconut shell charcoal milling',
    datePublished: SHARED_DATE,
    aspect: '4/3',
  },
  {
    type: 'photo',
    id: 'factory-drying',
    contentPath: '/gallery/factory-drying.avif',
    thumbnailPath: '/gallery/factory-drying-thumb.avif',
    alt: `Drying tunnel exit with stacked briquette trays at ${legalName} factory in ${city} — ${SHARED_MONTH_LABEL}.`,
    caption: 'Drying tunnel exit',
    datePublished: SHARED_DATE,
    aspect: '4/3',
  },
  {
    type: 'photo',
    id: 'factory-qc-bench',
    contentPath: '/gallery/factory-qc-bench.avif',
    thumbnailPath: '/gallery/factory-qc-bench-thumb.avif',
    alt: `Quality-control technician running a moisture and ash burn test on a finished cube at ${legalName} factory in ${city} — ${SHARED_MONTH_LABEL}.`,
    caption: 'QC bench — moisture and ash burn test',
    datePublished: SHARED_DATE,
    aspect: '4/3',
  },
];

const containerPhotos: GalleryPhoto[] = [
  {
    type: 'photo',
    id: 'container-exterior',
    contentPath: '/gallery/container-exterior.avif',
    thumbnailPath: '/gallery/container-exterior-thumb.avif',
    alt: `Twenty-foot shipping container with the ${brand} stencil parked at the loading bay of ${legalName} factory in ${city} — ${SHARED_MONTH_LABEL}.`,
    caption: `20-ft container with ${brand} stencil — pre-loading`,
    datePublished: SHARED_DATE,
    aspect: '4/3',
  },
  {
    type: 'photo',
    id: 'container-loading',
    contentPath: '/gallery/container-loading.avif',
    thumbnailPath: '/gallery/container-loading-thumb.avif',
    alt: `Workers manually stacking master cartons of coconut shisha charcoal mid-load at ${legalName} factory in ${city} — ${SHARED_MONTH_LABEL}.`,
    caption: 'Manual loading mid-process — master cartons',
    datePublished: SHARED_DATE,
    aspect: '4/3',
  },
  {
    type: 'photo',
    id: 'container-sealed',
    contentPath: '/gallery/container-sealed.avif',
    thumbnailPath: '/gallery/container-sealed-thumb.avif',
    alt: `Sealed twenty-foot container with the customs seal number visible, ready for trucking from ${legalName} factory in ${city} — ${SHARED_MONTH_LABEL}.`,
    caption: 'Sealed container — customs seal number visible',
    datePublished: SHARED_DATE,
    aspect: '4/3',
  },
];

const videos: GalleryVideo[] = [
  {
    type: 'video',
    id: 'video-container-loading',
    youtubeId: 'TODO_PLACEHOLDER_LOADING_VIDEO',
    title: 'Container loading time-lapse — full 18-ton FCL',
    description: `Vertical-phone time-lapse of a complete 18-ton 20-ft FCL load at the ${brand} factory in ${city}, Indonesia.`,
    durationISO: 'PT1M30S',
    uploadDate: 'TODO_PLACEHOLDER_DATE',
    aspect: '9/16',
  },
  {
    type: 'video',
    id: 'video-factory-walkthrough',
    youtubeId: 'TODO_PLACEHOLDER_WALK_VIDEO',
    title: 'Factory walkthrough — vertical phone tour',
    description: `Vertical-phone walkthrough of the briquetting and drying lines at the ${brand} factory in ${city}, Indonesia.`,
    durationISO: 'PT2M00S',
    uploadDate: 'TODO_PLACEHOLDER_DATE',
    aspect: '9/16',
  },
];

export const galleryPhotos: GalleryPhoto[] = [...factoryPhotos, ...containerPhotos];
export const galleryVideos: GalleryVideo[] = videos;

/**
 * Display order on the homepage gallery grid. Mixes photos and
 * videos so the visual rhythm carries the eye through the whole row.
 * Adjust freely without breaking schema (schema iterates the typed
 * arrays above, not this layout list).
 */
export const galleryItems: GalleryItem[] = [
  factoryPhotos[0],
  factoryPhotos[1],
  videos[0],
  factoryPhotos[2],
  factoryPhotos[3],
  containerPhotos[0],
  factoryPhotos[4],
  videos[1],
  factoryPhotos[5],
  containerPhotos[1],
  containerPhotos[2],
];
