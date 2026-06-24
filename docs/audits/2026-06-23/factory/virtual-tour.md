# Content Audit — /factory/virtual-tour

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report, no edits). Cornerstone: NO (minor factory cluster page).
**Passes run:** 0, 1, 2, 3, 5. Pass 6 OFF.

---

## 1. Manifest (Pass 0)

| Field | Value |
|---|---|
| Route | `/factory/virtual-tour` |
| Pillar | factory (cluster child) |
| Source file | `src/pages/factory/virtual-tour.astro` |
| Layout | `BaseLayout.astro` (type `article`, `includeOrgSchema={false}`, `prefetch=['/contact']`) |
| Components rendered | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `Figure` (packaging), `YouTubeLite`, `MaybeLink`, `FAQSection`, `CTABanner` |
| i18n source | `src/i18n/en/factoryVirtualTour.json`, `src/i18n/en/factoryCommon.json` |
| Schema builder | `src/lib/schema/factoryClusterPage.ts` → `webPageNode` + gated `videoObjectSchema` |
| `company.ts` fields consumed | `factoryTourVideo` (youtubeId/name/description/durationISO/uploadDate); `legalDocuments[key='factory-audit']` (gates audit block); `factory.editorial` (dates 2026-06-19); `governance.author/reviewer/factChecker` (via ArticleMeta + WebPage author); `whatsapp.presetMessages.videoCallRequest` + `salesGeneral`; tokens `brand`, `city`, `facilityAreaGrouped` (= `production.factoryAreaSqm` → 4,200 m²) |
| Schema types emitted (built HTML) | `WebPage` (isPartOf → `/factory#webpage`, author Person "Mohamad Sinno", datePublished/dateModified 2026-06-19); `VideoObject` (gated, present because youtubeId real); `BreadcrumbList` (emitted by `<Breadcrumbs>`). **No FAQPage** — correct (visible FAQ only; `/faq` is the sole FAQPage home). |
| Pillar up-link | First body paragraph → `/factory` ("coconut charcoal factory overview"); also in Related section. PASS. |
| Pillar down-link | `/factory` hub links down to `/factory/virtual-tour` (`src/pages/factory/index.astro` line 78). PASS — not an orphan. |

**Build:** read-only inspection of pre-built `dist/factory/virtual-tour/index.html`. No build run. No stop-condition triggered: page resolves to exactly one route.

---

## 2. Severity-tiered TODO list

### Blockers
**None.** No hardcoded company fact (every fact value — brand, city, 4,200 m², dates, author/reviewer/fact-checker names, WhatsApp presets — flows through `company.ts`/i18n tokens). Honesty-gating is correct: the audit `<section id="audit">` and its "Request the audit summary" link render only when `auditDoc` (`legalDocuments[key='factory-audit']`, title "Factory Audit (Beckjorindo)", dated 2026-01-12) exists; the VideoObject + video facade render only when `factoryTourVideo.youtubeId` is real. No claim is rendered without a backing fact. Pillar up/down links present; ≥1 incoming permanent link. FAQPage correctly absent.

