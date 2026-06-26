# Content Audit & Targeted Rewrite — How to Order Coconut Charcoal Wholesale
**Route:** /guide/how-to-order-shisha-charcoal · **Source:** src/i18n/en/guide.json (en.guide.howToOrder)

This is a **procedural/reference page**: a 13-step inquiry-to-delivery backbone with an extractable answer-capsule, an OEM branch, per-country import links, and a /faq cross-link. The `.astro` top comment encodes deliberate decisions that are NOT gaps: NO FAQPage here (ordering Q/As are canonical on /faq), no escrow claimed (none offered), the OEM custom-packaging MOQ is honesty-gated (renders only when configured), and step 11 (documents handover) explicitly states FOB means the factory enables tracking but does not itself track. All numeric facts (port, MOQ, lead times, OEM MOQ) are token-driven from `src/config/company.ts` — none are hardcoded in the JSON. Audit reflects this.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|------|--------|-----------------|
| 1. Headings as questions | PARTIAL | Step titles are correct procedural-noun labels for a numbered `<ol>` ("Inquiry", "Production", "Booking & shipping") and map cleanly to buyer questions ("How do I start?", "How long does production take?"). The two non-step H2s ("The ordering process in brief", "The ordering process, step by step") and the two link-block H2s ("Common ordering questions", "Destination import guides") are statements, not questions. For a step-list this is defensible, but the capsule and FAQ-cross-link H2s could be question-form for snippet capture. Not a FAIL. |
| 2. Featured-snippet lead | PASS | The capsule (`capsule.body`) is a tight, self-contained, definition-style answer to "how do I order wholesale" with the whole sequence + MOQ in one paragraph. Every step `body` opens with a declarative lead sentence ("Start with a message on WhatsApp…", "A Certificate of Analysis is issued for every production batch…") before elaborating. Strong extractability. |
| 3. Paragraph intent | PASS | Each of the 13 steps serves one transactional/informational intent (how to inquire, how QC works, how DG packing works, how clearance works). OEM branch and country block serve distinct sub-intents (private-label path; destination mechanics). No stray paragraphs. |
| 4. No fluff + anti-bloat | PASS | Prose is dense and specification-led. No restated points, no adjective padding. Honesty caveats ("no escrow is claimed, because none is offered"; "the factory provides the data that enables tracking; it does not itself track") add information, not bloat. One borderline phrase flagged in §3 (compress, not delete). |
| 5. Section purity | PASS | Capsule = overview; steps = sequence; OEM = private-label branch (correctly nested under step 4, the PI); countries = destination mechanics (under step 12); FAQ-cross-link = pointer to /faq. No cluster bleed. |
| 6. Structure / coverage | PASS | Full inquiry→delivery→after-sales→reorder→claims coverage with no logic gap. Sequence is monotonic. The OEM branch and after-sales/claims close the two paths a real buyer asks about. No duplicated meaning across steps. |
| 7. Devil's Advocate | N/A | Procedural/reference page with no arguable thesis to oppose. A counter-section would be artificial. See §4. |
| 8. Quantified evidence | PASS | Claims that need numbers carry them, all token-sourced from company.ts: MOQ ({{moqLabel}}), port ({{portLabel}}), standard lead time ({{leadTimeLabel}}), new-brand lead time ({{newBrandLeadTime}} days), repeat-brand lead time ({{repeatBrandLeadTime}} days), OEM MOQ ({{oemMoq}}, honesty-gated). COA is correctly "per batch, not once per supplier". No fabricated figures. |
| 9. Mini-cases | N/A | No real, verifiable named-buyer case data exists on-site; the page correctly does not invent one. Step 6 already de-risks with concrete, verifiable mechanisms (audit/virtual tour on request, references available) instead of a fake testimonial. Correctly skipped. |
| 10. Ontological completeness | PASS | Genesis (factory-as-producer "We produce to that spec", Semarang/{{portLabel}} origin via capsule), Taxonomy (coconut shell shisha charcoal as a UN 1361 Class 4.2 dangerous good), and Pragmatics (de-risked first order, per-batch COA, verification-first) are all explicit. Dense entity graph: COA↔spec↔QC, UN 1361↔SP 978↔SDS↔DG declaration, FOB↔forwarder↔tracking, OEM↔artwork↔MOQ. Minor connectivity note in §5. |

