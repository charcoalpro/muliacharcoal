# Content Audit — Homepage `/` (supporting pillar, CORNERSTONE)

**Run date:** 2026-06-23
**Mode:** Diagnose-only. No fixes applied. Passes 0,1,2,3,5 (Pass 6 OFF).
**Auditor scope:** content layer only. Technical mechanics (canonical syntax, hreflang, JSON-LD validity, robots, sitemap, headers, CWV/Lighthouse) are OUT OF SCOPE and not reported. Schema TYPE & PLACEMENT is in scope.

---

## 1. Manifest

| Item | Value |
|---|---|
| Route | `/` |
| Pillar | supporting (root) — also the top-of-funnel hub linking down to every pillar |
| Cornerstone | YES |
| Source file | `src/pages/index.astro` |
| Layout | `src/layouts/BaseLayout.astro` |
| Block components | `home/blocks/HomeHero.astro`, `TrustStrip.astro`, `Products.astro`, `Specifications.astro`, `About.astro`, `OemPackaging.astro`, `Gallery.astro`, `MarketsServed.astro`, `Contact.astro`, `HomeFinalCta.astro`; `content/FAQSection.astro` |
| i18n source | `src/i18n/en/home.json` (via `~/i18n/en`) |
| Data SSoT | `src/data/company.json` → surfaced through `src/config/company.ts` (`company.*`) |
| company.ts fields consumed | `brand`, `legalName`, `email`, `phone`, `whatsapp.e164Digits`, `address.*`, `foundingYear`, `production.{lines,headcount,factoryAreaSqm}`, `commercial.{paymentTerms,salesLanguages,shippingLines,countriesExportedCount,containerCapacity,leadTime}`, `certifications.{iso9001.auditors,imdg,specsLastVerified}`, `governance.{author,reviewer,factChecker}`, `legalDocuments[]`, `factoryTourVideo`, `logistics.imports` (via `importCountryLinks()`), `packaging.configurations`, `grades` (via `grades.ts`) |
| Schema types emitted (verified in `dist/index.html`) | Organization, WebSite, LocalBusiness, ItemList, Product ×9 (6 shapes + 3 grades), BreadcrumbList, VideoObject, ImageObject. **No FAQPage** — correct (FAQPage emits only at `/faq`). |
| Build artifact read | `dist/index.html` (1 H1, 16 H2, 1 `ld+json` block) |

**Pass 0 stop conditions:** none triggered. Page resolves to a single route; build artifact present.

**Honesty-gating posture observed (correct, NOT flagged):**
- VideoObject schema + factory-tour embed render because `company.factoryTourVideo` has a real YouTube ID and `uploadDate`/`durationISO` (company.json ~L1078–1081). Correct.
- `countriesExportedCount: 35` is set, so the "35+ countries exported" badge renders rather than the worldwide fallback. Correct.
- `factoryAreaSqm` is present → About uses `introWithFacility`. Correct.
- Gallery ImageGallery schema gated on `hasGalleryAssets`; absence when assets absent is intended.
- All governance names present and gated via `hasFact()`. Correct.

---

## 2. Severity-tiered TODO list

