# Build Prompt — `/guide` Buyer's Guide Pillar (hub + 4 guides) (v1)

> **For:** Claude Code, senior SEO/GEO engineer on muliacharcoal.com.
> **Inherits the conventions established by `packaging-hub-build-prompt-v6` + `logistics-hub-build-prompt-v1` + `factory/factory-hub-build-prompt-v1`** — shared components (`KeyFactsBox`, `Figure`, `PhotoGrid`, `SpecsTable`, `FAQSection`, `Breadcrumbs`, `CTABanner`, `StickyWhatsApp`, `ArticleMeta`/E-E-A-T block), graceful degradation (no raw tokens; missing fact → omit/"—"; never invent), **facts only from `company.ts`**, `<MaybeLink>`/`isLive()` gating, full hreflang + `x-default`, zero client JS, AVIF/lazy/explicit-dims, RTL-safe, metric, all strings i18n, sitewide CTA components with analytics events, three-part verification (JS-off extractability, Rich Results, build + Lighthouse floor). Do not re-derive these; apply them.
> **What this pillar is:** the **cornerstone, top-of-funnel, highest-AI-citation** surface on the site. Where Markets convert geo-intent and Products/Factory/Quality carry specs, the Guide *educates the researching buyer* and earns the citation/snippet that pulls them in. Every guide is informational (Article-type), definition- and comparison-led, and funnels **down into the existing pillars**.
> **Scope:** Build the **`/guide` hub + 4 cluster guides** (`how-to-choose-shisha-charcoal-factory`, `coconut-vs-bamboo-vs-wood-charcoal`, `how-to-start-your-own-brand`, `private-label-options`). One pillar, one branch. (A 5th, `how-to-import-shisha-charcoal`, is recommended in §10 but out of scope here.)

---

## STEP 0 — Preflight (output a plan, WAIT for approval)

