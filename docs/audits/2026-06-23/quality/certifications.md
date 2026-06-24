# Content Audit — /quality/certifications

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report-only). No files modified except this report.
**Passes run:** 0, 1, 2, 3, 5 (Pass 6 OFF).
**Cornerstone:** YES.

---

## 1. Manifest (Pass 0)

| Field | Value |
|---|---|
| Target route | `/quality/certifications` |
| Pillar | quality |
| Source file | `src/pages/quality/certifications.astro` |
| Built HTML | `dist/quality/certifications/index.html` (resolved; single page) |
| Layout | `BaseLayout.astro` (`type="article"`, `includeOrgSchema={false}`) |
| Components rendered | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `KeyFactsBox`, `MaybeLink`, `ExternalLink`, `FAQSection`, `CTABanner` |
| i18n sources | `i18n/en/qualityCerts.json` (page strings), `i18n/en/qualityCommon.json` (meta-block labels) |
| Schema builder | `lib/schema/qualityClusterPage.ts` → `qualityClusterPageSchema()` |
| Schema types emitted | `WebPage`, `FAQPage` (page `@graph`); `BreadcrumbList` (emitted separately by `<Breadcrumbs>`) |
| company.ts fields consumed | `certifications.iso9001.standard`, `certifications.iso9001.auditors` (via `tokens.auditors`), `certifications.halal.{certified,body}`, `quality.testing.thirdPartyLabs/thirdPartyScope/thirdPartyFrequency` (via tokens + `hasFact` gate), `quality.testReportsProvided[]` (coa/thirdParty/sht), `quality.editorial.dateModified`, `governance.author/reviewer/factChecker` (via `ArticleMeta`), `legalDocuments` (`iso-9001`, `coa-sample`), `whatsapp.presetMessages.salesGeneral`, `waLinkFor('quoteSpecs')` |
| Pillar position | Quality cluster child; siblings: `/quality/testing-methods`, `/quality/specifications-explained`. Canonical FAQ home for **COA** Q&A. |

**Stop conditions:** none triggered. Page resolves to exactly one source + one built HTML file. Build was already produced (not re-run, per run constraints).

---

## 2. Severity-tiered TODO list

