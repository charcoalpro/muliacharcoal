# Build Prompt — `/logistics` Pillar Hub (v1)

> **For:** Claude Code, senior SEO/GEO engineer on the muliacharcoal.com codebase.
> **Inherits the conventions established by `packaging-hub-build-prompt-v6` and its cluster** — components (`KeyFactsBox`, `Figure`, `PhotoGrid`, `VideoFacade`), graceful degradation (no raw tokens; missing fact → omit/"—"; missing price → "Available on request"), facts only from `company.ts`, full E-E-A-T block, FAQPage one-home dedup, zero client JS (YouTube facade only), AVIF/lazy/explicit-dims, RTL-safe, metric, English + full hreflang, sitewide CTAs with analytics events, and the three-part verification (JS-off extractability, Rich Results, build + Lighthouse floor). Do not re-derive these; apply them.
> **Decisions baked in (from Greg):**
> - **Charcoal ships as declared dangerous goods — UN 1361, IMDG Class 4.2 — with SHT provided.** All DG content must reflect this accurately. Never imply non-DG/exempt shipping.
> - `/logistics/rules` covers **all four scopes**: container & loading rules, incoterms & shipping terms, order & payment terms/process, booking & vessel schedule.
> - **`/logistics/import-to-usa` is the pilot** country page; other countries replicate later.
> - **Markets split:** `/markets/{country}` = commercial landing (demand, products, why-us); `/logistics/import-to-{country}` = import mechanics (HS code, duty, docs, ports, regs). Cross-link, never duplicate.
> **Scope:** Build **only** the `/logistics` hub. The four children (`/logistics/rules`, `/logistics/documents`, `/logistics/UN-1361`, `/logistics/import-to-usa`) are separate prompts; link to their final URLs now (forward-refs tracked).

---

## STEP 0 — Preflight

- **Components:** `KeyFactsBox`, `Figure`, `PhotoGrid`, `SpecsTable`, `FAQSection`, Breadcrumbs, CTABanner, StickyWhatsApp should already exist from the packaging build. Verify; if any shared component is missing, STOP and flag.
- **Nav + sitemap:** ensure `/logistics` appears in the main nav and/or footer and the sitemap config (no orphan).
- **Forward-reference check:** the four children + `/markets/usa` + `/packaging` (+ its cluster) + `/quality/certifications` + `/samples` + `/faq` + `/glossary`. Link to final URLs regardless; list not-yet-built targets in build notes.
- Output a plan (sections, `company.ts` diff for the new `logistics` object, FAQ-canonical split, container-data reconciliation choice — see §5) and **wait for approval**.

---

## 1. Search-AI modeling (logistics queries)

Answer engines decompose *"shipping charcoal from Indonesia / transit time Semarang to Jeddah / charcoal export documents / is charcoal dangerous goods / charcoal HS code / import charcoal to USA"* into a taxonomy: a parent (*exporting coconut shisha charcoal from Indonesia*) with children the model resolves separately — **transit & schedule** (pure numbers: days, ports, UN/LOCODEs), **export documents** (a list the model wants defined, not just named), **DG classification** (UN 1361 / Class 4.2 / IMDG — regulatory entities with authoritative anchors), **commercial terms** (incoterms, payment process), and **country import mechanics**. Extraction rewards: per-port transit rows with **UN/LOCODE tokens** (e.g. SAJED, NLRTM) sitting next to day-ranges; definition-form sentences for each document and term; an end-to-end timeline with durations; and a Q&A surface. The hub's job is the **overview + the transit table** (the single highest-value extractable in this pillar — competitors have the data but stale or buried), with machine-explicit `CollectionPage hasPart` down-links to four deep children.

**Competitive gap (from the teardown):** no competitor has a logistics pillar+cluster; none has country import pages, an HS code, or document *explanations*; glowingcharcoal's transit data is stale (2022) and from a different port; charcoal.pro publishes its SWIFT codes (we never do). You ship from the **same port as charcoal.pro (Semarang IDSRG)** — match their transit-table factual bar, beat them on structure, freshness, and schema.

---

## 2. Hard constraints

- **Facts only from `company.ts`** — add a `logistics` object (§5). No fact in page/component/i18n/JSON-LD.
- **DG accuracy:** charcoal is shipped **as declared UN 1361, Class 4.2 dangerous goods**, with Self-Heating Test (SHT) documentation provided. State implications honestly (not all lines carry DG; DG freight costs more; booking takes longer) — this is trust-building, not a weakness to hide. Depth lives on `/logistics/UN-1361`; the hub carries a short accurate overview.
- **NEVER publish banking details** (account numbers, SWIFT, bank names). **Payment TERMS are publishable** (methods, currencies, down-payment %, balance trigger) as `company.ts` placeholders. Charcoal per-ton price never appears.
- **Transit times are indicative:** every transit figure renders with *"Indicative; varies by shipping line and season; last updated [transitTimesLastUpdated]"* and triggers a `dateModified` bump when changed (same freshness pattern as prices).
- **Never copy competitor numbers.** Transit days, tonnages, lead times: Greg's values or graceful omission.
- **Customs clearance is the buyer's responsibility** — the factory exports and documents; it does not clear destination customs (broker referral if `brokerReferralAvailable`). State this plainly.
- Everything else per the inherited conventions (zero JS, budgets, RTL, metric, i18n strings, no Product/Offer/Service schema on the hub).

