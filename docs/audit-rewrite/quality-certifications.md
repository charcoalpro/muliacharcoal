# Content Audit & Targeted Rewrite — Certifications
**Route:** /quality/certifications · **Source:** src/i18n/en/qualityCerts.json, src/i18n/en/qualityCommon.json (en.qualityCerts)

This page does one job and does it cleanly: it draws the line between a certification a factory *holds* (ISO 9001:2015, Halal/MUI — standing, third-party, factory-wide) and a report it *provides per order* (Certificate of Analysis, third-party lab report, SHT — batch-specific, ships with the cargo). That distinction is a real, arguable thesis — *conflating held certs with per-order proof is how suppliers oversell* — and the page is structured as the ledger that keeps them apart. Every fact traces to config (certifications.iso9001 / .halal, quality.testing.thirdPartyLabs, testReportsProvided); nothing is web-sourced or implied. The third-party card and the third-party/independent FAQ items render only because `thirdPartyLabs` is configured (render-gated), and Halal renders only because `halal.certified` is true. This is a strong, honesty-gated page; gaps are minor heading-form and snippet-lead tweaks plus one missing Devil's Advocate H2 — no factual or structural failures.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | FAQ items are all true questions and map well. But the three section H2s are statement-form: "Certifications & accreditations held", "Test reports provided per order", and "Certifications & reports — frequently asked questions". The H3 cards (ISO 9001:2015, Halal certification, COA, Third-party report, SHT) are entity labels, correctly left as nouns for scannability. The two content H2s each map to a clean buyer question ("which certs do you hold?" / "what documents come with my order?") — question-form swaps offered in §3. Partial, not fail. |
| 2. Featured-snippet lead | PASS | Each section opens with a self-contained answer. heroSubtitle states the held-vs-provided distinction in one move; `held.intro` defines held certs as "verified and third-party … distinct from the per-order reports"; `reports.intro` defines per-order reports as "issued for your specific shipment … report the measured results for your batch and ship with the cargo"; COA, third-party, and SHT cards each open with a definition sentence. FAQ answers are all snippet-shaped. |
| 3. Paragraph intent | PASS | Every paragraph serves one named intent (see §2). No drift; the two-paragraph reports lead splits cleanly into "where the numbers come from" (procedure link) and "what these documents are". |
| 4. No fluff + anti-bloat | PASS | Spec/entity-dense; no filler adjectives, no padded restatement. The intro's "conflating them is how suppliers oversell" earns its place (it is the thesis). One borderline echo flagged in §3 (intro restates the held-vs-provided split the heroSubtitle already made) — optional compression, not a failure. |
| 5. Section purity | PASS | Two pure clusters: held certifications (formal, standing) and per-order reports (batch, shipped). The page actively polices bleed — SHT card defers dangerous-goods classification to /logistics/un-1361, COA defers value-reading to /quality/specifications-explained, methods defer to /quality/testing-methods. No cross-contamination. |
| 6. Structure | PASS | Logical spine: intro (draws the line) → at-a-glance ledger → held certs → per-order reports → FAQ → related. The held-vs-provided relation is stated once and reused as the organizing axis; no duplicated meaning across sections. |
| 7. Devil's Advocate | PARTIAL | The intro pre-empts the objection ("conflating them is how suppliers oversell") and the page's whole structure is a rebuttal to "a cert is a cert" — but there is no dedicated counter-argument H2. The strongest buyer objection (ISO 9001 certifies the *system*, not the *charcoal* — so what does it actually prove?) deserves its own section. Drafted in §4. |
| 8. Quantified evidence | PASS | Claims resolve to named, on-config facts: ISO 9001:2015 audited by Carsurin & Beckjorindo; Halal issued by MUI; third-party lab one of Carsurin, Beckjorindo, or SGS testing ash, moisture, fixed carbon, volatile matter on every container; COA with every container. The page correctly does NOT quote ash/calorific numbers here — those live on the quality pillar / specs page — so there is no missing-number gap on this reference page. |
| 9. Mini-cases | N/A | No customer/problem→action→result data exists in config; page makes none. Honesty-gate compliant — do not invent. |
| 10. Ontological completeness | PASS | Genesis (named factory, audited by named bodies, tested by named labs), Taxonomy (the held-vs-provided axis; COA as a defined document type; SHT routed to UN 1361 class 4.2), Pragmatics (buyer can confirm the batch meets spec, gets verification "not just the producer's own figures", Halal as a Gulf purchasing requirement) all explicit and densely linked. |

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "There is an important difference…" (heroSubtitle) | "what's the difference between a cert and a COA" — the head-query / thesis | keep |
| "This page sits under {{brand}}'s…" (intro.p1 + hub link) | up-link to quality pillar + reframe ("certified for vs documents for each order") | compress (mild echo of heroSubtitle) |
| "What {{brand}} holds, what it provides…" (keyFacts.definition) | scannable ledger snapshot for skimmers | keep |
| keyFacts rows (held / reports / Halal / verification) | extractable at-a-glance facts (GEO citation target) | keep |
| "These are formal certifications {{brand}} holds…" (held.intro) | "which certifications does the factory hold" — held cluster lead | keep |
| ISO 9001 card (desc + audited-by + scope + document) | "is the factory ISO 9001 certified / by whom" | keep |
| Halal card (desc + issued-by MUI + scope) | "is the charcoal halal certified" — Gulf buyer | keep |
| "Every figure in these reports comes…" (reports.procedureLinkIntro) | "where do the test values come from" → testing-methods | keep |
| "These documents are issued for your…" (reports.intro) | "what documents ship with my order" — per-order cluster lead | keep |
| COA card (definition + when received + read-link) | "what is a Certificate of Analysis" — canonical COA definition home | keep |
| Third-party card (independent-lab body + issuer + frequency) | "is the testing independent / third-party verified" | keep |
| SHT card (self-heating report + DG link) | "what is the SHT report / dangerous-goods proof" | keep |
| FAQ ×4 (COA, halal, third-party, independent) | long-tail buyer questions | keep |
| Related topics ×9 | internal linking / navigation | keep |

