# Content Audit — /quality/testing-methods

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report, no fixes). Passes 0,1,2,3,5 run. Pass 6 OFF.
**Page type:** Minor cluster page under the Quality pillar (NOT cornerstone).

---

## 1. Manifest

| Field | Value |
|---|---|
| Route | `/quality/testing-methods` |
| Source file | `src/pages/quality/testing-methods.astro` |
| Layout | `BaseLayout.astro` (`type="article"`, `includeOrgSchema={false}`) |
| Components | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `MaybeLink`, `FAQSection`, `CTABanner`, `KeyFactsBox`, `VideoFacade` |
| i18n sources | `src/i18n/en/qualityTesting.json` (`en.qualityTesting`), `src/i18n/en/qualityCommon.json` (`en.qualityCommon`) |
| company.ts fields consumed | `quality.testing.{ashMethod, calorificMethod, moistureMethod, proximateMethod, inHouseLab, thirdPartyLabs, thirdPartyScope, thirdPartyFrequency}`, `quality.testingVideo.{youtubeId, name, description, durationISO, uploadDate}`, `quality.editorial.dateModified`, `governance.{author, reviewer, factChecker}`, `whatsapp.presetMessages.salesGeneral`, `waLinkFor('quoteSpecs')` |
| Underlying data | `src/data/company.json` → `quality.testing` (lines 1050–1059), `quality.testReportsProvided` (1060–1064), `quality.testingVideo` (1065–1071), `quality.editorial` (1073) |
| Pillar | Quality (`/quality`) |
| Canonical FAQ home for its Q/As | This page is the canonical home for "how is X tested" Q/As (lab procedure). SHT → `/logistics/un-1361`; COA → `/quality/certifications`; both are linked, not duplicated. |
| Schema types emitted (built HTML) | `WebPage`, `FAQPage`, `BreadcrumbList`, `Person` (author); 4×`Question`/`Answer`. **VideoObject correctly OMITTED** (valid-or-omit: `durationISO`/`uploadDate` empty). |
| Incoming internal links (permanent) | `/quality` hub (6 refs), `/quality/specifications-explained` (11), `/quality/certifications` (3). In `LIVE_ROUTES`. Not an orphan. |
| Build state | `dist/quality/testing-methods/index.html` present and well-formed. (Build not re-run — read-only per run constraints.) |

**Honesty-gating observed and CORRECT (do not flag):** `moistureMethod: ""` → the moisture section renders with no "Standard:" line (generic), correct. `thirdPartyLabs` set → independent-testing framing and the third-party row render; if it were empty they would suppress. `testingVideo` VideoObject node suppressed because duration/date empty. All graceful-degradation behavior is intended.

---

## 2. Severity-tiered TODO list

### Blockers
*(honesty-gating violation, hardcoded company fact, fabricated/uncited claim, real orphan/broken pillar link, misplaced FAQPage, build failure, regulatory/standards claim now factually wrong)*

