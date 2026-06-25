# Content Audit & Targeted Rewrite — Shipping Rules & Incoterms
**Route:** /logistics/rules · **Source:** src/i18n/en/logisticsRules.json, src/i18n/en/logisticsCommon.json (en.logisticsRules)

This is a **procedural/reference cluster page** under the Logistics pillar. It answers four buyer questions in sequence — how a container is loaded, which incoterms apply, how payment and the order process work, and how a DG sailing is booked — plus a "Ordering at a glance" facts box, a 5-step order HowTo, a 2-item FAQ, and a related-topics block. The page emits WebPage + FAQPage + HowTo schema by design. All commercial facts resolve from `company.json` via `companyTokens()` / `logisticsTokens()`; none are hardcoded in prose.

**Fact-resolution check (every interpolated claim traces to `company.json`):**
- `incotermDefault` → `commercial.portOfLoading.incoterm` = **FOB**; `incotermsList` → `logistics.incoterms` = **EXW / FOB / CFR / CIF**. The interface doc-comment at `company.ts:354` ("No CIF (v3.3)") is **stale** — the live JSON array includes CIF, so the page's "CIF … available on request" is data-backed, not invented. (Flagged in §6 as a doc-comment cleanup, not a content fix.)
- `paymentTerms` = "50% T/T advance, 50% T/T 3 days before loading" → matches the deposit / balance-before-loading prose exactly.
- `leadTimeLabel` = 14–21 days (newBrand 21, repeat 14) → backs "Production runs {{leadTimeLabel}} for a 20ft container."
- `net20ftTons` = toTons(18000) = **18** → backs the FAQ "about 18 net in a 20ft."
- `moqLabel` = "18 tons (one 20ft container)"; `unClass` = **4.2**; UN 1361. All backed.
- `loading.mixedSizesPolicy` is empty in JSON → `hasFact()` is false → KeyFactsBox correctly falls back to `t.loading.mixedSizesNote`. No fabrication.

