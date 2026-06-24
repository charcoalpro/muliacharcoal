# Content Audit — `/about`

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report, no fixes)
**Pillar:** supporting (not a cluster member)
**Cornerstone:** no (minor page — missing meta-table / Devil's-Advocate = Hardening, not Defect)
**Passes run:** 0, 1, 2, 3, 5 (Pass 6 OFF)

---

## 1. Manifest (Pass 0)

| Item | Value |
|---|---|
| Page file | `src/pages/about.astro` (pure composition shell) |
| Layout | `src/layouts/BaseLayout.astro` (`includeOrgSchema={false}`, `prefetch={['/contact']}`) |
| Block components | `AboutHero`, `CompanyOverview`, `LegalInformation`, `Banking`, `Team`, `OwnerVideo`, `Brands`, `MissionVision`, `Reviews` (all under `src/components/about/blocks/`) + `Breadcrumbs`, `CTABanner` |
| Shared sub-components | `HeroSection`, `ColorBlock`, `StatItem`, `DataTable`, `BankDetailsTable`, `TeamCard`, `ImagePlaceholder`, `TextLink`, `Button`, `Section` |
| i18n source | `src/i18n/en/about.json` (namespace `en.about`) |
| Schema builder | `src/lib/schema/aboutPage.ts` |
| `company.ts` / data fields consumed | `legalName`, `foundingYear`, `registration.nib`, `registration.taxId`, `address.*`, `googleMapsUrl`, `commercial.portOfLoading`, `commercial.oemAvailable`, `commercial.shippingLines`, `commercial.exportMarkets`, `production.{capacityTonsPerDay,capacityTonsPerMonth,lines,ovens,rawMaterial,factoryAreaSqm,palmTreesCount,sourcingVillages,sourcingRegion,carbonizationPlant}`, `certifications.{iso9001,imdg,patents,halal}`, `payment.{currencies,acceptsCrypto}`, `bank.lastVerified`, `social.*`, plus `people.json` via `getOwner()` / `getOperations()`; helpers `imdgLabel()`, `portOfLoadingLabel()`, `hasFact()` |
| Pillar placement | Supporting page (Home/Blog/FAQ/Samples/Contact/**About** tier). Incoming permanent links: `headerNav` (nav.ts:110) + `footerCompanyNav` (nav.ts:118). **Not an orphan.** |
| Schema types emitted (built HTML, `dist/about/index.html` line 110) | `AboutPage`, `Organization` (rich), `ImageObject`, `PostalAddress`, `Person`, `PropertyValue` ×2, `BreadcrumbList`, `ListItem` ×2 |
| FAQPage present? | **No** — correct (FAQPage emits only at `/faq`). |
| H1 | Exactly one: "About our charcoal factory" (built HTML line 110). |
| Build | dist already present; build not re-run per run constraints. No resolution failure. |

Honesty-gating observed working correctly (do NOT flag): supply-chain block, palm-trees rows, shipping-lines pills, halal sentence, patents sentence, crypto suffix all gate on real facts; crypto suffix correctly omitted (`acceptsCrypto:false`); `/factory/virtual-tour` banner gated on `isLive()`; social pills gate on present URLs. Image/review/video placeholders are intentional pending-asset omissions.

---

## 2. Severity-tiered TODO list

### Blockers

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| B1 | Blocker | Pass 1 — hardcoded company fact + Pass 3 factual Error | `src/i18n/en/about.json` → `block6.transcriptPlaceholder` (line 175). Renders in `dist/about/index.html` line 124 inside the "Transcript / summary" section of the OwnerVideo block. | The transcript hardcodes an owner name: **"Hello — my name is Wilson Gosalim."** (1) This is a company fact (owner/director name) embedded as a literal in an i18n file, which CLAUDE.md forbids — owner/staff names must come only from `company.ts`/`people.json`. (2) It is factually wrong: the canonical owner in `people.json` is **Mohamad Sinno** (`displayIn:["owner"]`), and the owner card on the very same page (built HTML line 124, via `getOwner()`) renders "Mohamad Sinno". No "Wilson Gosalim" exists in `people.json` (the nearest is "Henry Gosalim", a Director). The page therefore presents two contradictory owner names to a crawler/AI in adjacent DOM nodes. (Same string also appears in `src/i18n/en/faq.json` line 218 — out of this route's scope, but the root cause is shared and must be fixed there too.) | Remove the hardcoded name from the i18n string. Convert the transcript template to interpolate the owner name from `getOwner()?.name` (as `videoAltTemplate` already does in the same block) — e.g. a `{{owner}}` token filled in `OwnerVideo.astro`. Do not write any name literal into the repo; the value must resolve from `people.json`. Apply the identical fix to `faq.json` line 218. |

### Defects

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 1 — honesty-gating (held-cert vs per-order-report distinction) / Pass 3 internal-consistency | `about.json` → `block2.certifications.bodyTemplate` (line 51): "Every shipment travels with {{imdgLabel}} documentation, an independent Self-Heating Test (SHT), and a Preferential Certificate of Origin." Renders in built HTML lines 111/124. | Overstates two per-order items as guaranteed-with-every-shipment, blurring held-vs-per-order. The canonical logistics facts say the SHT is **on request / paid add-on**, not standard with every shipment (`logistics.dg.sht.onRequest:true`; `documentsAdditional` SHT = "On request (paid add-on)"; `sht.note`/`n4Note`: since IMDG Amdt 42-24 the SHT is "supporting evidence only"). The Certificate of Origin is standard, but its **preferential** status is destination-conditional (`documentsStandard` COO buyerUse: "where applicable"; `coo.types`: preferential *or* non-preferential Form B). Asserting "an independent SHT, and a Preferential Certificate of Origin" with "Every shipment" contradicts the company's own logistics source. | Reword to preserve the held-vs-per-order line: state the IMDG/DGD paperwork travels with every DG shipment; describe the SHT as available on request (supporting hazard evidence) per the logistics config; describe the Certificate of Origin as standard, with a *preferential* COO available where a destination trade agreement applies. Drive the wording from the logistics `documentsStandard`/`documentsAdditional`/`coo` facts rather than asserting a fixed bundle. |

### Hardening

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 2 — snippet/readability (grammatical agreement) | Hero pill, `about.json` `hero.pillIsoWithPatentsTemplate` (line 12) → built HTML line 110: "ISO 9001:2015 certified, **1 patents registered**, audited by …" | Plural "patents" with count 1 (`certifications.patents.length === 1`). Reads as a template bug to a buyer and to an AI extractor. | Add a singular/plural branch (or pluralization helper) so count 1 renders "1 patent registered". |
| H2 | Hardening | Pass 2 — snippet/readability (grammatical agreement) | `about.json` `block2.certifications.patentsTemplate` (line 52) → built HTML line 111: "We hold **1 patented manufacturing technologies** for charcoal briquetting." | Same singular/plural mismatch ("1 … technologies"). | Branch the template for count 1 → "1 patented manufacturing technology". |
| H3 | Hardening | Pass 1 GEO — numeric extractability / Pass 2 readability | Palm-tree count renders unformatted as "28000+": hero pill (built HTML line 110, "Manages 28000+ palm trees"), supply-chain block (line 111), legal table row (line 112). Source token `{{count}}+` in `about.json` `hero.pillPalmTreesTemplate`, `block2.supplyChain.*`, `block3.tableValues.palmTrees*`. | Large integers are emitted without a thousands separator. "28000+" is harder for buyers to read and a weaker extraction target than "28,000+". Value is correct — formatting only. | Format the palm-tree count with a thousands separator at render (e.g. a number-format helper) so it reads "28,000+" everywhere it appears. |
| H4 | Hardening | Pass 2 — title snippet length (content-SEO, not technical mechanics) | `<title>` in built HTML line 110: "About PT Coco Reina Global Charcoal Indonesia — coconut shisha charcoal factory \| Mulia Charcoal" (~96 chars). Source: `about.json` `meta.titleTemplate` (line 3) interpolating the full `legalName` + BaseLayout brand suffix. | Exceeds the CLAUDE.md SEO budget of a unique `<title>` under 60 characters, keyword-front-loaded. The long legal name plus the "\| Mulia Charcoal" suffix pushes it well past the SERP truncation point. | Shorten the title template: front-load the keyword ("Shisha Charcoal Factory — About …") and use the brand rather than the full legal name, keeping it under ~60 chars before the suffix. Title-tag *syntax* is out of scope; this is a length/snippet recommendation only. |
| H5 | Hardening | Pass 2 — description snippet length | `<meta name="description">` built HTML line 110 (~210 chars). Source: `about.json` `meta.descriptionTemplate` (line 4). | Exceeds the CLAUDE.md budget of <160 characters; Google will truncate it. | Trim to <160 chars, keeping the MOQ/port framing and the click-earning hook. |
| H6 | Hardening | Pass 1 GEO — meta table (minor-page → Hardening per run scope) | Top of page (after AboutHero / start of CompanyOverview). No Author / Reviewed by / Fact-checked / Last updated / Read time table. | Cornerstone meta table is absent. On this minor page that is Hardening, not a Defect — but the page makes E-E-A-T/trust claims (legal, banking, owner) that a "Last updated / Reviewed by" line would strengthen for both buyers and AI citation. | Optionally add a compact "Last updated / Reviewed by" line near the hero, sourced from a `governance.*` / editorial date field — do not hardcode names or dates. |
| H7 | Hardening | Pass 2 — Devil's Advocate (minor page → Hardening) | Whole page. | No steelman section addressing the strongest buyer objection (e.g. "why wire to an Indonesian factory you've never visited") with a data-grounded rebuttal. The page is literally a risk-mitigation page, so a short objection→evidence block would fit its thesis. | Optionally add one short objection→response block (e.g. addressing wire-transfer / beneficiary-name risk) — note the Banking trust block already partially answers this; a single explicit Q/A would consolidate it. |
| H8 | Hardening | Pass 2 — headings as questions / featured-snippet lead | All H2/H3 across blocks ("Who we are", "Legal registration", "Factory & production", "Our supply chain", "Direct shipping", "Factory legal information", "Bank & payment details", "Our team", "A message from our factory owner", "Our brands & export markets", "Our mission & vision", "What our clients say"). | Headings are statement-form, not buyer-question form; weaker for featured-snippet capture and AI Q/A extraction. Definition-style lead sentences are mostly present (good — "We are an Indonesian manufacturer…", "{{legalName}} is a registered Indonesian company…"), so only the heading phrasing is the gap. | Optionally recast key headings as buyer questions ("Is this a legally registered company?", "What is the factory's production capacity?", "Who owns and runs the factory?") to align with GEO Q/A patterns. Low priority on a supporting page. |
| H9 | Hardening | Pass 2 — placeholder prose / freshness | `about.json` `block8.mission.body` ("Mission statement to be confirmed."), `block8.vision.body` ("Vision statement to be confirmed."), `block5.owner.bioFallback` (used only if `owner.bio` is null — currently a real bio exists, so the fallback does not render). | Mission/Vision render visible "to be confirmed" placeholder copy in the built HTML (lines 126–127). Not a fact violation (no fabricated fact), but ships placeholder text to production on a trust page. | Provide real mission/vision prose via i18n (no company facts involved), or gate the Mission & Vision block to omit until real copy exists, consistent with the page's omission-not-fabrication pattern. |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "my name is Wilson Gosalim" (owner, transcript) | **Error** | High | Owner is Mohamad Sinno; "Wilson Gosalim" is not in the roster. See B1. | `people.json` (getOwner) |
| Owner card name "Mohamad Sinno" | Correct | — | Matches `displayIn:["owner"]`. | `people.json` |
| Operations roster (Mohamad Sinno – Operational Director, Teguh Pranomo – QC Manager, etc.) | Correct | — | Rendered names/roles match `people.json` operations entries. | `people.json` |
| "Manufacturing only shisha charcoal since 2015" | Correct | — | `foundingYear: 2015`. | `company.json` |
| "ISO 9001:2015 certified … audited by Carsurin & Beckjorindo" | Correct | — | Matches `certifications.iso9001`. | `company.json` |
| "1 patents registered" / "We hold 1 patented … technologies" | Correct (value) / grammar defect | Low | Count 1 is correct (`patents.length === 1`); plural wording is the issue (H1/H2). | `company.json` |
| "Manages 28000+ palm trees in North Sulawesi, Maluku, NTT" | Correct (value) | Low | Matches `palmTreesCount: 28000`, `sourcingRegion`; formatting only (H3). | `company.json` |
| "11 partner villages … 28000+ palm trees" (supply chain) | Correct | — | `sourcingVillages: 11`, `palmTreesCount: 28000`. | `company.json` |
| Production stats: 4200 m², 14 tons/day, 350 tons/month, 4 lines, 8 ovens, 24 h cycle, tapioca binder, coconut shell | Correct | — | All match `production.*`. | `company.json` |
| "Booked direct with Maersk, MSC, CMA CGM from the FOB Semarang, Indonesia" | Correct | — | `shippingLines`, `portOfLoadingLabel()`. | `company.json` |
| NIB 0220001330412 / NPWP 97.328.977.3-164.000 | Correct | — | Match `registration.*`; sourced via import, not hardcoded. | `company.json` |
| Bank table + "Last verified by phone with the director on 2026-04-25" | Correct | — | `bank.lastVerified: "2026-04-25"`. | `company.json` |
| "halal-certified" sentence + "Halal certified" cert row | Correct | — | `certifications.halal.certified: true`. | `company.json` |
| Export-markets tag cloud (35 countries) | Correct | — | Matches `commercial.exportMarkets`. | `company.json` |
| "Every shipment travels with … an independent SHT, and a Preferential Certificate of Origin" | **Error (internal contradiction)** | Medium | SHT is on-request/paid add-on and "supporting evidence only" post-Amdt 42-24; COO preference is destination-conditional. See D1. | `company.json` `logistics.dg`/`documentsStandard`/`documentsAdditional`/`coo` |
| IMDG label "UN 1361 Class 4.2 (spontaneous combustion)" | Correct | — | `imdgLabel()` from `certifications.imdg`. | `company.json` |
| "OEM / private label — Yes" | Correct | — | `commercial.oemAvailable: true`. | `company.json` |

---

## 4. Requires deep research

| Claim | Why | Markets |
|---|---|---|
| (none) | All hard claims on `/about` resolve against `company.json` / `people.json`. B1 and D1 are internal-source contradictions fixable from existing config — not external-verification questions. No regulatory claim on this page requires an external currency check (the page's only regulatory phrase is the IMDG label, which is owned/verified in the logistics config and carries `lastVerified: 2026-06-15`). | — |

---

## 5. E-E-A-T / HCU summary (Pass 5)

| Criterion | Score /10 | Justification |
|---|---|---|
| Authorship & expertise | 7 | Named owner + full operations roster with roles; owner bio is specific (career history). Undercut by the contradictory "Wilson Gosalim" transcript (B1). |
| Topical authority | 8 | Deep, specification-heavy company profile tightly scoped to shisha charcoal; clear "we only make this" positioning. |
| Technical health & freshness | 7 | Clean static HTML, single H1, breadcrumbs, rich Organization+AboutPage graph; "to be confirmed" mission/vision placeholders (H9) and overlong title/description (H4/H5) drag it. CWV/Lighthouse not re-measured (DrMax scope). |
| Effort | 8 | Nine purpose-built blocks, gated trust signals, document scans, bank table — high evident effort. |
| Originality | 7 | First-party facts (legal IDs, supply chain, bank) not found elsewhere; placeholder mission/vision and image stubs reduce it. |
| Citation quality | 8 | Every fact traces to `company.ts`/`people.json`; outbound links to certifications/logistics/import pages are live and relevant. |
| Freshness / timeliness | 6 | Bank "last verified 2026-04-25" is good; no page-level updated/reviewed date (H6); placeholder copy signals unfinished. |
| Page intent | 9 | Strong match for "is this factory legitimate / who are they" buyer intent; risk-mitigation purpose well served. |
| Structure & readability | 7 | Logical block order, definition-form leads, data tables; weakened by unformatted "28000+" (H3), plural bugs (H1/H2), statement-form headings (H8). |
| Mobile | 8 | 44px touch targets on pills/links, responsive grids, logical-property classes; no obvious mobile issue in markup (not re-measured). |
| Format-standard adherence | 7 | Schema types correct and FAQPage correctly absent; title/description exceed length budgets (H4/H5); no meta table (H6). |
| Trust & spam signals | 6 | Public bank details, legal IDs, beneficiary-name guarantee are strong trust signals — but the owner-name contradiction (B1) is a real trust/spam red flag for a page whose whole job is trust. |

**PQ (arithmetic mean of 12):** (7+8+7+8+7+8+6+9+7+8+7+6) / 12 = **7.17 / 10**

**Verdict:** Helpful-first. The page is built to answer real buyer due-diligence questions with first-party facts, not to chase search. Predominantly goodClicks — a buyer evaluating a wire transfer gets what they came for. The single biggest badClick risk is the contradictory owner name (B1): an AI or a careful buyer noticing two different "owner" names on one page erodes the exact trust this page exists to build.

**Lowest-3 action steps:**
1. **Trust & spam / Freshness (B1, tie-in H6):** Fix the hardcoded, wrong owner name in the transcript so the only owner named on the page is the canonical `getOwner()` value; add a page-level "Last updated / Reviewed by" line sourced from editorial/governance fields.
2. **Freshness / Originality (H9):** Replace or gate the "Mission/Vision — to be confirmed" placeholders so production no longer ships stub copy on a trust page.
3. **Structure & readability (H1, H2, H3):** Fix the singular/plural patent wording and thousands-separator number formatting so factual claims read cleanly to buyers and extract cleanly for AI.
