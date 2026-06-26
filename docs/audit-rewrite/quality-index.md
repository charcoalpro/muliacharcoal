# Content Audit & Targeted Rewrite — Quality pillar
**Route:** /quality · **Source:** src/i18n/en/quality.json, src/i18n/en/qualityCommon.json (en.quality)

The page resolves a real buyer confusion ("which certificate proves shisha-charcoal quality?") into an honest three-lens model: lab-measured composition, observed performance, and independent verification. It carries a genuine thesis — *there is no single formal standard, so quality is defined by measurable composition, a self-attributed ash rubric, and per-container proof* — and defends it with on-config numbers (ash 1.6–1.9%, fixed carbon 75%, COA + third-party report every container). Facts are clean: ash = ASTM D1762-84(2021), calorific = ISO 18125:2017, "typical/target" never "guaranteed". This is a strong page; the gaps are minor heading-form and snippet-lead tweaks, not factual or structural failures.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | Hero H1, intro H2 ("How shisha charcoal quality is evaluated"), and FAQ are question-mapped. But four H2s are statement-form: "The three-tier ash grading framework", "Typical specifications", "How we prove it", and child H2s "What the numbers mean / How it is measured / How it is proven". Each maps cleanly to a buyer question; the framework intentionally keeps statement headings for the spec/framework blocks, so this is a partial, not a fail. |
| 2. Featured-snippet lead | PASS | Every section opens with a self-contained answer: hero subtitle states the three-lens model; intro p1 leads with raw material; framework intro defines ash as "the single clearest differentiator"; specs intro defines the Tier A/B split. FAQ answers are all snippet-shaped. |
| 3. Paragraph intent | PASS | Each paragraph serves one intent (see §2 map). No paragraph drifts. |
| 4. No fluff + anti-bloat | PASS | Spec-dense throughout; no filler adjectives, no restated points. The "definition-form sentences" list is generated from config, not padded prose. Minor: at-a-glance `definition` says "composition" twice — flagged in §3. |
| 5. Section purity | PASS | Clean cluster boundaries: composition→intro, ash rubric→framework, ranges→specs, "what/how/proof"→three child sections, held-vs-provided→prove. No bleed. |
| 6. Structure | PASS | Logical progression (raw material → three lenses → ash rubric → spec table → child entities → proof → FAQ). The three-lens model is stated once and reused as the spine; no duplicated meaning. |
| 7. Devil's Advocate | PARTIAL | The page pre-empts the strongest objection ("no certificate = no real standard") in intro p3 and the framework `selfAttribution` honestly disclaims its own rubric — but there is no dedicated counter-argument H2. A short one would strengthen the trust query. Draft in §4. |
| 8. Quantified evidence | PASS | Every benefit claim is numbered: ash 1.6–1.9% (≤2.0 target), fixed carbon 75% (≥72), moisture 6% (≤8), VM 12% (≤14), calorific 7500 kcal/kg (≥7200), burn 120 min (≥90), three named labs, COA every container. No naked adjectives. |
| 9. Mini-cases | N/A | No customer/problem→action→result case data exists in config; page correctly makes none. Honesty-gate compliant — do not invent. |
| 10. Ontological completeness | PASS | Genesis (100% coconut shell, pressed by {{brand}}, carbonized), Taxonomy (coconut vs wood/sawdust; ash/fixed-carbon/VM classification; Tier A lab vs Tier B observed), Pragmatics (cleaner burn, less tray residue, better airflow, COA to verify) all explicit. Strong entity density. |

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "There is no single formal standard…" (heroSubtitle) | "what defines shisha charcoal quality" — the head-query answer | keep |
| "The headline numbers a wholesale buyer…" (atAGlance.definition) | scannable spec snapshot for skimmers | compress (dup "composition") |
| "Quality begins with the raw material…" (intro.p1) | "what makes coconut charcoal good" — genesis/raw material | keep |
| "From there, quality splits into three lenses…" (intro.p2) | how quality is structured (the three-lens taxonomy) | keep |
| "Because no single document is the…" (intro.p3) | reframing the buyer's wrong question ("which certificate") | keep |
| "Ash content is the single clearest…" (framework.intro) | "what is a good ash content" — the differentiator | keep |
| "This is {{brand}}'s own evaluation rubric…" (framework.selfAttribution) | honesty disclaimer (rubric is self-attributed) | keep |
| "{{brand}}'s flagship grade sits in…" (framework.factoryBandSentence) | where the factory's product sits in its own rubric | keep |
| "The factory-wide ranges below describe…" (specs.intro) | "what are the specifications" — Tier A/B framing | keep |
| Tier A/B spec table + definition sentences | extractable spec data (GEO citation target) | keep |
| "What the numbers mean / How it is measured / How it is proven" (children) | three buyer sub-questions → cluster pages | keep |
| "Quality is only as good as the proof…" (prove.body1/2) | "how do I verify quality" — held vs provided | keep |
| FAQ ×7 | long-tail buyer questions (standards, ash, burn, testing, certs, COA) | keep |
| Related topics ×11 | internal linking / navigation | keep |

