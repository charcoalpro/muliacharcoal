# Content Audit — `/packaging/plastic`

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report; no fixes). Cornerstone: **no** (minor cluster page).
**Passes executed:** 0, 1, 2, 3, 5. Pass 6 OFF.

---

## 1. Manifest (Pass 0)

| Field | Value |
|---|---|
| **Route** | `/packaging/plastic` |
| **Source file** | `src/pages/packaging/plastic.astro` |
| **Layout** | `BaseLayout.astro` (`type="website"`, `includeOrgSchema={false}`, `prefetch=['/packaging','/contact']`) |
| **Content source** | `src/i18n/en/packagingPlastic.json` (page strings) + `src/i18n/en/packaging.json` (`metaBlock`, `shared`) |
| **Components** | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `MaybeLink`, `TextLink`, `FAQSection`, `CTABanner`, `KeyFactsBox`, `PhotoGrid`, `VideoFacade` |
| **Schema builders** | `packagingClusterPageSchema` (lib/schema/packagingClusterPage), `videoObjectSchema` |
| **`company.ts` fields consumed** | `packaging.primaryPlastic.*` (material `''`, thicknessMicrons `null`, sealType `''`, clearOrPrinted `both`, weightOptionsG `[250,500,1000]`, holdsExample `''`, function `moisture and dust barrier`, foilBarrier `null`); `packaging.pricing.{currency,priceBasis,plasticPrintingPerKgUsd}` (price `''`, basis `''`); `packaging.editorial.dateModified` (`2026-06-11`); `packaging.media.videos[id==plastic]` (`youtubeId` `''` → omitted); `governance.author/reviewer/factChecker.{name,role}` (via ArticleMeta + schema author); `whatsapp.presetMessages.oemLayout` + `waLinkFor('oemLayout')`; `portOfLoadingLabel()` (priceBasis fallback); reference SKU `products.ts` cube-25mm `pcsPerKg` (96, holds fallback). |
| **Pillar** | packaging (hub `/packaging`) |
| **Schema types emitted (built HTML)** | `WebPage`, `FAQPage` (6 Q/A, `@id …/plastic#faq`), `DefinedTerm` (`#inner-plastic`, name "primary packaging", alt "inner plastic"/"poly bag"), `BreadcrumbList` (3 ListItem, from `<Breadcrumbs>`), `Person` (author). **No** `VideoObject` (video unpopulated → gracefully omitted), **no** `Product`/`Offer`/`Service` (correct — cluster template forbids them). |
| **Build status** | Built HTML present at `dist/packaging/plastic/index.html` (read-only; build already done, not re-run). |

**Place in cocoon:** packaging cluster sibling of master-box / inner-box / additional-packaging / white-label. Up-link `/packaging` present in the hero (`data-source-component="plastic-up-link"`, "Part of the shisha charcoal packaging system") plus breadcrumb and a Related-section pillar link. Hub down-links to it (`src/pages/packaging/index.astro` line 75). All 11 Related targets + all inline cross-links resolve in `LIVE_ROUTES` (zero `border-dashed`/muted links rendered). Not an orphan.

---

## 2. Severity-tiered TODO list

### Blockers — 0

None. No hardcoded company fact (names/roles/dates come from `governance.*`/`packaging.editorial`; pack sizes derive from `primaryPlastic.weightOptionsG`; the holds figure derives from the cube-25mm reference SKU `pcsPerKg`); no claim rendered without a backing fact; no honesty-gating violation; no real orphan; no broken pillar link; no build failure; no factually-wrong regulatory claim. Held-cert vs per-order-report distinction is not engaged on this page (no certification block) — nothing to violate.

### Defects — 0

None. Required schema types for a packaging cluster page (WebPage + DefinedTerm + page-specific FAQPage + BreadcrumbList) are present and correctly placed; no factual **Error** surfaced in Pass 3 (the transit-duration softness is registered as a claim, not an Error — see §3 and §4); no missing-schema or broken-structure failure. Single H1, clean non-skipping H2 outline. Minor page → meta-table and Devil's-Advocate absence are Hardening, not Defect, per scope (and the meta table is in fact present).

### Hardening