### Tier 1 — BLOCKERS

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| B1 | Blocker | Pass 1 — honesty-gating (rendered claim with no backing fact) | `TrustStrip.astro` L59–77; copy in `home.json` `trustStrip.items.reach` (label "REACH compliant", definition "we declare REACH compliance for all coconut-shell binders and starches") | The "REACH compliant" trust badge renders **unconditionally** from i18n. There is **no REACH fact** anywhere in `company.json` (`certifications` holds iso9001, imdg, other[SHT/COO/trademark/Halal], patents, halal — no `reach` key; `commercial` has no `reachCompliant` flag). A first-screen trust assertion with no backing company fact is exactly the honesty-gating violation the methodology rates at banking-details severity. | Add a real `certifications.reach` fact (status + scope + provenance) to `company.json`, then gate the badge on `hasFact(company.certifications.reach)` so it omits when the fact is absent — same pattern as the countries badge. Do NOT write the regulatory claim into the repo here; route to a human (see Requires-deep-research R1). Until backed, the badge should not render. |
| B2 | Blocker | Pass 1 — hardcoded company fact in i18n (+ honesty-gating contradiction) | `home.json` `faq.items[1].a` (L342): "…from receipt of the **30% T/T deposit**." | The deposit percentage is a commercial fact. It is hardcoded as a literal in i18n **and contradicts** the SSoT: `company.commercial.paymentTerms` = "50% T/T advance, 50% T/T 3 days before loading" (company.json L116). The About data-table and About-FAQ payment row both use `{{paymentTerms}}` correctly, so the page states two different deposit figures. | Remove the literal "30% T/T deposit"; derive the deposit from `company.commercial.paymentTerms` (or a dedicated `depositPercent` fact added to company.json) and interpolate via token. Reconcile to the single SSoT value. Human must confirm the correct deposit %. |
| B3 | Blocker | Pass 1 — hardcoded company fact in i18n (shipping-line names are facts with an existing token) | `home.json` `trustStrip.items.shipping.definition` (L39) and `faq.items[2].a` (L346): literal "Maersk, MSC and CMA CGM" | The shipping-line set is a company fact: `company.commercial.shippingLines` (company.json L118) with a ready `{{shippingLines}}` token (interpolate.ts L140). The TrustStrip *label* correctly uses the token, but these two prose strings hardcode the fact values — drift-prone and against "i18n may contain prose around facts, never the fact values." | Replace the literal carrier list with `{{shippingLines}}` in both strings (note the token joins with " · "; if " , … and " phrasing is required, add a formatted token rather than a literal). |

### Tier 2 — DEFECTS

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 1 / Pass 2 — cornerstone GEO meta table missing | top of page (no block before/at `HomeHero`); governance triple lives mid-page in `About.astro` L113–135 | Cornerstone rule requires a **top-of-page** meta table: Author / Reviewed by / Fact-checked / Last updated / Read time. The page has an Author/Reviewer/Fact-checker "Page authorship" block, but (a) it is mid-page (≈section 5 of 11), not top-of-page, and (b) it omits **Last updated** and **Read time**. No `home.editorial` date or read-time fact exists in company.json. | Add a top-of-page meta strip (or move/extend the governance block above the fold) carrying all five fields. Add `home.editorial.{datePublished,dateModified}` + a read-time value to company.json to back "Last updated" and "Read time". |
| D2 | Defect | Pass 2 — Devil's Advocate / steelman missing on cornerstone | whole page (grep confirms no steelman/counterargument/objection section in `dist/index.html`) | A cornerstone page must include a steelman of the strongest industry counterargument (e.g. "why some buyers prefer a trading house / a closer-origin or cheaper bamboo supplier"), when it holds, and a data-grounded rebuttal. None exists. | Add one short steelman section after the proof sections (Specs/About) stating the strongest "don't buy direct from an Indonesian factory" objection and a numeric rebuttal (lead time, MOQ economics, COA/lab backing). |
| D3 | Defect | Pass 2 — Problem→Action→Result mini-cases missing on cornerstone | whole page (grep confirms no case/problem/action/result structure) | Cornerstone requires 1–2 Problem→Action→Result mini-cases with a measurable result. None present. | Add 1–2 compact P-A-R cases (e.g. "buyer needed private-label retail SKU in N weeks → we did X → result: container shipped, Y days"). Use only measurable facts that exist in company.ts or are human-verified; do not fabricate buyer names. |
| D4 | Defect | Pass 2 — featured-snippet lead / headings-as-questions | H2s in `dist/index.html`: "Six coconut-shell shapes…", "Three quality grades…", "OEM and private-label packaging…", "Importing coconut charcoal to your market.", "Inside our Semarang factory…" | Most section H2s are statement-form, not the question a buyer asks, and several sections open with framing copy rather than a 1–2 sentence self-contained answer. Weakens snippet/AI extraction on a cornerstone. | For the key sections (products, specs, OEM, markets) add a question-form H2 or sub-question and a direct one-sentence answer immediately under it (the specs intro is close; products/OEM/markets bury the direct answer). |
| D5 | Defect | Pass 1/SEO content — title length over budget | rendered `<title>` = "Mulia Charcoal — Coconut Shisha Charcoal Factory in Semarang, Indonesia" (73 chars); template `home.json` `meta.titleTemplate` | CLAUDE.md SEO: unique title **under 60 characters**, keyword-front-loaded. Rendered title is 73 chars and will truncate in SERP. | Shorten the title template (e.g. drop ", Indonesia" or "Factory in") to land ≤60 chars while keeping "Coconut Shisha Charcoal" front-loaded. |
| D6 | Defect | Pass 1/SEO content — meta description length over budget | rendered `<meta name="description">` (226 chars); template `home.json` `meta.descriptionTemplate` | CLAUDE.md SEO: description **under 160 characters**. Rendered description is 226 chars and will truncate. | Trim the description template to ≤160 chars; keep MOQ + UN 1361 + samples/WhatsApp hook, drop the ISO clause or lead-time clause. |