**Overall: strong, honesty-clean page. Score 90/100.** The only real, non-cosmetic gaps are heading question-form on the four statement-style H2s and one mild compression — neither is a factual or trust defect.

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "Ordering coconut shisha charcoal from Indonesia…" (capsule) | "how does ordering coconut charcoal wholesale work" — overview/snippet | keep |
| "Start with a message on WhatsApp…" (step 1 Inquiry) | "how do I start an inquiry / what info to send" | keep |
| "Request samples and burn-test them…" (step 2 Samples) | "can I get samples / do I test before ordering" | keep |
| "Pin the specification before production…" (step 3 Spec) | "what is agreed before production / QC baseline" | keep |
| "With the spec locked, we issue a Proforma Invoice…" (step 4 PI) | "what Incoterm / when is the deposit / PI" | keep |
| "Ordering under your own brand adds…" (OEM branch) | "how does private-label ordering differ / MOQ" | keep |
| "Your order is manufactured to the agreed…" (step 5 Production) | "how long is production / first vs repeat" | keep |
| "Confirm the order with a deposit…" (step 6 Confirmation) | "is the deposit safe / how is first order de-risked" | keep |
| "A Certificate of Analysis is issued…" (step 7 COA) | "how is each batch verified / is COA per batch" | keep |
| "Coconut charcoal ships as a dangerous good…" (step 8 DG packing) | "how is charcoal packed / UN 1361 / SDS" | keep |
| "You may appoint an independent inspector…" (step 9 PSI) | "can I inspect before shipment / SGS Intertek" | keep |
| "Under {{portLabel}} your forwarder books…" (step 10 Booking) | "who books the vessel / FOB vs CFR/CIF" | keep |
| "Once the vessel departs, the full document set…" (step 11 Docs) | "what documents do I get / can the factory track" | keep |
| "Arrival and customs clearance are handled…" (step 12 Clearance) | "who clears customs / destination mechanics" | keep |
| "Country-specific import mechanics…" (countries block) | "import to USA/UK/Germany/Saudi/Russia" — destination | keep |
| "After delivery, reorders are faster…" (step 13 After-sales) | "how do reorders / claims work" | keep |
| "Minimum order, payment terms, production capacity…" (faqBlock) | "where are the FAQ-style answers" — navigational | keep |

Every block maps to a distinct buyer question. No delete-as-fluff rows.

## 3. Targeted rewrites

Only real gaps below. Most of the page passes and is left untouched.

### 3a. Rule 1 — Heading question-form (capsule H2)
The capsule is the page's primary snippet target; a question H2 captures "how to order" queries better than a noun phrase.

**Current** (`howToOrder.capsule.heading`):
> "The ordering process in brief"

**Corrected:**
> "How do you order coconut charcoal wholesale?"

(Body unchanged — it already answers this directly.)

### 3b. Rule 1 — Heading question-form (FAQ cross-link H2)
**Current** (`howToOrder.faqBlock.heading`):
> "Common ordering questions"

**Corrected:**
> "What are the most common ordering questions?"

(Body and link unchanged.)

### 3c. Rule 1 — Optional: steps heading question-form
Lower priority (the `<ol>` numbering already signals procedure), include only if you want the H2 to win "step by step" queries.

**Current** (`howToOrder.stepsHeading`):
> "The ordering process, step by step"

**Optional corrected:**
> "What are the steps to order, from inquiry to delivery?"

