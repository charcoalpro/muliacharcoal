/**
 * FAQPage schema builder.
 *
 * Pass an array of `{ q, a }` pairs to render the `mainEntity` as
 * `Question` + `acceptedAnswer` nodes. Strip leading/trailing whitespace
 * but otherwise preserve the answer copy verbatim — Google extracts the
 * answer text into rich snippets.
 */

export interface QAPair {
  q: string;
  a: string;
}

export function faqPageSchema(items: QAPair[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q.trim(),
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a.trim(),
      },
    })),
  };
}
