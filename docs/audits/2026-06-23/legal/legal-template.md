# Content Audit — Legal template route (`/legal/{privacy-policy,terms,cookies}`)

**Run:** 2026-06-23 · diagnose-only (report-only) · Passes 0,1,2,3,5 (Pass 6 OFF)
**Pillar:** legal (supporting pages — NOT a pillar-cluster member; cornerstone = no)
**Auditor scope:** content layer only. Technical mechanics (canonical syntax, hreflang correctness, JSON-LD validity, robots/sitemap/headers, CWV/Lighthouse numbers) are OUT OF SCOPE and not reported.

---

## 1. Manifest

| Field | Value |
|---|---|
| Route | `/legal/privacy-policy`, `/legal/terms`, `/legal/cookies` (one dynamic route) |
| Page source | `src/pages/legal/[slug].astro` |
| Body source | `src/content/legal/privacy-policy.md`, `terms.md`, `cookies.md` (collection `legal`) |
| Collection schema | `src/content/config.ts` → `legal` (`title`, `description`, `lastUpdated` req; `datePublished` optional) |
| Layout | `BaseLayout.astro` (`includeOrgSchema`, `schema={legalPageSchema(...)}`) |
| Components | `Breadcrumbs.astro`, `Prose.astro` |
| Schema builder | `src/lib/schema/legalPage.ts` → emits one `WebPage` node |
| Token fill | `src/lib/interpolate.ts` → `fill()` + `companyTokens(company)`; remark plugin fills body, JS fills `description` |
| `company.ts` fields consumed (via tokens) | `legalName`, `brand`, `domain`, `siteUrl`, `email`, `phone.display`, `whatsapp.e164Digits`, `address.{street,district,city,region,country,postalCode}` (+ `addressFull`), `commercial.moq.{tons,containerType}`, `commercial.portOfLoading.name`, `legal.governingLaw`, `legal.arbitration.{institution,institutionShort,seat}`. All originate in `src/data/company.json` (`legal` block confirmed at json L306–311; address/MOQ/port in same file). |
| Schema types emitted (verified in dist) | `WebPage`, `BreadcrumbList` (+ `ListItem`×2), `Organization`, `WebSite`, `ImageObject`, `PostalAddress` |
| FAQPage present | **No** (correct — verified `grep -c FAQPage` = 0 on all three) |
| Unfilled `{{tokens}}` in dist | **None** on any of the three pages (verified) |
| Built pages inspected | `dist/legal/{privacy-policy,terms,cookies}/index.html` (all three) |
| Incoming internal links | `footerLegalNav` in `src/config/nav.ts` (L138–141) → all three in permanent footer; all three in `LIVE_ROUTES` (L80–82). **Not orphans.** |

**Pass 0 result:** route resolves cleanly to 3 built pages; no build run (constraint), dist already present and current. No stop condition.

---

## 2. Severity-tiered TODO list

### Blockers
**None.**

No hardcoded company facts: every fact value in all three MDX bodies is a `{{token}}` resolved from `company.json` via `interpolate.ts` (verified — dist contains zero literal facts that bypass the token layer, and zero unfilled tokens). No honesty-gated block is rendered without a backing fact (legal pages render no certification/capacity/per-order-report trust blocks at all). No misplaced FAQPage. No broken pillar link / real orphan. No regulatory claim in scope.

