# Content Audit — /factory/raw-materials

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report; no fixes). Passes 0,1,2,3,5. Pass 6 OFF.
**Cornerstone:** No (minor cluster page — meta-table / Devil's-Advocate absence is Hardening, not Defect).

---

## 1. Manifest (Pass 0)

| Item | Value |
|---|---|
| Route | `/factory/raw-materials` |
| Pillar | factory |
| Source file | `src/pages/factory/raw-materials.astro` |
| Built HTML | `dist/factory/raw-materials/index.html` (present; read) |
| Layout | `BaseLayout.astro` (`type="article"`, `includeOrgSchema={false}`) |
| Components | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `MaybeLink`, `FAQSection`, `CTABanner`, `Figure` (packaging), `SpecsTable` |
| i18n namespaces | `factoryRawMaterials.json`, `factoryCommon.json` (metaBlock labels) |
| Schema builder | `src/lib/schema/factoryClusterPage.ts` |
| `company.ts` fields consumed | `factory.editorial.{datePublished,dateModified}`; `factory.sourcingAshNarrative` (gated); `factory.laborStatement` (gated); `production.{sourcingRegion, sourcingVillages, palmTreesCount, carbonizationPlant.{city,region}}` (via `factoryTokens`); `governance.{author,reviewer,factChecker}` (via ArticleMeta); `whatsapp.presetMessages.salesGeneral`; `waLinkFor('quoteSpecs')` |
| Schema types emitted | `WebPage` (isPartOf → `/factory#webpage`; about → `/glossary#tempurung-kelapa-feedstock`; author Person; datePublished/dateModified). `BreadcrumbList` emitted separately by the visual `<Breadcrumbs>`. **No FAQPage** (visible FAQ only — correct). |
| Pillar position | factory cluster child; siblings: production-process, capacity, virtual-tour. Canonical FAQ homes not implicated here (no SHT/COA/MSDS Q&A on this page). |

**Build status:** Build already produced; HTML present and well-formed. No blocker from Pass 0.

---

## 2. Severity-tiered TODO list

### Blockers
**None.**

Honesty-gating verified clean:
- Every fact value on the page is interpolated from `company.ts` via `companyTokens`/`factoryTokens` (`{{sourcingRegion}}`, `{{sourcingVillages}}`, `{{palmTreesGrouped}}`, `{{carbonizationCity}}`, `{{carbonizationRegion}}`). No literal company fact appears in the `.astro` page, the i18n JSON, or the components. (Pass 1 — hardcoded-fact gate: PASS.)
- The two gated sections render only behind `hasFact()`: `#geography` gated on `factory.sourcingAshNarrative` (non-empty in config → renders, correct) and `#labor` gated on `factory.laborStatement` (non-empty → renders, correct). No claim renders without a backing fact. (Pass 1 — honesty-gating: PASS.)
- No FAQPage schema emitted; FAQ is a visible `<details>` block. Matches the "FAQPage only at /faq" rule. (Pass 1 — schema placement: PASS.)
- Up-link to `/factory` pillar present in the first body paragraph (`raw-materials-up-hub`) AND in the Related section. Pillar links DOWN to this page (`src/pages/factory/index.astro` childOrder includes `rawMaterials` → `/factory/raw-materials`). Multiple incoming links from permanent structure (products.astro, guide comparison page, product GradePage, sibling factory pages, glossary `see` link). Not an orphan. (Pass 1 — pillar/orphan gate: PASS.)

### Defects
| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 3 — factual Error vs VERIFIED_FACTS (`guide-research-findings.md` A2) | `#comparison` SpecsTable, row "Ash content", Bamboo cell: "Moderate to high" (i18n `comparison.rows[0].bamboo`) | The research finding A2 puts bamboo charcoal ash at **1.1–2.7% (six Indonesian species)** — i.e. low-to-moderate in absolute terms; it is only "higher than wood" when temperature-matched, not "high" on an absolute scale. "Moderate to high" overstates bamboo's absolute ash and reads as a stronger negative than the cited data supports. | Re-word the bamboo ash cell to reflect the absolute figure with the temperature-matched caveat, e.g. "Low–moderate (~1–3%), but typically higher than wood at the same temperature." Keep coconut's advantage framed on density/burn/odor, not an inflated bamboo ash number. Source: `guide-research-findings.md` §A2. |
| D2 | Defect | Pass 3 — overstated range vs VERIFIED_FACTS (A2) | `#comparison` SpecsTable, row "Ash content", Wood cell: "Higher (often 3–6%)" (i18n `comparison.rows[0].wood`) | Research A2: clean wood/hardwood charcoal ash ~0.4–4.2%, ~3–5% typical per FAO, lump usually <5%. The page's upper bound of **6%** exceeds every clean-charcoal figure cited; 6% corresponds to briquette/low-grade territory, not the "clean charcoal" the comparison implies. | Lower the upper bound to match the cited typical range, e.g. "Higher (often ~3–5%)." If the 6% is meant to capture briquettes, label it as such; do not present it as the general wood-charcoal figure. Source: `guide-research-findings.md` §A2. |

### Hardening
| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 2 — Devil's Advocate (minor page) | After `#comparison` / `#sustainability` (the thesis-proving sections) | No steelman of the strongest counterargument (e.g. "well-carbonized bamboo at 750 °C reaches FC ~66–67% and ash 1.1–2.7%, overlapping coconut on calorific value" — A1/A3 in research). On a cornerstone this would be a Defect; here it is Hardening. | Add a short "Where bamboo or wood can compete" paragraph conceding the overlap on calorific value (A3) and FC at high carbonization (A1), then re-anchor coconut's edge on ash + density/burn + neutral taste + upcycled feedstock (A2/A4/A5/A6). |
| H2 | Hardening | Pass 2 — quantified evidence | `#comparison` rows "Burn time" ("Long — dense, slow burn" / "Shorter"), "Density / breakage", "Odor / taste" | Only the ash row carries numbers; burn time, density, and odor are qualitative adjectives with no figures, weakening AI-extraction value. Research A4 flags exact burn-temp ranges as UNVERIFIED, so do not fabricate — but density/burn descriptors could carry the EN 1860-2 bulk-density anchor (≥130 kg/m³ for lump) and fixed-carbon framing. | Where a verified number exists (e.g. EN 1860-2 density floor, FC ranges from A1), add it; otherwise keep qualitative but route the missing burn-temp data to deep research rather than inventing a number. |
| H3 | Hardening | Pass 2 — mini-case / Pass 1 GEO (minor page) | Whole page | No Problem→Action→Result mini-case (expected on cornerstones; optional here). Vertical-integration section ("we own carbonization in Bitung") is the natural host. | Optional: add a 1–2 sentence mini-case on how owning carbonization removed spot-market quality variance (with a measurable consistency figure once QC confirms one). Lower priority — minor page. |
| H4 | Hardening | Pass 1 — regulatory/freshness cadence (content level) | ArticleMeta + schema: `datePublished` = `dateModified` = 2026-06-19 (config `factory.editorial`) | Published and modified are identical and 4 days old — fine now, but the page carries DRAFT-noticed company figures (palm count, villages — see Claims register). The `factory.editorial` dates and the `sourcingAshNarrative`/`laborStatement` strings are flagged in `company.ts` (lines 560–564) as DRAFTED 2026-06-19 and "MUST be verified by the owner before production." | No content change needed by the auditor; this is a flag to the owner: confirm the drafted production figures and narrative strings, then advance `dateModified` to a real review event (not a cosmetic bump). |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "made from one raw material: mature coconut shell, an upcycled byproduct" | Correct | Low | Matches research A6 (coconut shell = agricultural by-product) and `production.rawMaterial`. | verified-facts (A6) + company.ts |
| "We source it from 11 villages across North Sulawesi, Maluku, NTT" | Unverified (config-backed) | Medium | `sourcingVillages: 11`, `sourcingRegion: "North Sulawesi, Maluku, NTT"` exist in `company.json`, so NOT a hardcoded-fact violation — but `company.ts` (L560–564) marks the surrounding factory narrative block as DRAFTED, owner-unverified. Owner must confirm the village/region figures. | company.ts (drafted) |
| "drawing on a supply base of around 28,000 coconut palms" | Unverified (config-backed) | Medium | `palmTreesCount: 28000` in config (hedged with "around"). Company self-claim, not externally verifiable; covered by the same DRAFT NOTICE. | company.ts (drafted) |
| "carbonize it ourselves in Bitung … plant in Bitung, North Sulawesi" | Unverified (config-backed) | Medium | `carbonizationPlant: {city: "Bitung", region: "North Sulawesi"}` in config. Vertical-integration claim is a company self-claim; owner-confirm per DRAFT NOTICE. | company.ts (drafted) |
| Coconut ash "Low (under ~2.5%)" | Correct (conservative) | Low | Research A2: coconut-shell ash ~1–4% for well-carbonized shell. "under ~2.5%" sits inside that band (lower-tighter end) and is hedged with "~". Defensible. | verified-facts (A2) |
| Wood ash "Higher (often 3–6%)" | Error (overstated upper) | Medium | See D2. Clean wood charcoal ~0.4–4.2%, typical 3–5%; 6% is briquette territory. | verified-facts (A2) |
| Bamboo ash "Moderate to high" | Error | Medium | See D1. Absolute bamboo ash 1.1–2.7%; "moderate to high" misstates the absolute level. | verified-facts (A2) |
| Coconut "Long — dense, slow burn" vs wood "Shorter" / bamboo "Short to medium" | Correct (qualitative) | Low | Supported directionally by A4 (coconut dense/hard → slow long even burn). No numeric burn-time/temp claim made; A4 flags exact temps UNVERIFIED, so the qualitative framing is appropriate. | verified-facts (A4) |
| Coconut "Neutral, low smoke"; wood "Woody, smoky"; bamboo "Mild, can be acrid" | Mostly correct; "acrid" Unverified | Low | A5 supports clean low-VM coconut burn and woody/smoky wood. "Bamboo … can be acrid" is not directly evidenced in A5 (which says bamboo burns clean/smokeless at full carbonization). Soft-overstated. | verified-facts (A5) |
| Bamboo "Lower density, more breakage" | Unverified | Low | A4 notes bamboo density varies by culm section (bottom section best); no blanket "lower density / more breakage" claim is supported. | verified-facts (A4) |
| "No forest is cleared and no tree is felled … unlike lump wood charcoal, which is made by cutting and burning trees" | Correct | Low | A6: hardwood lump charcoal linked to forest degradation/deforestation; coconut shell valorizes residue. | verified-facts (A6) |
| "coconut shell is the strongest position in the category" / "most defensible position" (sustainability) | Correct (defensible framing) | Low | Supported by A6 (by-product valorization vs woodfuel emissions ~1.0–1.2 Gt CO₂e/yr). Framed as a positioning claim, not an absolute superlative. | verified-facts (A6) |
| Labor statement: "wages at or above the regional minimum … no child labor … supports smallholder farming communities" | Unverified (config-backed) | Medium | Renders from `factory.laborStatement` (gated). Config-backed so not a hardcoded-fact violation; but it is a DRAFTED, owner-unverified CSR claim (company.ts L560–564). Owner must confirm before relying on it externally. | company.ts (drafted) |
| Author "Mohamad Sinno / Owner & Director", Reviewer "Ahmet Bassam", Fact-checker "Teguh Pranomo" | Correct (config-backed) | Low | All from `company.governance` via ArticleMeta; no hardcoded names. | company.ts |

---

## 4. Requires deep research

These claims should be routed to the deep-research companion prompt for external verification (the first three are owner-confirmation rather than external literature; the ash/density items are literature):

1. **Bamboo charcoal absolute ash level** — confirm whether to present bamboo ash as low-to-moderate (1.1–2.7%, A2) rather than "moderate to high"; resolves D1. Markets: all (USA, UK, Germany — sustainability-sensitive buyers).
2. **Clean wood-charcoal ash upper bound** — confirm whether 6% should be ~5% for clean charcoal vs flagged as briquette-grade; resolves D2. Markets: all.
3. **Bamboo "lower density / more breakage" and "can be acrid"** — find a primary source or soften; A4/A5 do not clearly support either. Markets: all.
4. **Exact burn-time / burn-temperature ranges per material** — A4 explicitly marks these UNVERIFIED ("needs lab data"); needed before any numeric burn claim. Markets: all.
5. **Owner-confirmation (not external):** palm-tree count (28,000), sourcing villages (11) and region, Bitung carbonization-plant ownership, and the labor/CSR statement — all DRAFTED in `company.ts` (L560–564) and pending owner sign-off. Markets: all (these underpin the sustainability and vertical-integration positioning).

---

## 5. E-E-A-T / HCU summary (Pass 5)

| Criterion | Score /10 | Justification |
|---|---|---|
| Authorship & expertise | 8 | Full author/reviewer/fact-checker triple (config-backed) in a visible meta table; owner-as-author lends first-party expertise. |
| Topical authority | 7 | Sourcing + vertical integration + sustainability + comparison + labor cover the raw-material topic well; cross-links to guide & specs deepen it. |
| Technical health & freshness | 7 | Clean static HTML, no render-blocking; dates current (2026-06-19). Not re-measured (DrMax owns CWV). Drafted dates need a real review event (H4). |
| Effort | 7 | Original comparison table, dedicated FAQ, gated CSR section — clearly hand-built, not templated filler. |
| Originality | 7 | Vertical-integration ("we own carbonization in Bitung") and geography-as-quality angles are differentiated; comparison table is generic-leaning. |
| Citation quality | 5 | Comparison ash/burn figures are presented without on-page sourcing; two ash values (D1/D2) conflict with the research file. Lowest-scoring lever. |
| Freshness / timeliness | 7 | Published = modified, 4 days old; fine, but no event-tied review cadence yet (H4). |
| Page intent | 8 | Clearly serves "what is the raw material and why coconut" buyer intent; CTAs aligned to quote/inquiry. |
| Structure & readability | 8 | Logical H2 outline, TL;DR, definition-form sentences, max-w-prose body, visible FAQ — strong GEO extractability. |
| Mobile | 8 | SpecsTable degrades to card list at <md; 44px touch targets; max-w-3xl. (Per CLAUDE.md budgets; not re-measured.) |
| Format-standard adherence | 8 | Meta table, breadcrumbs, Related section, WebPage schema, no misplaced FAQPage — matches site conventions. |
| Trust & spam signals | 8 | Honest gating, per-order ash caveat preserved, no fabricated facts, labor statement hedged. Honesty-gating is a genuine trust signal. |

**PQ (arithmetic mean of 12):** (8+7+7+7+7+5+7+8+8+8+8+8) / 12 = **88/120 = 7.33 / 10**

**Verdict:** **Helpful-first.** The page is written for a wholesale buyer evaluating raw-material quality, not for a search engine; honesty-gating, the per-order ash caveat, and the upcycled-feedstock framing read as genuinely buyer-serving. Good-clicks prognosis is positive. The two ash-figure conflicts (D1/D2) are the main badClick risk: a technically literate buyer who knows bamboo ash is low could lose trust in the table.

**Lowest-3 action steps:**
1. **Citation quality (5):** Fix the bamboo (D1) and wood (D2) ash values to match `guide-research-findings.md` §A2, and add a one-line "typical values; sources" note or link under the comparison table so the figures are traceable.
2. **Devil's Advocate / counter-evidence (feeds Citation & Originality):** Add the H1 steelman paragraph conceding bamboo/wood overlap on calorific value (A3) and high-temp FC (A1), then re-anchor coconut's edge — converts a one-sided table into a credible comparison.
3. **Quantified evidence (H2) + freshness cadence (H4):** Where verified numbers exist (EN 1860-2 density floor, FC ranges), add them to the non-ash rows; route burn-temp to deep research rather than inventing it; and confirm the DRAFTED company figures with the owner so `dateModified` can advance on a real review event.

---

*End of report. Diagnose-only — no site files modified.*
