# Content Audit — /logistics/import-to-usa

**Run date:** 2026-06-23 · **Mode:** diagnose-only (report, no edits) · **Passes:** 0,1,2,3,5 (Pass 6 OFF) · **Cornerstone:** YES

---

## 1. Manifest (Pass 0)

| Field | Value |
|---|---|
| Target route | `/logistics/import-to-usa` |
| Pillar | Logistics |
| Source page | `src/pages/logistics/import-to-[country].astro` (dynamic route; USA = `key:'usa'`) |
| Built HTML | `dist/logistics/import-to-usa/index.html` (resolves to one page — OK) |
| Layout | `BaseLayout.astro` (`type="article"`, `includeOrgSchema={false}`) |
| Data object | `company.logistics.imports.usa` (in `src/data/company.json` L665–700; typed by `ImportCountry` in `src/config/company.ts` L317–343) |
| Ports/transit | `company.commercial.transitTimes` rows where `country==="USA"` (company.json L163–164: USLAX 25–32d, USNYC 35–45d) |
| Lead time | `company.commercial.leadTime` (14–21d production) |
| Author/reviewer/fact-checker | `company.governance.*` → Mohamad Sinno (Owner & Director) / Ahmet Bassam (Charcoal Expert / Consultant) / Teguh Pranomo (Quality Control Manager) — all from config, none hardcoded |
| i18n namespaces | `en.logisticsImportUsa`, `en.logisticsImportCommon`, `en.logisticsCommon` |
| Components | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `KeyFactsBox`, `FAQSection`, `CTABanner`, `MaybeLink`, `ExternalLink` |
| Schema emitter | `src/lib/schema/logisticsClusterPage.ts` (shared by all 7 logistics cocoon children) |
| Schema types emitted | `WebPage`, `FAQPage`, `TechArticle`, `HowTo` (+`HowToStep`×3), `BreadcrumbList` (from `<Breadcrumbs>`), `Person`×2 |
| Read time rendered | 5 min · Last updated rendered: `2026-06-15` (= `data.lastVerified`, correct) |

**Pass 0 stop-conditions:** none triggered. Page resolves to exactly one route. Build is pre-supplied (not re-run per instructions).

**Cornerstone GEO meta table:** PRESENT and complete — `ArticleMeta` renders Authored by / Reviewed by / Fact-checked by / Last updated / Reading time. No defect here.

---

## 2. Severity-tiered TODO list

### BLOCKERS

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| B1 | Blocker | Pass 1 — Schema architecture: "FAQPage emits ONLY at `/faq` globally" | JSON-LD `@graph` in `dist/.../index.html` (built from `logisticsClusterPageSchema`, `src/lib/schema/logisticsClusterPage.ts` L87–90); FAQ Q/As at `logisticsImportUsa.json` `faq.items` | A `FAQPage` node is emitted on a non-`/faq` route. The methodology's Pass 1 rule is literal: FAQPage may emit only at `/faq`; a FAQPage anywhere else = misplaced. Here it duplicates the on-page FAQ markup that already exists in HTML, on a route that is not the global FAQ home. NOTE FOR THE HUMAN: this is a **systemic cocoon decision**, not a one-page slip — the shared emitter adds `FAQPage` to *all seven* logistics children. The fix is a policy call (either (a) confirm an explicit site exception to the "/faq-only" rule and update the audit ruleset, or (b) strip `FAQPage` from `logisticsClusterPageSchema` and keep only the HTML FAQ + `TechArticle`/`WebPage`). Do NOT silently edit; route to the schema-architecture owner. Flagged as a Blocker because the audit rule classifies misplaced FAQPage as a violation. |

*No other Blockers found.* Specifically NOT blockers (verified): no hardcoded company fact in page or i18n (port, brand, MOQ, IDSRG, weathering days, names all flow through tokens / `governance.*` / `commercial.*` — grep of `logisticsImportUsa.json` + `logisticsImportCommon.json` for literal facts returned none); pillar up-link present in first paragraph (`MaybeLink href="/logistics"`, live); pillar links down (`logistics/index.astro` L115 → `/logistics/import-to-usa`; import-guides hub card); ≥1 incoming permanent link (logistics pillar + import-guides hub + sibling guides) → no orphan; all duty/fee figures live in the source-linked data layer with `sourceUrl`, not as page literals; honesty-gating intact (`vat`/`preference` null for USA correctly omit those blocks; `hasFact()` guards every optional cell).

