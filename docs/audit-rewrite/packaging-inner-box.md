# Content Audit & Targeted Rewrite — Inner Box
**Route:** /packaging/inner-box · **Source:** src/i18n/en/packagingInnerBox.json (en.packagingInnerBox)

This is a procedural/reference cluster page in the packaging pillar. It is already strong: spec-dense, honest, well-linked, and graceful when a fact is empty in `company.json`. The main weakness is that section H2s are noun-phrase topic labels, not question-form headings — though the 9-item FAQ block (FAQPage schema, by design) already restates each section as a direct buyer question. Facts verified against `src/config/company.ts` / `src/data/company.json`: `innerBox.paperGsm = 230`, `weightOptionsKg = [0.25,0.5,1,2,3,5]`, `coating = "matte or gloss"`, `branding.artworkFormats = ["AI","PDF"]`, `proofing.proofLeadTimeDays = 7`, `cube-25mm.pcsPerKg = 96` (drives the holds-fallback). Note: `boxStyles`, `finishes`, `dimensionsMm`, `customPrint.moqUnits`, `customPrint.leadTimeAddDays`, `innerBoxPrintingPerKgUsd`, and `retail.shelfReadyBox` are all empty/null in data today — their dedicated lines and at-a-glance rows degrade out, but the prose still names the styles/finishes/shelf-ready inline. That is a data-fill gap, not a copy error.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | All seven section H2s are topic labels ("Definition & purpose", "Sizes & weights", "Packed into the master box"). Each maps cleanly to a buyer question, and the 9-item FAQ already poses them as questions ("What is an inner box?", "What sizes…?", "How many cubes…?"). Reference-page convention favors scannable labels, so this is acceptable — but several would read sharper as questions. See §3. |
| 2. Featured-snippet lead | PASS | Every section opens with a self-contained answer. "An inner box is the retail and branding unit…the box the end customer picks up." / "Net charcoal per inner box: {{innerBoxSizes}}." / FAQ A1 is a textbook definition-style lead. |
| 3. Paragraph intent | PASS | Each paragraph serves one intent; no orphan prose. Mapped in §2. |
| 4. No fluff + anti-bloat | PASS | Tight throughout. The one mild redundancy: the finish ladder is fully explained in `construction.p2` and again in FAQ A3 — but that duplication is intentional (FAQPage extraction needs the standalone answer). No general filler phrases to cut. |
| 5. Section purity | PASS | Clean clusters: purpose/definition, construction/finish, sizes/weights, printing/branding, retail markings, master-box nesting, neutral-vs-branded. The one cross-topic line — "UN 1361 markings live on the master box, not the retail inner box" — is correctly placed as a scope-boundary note in the retail section, not bleed. |
| 6. Structure | PASS | Logical order (what it is → how it's built → how big → how it's printed → what's marked → how it ships → branded vs neutral → FAQ). No gaps, no contradicting numbers (holds-chain shares the cube-25mm reference SKU with the plastic and master-box pages by design). |
| 7. Devil's Advocate | FAIL (drafted in §4) | Page carries an implicit thesis — "spend on the inner box for shelf appeal; rely on the inner plastic for protection" (`purpose.p2`). No section voices the opposing buyer view (skip the printed box, ship neutral, brand at destination). Draft supplied in §4. |
| 8. Quantified evidence | PASS | Claims are backed by on-site numbers where data exists: 230 gsm board, 250 g–5 kg sizes, ~96 cubes per 1 kg box (cube-25mm), AI/PDF artwork, 7-working-day proof. Where the fact is empty in data (MOQ, lead days, dimensions, print price), the page degrades to "confirmed on inquiry" / "Available on request" rather than inventing a figure — correct. |
| 9. Mini-cases | N/A | No customer case data exists; page correctly makes no case claim. Do not invent one. |
| 10. Ontological completeness | PASS | Dense entity web: inner box ↔ inner plastic (barrier) ↔ master box (freight) ↔ charcoal SKU, plus finish ladder, retail markings, EAN provenance, UN 1361 boundary. DefinedTerm + glossary anchor give Taxonomy; "the box the end customer picks up" gives Pragmatics. Genesis (factory-as-source) is implicit only — see §5. |

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| heroSubtitle "An inner box is the printed…" | Definition + at-a-glance spec (what is it, what board/size) | keep |
| atAGlance (KeyFactsBox) | Skimmable spec lookup before reading | keep |
| purpose.h2 "Definition & purpose" | "what is an inner box / retail box" | rewrite (→ question) |
| purpose.p1 "An inner box is the retail…" | Definition + role-of-box vs role-of-plastic | keep |
| purpose.p2 "That division of labor matters…" | Buying guidance (where to spend) — also seeds the thesis | keep |
| purpose.diagram steps + caption | Packaging-hierarchy mental model (charcoal→plastic→box→carton) | keep |
| construction.h2 "Box styles, construction & finishes" | "what is the inner box made of / what finishes" | rewrite (→ question) |
| construction.p1 "Inner boxes are produced in tuck-end…" | Material + why white duplex (vs kraft master box) | keep |
| construction.p2 "Finishes form a ladder…" | Finish ladder distinctness + pricing transparency [A2 decision] | keep |
| sizes.h2 "Sizes & weights" | "what sizes / dimensions / weights" | rewrite (→ question) |
| sizes.p1 "Net charcoal per inner box…" | Net vs gross weight definition, sizes | keep |
| sizes.p2 "As a reference, {{holdsRefExample}}…" | "how many cubes per box" (holds chain) | keep |
| printing.h2 "Printing & branding" | "can I print my brand / how" | rewrite (→ question) |
| printing.p1–pantone–artwork | Branding surface, MOQ/lead, Pantone, artwork formats | keep |
| retail.h2 "Retail & consumer markings" | "what markings go on the box (barcode, origin, lot)" | rewrite (→ question) |
| retail.p1–p2 | EAN provenance (buyer-supplied), markings, UN 1361 scope boundary | keep |
| packed.h2 "Packed into the master box" | "how do inner boxes ship / nest into the carton" | rewrite (→ question) |
| packed.p1 "Inner boxes pack into the corrugated…" | Holds-chain continuity to master-box page | keep |
| neutralVsBranded.h2 "Neutral vs branded inner box" | "do you offer plain/neutral boxes" comparison | keep (already comparison-clear) or light rewrite |
| neutralVsBranded.p1–p2 | Neutral vs branded scope, sample request path | keep |
| faq.* (9 items) | Long-tail Q&A + FAQPage extraction | keep |
| related.* | Internal-link hub / pillar up-link | keep |

## 3. Targeted rewrites

Only real gaps below. Everything not listed already passes — do not touch it. The H2 rewrites are optional polish (reference-label convention is defensible); the Devil's Advocate section (§4) is the one substantive content gap.

### Rule 1 — Headings as questions (optional polish)

These five H2s read as topic labels. Converting to question form sharpens GEO match to buyer queries while keeping the snippet leads intact. Keys: `purpose.h2`, `construction.h2`, `sizes.h2`, `retail.h2`, `packed.h2`.

CURRENT → CORRECTED:

- `purpose.h2`: `"Definition & purpose"` → **`"What is an inner box, and what is it for?"`**
- `construction.h2`: `"Box styles, construction & finishes"` → **`"What is the inner box made of, and what finishes are available?"`**
- `sizes.h2`: `"Sizes & weights"` → **`"What sizes and weights does the inner box come in?"`**
- `retail.h2`: `"Retail & consumer markings"` → **`"What retail markings go on the inner box?"`**
- `packed.h2`: `"Packed into the master box"` → **`"How do inner boxes pack into the master box?"`**

`printing.h2` ("Printing & branding") and `neutralVsBranded.h2` ("Neutral vs branded inner box") can stay — the first is a clean two-noun topic, the second is already a comparison label buyers search verbatim. If you want full consistency: `printing.h2` → **`"Can the inner box be printed with my brand?"`**.

Note: these exact questions are already mirrored in `faq.items`, so the FAQ block stays the canonical Q&A; this just aligns the on-page section headings to the same intent.

### Rule 7 — Devil's Advocate (missing section)

The page argues an implicit thesis in `purpose.p2` but never tests it. Add the section drafted in §4 as a new namespace block (suggested key `otherSide`, rendered after `neutralVsBranded` / before the FAQ). It uses only on-site facts (neutral-box availability, the plastic-as-barrier split, sample/proof flow, white-label-at-destination) — no new numbers.

## 4. Devil's Advocate section

The page's main thesis (`purpose.p2`): **"spend on the inner box for shelf appeal, and rely on the inner plastic for protection."** A complete, on-fact counter-section:

> **## A View from the Other Side: The Strongest Argument Against Paying for a Printed Inner Box**
>
> The strongest opposing view is that for many container buyers the printed inner box is a cost they should skip. The argument: the inner plastic is the actual moisture and dust barrier, and the master carton is what survives the voyage — so a printed retail box adds per-design tooling cost, an order minimum, and extra production lead time without protecting a single piece of charcoal. Importers who repack, rebrand at destination, or sell through channels that don't need shelf-ready retail units (bulk, HoReCa, white-label fillers) get no protection return on that spend.
>
> **When it genuinely holds.** This is correct whenever the box never reaches a retail shelf in your packaging. If you brand at destination, sell in bulk, or are still testing a market, the printed inner box buys you nothing the plastic and master box don't already provide — and we say so directly: the moisture and dust barrier is the plastic, not the box.
>
> **The rebuttal, on our own terms.** The page never claims the inner box protects the charcoal — it explicitly assigns protection to the inner plastic and freight survival to the corrugated master box. The inner box is scoped to one job: presentation and the retail markings the shelf legally and commercially needs — your barcode/EAN, net weight, country of origin, and lot code. If your charcoal goes to a shelf in your brand, those markings have to live somewhere, and the retail box is where buyers expect them. And the spend is opt-in, not forced: neutral inner boxes are available with no brand printing, custom-print carries a per-design minimum (not a per-container one), and you can request a physical sample box plus a digital proof (7 working days) before committing a cent to tooling. So the real decision isn't "printed box vs. no protection" — it's "do these units hit a retail shelf in my brand?" If yes, the inner box is the cheapest place to carry the brand and the mandatory markings; if no, ship neutral. The page already routes both answers.

(All facts above are on-page or in `company.json`: plastic-as-barrier split, neutral availability, per-design MOQ basis, 7-day proof, sample flow, retail markings list. No fabricated figure.)

## 5. Ontological completeness & triangulation

- **Genesis (factory-as-source) is implicit, not explicit.** The page never names the factory as the producer in body prose — it relies on first-person plural ("we match Pantone…", "we print the EAN you supply") and the sitewide ArticleMeta/Org schema. One clause tying the inner box to in-house print production (the factory prints, not a third party) would close the weakest entity link and reinforce E-E-A-T. Keep it factual — reference `company.ts`, don't assert a capability not in config.
- **Taxonomy is well-anchored.** DefinedTerm (@id → `/glossary#inner-box`, alternateNames "retail box"/"consumer box") plus the packaging-hierarchy diagram (charcoal → inner plastic → inner box → master box) place the entity precisely in the packaging classification. Strong.
- **Pragmatics is explicit and good.** "the box the end customer picks up", "your primary branding surface", and the spend-here-protect-there guidance all state buyer value plainly.
- **Holds-chain triangulation is consistent by design.** The cube-25mm reference SKU (~96 cubes/kg) is shared with the plastic and master-box pages, so pack → inner box → master box numbers cannot contradict. This is a genuine ontological strength worth preserving — do not localize the reference SKU per page.
- **One latent gap: EAN provenance.** "Barcode/EAN buyer-supplied, factory-printed; we don't issue the number" is a high-value, frequently-confused entity relation, currently only in `retail.p1` and FAQ A8. It is correctly placed; no change needed — flagged only as a model-citable strength.

## 6. Gaps needing owner data

None blocking the rewrite — every rewrite above uses facts already on-page or in `company.json`. Separate from copy, these data fields are empty/null today and currently degrade out of the at-a-glance box and dedicated lines (the prose still names them inline, so no false claim is made, but filling them would strengthen the page):

- `packaging.innerBox.boxStyles` (prose names tuck-end / tray-and-lid / sleeve; the styles row/line stays blank until filled)
- `packaging.innerBox.finishes` (prose names the finish ladder; the finishes row/line stays blank)
- `packaging.innerBox.dimensionsMm` (dimensions row/line gated off)
- `packaging.customPrint.moqUnits` and `customPrint.leadTimeAddDays` (MOQ and print-lead rows gated off; prose says "confirmed on inquiry")
- `packaging.pricing.innerBoxPrintingPerKgUsd` (renders "Available on request")
- `packaging.retail.shelfReadyBox` (prose says shelf-ready "available"; the at-a-glance row stays blank — confirm and set `true` to make the two agree)