### 3d. Rule 4 — Mild compression (step 6 de-risk sentence)
The clause "This is the point first-time buyers worry about, so it is deliberately de-risked" front-loads narration before the concrete mechanisms. Tighten so the verifiable proof leads. (Honesty caveat preserved verbatim.)

**Current** (`howToOrder.steps[5].body`):
> "Confirm the order with a deposit and your production slot is reserved, with balance terms set on your PI. This is the point first-time buyers worry about, so it is deliberately de-risked: your samples are already evaluated, a factory audit and virtual tour are available on request, and references can be provided — no escrow is claimed, because none is offered."

**Corrected:**
> "Confirm the order with a deposit and your production slot is reserved, with balance terms set on your PI. This deposit step is deliberately de-risked: your samples are already evaluated, a factory audit and virtual tour are available on request, and references can be provided — no escrow is claimed, because none is offered."

(Removes the "first-time buyers worry about" narration; keeps every fact and the escrow honesty-gate.)

### 3e. Rule 10 — Optional Genesis sharpening (capsule)
The capsule says "from Indonesia" but never names the factory's port-of-loading entity inline; the token already injects `{{portLabel}}` later in the same paragraph, so Genesis is present. No change required — flagged only as a candidate if you ever want the factory name itself surfaced in the capsule. **No rewrite proposed** (would risk hardcoding a fact that belongs in company.ts).

No other rewrites. Steps 1–5, 7–13, the OEM branch, the countries block, and the related-topics list pass as written.

## 4. Devil's Advocate section

**N/A —** this is a procedural inquiry-to-delivery reference with no arguable thesis; the "strongest opposing view" would have to oppose the existence of an ordering process, which is not a real industry debate. The closest legitimate buyer objection — "isn't paying a deposit to an overseas factory risky?" — is already met head-on inside step 6 with concrete, on-site mechanisms (pre-evaluated samples, audit/virtual tour on request, references) and the honest disclosure that no escrow is offered. Manufacturing a separate counter-H2 would duplicate that and add bloat.

## 5. Ontological completeness & triangulation

- **Genesis (factory-as-source): explicit.** Capsule "We produce to that spec…", step 5 "manufactured to the agreed specification", origin via {{portLabel}}/Indonesia. The producing entity is the actor throughout, not a faceless trader.
- **Taxonomy (charcoal classification): explicit.** Coconut shell shisha charcoal is positioned as a UN 1361 Class 4.2 self-heating dangerous good (step 8), packed under SP 978 — correct material class, no coal/coke standard contamination.
- **Pragmatics (buyer value): explicit.** Verification-first framing, per-batch COA as cross-container proof, de-risked deposit, faster reorders — each tied to a concrete buyer benefit.
- **Weak-connectivity note 1:** Step 3 establishes the spec as "the QC baseline your per-batch COA is later measured against" and step 7 closes that loop — good. But the COA entity is not linked back to the *sample* COA introduced in step 2 (each sample "ships with its Certificate of Analysis"). A one-clause bridge in step 7 ("the same document standard you saw on the sample COA in step 2") would tie the two COA instances into one entity for AI extraction. Optional, not required.
- **Weak-connectivity note 2:** The OEM branch names artwork→proof→produce and the custom-packaging MOQ, but does not explicitly connect its MOQ to the container-level MOQ ({{moqLabel}}) — i.e. that custom-print MOQ is *per printed design*, not per container (company.ts `customPrint.moqBasis`). The honesty-gated `moqLineTemplate` already states the value; adding the per-design basis would prevent a buyer mis-reading it as a second container minimum.
- **Triangulation verdict: passes.** All three vertices are made explicit in the rendered body; gaps above are connectivity polish, not missing nodes.

## 6. Gaps needing owner data

- None. Every number on the page (MOQ, port, standard/new-brand/repeat-brand lead times, OEM custom-packaging MOQ) is already supplied from `src/config/company.ts` via the interpolation tokens; no rewrite in §3 introduces a figure that is not already on the page or in config. No `<NEEDS-OWNER-DATA>` placeholders required.