| ID | Tier | Pass + Rule | Exact location | What is wrong | Recommended fix (described, NOT executed) |
|---|---|---|---|---|---|
| B1 | Blocker | Pass 1 — Regulatory/standards currency → claim factually wrong; Pass 3 factual Error (source: `guide-research-findings.md` §A-stds line 77) | `company.json` `quality.testing.ashMethod = "ISO 1171:2024"`; renders in meta description, KeyFactsBox "Methods" row, the **Ash content** section "Standard:" line, FAQ "How is ash content tested?" and "What standards do you test to?" | The page names **ISO 1171** as the ash-content test method for coconut-shell charcoal. The project's own verified research states explicitly: *"Coal/coke standards (ISO 1171, ISO 562, ASTM D3172/D3175) are a DIFFERENT material class — do not substitute"* for charcoal. ISO 1171 is "Solid mineral fuels (coal/coke) — Determination of ash," not a charcoal/biofuel method. The charcoal-correct ash method is ASTM D1762-84(2021) (already in config) or ISO 18122. This is a named, prominent standards claim that contradicts a source — a fabricated/wrong authority claim that buyers and labs will check. The company.ts comment ("verified current") addresses edition year, not material-class fit, so it does not clear this. | Human decision (do NOT auto-edit config): either (a) replace `ashMethod` with the charcoal-correct standard the factory actually uses for ash (ASTM D1762-84(2021) measures ash at 750 °C; or ISO 18122:2022), or (b) blank `ashMethod` so the ash section renders generically until the real method is confirmed. Route to deep research to confirm which ash method the factory's lab/third-party labs actually run. Do not write a value into the repo until confirmed. |
| B2 | Blocker | Pass 1 — Regulatory/standards currency → claim factually wrong; Pass 3 factual Error (source: `guide-research-findings.md` §A-stds lines 73, 77) | `company.json` `quality.testing.calorificMethod = "ISO 1928"`; renders in meta description, KeyFactsBox "Methods" row, the **Calorific value** section "Standard:" line, FAQ "How is calorific value determined?" and "What standards do you test to?" | Same defect class as B1: **ISO 1928** is "Determination of gross calorific value of **solid mineral fuels** (coal/coke)," a different material class. The verified research names **ISO 18125:2017** as the solid-biofuel calorific method applicable to coconut-shell charcoal. Compounding: ISO 1928 is cited with **no edition year**, and the company.ts header comment (line 489) itself says `calorificMethod` "carries no year … render generically (the factory's stated edition was superseded / unconfirmed)" — yet the data ships a named value and the page renders it as a confirmed named standard, contradicting the page's own honesty-gating intent. | Human decision (do NOT auto-edit config): either replace with the charcoal-correct calorific method (ISO 18125:2017) once confirmed, or blank `calorificMethod` so the section renders generically per the documented intent. Route to deep research. Until confirmed, do not assert a coal/coke standard as the charcoal calorific method. |

*No hardcoded-company-fact Blocker:* every fact (lab names, methods, dates, author/reviewer/fact-checker names, brand, address, phone, email) traces to `company.ts`/`company.json` or `governance.*`. The video `name`/`description` strings contain literal "Mulia Charcoal" but they live in `company.json` (the single source), which is permitted.

*No misplaced-FAQPage Blocker:* FAQPage emits here for this page's own lab-procedure Q/As. SHT and COA Q/As are not duplicated here — they are linked to `/logistics/un-1361` and `/quality/certifications`. Per the run's canonical-FAQ-home rules this is correct. (Whether FAQPage may emit anywhere other than `/faq` globally is governed by `qualityClusterPageSchema`, which is the established cluster pattern; not flagged.)

### Defects
*(factual Error from Pass 3 already escalated above; missing required schema type; snippet/heading/structure failures; missing GEO essentials)*

| ID | Tier | Pass + Rule | Exact location | What is wrong | Recommended fix (described) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 1 — Honesty-gating asymmetry (placeholder fact rendered as real) | Body video section `#burn-test-video` (source lines 192–205) vs. schema gate (`qualityClusterPage.ts` → `videoObjectSchema`) | `quality.testingVideo.youtubeId = "dummyVideoID"` is a non-empty placeholder. `hasFact("dummyVideoID")` returns **true** (it does not start with `TODO_PLACEHOLDER`), so the body renders a full "Burn and ash test" section with a `VideoFacade` whose thumbnail and embed URL point at `youtube-nocookie.com/embed/dummyVideoID` — a non-existent video. Meanwhile `videoObjectSchema` correctly suppresses the VideoObject node (because `durationISO`/`uploadDate` are empty). Result: a visible broken/placeholder video block ships to buyers while the schema honestly omits it — the two gates disagree, and the page presents a video that does not exist. | Human decision: either (a) blank `testingVideo.youtubeId` (or set it to a `TODO_PLACEHOLDER…` sentinel) so `hasFact` is false and the body section omits cleanly until the real asset lands — matching the schema's valid-or-omit behavior; or (b) supply the real `youtubeId` + `durationISO` + `uploadDate` together. The body gate should require the same fields the schema gate requires, not just a truthy id string. Do not auto-fix; flag for the asset owner. |
| D2 | Defect | Pass 1 / Pass 3 — claim consistency with B1/B2 (only if config is corrected) | KeyFactsBox "Methods" row (source line 37 `methodsList`); meta `descriptionTemplate` (`qualityTesting.json` line 4) | The "Methods" summary row and the meta description hardcode the *consequences* of B1/B2: they assert "ISO 1171:2024 ash, ISO 1928 calorific value" in the SERP snippet. If B1/B2 are corrected in config the snippet self-heals via tokens, but if config is only partially fixed the meta description (which interpolates `{{ashMethod}}`/`{{calorificMethod}}`) will silently propagate whichever value remains. | No separate edit needed beyond B1/B2 — the templates are token-driven and will follow the config. Listed so the reviewer verifies the meta description and KeyFacts row after B1/B2 are resolved. |

