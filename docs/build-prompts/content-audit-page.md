# Content Audit — Single Page (Astro / muliacharcoal.com)

**Version:** v1.0
**Type:** Claude Code audit prompt. Diagnose-only. One page per run.
**Output:** One consolidated, severity-tiered TODO report. No file edits, no code, no rewrites.

---

## Purpose

Audit **one** rendered page of the muliacharcoal.com Astro site for content quality, factual integrity, honesty-gating compliance, pillar-cluster linking, GEO extractability, snippet/structure optimization, and E-E-A-T. Produce a prioritized TODO list of what is wrong and what to improve, with every finding traceable to a rule and a location.

This prompt **does not** edit the site. It analyzes and reports. Fixes happen later under a separate approved prompt.

---

## How to invoke

Set these before running. Audit exactly one page per run.

```
TARGET            = <one page, e.g. "/quality/certifications" OR "src/pages/quality/certifications.astro">
RUN_PASS_6        = false        # ontology / semantic-graph pass, OFF by default
COMPANY_TS        = src/config/company.ts
VERIFIED_FACTS    = docs/research/verified-facts.md      # CONFIRM PATH — single source of verified external claims
DRMAX_TECHNICAL   = docs/seo/section-t-trust-technical-rules-checklist-and-audit.md   # CONFIRM PATH — technical-mechanics owner
CLAUDE_MD         = CLAUDE.md
DESIGN_MD         = DESIGN.md
```

If `TARGET` resolves to more than one page, or no page, **stop** and report that as a blocker. Do not batch.

---

## Operating rules (read before auditing)

### This is diagnose-only
Never modify, create, or delete files. Never run `git` write commands. The only build command permitted is a read-only `npm run build` to produce `dist/` for HTML inspection.

### Do NOT false-flag these — they are correct behavior on this site
This is the primary failure mode of a generic auditor here. A finding that violates any line below is itself an error.

1. **Honesty-gated omission is not a defect.** Trust blocks (certifications, SP 978 compliance, capacity figures, per-order reports) render **only** when a backing fact exists in `company.ts`. A block that is *absent because the fact is absent* is **correct** — do not report it as missing content. Only flag (a) a claim rendered **without** a backing fact, or (b) a fact present in `company.ts` that should drive a block but is wrongly not rendered.
2. **Muted `MaybeLink`s are not broken links.** Links to routes not yet in `LIVE_ROUTES` are deliberately muted via `isLive()`. A muted link is **not** a dead link and does **not** cause an orphan. Do not report it.
3. **Graceful degradation is intended.** Missing optional data omits rather than fabricates. Omission ≠ bug.
4. **Held-cert vs per-order-report distinction is intentional and must be preserved.** Treat any blurring of the two as a violation, never as an inconsistency to "smooth over."

### Boundary with the DrMax technical series — do NOT re-report
`DRMAX_TECHNICAL` owns the **mechanics**: canonical-tag syntax/reciprocity, hreflang correctness, JSON-LD schema *validity*, robots.txt, sitemap, security headers, Core Web Vitals / Lighthouse measurement. **This prompt does not re-derive or re-report those.** Reference them by name if a content finding depends on them.

This prompt owns the **content layer**: honesty-gating, hardcoded-fact detection, pillar linking & orphans, *which* schema type belongs on *which* page and *where FAQPage is allowed*, GEO extractability, structure/snippet quality, factual accuracy, E-E-A-T, semantic completeness.

---

## Pass 0 — Resolve & inventory

1. Resolve `TARGET` to its source: the `.astro` page **or** content-collection entry + its layout, the components it renders, and which `COMPANY_TS` fields it consumes.
2. Identify its place in the pillar-cluster map: its pillar, its declared siblings/children, the canonical FAQ home for any Q/A it contains.
3. Run read-only `npm run build`. Locate the built HTML for `TARGET` in `dist/`. The audit reads **both** source (for honesty-gating, hardcoded facts, i18n) and built HTML (for what a crawler/AI actually sees).
4. Emit a short **Manifest**: page file, layout, components, `company.ts` fields used, pillar, schema types emitted.

**Stop conditions (blocker):** page cannot be resolved; build fails or emits warnings. Report and halt.