## 3. Targeted rewrites

Only three real gaps; everything else passes and is not rewritten.

### Gap A — Rule 1 (headings as questions): the two content H2s are statement-form
Both map cleanly to a direct buyer question. Optional, token-free swaps that keep the JSON honest and the cards (H3s) as noun labels:

**Current** (`held.heading`): `"Certifications & accreditations held"`
**Corrected (question form):** `"Which certifications does the factory hold?"`

**Current** (`reports.heading`): `"Test reports provided per order"`
**Corrected (question form):** `"Which test reports ship with each order?"`

Note: `faq.heading` ("Certifications & reports — frequently asked questions") is the canonical FAQ-block label and is better left as a noun phrase — leave as-is.

### Gap B — Rule 4 (anti-bloat): intro mildly restates the heroSubtitle's split
**Current** (`intro.p1cont`):
> "pillar, and it is the one place that draws the line clearly: what the factory is certified for, versus what it documents for each order. Both matter to a wholesale buyer; conflating them is how suppliers oversell."

The heroSubtitle already states "the difference between a certification a factory holds and a report it provides." The intro re-states it. The thesis sentence ("conflating them is how suppliers oversell") is worth keeping; the middle restatement can compress without losing the up-link or the punch:

**Corrected:**
> "pillar — the one page that separates what the factory is *certified for* from what it *documents for each order*. Both matter to a wholesale buyer; conflating them is how suppliers oversell."

(Low priority — the current version is not bloated enough to fail Rule 4; offered only because the same split is made one screen above.)

### Gap C — Rule 7 (Devil's Advocate): no dedicated counter-argument section
The page's structure is implicitly a rebuttal, but the strongest specific objection — *ISO 9001 certifies a management system, not the charcoal, so a "certified factory" badge proves nothing about what's in the container* — is never named and answered in its own H2. Add the section drafted in §4 as a new `devilsAdvocate` block in `qualityCerts.json`, rendered after the `reports` section and before the FAQ. All facts below already live on the page or in config — no new numbers.

**New JSON block (`qualityCerts.devilsAdvocate`):**
```json
"devilsAdvocate": {
  "heading": "Doesn't \"ISO 9001 certified\" really certify nothing about the charcoal?",
  "body1": "It is a fair point, and a buyer is right to press it. ISO 9001 certifies a quality-management *system* — that processes are documented and followed — not that any given container meets a composition spec. A factory can be genuinely ISO 9001 certified and still ship an inconsistent batch, and a supplier who waves the badge as if it graded the product is doing exactly the conflation this page warns against.",
  "body2": "That is precisely why {{brand}} separates the two columns instead of blending them. ISO 9001:2015 (audited by {{auditors}}) and Halal ({{halalBody}}) are listed as what the factory *holds* — system- and product-level standing certifications, no more. What proves the charcoal in *your* container is the per-order column: a Certificate of Analysis stating the measured values for that exact batch, a third-party laboratory report ({{thirdPartyLabsOr}}) testing {{thirdPartyScope}} on {{thirdPartyFrequency}}, and an SHT report — all shipping with the cargo. The badge proves the system; the COA and the independent lab report prove the batch. The page keeps them apart so the badge is never asked to do the batch's job."
}
```
All tokens (`auditors`, `halalBody`, `thirdPartyLabsOr`, `thirdPartyScope`, `thirdPartyFrequency`) already resolve via `companyTokens()` / `qualityTokens()` — no fabricated figure. If the `devilsAdvocate` heading uses `halal`, gate it the same way the existing Halal/third-party FAQ items are gated so it suppresses cleanly when those facts are absent.