### Tier 3 — HARDENING

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 1 — auditor names duplicated as literal alt text | `TrustStrip.astro` L89–90 `alt="Carsurin"`, `alt="Beckjorindo"` | Auditor identities are company facts (`certifications.iso9001.auditors`) and already drive the adjacent label via the array. The logo `alt` strings re-type the same fact values as literals — drift risk if the auditor set changes. (Borderline: image-identification alt, hence Hardening not Blocker.) | Derive each logo's `alt` from `company.certifications.iso9001.auditors` so the alt text and label share one source. |
| H2 | Hardening | Pass 2 — anti-bloat / thesis restatement | Hero sub (`home.json` hero.sub), Specs intro, About intro all restate "MOQ 18 t / 20-ft FCL", "ISO 9001 + UN 1361", "capacity/month" | The MOQ + ISO + UN 1361 + capacity quartet is restated near-verbatim across Hero, TrustBadges, Specs intro and About intro. Compressible without losing facts. | Keep the full quartet once (Hero + TrustBadges); in Specs/About intros reference rather than re-list, freeing words for the missing steelman/mini-case content. |
| H3 | Hardening | Pass 2 — quantified evidence on a benefit claim | `home.json` products.items.cube.description "uniform edges and no first-light cracking"; stix "Long burn at low surface temperature" | Several product benefit claims are qualitative ("no cracking", "long burn", "low temperature") with no number, while the page elsewhere has exact burn-time/temp data per grade. | Attach a number where one exists (e.g. burn-time/temp range from grades.ts) or soften to a verifiable statement; avoid unquantified superlatives on a cornerstone. |
| H4 | Hardening | Pass 1 — regulatory currency annotation | TrustStrip REACH definition; Specs "Last verified" stamp is present (`specsLastVerified` 2026-04-25) but the REACH claim carries no review date | If B1 is resolved by adding a backed REACH fact, that fact must carry a visible review date tied to a real regulatory event (EU REACH OR / registration), not a cosmetic stamp. | When adding the REACH fact, include `lastVerified` tied to the registration/OR event and surface it near the badge. |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "REACH compliant" (TrustStrip badge + definition) | **Unverified** | High | No backing fact in company.ts; self-declaration unverified. See B1 / R1. | model (no company.ts fact) |
| Lead-time FAQ: "from receipt of the **30% T/T deposit**" | **Error** | High | Contradicts `commercial.paymentTerms` = "50% T/T advance…". See B2. | company.ts (contradiction) |
| "Maersk, MSC and CMA CGM out of [port]" (shipping definition + FAQ) | Correct (value) | Medium | Matches `commercial.shippingLines`, but hardcoded as literal — see B3. | company.ts `commercial.shippingLines` |
| "Audited by Carsurin & Beckjorindo … issue the COA we ship with every container" | Correct | Low | Matches `certifications.iso9001.auditors`. COA-per-shipment is the per-order-report side; distinct from held certs. Kept distinct — OK. | company.ts |
| "ISO 9001:2015 certified" (hero badge, meta) | Correct | Low | Matches `certifications.iso9001.standard`. | company.ts |
| "IMDG UN 1361 compliant, Class 4.2, Self-Heating Test report with every booking" | Correct | Low | Matches `certifications.imdg` (UN 1361 / 4.2). SHT shipped per booking = per-order report; distinct from held cert. | company.ts |
| "MOQ 18 tons (one 20-ft container)" | Correct | Low | Matches `moqLabel()` / container capacity facts. | company.ts |
| "2015-founded Semarang factory", legal name "PT Coco Reina Global Charcoal Indonesia", NIB/NPWP, capacity/month | Correct | Low | All tokenized from company.ts; no literals in components. | company.ts |
| "35+ countries exported" | Correct | Low | `commercial.countriesExportedCount = 35`. | company.ts |
| Lead time "14–21 days" / "21 new brand · 14 repeat" | Correct | Low | Matches `commercial.leadTime`. | company.ts |
| Halal / trademark / COO / patent (not surfaced on home, in `certifications.other`) | n/a | — | Honesty-gated omission — correct, not flagged. | company.ts |