| ID | tier | pass+rule | exact location | what's wrong | recommended fix (described) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 1 — i18n integrity (latent) | `src/pages/packaging/plastic.astro` lines 263–272, foil-barrier `<section>` | The foil/metallized-barrier section's H2 ("Foil / metallized barrier") and body sentence are **hardcoded English literals in the .astro**, not routed through the i18n layer. It renders only when `primaryPlastic.foilBarrier === true`; the fact is currently `null`, so it does **not** render today — this is a dormant violation, not a live one. | Move the foil heading + prose into `packagingPlastic.json` (e.g. `t.foil.h2` / `t.foil.p1`) and `fill()` them, matching every other section. Until then it would ship untranslated and bypass i18n the moment `foilBarrier` is flipped on. |
| H2 | Hardening | Pass 1 — i18n integrity (rendered literals) | `plastic.astro` lines 43–47 (`holdsRefExample` fallbacks) and lines 66–71 (`clearOrPrinted === 'both'` → `'Clear or printed'`) | User-visible English strings are composed in the `.astro` frontmatter rather than i18n: the holds fallbacks ("a 1 kg pack of 25 mm cubes holds about N cubes", "each pack holds its labelled net weight of sealed charcoal") and the literal `'Clear or printed'` for the `both` case. These **do render** (the holds fallback is live now because `holdsExample` is empty). | Lift these literals into `packagingPlastic.json` as templates and `fill()` them, so all rendered copy is translatable. Low risk; cosmetic-to-i18n consistency. |
| H3 | Hardening | Pass 2 — headings as questions | `definition.h2` "Definition & role in the packaging hierarchy", `material.h2` "Material, thickness & seal", `sizes.h2` "Sizes & what it holds", `barrier.h2` "Barrier performance & protection", `branding.h2` "Branding on the plastic", `neutralVsBranded.h2` "Neutral vs branded" | Section H2s are statement-form, not the question a buyer types. Snippet/voice capture for the non-FAQ body is weaker than it could be. The FAQ block already carries question-form coverage, so this is incremental. | Mirror each H2 to a question in i18n (e.g. "What is primary packaging?", "What material and thickness is the inner plastic?", "How much charcoal does each pack hold?", "How does the plastic protect against moisture?", "Can the plastic be printed with my brand?"), keeping the existing first sentence as the self-contained answer. |
| H4 | Hardening | Pass 2 — Devil's Advocate (minor page) | Whole page | No steelman/counter-argument section (e.g. "When is a foil/heavy-gauge film overkill — when does standard sealed film already suffice, and what does over-speccing the barrier cost?"). Optional on a minor page. | Optionally add one short "When you don't need a heavier barrier" paragraph after the Barrier section, naming the routes/seasons where standard sealed film is sufficient and desiccant is the cheaper lever. Raises trust + extractability; not required for a minor page. |
| H5 | Hardening | Pass 1 — schema FAQPage placement (cross-rule tension; FLAG, not fix) | Built HTML JSON-LD `FAQPage` (6 Q/A) at `…/packaging/plastic#faq`; emitter `lib/schema/packagingClusterPage.ts` lines 65–68 | The generic audit rule "FAQPage emits ONLY at `/faq`" conflicts with the **locked packaging-cluster template** (master-box v2 §4 [C1]; see `packagingClusterPage.ts` header), which deliberately emits one page-specific FAQPage per cluster page. The de-dup guard is honored: container-count and custom-print-cost questions are **not** schema'd here — they are link-only ("Container counts and custom-print costs are answered on the packaging hub FAQ", `faq.moreLine` → `/packaging#packaging-faq`). The six Qs here are page-specific (what is it / material / clear-or-printed / holds / moisture / neutral-vs-branded). This is a site-wide architecture decision, not a misplacement on this page. | **Do not change on this page in isolation.** Surface to a human as policy reconciliation: either document a carve-out in the audit rule for the packaging cluster template, or revisit the template site-wide. The canonical-FAQ-home rule (SHT→un-1361, COA→certifications, MSDS→documents) is not breached — none of those Q/As appear here. |
| H6 | Hardening | Pass 1 — freshness cadence / consistency | ArticleMeta "Last updated" → `packaging.editorial.dateModified` = `2026-06-11` | The page's last-updated stamp (2026-06-11) is the oldest in the packaging cluster (master-box editorial 2026-06-19; today 2026-06-24) and predates `commercial.transitTimesLastUpdated` (2026-06-22), which is relevant to the barrier/transit copy. Not wrong, but stale relative to siblings and to the transit data the page leans on. | On the next genuine content touch (e.g. when the transit-duration phrasing is reconciled per D-research below), bump `packaging.editorial.dateModified`. Do not cosmetically bump without a real edit. |
| H7 | Hardening | Pass 2 — quantified evidence / config-derivation miss | `heroSubtitle`, `barrier.p1`, `faq` item "How does the inner plastic protect…" — all say "four to eight weeks of sea transit" | The transit window is hardcoded prose while the site already holds structured per-port transit data (`commercial.transitTimes`, 12 ports, `transitTimesLastUpdated: 2026-06-22`). The hardcoded "4–8 weeks" (28–56 days) understates the configured max (St Petersburg 60 days ≈ 8.5 weeks) and the configured min (Vladivostok 18 days ≈ 2.5 weeks). | Either (a) derive the range from `commercial.transitTimes` so the figure self-updates and stays consistent with the import pages, or (b) widen the hardcoded phrasing to match the configured envelope (~3–9 weeks). See §4 — the underlying claim also needs an external sanity check. |
| H8 | Hardening | Pass 2 — anti-bloat / restatement | `definition.p1`+`definition.p2`, `barrier.p1`, and FAQ #1/#5 | The "box presents, plastic protects" thesis and the moisture-barrier framing are each restated three+ times (hero subtitle, definition p1+p2, barrier p1, FAQ #1, FAQ #5). Mild reinforcement is fine for GEO, but the definition p2 ("That is why the inner box defers protection to this layer…") largely repeats p1. | Trim `definition.p2` to a forward pointer or fold its unique half-idea ("spend on the box for shelf appeal, rely on the plastic for the barrier") into p1; ~15–20% compressible without fact loss. Keep one authoritative barrier statement (the Barrier section). |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "Pack sizes are 250 g / 500 g / 1 kg net charcoal." | Correct | Low | Renders verbatim from `packaging.primaryPlastic.weightOptionsG = [250,500,1000]` via the `innerPlasticSizes` token (`lib/interpolate.ts` line 174). Backed by config. | company.ts (`src/data/company.json` line 428) |
| "a 1 kg pack of 25 mm cubes holds about 96 cubes." | Correct | Low | Derived (not asserted) from the cube-25mm reference SKU `pcsPerKg = 96` in `products.ts`, used as the fallback because `primaryPlastic.holdsExample` is empty. Hedged ("about", "exact counts vary by cube size and shape"). | company.ts/products.ts (`pcsPerKg: 96`) |
| "The inner plastic is the primary packaging — the moisture and dust barrier of the whole system." | Correct | Low | `function: "moisture and dust barrier"` is config-backed; the definition-form framing is internally consistent and matches the glossary DefinedTerm (`#inner-plastic`). | company.ts (`primaryPlastic.function`) + page self-consistency |
| "A heat-sealed film pack … material, film gauge (thickness in microns), and seal type are specified per order; the exact spec is confirmed with the quote." | Correct | Low | Honesty-gated: `material`/`thicknessMicrons`/`sealType` are all empty in config, so the page renders the capability-only phrasing and correctly **suppresses** the `specLineTemplate` ("Current spec: …") and the at-a-glance Material/Thickness/Seal rows. No fabricated spec. | company.ts (`primaryPlastic` empties) + honesty-gating verified in built HTML |
| "Printed plastic is a white-label / custom-print add-on, quoted on inquiry." (no printed price shown) | Correct | Low | `pricing.plasticPrintingPerKgUsd` is empty → the `branding.priceLineTemplate` ("Plastic printing: …") is suppressed and the page degrades to "quoted on inquiry". Held-vs-quoted economics intact. | company.ts (`pricing.plasticPrintingPerKgUsd = ''`) |
| Foil/metallized barrier section **absent** | Correct (omission) | — | `primaryPlastic.foilBarrier = null` → the entire foil section and the at-a-glance "Foil" row are gated off. Correct honesty-gated omission; do NOT flag as missing content. (The hardcoded-literal risk inside that section is H1, latent only.) | company.ts (`foilBarrier = null`) |
| Video facade + VideoObject schema **absent** | Correct (omission) | — | `media.videos[id==plastic].youtubeId = ''` → both the visible `VideoFacade` and the `videoObjectSchema` node are omitted (valid-or-omit). Correct. | company.ts (`media.videos` plastic entry empty) |
| "four to eight weeks of sea transit" (hero, barrier, FAQ) | **Unverified** | Medium | Not backed by any verified-facts source; it is the load-bearing premise of the entire moisture-barrier thesis. Against `commercial.transitTimes` it is **slightly inconsistent**: configured envelope is 18–60 days (≈2.5–8.5 weeks), so "4–8 weeks" understates both ends. Not a config-listed company fact (no Blocker), but route to deep research + reconcile with config (H7). | not in `company.json`, not in `logistics-import-research-findings.md`, not in `guide-research-findings.md`; contradicts `commercial.transitTimes` max |
| "charcoal can absorb ambient humidity that degrades the burn and lights" / "desiccant sachets … thermal blanket … specified per order" | Correct | Low | Standard, well-documented behavior of activated/coconut charcoal (hygroscopic) and standard transit-protection layering; the add-on layers are appropriately hedged as per-order. Cross-links to `/packaging/additional-packaging#transit-protection`. | model knowledge + page self-consistency |
| ArticleMeta names/roles (Mohamad Sinno — Owner & Director; Ahmet Bassam — Charcoal Expert / Consultant; Teguh Pranomo — Quality Control Manager) | Correct | Low | Rendered by `ArticleMeta` from `company.governance.*`, not hardcoded in the page. i18n supplies only the labels ("Written by", etc.). No hardcoded-fact violation. | company.ts (`governance.author/reviewer/factChecker`) |

