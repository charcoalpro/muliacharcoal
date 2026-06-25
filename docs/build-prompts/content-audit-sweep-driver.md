# Content Audit — Site-Wide Sweep & Correction Driver (muliacharcoal.com)

**Version:** v1.0
**Type:** Claude Code orchestration prompt. Site-wide. Examines each page individually. Proposes corrections on a branch via PR. **Main is never touched.**

---

## Purpose

Run the single-page content audit across **every live page** of muliacharcoal.com, examine each page individually, then propose corrections on a dedicated branch as a reviewable PR. In the default mode, only safe structural / SEO / linking / schema-placement corrections are applied automatically. Every company fact and every regulatory or factual claim is **never auto-written** — it is surfaced as a TODO and routed to the deep-research companion.

---

## Relationship to the other two prompts (read, don't duplicate)

- **Per-page examination logic** = `docs/build-prompts/content-audit-page.md`. Read it and run its passes on each page. Do not re-implement it here.
- **Unverified / regulatory claims** = `docs/build-prompts/content-audit-deep-research.md`. Route flagged claims there. Never invent data to "fix" a claim.

---

## How to invoke

```
MODE               = safe-fix          # safe-fix (default) | report-only
GATE_BEFORE_FIX    = true              # stop after the audit report for approval before creating any fix branch
SCOPE              = live-only         # live-only: only routes in LIVE_ROUTES; deferred/muted routes are NOT audited
BRANCH_GRANULARITY = per-pillar        # per-pillar (default) | single
AUDIT_OUTPUT_DIR   = docs/audits/<YYYY-MM-DD>/
BRANCH_PREFIX      = audit/content-sweep-<YYYY-MM-DD>
# inherited reference paths — confirm once in CLAUDE.md:
COMPANY_TS, VERIFIED_FACTS, DRMAX_TECHNICAL, CLAUDE_MD, DESIGN_MD
```

The atomic unit of examination is **one page** (Stage B), and the atomic unit of a commit is **one page** (Stage C), so a large sweep stays reviewable page by page.

---

## Hard safety carve-out — applies in EVERY mode, cannot be overridden

Regardless of `MODE`, Claude Code MUST NOT auto-write any of the following:

- **Any company fact** (legal name, NIB, NPWP, address, phone, WhatsApp, email, capacity, line/oven counts, MOQ, port of loading, owner/staff names, bank details, certification IDs). These live only in `COMPANY_TS`. A needed fact is a **TODO for Greg**, never an edit.
- **Any regulatory or factual claim** flagged Error or Unverified (UN 1361, IMDG 42-24, SP 978, EUDR, Russia VAT, SABER, HS 4402.20 duties…). Route to deep-research; leave a TODO.
- **Anything that would create or "fill" a trust block without a backing fact** (honesty-gating — banking-details severity). Held-cert vs per-order-report stays distinct.

Violating this carve-out is a critical failure. When in doubt, leave a TODO. Do not edit.

---

## Stage A — Discover & enumerate (read-only) → GATE

1. Enumerate all live pages: crawl `src/pages`, content collections, and `LIVE_ROUTES`. Exclude deferred/muted routes (per `SCOPE`), plus `/admin`, `/api`, `/dev/components`.
2. Group by pillar; output the ordered list and total count.
3. **Stop.** Present the scope for approval before auditing anything. This prevents a runaway sweep.

---

## Stage B — Per-page audit loop (read-only)

For each page, in pillar order:

1. Run the full per-page audit from `content-audit-page.md` (Passes 0, 1, 2, 3, 5; Pass 6 only if its flag is set in that prompt).
2. Write an individual report to `AUDIT_OUTPUT_DIR/<pillar>/<page-slug>.md`.
3. Append a roll-up row to `AUDIT_OUTPUT_DIR/_summary.md`: `page | blockers | defects | hardening | PQ | claims-needing-research`.

No site file is edited in this stage.

After the loop: if `GATE_BEFORE_FIX`, **stop** and present `_summary.md` for approval before any branch is created. If `MODE = report-only`, **stop here regardless** — the audit reports are the deliverable.

---

## Stage C — Correction branch(es) (safe-fix mode only, after approval)

1. Create branch(es) per `BRANCH_GRANULARITY` (`per-pillar` → one branch per pillar, each getting its own Cloudflare preview; `single` → one branch). **Never commit to main.**
2. Apply **only safe-tier corrections**, one logical commit per page (Conventional Commits: `seo:`, `fix:`, `refactor:`, `style:`):
   - Headings → question form; snippet lead paragraphs; heading-level integrity.
   - Anti-bloat trims and de-duplication (no fact loss).
   - Internal links to **already-live** routes only (pillar up-links, Related sections). Never un-mute a `MaybeLink`, never link a deferred route.
   - Schema **type / placement** corrections (e.g., move a stray FAQPage to `/faq`, add a missing BreadcrumbList). Placement only — JSON-LD validity stays with `DRMAX_TECHNICAL`.
   - i18n string extraction (move a hardcoded UI string into the i18n layer).
3. For every Blocker/Defect that is **not** safe to auto-apply (facts, claims, honesty-gating, anything needing new true data), insert a `{/* TODO(audit): … */}` note at the location and record it in the PR body. Do not edit the substance.
4. Run read-only `npm run build` on the branch. If it warns or errors, **stop and report** — do not push a broken branch.

---

## Stage D — Propose via PR → STOP

1. Push the branch(es). For each, produce a PR description containing:
   - What changed, per page (the safe corrections).
   - What was deliberately deferred and why (facts / claims / honesty items, with pointers to `COMPANY_TS` and the deep-research list).
   - Pages affected; note that a Cloudflare preview deploy builds per branch for QA.
   - Link to the audit reports in `AUDIT_OUTPUT_DIR`.
2. **Stop.** Nothing merges to main. Greg reviews each PR (and its preview) and merges.

---

## Execution notes

- This is a long run. The per-page reports and roll-up are written incrementally, so an interrupted sweep resumes from the next un-audited page.
- Never widen `SCOPE` or touch deferred routes to "be thorough." Out-of-scope thoroughness is a defect here.
- Competitor reference for content-gap judgments during the audit: main competitor glowingcharcoal.com; also coconutcharcoalfactory.com and djavacoal.com (the latter blocks crawlers — a structural weakness to avoid, not imitate).

---

## Changelog

- **v1.0** — Initial. Site-wide driver wrapping the single-page audit; Stage-A scope gate + post-audit gate; safe-fix branch with per-page commits and PR; hard fact/honesty carve-out no mode can override; per-pillar branching; live-routes-only scope.
