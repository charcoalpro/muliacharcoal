# Content Audit — /factory/capacity

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report-only; no fixes applied)
**Passes run:** 0, 1, 2, 3, 5 (Pass 6 OFF)
**Cornerstone:** No (minor cluster page — meta-table / Devil's-Advocate absence is Hardening, not Defect)

---

## 1. Manifest

| Field | Value |
|---|---|
| Target route | `/factory/capacity` |
| Pillar | factory |
| Source file | `src/pages/factory/capacity.astro` |
| Layout | `BaseLayout.astro` (`type="article"`, `includeOrgSchema={false}`) |
| i18n source | `src/i18n/en/factoryCapacity.json` (+ `factoryCommon.json` meta-block labels) |
| Components rendered | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `MaybeLink`, `FAQSection`, `CTABanner`, `Figure` (packaging), `KeyFactsBox` (packaging), `SpecsTable`, `EquipmentList` (factory) |
| Token providers | `companyTokens(company)` + `factoryTokens(company)` via `lib/interpolate.ts` |
| company.ts fields consumed | `production.capacityTonsPerDay` (14), `production.capacityTonsPerMonth` (350), `production.lines` (4), `production.ovens.{count:8, capacityTonsPerBatch:1.5, cycleHours:24}`, `production.headcount` (86), `commercial.moq.tons` (18), `commercial.containerCapacity.ft20.fullKg` (18000), `commercial.containerCapacity.ft40.fullKg` (26000), `commercial.leadTime.{repeatBrandDays:14, newBrandDays:21}`, `factory.equipment[]`, `factory.ramadanLeadNote` (present → seasonal section renders), `factory.editorial.dateModified` (2026-06-19), `governance.{author,reviewer,factChecker}` (meta table), `whatsapp.presetMessages.salesGeneral`, `waLinkFor('quoteSpecs')` |
| Derived (not new facts) | `annualTons`=4,200; `containersPerMonth`=19; `oneContainerPctOfMonthly`=5; throughput `ft20Pct`=5, `ft40Pct`=7 — all computed in `factoryTokens()` / the page from canonical scalars |
| Schema types emitted (built HTML) | `WebPage` (isPartOf → `/factory#webpage` hub), `BreadcrumbList` + 3× `ListItem` (from visual `<Breadcrumbs>`), `Person` (author). **No FAQPage** — correct (visible FAQ only; /faq is the sole FAQPage home). |
| Pillar up-link | Yes — `intro.p1` first prose paragraph links to `/factory` ("coconut charcoal factory overview"); Related section also links `/factory`. |
| Pillar down-link | Yes — `/factory` hub (`src/pages/factory/index.astro`) lists `capacity: '/factory/capacity'` in `childRoutes`. Not an orphan. |
| Outbound internal links | `/factory`, `/factory/production-process#quality-control`, `/logistics`, `/products`, `/factory/raw-materials`, `/factory/virtual-tour`, `/contact` — all in `LIVE_ROUTES`; none muted. |
| Build status | dist HTML present and complete; all sections render server-side (no JS-gated content). Build not re-run (read-only per instructions). |

---

## 2. Severity-tiered TODO list

### Blockers

| ID | Tier | Pass + Rule | Exact location | What is wrong | Recommended fix (described, not executed) |
|---|---|---|---|---|---|
| B1 | Blocker | Pass 1 — Hardcoded company fact (CLAUDE.md: production line count lives in `company.ts` only) | `src/i18n/en/factoryCapacity.json` line 7, key `figure.caption` = `"Four production lines"`; renders verbatim in `dist/factory/capacity/index.html` under the `<Figure>` caption | The spelled-out number **"Four"** is the production-line count, a company fact whose single source of truth is `company.production.lines` (=4). Every other mention on this page correctly uses the `{{productionLines}}` token (heroSubtitle, equipment.body, FAQ, at-a-glance). This caption hardcodes the value, so if the line count changes in config the caption silently drifts and contradicts the rest of the page. | Replace the literal with a token-bearing string, e.g. caption template `"{{productionLines}} production lines"` filled through `fill()` (the `Figure` caption prop would need the filled value passed, as the alt already is). Do NOT write the number; route it through the existing `{{productionLines}}` token. |

### Defects

_None._ Schema type/placement correct (WebPage + BreadcrumbList; FAQPage correctly absent). Required GEO meta table is present. Pillar linking intact; no orphan; no broken links; no misplaced FAQPage; no factual Error rising to Defect.

### Hardening

| ID | Tier | Pass + Rule | Exact location | What is wrong | Recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 1 — Config-owned narrative duplicated in i18n (drift risk) | `factoryCapacity.json` `faq.items[4].a` ("…place confirmed orders 6–8 weeks earlier…") | The "6–8 weeks earlier" advance-order guidance is restated as a hardcoded i18n string, while the canonical narrative `company.factory.ramadanLeadNote` (rendered just above in the gated Seasonal section) also states "6–8 weeks earlier." Two copies of the same operational guidance can drift apart. Not one of the strictly-enumerated company facts, so Hardening, not Blocker. | Either tokenize the window (add a `ramadanLeadWeeks` token if the figure is reused) or have the FAQ answer reference the canonical Seasonal section rather than re-state the number. At minimum, flag the duplication so future edits update both. |
| H2 | Hardening | Pass 1 — GEO extractability (definition-form sentence) | `KeyFactsBox` `atAGlance.definition` = "The output behind a Mulia Charcoal order." | No dictionary-form definition of the page's key term. AI engines preferentially cite "Production capacity is…" sentences; the page never defines "production capacity" in extractable form. Minor page → Hardening. | Add one definition-style lead sentence near the top (e.g. under the TL;DR or as the at-a-glance definition): "Production capacity is the finished tonnage a factory can output per day/month — here, 14 tons/day and 350 tons/month." Keep numbers token-driven. |
| H3 | Hardening | Pass 2 — Headings as questions | H2s: "Container throughput", "Headroom — you won't be deprioritized", "Equipment behind the numbers", "Lead times" | Section H2s are statements, not buyer questions, weakening featured-snippet/PAA capture. (FAQ section already uses questions.) Minor page → Hardening. | Optionally reframe to question form, e.g. "How much can one container carry?", "Will my order be deprioritized at this volume?", "What equipment backs the capacity?", "What is the production lead time?" — the FAQ already answers several of these, so dedupe rather than duplicate. |
| H4 | Hardening | Pass 2 — Devil's Advocate / steelman (minor page) | Whole page | No steelman of the strongest buyer counterargument (e.g. "stated capacity ≠ available capacity for a new buyer / capacity claims are unverifiable"). The `headroom.caveat` ("typical, not a guarantee; slots confirmed at order") partially addresses this but is not a framed counterargument. Minor page → Hardening (would be Defect on a cornerstone). | Optional: add a short "Can I trust a stated capacity figure?" beat acknowledging that capacity claims are often inflated, then ground the rebuttal in the equipment list + per-batch oven math already on the page. |
| H5 | Hardening | Pass 2 — Mini-case (Problem→Action→Result) | Whole page | No Problem→Action→Result mini-case (e.g. a buyer who scaled from 1 to N containers/month within headroom). Minor page → Hardening (cornerstone would be Defect). | Optional: add one measurable mini-case if a real example exists; do not fabricate. |
| H6 | Hardening | Pass 1 — Freshness cadence (content level) | `factory.editorial.dateModified` = 2026-06-19 (rendered "Last updated 2026-06-19") | Date is current (4 days old) so not stale, but the underlying factory facts (equipment, ovens, ramadanLeadNote) carry a config DRAFT NOTICE ("DRAFTED 2026-06-19 … MUST be verified by the owner before production"). The page presents draft figures as confirmed. Content-level freshness is fine; the draft-verification gap is the real risk. | Track owner verification of the drafted factory block; once verified, the dateModified bump becomes event-backed rather than cosmetic. No page edit required now. |

---

## 3. Claims register

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "14 tons of coconut shisha charcoal per day" | Correct | — | `production.capacityTonsPerDay` = 14 | company.ts |
| "350 tons per month" | Correct | — | `production.capacityTonsPerMonth` = 350 | company.ts |
| "roughly 4,200 tons a year" | Correct | — | Derived: 350 × 12 = 4,200 (`factoryTokens.annualTonsGrouped`) | company.ts (derived) |
| "across 4 lines" / "Four production lines" | Correct (value) / **fact hardcoded in caption** (B1) | Low | Value matches `production.lines` = 4; the *caption* hardcodes it (see B1) | company.ts |
| "8 ovens / 8 carbonization ovens" | Correct | — | `production.ovens.count` = 8 | company.ts |
| "8 × 1.5 t/batch, 24 h cycle" | Correct | — | `ovens.capacityTonsPerBatch` = 1.5; `ovens.cycleHours` = 24 | company.ts |
| "86 employees" | Correct | — | `production.headcount` = 86 | company.ts |
| "around 19 twenty-foot containers a month" | Correct | — | Derived: round(350 / 18) = 19 | company.ts (derived) |
| "20-foot container holds about 18 tons … floor-loaded" | Correct | — | `containerCapacity.ft20.fullKg` = 18000 → 18 t; matches `moq.tons` = 18 | company.ts |
| Net payload 40ft = 26 tons | Correct | — | `containerCapacity.ft40.fullKg` = 26000 → 26 t | company.ts |
| Share of monthly output: 20ft ≈ 5%, 40ft ≈ 7% | Correct | — | Derived: round(18/350·100)=5; round(26/350·100)=7 | company.ts (derived) |
| "roughly 5% of our output" (headroom + FAQ) | Correct | — | round(18/350·100) = 5 (`oneContainerPctOfMonthly`) | company.ts (derived) |
| Lead time "14–21 days … 14 days repeat, 21 days new brand" | Correct | — | `leadTime.repeatBrandDays` = 14, `newBrandDays` = 21; `leadTimeLabel()` renders "14–21 days" | company.ts |
| "Each oven carbonizes about 1.5 tons of coconut shell per batch on a 24-hour cycle. With 8 ovens, that scales to 350 tons of finished charcoal a month." (FAQ item 1) | Unverified | Low | Internal tension: 8 ovens × 1.5 t × ~30 cycles/mo ≈ 360 t of *carbonized shell* input, yet 350 t is *finished briquette* output. Carbonized-shell throughput and finished-briquette tonnage are different masses (binder + moisture added downstream). The sentence conflates the two; the arithmetic happens to land near 350 but the causal chain ("ovens → 350 t finished") is loose. Not a hard error — flag for wording review and owner confirmation of the per-oven→finished conversion. | model (needs owner confirmation) |
| "Demand peaks ahead of Ramadan and the summer shisha season … 6–8 weeks earlier" | Unverified | Low | Operational guidance from `factory.ramadanLeadNote` (config DRAFT, owner-unverified); also duplicated in FAQ (H1). Not externally checkable — confirm with owner. | company.ts (DRAFT) |
| Equipment list (4 crushers, 4 hammer mills, 2 sieving units, 4 ribbon mixers, 4 presses, 4 drying tunnels) | Unverified | Low | From `factory.equipment[]`, flagged DRAFT in config ("MUST be verified by the owner before production"). | company.ts (DRAFT) |
| Author "Mohamad Sinno — Owner & Director"; Reviewer "Ahmet Bassam"; Fact-checker "Teguh Pranomo" | Correct | — | From `company.governance.*` (honesty-gated; fact-checker drops if placeholder) | company.ts |

---

## 4. Requires deep research

No external/regulatory claims on this page require the deep-research companion. All quantitative claims resolve against `company.ts`. Two items need **owner verification (internal, not web research)** before the drafted facts can be treated as confirmed:

1. **Equipment list + oven configuration** (`factory.equipment[]`, `production.ovens`) — config carries an explicit DRAFT NOTICE; owner must confirm.
2. **Per-oven → finished-output conversion** (FAQ item 1 wording) — confirm whether "8 ovens × 1.5 t/batch on 24 h cycle" is intended to imply 350 t/month *finished*, and reword to separate carbonized-shell throughput from finished-briquette tonnage.
3. **Ramadan 6–8 week advance-order window** (`factory.ramadanLeadNote`, DRAFT) — owner confirmation.

---

## 5. E-E-A-T / HCU summary

| Criterion | Score (1–10) | One-line justification |
|---|---|---|
| Authorship & expertise | 8 | Named author/reviewer/fact-checker with roles, all config-driven and honesty-gated. |
| Topical authority | 7 | Tight, on-topic capacity page; links up to pillar and across to production-process/logistics/products. |
| Technical health & freshness | 7 | Clean WebPage+Breadcrumb schema, dateModified current; underlying facts still DRAFT (owner-unverified). (CWV/Lighthouse out of scope — see CLAUDE.md budgets / DrMax series.) |
| Effort | 7 | Real derived math, equipment list, throughput table — not thin; figure caption hardcoding is a small lapse. |
| Originality | 7 | Specific factory numbers and headroom framing; not boilerplate. |
| Citation quality | 6 | All claims trace to company.ts, but no visible attribution that figures are typical/owner-confirmed beyond the one caveat line. |
| Freshness / timeliness | 7 | Updated 2026-06-19; date is event-thin (drafted same day) — fine for now. |
| Page intent | 9 | Sharp match to "how much can this factory produce / will I be deprioritized" buyer intent. |
| Structure & readability | 8 | TL;DR, KeyFactsBox, tables, FAQ, Related — well-structured; H2s are statements not questions (H3). |
| Mobile | 8 | `max-w-3xl`, responsive grid, SpecsTable renders a stacked mobile variant; no JS-gated content. (Not re-measured.) |
| Format-standard adherence | 7 | Carries the GEO meta table; missing definition-form sentence (H2) and question-headings (H3). |
| Trust & spam signals | 8 | Honesty-gated trust blocks, explicit "typical, not a guarantee" caveat, no superlative spam. |

**PQ (mean of 12) = 7.25 / 10.**

**Verdict:** Helpful-first. The page answers a concrete buyer question (capacity + headroom + lead time) with extractable numbers and honest caveats; goodClicks prognosis favorable. The single Blocker (hardcoded "Four production lines") is a drift/consistency risk, not a deception, and the page otherwise routes every fact through the config.

**Lowest-3 action steps:**
1. **Citation quality (6):** make the "typical, owner-confirmed" status of factory figures explicit (one line), and resolve the FAQ oven→finished-output conflation (claims register) so the strongest extractable claim is unambiguous.
2. **Freshness/timeliness (7) & Technical health (7):** convert the DRAFT factory block to owner-verified so the dateModified becomes event-backed rather than cosmetic; tie any future bump to a real verification event.
3. **Format-standard adherence (7):** add one definition-form sentence ("Production capacity is…", numbers token-driven) (H2) and consider question-form H2s deduped against the existing FAQ (H3).