### Blockers

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| B1 | Blocker | Pass 1 — Schema architecture (FAQPage emits ONLY at `/faq` globally) | `lib/schema/qualityClusterPage.ts` lines 77-82 (pushes `faqPage` into `@graph`); rendered in `dist/.../index.html` head `<script type="application/ld+json">` `@graph[1]` `"@type":"FAQPage"` | The page emits a full `FAQPage` JSON-LD node (4 Question/Answer pairs) in addition to the `WebPage` node. Per the strict schema-placement rule, `FAQPage` structured data is to emit **only** at `/faq` globally; cluster pages may *host* the canonical Q&A content (COA's canonical FAQ home is correctly this page) but should not duplicate `FAQPage` markup off `/faq`. This is a sitewide architectural decision baked into the shared `qualityClusterPage` builder, so it is flagged at Blocker severity for an architecture owner to ratify or correct. **NOTE / tension:** the run's own DO-NOT-FALSE-FLAG list names "COA → quality/certifications" as a canonical FAQ home, which can be read as sanctioning FAQPage schema here. If the intended policy is "Q&A *content* home, schema still only at `/faq`," this is a real defect; if the policy is "schema follows the canonical content home," this is intended and should be reclassified to PASS. Resolve the policy ambiguity before acting. Recommended: confirm the FAQPage-placement policy; if schema must live only at `/faq`, have the builder omit the `FAQPage` node for cluster pages (keep the rendered `<FAQSection>` HTML, which is crawlable without the JSON-LD). |

### Defects

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 2 — Devil's Advocate (missing on cornerstone) | Whole page; expected after the "Test reports provided per order" section (`#reports-provided`) and before the FAQ | No steelman/Devil's-Advocate section. A cornerstone page must state the strongest buyer counterargument and answer it with data. The obvious counter here: *"A factory can hand over an ISO certificate and a COA that say anything — paper does not equal product; how do I trust these documents?"* The page asserts the held-vs-provided distinction but never confronts the skeptic. | Add an H2 in question form (e.g. "Can't any supplier just send a nice-looking certificate?") with a data-grounded response: independent-lab issuance (Carsurin/Beckjorindo/SGS) outside the producer, per-container cadence, sample COA on request, and the sample-to-verify path. Source every claim from `company.ts` (`quality.testing.*`, `sampleToVerify`). Do not invent new facts. |
| D2 | Defect | Pass 2 — Mini-cases (cornerstone requires ≥1-2 Problem→Action→Result) | Whole page | No Problem→Action→Result mini-case with a measurable result. Cornerstone pages must carry at least one. | Add 1 short mini-case framed around documentation, e.g. a buyer whose customs broker required an independent SHT + COA → factory provided the per-container third-party report → shipment cleared. Keep the result concrete but only using facts already in `company.ts`; if no measurable real outcome can be sourced, flag to the owner to supply one rather than fabricate a number. |
| D3 | Defect | Pass 2 — Headings as questions / featured-snippet lead | `#held-heading` ("Certifications & accreditations held"), `#reports-heading` ("Test reports provided per order"), `#certs-related` ("Related topics") | The two primary section H2s are statement-form, not the question a buyer types ("What certifications does the factory hold?", "What test reports come with each order?"). The page only achieves question-form headings inside the FAQ. Reduces featured-snippet and AI-extraction surface for the two core sections. | Reword the two section H2s into the buyer's question form (keep the existing definition-form first sentence under each, which already serves as a good snippet lead). The COA, third-party, and SHT H3s are fine as named-entity labels. |

### Hardening

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 2 — Quantified evidence | `#reports-provided` intro + ISO card + Halal card | Claims are qualitative ("verified and third-party", "every container") but carry almost no numbers a buyer extracts (no count of measured parameters stated inline in the held section, no ISO edition year reinforced as a date, no cert validity/issue date even though `legalDocuments.iso-9001.dated = 2025-12-05` and `halal #18269552` exist in `certifications.other`). | Surface available numerics already in config where honesty-gated: e.g. ISO certificate issue date from `legalDocuments`, the count of parameters the third-party lab measures (4: ash, moisture, fixed carbon, volatile matter — already in `thirdPartyScope`). Do not add a "valid until" unless a real expiry fact exists in config. |
| H2 | Hardening | Pass 1 — Regulatory currency (visible review date) | Held + reports sections | `certifications.specsLastVerified = 2026-04-25` and `governance.*.lastReviewed = 2026-04-25` exist, but the only visible date on-page is `Last updated 2026-06-16` (editorial). There is no visible "facts verified" date tied to the regulatory/cert review event. | Consider surfacing the cert/spec verification date (`specsLastVerified`) near the held-certifications block so the freshness signal is tied to a real verification event rather than only the editorial bump. Minor — the ArticleMeta already carries a fact-checker; this is a transparency nicety. |
| H3 | Hardening | Pass 2 — Anti-bloat / coverage | `#reports-provided` second intro paragraph ("These documents are issued for your specific shipment…") | Restates the held-vs-provided thesis already made in the hero subtitle, the intro paragraph, and the held-section intro. Fourth restatement of the same distinction before the reader reaches the reports. | Compress: the section heading + the procedure-link sentence already establish the framing; the restated paragraph can be trimmed ≥20% or merged into the lead without losing facts. |
| H4 | Hardening | Pass 2 — Logic / coverage gap | Page lacks any mention of Preferential Certificate of Origin and SHT-vs-DG link depth | `certifications.other[]` lists "Preferential Certificate of Origin" as a held/provided document, but the page's per-order ledger covers only COA, third-party, SHT. A buyer auditing "what paperwork ships with my container" gets an incomplete picture here vs. `/logistics/documents`. | Either add a one-line pointer to `/logistics/documents` for the full export document pack (the Related section already links it, but it is not surfaced in the reports body), or note explicitly that origin/customs docs are covered on the logistics pillar. Content-completeness nicety, not an error. |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "ISO 9001:2015" quality-management certification held | Correct | — | `certifications.iso9001.standard = "ISO 9001:2015"` | company.ts |
| ISO 9001 "Audited by: Carsurin & Beckjorindo" | Unverified | Medium | An ISO 9001 *certificate* is issued by an accredited certification body; the page labels Carsurin & Beckjorindo as the auditors via `iso9001.auditors`. Whether these two (also named as testing labs for COA/third-party work) are the accredited ISO 9001 certification body, or testing/inspection auditors, is not externally confirmed here. Config-backed (not a hardcoded-fact violation), but the role label ("Audited by" vs "Certified by") should be confirmed against the actual certificate. | company.ts (`certifications.iso9001.auditors`) — external confirmation needed |
| Halal certification held, "Issued by: MUI" | Correct (config); externally Unverified | Low | `certifications.halal = {certified:true, body:"MUI"}`; `certifications.other` carries "Halal certification MUI #18269552". Config-consistent. The specific MUI certificate number / current validity is not externally re-verified in this run. | company.ts |
| "An independent laboratory — Carsurin, Beckjorindo, or SGS — tests ash content, moisture, fixed carbon, volatile matter on every container" | Correct | — | `quality.testing.thirdPartyLabs = ["Carsurin","Beckjorindo","SGS"]`, `thirdPartyScope` = those 4 params, `thirdPartyFrequency = "every container"`. Gated by `hasFact(thirdPartyLabs)`. | company.ts |
| COA definition: "measured specification values for a specific production batch — ash, fixed carbon, moisture, volatile matter, and calorific value" | Correct | — | Definition-form, factually standard for a Certificate of Analysis. Calorific value is an additional COA field beyond the third-party 4-param scope (consistent, not contradictory). | model + company.ts |
| "COA … with every container, and a sample COA on request" | Correct | — | `testReportsProvided[coa].perOrder = true`; `legalDocuments.coa-sample` exists (sample on request). | company.ts |
| Third-party / SHT / COA reports are "per-order / per-shipment, not a certification the factory holds" | Correct | — | Matches the held-vs-provided model; `testReportsProvided[*].perOrder = true`. Held-cert vs per-order-report distinction preserved (intended). | company.ts |
| SHT report "tested at an accredited laboratory … ships as a deliverable"; DG classification deferred to `/logistics/un-1361` | Correct | — | Consistent with `certifications.imdg` (UN 1361 / Class 4.2) living on un-1361 as canonical home; SHT framed as deliverable only here. | company.ts |
| "View certificate" link → `/legal/iso-9001.pdf`; COA doc → `/quality/coa-sample.pdf` | Correct | — | `legalDocuments.iso-9001.href = "/legal/iso-9001.pdf"`, `coa-sample.href = "/quality/coa-sample.pdf"`. Rendered only because the doc entries exist (honesty-gated). | company.ts |
| ArticleMeta: Authored by Mohamad Sinno (Owner & Director); Reviewed by Ahmet Bassam; Fact-checked by Teguh Pranomo; Last updated 2026-06-16; 2 min | Correct | — | All from `governance.*` + `quality.editorial.dateModified`; read time computed. No hardcoded names in the page. | company.ts |

**Hardcoded-fact scan (Pass 1):** PASS. No literal company fact appears in `certifications.astro`, `qualityCerts.json`, or `qualityCommon.json`. Every fact value (ISO edition, auditors, MUI, labs, scope, frequency, dates, people) is imported from `company.ts` / `governance` / tokens. i18n strings carry only labels and `{{token}}` placeholders.

**Honesty-gating (Pass 1):** PASS. ISO card always renders (config-backed); Halal card gated on `halal.certified`; third-party report gated on `hasFact(T.thirdPartyLabs)`; COA/SHT cards gated on report presence; ISO/COA document links gated on the matching `legalDocuments` entry; FAQ items filtered (halal item drops if not certified, third-party items drop if no labs). Held certifications and per-order reports rendered in two visibly distinct sections — distinction preserved.

**Pillar linking & orphan (Pass 1):** PASS. Up-link to `/quality` in the first paragraph (`certs-up-hub`) and again in the Related section. Quality pillar lists this page (it is in `LIVE_ROUTES`), and the footer "Products & operations" column links `/quality/certifications` ("Certificates") — a permanent incoming link. All Related-section targets (`/quality`, `/quality/testing-methods`, `/quality/specifications-explained`, `/guide/how-to-choose-shisha-charcoal-factory`, `/logistics/un-1361`, `/logistics/documents`, `/samples`, `/faq`, `/contact`) are in `LIVE_ROUTES` — all render as real links, none muted, no orphan, no broken link.

**GEO extractability (Pass 1):** Partial. Definition-form sentences present (COA definition, ISO definition). Numeric data thin (see H1). FAQ Q&A present and rendered in `<details>` that are crawlable (open content in DOM, not JS-gated). GEO meta table present (ArticleMeta). Cornerstone Devil's-Advocate (D1) and mini-case (D2) absent.

**i18n integrity (Pass 1):** PASS. No user-visible hardcoded strings in the page; all prose routes through `t.*` / `tc.*`. `<ArticleMeta>` labels passed from i18n.

---

## 4. Requires deep research

| Claim | Why | Markets |
|---|---|---|
| ISO 9001 "Audited by: Carsurin & Beckjorindo" — role/issuer accuracy | An ISO 9001 certificate is issued by an accredited certification body; Carsurin & Beckjorindo are named elsewhere as testing/inspection labs. Confirm whether they are the certification body or the auditor, and that the label ("Audited by") is accurate. Reputational risk if a buyer's due-diligence finds the issuer is a recognized CB and the page implies otherwise (or vice versa). | USA, Germany, UK (buyers most likely to audit cert provenance) |
| Halal certification "MUI #18269552" current validity | MUI halal certificates have validity periods and were transitioning to BPJPH issuance in Indonesia. Confirm the certificate is current and whether MUI vs BPJPH is the correct issuing body as of 2026. | Saudi Arabia, wider Gulf |
| Patent "US 9,923,020 C2 — Charcoal briquettes technology (USA)" (in `certifications.other`, not rendered on this page but in the same cert config) | Not surfaced on this page, so out of immediate scope, but flagged: if ever rendered, the patent number/ownership must be externally verified. | USA |

---

## 5. E-E-A-T / HCU summary (Pass 5)

| Criterion | Score /10 | One-line justification |
|---|---|---|
| Authorship & expertise | 8 | Named author (Owner/Director), reviewer (charcoal consultant), QC fact-checker — all config-backed, role-appropriate for a cert page. |
| Topical authority | 8 | Clean held-vs-provided model, sibling links to testing-methods & specs-explained; the distinction is genuinely more rigorous than typical supplier pages. |
| Technical health & freshness | 7 | Valid head tags, breadcrumb schema, canonical present (mechanics owned by DrMax, not re-scored). Freshness signal rests on a single editorial date; cert-verification date not surfaced (H2). |
| Effort | 7 | Real structure and honest gating, but missing the cornerstone steelman and mini-case lowers perceived depth. |
| Originality | 8 | The held-vs-provided ledger and the "conflating them is how suppliers oversell" framing is original and buyer-useful. |
| Citation quality | 7 | Cross-links to canonical homes (un-1361, testing-methods, specs-explained, documents). No external authority citations, but appropriate for a first-party cert page. |
| Freshness / timeliness | 6 | One visible date; no cert issue/verification date though config has them. |
| Page intent | 9 | Strong match to "what certifications does this factory have / what ships with my order." |
| Structure & readability | 8 | Logical H1→H2→H3, good line length, definition leads. Two statement-form H2s cost snippet surface (D3). |
| Mobile | 9 | Single-column max-w-3xl, 44px targets, no JS-gated content; meets CLAUDE.md mobile/budget rules (perf numbers not re-measured here). |
| Format-standard adherence | 7 | Cornerstone GEO meta table + FAQ present; Devil's-Advocate and mini-case absent (the two missing cornerstone formats). |
| Trust & spam signals | 9 | Honesty-gating, no overclaiming, "typical/target not guaranteed" discipline, distinct held vs provided — high trust, zero spam signal. |

**PQ (arithmetic mean of 12):** (8+8+7+7+8+7+6+9+8+9+7+9)/12 = **7.75 / 10**

**Verdict:** **Helpful-first.** The page is built to inform a wholesale buyer's due-diligence, not to capture search traffic; honesty-gating and the held-vs-provided rigor predict **goodClicks** (buyer gets exactly the documentation map they came for). The cornerstone-format gaps (no steelman, no mini-case) and one duplicated `FAQPage` schema node are the only things keeping it from top quartile.

**Lowest-3 action steps:**
1. **Freshness/timeliness (6):** surface the cert/spec verification date (`certifications.specsLastVerified` / `governance.*.lastReviewed = 2026-04-25`) near the held-certifications block so the freshness signal ties to a real verification event, not only the editorial date (H2).
2. **Effort & Format-standard (7):** add the missing cornerstone formats — a Devil's-Advocate steelman section answering "paper ≠ product, why trust these documents?" (D1) and ≥1 Problem→Action→Result mini-case (D2), both sourced strictly from `company.ts`.
3. **Citation quality / Structure (7):** reword the two core section H2s into buyer-question form (D3) and surface the 4-parameter third-party scope and ISO issue date as inline numerics (H1/H4) to raise extractable evidence density.

---

*End of report. No site source modified. All findings are TODOs for human action; no company fact or regulatory claim was written into the repo.*
