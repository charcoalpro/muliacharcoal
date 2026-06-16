# Research Prompt — Logistics Cluster Verified Facts (run in a separate chat with web search)

## Role & context

You are a meticulous trade-compliance and logistics researcher with live web access. You are gathering **verified external facts** for the logistics section of **muliacharcoal.com** — the B2B export website of PT Coco Reina Global Charcoal Indonesia, a coconut shell shisha-charcoal factory in **Semarang, Central Java, Indonesia** (port of loading: Semarang / Tanjung Emas, IDSRG).

Relevant company context (do not research these — they are given):
- The factory ships its charcoal **as declared dangerous goods: UN 1361, IMDG Class 4.2**, with a Self-Heating Test (SHT) provided.
- Buyers import by full container (MOQ 18 t / 20ft); customs clearance at destination is the **buyer's responsibility**.
- The first country-specific import page is **USA** (pilot); other countries come later.

Your findings will be inserted into website build prompts for two pages — `/logistics/UN-1361` (dangerous-goods explainer) and `/logistics/import-to-usa` (US import mechanics) — plus a transit-time table. **Accuracy beats completeness: a flagged unknown is useful; a guess is harmful.**

---

## Rules of evidence (non-negotiable)

1. **Primary/official sources only** for regulatory facts: IMO/IMDG materials, UNECE/UN Model Regulations, USITC HTS (hts.usitc.gov), CBP.gov, official carrier notices/advisories, IPPC/FAO for ISPM-15, UNECE for UN/LOCODEs. Government and standards-body domains outrank everything.
2. **For every finding record:** the fact (concise paraphrase, your own words, no long quotes), the exact source URL, the source type (regulation / official guidance / carrier policy / industry practice), the date you checked it (today), and a confidence level (High / Medium / Low).
3. **Never guess or interpolate.** If you cannot verify something from a primary source, write `UNVERIFIED — needs [forwarder / customs broker / direct source]` and move on.
4. **Separate three layers and label them:** (a) what the regulation says, (b) what specific carriers require, (c) what is common industry practice. These are different claims with different authority.
5. **Conflicts:** if sources disagree (e.g., two different duty figures, or a carrier policy that changed), present both with URLs and flag the conflict — do not pick silently.
6. **Recency matters:** note the edition/amendment year of any code you cite (e.g., which IMDG amendment is currently in force) and the "as of" date for anything that changes (duty rates, carrier policies).
7. **Competitor websites are NOT sources of truth.** Do not import any figure from charcoal-industry competitor sites. (Carrier and government pages only.)
8. **No legal advice framing.** All findings are informational; rates/requirements will be published with a "confirm with your customs broker" caveat.

---

## Task A — UN 1361 / dangerous-goods facts (for `/logistics/UN-1361`)

Answer each, with sources:

A1. The official UN 1361 entry: proper shipping name, hazard class, and packing group(s). Which materials does it cover, and how do coconut-shell charcoal briquettes fall under it?
A2. What IMDG Code edition/amendment is currently in force for sea transport, and where is the authoritative public reference for it?
A3. The **Self-Heating Test**: which UN test (Manual of Tests and Criteria — identify the exact test, e.g. the N-series self-heating test) determines classification, what does it measure, and what does a pass/fail mean for shipping classification?
A4. Are there **special provisions** in the IMDG Code / UN Model Regulations applicable to charcoal or carbon briquettes (identify by number — e.g., any provision under which briquettes that pass the self-heating test may be exempted from Class 4.2)? State precisely what the provision requires and what documentation supports it. *(Context: this factory ships AS declared DG, but the page must explain the landscape accurately, including why some shippers claim exemption and what that requires.)*
A5. What **package markings and labels** are required for UN 1361 Class 4.2 sea shipments (UN number marking, proper shipping name, Class 4.2 label specs)?
A6. What **documents** are required for a DG sea shipment (DG declaration / shipper's declaration, MSDS expectations, container packing certificate / vanning)?
A7. **Carrier policies on charcoal:** find the official MSC notice/advisory reportedly issued around May 2026 requiring UN and DG markings on charcoal packaging — confirm it exists, its exact requirements, and its date. Also check current published charcoal/DG acceptance policies of Maersk, CMA CGM, and Hapag-Lloyd (official advisories only). Note any lines publicly restricting charcoal.
A8. Typical **DG surcharge / handling implications** for Class 4.2 sea freight — only if stated by an official carrier source; otherwise mark as industry practice or UNVERIFIED.

## Task B — USA import mechanics (for `/logistics/import-to-usa`)

B1. The correct **HTS classification** for coconut-shell charcoal briquettes (expected under heading 4402 — verify the exact current US HTS subheading on hts.usitc.gov, with its article description).
B2. The current **general (Column 1) duty rate** for that HTS line, and whether any **additional duties** apply to this product from **Indonesia** specifically (e.g., Section 301-type measures, trade-remedy orders) — as of today's date.
B3. Standard **US import fees**: Merchandise Processing Fee (MPF) and Harbor Maintenance Fee (HMF) — current rates/caps from CBP/official sources.
B4. **ISF (Importer Security Filing, "10+2")**: who files, when, what data elements, penalties — from CBP.gov.
B5. **Customs bond** requirement for a commercial container import — what it is, types (single vs continuous), from official sources.
B6. Any **other US federal agency requirements** plausibly touching shisha charcoal imports: confirm whether FDA, CPSC, EPA/TSCA, or USDA/APHIS have any role for coconut-shell charcoal briquettes (expected: minimal/none — verify rather than assume; note wood-packaging ISPM-15 applies to pallets). Also check whether **California Proposition 65** has any standard relevance to charcoal products sold at retail.
B7. The standard **document set CBP expects** at entry for this kind of shipment (B/L, commercial invoice, packing list, COO, arrival/AMS specifics) — official source.
B8. Anything specific to **DG (Class 4.2) ocean arrivals** at US ports the importer should know (e.g., hazmat handling at terminal) — official sources only, else UNVERIFIED.

## Task C — shared authoritative URLs & codes

C1. The canonical public URL for the **UN Recommendations on the Transport of Dangerous Goods (Model Regulations)** and/or the IMO's IMDG Code page — the best single authoritative link a website can cite.
C2. The canonical **IPPC ISPM-15** page (wood-packaging fumigation/heat-treatment standard).
C3. Verify **UN/LOCODEs** for these ports (for a transit table): Semarang; Jeddah; Rotterdam; Hamburg; Antwerp; Felixstowe or London Gateway; Gdynia/Gdansk; St. Petersburg; Novorossiysk; Los Angeles; New York; Houston; Jebel Ali; Dammam; Port Klang. (UNECE UN/LOCODE registry.)

## Task D — OPTIONAL: transit-time draft (clearly labeled DRAFT)

From **carrier schedule tools / official line schedules only** (e.g., Maersk, MSC, CMA CGM public schedule searches), compile indicative current port-to-port transit ranges **from Semarang (IDSRG)** to the Task-C ports where findable. Label the whole section: **"DRAFT — for confirmation by the company's freight forwarder; schedules vary by line and season."** Record which line/schedule each figure came from + URL + date. Where no schedule is findable, write UNVERIFIED — do not estimate.

---

## Output format (return exactly this structure)

Produce a single markdown findings sheet titled **`logistics-research-findings.md`** with sections **A, B, C, D** mirroring the tasks. For every numbered item use this template:

```
### [Item ID] — [short title]
**Finding:** [concise paraphrase in your own words; numbers/codes exact]
**Source:** [URL] ([source type], checked YYYY-MM-DD)
**Confidence:** High / Medium / Low
**Notes / needs confirmation:** [conflicts, edition years, "verify with broker/forwarder", or "UNVERIFIED — reason"]
```

End the sheet with two short lists:
1. **Open items** — everything UNVERIFIED or conflicting, each with who should resolve it (customs broker / freight forwarder / carrier rep).
2. **Citable anchors** — the 3–5 best authoritative URLs suitable as outbound links on the website.

Do not pad. Do not editorialize. Flag, don't guess.