---

## Pass 1 — Site-constraint gates (pass / fail each)

- **Hardcoded company facts.** Scan source (page, components, i18n JSON, MDX bodies) for any literal company fact — legal name, brand, founding year, address, phone, WhatsApp, email, domain, NIB, NPWP, Google Maps link, owner/director/staff names, capacity, line/oven counts, MOQ, port of loading, social URLs, bank details, certification IDs. Any literal instead of a `COMPANY_TS` import = **Blocker**. (i18n labels/prose around facts are fine; the fact *value* must not appear.)
- **Honesty-gating.** For every trust/claim block rendered, confirm it is gated on a real `COMPANY_TS` fact. A rendered claim with no backing fact = **Blocker (banking-details severity)**. Confirm held-certifications and per-order reports remain distinct. (Re-read Do-Not-False-Flag #1 before writing any finding here.)
- **Pillar linking & orphan check.** Page links **up** to its pillar in the first paragraph and in a Related section; the pillar links **down** to it; the page has ≥1 incoming internal link from permanent structure (not only the blog feed). Muted `MaybeLink`s do not count as the incoming link and do not count as broken. Real orphan = **Defect**.
- **Schema architecture (type & placement, NOT syntax).** Correct schema *type* for the page type is present (Product/ProductGroup on SKU pages, Article on blog, BreadcrumbList where deeper than one level, Service/Organization as applicable). **FAQPage uses a canonical-home model: one distinct Q&A set = one FAQPage home.** A page-specific FAQPage carrying page-unique questions is emitted **by design** on cluster/cornerstone pages (CLAUDE.md's GEO rules *require* FAQPage wherever an FAQ section exists), and ~27 pages do so. Cross-cutting buyer-operations Q&As are canonical only at `/faq` (home/factory/samples deliberately emit no FAQPage to avoid duplicating it). Canonical FAQ homes: SHT → `logistics/un-1361`, COA → `quality/certifications`, MSDS → `logistics/documents`. **Only a *duplicate* of the same Q&A set on a non-home page, or a wrong-type node, is a Defect** — a self-canonical FAQPage with page-unique questions is correct, NOT a defect, and must not be flagged. (Validity/completeness of the JSON-LD is DrMax's job — do not check it here.)
- **GEO extractability.** No primary content hidden behind JS-only tabs/accordions/modals. Key terms have definition-form sentences ("Coconut shell charcoal is…"). Numeric data present where the topic allows (specs, durations, dimensions, weights, percentages). Cornerstone/article pages carry the top-of-page meta table: Author, Reviewed by, Fact-checked, Last updated, Read time. Missing = **Defect** (cornerstone) or **Hardening** (minor pages).
- **i18n integrity.** No user-visible hardcoded strings in components; all route through the i18n layer. Labels may reference facts; never contain fact values.
- **Regulatory currency (content level).** Regulatory claims (UN 1361 / IMDG 42-24 / SP 978 / EUDR / Russia VAT / SABER / HS 4402.20 duties) carry a visible review date, and their `lastVerified` is tied to a real regulatory event — not a cosmetic annual bump. Stale or event-less dating = **Hardening**, unless the claim is now factually wrong = **Defect/Blocker** (route the claim to Pass 3 / deep research).

---

## Pass 2 — Structure, snippet & GEO optimization (recommendations, not rewrites)

For each finding give the exact heading or paragraph anchor and the recommended change. **Describe** the fix; do not write replacement prose.

- **Headings as questions.** Each H2/H3 is phrased as a question the target buyer asks, or flag it and supply the question form.
- **Featured-snippet lead.** Immediately under each heading, a 1–2 sentence self-contained answer. Flag headings whose first paragraph buries or omits the direct answer.
- **Intent per paragraph.** Tag each paragraph with the specific search intent it serves. A paragraph serving no intent is fluff → flag to delete or repurpose.
- **Anti-bloat.** Flag any paragraph compressible ≥20% without losing facts; flag thesis restated in different words.
- **Section coherence.** Each H2 addresses one intent cluster. Flag cross-cluster bleed.
- **Logic, coverage, duplication.** Note gaps in the argument, important sub-topics uncovered, and duplicated meaning across sections.
- **Devil's Advocate.** After the section that proves the page's main thesis, is there a steelman section stating the strongest industry counterargument, when it holds, and a data-grounded response? Missing on a cornerstone/guide page = **Defect**; on a minor page = **Hardening**.
- **Quantified evidence.** Every benefit/advantage claim is backed by specific measurable data. Flag abstractions ("improves quality" with no number).
- **Mini-cases.** Cornerstone pages carry ≥1–2 Problem → Action → Result structures with a measurable result. Flag if absent.

---

## Pass 3 — Fact-check & claims register

1. **Extract** every hard claim: statistics/percentages, dates and effective dates, names/titles/company names, superlatives ("first", "only", "largest"), cause-effect assertions.
2. **Verify** in priority order: `COMPANY_TS` > `VERIFIED_FACTS` > model knowledge.
3. **Status** each: **Correct** / **Error** (contradicts a source) / **Unverified** (needs external check).
4. **Severity** for SEO + reputation: Low / Medium / High.
5. Emit the **Claims register** table and a separate **Requires external verification** list. The latter is the trigger for the deep-research companion prompt.

Claims register columns:

| Claim in page | Status | Severity | Correction / comment | Source (company.ts / verified-facts / model) |
|---|---|---|---|---|

---

## Pass 5 — E-E-A-T / HCU assessment

Score 1–10 per criterion across the five levels (authorship & expertise; topical authority; technical health & freshness; effort; originality; citation quality; freshness/timeliness; page intent; structure & readability; mobile; format-standard adherence; trust & spam signals). For UX/mobile/technical-health criteria, read the built HTML and **reference** the CWV/Lighthouse budgets in `CLAUDE_MD` and the `DRMAX_TECHNICAL` results — do not re-measure performance here.

Output:
- Per-criterion score + one-line justification.
- Verdict: helpful-first vs search-first; goodClicks vs badClicks prognosis.
- **PQ** = arithmetic mean of the 12 scores, /10.
- Action steps for the 2–3 lowest-scoring criteria.

---

## Pass 6 — Ontology & semantic gaps (OPTIONAL — only if `RUN_PASS_6 = true`)

- Build a directed knowledge graph G(E, R) of the page's domain as (subject, predicate, object) triples; maximize density.
- Flag entities with connectivity degree ≤ 1 as **semantic gaps**. Each gap doubles as an **internal-link opportunity** to a sibling cocoon page — name the candidate target page.
- **Triangulation:** confirm the page positions itself against (1) Genesis — author/manufacturer/source; (2) Taxonomy — its class vs. archetypes; (3) Pragmatics — concrete buyer outcomes. Flag any of the three that is absent.

---

## Consolidated output (the deliverable)

Produce one report in this order. Nothing else.

1. **Manifest** (from Pass 0).
2. **Severity-tiered TODO list.** Three tiers, each item: `ID | tier | pass+rule | exact location | what's wrong | recommended fix (described, not executed)`.
   - **Blockers** — honesty-gating violation, hardcoded company fact, fabricated/uncited claim, real orphan/broken pillar link, misplaced FAQPage, build failure, regulatory claim now factually wrong.
   - **Defects** — factual Error from Pass 3, missing required schema type, snippet/heading/structure failures, missing Devil's Advocate on cornerstone, missing GEO meta table on cornerstone.
   - **Hardening** — anti-bloat, missing mini-cases, freshness cadence, connectivity gaps, minor-page omissions.
3. **Claims register** table (Pass 3).
4. **Requires deep research** list — claims to route to the deep-research companion prompt.
5. **E-E-A-T summary** — PQ score, helpful-first/search-first verdict, lowest-3 action steps.
6. (If `RUN_PASS_6`) **Semantic-gap & internal-link opportunities.**

Then **stop**. Await approval before any change is made elsewhere.

---

## Changelog

- **v1.0** — Initial. Orchestrated single-page audit: Passes 0,1,2,3,5 + optional 6. Honesty-gating and muted-`MaybeLink` false-flag guards; DrMax technical-mechanics boundary; canonical FAQ-home enforcement.
