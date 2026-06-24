# Content Audit — /packaging/master-box

**Run mode:** diagnose-only (report, no edits). Passes 0,1,2,3,5 executed. Pass 6 OFF.
**Date:** 2026-06-23 · **Cornerstone:** no (minor cluster page) · **Auditor:** content-audit-page v1.0

---

## 1. Manifest (Pass 0)

| Field | Value |
|---|---|
| Target route | `/packaging/master-box` |
| Source file | `src/pages/packaging/master-box.astro` |
| Layout | `BaseLayout.astro` (`includeOrgSchema={false}`, `prefetch=['/packaging','/contact']`) |
| Components | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `KeyFactsBox`, `PhotoGrid`, `VideoFacade` (omitted), `FAQSection`, `CTABanner`, `MaybeLink`, `TextLink`, `ExternalLink`, `FAQSection` |
| i18n namespace | `en.packagingMasterBox` (+ `en.packaging.shared`, `en.packaging.metaBlock`) |
| Pillar | Packaging (`/packaging`) |
| Siblings | `/packaging/inner-box`, `/packaging/plastic`, `/packaging/white-label`, `/packaging/additional-packaging` |
| `company.ts` fields consumed | `packaging.masterBox.{material, wallTypes, weightOptionsKg, outerDimsMm, grossWeightKg, holdsExample, printOptions, printableFaces, maxStackHeight, cartonStrength.*}`; `packaging.innerBox.weightOptionsKg`; `packaging.pricing.{currency, priceBasis, doubleWallMasterBoxSurchargePerTonUsd, strappingPerTonUsd}`; `packaging.ancillary.{pallets, ispm15}`; `packaging.editorial.dateModified`; `packaging.branding.artworkFormats`; `packaging.proofing.proofLeadTimeDays`; `packaging.media.videos[master-box]`; `commercial.containerCapacity.ft20.fullKg`; `certifications.imdg.{unNumber, class, classDescription}`; `governance.author.name`; helpers `hasFact`, `waLinkFor`, `portOfLoadingLabel`, `imdgLabel` |
| Schema types emitted (built HTML) | `WebPage`, `FAQPage` (9 Question/Answer), `DefinedTerm` (→ `/glossary#master-box`), `BreadcrumbList`, `Person` (author). `VideoObject` correctly **omitted** (`media.videos[master-box].youtubeId` empty). |
| Canonical FAQ home note | Container-count FAQ is hub-canonical (`/packaging#packaging-faq`) — correctly **link-only**, no duplicate schema here. |

**Build/resolve status:** Page resolves to exactly one route. Built HTML present at `dist/packaging/master-box/index.html`. (Build was pre-run per audit constraints; not re-run.) No stop conditions.

### Honesty-gating state (verified against `src/data/company.json`)
Empty facts that correctly gate OFF (no fabrication observed): `outerDimsMm`, `grossWeightKg`, `holdsExample`, `printOptions` (empty array), `printableFaces`, `maxStackHeight`, all of `cartonStrength.*`, all of `pricing.*` (→ render "Available on request"). Facts present that correctly drive blocks: `weightOptionsKg=[10,20]`, `ancillary.pallets=true` + `ispm15=true` (palletization row renders), `containerCapacity.ft20.fullKg=18000`, IMDG `UN 1361 / 4.2`, `proofLeadTimeDays=7`, `artworkFormats=[AI,PDF]`. **Honesty-gating is clean.**

---

## 2. Severity-tiered TODO list

### Blockers — none

No hardcoded company facts (every fact value flows through a `company.ts` import / token); no claim rendered without a backing fact; no real orphan; no broken pillar link; no fabricated/uncited claim; build OK; no regulatory claim now factually wrong.