### Defects
**None.** (No Pass-3 factual Error; required schema type present and correctly placed; pillar linking intact; this is a minor page so Devil's-Advocate / mini-case absence is Hardening, not Defect — see below.)

### Hardening

| ID | tier | pass+rule | exact location | what's wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 1 — honesty-gating (latent) | FAQ item 3 "Do you offer a video tour or audit?" answer ("our factory has been independently audited") + FAQ item answers, rendered at `<FAQSection>` (source lines 170–172) | The FAQ array (`t.faq.items`) renders unconditionally; it is **not** gated on `auditDoc`, unlike the `<section id="audit">` block (gated at source line 141). Today the backing fact exists, so the claim is true. But if `factory-audit` were ever removed from `legalDocuments`, the audit `<section>` would vanish while the FAQ would keep asserting "independently audited" — an ungated claim. | Gate the third FAQ item (and the "video walkthrough" half of its answer / the "audit" clause) on the same `auditDoc`/`hasVideo` predicates the body sections use, or split that FAQ entry so the audit clause is conditional. Preserves held-cert-vs-claim honesty-gating under future config edits. |
| H2 | Hardening | Pass 2 — headings as questions | H2s "Video walkthrough", "What the tour covers", "Visit the factory in person", "Send your own inspector", "Third-party factory audit", "From first contact to shipment" | Six of seven H2s are statements, not buyer-question form, weakening snippet/AI-extraction targeting. Only the FAQ section uses question form. | Add question-phrased variants where natural: "Can I see a video of the factory?", "What does the factory tour cover?", "Can I visit the factory in person?", "Can I send my own inspector?", "Has the factory been independently audited?", "What does the order process look like?". Minor page — optional but raises GEO citation odds. |
| H3 | Hardening | Pass 2 — Devil's Advocate (minor page) | After the "Send your own inspector" / audit sections | No steelman of the strongest buyer counter-argument (e.g. "a staged video / a one-off visit proves nothing about the container that actually ships"). On a minor verification page this is Hardening, not a Defect. | Add a short "Why a tour isn't enough on its own — and what is" note that concedes the limitation and points to buyer-appointed pre-shipment inspection + the per-order COA as the real guarantee. Reinforces the page's own verification thesis. |
| H4 | Hardening | Pass 2 — quantified evidence | "Third-party factory audit" section + FAQ item 3 | "independently audited by a third-party inspection body" gives no auditor name, scope, or date in the visible prose, even though `auditDoc` holds title "Factory Audit (Beckjorindo)" dated 2026-01-12. The footer already surfaces the ISO/Carsurin & Beckjorindo audit publicly, so naming the body here is not a confidentiality leak. | Surface `auditDoc.dated` (and optionally the body name, already token-available via `company.certifications`) in the visible sentence so the claim carries an extractable date/entity — e.g. "audited in January 2026 by an independent inspection body." Do NOT hardcode; bind from `auditDoc`/`company.ts`. |
| H5 | Hardening | Pass 1 — regulatory/freshness cadence | ArticleMeta "Last updated 2026-06-19"; WebPage `datePublished` == `dateModified` == 2026-06-19 (`factory.editorial`) | `datePublished` equals `dateModified` (page built once, never refreshed). Not wrong, but offers no freshness signal and no tie to a content event. Minor-page cadence item only. | On the next substantive edit, bump `factory.editorial.dateModified` in `company.json` to a real change date (keep `datePublished`). No action needed now. |
| H6 | Hardening | Pass 2 — anti-bloat / coherence | "Visit the factory in person" body vs FAQ item 1 answer; "Send your own inspector" body vs FAQ item 2 answer | The visit and inspector prose are near-verbatim restated in the FAQ answers (live WhatsApp video call; SGS/Intertek/Bureau Veritas at your cost; "coordinate access and timing around your booking"). Duplicated meaning across sections. | Acceptable for snippet redundancy, but consider trimming the FAQ answers to the one-line direct answer and letting the body sections carry detail, or vice-versa, to cut ~15–20% duplicated text. |
| H7 | Hardening | Pass 2 — featured-snippet lead | "From first contact to shipment" H2 (`<section id="orientation">`) | The lead sentence ("Here is the path a typical order follows…") is a framing sentence, not a self-contained answer; the actual answer is the 8-step list below. A crawler pulling the first paragraph gets no substance. | Add a one-line self-contained summary under the H2 (e.g. "A typical order runs eight steps from first contact to sealed container: specs → samples → quote → PO → deposit → production → inspection → shipment.") so the snippet lead carries the answer. |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| Brand operates a coconut charcoal factory in Semarang ("{{city}}") | Correct | Low | `city` token = `company.address.city`. | company.ts |
| "across the 4,200 m² factory" | Correct | Low | `facilityAreaGrouped` = `production.factoryAreaSqm` (4,200), grouped. Backed fact. | company.ts |
| Video walkthrough exists ("3 minutes", carbonization ovens, briquetting lines, drying tunnel, QC, packing) + VideoObject (PT3M, youtubeId 0u-TnY4wNAQ, uploadDate 2026-05-26) | Unverified | Medium | Page-internal facts match `factoryTourVideo`. Whether the YouTube video actually exists/resolves at that ID and is genuinely a 3-min factory tour is an EXTERNAL check (video-asset existence). Gated valid-or-omit, so low site-risk, but flag for asset verification. | company.json (factoryTourVideo) → external |
| "Our factory has been independently audited by a third-party inspection body" / "we can share the audit summary on request" | Correct | Medium | Backed by `legalDocuments[key='factory-audit']` = "Factory Audit (Beckjorindo)", dated 2026-01-12. Consistent with footer "audit by Carsurin & Beckjorindo". Honesty-gated on `auditDoc`. Visible prose omits the date/body (see H4). | company.json (legalDocuments) |
| "You may appoint an independent pre-shipment surveyor … for example SGS, Intertek, or Bureau Veritas" | Correct | Low | SGS / Intertek / Bureau Veritas are real, commonly-used third-party pre-shipment surveyors; framed as examples, no exclusive engagement claimed. Generic-knowledge, no company-fact dependency. | model |
| Carbonization ≈400–700°C (not on this page, but process stages listed: ovens → milling/sieving → binder/press → drying tunnels → weathering → QC → packing) | Correct | Low | Walkthrough stage list matches `factory.processSteps`/`qcSteps` ordering; no contradictory numbers asserted here. | company.json (factory) |
| Order process: samples → quote (price, MOQ, lead time) → PO/PI → deposit → production → inspection → stuffing/shipment | Correct | Low | Process narrative; no specific MOQ/lead-time numbers asserted on this page (those live on `/factory/capacity`, `/products`). No factual exposure. | n/a |
| "Our specification guarantee and exchange/refund remedy are covered under Quality" (links `/quality`) | Correct | Low | Remedy is canonical at `/quality`, not restated here — held-cert/per-order distinction preserved. | CLAUDE.md intent + company.ts (quality) |
| Author Mohamad Sinno (Owner & Director); Reviewed by Ahmet Bassam; Fact-checked by Teguh Pranomo | Correct | Low | All from `governance.*`. WebPage `author` = governance.author.name. | company.json (governance) |

---

## 4. Requires deep research

| Claim | Why it needs external verification | Relevant markets |
|---|---|---|
| Factory tour video at YouTube ID `0u-TnY4wNAQ` exists, resolves, and depicts a genuine ~3-minute Semarang factory walkthrough (carbonization ovens, briquetting lines, drying tunnel, QC, packing) | The VideoObject is the rich-result target; if the ID 404s or the content doesn't match the description, the structured data is misleading. Cannot be confirmed from repo data. | all (USA, UK, SA, DE, RU) |
| "Factory Audit (Beckjorindo)" — that an audit by Beckjorindo (and Carsurin per footer) actually exists, is current as of 2026-01-12, and is shareable | The audit claim is a trust pillar surfaced both here and in the footer; the backing fact is a config row, not the audit itself. Worth confirming the audit document is real and the body/date are accurate before naming the body in visible prose (H4). | all |

---

## 5. E-E-A-T / HCU assessment (Pass 5)

| Criterion | Score /10 | Justification |
|---|---|---|
| Authorship & expertise | 8 | ArticleMeta + WebPage author carry a named owner/director, expert reviewer, and QC fact-checker — strong for a B2B page; all from `governance.*`. |
| Topical authority | 7 | Sits correctly in the factory cluster with up/down links and 7 Related links; covers verification comprehensively (video, visit, inspector, audit, process). |
| Technical health & freshness | 7 | Clean built HTML, gated VideoObject, correct schema types, prefetch/preconnect present. `datePublished==dateModified` gives no freshness signal (H5). (CWV/Lighthouse mechanics are DrMax's scope, not re-measured.) |
| Effort | 8 | Multiple distinct verification paths, an 8-step order map, a 7-point walkthrough list, and a gated video — clearly purpose-built, not thin. |
| Originality | 7 | Verification-first framing ("don't take our word for it") is differentiated; some FAQ↔body duplication (H6) dilutes it slightly. |
| Citation quality | 6 | Audit/video claims are gated but visible prose lacks an extractable date/body for the audit (H4); surveyor names are generic examples (fine). |
| Freshness / timeliness | 6 | Single build date, no event-tied modification; minor-page cadence only (H5). |
| Page intent | 9 | Intent (let a buyer verify the factory) is met head-on; CTAs (schedule visit, send inquiry, request audit) align tightly. |
| Structure & readability | 8 | Logical H1→H2 outline, no level skips, list/ordered-list structure, visible (non-JS-gated) FAQ via `<details open>` first item — GEO-extractable. |
| Mobile | 8 | max-w-3xl prose, 44px touch targets, sticky WhatsApp FAB, responsive meta grid — consistent with site budgets (not re-measured). |
| Format-standard adherence | 8 | ArticleMeta meta-table present (author/reviewer/fact-checker/updated/read-time); minor pages don't require Devil's-Advocate (H3 optional). |
| Trust & spam signals | 8 | Honesty-gating intact, no fabricated claims, no hardcoded facts, remedy deferred to canonical `/quality`. |

**PQ (arithmetic mean of 12):** (8+7+7+8+7+6+6+9+8+8+8+8)/12 = **7.5 / 10**

**Verdict:** Helpful-first. The page exists to let a buyer independently verify the factory (video, in-person visit, own surveyor, third-party audit) and routes every claim through a backing fact or defers it to the canonical owner. Good-clicks prognosis: positive — high task-completion for a buyer doing due diligence; low bad-click risk because nothing is overclaimed and the strongest verification path (buyer-appointed inspection) is offered candidly.

**Lowest-3 action steps:**
1. **Citation quality (6) → H4:** surface the audit date (and optionally the inspection body, already token-available) in the visible "Third-party factory audit" sentence so AI/snippet extraction gets a dated, attributable claim — bound from `auditDoc`/`company.ts`, never hardcoded.
2. **Freshness/timeliness (6) → H5:** on the next substantive edit, bump `factory.editorial.dateModified` to a real change date so `dateModified` diverges from `datePublished` and signals currency.
3. **Citation quality / structure (H7):** add a one-line self-contained answer immediately under the "From first contact to shipment" H2 (and convert statement H2s toward question form, H2) so each section leads with the extractable answer rather than a framing sentence.
