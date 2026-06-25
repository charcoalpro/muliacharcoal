# Content Audit — `/faq` (supporting, CORNERSTONE)

**Run date:** 2026-06-23
**Mode:** Diagnose-only. No files changed except this report.
**Passes run:** 0, 1, 2, 3, 5 (Pass 6 OFF).

---

## 1. Manifest (Pass 0)

| Field | Value |
|---|---|
| Route | `/faq` |
| Pillar | supporting (FAQ is a standalone supporting page, not part of a pillar cluster) |
| Cornerstone | YES |
| Source page | `src/pages/faq.astro` |
| Content source | `src/i18n/en/faq.json` (all Q&A copy; token-interpolated) |
| Layout | `src/layouts/BaseLayout.astro` (`includeOrgSchema={false}`, `prefetch=['/contact','/glossary']`) |
| Components rendered | `Breadcrumbs.astro`, `ArticleMeta.astro`, `FAQSection`* (not actually used — page renders `<details>` inline), `CTABanner.astro`, `Button.astro` |
| Schema builders | `buildFaqPageGraph` → `faqPageSchema` + `buildOrganization({mode:'slim'})`; `Breadcrumbs` emits `BreadcrumbList` separately |
| Tokens / config consumed | `companyTokens(company)` from `src/lib/interpolate.ts`; grade specs from `src/config/grades.ts` (premium/super-premium/platinum FC, ash, burn time, burn temp); `company.governance.*` (author/reviewer/factChecker) via `ArticleMeta`; `waLink` |
| `company.ts` / data fields used | legalName, brand, port (+fullName/unLocode), moq (tons/label), paymentTerms, leadTime (label/new/repeat), lcMinContainers, ovenCount/batch/cycle, productionLines, capacity (day/month), region/city/country, nib, taxId, foundingYear, shelfLifeMonths, samples.*, packaging.*, certifications.iso9001/imdg/specsLastVerified, responseHours, salesLanguages, officeHours, governance.author/reviewer/factChecker |
| Schema types emitted on page | `FAQPage` (22 Question/Answer nodes), `Organization` (slim), `BreadcrumbList` |
| Build HTML inspected | `dist/faq/index.html` (read-only; build pre-existing) |

**Schema-architecture verdict (type & placement only):** Correct. `/faq` is the single global home for buyer-operations `FAQPage`; the 5 link-out stub Q&As at the bottom are deliberately excluded from the `@graph` (their schema home is `/glossary`). No misplaced/duplicated FAQPage on this route. `BreadcrumbList` present (depth-1+). Tokens all resolve in built HTML (no `{{token}}` leakage).

---

## 2. Severity-tiered TODO list

### BLOCKERS

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| B1 | Blocker | Pass 1 — hardcoded company fact (owner/director name must live in company.ts, never in i18n) | `src/i18n/en/faq.json` → `categories[samples-and-visits].items[verify-legitimacy].a`, last sentence: "Our director Wilson Gosalim is reachable directly on WhatsApp…"; renders in `dist/faq/index.html` line 110 (visible answer) and line 110 (FAQPage JSON-LD) | A director/owner *name* — a company fact — is written as a literal string in the i18n JSON instead of being interpolated from a `company.ts` token. Per CLAUDE.md, owner/director/staff names are facts that may only live in `company.ts`/`src/data/people.json`. `companyTokens()` already exposes an `executives` token (director names) and `getDirector()` exists. | Replace the literal with a token (e.g. `{{executives}}` or a director token) so the name is sourced from `people.json`. Do NOT write a name into the repo as part of this audit — flag for a human to choose the correct token and confirm which director is the KYC/WhatsApp contact. |
| B2 | Blocker | Pass 3 — factual Error (fabricated/incorrect named person presented as a verification contact) | Same location as B1; `dist/faq/index.html` lines 110 & 116–117 | "Wilson Gosalim" **does not exist** in `src/data/people.json`. The roster's directors are **Henry Gosalim** and **Gatot Wibowo**; the WhatsApp-director (`whatsapp-director` tag) is **Mohamad Sinno** (Owner & Director). The page presents a non-existent person as "our director … reachable directly on WhatsApp for any KYC verification" — directly undermining the very legitimacy answer it sits in, and citable by AI engines. | After tokenizing (B1), the value will self-correct to a real roster name. A human must decide which real person is the stated KYC/WhatsApp verification contact (roster suggests Mohamad Sinno, the `whatsapp-director`) and align the answer's claim with `people.json`. Treat the current literal as wrong, not as a styling issue. |