### DEFECTS

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 2 — Devil's Advocate (missing on cornerstone) | Whole page; would belong after the "Duties & fees" / "FDA" sections | No steelman / counter-argument section. A cornerstone page must state the strongest industry counter-case and answer it with data. The obvious steelman here: *"the duty math says ~10% today, but a buyer could reasonably conclude the US lane is too volatile/FDA-blocked to attempt."* There is no section that states that objection and rebuts it. | Add (as a future content task) a short "Is the US lane worth it given the tariff flux and FDA exposure?" section: state the counter-argument (legal-flux + PMTA gate), then the data-grounded response (MFN base is Free; the volatile layer is a contested ~10% surcharge with a statutory sunset; FDA scope is a compliance workflow, not a ban). Describe only — do not draft into repo. |
| D2 | Defect | Pass 2 — Mini-cases (≥1–2 Problem→Action→Result on cornerstone) | Whole page | No Problem→Action→Result mini-case with a measurable result. The page is reference-grade but carries zero worked buyer scenario beyond the abstract landed-cost skeleton. | Add 1–2 mini-cases, e.g. "Buyer mis-declared as 4401 fuel wood → reclassified to 4402.20 → seizure risk removed / entry cleared," or an ISF-timing case with the $5,000/$10,000 penalty figures already in `entryNotes`. Numbers already exist in config; the case structure is what's missing. Describe only. |
| D3 | Defect | Pass 2 — Headings as questions / featured-snippet lead | All section `<h2>`s: "HTS classification", "Duties & fees", "Landed-cost worked example", "The entry process", "Dangerous-goods handling at US ports", "FDA: hookah charcoal as a tobacco-product component", "Production and transit lead time", "US ports & routing" | Section headings are noun-phrase labels, not the question form the buyer types. AI engines and snippet extraction favor question-form H2s with a 1–2 sentence direct answer underneath. (The FAQ block IS question-form and well-built — this defect is only about the body sections.) | Supply question variants alongside (do not rewrite prose): "What HTS code applies to coconut charcoal in the USA?", "What duty and fees apply?", "How does US customs entry work?", "How is UN 1361 handled at US ports?", "Is hookah charcoal FDA-regulated?", "How long does production and transit take?", "Which US ports do you ship to?". Each already has a near-snippet lead sentence; only the heading needs the question form. |

### HARDENING

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 1 — Regulatory currency / Pass 3 routing | "Duties & fees" duty table + "How the reciprocal layer moved" (`company.json` `usa.dutyLayers` L674, `usa.dutyHistory` L680) | The entire US reciprocal-tariff narrative (Section 122 10% surcharge; IEEPA EO 14257 +32%; US–Indonesia ~19% agreement Feb 2026; Supreme Court voiding IEEPA 20 Feb 2026; CIT strike 7 May 2026; sunset ~24 Jul 2026; Section 301 opened 11 Mar 2026) is **fast-moving and NOT in any verified-facts source** — the logistics research doc covers only UK/DE/SA/RU, and USA was migrated in separately. `lastVerified` is 2026-06-15 (8 days stale at audit), and the sunset date (24 Jul 2026) is ~1 month out, after which this stack changes again. Dating is event-tied (good), but the claims need an external recheck before the sunset. | Keep the existing legal-status caveats (they are well-built and honest). Route the duty-stack claims to deep research (see §4) and set a calendar recheck for ~20 Jul 2026 (pre-sunset). No content change required now beyond verification. |
| H2 | Hardening | Pass 2 — Anti-bloat / duplication | "HTS classification" body (`hts.body`) vs the "Note" line (`htsNotes`) vs FAQ Q1 | The "exact 10-digit code does not change the base rate; a CBP binding-ruling request would settle it; confirm with your broker" thesis is stated three times near-verbatim (section body, Note label, FAQ answer). | Compress: let the section body carry the full statement once; reduce the "Note" to the binding-ruling pointer only; the FAQ may keep its standalone answer (FAQs are intentionally self-contained for snippet extraction). Describe only. |
| H3 | Hardening | Pass 2 — Section coherence / placement | "How the reciprocal layer moved" `<h3>` sits inside the "Duties & fees" `<h2>`, after the table | The history paragraph (`dutyHistory`) restates the table's Section 122 row in prose plus four superseded layers. Useful for provenance, but it partly duplicates the table's "Legal status" cell. | Optionally move the history under a collapsible-free "Provenance" sub-label and trim the overlap with the table's status cell. Minor. |
| H4 | Hardening | Pass 2 — Quantified evidence | "Dangerous-goods handling at US ports" (`dgHandling.body`) | The DG section is a pure hand-off to the un-1361 / dg-regulation pages with no on-page number (no SP 978 ≥14-day window, no Class 4.2 restatement, no EmS). The lead-time section *does* carry the 14-day weathering figure, so the data exists nearby. | Add one numeric anchor (e.g. the ≥14-day weathering window or PG III default) so the DG section is independently extractable, then keep the link-out. Describe only. |

