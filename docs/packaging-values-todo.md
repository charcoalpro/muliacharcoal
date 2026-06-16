# Packaging — Values To Add (owner checklist)

Tick these off as you gather the values. Every item is a field in **`src/data/company.json` → `packaging.*`** (edit the JSON directly, or use Sveltia at `/admin/` → "Packaging"). Pages update on the next build with **no code changes**. Empty = the page already degrades gracefully (row hidden, section omitted, or "Available on request").

Legend: **P0** = fill before go-live · **P1** = strongly recommended · **P2** = optional.

---

## A. Specs from the production / packaging manager

### Master box — `packaging.masterBox`
- [ ] **P0** `outerDimsMm` — outer carton size, e.g. `"600 × 400 × 400"`
- [ ] **P0** `grossWeightKg` — gross weight per box (charcoal + packaging), e.g. `"21"` (per option if it varies)
- [ ] **P0** `printOptions` — array, e.g. `["b/w","3-color","full-color"]`
- [ ] **P1** `cartonStrength.ect` — e.g. `"32 ECT"`
- [ ] **P1** `cartonStrength.burstKpa` — e.g. `"1400 kPa"`
- [ ] **P1** `cartonStrength.fluteType` — `"B"` / `"C"` / `"BC"`
- [ ] **P1** `cartonStrength.corrugateGsm` — e.g. `"180"`
- [ ] **P1** `printableFaces` — e.g. `"all faces"` or `"top + 2 long sides"`
- [ ] **P1** `whiteTopLinerAvailable` — `true` / `false`
- [ ] **P1** `maxStackHeight` — e.g. `"8 boxes"`
- [ ] **P1** `holdsExample` — overrides the auto-derived "20 kg box = 20 × 1 kg inner boxes" if you want exact wording

### Inner box — `packaging.innerBox`
- [ ] **P0** `paperType` — e.g. `"duplex"`
- [ ] **P0** `boxStyles` — array, e.g. `["tuck-end","tray+lid","sleeve"]`
- [ ] **P0** `dimensionsMm` — outer box size per option
- [ ] **P0** `finishes` — array, e.g. `["lamination","emboss","uv-spot","foil"]`
- [ ] **P1** `grossWeightKg` — per option if it varies
- [ ] **P1** `holdsExample` — overrides the auto-derived "1 kg inner box of 25 mm cubes ≈ 96 cubes"

### Inner plastic — `packaging.primaryPlastic`
- [ ] **P0** `type` — e.g. `"heat-sealed poly bag"`
- [ ] **P0** `material` — `"PE"` / `"PP"` / `"laminated"`
- [ ] **P0** `thicknessMicrons` — number, e.g. `80`
- [ ] **P0** `sealType` — e.g. `"heat-sealed"`
- [ ] **P1** `holdsExample` — overrides the auto-derived value
- [ ] **P1** `foilBarrier` — `true` only if the metallized-barrier upgrade is offered (the section stays hidden while empty)

### Container loading — `packaging.containerLoad`
- [ ] **P0** `masterBoxesPer20ft` — loose-loaded box count (net kg is already taken from `commercial.containerCapacity`)
- [ ] **P1** `masterBoxesPer20ftPalletized` — palletized box count

### Compliance — `packaging.compliance`
- [ ] **P0** `netWeightMark` — `true` (the other four are already `true`)

---

## B. Decisions (yes/no) — `packaging.ancillary`

Set each to `true` to assert it's available, `false` if not, or leave `null` to keep it "confirmed on inquiry".
- [ ] **P1** `stickers`, `stickers3d`, `qrStickers`, `hologramStickers`, `inserts`, `boxLabels`
- [ ] **P1** `brandedTape`, `brandedSilicaGel`, `desiccantIncluded`, `strapping`, `edgeProtectors`, `thermalBlanket`
- [ ] **P1** `palletType` — `"wood"` / `"plastic"` / `"both"`
- [ ] **P2** `containerDesiccant`, `fscPaper`
- [ ] **P1** `retail.shelfReadyBox` — `true` / `false`

*(`pallets` and `ispm15` are already `true`.)*

---

## C. White-label / branding — from marketing / print

