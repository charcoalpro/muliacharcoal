# Content Audit — /samples

**Run date:** 2026-06-23
**Route:** /samples
**Pillar:** supporting (free-sample conversion page; nearest pillar = Products)
**Cornerstone:** no (minor page — meta-table / Devil's-Advocate absence is Hardening, not Defect)
**Mode:** Diagnose-only. No files changed except this report.
**Passes run:** 0, 1, 2, 3, 5 (Pass 6 OFF).

---

## 1. Manifest

| Item | Value |
|---|---|
| Page file | `src/pages/samples.astro` |
| Layout | `src/layouts/BaseLayout.astro` (`includeOrgSchema={false}`, `path="/samples"`, `type="website"`, `prefetch={['/products','/quality/certifications']}`) |
| i18n source | `src/i18n/en/samples.json` (all copy is templates with `{{token}}` placeholders — no literal fact values) |
| Components | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `FAQSection`, `SpecsTable`, `MaybeLink`, `CTABanner`, `KeyFactsBox`, `PhotoGrid`, `Figure`, `SampleCtaPair`, `SampleVideo` |
| Token libs | `companyTokens`, `samplesTokens` (`src/lib/interpolate.ts`) |
| Schema builder | `samplesPageSchema` (`src/lib/schema/samplesPage.ts`) |
| `company.ts` fields consumed | `samples.*` (typicalSizeKg=1, maxSizeKg=20, maxComparisonItems=3, carrier="DHL / FedEx", transitDays=5, documentsWithSample=["COA","SHT","MSDS"], indicativeCourierCostUsd[5×null], courierCostLastUpdated="" , editorial.dateModified="2026-06-17"); `commercial.countriesExportedCount=35`, `commercial.currency="USD"`, `commercial.moq` (18t/20ft); `hours.responseHours=2`, `hours.short`, `hours.timezone`; `certifications.imdg` (UN 1361 / Class 4.2 / spontaneous combustion); `certifications.iso9001` (ISO 9001:2015, auditors held); `governance.author/reviewer/factChecker`; `productShapes` (6), `grades` (3) |
| Schema types emitted (built HTML) | `Organization` (slim; with logo `ImageObject` + `PostalAddress`), `WebPage`, `BreadcrumbList` (2× `ListItem`). **No FAQPage** (correct — canonical at /faq). **No Product/Offer** (correct — a free sample is not an offer). **No gallery `ImageObject` / `VideoObject`** (correct — gated off while media is placeholder). |
| Pillar/IA placement | Supporting page. Incoming permanent link: footer "Products & operations" column (`footerOperationsNav` in `src/config/nav.ts`, line 131) → **not an orphan.** |
| Build | Pre-built `dist/samples/index.html` read read-only; no build run. Title 47 chars + brand suffix; description ~150 chars incl. MOQ. No `{{token}}` leaks in rendered HTML. |

---

## 2. Severity-tiered TODO list

### Blockers
*None.* No hardcoded company facts (every fact arrives via `companyTokens`/`samplesTokens`; i18n carries only labels/prose). No ungated trust claim. No misplaced FAQPage. No real orphan or broken pillar link. No regulatory claim that is factually wrong on its face.

### Defects

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 1 — Pillar linking (up-link in first paragraph) | Hero block, `t.heroSubtitle` + `t.moqQualifier` (samples.astro 172–186); first prose under H1 | This supporting page's nearest pillar is **Products**, but neither the H1 hero copy nor the first body paragraph (`intro.p1`, line 232) contains an in-prose up-link to `/products`. The only `/products` links are deep in the page (the "What you can sample" section, line 330, and Related, line 156). The site rule wants the pillar referenced in the first paragraph. | Add an inline `/products` (or `/products` shape-category) link inside `intro.p1` or `moqQualifier` so the page references its commercial pillar in the opening paragraph, not only mid-page. Described only — do not edit. |
| D2 | Defect | Pass 2 — Headings as questions / featured-snippet lead | All H2s: "See a real sample shipment", "Real samples, real packing", "What you can sample", "How sample shipping works — we handle it", "Indicative sample courier cost", "Documents with your sample", "Why request from us — and what happens next" (samples.astro 240, 272, 291, 340, 367, 384, 408) | None of the section H2s is phrased as a buyer question, which weakens passage/snippet eligibility. The page does carry a good question-form FAQ block at the end, which partially compensates — hence Defect, not Blocker. | Recommend question-form H2s mirroring the FAQ intents (e.g. "What does a sample shipment look like?", "How does sample shipping work?", "What does the courier cost?", "Which documents come with a sample?"). The first sentence under each already answers directly (snippet leads are fine). Describe only. |

### Hardening

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 2 — Devil's Advocate (minor page) | After "Why request from us" (samples.astro 406–427) | No steelman of the strongest buyer counter-objection (e.g. "a 1 kg air-courier sample of a self-heating Class 4.2 material can cost more than the coals are worth, and one carton need not represent a full container"). On a minor page this is Hardening, not Defect. | Add a short objection→data response (the "in proportion to a 18-tonne container" line at `cost.proportionLine`, line 116, is the seed). Describe only. |
| H2 | Hardening | Pass 2 — Mini-cases | Whole page | No Problem→Action→Result mini-case (e.g. "Buyer in [market] ordered a 3-shape comparison sample, ran a burn test, converted to a container"). Cornerstone-grade nicety; optional on a supporting page. | Optionally add one anonymized P→A→R with a measurable result. Describe only. |
| H3 | Hardening | Pass 2 — Anti-bloat / thesis restatement | `intro.p2` (line 58) vs. KeyFactsBox + `atAGlance.definition` (line 38) | `intro.p2` ("Below: proof that the samples are real, what you can request, how compliant DG shipping works…") restates the page's own table of contents, duplicating the KeyFactsBox that sits directly above it. Compressible ≥20% without fact loss. | Trim `intro.p2` to a single forward-pointing sentence or drop it; the KeyFactsBox already telegraphs structure. Describe only. |
| H4 | Hardening | Pass 1 — Regulatory currency (cosmetic dating) | Cost table caption logic (samples.astro 121–123); `samples.courierCostLastUpdated = ""` | `courierCostLastUpdated` is empty, so the caption correctly falls back to the non-dated template and all five courier rows render "Available on request" (honest gating — **not** a defect). Flagged only as Hardening: when real per-destination prices land, ensure `courierCostLastUpdated` is set to a real quote-refresh date, not a cosmetic bump, so the "last updated" caption is meaningful. No action needed today. |
| H5 | Hardening | Pass 1 — Regulatory currency (DG/IATA review provenance) | DG section `shipping.body1/body2` (samples.astro 341–342); `whatYouCanSample`/gallery/FAQ DG mentions | The UN 1361 / Class 4.2 / "self-heating" / IATA DGR claims all render from the single-sourced `certifications.imdg` tokens (correct), and the page header comment flags a PRE-COMMIT GATE requiring issuing-authority verification + owner sign-off. The claims carry **no visible review date** at the point of use (unlike the spec/cost blocks). Minor-page Hardening: surface the IMDG/IATA verification date near the DG section, and confirm the gate was cleared before this content went live. Routed to deep research (see §4). |
| H6 | Hardening | Pass 2 — Class-4.2 hazard wording consistency | `shipping.body1` says "Class 4.2 (self-heating)" (line 101) vs. `imdgClassDescription` token = "spontaneous combustion" (rendered in gallery caption / glossary token) | Two different plain-language glosses for the same Class 4.2 hazard ("self-heating" and "spontaneous combustion") appear on one page. Both are technically defensible for Class 4.2, but the inconsistency is a small extractability/trust ding. | Pick one gloss sitewide (the IMDG label for Class 4.2 self-heating substances is "spontaneous combustion / self-heating") and use it consistently, or state both once explicitly. Describe only. |
| H7 | Hardening | Pass 2 — Quantified evidence | `gallery.intro` (line 75), `whatYouCanSample.goldenSample` (line 90) | "real samples, not stock imagery" and "identical to what ships in your container" are representativeness claims with no number/anchor. The page is otherwise strongly numeric (1 kg, 20 kg, 3-item comparison, ~5-day transit, 35 countries, 2-hour reply, 18 tons). | Optionally anchor the representativeness claim to the third-party-per-container testing fact (`quality.testing.thirdPartyFrequency`) for an extractable number. Describe only. |

---

## 3. Claims register

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "Free sample; you pay only the courier" | Correct | — | Backed by `samples.isFree` / `buyerPaysCourier`. | company.ts (`samples`) |
| "Typically 1 kg … up to 20 kg" | Correct | — | `typicalSizeKg=1`, `maxSizeKg=20`. | company.ts (`samples`) |
| "Up to 3 shapes/grades in one shipment" | Correct | — | `maxComparisonItems=3`. | company.ts (`samples`) |
| "Same-day dispatch, from current stock" | Correct (per config) | Low | `samples.dispatch`; operational claim, source-linked in config. | company.ts (`samples`) |
| "By DHL / FedEx air courier, ~5 days transit" | Correct (per config) | Low | `carrier="DHL / FedEx"`, `transitDays=5`. Carrier acceptance of UN 1361 air shipments varies by lane — operational, not a public-spec claim. | company.ts (`samples`) |
| "Coconut shell charcoal is UN 1361, Class 4.2 (self-heating / spontaneous combustion)" | Unverified (gate pending) | High | Token-sourced from `certifications.imdg`; **page header marks this a pre-commit gate** requiring issuing-authority verification + owner sign-off. UN 1361 / Class 4.2 PG III is the standard classification for charcoal, but the build flags it for confirmation → route to deep research. | company.ts (`certifications.imdg`) + needs external confirm |
| "Ships by air as declared dangerous goods under the IATA Dangerous Goods Regulations" | Unverified (gate pending) | High | Air-mode DGR applicability is a regulatory claim flagged in the source pre-commit gate (S2). Route to deep research. | i18n prose; needs external confirm |
| "Documents: COA, SHT and MSDS on request" | Correct | — | `documentsWithSample=["COA","SHT","MSDS"]`. Held-vs-per-order distinction not blurred (these are per-order/on-request docs that travel with the sample). | company.ts (`samples`) |
| "ISO 9001:2015 production / quality system" | Correct | — | `certifications.iso9001` present with auditors (held cert). Rendered as a trust signal; backed by a real fact → honesty-gating intact. | company.ts (`certifications.iso9001`) |
| "Exports to 35 countries" (hero + why-us + FAQ) | Correct (per config) | Medium | `countriesExportedCount=35`. Reach claim; treated as verified at the config layer (source-linked there). Confirm the count is current at annual review. | company.ts (`commercial`) |
| "Typical reply within 2 hours (office hours)" | Correct (per config) | Low | `hours.responseHours=2`. | company.ts (`hours`) |
| "Minimum order 18 tons / 20ft container" | Correct | — | `commercial.moq`. | company.ts (`commercial`) |
| "Indicative courier cost — Available on request" (all 5 rows) | Correct | — | All `indicativeCourierCostUsd[].priceUsd = null` → honest "Available on request" rather than a fabricated price. Correct graceful omission. | company.ts (`samples`) |
| "Silver-white, low-residue ash" (video summary) | Correct | Low | Matches `quality.specs.ashColor="silver-white"`. | company.ts (`quality.specs`) |
| Author "Mohamad Sinno" / Reviewer "Ahmet Bassam" / Fact-checker "Teguh Pranomo" | Correct | — | From `governance.*`; fact-checker cell is honesty-gated (`hasFact`). | company.ts (`governance`) |

---

## 4. Requires deep research

| Claim | Why | Markets |
|---|---|---|
| Coconut shell charcoal classification **UN 1361, Class 4.2, packing group III** (and "self-heating" vs "spontaneous combustion" gloss) | Source file header explicitly marks this a PRE-COMMIT GATE (S1) requiring issuing-authority verification + owner sign-off before commit; carries no visible review date at point of use. Wrong classification would be a Blocker. Verify against current IMDG Code (amendment 42-24) and the assigned proper shipping name. | USA, UK, Saudi Arabia, Germany, Russia/CIS (all sample destinations) |
| **Air transport of UN 1361 as declared dangerous goods under IATA DGR** via courier account (DHL/FedEx acceptance) | Source pre-commit gate (S2). Air-mode acceptance of Class 4.2 self-heating substances is carrier- and lane-dependent; verify current IATA DGR provisions and that DHL/FedEx accept UN 1361 air shipments on the quoted lanes before relying on "same-day air dispatch". | All sample destinations (esp. USA, Germany — strict aviation-security regimes) |
| "Exports to **35** countries" | Reach claim used as a trust signal in three places; treated as config-verified but should be confirmed current at annual review (low regulatory risk, medium reputational). | All |

---

## 5. E-E-A-T / HCU assessment

| Criterion | Score | One-line justification |
|---|---|---|
| Authorship & expertise | 8 | Full author/reviewer/fact-checker triple via `governance.*`, fact-checker honesty-gated; factory-as-author voice is credible. |
| Topical authority | 8 | Deep, specific sampling knowledge (DG handling, comparison samples, representativeness, document set) tied to the products/quality/logistics cocoon. |
| Technical health & freshness | 8 | `dateModified` 2026-06-17 (6 days old); clean single-sourcing, no token leaks. (CWV/Lighthouse owned by DrMax — not re-measured.) |
| Effort | 8 | Substantial, purpose-built page: KeyFactsBox, video+summary, gallery, per-shape CTAs, cost table, FAQ — not thin. |
| Originality | 7 | Strong original framing ("golden sample" rebuttal, in-proportion cost argument); some structural restatement (H3 anti-bloat). |
| Citation quality | 6 | Facts are single-sourced internally but the two DG/IATA regulatory claims carry no visible review date / outbound regulatory citation at point of use. |
| Freshness / timeliness | 8 | Recent `dateModified`; cost table honestly "on request" rather than stale prices. |
| Page intent | 9 | Crystal-clear conversion intent (free sample → container order); CTA at every beat; MOQ qualifier reassures. |
| Structure & readability | 7 | Logical heading outline, single H1, no skipped levels, good snippet leads — but H2s are statements not questions (D2). |
| Mobile | 8 | 2-up gallery on mobile, logical/RTL-safe classes, 44px touch targets via shared CTA component (per CLAUDE.md budgets; not re-measured). |
| Format-standard adherence | 8 | Meta table present, FAQ present, KeyFactsBox definition-form ("A sample is a small, free quantity…"), numeric-rich; no JS-hidden primary content. |
| Trust & spam signals | 9 | Honest gating throughout (prices, media schema, fact-checker), no fabricated claims, no hardcoded facts, held-cert vs per-order docs kept distinct. |

**PQ (mean of 12):** (8+8+8+8+7+6+8+9+7+8+8+9)/12 = **7.83 / 10**

**Verdict:** **Helpful-first.** The page is built to serve the buyer's real pre-import job (verify before committing a 20ft container) with honest, omission-over-fabrication behavior and dense numeric facts — strong goodClicks prognosis. The few weaknesses are optimization-grade (statement H2s, missing first-paragraph pillar link, no visible DG review date), not manipulation signals.

**Lowest-3 action steps:**
1. **Citation quality (6):** surface a visible review/verification date for the UN 1361 / Class 4.2 / IATA DGR claims at the DG section, and clear the pre-commit verification gate (deep-research §4) before relying on them.
2. **Originality / anti-bloat (7) & Structure (7):** convert section H2s to buyer-question form (D2) and trim the table-of-contents restatement in `intro.p2` (H3) so each section earns its space.
3. **Structure — pillar up-link (part of D1):** add an inline `/products` link in the opening paragraph so the supporting page anchors to its commercial pillar in the first paragraph, not only mid-page.