*No missing-schema Defect:* WebPage + FAQPage + BreadcrumbList are the correct types for this page; VideoObject's omission is intentional and correct. No Product/Service/Article-on-blog mismatch.

*No orphan/broken-link Defect:* all `MaybeLink` targets used on this page (`/quality`, `/quality/specifications-explained`, `/quality/certifications`, `/logistics/un-1361`, `/samples`, `/glossary`, `/contact`) are in `LIVE_ROUTES`; none are muted. Pillar up-link present in first paragraph and Related section; pillar links down (6 incoming refs).

*Devil's-Advocate / GEO meta table:* this is a minor page, so the absence of a steelman/counterargument section is **Hardening**, not a Defect. The GEO meta table (Author / Reviewed by / Fact-checked / Last updated / Read time) IS present and fully config-driven — no Defect.

### Hardening
*(anti-bloat, freshness cadence, minor-page omissions, snippet polish)*

| ID | Tier | Pass + Rule | Exact location | What is wrong | Recommended fix (described) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 2 — Headings as questions | H2 "Laboratory test methods (Tier A)", H2 "Observed performance indicators (Tier B)", and all eight method H3s ("Ash content", "Fixed carbon", etc.) | Section headings are noun phrases, not buyer questions. The FAQ already uses question form; the method sections do not. For AI/snippet extraction, a question-form heading + 1-sentence answer is the highest-ROI format. | Optionally recast method H3s as questions ("How is ash content tested?") or add a one-line question subhead. Low priority — method bodies already lead with definition-form sentences, so featured-snippet leads exist. |
| H2 | Hardening | Pass 2 — Devil's Advocate (minor-page) | After the "Independent and third-party testing" section | No steelman of the strongest buyer counterargument (e.g., "in-house COAs are self-reported and can be gamed; how do I trust your numbers?") with a data-grounded response. On a minor page this is optional. | Optionally add a short "Why trust these numbers" paragraph stating the counterargument and answering it with the every-container third-party report + SHT deliverable already described. |
| H3 | Hardening | Pass 1 — Standards freshness stamp | KeyFactsBox "Methods" row and each method "Standard:" line | The named standards carry no visible "last verified" date on the page; the only date shown is the editorial "Last updated 2026-06-16". For standards claims, a visible review date tied to a regulatory/standards event strengthens GEO trust. | Optionally surface a "standards last reviewed" note near the methods, tied to the actual standards-check date (research findings checked 2026-06-20). Cosmetic; do not annual-bump without a real re-verification. |
| H4 | Hardening | Pass 2 — Anti-bloat | Independent-testing section, body1 + the SHT paragraph | Mild redundancy: the third-party lab list, scope, and "every container" frequency appear both in the KeyFactsBox "Third-party lab" row and again in the independent-testing prose. Acceptable (KeyFacts is a summary), but the prose could compress ~15–20% without losing facts. | Optionally tighten the independent-testing prose to avoid restating the full lab list/scope already in KeyFacts; reference rather than repeat. |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "tests ash to **ISO 1171:2024**" | **Error** | High | ISO 1171 is a coal/coke (solid mineral fuel) ash standard; research says do NOT substitute coal/coke standards for charcoal. Charcoal-correct = ASTM D1762-84(2021) or ISO 18122. → B1 | `guide-research-findings.md` line 77 |
| "tests calorific value to **ISO 1928**" | **Error** | High | ISO 1928 is a coal/coke gross-calorific standard; biofuel/charcoal-correct = ISO 18125:2017. Also no edition year, contra config's own intent. → B2 | `guide-research-findings.md` lines 73, 77; `company.ts` comment line 489 |
| "fixed carbon and volatile matter by proximate analysis (**ASTM D1762-84(2021)**)" | **Correct** | — | ASTM D1762-84 is the charcoal-specific method (made-from-wood charcoal, lumps/briquets); current reapproval 2021 confirmed. | `guide-research-findings.md` lines 69, 77 |
| "moisture is determined by the **oven-dry method**" (no standard named) | **Correct** | — | `moistureMethod` empty → renders generically. Honest. Oven-dry / loss-on-drying is the standard moisture principle (ISO 18134 family). | `company.json` line 1053; `guide-research-findings.md` line 117 |
| "A third-party laboratory — **Carsurin, Beckjorindo, or SGS** — tests … on every container, and that report travels with the cargo" | **Unverified** | Medium | Lab names and "every container" frequency come from `company.json` (`thirdPartyLabs`, `thirdPartyFrequency`). Not externally corroborated in the provided research files; needs owner confirmation that all three labs run the stated scope every container. | `company.json` lines 1056–1058 |
| "the **Self-Heating Test (SHT)** … at an accredited laboratory … provided as a shipping deliverable" | **Correct** | — | Consistent with verified DG framework: SHT/UN N.4 report required and accompanies shipment (now for PG screening, not exemption). Held-cert vs per-order deliverable distinction preserved (SHT is a deliverable, linked to certifications + UN 1361, not claimed as a held cert). | `logistics-import-research-findings.md` lines 57, 60; `guide-research-findings.md` line 80 |
| "Reports per order: Certificate of Analysis + third-party laboratory report" | **Correct** | — | Matches `testReportsProvided` (COA perOrder, third-party report perOrder gated on `thirdPartyLabs`). Per-order vs held-cert distinction intact. | `company.json` lines 1060–1064 |
| "In-house lab — Yes, quality control on every batch" | **Correct** | — | `inHouseLab: true` in config; framing matches. | `company.json` line 1055 |
| "Mulia Charcoal burn and ash test" video, "silver-white, low-residue ash" | **Unverified (asset placeholder)** | Medium | Video metadata real in config but `youtubeId` is `"dummyVideoID"` — the asset does not exist; body renders a broken embed. → D1 | `company.json` lines 1065–1071 |
| Author "Mohamad Sinno / Owner & Director"; Reviewer "Ahmet Bassam / Charcoal Expert"; Fact-checker "Teguh Pranomo / QC Manager" | **Correct (config-sourced)** | — | All from `company.governance.*`; not hardcoded. | `company.ts governance` |
| Lab-procedure descriptions (muffle furnace, bomb calorimeter, proximate-by-difference, oven-dry) | **Correct** | Low | Standard analytical-chemistry descriptions; internally accurate (e.g., fixed carbon by difference; bomb calorimeter for calorific value). | model knowledge + `guide-research-findings.md` |

