# Build Prompt — `/logistics/import-to-{uk,germany,saudi-arabia,russia}` (v1, delta)

> **For:** Claude Code. **This is a DELTA — not executable alone.**
> **Requires in context:** `logistics/logistics-hub-build-prompt-v1.md` (conventions) **and the LIVE template** `src/pages/logistics/import-to-usa.astro` (the canonical import-to-country page) **and** `logistics-import-research-findings.md` (all per-country regulatory facts). Also: `CLAUDE.md`, `DESIGN.md`, `/src/config/company.ts` (the `logistics.usaImport` typed shape + `commercial.transitTimes`), and the logistics schema builders in `/src/lib/schema`. Everything in `import-to-usa.astro` applies unless this delta overrides it.

> **Decisions baked in:**
> - **These four pages REPLICATE the import-to-usa template exactly** — same sections, same `logisticsClusterPageSchema` (WebPage + FAQPage + TechArticle + optional HowTo), same config-driven / source-linked / dated / graceful-degradation discipline. Every regulatory cell comes from a per-country config object, carries a source URL + as-of date, and degrades to "—"/omit when unset.
> - **Refactor (Step 0) — generalize, do NOT copy-paste ×4.** `import-to-usa.astro` is a standalone file. Extract its body into a reusable template. **Preferred:** a dynamic route `src/pages/logistics/import-to-[country].astro` with `getStaticPaths()` over the published import countries, reading `company.logistics.imports[country]`; **USA migrates into it too — behavior-preserving (verify the USA page renders an equivalent document).** Alternative: a shared `ImportCountryPage.astro` component + thin per-country pages. Propose, show the diff, and **WAIT for approval** (touches a live page).
> - **Per-country config contract** — add the four import objects mirroring `logistics.usaImport`'s typed shape, with two generalizations:
>   - (a) USA's `fda` block becomes a generic **`countryAgency`**: `{ heading, items: [{label, value, sourceUrl}], disclaimer }` — UK → UK REACH / UKTR; Germany → EU REACH + **EUDR**; Saudi → SASO/SABER (+ SFDA if in scope); Russia → EAEU/EAC + the sanctions/feasibility caveat.
>   - (b) add a **`vat`** layer the USA page lacks: `{ name, ratePct, recoverableNote, asOf, sourceUrl }`, rendered as a dated row in the duty section (or a dedicated "Import VAT" sub-section) with a recoverability note. Generalize so the section omits when `vat` is absent (USA).
>   Keep `htsCandidates[]`, `dutyLayers[]` (dated, legal-status, source-linked), `entryNotes{}`, `dutyHistory`, `adcvd`/trade-remedy, `lastVerified`; **add `preference`** (DCTS/GSP/EAEU/GCC origin-preference note + origin doc). Slugs: `import-to-uk`, `import-to-germany`, `import-to-saudi-arabia`, `import-to-russia`.
> - **Russia honesty caveat (mandatory, prominent, standalone).** State plainly the current carrier-acceptance and banking/payment constraints for Russia (facts from research, not editorializing) and route to `/contact` to confirm current feasibility before committing — same honesty principle as the DG disclosure. If materially constrained, do not imply frictionless shipping.
> - **Markets split respected.** Each page's intro + Related cross-links `/markets/{country}` (commercial lander) via `MaybeLink` (muted until the Markets pillar ships) — never duplicate commercial content. Slugs: `/markets/uk`, `/markets/germany`, `/markets/saudi-arabia`, `/markets/russia`.
> - **Ports auto-populate** from `commercial.transitTimes` filtered by the exact `country` strings already in `company.json`: **"United Kingdom", "Germany", "Saudi Arabia", "Russia"** (rows exist: GBFXT, DEHAM, SAJED, RULED). Missing → section omits (graceful).
> - **Hub + nav update.** Add the four routes to `LIVE_ROUTES` (`src/config/nav.ts`); update the `/logistics` hub's import child-section + Related to list all five country pages (it surfaces only USA today). Show the hub diff.
> - Cite-or-omit everywhere; never publish a per-ton charcoal price; landed-cost labeled illustrative FOB; no banking details.

---

## STEP 0 — Preflight & plan (then STOP for approval)
- Confirm the template page + `logistics-import-research-findings.md` are in context; confirm the `commercial.transitTimes` country strings.
- Propose the **refactor** (dynamic route vs shared component) + the `company.logistics.imports` shape + the `countryAgency`/`vat`/`preference` generalizations + the **USA-migration behavior-preservation check**.
- Output: the refactor diff plan, the `company.ts` config diff (4 country objects + generalized fields), the i18n namespace plan, the hub + nav diffs. **WAIT for approval.**

