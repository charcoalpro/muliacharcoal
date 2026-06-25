# Content Audit — /packaging (Packaging pillar hub)

**Run date:** 2026-06-24 · **Mode:** Diagnose-only (report, no fixes) · **Cornerstone:** YES
**Methodology:** docs/build-prompts/content-audit-page.md — Passes 0,1,2,3,5 (Pass 6 OFF)

---

## 1. Manifest (Pass 0)

| Item | Value |
|---|---|
| Target route | `/packaging` |
| Pillar | packaging (this page **is** the pillar hub) |
| Source file | `src/pages/packaging/index.astro` |
| Layout | `src/layouts/BaseLayout.astro` (`includeOrgSchema={false}`, `prefetch=['/contact']`) |
| Built HTML | `dist/packaging/index.html` |
| i18n namespace | `src/i18n/en/packaging.json` (labels/prose only) |
| Data source | `src/config/company.ts` → `PackagingConfig`, hydrated from `src/data/company.json` (`packaging.*`) |
| Schema builder | `src/lib/schema/packagingHub.ts` |
| Key components | `HeroSection`, `ArticleMeta`, `KeyFactsBox`, `PhotoGrid`, `VideoFacade`, `SpecsTable`, `FAQSection`, `MaybeLink`, `ExternalLink`, `CTABanner`, `Breadcrumbs` |
| `company.ts` fields consumed | `commercial.containerCapacity.ft20.fullKg`; `commercial.leadTime.{newBrandDays,repeatBrandDays}`; `commercial.moq.{tons,containerType}`; `commercial.portOfLoading.*`; `certifications.imdg.{unNumber,class,classDescription}`; `governance.{author,reviewer,factChecker}`; `packaging.{configurations,masterBox,innerBox,primaryPlastic,pricing,proofing,branding,editorial,media}` |
| Schema types emitted (built HTML) | `CollectionPage` (×1), **`FAQPage` (×1)**, `DefinedTerm` (×6), `BreadcrumbList` (×1, from `<Breadcrumbs>`), `WebPage` refs (×5, child `hasPart`), `Question`/`Answer` (×13 each) |
| Pillar-down links | All 5 cluster pages linked (child sections + Related): master-box, inner-box, plastic, additional-packaging, white-label — all LIVE in `LIVE_ROUTES` |
| Incoming link from permanent structure | YES — `footerOperationsNav` (`src/config/nav.ts:129`) links `/packaging`. **Not an orphan.** |

**Build status:** Build already done (read-only). `dist/packaging/index.html` present; **zero unresolved `{{token}}` placeholders** in the built HTML (all bindings resolved). No build re-run performed (per run constraints).

---

## 2. Severity-tiered TODO list

### Blockers