---

## 4. Requires deep research

| Claim | Why it needs external verification | Relevant markets |
|---|---|---|
| Ash test method for coconut-shell charcoal: is **ISO 1171** ever defensible, or must it be **ASTM D1762-84(2021) / ISO 18122**? Which does the factory + its third-party labs actually run? | Project research says coal/coke standards must not be substituted for charcoal; need the factory's real ash method before correcting B1. | USA, UK, Germany (labs/buyers scrutinize COA method citations) |
| Calorific test method: confirm **ISO 18125:2017** (solid biofuels) as the correct charcoal method and what the factory actually uses; resolve the missing edition year on ISO 1928. | Same material-class issue as ash; needed before correcting B2. | USA, UK, Germany |
| Third-party labs **Carsurin / Beckjorindo / SGS**: confirm all three are actually engaged, that scope (ash, moisture, fixed carbon, volatile matter) is run **every container**, and that each report accompanies the cargo. | Strong trust claim ("every container") not corroborated in supplied research; high reputational exposure if overstated. | All priority markets |
| Burn/ash-test video asset: does a real published video exist (and its YouTube ID, duration, upload date)? | Body currently ships a `dummyVideoID` embed; need the real asset or confirmation to suppress. | All |

---

## 5. E-E-A-T / HCU summary

