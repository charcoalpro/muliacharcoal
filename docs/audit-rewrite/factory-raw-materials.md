# Content Audit & Targeted Rewrite — Raw Materials
**Route:** /factory/raw-materials · **Source:** src/i18n/en/factoryRawMaterials.json, src/i18n/en/factoryCommon.json (en.factoryRawMaterials)

Main thesis (confirmed from text): **coconut shell is the superior charcoal feedstock for shisha** — lower ash, neutral taste, denser/longer burn, and a defensible sustainability story (upcycled byproduct, no tree felled), backed by owned carbonization for consistency.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | TL;DR + most H2s map cleanly to buyer questions ("Where we source…", "We own our carbonization", "A renewable, upcycled raw material", "Coconut shell vs wood vs bamboo"). But several are statement-form labels, not the question the buyer asks: `geography.h2` "How the region shapes quality" (OK, reads as Q), `labor.h2` "Labor & environmental standards" (pure label), `sustainability.h2` "A renewable, upcycled raw material" (claim, not the buyer's "is it sustainable?" question). FAQ block is fully question-form and strong. |
| 2. Featured-snippet lead | PASS | Each H2 opens with a self-contained 1–2 sentence answer before elaborating (e.g. sourcing body leads with "We source mature coconut shell from {{sourcingVillages}} villages across {{sourcingRegion}}…"; vertical-integration leads with the contrast then the consequence). TL;DR is a model extractable summary. |
| 3. Paragraph intent | PASS | Every paragraph serves one identifiable buyer intent (provenance, supply security, sustainability story, material comparison, ethics). See Intent map. No stray paragraphs. |
| 4. No fluff + anti-bloat | PARTIAL | Mostly tight. Two soft spots: sustainability body's closing sentence "For buyers who need a defensible sustainability story, coconut shell is the strongest position in the category" restates the comparison-table renewability row + the FAQ sustainability answer (meaning duplicated across 3 places). `comparison.guideBody` "For the full breakdown of how these materials compare, see our buyer's guide" is filler wrapping a link. |
| 5. Section purity | PASS | Clusters are clean: provenance / ownership / sustainability / region-quality / comparison / ethics each stay in lane. Minor: the renewability theme appears in both the Sustainability H2 and the comparison-table renewability row, but that is table-vs-prose, not bleed. |
| 6. Structure | PARTIAL | Topic coverage is good but two meaningful gaps: (a) no explicit answer to "what IS coconut shell charcoal / where does it sit in the charcoal taxonomy" — the page assumes the buyer already knows; the glossary link is the only taxonomy handoff. (b) Duplicated meaning on the sustainability claim (rule 4). |
| 7. Devil's Advocate | FAIL | No section presents the strongest opposing view (the real industry counter: coconut shell isn't automatically better — quality is set by carbonization/binder, not feedstock; and supply/price volatility of coconut shell vs wood). Page is one-sided pro-coconut. See §4 for a drafted, on-fact rebuttal. |
| 8. Quantified evidence | PARTIAL | Good numbers where they exist: village count, palm-count, ash "under ~2.5%", region named. But the headline benefit claims ("denser", "long-burning", "neutral taste", "low smoke") are asserted without the on-site numeric anchors that DO exist elsewhere in company.ts (ash typical 1.6–1.9%, fixed carbon ~75%, calorific ~7,500 kcal/kg, ashColor silver-white). The page leaves its own strongest data on the table. |
| 9. Mini-cases | N/A | No real problem→action→result customer case exists in source or company.ts. Correctly omitted; do not invent. |
| 10. Ontological completeness | PARTIAL | Genesis (own carbonization plant in Bitung, sourcing region) and Pragmatics (buyer value: consistency, supply security, sustainability story) are explicit and strong. Taxonomy is weak — the page never states *what class of product* coconut-shell charcoal is (carbonized briquette feedstock vs lump vs activated), relying entirely on the off-page glossary link. |

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "In short / {{brand}} charcoal is made…" (TL;DR) | "what is this charcoal made from" — extractable summary | keep |
| "This page covers what our…" (intro p1) | orientation + pillar up-link | keep |
| "Where we source coconut shell" (sourcing) | "where does the coconut shell come from / provenance" | keep |
| "We own our carbonization" (verticalIntegration) | "do they control quality / spot-buy risk" — supply security | keep |
| "A renewable, upcycled raw material" (sustainability) | "is coconut charcoal eco-friendly / sustainability story for resale" | compress (cut last sentence — dup) |
| "How the region shapes quality" (geography / sourcingAshNarrative) | "does origin affect ash/quality" | keep |
| "Coconut shell vs wood vs bamboo" (comparison body + table) | "coconut vs wood vs bamboo charcoal" — comparison intent | keep |
| "For the full breakdown of how…" (comparison.guideBody) | link handoff to guide | compress (filler wrapper) |
| "Lower ash and a neutral taste…" (comparison.qualityBody) | proof handoff to specs page | keep |
| "Labor & environmental standards" (labor / laborStatement) | "ethical sourcing / CSR due-diligence" | keep |
| FAQ ×5 | direct buyer questions, snippet/AI-citation fuel | keep |
| Related topics | internal linking | keep |

