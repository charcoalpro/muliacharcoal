# Research Prompt — Factory Pillar Verified Facts (run in a separate chat with web search)

## Role & context

You are a meticulous manufacturing-process and market researcher with live web access. You are gathering **verified external facts + a competitive teardown** for the `/factory` pillar of **muliacharcoal.com** — the B2B export website of PT Coco Reina Global Charcoal Indonesia, a coconut shell shisha-charcoal **factory** in **Semarang, Central Java, Indonesia**.

Company context (given — do **not** research or "correct" these; they are the owner's facts):
- The company **is the manufacturer** (not a trader): 4 production lines, 8 carbonization ovens (~1.5 t/batch, ~24 h cycle), ~14 t/day / ~350 t/month, ~4,200 m² site, ~86 staff.
- Product: compressed **coconut-shell** charcoal briquettes (cubes, fingers, hexagonals, domes, flats, lotus) for shisha/hookah.
- Ships as declared dangerous goods (UN 1361, IMDG Class 4.2, SHT provided); MOQ 18 t / 20ft.

Your findings feed the build prompt for the `/factory` hub + 4 children (`production-process`, `capacity`, `virtual-tour`, `raw-materials`). The build needs (a) **accurate, citable process science** so the `HowTo` and definitions are correct, (b) **a competitor/SERP teardown** to find the structural gap to beat, and (c) a clean separation of *what is general-industry knowledge* from *what only the owner can confirm*. **Accuracy beats completeness: a flagged unknown is useful; a guess is harmful.**

---

## Rules of evidence (non-negotiable)

1. **Authoritative sources for process/material science:** peer-reviewed papers, standards bodies, FAO/industry-association material, university extension, reputable engineering references. Government/standards/academic domains outrank blogs and vendor marketing.
2. **For every finding record:** the fact (concise paraphrase, your own words), the exact source URL, the source type (standard / academic / industry body / vendor / industry practice), the date checked (today), and a confidence level (High / Medium / Low).
3. **Never guess or interpolate a company-specific number.** Process *ranges* common to the industry are researchable and must be labeled "general industry, not this factory." Anything specific to this factory (its oven temperature, its weathering days, its sourcing villages) is **OWNER INPUT** — list it in Task E, never invent it.
4. **Separate two layers and label them:** (a) general industry practice/science (researchable), (b) this company's specific values (owner-only). Never present (a) as if it were (b).
5. **Competitor websites are NOT sources of truth for facts.** Use them **only** for the structural teardown (Task C) — never import a competitor's number as ours.
6. **Conflicts:** if sources disagree on a process parameter or material property, present both with URLs and flag it — do not pick silently.
7. **No greenwashing or unverifiable health/eco claims.** Note where a common industry claim (e.g., "low ash," "natural," "chemical-free binder") is marketing vs. measurable.

---

## Task A — Coconut-shell charcoal manufacturing process (for `/factory/production-process`)

Describe each step with verified, citable detail; for every parameter mark **[INDUSTRY RANGE]** (researchable) vs **[OWNER VALUE]** (must be confirmed, list in Task E):

A1. **Carbonization / pyrolysis of coconut shell:** what happens chemically, the typical temperature range, oxygen-limited conditions, and what "fixed carbon" / "volatile matter" mean as outputs. Why coconut shell yields high fixed carbon.
A2. **Milling / grinding** of carbonized shell to charcoal powder — purpose and typical fineness.
A3. **Binder & mixing:** what binders are commonly used in coconut-shell briquettes (e.g., starch-based/tapioca), typical proportions, and why a clean-burning binder matters for shisha (taste/odor/ash). Flag "tasteless/odorless" as a claim to verify.
A4. **Pressing / extrusion / forming** into shapes (cube, finger, hexagonal, etc.) — cold vs hot forming, density's effect on burn time.
A5. **Drying:** purpose, typical moisture-target ranges for shisha charcoal, and why residual moisture matters (ignition, smoke).
A6. **Weathering / curing / ageing after carbonization** — its purpose (off-gassing / reducing self-heating tendency), and the **typical duration** the industry uses. *(Context: this ties directly to the DG self-heating story; the owner states a specific number — get the industry range so the owner's value can be sanity-checked.)*
A7. **Quality control tests** run on finished shisha charcoal and what each measures: ash content, fixed carbon, moisture, calorific value (kcal/kg), burn time, ignition behavior. Identify the **standard test methods** where they exist (e.g., proximate analysis / ASTM or ISO methods for ash/moisture/volatiles/fixed carbon).

## Task B — Coconut-shell raw material & sourcing context (for `/factory/raw-materials`)

B1. **Indonesia as a coconut producer:** is Indonesia among the world's largest coconut producers? Which regions are major coconut-growing areas? *(Context: the owner's config currently contains a contradiction — one field says shell is sourced from "Java and Sumatra," another says "North Sulawesi, Maluku, NTT." Do NOT resolve it; surface which Indonesian regions are in fact major coconut areas so the owner can confirm the correct sourcing claim — flag in Task E.)*
B2. **Why coconut shell vs wood vs bamboo** for charcoal: compare on density, ash content, fixed carbon, burn time, and odor — the buyer-relevant differences. (Feeds a cross-link to `/guide/coconut-vs-bamboo-vs-wood-charcoal`.)
B3. **Coconut shell as a by-product / circular-economy angle** — is shell a residue of copra/coconut-food industries? State accurately (don't overclaim sustainability).
B4. Any **recognized quality benchmarks** buyers cite for premium shisha charcoal (ash %, fixed carbon %, burn time) — typical industry thresholds, labeled as industry norms not our spec.

## Task C — Competitor / SERP teardown (structure only, NOT facts)

C1. For the queries *"coconut shisha charcoal factory / manufacturer," "how is coconut charcoal made," "hookah charcoal factory tour,"* identify the top-ranking pages (manufacturers, large distributors). For each: do they have a dedicated **factory/process page**? A **capacity** statement? A **video tour**? **Certifications** shown? Visible **schema** (HowTo / Organization / VideoObject)? E-E-A-T signals (named people, audits)?
C2. **The gap:** summarize what's missing across competitors that a well-structured `/factory` pillar can own (e.g., a real stepped HowTo with numbers, a capacity table, a verifiable tour, manufacturer schema). One paragraph.
C3. Note any **common buyer questions** these pages answer (FAQ mining) that we should cover.

## Task D — Schema & citable anchors

D1. Confirm the correct schema.org types for a manufacturing-process page (**`HowTo`** with `HowToStep`) and a manufacturer context (**`Organization`** / `manufacturer`), and any gotchas for `HowTo` rich results.
D2. The 3–5 best **authoritative outbound links** the factory pages could cite (e.g., a standards page for proximate analysis, an FAO coconut-statistics page, an IMDG/self-heating reference for the weathering rationale).

## Task E — OWNER INPUT REQUIRED (not web-researchable — list, do not invent)

Compile the checklist of facts only the company can supply, so the build's `company.ts` `factory`/`production` gaps can be filled at fill-time:
- The **real raw-material origin** (resolve the Java/Sumatra vs Sulawesi/Maluku/NTT contradiction).
- This factory's **process specifics**: carbonization temperature, oven cycle confirmation, binder type/%, drying moisture target, **weathering days**.
- **`countriesServed`** — the actual export-market list.
- **Factory tour video** (YouTube ID + upload date) and **factory photo assets** (the 6 gallery shots) and whether the **factory-audit PDF** is real (currently a placeholder).
- The **E-E-A-T reviewer** for this pillar.
- Confirmation that the published capacity figures (14 t/day, 350 t/mo, 8 ovens, 4 lines) are current and OK to publish.

---

## Output format (return exactly this structure)

Produce a single markdown findings sheet titled **`factory-research-findings.md`** with sections **A, B, C, D, E** mirroring the tasks. For every numbered item (A–D) use:

```
### [Item ID] — [short title]
**Finding:** [concise paraphrase; numbers/ranges exact, each tagged [INDUSTRY RANGE] or general]
**Source:** [URL] ([source type], checked YYYY-MM-DD)
**Confidence:** High / Medium / Low
**Notes:** [conflicts, "claim vs measurable," or "general industry — confirm this factory's value in Task E"]
```

Task E is a plain checklist (no sources — these are owner facts).

End the sheet with two short lists:
1. **Open items** — everything unverifiable or conflicting, each routed to who resolves it (owner / lab / none).
2. **Citable anchors** — the 3–5 best authoritative URLs suitable as outbound links on the factory pages.

Do not pad. Do not editorialize. Do not present industry ranges as this factory's values. Flag, don't guess.
