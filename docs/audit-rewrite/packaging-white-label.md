# Content Audit & Targeted Rewrite — White-Label Packaging
**Route:** /packaging/white-label · **Source:** src/i18n/en/packagingWhiteLabel.json (en.packagingWhiteLabel)

Scope note: this is a hybrid page — a procedural/reference cluster page (how white-label works, what you can brand, file specs, timeline, prices) that also carries a short business-case thesis ("move from neutral to branded once volume is established," `whyPrivateLabel`). It is judged on both fronts. Many template specifics (printMethod, printingEquipment, colorCapability, customPrint.moqUnits, leadTimeAddDays, finishesAvailable, sampleCost, bleedSafeArea, prepressBy, brandsProducedCount, all add-on prices) are EMPTY in src/data/company.json and degrade gracefully — the conditional fragments and price rows drop or read "Available on request." The audit treats those as deliberate omissions, not fluff, and never fabricates a value to fill them.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | FAQ H-items are clean questions. Section H2s are noun labels ("Finishes", "Why private-label", "Brands we produce") that map to buyer questions but aren't phrased as them. Several map cleanly (`meaning.h2` "What white-label means" ≈ "what is it"; `surfaces.h2` "What you can brand" is already a question-shaped phrase). Reference pages legitimately use scannable noun headings; rewrites below are optional upgrades, not failures. |
| 2. Featured-snippet lead | PASS | Every section opens with a self-contained 1–2 sentence answer before elaborating: `meaning.p1`, `surfaces.p1`, `finishes.p1`, `moq.p1`, `proofSample.p1`, `exclusivity.p1`, `retail.p1`. Strong. One soft spot: `production.p1` leads with a generic "printed to commercial standards" before the substance — see Rule 4. |
| 3. Paragraph intent | PASS | Each paragraph serves one identifiable buyer intent (see Intent map §2). No stray paragraphs. |
| 4. No fluff + anti-bloat | PARTIAL | Mostly tight. Two soft spots: `production.p1` opening ("Branded packaging is printed to commercial standards.") is filler given the empty printMethod data; and `whyPrivateLabel.p2` restates p1 ("durable, qualitative advantages — brand recognition compounds") then repeats the neutral→branded arc already stated in `meaning.p2` and again in the thesis. Compressible without losing fact. |
| 5. Section purity | PASS | Clusters are clean: meaning, surfaces, print, finishes, artwork, exclusivity, MOQ, proof, timeline, retail, business-case, how-to, brands, prices each hold one intent. Minor: `moq.p1` carries "multiple designs in one container," which also lives in the FAQ — duplication, not bleed (see Rule 6). |
| 6. Structure / no duplicated meaning | PARTIAL | Coverage is complete and ordered logically. But the neutral-vs-white-label distinction is stated 3× (`meaning.p2`, `whyPrivateLabel.p2`, implicitly in the hub link) and the seven-step flow appears twice in near-identical form (`howToStart.steps` and the `proofSample`/`timeline` proof→sample→approve→print→ship chain and again FAQ "How do I get started?"). The repetition is partly by design (FAQ is self-contained for snippet/AI extraction), but `whyPrivateLabel.p2`'s restatement is avoidable. |
| 7. Devil's Advocate | FAIL | The page makes a clear directional claim ("most serious importers move from neutral to branded once volume is established," `whyPrivateLabel.p2`) but never states the strongest opposing view — that branded/private-label adds MOQ-per-design, cost add-ons, lead time, and ties up working capital, so many importers rationally stay neutral. A balanced rebuttal using on-site facts is available (single-container-OK, per-design MOQ, reorder speed, exclusivity). Drafted in §4. |
| 8. Quantified evidence | PARTIAL | The numbers that ARE on the page are concrete and used well: proof 7 days, first order ~21 days, reorder ~14 days, MOQ 18 t / one 20ft container, formats AI/PDF, CMYK. But several benefit claims lean on facts that are empty in data and so render unquantified: "printed to commercial standards" (no method shown), finishes "priced separately" (no prices render), "brands we produce" (count empty). This is honest graceful-degrade, not a defect to fabricate around — flagged as owner-data gaps in §6, never filled. |
| 9. Mini-cases | N/A | No real, verifiable problem→action→result customer case exists on the page or in company.ts (`brandsProducedCount` is empty; brand examples are explicitly anonymized/by-permission). Correctly omitted — do NOT invent one. |
| 10. Ontological completeness | PASS | Dense entity/relation coverage: Genesis (we manufacture, you supply artwork — stated in hero, `meaning.p1`, service node), Taxonomy (white-label vs private-label vs OEM synonyms unified once; white-label vs neutral distinction; positioned within the packaging layer system via up-link and surface links), Pragmatics (buyer value explicit throughout — exclusivity, single-container, reorder speed). Links to inner-box, master-box, plastic, consumables, UN 1361, glossary, samples. Strong internal graph. |