| ID | Tier | Pass + rule | Exact location | What is wrong | Recommended fix (described, NOT executed) |
|---|---|---|---|---|---|
| B1 | Blocker | Pass 1 — Schema architecture: "FAQPage emits ONLY at `/faq` globally; misplaced FAQPage" | `src/lib/schema/packagingHub.ts:59-62` → `faqPage` node with `@id` `…/packaging#faq`; rendered in `dist/packaging/index.html` as `"@type":"FAQPage"` | The page emits a `FAQPage` JSON-LD node. The audit rule (and this run's instructions) state FAQPage must emit **only** at `/faq` globally; canonical FAQ homes for specific docs are SHT→`logistics/un-1361`, COA→`quality/certifications`, MSDS→`logistics/documents`. A FAQPage on `/packaging` is a misplaced FAQPage under that rule. **Context for the human:** this is a deliberate, sitewide pattern, not a one-off — `FAQPage` is emitted on ~30 built pages (every cornerstone/cluster Q&A page composes its own FAQPage into its `@graph`; see `FAQSection.astro` header comment and `packagingHub.ts` overlay note). The visible FAQ answers are also present in the body HTML, so GEO extractability does not depend on the schema. | Do NOT silently delete. **Escalate as a policy decision to a human:** either (a) the "FAQPage only at /faq" rule is stale and should be amended to allow per-page FAQPage (the current Google-endorsed pattern) — in which case B1 is dismissed sitewide; or (b) the rule stands and `FAQPage` must be removed from `packagingHubSchema` and the other ~29 pages, keeping only the visible `<details>` FAQ. This page cannot be fixed in isolation; the call must be made once for the whole site. |
| B2 | Blocker | Pass 1 — No hardcoded company fact outside `company.ts` (country of origin = `address.country`) | `src/i18n/en/packaging.json:222` (`compliance.mandatory.body2`): "…country of origin (Made in Indonesia), net weight…" | The origin-country fact value **"Indonesia"** (= `company.address.country`) is written as a literal in i18n prose instead of tokenized. A `{{country}}` token exists (`interpolate.ts:106`, `company.address.country`) and is already in scope on this page. Borderline case: "Made in Indonesia" reads as a fixed marking phrase, but the literal still embeds a governed company fact, which the strict rule prohibits. | Replace the literal "Indonesia" in `body2` with the `{{country}}` token ("…(Made in {{country}})"). Confirm the origin-marking phrasing with the owner; do not write any new fact into the repo. |

### Defects

| ID | Tier | Pass + rule | Exact location | What is wrong | Recommended fix (described, NOT executed) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 2 — Devil's Advocate (steelman) required on cornerstone | Whole page; no such section (grep of `packaging.json` for steelman/counter/objection/tradeoff = none) | Cornerstone rule requires a steelman after the main thesis: strongest industry counterargument, when it holds, data-grounded response. The hub proves "three-layer export packaging, neutral-or-white-label" but never addresses the buyer objection (e.g. "custom print adds cost + lead time," or "white-label MOQ traps small brands"). | Add one i18n-driven steelman block (new `packaging.json` section, schema-free) after the Branding or Compliance H2: state the strongest counter (custom print adds cost/lead time; neutral is faster/cheaper), note when it genuinely holds (single small order, buyer already has a printer), then the data-grounded rebuttal (no print surcharge on neutral, single-container white-label, proof+sample gating). Describe only — author writes prose. |
| D2 | Defect | Pass 2 — Mini-cases: cornerstone carries ≥1–2 Problem→Action→Result with a measurable result | Whole page; none present (grep = none) | No Problem→Action→Result mini-case anywhere. Cornerstone must carry 1–2 with a measurable outcome. | Add 1–2 short mini-cases (i18n prose, no schema), e.g. P: distributor needs shelf-ready retail boxes for a launch; A: Full configuration, white-label across all three layers, digital proof in 7 working days + physical sample; R: one branded 20ft container = 18,000 kg net (1,800 × 10 kg) shipped under the buyer's brand, no recurring commitment. Pull numbers from `company.ts` tokens. Describe only. |
| D3 | Defect | Pass 2 — Headings as questions / featured-snippet lead (cornerstone GEO) | All section H2s: "Master box (master carton)", "Packaging configurations compared", "Branding: neutral vs white-label", "Compliance, shipping & retail markings" | Section H2s are statements, not buyer questions; only the FAQ block uses question form. The definition lead under each H2 is good (definition-form sentences present), but the headings forgo the question-shaped snippet target a cornerstone should own ("What is a master box?", "Which packaging configuration should I choose?", "Neutral vs white-label — which is cheaper?"). | Supply question-form H2/H3 variants (or a question-form sub-heading above each definition). Existing definition sentences already serve as the snippet answer, so this is a heading rewrite only. Describe; do not rewrite prose. |

### Hardening

| ID | Tier | Pass + rule | Exact location | What is wrong | Recommended fix (described, NOT executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 3 — Quantified claim imprecise vs canonical transit data | `packaging.json:109` (`children.plastic.definition`): "…its moisture and dust barrier over **four to eight weeks** of sea transit." | "Four to eight weeks" (28–56 days) is hardcoded prose and does not reconcile with `commercial.transitTimes`: published ranges run 25–60 days — Russia max 60 (~8.6 wk), Germany 45 (~6.4 wk). Longest routes exceed the stated 8-week ceiling. Low severity (descriptive, not a governed fact) but understates the barrier window the inner plastic must survive. | Widen to "roughly four to nine weeks" / "up to ~8–9 weeks on the longest routes," or generalize ("the full ocean-transit window") and let `/logistics` own exact ranges. Confirm against `commercial.transitTimes`. |
| H2 | Hardening | Working-style — fragile positional coupling (maintainability) | `src/pages/packaging/index.astro:438` and `:440` — `en.packaging.related.items[6].label` / `…items[7].label` | The compliance section reuses two Related labels by **array index** (`related.items[6]`,`[7]`). Reordering/inserting items in `related.items` silently mislabels these compliance links. Brittle; indices currently resolve correctly ("UN 1361 shipping compliance", "Export documents"). | Reference these labels by dedicated i18n keys (e.g. `compliance.mandatory.un1361LinkLabel`, `…logisticsDocsLinkLabel`) instead of positional indices. Code change only; flag for maintainer. |
| H3 | Hardening | Pass 1 — Regulatory currency (visible review date) | Compliance section (`#compliance`); ArticleMeta "Last updated" = `2026-06-11` (`packaging.editorial.dateModified`) | DG / UN 1361 / Class 4.2 / ISPM-15 claims carry no claim-level "verified" date; only the page-level Last updated. Facts are backed (see Claims register), but a cornerstone with DG/phytosanitary claims should expose a regulatory review date tied to a real event. | Surface a "regulatory facts last reviewed" line in the compliance section from the relevant `lastVerified` in `company.ts` logistics/imdg data (do not invent a date). Low priority — facts currently correct. |
| H4 | Hardening | Pass 2 — Anti-bloat / thesis restatement | `packaging.json` intro `p2`/`p3` + `branding.intro` + `branding.neutral.body` | The "branding independent of configuration" + "neutral still carries mandatory DG/origin/net-weight markings" thesis is stated in intro `p2`/`p3`, restated in `branding.intro`, again in `branding.neutral.body` and the FAQ. Defensible GEO redundancy, but compressible ≥20% without fact loss. | Tighten `branding.intro` (configuration-independence already made twice above) and let `branding.neutral.body` carry the DG-markings reminder once. Describe; do not rewrite. |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| Coconut charcoal ships as UN 1361, Class 4.2 ("spontaneous combustion") DG cargo | **Correct** | High (if wrong) | Matches `certifications.imdg` exactly | company.ts (`certifications.imdg`) |
| Master box net = 10 kg or 20 kg; single-/double-wall corrugated kraft | **Correct** | Med | `masterBox.weightOptionsKg=[10,20]`, `wallTypes=['single','double']` | company.ts (`packaging.masterBox`) |
| Inner box = 230 gsm, sizes 0.25/0.5/1/2/3/5 kg, matte or gloss coating | **Correct** | Med | `innerBox.paperGsm=230`, `weightOptionsKg`, `coating="matte or gloss"` | company.ts (`packaging.innerBox`) |
| Inner plastic pack sizes = 250 g / 500 g / 1 kg | **Correct** | Low | `primaryPlastic.weightOptionsG=[250,500,1000]` | company.ts (`packaging.primaryPlastic`) |
| 20ft container = 18,000 kg net = 1,800 × 10 kg or 900 × 20 kg | **Correct** | High | Derived in-page from `containerCapacity.ft20.fullKg=18000`; arithmetic verified | company.ts (`commercial.containerCapacity`) |
| Digital proof in 7 working days | **Correct** | Med | `proofing.proofLeadTimeDays=7` | company.ts (`packaging.proofing`) |
| New branded order ≈ 21 days; repeat ≈ 14 days | **Correct** | Med | `commercial.leadTime.newBrandDays=21`, `repeatBrandDays=14` | company.ts (`commercial.leadTime`) |
| Artwork accepted in AI / PDF, print-ready CMYK | **Correct** | Low | `branding.artworkFormats=['AI','PDF']` | company.ts (`packaging.branding`) |
| MOQ = 18 tons / one 20ft container | **Correct** | High | `commercial.moq.tons=18`, `containerType="20ft"` | company.ts (`commercial.moq`) |
| Carriers require UN 1361 + Class 4.2 DG labels before accepting the booking | **Unverified (supported)** | Med | Consistent with research (DG declaration UN 1361/4.2 in every market doc set; "DG Class 4.2 carrier acceptance" labelled a carrier requirement). Absolute "before they accept the booking" phrasing is a carrier-practice claim. | model + logistics-import-research-findings.md |
| Wood pallets ISPM-15 heat-treated & stamped when palletized | **Correct** | Low | Research finding [S2]: all four markets require ISPM-15-compliant stamped pallets | logistics-import-research-findings.md ([S2]) |
| Inner plastic is the moisture barrier "over four to eight weeks of sea transit" | **Unverified / imprecise** | Low | `commercial.transitTimes` run 25–60 days; Russia ~60d (≈8.6 wk) exceeds 8-week ceiling. See H1. | company.ts (`commercial.transitTimes`) — contradicts upper bound |
| White-label exclusive; NDA available; single branded container fine, no recurring commitment | **Correct** | Low | `whiteLabel.{designExclusive,ndaAvailable,singleContainerOk}=true` | company.ts (`packaging.whiteLabel`) |
| Custom-print add-on prices = "Available on request" (8 rows) | **Correct (honesty-gated)** | n/a | All `pricing.*` fields empty in `company.json`; `priceValue()` degrades. **Not** a defect. | company.ts (`packaging.pricing`) all empty |

No source-contradiction **Error** except the upper-bound transit imprecision (H1, low). Honesty-gating verified clean: every rendered price/spec/date traces to a real `company.ts` fact; absent facts (all pricing, video IDs, `customPrint.moqUnits`) degrade rather than fabricate.

---

## 4. Requires deep research

| Claim | Why | Markets |
|---|---|---|
| "Carriers require the UN 1361 marking and Class 4.2 DG labels **before accepting the booking**" | Stated as a universal carrier-acceptance precondition. Research supports DG declaration + Class 4.2 carrier acceptance as a factor, but the absolute "before they accept the booking" phrasing should be confirmed against carrier booking conditions (esp. lines that decline Class 4.2). | USA, UK, Germany, Saudi Arabia, Russia (Russia flagged carrier-acceptance-constrained) |
| Inner-plastic moisture-barrier window "four to eight weeks" | Asserts a transit-duration range that under-covers the longest published routes (Russia ~60 days). Confirm the realistic worst-case ocean-transit window the primary packaging must survive, then align the prose. | Russia, Germany (longest transits) |

---

## 5. E-E-A-T / HCU assessment (Pass 5)

| Criterion | Score | Justification |
|---|---|---|
| Authorship & expertise | 9 | Full GEO meta table renders real `governance.*` people: Mohamad Sinno (Owner & Director), Ahmet Bassam (Charcoal Expert/Consultant), Teguh Pranomo (QC Manager). Author/Reviewed/Fact-checked all present. |
| Topical authority | 9 | Comprehensive packaging ontology: 5 child entities defined, configurations table, branding paths, compliance markings, 13-item FAQ, 6 DefinedTerms → glossary. |
| Technical health & freshness | 7 | Last updated 2026-06-11 present; per-claim regulatory review date absent (H3). (CWV/Lighthouse out of scope — defer to CLAUDE.md budgets; text-led hero, no render-blocking JS.) |
| Effort | 9 | High — definition-form leads under every section, derived container math, honesty-gated price table, structured timeline. |
| Originality | 7 | Strong original entity framing; loses points for thesis restatement (H4) and absent mini-cases/steelman (D1/D2). |
| Citation quality | 8 | Two authoritative outbounds (UNECE DG, IPPC ISPM-15) via `ExternalLink` with `outbound_click`; cross-links to `logistics/un-1361` and `logistics/documents`. |
| Freshness / timeliness | 7 | Editorial date current; "four to eight weeks" imprecision and no regulatory-review cadence shown. |
| Page intent | 9 | Hub intent crisp: routes down to clusters, each child section deliberately short so cluster pages win their own queries. |
| Structure & readability | 8 | Clean H1→H2→H3 outline, no level skips (`Full/Standard/Minimal`/`Price` H3s are SpecsTable mobile-card artifacts). Definition leads aid extraction. Headings not question-shaped (D3). |
| Mobile | 9 | Responsive grids, `min-h-11` (44px) touch targets on summaries, logical-property classes (`border-s-2`, `ps-3`, `text-start`). |
| Format-standard adherence | 7 | Cornerstone meta table ✔, FAQ ✔, DefinedTerms ✔ — but missing steelman + mini-cases drop cornerstone-format compliance. |
| Trust & spam signals | 9 | No fabricated facts; honesty-gating clean; prices degrade to "Available on request"; held-cert vs per-order distinction not blurred (no cert claims rendered here). |

**PQ = (9+9+7+9+7+8+7+9+8+9+7+9) / 12 = 98 / 12 = 8.17 / 10**

**Verdict: helpful-first.** Built to satisfy a researching B2B buyer (extractable definitions, real specs, honest "on request" pricing, downstream routing) rather than to capture and dead-end clicks. goodClicks prognosis strong; the cornerstone-format gaps (steelman, mini-cases) and the FAQPage-placement policy question are the only material drags.

**Lowest-3 action steps:**
1. **Technical health / freshness (7):** Add a claim-level regulatory-review date in the compliance section from `company.ts` `lastVerified`; no cosmetic bump (H3). Correct the "four to eight weeks" transit imprecision (H1).
2. **Originality / format-standard (7):** Add the required cornerstone steelman/Devil's-Advocate section (D1) and 1–2 Problem→Action→Result mini-cases with measurable results (D2).
3. **Structure / citation (8 / question-headings):** Convert section H2/H3 to buyer-question form to capture featured snippets (D3); existing definition leads already supply the snippet answer.

---

## Notes — deliberately NOT flagged (false-flag guards honored)

- **All-"Available on request" price table** — correct honesty-gated degradation (`pricing.*` empty in `company.json`), not missing content.
- **Omitted video facades** — all `media.videos[*].youtubeId` empty → `VideoFacade` slots omit (never fake a video); photo slots render local placeholders. Not flagged.
- **No Service / VideoObject / Product schema** — intentional per overlay (Service canonical on `/packaging/white-label`, VideoObject on each cluster page). Correct.
- **`MaybeLink` targets** — all packaging cluster routes, `/contact`, `/samples`, `/logistics/*`, `/glossary`, `/faq` are in `LIVE_ROUTES`; links render live, none muted-broken, no orphan.
- **Native `<details>` FAQ** — HTML, not JS-hidden; 13 answers present in body HTML → GEO-extractable. Not a "content behind JS" violation.
- **`/packaging` has no up-link to a parent pillar** — correct: it **is** the pillar hub; links down to its 5 clusters, linked from the footer.