### Defects

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 1 — Schema architecture (FAQPage placement: "FAQPage emits ONLY at `/faq` globally") | `src/lib/schema/packagingClusterPage.ts` lines 65–68 (consumed at `master-box.astro` line 128–135); rendered as JSON-LD `@graph` block 0 in `dist/packaging/master-box/index.html` (9 `Question`/`Answer` nodes under a `FAQPage` `@id` `…/packaging/master-box#faq`) | The audit rule under enforcement states FAQPage schema must emit only at `/faq`. This page emits a page-specific `FAQPage`. NOTE: this is the **locked cluster template** (the source header lines 8–12 and the schema builder doc lock `WebPage + page-specific FAQPage + DefinedTerm` for all five packaging cluster pages), and the FAQ here is genuinely page-specific (the hub-canonical container-count Q is correctly link-only, not schema'd). So this is an architecture-level conflict, not a one-page slip. | Resolve at the architecture level, not on this page alone: either (a) confirm an explicit, documented exception that permits page-specific `FAQPage` on packaging cluster pages and update the audit rule to whitelist it, or (b) demote all five packaging cluster pages to `WebPage`-only and consolidate FAQ schema at `/faq` and the per-topic canonical homes. Do NOT silently strip just this page (would orphan the locked template). Route to a human architecture decision. |

### Hardening

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 2 — Anti-bloat / readability | `compliance.p1` (i18n `packagingMasterBox.json` line 101) → rendered "…the UN 1361 marking and Class 4.2 dangerous-goods labels (IMDG Code UN 1361 Class 4.2 (spontaneous combustion))…" | `UN 1361` and `Class 4.2` each appear twice in one sentence: once from `{{unNumber}}`/`{{unClass}}` and again inside `{{imdgLabel}}` (which expands to "IMDG Code UN 1361 Class 4.2 (spontaneous combustion)"). Redundant, ~15% compressible. | Reword the i18n string so the parenthetical adds only the framework + hazard descriptor without re-stating the number/class, e.g. lead with `{{unNumber}}`/`{{unClass}}` then a shorter "(IMDG Code, spontaneous-combustion hazard)". Same pattern in FAQ answer `faq.items[6].a` (line 153) — check for the duplication there too. |
| H2 | Hardening | Pass 2 — Headings as questions / featured-snippet | All section H2s (`construction.h2` "Definition & construction", `walls.h2` "Single vs double wall", `dims.h2` "Dimensions & weights", `printing.h2`, `loadSecuring.h2`, `container.h2`, `compliance.h2`, `neutralVsBranded.h2`) | Section H2s are statement-form, not buyer-question-form. Snippet capture for the body sections relies entirely on the separate FAQ. | Optional snippet upgrade: phrase (or add an H3 sub-heading per section in) question form a buyer asks ("How strong is a master box?", "Single-wall or double-wall — which do I need?", "How many master boxes fit a 20ft container?"). Low priority — the FAQ already carries question-form coverage with FAQPage schema. |
| H3 | Hardening | Pass 2 — Devil's Advocate (minor page → Hardening, not Defect) | After `neutral-vs-branded` / the page thesis (master box = structural layer) | No explicit steelman of the strongest counterargument (e.g. "single-wall is fine, double-wall is upsell"; or "printed cartons aren't worth it vs labels"). The "Single vs double wall" and "Neutral vs branded" sections partially serve this but don't frame an explicit counter-position + data response. | Optional: add a short "When you don't need a double-wall / printed master box" steelman with the decision criteria (route length, stack height, palletized vs floor-stuffed). Minor-page nicety only. |
| H4 | Hardening | Pass 2 — Mini-cases / quantified evidence | `walls.p1`, `dims`, `container` sections | Strength/stacking benefits are asserted qualitatively ("holds its edges under compression", "stack safely") without a number because `cartonStrength.*` is empty in config (honesty-gated — CORRECT, not a defect). No Problem→Action→Result mini-case. | When the owner fills `cartonStrength` (ECT/burst/flute/gsm) the gated spec line will auto-populate. Until then, no action required on the page. Optionally add one mini-case ("floor-stuffed 18 t load, double-wall, 8-week route → cartons arrived square") once a real reference exists — do not invent. |
| H5 | Hardening | Pass 1 — Regulatory currency / freshness cadence | `ArticleMeta` "Last updated 2026-06-11" (← `packaging.editorial.dateModified`); `editorial.datePublished == dateModified == 2026-06-11` | Page is 13 days old (today 2026-06-24) so not stale. Note only: `dateModified` equals `datePublished`; future refreshes should bump `dateModified` on a real content/regulatory event, not a cosmetic annual bump. | No action now. Flag for the freshness cadence: tie any future `dateModified` bump to a substantive change (e.g. cartonStrength facts landing, IMDG amendment). |
| H6 | Hardening | Pass 3 — soft duration claim (Unverified, Low) | `construction.p2` "…how high cartons stack safely during 4–8 weeks at sea." (also `dims`/cargo-protection sitewide) | "4–8 weeks at sea" is a sitewide-consistent transit framing but is not config-backed and spans a wide range (Indonesia→US West Coast can be ~3–4 wk; →US East Coast / Black Sea can reach 6–8 wk). Plausible and internally consistent. | Leave as-is (it is a deliberately broad, hedged range). If precision is ever wanted, source per-lane transit from `logistics.imports[*]` ocean-transit ranges rather than the flat 4–8 wk. Low priority. See Requires-deep-research §4. |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "UN 1361 … Class 4.2 dangerous-goods labels (IMDG Code UN 1361 Class 4.2 (spontaneous combustion))" | Correct | — | Matches `certifications.imdg` (`unNumber=UN 1361`, `class=4.2`, `classDescription=spontaneous combustion`). | company.ts |
| "A 20ft container loads 18,000 kg of charcoal net" | Correct | — | `commercial.containerCapacity.ft20.fullKg = 18000`. | company.ts |
| "loose-loaded, that is 1,800 × 10 kg or 900 × 20 kg master boxes" | Correct | — | Derived: 18000/10=1800, 18000/20=900; weights from `masterBox.weightOptionsKg=[10,20]`. No hardcoded count. | company.ts (derived) |
| "10 kg or 20 kg of charcoal net per box" | Correct | — | `masterBox.weightOptionsKg=[10,20]` via `masterBoxSizes` token. | company.ts |
| "a 20 kg master box corresponds to 20 × 1 kg or 40 × 500 g inner boxes" | Correct | — | Derived by net weight from biggest box (20) ÷ inner refs {1, 0.5}; both in `innerBox.weightOptionsKg`. `holdsExample` empty → derivation used (per [A1]). | company.ts (derived) |
| "palletized on ISPM-15 heat-treated wood pallets" | Correct | — | Gated on `ancillary.pallets=true` AND `ancillary.ispm15=true`. | company.ts |
| "Artwork: print-ready vector files (AI / PDF), CMYK" | Correct | — | `branding.artworkFormats=[AI, PDF]` via `acceptedArtworkFormats`. | company.ts |
| "digital proof (7 working days)" | Correct | — | `proofing.proofLeadTimeDays = 7`. | company.ts |
| "country of origin (Made in Indonesia)" | Correct | Low | "Made in Indonesia" is a fixed customs-marking phrase used as i18n prose sitewide (also `packaging.json`); `company.address.country="Indonesia"`. Country name in descriptive/marking prose is the accepted sitewide convention, NOT a hardcoded structured-fact substitution. No violation. | company.ts (address.country) |
| "Double-wall upgrade — Available on request" / "Strapping — Available on request" | Correct | — | `pricing.doubleWallMasterBoxSurchargePerTonUsd` and `pricing.strappingPerTonUsd` empty → `availableOnRequest` fallback. Honesty-gated correctly. | company.ts |
| "stack safely during 4–8 weeks at sea" | Unverified | Low | Sitewide-consistent transit framing; broad hedged range, not config-backed. Plausible. | model / sitewide prose |
| "Carriers check these markings before accepting the booking; missing marks strand cargo at the port" | Unverified | Low | Industry-true cause-effect for DG cargo; not externally sourced on-page. Reasonable. | model |
| "Brown kraft mutes vivid colors, so full-color artwork is typically quoted with a white-top liner" | Correct (domain) | — | Standard corrugated-print fact; not a company-specific claim. | model |

No claim contradicts a source. No `Error`-status claims.

---

## 4. Requires deep research

| Claim | Why | Markets |
|---|---|---|
| "4–8 weeks at sea" ocean-transit range as applied to master-box compression duration | Soft, wide, model-sourced; could be tightened against real per-lane transit data already partly in `logistics.imports[*]`. Low priority — not wrong, just imprecise. Verify the 4–8 wk envelope still bounds the slowest published lane (e.g. Russia Black Sea / US East Coast). | USA, Russia/CIS, Germany |

No high-severity external verification required. The page contains no regulatory rate/date/fee claim of its own (those live on the logistics import pages); its only regulatory reference (UN 1361 / Class 4.2) is config-backed and correct.

---

## 5. E-E-A-T / HCU summary (Pass 5)

| Criterion | Score /10 | Justification |
|---|---|---|
| Authorship & expertise | 8 | Named author/reviewer/fact-checker meta-table (Mohamad Sinno / Ahmet Bassam / Teguh Pranomo) rendered top-of-page via `ArticleMeta`; roles from i18n, names from config. |
| Topical authority | 8 | Deep, specific master-box coverage (construction, wall types, dims, printing, load securing, container math, compliance) with siblings + glossary linked. |
| Technical health & freshness | 8 | Built HTML clean, schema present, dates current (13 days old). CWV/Lighthouse out of scope (DrMax); not re-measured. |
| Effort | 8 | Eight substantive sections + 9-item FAQ + captioned photo placeholders; honesty-gated spec cells await real data. |
| Originality | 7 | Solid original spec prose; some sentences are sitewide boilerplate (4–8 weeks; UN-1361 markings) shared across packaging/logistics. |
| Citation quality | 7 | One authoritative outbound (UNECE DG) + internal cross-links to UN 1361 / documents / rules. Soft duration/cause-effect claims uncited but low-stakes. |
| Freshness / timeliness | 8 | `dateModified` current; cadence note H5 (modified==published). |
| Page intent | 9 | Cleanly serves "what is a master box / specs / branding / compliance" buyer intent; CTAs (WhatsApp quote, samples, white-label) well placed. |
| Structure & readability | 8 | One H1, logical H2 hierarchy, no skips; at-a-glance table + sectioned prose + FAQ. Minor redundancy (H1) and statement-form H2s (H2). |
| Mobile | 8 | `max-w-5xl`, responsive grids, `<details>` FAQ, min-h-11 touch targets. Not re-measured (DrMax owns CWV). |
| Format-standard adherence | 8 | Meta-table present (above minor-page bar), FAQ as JS-free `<details>` (GEO-readable), definition-form lead sentence ("A master box, also called a master carton, is…"). |
| Trust & spam signals | 9 | No fabricated facts, honesty-gating intact, DG markings honest ("neutral is not blank"), no aggressive/keyword-stuffed copy. |

**PQ (mean of 12) = 8.0 / 10.**

**Verdict:** Helpful-first. The page answers the buyer's master-box questions directly, leads sections with extractable definition-form sentences, exposes numeric specs (10/20 kg, 18,000 kg, 1,800/900 boxes, 7-day proof, ISPM-15), and gates honestly on missing data rather than inventing it. goodClicks-leaning: a buyer lands, gets the spec answer, and is routed to quote/sample/white-label without dead ends. No search-first / SEO-doorway smell.

**Lowest-3 action steps:**
1. **Citation quality (7)** — add a sourced or per-lane basis for "4–8 weeks at sea" (pull from `logistics.imports[*]` ocean ranges) and consider a one-line source note on the "missing marks strand cargo" cause-effect. (H6)
2. **Originality (7)** — de-duplicate the sitewide boilerplate by trimming the IMDG double-statement (H1) and lightly varying the shared "4–8 weeks" phrasing so it doesn't read identically to plastic/cargo-protection pages.
3. **Freshness / cadence (8, structural)** — establish that future `dateModified` bumps are event-driven (cartonStrength facts landing, IMDG amendment), not cosmetic. (H5)

---

### Auditor notes — false-flag guards honored
- Empty `company.ts` facts (cartonStrength, outerDimsMm, grossWeight, holdsExample, prices) gate OFF correctly — **not** reported as missing content.
- `VideoObject` omitted (empty `youtubeId`) — correct valid-or-omit, **not** reported.
- All `MaybeLink` targets (`/packaging/inner-box`, `/packaging/white-label`, `/packaging/additional-packaging`, `/products`, `/logistics/rules`, `/logistics/un-1361`, `/logistics/documents`, `/contact`, `/samples`) are in `LIVE_ROUTES` — all render live; none muted; no orphan.
- Pillar up-link present in first viewport ("Part of the shisha charcoal packaging system →" → `/packaging`) and in Related; hub `/packaging` links **down** to this page (confirmed in `dist/packaging/index.html`); footer links to `/packaging`. No orphan.
- Container-count FAQ kept hub-canonical (link-only, no duplicate schema) — preserved, not "smoothed over".
- "Made in Indonesia" treated as accepted sitewide marking prose, NOT flagged as a hardcoded structured fact (would be a false-flag).
