# Content Audit & Targeted Rewrite — Production Capacity
**Route:** /factory/capacity · **Source:** src/i18n/en/factoryCapacity.json, src/i18n/en/factoryCommon.json (en.factoryCapacity)

This is a factory-pillar reference page: extractable capacity facts (14 t/day, 350 t/month, ≈4,200 t/year, 4 lines, 8 ovens, 86 staff), a container-throughput table, a headroom/deprioritization reassurance, the equipment list, gated Ramadan guidance, lead times, and a 5-item FAQ. It carries WebPage schema (no FAQPage by design). Every number on the page traces to `company.production.*`, `commercial.containerCapacity`, `commercial.leadTime`, and `factory.equipment` — all verified consistent. The page is already strong; gaps are small and mostly heading-phrasing.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | H1 and most H2s are noun labels ("Container throughput", "Equipment behind the numbers", "Lead times", "Seasonal peaks & Ramadan"). They map cleanly to buyer questions and the FAQ restates them as questions, but the visible H2s themselves are not interrogative. "Headroom — you won't be deprioritized" is the one that already implies its question. |
| 2. Featured-snippet lead | PASS | Every section opens with a self-contained answer sentence before elaborating: throughput ("What that capacity means per container. A 20-foot container holds about 18 tons…"), headroom ("…a single 20-foot container… is roughly 5% of our output"), equipment ("backed by real machinery, not a paper claim"), lead time ("Production runs 14–21 days…"). TL;DR box up top is fully extractable. |
| 3. Paragraph intent | PASS | Each paragraph serves one intent — see intent map. No stray paragraphs. |
| 4. No fluff + anti-bloat | PARTIAL | Mostly tight. Two soft spots: intro p1 ("so you can size your program with confidence") and the equipment lead's rhetorical "not a paper claim" carry attitude over info. Headroom body restates the 5% point already in TL;DR and at-a-glance; mild redundancy by design (reassurance), acceptable but trimmable. |
| 5. Section purity | PASS | Throughput = per-container math; headroom = share/priority; equipment = machinery; lead time = duration; Ramadan = seasonal. No cluster bleed. |
| 6. Structure | PASS | Logical flow: total capacity → per-container → headroom → equipment proof → seasonal → lead time → FAQ. Full coverage for a capacity page. Headroom 5% appears in TL;DR, at-a-glance (implied), headroom body, and FAQ — intentional reinforcement of the primary reassurance, not accidental duplication. |
| 7. Devil's Advocate | N/A | Procedural/reference page. Its implicit thesis ("we have ample headroom; you won't be deprioritized") is already steel-manned by the gated `caveat` line ("Capacity figures are typical, not a guarantee; available slots are confirmed at order") and the Ramadan section. A standalone opposing-view H2 would be over-engineering for a spec page — see §4. |
| 8. Quantified evidence | PASS | Strongest rule on the page. Every claim is numeric and on-site: 14 t/day, 350 t/month, ≈4,200 t/yr, 4 lines, 8 ovens × 1.5 t/batch × 24 h, 86 staff, 18 t per 20ft (5%), 26 t per 40ft (7%), 14–21 day lead, ≈19 containers/month. Equipment list gives qty + spec per machine. |
| 9. Mini-cases | N/A | No real problem→action→result buyer case exists in source or company.ts. Correctly omitted; not fabricated. |
| 10. Ontological completeness | PASS | Genesis (named factory in Semarang, equipment, ovens), Taxonomy (coconut shisha charcoal, carbonization→briquetting chain), Pragmatics (per-container share, deprioritization answer, lead time for repeat vs new brand) all explicit. Minor gap: "carbonization ovens" relationship to the upstream carbonization plant (Bitung) is not linked here — see §5. |

**Original-page score: 88/100** — factually airtight, well-structured, strong snippet leads and quantification. Held back only by non-interrogative H2 labels (rule 1) and two minor fluff phrases (rule 4).

## 2. Intent map

| Section / para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| `tldr` "{{brand}} produces about 14 tons…" | "how much coconut charcoal can this factory make" — extractable summary | keep |
| `intro.p1` "This page covers how much…" | Orientation + pillar up-link | compress (trim "with confidence") |
| `atAGlance` "Capacity at a glance" + 6 facts | "factory capacity / lines / ovens / workforce at a glance" — scannable specs | keep |
| `throughput.h2/body` "Container throughput" | "how many tons per 20ft/40ft container" | keep; rephrase heading (rule 1) |
| `throughput` table | "20ft vs 40ft net payload + lead time" comparison | keep |
| `headroom.h2/body` "Headroom — you won't be deprioritized" | "will a small buyer be deprioritized vs big accounts" — trust intent | keep; light compress |
| `headroom.caveat` "Capacity figures are typical…" | Honesty/expectation-setting | keep |
| `equipment.h2/body` "Equipment behind the numbers" | "is this a real factory or a trader" — verification intent | keep; trim "not a paper claim" |
| `equipment` list + `ovensNote` | "what machinery / how many ovens" — proof of capacity | keep |
| `ramadan.h2` + `ramadanLeadNote` | "can you handle Ramadan / seasonal peak" — timing-risk intent | keep; rephrase heading |
| `leadTime.h2/body` "Lead times" | "how long to produce a container" | keep; rephrase heading |
| `faq` 5 items | Direct buyer Q&A, AI-citation format | keep |
| `related` links | Internal linking / navigation | keep |

## 3. Targeted rewrites

Only real gaps below. Snippet leads, quantification, and structure already pass — not rewritten.

### 3.1 Rule 1 — H2s to question form

The H2 labels are correct in content but should read as the buyer's actual question to maximize snippet/AI capture. Suggested question-form rewrites (values are JSON-paste-ready):

