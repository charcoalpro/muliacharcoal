# Content Audit — /packaging/inner-box

**Run date:** 2026-06-23 · **Mode:** diagnose-only (report, no edits) · **Cornerstone:** no (minor cluster page) · **Pass 6:** OFF
**Methodology:** docs/build-prompts/content-audit-page.md (Passes 0,1,2,3,5)

---

## 1. Manifest (Pass 0)

| Field | Value |
|---|---|
| Target route | `/packaging/inner-box` |
| Pillar | packaging |
| Page source | `src/pages/packaging/inner-box.astro` |
| Layout | `BaseLayout.astro` (`includeOrgSchema={false}`, custom `schema`, `prefetch=['/packaging','/contact']`) |
| Content (i18n) | `src/i18n/en/packagingInnerBox.json` (`en.packagingInnerBox`); shared `en.packaging.shared`, `en.packaging.metaBlock` |
| Components | Breadcrumbs, HeroSection, ArticleMeta, MaybeLink, TextLink, FAQSection, CTABanner, KeyFactsBox, PhotoGrid, VideoFacade |
| Schema builders | `packagingClusterPageSchema` (WebPage + FAQPage + DefinedTerm + VideoObject), `videoObjectSchema` |
| `company.ts` fields consumed | `packaging.innerBox.{paperGsm, coating, boxStyles, dimensionsMm, weightOptionsKg, grossWeightKg, holdsExample, finishes}`, `packaging.customPrint.{moqUnits, leadTimeAddDays}`, `packaging.retail.shelfReadyBox`, `packaging.pricing.{currency, priceBasis, innerBoxPrintingPerKgUsd}`, `packaging.branding.artworkFormats`, `packaging.proofing.proofLeadTimeDays`, `packaging.editorial.{datePublished, dateModified}`, `packaging.media.videos[id='inner-box']`, `governance.{author, reviewer, factChecker}`, `waLinkFor('oemLayout')`, `whatsapp.presetMessages.oemLayout`, `portOfLoadingLabel()`; reference SKU `productShapes` (`cube` → `cube-25mm.pcsPerKg`) |
| Schema types emitted (built HTML) | **WebPage**, **FAQPage** (page-specific, 9 Q/As, `@id …#faq`), **DefinedTerm** (`@id` → `/glossary#inner-box`, alternateName `retail box`/`consumer box`), **BreadcrumbList** (emitted by `<Breadcrumbs>`). VideoObject omitted (no `youtubeId`). |
| Position in cocoon | packaging pillar → cluster sibling of master-box, plastic, white-label, additional-packaging. Hub (`src/pages/packaging/index.astro:74`) links **down** to this page. Page links **up** to `/packaging` in the hero and Related. |
| Build | `dist/packaging/inner-box/index.html` present and read. (Build not re-run — read-only per run constraints.) |

**Honesty-gating posture (verified against `src/data/company.json` → `packaging`):** `paperGsm: 230`, `coating: "matte or gloss"`, `weightOptionsKg: [0.25,0.5,1,2,3,5]`, `branding.artworkFormats: ["AI","PDF"]`, `proofing.proofLeadTimeDays: 7`, `editorial` dates `2026-06-11` are **present** and drive rendered content correctly. **Empty/null** (correctly omitting their *structured* surfaces): `boxStyles: []`, `dimensionsMm: ""`, `grossWeightKg: ""`, `holdsExample: ""` (falls back to products-config-derived "about 96 cubes" — backed by `cube-25mm.pcsPerKg`), `finishes: []`, `customPrint.moqUnits: ""`, `customPrint.leadTimeAddDays: ""`, `retail.shelfReadyBox: null`, `pricing.innerBoxPrintingPerKgUsd: ""` (→ "Available on request"), `media.videos[inner-box].youtubeId: ""` (video section omitted). The KeyFactsBox correctly drops the empty rows; the gated `stylesLineTemplate`/`finishesLineTemplate`/MOQ/lead-time/dims prose lines correctly omit. **Tension:** the unconditional prose narrative (§Construction, §Retail, FAQ) still *states* the gated-away capabilities — see B1/B2/D1.