### DEFECTS

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 2 — Devil's Advocate required on cornerstone | Whole page (`src/pages/faq.astro`; no such section in `faq.json`) | No steelman / counterargument section. Cornerstone pages must, after proving the main thesis, state the strongest buyer objection (e.g. "Indonesian factory cold-contact risk", "natural coals are harder to light than quick-light", "FCL-only locks out small buyers") and give a data-grounded response. Absent. | Add one Q&A or short section framed as the strongest industry counterargument with a numeric, honesty-gated rebuttal. Describe only — content authored later under a separate prompt. |
| D2 | Defect | Pass 2 — mini-cases required on cornerstone | Whole page | No Problem → Action → Result mini-case with a measurable result anywhere on the page. Cornerstone pages need ≥1–2. | Add 1–2 P-A-R mini-cases (e.g. a buyer's first-container objection → action taken → measurable outcome) using only facts backed by `company.ts`. Describe only. |
| D3 | Defect | Pass 1/2 — GEO internal-linking; pillar up-link & cross-references should be real anchors | In-answer references rendered as **bare plain text**, not links: e.g. `minimum-order-quantity` ("…at /glossary#fcl-vs-lcl."), `payment-terms` ("…at /glossary#tt-payment."), `letter-of-credit`, `price-basis`, `grades-offered` ("…at /glossary#ash-content."), `oem-private-label` ("Full packaging overview at /packaging."). Confirmed in `dist/faq/index.html` line 110 — the strings appear as text, no `<a href>`. | Multiple cross-references are written as literal URL paths in prose instead of clickable anchors. They neither help the buyer navigate nor pass internal-link equity; the only real internal links are the 5 bottom stub cards and the two CTA buttons. The intro's "logistics pillar" mention (line 110) is also plain text, not a link. | Convert the in-prose path references into real anchor links (or move the navigation into the existing link-out stub pattern). At minimum make the intro's "logistics pillar" phrase a clickable link to `/logistics`. Describe only. |

### HARDENING

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 1 — regulatory currency / freshness visibility | `certifications` answer ("…specs were last verified {{specsLastVerified}}" → 2026-04-25) and ArticleMeta "Last updated 2026-04-25" | The page carries a single sitewide review date (`governance.*.lastReviewed` and `certifications.specsLastVerified`, both 2026-04-25). Acceptable, but the IMDG/UN-1361 and UN-1362 regulatory claims in `natural-vs-quicklight` and `certifications` have no claim-level review date tied to a regulatory event; they inherit a cosmetic page date. | Consider surfacing a claim-level "regulatory facts last reviewed" tied to the IMDG 42-24 / SP 978 timeline (already modeled in `company.logistics.dg.*`) rather than only the page date. Low priority. |
| H2 | Hardening | Pass 2 — anti-bloat / answer compressibility | `production-capacity`, `total-lead-time`, `grades-offered` answers | A few answers restate framing already covered elsewhere (e.g. "roughly one 20ft container every working day" + monthly total + "binder-cure paced" overlaps `container-production-time`; lead-time exclusion repeated). Compressible ≥20% without losing facts. | Tighten overlapping capacity/lead-time prose; keep every number. Describe only. |
| H3 | Hardening | Pass 2 — featured-snippet lead under question headings | All 22 `<details>` answers | Most answers lead answer-first (good). A few bury the direct answer behind setup (e.g. `price-basis` opens with the basis then defines FOB; `quality-guarantee` opens with process before the actionable "send the destination lab report within 30 days"). | Ensure the first sentence of each answer is the self-contained reply; move definitions/process to sentence 2+. Describe only. |
| H4 | Hardening | Pass 2 — headings as buyer questions | Section H2s: "Ordering & MOQ", "Pricing & Payment", "Production & Lead Time", "Quality & Specifications", "OEM / Private Label / Packaging", "Compliance & Documentation", "Samples & Factory Visits" | The 22 H3 item headings are already buyer-question form (good). The 8 category H2s are noun-phrase labels, not questions. Minor for a TOC/category page; question-form H2s would improve snippet eligibility. | Optionally rephrase category H2s toward question form, or leave as navigational labels (acceptable for a TOC structure). Lowest priority. |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "Our director Wilson Gosalim is reachable directly on WhatsApp…" | **Error** | High | No such person in `people.json`; directors are Henry Gosalim & Gatot Wibowo; whatsapp-director is Mohamad Sinno. See B1/B2. | `src/data/people.json` (company.ts) |
| MOQ = 18 tons / one 20ft FCL (`{{moqLabel}}`, `{{moqTons}}`) | Correct | — | Resolves to "18-ton container" in built HTML. | company.ts (`commercial.moq`) |
| FOB Tanjung Emas (`{{port}}`/`{{portFullName}}`/`{{portUnlocode}}`) | Correct | — | Tokenized; not hardcoded. | company.ts (`commercial.portOfLoading`) |
| Three directors/executives wording via roster | Correct | — | Roster supports a manufacturer (not trader) claim; NIB/NPWP tokenized. | company.ts / people.json |
| Manufacturer, {{ovenCount}} ovens, {{productionLines}} lines, {{capacityMonth}} t/mo, daily {{capacity}} t | Correct (config-bound) | — | All tokenized from `production.*`; figures not independently re-verified here (config is SSoT). | company.ts (`production.*`) |
| Grade specs (Premium/Super Premium/Platinum FC, ash, burn time, burn temp) | Correct (config-bound) | — | Sourced from `grades.ts` SSoT, not hardcoded in i18n. | `src/config/grades.ts` |
| "Moisture stays ≤6%, calorific value 7000–7500 kcal/kg" (`grades-offered`) | **Unverified (literal in i18n)** | Medium | These spec numbers are written literally in `faq.json`, NOT tokenized, while `company.quality.specs` holds canonical moisture/calorific ranges. Potential drift vs `qualityTokens` (`moistureTarget`, `calorificTypical/Target`). Not a company-identity fact, so not a Blocker, but should be tokenized. | model / verify vs company.ts `quality.specs` |
| "shelf life of {{shelfLifeMonths}} months" | Correct (config-bound) | — | Tokenized. | company.ts (`production.shelfLifeMonths`) |
| Natural coals = UN 1361 Class 4.2; quick-light = UN 1362; "we do not produce UN 1362" | Unverified (regulatory) | Medium | UN-number tokenized (`{{unNumber}}`/`{{unClass}}`); UN 1362 is written literally and asserted as the quick-light classification. Plausible/standard but route to deep research for IMDG currency. | model / verified-facts (logistics research findings) |
| "tested by {{auditors}} — independent Indonesian laboratories accredited under ISO/IEC 17025" | Correct (config-bound) | — | Auditor names tokenized; ISO/IEC 17025 framing standard. | company.ts (`certifications.iso9001.auditors`) |
| "Preferential Certificate of Origin issued through the Indonesian Ministry of Trade" | Unverified | Low | Procedural claim, not in company.ts; standard for Indonesian COO. | model |
| "send the destination lab report … within 30 days of B/L date" (claims/quality-guarantee) | Unverified (literal in i18n) | Low | "30 days" is a literal commercial term in prose, not a tokenized config value — acceptable as policy copy but confirm it matches the contract/terms page. | model / cross-check `/legal/terms` |
| "specs were last verified {{specsLastVerified}}" (2026-04-25) | Correct (config-bound) | — | Tokenized. See H1 re: event-tied dating. | company.ts (`certifications.specsLastVerified`) |
| Samples: "{{sampleWeightG}}-gram samples ship within 48 hours … {{sampleTransitDays}}-day transit" | Correct (config-bound) | — | "48 hours" literal but a fulfillment SLA, not a company-identity fact. | company.ts (`samples.*`) |
| Payment: "T/T and L/C at sight in USD"; "{{paymentTerms}}"; "L/C … for orders of {{lcMinContainers}} or more" | Correct (config-bound) | — | Bank details correctly suppressed per sensitive-fact rule. | company.ts (`commercial.paymentTerms`, `lcMinContainers`) |
| "operated since {{year}}" | Correct (config-bound) | — | Tokenized founding year. | company.ts (`foundingYear`) |

**Honesty-gating check:** ArticleMeta fact-checker cell is `hasFact()`-gated (drops if placeholder) — correct. Certifications answer renders only config-backed certs. Bank details suppressed in `payment-terms` despite `company.json` potentially holding them — correct per the page's sensitive-fact rule. No trust block rendered without a backing fact EXCEPT the named-person claim (B1/B2). No held-cert vs per-order-report blurring observed.

---

## 4. Requires deep research

| Claim | Why | Markets |
|---|---|---|
| Natural coconut coals classified UN 1361 Class 4.2; quick-light/instant-light coals classified **UN 1362** | UN 1362 is asserted as a literal in copy; confirm current IMDG (42-24 amendment) classification split between 1361 and 1362 and that the factory genuinely never produces 1362 product. | All (USA, UK, Germany, Saudi Arabia, Russia) |
| "Preferential Certificate of Origin issued through the Indonesian Ministry of Trade" | COO authority/name and "preferential" eligibility vary by destination FTA; verify issuing body and that "preferential" applies for the priority markets. | UK, Germany (EU), Saudi Arabia (GCC) |
| Moisture ≤6% and calorific value 7000–7500 kcal/kg (literal in `faq.json`) | Cross-check against `company.quality.specs` canonical ranges to catch drift; if they disagree it becomes a Defect. | All |

---

## 5. E-E-A-T / HCU summary (Pass 5)

| Criterion | Score /10 | Justification |
|---|---|---|
| Authorship & expertise | 7 | Author/Reviewer/Fact-checker triple present via `ArticleMeta` from `governance.*` (Mohamad Sinno / Ahmet Bassam / Teguh Pranomo). Undercut by the fabricated "Wilson Gosalim" director in the legitimacy answer (B2). |
| Topical authority | 9 | 22 buyer-operations Q&As across 8 categories cover the full pre-purchase journey; deep, manufacturer-grade detail. |
| Technical health & freshness | 8 | Single dated review (2026-04-25); tokens all resolve; zero client JS. Freshness cadence is cosmetic-single-date (H1). (CWV/Lighthouse not measured here per scope — defer to CLAUDE.md budgets.) |
| Effort | 9 | High; specification-dense, numeric, non-generic answers. |
| Originality | 8 | Specific to this factory's operations; little boilerplate. |
| Citation quality | 6 | In-answer cross-references are bare text paths, not links (D3); no outbound authority citations for regulatory claims. |
| Freshness / timeliness | 7 | Date-stamped and recent; regulatory claims not event-tied (H1). |
| Page intent | 9 | Cleanly serves transactional/pre-purchase buyer intent; answer-first with numbers. |
| Structure & readability | 8 | One H1, logical H2/H3 outline, TOC, back-to-top, native `<details>` (content server-rendered, crawler-readable — not JS-gated, GEO-compliant). A few answers bury the lead (H3). |
| Mobile | 9 | `max-w-4xl`, ≥44px touch targets (`min-h-11` summaries), logical classes; no horizontal overflow risk. |
| Format-standard adherence | 5 | GEO meta table ✓, FAQ Q&A form ✓ — but the two required cornerstone formats are MISSING: Devil's-Advocate steelman (D1) and Problem-Action-Result mini-case (D2). |
| Trust & spam signals | 5 | Strong honesty-gating + bank-detail suppression, but a fabricated named verification contact (B2) is a direct trust hit on a page whose job is to prove legitimacy. |

**PQ (mean of 12) = 7.5 / 10.**

**Verdict:** Helpful-first. The page is genuinely buyer-useful and answer-dense (good-clicks prognosis), but it is held below cornerstone bar by (a) a fabricated/hardcoded director name that contradicts the roster, and (b) two missing cornerstone-mandated formats.

**Lowest-3 action steps:**
1. **Format-standard (5):** Add the Devil's-Advocate steelman section (D1) and 1–2 Problem-Action-Result mini-cases (D2) so the page meets cornerstone format requirements.
2. **Trust & spam (5):** Fix B1/B2 — tokenize the director name from `people.json` and align the legitimacy answer with a real roster person; this single fix lifts both Authorship and Trust.
3. **Citation quality (6):** Convert in-prose `/glossary#…` and `/packaging` path references into real anchor links and make the intro "logistics pillar" a clickable up-link (D3).