**`throughput.h2`**
- Current: `"Container throughput"`
- Corrected: `"How many tons fit in a container?"`

**`headroom.h2`**
- Current: `"Headroom — you won't be deprioritized"`
- Corrected: `"Will my order be deprioritized behind bigger buyers?"`

**`equipment.h2`**
- Current: `"Equipment behind the numbers"`
- Corrected: `"What equipment backs the capacity figures?"`

**`ramadan.h2`**
- Current: `"Seasonal peaks & Ramadan"`
- Corrected: `"Can you handle a Ramadan or seasonal peak?"`

**`leadTime.h2`**
- Current: `"Lead times"`
- Corrected: `"How long does it take to produce a container?"`

> Note: these duplicate FAQ question wording almost verbatim. If the team prefers to keep the FAQ as the canonical question block and the body H2s as short scannable labels (a defensible editorial choice for a spec page), then leave the H2s as-is and mark rule 1 PASS-by-design. Recommended middle path: convert `leadTime.h2`, `ramadan.h2`, and `throughput.h2` to questions (highest snippet value), keep `headroom`/`equipment` labels.

### 3.2 Rule 4 — trim fluff in intro

- Rule: No fluff / anti-bloat
- Current (`intro.p1`): `"This page covers how much we can make and how fast, so you can size your program with confidence. It is part of our"`
- Corrected: `"This page covers how much we can make and how fast, so you can size your program. It is part of our"`

(Drops "with confidence" — empty reassurance; the numbers carry the confidence.)

### 3.3 Rule 4 — trim rhetorical filler in equipment lead

- Rule: No fluff / anti-bloat
- Current (`equipment.body`): `"The capacity figures are backed by real machinery, not a paper claim. Across {{productionLines}} production lines we run:"`
- Corrected: `"These figures are backed by named machinery on {{productionLines}} production lines:"`

(Drops the defensive "not a paper claim"; the itemized equipment list is the proof and speaks for itself. Tighter snippet lead.)

### 3.4 Rule 4 — headroom body restates the 5% twice in one paragraph

- Rule: No fluff / anti-bloat (mild)
- Current (`headroom.body`): `"At {{capacityMonth}} tons a month, a single 20-foot container — about {{moqTons}} tons — is roughly {{oneContainerPctOfMonthly}}% of our output. A monthly container, or several, sits comfortably within capacity, with room to scale your program as it grows without us deprioritizing existing buyers."`
- Corrected: `"At {{capacityMonth}} tons a month, a single 20-foot container — about {{moqTons}} tons — is roughly {{oneContainerPctOfMonthly}}% of our output. A monthly container, or several, fits comfortably alongside existing buyers, with room to scale as your program grows."`

(Removes the slightly tangled "without us deprioritizing existing buyers" tail — the heading already answers the deprioritization question; this keeps the scale-up point cleanly.)

## 4. Devil's Advocate section

N/A — this is a procedural/reference capacity page, not an argued thesis. Its only implicit claim ("ample headroom, no deprioritization") is already honestly bounded on-page by `headroom.caveat` ("Capacity figures are typical, not a guarantee; available slots are confirmed at order") and the Ramadan section's first-confirmed-slot warning, which together pre-empt the strongest real counter ("stated capacity ≠ available capacity in peak season"). A dedicated opposing-view H2 would add bloat without adding a fact the page does not already concede.

## 5. Ontological completeness & triangulation

- **Genesis (factory-as-source): explicit.** Named factory in Semarang, 4 lines, 8 ovens, 86 staff, itemized machinery — strong. One missing edge: the page's "carbonization ovens" are downstream of the **carbonization plant in Bitung** (`production.carbonizationPlant`). Linking that relationship (raw shell carbonized in Bitung → briquetted in Semarang) would close a real entity gap and reinforce the supply chain. Consider a one-clause cross-link to `/factory/raw-materials`.
- **Taxonomy (charcoal-classification position): explicit but light.** "Coconut shisha charcoal" and the carbonize→mill→mix→press→dry chain are named via the equipment list, but the page never states *where coconut-shell briquettes sit vs lump/extruded or vs bamboo/wood* — that's owned by `/guide` and `/factory/production-process`, so acceptable to leave; the existing link to production-process covers it.
- **Pragmatics (buyer value): explicit and strong.** Per-container share (5% / 7%), deprioritization answer, repeat-vs-new-brand lead split (14 vs 21 days), and seasonal scheduling all translate raw capacity into buyer decisions. This is the page's best dimension.
- **Weak-connectivity entity:** the 40ft container (26 t, 7%) appears only in the throughput table and is never referenced in prose, headroom, or lead time — the lead-time row reuses the 20ft `leadTimeLabel` for the 40ft column. Not wrong (production duration is similar), but the 40ft entity is semantically isolated. Acceptable for a page whose MOQ is one 20ft; no action required unless 40ft becomes a promoted option.
- **Triangulation verdict:** Genesis ✓, Taxonomy ✓ (delegated to siblings), Pragmatics ✓ — all three corners present. Only the Genesis→carbonization-plant link is a closable gap.

## 6. Gaps needing owner data

None. Every figure, lead time, and the equipment list are already present and internally consistent in `company.json` (`production.*`, `commercial.containerCapacity`, `commercial.leadTime`, `factory.equipment`, `factory.ramadanLeadNote`). No `<NEEDS-OWNER-DATA>` placeholders were required. (Note: `factory.equipment` and `ramadanLeadNote` carry the 2026-06-19 DRAFT-pending-owner-verification flag in company.ts — that is an existing source-of-truth caveat, not a content-audit gap, and is out of scope for this prose audit.)