## 3. Targeted rewrites

Only three real gaps. Everything else passes — no rewrite offered.

### Gap A — Rule 4 (anti-bloat): "composition" stated twice in one sentence
**Current** (`atAGlance.definition`):
> "The headline numbers a wholesale buyer checks first — composition, burn, composition purity, the proof that ships with the order, and how to verify it yourself."

"composition, burn, composition purity" repeats the word and reads as a list error. Tighten:

**Corrected:**
> "The headline numbers a wholesale buyer checks first — composition, burn behavior, purity, the proof that ships with the order, and how to verify it yourself."

### Gap B — Rule 1 (headings as questions): the "How we prove it" / "Typical specifications" H2s are statement-form
These are intentional per the framework, but the trust query rewards question form. Both map to a direct buyer question. Optional, low-risk swaps that keep the JSON token-free:

**Current** (`prove.heading`): `"How we prove it"`
**Corrected (question form):** `"How do we prove the quality?"`

**Current** (`framework.heading`): `"The three-tier ash grading framework"`
**Corrected (question form):** `"What is a good ash content — and how do we grade it?"`

Note: `specs.heading` ("Typical specifications") is the canonical table label and is better left as a noun phrase for scannability; the snippet lead under it already answers "what are the specs". Leave as-is.

### Gap C — Rule 7 (Devil's Advocate): no dedicated counter-argument section
The page pre-empts the objection in prose but never gives it its own H2 with a balanced rebuttal. Add the section drafted in §4 as a new `devilsAdvocate` block in `quality.json`, rendered after the `prove` section (before the FAQ). All facts below already live in the page or config — no new numbers.

**New JSON block (`quality.devilsAdvocate`):**
```json
"devilsAdvocate": {
  "heading": "Isn't \"no single standard\" just a way to avoid being held to one?",
  "body1": "It is a fair challenge. With no codified shisha-charcoal standard, a factory can call anything \"premium\" and no external body will contradict it — and some do exactly that. The objection holds whenever a supplier's quality claim is an adjective with no number, no method, and no document behind it.",
  "body2": "{{brand}} answers it the only way that survives scrutiny: every claim resolves to a measured value and a method. Ash is graded in three named bands by actual percentage ({{ashTypical}}% typical, ≤ {{ashTarget}}% target), measured by {{ashMethod}}; the rubric is openly labeled the factory's own, not an ISO standard. And the numbers are not self-asserted — an independent third-party laboratory ({{thirdPartyLabsOr}}) tests {{thirdPartyScope}} on {{thirdPartyFrequency}}, a Certificate of Analysis ships with every container, and a sample is available to test before you commit. \"No single standard\" is not the absence of a standard; it is the reason the proof has to travel with the goods."
}
```
All tokens (`ashTypical`, `ashTarget`, `ashMethod`, `thirdPartyLabsOr`, `thirdPartyScope`, `thirdPartyFrequency`) already resolve via `qualityTokens()` — no fabricated figure.

## 4. Devil's Advocate section

The page has a clear thesis: *because no single formal standard governs shisha charcoal, quality is best defined by measurable composition, a self-attributed ash rubric, and per-container independent proof.* The strongest opposing industry view is that "no standard" is itself the dodge. Drafted complete, using only on-site/config facts:

