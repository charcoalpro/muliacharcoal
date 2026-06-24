# Content Audit — `/guide/coconut-vs-bamboo-vs-wood-charcoal`

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report; no fixes). Passes 0,1,2,3,5. Pass 6 OFF.
**Cornerstone:** YES (guide lead article).

---

## 1. Manifest (Pass 0)

| Field | Value |
|---|---|
| Route | `/guide/coconut-vs-bamboo-vs-wood-charcoal` |
| Pillar | guide |
| Source file | `src/pages/guide/coconut-vs-bamboo-vs-wood-charcoal.astro` |
| Built HTML | `dist/guide/coconut-vs-bamboo-vs-wood-charcoal/index.html` (single-line, line 110) |
| Layout | `BaseLayout.astro` (`type="article"`, `includeOrgSchema={false}`) |
| Components | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `TableOfContents`, `MaybeLink`, `ExternalLink`, `SpecsTable`, `Figure` (packaging), `FAQSection`, `CTABanner` |
| i18n namespace | `en.guide.compare.*` (+ `en.guide.common.metaBlock.*`) — `src/i18n/en/guide.json` |
| company.ts fields consumed | `guide.editorial.coconutVsBambooVsWood` (dates), `governance.author/reviewer/factChecker` (E-E-A-T, via `ArticleMeta` + `personRef`), `whatsapp.presetMessages.salesGeneral`, `waLinkFor('salesGeneral')` |
| Data sources for table | Coconut column = min–max across `src/config/grades.ts`; bamboo/wood cells = cited literals in `guide.json` (cite-or-omit) |
| Schema emitted | `['WebPage','Article']` (#webpage), `Person`×2 (author, reviewer), `FAQPage` (#faq, 3 Q&A), `DefinedTerm`×4 (fixed-carbon, ash-content, calorific-value, volatile-matter → /glossary anchors), `ItemList` (#comparison, 3 items), `BreadcrumbList` (from `Breadcrumbs`) |
| Build | Pre-built `dist/` read read-only (no npm/git run, per constraints). HTML present and complete. |

**Schema TYPE & PLACEMENT verdict (in scope):** Correct. Article on a guide lead article is right; BreadcrumbList is emitted (page is depth-2); DefinedTerm @ids resolve to real glossary anchors (`ash-content`, `fixed-carbon`, `calorific-value`, `volatile-matter` all present in `glossary.json`). **FAQPage is NOT misplaced here** — see note below.

**Note on FAQPage (anti-false-flag):** The methodology line "FAQPage emits ONLY at /faq" does not reflect this site's actual architecture. FAQPage is the deliberate sitewide GEO pattern and is emitted on `/faq`, `/quality/certifications`, `/logistics/un-1361`, and the sibling guide cornerstone `/guide/how-to-choose-shisha-charcoal-factory` (all verified in `dist/`). This page's own build spec (`docs/build-prompts/guide/guide-coconut-vs-bamboo-vs-wood-build-prompt-v1.md` §3 and §4 Gate) explicitly mandates "FAQPage (article-canonical)". The canonical-FAQ-home rule (SHT→un-1361, COA→certifications, MSDS→documents) governs which page owns which Q&A *topic*, not a ban on the schema type. The three Q&As here are material-comparison topics (ash %, burn-time vs wood, calorific overlap) correctly homed on this page. **No finding raised.**

---

## 2. Severity-tiered TODO list

### Blockers
*None.* Pass-1 gates all clear: no hardcoded company fact (only `'whatsapp_click'` event-name string and the correctly-imported `company.whatsapp.presetMessages.salesGeneral`); every trust element is honesty-gated; pillar up-link + down-link + incoming link all present; no misplaced FAQPage; no regulatory claim now factually wrong.

### Defects

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 2 — Mini-cases (cornerstone ≥1–2 Problem→Action→Result with a measurable result) | Whole article body (`src/pages/...coconut-vs-bamboo-vs-wood-charcoal.astro` lines 224–262); i18n `guide.compare.sections.*` | No Problem → Action → Result mini-case anywhere. The page is fully comparative/expository but carries zero concrete buyer scenario with a measured outcome — a required cornerstone format that also drives AI extraction. | Add 1–2 short mini-cases as new `guide.compare` i18n keys rendered after `whyCoconut` or `combustion` — e.g. a buyer who switched from under-carbonized lump to a controlled-density coconut cube and measured ash/burn-time deltas, framed strictly from `grades.ts` ranges and cited sources (no new uncited numbers, no company-fact literals). Human-authored; do NOT auto-write figures. |
| D2 | Defect | Pass 2 — Devil's Advocate (cornerstone must carry a steelman of the strongest counterargument + data-grounded response) | `#why-coconut` section (lines 239–247) and `#bamboo` (lines 229–232) | The steelman EXISTS in substance — "coconut and well-carbonized bamboo overlap heavily [on fixed carbon and calorific value] — so the case for coconut does not rest on raw energy content" (whyCoconut.body1), reinforced by bamboo.body "Bamboo's real edge is sustainability." But it is woven into the pro-coconut section, not surfaced as a discrete, signposted counterargument block, so a crawler/AI is less likely to extract it as "the case against coconut." Borderline Defect on a cornerstone. | Promote the existing concession into a clearly-labeled H2/H3 question (e.g. "When is bamboo the better choice?") that states the counterargument, names when it holds (high-temp carbonization, sustainability-led buyers), then gives the data-grounded rebuttal already present (ash/density/taste). Reuses content already verified; no new claims. |

### Hardening

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 2 — Headings as questions | H2s at lines 196 (`comparison-table-heading` "Coconut vs bamboo vs wood charcoal, compared"), 240 ("Why coconut shell charcoal wins for shisha"), 250 ("Combustion and safety: what to avoid"), 257 ("Which material is most sustainable?") | 3 of 8 H2s are statement-form, not the question a buyer types. (Five others are already good questions.) | Optionally re-phrase the three statement H2s as questions in `guide.compare` i18n (e.g. "What's the safest charcoal to burn?" for combustion). Keep the comparison-table heading as-is (it labels a table, not a Q). |
| H2 | Hardening | Pass 2 — Quantified-evidence sourcing precision | Table wood calorific cell ">~5,975 ᵇ" (guide.json `table.rows` wood/calorific, line 170) attributed to footnote ᵇ = "FAO" | The ">25 MJ/kg → 5,975 kcal/kg" figure traces in `guide-research-findings.md` A3 to general high-quality-charcoal literature, while footnote ᵇ names FAO specifically. Minor source-attribution imprecision (value is correct; the cited body is slightly off). | Broaden footnote ᵇ wording, or attach the calorific row to the A3 source set rather than FAO alone. Value itself is verified-correct — no number change. |
| H3 | Hardening | Pass 2 — Anti-bloat / one-intent-per-section | `#why-coconut` (lines 239–247) restates the ash/density/taste thesis already delivered in `#coconut` (line 226) and the table | Mild thesis-restatement: "low ash / high density / neutral taste" is asserted in the coconut section, the table, AND whyCoconut.body2. Defensible as synthesis, but compressible. | If D2 is actioned, fold the duplicated three-point list into the new counterargument-rebuttal so the synthesis earns its place; otherwise tighten whyCoconut.body2 ~20%. |
| H4 | Hardening | Pass 1 — Freshness cadence (content level; mechanics out of scope) | `company.json` `guide.editorial.coconutVsBambooVsWood` = `datePublished` 2026-06-20 / `dateModified` 2026-06-20; research checked 2026-06-20 | Dates are current and event-tied (initial publication), so no defect. Flagged only as a forward cadence reminder: material-science findings should get a real `dateModified` bump when `guide-research-findings.md` is re-verified, not a cosmetic annual tick. | No action now. On next research re-check, advance `dateModified` here from the research re-check event. |

---

## 3. Claims register (Pass 3)

Verification priority: `grades.ts` / `company.ts` > `guide-research-findings.md` (cited as **GRF**) > model. All page numbers cross-checked against the built HTML (render-verified, JS-off).

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| Coconut fixed carbon column "75–82%" | Correct | — | Computed min–max of `grades.ts` fixedCarbon.min (75/80/82). | grades.ts |
| Coconut ash column "1.6–2.8%" | Correct | — | min(ash.min)=1.6 (platinum) … max(ash.max)=2.8 (premium). | grades.ts |
| Coconut calorific "7,000–7,500 kcal/kg" | Correct | — | min–max of calorieValue.min (7000/7300/7500). Inside the 28–32 MJ/kg material range. | grades.ts / GRF A3 |
| Coconut burn time "2–2.5 hours" | Correct | — | min–max of burnTime.min (2/2/2.5). | grades.ts |
| Coconut ash "roughly 1–4% as a material" | Correct | — | "low ash, roughly 1–4% for well-carbonized shell." | GRF A2 |
| Bamboo fixed carbon "~66–67% at 750 °C" + "10–18% low-temp" | Correct | — | Jarawi & Jusoh (2023) 67.1%/66.3%; Indonesian low-temp 10–18%. | GRF A1 |
| Bamboo ash "1.1–2.7%" | Correct | — | Six Indonesian species. | GRF A2 |
| Bamboo calorific "24.4–29.2 MJ/kg" / footnote "~5,830–6,980 kcal/kg" | Correct | — | GRF A3 (24.4×239≈5,832; 29.2×239≈6,979). | GRF A3 |
| Hardwood FC "~65–70 at 500 °C, up to ~85" / "commonly 50–95%" | Correct | — | GRF A1. | GRF A1 |
| Hardwood ash "~0.4–4.2 (typ. ~3–5)" | Correct | — | GRF A2. | GRF A2 |
| Wood calorific ">~5,975 kcal/kg" (>25 MJ/kg) | Correct | Low | Value correct; footnote attributes to FAO specifically (see H2). | GRF A3 |
| Duke/Monzer CO "3,728 ± 2,028 ppm (quick-light) vs 1,730 ± 501 ppm (natural), p = 0.016" | Correct | — | Exact match; framed as combustion measurement, no health claim. | GRF A7 |
| "peer-reviewed Duke University study (Monzer et al., 2015)" | Correct | — | PubMed 26403022; peer-reviewed (the supplier-hosted exhaled-CO study is correctly NOT cited). | GRF A7 / build-prompt |
| Sustainability "Nature Communications (2025) … ~1–2 billion tonnes GHG/yr (~2% of global)" | Correct | — | GRF A6 (synthesis cites Bailis et al. 2015: 1.0–1.2 Gt, 1.9–2.3%). | GRF A6 |
| "We do not claim a coconut-specific cradle-to-gate footprint, because no primary figure exists" | Correct | — | Honest omission matches GRF A6 open item. | GRF A6 |
| FAQ: "high-temp bamboo ~24.4–29.2 MJ/kg and coconut ~28–32 MJ/kg … comparable" | Correct | — | GRF A3 overlap finding. | GRF A3 |
| Burn-temperature (°C) per material | Correctly OMITTED | — | Page deliberately omits the burn-temp row (GRF A4 UNVERIFIED). Honesty-gating working as intended. | GRF A4 |
| Outbound "ASTM D1762-84(2021) — chemical analysis of charcoal" | Correct | — | Current active reapproval 2021; charcoal-specific. | GRF B2 |
| "starch binders (tapioca, cassava, corn) are food-grade … the accelerants are [the risk]" | Correct | — | GRF A7 (binder/accelerant generalization, Medium confidence in source — not a quantified claim). | GRF A7 |

**No factual Errors found.** Zero fabricated numbers (every non-coconut cell is cited or "—").

---

## 4. Requires deep research

None of the page's *rendered* claims require external verification — all are backed by `grades.ts` or `guide-research-findings.md`. The page already correctly withholds the items GRF flagged as unverified. The following are **monitoring notes only**, not claims to escalate (they are not asserted on the page):

| Topic | Why noted | Markets |
|---|---|---|
| Coconut-shell shisha-charcoal cradle-to-gate CO₂/kg LCA | Page explicitly says no primary figure exists (GRF A6 open item). If a buyer asks for a quantified footprint, this is the gap — but nothing on the page claims it, so no escalation needed now. | Germany, UK (sustainability-led buyers) |
| Quantified market-share statistic for coconut "dominance" | Page wisely avoids a numeric market-share claim (GRF A8 open item). The qualitative "modern standard" framing is safe. | all |

---

## 5. E-E-A-T / HCU assessment (Pass 5)

Per-criterion 1–10 (UX/technical-health criteria reference CLAUDE.md CWV budgets and the DrMax technical series — not re-measured here).

| Criterion | Score | Justification |
|---|---|---|
| Authorship & expertise | 9 | Full governance byline renders (Mohamad Sinno / Ahmet Bassam / Teguh Pranomo) with roles; author+reviewer Person nodes in schema. |
| Topical authority | 9 | Canonical material-comparison hub; 57 grade SKUs + raw-materials page point here; tight cluster linking. |
| Technical health & freshness | 8 | Zero-JS extractable; dates current (2026-06-20) and event-tied. Mechanics (CWV/Lighthouse) deferred to DrMax. |
| Effort | 9 | Centerpiece sourced comparison table, 6 sectioned answers, footnoted citations, curated outbound — high genuine effort. |
| Originality | 8 | Coconut column derived from own grades.ts (proprietary ranges); honest steelman; original synthesis over scraped specs. |
| Citation quality | 9 | Every external number footnoted (Jarawi & Jusoh, FAO, Duke/Monzer, Nature Comms); ≤3 curated authority outbounds; supplier-hosted study correctly excluded. |
| Freshness / timeliness | 8 | 2026 dating, current ASTM revision. Material science is slow-moving; cadence note H4. |
| Page intent | 9 | Matches "coconut vs bamboo vs wood for shisha" head-term precisely; definition-form lead answers immediately. |
| Structure & readability | 8 | Clear H2 outline, TOC, table-led; minor statement-vs-question headings (H1) and one restatement (H3). |
| Mobile | 9 | max-w-3xl prose, responsive SpecsTable (card fallback via cardEyebrow), system fonts — meets CLAUDE.md mobile rules. |
| Format-standard adherence | 7 | Cornerstone meta table, FAQ+schema, DefinedTerms all present — but **no mini-case (D1)** and steelman not signposted (D2): two required cornerstone formats incomplete. |
| Trust & spam signals | 9 | No fabricated figures, no hardcoded facts, honest omissions, no health claims, no keyword stuffing. |

**PQ = (9+9+8+9+8+9+8+9+8+9+7+9) / 12 = 102 / 12 = 8.5 / 10.**

**Verdict:** **Helpful-first.** This is reference content a wholesale buyer (or an AI answering "what charcoal is best for shisha") would cite — it concedes where bamboo competes, withholds figures it cannot source, and grounds every advantage in a number. goodClicks-dominant prognosis; low pogo-stick risk. The two cornerstone-format gaps cap it below a 9.

**Lowest-3 action steps:**
1. **Format-standard (7) → add a mini-case (D1):** insert 1–2 human-authored Problem→Action→Result blocks using only grades.ts ranges / cited sources — the single highest-leverage fix for both this score and AI extractability.
2. **Format-standard / Structure (D2):** promote the already-present bamboo concession into a signposted "When is bamboo the better choice?" counterargument-and-rebuttal H2 — converts an implicit steelman into an extractable one.
3. **Structure & readability (8) → H1/H3:** re-phrase the 3 statement H2s as buyer questions and trim the whyCoconut thesis-restatement ~20% (fold into the new D2 section).

---

*End of report. Diagnose-only — no source files modified.*
