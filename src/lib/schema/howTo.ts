/**
 * HowTo node builder — onboarding / process steps.
 *
 * Used by /packaging/white-label (the "how to start your own brand" steps)
 * and /factory/production-process (the manufacturing process). Google
 * deprecated HowTo rich results in 2023, so the value is GEO/AI extraction —
 * the on-page numbered steps carry it regardless. Emitted only when there
 * are steps with both a name and text, so the node is always warning-free
 * (valid-or-omit).
 *
 * The optional `supply` / `tool` / `totalTime` / per-step `image` fields
 * round out the schema.org HowTo shape for extraction (HowToSupply,
 * HowToTool, totalTime, HowToStep.image). Semantic-fit caveat: HowTo is
 * designed for a task the READER performs; a factory process the buyer
 * won't replicate is a stretch — kept deliberately for valid-structured-data
 * + AI step extraction, NOT consumer DIY framing.
 */

import { siteOrigin } from '~/lib/schema/ids';
import { absoluteUrl } from '~/lib/url';

export interface HowToStepInput {
  name: string;
  text: string;
  /** Optional public path / URL to a step figure. */
  image?: string;
}

interface BuildArgs {
  /** Page path for the @id, e.g. /factory/production-process. */
  path: string;
  name: string;
  description?: string;
  steps: HowToStepInput[];
  /** HowToSupply names (e.g. raw coconut shell, tapioca binder). */
  supply?: string[];
  /** HowToTool names (e.g. the machines from factory.equipment). */
  tool?: string[];
  /** ISO 8601 duration for the whole process (e.g. "PT48H"). */
  totalTime?: string;
}

export function howToNode({
  path,
  name,
  description,
  steps,
  supply,
  tool,
  totalTime,
}: BuildArgs): Record<string, unknown> | null {
  const valid = steps.filter((s) => s.name?.trim() && s.text?.trim());
  if (valid.length === 0) return null;
  return {
    '@type': 'HowTo',
    '@id': `${siteOrigin}${path}#how-to`,
    name,
    ...(description ? { description } : {}),
    ...(totalTime ? { totalTime } : {}),
    ...(supply && supply.length
      ? { supply: supply.map((s) => ({ '@type': 'HowToSupply', name: s })) }
      : {}),
    ...(tool && tool.length
      ? { tool: tool.map((tl) => ({ '@type': 'HowToTool', name: tl })) }
      : {}),
    step: valid.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.image ? { image: absoluteUrl(s.image) } : {}),
    })),
  };
}
