# /factory pillar — owner verification checklist

Every value below was **drafted** during the `/factory` build from typical coconut-shell
briquette manufacturing. **Confirm or correct each before this branch (`feat/factory-pillar`)
is merged to production.** Everything else on the factory pages comes from already-verified
`company.json` config (capacity, ovens, area, headcount, NIB/NPWP, MOQ, port, certifications,
export markets) and does not need re-checking here.

To apply a correction: edit the value in `src/data/company.json` → `factory.*` (process/QC/
equipment/prose) or the relevant `src/i18n/en/factory*.json` (comparison table), **or** just
reply with the fixes and I'll make them.

Mark each: `[x]` confirmed as-is · `[ ]` needs change → write the correct value.

---

## 1. Process steps — temperatures & durations (HARD)
Home: `factory.processSteps` · shown on `/factory/production-process`

- [ ] **Carbonization temperature** — drafted **≈400–700°C**. Correct? → __________
- [ ] **Drying duration** — drafted **≈18–24 hours**. Correct? → __________
- [ ] **Weathering window** — **14 days** (existing config). Still correct for production framing? → __________
- [ ] **The 7-stage sequence** — carbonization → milling → mixing/binder → pressing → drying → weathering → QC. Accurate order & naming? → __________

## 2. In-process QC framework (HARD)
Home: `factory.qcSteps` · "your own named framework" · shown on `/factory/production-process`
Drafted as **6 stages** — confirm the count, the names, and what each checks:

- [ ] 1. **Raw shell intake** — moisture & contamination check before carbonization
- [ ] 2. **Carbonization control** — kiln temp & burn time monitored to hold fixed carbon
- [ ] 3. **Powder consistency** — sieved & checked for particle-size uniformity
- [ ] 4. **Mix & density check** — binder ratio & paste density verified before pressing
- [ ] 5. **In-line dimensional check** — size, weight, edge integrity sampled
- [ ] 6. **Finished-batch burn test** — moisture reading + burn/ash test; reference sample retained
- [ ] Is **6** the right number of stages? Add/remove/rename any → __________

## 3. Equipment list & quantities (HARD)
Home: `factory.equipment` · shown on `/factory/capacity` (kilns/ovens shown separately from `production.ovens`)
Quantities are **educated guesses** — please correct:

- [ ] Coconut shell crushers — **×4** → __________
- [ ] Hammer mills — **×4** → __________
- [ ] Sieving & grading units — **×2** → __________
- [ ] Ribbon mixers — **×4** → __________
- [ ] Hydraulic briquette presses — **×4** (one per line) → __________
- [ ] Temperature-controlled drying tunnels — **×4** → __________
- [ ] Any machine types missing or named wrong? → __________

## 4. Drafted prose (your voice — edit freely)
Home: `factory.*` · these render only if non-empty

- [ ] **Owner's note** (hub pull-quote): *"We built this factory in Semarang to do one thing exceptionally well — coconut shisha charcoal. I'm on the floor with my team every week, because consistency is something you supervise, not something you outsource."* → edit: __________
- [ ] **Labor/CSR statement** (raw-materials): *"Our workforce is employed on formal terms, with wages at or above the regional minimum and a factory run to local occupational health-and-safety standards. We use no child labor, and our coconut-shell sourcing supports smallholder farming communities across eastern Indonesia."* → confirm each claim is true → __________
- [ ] **Ramadan/seasonal note** (capacity): *"…place confirmed orders **6–8 weeks** earlier than usual; we schedule production slots on a first-confirmed basis."* Is 6–8 weeks right? → __________
- [ ] **Sourcing→ash narrative** (raw-materials): *"Coconut shells from North Sulawesi, Maluku, NTT are mature and thick-walled, which typically supports a denser charcoal with low, light-grey ash…"* → __________

## 5. Confirm for comfort (general/industry claims I authored)

- [ ] **Shell-vs-wood-vs-bamboo comparison table** (`factoryRawMaterials.json`): Wood ash *"often 3–6%"*, Bamboo *"moderate to high"*, taste/density rows. Comfortable publishing these comparative claims? → __________
- [ ] **Buyer-appointed inspectors** (virtual-tour): names **SGS, Intertek, or Bureau Veritas** as surveyors the buyer may appoint. (SGS is in your testing config; Intertek/BV are offered as buyer options, not a claimed relationship.) OK? → __________
- [ ] **Audit document** (virtual-tour): links to **`/legal/factory-audit.pdf` — "Factory Audit (Beckjorindo)"** as an "audit summary." Does this file exist and is it shareable with buyers? → __________
- [ ] **Order orientation** (virtual-tour): contact → free samples → quote → PO/proforma → deposit → production → inspection → stuffing/ship. Matches your real flow? → __________

## 6. Already confirmed by you (for the record)
- [x] Sourcing region = **North Sulawesi, Maluku, NTT** (east) · `rawMaterial` = "Coconut shell"
- [x] Oven type = **gas and electric** · batch retention = **yes** · develop-to-spec = **yes** · NDA = **yes**
- [x] Export markets = all **35** real (count fixed 32→35)
- [x] Weathering relocated to `production.weatheringDays` (single canonical home)

## 7. Pending assets (not drafts — placeholders until you supply real ones)
- [ ] **Factory tour video** — currently the **dummy** YouTube ID `0u-TnY4wNAQ` in `company.factoryTourVideo`. Swap the real ID there → it self-heals on `/factory/virtual-tour` and the homepage.
- [ ] **Factory photos** — `#gallery` shows placeholders until real photos land in `/public/gallery/` and `gallery.ts hasAssets` flips to `true`.
