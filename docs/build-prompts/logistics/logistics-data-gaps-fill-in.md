# Logistics Cocoon — Owner Fill-In & Data Gaps

> **Purpose.** The `/logistics` cocoon (hub + 7 children) is built and live on `feat/logistics-cocoon`. Every field below is currently **empty or seeded**, so its page section **degrades gracefully** (row drops, "—", or "on request"). Fill these to light up the content. **All values go in `src/data/company.json` under `logistics.*`** (or via Sveltia at `/admin/`) — never hard-code facts in pages or i18n.
>
> Generated 2026-06-16. Regulatory facts were transcribed from `verified-facts-intake.md` (checked 2026-06-15). Format: `path` — what's needed → **fill here**.

---

## A. Build-blocker — confirm the document list (SEEDED, not owner-confirmed)

The `/logistics/documents` page renders from these. I seeded a sensible list; **confirm or correct each**.

`logistics.documentsStandard[]` (issued with every shipment) — currently:
- [ ] Commercial Invoice · Packing List · Bill of Lading · Certificate of Origin · MSDS · Dangerous Goods Declaration · Container Vanning/Stuffing Certificate · Export Declaration (PEB)
- Correct issuer / "providedWhen" wording? **notes:** ____________________

`logistics.documentsAdditional[]` (on request, paid) — currently: SHT report · COA · Fumigation/Phytosanitary · Marine Insurance Certificate
- [ ] `documentsAdditional[self-heating-test].cost` → **$______** · `.processingTime` → **____ days**
- [ ] `documentsAdditional[certificate-of-analysis].cost` → **$______** · `.processingTime` → **____ days**

---

## B. Consistency decisions (a call is needed — these contradict elsewhere)

- [ ] **CIF / DAP vs EXW/FOB/CFR.** `logistics.incoterms` = `["EXW","FOB","CFR"]` (no CIF, per v3.3). But `/glossary` (`cfr-cif`, `dap` terms), `/faq` (`price-basis` answer), and `productGrade.json` still say **CIF and DAP are offered**. → Decide which is true and align both sides. **Decision:** ____________________
- [ ] **Carrier list.** `commercial.shippingLines` = `["Maersk","MSC","CMA CGM"]` (3) vs `logistics.dg.carriersAudited` = `["MSC","Maersk","CMA CGM","Emirates","Asyad"]` (5, used on the shipping-lines page). → Align `commercial.shippingLines` to the 5? **Decision:** ____________________
- [ ] **Payment terms (pre-existing).** `commercial.paymentTerms` = "50% advance, 50% before loading" vs top-level `payment.terms` = "T/T 30/70". These contradict each other. → Fix one. **Correct terms:** ____________________

---

## C. Operational facts (hub / rules pages)

- [ ] `logistics.truckingFactoryToPortHours` — factory→Tanjung Emas drive time → **____ hours**
- [ ] `logistics.vesselBookingLeadDays` — DG booking lead before sailing → **____ days**
- [ ] `logistics.departureDays[]` — weekly sailing days (e.g. ["Tue","Fri"]) → **____________**
- [ ] `logistics.leadTimes.production40ft` — production lead for a 40HQ → **____ days** (20ft reuses `commercial.leadTime`)
- [ ] `logistics.containers.perShapeYieldNote` — note on tonnage variance by shape → **____________**
- [ ] `logistics.loading.method` — e.g. "floor-stuffed; palletized on request" → **____________**
- [ ] `logistics.loading.palletizedAvailable` — `true` / `false`
- [ ] `logistics.loading.mixedSizesPolicy` — mixed-size policy text → **____________**
- [ ] `logistics.lcl.available` — `true` / `false` (currently treated as FCL-only)
- [ ] `logistics.lcl.{marketsServed[], minTons}` — only if LCL is offered
- [ ] `logistics.brokerReferralAvailable` — `true` / `false` (do you refer a customs broker?)

---

## D. Dangerous goods (SP 978) — mostly populated; remaining:

- [ ] `logistics.dg.compliantSince` — date the factory met SP 978 (e.g. "2024-06") → **__________**
      *(If earlier than 2026-01-01, the "compliant before it was mandatory" message appears on the regulation page.)*
- [ ] `logistics.dg.ems` — EMS codes. **UNVERIFIED** in the intake (competitor blog only). Leave empty until confirmed against the IMDG EmS Guide (MSC.1/Circ.1588/Rev.3) → **__________**
- [ ] `logistics.dg.dgFreightNote` — optional note on the DG freight premium → **____________**
- [ ] `logistics.dg.sht.{cost, processingTime}` — see §A (same SHT add-on)