---

## 4. Requires deep research

| Claim | Why | Markets |
|---|---|---|
| "Coconut shisha charcoal in sealed inner plastic ships through **four to eight weeks** of sea transit." | Used as the central justification for the moisture-barrier argument (appears in hero, Barrier section, and FAQ), yet has no verified-facts source and is inconsistent with the site's own `commercial.transitTimes` (configured envelope 18–60 days / ≈2.5–8.5 weeks across the 12 priority ports). Confirm the realistic Indonesia (Semarang/Tanjung Emas)→priority-market ocean transit envelope, then either widen the prose or derive it from config so it cannot drift from the import pages. | USA (USLAX 25–32 / USNYC 35–45 days), UK (30–42), Germany (32–45), Saudi Arabia (25–40), Russia (Vladivostok 18–30, Novorossiysk 35–55, St Petersburg 40–60) |

No regulatory claims (UN 1361 / IMDG / SP 978 / EUDR / VAT / SABER / HS duties) appear on this page, so none are routed to regulatory deep research.

---

## 5. E-E-A-T / HCU assessment (Pass 5)

| Criterion | Score /10 | Justification (one line) |
|---|---|---|
| Authorship & expertise | 8 | ArticleMeta author/reviewer/fact-checker triple rendered from `governance.*`; named QC reviewer lends real subject expertise. |
| Topical authority | 8 | Tight, correct primary-packaging coverage that positions the layer within the 3-layer system and links to its siblings; on-topic, no drift. |
| Technical health & freshness | 6 | Clean single-H1 HTML, valid graph types, zero-JS FAQ; but `dateModified` 2026-06-11 is the cluster's oldest and predates the transit data it relies on (H6). CWV/Lighthouse owned by DrMax — not re-measured. |
| Effort | 7 | Per-section photos, hierarchy diagram, at-a-glance, 6-item FAQ — solid for a minor page; some restatement (H8) and statement-form headings (H3) cap it. |
| Originality | 7 | Genuinely useful "box presents, plastic protects" framing and the holds-by-reference-SKU device; not boilerplate. |
| Citation quality | 6 | The load-bearing "4–8 weeks" transit figure is uncited and mildly inconsistent with config (H7/§4); other claims are config-backed or self-evident. |
| Freshness / timeliness | 6 | Stamp present but stale vs siblings; transit copy not tied to `transitTimesLastUpdated` (2026-06-22). |
| Page intent | 9 | Clearly serves "what is the inner plastic / primary packaging and what does it do/hold" with a coherent quote CTA; intent well matched. |
| Structure & readability | 8 | Logical H2 outline, `max-w-prose` body, definition-form leads, extractable `<dl>` at-a-glance; headings could be questions (H3). |
| Mobile | 8 | `max-w-5xl` + responsive grids, 44px-min touch targets (`min-h-11` summaries), system fonts; per CLAUDE.md budgets — not re-measured. |
| Format-standard adherence | 8 | Cluster template followed (WebPage+FAQPage+DefinedTerm, no Product/Offer); honesty-gating + valid-or-omit applied correctly throughout. |
| Trust & spam signals | 9 | No fabricated specs/prices, graceful omission everywhere, no over-claim; held-vs-quoted economics intact. |

**PQ (mean of 12) = 7.33 / 10.**

**Verdict: helpful-first.** The page reliably answers the buyer's primary-packaging questions, degrades honestly where the factory hasn't fixed a spec (material/thickness/seal/price/foil all suppress rather than fabricate), and routes deeper questions to the right homes. Good-clicks prognosis: positive — extractable definition sentences and a complete FAQPage make it AI-citable. The only soft spot is one uncited, mildly self-inconsistent transit figure.

**Lowest-3 action steps:**
1. **Citation quality (6) — reconcile the "4–8 weeks" transit claim (H7/§4).** Derive the range from `commercial.transitTimes` (or widen the prose to ~3–9 weeks) so the page can't contradict the import pages, and run the external sanity check in §4 before re-stamping.
2. **Technical health & freshness (6) / Freshness (6) — re-stamp on a real edit (H6).** When the transit phrasing is fixed, bump `packaging.editorial.dateModified` (no cosmetic bump without content change).
3. **Effort / structure (7–8) — convert section H2s to question form (H3) and trim the duplicated barrier/"box presents, plastic protects" restatement (H8).** Cheap snippet-capture and anti-bloat wins on the non-FAQ body.

---

*End of audit. Diagnose-only — no source files were modified. Awaiting human action on the items above.*
