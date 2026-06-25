# Content Audit & Targeted Rewrite — Coconut vs Bamboo vs Wood Charcoal
**Route:** /guide/coconut-vs-bamboo-vs-wood-charcoal · **Source:** src/i18n/en/guide.json (en.guide.compare)

Main thesis (confirmed from text): *coconut shell charcoal is the modern standard / best raw material for shisha* — see `heroSubtitle`, `intro.p1`, and the dedicated `sections.whyCoconut` ("Why coconut shell charcoal wins for shisha").

This is a strong, honesty-gated page: every figure traces to `grades.ts` (coconut column) or a named cited source (bamboo/wood), the burn-temperature row is deliberately omitted as unverified, and sustainability is explicitly framed as qualitative ("We do not claim a coconut-specific cradle-to-gate footprint"). The gaps below are refinements, not corrections.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | **PARTIAL** | Three section H2s are already direct buyer questions ("How much ash does coconut charcoal leave?", "Is bamboo charcoal as good as coconut?", "Does coconut burn longer than wood?"). But four are statements/labels: the table heading, `whyCoconut.h2` ("Why coconut shell charcoal wins for shisha"), `combustion.h2` ("Combustion and safety: what to avoid"), `sustainability.h2` ("Which material is most sustainable?" — this one IS a question). Net: 4 of 7 H2s are questions or near-questions; combustion + whyCoconut are statements. |
| 2. Featured-snippet lead | **PARTIAL** | The intro and FAQ answers are clean snippet leads. But several body paragraphs bury the answer: `sections.bamboo.body` opens "Bamboo charcoal carbonized at high temperature is competitive…" (good), yet `sections.combustion.body1` opens with framing ("The biggest safety variable is not the raw material…") before the data — acceptable. The weakest is `whyCoconut.body1` which opens "It is worth being precise about why" — meta-commentary, not an answer. |
| 3. Paragraph intent | **PASS** | Every paragraph maps to a clear buyer intent (see §2). No orphan paragraphs. |
| 4. No fluff + anti-bloat | **PARTIAL** | One clear bloat opener: `whyCoconut.body1` "It is worth being precise about why." A couple of mild restatements between `sections.coconut.body`, `whyCoconut.body2`, and the ash FAQ (the "low ash → less residue, cleaner heat transfer" point appears 3×) — defensible for snippet/FAQ extraction, but flag. |
| 5. Section purity | **PASS** | Each H2 owns one cluster: ash→coconut, bamboo-comparison→bamboo, burn/density→wood, synthesis→whyCoconut, safety→combustion, sustainability→sustainability. No cross-bleed. |
| 6. Structure / coverage | **PASS** | Logical flow: definition → comparison table → per-material → synthesis → safety → sustainability → FAQ. Full topic coverage of the six compared properties. Minor duplication noted under rule 4. |
| 7. Devil's Advocate | **FAIL** | No dedicated H2 presenting the strongest opposing view (e.g. "high-temp bamboo matches coconut and is cheaper / more renewable"). The honesty is *embedded* inside `bamboo.body` and `whyCoconut.body1` ("the case for coconut does not rest on raw energy"), which is admirable, but there is no standalone counter-thesis section. See §4 for a drafted one built only from on-site facts. |
| 8. Quantified evidence | **PASS** | Claims are backed by real numbers: ash 1.6–2.8% (grades.ts), fixed carbon ranges, calorific 28–32 vs 24.4–29.2 MJ/kg, CO study 3,728±2,028 vs 1,730±501 ppm (Monzer 2015), woodfuel ~1–2 Bt GHG. No fabrication. Coconut taste/density claims are qualitative but correctly not over-quantified (burn-temp deliberately omitted). |
| 9. Mini-cases | **N/A** | No buyer/customer case data exists in source or company.ts; the page correctly does not invent one. A material-comparison reference page does not require a mini-case. Not a gap. |
| 10. Ontological completeness | **PARTIAL** | Strong taxonomy (three feedstocks, proximate-analysis properties, DefinedTerm schema for fixed carbon/ash/calorific/volatile matter) and pragmatics (links to /products, /quality, /samples). Genesis is the soft spot: the page never names the factory as the source of the coconut column — the intro says "our own three grades" but does not connect to PT Coco Reina / Semarang origin the way the E-E-A-T block implies. See §5. |

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "Coconut shell, bamboo and hardwood…" (heroSubtitle) | "what charcoal types are used for shisha" — orientation | keep |
| "Coconut shell charcoal is charcoal made…" (intro.p1) | Definitional / "what is coconut shell charcoal" | keep |
| "The figures below are reported as ranges…" (intro.p2) | Methodology trust ("are these numbers real?") | keep |
| Comparison table + footnotes | Comparison-shopping / featured-snippet table intent | keep |
| "Well-carbonized coconut shell charcoal is low in ash…" (coconut.body) | "how much ash / why low ash matters" | keep |
| "Bamboo charcoal carbonized at high temperature…" (bamboo.body) | "is bamboo as good as coconut" | keep |
| "Hardwood lump charcoal can reach high fixed carbon…" (wood.body) | "does coconut burn longer than wood" | keep |
| "It is worth being precise about why." (whyCoconut.body1) | Synthesis / decisive-factor intent | **compress** (cut meta-opener) |
| "Coconut wins on three things instead…" (whyCoconut.body2) | "why choose coconut" — decision driver | keep |
| "The biggest safety variable is not the raw material…" (combustion.body1) | "is shisha charcoal safe / quick-light vs natural" | keep |
| "Quick-light coals are impregnated with accelerants…" (combustion.body2) | Safety detail + binder reassurance | keep |
| "Coconut shell charcoal valorizes an agricultural by-product…" (sustainability.body) | "which charcoal is most sustainable" | keep |
| FAQ ×3 (ash / burn / calorific) | Long-tail question intent + FAQPage schema | keep |

