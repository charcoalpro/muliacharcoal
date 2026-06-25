# Content Audit & Targeted Rewrite — Specifications Explained
**Route:** /quality/specifications-explained · **Source:** src/i18n/en/qualitySpecs.json, src/i18n/en/qualityCommon.json (en.qualitySpecs)

This is a reference/definitional page: it owns what each spec parameter *means*, which direction is "good," and what a strong value looks like. The lab procedure is deliberately delegated to `/quality/testing-methods` and the ash bands to the `/quality` hub (`#ash-framework`) — both are intentional omissions per the `.astro` top comment, not gaps. All spec figures render from `company.quality.specs`; nothing is hardcoded. The page is honesty-clean (no "guaranteed," targets framed as "stated aim," burn time/ash color explicitly flagged as observed not lab-measured).

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | Parameter H3s are noun labels ("Ash content", "Fixed carbon") and the two tier H2s are category labels. They map cleanly to "What is X / is it good?" and the body answers exactly that, but the headings themselves are not in question form. The COA H2 ("Reading a Certificate of Analysis") and all 5 FAQ items ARE question-mapped. Reference page, so this is mild — but the H3s could be lifted to question form for snippet capture. |
| 2. Featured-snippet lead | PASS | Every parameter opens with a self-contained definition sentence ("Ash content is the percentage of non-combustible mineral residue left after charcoal fully burns…"; "Calorific value is the gross heat released per kilogram…"). Direction-of-good and the factory value follow. Textbook snippet structure. |
| 3. Paragraph intent | PASS | Each parameter = two paragraphs: (a) define + direction-of-good [intent: "what does this number mean?"], (b) factory typical+target [intent: "is *their* product good?"], plus a "how it's measured" link [intent: "prove it / show method"]. No stray paragraphs. |
| 4. No fluff + anti-bloat | PASS | Tight throughout. Definitions carry concrete mechanism ("chokes airflow," "wastes shipped weight," "more prone to mold in transit"). No restatement, no filler adjectives. KeyFacts definition line ("A compact echo of the typical values…") is the only borderline line; acceptable as a box caption. |
| 5. Section purity | PASS | Tier A (lab-measured) and Tier B (observed) are cleanly separated; the Tier B intro explicitly states the distinction ("read under defined conditions, not measured to a laboratory standard"). COA-reading is its own cluster. No bleed. |
| 6. Structure | PASS | Logical flow: define the question → KeyFacts echo → 5 lab params → 2 observed params → how to read a COA → FAQ → related. No logic gaps, no duplicated meaning (FAQ restates 4 of the points but in extractable Q&A form by GEO design, not as accidental duplication). |
| 7. Devil's Advocate | FAIL | No section addressing the strongest counter-view (spec sheets can be gamed / lab numbers ≠ session experience). The page has an implicit thesis ("judge charcoal by these parameters; low ash + high fixed carbon = good") that invites a real industry rebuttal. See §4 — a balanced section is draftable entirely from on-site facts. |
| 8. Quantified evidence | PASS | Every benefit claim is backed by a real figure from config: ash 1.6–1.9% (target ≤2.0), fixed carbon 75% (≥72), moisture 6% (≤8), volatile 12% (≤14), calorific 7500 kcal/kg (≥7200), burn time 120 min (≥90), silver-white ash. Three-tier ash bands cited with exact ranges. No fabrication. |
| 9. Mini-cases | N/A | No real problem→action→result case data exists on-site for this page, and none should be invented. Correctly absent. The "request a sample to test the specs yourself" hook is the legitimate evidence substitute and is present. |
| 10. Ontological completeness | PARTIAL | Strong taxonomy (Tier A vs Tier B; ash → three-grade rubric) and pragmatics (each spec tied to buyer-visible behavior: airflow, residue, light-up, mold). Genesis is thin: the page names {{brand}} but never anchors *why coconut shell* drives these numbers (the source material is the reason ash is low and fixed carbon high) — that relationship is left implicit. One entity link gap: the binderless/additive composition fact (in `qualityCommon.composition`) is never surfaced here even though it directly explains low volatile matter / clean ash. |

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "Every number on a spec sheet…" (hero subtitle) | "how do I read a charcoal spec sheet" — framing | keep |
| "This page sits under {{brand}}'s…" (intro p1) | navigational / pillar context | keep |
| "These are specs you can test yourself…" (sample note) | "can I verify this myself" → conversion to /samples | keep |
| "The parameters, defined below" (KeyFacts) | "give me the numbers fast" — at-a-glance scan | keep |
| "These five are determined in a laboratory…" (Tier A intro) | "which specs are lab-grade" — credibility tiering | keep |
| "Ash content is the percentage of…" | "what is ash content / good ash for shisha" | keep |
| "Fixed carbon is the share of…" | "what is fixed carbon in charcoal" | keep |
| "Moisture content is the percentage of water…" | "why does charcoal moisture matter" | keep |
| "Volatile matter is the portion that…" | "what is volatile matter / why low for shisha" | keep |
| "Calorific value is the gross heat…" | "what is calorific value kcal/kg" | keep |
| "These describe how the charcoal behaves…" (Tier B intro) | "are burn time / ash color reliable specs" — sets honest expectation | keep |
| "Burn time is how long a single coal…" | "how long does shisha charcoal burn" | keep |
| "Ash color is the color of the residue…" | "what does ash color tell you" | keep |
| "When the Certificate of Analysis for your batch…" (COA) | "how to read a charcoal COA" — high buyer value | keep |
| FAQ ×5 ("What is a good ash content…" etc.) | direct extractable Q&A for GEO / snippets | keep |
| "Related topics" list | navigational / internal-link equity | keep |
| — (missing) | "but specs can be faked / specs ≠ real session" — skeptical buyer | **add (Devil's Advocate)** |

Every existing paragraph serves a distinct intent. Nothing to compress or delete.

## 3. Targeted rewrites

The page passes rules 2–6 and 8 with no changes needed. Only three real gaps warrant a rewrite.

### Rule 7 — Devil's Advocate (missing section)
There is no section at all. Add the complete section drafted in §4 below (a new `objection` block in `qualitySpecs.json`, rendered after the COA section / before the FAQ). It needs no figures beyond those already on the page.

### Rule 1 — Heading-to-question (optional uplift, snippet capture)
The parameter H3s are bare nouns. The site convention keeps labels short (they double as KeyFacts labels via `qualityCommon.params`), so the visible H3 text should stay as-is. **No JSON change recommended** — instead, the snippet-question intent is already captured by the FAQ block (ash, calorific, burn time, COA). The one common buyer question *not* yet in the FAQ is moisture; adding it closes the gap cleanly:

CURRENT `faq.items` — no moisture entry.

ADD (paste as a new object in `faq.items`, e.g. after the calorific item):
```json
{
  "q": "Why does moisture content matter in shisha charcoal?",
  "a": "Moisture is water held in the coal, and lower is better. Damp charcoal is slow to light, can smoke or spit, and is more prone to mold in transit — and you pay ocean freight on water weight you cannot burn. {{brand}}'s typical moisture content is {{moistureTypical}}%, with a target of {{moistureTarget}}% or lower."
}
```

### Rule 10 — Genesis link (coconut shell → why these numbers)
The "why coconut shell" causal link is implicit. Tighten the hero subtitle so the source material is named once, anchoring every downstream number to its cause without adding a claim.

CURRENT (`heroSubtitle`):
> "Every number on a spec sheet answers a buyer's question: is this good? This page defines each parameter of {{brand}}'s coconut shell shisha charcoal, says which direction is better, and shows what a strong value looks like."

CORRECTED:
> "Every number on a spec sheet answers one buyer question: is this good? This page defines each parameter of {{brand}}'s coconut shell shisha charcoal — the dense shell feedstock is what drives the low ash and high fixed carbon below — says which direction is better, and shows what a strong value looks like."

### Rule 10 — surface the binderless/additive fact (entity gap)
The composition fact (no additives, tapioca-starch binder only) already lives in config (`specs.additives`, `specs.binder`) and `qualityCommon.composition`, and it directly explains the low volatile matter and clean ash this page benchmarks — yet it never appears here. Add one sentence to the volatile-matter `body` to close the loop, drawing only on the existing composition string.

CURRENT (`params.volatileMatter.body`):
> "Volatile matter is the portion that vaporizes and burns off as gas when the charcoal is heated, rather than burning as solid carbon. For shisha, lower is better — high volatile matter is associated with more smoke and off-odors that can carry into the session."

CORRECTED:
> "Volatile matter is the portion that vaporizes and burns off as gas when the charcoal is heated, rather than burning as solid carbon. For shisha, lower is better — high volatile matter is associated with more smoke and off-odors that can carry into the session. {{brand}}'s briquettes use no chemical additives or accelerants — only a food-grade {{binder}} binder — so the volatile fraction comes from the carbonized shell itself, not from igniting agents."

(Wording mirrors `qualityCommon.composition.withBinder`, `specs.additives` and `specs.binder`. **Do not** phrase this as "no added binders" / "binderless" — the product contains a natural tapioca-starch binder, so the `{{binder}}` token MUST stay in the sentence to avoid a binderless over-claim.)

## 4. Devil's Advocate section

The page's implicit thesis is: *judge coconut shisha charcoal by these lab parameters — low ash and high fixed carbon mean a good coal.* The strongest real industry counter-argument is that spec sheets are easy to publish and hard to trust, and that a clean lab number does not guarantee a good session. This holds often enough to deserve a direct answer. Draft below (English-only; production locale = en). Suggested JSON key: `qualitySpecs.objection`, rendered as an H2 before the FAQ.

```json
"objection": {
  "heading": "Don't spec sheets lie? Why trust these numbers?",
  "lead": "It's a fair objection: any factory can type \"1.8% ash\" into a PDF, and a clean lab figure on paper does not guarantee a clean session in your customers' bowls. Experienced buyers are right to distrust an unverified spec sheet.",
  "body": "Two things separate a real number from a marketing one. First, every figure on this page is published as a typical value plus a target bound, not a single flattering headline — and each target is stated as an aim, not a warranty. A factory gaming its specs quotes one perfect number; an honest one shows its range. Second, these are specs you can confirm without taking our word for it. Ash, moisture, volatile matter, and calorific value are all determined by defined test methods you can have re-run independently, and burn time and ash color are deliberately filed as observed indicators, not lab claims — we tell you which numbers are lab-grade and which are not. The decisive answer to \"does the paper match the coal?\" is a sample: request one, run your own bowl test, and check the Certificate of Analysis that ships with your batch line-by-line against the targets above. The spec sheet is the claim; the sample and the COA are how you verify it.",
  "ctaLabel": "Request a sample to verify"
}
```

Every fact in this rebuttal — typical+target framing, target-as-aim (not warranty), the lab-vs-observed tier split, the COA-against-targets check, and the sample offer — is already present on the page or in `company.quality`. No new numbers introduced.

## 5. Ontological completeness & triangulation

- **Genesis (weak → fixable on-site):** Factory-as-source is named ({{brand}}), but the *material* genesis — coconut shell feedstock as the physical reason ash is low and fixed carbon high — is never made explicit. §3 hero rewrite + the volatile-matter composition sentence close this without any new claim.
- **Taxonomy (strong):** Clear two-level classification — Tier A (lab-measured) vs Tier B (observed), and within ash a three-grade rubric (Platinum/Super Premium/Premium) correctly framed as the factory's own rubric, "not an industry standard." This is the page's best ontological feature.
- **Pragmatics (strong):** Every parameter is tied to a buyer-visible consequence (tray residue, airflow, light-up speed, smoke/odor, mold, freight weight). The COA section converts specs into a buyer action ("a figure outside a target bound is your cue to ask about the batch before shipment").
- **Isolated entity — composition:** The binderless / no-additives fact is a parent cause of the low volatile matter and clean ash this page benchmarks, yet sits unlinked here (it lives in config and on other quality pages). The §3 volatile-matter edit wires it in.
- **Cross-link health (good):** Each parameter links sideways to its testing method; ash links up to the hub framework; COA links to certifications and testing-methods. The only relation left implicit is spec → product SKU (a SKU's exact values fall within these ranges) — acceptable, since per-SKU values are deliberately out of scope (Products cocoon).

## 6. Gaps needing owner data

- None. Every recommended rewrite (Devil's Advocate section, moisture FAQ, hero Genesis line, volatile-matter composition sentence) is buildable entirely from facts already in `company.quality` (`specs.*`, `ashGradingFramework`, `specsLastUpdated`) and existing i18n strings. No fabricated or owner-pending figures.
