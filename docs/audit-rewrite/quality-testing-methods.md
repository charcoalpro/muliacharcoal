# Content Audit & Targeted Rewrite — Testing Methods
**Route:** /quality/testing-methods · **Source:** src/i18n/en/qualityTesting.json, src/i18n/en/qualityCommon.json (en.qualityTesting)

This is a **procedural/reference page** (cocoon v4.2 §5.3): it owns the laboratory *procedure* behind each spec figure. "What the value means / what a good value is" lives on `/quality/specifications-explained` by design, linked at each method — so absence of target values here is a deliberate split, not a gap. The `.astro` top comment encodes the intentional structure: two labeled tiers (A = lab methods, B = observed indicators), a standard named only when confirmed in config, and Tier-B parameters carrying NO laboratory method. All of that is correct and is treated as such below.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | Section H2/H3 are noun labels ("Ash content", "Laboratory test methods (Tier A)", "Independent and third-party testing"). They map cleanly to buyer questions ("How is ash tested?") and the FAQ asks those questions verbatim, but the body H3s themselves are not interrogative. Acceptable for a reference table-of-methods, but the two tier H2s could be sharpened to questions (see §3). |
| 2. Featured-snippet lead | PASS | Every method body opens with a self-contained definition-style first sentence ("Ash content is measured by combusting a weighed sample…", "Calorific value is determined in a bomb calorimeter…"). Tier intros and the hero subtitle also lead with a direct answer. Strong GEO extractability. |
| 3. Paragraph intent | PASS | Each paragraph serves one intent: hero = scope-setting; intro = pillar placement + scope split; each method body = "how is X measured"; Standard/Equipment lines = verification detail; independent section = "is it third-party verified". No stray intents. |
| 4. No fluff + anti-bloat | PASS | Dense, specification-first prose; almost no filler. One borderline line is the hero subtitle (mild "Every specification is only as good as the method behind it" framing) — defensible as a thesis sentence, not bloat. Nothing needs a 20% cut. |
| 5. Section purity | PASS | Tier A = lab methods only; Tier B = observed indicators only; independent section = third-party + SHT; video = demo. No cluster bleed. The deliberate Tier-A/Tier-B firewall is exactly the purity the rule wants. |
| 6. Structure | PASS | Logical order: scope → at-a-glance → Tier A (5 lab methods) → Tier B (2 observed) → independent/SHT → video → FAQ → related. Full coverage of every populated parameter so each `specs→testing` anchor resolves. No duplicated meaning (fixed-carbon "by difference" is stated once and cross-referenced from volatile-matter, not repeated). |
| 7. Devil's Advocate | N/A | Procedural/reference page with no arguable thesis to oppose. See §4. |
| 8. Quantified evidence | PASS | Claims are method/standard claims, and the specific standards ARE named from config (ASTM D1762-84(2021) for ash + proximate; ISO 18125:2017 for calorific). The page deliberately carries no spec *numbers* (those live on specifications-explained) — correct split, so "missing numbers" is not a failure here. |
| 9. Mini-cases | N/A | No customer/problem→action→result case is claimed, and none should be invented. Correctly absent. |
| 10. Ontological completeness | PASS | Genesis (factory `{{brand}}` as the testing entity; in-house lab + named third-party labs), Taxonomy (charcoal-correct ASTM/ISO methods, Tier A vs Tier B classification, proximate-analysis relationships), and Pragmatics (report travels with cargo; "confirm specs against an outside source") are all explicit and densely linked to specs-explained, certifications, UN 1361, samples, glossary. |