---

## E. Insurance & cargo protection (cargo-protection page)

- [ ] `logistics.insurance.sumInsuredBasis` — e.g. "110% of CIF value" → **____________**
- [ ] `logistics.insurance.coverageNote` — optional extra coverage detail → **____________**
- [ ] `logistics.insurance.claimsNote` — how claims are handled → **____________**
- [ ] `logistics.cargoProtection.desiccantsPerContainer` — e.g. "X g × N bags" → **____________**
- [ ] `logistics.cargoProtection.thermalLiner` — `true` / `false` (distinct from the thermal blanket already in `packaging.ancillary`)
- [ ] `logistics.cargoProtection.boxesCleanedBeforeLoading` — `true` / `false`
- [ ] `logistics.cargoProtection.{moistureNote, breakageNote}` — transit-behaviour notes → **____________**
      *(Physical specs — desiccant grams, liner spec — are canonical on `/packaging/additional-packaging`; the node links there.)*

---

## F. Freight (publishMode is `indicative`; structure renders, numbers say "on request")

- [ ] `logistics.freight.illustrativeFobNote` — the labeled illustrative-FOB note (NEVER the real per-ton price) → **____________**
- [ ] `logistics.freight.surchargeStack[].range` + `.asOf` — fill the range per surcharge (ocean base, DG premium, IMO, THC, BAF, ISPS, documentation, DG cleaning) when you want indicative numbers shown
- [ ] `logistics.freight.lanes[]` — add `{originUnlocode:'IDSRG', destPort, unlocode, country, oceanFreightRange, published, asOf}` per lane to publish indicative freight
- [ ] When confirmed numbers are ready: set `logistics.freight.publishMode` → `'actual'`

---

## G. US import (verify with your customs broker)

- [ ] `logistics.usaImport.htsCode` — settle the 10-digit code via a CBP binding ruling (candidates `4402.20.00.00` / `4402.90.01.00`, both **Free** base) → **__________**
- [ ] `logistics.export.licensing` — confirm HS 4402 on the INSW LARTAS list before asserting "no license needed" → **____________**
- [ ] **Section 122 rate** — most sources report **10%**; one reports 15%. Confirm at booking and update `dutyLayers[section122].rate` / `.legalStatus` (it is on appeal, sunset ~24 Jul 2026 — re-check then).
- [ ] `logistics.usaImport.fda.stnNote` / `.pending` — optional FDA detail (pending legislation unverified)
- [ ] `logistics.usaImport.usPortsServed[]` — optional explicit US port list (ports currently derive from `commercial.transitTimes` where country = USA)
- [ ] Re-stamp `logistics.usaImport.lastVerified` / `fda.lastVerified` whenever you refresh these.

---

## H. Transit times (low-confidence estimates)

- [ ] `commercial.transitTimes[]` day-ranges are **indicative** — confirm with the carrier/forwarder.
- [ ] Bump `logistics.transitTimesLastUpdated` whenever you change them (drives the hub `dateModified`).

---

## I. Media — all logistics photos are placeholders

Add source images to `src/assets/images/logistics/` and wire them into the page `<Figure>`/`<PhotoGrid>` `src` props:
- [ ] Hub (4): container being floor-stuffed · truck departing factory · sealed container w/ Class 4.2 placard · export-document pack
- [ ] `un-1361`: sealed container / Class 4.2 placard close-up
- [ ] `charcoal-dg-regulation`: Class 4.2 placard (optional: weathering yard / packing-temp log)
- [ ] `cargo-protection-and-insurance`: desiccant + thermal liner inside a loaded container

---

## J. E-E-A-T (optional)

- [ ] A dedicated **logistics reviewer** for the editorial block (currently uses `governance.reviewer`). If you want a shipping/DG specialist named, add them and wire the child pages' `ArticleMeta`.

---

## What is already populated (no action needed)

DG core (UN 1361, Class 4.2, PG III, proper shipping name, SP 978 weathering/≤40 °C/30 cm/P002/DGD fields, amendment dates, SP 925/223 withdrawn, carriers audited & not-accepting) · US duty layer-stack (MFN Free, §122 10%, MPF 0.3464%/$33.58–$651.50, HMF 0.125%) + duty history + FDA (Deeming, PMTA, Import Alert 98-06, no-safe-harbor) · COO regime (e-SKA/IPSKA, Permendag 19/2019) · insurance posture (buyer-arranged, external perils, self-heating excluded) · port + transit + container tonnage + lead time + HS-6 (reused from `commercial.*`).
