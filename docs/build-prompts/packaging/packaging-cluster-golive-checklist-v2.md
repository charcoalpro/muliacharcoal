# Packaging Cluster — Go-Live Data & Asset Checklist v2 (Full Cluster)

**Supersedes** the hub-only v1 checklist. Covers the hub + all five cluster pages (master-box, inner-box, plastic, white-label, additional-packaging). Fields added by the cluster prompts are marked **•new**.

**Priorities** (graceful degradation means nothing breaks if missing):
- **P0** — needed for a credible live page.
- **P1** — strongly recommended; fills out SEO/GEO value.
- **P2** — optional polish.

**Already defaulted `true` — confirm, don't gather:** `branding.neutralAvailable`, `branding.whiteLabelAvailable`, `retail.available`, `retail.barcodeEanByBuyer`, `proofing.digitalProof`, `proofing.physicalSample`, `whiteLabel.designByBuyer`, `whiteLabel.dielineProvided`, `whiteLabel.ndaAvailable`, `whiteLabel.designExclusive`, `whiteLabel.territoryExclusivityNegotiable`, `whiteLabel.singleContainerOk`, `customPrint.moqBasis` (= per-design), `pricing.currency` (= USD).

---

## 0. Fill-time decisions (settle these first — they thread through multiple pages)

| Decision | Affects | Options |
|---|---|---|
| **Shared reference SKU** for all `holdsExample` fields | master-box, inner-box, plastic | Pick ONE SKU (e.g. cube-25mm); the pack → inner box → master box numbers must chain consistently |
| **Strapping + box-label prices** | hub, master-box, additional | **A (recommended):** leave `strappingPerTonUsd` + `labelPrintingPerTonUsd` empty → "Available on request" sitewide · **B:** populate → price shows on hub/master-box, additional routes to inquiry |
| **Foil/metallized barrier film** offered? | plastic | Yes → fill `foilBarrier` · No → leave null (section omits) |
| **Printed plastic** offered? | plastic, white-label | Yes → `clearOrPrinted`, optional `plasticPrintingPerKgUsd` · No → clear only |
| **Plain desiccant standard** in every order? | additional, plastic | `desiccantIncluded` true/false |
| **Food-safe inks** claim? | white-label | Only with a cert (`foodSafeInksCert`) — otherwise leave off |

---

## 1. `company.ts` fields

### 1.1 Configurations — `packaging.configurations` (P0)
Array `{id, label, components, bestFor, protectionLevel}` for **Full / Standard / plastic-only / master-box-only** (+ any others). Single source for KeyFactsBox + comparison table.

### 1.2 Master box — `packaging.masterBox`