**Per-locale / hreflang / RTL:** N/A — production is English-only (ACTIVE_LOCALES=['en']).

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "Every specification is only as good…" (heroSubtitle) | Orientation: what this page covers vs specs page | keep |
| "This page sits under {{brand}}'s…" (intro.p1) | Navigational: pillar placement + scope split | keep |
| "Which parameters are tested, by whom…" (keyFacts.definition + facts) | Extractable summary: who/what/method/report | keep |
| "Each parameter below is produced by…" (groupA.intro) | Disclosure intent: when a standard is named vs generic | keep |
| "Ash content is measured by combusting…" (methods.ash) | "How is ash content tested" | keep |
| "Fixed carbon is determined by proximate…" (methods.fixedCarbon) | "How is fixed carbon measured / by difference" | keep |
| "Moisture is measured by the oven-dry…" (methods.moisture) | "How is moisture in charcoal tested" | keep |
| "Volatile matter is measured by heating…" (methods.volatileMatter) | "How is volatile matter tested" | keep |
| "Calorific value is determined in a bomb…" (methods.calorific) | "How is calorific value / heat measured" | keep |
| "These are read under defined conditions…" (groupB.intro) | Honesty intent: observed ≠ lab-measured | keep |
| "Burn time is observed under defined…" (methods.burnTime) | "How is burn time measured" + caveat | keep |
| "Ash color is assessed visually…" (methods.ashColor) | "What does ash color indicate" | keep |
| "Beyond in-house quality control…" (independent.body1) | "Is it third-party / independently tested" | keep |
| "Separately, the Self-Heating Test (SHT)…" (independent.body2) | "What is the SHT report" (DG deliverable) | keep |
| "The SHT report as a deliverable…" (independent.shtCertIntro/shtDgIntro) | Navigational: route to certs + UN 1361 | keep |
| "A short demonstration of a {{brand}} coal…" (video.body) | Proof intent: see the burn/ash | keep (data caveat — see §3.4) |
| FAQ items (4) | Direct buyer Q&A; FAQPage schema | keep |
| Related topics (7 links) | Cluster cross-linking | keep |

No paragraph is fluff; nothing is marked compress/delete.

## 3. Targeted rewrites

The page is already strong. Only minor, optional sharpening below — none of these is a factual gap, and none adds a claim the page deliberately omits.

### 3.1 Rule 1 — Tier heading could be question-shaped (optional)
The two tier H2s are noun labels. They map to questions but don't ask them. If interrogative headings are wanted for GEO/snippet symmetry with the FAQ, the label can move into a sub-line so the H2 carries the question. Lowest-risk version keeps the existing label and only tightens the intro's first sentence into a direct answer (it already nearly is):

CURRENT (`groupB.intro`):
> "These are read under defined conditions, not measured to a laboratory standard. They are honest performance indicators — never assigned an ISO or ASTM method."

