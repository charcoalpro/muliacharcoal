# Content Audit — /factory/production-process

**Run date:** 2026-06-23 · **Mode:** Diagnose-only (report, no fixes) · **Cornerstone:** No (minor cluster page)
**Methodology:** `docs/build-prompts/content-audit-page.md` v1.0 — Passes 0,1,2,3,5 (Pass 6 OFF).

---

## 1. Manifest

| Field | Value |
|---|---|
| Target route | `/factory/production-process` |
| Source page | `src/pages/factory/production-process.astro` |
| Layout | `BaseLayout.astro` (`type="article"`, `includeOrgSchema={false}`) |
| Components | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `MaybeLink`, `FAQSection`, `CTABanner`, `Figure`, `ProcessSteps` |
| i18n source | `src/i18n/en/factoryProductionProcess.json`; `src/i18n/en/factoryCommon.json` (meta block labels) |
| Schema builder | `src/lib/schema/factoryClusterPage.ts` (→ `webPageNode`, `howToNode`) |
| `company.ts` fields consumed | `factory.processSteps`, `factory.qcSteps`, `factory.equipment`, `factory.ovenType`, `factory.batchRetention`, `factory.developToSpec`, `factory.editorial.dateModified/datePublished`, `production.weatheringDays`, `production.ovens.{count,capacityTonsPerBatch,cycleHours}`, `quality.specs.{binder,additives}`, `governance.{author,reviewer,factChecker}`, `whatsapp.presetMessages.salesGeneral`, `waLinkFor('quoteSpecs')` |
| Tokens | `companyTokens` + `factoryTokens` via `lib/interpolate.ts` (all fact values single-sourced from config; no literals in i18n) |
| Pillar | Factory (`/factory`) — this is the most internally-linked child |
| Schema types emitted | **WebPage**, **HowTo** (page `@graph`); **BreadcrumbList** (separate, from visual `<Breadcrumbs>`). No FAQPage (correct — visible FAQ only). |
| Build HTML inspected | `dist/factory/production-process/index.html` (read-only; build pre-existing, not re-run) |

**Pillar-cluster placement:** Factory cluster child. Siblings: `/factory/capacity`, `/factory/raw-materials`, `/factory/virtual-tour`. Canonical FAQ home is `/faq` (this page renders a VISIBLE FAQ only, which is correct). Glossary `see` fragments (`#carbonization`, `#pyrolysis`, `#kiln`, `#binder`, `#weathering`) are served by the five sub-section `id`s on this page.

**Pass 0 stop-conditions:** None triggered. Page resolves to exactly one route; build HTML present.

---

## 2. Severity-tiered TODO list

### Blockers — 0

None. Pass-1 gates all clear:

- **Hardcoded company facts:** none. Every company fact (oven count = 8, batch tons = 1.5, cycle = 24 h, oven type = "gas and electric", weathering = 14 days, QC step count = 6, binder = "natural tapioca starch", additives) is interpolated via `{{token}}` from `company.json` through `companyTokens`/`factoryTokens`. The literal `400–700°C` and `18–24 h` are NOT company facts in the CLAUDE.md sense (legal/registration/capacity/owner/cert identifiers) — `400–700°C` is generic carbonization material science (corroborated by `guide-research-findings.md` §FC), and `18–24 h` drying is sourced from `factory.processSteps[].durationOrTemp` config, not an i18n literal. No banking/NIB/NPWP/port/cert-ID literals anywhere.
- **Honesty-gating:** all trust blocks correctly gated. `batchRetention` (true) gates the retention note; `developToSpec` (true) gates the Develop-to-spec section; ArticleMeta fact-checker cell gates on `hasFact(governance.factChecker.name)`. No claim rendered without a backing fact. Held-cert vs per-order-report distinction preserved: the page says each order "ships with a batch Certificate of Analysis and an independent third-party lab report" (per-order) and routes held-cert documentation to `/quality` — the two are not blurred.
- **Pillar linking / orphan:** up-link to `/factory` in the first body paragraph ("part of our coconut charcoal factory overview →") AND in Related topics. `/factory` hub links DOWN to this page (`dist/factory/index.html` contains `href="/factory/production-process"`). Incoming permanent link confirmed → not an orphan.
- **Schema type & placement:** WebPage + HowTo is the locked factory-cluster shape; BreadcrumbList present (page is depth-2); **no FAQPage** emitted despite a visible FAQ — correct per the `/faq`-only rule.
- **Regulatory currency:** the only regulatory claim (weathering ≥14 days as a "required dangerous-goods safety control for sea freight") is factually current — `logistics-import-research-findings.md` line 54 confirms SP 978 / IMDG 42-24, weathered ≥14 days, mandatory 1 Jan 2026. Not stale, not wrong.