---

## 4. Requires deep research (route to companion prompt)

| ID | Claim | Why | Markets |
|---|---|---|---|
| R1 | "REACH compliant" — does the factory hold a valid basis (EU REACH Only Representative + Letter of Access, or own registration) to assert REACH compliance to buyers? | No company.ts fact backs the badge (B1). company.json logistics notes (EU REACH + CLP) say an EU importer needs OR coverage or its own registration; whether **this** factory's tapioca-bound coconut-shell composition is covered, and under which substance identity (EC 240-383-3 vs 271-974-4), is unverified. Needed before the badge can be honesty-gated on a real fact. | Germany, UK (UK REACH separately), EU/CIS |
| R2 | Correct deposit percentage for the lead-time/booking term (30% vs 50%) | B2 is an internal contradiction; the true commercial term must be confirmed by the company before reconciling to company.ts. | all |

---

## 5. E-E-A-T / HCU assessment

| Criterion | Score /10 | Justification |
|---|---|---|
| Authorship & expertise | 7 | Named Author/Reviewer/Fact-checker with roles + review dates, all from company.ts. Loses points: block is mid-page not top, no "last updated"/read-time (D1). |
| Topical authority | 8 | Covers products, grades w/ measured specs, factory facts, OEM, logistics, markets, FAQ — strong hub. |
| Technical health & freshness | 7 | Schema type/placement correct (no FAQPage on home; full Org/WebSite/LocalBusiness/Product/Breadcrumb/Video). Freshness weak: no home editorial date; per CLAUDE.md budgets, title/desc over length (D5/D6). (CWV/Lighthouse not re-measured — DrMax owns.) |
| Effort | 8 | Eleven purpose-built blocks, gated trust signals, per-grade spec ladder. High effort. |
| Originality | 7 | Real factory facts and own grade ladder; product blurbs lean generic (H3). |
| Citation quality | 6 | Specs carry a "Last verified" stamp + COA link; REACH badge has no provenance (B1/H4). |
| Freshness / timeliness | 5 | No `home.editorial` date; no "last updated"; governance dates (2026-04-25) are the only signal and are not surfaced as page freshness. |
| Page intent | 9 | Crisp B2B intent: container-scale buyers, WhatsApp/sample conversion, clear CTAs. |
| Structure & readability | 8 | One H1, logical H2 outline, native `<details>` FAQ (not JS-hidden) — GEO-safe. Headings statement-form (D4). |
| Mobile | 8 | Scroll-snap strips, 44px targets, stacked CTAs at 360px (per component comments; not re-measured). |
| Format-standard adherence (cornerstone) | 4 | Missing top meta table (D1), Devil's Advocate (D2), and P→A→R mini-cases (D3) — three of the four cornerstone formats absent. FAQ form present. |
| Trust & spam signals | 5 | Strong gated trust signals overall, but an ungated "REACH compliant" claim (B1) and a contradictory deposit figure (B2) are real trust hits. |

**PQ (arithmetic mean of 12) = 6.83 / 10.**

**Verdict:** Helpful-first. The page is built to serve the buyer (concrete specs, gated facts, multiple low-friction conversion paths), not to game search. Predominantly goodClicks. But two trust defects (ungated REACH, 30%/50% deposit contradiction) and the missing cornerstone formats cap it below where a cornerstone homepage should sit.

**Lowest-3 action steps:**
1. **Format-standard adherence (4):** add the three missing cornerstone formats — a top-of-page meta table (Author/Reviewed/Fact-checked/Last updated/Read time), one Devil's-Advocate steelman, and 1–2 Problem→Action→Result mini-cases (D1–D3).
2. **Citation quality / Freshness (6/5):** resolve the ungated REACH claim (back it with a company.ts fact + dated provenance, or omit) and add `home.editorial` dates so the page exposes a real "last updated" (B1, H4, D1).
3. **Trust & spam (5):** fix the 30%/50% deposit contradiction by deriving the deposit from the single company.ts payment-terms fact (B2), and de-duplicate the carrier list to the `{{shippingLines}}` token (B3).