---

## 2. Severity-tiered TODO list

### Blockers

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| B1 | Blocker | Pass 1 — Honesty-gating (claim rendered without a backing fact) | `construction.p1` ("…produced in tuck-end, two-piece tray-and-lid, and sleeve styles…"), echoed in FAQ item "What box styles are available?" (hardcoded "Tuck-end, two-piece tray-and-lid, and sleeve styles"); KeyFactsBox "Box styles" row (line 73) and `construction.stylesLineTemplate` (lines 223-225) | The page builds a dedicated gated surface for box styles from `pk.innerBox.boxStyles`, but `company.json packaging.innerBox.boxStyles = []`, so the structured row and gated line correctly omit — **while the prose and the FAQ answer assert the three named styles unconditionally.** A specific factual capability claim (which styles the factory offers) is rendered with no backing fact, bypassing the gate the page itself defines. The same value is gated in one place and hardcoded in another. | Either (a) populate `packaging.innerBox.boxStyles` in `company.json` with the verified styles so prose + FAQ + structured row all source one fact (route prose through the token), or (b) if styles are not yet a confirmed standing offer, soften the prose/FAQ to a non-committal form ("box styles such as … are available on request") so no fixed capability is asserted ahead of the fact. Human decision — do not write a value into the repo from the audit. |
| B2 | Blocker | Pass 1 — Honesty-gating (claim rendered without a backing fact) | `construction.p2` ("…emboss, UV spot, and foil are add-ons layered on top. They are priced separately…"); FAQ item "What is the inner box made of, and what finishes are available?" (hardcoded "emboss, UV spot, and foil … Each is priced separately"); KeyFactsBox "Finishes" row (line 78) and `construction.finishesLineTemplate` (lines 226-228) | `company.json packaging.innerBox.finishes = []` and **every** finish surcharge price field (`pricing.laminationSurchargePerTonUsd`, `embossSurchargePerTonUsd`, `uvSpotSurchargePerTonUsd`, `foilSurchargePerTonUsd`) is `""`. The structured "Finishes" row and gated finishes line correctly omit, yet the prose and FAQ assert the specific finish ladder (emboss / UV spot / foil) **and** that each is "priced separately" — a pricing claim with no backing price fact. Ungated capability + pricing claim behind a gate the page otherwise honors. | Populate `packaging.innerBox.finishes` (and, if "priced separately" is to stand as a claim, confirm the surcharge fields are intentionally on-request) so the finish ladder sources from config; or soften prose/FAQ to "available upgrades include … quoted per design." Keep the deliberate coating→lamination→emboss/UV/foil *distinctness* ([A2]) intact. Human decision. |

### Defects

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 1 — Honesty-gating consistency / Pass 3 internal contradiction | `retail.p1` ("Shelf-ready formats **are available** for direct retail display"); KeyFactsBox "Shelf-ready" row (line 80, gated on `pk.retail.shelfReadyBox === true`) | `retail.shelfReadyBox = null`, so the "Shelf-ready" at-a-glance row correctly omits — but the prose states shelf-ready formats "are available" unconditionally. The packaging hub (`src/i18n/en/packaging.json:228`) says shelf-ready formats are "**quoted per order**". The page's own structured gate, the prose, and the sibling hub disagree on the commitment level. | Align the three: set `retail.shelfReadyBox` to a real value, or reword `retail.p1` to match the hub's "quoted per order" framing so the structured omission and prose claim agree. |
| D2 | Defect | Pass 2 — Headings as questions / featured-snippet | H2s: "Definition & purpose", "Box styles, construction & finishes", "Sizes & weights", "Printing & branding", "Retail & consumer markings", "Packed into the master box", "Neutral vs branded inner box" | None of the seven body H2s is phrased as a buyer question, so the section headings do not double as snippet/PAA targets even though the answer sentences underneath are snippet-ready. (The FAQ block *is* in question form and carries the schema, which mitigates but does not replace section-level question headings.) | Supply question-form H2 variants, e.g. "What is an inner box and what does it do?", "What box styles and finishes are available?", "What sizes and weights does the inner box come in?", "How is the inner box printed and branded?", "What retail markings go on the inner box?", "How do inner boxes pack into the master box?", "Neutral or branded — which inner box do I need?". Keep the existing first-sentence direct answers. |