## 4. Devil's Advocate section

The page has a clear thesis: *a certification a factory holds is distinct from a report it provides per order, and only the per-order documents prove the specific container.* The strongest opposing industry view is that the held certifications — especially ISO 9001 — are the real credential and the per-order paperwork is just self-issued. Drafted complete, using only on-site/config facts:

## A View from the Other Side: The Strongest Argument Against "Held Certs and Per-Order Reports Are Different Things"

**The counterargument.** A buyer could reasonably argue the page over-complicates this: "An ISO 9001 certificate from a recognized auditor is the hard, third-party credential. A 'Certificate of Analysis' is a document the factory writes about itself — anyone can type numbers onto a letterhead. So the held certification is what counts, and splitting it from 'per-order reports' just dresses up the supplier's own claims as if they were independent." The objection is genuinely valid in one direction: a COA, on its own, *is* the producer's own figures, and a held ISO badge really is audited by an outside body. A buyer who trusts a self-issued COA as if it were independent verification is making a mistake.

**Where it holds.** It holds against any supplier whose "third-party" proof turns out to be the factory testing itself and calling the result independent — or who issues a COA but has no outside lab anywhere in the chain. Against that seller, the per-order column really is just self-assertion, and the held ISO badge is the only outside check.

**The rebuttal, on this page's own facts.** This factory does not rest the batch on its own COA. The per-order column contains an *independent* link the objection assumes is missing: a third-party laboratory — Carsurin, Beckjorindo, or SGS — tests ash content, moisture, fixed carbon, and volatile matter on every container and issues its own report, so the verification "does not rest on the factory's word alone." The COA is the factory's measured statement for the batch; the third-party lab report is the outside check on those same parameters, shipping alongside it. Meanwhile the held column is kept honest in the other direction: ISO 9001:2015 is listed as covering the "quality management system" and audited by Carsurin and Beckjorindo — never presented as if it graded the charcoal. The distinction the objection calls over-complication is exactly what lets the buyer see that the independent verification lives in the per-order column, not in the wall badge — and that both exist rather than one standing in for the other. The split isn't dressing; it's what stops the ISO badge and the COA from each being asked to prove what only the other can.

## 5. Ontological completeness & triangulation

- **Genesis — explicit.** Source-as-author is named throughout: the factory holds the certs, named bodies audit them (Carsurin & Beckjorindo for ISO 9001, MUI for Halal), named labs test the batch (Carsurin/Beckjorindo/SGS). The E-E-A-T meta block (authored / reviewed / fact-checked / last updated) reinforces provenance.
- **Taxonomy — explicit and load-bearing.** The page's spine is a two-class taxonomy: *held* (standing, system/product-level, third-party-audited) vs *provided per order* (batch-level, ships with cargo). COA is given a dictionary-form definition; SHT is placed in the dangerous-goods taxonomy by deferring class 4.2 / UN 1361 to /logistics/un-1361. Clean classification, no leakage.
- **Pragmatics — explicit.** Buyer value is concrete at every node: confirm the batch "meets the agreed specifications for that exact lot", verification "from a source outside the producer", Halal as a Gulf "purchasing requirement". The "why should I trust this" question is routed to a document and an issuer, not an adjective.
- **Weakest connectivity — the SHT entity is thin on-page.** The SHT card defines the report and links to UN 1361 but the term "self-heating" connects to nothing else on this page (no link to why a coconut-charcoal cargo self-heats or how the test is run). That deferral is deliberate (classification lives on /logistics/un-1361), so this is awareness-only, not an action item.
- **Held-vs-provided relation — strongly triangulated.** The core relationship is restated consistently across the at-a-glance ledger, the two section leads, and the third-party FAQ ("a per-shipment report, not a certification the factory holds") without contradiction — the page's load-bearing edge is solid.
- **Render-gating as an honesty mechanism — a strength.** Halal, the third-party card, and the third-party/independent FAQ items only render when the underlying config facts exist (`halal.certified`, `thirdPartyLabs`). The page cannot accidentally claim an independent lab or a Halal cert it does not have — close this loop and the most likely AI-citation trust gap is already shut.

## 6. Gaps needing owner data

- None. Every rewrite above uses facts already present in src/i18n/en/qualityCerts.json or resolvable via `companyTokens()` / `qualityTokens()` from src/config/company.ts (ISO 9001:2015 + auditors Carsurin & Beckjorindo, Halal/MUI, labs Carsurin/Beckjorindo/SGS, scope ash/moisture/fixed carbon/volatile matter, every container). No `<NEEDS-OWNER-DATA>` placeholder required.