| # | Criterion | Score /10 | One-line justification |
|---|---|---|---|
| 1 | Authorship & expertise | 8 | Named author/reviewer/fact-checker with roles, all config-sourced; QC Manager as fact-checker is topically apt. |
| 2 | Topical authority | 7 | Deep, correct procedure descriptions for each parameter; undercut by the ISO 1171/1928 material-class errors that an expert would catch. |
| 3 | Technical health & freshness | 7 | Clean build, correct schema types, valid-or-omit discipline; placeholder video embed (D1) is a live defect; standards lack a review stamp. (CWV/Lighthouse per CLAUDE.md budgets — not re-measured here.) |
| 4 | Effort | 8 | Eight parameters each with method + equipment + meaning link; Tier A/B separation is genuine added structure, not filler. |
| 5 | Originality | 8 | First-hand lab-procedure framing tied to this factory's deliverables; not boilerplate. |
| 6 | Citation quality | 5 | Cites named standards — good instinct — but two of the three named standards are the wrong material class (B1/B2), which inverts the value of citing them. |
| 7 | Freshness / timeliness | 7 | `dateModified 2026-06-16` is current; no stale annual-bump; standards not date-stamped on page. |
| 8 | Page intent | 9 | Clearly owns "how it is tested," cleanly delegates "what values mean" to specs-explained and SHT/COA to their canonical homes. Intent is sharp. |
| 9 | Structure & readability | 8 | One H1, logical H2/H3, definition-form leads, KeyFactsBox summary, FAQ; method headings could be questions (H1 hardening). |
| 10 | Mobile | 8 | `max-w-3xl`, prose constraints, 44px CTAs via shared components; no JS-hidden primary content. (Not re-measured.) |
| 11 | Format-standard adherence | 7 | Meta table, FAQPage, breadcrumbs all present; the broken video block and missing standards stamp pull it down. |
| 12 | Trust & spam signals | 7 | Honest Tier-B "observed, never a lab standard" framing is a strong trust signal; the placeholder video and miscited standards are the only trust dents. |

**PQ (mean of 12):** (8+7+7+8+8+5+7+9+8+8+7+7)/12 = **7.42 / 10**

**Verdict:** **Helpful-first.** The page is written for a buyer who wants to know how each number is produced, delegates correctly, and is honest about what is observed vs measured — strong goodClicks prognosis. The two miscited coal/coke standards and the placeholder video are the only things that would generate badClicks (a buyer or their lab spotting ISO 1171 on charcoal would lose trust). Fix those and this is a high-trust cluster page.

**Lowest-3 action steps:**
1. **Citation quality (5):** Resolve B1/B2 — replace ISO 1171 / ISO 1928 with the charcoal-correct standards (ASTM D1762-84(2021) / ISO 18125:2017) once the factory's real methods are confirmed via deep research, or blank them so the sections render generically. This single fix raises the most-load-bearing trust criterion.
2. **Technical health (7) / D1:** Stop shipping the `dummyVideoID` embed — gate the body video section on the same fields the VideoObject schema requires (id + duration + uploadDate) so it omits until the real asset exists.
3. **Topical authority / freshness (7):** Add a visible "standards last reviewed" stamp tied to a real verification date, and (Hardening) recast method headings into buyer-question form to improve AI/snippet extraction.

---

*End of audit. No site files were modified. B1/B2 require a human decision on config values; do not write standard names or lab claims into the repo without external confirmation.*
