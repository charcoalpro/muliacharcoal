# Content Audit — /logistics/charcoal-shipping-lines

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report). No files modified except this report.
**Passes run:** 0, 1, 2, 3, 5 (Pass 6 OFF).
**Cornerstone:** No (minor cluster page — meta-table / Devil's-Advocate absence is Hardening, not Defect).

---

## 1. Manifest (Pass 0)

| Field | Value |
|---|---|
| Target route | `/logistics/charcoal-shipping-lines` |
| Source file | `src/pages/logistics/charcoal-shipping-lines.astro` |
| Built HTML | `dist/logistics/charcoal-shipping-lines/index.html` (present; resolves to exactly one page) |
| Layout | `BaseLayout.astro` (`type="article"`, `includeOrgSchema={false}`) |
| Components | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `MaybeLink`, `FAQSection`, `CTABanner`, `KeyFactsBox` |
| i18n source | `src/i18n/en/logisticsShippingLines.json` (`en.logisticsShippingLines`), `src/i18n/en/logisticsCommon.json` (`en.logisticsCommon`) |
| Token dictionaries | `companyTokens(company)` + `logisticsTokens(company)` from `src/lib/interpolate.ts` |
| Pillar | Logistics (`/logistics`) |
| `company.ts` / `company.json` fields consumed | `company.logistics.dg.carriersAudited` `["MSC","Maersk","CMA CGM","Emirates","Asyad"]`; `company.logistics.dg.carriersNotAccepting` `["Hapag-Lloyd","ONE","Cosco","ZIM"]`; `company.logistics.editorial.dateModified` (`2026-06-16`) + `datePublished` (`2026-06-16`); token-fed: `unClass` (4.2), `incotermDefault` (FOB), `packingGroup`, `properShippingName`, `brand`; `company.governance.author.name` (Mohamad Sinno, via schema), reviewer/fact-checker roles via `governance` → `ArticleMeta`; `company.whatsapp.presetMessages.salesGeneral`, `waLinkFor('salesGeneral')` |
| Schema types emitted (built HTML) | `WebPage` (`#webpage`), `FAQPage` (`#faq`, page-specific 3 Q&As), `BreadcrumbList` (emitted by `Breadcrumbs`). No `Organization` (suppressed by `includeOrgSchema={false}`). |
| Schema builder | `src/lib/schema/logisticsClusterPage.ts` (`logisticsClusterPageSchema`) — WebPage + FAQPage; no TechArticle/HowTo passed for this page |
| Pillar up-link (first paragraph) | Present — `/logistics` "Logistics overview" in intro `<p>` (source line 90; HTML `data-source-component="lines-up-hub"`) |
| Related section | Present — 6 items, all targets live (`/logistics`, `/logistics/charcoal-dg-regulation`, `/logistics/rules`, `/logistics/un-1361`, `/logistics/import-to-usa`, `/contact`) |
| Incoming links (permanent) | `/logistics` hub links down (logistics.json line 222 "Carriers that ship charcoal"); also linked from un-1361, charcoal-dg-regulation, rules. **Not an orphan.** |

**Build note:** Per run instructions the build was already done; HTML was read read-only (no `npm`/build/git executed). Built HTML resolves to exactly one page — no Pass-0 stop condition.

---

## 2. Severity-tiered TODO list

### Blockers
**None.**

Verification of why each candidate Blocker class clears:
- **Hardcoded company facts:** No literal company fact appears in the page or its i18n. Carrier names, PG, PSN, UN class, incoterm, dates all flow from `company.json`/`company.ts` via `L.dg.*`, tokens, and `governance.*`. The author name in JSON-LD (`Mohamad Sinno`) is emitted by the schema builder from `company.governance.author.name`, not hardcoded in the page. PASS.
- **Honesty-gating:** Accept-list and decline-list are gated on `dg.carriersAudited` / `dg.carriersNotAccepting`; the accept block degrades to `t.carriers.acceptEmpty` ("Contact us for the current list…") when empty, the decline block omits entirely when empty (source lines 110–129). KeyFacts "Booked directly with" value is gated `accept.length ? … : ''`. No claim renders without a backing fact. PASS.
- **Held-cert vs per-order distinction:** The audit block ("Factory audit — Held per carrier, where required" / "we hold that audit") is framed as a held capability, never as a per-order report. Distinction preserved. PASS.
- **FAQPage placement:** FAQPage is emitted, but it is **page-specific** (3 Q&As: which lines accept, factory audit to book, own forwarder) and does **not** poach a canonical FAQ home (SHT → un-1361, COA → certifications, MSDS → documents). The SHT Self-Heating-Test Q&A lives at `un-1361` (confirmed: logisticsUn1361.json line 100). Site-wide, FAQPage is emitted on 27 cluster pages by the shared `logisticsClusterPageSchema` builder — this is the established architecture, not a per-page violation. **Not a misplaced FAQPage.** PASS.

### Defects

| ID | Tier | Pass + rule | Exact location | What is wrong | Recommended fix (described, not executed) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 3 — factual accuracy (named-third-party claim, Medium-High) | `#carriers` accept-list (MSC, Maersk, CMA CGM, Emirates, Asyad) + decline-list (Hapag-Lloyd, ONE, Cosco, ZIM); HTML `<section id="carriers">`; also FAQ #1 answer and KeyFacts "Booked directly with". Source: `company.json` `dg.carriersAudited` / `dg.carriersNotAccepting` (lines 558–559). | The page asserts, as fact, which named carriers **accept** vs **have declined** declared UN 1361 Class 4.2 coconut charcoal. Neither research file substantiates carrier-by-carrier **charcoal-DG acceptance**. The only carrier facts on record (`logistics-import-research-findings.md` lines 220, 292) are that Maersk/MSC/CMA CGM/Hapag-Lloyd/ONE suspended **Russia** bookings from 1 Mar 2022 (a sanctions action, not a charcoal-acceptance decision) and that "DG Class 4.2 acceptance by these carriers … is UNVERIFIED and carrier-specific." So Hapag-Lloyd/ONE appear on this page's *charcoal-decline* list for what the source records as a *Russia-route* suspension, and the accept-list (esp. Emirates, Asyad) has no cited basis at all. Honesty-gating makes this not a Blocker (values are config-sourced and degrade gracefully), but the rendered claim is an Error/Unverified factual assertion about named companies — reputational and SEO risk if a buyer's actual booking contradicts it. | Route to deep research (see §4). Until per-carrier charcoal-DG acceptance is verified from a primary source (carrier DG/hazmat policy, booking confirmation, or forwarder attestation) for each named line, either (a) replace named lists with the already-present hedge ("we confirm the current line and schedule at booking") and a non-named statement, or (b) keep names only for lines with a documented, dated basis and record that basis + `lastVerified` per carrier in `company.json`. Do not write any carrier verdict into the repo without a human-confirmed source. |
| D2 | Defect | Pass 2 — featured-snippet lead under heading | `#carriers` H2 "Carriers that accept charcoal — and those that have declined" | The H2 is the page's primary money question, but the first line under it is a list intro ("We book coconut charcoal directly with carriers that accept…") inside a card, not a 1–2 sentence self-contained answer. An AI/snippet extractor under this heading sees a colon-terminated lead-in, not a direct answer naming the position. | Add a one-sentence direct answer immediately under the H2, before the two-column grid — e.g. a definition-form line stating that a subset of lines accept declared UN 1361 Class 4.2 charcoal and several majors have declined, with the count, so the answer is extractable without parsing the cards. (Describe only — do not author final carrier names here; gate on D1.) |

### Hardening

| ID | Tier | Pass + rule | Exact location | What is wrong | Recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 2 — Devil's Advocate (minor page) | After `#carriers` / `#audit` (the sections proving "book with us because we hold DG-capable carriers + audits") | No steelman section stating the strongest buyer counterargument (e.g. "why not just nominate my own NVOCC and avoid carrier lock-in?" or "isn't a named accept-list stale the moment acceptance changes?") with a data-grounded response. On a minor page this is Hardening, not Defect. | Add a short counter-point block: state the strongest objection (carrier acceptance volatility / preference for own forwarder), concede where it holds, and answer with the booking-time confirmation + EXW/FOB own-forwarder path the page already offers. |
| H2 | Hardening | Pass 2 — headings as questions | H2s "Why charcoal needs a DG-capable carrier" (`#why-dg`) and "Carriers that accept charcoal — and those that have declined" (`#carriers`) are statement-form; `#audit` and `#forwarder` are already question-form | Two of four body H2s are statements, not the question a buyer types. Mixed pattern slightly lowers PAA/snippet eligibility. | Reframe to question form, e.g. "Why does charcoal need a DG-capable carrier?" and "Which carriers accept charcoal, and which have declined?" — keeping the existing answer paragraphs. |
| H3 | Hardening | Pass 1 — regulatory currency (event-linked dating) | `#why-dg` body "Since the 2026 rules…"; backing `dg.lastVerified` = `2026-06-15`, `dg.mandatoryFrom` = `2026-01-01`. Page meta `dateModified` = `2026-06-16`. | The regulatory framing (SP 978 / Amendment 42-24 / mandatory from 2026-01-01) is **correct and event-linked** (matches `logistics-import-research-findings.md` line 54). This is a freshness-cadence note only: the page surfaces no visible `lastVerified` for the *carrier* data, which is the volatile part, so a reader cannot tell how current the named lists are. | Surface a visible "carrier list confirmed at booking; lists current as of {date}" stamp tied to a real per-carrier verification event (pairs with D1's per-carrier `lastVerified`), rather than relying only on the page-level `2026-06-16`. |
| H4 | Hardening | Pass 2 — anti-bloat / duplication | `#forwarder` body vs FAQ #3 ("Can I use my own freight forwarder?") | The forwarder section body and FAQ #3 restate the same EXW/FOB own-forwarder point in near-identical words. Minor duplication of meaning across two on-page locations. | Keep the FAQ (snippet value) and tighten the section body to add the one fact the FAQ omits (consolidating own ocean contracts), or vice-versa, so the two locations are complementary rather than redundant. |
| H5 | Hardening | Pass 2 — quantified evidence | `#why-dg` body "increasingly — audit the factory it loads from"; `#carriers` "Several major lines have declined" | Benefit/scale claims are unquantified ("increasingly", "several major lines"). Numbers are what AI extracts. The `dg.rationale` "68 container-vessel fires 2015–2022" figure exists in config but is **not rendered on this page** (it is not in `whyDg.body`), so the strongest available number is absent here. | Consider surfacing the count of declined lines and/or the (separately verified) fires figure to quantify "why this matters". Gate any fires figure on a cited source — it is currently uncited in both research files (see §4). |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "Coconut charcoal is Class 4.2 dangerous goods" (hero, why-dg) | Correct | — | UN 1361 = IMDG Class 4.2; matches `certifications.imdg` and research line 54. | company.ts (certifications.imdg) / verified-facts (logistics-import-research-findings.md L54) |
| "Since the 2026 rules, UN 1361 must be carried as declared dangerous goods" / mandatory | Correct | — | SP 978 voluntary 1 Jan 2025, mandatory 1 Jan 2026; `dg.mandatoryFrom` = 2026-01-01. | company.json (dg.mandatoryFrom) / verified-facts (L54, L114) |
| "apply the SP 978 handling" | Correct | — | SP 978 under Amendment 42-24 is the governing special provision. | verified-facts (L54) |
| "We book … directly with MSC, Maersk, CMA CGM, Emirates, Asyad" (accept-list) | **Unverified** | High | No source verifies these specific lines accept UN 1361 Class 4.2 coconut charcoal. Emirates/Asyad have no cited basis. Honesty-gated (config-sourced) but factually unbacked. → D1, §4. | model only (not in company.ts as source-linked, not in verified-facts) |
| "Several major lines have declined … Hapag-Lloyd, ONE, Cosco, ZIM" (decline-list) | **Unverified** | High | Research records Hapag-Lloyd/ONE suspending **Russia** bookings (sanctions, 2022), not declining charcoal globally; Cosco/ZIM uncited. → D1, §4. | model only; partial/mismatched basis in verified-facts (L220 — Russia route, not charcoal) |
| "Where a carrier requires [a DG/fire-safety audit] … we hold that audit" | Unverified | Medium | Capability claim; no `company.json` field confirms a specific held carrier audit (gated framing is honest, but the underlying capability is not source-backed in the read fields). Held-vs-per-order framing is correct. | company.json (implied by dg, no explicit audit-held fact) |
| "Under EXW or FOB you are free to nominate your own freight forwarder" | Correct | — | Consistent with `incoterms` / `pol.incoterm` (FOB default) and EXW availability. | company.ts (logistics incoterms / pol.incoterm) |
| Meta table: Authored by Mohamad Sinno (Owner & Director); Reviewed by Ahmet Bassam; Fact-checked by Teguh Pranomo | Correct | — | Names/roles emitted from `governance.*`; consistent with site-wide author/reviewer/QC attribution. | company.ts (governance.*) |
| "Declared UN 1361, Class 4.2" / Packing Group context (KeyFacts) | Correct | — | PG III, PSN "CARBON, animal or vegetable origin" in `dg`. | company.json (dg.packingGroup, dg.properShippingName) |
| Last updated 2026-06-16 | Correct (as dated) | Low | Matches `logistics.editorial.dateModified`. Note H3: carrier data has no separate visible currency stamp. | company.json (logistics.editorial) |

---

## 4. Requires deep research

| Claim | Why | Markets |
|---|---|---|
| Per-carrier acceptance of declared **UN 1361 Class 4.2 coconut charcoal**: do MSC, Maersk, CMA CGM, Emirates, Asyad currently **accept** it, and have Hapag-Lloyd, ONE, Cosco, ZIM **declined** it (for charcoal specifically, not Russia-route sanctions)? | Page renders named accept/decline lists as fact; both research files mark DG Class 4.2 carrier acceptance "UNVERIFIED and carrier-specific" and only document Russia-route booking suspensions, which are sanctions-driven, not charcoal-acceptance decisions. Each named line needs a primary source (carrier DG/hazmat policy page, dated booking confirmation, or forwarder attestation) and a per-carrier `lastVerified`. | All (USA, UK, Saudi Arabia, Germany; Russia routing is the one place carrier suspensions are documented) |
| The "68 container-vessel fires linked to charcoal, 2015–2022" figure (`dg.rationale`, not currently rendered here but candidate for H5) | Used elsewhere as the "why DG" rationale; not cited in either research file. If surfaced on this page it needs a primary source (carrier/insurer/IMO incident data). | All |
| Whether any specific carrier requires a **factory DG/fire-safety audit** for UN 1361 loading (the "we hold that audit" capability) | Audit-block claim is honesty-framed but no `company.json` audit-held fact backs the specific capability; confirm which carriers impose it and that the factory holds it. | All |

---

## 5. E-E-A-T / HCU assessment (Pass 5)

Scored 1–10. Technical-mechanics (canonical/hreflang/JSON-LD validity/CWV/Lighthouse) are out of scope and referenced, not re-measured (CLAUDE.md budgets + DrMax own those).

| Criterion | Score | Justification |
|---|---|---|
| Authorship & expertise | 8 | Named author (Owner/Director), reviewer (charcoal consultant), QC fact-checker, all from `governance.*`; specialist DG framing. |
| Topical authority | 7 | Tight long-tail carrier-intent page well-nested in the logistics cluster; cross-links to dg-regulation, un-1361, rules. Loses points: thin body (≈2 min read) for a money topic. |
| Technical health & freshness | 7 | `dateModified` 2026-06-16; regulatory facts event-linked (mandatory 2026-01-01). Volatile carrier data lacks a visible currency stamp (H3). Tech mechanics deferred to DrMax. |
| Effort | 6 | Real structure (KeyFacts, accept/decline columns, FAQ) but short; no Devil's Advocate, no mini-case, limited quantification. |
| Originality | 7 | Naming declined carriers is a genuinely useful, non-generic angle buyers rarely get — but its value depends entirely on the data being verified (D1). |
| Citation quality | 4 | The page's central claim (named carrier verdicts) is uncited and unverified; no on-page basis a reader can check. Lowest-scoring driver. |
| Freshness / timeliness | 7 | 2026 regulatory framing current; carrier lists are the part most likely to go stale and carry no visible "as of" (H3). |
| Page intent | 8 | Matches "which shipping lines carry charcoal" intent directly; clear CTA path to WhatsApp/contact. |
| Structure & readability | 8 | Clean H2 outline, scannable lists, KeyFacts box, FAQ; question-form FAQ. Two statement-form H2s (H2 finding) and one buried snippet lead (D2) cost a point. |
| Mobile | 9 | `max-w-3xl`, responsive grids, ≥44px targets, sticky WhatsApp FAB; meets CLAUDE.md mobile/touch rules (per HTML, not re-measured). |
| Format-standard adherence | 8 | Meta table present (Author/Reviewer/Fact-checker/Updated/Read time), FAQPage page-specific, breadcrumbs, schema-correct. |
| Trust & spam signals | 6 | Strong honesty-gating and graceful degradation, BUT the unverified named-carrier verdicts are a latent trust risk if a buyer's booking contradicts them. |

**PQ (mean of 12):** (8+7+7+6+7+4+7+8+8+9+8+6) / 12 = **85 / 120 = 7.08 / 10**.

**Verdict:** **Helpful-first** in structure and intent — it answers a real buyer question other suppliers dodge. But the core differentiator (named accept/decline lists) is **search-first-risk**: it reads authoritative while resting on unverified third-party claims. Prognosis: **goodClicks** for buyers who then confirm at booking (the page hedges correctly); **badClicks** risk if a buyer relies on a named verdict that turns out wrong. Net: helpful-first, conditional on resolving D1.

**Lowest-3 action steps:**
1. **Citation quality (4):** Resolve D1 — verify per-carrier charcoal-DG acceptance from primary sources, attach a per-carrier `lastVerified` in `company.json`, and surface a visible "as of" stamp; until then, soften named verdicts toward the booking-time hedge.
2. **Trust & spam (6):** Same root cause — replace authoritative-sounding unverified verdicts with sourced or hedged statements so the page can't be contradicted by a real booking.
3. **Effort (6):** Add the Devil's-Advocate counter-point (H1) and one quantified line (declined-line count and/or sourced fires figure, H5) to deepen a currently thin money page.