## A View from the Other Side: The Strongest Argument Against "There Is No Single Standard"

**The counterargument.** A buyer is entitled to be suspicious of any supplier who opens with "there is no formal standard." In practice, that framing is sometimes a shield: with no external authority to enforce a definition, a factory can label anything "premium," quote a flattering ash figure, and never be audited against it. The objection is genuinely valid whenever a quality claim is an adjective — "clean burn," "low ash," "best grade" — carrying no number, no test method, and no document a customs broker or QC lab could check.

**Where it holds.** It holds against suppliers who blur the line the page itself names — presenting a certification they merely *hold* (an ISO badge, a Halal mark) as if it certified the *batch* in the container, or quoting an ash percentage with no method and no third-party report behind it. Against that kind of seller, "no single standard" really does mean "trust me."

**The rebuttal, on this page's own facts.** This factory answers the objection by attaching a number and a method to every claim. Ash is not described as "low" but graded in three named bands by actual percentage — Platinum (1.6–1.9%), Super Premium (1.9–2.3%), Premium (2.3–2.5%+) — with the flagship grade at a typical 1.6–1.9% ash, measured by ASTM D1762-84(2021). The rubric is openly disclaimed as the factory's own evaluation, not an ISO or industry standard, so the buyer is never misled about its status. And the numbers are not self-asserted: an independent third-party laboratory (Carsurin, Beckjorindo, or SGS) tests ash, moisture, fixed carbon, and volatile matter on every container; a Certificate of Analysis stating the measured values for that specific batch ships with each shipment; and a sample is available to test the specs before you commit. The held-versus-provided distinction — ISO 9001:2015 and Halal as standing certifications, COA and lab report as per-order proof — is kept explicit precisely because conflating them is the trick the objection warns about. "No single standard" is not the absence of accountability here; it is the reason the proof has to ride with the goods rather than hang on a wall.

## 5. Ontological completeness & triangulation

- **Genesis — explicit.** "100% coconut shell charcoal — no wood, no sawdust filler — carbonized and then briquetted with a {{binder}} binder," pressed by the named factory. Source-as-author is clear; the E-E-A-T block (authored / reviewed / fact-checked) reinforces it.
- **Taxonomy — explicit and well-connected.** Two classification axes: material (coconut vs wood/sawdust) and parameter-class (lab-measured Tier A vs observed Tier B; ash / fixed carbon / VM / moisture / calorific). The ash rubric adds an internal grade taxonomy (Platinum/Super Premium/Premium). Charcoal's place in the testing-standard world is correct (ASTM D1762-84, ISO 18125) — no coal/coke leakage.
- **Pragmatics — explicit.** Buyer value is named in concrete terms: "lower ash means a cleaner burn, less tray residue, and better airflow," plus the verify-it-yourself sample path. The "is this good?" question is routed to a number, not an adjective.
- **Weakest connectivity — burn time as an isolated entity.** Burn time (120 min typ.) appears in at-a-glance, table, and FAQ but is only loosely tied to the rest; its dependence on "cube size, heat management, and bowl setup" is stated in the FAQ but not where the number first appears. Minor — the Tier B caveat already governs it; no action required beyond awareness.
- **Held-vs-provided relation — strongly triangulated.** The ISO/Halal (held) vs COA/lab-report/SHT (provided) distinction is the page's load-bearing relationship and is restated consistently across the certifications child, the prove section, and the FAQ without contradiction.
- **Self-attribution honesty — a strength, not a gap.** The framework openly labels its own rubric "not an industry or ISO standard," which closes the most likely AI-citation trust gap and pre-empts the Devil's Advocate objection.

## 6. Gaps needing owner data

- None. Every rewrite above uses facts already present in src/i18n/en/quality.json or resolvable via `qualityTokens()` from src/config/company.ts (ash 1.6–1.9%/≤2.0, ASTM D1762-84(2021), labs Carsurin/Beckjorindo/SGS, every container). No `<NEEDS-OWNER-DATA>` placeholder required.