| Field | Provide | Priority |
|---|---|---|
| `material` | e.g. corrugated kraft | P0 |
| `wallType` | single / double options | P0 |
| `outerDimsMm` | e.g. 600 × 400 × 400 mm | P0 |
| `weightOptionsKg` | NET charcoal/box, e.g. [10, 20] | P0 |
| `grossWeightKg` •new | gross per box (per option if varies) | P0 |
| `holdsExample` •new | reference-SKU example (decision #1) | P0 |
| `printOptions` | e.g. ['b/w','3-color','full-color'] | P0 |
| `printableFaces` •new | e.g. "all faces" / "top + 2 long sides" | P1 |
| `whiteTopLinerAvailable` •new | boolean (vivid color on kraft) | P1 |
| `cartonStrength.{ect, burstKpa, fluteType, corrugateGsm}` •new | e.g. 32 ECT / kPa / BC / gsm | P1 |
| `maxStackHeight` •new | e.g. "8 boxes" | P1 |

### 1.3 Inner box — `packaging.innerBox`

| Field | Provide | Priority |
|---|---|---|
| `paperType` / `paperGsm` | e.g. duplex / 250 gsm | P0 |
| `coating` •new | matte / gloss (base) | P0 |
| `boxStyles` •new | ['tuck-end','tray+lid','sleeve'] | P0 |
| `dimensionsMm` •new | per size option | P0 |
| `weightOptionsKg` | NET, e.g. [0.25, 0.5, 1, 2] | P0 |
| `grossWeightKg` •new | per option if varies | P1 |
| `holdsExample` •new | reference-SKU example | P0 |
| `finishes` | ['lamination','emboss','uv-spot','foil'] | P0 |

### 1.4 Inner plastic — `packaging.primaryPlastic`

| Field | Provide | Priority |
|---|---|---|
| `type` / `function` | e.g. heat-sealed poly bag / moisture + dust barrier | P0 |
| `material` •new | PE / PP / laminated | P0 |
| `thicknessMicrons` •new | e.g. 80 µm | P0 |
| `sealType` •new | e.g. heat-sealed | P0 |
| `printable` / `clearOrPrinted` •new | boolean / clear–printed–both | P0 |
| `weightOptionsG` | NET, e.g. [500, 1000] | P0 |
| `holdsExample` •new | reference-SKU example | P0 |
| `foilBarrier` •new | boolean (decision #3) | P1 |

### 1.5 Ancillary / add-ons — `packaging.ancillary` (booleans unless noted)

| Field | Priority |
|---|---|
| `stickers`, `stickers3d`, `qrStickers` | P1 |
| `hologramStickers` •new, `inserts` •new, `boxLabels` •new | P1 |
| `brandedTape`, `brandedSilicaGel` | P1 |
| `desiccantIncluded` •new (decision #5) | P1 |
| `containerDesiccant` •new | P2 |
| `strapping`, `pallets`, `thermalBlanket` | P1 |
| `edgeProtectors` •new | P1 |
| `palletType` •new (wood / plastic / both), `ispm15` •new | P1 |
| `fscPaper` | P2 |

### 1.6 Custom print — `packaging.customPrint`
`moqUnits` (per-design minimum) **P0** · `leadTimeAddDays` **P0** · `finishesAvailable` P1.

### 1.7 Container load — `packaging.containerLoad`
`masterBoxesPer20ft` + `netKgPer20ft` **P0** · palletized pair P1.

### 1.8 Compliance — `packaging.compliance` (all P0 booleans)
`un1361Marking` · `dgLabels` · `countryOfOrigin` · `netWeightMark` · `batchLot`.

### 1.9 Retail — `packaging.retail`
`shelfReadyBox` P1 (rest defaulted).

### 1.10 Pricing — `packaging.pricing` (white-label add-ons only; each degrades to "Available on request")
`priceBasis` (e.g. FOB Semarang) **P0** · `pricesLastUpdated` **P0** · `innerBoxPrintingPerKgUsd`, `laminationSurchargePerTonUsd`, `embossSurchargePerTonUsd`, `uvSpotSurchargePerTonUsd`, `foilSurchargePerTonUsd`, `doubleWallMasterBoxSurchargePerTonUsd` P1 · `plasticPrintingPerKgUsd` •new P2 · `strappingPerTonUsd` / `labelPrintingPerTonUsd` ⚠ **decision #2**.

### 1.11 Editorial / E-E-A-T — `packaging.editorial` (all P0)
`author` + `authorRole` · `reviewedBy` + `reviewerRole` (real person + credential — the one E-E-A-T field with no fallback) · `datePublished` · `dateModified`.

### 1.12 Branding / artwork — `packaging.branding`
`neutralScope` **P0** · `artworkFormats`, `colorMode`, `pantoneSpot`, `bleedSafeArea`, `prepressBy`, `customSizesAvailable`, `artworkOnFileForReorder` P1 · `foodSafeInks` + `foodSafeInksCert` P2 (decision #6).

### 1.13 Proofing — `packaging.proofing`
`proofLeadTimeDays` + `sampleLeadTimeDays` **P0** · `sampleCost`, `sampleCreditedToOrder` P1.

### 1.14 White-label — `packaging.whiteLabel`
`printMethod` **P0** · `brandableSurfaces` •new **P0** (e.g. ['inner-box','master-box','plastic','consumables']) · `printingEquipment` •new, `colorCapability` •new, `brandsProducedCount` •new, `platesKeptForReorder` •new P1.

### 1.15 Media + Organization
`media.videos[5]` — per video: `youtubeId`, `posterAsset`, `titleKey`, `summaryKey`, `uploadDate`, `durationISO` (all P1; slots omit until filled) · `Organization.sameAs` += YouTube channel URL P1.

---

## 2. Photo shoot list (49 shots; ★ = go-live minimum, 1 per page)

4:3, AVIF/WebP, <200 KB rendered, sources ≤800px, descriptive query-aligned filenames. Every photo needs an i18n **caption** (spec-rich) + distinct **alt**. The hub reuses curated subsets with different crops/captions — **no separate hub shoot**, and the hub hero is text-led (no hero photo required). **Overlap savings:** the strapped-carton, pallet, and finish-macro shots serve two pages each with different crops.

**Master box** (`/src/assets/packaging/master-box/`) — 10
★ Closed branded carton 3/4 · neutral carton · open w/ inner boxes · single-vs-double-wall cross-section · print detail · UN-1361/origin/net-weight markings · strapped carton · shrink-wrapped pallet · loose-loaded 20ft container · scale ref

**Inner box** (`.../inner-box/`) — 10
★ Branded front 3/4 · neutral box · open w/ plastic-wrapped charcoal · size range side-by-side · box-style comparison (tuck/tray+lid/sleeve) · finish macro (coating vs lamination/emboss/UV/foil) · print detail · retail markings (EAN/weight/origin) · packed inside master box · scale ref

**Inner plastic** (`.../plastic/`) — 7
★ Sealed pack · clear pack showing cubes · printed-logo pack · seal detail · nesting into inner box · foil pack *(if offered)* · scale ref

**White-label** (`.../white-label/`) — 10
★ Full branded set (plastic+inner+master) · blank-vs-branded · offset press · FSC/cert detail · die-line render · finish macro · Pantone/proof sheet · physical sample review · anonymized brand examples ⚠ *permission or anonymize* · branded consumables on packaging

**Additional** (`.../additional/`) — 12
★ Branded sticker sheet · 3D domed macro · QR sticker on box · hologram detail · box label on carton · branded tape · branded silica sachet · insert/leaflet in box · strapped carton · edge protectors on pallet · shrink-wrapped pallet · thermal-lined container

---

## 3. Videos (5 — all P1; slots omit cleanly until ready)

Per video: film → upload to YouTube → record **youtubeId, uploadDate, durationISO** → create **custom 16:9 poster** → write **title + 3–5 on-page key-points** (the GEO surface) → upload **captions/transcript** on YouTube. `VideoObject` + transcript live on the **cluster page** (hub embeds without schema).

| Area | Subject |
|---|---|
| master-box | assembly & sealing on the line |
| inner-box | forming/printing or hand-pack |
| plastic | wrap / shrink / seal step |
| additional | container loading w/ thermal blanket + strapping/palletizing *(covers load-securing + transit protection; consumables carried by photos; optional P2 second video: sticker application/unboxing)* |
| white-label | OEM process: design → print → pack |

---

## 4. i18n copy workload (`en.json`)

| Copy | Volume | Priority |
|---|---|---|
| Section headings + prose | 6 pages | P0 per page as built |
| FAQ Q/A text | hub 13 · master 9 · inner 9 · plastic 6 · white-label 10 · additional 9 = **56** | P0 per page |
| Photo captions + alts | ~49 × 2 = **~98 strings** | P0 for ★ shots; P1 rest |
| Video titles + key-points | 5 × (title + 3–5 bullets) | P1 with each video |
| E-E-A-T labels, "Available on request", price caveat | once, shared | P0 |

---

## 5. External / verify

- ☐ UN Recommendations on the Transport of Dangerous Goods / IMDG URL (P1)
- ☐ IPPC ISPM-15 URL (P1)
- ☐ YouTube channel URL → `Organization.sameAs` (P1)
- ☐ Brand-example permissions for white-label social proof — written permission or anonymize (P1, ⚠ legal)
- ☐ Food-safe ink certificate — only if claiming (P2)

---

## 6. Cross-site tasks
See the **Consolidated Revision Sheet**: glossary +7 anchors (required), `/samples` packaging accommodation, homepage OEM link, future guide-pillar redirects.

---

## Minimum to go live (per page)

**Hub:** the v1 P0 shortlist still holds — specs for the three physical layers, configurations, container load, MOQ/lead-times, compliance booleans, editorial, pricing basis+date, 5 ★ photos, hub copy.
**Each cluster page** then gates only on its own subset: its §1 P0 fields + its ★ photo + its copy. Videos never block launch.
