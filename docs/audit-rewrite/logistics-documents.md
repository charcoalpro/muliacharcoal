# Content Audit & Targeted Rewrite — Export Documents
**Route:** /logistics/documents · **Source:** src/i18n/en/logisticsDocuments.json, src/i18n/en/logisticsCommon.json (en.logisticsDocuments)

This is a procedural/reference page: an itemized list of the export-document pack for UN 1361 coconut charcoal, with issuer, buyer-use, and provision timing per document, plus a destination-requirements section and FAQ. It has no arguable thesis, so several framework rules (Devil's Advocate, mini-cases) are N/A by design. The page is already tight, factually disciplined, and well-linked into the Logistics pillar and /glossary.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | Two H2s already map cleanly to buyer questions ("Documents your destination requires"; the FAQ block). The two list H2s ("Standard documents (every shipment)", "On request (paid add-ons)") and the per-document H3s (document names) are reference labels, not questions. For a list/reference page this is the correct, scannable pattern — but the two list-section H2s could be nudged toward question form for snippet capture without harming usability. |
| 2. Featured-snippet lead | PARTIAL | The hero subtitle and intro give a strong page-level lead, and `keyFacts.definition` answers "what ships." But the two list H2s (`standardHeading`, `additionalHeading`) drop straight into items with no 1–2 sentence lead under the heading. The `countryReq` H2 has a proper lead. FAQ answers are self-contained leads (good). |
| 3. Paragraph intent | PASS | Every block serves one identifiable intent: intro = orientation/pillar-link; keyFacts = scannable summary; each doc section = "what is this doc, who issues it, when do I get it"; countryReq = destination-specific intent; FAQ = the three highest-frequency buyer questions. No stray paragraphs. |
| 4. No fluff + anti-bloat | PASS | Prose is dense and specification-first ("Issued by … Provided …"). No restatement, no filler adjectives. The dgdNote/shtNote/insuranceNote are one sentence each and load-bearing. Nothing to cut for 20%. |
| 5. Section purity | PASS | Standard vs. on-request split is clean; countryReq stays on destination variation; FAQ does not re-list the standard pack beyond the answer it owns. No cross-cluster bleed (pricing/freight correctly absent — deliberate, see .astro). |
| 6. Structure | PARTIAL | Coverage is complete and logically ordered (standard → add-ons → destination → FAQ → related). One internal-consistency issue: the FAQ answer to "What export documents do you provide?" enumerates 8 named standard documents while every other surface uses the `{{documentsStandardCount}}` token — fine today (count = 8) but the hardcoded list will silently drift if the config array changes. Minor duplication: the destination guidance appears almost verbatim in both `countryReq.body` and FAQ item 3. |
| 7. Devil's Advocate | N/A | Procedural reference page with no thesis to oppose. See §4. |
| 8. Quantified evidence | PASS | Quantification is appropriate to a document list: the two pack counts are token-driven from the config arrays (8 standard, 4 on-request), and regulatory specifics are cited precisely (UN 1361, Class 4.2, PG III, SP 978, e-SKA/IPSKA, BICON, ISF). No benefit claim needs a fabricated figure. Lab cost/processing time for SHT/COA are deliberately blank in config and the page correctly says "ask at quotation" rather than inventing a number. |
| 9. Mini-cases | N/A | No real, verifiable problem→action→result case data exists for a document-pack page; none invented. Correct to skip. |
| 10. Ontological completeness | PASS | Dense entity coverage: each document is tied to an issuer entity (factory, shipping line, Ministry of Trade/IPSKA, Bea Cukai, marine surveyor, accredited lab, buyer's insurer), a buyer-use (pragmatics), a timing, and a /glossary anchor. Genesis (factory as issuer of the pack), Taxonomy (UN 1361 / DG context via links to /logistics/un-1361 and /charcoal-dg-regulation), and Pragmatics ("what your customs broker uses it for") are all explicit. |

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "Every UN 1361 shipment travels…" (heroSubtitle) | "what documents come with a coconut charcoal container" — page-level answer + counts | keep |
| "This page sits under the … Logistics pillar" (intro.p1) | orientation + pillar up-link; "who issues each, what the broker uses it for" | keep |
| "What ships with your container…" (keyFacts) | scannable at-a-glance answer (delivery method, DGD, SHT/COA status) | keep |
| "Standard documents (every shipment)" (standardHeading) | "which documents are always included" | rewrite (add lead; optional question form) |
| per-document blocks (commercial invoice … PEB) | "who issues X, what is it for, when do I get it" | keep |
| "On request (paid add-ons)" (additionalHeading) | "which extra documents can I order and when" | rewrite (add lead; optional question form) |
| "The Dangerous Goods Declaration must carry…" (dgdNote) | SP 978 compliance detail + DG-regulation cross-link | keep |
| "The Self-Heating Test report is supporting…" (shtNote) | corrects the common "SHT exempts cargo from DG" misconception | keep |
| "A marine insurance certificate is buyer-arranged…" (insuranceNote) | clarifies who arranges cover; cross-link to insurance page | keep |
| "Destination requirements vary: GCC and African…" (countryReq.body) | "which documents does MY country require" | keep (trim overlap with FAQ item 3) |
| "Country-specific import guides:" + list | navigational down-link to import-to-{country} | keep |
| FAQ "What export documents do you provide?" | repeat of headline intent in Q&A form (snippet/FAQPage) | keep (de-hardcode the count list) |
| FAQ "Do you provide a Self-Heating Test report and a COA?" | add-on availability + pricing-at-quote intent | keep |
| FAQ "Which documents does my country require?" | destination intent in Q&A form | compress (near-duplicate of countryReq.body) |
| "Related topics" list | internal-linking / cluster navigation | keep |

## 3. Targeted rewrites

Only genuine gaps below; everything marked keep/PASS above is left unchanged.

### 3a. Rule 2 + Rule 1 — `standardHeading` missing snippet lead; optional question form
**Current (`standardHeading`):**
> "Standard documents (every shipment)"

The H2 jumps straight into the list with no self-contained answer underneath. Add a lead sentence. Recommended: keep the scannable label as the heading and add a one-sentence lead in a new key. If you prefer the heading itself in question form, the alternate is given.

**Corrected — add a new key `standardLead`** (render as a `<p>` between the H2 and the list):
```
"standardLead": "These {{documentsStandardCount}} documents ship with every container at no extra charge — scans first, originals to follow by courier."
```
**Optional question-form heading (`standardHeading`):**
```
"standardHeading": "Which documents ship with every container?"
```

### 3b. Rule 2 + Rule 1 — `additionalHeading` missing snippet lead; optional question form
**Current (`additionalHeading`):**
> "On request (paid add-ons)"

**Corrected — add a new key `additionalLead`:**
```
"additionalLead": "These {{documentsAdditionalCount}} documents are not in the standard pack; we arrange them when your shipment or destination needs them, and the lab fee is quoted at the time."
```
**Optional question-form heading (`additionalHeading`):**
```
"additionalHeading": "Which documents can I order on request?"
```

### 3c. Rule 6 — FAQ answer hardcodes the standard-document list (drift risk)
**Current (`faq.items[0].a`):**
> "Every shipment travels with {{documentsStandardCount}} standard documents — the commercial invoice, packing list, bill of lading, certificate of origin, MSDS, dangerous goods declaration, container vanning certificate, and the Indonesian export declaration (PEB). A further {{documentsAdditionalCount}} are available on request as paid add-ons, including the Self-Heating Test report and a Certificate of Analysis."

The count is token-driven but the names are hardcoded; the list currently matches the config (8 items) but will silently desync if `documentsStandard[]` changes. The wording is fine to keep for snippet richness — flag this as a maintenance note (keep names in sync with `company.logistics.documentsStandard`), not a content rewrite. No text change required unless you want to reduce the risk; a lower-maintenance variant:

**Optional lower-drift rewrite (`faq.items[0].a`):**
```
"Every shipment travels with {{documentsStandardCount}} standard documents at no extra charge — the commercial invoice, packing list, bill of lading, certificate of origin, MSDS, dangerous goods declaration, container vanning certificate, and the Indonesian export declaration (PEB), all listed in full above. A further {{documentsAdditionalCount}} are available on request as paid add-ons, including the Self-Heating Test report and a Certificate of Analysis."
```
(The "listed in full above" phrase points the reader to the canonical list and signals the FAQ summary is secondary.)

### 3d. Rule 6 — FAQ item 3 near-duplicates `countryReq.body`
**Current (`faq.items[2].a`):**
> "It depends on the destination. GCC and several African markets require chamber-of-commerce and consular legalization on top of the standard pack; Australia regulates charcoal under BICON and some markets request a phytosanitary certificate (the EU does not require one for fully carbonized charcoal); US entries require ISF data from us before the cargo loads. Tell us your destination and we will confirm the exact pack."

This repeats `countryReq.body` almost verbatim. Both are legitimate (one in prose, one in FAQPage schema), but the duplication is dense. Keep the FAQ answer (it carries the conversion close "Tell us your destination…") and instead tighten `countryReq.body` to remove the verbatim overlap, leaning on the import-guide links below it.

**Corrected (`countryReq.body`):**
```
"Destination requirements vary on top of the standard pack. Gulf and several African markets add chamber-of-commerce and consular legalization; the US needs ISF data from us before the cargo loads; Australia regulates charcoal under BICON. A phytosanitary certificate is requested by some markets but not the EU, which does not require one for fully carbonized charcoal. Open your destination's import guide below for the exact list."
```
(Same facts, no fabricated additions; ends by routing the reader to the per-country guides instead of restating the FAQ.)

## 4. Devil's Advocate section
N/A — this is a procedural reference page listing the export-document pack; it asserts no thesis for an opposing industry view to contest, so a Devil's Advocate H2 would be artificial.

## 5. Ontological completeness & triangulation
- **Genesis (factory as source):** Explicit and strong — every standard document names its issuer, and the factory (PT Coco Reina Global Charcoal Indonesia) is correctly shown as issuer of the invoice, packing list, MSDS, and DGD, while third parties (shipping line, Ministry of Trade/IPSKA, Bea Cukai, marine surveyor, accredited lab, buyer's insurer) are attributed for the rest. No gap.
- **Taxonomy (where this sits in charcoal classification):** Made explicit through the DG framing (UN 1361, Class 4.2, Packing Group III) and cross-links to /logistics/un-1361 and /logistics/charcoal-dg-regulation; the SHT note correctly positions the report as hazard evidence, not a reclassification route. Solid.
- **Pragmatics (buyer value):** Each document carries a buyer-use ("what your customs broker uses it for"); the at-a-glance box surfaces delivery mechanics (scans first, originals by courier). Pragmatics are the page's strongest dimension.
- **Weak connectivity to close:** The two list-section H2s currently have no lead sentence binding the heading to the items beneath them (entities listed but the section's own answer is unstated) — the §3a/§3b leads close this. The destination-requirements concept is duplicated across `countryReq.body` and FAQ item 3 (over-connected/redundant rather than under-connected) — §3d de-duplicates.
- **No isolated concepts:** Every document links out to its /glossary anchor (taxonomic anchoring) and the on-request docs link to their topical context (SHT→un-1361, insurance→cargo-protection). No orphaned entity.

## 6. Gaps needing owner data
None. Lab cost and processing time for the SHT report and COA are intentionally blank in `company.logistics.documentsAdditional[]` and the page correctly defers them to quotation ("Ask for the current lab cost and processing time at quotation") rather than stating a figure — no placeholder needed and none should be invented.