## 3. Targeted rewrites

Only real gaps below. Sections not listed already pass.

---

### 3.1 — Rule 1 (heading as question): `labor.h2`
**Current:**
> "Labor & environmental standards"

**Corrected (paste into `labor.h2`):**
> "Is your coconut shell ethically and sustainably sourced?"

---

### 3.2 — Rule 1 (heading as question): `sustainability.h2`
**Current:**
> "A renewable, upcycled raw material"

**Corrected (paste into `sustainability.h2`):**
> "Is coconut shell charcoal sustainable?"

(Pulls the buyer's actual question to the front; the existing FAQ already uses this exact phrasing, so it also tightens topical consistency.)

---

### 3.3 — Rule 4 (anti-bloat): trim the duplicated sustainability close
**Current (`sustainability.body`):**
> "Coconut shell is a byproduct: the shell is left over after the coconut's flesh and water are used for food. Turning it into charcoal upcycles waste that would otherwise be burned or dumped. No forest is cleared and no tree is felled for our charcoal — unlike lump wood charcoal, which is made by cutting and burning trees. For buyers who need a defensible sustainability story, coconut shell is the strongest position in the category."

**Corrected (drop the final restating sentence; its meaning already lives in the FAQ and the comparison "Renewability" row):**
> "Coconut shell is a byproduct: the shell is left over after the coconut's flesh and water are used for food. Turning it into charcoal upcycles waste that would otherwise be burned or dumped. No forest is cleared and no tree is felled for our charcoal — unlike lump wood charcoal, which is made by cutting and burning trees, giving buyers a sustainability story they can put in front of their own customers."

---

### 3.4 — Rule 8 (quantified evidence): anchor the "lower ash / neutral" benefit with on-site numbers
The page asserts coconut's advantages qualitatively while the exact, owner-confirmed numbers already exist in `company.ts` (`quality`: ash typical 1.6–1.9%, max 2.0%; fixed carbon ~75%; calorific ~7,500 kcal/kg; ashColor silver-white). Surface them once, in the comparison lead, so the page carries its own proof instead of deferring entirely to the specs page.

**Current (`comparison.body`):**
> "Why coconut shell is the standard for premium shisha charcoal, compared with wood (lump/sawdust) and bamboo:"

**Corrected (paste into `comparison.body`):**
> "Coconut shell is the standard for premium shisha charcoal because density, ash, and taste all favor it. Our finished coconut-shell coals run typical ash around {{ashTypicalPct}}% with high fixed carbon — figures wood and bamboo rarely match. Here is how the three raw materials compare for shisha:"

> NEEDS-OWNER-DATA confirmation only on *exposing* the figure here — the value itself (`quality.specs.ashContentPct.typical` = "1.6–1.9", and a matching `{{ashTypicalPct}}` token) already exists; if no token is wired, reference the spec verbatim ("typical ash 1.6–1.9%") rather than inventing one. Do NOT add fixed-carbon/calorific numbers unless a token already resolves them.

---

### 3.5 — Rule 6 / 10 (taxonomy gap): add a definition-style opener to the sourcing section
The page never states, on-page, *what* coconut-shell charcoal is in product-taxonomy terms — it sends that job entirely to the glossary. A one-sentence definition lead improves AI-citation odds (definition-form sentences are preferentially extracted) and closes the taxonomy gap without bloating.

**Current (`sourcing.body` opening):**
> "We source mature coconut shell from {{sourcingVillages}} villages across {{sourcingRegion}}…"

**Corrected (prepend one definition sentence):**
> "Coconut shell charcoal is charcoal made by carbonizing the hard inner shell of the coconut — not wood, sawdust, or bamboo. We source mature coconut shell from {{sourcingVillages}} villages across {{sourcingRegion}}, drawing on a supply base of around {{palmTreesGrouped}} coconut palms. Eastern Indonesia's older, thick-walled coconuts give a hard, dense shell — the best starting material for a long-burning, low-ash coal."

---

### 3.6 — Rule 4 (anti-bloat): tighten the guide handoff
**Current (`comparison.guideBody`):**
> "For the full breakdown of how these materials compare, see our buyer's guide."

**Corrected:**
> "See the full material-by-material breakdown in our buyer's guide:"

(Removes the empty "for… see" wrapper; the link label already names the destination.)

## 4. Devil's Advocate section

The page argues coconut shell is the superior feedstock but never engages the strongest counter. Draft below uses only on-site / company.ts facts.

> ## A View from the Other Side: The Strongest Argument Against "Coconut Shell Is Automatically the Better Charcoal"
>
> The honest counter-argument from experienced buyers is this: **feedstock alone does not make a good coal — carbonization, binder, milling, and pressing do.** A poorly carbonized coconut-shell coal with too much binder can ash heavier and taste worse than a well-made wood briquette. So "it's coconut shell" is not, by itself, a quality guarantee. A second, fair objection is commercial: coconut-shell supply and price track the coconut-food and copra industry, so a buyer standardizing on it is exposed to that single feedstock's seasonality.
>
> Both points are valid — and this is exactly why the raw material is only half of our answer. We do not buy ready-made char on the spot market and hope; we run our own carbonization plant in {{carbonizationCity}}, {{carbonizationRegion}}, so the char that feeds every briquette is made to our standard, not to whatever the market offered that week. The downstream steps that the objection rightly cares about are controlled in-house too: milling and sieving to a uniform particle size, a food-grade tapioca-starch binder with no chemical accelerants, high-pressure pressing, and a burn/ash test on every batch with a retained reference sample. On the supply-risk point, our sourcing is not a single grove but {{sourcingVillages}} villages across {{sourcingRegion}}, drawing on around {{palmTreesGrouped}} palms — a diversified base, not one harvest. In short: the buyer is right that feedstock isn't destiny. The reason our coconut shell delivers low, silver-white ash and a neutral taste is that we own the steps after the shell, not just the shell.

(All facts above — own carbonization plant city/region, milling/sieving, tapioca binder/no accelerants, pressing, per-batch burn/ash test + retained sample, village/palm counts — are present in company.ts `production`/`factory`. No new numbers introduced.)

## 5. Ontological completeness & triangulation

- **Taxonomy is the main semantic gap.** "Coconut shell charcoal" is never positioned in the charcoal class hierarchy on-page (carbonized briquette feedstock vs lump vs activated carbon); the only handoff is the glossary link. Fix 3.5 adds an in-text definition that anchors the entity locally instead of off-page.
- **Genesis: explicit and strong.** Source (sourcing region + village/palm counts) and maker (own carbonization plant, Bitung/North Sulawesi) are both stated — the factory-as-source triangulation is clearly made.
- **Pragmatics: explicit and strong.** Buyer value is named for each cluster (supply security via vertical integration, resale-able sustainability story, ethics/CSR due-diligence via labor statement). No isolated "feature with no buyer-why."
- **Weak entity connectivity: feedstock ↔ measured outcome.** The page claims "lower ash / neutral taste" but does not link those entities to the site's own quantified ash/fixed-carbon/ashColor data (it defers 100% to /quality). Fix 3.4 connects the benefit entity to its on-site evidence node.
- **Duplicated node: the sustainability claim** appears in the Sustainability H2, the comparison "Renewability" row, and the FAQ — three expressions of one relation. Fix 3.3 prunes the prose restatement so each surface adds distinct value.

## 6. Gaps needing owner data

- **3.4 — exposing the ash figure in the comparison lead:** confirm whether an `{{ashTypicalPct}}` (or equivalent) token is already wired through `interpolate.ts`. The *value* exists (`quality.specs.ashContentPct.typical` = "1.6–1.9"); this is only a request to confirm the token/route for displaying it on this page — not a request for any new number. If no token resolves, reference the spec verbatim ("typical ash 1.6–1.9%"); do not surface fixed-carbon or calorific figures unless their tokens already resolve.
