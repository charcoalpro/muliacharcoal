# Content Audit — /careers

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report, no fixes). Passes 0,1,2,3,5 run; Pass 6 OFF.
**Cornerstone:** No (supporting page). Meta-table / Devil's-Advocate absence = Hardening, not Defect.

---

## 1. Manifest

| Field | Value |
|---|---|
| Target route | `/careers` |
| Pillar | Supporting (no pillar parent; not a cluster page) |
| Page file | `src/pages/careers.astro` |
| Layout | `src/layouts/BaseLayout.astro` (via `BaseLayout`) |
| Components rendered | `Breadcrumbs.astro`, `HeroSection.astro`, `Button.astro` (×2 Apply buttons) |
| i18n source | `src/i18n/en/careers.json` (consumed as `en.careers`) |
| Interpolation | `fill()` + `companyTokens()` from `src/lib/interpolate.ts` |
| Schema builder | `src/lib/schema/jobPosting.ts` (`jobPostingGraph`) |
| `company.ts` fields consumed | `company.careersEmail` (via `careersMailto()` + rendered link text); token-fed: `legalName`, `brand`, `city` (address.city), `region` (address.region), `country` (address.country). Org schema (via `includeOrgSchema`) and footer additionally surface `legalName`, `foundingDate`, `address`, `email`, `telephone`, `numberOfEmployees`, `vatID`, `sameAs`, NIB/NPWP, director names — all layout-level, not authored on this page. |
| Schema types emitted | `Organization` + `WebSite` (sitewide org graph), `JobPosting` ×2 (head-of-production, sales-manager), `BreadcrumbList`. No FAQPage (correct). |
| Built HTML | `dist/careers/index.html` (present, inspected) |
| Incoming internal link | `footerCompanyNav` → `/careers` is in `LIVE_ROUTES`, renders on every page footer. Not an orphan. |

**Pillar-linking rule note:** `/careers` is a supporting page, not a cluster page. The CLAUDE.md "up-link in first paragraph + Related section" rule applies to *cluster* pages under a pillar. A supporting page has no pillar, so neither requirement is a violation here. Incoming-link requirement IS satisfied (footer Company column).

**Build:** Not run (build already complete per run instructions; `dist/careers/index.html` read read-only). No stop condition triggered — page resolves to exactly one route.

---

## 2. Severity-tiered TODO list

### Blockers
*(honesty-gating violation, hardcoded company fact, fabricated/uncited claim, real orphan/broken pillar link, misplaced FAQPage, build failure, regulatory claim now factually wrong)*

**None.**

Verification notes (why each candidate is NOT a blocker):
- **Hardcoded facts:** every company fact on the page flows through tokens or `company.careersEmail`. The rendered email `career@muliacharcoal.com`, hero legal name, and "Location: Semarang, Central Java, Indonesia" all derive from `company.ts` via `companyTokens()` / `careersMailto()`. No literal company fact authored in the page, i18n JSON, or JSON-LD. (The JobPosting role-title literals in `jobPosting.ts` are job-title strings, not company facts under the CLAUDE.md fact list — see HARD-02.)
- **Honesty-gating:** role responsibility/requirement bullets are `TODO:`-flagged in `careers.json` and stripped at build by `isReal()`; both cards correctly collapse to "Full role brief available on request." This is intended graceful omission, NOT missing content. JobPosting schema omits `description`/`responsibilities`/`qualifications`/`baseSalary` for the same honesty reason — shipping fabricated values would be the violation; omission is correct.
- **Orphan / pillar links:** incoming link from permanent footer present; no muted MaybeLink relied upon.
- **FAQPage:** not emitted here (correct — FAQPage only at `/faq`).