No fabricated numbers, certs, cases, or capabilities found.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | Four section H2s are noun-phrase labels: "How containers are loaded", "Incoterms we offer", "Payment terms & process", "Booking & vessel schedule". The first maps cleanly to a buyer question; the other three read as topic labels. The 2-item FAQ is fully question-form. Section H2s can be question-mapped without losing the anchor (see §3). Not a failure — defensible for a reference page — but upside exists. |
| 2. Featured-snippet lead | PASS | Every section opens with a self-contained answer before elaboration: loading.body leads with "ships as a full-container load only"; incoterms.body leads with "Our default sales basis is FOB Semarang"; payment.body leads with the terms; booking.body leads with "must be booked as declared dangerous goods." KeyFactsBox carries a definition line. Clean snippet bait throughout. |
| 3. Paragraph intent | PASS | No stray paragraphs. intro.p1 = scope + the four-rule thesis in one sentence. Each section body serves one intent (load mechanics / incoterm split / payment+process / DG booking). The 5 HowTo steps each carry one process beat. Intents named in §2. |
| 4. No fluff + anti-bloat | PASS | Specification-dense, no restatement padding. One deliberate reinforcement: the insurance/inherent-vice split appears in both `incoterms.body` and `incoterms.cifNote`. The cifNote adds the load-bearing "inherent-vice (self-heating) stays excluded under any term," which the body does not state — so it is elaboration, not a restatement. Keep. |
| 5. Section purity | PASS | Each H2 holds one cluster: loading mechanics, incoterm risk/insurance split, payment+order process, DG booking+schedule. The FCL/DG rationale appears in both loading.body and the FAQ, but each frames a distinct facet (why MOQ exists vs. how a DG sailing is booked), not bleed. |
| 6. Structure | PASS | No logic gaps. Covers the full commercial arc the intro promises: load → incoterms → payment/process → booking, then closes with the order HowTo and FAQ. The HowTo (proforma → deposit → production → balance → docs released) completes the loop the payment intro opens. No duplicated meaning beyond the deliberate DG reinforcement. |
| 7. Devil's Advocate | N/A | Procedural/reference page. Its only contestable implicit claim ("FCL-only / DG-only, no LCL groupage") is a regulatory consequence, not an arguable thesis. A short rebuttal block is optional upside, drafted in §4; absence is not a failure. |
| 8. Quantified evidence | PASS | Dense, all config-sourced: MOQ 18 t, FCL-only, Class 4.2 / UN 1361, default FOB + four incoterms, 50/50 T/T split, 14–21-day lead time, ~18 net tons / 20ft, ISPM-15 / 16,000 kg palletized payload implied via packaging. Strong AI-citation surface. No claim lacks a number where a number exists. |
| 9. Mini-cases | N/A | No customer case is claimed or implied. Correct for a reference page; fabricating one would breach the honesty guardrail. Not a gap. |
| 10. Ontological completeness | PASS | Genesis (factory ships FOB Semarang / IDSRG), Taxonomy (UN 1361, Class 4.2 self-heating dangerous goods → forces FCL + DG booking), and Pragmatics (buyer's incoterm/insurance liability, payment cadence, booking lead time) are all explicit and cross-linked to packaging, cargo-insurance, DG-regulation, shipping-lines, documents, and import-to-USA. See §5 for two weak edges. |

**Net:** a strong, honest, tightly-structured reference page. The only substantive opportunity is question-mapping the three label-style section H2s (§3); everything else passes. Original-page compliance is high.

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| heroSubtitle "The commercial rules of a container…" | Scope anchor ("what are the rules of ordering a charcoal container") | keep |
| intro.p1 "This page sits under the…" | Orientation + the four-rule thesis (FCL / incoterms / staged payment / DG booking) | keep |
| keyFacts.definition "The commercial parameters of a container order." | Scannable planning summary ("ordering facts at a glance") | keep |
| loading.body "UN 1361 coconut charcoal ships as…" | "How is the container loaded / why FCL only / floor-stuffed vs palletized?" | keep |
| loading.mixedSizesNote "Within a single grade…" | "Can I mix sizes in one container?" | keep |
| incoterms.body "Our default sales basis is FOB…" | "Which incoterms do you offer / what does FOB cover / who insures?" | keep |
| incoterms.cifNote "Under EXW, FOB and CFR insurance…" | "Who arranges marine insurance and what's excluded?" | keep |
| payment.body "Default terms: 50% T/T advance…" | "What are the payment terms / do you publish bank details?" | keep |
| payment.steps (5) "Proforma invoice & KYC … Documents released" | "What is the order process step by step?" | keep |
| booking.body "Charcoal must be booked as declared…" | "How is a DG sailing booked / does it add lead time?" | keep |
| faq.q1 "Are master boxes loaded loose…" | "Loose-stuffed or palletized — what's the payload tradeoff?" | keep |
| faq.q2 "How is a dangerous-goods sailing booked?" | "How does DG booking work and does it slow my order?" | keep |
| related.items | Internal-link cluster (documents, DG, carriers, insurance, import, packaging) | keep |

No paragraph flagged compress / delete-as-fluff.

## 3. Targeted rewrites

Only the heading-question gap is a real shortfall. The four section H2s below can be reframed as the buyer questions they already answer, without breaking the anchor IDs (`loading`, `incoterms`, `payment`, `booking` stay). The featured-snippet leads under each already pass, so only the H2 strings change.

### Rule 1 — Headings as questions

**`loading.h2`** — current already maps well; tighten to the explicit question.
Current:
> "How containers are loaded"

Corrected:
> "How is a charcoal container loaded?"

**`incoterms.h2`** — currently a label; the body answers "which incoterms and who insures."
Current:
> "Incoterms we offer"

Corrected:
> "Which incoterms do you offer?"

**`payment.h2`** — note: this string is also the HowTo schema `name` (`howTo.name = t.payment.h2`). A question works as a HowTo name, but if a noun phrase is preferred for schema, keep the label and add the question intent in the snippet lead instead. Recommended question form:
Current:
> "Payment terms & process"

Corrected:
> "What are the payment terms, and how does the order process work?"

**`booking.h2`** — currently a label; the body answers "how is a DG sailing booked and does it add time."
Current:
> "Booking & vessel schedule"

Corrected:
> "How is a dangerous-goods sailing booked?"

No other rewrites required — leads, paragraph intent, anti-bloat, section purity, structure, quantified evidence, and ontological coverage all pass on the original text.

## 4. Devil's Advocate section

N/A — this is a procedural/reference page. It states settled commercial rules (FCL-only, default FOB with four incoterms, 50/50 T/T, DG booking), not an arguable thesis. Its one contestable implicit claim — "there is no LCL/groupage route; the order must be a full container" — is a regulatory consequence of Class 4.2 self-heating cargo, not a position a reasonable industry counter-thesis disputes. (An optional one-paragraph "why no LCL" rebuttal could pre-empt the buyer who has been offered groupage by a cheaper supplier, using only the on-page fact that Class 4.2 DG cannot share an LCL box — but the loading section already states this, so a dedicated section would be redundant.)

## 5. Ontological completeness & triangulation

- **Genesis (factory-as-source):** Explicit — the factory ships FOB Semarang (IDSRG), issues the proforma/BoL, and arranges DG booking during production. Strong. Minor edge: the port name renders via the incoterm token but the page never names Tanjung Emas/IDSRG in prose the way the pillar hub does; the UN/LOCODE only surfaces in the meta description, not the body. Closing it would tighten the geo-entity link, but it is reinforced by sibling pages.
- **Taxonomy (charcoal classification):** Explicit and load-bearing — UN 1361, Class 4.2, dangerous goods — and correctly drives every rule (FCL-only, DG booking, insurance exclusion of self-heating). This is the page's strongest entity spine.
- **Pragmatics (buyer value):** Explicit — incoterm risk-transfer point, who arranges insurance, payment cadence, booking lead time, payload tradeoff (loose vs palletized). Clear actionable value.
- **Weak edge — packing group:** The page cites Class 4.2 and UN 1361 but never the packing group (PG III is a VERIFIED, render-able fact per `company.ts:362` and appears on the pillar hub). Adding "Packing Group III" to loading.body or the FAQ would deepen the DG entity without inventing anything. Optional enrichment, not a defect.
- **Weak edge — insurance bridge:** `incoterms.cifNote` introduces "inherent-vice (self-heating)" exclusion, then links to cargo-protection. The entity is well-connected, but the self-heating concept is dropped without naming that it is the same Class 4.2 self-heating property that forces DG booking two sections later — a one-clause cross-reference would unify the two isolated mentions into one chain.

## 6. Gaps needing owner data

- **None blocking.** No `<NEEDS-OWNER-DATA>` placeholder is required — every claim on the page resolves to a real value in `company.json`.
- **Non-content cleanup (not a page fix):** the interface doc-comment `company.ts:354` reads "No CIF (v3.3)" while the live `logistics.incoterms` array and the page both include CIF. The comment is stale and should be corrected to avoid a future editor "fixing" the page by removing the (correct) CIF offer. This is a source-comment maintenance note, outside this audit's write scope.
- **Optional enrichment (owner confirm, do not assume):** whether Packing Group III should be surfaced in prose on this page (it is verified in config); and whether the floor-stuffed vs. palletized payload figures (~18,000 kg vs ~16,000 kg, both in `commercial.containerCapacity.ft20`) should be stated numerically in the FAQ answer rather than the current qualitative "maximizes payload / reduces payload." Both are data-backed if the owner wants them rendered; neither is a fabrication risk.