## 3. Targeted rewrites

Only real gaps are listed. Sections marked PASS in §1 are not touched.

### 3.1 — Rule 1 (heading as question): `sections.whyCoconut.h2`
**Current:** `"Why coconut shell charcoal wins for shisha"`
**Corrected (question form, preserves the win framing):**
```
"Why does coconut shell charcoal win for shisha?"
```

### 3.2 — Rule 1 (heading as question): `sections.combustion.h2`
**Current:** `"Combustion and safety: what to avoid"`
**Corrected:**
```
"Is shisha charcoal safe, and what should you avoid?"
```

### 3.3 — Rule 2 + Rule 4 (snippet lead + cut meta-opener): `sections.whyCoconut.body1`
**Current:**
```
"It is worth being precise about why. On fixed carbon and calorific value, coconut and well-carbonized bamboo overlap heavily — so the case for coconut does not rest on raw energy content."
```
**Corrected (leads with the self-contained answer, no meta-framing):**
```
"Coconut wins on ash, density and taste — not raw energy. On fixed carbon and calorific value it overlaps heavily with well-carbonized bamboo, so the case for coconut does not rest on energy content at all."
```
*(This also removes the mild restatement flagged in rule 4 by making the energy-parity point do double duty as the lead.)*

### 3.4 — Rule 1 (table heading, optional): `table.heading`
**Current:** `"Coconut vs bamboo vs wood charcoal, compared"`
This is a label, not a question — acceptable for a data table that follows a question-led intro. **Optional** rewrite if strict question-form is desired:
```
"How do coconut, bamboo and wood charcoal compare?"
```
*Note: if changed, update `tocItems` label and the `itemList.name`/schema `name` (both read `t.table.heading`) — keep them in sync. Recommend leaving as-is unless the framework demands literal questions on every H2.*

### 3.5 — Rule 7 (Devil's Advocate): NEW section
The page has no standalone opposing-view H2. Add the section drafted in §4 below as a new `sections.devilsAdvocate` namespace, rendered between `combustion` and `sustainability` (or immediately after `whyCoconut`). All figures in it already appear elsewhere on the page — nothing new is introduced.

## 4. Devil's Advocate section

