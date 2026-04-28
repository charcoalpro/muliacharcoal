/**
 * `sameAs` builder for schema.org graphs.
 *
 * Drops `null` social slots from `company.social` so `Organization`,
 * `LocalBusiness`, and `Person` graphs only emit live profile URLs.
 */

import { company } from '~/config/company';

export function socialSameAs(): string[] {
  return Object.values(company.social).filter(
    (url): url is string => typeof url === 'string' && url.length > 0,
  );
}