## i18n
Reuse `logisticsCommon` (metaBlock, caveats, dash); generalize `fdaDisclaimer` → `countryDisclaimer` (keep + add). Add a shared `logisticsImportCommon` for repeated section headings/labels, plus per-country `en.logisticsImport{Uk,Germany,SaudiArabia,Russia}` (or a keyed structure) for country-specific prose: H1/title/description templates, HS notes, duty/VAT intro, `countryAgency` items, the Russia caveat, FAQ, Related. **No fact values in i18n** — labels/prose only; numbers live in config.

## Page structure (per country) — mirror import-to-usa with the VAT + agency adaptations
1. **Breadcrumbs** (Logistics › Import to {Country}).
2. **Hero** (H1 < 60, e.g. *"Importing Coconut Charcoal to the UK"*) + WhatsApp + contact CTAs.
3. **ArticleMeta** (lastUpdated = `{country}Import.lastVerified`).
4. **Intro** — up-link to `/logistics` + cross-link to `/markets/{country}` (muted).
5. **KeyFactsBox** — HS code · duty · **import VAT** · documents · customs-by-buyer · country-agency headline.
6. **HS classification** — candidates (code + note + source URL); resolve 4402.20 vs 4402.90 per findings.
7. **Duty & import VAT** — dated layer-stack table (layer · rate · as-of · status) INCLUDING the VAT row + recoverability note; **preference/origin** note (DCTS/GSP/EAEU/GCC); trade-remedy/anti-dumping if any; duty caveat.
8. **Landed-cost example** — illustrative FOB + freight + duty + VAT (labeled illustrative; never a real per-ton price); link `/logistics/rules`.
9. **Entry process** — HowTo steps from `entryNotes` (graceful); link `/logistics/documents`.
10. **DG handling at destination** — UN 1361 Class 4.2 arrival; links to `/logistics/un-1361`, `/logistics/charcoal-dg-regulation`, `/logistics/cargo-protection-and-insurance`.
11. **Country-specific regulatory section** (`countryAgency`) — UK REACH/UKTR · Germany REACH + **EUDR** · Saudi SASO/SABER(/SFDA) · Russia EAEU/EAC + **sanctions/feasibility caveat** — labeled items + standalone disclaimer (`countryDisclaimer`).
12. **Ports** — from `commercial.transitTimes` filtered by country (omit if none).
13. **FAQ** (`FAQSection` + `FAQPage`) — country-canonical import Qs.
14. **Related** — down to the other logistics children; across to `/markets/{country}` (muted), `/quality/certifications` (conformity/COA), `/packaging` (DG markings), `/faq`, `/contact`.
15. **CTABanner**.

## Schema
`logisticsClusterPageSchema({ path: '/logistics/import-to-{country}', faq, techArticle, howTo? })` per page — WebPage + FAQPage + TechArticle + optional HowTo. **No Product/Offer.** `dateModified` from `{country}Import.lastVerified`.

## Gate (per page)
- [ ] Every regulatory cell (HS, each duty layer, VAT, agency item) is config-sourced, dated, and source-linked or "—"; zero fabricated/undated figures; no competitor numbers.
- [ ] Import VAT stated with rate + recoverability; duty preference (DCTS/GSP/EAEU/GCC) + origin doc stated or omitted.
- [ ] **Russia page carries the standalone carrier/payment feasibility caveat** routing to `/contact`.
- [ ] Markets cross-link present (muted ok); up-link to `/logistics` in the intro.
- [ ] Ports section renders the country's transit rows (or omits cleanly).
- [ ] Country-agency section + standalone disclaimer present; **EUDR covered on Germany** if in scope.
- [ ] Schema validates (WebPage + FAQPage + TechArticle [+ HowTo if steps]); no Product/Offer.
- [ ] Routes in `LIVE_ROUTES`; hub import-section + Related list all five countries; **USA page output unchanged by the refactor** (behavior-preserving — diff the rendered HTML).
- [ ] JS-off extractable; no raw `[[token]]`; all strings i18n; `lastVerified` set; `npm run build` clean; Lighthouse floor (Perf ≥95, A11y ≥95, BP ≥95, SEO 100).

## Data Gaps report
Every empty per-country config key (`htsCandidates`, `dutyLayers`, `vat`, `countryAgency` items, `entryNotes`, `preference`, `lastVerified`) by name; any research item UNVERIFIED → "—" + logged; **EUDR scope/timeline (DE), SABER/SFDA scope (SA), EAC scope + Russia feasibility (RU)** confirmations; additional ports to add to `commercial.transitTimes` (Dammam SADMM, Bremerhaven DEBRV, Novorossiysk RUNVS, London Gateway GBLGP); the refactor decision; a logistics/DG reviewer for `ArticleMeta`.

## Working style
Restate understanding + assumptions; flag the refactor, the Russia caveat, and the EUDR finding; deliver the Step-0 plan with diffs; **WAIT for approval**. Surgical, behavior-preserving changes only.