### Hardening

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 1 — Schema type/placement (noted tension, NOT a defect) | Built HTML JSON-LD — page-specific `FAQPage` (`@id …/packaging/inner-box#faq`, 9 Q/As) | The methodology's blanket "FAQPage emits ONLY at `/faq` globally" rule conflicts with the **locked** packaging-cluster template (`src/lib/schema/packagingClusterPage.ts` §9; sibling `master-box` emits the same). Per Do-Not-False-Flag, this deliberate, cluster-consistent design is **not** a Blocker. Recorded only so the methodology rule and the locked template are reconciled by a human. Hub-canonical Q/As (container count, general cost) are correctly **not** schema'd here — verified. | No page change. Reconcile the global FAQPage rule in `content-audit-page.md` with the locked packaging-cluster FAQPage architecture (document the carve-out) so future audits don't re-flag. |
| H2 | Hardening | Pass 2 — Devil's Advocate / minor-page omission | whole page | No steelman section (e.g. "Why some buyers skip a printed inner box / when neutral or plastic-only is the right call"). On a minor cluster page this is Hardening, not a Defect. The "Neutral vs branded" section is comparison, not a counterargument. | Optionally add a short "When you don't need a branded inner box" angle (bulk/HoReCa buyers, cost-down on neutral) with the data-grounded response, to capture the skeptical-buyer intent. |
| H3 | Hardening | Pass 2 — Mini-cases / quantified evidence | §Printing & branding, §Neutral vs branded | Capability claims ("primary branding surface", "Pantone/spot matching for brand-color accuracy", "shelf appeal") carry few numbers beyond gsm/sizes/96-cubes/7-day proof. No Problem→Action→Result mini-case. | Add 1 measurable anchor where honest (e.g. proof turnaround "7 working days" is already good; consider per-design MOQ once `customPrint.moqUnits` is populated). Not required on a minor page. |
| H4 | Hardening | Pass 5 — freshness cadence | `packaging.editorial.dateModified = 2026-06-11`; ArticleMeta "Last updated 2026-06-11" | `datePublished === dateModified` (both 2026-06-11) and several backing facts are still empty placeholders (boxStyles, finishes, dimensionsMm, grossWeightKg, moqUnits, leadTimeAddDays, innerBoxPrintingPerKgUsd). The page is shipped with a partly-unpopulated config; when those facts land, bump `dateModified` to a real editorial event (not a cosmetic bump). | When B1/B2/D1 facts are filled in, set `dateModified` to that date. No change today. |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "230 gsm board" / "230 gsm white duplex board" | Correct | Low | Matches `innerBox.paperGsm = 230` (token `innerBoxGsm`). | company.ts |
| "matte or gloss" base coating | Correct | Low | Matches `innerBox.coating = "matte or gloss"`. | company.ts |
| Net sizes "250 g / 500 g / 1 kg / 2 kg / 3 kg / 5 kg" | Correct | Low | Matches `innerBox.weightOptionsKg = [0.25,0.5,1,2,3,5]` (token `innerBoxSizes`). | company.ts |
| "a 1 kg inner box of 25 mm cubes holds about 96 cubes" | Correct | Low | `holdsExample` empty → computed fallback from `cube-25mm.pcsPerKg` in products config. Backed by single-source SKU data; labeled "reference"/"about". | products config |
| Artwork formats "AI / PDF" (print-ready vector) | Correct | Low | Matches `branding.artworkFormats = ["AI","PDF"]` (token `acceptedArtworkFormats`). | company.ts |
| "digital proof (7 working days)" | Correct | Low | Matches `proofing.proofLeadTimeDays = 7` (token `proofTimeDays`). | company.ts |
| Box styles "tuck-end, two-piece tray-and-lid, and sleeve" | Unverified | Medium | `innerBox.boxStyles = []` — no backing fact. Asserted only in prose/FAQ (B1). Needs confirmation the factory offers exactly these three. | model (no source) |
| Finish ladder "emboss, UV spot, and foil" add-ons | Unverified | Medium | `innerBox.finishes = []` — no backing fact (B2). | model (no source) |
| "They are priced separately" (each finish step) | Unverified | Medium | All finish surcharge price fields in `pricing` are `""`; pricing claim unbacked (B2). | model (no source) |
| "Shelf-ready formats are available for direct retail display" | Unverified | Medium | `retail.shelfReadyBox = null`; hub says "quoted per order" — internal disagreement (D1). | model / contradicts hub copy |
| "White coated duplex prints vivid full-color directly — no white-top liner needed, unlike the brown-kraft master box" | Unverified | Low | Generally true print-industry fact (coated white duplex vs kraft); not a regulated claim. Low risk. | model |
| "Pantone/spot matching for brand-color accuracy" | Unverified | Low | `branding.pantoneSpot = null` in config. Capability claim, not gated. Low reputational risk but unbacked. | model |
| "UN 1361 dangerous-goods markings live on the master box, not the retail inner box" | Correct | Low | Consistent with the held cert / DG architecture; SHT/UN 1361 canonical home is `/logistics/un-1361` (correctly linked, not re-schema'd). | model + site architecture |
| "Custom-print MOQ … per-design minimum" (prose, ungated number) | Correct (no number shown) | Low | `customPrint.moqUnits = ""` → numeric MOQ line and at-a-glance row correctly omit; prose only says "a per-design minimum" with no value. No fabricated number. | company.ts (gated) |
| Author "Mohamad Sinno" / Reviewer "Ahmet Bassam" / Fact-checker "Teguh Pranomo" + roles | Correct | Low | Sourced from `company.governance` via ArticleMeta; not hardcoded in i18n. | company.ts |
| Company footer facts (NIB, NPWP, 14 t/day, address, ISO 9001, etc.) | Correct | Low | Footer-rendered from `company.ts`; not authored on this page. | company.ts |

**No hardcoded company-fact Blockers found in page/i18n** (Pass 1 fact scan): gsm, sizes, formats, proof days, names/roles all flow through `company.ts` tokens or `governance`; i18n holds labels/prose only.

---

## 4. Requires deep research

| Claim | Why | Markets |
|---|---|---|
| Inner-box **box styles** actually offered (tuck-end / tray-and-lid / sleeve) | `boxStyles` is empty in config; the three named styles are asserted in prose+FAQ with no backing fact (B1). Needs a factory-confirmed list before the claim can stand. | all (USA, UK, SA, DE, RU) |
| Inner-box **finishes** offered and whether each is "priced separately" | `finishes` empty and all finish surcharge price fields empty (B2). Confirm which finishes are real standing options and the pricing posture (per-design quote vs published surcharge). | all |
| **Shelf-ready** inner-box availability and commitment level | `retail.shelfReadyBox = null`; prose says "available", hub says "quoted per order" (D1). Confirm the true offer to resolve the contradiction. | all (esp. UK/DE retail) |
| Inner-box **dimensions / gross weight** per net size | `dimensionsMm` and `grossWeightKg` empty; page defers to "confirmed per size with the quote". Populating would strengthen GEO extractability but requires real measured data. | all |
| **Pantone/spot matching** capability and any added cost | `branding.pantoneSpot = null`; claim is ungated. Confirm capability before it stands as a firm promise. | all |

> All of the above are TODOs for a human + the deep-research companion. Do **not** write any value into `company.ts` from this audit.

---

## 5. E-E-A-T / HCU assessment (Pass 5)

| Criterion | Score /10 | Justification |
|---|---|---|
| Authorship & expertise | 7 | ArticleMeta names author/reviewer/fact-checker (roles + names from `company.governance`); peer-to-peer factory voice. |
| Topical authority | 8 | Deep, specific inner-box coverage (board, styles, finishes, sizes, markings, master-box chain) tightly cocooned to siblings. |
| Technical health & freshness | 6 | Clean static HTML, valid schema graph (mechanics out of scope here); but `dateModified == datePublished` and several backing facts unpopulated (H4). |
| Effort | 8 | 7 substantive sections, hierarchy diagram, photo grid, 9-item FAQ, holds-chain consistency — clearly hand-built. |
| Originality | 7 | First-party manufacturer detail (finish ladder distinctness, holds-chain from single SKU source) not generic. Some capability claims unbacked (B1/B2). |
| Citation quality | 6 | Numbers (gsm, sizes, 96 cubes, 7-day proof) sourced; but box styles / finishes / shelf-ready asserted without a source (Pass 3 Unverified cluster). |
| Freshness / timeliness | 6 | Dated 2026-06-11, 13 days old; honest but not yet refreshed and config still has placeholders. |
| Page intent (helpful vs search-first) | 8 | Clearly serves a buyer specifying retail packaging; strong cross-links to white-label, master-box, samples, UN 1361. |
| Structure & readability | 8 | Logical outline, definition-form leads, at-a-glance `<dl>`, no JS-hidden content, max-prose width. Headings not in question form (D2) caps it. |
| Mobile | 8 | `max-w-5xl`, responsive grids, 44px touch targets via shared CTA/links; references CLAUDE.md CWV budgets (not re-measured here). |
| Format-standard adherence | 7 | Meta table present (good for a minor page), FAQPage + DefinedTerm + breadcrumb correct; FAQPage-vs-/faq rule tension noted (H1). |
| Trust & spam signals | 7 | Honesty-gating correctly omits absent structured facts; weakened only by prose asserting gated-away capabilities (B1/B2/D1). |

**PQ = 7.0 / 10** (arithmetic mean of the 12 scores).

**Verdict:** **Helpful-first**, leaning genuine. The page is built to serve a buyer specifying retail packaging, not to farm a keyword — strong cocoon links, extractable specs, honest omission on the *structured* surfaces. The one thing pulling it toward "search-first / over-promising" is the prose asserting box styles, finishes, and shelf-ready capability that the page's own config has left empty. goodClicks prognosis is positive once B1/B2/D1 are reconciled; until then a buyer who asks for a named style/finish quoted "separately" could hit a mismatch with what's confirmable.

**Lowest-3 action steps:**
1. **Technical health & freshness / Freshness (6):** Populate `boxStyles`, `finishes`, `dimensionsMm`, `grossWeightKg`, `shelfReadyBox`, `customPrint.moqUnits`, `leadTimeAddDays`, `innerBoxPrintingPerKgUsd` in `company.json` as facts are confirmed, then bump `dateModified` to that real editorial event.
2. **Citation quality (6):** Resolve the Pass-3 Unverified cluster (B1/B2/D1) — back box styles, finish ladder, "priced separately", and shelf-ready with config facts or soften the prose so no capability is asserted ahead of a source.
3. **Page intent / snippet capture (D2):** Convert the seven body H2s to question form to add PAA/snippet surface, keeping the existing direct-answer lead sentences.

---

*End of report. Diagnose-only — no site files were modified. Awaiting human approval before any change.*