### Defects

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| D1 | Defect | P3 factual Error (Medium) | `cookies.md` L40, H2 "Cookies used by our service providers": *"We use Google Analytics, Bing Analytics, Facebook Analytics, Yandex Analytics."* | Site actually ships only GA4 (`G-CLNNLB616W`/`gtag`) and Meta Pixel (`fbq`) — verified in dist HTML. **Bing Analytics** and **Yandex Analytics** are not deployed anywhere in `src/`. A cookie policy that names specific analytics providers not in use is factually inaccurate (and is the exact list a regulator/consent-tooling audit checks against). | Reduce the named-provider list to the analytics actually loaded (GA4 + Meta/Facebook). If Bing/Yandex are planned, gate the sentence on a real config flag rather than asserting current use. Do NOT have the auditor write the value — flag for human + see Claims register / deep-research. |
| D2 | Defect | P3 factual Error (Low–Med) | `privacy-policy.md` L158–159, H3 "Usage, Performance, and Miscellaneous" → bullet **"Google Places"** | Asserts the Service uses Google Places (an HTTP places API) and shares device data with it. No Google Places / Maps JS / Places API usage exists in `src/` (verified). Template-boilerplate carryover describing a service the static site does not call. | Remove the Google Places sub-section, or replace with the actual third-party processors in use (analytics, Web3Forms, embedded map iframe if any). Confirm the real processor list with a human before editing. |
| D3 | Defect | P2 logic/coverage + P3 (Low) | `cookies.md` — H2 "Cookies that we use" (L24 "shopping cart", L28 "user accounts / login credentials") and `privacy-policy.md` (L73 "authenticate users", L81 "remembering your login details", L94 "manage Your registration as a user", L27 Account definition, L102 "payment processing") | Describes account registration, login, shopping cart, and payment processing. This is a static B2B brochure site with no accounts, cart, login, or payment (CLAUDE.md: "no backend, database, server"; primary conversion is WhatsApp + Web3Forms). The disclosures describe data processing that does not occur — overclaims scope and undercuts accuracy of the policy. | Trim the boilerplate to the data actually collected: inquiry-form fields (name, email, phone, message via Web3Forms) + analytics usage data. Remove cart/login/account/payment language. Human review required (legal copy). |
| D4 | Defect | P2 structure / coherence | `cookies.md` L58–59 (`6.2`, `6.3` under "Managing cookies") and L68 (`7.3` under "Our details") | Orphaned clause numbers `6.2 / 6.3 / 7.3` survive from a source template whose sections were numbered 1–7. This document's headings are NOT numbered, so these prefixes reference a numbering scheme that does not exist — visible as literal "6.2", "7.3" in body text. Reads as a copy-paste defect and harms credibility of a legal page. | Strip the residual `6.2 / 6.3 / 7.3` numeric prefixes (convert to plain sentences/bullets), or renumber the whole document consistently. Mechanical content cleanup. |
| D5 | Defect | P2 link integrity (content) | `cookies.md` L48, "Managing cookies" → Firefox bullet | Link text/URL mismatch: anchor text shows `…/enable-and-disable-cookies-website-preferences` but the actual `href` points to `…/enhanced-tracking-protection-firefox-desktop`. The two disagree; the visible-text URL and the destination are different Mozilla support pages. | Make link text and `href` agree on one current Mozilla "delete/manage cookies" support URL. (Note: this is a content-correctness mismatch in the MD body, not a technical broken-link sweep, which is out of scope.) |

### Hardening

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| H1 | Hardening | P1 GEO meta table (minor page) | All three pages, `[slug].astro` header L67–74 | Page shows only "Last updated: {date}". No Author / Reviewed by / Fact-checked / Read-time meta row. On a minor page this is Hardening, not a Defect (per run scope). Adds E-E-A-T/trust on a legal page where authorship signals help. | Optional: add a compact meta line (e.g. "Reviewed by {legal/role}" + read-time) for legal pages. Low priority. |
| H2 | Hardening | P2 Devil's Advocate / mini-cases (minor page) | All three bodies | No steelman/Devil's-Advocate section and no mini-cases. Correctly NOT required on a legal minor page — recorded as Hardening only per methodology, no action expected. | None required; noted for completeness. |
| H3 | Hardening | P2 headings as questions / snippet lead | `privacy-policy.md` & `cookies.md` H2s (statement-form: "About cookies", "Retention of Your Personal Data") | Headings are statement-form, not question-form, and several sections bury the direct answer below process prose. GEO snippet extraction is weaker than question-led headings. Low ROI on legal pages (intent is reference, not discovery). | Optional: phrase key H2s as the question a visitor asks ("What cookies do we use?", "How long do we keep your data?") with a 1-sentence lead answer. Defer. |
| H4 | Hardening | P1 freshness cadence | `privacy-policy.md` `lastUpdated 2026-04-21`; `terms.md` `2026-04-22` (no `datePublished`); `cookies.md` `2026-04-22` | `terms.md` omits `datePublished` (optional in schema; template falls back to `lastUpdated` — not a bug). Dates are ~2 months old as of run date; fine now. Note for annual-refresh cadence so the legal stamp does not silently age. | Optional: add `datePublished` to `terms.md` for parity; review dates on the annual legal refresh. |
| H5 | Hardening | P2 coverage (GDPR/CCPA framing) | `privacy-policy.md` whole | For priority markets (USA, UK, Germany/EU, Russia) the policy lacks named data-subject-rights sections (GDPR Art. rights / UK-GDPR / CCPA "Do Not Sell"). Generic "we protect your data" prose only. Content-completeness gap for a buyer-facing EU/US audience; not a factual error. | Optional: add jurisdiction-specific rights sections aligned to priority markets. Human/legal authored. |