### Defects — 0

None. This is a minor cluster page, so the cornerstone-only requirements (top-of-page meta table presence aside, it is in fact present; Devil's Advocate; mini-cases) downgrade to Hardening per the methodology. The required GEO meta table IS present and complete (Authored by / Reviewed by / Fact-checked by / Last updated / Reading time). All required schema types present. No Pass-3 factual Error. No snippet/heading structural failure rising to Defect.

### Hardening

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 1 — GEO extractability / readability | `factoryProductionProcess.json` `overview.supplyNote` rendered as "…coconut shell and natural tapioca starch — **none — no chemical additives or igniting agents**." | The `{{additives}}` value (`"none — no chemical additives or igniting agents"` in `quality.specs.additives`) was authored to stand alone, but here it is dropped mid-sentence after an em-dash, yielding a double-negative-feeling, grammatically awkward "starch — none — no chemical additives…". An AI extractor may quote the garbled fragment. | Reword the i18n template so the additives clause reads cleanly when interpolated (e.g. phrase the template as "…with no chemical additives or igniting agents" and store only the noun phrase in config), OR split `additives` into a render-ready phrase. Do not edit the fact value blindly — coordinate the template + token shape. |
| H2 | Hardening | Pass 1 — GEO extractability / readability | `factoryProductionProcess.json` `sections[3].body` (Binder & pressing): "…into a paste — **none — no chemical additives or igniting agents** — then pressed…" | Same root cause as H1: the standalone `additives` phrase is injected as a parenthetical between two dashes, producing "paste — none — no chemical additives… — then pressed", which reads as a non-sequitur. | Same fix family as H1: make the `{{additives}}` insertion grammatical in-clause, or use a shorter render-ready token here (e.g. "no chemical additives or igniting agents"). |
| H3 | Hardening | Pass 2 — featured-snippet lead / sentence case | `factoryProductionProcess.json` `faq.items[3].a` ("What binder do you use?") renders "**natural tapioca starch** and water — none — no chemical additives…" | The answer opens with a lowercase token at sentence start ("natural tapioca starch…"), so the FAQ answer begins lowercase — a snippet/quality blemish for a Q&A block that is prime AI-citation real estate. Also carries the same H1/H2 additives-fragment issue. | Restructure the template so the sentence does not begin with a raw lowercase token (e.g. "We use {{binder}} and water…"), and resolve the additives-phrase awkwardness as in H1/H2. |
| H4 | Hardening | Pass 2 — headings as questions | Sub-section H2s: "1. Carbonization", "2. Pyrolysis — the chemistry", "3. Kiln operation & cycle", "4. Binder & pressing", "5. Weathering" | Topic-label headings, not question-form. The page already proves it can do question-form (the FAQ block, and `glossary` "What … means" links). Question-phrased H2s win more featured snippets / People-Also-Ask placements. | Offer optional question variants while keeping the numbered process order, e.g. "1. Carbonization — what happens in the kiln?", "5. Weathering — why are briquettes rested before packing?". Minor page, so optional. |
| H5 | Hardening | Pass 2 — Devil's Advocate (minor page → Hardening) | Whole page (no counter-argument section) | No steelman of the strongest industry counter-claim (e.g. "machine-made coconut briquettes burn no cleaner than premium lump charcoal" or "binder presence taints taste"). On a cornerstone this would be a Defect; here it is Hardening. | Optionally add a short "Does the binder affect taste or burn?" steelman+rebuttal, tied to the existing "lights cleanly and burns without an off-taste" claim and the 14-day weathering / no-accelerants facts. |
| H6 | Hardening | Pass 2 — mini-cases (minor page) | Whole page | No Problem→Action→Result mini-case (e.g. a develop-to-spec example with a measurable ash/density target hit). The Develop-to-spec section asserts the capability abstractly. | Optionally add one anonymized P→A→R ("buyer targeted ≤X% ash → recipe adjusted → confirmed by sample at Y%"). Gated on having a real, citable result — do NOT fabricate numbers. |
| H7 | Hardening | Pass 2 — quantified evidence | `sections[2].body` (Kiln) and `qc.body` | Quant is strong in the process steps (8 ovens, 1.5 t/batch, 24 h, 14 days, 400–700°C, 18–24 h). Two qualitative claims lack a number: "temperature stability… keeps fixed carbon… consistent" (no FC % or tolerance) and the QC framework lists checks without target ranges. | Optionally cite the factory fixed-carbon target band or a batch-to-batch tolerance, sourcing it from `quality.specs.fixedCarbonPct` via a token rather than a literal. Honesty-gate on the spec existing. |
| H8 | Hardening | Pass 1 — regulatory currency (cosmetic dating) | `factory.editorial.dateModified` = 2026-06-19 drives `Last updated` and schema `dateModified`; `governance.*.lastReviewed` = 2026-04-25 | The DG/weathering claim is tied to the SP 978 mandatory-from-2026-01-01 event (good), but the page's own `dateModified` (2026-06-19) is a build/editorial stamp not pinned to a regulatory event. Acceptable for a process page, but worth noting the review trail (Apr 25) and the modified date (Jun 19) diverge. | No action required; if a freshness cadence is adopted, align the editorial date bump to a real review of the DG claim rather than a cosmetic touch. |

---

## 3. Claims register

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "carbonizing coconut shells into char… seven stages… every batch passes in-process quality control before packing" | Correct | Low | Matches `factory.processSteps` (7 entries) and `qcSteps` (6 entries). | company.ts (`factory.processSteps`, `factory.qcSteps`) |
| Carbonization "to roughly 400–700°C… mostly fixed carbon… high heat and long, even burn" | Correct | Low | Generic carbonization range; FC rises with carbonization temp (coconut FC ~70–83%). | verified-facts: `guide-research-findings.md` (FC / carbonization-temp finding) |
| Pyrolysis = "thermal decomposition of organic material without flame… converts cellulose and lignin into carbon, releasing wood gas" | Correct | Low | Standard definition; definition-form sentence (good for GEO). | model knowledge (uncontested material science) |
| "We run 8 carbonization ovens, each carbonizing about 1.5 tons of shell per batch on a 24-hour cycle… gas and electric ovens" | Correct | Low | Token-sourced; matches `production.ovens.{count:8, capacityTonsPerBatch:1.5, cycleHours:24}` and `factory.ovenType`. Company operational facts — not externally verifiable, but internally consistent and config-backed. | company.ts (`production.ovens.*`, `factory.ovenType`) |
| Binder = "natural tapioca starch and water… no chemical accelerants / no chemical additives or igniting agents" | Correct | Low | Matches `quality.specs.binder` + `quality.specs.additives`. (Rendering awkwardness flagged H1/H2/H3 — content is correct, prose is clumsy.) | company.ts (`quality.specs.binder`, `quality.specs.additives`) |
| Drying "in temperature-controlled tunnels" for "≈18–24 h" to "low, stable moisture content" | Unverified | Low | Operational figure from `factory.processSteps` (drying step `durationOrTemp`). Config-backed; not in external research. Plausible; no external corroboration needed for an internal process duration. | company.ts (`factory.processSteps`) |
| "weathered under cover for at least 14 days… reactive carbon surface oxidize… self-heating tendency fall… required dangerous-goods safety control for sea freight" | Correct | Medium | Directly corroborated: SP 978 / IMDG 42-24 requires weathered ≥14 days, packed ≤40°C, voluntary 1 Jan 2025 / mandatory 1 Jan 2026. The 14-day figure single-sources from `production.weatheringDays`. | verified-facts: `logistics-import-research-findings.md` line 54; company.ts (`production.weatheringDays`) |
| "6-stage in-process control framework… reference sample retained from every batch" | Correct | Low | Matches `factory.qcSteps.length` (6) and `factory.batchRetention` (true). | company.ts (`factory.qcSteps`, `factory.batchRetention`) |
| "Each order also ships with a batch Certificate of Analysis and an independent third-party lab report" | Correct (per-order, not held-cert) | Low | Per-order report claim — correctly distinct from any held certification; routes documentation detail to `/quality`. Distinction preserved. | company.ts (`quality.testing.*` governs the per-order side); CLAUDE.md honesty-gating rule |
| "develop a recipe toward your spec and confirm it by sample before a production run" | Correct | Low | Gated on `factory.developToSpec` (true). Capability claim, no fabricated metric. | company.ts (`factory.developToSpec`) |
| Authored by Mohamad Sinno / Reviewed by Ahmet Bassam / Fact-checked by Teguh Pranomo | Correct | Low | All from `governance.*`; fact-checker cell honesty-gated. | company.ts (`governance.author/reviewer/factChecker`) |

No claim graded **Error**. No fabricated or uncited claim.

---

## 4. Requires deep research

None mandatory. All hard claims resolve to `company.ts` or the two verified-facts files.

Optional (low priority, only if these become public-facing superlatives):
- `18–24 h` drying duration — currently an internal operational figure with no external corroboration. No action unless it is ever framed as an industry benchmark; then verify against drying-tunnel literature.

No claim needs the deep-research companion prompt before publish.

---

## 5. E-E-A-T / HCU assessment

| # | Criterion | Score /10 | Justification |
|---|---|---|---|
| 1 | Authorship & expertise | 8 | Named author (Owner & Director), reviewer (Charcoal consultant), and QC fact-checker, all config-sourced; roles fit the topic. |
| 2 | Topical authority | 9 | Most internally-linked factory child; deep process coverage with glossary cross-links and up/down/side pillar links. |
| 3 | Technical health & freshness | 7 | Meta table + WebPage/HowTo schema present; `dateModified` 2026-06-19 vs review trail 2026-04-25 diverge (H8). (CWV/Lighthouse out of scope per DrMax boundary.) |
| 4 | Effort | 8 | 7-step overview + 5 detailed sections + named 6-stage QC + retention + develop-to-spec + 6-item FAQ. Substantive, not thin. |
| 5 | Originality | 7 | First-party manufacturing detail (oven count, cycle, weathering) not copy-paste; some material-science passages are standard-textbook. |
| 6 | Citation quality | 6 | Claims are config/research-backed internally but the page surfaces no visible external citations (acceptable for a factory process page; lowers the score vs a guide). |
| 7 | Freshness / timeliness | 7 | DG claim tied to a real 2026 regulatory event; editorial date is a build stamp (H8). |
| 8 | Page intent | 9 | Clear informational intent ("how it's made") with a sensible commercial CTA; no intent bleed. |
| 9 | Structure & readability | 6 | Strong outline (single H1, logical H2 ladder, ordered lists, TL;DR). Pulled down by the `{{additives}}` interpolation garbling three sentences (H1/H2/H3) and lowercase FAQ-answer opener. |
| 10 | Mobile | 8 | `max-w-3xl`, prose-width caps, 44px CTA targets, zero-JS content — meets CLAUDE.md mobile budget (not re-measured). |
| 11 | Format-standard adherence | 8 | Meta table, definition-form TL;DR, numeric data throughout, FAQ visible (not JS-hidden) — strong GEO format. Missing question-form H2s (H4) and mini-case (H6). |
| 12 | Trust & spam signals | 9 | Honesty-gated, no fabricated facts, no keyword stuffing, held-cert vs per-order kept distinct. |

**PQ (mean of 12) = 7.67 / 10.**

**Verdict: Helpful-first.** The page answers a real buyer question ("how is your charcoal made, and can I trust the consistency?") with first-party, config-backed specifics and routes cleanly to quality/logistics evidence. Prognosis: goodClicks — extractable, well-linked, low bounce risk. Not search-first; no thin-content or doorway characteristics.

**Lowest-3 action steps:**
1. **Citation quality (6):** add 1–2 visible authority anchors for the material-science claims (e.g. link the carbonization-temp / FC range to the glossary entry or a cited standard), so the textbook passages carry a verifiable source rather than reading as unattributed.
2. **Structure & readability (6):** fix the `{{additives}}` interpolation (H1/H2/H3) so the supply note, binder section, and binder FAQ answer read as clean grammatical sentences; ensure the FAQ answer does not start with a lowercase token.
3. **Format-standard adherence (8):** convert the five numbered sub-section H2s to optional question form (H4) and add one honesty-gated develop-to-spec mini-case (H6) to lift snippet and AI-answer capture.

---

*End of audit. Diagnose-only — no source files modified. Awaiting approval before any fix.*