CORRECTED (leads with the buyer's implicit question answered):
> "Why do burn time and ash color carry no standard? Because they are read under defined conditions, not measured to a laboratory method — honest performance indicators, never assigned an ISO or ASTM designation."

(Optional. The current text already passes Rule 2; this only adds Rule-1 question framing.)

### 3.2 Rule 1 — Tier A intro, same optional sharpening
CURRENT (`groupA.intro`):
> "Each parameter below is produced by a defined laboratory procedure. Where {{brand}} tests to a recognized standard, it is named; where a procedure is described generically, no specific standard is asserted."

CORRECTED (optional question lead, no new fact):
> "Which parameters are measured in a lab, and to what standard? Each parameter below comes from a defined laboratory procedure. Where {{brand}} tests to a recognized standard it is named; where a procedure is described generically, no specific standard is asserted."

### 3.3 Rule 4 — micro-tighten heroSubtitle (optional, marginal)
CURRENT (`heroSubtitle`):
> "Every specification is only as good as the method behind it. This page describes how {{brand}} measures each laboratory parameter, which indicators are observed rather than measured, and what an independent laboratory checks on every container."

This is fine as-is. If a leaner lead is preferred, drop the aphorism and lead with the answer:
> "This page describes how {{brand}} measures each laboratory parameter, which indicators are observed rather than measured, and what an independent laboratory checks on every container."

Keep the original if the thesis sentence is wanted for tone; the rewrite is purely a length trim.

### 3.4 DATA ISSUE (not a prose fix) — video currently points to a placeholder ID
The `.astro` gate (`hasVideo = hasFact(video.youtubeId)`) is designed to omit the entire "Burn and ash test" section until the asset lands. But `company.json → quality.testingVideo.youtubeId` is currently `"dummyVideoID"` (plus empty `durationISO`/`uploadDate`). Because `"dummyVideoID"` is a non-empty string that does not start with `TODO_PLACEHOLDER`, `hasFact()` returns **true**, so the section, the VideoObject schema node, and the YouTube facade all render against a non-existent video, and the schema `uploadDate`/`duration` are empty. This is a config/data correctness problem, not a content-text gap — the prose (`video.body`) is fine. **Fix in `src/config` data, not in this JSON:** set `youtubeId` to `""` (or a `TODO_PLACEHOLDER…` value) until the real burn-test video is published, OR populate the real `youtubeId` + `durationISO` + `uploadDate`. No prose change required. Flagged as owner data in §6.

No other rewrites: methods bodies, FAQ, independent/SHT section, and cross-links all pass.

## 4. Devil's Advocate section

N/A — this is a procedural/reference page documenting laboratory test *methods*; it makes no arguable thesis (e.g. "buy from us" / "coconut beats X") for an opposing industry view to rebut. The closest thing to a stance — "observed indicators are not laboratory-measured" — is itself the honesty caveat, already stated plainly in `groupB.intro` and `methods.burnTime`. Adding a contrived counter-argument would manufacture conflict the page doesn't have.

## 5. Ontological completeness & triangulation

- **Genesis — explicit.** The testing entity is `{{brand}}` with an in-house lab ("quality control on every batch") plus named independent labs (Carsurin, Beckjorindo, SGS). Factory-as-source of the measurement is clear; the third-party labs are the external-verification node. Well connected.
- **Taxonomy — explicit and charcoal-correct.** Tier A vs Tier B is an explicit classification; methods are the right material class (ASTM D1762-84(2021) for ash + proximate; ISO 18125:2017 for calorific). Proximate-analysis relationships are modeled (fixed carbon "by difference"; volatile matter as a step of the same proximate run). No coal/coke standards. Strong.
- **Pragmatics — explicit.** Buyer value is named: the third-party report "travels with the cargo" so the buyer can "confirm the specifications against an outside source"; SHT report is positioned as a DG shipping deliverable routed to UN 1361. Clear pragmatic payoff.
- **Weak-connectivity nit (minor):** `moisture` and `burn time`/`ash color` appear in `thirdPartyScope` semantics only via the at-a-glance box; the independent-section body lists scope generically (`{{thirdPartyScope}}`) — fine, but the relationship "which Tier-A parameters the *third party* re-tests vs which are in-house only" is left implicit. Not a defect; a single clause could make the in-house-vs-third-party coverage map explicit if desired (no new fact needed — `thirdPartyScope` already enumerates ash, moisture, fixed carbon, volatile matter).
- **Triangulation verdict:** all three vertices (factory-as-source, charcoal-taxonomy position, buyer-pragmatic value) are present and cross-linked to specifications-explained, certifications, UN 1361, samples, and glossary. Ontologically dense; no isolated concepts.

## 6. Gaps needing owner data

- **Burn/ash test video asset.** `quality.testingVideo.youtubeId` is the placeholder `"dummyVideoID"` (and `durationISO`/`uploadDate` are empty), so the video section + VideoObject schema currently render against a non-existent video. <NEEDS-OWNER-DATA: real burn-test YouTube ID + ISO-8601 duration + uploadDate — OR set youtubeId to "" / a TODO_PLACEHOLDER value so hasFact() omits the section until the asset is published>. (Data fix in `src/config`, not in qualityTesting.json.)