---

## 3. Claims register (Pass 3)

Verification priority: `company.ts`/`company.json` > verified-facts docs (`logistics-import-research-findings.md` covers UK/DE/SA/RU only — **USA absent**; `guide-research-findings.md` not USA-import-specific) > model knowledge.

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| HTS heading 4402; candidates 4402.20.00.00 ("of shell or nut") and 4402.90.01.00 ("other"), both Free base duty | Correct | Low | Consistent with config + the research doc's cross-market 4402.20 finding (4402.20 is the precise subheading; both Free at MFN base is plausible for the US schedule). | company.json `usa.htsCandidates`; corroborated by research doc UK/DE/RU C1 (4402.20 precedence) |
| Legacy CBP ruling N306942 (2014) cited 4402.90.0000 pre-2022 renumbering | Unverified | Low | Specific ruling number + date — not in any verified-facts file. Plausible; route to deep research. | company.json; model |
| Base MFN duty = Free | Correct | Low | Heading 4402 is Free at MFN base across the markets researched; US schedule consistent. | company.json; research doc (analogous) |
| Section 122 balance-of-payments surcharge = 10%, "Struck by the CIT 7 May 2026 (party-specific, on appeal), statutory sunset ~24 Jul 2026" | Unverified | High | The headline duty number of the page. Not in any verified-facts source (research doc is UK/DE/SA/RU only). Fast-moving litigation. Page honestly flags it contested, but the figure and the court dates need an external check before publication relies on them. | model only |
| Reciprocal history: +32% IEEPA EO 14257 (Apr 2025) → ~19% US–Indonesia agreement (Feb 2026) → IEEPA voided by Supreme Court 20 Feb 2026 → 10% Section 122 (eff. 24 Feb 2026) → CIT strike 7 May 2026 → Section 301 opened 11 Mar 2026 | Unverified | High | A dense chain of dated, high-stakes regulatory events, none in a verified-facts file. Each date is independently checkable and material. | model only |
| MPF 0.3464%, min $33.58 / max $651.50 (FY2026) | Unverified | Medium | Rate form is correct (MPF is ad valorem with a floor/cap); exact FY2026 figures need confirmation against the eCFR/CBP schedule. | company.json; model |
| HMF 0.125% (vessel imports) | Correct | Low | 0.125% is the long-standing statutory HMF rate. | model (well-established) |
| ISF "10+2" filed ≥24h before lading; 10 data elements listed; penalty $5,000/violation up to $10,000/filing | Correct | Low | Matches CBP ISF rule; element list and penalty structure are standard. | company.json `entryNotes`; model |
| FDA Deeming Rule 81 FR 28974 (10 May 2016; effective 8 Aug 2016); hookah charcoal a regulated tobacco-product component when it maintains combustion of waterpipe tobacco (cite 81 FR 28974 at 29019); PMTA required; not grandfathered pre-15 Feb 2007; Import Alert 98-06 | Unverified (high plausibility) | Medium | Citations are precise and consistent with the FDA deeming framework, but the FR page-pin (at 29019) and the "component or part" scope for charcoal specifically should be externally confirmed given the legal weight. Page correctly frames as "regulatory information, not legal advice." | company.json `usa.countryAgency`; model |
| No AD/CVD order for Chapter 44 charcoal from Indonesia in the ITA database | Unverified | Medium | Negative claim ("none found"); honestly hedged with "confirm with your broker." Route to deep research to confirm currency. | company.json `usa.adcvd`; model |
| Transit USLAX 25–32d, USNYC 35–45d; production 14–21d; indicative 39–66d order-to-arrival | Correct | Low | Computed from `commercial.transitTimes` + `leadTime`; internally consistent. | company.json (commercial) |
| Trade term "FOB Tanjung Emas (Semarang) · CIF/CFR on request"; MOQ "18 tons (one 20ft container)"; SP 978 weathering ≥14 days; POL IDSRG/Semarang | Correct | Low | All resolved from company config via tokens — no literals in page/i18n. | company.json (commercial / dg / portOfLoading) |

---

## 4. Requires deep research

Route the following to the deep-research companion prompt **before the next publish cycle, and certainly before the ~24 Jul 2026 sunset** (all USA-import-specific; none covered by the existing UK/DE/SA/RU research doc):

