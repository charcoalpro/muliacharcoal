/**
 * Indicative reading time in whole minutes (minimum 1), at ~200 words/min —
 * the average adult silent-reading speed for prose.
 *
 * Pages assemble their visible prose (each section run through `fill()`) into
 * one string and pass it here; pass a precomputed word count instead when the
 * page already tallied words (e.g. an FAQ `reduce`).
 *
 * Single source for the formula the cluster/pillar pages previously
 * copy-pasted: `Math.max(1, Math.round(words / 200))`.
 */
export const READING_WPM = 200;

export function readingTime(input: string | number, wpm: number = READING_WPM): number {
  const words =
    typeof input === 'number'
      ? input
      : input.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wpm));
}