- **Components:** confirm the shared components exist (from packaging/logistics/quality/factory). If any is missing, STOP and flag.
- **Slug reconciliation (do this in this build):** `GradePage.astro` currently links `/guide/coconut-charcoal-suppliers-compared` via `<MaybeLink>`. The canonical slug is **`/guide/how-to-choose-shisha-charcoal-factory`** (CLAUDE.md). Update the `GradePage.astro` href to the canonical slug so the link resolves — do not create two pages for one intent.
- **Guide ≠ Blog:** guides are **evergreen pillar cluster pages** built as `.astro` under `src/pages/guide/` (same pattern as logistics/quality), **not** entries in the `articles` content collection (that stays for the blog). Don't blur the two.
- **Overlap discipline (one home per topic — enforce, cross-link, never duplicate):**
  - *What ash % / fixed carbon / burn time mean* → **`/quality/specifications-explained`** (guides link to it, don't re-explain).
  - *How charcoal is physically made* → **`/factory/production-process`**.
  - *White-label service + artwork specs/MOQ* → **`/packaging/white-label`** (the `private-label-options` guide is the *decision/education*; it hands off to the service page).
- **Nav + no orphan:** add `/guide` to the footer (and recommend header); the 4 guides are reached from the hub + existing in-content links.
- Output: per-guide section plan, the slug-reconciliation edit, the FAQ-canonical split, schema-builder list, E-E-A-T/author dependency, and the link-activation list (§8). **Wait for approval before writing code.**

---

## 1. Search-AI modeling (research-stage queries — the whole point of this pillar)

Answer engines field a research funnel *before* the buyer knows a vendor: *"coconut vs bamboo vs wood charcoal," "best charcoal for shisha," "how to choose a shisha charcoal supplier / factory vs trader," "how to start a hookah charcoal brand," "private label vs white label hookah charcoal," "minimum order for private label charcoal."* These reward the formats AI quotes verbatim: **a comparison table** (coconut vs bamboo vs wood across ash/FC/burn time/odor), **a definition-form opener** per concept, a **numbered decision checklist** ("how to choose"), and a **Q&A surface**. The hub is the **router** ("start here by buyer type"); each guide owns one decision and funnels to the pillar that converts it. **Competitive gap:** competitors publish product pages and vague "why us" copy but few real *buyer-education* assets with tables + schema — this pillar is where the site earns top-of-funnel citations and then internal-links the authority down into Products/Factory/Quality/Packaging.

---

## 2. Hard constraints

- **Facts only from `company.ts`.** Spec figures in the comparison/checklist come from `grades`/`company.ts` (ash, fixed carbon, burn time, MOQ, certs) — never hand-typed. Industry-wide comparison numbers (bamboo/wood properties) come from the **research findings sheet** and render with a source/"indicative" caveat — they are *not* company facts and must not be presented as our spec.
- **E-E-A-T is mandatory here** (this is the pillar where author trust matters most): every guide carries the full Author / Reviewed-by / Fact-checked-by + last-updated + read-time block from `editorial.*`. If a real author entity/`/authors` page isn't available yet, render the block from `editorial.*` placeholders and log it as a Data Gap — do not fabricate a person.
- **No medical/health claims.** Charcoal burn/smoke content stays factual (ash, temperature, burn time); never imply health benefits.
- **Numbers over adjectives** (CLAUDE.md voice). Every claim that can be a number is one.
- Everything else per inherited conventions (zero JS, budgets, RTL, metric, no `Product`/`Offer` on guides).

---

## 3. Pages & i18n

| Route | File | i18n namespace |
|---|---|---|
| `/guide` (hub) | `src/pages/guide/index.astro` | `guide.*` → `src/i18n/en/guide.json` (+ `guideCommon.json`) |
| `/guide/how-to-choose-shisha-charcoal-factory` | `src/pages/guide/how-to-choose-shisha-charcoal-factory.astro` | `guideChooseFactory.json` |
| `/guide/coconut-vs-bamboo-vs-wood-charcoal` | `src/pages/guide/coconut-vs-bamboo-vs-wood-charcoal.astro` | `guideCoconutVsBambooVsWood.json` |
| `/guide/how-to-start-your-own-brand` | `src/pages/guide/how-to-start-your-own-brand.astro` | `guideStartYourOwnBrand.json` |
| `/guide/private-label-options` | `src/pages/guide/private-label-options.astro` | `guidePrivateLabelOptions.json` |

Follow the page structure of an existing cluster page (e.g. `src/pages/quality/specifications-explained.astro`) and the per-pillar i18n split as the canonical reference.

---

## 4. Hub structure (`/guide`, top → bottom)

1. **Header** + **Breadcrumbs** (Home › Buyer's Guide).
2. **Hero** — H1 < 60 chars (e.g. *"Coconut Shisha Charcoal Buyer's Guide"*) + definition-form lead + primary CTA.
3. **Full E-E-A-T block** (`editorial.*`).
4. **"Start here by buyer type"** router — 3–4 cards: *new importer / launching a brand / existing distributor / lounge owner* → each points to the most relevant guide(s) + product/packaging entry point.
5. **Guide cards (one per child)** — anchor, H2, one-line definition of what the guide answers, "Read the guide →".
6. **FAQ** (`FAQSection` + `FAQPage`) — hub-canonical only (§6).
7. **Related topics** — across to **Products**, **Factory**, **Quality**, **Packaging**, **Logistics**, plus `/samples`, `/faq`, `/glossary`, `/contact`.
8. **CTABanner** + **Footer** + **StickyWhatsApp**.

### The 4 guides (build on the cluster template)

| Guide | Owns (intent) | Core content | Schema | Funnels to |
|---|---|---|---|---|
| **how-to-choose-shisha-charcoal-factory** | "how to vet a supplier / factory vs trader" | Numbered decision checklist: factory-vs-trader test, certs to demand (ISO 9001, COA, SHT, REACH SDS), specs to verify (ash, FC, burn time, drop test), sample + MOQ process, red flags, audit/visit | `Article` + `FAQPage` (optionally `HowTo` for the checklist) | **Factory**, **Quality/certifications**, `/samples` |
| **coconut-vs-bamboo-vs-wood-charcoal** | "which raw material is best" | **Comparison `SpecsTable`**: ash %, fixed carbon, burn time, density, calorific value, odor, sustainability, cost — coconut (our specs from `grades`) vs bamboo/wood (research, caveated) | `Article` + `FAQPage` | **Products**, **Factory/raw-materials**, Quality |
| **how-to-start-your-own-brand** | "launch a hookah charcoal brand" | End-to-end: choose specs → private label → MOQ (18 t) → artwork/packaging → import + DG → first order timeline | `HowTo` + `Article` + `FAQPage` | **Packaging/white-label**, **Products**, **Logistics** |
| **private-label-options** | "private vs white label / OEM" | Private vs white label defined; what's customizable (shape, size, grade, box, print); printed-box MOQ + lead times; artwork hand-off | `Article` + `FAQPage` | **Packaging/white-label**, Products |

Each guide: up-link to `/guide` in the first paragraph **and** a Related-topics block; **≥ 2 pillar links** (CLAUDE.md article rule); definition-form opener; ≥ 1 numeric table or numbered list; date-stamped.

---

## 5. `company.ts` — minimal; mostly reuse

Guides are content-led; they **reuse** `grades` (the comparison/checklist specs), `company.commercial` (MOQ, payment, languages), `company.certifications`, and `editorial.*` (bylines). Add a new object only if a guide needs a structured fact not already present — likely **none**. The one real dependency is **E-E-A-T authorship**: confirm `editorial.*` (author/reviewer/fact-checker) is populated, or add it; a real `/authors/{name}` page is a separate cornerstone task (Data Gap). Industry comparison numbers (bamboo/wood) live **in the i18n prose with a source caveat**, sourced from the research sheet — **not** in `company.ts` (they aren't our facts).

---

## 6. FAQ-canonical split (one Q/A = one home)

- **Hub-canonical:** What should I look for in a shisha charcoal supplier? · Are you a factory or a trader? *(if not already factory-hub-canonical — pick ONE home)* · What's the difference between your guides?
- **choose-factory-canonical:** How do I verify a factory is real? · What certificates should I ask for? · What specs separate good charcoal? · How do samples work?
- **coconut-vs-bamboo-vs-wood-canonical:** Why coconut shell over wood/bamboo? · Which has the lowest ash / longest burn? · Is coconut charcoal more sustainable?
- **start-your-own-brand-canonical:** How do I start a hookah charcoal brand? · What's the minimum order? · How long from artwork to first container?
- **private-label-canonical:** Private label vs white label? · What can I customize? · MOQ for printed boxes?
- Cross-pillar Qs already owned elsewhere (DG on `/logistics/UN-1361`, specs on `/quality`, container math on `/logistics`) stay there — link only.

---

## 7. Schema

Guides are **`Article`** (or `TechArticle`) with `author`/`datePublished`/`dateModified`/`image`, + **`BreadcrumbList`** + page-canonical **`FAQPage`**; `how-to-start-your-own-brand` adds **`HowTo`**. The hub is **`CollectionPage`** (`hasPart` → the 4 guides) + `BreadcrumbList` + `FAQPage`. Reuse `faqPage.ts`/`howTo.ts`/`breadcrumbList.ts`; add `src/lib/schema/guideArticle.ts` + `guideHub.ts` if the existing builders don't cover the Article shape. No `Product`/`Offer`.

---

## 8. Links that self-heal (verify each resolves after build)

Add to `LIVE_ROUTES` (`src/config/nav.ts`): `/guide`, `/guide/how-to-choose-shisha-charcoal-factory`, `/guide/coconut-vs-bamboo-vs-wood-charcoal`, `/guide/how-to-start-your-own-brand`, `/guide/private-label-options`. Then:

| Source | Link | Mechanism today |
|---|---|---|
| `pages/products.astro` | `/guide/coconut-vs-bamboo-vs-wood-charcoal`, `/guide/how-to-start-your-own-brand`, `/guide/private-label-options` | `MaybeLink` muted |
| `components/product/MarketCategoryPage.astro` | `/guide/how-to-start-your-own-brand`, `/guide/private-label-options` | `MaybeLink` muted |
| `components/product/GradePage.astro` | `/guide/coconut-charcoal-suppliers-compared` → **edit to** `/guide/how-to-choose-shisha-charcoal-factory` | `MaybeLink` muted (slug fix) |
| `pages/factory/raw-materials.astro`, `i18n/en/products.json` | `/guide/coconut-vs-bamboo-vs-wood-charcoal` | `MaybeLink` muted |
| `i18n/en/glossary.json` (Related pillars card) | `/guide` | `MaybeLink` muted |

---

## 9. Acceptance / content gate

- [ ] Hub: "start here by buyer type" router; cards to all 4 guides; E-E-A-T block; footer (+ ideally header) link — no orphan.
- [ ] All 4 guides: definition-form opener; up-link to `/guide` + Related topics; **≥ 2 pillar links each**; ≥ 1 numeric table/numbered list; date-stamped.
- [ ] `coconut-vs-bamboo-vs-wood`: real comparison table — **our** coconut figures from `grades`/`company.ts`; bamboo/wood figures caveated + sourced (not presented as our spec).
- [ ] `how-to-choose-...-factory`: numbered checklist; `GradePage.astro` slug updated to this page; old `coconut-charcoal-suppliers-compared` slug retired (no dangling page).
- [ ] Overlap discipline honored: specs→Quality, process→Factory, white-label service→Packaging (linked, not duplicated).
- [ ] `LIVE_ROUTES` updated; **every link in §8 resolves**; `npm run build` clean; repo link-checker reports **zero broken internal links**.
- [ ] Schema validates (Article + BreadcrumbList + FAQPage per guide; HowTo on start-a-brand; CollectionPage on hub); no raw tokens; all strings i18n; `dateModified` set.
- [ ] E-E-A-T block present on every guide; author dependency logged if `/authors` not yet built.
- [ ] Lighthouse mobile ≥95/95/95, SEO 100; per-page budgets respected.

---

## 10. Data Gaps & out of scope

- **E-E-A-T author/reviewer** identity + a real `/authors/{name}` page (cornerstone dependency for citation trust) — log by exact `editorial.*` key.
- **Industry comparison figures** (bamboo/wood ash/FC/burn time) — from `guide-research-findings.md`; each needs a source + confidence; UNVERIFIED ones render as "—".
- **Recommended 5th guide (out of scope here):** `/guide/how-to-import-shisha-charcoal` — top-of-funnel import-101 that funnels to Logistics; build as a follow-on delta once this hub lands.
- **Markets cross-links** stay muted until that pillar ships; don't build them here.

---

## Working style
Restate understanding + assumptions, flag conflicts (esp. the slug reconciliation and any FAQ-home collisions with Factory/Quality), deliver the Step-0 plan, **wait for approval**, surgical changes only.
