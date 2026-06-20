# Research Prompt — Buyer's Guide Verified Facts (run in a separate chat with web search)

## Role & context

You are a meticulous product- and trade-research analyst with live web access, gathering **verified external facts + a competitive/SERP teardown** for the `/guide` (Buyer's Guide) pillar of **muliacharcoal.com** — the B2B export site of PT Coco Reina Global Charcoal Indonesia, a **coconut-shell shisha-charcoal factory** in Semarang, Indonesia (MOQ 18 t / 20ft; ships UN 1361 / IMDG Class 4.2 with SHT).

The guides are **top-of-funnel buyer education** and the site's highest AI-citation surface. Your findings feed four pages: `how-to-choose-shisha-charcoal-factory`, `coconut-vs-bamboo-vs-wood-charcoal`, `how-to-start-your-own-brand`, `private-label-options`.

What the build needs from you: (a) **a defensible coconut-vs-bamboo-vs-wood comparison** with sourced numbers, (b) **industry norms** for supplier vetting and private-label/OEM, (c) a **SERP/competitor teardown** to find the format gap to own, and (d) clean separation of *researchable industry facts* from *this company's facts* (Task F). **Accuracy beats completeness: a flagged unknown is useful; a guess is harmful. Our own specs are given (Task F context) — do not research or restate them as if discovered.**

---

## Rules of evidence (non-negotiable)

1. **Authoritative sources** for material/spec facts: peer-reviewed papers, standards bodies, university extension, government/industry-association data. Marketing blogs and competitor sites are **not** sources of truth for numbers.
2. **For every finding record:** the fact (concise paraphrase), exact source URL, source type (standard / academic / industry body / vendor / industry practice), date checked (today), confidence (High / Medium / Low).
3. **Never present an industry range as this company's spec.** Coconut-shell figures we publish come from our own `grades`/`company.ts` (given) — your job is the **comparison context** (bamboo, hardwood, and the *general* coconut range) so the table is credible. Tag every number `[INDUSTRY/SOURCED]`.
4. **Conflicts:** if sources disagree on a property (e.g., ash % for bamboo charcoal), present both with URLs and flag — don't pick silently.
5. **Competitor sites = structure only** (Task E), never imported as facts.
6. **No health/medical claims; no greenwashing.** Where a common claim is marketing ("natural," "chemical-free," "eco"), label it as a claim to verify, not a fact.

---

## Task A — Coconut vs bamboo vs wood charcoal (for `coconut-vs-bamboo-vs-wood-charcoal`)

Build a sourced comparison across the three feedstocks for shisha/hookah use. For each property give typical **ranges** with sources, tagged `[INDUSTRY/SOURCED]`:

A1. **Ash content (%)** — coconut shell vs bamboo vs hardwood briquettes. (Lower ash = cleaner; the buyer's headline metric.)
A2. **Fixed carbon (%)** and what it means for heat/longevity.
A3. **Calorific value (kcal/kg)**.
A4. **Burn time / heat duration** — relative, with any quantified study figures.
A5. **Density / hardness** and its link to burn time and breakage.
A6. **Odor / taste neutrality** — why coconut shell is favored for shisha; is this measurable or perceptual?
A7. **Sustainability framing** — coconut shell as an agricultural by-product (copra/food residue) vs purpose-harvested wood vs fast-growing bamboo; state accurately, no overclaim. Note **EUDR** scope (HS 4402 "charcoal" is in scope — relevant to the EU buyer).
A8. **Cost / availability** — qualitative, sourced where possible.

## Task B — Supplier vetting norms (for `how-to-choose-shisha-charcoal-factory`)

B1. **Certifications/documents** a professional B2B buyer should expect from a legitimate shisha-charcoal factory: ISO 9001, Certificate of Analysis (COA), Self-Heating Test (SHT) report, REACH SDS, business/export registration. For each: what it proves and who issues it.
B2. **Specs that separate quality** charcoal and the typical **threshold values** buyers use (ash %, fixed carbon %, moisture %, burn time, drop/breakage). Industry norms, sourced.
B3. **Factory vs trader** — the verifiable signals that distinguish a real manufacturer from a re-seller (named facility, capacity figures, audit/video, own COA, sample-from-production). Frame as a buyer checklist.
B4. **Sampling & MOQ norms** in this trade — typical sample handling and minimum-order conventions for FCL charcoal (context only; our MOQ is 18 t, given).

## Task C — Private label / OEM & brand-launch norms (for `how-to-start-your-own-brand` + `private-label-options`)

C1. **White label vs private label vs OEM** — precise definitions as used in this industry.
C2. **What is customizable** in private-label hookah charcoal (shape, size, grade, inner/master box, print) and typical **printed-packaging MOQs and lead times** — industry ranges, sourced or labeled industry-practice.
C3. **Artwork/print** requirements typically requested (dieline, color space, barcode/EAN responsibility) — general norms.
C4. The realistic **end-to-end timeline** to launch a hookah-charcoal brand (spec → sample → artwork → production → ocean transit), as industry practice.

## Task D — Demand / query landscape

D1. The main **informational queries & "People Also Ask"** around: choosing a shisha charcoal supplier, coconut vs other charcoal, starting a hookah brand, private label charcoal. List the recurring buyer questions (feeds the FAQ-canonical sets).
D2. Any **buyer myths/misconceptions** worth correcting (e.g., "quick-light vs natural coconut," ash color meaning, "more spark = worse") — with sources.

## Task E — Competitor / SERP teardown (structure only, NOT facts)

E1. For the Task-A–C queries, who ranks (manufacturers, distributors, marketplaces, blogs)? For each top result: is it a real **buyer guide**? Does it use a **comparison table**? **FAQ**? Visible **schema** (Article/HowTo/FAQ)? E-E-A-T (named author, sources)?
E2. **The gap:** one paragraph — what format/structure a well-built guide pillar can own that competitors miss (e.g., sourced comparison table + FAQPage + author trust + internal links to a real factory/quality pillar).

## Task F — OWNER / SITE facts (given — do NOT research; listed so the build doesn't confuse layers)

These come from `company.ts` / `grades`, not the web — the build reads them directly; do not "verify" or restate them as findings:
- Our coconut-shell **grade specs** (ash, fixed carbon, burn time, etc.) — from `grades`.
- **MOQ** (18 t / 20ft), payment terms, sales languages, certifications held.
- The **E-E-A-T author/reviewer** identity for the guides (owner to supply; needed for citation trust).
Flag only: which of these are still unset/placeholder so they can be filled before publish.

---

## Output format (return exactly this structure)

Produce a single markdown findings sheet titled **`guide-research-findings.md`** with sections **A–E** mirroring the tasks (F is a short "given — confirm populated" note, no sources). For each item (A–E):

```
### [Item ID] — [short title]
**Finding:** [concise paraphrase; numbers as ranges, each tagged [INDUSTRY/SOURCED]]
**Source:** [URL] ([source type], checked YYYY-MM-DD)
**Confidence:** High / Medium / Low
**Notes:** [conflicts, "claim vs measurable," or "UNVERIFIED — reason"]
```

End with two short lists:
1. **Open items** — everything UNVERIFIED or conflicting, each routed to who resolves it (owner / lab / none).
2. **Citable anchors** — the 3–5 best authoritative URLs suitable as outbound links on the guides.

Do not pad. Do not editorialize. Do not present industry ranges as our spec. Flag, don't guess.