---

## 3. Claims register

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| `cookies.md` L40: uses "Google Analytics, Bing Analytics, Facebook Analytics, Yandex Analytics" | **Error** | Medium | Dist ships only GA4 + Meta Pixel. Bing & Yandex Analytics not present in `src/`. (D1) | model + repo (dist HTML: `G-CLNNLB616W`, `gtag`, `fbq`; no `mc.yandex`/`bat.bing`) |
| `privacy-policy.md` L158: uses **Google Places** service, shares device data with Google | **Error/Unverified** | Low–Med | No Places/Maps API in `src/`. Likely boilerplate. (D2) | repo (no `google.*places`/`maps.googleapis` in source) |
| `privacy-policy.md` / `cookies.md`: cart, user accounts, login credentials, payment processing | **Error** | Low–Med | Static brochure site, no accounts/cart/payment backend. (D3) | CLAUDE.md ("no backend/database/server"); repo |
| `terms.md` §1: Seller is `{{legalName}}`, located `{{city}}, {{region}}, {{country}}` → "Semarang, Central Java, Indonesia" | **Correct** | — | Resolves from `company.json`. Matches address SSoT. | company.ts / company.json |
| `terms.md` §2: MOQ "one `{{containerType}}` container (approximately `{{moqTons}}`+ metric tons)" | **Correct** | — | Token-bound to `commercial.moq`. No literal. | company.ts |
| `terms.md` §5: "Primary port of loading: `{{port}}`" → Semarang port name | **Correct** | — | Token-bound to `commercial.portOfLoading.name`. | company.ts |
| `terms.md` §9: governed by `{{governingLaw}}` (Republic of Indonesia); arbitration `{{arbitrationInstitution}}` (BANI) in `{{arbitrationSeat}}` (Jakarta) | **Correct** | — | Token-bound to `company.legal.*` (company.json L306–311). BANI is the real Indonesian arbitration board. | company.ts / company.json |
| `terms.md` §6: "Ash content typically 1.5–3%" | **Unverified** | Low | Hardcoded numeric range in the legal body rather than a `{{token}}` from `quality.specs`. Not a *company-fact* literal under CLAUDE.md's enumerated list (ash range isn't in that list), so not a Blocker — but it duplicates a spec the config owns and can drift. Flag to bind to `qualityTokens` (`ashTypical`) on a future edit. | company.ts (`quality.specs.ashContentPct`) |
| `terms.md` §8: claims must be submitted "within 14 days of goods arrival" | **Unverified** | Low | Commercial policy term; not contradicted by any source. Confirm it matches the real commercial policy. | model |
| `cookies.md` L10 / "Our details": domain, legal name, full address | **Correct** | — | All token-bound (`{{domain}}`, `{{legalName}}`, `{{addressFull}}`). | company.ts |
| All three: contact email / phone / WhatsApp | **Correct** | — | Token-bound (`{{email}}`, `{{phoneDisplay}}`, `{{whatsappDigits}}`). | company.ts |

---

## 4. Requires deep research