Drafted complete, using ONLY facts already on this page (bamboo high-temp parity ~66–67% FC / 24.4–29.2 MJ/kg; bamboo "fast-renewing"; coconut ash 1.6–2.8%; coconut neutral taste / density; the "cost and need for proper carbonization" weakness already admitted in `coconut.body`). No new numbers.

> ## A View from the Other Side: The Strongest Argument Against "coconut is the best material for shisha"
>
> **The counterargument.** A buyer optimizing purely for energy and sustainability can make a real case for high-temperature bamboo charcoal. Carbonized at 750 °C, bamboo reaches roughly 66–67% fixed carbon and 24.4–29.2 MJ/kg — overlapping coconut's own range — and burns clean with low smoke. On the green-sourcing axis bamboo has a real argument too: it is a fast-renewing crop, whereas coconut's sustainability case rests on valorizing a by-product — shells that would otherwise be waste — not on renewal speed. And coconut is not free of drawbacks: it costs more and loses much of its advantage if it is under-carbonized.
>
> **When it genuinely holds.** For a buyer whose spec sheet weights calorific value and renewable-feedstock messaging above all else — and who can source bamboo carbonized consistently at high temperature — the gap narrows to almost nothing on energy, and bamboo's renewability story is legitimate.
>
> **The rebuttal, on this page's own facts.** The case fails on consistency and the three properties that actually decide shisha performance. Bamboo's quality is sharply temperature-dependent: drop the carbonization temperature and fixed carbon collapses to 10–18%, and at a given temperature bamboo tends to carry *higher* ash than wood. Coconut shell briquettes, by contrast, are pressed to a controlled density and shape — delivering low ash (1.6–2.8% across our grades), a long even burn, and a neutral taste from low volatile matter reproducibly, because the briquette is engineered to a fixed density rather than left to the variability of feedstock and kiln temperature. Energy parity is real; reproducible low-ash, high-density, neutral-tasting coals are what a lounge actually buys, and that is where coconut still wins.
>
> *(Fact-check note: this rebuttal draws only on facts already on the compare page — bamboo's temperature-dependence and ash, and coconut's controlled-density briquette, 1.6–2.8% ash and neutral taste. The per-batch-COA consistency proof lives on the hub / choose-factory / how-to-order pages and is intentionally not invoked here.)*

## 5. Ontological completeness & triangulation

- **Genesis (weak — close this).** The page sources the coconut column to "our own three grades" but never names the factory as the producer or anchors it to Semarang / PT Coco Reina. The E-E-A-T meta block implies authorship; the body should make the factory-as-source explicit once (e.g. in `intro.p2` or `whyCoconut.body2`: "the grades *we carbonize in Semarang* are built around these properties"). Reference the company fact, do not hardcode.
- **Taxonomy (strong).** Three feedstocks × proximate-analysis properties (fixed carbon, ash, calorific, volatile matter, density) are densely connected, with DefinedTerm schema and an ItemList. The position of coconut within the charcoal classification (briquette vs irregular lump; shell-derived vs culm- vs wood-derived) is explicit.
- **Pragmatics (strong).** Buyer value is wired in: links to /products, /quality/specifications-explained, /factory/raw-materials, /samples, plus the CTA banner. The "what to avoid" combustion section converts a comparison into a purchase rule.
- **Entity gap — binders.** `combustion.body2` names "natural starch binders (tapioca, cassava, corn)" but the page never links this entity to the products that use them; a one-line tie to the product range or production process would strengthen connectivity (low priority).
- **Entity gap — "well-carbonized."** The qualifier "well-carbonized" / "fully carbonized" recurs (coconut.body, bamboo.body, whyCoconut.body2) as the hinge of every advantage, yet carbonization-as-process is not linked to /factory/production-process from this page. Adding that link closes the loop between the claim and its proof.

## 6. Gaps needing owner data

- **None.** Every rewrite above uses figures already present in the page text or in `src/config/grades.ts`. No `<NEEDS-OWNER-DATA>` placeholders were required. (The two Genesis/connectivity fixes in §5 reference existing company facts — factory name/location and the production-process page — not new data.)