**Original-page score: 86/100** — a strong, honest, well-structured reference page. The only true gap is the missing Devil's Advocate section (Rule 7); the rest are minor compression and optional heading-to-question upgrades.

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "White-label production — also called private-label" (heroSubtitle) | Define the service + synonym disambiguation (white/private/OEM) | keep |
| "White-label means we manufacture the charcoal" (meaning.p1) | "what is white-label charcoal" definition | keep |
| "That is the difference from neutral" (meaning.p2) | "white-label vs neutral packaging" | keep |
| "Your brand can run across every layer" (surfaces.p1) | "what packaging can I brand" | keep |
| "Branded packaging is printed to commercial" (production.p1) | "what print quality / methods" | compress (generic lead) |
| "Finishes form a ladder: a base" (finishes.p1) | "what finishes are available + cost structure" | keep |
| "We print buyer-supplied artwork to print-ready" (artwork.p1) | "what artwork files do you need" | keep |
| "Your artwork and design are exclusive" (exclusivity.p1) | "is my design exclusive / NDA" | keep |
| "Product or territorial exclusivity" (exclusivity.p2) | "do I get market/territory exclusivity" | keep |
| "The custom-print minimum is framed per" (moq.p1) | "minimum order to start my brand" | keep |
| "Before any production run, your packaging" (proofSample.p1) | "do I see a proof / sample before production" | keep |
| "A first branded order and a reorder" (timeline.p1) | "how long does a branded order take" | keep |
| "Retail packaging carries your barcode/EAN" (retail.p1) | "retail-ready / barcode / market markings" | keep |
| "You own your market's labeling" (retail.p2) | "who handles regulatory compliance/labeling" | keep |
| "A private label turns a commodity" (whyPrivateLabel.p1) | "why go private-label / business case" | keep |
| "These are durable, qualitative advantages" (whyPrivateLabel.p2) | reinforce business case | compress (restates p1 + meaning.p2) |
| "Seven steps from first contact" (howToStart.intro + steps) | "how do I start my own charcoal brand" | keep |
| "We manufacture for established coconut-charcoal brands" (brands.p1) | social proof / "have you done this before" | keep |
| "Custom-print prices are add-ons on top" (prices.intro) | "how much does branding cost" | keep |
| FAQ items q/a ×10 | direct buyer questions (snippet/AI extraction) | keep |
| (absent) Devil's-advocate "should I stay neutral instead" | objection-handling at the decision point | rewrite (add — see §4) |

## 3. Targeted rewrites

Only real gaps below. Sections not listed already pass and should be left as-is.

### 3.1 Rule 4 — compress generic lead (`production.p1`)
The opening clause carries no information (all packaging is "printed to commercial standards") and the method/equipment specifics are empty in data, so the concrete content is thin. Tighten the lead to the buyer-relevant facts that actually render (per-order spec, FSC on request).

CURRENT (`production.p1`):
> "Branded packaging is printed to commercial standards. Print method, press capability, and paper stock are specified per order; FSC-certified paper is available on request."

CORRECTED:
> "Print method, press capability, and paper stock are specified per order to match your artwork and run size; FSC-certified paper is available on request."