| Claim | Why it needs external/human verification | Relevant markets |
|---|---|---|
| Which analytics/tracking providers are actually deployed and must be disclosed (GA4, Meta Pixel — and whether Bing/Yandex are or will be used) | Cookie-policy provider list is a compliance artifact; must match real deployed trackers. Drives D1. Confirm against the live GTM/analytics config + consent tool, not the repo alone. | USA, UK, Germany/EU (GDPR cookie-consent enforcement), Russia (Yandex relevance) |
| Whether a Google Places / Maps embed is used on Contact/About (justifying any Google data-sharing disclosure) | Determines if D2's Google Places section should be removed or rewritten to the real map/processor. | all |
| GDPR (EU/UK) and CCPA (US) data-subject-rights wording adequacy | Priority markets are EU/UK/US; a human/legal reviewer must decide required rights sections (H5). Outside model authority to draft binding legal copy. | UK, Germany/EU, USA |
| 14-day claims window and "ash content typically 1.5–3%" in `terms.md` | Confirm these match the real commercial policy and current `quality.specs` band; bind the spec to a token to prevent drift. | all |

---

## 5. E-E-A-T / HCU summary

Scored against built HTML + source. UX/technical-health criteria reference CLAUDE.md budgets; performance not re-measured (out of scope).

| Criterion | Score /10 | One-line justification |
|---|---|---|
| Authorship & expertise | 5 | No author/reviewer attribution on legal pages; only "Last updated" date. |
| Topical authority | 6 | Covers standard legal sections, but privacy/cookies are generic boilerplate not tailored to a B2B export site. |
| Technical health & freshness | 8 | Clean WebPage+BreadcrumbList schema, dates present, no broken render; dates ~2 months old. |
| Effort / craft | 5 | Terms is bespoke and accurate; privacy/cookies carry template artifacts (orphan numbering, cart/login boilerplate). |
| Originality | 5 | Terms original to the business; privacy & cookies are recognizably off-the-shelf templates. |
| Citation / sourcing quality | 6 | External links to browser cookie docs present; one text/href mismatch (D5). |
| Freshness / timeliness | 7 | Single dated stamp per page; needs an annual-refresh cadence note (H4). |
| Page intent match | 8 | Reference legal pages; intent satisfied for a visitor seeking terms/privacy/cookies. |
| Structure & readability | 7 | TOC from H2s, logical heading outline, Prose styling; statement-form headings weaken snippet lead (H3). |
| Mobile | 8 | `max-w-3xl` single-column responsive article; meets CLAUDE.md mobile rules (not re-measured). |
| Format-standard adherence | 6 | Legal-doc format mostly fine; orphan clause numbers (D4) break the standard. |
| Trust & spam signals | 6 | Token-bound facts (no hardcoding) build trust; naming unused trackers/services (D1–D3) erodes it. |

**PQ = mean = 6.4 / 10.**

**Verdict:** **helpful-first** for the three core legal pages — they are real reference documents linked from the permanent footer, fact-bound to the config, with correct (non-FAQ) schema and clean breadcrumbs. They are not search-bait. However they tilt toward **template-first** rather than business-first: the privacy and cookies bodies describe processing the static site does not perform (accounts, cart, payments, Bing/Yandex, Google Places), which is the dominant quality drag. goodClicks/badClicks prognosis: neutral (legal pages rarely entry-rank); risk is reputational/compliance, not ranking.

**Lowest-3 action steps:**
1. **Authorship & expertise (5):** add a minimal reviewer/contact attribution line to legal pages (H1) — even "Maintained by {company} · questions: {email}" lifts E-E-A-T on YMYL-adjacent legal copy.
2. **Effort/Originality (5):** de-boilerplate privacy + cookies (D2, D3, D4) — strip cart/login/account/payment/Google-Places language and orphan clause numbers so the policy describes *this* site only.
3. **Citation/Trust (6):** correct the analytics provider list (D1) and the Firefox link text/href mismatch (D5) so every named third party and link is accurate.

---

*End of report. Diagnose-only — no source files modified. All fixes above are described, not executed; provider-list and legal-rights changes are TODOs for a human (no company fact or regulatory claim written into the repo by this audit).*
