# Content Audit — Grade SKU Template `/products/{shape}-{size}-{grade}`

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report-only; no fixes applied)
**Cornerstone:** No (minor/transactional page — meta-table & Devil's-Advocate absence are Hardening, not Defect)
**Passes run:** 0, 1, 2, 3, 5 (Pass 6 OFF)

---

## 1. Manifest

| Field | Value |
|---|---|
| **Route** | `/products/{shape}-{size}-{grade}` (e.g. `/products/cube-25mm-platinum`) — TEMPLATE route, 57 built grade SKU pages |
| **Dispatcher** | `src/pages/products/[slug].astro` (delegates `kind: 'grade'` → `GradePage`) |
| **Template component** | `src/components/product/GradePage.astro` |
| **Sub-components** | `grade/GradeHero.astro`, `grade/GradeBurnTest.astro`, `grade/GradeDropTest.astro`, `grade/GradeLogistics.astro`, `grade/GradeDocuments.astro`; plus shared `SpecsTable`, `DataTable`, `ImagePlaceholder`, `MaybeLink`, `Button`, `InquiryForm`, `CTABanner`, `YouTubeLite`, `Breadcrumbs` |
| **Layout** | `BaseLayout.astro` (`type="product"`, `prefetch={['/contact']}`) |
| **Copy source** | `src/i18n/en/productGrade.json` (shared sections + per-grade unique prose under `grade.{premium,super-premium,platinum}`) |
| **Data sources** | `src/config/grades.ts` (grade specs, FOB band), `src/config/products.ts` (shape/size/pcsPerKg), `src/config/productRoutes.ts` (publish set), `src/config/company.ts` + `src/data/company.json` (all company facts) |
| **Token bag** | `src/lib/product/gradeTokens.ts` → `companyTokens()` in `src/lib/interpolate.ts` |
| **company.ts fields consumed** | `commercial.{moq, portOfLoading, volumeDiscountTiers, transitTimes, containerCapacity, hsCode, leadTime, paymentTerms, lcMinContainers, currency, countriesExportedCount}`, `certifications.{iso9001.auditors, imdg, iso9001}`, `packaging.{primaryPlastic, innerBox, masterBox}`, `production.capacityTonsPerMonth`, `legalDocuments[coa-sample, iso-9001]`, `factoryTourVideo.youtubeId`, `governance.{author, reviewer}`, `samples.*`, `hours.*` |
| **Pillar** | Products (`/products`) |
| **Up-links** | shape category page (`shape.href`, live) + Products hub (`/products`, live) — both in "Related products" section; also `/factory/raw-materials` in first content section |
| **Schema types emitted (verified in built HTML)** | `WebPage`+`ItemPage` (combined node), `ProductGroup` (the shape×size), `Product` ×3 (this grade full-spec + 2 sibling grades), `AggregateOffer` ×3 (FOB band now populated), `Person` ×2 (author + reviewer), `BreadcrumbList` (from visible `<Breadcrumbs>`). **No `FAQPage`** (correct — FAQPage only at `/faq`). `VideoObject` omitted (no real video IDs yet — gated, correct). |
| **Build status** | `dist/products/` present and current: 57 grade pages + 6 category + 2 market + hub `index.html`. No re-build run (per constraints). |
| **Pages inspected** | Source template + 3 representative built pages: `cube-25mm-platinum` (cube/platinum), `flat-30x30x17-super-premium` (flat/super-premium), `lotus-3pc-premium` (lotus→cloud/premium); plus `flat-30x30x17-platinum` for same-grade cross-shape duplication check |

---

## 2. Severity-tiered TODO list

### BLOCKERS
*(honesty-gating violation, hardcoded company fact, fabricated/uncited claim, real orphan/broken pillar link, misplaced FAQPage, build failure, regulatory claim now factually wrong)*

| ID | Tier | Pass + rule | Exact location | What's wrong | Recommended fix (described, NOT executed) |
|---|---|---|---|---|---|
| **B1** | Blocker | Pass 1 — honesty-gating (claim rendered without backing fact, category-a) | `productGrade.json` → `burnTest.intro` ("We burned a single … briquette under controlled conditions and **recorded** surface temperature, remaining weight, and appearance at each stage — so you can **read the performance as data**"), rendered by `GradeBurnTest.astro` (built HTML: all 18 stage metric cells render `—`/pending because `grade.burnTest` is unset in `grades.ts`) | The intro asserts in past tense that a burn test was conducted and its temperature/weight/size were *recorded as data*, but no measured burn-test data exists for any grade — every metric cell in the staged table is the pending em-dash, and the three curves are alt-text-only placeholders. The page claims measured evidence it does not yet hold. (This is NOT graceful omission: the block is rendered with an over-claim, not omitted.) | Re-gate the intro so the past-tense "we recorded / read as data" framing renders only when `hasFact(grade.burnTest)`. Until data lands, the intro should describe the test as a published *method/protocol* (present/future tense, "we burn-test each grade and publish the curve here") rather than asserting recorded results. Do NOT invent burn numbers — route the measured series to the operations director (deep-research / data-entry, not a content fix). |
| **B2** | Blocker | Pass 1 — honesty-gating (claim rendered without backing fact, category-a) | `productGrade.json` → `dropTest.body` ("The two clips below **show the test**"), rendered by `GradeDropTest.astro` (built HTML: both video slots render "Drop-test video for … — coming soon" because `grade.dropTestVideos` is unset) | Prose asserts that two drop-test clips below "show the test," but both clips are honest "coming soon" placeholders — no video exists. The surrounding claim "this grade passes a 3+ drop test" IS backed by `grade.dropTest` (real); the problem is the sentence pointing at non-existent clips as proof. | Gate the "The two clips below show the test" clause on `hasFact(grade.dropTestVideos)`; until videos land, the prose should reference the drop-test *rating* (backed) without asserting that demonstrating clips are present. The numeric "passes a 3+ drop test" claim can stay (it is config-backed). |

### DEFECTS
*(factual Error from Pass 3, missing required schema type, snippet/heading/structure failures, missing Devil's Advocate on cornerstone [N/A here], missing GEO meta table on cornerstone [N/A here])*

| ID | Tier | Pass + rule | Exact location | What's wrong | Recommended fix (described, NOT executed) |
|---|---|---|---|---|---|
| **D1** | Defect | Pass 2 — duplication / coverage; CLAUDE.md "near-duplicate product descriptions across SKUs must vary meaningfully" | `productGrade.json` → `grade.{key}.{whyBody, bestFor, valueProp, microInsight, burnTestNarrative, packagingNote, pricingNote, guaranteeNote}` (keyed only on `grade.key`); confirmed byte-identical across `cube-25mm-platinum` vs `flat-30x30x17-platinum` in built HTML | All unique body prose varies by GRADE only (3 distinct bodies), not by shape or size. Across the 57 SKUs there are effectively 3 prose bodies, size/shape-templated. Shape-specific use-cases that DO exist in `products.ts` (`flat` = kaloud/foil/large-bowl, `stix` = HMD/kaloud devices, `dome` = ceramic/silicone bowls, `hexagonal` = retail shelf appeal, `lotus` = decorative lounge) are never reflected in the grade-page prose — only the shape *name* is interpolated. This is a scaled near-duplicate / thin-differentiation risk (57 pages, 3 bodies). | Introduce a shape-axis of unique prose (e.g. a per-shape sentence in `whyBody`/`bestFor` drawing on `shape.description`'s use-case, interpolated alongside the grade prose) so each shape×grade page carries at least one shape-distinct paragraph. Minimum: lead the "Why" or "How to light" section with a shape-specific application note (Flat → kaloud/foil; Finger → HMD; Dome → bowl seating). Keep grade prose; add the shape differentiator. No new company facts required (use existing `shape.description`). |
| **D2** | Defect | Pass 2 — headings as questions + featured-snippet lead | `GradePage.astro` H2 set (built outline: "Specifications", "Packaging", "Pricing & volume discounts", "Logistics & ordering", "Samples", "Quality guarantee & claims", "Documents", "Compare to other brands", "Related products") | Most H2s are bare noun labels, not the buyer-question form the methodology prefers for snippet/AEO capture, and few sections open with a 1–2-sentence self-contained answer (e.g. "How to light & use" opens with mechanism prose, not a direct "How do you light coconut shisha charcoal? — Place it on an electric coil for 4–6 minutes…"). A handful already do this well ("Is my deposit safe?", "Seen the proof?"). On a 57-page template the snippet lift compounds. | For the high-intent sections, recast the H2 to the question a buyer types (e.g. "How do I light coconut shisha charcoal?", "What is the MOQ and how is it shipped?", "How safe is my deposit?" [already good]) and ensure the first sentence under each is a self-contained answer with the key number. Describe-only; do not rewrite the prose here. |

### HARDENING
*(anti-bloat, missing mini-cases, freshness cadence, connectivity gaps, minor-page omissions)*

| ID | Tier | Pass + rule | Exact location | What's wrong | Recommended fix (described, NOT executed) |
|---|---|---|---|---|---|
| **H1** | Hardening | Pass 1 — GEO meta table (minor page → Hardening) | `GradePage.astro` (whole page) | No top-of-page author / reviewed-by / fact-checked / last-updated / read-time meta table. The author + reviewer ARE in the JSON-LD (`Person` ×2, `datePublished`/`dateModified` from `governance.author.lastReviewed`), but nothing is *visible* on the page for human/AI extraction. Acceptable on a transactional minor page (Hardening, not Defect), but a visible "Reviewed by {reviewer}, {role}" byline would lift E-E-A-T cheaply. | Optionally surface a compact visible trust line (Reviewed by / Last updated) sourced from `company.governance.*` — the burn-test "Conducted under the supervision of {{reviewer}}" line already does a partial version of this; consider promoting a page-level byline. |
| **H2** | Hardening | Pass 2 — Devil's Advocate (minor page → Hardening) | "Compare to other brands" section + "Why buyers trust us" | No steelman of the strongest counterargument (e.g. "coconut coal costs more per kg than wood/quick-light; is the premium worth it?"). On a transactional page this is Hardening, but a 1-paragraph honest counter + data-grounded response would convert better and feed AEO. | Add a short, honest "When is coconut coal NOT the cheapest choice?" beat (or fold into the Compare section) with the per-session cost framing already implied in `pricingNote`. Minor-page priority. |
| **H3** | Hardening | Pass 2 — quantified evidence / specs gaps | `GradePage.astro` spec table (`specRows`) | Several spec rows render "Pending QC publication": Burn time (active session), Volatile matter, Moisture (after oven), Density, Pieces-per-box weight. These are honestly gated (correct, not a Blocker), but the count of pending rows on the flagship spec table is high enough to weaken the "specification-heavy" value prop. | Track to the operations director for QC publication of volatile matter, density, after-oven moisture, and active-session burn time. Data-entry task, not a content fix; no fabrication. |
| **H4** | Hardening | Pass 2 — anti-bloat / title length (content-template, not tag mechanics) | `productGrade.json` → `meta.titleTemplate` = "{{grade}} {{size}} {{shape}} Coconut Shisha Charcoal"; BaseLayout appends " \| {{brand}}" | Rendered `<title>` (e.g. "Platinum 25×25 mm Cube Coconut Shisha Charcoal \| Mulia Charcoal") exceeds the CLAUDE.md 60-char title budget once the brand suffix is added. (Tag length is largely a DrMax/technical concern and is flagged here only as the content-template choice that drives it.) | Consider trimming the template (e.g. drop "Shisha" or "Coconut" for longer shape/size combos) so grade titles stay near 60 chars with the brand suffix. Low priority; verify against the technical-SEO owner before changing. |
| **H5** | Hardening | Pass 2 — mini-cases on a high-intent page | `GradePage.astro` (whole page) | No Problem → Action → Result mini-case (e.g. "A UK distributor switched from quick-light to Platinum and cut ash complaints by X%"). Not required on a minor page, but one credible mini-case per grade would strengthen conversion + citation. | Optional: add one anonymized buyer outcome per grade tier when a real, attributable result exists. Do NOT fabricate — gate on a real case. |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| MOQ "18 tons", "full containers only", "{moqTons} tons per 20ft container" | Correct | — | `commercial.moq.tons = 18` | company.ts / company.json |
| FOB Semarang; "FOB {{port}}" | Correct | — | `commercial.portOfLoading` resolves to Semarang | company.ts |
| Indicative FOB band (Premium from $1,450/ton; SP $1,550; Platinum $1,650) | Correct (config-backed) | Low | Values now populated in `grades.ts` `fobRange`; rendered as "from … USD/ton" + `AggregateOffer`. Marked "indicative, subject to written confirmation" — honest framing intact. | grades.ts |
| Grade specs — ash (1.6–2.0% / 2.0–2.5% / 2.5–2.8%), fixed carbon (≥82/≥80/≥75%), burn temp (680/650/600 °C), calorific (≥7500/7300/7000 kcal/kg), drop test 3+ | Correct (self-attributed factory targets) | Low | From `grades.ts`; caption explicitly frames them as "factory targets … confirmed on each batch" via independent COA. Consistent across the 3 sampled pages. | grades.ts |
| "We burned a single briquette … and recorded surface temperature, remaining weight … so you can read the performance as data" | **Error (over-claim)** | High | No burn-test data exists (`grade.burnTest` unset → all cells pending). See **B1**. Prose asserts recorded data the page does not hold. | grades.ts (absent) |
| "The two clips below show the test" (drop test) | **Error (over-claim)** | Medium | `dropTestVideos` unset → both clips are "coming soon" placeholders. See **B2**. | grades.ts (absent) |
| "an independent per-batch certificate of analysis (COA) issued by {{auditors}} ships with every order" | Correct | — | `certifications.iso9001.auditors = ["Carsurin","Beckjorindo"]`; COA PDF is a real `legalDocuments` link. | company.json |
| "surveyed by {{auditors}}" (loading / self-heating compliance) | Correct | — | Same auditors fact. | company.json |
| HS code "4402.20 — coconut shell charcoal" | Correct | Low | `commercial.hsCode = "4402.20"` — matches the project's locked HS classification decision (per MEMORY logistics build). Page correctly tells buyer to confirm exact tariff line with broker. | company.json + logistics-import-research-findings.md |
| "Coconut shell charcoal ships as a regulated dangerous good: {{imdgLabel}}" / UN 1361 | Correct | Low | `certifications.imdg.unNumber = "UN 1361"`. Regulatory currency = canonical FAQ home is `/logistics/un-1361` (page links there, correct). | company.json |
| Transit times (Jeddah 25–35d, Felixstowe 30–42d, Hamburg 32–45d, LA 25–32d, …) | Correct (config-backed) | Low | `commercial.transitTimes`; rendered table. Treat as indicative ranges. | company.json |
| Volume-discount tiers (18–54t list price; 54–108t 2.5% off; 108t+ 3% off) | Correct (config-backed) | Low | `commercial.volumeDiscountTiers`; "indicative, subject to written confirmation" disclaimer present. | company.json |
| "Conducted under the supervision of Ahmet Bassam, Charcoal Expert / Consultant" | Correct | — | `governance.reviewer`; same person feeds the reviewer `Person` schema node. | company.json |
| Trust stats: "{{years}}+ years exporting", "{{countriesExportedCount}} countries served", "{{moqTons}} tons per 20ft container" | Correct | — | All token-bound to config; no star rating shown (honest — page states no verified public reviews collected). | company.json |
| "production lead time is {{leadTimeLabel}}"; "repeat-brand lead time is {{repeatBrandLeadTime}} days"; "monthly capacity is {{capacityMonth}} tons" | Correct | Low | `commercial.leadTime`, `production.capacityTonsPerMonth = 350`. | company.json |
| "Place the briquette on an electric coil … for 4–6 minutes … no accelerant to taste" (how-to-light) | Unverified (general product fact) | Low | Standard coconut-shell-coal lighting guidance; not a company-specific claim. Plausible and consistent with material; low reputational risk. | model |
| Platinum micro-insight: "bright white [ash] usually means a limestone or starch filler flashing off — natural coconut-shell ash stays pale grey" | Unverified (industry assertion) | Medium | Defensible industry claim but stated as fact; worth one external citation given it is used as a differentiator. | model — route to deep research |
| "the denser shell selection behind this grade raises both [heat and duration] at once" / "Heat and duration only trade off when density is fixed" (SP micro-insight) | Unverified (causal claim) | Low | Physically plausible framing; presented as a general principle, not a measured result. Low risk but uncited. | model |

---

## 4. Requires deep research

| Claim | Why it needs external verification | Relevant markets |
|---|---|---|
| "Bright-white ash indicates limestone/starch filler; natural coconut-shell ash is pale grey" (Platinum `microInsight`, used as a buyer differentiator across all Platinum SKUs) | Stated as fact and used to discredit competitor "white ash"; needs a citable source (ash-composition / filler literature) before it carries reputational/AEO weight at scale. | USA, Germany, GCC, UK |
| Burn-test performance series (temp/weight/size curves, 0–90 min) for each grade | **B1** depends on this: the page asserts recorded burn data that does not exist. This is a *data-acquisition* task for QC/ops, not web research — the measured series must come from a real controlled burn test signed off by the reviewer, then entered in `grades.ts`. | All |
| Drop-test video evidence per grade | **B2** depends on this: real clips must be produced and their IDs entered in `grades.ts` `dropTestVideos`. Production task, not web research. | All |
| HS 4402.20 destination-duty specifics (referenced generically here, detailed on import pages) | Page correctly defers to broker; no per-country duty asserted on the SKU page, so no new research triggered by THIS page — confirm import-page coverage stays the canonical home. | USA, UK, Germany, Saudi Arabia, Russia |

---

## 5. E-E-A-T / HCU assessment

| Criterion | Score /10 | One-line justification |
|---|---|---|
| Authorship & expertise | 7 | Author + reviewer are real config facts and emit as `Person` schema; reviewer named in burn-test conditions. Weakened by no *visible* page-level byline (H1). |
| Topical authority | 8 | Deep, specification-led coverage (18-row spec table, logistics, DG, packaging, ordering, guarantee) tightly scoped to one SKU. |
| Technical health & freshness | 8 | Honesty-gating, `MaybeLink` degradation, clean schema graph, `dateModified` from `governance.lastReviewed` (2026-04-25). (CWV/Lighthouse per CLAUDE.md budgets — owned by the technical series, not re-measured here.) |
| Effort | 8 | Substantial bespoke per-grade prose + structured tables; far above a templated stub. Capped by per-shape prose reuse (D1). |
| Originality | 5 | Grade prose is genuinely original but identical across 19 sizes per grade; only 3 distinct bodies across 57 pages, no shape-axis differentiation (D1). |
| Citation quality | 6 | Internal evidence well-linked (COA/ISO PDFs real, certifications cluster, raw-materials); external industry claims (ash/filler) uncited. |
| Freshness / timeliness | 7 | `dateModified` tied to a real review date; regulatory references (UN 1361, HS 4402.20) current and deferred to canonical homes. |
| Page intent | 9 | Crystal-clear transactional intent (sample / quote / inquiry), CTAs consistent and repeated, prefills the form with the SKU. |
| Structure & readability | 8 | Logical H1→H2→H3 outline, single H1, static anchored sections, no JS-hidden content, extractable `DataTable`s. Dinged by noun-label H2s (D2). |
| Mobile | 8 | Mobile-first grid utilities, 44px touch targets via shared `Button`, sticky WhatsApp sitewide (per CLAUDE.md budgets; not re-measured). |
| Format-standard adherence | 8 | Matches the site's product-page contract; correct schema types, no misplaced FAQPage, breadcrumb present. |
| Trust & spam signals | 8 | No fabricated reviews, no star rating without data, honest "pending"/"coming soon" placeholders, no hardcoded company facts. Slightly undercut by B1/B2 over-claims. |

**PQ (arithmetic mean of 12):** (7+8+8+8+5+6+7+9+8+8+8+8) / 12 = **90 / 120 = 7.5 / 10**

**Verdict:** **Helpful-first.** The page is built to serve a wholesale buyer's evaluate-then-inquire journey, not to farm search traffic — specification-dense, honest about what is and isn't yet published, and conversion-focused. goodClicks/badClicks prognosis is favorable: a buyer who lands here gets the specs, logistics, and a quote path without dark patterns. The two over-claims (B1/B2) are the main "search-first" smell — past-tense evidence framing around data that doesn't exist yet — and fixing them removes the only credibility risk.

**Lowest-3 action steps:**
1. **Originality (5) — D1:** Add a shape-axis paragraph so each shape×grade page carries ≥1 shape-distinct application note (Flat→kaloud/foil, Finger→HMD, Dome→bowl seating), drawn from existing `shape.description`. This is the single biggest lever across 57 pages.
2. **Citation quality (6) — deep research:** Source and cite the ash-composition / filler claim used in the Platinum differentiator; add the external reference (or soften to a clearly-attributed industry observation).
3. **Authorship visibility (7) — H1:** Surface a compact visible "Reviewed by {reviewer}, {role} · Last updated {date}" byline (config-sourced) to make the E-E-A-T signal extractable, not schema-only.

---

*End of report. No files were modified, created, or deleted other than this report. No git/npm/build commands were run.*
