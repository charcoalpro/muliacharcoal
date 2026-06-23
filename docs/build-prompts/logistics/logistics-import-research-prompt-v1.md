# Research Prompt — Import-to-Country Verified Facts: UK · Germany · Saudi Arabia · Russia (run in a separate chat with web search)

## Role & context

You are a meticulous trade-compliance / customs researcher with live web access, gathering **verified import-mechanics facts** for four `/logistics/import-to-{country}` pages on **muliacharcoal.com** — the B2B export site of PT Coco Reina Global Charcoal Indonesia, a coconut-shell shisha-charcoal factory in Semarang (port of loading Tanjung Emas, IDSRG). Your findings feed `import-to-uk`, `import-to-germany`, `import-to-saudi-arabia`, `import-to-russia`. **Accuracy beats completeness: a flagged unknown is useful; a guess is harmful.**

**Given (do NOT research, do NOT contradict):**
- Product: **coconut-shell charcoal briquettes** for shisha/hookah. Origin: **Indonesia**. Ships from Semarang / Tanjung Emas (IDSRG).
- Ships **as declared dangerous goods: UN 1361, IMDG Class 4.2**, SHT provided.
- MOQ 18 t / 20ft FCL; **destination customs clearance is the BUYER's responsibility** — the factory exports + documents, it does not clear destination customs.
- HS-6 is contested between **4402.20** ("of shell or nut") and **4402.90** ("other"); the US page lists both as candidates — resolve per jurisdiction.
- Never publish a per-ton charcoal price; landed-cost examples are illustrative only.

## Rules of evidence (non-negotiable)

1. **Official customs / tariff / standards / government sources only** — UK: gov.uk Trade Tariff. EU/Germany: TARIC / Access2Markets / Zoll. Saudi: ZATCA, SASO/SABER (Saber), SFDA. Russia/EAEU: Eurasian Economic Commission, FCS. Manufacturer marketing and **charcoal-industry competitor sites are NOT sources.**
2. **Per finding record:** the fact (your words, numbers/codes exact), source URL, source type (tariff tool / regulation / official guidance / carrier policy / practice), date checked (today), confidence (High/Medium/Low).
3. **Never guess.** Unverifiable from a primary source → `UNVERIFIED — needs [broker / forwarder / source]`.
4. **Separate (a) what the regulation says, (b) what carriers require, (c) common practice** — label each.
5. **Conflicts:** present both with URLs and flag — never pick silently.
6. **Recency:** note the tariff year / amendment and an "as of" date for anything that changes (duty, VAT, sanctions, EUDR timeline).
7. **No competitor numbers, ever. No legal-advice framing** (everything carries "confirm with your customs broker").

---

## PER-COUNTRY TASKS — answer the FULL block for EACH of: UK · GERMANY (EU) · SAUDI ARABIA (GCC) · RUSSIA (EAEU). Use each country's own tariff tool.