| Claim | Why | Markets |
|---|---|---|
| US Section 122 balance-of-payments surcharge = 10%, CIT strike 7 May 2026 (party-specific, on appeal to Fed. Circuit), statutory sunset ~24 Jul 2026 | Headline duty figure; fast-moving litigation; not in any verified-facts file; sunset imminent | USA |
| Full reciprocal-tariff history chain (IEEPA EO 14257 +32% Apr 2025 → US–Indonesia ~19% Feb 2026 → Supreme Court voiding IEEPA 20 Feb 2026 → Section 122 eff. 24 Feb 2026 → Section 301 opened 11 Mar 2026) | Dense dated chain, each event material and independently checkable; model-only | USA |
| MPF FY2026 exact figures (0.3464%; min $33.58 / max $651.50) | Annual CBP adjustment; verify against eCFR/CBP FY2026 schedule | USA |
| CBP ruling N306942 (2014) reference and the post-2022 4402 renumbering | Specific legacy-ruling citation; confirm number/scope | USA |
| FDA: hookah charcoal as "component or part" of a tobacco product, 81 FR 28974 at 29019; PMTA scope; Import Alert 98-06 currency | High legal weight; pin-cite and scope should be externally confirmed | USA |
| AD/CVD: confirm no live order on Chapter 44 charcoal from Indonesia (ITA/ACCESS) | Negative claim; verify currency | USA |

---

## 5. E-E-A-T / HCU assessment (Pass 5)

| Criterion | Score /10 | Justification |
|---|---|---|
| Authorship & expertise | 8 | Named author/reviewer/fact-checker triple from `governance.*`, with roles; rendered in the top meta table. |
| Topical authority | 9 | Deep, specific US-import coverage (HTS candidates, layered duty stack, ISF 10+2, FDA deeming) well beyond a generic page. |
| Technical health & freshness | 7 | `lastVerified` 2026-06-15 (8 days stale at audit); event-tied dating, but volatile duty layer needs recheck before sunset. (CWV/Lighthouse = DrMax scope, not measured here.) |
| Effort | 9 | High — layered table with legal-status flags, provenance history, worked landed-cost skeleton, source links on most cells. |
| Originality | 8 | Genuinely original synthesis of a fast-moving US tariff situation; not boilerplate. |
| Citation quality | 8 | `ExternalLink` source links on HTS, duty layers, entry; FDA `countryAgency` items have empty `sourceUrl` (gated to no source-link, honest) — minor gap given legal weight. |
| Freshness / timeliness | 7 | Strong on dated events; let down by imminent sunset (24 Jul 2026) making the headline layer time-bombed. |
| Page intent | 9 | Squarely serves "how do I import coconut charcoal to the USA" — mechanics, not sales fluff; commercial case correctly deferred to the market page. |
| Structure & readability | 8 | Clean H2/H3 outline, no skipped levels, KeyFacts box, definition-form lead in KeyFacts ("Classification, headline duty, and who clears the cargo"). Headings are labels not questions (D3). |
| Mobile | 8 | `max-w-3xl`/`max-w-prose`, responsive grid, `overflow-x-auto` on the duty table; budgets are DrMax scope. |
| Format-standard adherence | 7 | GEO meta table ✔, FAQ Q&A ✔ — but missing Devil's Advocate (D1) and mini-cases (D2), both required on cornerstone. |
| Trust & spam signals | 9 | Honest legal-flux flags, "not legal advice" disclaimer, no per-ton price, no fabricated certainty; honesty-gating intact. |

**PQ (arithmetic mean of 12):** (8+9+7+9+8+8+7+9+8+8+7+9)/12 = **8.08 / 10**

**Verdict:** **Helpful-first.** The page is built to inform a real importer, not to rank-bait; goodClicks prognosis is strong (a buyer leaves with the HTS code, the duty mechanics, the entry sequence, and the FDA caveat). Two structural cornerstone gaps (no Devil's Advocate, no mini-case) and the question-form heading gap keep it from top-decile.

**Lowest-3 action steps:**
1. **Freshness (7) / regulatory currency:** re-verify the Section 122 + reciprocal-tariff stack via deep research before the ~24 Jul 2026 sunset and bump `usa.lastVerified` to a real recheck event (H1, §4).
2. **Format-standard adherence (7):** add the missing cornerstone Devil's Advocate steelman (D1) and ≥1 Problem→Action→Result mini-case (D2) — config already holds the numbers (ISF penalties, weathering window, transit days) to populate them.
3. **Citation quality (8) / FDA:** confirm and, where possible, attach a public `sourceUrl` to the FDA `countryAgency` items (currently empty, so no source-link renders) given the legal weight of the PMTA / Import Alert 98-06 claims.

---

*End of audit. Diagnose-only — no files other than this report were created or modified.*
