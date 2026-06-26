# Content Audit & Targeted Rewrite — Master Box
**Route:** /packaging/master-box · **Source:** src/i18n/en/packagingMasterBox.json (en.packagingMasterBox)

This is a **cluster reference page** for one entity (the master carton). It is mostly procedural/specification content, but it carries one defensible thesis — *the master box is the structural layer (it decides whether cartons arrive square), and neutral and branded cartons are equally compliant* — which is the right target for the Devil's-Advocate test (§4).

**Render note (load-bearing for this audit):** Most physical specs are **empty in `company.json`** and the `.astro` correctly omits them rather than inventing values. As of this audit, `masterBox.outerDimsMm`, `grossWeightKg`, `holdsExample`, `cartonStrength.{ect,burstKpa,fluteType,corrugateGsm}`, `maxStackHeight`, `printOptions`, and both relevant `pricing.*` rows are blank. So on the live page: the carton-strength spec line, outer-dimensions line, and gross-weight row **do not render**; the "Holds" value is the **derived-by-net-weight** fallback ("a 20 kg master box corresponds to 20 × 1 kg or 40 × 500 g inner boxes"); and the double-wall and strapping prices show "Available on request." Resolved tokens used below: `masterBoxSizes` = "10 kg or 20 kg", `masterBoxWallOptions` = "single- or double", `containerNetKg` = "18,000", `boxesPerContainerExample` = "1,800 × 10 kg or 900 × 20 kg", `acceptedArtworkFormats` = "AI / PDF", `proofTimeDays` = 7, UN = "UN 1361" / Class "4.2" / "spontaneous combustion". This is correct honesty-gate behavior, not a defect — but it means several "specs" on the page are present only as promises-to-confirm. See §6.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | Section H2s are noun phrases ("Definition & construction", "Single vs double wall", "Dimensions & weights", "Container loading", "Compliance & markings", "Neutral vs branded master box"). They map cleanly to buyer questions and serve as scan anchors, which is acceptable on a spec page. The **FAQ block is fully question-form and strong** (9 direct buyer Qs covering definition, material/strength, sizes, holds, printing, neutral, loading, markings, custom/sample). Flagged PARTIAL because 3–4 H2s could be sharpened to their underlying question at zero cost (see §3). |
| 2. Featured-snippet lead | PASS | Every section opens with a self-contained answer before elaborating: heroSubtitle ("A master box, also called a master carton, is the corrugated outer shipping carton that carries coconut shisha charcoal…"), construction.p1 ("A master box is the structural layer of the packaging system…"), walls.p1, dims.p1, printing.p1, container.p1, compliance.p1, neutralVsBranded.p1. Extractable definition-form leads throughout — strong for GEO. |
| 3. Paragraph intent | PASS | Every paragraph serves one identifiable buyer intent (see §2). No intent-free prose. |
| 4. No fluff + anti-bloat | PASS | Copy is dense and specification-led. One mild near-restatement: the "confirmed with the quote" caveat recurs across construction.p2, dims.p1/p2, dims caption, and several FAQ answers. It is load-bearing each time (specs really are empty in config, so each instance is honest signposting, not padding) — but it is the page's single repeated phrase; see §3 for an optional tightening. No deletable filler found. |
| 5. Section purity | PASS | Each H2 holds one cluster: construction (material + strength), walls (single vs double), dims (sizes/weights/holds), printing (branding on the carton), loadSecuring (strapping/pallet), container (loose-load count), compliance (markings), neutralVsBranded (decision + proof). The double-wall **price** sits under "Single vs double wall" (correct — it is the wall upgrade), not under a pricing section. No bleed. |
| 6. Structure | PASS | Logical arc: definition → construction → wall choice → dimensions → printing → load securing → container loading → compliance → neutral vs branded → video → FAQ → related. Full topic coverage for a master-carton page. Container *count* is deliberately delegated to the hub FAQ (link only, no duplicate schema) — correct per the locked cluster template. No duplicated meaning across sections. |
| 7. Devil's Advocate | PARTIAL | No on-page section voices the strongest counter-view to the page's thesis (that "neutral is just as good" is a false economy, or that a carton with no published ECT/dimensions is a procurement risk). A cluster page need not host a debate, but the thesis is real and the counter is exactly the objection a serious buyer raises. Draft supplied in §4. |
| 8. Quantified evidence | PARTIAL | Real on-site numbers are used and **not** fabricated: 10/20 kg net options, 18,000 kg container net with **derived** loose-load counts (1,800 × 10 kg or 900 × 20 kg), UN 1361 / Class 4.2, AI/PDF artwork, 7-working-day proof. Correctly degraded to "Available on request" where pricing is empty. BUT the page's central structural claim — that carton strength "decides whether cartons arrive square" — is currently backed by **zero published numbers** because ECT, burst, flute, gsm, outer dimensions, gross weight, and max stack height are all empty in config. The page asserts the importance of strength specs without being able to show one. That is honest, but it is the biggest evidence gap. See §6. |
| 9. Mini-cases | N/A | No customer/case data exists in source or company.ts; the page makes zero customer claims. Fabricating a "cartons arrived square after the humid-season shipment" case would breach the honesty gate. Nothing to add. |
| 10. Ontological completeness | PASS | Dense entity web: master box / master carton (DefinedTerm → /glossary#master-box, alternateName "master carton"), inner box, corrugate (ECT/burst/flute/gsm), single vs double wall, ISPM-15 pallet, floor-stuffed vs palletized, UN 1361 / Class 4.2 markings, neutral vs white-label, white-top liner. Genesis (factory-as-source via `fill()` facts, "Made in {{country}}", FOB framing), Taxonomy (structural outer layer of the three-layer packaging system; inner box presents, master box protects), Pragmatics (stacking survival, payload, compliance, branding cost/speed) all explicit. Minor connectivity gaps in §5. |

**Status counts:** PASS 6 · PARTIAL 3 · FAIL 0 · N/A 1 (rules 1–10; rule 9 counted as N/A).

## 2. Intent map

| Section / para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "A master box, also called…" (heroSubtitle) | "what is a master box / master carton" — definitional | keep |
| "A master box is the structural layer…" (construction.p1) | "what does the master box do / why does it matter" — function | keep |
| "Carton strength is specified by edge-crush…" (construction.p2) | "how strong is the carton / what is ECT" — durability spec | keep (but see §6 — no number renders) |
| "Single-wall corrugate is the standard…" (walls.p1) | "single vs double wall — which do I need" — decision | keep |
| "The double-wall upgrade is priced per ton…" (walls.p2) | "does double wall cost extra / how is it priced" — cost | keep |
| "Net weight options per master box…" (dims.p1) | "master box net weight / sizes" — spec | keep |
| "By net weight, {{holdsByWeightExample}}…" (dims.p2) | "how many inner boxes per master box" — packing math | keep |
| "Master boxes ship plain kraft (neutral) or printed…" (printing.p1) | "can the master carton be branded / kraft vs printed" — branding | keep |
| "Or apply printed box labels as a lower-cost…" (printing.p2) | "cheaper branding alternative to carton printing" — cost-saving option | keep |
| "Artwork: print-ready vector files…" (printing.artworkLine) | "what artwork format / file specs" — prepress | keep |
| "Cartons load two ways: floor-stuffed…" (loadSecuring.p1) | "are cartons palletized or loose / strapping" — handling | keep |
| "A 20ft container loads 18,000 kg…" (container.p1) | "how many master boxes per 20ft container" — capacity | keep |
| "Every export master box — neutral or branded — is printed with…" (compliance.p1) | "what markings are required on charcoal cartons" — compliance/risk | keep |
| "The neutral master box is plain kraft…" (neutralVsBranded.p1) | "neutral vs branded — cost, speed, minimum" — decision | keep |
| "Want to check the carton quality before ordering?" (neutralVsBranded.p2) | "can I get a sample carton" — proof/trust | keep |
| FAQ ×9 (definition → custom/sample) | long-tail buyer questions — GEO/snippet harvest | keep |
| moreLine ("Container counts and custom-print costs…") | routes count/price/MOQ queries to hub & general FAQ | keep |
| Related topics (13 links) | internal-link mesh / pillar up-link | keep |

No rows marked compress/delete-as-fluff: the page is already lean. The only candidate is the repeated "confirmed with the quote" caveat (one optional tightening in §3).

## 3. Targeted rewrites

Only real gaps below; everything else passes as-is.

### 3.1 — Rule 1 (Headings as questions). Sharpen 3 noun H2s to buyer-question form.

These map to direct buyer questions at no cost and improve scannability + GEO heading-as-query matching. Leads already answer them.

**`walls.h2`** — current: `"Single vs double wall"`
**Corrected:** `"Single or double wall — which do you need?"`

**`dims.h2`** — current: `"Dimensions & weights"`
**Corrected:** `"What sizes and weights does the master box come in?"`

**`container.h2`** — current: `"Container loading"`
**Corrected:** `"How many master boxes fit in a 20ft container?"`

**`compliance.h2`** — current: `"Compliance & markings"`
**Corrected:** `"What markings are printed on every export carton?"`

(Leave `construction.h2` "Definition & construction" and `neutralVsBranded.h2` "Neutral vs branded master box" as-is — both are clean entity anchors and the FAQ already carries their question forms.)

### 3.2 — Rule 4 (anti-bloat, optional). Collapse the repeated "confirmed with the quote" caveat.

The caveat appears in construction.p2, dims.p1, dims.p2-region, the dims photo caption, and 3 FAQ answers. It is honest (specs are genuinely confirmed per order), but `dims.p1` states it twice in one paragraph.

**`dims.p1`** — current:
`"Net weight options per master box: {{masterBoxSizes}} of charcoal. Net weight counts the charcoal only; gross weight (charcoal plus packaging) is what freight calculations use, and is confirmed per configuration with the quote."`
**Corrected (one caveat, same facts):**
`"Net weight options per master box: {{masterBoxSizes}} of charcoal — the charcoal only. Gross weight (charcoal plus packaging) is the figure freight uses, and like outer dimensions it is confirmed per configuration with the quote, since wall type and inner-box mix change both."`

### 3.3 — Rule 8 (quantified evidence, HONESTY-SAFE). Make the empty carton-strength spec a transparent promise instead of an unbacked assertion.

The page asserts "carton strength decides whether cartons arrive square" but renders no ECT/burst/flute/gsm number (all empty in config; the `strengthSpecTemplate` line correctly does not render). Today the buyer reads a strength argument with nothing to grasp. Do **not** invent a value. Instead, name the test method and state explicitly that the figure is quoted — this converts a silent omission into a credibility signal.

**`construction.p2`** — current:
`"Carton strength is specified by edge-crush test (ECT) rating, burst strength, flute profile, and corrugate weight; these decide how high cartons stack safely during 4–8 weeks at sea. The exact strength specification for your order's box size is confirmed with the quote."`
**Corrected:**
`"Carton strength is specified four ways — edge-crush test (ECT) rating, burst (Mullen) strength, flute profile, and corrugate weight in gsm — and together they decide how high cartons stack safely through 4–8 weeks at sea. We quote the exact figures for your box size and wall type with the order, rather than publishing one blanket number that would not match every configuration."`

> The verifiable ECT / burst / flute / gsm / outer-dimension / gross-weight / max-stack figures themselves are owner data — see §6. Once populated in `company.json`, the existing `strengthSpecTemplate` and at-a-glance rows render automatically; no further prose edit needed.

### 3.4 — Rule 7 (Devil's Advocate). Add the missing counter-view section. Full draft in §4; suggested JSON shape:

```
"otherSide": {
  "h2": "Isn't a neutral, unbranded carton a false economy?",
  "p1": "...",   // counterargument (see §4)
  "p2": "..."    // rebuttal from on-site facts only (see §4)
}
```
Wire it after `neutralVsBranded` and before the FAQ in the `.astro`.

## 4. Devil's Advocate section

The page's thesis is twofold: *the master box is the structural layer that decides whether cartons arrive square*, and *neutral and branded cartons are equally compliant and equally protective*. The strongest real objection targets the second half.

**## A View from the Other Side: The Strongest Argument Against "neutral is just as good"**

The hardest counter from an experienced importer: *"A plain kraft carton is a false economy. Retail buyers and distributors judge a brand partly by how its master cartons present on the warehouse floor; a brown, label-only box reads as a no-name commodity and weakens shelf and re-order pull. And a vendor who can't publish an ECT rating, burst figure, or outer dimension is asking me to trust that the box is strong enough — on a Class 4.2 spontaneous-combustion cargo that sits 4–8 weeks at sea. 'Confirmed with the quote' is not a spec."*

**Where it genuinely holds:** the presentation point is fair for buyers selling **into branded retail channels**, and the spec-transparency point is fair on its face — at audit time this page publishes no carton-strength number because those fields are empty in source. A buyer who needs the ECT figure to satisfy their own insurer or carrier is right to ask for it before booking, not after.

**Rebuttal, using only on-site facts:**
- **Neutral is not unprotected, and not unmarked.** The protective layer is the carton's *construction* — corrugated kraft, single- or double-wall — which is identical whether the box is printed or plain. Branding is print on the outside; it changes nothing structural. And neutral is *not* blank: every export carton, neutral or branded alike, still carries the **UN 1361 / Class 4.2** dangerous-goods marking, country of origin (Made in {{country}}), net weight, and lot code — carriers verify these before accepting the booking. The compliance floor is the same.
- **Branding is decoupled from configuration, so "neutral vs branded" is a free choice, not a quality tier.** A buyer who wants warehouse-floor presence brands the carton; a buyer who wants the fastest, surcharge-free turnaround takes neutral — or applies **printed box labels** as a lower-cost branding step on a plain carton. None of these change how the box survives the container.
- **The spec-transparency objection is answered by quoting, not hiding.** Strength is specified per box size and wall type and confirmed with the order; a buyer can request the ECT/burst/dimension figures before booking, and can **request a physical sample master box** (digital proof in {{proofTimeDays}} working days plus a pre-production sample) to verify carton quality first-hand rather than on a published sheet.

Net: the presentation argument is a reason some buyers *choose* branded — which this factory fully supports — not a reason neutral is inferior protection or inferior compliance. The transparency argument is best closed by populating the published spec (§6), not by abandoning the per-order quote model.

## 5. Ontological completeness & triangulation

- **Genesis — PASS.** Factory-as-source is explicit: facts arrive via `fill()` from `company.ts`, "Made in {{country}}" appears in compliance, FOB/container framing throughout. No floating claims.
- **Taxonomy — PASS.** The master box is clearly positioned as the *outer/structural* layer of the three-layer packaging system ("the inner box presents the product, the master box protects it"), with single/double-wall as its sub-classification and floor-stuffed vs palletized as its load taxonomy. Well-placed in the charcoal-packaging ontology.
- **Pragmatics — PASS.** Buyer value is named at every turn: stacking survival, payload (18,000 kg net), branding cost/speed, compliance-or-cargo-stranded.
- **Weak connectivity — carton strength is an orphan concept.** ECT/burst/flute/gsm are *named* as the entities that "decide whether cartons arrive square," but they connect to no value (no number, no rating, no comparison). This is the page's loosest node. Closing §6 wires it; until then, §3.3 at least connects it to a test method and a quote promise.
- **Weak connectivity — "4–8 weeks at sea" vs the DG cargo.** The transit-duration entity (construction.p2) and the Class 4.2 spontaneous-combustion entity (compliance.p1) live in separate sections and never touch, yet the reason long transit *needs* a strong, properly-marked carton is exactly their intersection. One clause linking them (e.g. in the Devil's-Advocate rebuttal, which §4 now does) tightens the web.
- **Minor — "white-top liner" appears twice (printing.p1, printing photo, FAQ) but is never linked to /glossary or defined inline.** A 6-word gloss ("a white print surface over brown kraft") would de-orphan it for a buyer who doesn't know the term.

## 6. Gaps needing owner data

These are blank in `src/data/company.json` (`packaging.masterBox.*` / `packaging.pricing.*`). The `.astro` already renders the fallbacks correctly; populating them makes the spec real and auto-fills the at-a-glance rows and templated lines. **Do not fabricate any of these.**

- **`masterBox.cartonStrength.ect`** <NEEDS-OWNER-DATA: edge-crush test rating for single- and double-wall, e.g. "32 ECT" / "44 ECT">
- **`masterBox.cartonStrength.burstKpa`** <NEEDS-OWNER-DATA: burst/Mullen strength in kPa or psi>
- **`masterBox.cartonStrength.fluteType`** <NEEDS-OWNER-DATA: flute profile, e.g. "B-flute" / "BC double-wall">
- **`masterBox.cartonStrength.corrugateGsm`** <NEEDS-OWNER-DATA: corrugate board weight in gsm>
- **`masterBox.outerDimsMm`** <NEEDS-OWNER-DATA: outer carton dimensions L×W×H in mm, per box size>
- **`masterBox.grossWeightKg`** <NEEDS-OWNER-DATA: gross weight (charcoal + packaging) per box size>
- **`masterBox.maxStackHeight`** <NEEDS-OWNER-DATA: max safe stack height, e.g. cartons high or meters>
- **`masterBox.holdsExample`** <NEEDS-OWNER-DATA: real inner-box count for the reference SKU; until set, the page derives "20 × 1 kg or 40 × 500 g" purely by net weight, which ignores cube/volume>
- **`masterBox.printOptions`** <NEEDS-OWNER-DATA: explicit print options list; currently falls back to "Plain kraft or printed with your brand">
- **`pricing.doubleWallMasterBoxSurchargePerTonUsd`** <NEEDS-OWNER-DATA: double-wall upgrade USD/ton; currently "Available on request">
- **`pricing.strappingPerTonUsd`** <NEEDS-OWNER-DATA: strapping USD/ton; currently "Available on request">

No fabricated figures were introduced anywhere in this report. All numeric examples used above (10/20 kg, 18,000 kg, 1,800/900 box counts, UN 1361 / 4.2, 7-day proof, AI/PDF) are already present in source or derived by the page's own published math.
