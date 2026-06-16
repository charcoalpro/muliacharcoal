/**
 * HowTo node builder — onboarding / process steps.
 *
 * Used by /packaging/white-label for the "how to start your own brand"
 * steps. Google deprecated HowTo rich results in 2023, so the value is
 * GEO/AI extraction — the on-page numbered steps carry it regardless.
 * Emitted only when there are steps with both a name and text, so the
 * node is always warning-free (valid-or-omit).
 */

import { siteOrigin } from '~/lib/schema/organization';

export interface HowToStepInput {
  name: string;
  text: string;
}

interface BuildArgs {
  /** Page path for the @id, e.g. /packaging/white-label. */
  path: string;
  name: string;
  description?: string;
  steps: HowToStepInput[];
}

export function howToNode({ path, name, description, steps }: BuildArgs): Record<string, unknown> | null {
  const valid = steps.filter((s) => s.name?.trim() && s.text?.trim());
  if (valid.length === 0) return null;
  return {
    '@type': 'HowTo',
    '@id': `${siteOrigin}${path}#how-to`,
    name,
    ...(description ? { description } : {}),
    step: valid.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}