### Defects
*(factual Error from Pass 3, missing required schema type, snippet/heading/structure failures, missing Devil's Advocate on cornerstone, missing GEO meta table on cornerstone)*

| ID | tier | pass+rule | location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| DEF-01 | Defect | Pass 1 — GEO extractability (definition-form + heading-as-question) / Pass 2 — featured-snippet lead | Both H2s: "How to Apply" and "Open Positions" | Headings are label-form, not the question a candidate asks, and neither section opens with a self-contained answer sentence. There is no definition-form line stating what the company is hiring for or who should apply. Low extractability for AI/snippet. NOTE: on a minor supporting page this borders Hardening; flagged at Defect only because it is the page's entire substantive content surface (two H2 + two cards) and both fail the snippet-lead test simultaneously. | Reframe to question form ("How do I apply for a role at the factory?" / "What roles are open?") and add a one-sentence direct-answer lead under each (e.g. apply method in one line; role count + locations in one line) before the detail. Describe-only; do not write copy here. |

### Hardening
*(anti-bloat, missing mini-cases, freshness cadence, connectivity gaps, minor-page omissions, minor-page meta-table / Devil's-Advocate absence)*

| ID | tier | pass+rule | location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| HARD-01 | Hardening | Pass 1 — honesty-gating cadence / publish-readiness | Both role cards render only "Full role brief available on request"; JobPosting schema omits `description`. Page is `robots: index, follow`. | The page is publicly indexable in a deliberately-incomplete pre-launch state: zero responsibilities/requirements visible, no salary, no description in schema. This is *correct* honesty-gating (not a Defect), but the indexable-while-empty combination is thin for an indexed JobPosting and risks a low-value impression. Source comments confirm copy is pending owner sign-off. | Decision for a human: either gate indexing (noindex) until at least one real bullet/`description` lands, or prioritize owner copy so the role cards + schema `description` populate before public launch. Track via the existing `TODO:` markers in `careers.json` and `jobPosting.ts`. |
| HARD-02 | Hardening | Pass 1 — i18n integrity (user-visible string source) | `src/lib/schema/jobPosting.ts` lines 85, 88 — role titles hardcoded as English literals ("Head of Production — Shisha Charcoal", "Sales Manager (Arabic-speaking)") | The same two titles also live in `careers.json` (`roles.*.title`). The schema duplicates them as literals. The file header (lines 74–79) documents this as an intentional "JSON-LD is i18n-blind" decision. These are JSON-LD values (not on-page visible text — the visible titles DO come from i18n), so this is not a hardcoded *company* fact and not a true i18n leak. Flagged only as a drift risk: editing a title in `careers.json` will silently desync the schema title. | Optional: source the JobPosting `title` from `en.careers.roles.*.title` so the two cannot drift, OR keep the literal and add a co-location comment in `careers.json` pointing to `jobPosting.ts`. Low priority; current state is internally consistent and documented. |
| HARD-03 | Hardening | Pass 2 — Devil's Advocate / mini-cases (minor page) | Whole page | No steelman / counterargument section and no Problem→Action→Result mini-case. | Expected absence on a minor supporting page. No action required; recorded for completeness per methodology (minor-page absence = Hardening). |
| HARD-04 | Hardening | Pass 2 — GEO meta table (minor page) | Top of page | No Author / Reviewed-by / Fact-checked / Last-updated / Read-time meta table. | Expected absence on a minor supporting page (the meta table is a cornerstone/article requirement). No action required; recorded for completeness. |
| HARD-05 | Hardening | Pass 1 — outbound cross-link richness | `apply` section + role cards | The page does not link to any operational pillar (Factory, About) to give a candidate context on the employer. Not required for a supporting page, but a single contextual link (e.g. "about the factory") would aid both candidates and internal-link density. | Optional: add one contextual link to `/about` or `/factory` in the apply intro. Describe-only. |

---

## 3. Claims register

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "PT Coco Reina Global Charcoal Indonesia is a coconut shell charcoal briquette factory in Semarang, Central Java" (hero) | Correct | Low | Legal name + city + region all token-fed from `company.ts` (`legalName`, address.city, address.region). | company.ts |
| "hiring locally for our export operation" (hero) | Correct | Low | Consistent with on-site Semarang hiring and email-only application design noted in source/schema. Not externally verifiable but internally consistent and non-superlative. | model / page-design |
| Apply email = `career@muliacharcoal.com` | Correct | Low | Rendered from `company.careersEmail`; `careersMailto()` builds the `mailto:`. Distinct from `export@muliacharcoal.com` (sales) by design. | company.ts |
| "Location: Semarang, Central Java, Indonesia" (both role cards) | Correct | Low | `{{city}}, {{region}}, {{country}}` tokens. | company.ts |
| "Employment: Full-time, on-site" (both cards) | Unverified | Low | `employmentValue` is a fixed i18n string, not a `company.ts` fact and not gated. It is an employment descriptor, not a company fact, so not a hardcoded-fact Blocker — but it asserts an employment condition with no backing config field. Low risk; consistent with `applicantLocationRequirements`/on-site note in `jobPosting.ts` header. | i18n (en/careers.json) |
| JobPosting `datePosted` 2026-06-23 / `validThrough` 2026-09-21 (90 days) | Correct | Low | Build-time computed in `jobPosting.ts` (today + 90d). Refreshes each deploy — acceptable for a static JobPosting. | jobPosting.ts |
| Role titles: "Head of Production — Shisha Charcoal", "Sales Manager (Arabic-speaking)" | Unverified | Low | Owner-supplied role definitions; no external source. Consistent between visible card (i18n) and schema (literal). See HARD-02 for the drift risk. | i18n + jobPosting.ts |

No factual **Error** (source-contradicting) claims found. No superlatives ("first/only/largest"), statistics, or regulatory claims present on this page.

---

## 4. Requires deep research

**None.** No external/regulatory/statistical claim on this page needs the deep-research companion. All assertions are either company-config-backed or internal employment descriptors. The two role titles and the "Full-time, on-site" condition are owner-supplied employment facts to be confirmed by the owner, not researched externally.

---

## 5. E-E-A-T / HCU assessment

Scored against the supporting-page bar (a careers landing page, not a content/topical-authority page).

| # | Criterion | Score /10 | One-line justification |
|---|---|---|---|
| 1 | Authorship & expertise | 6 | Employer identity is clear (legal name, location); no named hiring contact or recruiter byline, which a careers page can reasonably carry. |
| 2 | Topical authority | 5 | Not a topical page; demonstrates employer legitimacy but no depth about working at the factory. |
| 3 | Technical health & freshness | 8 | Clean static HTML, correct JobPosting + Breadcrumb + Org schema, build-time-fresh `datePosted`. (CWV/Lighthouse owned by DrMax — not re-measured.) |
| 4 | Effort | 4 | Minimal content: two H2 + two cards both collapsed to "details on request." Honest, but low effort visible to a reader/crawler today. |
| 5 | Originality | 5 | Standard careers boilerplate; nothing unique about the roles or the workplace yet (copy pending). |
| 6 | Citation quality | 7 | All facts config-sourced; no fabricated claims; honest omission over invention. |
| 7 | Freshness / timeliness | 7 | `datePosted`/`validThrough` regenerate each build; no stale-date risk. |
| 8 | Page intent | 8 | Intent (apply for a job) is unambiguous and the apply path (email, subject-line routing, per-role Apply buttons) is clear and frictionless. |
| 9 | Structure & readability | 7 | Logical H1→H2→H3 outline, no skipped levels, prose-width body, accessible labels/aria. Headings are label-form not question-form (DEF-01). |
| 10 | Mobile | 8 | Responsive grid (`md:grid-cols-2`), 44px+ touch targets on Apply buttons, logical RTL-safe classes (`ps-5`, `end-*`). |
| 11 | Format-standard adherence | 8 | Correct schema type & placement for a careers page; JobPosting present, FAQPage correctly absent. |
| 12 | Trust & spam signals | 8 | Real legal entity, consistent contact, no spam patterns, honesty-gated placeholders never leak. |

**PQ (mean of 12):** (6+5+8+4+5+7+7+8+7+8+8+8) / 12 = **81/120 = 6.75 / 10.**

**Verdict:** **Helpful-first**, but thin. The page serves a genuine candidate intent honestly and routes the application cleanly; it does not chase search traffic with bloat. However, in its current pre-copy state it is closer to a functional stub than a fully helpful page — goodClicks likely for a candidate who already wants to apply; badClicks/bounce risk for a candidate who lands wanting to know *what the job involves* and finds only "details on request." Once owner copy lands, this rises materially.

**Lowest-3 action steps (criteria 4 Effort, 2 Topical authority, 5 Originality):**
1. **Effort (4):** prioritize owner-supplied responsibilities/requirements bullets so the `isReal()` filter starts rendering real content and both cards stop collapsing to "details on request." Tracked by the `TODO:` markers in `careers.json`.
2. **Topical authority (2/5) & Originality (5):** add a short, factual "why work here" context block (factory scale, export reach, location) sourced from existing `company.ts` tokens and/or a contextual link to `/about` or `/factory` (HARD-05) — gives the page substance unique to this employer without inventing facts.
3. **Snippet readiness (supports 9 & overall):** apply DEF-01 — convert the two H2s to question form and add a one-sentence direct-answer lead under each, so the page is extractable by AI/search the moment real copy lands.
