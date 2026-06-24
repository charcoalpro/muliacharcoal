# Content Audit — Deep Research Companion (muliacharcoal.com)

**Version:** v1.0
**Type:** Claude Code research prompt. Verification-only. Triggered on demand.
**Output:** Findings sheet with per-claim primary source + confidence, plus a *surfaced* (not auto-written) set of proposed `company.ts` / verified-facts updates.

---

## Purpose

Resolve the **Requires external verification / Requires deep research** list produced by `content-audit-page.md`. For each flagged claim, verify against a **primary** source, capture the source URL, the publication/effective date, and a confidence level. Surface corrections and proposed fact-store updates for Greg to merge. Do not write to the repo.

---

## How to invoke

Paste the **Requires deep research** list from the page audit. Then lock scope before researching.

```
CLAIMS            = <paste the flagged claim list from content-audit-page.md>
VERIFIED_FACTS    = docs/research/verified-facts.md      # CONFIRM PATH
MARKETS_IN_SCOPE  = <subset of: USA, UK, Saudi Arabia, Germany, Russia/CIS — or "all flagged">
```

### Pre-run scoping (lock before researching)
State and confirm, in one short block, before any search:
1. Which exact claims are in scope (numbered).
2. Which markets each claim touches.
3. Depth per claim (single authoritative source vs. cross-check across ≥2).
Do not begin research until this block is stated. Do not expand scope mid-run.

---

## Source hierarchy (priority of truth)

1. `VERIFIED_FACTS` (if it already answers the claim, cite it and stop — no re-research).
2. **Primary regulatory/official sources**, by domain:
   - Dangerous goods / UN 1361 / Class 4.2 / IMDG 42-24 / SP 978 → IMO, IMDG Code, national competent-authority notices.
   - EUDR (Reg. EU 2023/1115), HS 4402 scope, EU duty → EUR-Lex, EU Commission, TARIC.
   - Saudi → SABER / SASO SCoC official portals; Saudi customs tariff.
   - Russia/CIS → official federal law texts (e.g. VAT changes), carrier suspension notices, sanctions lists.
   - Carrier acceptance (MSC, Maersk, CMA CGM, Emirates, Asyad; declining: Hapag-Lloyd, ONE, Cosco, ZIM) → carrier dangerous-goods/restricted-cargo pages.
   - HS classification & duties (4402.20 across markets) → official customs tariff databases.
   - Standards-gap thesis → ISO / ASTM / CEN / BSN catalog searches confirming absence of a purpose-built product-level shisha-charcoal standard.
3. Reputable secondary sources only to corroborate, never as the sole basis for a regulatory claim.

Never cite forums, content aggregators, or competitor sites as authority. Never cite extremist or low-quality sources.

---

## Per-claim verification procedure

For each in-scope claim:
1. Search primary sources first. Capture the **exact source URL**, the **publication or effective date**, and the **jurisdiction**.
2. Determine status: **Confirmed** / **Refuted** / **Partially confirmed** / **Unresolved**.
3. Assign **confidence**: High (primary source, current, unambiguous) / Medium (primary but dated or needs interpretation) / Low (only secondary corroboration).
4. If the page's wording is technically true but misleading (e.g. implies coverage that does not exist, such as marine-insurance coverage of self-heating fire — which is excluded inherent vice), note it as **Misleading-though-true** and explain the precise correction.
5. Note any effective-date sensitivity (e.g. SP 978 effective 1 Jan 2026; EUDR enforcement 30 Dec 2026; Russia VAT 22% from 1 Jan 2026) so freshness dating can be set to the real event.

---

## Output

### 1. Findings sheet

| # | Claim (as written) | Status | Confidence | Primary source URL | Effective/pub date | Correction / precise wording |
|---|---|---|---|---|---|---|

### 2. Open items
List any **Unresolved** claims with what specifically blocks resolution and what input from Greg or the factory would close it.

### 3. Proposed fact-store updates (SURFACED — do not write)
For confirmed corrections that belong in the fact store, output a clearly-labeled block of proposed additions/edits to `COMPANY_TS` (for company facts) or `VERIFIED_FACTS` (for external regulatory facts), with the source URL and confidence beside each. **Do not edit either file.** Greg merges manually, honoring the honesty-gating / banking-details-severity rule and the held-cert vs per-order-report distinction.

### 4. Loop-back
List the exact Pass 3 claim rows in `content-audit-page.md` that should be re-run after Greg merges, so the page audit's claims register reflects verified status.

Then **stop**.

---

## Changelog

- **v1.0** — Initial. Pre-run scope lock; primary-source hierarchy per market; confidence + effective-date capture; Misleading-though-true handling (e.g. marine-insurance self-heating exclusion); surfaced-not-written fact-store updates; loop-back to page audit.