---

## 3. Page location & i18n

`/src/pages/logistics/index.astro`; all user-visible strings in `en.json` under a `logistics.*` namespace (headings, table labels, the indicative-transit caveat, FAQ text, captions/alts).

---

## 4. Page structure (top → bottom)

1. **Header** + **Breadcrumbs** (Home › Logistics).
2. **Hero** — H1 (< 60 char, e.g. *"Shipping Coconut Charcoal from Indonesia: Logistics & Export"*) + definition-form lead + primary CTA. Text-led.
3. **Full E-E-A-T block** (from `editorial.*` — reuse the packaging pattern; a logistics-specific reviewer may be set later, Data Gap).
4. **`KeyFactsBox` — "Shipping at a glance":** port of loading (name + UN/LOCODE); alt ports; FCL policy + LCL (if `lcl.available`); 20ft net-tons range (+ 40HQ if offered); incoterms offered (default FOB); **ships as UN 1361 Class 4.2 DG, SHT provided**; documents provided (count + "full list →"); production lead times; customs cleared by buyer; transit headline (e.g. fastest/slowest priority-market range). Graceful degradation.
5. **Intro / parent-entity section** — 2–3 definition-form paragraphs: what exporting charcoal from Indonesia involves (production → trucking → port → DG booking → transit → buyer's customs).
6. **Child-entity sections — one per cluster page** (anchor, H2, definition, 2–3 key facts, one Figure, "Full details →"):
   - **Shipping rules & terms** → `#rules` → `/logistics/rules` (loading, incoterms, order & payment process, booking & schedule).
   - **Export documents** → `#documents` → `/logistics/documents`.
   - **UN 1361 / dangerous goods** → `#un-1361` → `/logistics/UN-1361` (ties to packaging DG markings → cross-link `/packaging`).
   - **Import to the USA** → `#import-usa` → `/logistics/import-to-usa` (pilot; note more countries coming **without** linking non-existent slugs beyond USA).
7. **Transit-time table (the centerpiece)** — `SpecsTable`/table: columns **Destination port · UN/LOCODE · Country · Transit (days)**, rows from `logistics.transitTimes[]` (graceful: rows with empty days are omitted). Below it: trucking-to-port duration, vessel booking lead, departure days, transshipment route — each one line from config. End with the indicative/last-updated caveat.
8. **End-to-end order timeline** — compact sequence with durations: order confirmed → production ([leadTimes]) → trucking to port → DG booking/loading → transit ([range]) → arrival → **customs clearance by buyer**. Reuses the timeline pattern from white-label.
9. **DG overview (short)** — 3–4 sentences: declared UN 1361 Class 4.2, IMDG, SHT provided, markings on packaging (→ `/packaging`), carrier implications → one link to `/logistics/UN-1361`. No depth here.
10. **FAQ** (`FAQSection`, `FAQPage`) — hub-canonical only (§6).
11. **Related topics** — down to all four children; across to `/markets/usa` (with one sentence framing the split: "market overview vs import mechanics"), `/packaging` (DG markings, container loading), `/quality/certifications` (SHT/COA), `/samples` (courier shipping for samples), `/faq`, `/contact`, `/glossary`.
12. **CTABanner** + **Footer** + **StickyWhatsApp**.

**Media:** lighter than packaging — a small photo manifest (container loading at the factory [may reuse/crop the packaging 'additional' shots], truck departing, sealed container with DG placard, document pack), interleaved with captions/alt per the inherited rules. **No mandatory video.** If the container-loading video is embedded, it is embed-only — its `VideoObject` is canonical on `/packaging/additional-packaging`; do not emit it here.

---

## 5. `company.ts` — new `logistics` object

```ts
logistics: {
  portOfLoading: { name: '', unlocode: '' },     // e.g. Semarang (Tanjung Emas), IDSRG — reuse existing company fact if present
  altPorts: [],                                   // e.g. [{ name:'Surabaya', unlocode:'IDSUB' }]
  truckingFactoryToPortHours: '',
  vesselBookingLeadDays: '',
  departureDays: [],                              // e.g. ['Fri','Sat']
  transshipmentVia: [],                           // e.g. ['Singapore','Port Klang']
  containers: {
    teu20NetTonsRange: '',                        // e.g. '17.5–20'
    hq40Available: null, hq40NetTonsRange: '',
    perShapeYieldNote: '',                        // container yield varies by shape; details on SKU pages
  },
  lcl: { available: null, marketsServed: [], minTons: '' },
  incoterms: [], incotermDefault: 'FOB',
  payment: {                                      // TERMS only — banking details NEVER in config or on any page
    methods: [], currencies: [],
    downPaymentPct: '', balanceTrigger: '',       // e.g. 'against B/L copy'
  },
  dg: { shippedAsUn1361: true, imdgClass: '4.2', shtProvided: true, dgFreightNote: '' },
  documentsStandard: [], documentsAdditional: [], // ids resolved on /logistics/documents
  transitTimes: [],                               // { destPort:'', unlocode:'', country:'', daysMin:'', daysMax:'' }
  transitTimesLastUpdated: '',
  customsClearanceByBuyer: true, brokerReferralAvailable: null,
  leadTimes: { production20ft: '', production40ft: '' },
  samplesShipping: { couriers: [], paidBy: 'buyer' },
}
```

**Container-data reconciliation (surface, don't silently resolve):** `packaging.containerLoad` already holds 20ft box-count + net-kg (the box math); `logistics.containers` holds tonnage ranges + 40HQ. These describe the same physical fact from two angles and can drift. **Default (no churn): keep both, with `packaging.containerLoad` authoritative for 20ft box math and `logistics.containers` for tonnage ranges/40HQ; the hub reads both; a consistency check goes in the gate.** Alternative (cleaner, more churn): consolidate under `logistics` and update the three packaging prompts + checklist. State the choice in the build plan.

---

## 6. FAQ-canonical split (declare now, across the whole cluster)

- **Hub-canonical (`FAQPage` here):** What port do you ship from? · How long is transit to [region/my port]? · Do you ship FCL only, or LCL? · What incoterms do you offer? · Who handles customs clearance in my country? · How long until my order ships (lead time)? · Do you offer 40ft containers?
- **UN-1361-page-canonical:** Is charcoal dangerous goods? · What is UN 1361 / Class 4.2? · What is the SHT? · Why do some lines refuse charcoal / charge more?
- **Documents-page-canonical:** What export documents do you provide? · What is a [B/L, COO, MSDS…]? · Which documents does my country require?
- **Rules-page-canonical:** Payment terms/process? · Loose vs palletized? · Can I mix sizes in one container? *(if not already `/faq`-canonical — check and pick ONE home)* · Booking/schedule questions.
- General MOQ (18 t) / general payment Qs already on `/faq` stay there (link only). One Q/A = one `FAQPage` home, enforced across the cluster.

---

## 7. Schema

**`CollectionPage`** (`hasPart` → the four children) + **`BreadcrumbList`** + **`FAQPage`** (hub-canonical set). `datePublished`/`dateModified` from `editorial.*`; `dateModified` bumps with `transitTimesLastUpdated`. **No `Product`/`Offer`/`Service`; no `VideoObject`** (lives on additional-packaging). `DefinedTerm`s live on the children (UN 1361 on its page → `#un-1361` glossary anchor; document terms on the documents page).

---

## 8. Content coverage gate

- [ ] Parent entity defined in first 100 words; E-E-A-T block; up-links from nav (no orphan).
- [ ] KeyFactsBox with port + UN/LOCODE, container tonnage, FCL/LCL, incoterms, **accurate DG line**, docs count, lead times, customs-by-buyer.
- [ ] All four children: anchor, definition, key facts, Figure, down-link.
- [ ] **Transit table** rendered from `transitTimes[]` with UN/LOCODE column + indicative/last-updated caveat; empty rows omitted; trucking/booking/departure/transshipment lines present.
- [ ] End-to-end timeline with durations; customs-by-buyer stated.
- [ ] DG overview short, accurate (declared UN 1361 Cl. 4.2, SHT), one link to UN-1361 page; markings cross-link to `/packaging`.
- [ ] Markets split framed in one sentence at the `/markets/usa` cross-link; no duplicated market content.
- [ ] No banking details; no charcoal price; payment terms only as config placeholders; no competitor numbers.
- [ ] FAQ = hub-canonical set only, valid `FAQPage`; the four-way split documented in build notes.
- [ ] Photos interleaved with captions/alt per inherited rules; no `VideoObject`.
- [ ] Schema validates: CollectionPage + BreadcrumbList + FAQPage; nothing else.
- [ ] No raw tokens; all strings i18n; container-data reconciliation choice stated; `dateModified` set.

---

## 9. Data Gaps report

Every unpopulated `logistics.*` key by exact name — **especially every `transitTimes[]` row (this is the #1 site-wide data gap)**, `transitTimesLastUpdated`, port/alt-ports, container tonnages + 40HQ availability, LCL policy, incoterms list, payment terms, lead times, trucking/booking/departure/transshipment, broker referral; the photo manifest; the logistics reviewer for E-E-A-T; the container-data reconciliation decision; confirmation that `/logistics/rules` keeps its slug (it's referenced by three packaging prompts — renaming ripples; default: keep).

---

## 10. Out of scope / dependencies

- The four children are separate prompts (next), built on the cluster template.
- `/markets/usa` (Markets pillar) is a later pillar; the split is declared here and respected there.
- Glossary gains `#un-1361` (already in the consolidated revision sheet); document-term anchors will be decided in the documents-page prompt (likely self-anchored on that page rather than bloating the glossary).
- LCL, 40HQ, incoterms beyond FOB: placeholder facts — confirm at fill-time.

---

## Working style

Per the inherited working style: restate understanding + assumptions, flag conflicts (esp. the container-data reconciliation), deliver the Step-0 plan, **wait for approval**, surgical changes only.
