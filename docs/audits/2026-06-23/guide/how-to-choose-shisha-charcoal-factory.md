# Content Audit — /guide/how-to-choose-shisha-charcoal-factory

**Run date:** 2026-06-23 · **Mode:** Diagnose-only (report, no fixes) · **Cornerstone:** YES
**Passes run:** 0, 1, 2, 3, 5 (Pass 6 OFF). Technical mechanics (canonical/hreflang/JSON-LD validity/robots/sitemap/headers/CWV) OUT OF SCOPE.

---

## 1. Manifest

| Item | Value |
|---|---|
| Page file | `src/pages/guide/how-to-choose-shisha-charcoal-factory.astro` |
| Layout | `src/layouts/BaseLayout.astro` (`type="article"`, `includeOrgSchema={false}`, `prefetch=['/quality/certifications','/contact']`) |
| Components rendered | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `TableOfContents`, `MaybeLink`, `ExternalLink`, `KeyFactsBox` (packaging), `Figure` (packaging), `FAQSection`, `CTABanner` |
| i18n source | `src/i18n/en/guide.json` → `chooseFactory` (+ `common.metaBlock`) |
| Schema builder | `src/lib/schema/guideArticlePage.ts` |
| company.ts fields consumed | `governance.{author,reviewer,factChecker}.{name,role,lastReviewed}`; `guide.editorial.howToChooseFactory.{datePublished,dateModified}`; `quality.testing.thirdPartyLabs` (→ `thirdPartyLabsList`); `logistics.dg.{voluntaryFrom,carriersAudited}`; `certifications.iso9001.standard`; `certifications.halal.{certified,body}`; `production.{capacityTonsPerMonth,lines}`; `whatsapp.presetMessages.salesGeneral`; `waLinkFor('salesGeneral')` |
| Pillar / placement | Pillar = **guide**. Lead article (absorbs "suppliers-compared" intent). Siblings: `/guide/coconut-vs-bamboo-vs-wood-charcoal`, `/guide/how-to-start-your-own-brand` (muted), `/guide/private-label-options` (muted). |
| Up-link present | YES — first `<p>` links to `/guide` ("shisha charcoal buyer's guide") + Related section links `/guide`. |
| Incoming link from permanent structure | YES — `/guide` hub (`guide.json` hub.children.chooseFactory + hub.related) and sibling `coconut-vs-bamboo-vs-wood` Related list both link down to this page; `/guide` is in `LIVE_ROUTES`. Not an orphan. |
| Schema types emitted (built HTML, line 110) | `["WebPage","Article"]`, `Person`×2 (author + reviewer), **`FAQPage`**, `DefinedTerm`×3 (UN 1361, Self-Heating Test N.4, SP 978), `ItemList` (#checklist, 7 items). BreadcrumbList emitted separately by `<Breadcrumbs>`. Org schema suppressed (`includeOrgSchema={false}`). |
| Build artifact | `dist/guide/how-to-choose-shisha-charcoal-factory/index.html` present and complete (read-only; build not re-run). |

**Cornerstone-rule quick status:** GEO meta table = PRESENT (Authored by / Reviewed by / Fact-checked by / Last updated / Reading time all render — fact-checker gated on real name "Teguh Pranomo", which exists). FAQ Q&A form = PRESENT (3 Q/As). Devil's-Advocate steelman = **ABSENT**. Problem→Action→Result mini-case(s) = **ABSENT**.

---

## 2. Severity-tiered TODO list

### Tier 1 — Blockers

| ID | Tier | Pass + rule | Exact location | What is wrong | Recommended fix (described, not executed) |
|---|---|---|---|---|---|
| B-01 | Blocker | Pass 1 — Schema architecture: "FAQPage emits ONLY at `/faq` globally" | `src/lib/schema/guideArticlePage.ts` lines 110–112 (`faqPage` pushed into `@graph`); rendered in `dist/.../index.html` line 110 as `"@type":"FAQPage"`. Page invokes it via `schema = guideArticlePageSchema({ … faq: faqItems … })` (source lines 100–119). | A `FAQPage` JSON-LD node is emitted on this guide page. The audit's global rule states FAQPage schema is permitted only at `/faq`; the on-page FAQ here should render as visible Q&A content WITHOUT the FAQPage entity (its canonical schema home is `/faq`). This is duplicated/misplaced FAQPage markup. | In the schema builder (or at this call site), stop emitting the `FAQPage` node for guide articles — keep the visible `<FAQSection>` Q&A (GEO value is in the rendered text, not the JSON-LD). If a richer-result FAQ entity is desired sitewide, that decision belongs to the `/faq` page only. NOTE: this rule is enforced by the audit charter; confirm with the schema owner before changing, since `guideArticlePage.ts` deliberately wires `mainEntity → #faq`. Do not edit in this diagnose-only run. |

> Honesty-gating: PASS. Every B1 "how we meet each criterion" line is gated on a real `company.ts` fact (`hasFact(thirdPartyLabs)`, `hasFact(dg.voluntaryFrom)`, `hasFact(iso9001)`, `halal.certified && hasFact(halalBody)`, `hasFact(capacityTonsPerMonth)`, `hasFact(dg.carriersAudited)`); the samples line is fact-free generic CTA copy (no claim). Held-cert (ISO 9001, halal MUI) vs per-order report (COA / third-party lab / SHT) distinction is preserved in both the checklist (criterion `coa`: "ISO 9001 certifies the management system, not the product") and B1. No Blocker here.
> Hardcoded company facts: PASS — no literal company fact in the page or `guide.json`. All facts arrive through `companyTokens/qualityTokens/logisticsTokens` from `company.ts` (capacity 350, lines 4, labs, carriers, ISO 9001:2015, halal MUI, MOQ/Incoterms/port via `b2Facts`). NIB appears only as a buyer-side red flag instruction ("Business registration (Indonesian NIB) that cannot be verified") — a label, not the company's own NIB value. No Blocker.

### Tier 2 — Defects

| ID | Tier | Pass + rule | Exact location | What is wrong | Recommended fix (described, not executed) |
|---|---|---|---|---|---|
| D-01 | Defect | Pass 2 — Devil's Advocate (cornerstone) | After the thesis sections (`#checklist` + `#how-we-meet`), before `#eu-reach`. Source lines 199–243; headings list in built HTML. | No steelman / counterargument section. A cornerstone guide should state the strongest industry counterargument to its own thesis (e.g. "a checklist this strict prices out small but legitimate factories" or "buyers routinely skip third-party COAs and accept supplier self-testing to cut cost/time"), when that view holds, and a data-grounded rebuttal. Missing on a cornerstone = Defect. | Add one H2 (question form, e.g. "Is this level of due diligence overkill for a first order?") that concedes the real counter-position, bounds when it is defensible (small trial volumes, trusted referral), then rebuts with the concrete downside (UN 3088 / UN 1361 mis-declaration fire-loss exposure; container rejection by the 4 carriers not accepting — already named in `carriersNotAccepting`). Pull the rebuttal numbers from `logistics-import-research-findings.md` / `guide-research-findings.md`; do not invent figures. |
| D-02 | Defect | Pass 2 — Headings as questions / featured-snippet lead | H2s: "Commercial terms at a glance" (`#commercial-terms`), "The factory-selection checklist" (`#checklist`), "How we meet each criterion" (`#how-we-meet`), "EU buyers: REACH & CLP in brief" (`#eu-reach`), "Questions to ask a supplier" (`#questions`), "Red flags & due diligence" (`#red-flags`). Source lines 186–262. | 6 of 7 body H2s are label/statement form, not the question a buyer types. Only the FAQ block uses questions. This weakens featured-snippet and AI-citation eligibility — the page's strongest extractable answers (DG must be UN 1361; COA vs ISO 9001) are not sitting under a matching interrogative heading outside the FAQ. | Reframe section H2s (or add a question-form H3 directly under each) to mirror buyer queries — e.g. "What commercial terms should a serious factory state up front?", "What do you verify before choosing a charcoal factory?", "What must EU importers know about REACH and CLP?" — and ensure the first sentence under each is a self-contained answer. The `KeyFactsBox` definition and `criteria.intro` already supply most lead sentences; this is a heading-phrasing change, not new prose. |

### Tier 3 — Hardening

| ID | Tier | Pass + rule | Exact location | What is wrong | Recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H-01 | Hardening | Pass 2 — Mini-cases (cornerstone) | Whole article; no Problem→Action→Result block anywhere (source 175–290). | Cornerstone pages should carry ≥1–2 Problem→Action→Result structures with a measurable result. None present. The page is well-structured as a checklist but carries no narrative proof-of-outcome. | Add 1 short mini-case (Problem: buyer received self-reported lab data only → Action: required per-batch SGS/Intertek COA + sample test → Result: measurable, e.g. ash variance caught before a container shipped). Use only outcomes you can source or attribute generically; do not fabricate a named customer or a specific number. |
| H-02 | Hardening | Pass 1 — Regulatory currency (content level) | `#how-we-meet` B1 `dg` line (source lines 359–363; `guide.json` chooseFactory.b1.dg): "adopted SP 978 compliance voluntarily — ahead of the IMDG Amendment 42-24 mandate." | As of run date 2026-06-24 the mandate is in force (`dg.mandatoryFrom = 2026-01-01`). "Ahead of the mandate" is historically true (voluntary from `2025-01-01`), but the present-tense framing reads as if the mandate is still future. Currency drift, not a factual error. | Re-tense to past/achievement framing ("adopted SP 978 a year before it became mandatory on the 2026-01-01 IMDG 42-24 deadline"), driving the date off `dg.voluntaryFrom` / `dg.mandatoryFrom` so it stays self-correcting. No fact value to hardcode. |
| H-03 | Hardening | Pass 1 — Regulatory currency / review date | Page-wide. `ArticleMeta` shows "Last updated" = `guide.editorial.howToChooseFactory.dateModified` = 2026-06-20 (also `datePublished` 2026-06-20). | The regulatory content (UN 1361 / SP 978 / IMDG 42-24 / REACH / CLP) carries a visible last-updated date — good. But `datePublished === dateModified` and both equal a build-window date; there is no per-claim review anchor tying the date to a regulatory event. Minor freshness-cadence weakness, not wrong. | When the regulatory facts are next re-verified, bump `dateModified` only on a real event (e.g. IMDG 43-26 publication, an ECHA C&L update), not as a cosmetic annual bump. No edit now. |
| H-04 | Hardening | Pass 2 — Anti-bloat / coverage | `#eu-reach` body2 (source line 238; `eu.body2`). | The OR / CLP paragraph is dense and partly restates body1's "importer bears the obligation" point. Compressible without losing facts; the H251/H228 self-classification detail also carries unverified specificity (see C-01 / deep-research). | Tighten body2 to the OR mechanism + the one-month C&L notification, and let the buyer-confirm box carry the hedge. Keep EC 240-383-3 / CAS 16291-96-6 (verified). |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "Since IMDG Amendment 42-24 and Special Provision 978, charcoal must be declared UN 1361, Class 4.2, and the self-heating test (UN N.4) no longer exempts it." (criteria `dg`, FAQ, `b1.dg`) | Correct | High | SP 978 removed the former SP 925 exemption; UN N.4 now used for packing-group screening, not exemption. | guide-research-findings.md B3 (line 80) |
| "P002 packaging (Packing Group III: ≤40 °C at packing, ≥30 cm headspace, prior weathering)" | Correct | Medium | Matches PG III conditions in research findings. | guide-research-findings.md B3 (line 80) |
| "ASTM D1762-84(2021) is charcoal-specific" + ISO 18122 (ash) / 18123 (volatile) / 18134-1 (moisture) / 18125 (calorific) series; "Coal and coke standards (ISO 1171, ASTM D3172/D3175) are the wrong material class." | Correct | Medium | All standard numbers and the coal/coke material-class warning verified. | guide-research-findings.md B (lines 69–77) |
| "ISO 9001 certifies the management system, not the product" (criteria `coa`, FAQ, takeaway) | Correct | Low | Accurate; reinforces held-cert vs product-evidence distinction. | Model knowledge / consistent w/ site |
| "halal certification (in Indonesia: BPJPH issues the certificate under Law 33/2014; LPPOM MUI audits)" (criteria `coa`) | Correct | Low | BPJPH/Law 33/2014/LPPOM-MUI division accurate. Company holds halal (body "MUI"). | company.ts `certifications.halal`; model knowledge |
| "Charcoal is not REACH-exempt (substance identity EC 240-383-3 / CAS 16291-96-6) … EU importer bears REACH registration once it imports one tonne or more per year." | Correct | Medium | EC/CAS IDs, non-exempt status (not coal/coke, not Annex IV/V), ≥1 t/y importer obligation all verified. | guide-research-findings.md B-EU-1 (line 96) |
| "may appoint an EEA-established Only Representative (OR) so the importer becomes a downstream user." | Correct | Low | Verified OR mechanism. | guide-research-findings.md B-EU-1 (line 96) |
| "Under CLP … commonly as a self-heating solid (Self-heat. 1, H251) and often also Flam. Sol. 2, H228 … notification due within one month of placing it on the market." | **Unverified** | Medium | Self-classification is plausible and page hedges ("commonly", "often also") + buyer-confirm box, but the exact ECHA C&L notifier breakdown (H251 vs H252; H228 prevalence) could not be retrieved live (ECHA bot-blocked). Route to deep research; do NOT assert a specific classification as fact. | guide-research-findings.md notes (lines 105, 129) — flagged "needs confirmation" |
| "Every container ships with a third-party laboratory report (Carsurin, Beckjorindo, SGS) alongside our Certificate of Analysis." (`b1.thirdPartyLab`) | Correct | Low | Backed by `quality.testing.thirdPartyLabs` + `testReportsProvided` (perOrder). Honesty-gated. | company.ts `quality.testing.thirdPartyLabs` |
| "Capacity is 350 tonnes per month across 4 production lines, on a [lead time] lead time." (`b1.capacity`) | Correct | Low | `capacityTonsPerMonth=350`, `production.lines=4`. Honesty-gated. | company.ts `production` |
| "We ship UN 1361 with audited carriers: MSC, Maersk, CMA CGM, Emirates, Asyad." (`b1.carriers`) | Correct | Low | Matches `dg.carriersAudited`. (Note: `dg.carriersNotAccepting` Hapag-Lloyd/ONE/Cosco/ZIM not surfaced here — fine for this page.) | company.ts `logistics.dg.carriersAudited` |
| "adopted SP 978 compliance voluntarily — ahead of the IMDG Amendment 42-24 mandate." (`b1.dg`) | Correct (currency drift) | Low | Historically true (`voluntaryFrom=2025-01-01` < `mandatoryFrom=2026-01-01`), but present-tense reads as future-mandate as of 2026-06-24. See H-02. | company.ts `logistics.dg` |
| "Charcoal … mis-declared as UN 3088 — it must be UN 1361." (red flag) | Correct | Medium | UN 3088 (self-heating organic solid N.O.S.) mis-declaration is a documented charcoal fraud pattern; UN 1361 is the correct entry. | guide-research-findings.md B3; model knowledge |
| Outbound authority targets: CINS Sept-2024 charcoal guidance PDF; ASTM D1762-84(2021) store page; ECHA substanceinfo/100.036.697 | Correct | Low | All three URLs match the cited sources in research findings. | guide-research-findings.md Sources (lines 116–119, 134–136) |

---

## 4. Requires deep research

| Claim | Why | Markets |
|---|---|---|
| CLP self-classification of charcoal: "Self-heat. 1, H251" and "often also Flam. Sol. 2, H228", and "C&L notification due within one month of placing on the market." | Exact ECHA C&L Inventory notifier breakdown (how many notifiers chose H251 vs H252; H228 prevalence) could not be retrieved live (ECHA bot-blocking, per guide-research-findings.md lines 105/129). The page hedges correctly, but the specific hazard codes are stated; confirm on ECHA CHEM (EC 240-383-3) before this is treated as settled fact. | Germany, UK (post-Brexit GB-CLP differs), EU/EEA importers |
| "the EU importer … bears REACH registration once it imports one tonne or more per year in aggregate" tonnage-band data requirements (Annex VII–X). | Verified in findings as of 2026-06-20, but REACH band thresholds/CSR triggers should be re-confirmed against current ECHA guidance at publish time (regulatory currency). | Germany, EU/EEA |

---

## 5. E-E-A-T / HCU assessment

| Criterion | Score /10 | Justification |
|---|---|---|
| Authorship & expertise | 9 | Named author (Mohamad Sinno, Owner & Director), reviewer (Ahmet Bassam, Consultant), fact-checker (Teguh Pranomo, QC Manager) — all in GEO meta table and Person×2 schema. First-party factory voice on a sourcing topic. |
| Topical authority | 9 | Deep, specific: 7-criterion checklist with verify-methods, DG/UN 1361, REACH/CLP, named test standards. Sits in a tight guide cocoon with up/down links. |
| Technical health & freshness | 8 | Out-of-scope to re-measure; built HTML clean, dates present. -1 for `datePublished===dateModified` cosmetic-window dating (H-03) and present-tense mandate drift (H-02). |
| Effort | 9 | Visibly high effort: config-gated proof rows, curated outbound authorities, verify-how methods per criterion, red-flags + questions lists. |
| Originality | 8 | Distinct first-party angle (how *this* factory meets each criterion) beyond a generic checklist; -1 because the centerpiece is still a checklist archetype without a mini-case to differentiate (H-01). |
| Citation quality | 9 | 3 high-authority outbound sources (CINS/IG P&I, ASTM, ECHA), all matching the research-findings source list; fires `outbound_click`. |
| Freshness / timeliness | 7 | Dated 2026-06-20 and regulatory content is current, but no per-claim review anchor and one present-tense regulatory phrasing now reads stale (H-02/H-03). |
| Page intent | 9 | Cleanly informational/commercial-investigation; correctly routes buy-now intent to WhatsApp/contact/products without becoming a sales page. Matches the lead-article brief. |
| Structure & readability | 8 | Strong outline, TOC, KeyFactsBox, definition-form lead sentences. -2 because 6/7 body H2s are not question-form (D-02), weakening snippet capture. |
| Mobile | 9 | `max-w-3xl`, responsive `<dl>` (sm:2-col / md:5-col), zero-JS content, 44px-class CTAs via shared HeroSection. (CWV not re-measured — references CLAUDE.md budgets.) |
| Format-standard adherence (cornerstone) | 6 | GEO meta table ✓, FAQ Q&A ✓, definition sentences ✓, numeric data ✓. BUT missing Devil's-Advocate (D-01) and missing Problem→Action→Result mini-case (H-01) — two named cornerstone formats absent. |
| Trust & spam signals | 9 | Honesty-gating throughout; held-cert vs per-order-report distinction preserved; no fabricated claims; buyer-confirm hedge on EU legal guidance; no hardcoded facts. -1 only for the unverified CLP hazard-code specificity (C-01). |

**PQ (arithmetic mean of 12):** (9+9+8+9+8+9+7+9+8+9+6+9) / 12 = **8.33 / 10**

**Verdict:** **Helpful-first.** The page answers the buyer's real question (how to vet a factory) with extractable, sourced, first-party-proofed content and routes transactional intent outward rather than hard-selling. goodClicks prognosis: strong — a buyer arriving on "how to choose a shisha charcoal factory" gets a usable checklist plus verifiable proof. badClicks risk is low; the main leakage is snippet/AI-citation capture lost to statement-form H2s.

**Lowest-3 action steps:**
1. **Format-standard adherence (6)** — Add the Devil's-Advocate steelman H2 (D-01) and one Problem→Action→Result mini-case (H-01); these are the two missing cornerstone formats and the single biggest PQ lever.
2. **Freshness/timeliness (7)** — Re-tense the "ahead of mandate" DG line to achievement framing driven off `dg.voluntaryFrom`/`mandatoryFrom` (H-02), and tie future `dateModified` bumps to real regulatory events, not the build window (H-03).
3. **Structure & readability (8)** — Convert the 6 statement-form body H2s to buyer-question form (or add question-form H3 leads) with a self-contained answer sentence directly beneath each (D-02), to recover featured-snippet/AI-citation eligibility outside the FAQ.

---

*End of report. Diagnose-only: no site files were modified. Separately, B-01 (FAQPage on a non-`/faq` page) is asserted under the audit charter's global FAQPage rule but is wired deliberately in `guideArticlePage.ts` (`mainEntity → #faq`) and on the sibling `coconut-vs-bamboo-vs-wood` page — confirm the rule's intent with the schema owner before any change.*