- **C1 — Commodity code.** Exact national import classification for coconut-shell charcoal briquettes (confirm 4402.20 vs 4402.90 subheading + the full national commodity code), with the tariff-tool URL + article description.
- **C2 — Import duty.** Third-country/MFN rate for that code, AND whether **Indonesian origin** earns a preference: UK **DCTS** (eligible? rate?), EU **GSP** (has Indonesia graduated for this section? rate?), GCC **Common External Tariff** (5% CET or other?), EAEU **CCT + EAEU GSP** for Indonesia. State base + preference + any **anti-dumping / trade-remedy** on Indonesian charcoal. As-of date.
- **C3 — Import VAT / equivalent.** Name + rate + recoverability: UK import VAT **20%** (+ Postponed VAT Accounting); Germany **Einfuhrumsatzsteuer 19%** (+ deferment/reverse charge); Saudi **VAT 15%** (ZATCA); Russia **VAT 20%**. Confirm current rate + whether registered importers reclaim.
- **C4 — Other charges/fees** specific to the country (officially published only).
- **C5 — Entry & security filing.** UK: ENS / Safety & Security GB, import declaration / GVMS. EU/Germany: **ICS2 ENS**, ATLAS declaration. Saudi: **FASAH** + **SABER**. Russia: EAEU electronic customs declaration. Who files, when, key data.
- **C6 — Country-specific regulatory / conformity (the page's "agency" section) — VERIFY applicability to charcoal (HS 4402); do not assume:**
  - **UK** — UK REACH obligations; UK Timber Regulation / due-diligence applicability to charcoal; any product-safety control.
  - **GERMANY/EU** — EU REACH + CLP labeling; **EU Deforestation Regulation (EUDR): is HS 4402 charcoal in scope? what due-diligence statement / operator obligations apply, and the current application date/timeline?** *(HIGH PRIORITY — verify precisely.)* Predecessor EU Timber Regulation.
  - **SAUDI ARABIA** — SASO / **SABER** Certificate of Conformity + Product Certificate: is charcoal in scope, under which technical regulation? **SFDA** jurisdiction over shisha charcoal? Saudi Quality Mark / G-mark; Saleem; any shisha/tobacco-adjacent control; does Saudi excise/selective tax touch charcoal (expected NO — verify)?
  - **RUSSIA** — EAEU technical regulations + **EAC** conformity (declaration vs certificate): is charcoal in scope? GOST. **PRACTICAL CONTEXT (2022– ): current carrier acceptance to Russian ports for DG/general cargo, and banking/payment constraints — verify current state from official/credible sources and flag clearly; this materially affects feasibility.**
- **C7 — DG arrival handling.** UN 1361 Class 4.2 at the country's main ports — IMDG applies internationally; any national hazmat/terminal specifics.
- **C8 — Document set** the country's customs expects at entry (B/L, commercial invoice, packing list, certificate of origin [e-CO / Form A / EUR.1 / REX if preference], MSDS/SDS, DG declaration; plus country-specific — EUDR DDS reference (DE), SABER CoC (SA), EAC docs (RU)).
- **C9 — Main destination ports + UN/LOCODEs** (verify/extend the site's): UK Felixstowe **GBFXT** (+ London Gateway GBLGP, Southampton GBSOU?); Germany Hamburg **DEHAM** (+ Bremerhaven DEBRV?); Saudi Jeddah Islamic **SAJED** (+ King Abdulaziz Dammam SADMM?); Russia St Petersburg **RULED** (+ Novorossiysk RUNVS, Vladivostok RUVVO?).
- **C10 — OPTIONAL landed-cost layering (clearly DRAFT).** Duty + import VAT stack for one 20ft FCL — percentage layers only, never a real per-ton price.

## SHARED TASKS

- **S1 — Indonesia-origin preference summary** across the four markets (DCTS / EU-GSP / EAEU-GSP / GCC): one line per market — does Indonesian charcoal get reduced/zero duty, and what origin document proves it (Form A / e-CO / EUR.1 / REX)?
- **S2 — ISPM-15** wood-packaging requirement for pallets in each market (all expected YES — confirm).
- **S3 — Citable anchors:** the 3–5 best authoritative URLs **per country** (tariff tool + the key regulator).

---

## Output format (return exactly this)

A single markdown sheet `logistics-import-research-findings.md` with a section **per country (UK / GERMANY / SAUDI ARABIA / RUSSIA)** mirroring C1–C10, then a **SHARED** section (S1–S3). Per item:

```
### [Country · Item ID] — [short title]
**Finding:** [concise paraphrase; numbers/codes exact]
**Source:** [URL] ([source type], checked YYYY-MM-DD)
**Confidence:** High / Medium / Low
**Notes / needs confirmation:** [conflicts, edition/as-of years, or "UNVERIFIED — reason"]
```

End with: (1) **Open items per country** (UNVERIFIED/conflicting + who resolves — broker/forwarder/carrier); (2) a **per-country Duty+VAT layer table draft** (layer · rate · as-of · legal status); (3) **Citable anchors per country**. Flag **EUDR (Germany)**, **SABER/SFDA (Saudi)**, and **Russia carrier/payment feasibility** as explicit decision items. Do not pad. Flag, don't guess.