### 3.2 Rule 4 / Rule 6 — de-duplicate the business case (`whyPrivateLabel.p2`)
p2 restates p1's "durable advantages" and re-tells the neutral→branded arc already made in `meaning.p2`. Keep the one genuinely new fact (the decision trigger: established volume) and drop the restatement.

CURRENT (`whyPrivateLabel.p2`):
> "These are durable, qualitative advantages — brand recognition compounds with every container — and they are the reason most serious importers move from neutral to branded once volume is established."

CORRECTED:
> "Most importers make this move once their volume is established and the per-design custom-print minimum is easy to absorb — which is why a single branded container is enough to start, with no recurring commitment."

(Rationale: replaces the self-referential "durable advantages" sentence with a concrete, on-site fact — `whiteLabel.singleContainerOk` and `customPrint.moqBasis` "per-design" — that also pre-empts the cost objection and bridges into the Devil's-Advocate section in §4.)

### 3.3 Rule 1 — optional heading-to-question upgrades
The page's noun headings are acceptable for a reference page, but these three map to high-intent buyer questions and read more naturally as questions for snippet/AI extraction. Apply only if the editor wants question-form H2s consistently.

| Field | CURRENT | CORRECTED (question form) |
|---|---|---|
| `production.h2` | "Print methods & quality" | "What print methods and quality can I expect?" |
| `finishes.h2` | "Finishes" | "What finishes are available?" |
| `whyPrivateLabel.h2` | "Why private-label" | "Why sell under your own private label?" |
| `brands.h2` | "Brands we produce" | "Have you produced for other brands?" |

(`moq.h2` "Minimum to start your brand", `exclusivity.h2`, `retail.h2`, `artwork.h2`, `timeline.h2`, `proofSample.h2` are already clear intent labels and can stay.)

### 3.4 Rule 7 — add the Devil's-Advocate section
No counter-view section exists. Add a new namespace block and render it after `whyPrivateLabel` (before `howToStart`). Full drafted copy in §4 — it uses only facts already on the page/in company.ts.

## 4. Devil's Advocate section

The page's thesis: serious importers should move from neutral to branded (private-label) packaging once volume is established. Drafted complete section below, ready to paste as a new `objection` namespace block and render between `#why-private-label` and `#how-to-start`. Every claim in the rebuttal is sourced to facts already on the page or in src/config/company.ts — no new numbers introduced.

**JSON (new `objection` block):**
```json
"objection": {
  "h2": "Should you just stay with neutral packaging instead?",
  "p1": "The honest counter-argument: branding is not free. A private label adds a per-design custom-print minimum on top of the order MOQ, print and finish add-ons on top of the charcoal FOB price, and extra lead time for proofing and sampling — about {{newBrandLeadTime}} days on a first order versus shipping neutral stock you can reorder immediately. For a trader who competes purely on landed price, or who is still testing whether the charcoal sells in their market, neutral packaging is the rational choice, and that view genuinely holds at low volume and on the very first shipment.",
  "p2": "It stops holding once you intend to reorder. The custom-print minimum is framed per printed design — not per container — and a single branded container is fine, with no recurring commitment, so the entry cost is one run, not a standing obligation. Your artwork is exclusive to you and held on file with the plates, so reorders skip design and proofing and ship in about {{repeatBrandLeadTime}} days rather than {{newBrandLeadTime}}. The added cost is the printing add-on, quoted on top of the same charcoal price you would pay neutral — you are not buying a different product, only your name on it. Neutral wins the first test order; branded wins every container after the brand starts pulling repeat demand."
}
```

**Render (white-label.astro, new section after `#why-private-label`, mirroring existing two-paragraph section markup):**
```astro
{/* Devil's advocate — neutral vs branded at the decision point. */}
<section id="stay-neutral" aria-labelledby="objection-heading" class="scroll-mt-24 bg-neutral-50">
  <div class="mx-auto max-w-5xl px-4 py-12 md:px-8">
    <h2 id="objection-heading" class="text-2xl font-bold text-neutral-900 md:text-3xl">{t.objection.h2}</h2>
    <p class="mt-4 max-w-prose text-base leading-relaxed text-neutral-700">{fill(t.objection.p1, tokens)}</p>
    <p class="mt-3 max-w-prose text-base leading-relaxed text-neutral-700">{fill(t.objection.p2, tokens)}</p>
  </div>
</section>
```
(Tokens `newBrandLeadTime`=21 and `repeatBrandLeadTime`=14 already resolve via lib/interpolate.ts; no new data needed. If §3.2 is applied, this section should follow it so the "single container" bridge lands first.)

## 5. Ontological completeness & triangulation

- **Genesis — explicit and strong.** "We manufacture the charcoal and you sell it under your brand" (`meaning.p1`), the service node, and the seven-step flow all anchor the factory as source and the buyer as brand-owner. No gap.
- **Taxonomy — explicit.** Three synonyms (white-label / private-label / OEM) unified once (`heroSubtitle`, FAQ q1); white-label positioned against neutral (`meaning.p2`) and within the packaging-layer system (inner box → master box → plastic → consumables, all linked). One soft spot: the page never explicitly ties back to the *charcoal* taxonomy (coconut-shell shisha charcoal as the underlying product) beyond the title — a one-clause reminder that the branded product is the same coconut-shell briquette would strengthen the entity link to the products pillar (it already links to `/products`).
- **Pragmatics — explicit.** Buyer value is named at every node: exclusivity + NDA, single-container entry, per-design MOQ, reorder speed, retail-readiness, who-owns-compliance. The Devil's-Advocate addition (§4) closes the one pragmatic blind spot — when NOT to brand.
- **Weak-connectivity entities to close:** (a) *finishes* and *prices* are described qualitatively ("priced separately," "add-ons") but the price rows render "Available on request," leaving the finish→cost relation unquantified — owner-data gap, not a writing fix. (b) *brandsProducedCount* / "brands we produce" is an isolated social-proof node with no number behind it (empty in data) — currently honest but thin; flagged in §6.
- **Triangulation verdict:** Genesis ✓, Taxonomy ✓ (minor product-link reinforcement optional), Pragmatics ✓ (complete once §4 added). The page is ontologically dense; gaps are missing *data*, not missing *relations*.

## 6. Gaps needing owner data

These are empty in src/data/company.json and the page already degrades gracefully (fragments drop / "Available on request"). Listed so the owner can populate them and convert qualitative claims into quantified evidence (Rule 8). Do NOT fabricate any of these.

- `<NEEDS-OWNER-DATA: whiteLabel.printMethod / printingEquipment / colorCapability>` — print method, press, and color capability (so `production.methodLineTemplate` / `equipmentLineTemplate` render instead of dropping).
- `<NEEDS-OWNER-DATA: customPrint.moqUnits>` — the actual per-design custom-print minimum (currently the at-a-glance "Custom-print MOQ" and `moq.moqLineTemplate` drop; FAQ says "confirmed on inquiry").
- `<NEEDS-OWNER-DATA: customPrint.leadTimeAddDays>` — print lead-time add-on in days (at-a-glance "Print lead time" row drops).
- `<NEEDS-OWNER-DATA: customPrint.finishesAvailable[]>` — explicit finishes list (so `finishes.finishesLineTemplate` renders the available set).
- `<NEEDS-OWNER-DATA: proofing.sampleCost + sampleCreditedToOrder>` — sample cost and whether credited (the proof section currently omits both; FAQ says "confirmed on inquiry").
- `<NEEDS-OWNER-DATA: branding.bleedSafeArea + branding.prepressBy>` — artwork bleed/safe-area spec and prepress owner (artwork section lines drop).
- `<NEEDS-OWNER-DATA: whiteLabel.brandsProducedCount>` — number of brands produced (the "Brands we produce" count line and at-a-glance "Brands produced" render empty; converts thin social proof into quantified evidence).
- `<NEEDS-OWNER-DATA: pricing.* add-on rates>` — inner-box/plastic per-kg printing, lamination/emboss/UV/foil/double-wall per-ton surcharges (entire price table renders "Available on request"; populating even one makes the "headline price" and finish-cost relation concrete).
