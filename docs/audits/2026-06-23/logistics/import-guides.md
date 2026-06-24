# Content Audit — /logistics/import-guides

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report, no fixes). Passes 0,1,2,3,5. Pass 6 OFF.
**Page class:** Minor hub (CollectionPage + ItemList of country-import cards). NOT cornerstone — per the run brief, absent meta-table / Devil's-Advocate is Hardening, not Defect.

---

## 1. Manifest (Pass 0)

| Field | Value |
|---|---|
| **Route** | `/logistics/import-guides` |
| **Source file** | `src/pages/logistics/import-guides.astro` |
| **Built HTML** | `dist/logistics/import-guides/index.html` (present; build already done — not re-run) |
| **Layout** | `~/layouts/BaseLayout.astro` (`includeOrgSchema={false}`, `prefetch={['/contact']}`) |
| **Components** | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `MaybeLink`, `CTABanner` |
| **i18n namespaces** | `en.logisticsImportGuides` (page copy), `en.logisticsCommon` (`metaBlock.*` labels) |
| **Data libs** | `~/lib/importCountries.ts` (`importCountryLinks()`), `~/lib/schema/collectionPage.ts`, `~/lib/interpolate.ts` (`companyTokens` + `logisticsTokens`), `~/lib/readingTime.ts`, `~/lib/breadcrumb.ts` |
| **company.ts fields consumed** | `company.logistics.imports[*].country` (card titles + ItemList names, via `importCountryLinks()`); `company.logistics.editorial.dateModified` (= `2026-06-16`, the "Last updated" date); `company.governance.author/reviewer/factChecker.{name,role}` (meta block, via `ArticleMeta`); `company.commercial.portOfLoading.name` → token `{{port}}` (meta description); `moqLabel()` → `{{moqLabel}}` = "18 tons (one 20ft container)" (hero subtitle); `company.brand` → `{{brand}}` (title, intro); `company.whatsapp.presetMessages.salesGeneral` + `waLinkFor('salesGeneral')` (CTAs) |
| **Pillar** | Logistics. Hub node between the `/logistics` pillar and the five `/logistics/import-to-{country}` Support pages. |
| **Schema emitted (built HTML)** | `CollectionPage` (#webpage) + `ItemList` (#sku-list, 5 ListItems) in one `@graph`; `BreadcrumbList` (3 items, via `Breadcrumbs`). **No FAQPage** (correct — page has no Q&A). |
| **Incoming internal links (permanent structure)** | `dist/index.html` (homepage), `dist/logistics/index.html` (pillar, links DOWN), and all five `dist/logistics/import-to-{usa,uk,germany,saudi-arabia,russia}/index.html` sibling pages. Not an orphan. |

**Build status:** Built HTML present and well-formed; not re-run per run constraints. No stop condition triggered.

---

## 2. Severity-tiered TODO list

### Blockers
*None.* No hardcoded company fact (every fact value flows through `companyTokens`/`logisticsTokens`/`governance.*`/`importCountryLinks()`; the source file contains zero literal fact values). No un-backed trust claim (the page makes no certification/capacity/per-order-report claim — it is a navigational card list). No misplaced FAQPage. No real orphan or broken pillar link. No regulatory claim rendered on THIS page (per-country regulatory facts live on the child pages).

### Defects

| ID | tier | pass + rule | exact location | what's wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 2 — Featured-snippet lead / readability; Pass 3 grammar of a rendered string | Hero `<p>` subtitle, rendered "What it takes to clear **a 18 tons (one 20ft container) container** of UN 1361 coconut charcoal…" — source: `en.logisticsImportGuides.heroSubtitle` ("…clear a {{moqLabel}} container of UN 1361…") | Token composition produces a double-noun + article-disagreement: `{{moqLabel}}` already ends in "…20ft **container**)", so "{{moqLabel}} container" reads "…20ft container) **container**"; and "**a** 18 tons" disagrees ("a" + plural). Reads awkwardly to a human and to an AI extractor. | Reword the i18n template so the noun isn't doubled and the article agrees — e.g. drop the trailing word "container" after the token, or restructure to "…clear one 20ft container ({{moqLabel}}) of…" using a token form without the parenthetical, or "…clear an {{moqTons}}-ton container…". Fact stays in config; only the i18n phrasing changes. No code executed here. |

### Hardening

| ID | tier | pass + rule | exact location | what's wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 1 GEO extractability — definition-form sentence (minor page → Hardening) | `intro.p1` first paragraph and `listIntro` | No definition-style sentence anchors the page's key term for AI extraction. The page names "UN 1361 coconut charcoal" repeatedly but never states what it is in dictionary form ("UN 1361 is the dangerous-goods classification for charcoal …"). A hub is allowed to be thin, but one extractable definition lifts citability. | Add one definition-form clause (cite/defer to `/logistics/un-1361` for the full treatment), e.g. lead the intro or `listIntro` with "Coconut shell charcoal ships as UN 1361 (IMDG Class 4.2)…". Keep it short; the canonical SHT/UN-1361 detail stays on `/logistics/un-1361`. i18n-only change. |
| H2 | Hardening | Pass 2 — Headings as questions | H2 "Choose your destination market" and H2 "Related topics" | Section headings are imperative/label, not buyer-question form. On a hub this is acceptable, but the primary list heading could match the searcher's question ("How do I import coconut charcoal to my country?") for snippet alignment. | Optionally rephrase the list-section H2 toward the buyer question; leave "Related topics" (a site convention) as-is. i18n-only; low priority. |
| H3 | Hardening | Pass 2 — Devil's Advocate / mini-cases (minor page → Hardening, NOT Defect) | whole page | No steelman counter-section and no Problem→Action→Result mini-case. | None required for a navigational hub. Recorded only to confirm the omission was assessed and is intended for this page type — do not add. |
| H4 | Hardening | Pass 1 — regulatory currency cadence (content level) | "Last updated" cell = `company.logistics.editorial.dateModified` = `2026-06-16` | The hub's `dateModified` (2026-06-16) is older than the most recently re-verified child data (Germany `lastVerified` 2026-06-23, Saudi Arabia 2026-06-23, UK/Russia 2026-06-21). The hub date is the editorial date of the card copy, which is legitimately static — but because the hub aggregates child guides, a reader sees a "Last updated" that predates the freshest underlying guide. Cosmetic/cadence only; no claim on this page is wrong. | When any child guide's `lastVerified` advances, consider bumping `company.logistics.editorial.dateModified` (the field that drives THIS page) so the hub's freshness signal does not lag its children. Config field, not a page edit. Optional. |
| H5 | Hardening | Pass 2 — anti-bloat / duplication (cross-card) | five card blurbs, `cardBlurbTemplate` = "HS code, the duty and tax stack, customs clearance and the document pack for {{country}}." | All five cards render the identical sentence with only the country name swapped, and that sentence also restates the hero subtitle and `intro.p1` almost verbatim ("HS classification, the duty and tax stack, customs clearance, and the document pack"). Near-duplicate meaning three times on one short page. | Acceptable for a templated card grid (consistency aids scanning). If differentiation is wanted later, the blurb could surface one country-specific hook per card (e.g. the country's headline duty/VAT posture) pulled from `company.logistics.imports[key]`, but that is an enhancement, not a fix. No change required. |

---

## 3. Claims register (Pass 3)

Sources checked in priority order: `company.ts`/`company.json` > `docs/build-prompts/logistics/logistics-import-research-findings.md` & `docs/build-prompts/guide/guide-research-findings.md` > model knowledge.

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "Coconut charcoal import guides by country" / scope = USA, UK, Germany, Saudi Arabia, Russia (H1, meta, cards, ItemList) | Correct | Low | The five rendered countries exactly match the published keys in `company.logistics.imports` (`usa, uk, germany, saudiArabia, russia`); list is data-driven via `importCountryLinks()`. ItemList `numberOfItems:5` matches. | company.json `logistics.imports.*.country` (lines 666, 702, 769, 845, 935) |
| Card/ItemList display names "Importing to USA / United Kingdom / Germany / Saudi Arabia / Russia" | Correct | Low | Names are `data.country` verbatim ("USA", "United Kingdom", "Germany", "Saudi Arabia", "Russia"); not hardcoded in the page. | company.json `logistics.imports.*.country` |
| "clear a … container of **UN 1361** coconut charcoal" (hero) | Correct | Low | UN 1361 is the correct UN number for charcoal; backed by config. Note D1 is a phrasing defect on the surrounding words, not a factual error about UN 1361. | `company.certifications.imdg.unNumber` (token `{{unNumber}}` elsewhere); logistics-import-research-findings.md |
| "Import guides … : HS code, duty, VAT, customs clearance and documents" (meta description) | Correct (forward-looking) | Low | The hub itself contains none of these data points; it promises them on the child pages, which do carry HS/duty/VAT facts with per-country `sourceUrl` + `lastVerified`. No unsupported claim on this page. | child pages' `company.logistics.imports[*]` (htsCandidates/dutyLayers/vat) |
| "from {{port}}" (= Semarang, in meta description) | Correct | Low | Token resolves to `company.commercial.portOfLoading.name`. Not a literal. | company.ts `portOfLoadingLabel()` / `commercial.portOfLoading.name` |
| Meta block: Authored by Mohamad Sinno (Owner & Director); Reviewed by Ahmet Bassam (Charcoal Expert / Consultant); Fact-checked by Teguh Pranomo (QC Manager); Last updated 2026-06-16 | Correct | Low | All from `governance.*` + `logistics.editorial.dateModified` via `ArticleMeta`; not hardcoded in the page. Fact-checker cell rendered because `hasFact()` passed. (See H4 re: date cadence.) | company.json `governance.*`, `logistics.editorial` (line 1025) |
| "We quote the same day in most time zones" (CTABanner) | Unverified | Low | Marketing claim emitted by the shared `CTABanner` component, not unique to this page; no numeric backing in config. Site-wide CTA copy — flag for the component owner, not this route. | model / CTABanner i18n |

No factual **Error** found on this page.

---

## 4. Requires deep research

*None specific to this page.* The hub asserts no standalone regulatory fact — all HS/duty/VAT/agency claims live on the five `/logistics/import-to-{country}` child pages and must be deep-research-verified **there**, against their own `lastVerified` provenance. Route per-country regulatory verification to those routes' audits, not this hub.

---

## 5. E-E-A-T / HCU assessment (Pass 5)

Scored for the page's role as a navigational hub. Technical-mechanics (CWV/Lighthouse, canonical/hreflang/JSON-LD validity) are out of scope per run brief and not re-measured.

| Criterion | Score | One-line justification |
|---|---|---|
| Authorship & expertise | 8 | ArticleMeta names a real author/reviewer/fact-checker triple from `governance.*`; appropriate for a hub. |
| Topical authority | 7 | Clear parent for the five-country import set; defers depth correctly to children and `/logistics`. |
| Technical health & freshness | 7 | Clean static HTML; "Last updated" lags freshest child (H4); otherwise current. |
| Effort / depth | 5 | Thin by design — a card index; little original prose, expected for a hub. |
| Originality | 5 | Card blurbs are templated and near-duplicate of the intro (H5); intentional for scan-ability. |
| Citation quality | 6 | No outbound/source citations on the hub itself; underlying facts are sourced on children. One extractable definition would raise this (H1). |
| Freshness / timeliness | 7 | Dated meta block present; cadence caveat per H4. |
| Page intent | 9 | Intent (route the buyer to their country guide) is unambiguous and well served; CTAs + cards aligned. |
| Structure & readability | 7 | Good semantic structure (breadcrumb, H1, sectioned H2s, list role); docked for the hero double-noun (D1). |
| Mobile | 9 | `max-w-3xl`, `min-h-11` touch targets, responsive grid; honors CLAUDE.md mobile rules (not re-measured). |
| Format-standard adherence | 8 | Correct hub schema (CollectionPage+ItemList+BreadcrumbList, no FAQPage); MaybeLink pattern respected. |
| Trust & spam signals | 8 | No spam patterns; honest gating intact; one unbacked sitewide CTA line (claims register) is component-level, not page-level. |

**PQ (mean of 12):** (8+7+7+5+5+6+7+9+7+9+8+8) / 12 = **7.17 / 10**

**Verdict:** **Helpful-first.** The page exists to serve the buyer's "import to my country" intent and routes them there cleanly with strong internal linking and honest metadata — not search-bait. goodClicks prognosis is positive (it forwards traffic to high-intent child guides); badClicks risk is low because the hub does not over-promise content it lacks.

**Lowest-3 action steps:**
1. **Effort/depth (5):** Add one short extractable definition sentence (H1) so the hub earns at least one citable line of its own, while keeping depth on `/logistics/un-1361` and the child guides. i18n-only.
2. **Originality (5):** If differentiation is wanted, give each card a one-line country-specific hook from `company.logistics.imports[key]` instead of the identical templated blurb (H5). Optional enhancement, not required.
3. **Citation quality (6):** Tie the hub's "Last updated" to the freshest child `lastVerified` cadence (H4) and/or surface a "verified per-country as of …" note so the freshness signal is anchored to a real regulatory-review event, not a static editorial date.

---

*End of report. No site files modified. Fixes are deferred to a separate approved prompt.*
