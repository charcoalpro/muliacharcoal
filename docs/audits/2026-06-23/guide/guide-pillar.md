# Content Audit — /guide (Buyer's-Guide pillar hub)

**Run:** single-page CONTENT audit (diagnose-only, report-only). Passes 0,1,2,3,5. Pass 6 OFF.
**Date:** 2026-06-23
**Cornerstone:** YES — cornerstone rules enforced (GEO meta table, Devil's-Advocate steelman, Problem-Action-Result mini-cases, FAQ Q&A).

---

## 1. Manifest

| Field | Value |
|---|---|
| Route | `/guide` |
| Pillar | guide (this IS the pillar hub) |
| Source file | `src/pages/guide/index.astro` |
| Built HTML | `dist/guide/index.html` (Astro single-file emit; body minified on line 110) |
| Layout | `src/layouts/BaseLayout.astro` |
| Components rendered | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `TableOfContents`, `MaybeLink`, `FAQSection`, `CTABanner`, `KeyFactsBox` |
| i18n source | `src/i18n/en/guide.json` → `en.guide.hub` + `en.guide.common` |
| Schema builder | `src/lib/schema/guideHub.ts` → `guideHubSchema()` |
| `company.ts` fields consumed | `company.address.city`, `company.address.country`, `company.certifications.iso9001.shortName`, `company.certifications.halal.certified`, `company.guide.editorial.hub.dateModified` / `.datePublished`, `company.governance.author/reviewer/factChecker` (via `ArticleMeta`), `company.whatsapp.presetMessages.salesGeneral`, `waLinkFor('salesGeneral')`; token-fills via `companyTokens` (`moqLabel`, `moqTons`, `portLabel`); `grades.ts` (ash / fixedCarbon / calorieValue / burnTime ranges for KeyFactsBox) |
| Schema TYPES emitted | `CollectionPage` (`#webpage`), `FAQPage` (`#faq`, hub-canonical routing Qs), `BreadcrumbList` (from `<Breadcrumbs>`) |
| Pillar links DOWN to this page | Yes — `headerNav` and `footerOperationsNav` both include `/guide` (`src/config/nav.ts`); both live children link back up via their Related sections |
| Incoming internal links (permanent) | Header nav + footer operations nav → not an orphan |

**Pass 0 stop conditions:** none triggered. Page resolves to exactly one route. Build artifact present and read-only inspected (no build run).

---

## 2. Severity-tiered TODO list

### Blockers
*(honesty-gating violation, hardcoded company fact, fabricated/uncited claim, real orphan/broken pillar link, misplaced FAQPage, build failure, regulatory claim now factually wrong)*

**None.**

Explicit confirmations (so the absence is auditable, not an oversight):
- **No hardcoded company facts.** Every fact value renders through `company.ts` / `companyTokens` / `grades.ts`. The strings `ISO 9001`, `SGS / Intertek`, `WhatsApp`, `UN 1361` in `guide.json` are educational/industry prose or channel names, NOT held-fact assertions — the company's *held* certs render via `company.certifications.*` in the hero trust block. MOQ in title/description/intro is the `{{moqTons}}` / `{{moqLabel}}` token (renders "18 t" / "18 tons"); origin is `company.address.city, .country` ("Semarang, Indonesia"); port via `portLabel` token. No NIB / NPWP / phone / email / bank / cert-ID literal anywhere in source or i18n.
- **FAQPage placement is CORRECT, not misplaced.** `FAQPage` at `/guide` is the established sitewide hub pattern (`/quality`, `/logistics`, `/faq` all emit a hub-canonical `FAQPage`; one Q/A = one home). The 3 hub Qs are *routing* questions ("What charcoal is best for shisha?", "How do I choose a shisha charcoal supplier?", "Can I sell coconut charcoal under my own brand?") — none is a canonical SHT / COA / MSDS question (those homes are `logistics/un-1361`, `quality/certifications`, `logistics/documents` respectively, and are not duplicated here). Not a Blocker.
- **Muted forward-refs are correct.** `/guide/how-to-start-your-own-brand` and `/guide/private-label-options` are not in `LIVE_ROUTES`; they render as plain "Coming soon" text (no `<a href>` in HTML) — deliberate `MaybeLink` muting, not orphans/broken links.

### Defects
*(factual Error from Pass 3, missing required schema type, snippet/heading/structure failures, missing Devil's-Advocate on cornerstone, missing GEO meta table on cornerstone)*

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 2 — Devil's Advocate (cornerstone) | Page body between `#how-buyers-start` ("How buyers start with us") and `#at-a-glance` — i.e. after the thesis-proving content, before the at-a-glance facts | Cornerstone rule requires a steelman section: state the strongest industry counterargument to the page's thesis ("sourcing = right material + right factory"), say when it holds, and give a data-grounded rebuttal. The hub has **no** such section (no "devil/counterargument/steelman/the case against/objection" content in built HTML). | Add one H2 steelman section, e.g. answering the genuine buyer objection "Isn't bamboo / well-carbonized hardwood just as good and cheaper, making factory vetting overkill?" Concede the real overlap (coconut ≈ well-carbonized bamboo on fixed carbon and calorific value — already sourced in `guide-research-findings.md` A1/A3), state when the cheaper path is defensible, then rebut with the decisive differentiators (low ash, density/burn, neutral taste, DG/COA reproducibility). Add as new i18n keys under `en.guide.hub`; cite no new company fact. |
| D2 | Defect | Pass 2 — featured-snippet lead / headings-as-questions | H2s "How to use this guide" (`#intro-heading`), "The guides" (`#guides-heading`), "How buyers start with us" (`#how-buyers-start-heading`), "Coconut shell charcoal at a glance" (`#at-a-glance-heading-heading`) | On a cornerstone, section headings should be the question the buyer asks, each followed by a 1–2-sentence self-contained answer. These four H2s are label/statement form, weakening snippet eligibility. (The FAQ H2 and the child-card H3s are already question/answer-shaped, so this is partial.) | Reframe at least the two highest-intent H2s as questions (e.g. "How should I work through this buyer's guide?", "How do buyers place a first order with you?") and ensure the first sentence under each directly answers it. Label/i18n-only change in `guide.json`; no fact change. |

### Hardening
*(anti-bloat, missing mini-cases, freshness cadence, connectivity gaps, minor-page omissions)*

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 2 — Mini-cases (cornerstone) | Anywhere in body; natural home is inside or adjacent to `#how-buyers-start` ("How buyers start with us") | Cornerstone pages should carry ≥1–2 Problem → Action → Result structures with a measurable result. The B3 on-ramp (sample → trial container → repeat) is a generic 3-step ladder, not a PAR mini-case; no "problem / action / result / outcome" framing exists in the HTML. | Add 1–2 short anonymized PAR vignettes (e.g. "Buyer received a non-DG-declared quote → required a UN 1361 DG declaration + SHT report and a per-batch SGS COA → first container cleared customs without a DG hold"). Keep results qualitative/process-measurable (no fabricated metrics or named customers); add as i18n prose. Honesty-gate any number to a real source. |
| H2 | Hardening | Pass 0/1 — structure (id hygiene) | `#at-a-glance` section wrapper (`src/pages/guide/index.astro` L251) nesting the `KeyFactsBox` `<section id="at-a-glance-heading">` (L253–258); resulting H2 id is `at-a-glance-heading-heading` | Two nested `<section>` elements with a near-duplicate id pair (`at-a-glance` / `at-a-glance-heading`) and a doubled-suffix heading id (`-heading-heading`). The TOC anchor `#at-a-glance` still resolves to the outer wrapper, so navigation works — purely cosmetic id-naming smell. | Pass a cleaner `id` to `KeyFactsBox` (e.g. `at-a-glance-facts`) or drop the outer wrapper id, so the section/heading ids don't collide. No content/SEO impact. |
| H3 | Hardening | Pass 2 — anti-bloat / KeyFactsBox heading semantics | `#at-a-glance` — `KeyFactsBox` renders the visible "Coconut shell charcoal at a glance" as an `<h2>` styled `text-sm uppercase` (looks like an eyebrow) | The most extractable GEO block on the page presents its H2 in small-caps eyebrow styling; visually it reads as a kicker, not a section heading, slightly under-selling the strongest AI-citation surface. Heading level is correct; only the visual weight is low. | Optional: give the at-a-glance H2 the same `sectionH2` weight as sibling sections, or confirm the small-caps treatment is the intended pillar pattern (it mirrors the /products block per the component doc). Style-only. |
| H4 | Hardening | Pass 5 — title length (content-adjacent) | `<title>` in `dist/guide/index.html` = "Shisha Charcoal Buyer's Guide: Sourcing & Selection \| Mulia Charcoal" (76 chars incl. site suffix) | CLAUDE.md targets `<title>` < 60 chars. The keyword-front-loaded base title is 50 chars; the global "\| Mulia Charcoal" suffix pushes the full element to 76. Borderline truncation in SERP. (Pure-syntax/technical SEO is out of scope; flagged at minimum severity because copy length is content-editable.) | If trimming is desired, shorten the base title (e.g. "Shisha Charcoal Buyer's Guide & Sourcing") so base + suffix lands under ~60. Meta description (145 chars, MOQ-framed) is already in range. |
| H5 | Hardening | Pass 1 — freshness cadence | Schema + meta block: `datePublished` = `dateModified` = `2026-06-20` (`company.guide.editorial.hub`) | Published and modified dates are identical — correct for a newly built page, but flag the cadence: per GEO rules the hub should get a fresh `dateModified` (tied to a real content event, e.g. when D1/D2/H1 land or a child guide ships) rather than a cosmetic annual bump. | When the recommended fixes land, bump `company.guide.editorial.hub.dateModified` to the real edit date. No action needed today; tracked so the next edit updates it. |

---

## 3. Claims register (Pass 3)

Scope: hard claims rendered **on the hub itself** (hero trust, intro, child-card takeaways, KeyFactsBox, FAQ). Claims that live on the two child lead pages are out of scope for this unit.

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| MOQ "18 t" / "18 tons" (title, meta desc, hero trust, intro prose) | Correct | Low | Token-filled `{{moqTons}}` / `{{moqLabel}}`; single-sourced. | company.ts (moq) |
| Origin "Semarang, Indonesia" (hero trust "Factory") | Correct | Low | `company.address.city, .country`. | company.ts |
| Certification "ISO 9001 · Halal" (hero trust) | Correct | Low | Gated on `certifications.iso9001.shortName` + `certifications.halal.certified`; held-cert, not per-order report. | company.ts |
| At-a-glance: Ash 1.6–2.8% | Correct | Low | Computed min–max across `grades.ts`. Consistent with research A2 ("1.6–2.8% across our grades"). | grades.ts / guide-research-findings.md A2 |
| At-a-glance: Fixed carbon 75–82% | Correct | Low | Computed from `grades.ts`. Within material-science range (research A1: coconut ~70–83%). | grades.ts / guide-research-findings.md A1 |
| At-a-glance: Calorific 7,000–7,500 kcal/kg | Correct | Low | Computed from `grades.ts`. Within research A3 (~6,700–7,700 kcal/kg). | grades.ts / guide-research-findings.md A3 |
| At-a-glance: Burn time 2–2.5 hours | Correct | Low | Computed from `grades.ts`. Company spec range; no external standard contradicts. | grades.ts |
| "Coconut shell charcoal is … low in ash, dense, and burns long and neutral" (intro/FAQ definition) | Correct | Low | Definition-form; matches research A2/A4/A5. | guide-research-findings.md A2/A4/A5 |
| "Coconut and well-carbonized bamboo overlap on fixed carbon and calorific value" (compare takeaway) | Correct | Low | Research A1 + A3 explicitly: heavy overlap; decisive differences are ash/density/taste. | guide-research-findings.md A1/A3 |
| "a peer-reviewed study measured roughly twice the carbon monoxide of natural charcoal" (compare takeaway) | Correct | Medium | Monzer et al. 2015: 3,728 vs 1,730 ppm ≈ 2.15× — "roughly twice" is accurate and appropriately hedged; combustion measurement, no health claim. | guide-research-findings.md A7 |
| "Since IMDG Amendment 42-24 / SP 978, charcoal must ship as declared UN 1361, Class 4.2 — the self-heating test no longer exempts it" (chooseFactory takeaway + FAQ) | Correct | Medium | Matches research B3 (SP 978 removed SP 925 exemption; UN N.4 no longer exempts). Time-sensitive regulatory claim — see Pass 1 currency note; carries no visible review date on THIS hub (the dated home is `logistics/un-1361`). | guide-research-findings.md B3 |
| "ISO 9001 certifies the management system, not the product" (compare/chooseFactory takeaways + FAQ) | Correct | Low | Research B1; standard industry distinction. Educational, not a held-fact claim. | guide-research-findings.md B1 |
| "Hardwood lump charcoal is irregular, lights fast and burns less evenly; rarely used for modern shisha" (compare takeaway) | Correct | Low | Research A4/A8. | guide-research-findings.md A4/A8 |
| "private-label (white-label) supply lets you sell … from a single container" (FAQ) | Unverified | Low | "From a single container" is a commercial-terms assertion; not contradicted by sources but not in `company.ts` or research as a stated minimum. Low risk; confirm against actual white-label MOQ policy. | model / company.ts (no explicit white-label MOQ field surfaced here) |

---

## 4. Requires deep research

The hub introduces no new external claim that the child pages and `guide-research-findings.md` do not already source. The two items worth routing:

| Claim | Why | Markets |
|---|---|---|
| "Since IMDG Amendment 42-24 / SP 978 … the self-heating test no longer exempts it" (UN 1361 DG reframe) | Time-sensitive regulatory claim repeated on the hub without a visible review date here. Already sourced (research B3) and dated on `logistics/un-1361`; confirm the amendment edition is still the carrier-enforced one at the buyer's shipment date before the next refresh. | All (USA, UK, Germany, Saudi Arabia, Russia/CIS) |
| White-label / private-label "from a single container" minimum (FAQ "Can I sell coconut charcoal under my own brand?") | Commercial-terms claim with no backing `company.ts` field surfaced on this page; verify the real white-label MOQ before treating "single container" as a guarantee. | UK, Germany, USA (private-label demand) |

No fabricated or uncited claims found. Do not write any of the above into the repo as fact — they are human-verification TODOs.

---

## 5. E-E-A-T / HCU summary

Per-criterion (1–10):

| # | Criterion | Score | Justification |
|---|---|---|---|
| 1 | Authorship & expertise | 9 | Full meta table renders real names from `governance.*` (Mohamad Sinno / Ahmet Bassam / Teguh Pranomo) with roles; fact-checker honesty-gated. |
| 2 | Topical authority | 9 | Hub correctly orchestrates the cocoon: 2 live lead articles + B3 on-ramp + at-a-glance + routing FAQ + dense Related section to 15 pillar/cluster targets. |
| 3 | Technical health & freshness | 7 | Clean `CollectionPage`+`FAQPage`+`BreadcrumbList`; zero-JS, native `<details>`. Freshness cadence flagged (H5: published=modified). CWV/Lighthouse out of scope. |
| 4 | Effort | 7 | Strong structure and sourced takeaways, but missing the cornerstone steelman (D1) and PAR mini-cases (H1) caps demonstrated effort below top tier. |
| 5 | Originality | 7 | Genuine synthesis (the two-decision framing, sourced material/factory takeaways). Some takeaway lines restate the child-page leads; acceptable for a hub. |
| 6 | Citation quality | 8 | Numeric claims trace to `guide-research-findings.md` (peer-reviewed / IGO / standards). Hub itself defers outbound citations to children — appropriate. |
| 7 | Freshness / timeliness | 7 | Dated 2026-06-20; regulatory DG claim is current. No visible review date on the DG line on the hub (dated home is the child) — minor. |
| 8 | Page intent | 9 | Unambiguous top-of-funnel routing hub; matches "how do I source shisha charcoal / pick a factory" intent and channels to depth. |
| 9 | Structure & readability | 8 | Logical TOC, definition-form leads, extractable KeyFactsBox. Held back by statement-form H2s (D2) and the nested-id smell (H2). |
| 10 | Mobile | 8 | Responsive grids (`grid-cols-2 sm:grid-cols-4`, `md:grid-cols-2/3`), `min-h-11` touch targets, logical `border-s`/`ps-` properties. Built HTML consistent with CLAUDE.md mobile budgets; not re-measured. |
| 11 | Format-standard adherence | 7 | Cornerstone format largely met (meta table ✓, FAQ ✓) but two required cornerstone formats absent: Devil's-Advocate (D1) and PAR mini-cases (H1). |
| 12 | Trust & spam signals | 9 | No keyword stuffing, no fabricated facts, honesty-gated trust block, muted forward-refs instead of dead links. |

**PQ (mean of 12) = 7.83 / 10.**

**Verdict:** Helpful-first. The page is built to route a serious buyer to depth, not to capture a query and dead-end them; trust signals are real and honesty-gated. Prognosis: goodClicks-dominant. The gap to top-quartile is format completeness, not trust or accuracy.

**Lowest-3 action steps:**
1. **Effort / Format (criteria 4 & 11) — add the Devil's-Advocate steelman section (D1):** one H2 conceding the coconut≈bamboo overlap and rebutting with ash/density/taste + DG/COA reproducibility, sourced from research A1/A3.
2. **Format / Effort (criteria 11 & 4) — add 1–2 Problem→Action→Result mini-cases (H1)** near `#how-buyers-start`, results kept qualitative/process-measurable, no fabricated metrics or named customers.
3. **Structure & readability (criterion 9) — reframe the two highest-intent statement H2s as questions with a direct first-sentence answer (D2),** improving featured-snippet eligibility (i18n-only change).
