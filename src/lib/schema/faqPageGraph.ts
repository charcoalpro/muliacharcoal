/**
 * /faq JSON-LD `@graph` builder.
 *
 * Returns one `@graph` document containing two nodes: an Organization
 * (slim) and a single FAQPage. The Q&A pairs are passed in already
 * resolved (token-substituted) so the schema text matches the on-page
 * answer character-for-character — Google's FAQ rich-result requirement.
 *
 * BreadcrumbList is emitted separately by the `<Breadcrumbs>` component;
 * we deliberately don't include it here to avoid duplicate emission.
 *
 * Per the canonical-home rule (CLAUDE.md): /faq is the single URL that
 * emits a FAQPage with these buyer-operations questions. The homepage
 * dropped its FAQPage node when this page shipped; /glossary keeps its
 * own FAQPage with terminology-comparison questions that are distinct
 * by design from the questions answered here.
 */
import type { QAPair } from '~/lib/schema/faqPage';
import { faqPageSchema } from '~/lib/schema/faqPage';
import { buildOrganization } from '~/lib/schema/organization';

export function buildFaqPageGraph(items: QAPair[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganization({ mode: 'slim' }),
      faqPageSchema(items),
    ],
  };
}