### `packaging.whiteLabel`
- [ ] **P0** `printMethod` — e.g. `"offset"`
- [ ] **P1** `printingEquipment` — e.g. `"6-color Heidelberg"`
- [ ] **P1** `colorCapability` — e.g. `"CMYK + Pantone spot + foil"`
- [ ] **P1** `brandsProducedCount` — e.g. `"80+"`
- [ ] **P1** `platesKeptForReorder` — `true` / `false`

### `packaging.branding`
- [ ] **P0** `neutralScope` — what "plain" looks like per layer (a sentence)
- [ ] **P1** `pantoneSpot` — `true` / `false`
- [ ] **P1** `bleedSafeArea` — e.g. `"3 mm bleed, 4 mm safe area"`
- [ ] **P1** `prepressBy` — who does prepress
- [ ] **P1** `customSizesAvailable` — `true` / `false`
- [ ] **P1** `artworkOnFileForReorder` — `true` / `false`
- [ ] **P2** `foodSafeInks` + `foodSafeInksCert` — only claim WITH a certificate reference

### `packaging.customPrint`
- [ ] **P0** `moqUnits` — per-design minimum, e.g. `"2000"`
- [ ] **P0** `leadTimeAddDays` — days printing adds, e.g. `"7"`
- [ ] **P1** `finishesAvailable` — array

### `packaging.proofing`
- [ ] **P0** `sampleLeadTimeDays` — number (proof lead time already = 7)
- [ ] **P1** `sampleCost` — e.g. `"USD 50, refundable"`
- [ ] **P1** `sampleCreditedToOrder` — `true` (the "credited" line shows only when `true`)

---

## D. Prices — `packaging.pricing` (USD; pricing decision = Option A)

Leave any empty → "Available on request" everywhere. Fill a value → it shows on the hub + white-label table. **Never** add the charcoal per-ton price here.
- [ ] **P0** `pricesLastUpdated` — `"2026-06-15"` (set when you publish any price; bump `editorial.dateModified` too)
- [ ] **P1** `innerBoxPrintingPerKgUsd`
- [ ] **P1** `laminationSurchargePerTonUsd`, `embossSurchargePerTonUsd`, `uvSpotSurchargePerTonUsd`, `foilSurchargePerTonUsd`
- [ ] **P1** `doubleWallMasterBoxSurchargePerTonUsd`
- [ ] **P2** `plasticPrintingPerKgUsd`
- [ ] _Leave empty (Option A):_ `strappingPerTonUsd`, `labelPrintingPerTonUsd` — keeps them "Available on request" sitewide, consistent with the add-ons page. Fill only if you want them priced on the hub/master-box.

---

## E. Photos — 49 shots (`src/assets/packaging/<area>/`)

Each renders a placeholder until added. ★ = go-live minimum (one per page). Alt + caption text is already written for every slot. After a shoot, hand the files to a developer to wire into the page `photos` arrays.
- [ ] **P0** master-box ★ closed branded carton 3/4 · [ ] **P1** the other 9
- [ ] **P0** inner-box ★ branded front 3/4 · [ ] **P1** the other 9
- [ ] **P0** plastic ★ sealed pack · [ ] **P1** the other 6
- [ ] **P0** white-label ★ full branded set · [ ] **P1** the other 9 *(brand examples need written permission or anonymizing)*
- [ ] **P0** additional ★ branded sticker sheet · [ ] **P1** the other 11

---

## F. Videos — 5 slots (`packaging.media.videos[<id>]`, all P1)

Each slot stays hidden until `youtubeId` is set — never shows an empty box. Per video, fill `youtubeId`, `posterAsset` (local 16:9 image), `uploadDate`, `durationISO`, and have a developer add the 3–5 on-page key-points to the cluster page.
- [ ] `master-box` — assembly & sealing on the line
- [ ] `inner-box` — forming/printing or hand-pack
- [ ] `plastic` — wrap / shrink / seal
- [ ] `additional-packaging` — container loading w/ thermal blanket + strapping
- [ ] `white-label` — OEM process: design → print → pack

---

## G. External links to verify (P1)

- [ ] UN dangerous-goods URL — currently `https://unece.org/transport/dangerous-goods` (confirm it's the right target)
- [ ] IPPC ISPM-15 URL — currently `https://www.ippc.int/en/publications/640/`

---

*Reference (the "why" behind each field): `docs/packaging-data-gaps.md`.*
