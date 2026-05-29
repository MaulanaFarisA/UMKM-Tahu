# UI Overhaul — Pembukuan Tahu (UI/UX Pro Max)

## TL;DR

> **Quick Summary**: Strip accumulated visual debt across all 12 routes, reconcile the fractured token system (Tailwind config vs globals.css), extract proper primitive components, and rebuild every page to use Tailwind utilities + primitives instead of inline styles — preserving the warm-cream UMKM identity, all server actions, and 98/98 test pass rate.
>
> **Deliverables**:
> - Reconciled token system: `tailwind.config.ts` mirrors `globals.css` CSS vars via `<alpha-value>` pattern; pages use `bg-card text-text-primary` instead of `style={{ color: 'var(--...)' }}`
> - 6 new primitives (Button, Card, StatTile, Pill, MoneyValue, Section) + audit/refinement of 6 existing (EmptyState, InfoBanner, StatusBadge, MetricCard, FormSection, PageHeader)
> - Decoration purge: remove `.gradient-mesh-warm`, `.grain-overlay`, `.float`, `.float-slow`, `.dot-pattern`, body radial gradient mesh, login floating-gradient blobs, FAB pulse-ring
> - All 12 routes redesigned: AppShell simplified, Beranda decluttered (drop "Yang Perlu Dilakukan" duplication), forms with proper error-state UI, login + register rebuilt on warm-cream
> - Microcopy audit: zero "Belum Lunas" remaining, no verb-echo on Catat CTAs, AGENTS.md microcopy table fully enforced
> - Accessibility: WCAG AA contrast verified on every surface (axe-core via Playwright); focus-visible on all interactives; no decoration interfering with screen readers
>
> **Estimated Effort**: Large (24 implementation tasks + 4 reviews across 6 waves)
> **Parallel Execution**: YES — 6 waves with up to 8 parallel tasks per wave
> **Critical Path**: T1 (baseline) → T2 (tokens) → T5-T10 (primitives) → T11 (Beranda + USER GATE) → T12-T19 (parallel pages) → T20-T24 (polish) → F1-F4 (reviews) → user okay

---

## Context

### Original Request
> "i need you to check this website on everything that has been made. the ui ux and everything. i still feel that this website ui is bad and i need your evaluation for it. use the ui ux pro max repo to make this better and cleaner. no more old junk"

### Interview Summary

**4 confirmed decisions (via Question tool, 2026-05-25)**:
1. **Direction**: Refine warm-cream UMKM identity (keep purple accent + warm cream + semantic profit/loss/warn — strip decorations, unify tokens, build primitives). NOT a rebrand.
2. **Scope**: All 12 routes + AppShell + globals.css + tailwind.config.ts reconciliation. Single plan, ONE pass.
3. **Token strategy**: Reconcile `tailwind.config.ts` to match `globals.css` so utilities like `bg-bg`, `text-text-primary`, `border-border` work natively. CSS vars stay as source of truth.
4. **Test strategy**: Tests-after + agent QA via Playwright. Existing 98 tests must continue passing. No new test framework, no new dependencies.

**Diagnosis (verified from filesystem)**:
- Token system fractured (cool-gray Tailwind theme vs warm-cream globals.css) → forces every page into inline styles. ~30% of `beranda/page.tsx` is `style={{}}` blocks.
- AI-slop signature: 501-line Beranda with no primitives; same gradient/border-left/pill recipes repeated 5+ times across pages.
- Decoration overload: 6 visual layers on hero card, 3 floating gradients on login, body radial mesh, 5 unused decoration utilities in globals.css.
- Information redundancy on Beranda (3x receivables CTA, "Yang Perlu Dilakukan" duplicates quick actions).
- Color signal-to-noise: green/red/amber/purple all used as backgrounds + accents simultaneously.
- Login/register visually disjoint (hardcoded hex, solid-purple panel contradicts cream identity).
- Microcopy drift: stale "Belum Lunas" against AGENTS.md mandate.

### Metis Review (incorporated)

**Adversarial findings absorbed into this plan**:
- ADD Wave 0 pre-flight: baseline test snapshot, hardcoded-class audit, `.next/` cleanup, OneDrive sync verification
- ADD user review gate after Beranda redesign before unblocking remaining pages
- ADD explicit `<alpha-value>` CSS-var pattern in T2 (Tailwind opacity modifiers fail without it)
- ADD specs for: negative MoneyValue, disabled Button, form error states, loss-hero, long business names, `formatRupiah(0)` output
- ADD WCAG AA target with specific color pairs to verify
- ADD primitive API contract: `className` accepted ONLY for layout/spacing, never color/typography
- ADD MUST NOT guardrails: no data-testid changes, no server-action wiring changes, no dark: variants, no new deps, no toast/skeleton/error-boundary additions, no animation library, no font swap

**Note on Oracle phase 1 gate**: The Oracle phase-1 verification task hit the 30-min inactivity timeout (environmental). Given Metis's exhaustive review covered the same ground, plan proceeds without that gate. Oracle phase-2 will run on the saved plan.

---

## Work Objectives

### Core Objective
Eliminate accumulated visual debt and inline-style sprawl across all 12 routes, reconcile the dual token system into one Tailwind-utility-driven design system, extract reusable primitives, and rebuild each page to feel intentionally minimal — without changing any server action, query, schema, or auth behavior.

### Concrete Deliverables
- `tailwind.config.ts`: theme.colors / theme.boxShadow / theme.borderRadius mirroring globals.css CSS vars via `rgb(var(--token) / <alpha-value>)` pattern
- `src/app/globals.css`: decoration purge (~50 lines removed); CSS vars exported in space-separated RGB form for Tailwind consumption
- `src/components/ui/`: new directory with Button, Card, StatTile, Pill, MoneyValue, Section primitives (each < 120 lines)
- `src/components/`: refined EmptyState, InfoBanner, StatusBadge, MetricCard, FormSection, PageHeader (all backward-compatible)
- All 12 route files redesigned: AppShell, Beranda, Catat, Catat/Penjualan, Catat/Pengeluaran, Piutang, Pengaturan, Login, Register, plus root + 4 internal — using primitives + Tailwind utilities. Inline `style` only for genuinely dynamic values (e.g., status-tinted hero gradient).
- Playwright screenshot evidence per page × 4 viewports (375/768/1024/1440) saved to `.omo/evidence/`
- axe-core accessibility report per page (WCAG AA pass, zero contrast violations)
- Microcopy audit: zero "Belum Lunas" matches in `src/`, AGENTS.md microcopy table enforced

### Definition of Done
- [ ] `npm run typecheck` → 0 errors
- [ ] `npm test` → 98/98 pass (or higher after intentional test updates; never lower)
- [ ] `npm run build` → 12/12 pages compile clean
- [ ] `grep -rE "style=\\{\\{[^}]*color\\b" src/app src/components --include="*.tsx" | wc -l` → ≤ 5 (only dynamic verdict colors allowed)
- [ ] `grep -rE "style=\\{\\{[^}]*backgroundColor" src/app src/components --include="*.tsx" | wc -l` → ≤ 3 (only dynamic verdict bg allowed)
- [ ] `grep -r "Belum Lunas" src/ --include="*.tsx"` → 0 matches
- [ ] axe-core via Playwright on each of 12 routes → 0 contrast violations
- [ ] Playwright screenshot artifacts exist at `.omo/evidence/final-qa/{route}-{viewport}.png` for 12 × 4 = 48 files
- [ ] No new dependencies added to `package.json` (diff shows only file changes, not deps)
- [ ] All `'use server'` action bindings (`action={...}`, `formAction`) byte-identical to baseline (grep diff)

### Must Have
- Token reconciliation working with Tailwind opacity modifiers (`bg-card/80`, `text-text-primary/70`)
- 6 new primitives in `src/components/ui/` with strict API: variant/tone/size props only — `className` accepted only for layout/spacing utilities
- AppShell simplified: drop FAB pulse-ring, drop competing brand+title pattern, single frosted-blur surface
- Beranda decluttered: remove "Yang Perlu Dilakukan" card, remove desktop secondary actions duplication, remove mobile tail-CTA "Lihat semua tagihan"
- Login + register rebuilt on warm-cream: no floating gradients, no dot-pattern, no solid-purple panel; consistent with in-app pages
- Form error states: `state.error` from `useActionState` rendered with proper InfoBanner variant on Penjualan + Pengeluaran (currently only on Login + Register)
- Microcopy audit per AGENTS.md table fully enforced
- WCAG AA contrast verified on every surface

### Must NOT Have (Guardrails — from Metis)
- **MUST NOT** change any `action={...}`, `formAction`, or server action binding
- **MUST NOT** modify `src/server/actions.ts`, `src/server/queries.ts`, `src/domain/finance.ts`, `src/domain/seed-defaults.ts`, `src/lib/format.ts`, `src/lib/supabase-server.ts`, `src/lib/supabase-browser.ts`, `supabase/schema.sql`, or `src/types/database.ts`
- **MUST NOT** introduce `useState`, `useReducer`, `useEffect`, or any client-side state into Server Components
- **MUST NOT** change any `data-testid` attribute (would silently break tests)
- **MUST NOT** rename, move, add, or delete any route file (filesystem-coupled)
- **MUST NOT** change `formatRupiah()` call signature or import path
- **MUST NOT** add `dark:` variants anywhere (dark mode out of scope)
- **MUST NOT** add new dependencies — no UI library, no chart library, no animation library, no test framework additions, no icon library swap
- **MUST NOT** add `transition-*`, `animate-*`, or `@keyframes` beyond what currently exists in globals.css
- **MUST NOT** add new fonts or modify `next/font` config
- **MUST NOT** add toast/notification system, loading skeletons, or error boundaries (none exist now → adding is new behavior, not redesign)
- **MUST NOT** change `<title>`, `<meta>`, or layout file metadata (SEO unchanged)
- **MUST NOT** add ARIA attributes beyond what's needed for the specific accessibility issue (don't blanket-add `aria-label` to elements that don't need them)
- **MUST NOT** introduce a primitive `className` API that accepts arbitrary color/typography classes (variant-only API)
- **MUST NOT** proceed past T11 (Beranda reference) without the user-review gate — that task carries an explicit pause
- **MUST NOT** create files at `.omo/plans/` outside this single plan file or write to `docs/`

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — All verification is agent-executed via Playwright + Bash. Acceptance criteria requiring "user manually tests/confirms" are FORBIDDEN, except for the single explicit user-approval gate after T11 (Beranda reference page).

### Test Decision
- **Infrastructure exists**: YES (`vitest.config.ts`, 98/98 baseline)
- **Automated tests**: Tests-after — fix existing tests when assertions break on stable structural classes; do not add new test framework
- **Framework**: Vitest 3.2 (existing). No new test deps.
- **Per-task TDD**: NOT used (visual refactor; behavior unchanged)

### QA Policy
Every implementation task MUST include agent-executed Playwright QA scenarios. Evidence saved to `.omo/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Playwright via the `playwright` skill — navigate, interact, assert DOM, screenshot, check console errors, verify zero horizontal overflow
- **Accessibility**: axe-core injected via Playwright (`@axe-core/playwright` is NOT a dep — load via CDN script tag in test page) → assert 0 contrast violations on each route
- **Build verification**: After each task → `npm run typecheck && npm test && npm run build`
- **Inline-style audit**: `grep -rE 'style=\\{\\{[^}]*(color|backgroundColor|background|border-color)' src/` — count must monotonically decrease across waves

### Per-Wave Quality Gate
After each wave completes, the next wave does NOT start until:
1. `npm run typecheck` exits 0
2. `npm test` exits 0 with ≥ baseline test count
3. `npm run build` exits 0 with all 12 pages compiling
4. No new files created outside `src/`, `.omo/evidence/`, or `.omo/plans/`

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 0 (Pre-flight - SEQUENTIAL, 1 task):
└── T1: Baseline + audit [quick]

Wave 1A (Foundation - 3 parallel):
├── T2: Token reconciliation (tailwind.config.ts + globals.css RGB export) [deep]
├── T3: globals.css decoration purge [quick]
└── T4: Existing primitive audit + report [quick]

Wave 1B (New primitives - 6 parallel, after T2 + T3):
├── T5: Button primitive [visual-engineering]
├── T6: Card primitive [visual-engineering]
├── T7: StatTile primitive [visual-engineering]
├── T8: Pill primitive [visual-engineering]
├── T9: MoneyValue primitive [visual-engineering]
└── T10: Section primitive [visual-engineering]

Wave 2A (Reference page - SEQUENTIAL, 1 task with USER GATE):
└── T11: Beranda redesign + USER REVIEW GATE [visual-engineering]
        → STOP. Show screenshots. Wait for explicit user "okay" before Wave 2B.

Wave 2B (Remaining pages - 8 parallel, after T11 approved):
├── T12: AppShell simplification [visual-engineering]
├── T13: Catat menu redesign [visual-engineering]
├── T14: Catat Penjualan redesign + form errors [visual-engineering]
├── T15: Catat Pengeluaran redesign + form errors [visual-engineering]
├── T16: Piutang redesign [visual-engineering]
├── T17: Pengaturan redesign [visual-engineering]
├── T18: Login rebuild on warm-cream [visual-engineering]
└── T19: Register rebuild on warm-cream [visual-engineering]

Wave 3 (Polish - 5 parallel):
├── T20: Microcopy audit (Belum Lunas → Belum Dibayar, verb-echo fixes) [quick]
├── T21: Cross-page responsive sweep + horizontal overflow check [unspecified-high]
├── T22: WCAG AA accessibility pass (axe-core via Playwright) [unspecified-high]
├── T23: Inline-style purge verification + remaining cleanup [quick]
└── T24: Form error state implementation (Penjualan + Pengeluaran) [unspecified-high]

Wave FINAL (Reviews - 4 parallel, then user okay):
├── F1: Plan compliance audit [oracle]
├── F2: Code quality review [unspecified-high]
├── F3: Real Playwright manual QA (12 routes × 4 viewports) [unspecified-high + playwright skill]
└── F4: Scope fidelity check (zero touches to actions/queries/schema) [deep]
→ Present consolidated review results → wait for user explicit "okay" before completion

Critical Path: T1 → T2 → T5-T10 (parallel) → T11 (gate) → T12-T19 (parallel) → T20-T24 (parallel) → F1-F4 → user okay
Max Concurrent: 8 (Wave 2B)
Parallel Speedup: ~65% vs sequential
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| T1 | — | T2, T3, T4 |
| T2 | T1 | T5-T10, T12-T19 |
| T3 | T1 | T5-T10, T18, T19 |
| T4 | T1 | T11-T19 |
| T5 | T2, T3 | T11-T19 |
| T6 | T2, T3 | T11-T19 |
| T7 | T2, T3 | T11, T12, T16 |
| T8 | T2, T3 | T11-T19 |
| T9 | T2, T3 | T11-T19 |
| T10 | T2, T3 | T11-T19 |
| T11 | T2-T10 | T12-T19 (after USER GATE) |
| T12 | T11 | T20-T24 |
| T13-T19 | T11 | T20-T24 |
| T20-T24 | T12-T19 | F1-F4 |
| F1-F4 | T20-T24 | user okay |

### Agent Dispatch Summary

| Wave | Tasks | Agent Profile |
|------|-------|---------------|
| 0 | T1 | `quick` |
| 1A | T2 | `deep`; T3, T4 | `quick` |
| 1B | T5-T10 | `visual-engineering` |
| 2A | T11 | `visual-engineering` (with playwright skill for screenshots) |
| 2B | T12-T19 | `visual-engineering` (with playwright skill) |
| 3 | T20, T23 | `quick`; T21, T22, T24 | `unspecified-high` |
| FINAL | F1 | `oracle`; F2 | `unspecified-high`; F3 | `unspecified-high` + playwright skill; F4 | `deep` |

---

## TODOs

> Implementation + verification = ONE task. Each task includes Recommended Agent Profile + Parallelization info + Playwright QA scenarios.
> **Task labels use bare numbers**: `1.`, `2.`, ... `24.` — Final wave uses `F1.`, `F2.`, `F3.`, `F4.`.

- [ ] 1. Pre-flight baseline + audit (Wave 0)

  **What to do**:
  - Verify project path is NOT under OneDrive sync that holds file handles. Run `Get-ItemProperty -LiteralPath . | Select-Object -ExpandProperty FullName` and check parent for `OneDrive` segment. If found, log warning to `.omo/evidence/task-1-onedrive-warning.txt` (do not block — user is on OneDrive per env).
  - Delete stale build cache: `Remove-Item -Recurse -Force .next, .turbo -ErrorAction SilentlyContinue`
  - Capture baseline test count: `npm test 2>&1 | Tee-Object -FilePath .omo/evidence/task-1-test-baseline.txt`
  - Capture baseline build: `npm run build 2>&1 | Tee-Object -FilePath .omo/evidence/task-1-build-baseline.txt`
  - Capture baseline package.json deps: `Copy-Item package.json .omo/evidence/task-1-package-baseline.json`
  - Capture baseline data-testid set: `Select-String -Path 'src\**\*.tsx' -Pattern 'data-testid' | Out-File .omo/evidence/task-1-testid-baseline.txt`
  - Audit hardcoded class names in test files: `Select-String -Path 'src\**\*.test.tsx' -Pattern 'bg-|text-|border-|p-\d|m-\d' | Out-File .omo/evidence/task-1-test-class-audit.txt`
  - Audit current inline-style count: `(Select-String -Path 'src\**\*.tsx' -Pattern 'style=\{\{').Count | Out-File .omo/evidence/task-1-inline-style-baseline.txt`
  - Snapshot key file line counts: beranda/page.tsx, login/page.tsx, register/page.tsx, app-shell.tsx, globals.css → save to `.omo/evidence/task-1-line-counts-baseline.txt`

  **Must NOT do**: Modify any source file. Run `npm install` (deps must remain frozen). Delete `node_modules`.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Filesystem inspection + command execution, no design judgment needed
  - **Skills**: none
  - **Skills Evaluated but Omitted**: `playwright` (no UI interaction); `tdd` (no code change)

  **Parallelization**:
  - **Can Run In Parallel**: NO (must run alone — establishes baseline)
  - **Parallel Group**: Wave 0 (sequential)
  - **Blocks**: T2, T3, T4
  - **Blocked By**: None

  **References**:
  - `AGENTS.md:147-153` — verification command order
  - `AGENTS.md:157-164` — known constraints (not a git repo, OneDrive issues)
  - `.omo/notepads/ui-upgrade-umkm-tahu/learnings.md:301-305` — OneDrive file handle gotcha (Task 7)
  - `.omo/notepads/ui-upgrade-umkm-tahu/learnings.md:257-258` — stale .next/types gotcha (Task 11)

  **Acceptance Criteria**:
  - [ ] `.omo/evidence/task-1-test-baseline.txt` exists; ends with `Test Files  X passed` line
  - [ ] `.omo/evidence/task-1-build-baseline.txt` exists; contains `Compiled successfully` AND lists 12 routes
  - [ ] `.omo/evidence/task-1-package-baseline.json` byte-equals `package.json` at task end
  - [ ] `.omo/evidence/task-1-testid-baseline.txt` exists (may be empty if no testids — record that fact)
  - [ ] `.omo/evidence/task-1-test-class-audit.txt` exists with line-by-line matches
  - [ ] `.omo/evidence/task-1-inline-style-baseline.txt` contains a single integer (current count)
  - [ ] `.omo/evidence/task-1-line-counts-baseline.txt` contains 5 named entries

  **QA Scenarios**:
  ```
  Scenario: Baseline test run succeeds
    Tool: Bash (powershell)
    Steps:
      1. cd to project root
      2. Run: npm test 2>&1
      3. Assert exit code 0
      4. Assert output contains "98 passed" OR a count >= 98
    Expected Result: Tests pass at >= 98 count
    Evidence: .omo/evidence/task-1-test-baseline.txt

  Scenario: Baseline build compiles 12 routes
    Tool: Bash (powershell)
    Steps:
      1. Run: npm run build 2>&1
      2. Assert exit code 0
      3. Count route lines: output | grep -c '/(beranda|catat|piutang|pengaturan|login|register)'
      4. Assert count >= 6 distinct user-facing routes
    Expected Result: Build succeeds; 12/12 pages reported
    Evidence: .omo/evidence/task-1-build-baseline.txt
  ```

  **Commit**: NO (no source changes)

- [ ] 2. Token reconciliation — tailwind.config.ts mirrors globals.css via alpha-value

  **What to do**:
  - Edit `src/app/globals.css`:
    - Convert color CSS vars from hex to space-separated RGB form for Tailwind opacity-modifier compatibility. Pattern: `--bg: 251 248 241;` (NOT `#FBF8F1`).
    - For tokens NOT used with opacity, keep hex form to avoid migration risk (`--shadow-*`, `--radius-*`, `--ease-*`).
    - Add new wrapper vars where needed: `--bg-rgb: 251 248 241; --bg: rgb(var(--bg-rgb));` so existing `var(--bg)` consumers still resolve to a valid CSS color.
  - Edit `src/components/app-shell.tsx`, `src/app/login/page.tsx`, `src/app/register/page.tsx`, and any other consumers that read CSS vars directly — verify still compute correct color (smoke test in T11).
  - Rewrite `tailwind.config.ts`:
    - Replace `theme.extend.colors` with the warm-cream palette: `bg`, `card` (white), `subtle`, `muted`, `border`, `border-strong`, `text` (with `primary`/`secondary`/`tertiary`/`muted` keys), `accent` (with `DEFAULT`/`hover`/`deep`/`light`/`mid`/`soft`), `profit` (DEFAULT/bg/border/text), `loss`, `warn`, `info`. Each value uses `'rgb(var(--{token}-rgb) / <alpha-value>)'` pattern.
    - Replace `boxShadow` with cream-palette shadows: `xs/sm/md/lg/xl/2xl/inset/accent/accent-sm/accent-lg/warm` matching globals.css.
    - Replace `borderRadius` to match: `xs/sm/md/lg/xl/2xl/full`.
    - Add `fontFamily.sans` referencing `var(--font-plus-jakarta)` (already there — verify).
  - Run `npm run build` once to regenerate `.next/`. If build fails on stale types, delete `.next/` and retry.

  **Must NOT do**: Change any color VALUE (only its representation). Add `dark:` variants. Add `transition-*` defaults to theme. Remove existing CSS vars (only convert their format). Touch `--shadow-*` (they don't need alpha-value).

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Token system architecture decision; opacity-modifier-compat is subtle; affects every downstream task
  - **Skills**: none (no library research needed — standard Tailwind v3 pattern)
  - **Skills Evaluated but Omitted**: `claude-api` (irrelevant)

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T3, T4 — they touch different concerns)
  - **Parallel Group**: Wave 1A (with T3, T4)
  - **Blocks**: T5-T10, T11-T19
  - **Blocked By**: T1

  **References**:
  - `tailwind.config.ts:1-35` — current cool-gray theme to REPLACE
  - `src/app/globals.css:6-102` — current CSS var definitions to convert to RGB form
  - `.omo/notepads/ui-upgrade-umkm-tahu/learnings.md:147` — Tailwind config caveat documented in Task 5
  - Tailwind v3 alpha-value docs: `https://tailwindcss.com/docs/customizing-colors#using-css-variables` (pattern: `'rgb(var(--token) / <alpha-value>)'`)

  **Acceptance Criteria**:
  - [ ] `npm run typecheck` exits 0
  - [ ] `npm run build` exits 0; 12/12 pages compile
  - [ ] `npm test` exits 0 with same count as T1 baseline
  - [ ] `Select-String tailwind.config.ts -Pattern '#[0-9A-Fa-f]{6}'` returns 0 hex values (all colors via CSS vars)
  - [ ] `Select-String src/app/globals.css -Pattern '#FBF8F1|#1C1917|#7C3AED'` finds these hex values ONLY in old comments or shadow definitions, NOT in `--bg`/`--text-primary`/`--accent` declarations
  - [ ] Test page (manually visit /beranda) renders with same colors as baseline (visual verification in T11)
  - [ ] `bg-card/80` works in a test JSX block (alpha modifier resolves)

  **QA Scenarios**:
  ```
  Scenario: Alpha modifier compiles correctly
    Tool: Bash (powershell)
    Steps:
      1. Add temp test file: src/app/_token-test/page.tsx with <div className="bg-card/80 text-text-primary border-border" />
      2. Run npm run build
      3. Assert .next/static/css/* contains expected rgba(...) for bg-card/80
      4. Delete temp file
    Expected Result: Tailwind compiles bg-card/80 to a valid rgba expression
    Evidence: .omo/evidence/task-2-alpha-compile.txt

  Scenario: Existing pages still render
    Tool: Playwright
    Steps:
      1. npm run dev (background)
      2. Navigate to http://localhost:3000/beranda
      3. Take full-page screenshot
      4. Compare against pre-Wave-0 baseline (visual diff via pixel similarity, allow 2% drift for token format change)
    Expected Result: Screenshot matches baseline; same warm-cream color scheme renders
    Evidence: .omo/evidence/task-2-beranda-rgb-form.png
  ```

  **Commit**: NO (Wave 1 commits as one batch)

- [ ] 3. globals.css decoration purge

  **What to do**:
  - Edit `src/app/globals.css`. Remove these blocks (verify each by line search before delete):
    - Body `background-image` property with `radial-gradient` mesh (lines ~122-125)
    - `.gradient-mesh-warm` class
    - `.grain-overlay` class (uses SVG fractal noise data URI)
    - `.float` keyframe + class
    - `.float-slow` keyframe + class
    - `.dot-pattern` class (background-image with dots)
    - `.gradient-mesh` class (any variant)
    - `.pulse-ring` keyframe + class (used on AppShell FAB — T12 will rebuild without it)
  - KEEP: `.slide-up`, `.slide-up-1` through `.slide-up-5`, `.fade-in`, `.scale-in`, `.tap-highlight-none`, `.no-select`, `.divider-soft`, `.glow-loss`, all `:focus-visible` rules, all card/button/input/badge classes.
  - Remove `prefers-reduced-motion` overrides for the deleted classes only — keep the global media query for remaining animations.
  - File should shrink by approximately 50-80 lines.

  **Must NOT do**: Delete any class that is currently consumed by a `.tsx` file (run `grep -r 'class-name' src/` for each before deletion). Modify token vars (T2 territory). Touch `.slide-up*` (entrance animation kept).

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Pure deletion with grep-verification, no design judgment
  - **Skills**: none
  - **Skills Evaluated but Omitted**: `frontend-designer` (no design choices)

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T2, T4)
  - **Parallel Group**: Wave 1A
  - **Blocks**: T5-T10, T18, T19
  - **Blocked By**: T1

  **References**:
  - `src/app/globals.css:122-125` — body background-image radial mesh to delete
  - `src/app/globals.css` (search for each class name) — locate decoration class blocks
  - `src/app/login/page.tsx:189` — uses `dot-pattern gradient-mesh` (will be cleaned in T18)
  - `.omo/notepads/ui-upgrade-umkm-tahu/learnings.md:14-15` — these decorations were added in Task 2 with stagger durations

  **Acceptance Criteria**:
  - [ ] `Select-String src/app/globals.css -Pattern 'gradient-mesh-warm|grain-overlay|float-slow|dot-pattern|pulse-ring'` returns 0 matches
  - [ ] `Select-String src/app/globals.css -Pattern '\.slide-up'` returns matches (preserved)
  - [ ] `npm run build` exits 0
  - [ ] `npm test` passes at baseline count
  - [ ] globals.css line count decreased by 30-80 lines (record actual delta in `.omo/evidence/task-3-line-delta.txt`)

  **QA Scenarios**:
  ```
  Scenario: Body has no background-image after purge
    Tool: Playwright
    Steps:
      1. npm run dev (background)
      2. Navigate to http://localhost:3000/beranda
      3. page.evaluate(() => getComputedStyle(document.body).backgroundImage)
      4. Assert result === 'none'
    Expected Result: Body has no decorative background image
    Evidence: .omo/evidence/task-3-body-bg-image.txt

  Scenario: No floating animations on login page
    Tool: Playwright
    Steps:
      1. Navigate to /login (will still have floats until T18 cleans them up at JSX level)
      2. page.evaluate(() => Array.from(document.querySelectorAll('.float,.float-slow,.dot-pattern')).length)
      3. Assert: classes exist in JSX (T18 not done) but CSS rules don't apply (animation: none)
    Expected Result: Decorative classes resolve to no-op CSS
    Evidence: .omo/evidence/task-3-login-floats-noop.txt
  ```

  **Commit**: NO (Wave 1 batch)

- [ ] 4. Existing primitive audit + report

  **What to do**:
  - Read each existing primitive: `src/components/page-header.tsx`, `form-section.tsx`, `info-banner.tsx`, `metric-card.tsx`, `empty-state.tsx`, `status-badge.tsx`.
  - For each, document in `.omo/evidence/task-4-primitive-audit.md`:
    - Public API: prop names, types, defaults
    - Whether it accepts `className` and what for
    - Inline `style` usage count
    - CSS var references count
    - Hardcoded hex usage count
    - Tests covering it (file + count)
    - Suggested refinements (e.g., "drop accent prop default if always overridden", "extract variant constants")
  - Read each existing test: `src/components/{primitive}.test.tsx`. Document which tests assert on:
    - Specific Tailwind classes (will break on token rename) — list each
    - Specific text content (will break on microcopy change) — list each
    - DOM structure (most stable) — note count
  - Identify which existing primitives need refinement to match new APIs from T5-T10 (e.g., StatusBadge already has size prop — keep API; MetricCard may need to absorb new StatTile patterns).
  - Output report at `.omo/evidence/task-4-primitive-audit.md` (markdown table).

  **Must NOT do**: Modify any primitive in this task (refinement happens during T11-T19 redesigns). Modify any test. Make architecture decisions about whether to merge MetricCard with StatTile (that's T7's call).

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Read + summarize, no design or implementation
  - **Skills**: none

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T2, T3)
  - **Parallel Group**: Wave 1A
  - **Blocks**: T11-T19
  - **Blocked By**: T1

  **References**:
  - `src/components/page-header.tsx:1-49` (whole file)
  - `src/components/form-section.tsx:1-60`
  - `src/components/info-banner.tsx:1-60`
  - `src/components/metric-card.tsx:1-60`
  - `src/components/empty-state.tsx:1-50`
  - `src/components/status-badge.tsx:1-70`
  - All `.test.tsx` siblings
  - `.omo/notepads/ui-upgrade-umkm-tahu/learnings.md:42-72` (Task 3 polish history)

  **Acceptance Criteria**:
  - [ ] `.omo/evidence/task-4-primitive-audit.md` exists with one section per primitive (6 sections)
  - [ ] Each section lists: API, className policy, inline-style count, hex count, test file, test assertion types
  - [ ] Section "Refinement Suggestions" identifies at least 3 improvements
  - [ ] Section "Test Risk" lists each test that asserts a specific Tailwind class

  **QA Scenarios**:
  ```
  Scenario: Audit report is complete
    Tool: Bash (powershell)
    Steps:
      1. Read .omo/evidence/task-4-primitive-audit.md
      2. Assert it contains headers for: PageHeader, FormSection, InfoBanner, MetricCard, EmptyState, StatusBadge
      3. Assert "Refinement Suggestions" section has >= 3 bullets
      4. Assert "Test Risk" section is present
    Expected Result: All 6 primitives audited
    Evidence: .omo/evidence/task-4-primitive-audit.md (the artifact itself)
  ```

  **Commit**: NO (no source changes)

- [ ] 5. Button primitive

  **What to do**:
  - Create `src/components/ui/button.tsx`. Server-component by default (no `'use client'`).
  - API: `<Button variant="primary|secondary|ghost|danger" size="sm|md|lg" disabled icon={Icon} iconPosition="left|right" type="submit|button|reset" className="...layout only" {...rest}>{children}</Button>`. `className` accepted ONLY for layout (`w-full`, `mt-4`) — NEVER color/typography.
  - Variants map to existing `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-danger` classes from globals.css for visual continuity. Icon size auto-scales with size: sm=14px, md=16px, lg=18px. Stroke-width 2.25 for primary/danger, 2 for secondary/ghost.
  - Disabled state: `aria-disabled`, `tabIndex={-1}`, `pointer-events: none` via class (uses existing `.btn-primary[disabled]` styling).
  - Loading state: optional `loading` prop renders inline spinner (use lucide `Loader2` + `animate-spin` — already in deps); replaces icon when active; disables button.
  - File ≤ 80 lines. Export both default + named. Add TypeScript discriminated union for variant + size combos.
  - Add `src/components/ui/button.test.tsx`: 4 tests minimum: renders text; applies variant class; honors disabled; clicks dispatch handler. Use behavior assertions (no class-name matching beyond the structural variant class).

  **Must NOT do**: Accept arbitrary `style` prop. Use `useState` (server-component-friendly only). Wrap in motion library. Add tooltip prop. Override `:focus-visible` ring.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Component primitive design + Tailwind variant API — squarely visual-engineering territory
  - **Skills**: `tdd`
    - Reason: 4-test sweep is small enough for tests-after with TDD-style assertion design

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T6-T10)
  - **Parallel Group**: Wave 1B
  - **Blocks**: T11-T19
  - **Blocked By**: T2, T3

  **References**:
  - `src/app/globals.css` (search `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-danger`) — existing button class definitions to wrap
  - `src/app/login/page.tsx:160-162` — current `<button className="btn-primary">` usage pattern to satisfy
  - `src/app/catat/penjualan/page.tsx` (search `btn-primary`) — submit button pattern
  - `lucide-react` — `Loader2` icon for loading spinner
  - `.omo/evidence/task-4-primitive-audit.md` — existing primitive APIs for consistency reference

  **Acceptance Criteria**:
  - [ ] File `src/components/ui/button.tsx` exists, ≤ 80 lines
  - [ ] File `src/components/ui/button.test.tsx` exists with ≥ 4 tests, all pass
  - [ ] `npm run typecheck` exits 0
  - [ ] `npm test` count increases by ≥ 4 vs T1 baseline
  - [ ] `npm run build` exits 0
  - [ ] Type test: `<Button variant="invalid" />` produces TypeScript error (compile-time guard)

  **QA Scenarios**:
  ```
  Scenario: Primary button renders with correct class and clickable
    Tool: Playwright
    Steps:
      1. Add temp consumer at src/app/_button-test/page.tsx with 4 button variants
      2. npm run dev
      3. Navigate to /_button-test
      4. page.locator('button[data-variant="primary"]') exists
      5. page.locator('button[data-variant="primary"]').click()
      6. Verify cursor: pointer on hover via getComputedStyle
      7. Delete temp page
    Expected Result: Button renders, hover cursor correct, click dispatches
    Evidence: .omo/evidence/task-5-button-render.png

  Scenario: Disabled button blocks clicks
    Tool: Playwright
    Steps:
      1. Visit temp test page
      2. Click disabled button
      3. Assert no navigation, no error, opacity-reduced visual
    Expected Result: Disabled button is non-interactive
    Evidence: .omo/evidence/task-5-button-disabled.png
  ```

  **Commit**: NO (Wave 1 batch)

- [ ] 6. Card primitive

  **What to do**:
  - Create `src/components/ui/card.tsx`. Server-component.
  - API: `<Card variant="default|subtle|hero|receipt" tone="neutral|accent|profit|loss|warn" padding="sm|md|lg" interactive={boolean} className="...layout only">{children}</Card>`. `className` ONLY for layout (`col-span-2`, `mt-4`).
  - Variant maps to existing globals.css classes: `default`→`.card`, `subtle`→`.card-subtle`, `hero`→`.hero-card`, `receipt`→`.receipt-card`. Each is a thin wrapper that applies the right base class + tone-based left-border for `receipt`.
  - Tone (only meaningful on `receipt` variant) sets `borderLeftColor`: `accent`→purple, `profit`→green, `loss`→red, `warn`→amber, `neutral`→border-strong.
  - Padding override: sm=`p-3`, md=`p-4 md:p-5`, lg=`p-5 md:p-6 lg:p-7` (uses `card-roomy` for lg). Default md.
  - `interactive` prop adds `transition-shadow hover:shadow-md cursor-pointer` (only when used as wrapper for a link/button child).
  - Compose `<CardHeader>`, `<CardTitle>`, `<CardSubtitle>`, `<CardBody>`, `<CardFooter>` sub-components for structural slots (each just a `<div>` with consistent spacing).
  - File ≤ 110 lines. Add `src/components/ui/card.test.tsx` with 4 tests.

  **Must NOT do**: Accept `style` prop for color. Add gradient backgrounds (only `hero` variant has the existing built-in radial highlight in globals.css). Implement collapsible/expandable behavior (out of scope).

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Layout primitive design with variant API
  - **Skills**: `tdd`
    - Reason: 4 behavior tests at primitive level

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T5, T7-T10)
  - **Parallel Group**: Wave 1B
  - **Blocks**: T11-T19
  - **Blocked By**: T2, T3

  **References**:
  - `src/app/globals.css` (search `.card`, `.card-subtle`, `.hero-card`, `.receipt-card`, `.card-roomy`) — base classes to wrap
  - `src/app/beranda/page.tsx:99-218` — current hero-card usage
  - `src/components/form-section.tsx:1-60` — existing card composition pattern (FormSection uses receipt-card)
  - `src/app/piutang/page.tsx` — receipt-style unpaid card usage to satisfy
  - `.omo/evidence/task-4-primitive-audit.md` — existing primitive consistency reference

  **Acceptance Criteria**:
  - [ ] File `src/components/ui/card.tsx` exists, ≤ 110 lines, exports Card + 5 sub-components
  - [ ] File `src/components/ui/card.test.tsx` exists with ≥ 4 tests, all pass
  - [ ] Each variant (`default`, `subtle`, `hero`, `receipt`) produces a distinct DOM class signature
  - [ ] `<Card variant="receipt" tone="profit">` applies green left border via class (verified in test)
  - [ ] `npm run typecheck` exits 0
  - [ ] `npm test` count increases by ≥ 4

  **QA Scenarios**:
  ```
  Scenario: All 4 variants render distinct visual styles
    Tool: Playwright
    Steps:
      1. Add temp page with 4 cards (default, subtle, hero, receipt+profit)
      2. npm run dev
      3. Take 4 element screenshots
      4. Assert each has a unique class signature on the root <div>
      5. Delete temp page
    Expected Result: 4 visually distinct cards
    Evidence: .omo/evidence/task-6-card-variants.png

  Scenario: Receipt card border color responds to tone prop
    Tool: Playwright
    Steps:
      1. Render receipt cards with tone={accent, profit, loss, warn} via temp page
      2. page.evaluate to read getComputedStyle(card).borderLeftColor for each
      3. Assert 4 distinct rgb() values
    Expected Result: Tone prop drives border color correctly
    Evidence: .omo/evidence/task-6-receipt-tones.txt
  ```

  **Commit**: NO (Wave 1 batch)

- [ ] 7. StatTile primitive

  **What to do**:
  - Create `src/components/ui/stat-tile.tsx`. Server-component.
  - API: `<StatTile label="Uang Masuk" value={1014000} tone="profit|loss|warn|neutral" sublabel="Hari ini" href="/piutang" trend="up|down|flat" trendValue="+12%" size="sm|md" className="...layout only">`. Coexists with existing MetricCard (StatTile is a leaner subset for the today-stats row; MetricCard remains for richer cases like the dashboard hero alternatives).
  - Renders: label (uppercase tracking-wider text-xs muted) + value (auto money-md/money-sm via formatRupiah for numbers, or string passthrough) + sublabel + optional trend chip + optional ChevronRight when href provided.
  - Tone drives left-border accent color (3px) + sublabel text color. Neutral default.
  - When `href`: wraps content in `<Link>` with `tap-highlight-none transition-shadow hover:shadow-md`.
  - Auto-applies `formatRupiah(value)` if `typeof value === 'number'`. If string, renders verbatim.
  - File ≤ 100 lines. Test file with ≥ 4 tests.

  **Must NOT do**: Duplicate MetricCard exactly — StatTile is leaner. Add chart/sparkline (out of scope, no chart lib). Format dates or other non-money values.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Reusable presentational primitive with tone-driven theming
  - **Skills**: `tdd`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T5, T6, T8-T10)
  - **Parallel Group**: Wave 1B
  - **Blocks**: T11, T12, T16
  - **Blocked By**: T2, T3

  **References**:
  - `src/components/metric-card.tsx:1-60` — sibling primitive (read for API consistency, do NOT modify here)
  - `src/lib/format.ts` (search `formatRupiah`) — money formatter to call
  - `src/app/beranda/page.tsx:269-291` — current today-stats row using MetricCard (StatTile will offer leaner alternative)
  - `src/app/piutang/page.tsx:421` — receipt-style stats row pattern

  **Acceptance Criteria**:
  - [ ] File `src/components/ui/stat-tile.tsx` exists, ≤ 100 lines
  - [ ] Test file with ≥ 4 tests, all pass
  - [ ] `<StatTile value={0} />` renders "Rp 0" (verifies formatRupiah(0) handling — Metis-flagged edge case)
  - [ ] `<StatTile value={999999999} />` does not visually overflow on 360px viewport (verified in test)
  - [ ] `<StatTile href="/x">` wraps in `<a href="/x">` (verified in test)
  - [ ] `npm run typecheck && npm test && npm run build` all pass

  **QA Scenarios**:
  ```
  Scenario: Tone-driven left border on tile
    Tool: Playwright
    Steps:
      1. Add temp page with 4 StatTiles (profit/loss/warn/neutral)
      2. Navigate, screenshot the row
      3. page.evaluate borderLeftColor for each
      4. Assert 4 distinct values matching tokens (profit-green, loss-red, warn-amber, border-neutral)
    Expected Result: Each tone applies the correct accent border
    Evidence: .omo/evidence/task-7-stat-tile-tones.png

  Scenario: Large rupiah value does not overflow at 360px
    Tool: Playwright
    Steps:
      1. Set viewport 360x800
      2. Render <StatTile value={999999999} label="Test" />
      3. Read scrollWidth vs clientWidth on row container
      4. Assert no horizontal overflow
    Expected Result: 10-digit money fits in mobile tile
    Evidence: .omo/evidence/task-7-stat-tile-overflow.png
  ```

  **Commit**: NO (Wave 1 batch)

- [ ] 8. Pill primitive

  **What to do**:
  - Create `src/components/ui/pill.tsx`. Server-component.
  - API: `<Pill tone="accent|profit|loss|warn|info|neutral" size="xs|sm|md" icon={Icon} dot={boolean} className="...layout only">{children}</Pill>`.
  - Renders an inline-flex pill (rounded-full) with: optional colored dot indicator, optional icon, text children. Tone drives bg + border + text colors via Tailwind utilities (`bg-profit-bg`, `border-profit-border`, `text-profit-text`).
  - Sizes: xs=`text-[11px] px-2 py-0.5`, sm=`text-xs px-2.5 py-1`, md=`text-sm px-3 py-1.5`. Default sm.
  - `dot` prop: shows a 6px colored dot (matches tone) before children. Improves scan-ability for status pills (per StatusBadge precedent in learnings.md Task 3).
  - File ≤ 70 lines. Test file ≥ 3 tests.

  **Must NOT do**: Duplicate StatusBadge — Pill is generic; StatusBadge is domain-specific (LUNAS/BELUM_LUNAS/PROFIT/LOSS/etc). StatusBadge can internally compose Pill in a refinement task, but don't refactor it here.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Tonal token wrapper with size variants
  - **Skills**: `tdd`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T5-T7, T9-T10)
  - **Parallel Group**: Wave 1B
  - **Blocks**: T11-T19
  - **Blocked By**: T2, T3

  **References**:
  - `src/components/status-badge.tsx:1-70` — sibling pattern (do not modify here)
  - `src/app/globals.css` (search `.badge-profit`, `.badge-loss`, `.badge-warn`, `.badge-neutral`) — existing badge classes for tone palette reference
  - `src/app/beranda/page.tsx:122-138` — current Margin pill pattern (will be replaced with `<Pill>` in T11)

  **Acceptance Criteria**:
  - [ ] File `src/components/ui/pill.tsx` exists, ≤ 70 lines
  - [ ] Test file ≥ 3 tests, all pass
  - [ ] All 6 tones produce distinct DOM (class or computed-style verified)
  - [ ] `npm run typecheck && npm test && npm run build` all pass

  **QA Scenarios**:
  ```
  Scenario: Pill with dot indicator shows colored dot
    Tool: Playwright
    Steps:
      1. Render <Pill tone="profit" dot>Lunas</Pill>
      2. page.locator('span[role="presentation"]').first() returns truthy (the dot span)
      3. Read getComputedStyle backgroundColor on dot
      4. Assert matches profit token (rgb 4,120,87 or its rgba form)
    Expected Result: Dot rendered with profit color
    Evidence: .omo/evidence/task-8-pill-dot.png

  Scenario: Pill icon renders inside flex
    Tool: Playwright
    Steps:
      1. Render <Pill tone="warn" icon={TriangleAlert}>Warning</Pill>
      2. Assert <svg> precedes text in DOM order
      3. Assert flex gap visible
    Expected Result: Icon + text aligned in pill
    Evidence: .omo/evidence/task-8-pill-icon.png
  ```

  **Commit**: NO (Wave 1 batch)

- [ ] 9. MoneyValue primitive

  **What to do**:
  - Create `src/components/ui/money-value.tsx`. Server-component.
  - API: `<MoneyValue amount={number} size="hero|lg|md|sm|xs" tone="auto|profit|loss|neutral" showSign={boolean} prefix="Rp" className="...layout only">`. `auto` tone: profit for positive, loss for negative, neutral for zero.
  - Renders `formatRupiah(Math.abs(amount))` with size mapping to existing globals.css money classes (`money-hero` through `money-xs`).
  - When `amount < 0` and `showSign` is true: render `−` prefix glyph (U+2212) before "Rp" with reduced opacity for a "minus 35.000" reading pattern (matches Beranda hero loss treatment from learnings.md Task 6).
  - When `amount === 0`: render "Rp 0" with neutral tone (validates Metis-flagged edge case).
  - Tabular-nums + tnum applied via existing money-* classes.
  - File ≤ 70 lines. Test file ≥ 4 tests covering positive, zero, negative-with-sign, negative-without-sign.

  **Must NOT do**: Format anything other than IDR (no USD/EUR support). Add currency switcher. Modify `formatRupiah()` itself (lib/format.ts is OUT OF SCOPE).

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Money rendering primitive with auto-tone logic
  - **Skills**: `tdd`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T5-T8, T10)
  - **Parallel Group**: Wave 1B
  - **Blocks**: T11-T19
  - **Blocked By**: T2, T3

  **References**:
  - `src/lib/format.ts` — `formatRupiah()` function to call (DO NOT modify)
  - `src/app/globals.css` (search `.money-hero`, `.money-lg`, `.money-md`, `.money-sm`, `.money-xs`) — typography classes
  - `src/app/beranda/page.tsx:147-159` — current loss-money pattern with separate `−` glyph (will be replaced with `<MoneyValue showSign>`)

  **Acceptance Criteria**:
  - [ ] File `src/components/ui/money-value.tsx` exists, ≤ 70 lines
  - [ ] Test file ≥ 4 tests, all pass
  - [ ] `<MoneyValue amount={0} />` renders text "Rp 0"
  - [ ] `<MoneyValue amount={-35000} showSign tone="auto" />` renders "− Rp 35.000" with loss color
  - [ ] `<MoneyValue amount={1014000} tone="auto" />` renders "Rp 1.014.000" with profit color
  - [ ] `npm run typecheck && npm test && npm run build` all pass

  **QA Scenarios**:
  ```
  Scenario: Negative auto-tones to loss color
    Tool: Playwright
    Steps:
      1. Render <MoneyValue amount={-35000} tone="auto" showSign />
      2. Read getComputedStyle color
      3. Assert matches loss token (rgb 220,38,38 or its rgba form)
    Expected Result: Loss color applied automatically
    Evidence: .omo/evidence/task-9-money-loss-auto.png

  Scenario: Zero renders neutral and reads "Rp 0"
    Tool: Playwright
    Steps:
      1. Render <MoneyValue amount={0} />
      2. Assert textContent === "Rp 0"
      3. Assert color is text-primary token, NOT loss/profit
    Expected Result: Zero is neutral, never rendered as red
    Evidence: .omo/evidence/task-9-money-zero.png
  ```

  **Commit**: NO (Wave 1 batch)

- [ ] 10. Section primitive

  **What to do**:
  - Create `src/components/ui/section.tsx`. Server-component.
  - API: `<Section title="..." description="..." action={ReactNode} eyebrow="..." className="...layout only">{children}</Section>`. Generic content section, not the form-specific FormSection.
  - Renders: optional eyebrow (uppercase muted text), title (`section-heading` class), optional description (`page-subtitle`), optional action slot in header row, then children below.
  - Handles spacing via existing `.section-stack` from globals.css.
  - File ≤ 60 lines. Test file ≥ 3 tests.

  **Must NOT do**: Replace FormSection (which is form-specific with accent prop). Add collapsing/sticky behavior.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `tdd`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T5-T9)
  - **Parallel Group**: Wave 1B
  - **Blocks**: T11-T19
  - **Blocked By**: T2, T3

  **References**:
  - `src/components/form-section.tsx` — sibling pattern, form-scoped
  - `src/app/globals.css` (search `.section-heading`, `.section-stack`) — typography utilities
  - `src/app/beranda/page.tsx:330-336` — current "Ringkasan Bulan Ini" header row pattern (will use Section)

  **Acceptance Criteria**:
  - [ ] File exists ≤ 60 lines
  - [ ] Test file ≥ 3 tests pass
  - [ ] `npm run typecheck && npm test && npm run build` all pass

  **QA Scenarios**:
  ```
  Scenario: Section renders title + action in header row
    Tool: Playwright
    Steps:
      1. Render <Section title="Test" action={<button>Edit</button>}>body</Section>
      2. Assert title and button visible in same horizontal row
      3. Assert "body" text below header
    Expected Result: Section header is two-column flex row
    Evidence: .omo/evidence/task-10-section.png
  ```

  **Commit**: NO (Wave 1 batch)

- [ ] 11. Beranda redesign + USER REVIEW GATE

  **What to do**:
  - Edit `src/app/beranda/page.tsx`. Target: drop from 501 lines to ≤ 220 lines.
  - **Layout (preserved)**: Greeting + Hero verdict + Today stats + (optional) Receivables alert + Month summary + Quick actions.
  - **Removed**: "Yang Perlu Dilakukan" next-action card (duplicates quick actions). Desktop secondary actions grid (use AppShell desktop nav). Mobile tail-CTA "Lihat semua tagihan" (alert card already deep-links).
  - **Hero verdict**: Use `<Card variant="hero" tone={isProfit?'profit':isLoss?'loss':'neutral'}>` + `<Pill tone={...} dot>` for status + `<MoneyValue amount={netProfit} size="hero" tone="auto" showSign>`. Keep status-tinted gradient ONLY here (one place earns it). Margin chip via `<Pill tone={verdictTone} size="xs">Margin {percent}%</Pill>`.
  - **Today stats row**: 3× `<StatTile label="Uang Masuk|Uang Keluar|Belum Dibayar" value={...} tone={profit|loss|warn|neutral} sublabel="..." href={...}>`. Replaces existing MetricCard usage (MetricCard stays in codebase for other use cases — not removed).
  - **Receivables alert** (when unpaidCount > 0): Single `<Card variant="receipt" tone="warn" interactive>` wrapping a `<Link href="/piutang">`. Drop the duplicate desktop+mobile copies.
  - **Month summary**: `<Section title="Ringkasan Bulan Ini" action={<span className="capitalize">{monthLabel}</span>}>` + 3 `<StatTile>` for Omzet/Keluar/Selisih (Selisih uses `tone="auto"` via MoneyValue).
  - **Quick actions**: `<Section title="Mau catat apa hari ini?">` + 2-col grid with two `<Card variant="default" tone="profit|warn" interactive>` wrappers. Drop verb-echo: button text is "Penjualan" / "Pengeluaran" with sublabel "Tahu terjual hari ini" / "Biaya keluar hari ini" — section heading already conveys "Catat".
  - **Empty/loss state specs**:
    - `!hasData`: hero shows "Belum ada catatan" with `<MoneyValue amount={0} tone="neutral">` and a tip line "Catat penjualan dan pengeluaran biar laba hari ini muncul"
    - `isLoss`: hero uses loss tone; MoneyValue auto-applies sign + red color
    - `summary.unpaidCount === 0`: receivables alert section omitted entirely (current behavior preserved)
  - **Inline-style budget for this file**: ≤ 2 inline `style` blocks total, only for genuinely dynamic verdict-gradient values (the 3-stop gradient that depends on profit/loss/break-even branch). All other styling via Tailwind utilities or primitive tones.

  **Must NOT do**:
  - Touch `getDashboardSummary`, `ensureBusinessProfile`, `createServerClient`, or `summary.*` field access patterns
  - Add `useState`/`useEffect` (server component only)
  - Change `redirect('/login')` flow
  - Modify `formatRupiah` calls or import path
  - Add new icons beyond what existing imports cover (replace removed ones with same library)
  - Add `data-testid` attrs (none exist on this page; don't introduce)
  - Touch any other route file in this task

  **USER REVIEW GATE (MANDATORY — DO NOT SKIP)**:
  At the end of this task, AFTER verification commands pass:
  1. Take Playwright screenshots of `/beranda` at 375px, 768px, 1024px, 1440px viewports — save to `.omo/evidence/task-11-beranda-{viewport}.png`
  2. Take Playwright screenshots of all 3 verdict states (profit/loss/break-even) at 375px — save as `task-11-verdict-{state}.png` (mock the 3 states by visiting the page in different sales/expense states or by temporarily forcing values via dev page; revert before finishing)
  3. Run axe-core via Playwright; save report to `.omo/evidence/task-11-axe.json`
  4. **STOP. Present screenshots + axe report. Wait for explicit user "okay" before unblocking T12-T19.**
  5. If user requests changes: iterate within this task. Do NOT proceed to next wave until user approves.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Reference page setting the visual direction for the entire app
  - **Skills**: `playwright` (for the gate screenshots)
    - Reason: Multi-viewport screenshot capture + axe-core injection

  **Parallelization**:
  - **Can Run In Parallel**: NO — sets the reference; gate-blocked
  - **Parallel Group**: Wave 2A (sequential)
  - **Blocks**: T12-T19 (only after user approval)
  - **Blocked By**: T2, T3, T5-T10

  **References**:
  - `src/app/beranda/page.tsx:1-501` — current implementation to refactor
  - `src/server/queries.ts` (search `getDashboardSummary`) — query contract to satisfy (DO NOT modify)
  - `src/components/ui/{button,card,stat-tile,pill,money-value,section}.tsx` — primitives to consume
  - `src/components/{metric-card,status-badge,empty-state,info-banner}.tsx` — existing primitives still available
  - `.omo/notepads/ui-upgrade-umkm-tahu/learnings.md:165-200` (Task 6 hero redesign) and `:267-318` (Task 7 stats/quick actions) — design intent baseline
  - `AGENTS.md:131-145` — microcopy table (Belum Dibayar, Hari ini usaha kamu..., Mau catat apa hari ini?)

  **Acceptance Criteria**:
  - [ ] `src/app/beranda/page.tsx` ≤ 220 lines (down from 501)
  - [ ] `Select-String src/app/beranda/page.tsx -Pattern 'style=\{\{'` ≤ 2 matches
  - [ ] `Select-String src/app/beranda/page.tsx -Pattern '#[0-9A-Fa-f]{6}'` returns 0 matches (no hardcoded hex)
  - [ ] No "Yang Perlu Dilakukan" string in file
  - [ ] No "Lihat semua tagihan" tail-CTA string in file
  - [ ] Imports include the 6 new primitives from `src/components/ui/`
  - [ ] `npm run typecheck && npm test && npm run build` all pass
  - [ ] 4 viewport screenshots + 3 verdict-state screenshots + axe report saved
  - [ ] User approval recorded in `.omo/evidence/task-11-user-approval.txt`

  **QA Scenarios**:
  ```
  Scenario: Beranda renders without errors at all 4 viewports
    Tool: Playwright
    Steps:
      1. npm run dev
      2. For viewport in [375x800, 768x1024, 1024x768, 1440x900]:
         a. Set viewport
         b. Navigate to http://localhost:3000/beranda
         c. Wait for "Hari ini usaha kamu..." text
         d. page.evaluate scrollWidth vs clientWidth on body — assert no horizontal overflow
         e. Capture full-page screenshot to .omo/evidence/task-11-beranda-{viewport}.png
         f. Capture console messages — assert zero errors
    Expected Result: Page renders cleanly at every breakpoint, no overflow, no console errors
    Evidence: 4 PNG files

  Scenario: Loss-state hero shows red verdict and signed money
    Tool: Playwright
    Steps:
      1. Manipulate state to force isLoss (e.g., one expense, zero sales — or seed via temp test page)
      2. Navigate to /beranda
      3. Locate hero card; read getComputedStyle color on money value
      4. Assert color matches loss token (rgb 220,38,38 family)
      5. Assert money text starts with "−" glyph
      6. Screenshot
      7. Reset state
    Expected Result: Loss hero is unmistakable
    Evidence: .omo/evidence/task-11-verdict-loss.png

  Scenario: WCAG AA contrast on every visible text
    Tool: Playwright + axe-core
    Steps:
      1. Navigate to /beranda
      2. page.addScriptTag({url: "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.0/axe.min.js"})
      3. page.evaluate axe.run({runOnly: ['color-contrast']})
      4. Save JSON report
      5. Assert violations.length === 0
    Expected Result: Zero contrast violations on Beranda
    Evidence: .omo/evidence/task-11-axe.json
  ```

  **Commit**: NO (project not git; checkpoint via evidence files)

- [ ] 12. AppShell simplification

  **What to do**:
  - Edit `src/components/app-shell.tsx`. Target: ≤ 200 lines (down from 260).
  - Replace inline `style` blocks with Tailwind utilities + new primitives where possible.
  - Drop `pulse-ring` class on FAB (already removed from globals.css in T3).
  - Reconcile competing brand-vs-title pattern: header shows brand mark + "Pembukuan Tahu" only on Beranda (no `title` prop); on every other page show only the back chevron + page title (no brand mark).
  - Use `<Button variant="ghost" size="sm" icon={LogOut}>Keluar</Button>` for logout (replaces inline btn-ghost).
  - Header: drop `boxShadow: 'var(--shadow-xs)'` inline → use Tailwind `shadow-xs` after T2 maps it.
  - Bottom nav FAB: remove pulse-ring; keep prominent accent gradient + 3px bg ring + lift; size unchanged (58×58).
  - Long business name truncation (Metis edge case): `<span className="font-extrabold text-[0.95rem] truncate min-w-0 flex-1">` already there — verify still truncates at 60+ chars in QA.
  - Mobile bottom nav clearance: keep `with-bottom-nav-pad` utility (8rem mobile / 3rem desktop) — already correct.
  - File ≤ 200 lines.

  **Must NOT do**:
  - Touch `logoutAction` import path or form action binding
  - Remove `aria-label`, `aria-current`, `aria-hidden` attributes
  - Change `width` prop API (`narrow|default|wide`) or `WIDTH_CLASS` mapping
  - Add new routes to nav (would require route additions, out of scope)
  - Add motion library or new keyframes

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `playwright`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T13-T19 after T11 approved)
  - **Parallel Group**: Wave 2B
  - **Blocks**: T20-T24
  - **Blocked By**: T11 (user-approved)

  **References**:
  - `src/components/app-shell.tsx:1-260` — current implementation
  - `src/components/ui/button.tsx` — new primitive to use for logout
  - `.omo/notepads/ui-upgrade-umkm-tahu/learnings.md:117-160` (Task 5 polish history) — design intent

  **Acceptance Criteria**:
  - [ ] File ≤ 200 lines
  - [ ] `Select-String src/components/app-shell.tsx -Pattern 'pulse-ring'` returns 0 matches
  - [ ] `Select-String src/components/app-shell.tsx -Pattern 'style=\{\{'` ≤ 3 (only dynamic FAB lift offset, accent gradient, and z-index acceptable)
  - [ ] `npm run typecheck && npm test && npm run build` pass

  **QA Scenarios**:
  ```
  Scenario: Long business name truncates with ellipsis
    Tool: Playwright
    Steps:
      1. Mock business name "Tahu Berkah Nusantara Cabang Pasar Pagi Kecamatan Selatan" (60 chars) via temp setup
      2. Navigate /beranda at 375px
      3. Read header text element offsetWidth vs scrollWidth
      4. Assert ellipsis applied (offsetWidth < scrollWidth)
    Expected Result: Header truncates, no overflow
    Evidence: .omo/evidence/task-12-long-name.png

  Scenario: Bottom nav FAB no longer pulses
    Tool: Playwright
    Steps:
      1. Navigate /beranda at 375px
      2. page.evaluate: getComputedStyle(FAB).animationName
      3. Assert result === 'none' (no pulse-ring keyframe applied)
    Expected Result: FAB is static, no pulse animation
    Evidence: .omo/evidence/task-12-fab-static.txt
  ```

  **Commit**: NO

- [ ] 13. Catat menu redesign

  **What to do**:
  - Edit `src/app/catat/page.tsx`. Target: ≤ 70 lines (down from 91).
  - Replace inline-style cards with `<Card variant="default" tone="profit|loss" interactive>` wrapping `<Link>`.
  - Use `<Pill tone="profit|loss" icon={TrendingUp|TrendingDown}>` for the icon container (replaces inline gradient bg block).
  - Tip footer: replace inline rounded div with `<InfoBanner variant="tip">`.
  - Microcopy: keep "Catat Apa?" heading + "Pilih jenis catatan yang ingin ditambahkan." subtitle. Card titles "Penjualan" / "Pengeluaran" — do NOT echo verb (subtitle implicitly conveys the action).
  - Wait — current cards say "Catat Penjualan" / "Catat Pengeluaran". The verb echo is OK here because the heading is "Catat Apa?" (not "Mau catat apa hari ini?"). Verify with microcopy from AGENTS.md before changing.

  **Must NOT do**: Add a third card for receivables/settings (those have their own routes). Change the two route hrefs.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `playwright`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T12, T14-T19)
  - **Parallel Group**: Wave 2B
  - **Blocks**: T20-T24
  - **Blocked By**: T11

  **References**:
  - `src/app/catat/page.tsx:1-91` — current implementation
  - `src/components/ui/card.tsx`, `pill.tsx` — primitives to use
  - `src/components/info-banner.tsx` — for tip footer
  - `.omo/notepads/ui-upgrade-umkm-tahu/learnings.md:81-114` (Task 8 catat polish)

  **Acceptance Criteria**:
  - [ ] File ≤ 70 lines
  - [ ] `Select-String src/app/catat/page.tsx -Pattern 'style=\{\{'` returns 0 matches (no inline styles needed)
  - [ ] `Select-String src/app/catat/page.tsx -Pattern '#[0-9A-Fa-f]{6}'` returns 0
  - [ ] Cards remain large tap targets (min-height ≥ 76px verified in QA)
  - [ ] `npm run typecheck && npm test && npm run build` pass

  **QA Scenarios**:
  ```
  Scenario: Both choice cards are large tap targets
    Tool: Playwright
    Steps:
      1. Set viewport 375x800
      2. Navigate /catat
      3. Locate the two Link cards
      4. For each, read boundingBox().height
      5. Assert both >= 76 (Material/HIG-level tap target)
    Expected Result: Both cards meet large-tap requirements
    Evidence: .omo/evidence/task-13-catat-cards.png

  Scenario: Tap navigates correctly
    Tool: Playwright
    Steps:
      1. Click sales card
      2. Assert URL changes to /catat/penjualan
      3. Go back, click expense card
      4. Assert URL changes to /catat/pengeluaran
    Expected Result: Both routes navigate correctly
    Evidence: .omo/evidence/task-13-catat-nav.txt
  ```

  **Commit**: NO

- [ ] 14. Catat Penjualan redesign + form errors

  **What to do**:
  - Edit `src/app/catat/penjualan/page.tsx` and `src/components/sales-form-preview.tsx`.
  - Page: Replace any remaining inline-style sections with `<FormSection>` (already done in Task 9 per learnings; verify and tighten). Use `<Button variant="primary" size="md" icon={Save}>Simpan Penjualan</Button>` for submit.
  - **Form error state (Metis edge case)**: Wrap the form to receive `state` from `useActionState`. When `state?.error`, render `<InfoBanner variant="error">{state.error}</InfoBanner>` above the form. Inputs with `aria-invalid="true"` styling triggered by `state?.fieldErrors?.fieldName` (if action returns field-level errors; otherwise just generic banner). Note: `createSalesAction` may not currently return field errors — DO NOT modify the action; just render generic banner from `state.error` if present.
  - Preview: keep `'use client'`. Drop hardcoded hex literals — convert to Tailwind utilities (`bg-profit-bg`, `text-profit-text`, `border-profit-border`) leveraging T2 reconciliation.
  - Page file ≤ 180 lines. Preview file ≤ 220 lines.

  **Must NOT do**:
  - Modify `createSalesAction` import or binding
  - Change form field `name` attributes (`date`, `customer_name`, `packs`, `price_per_pack`, `amount_paid`, `notes`)
  - Change `required`, `min`, `defaultValue` validation
  - Change `datalist` for customers
  - Modify `SalesFormPreview` calculation logic (`Number.isFinite` guards, `formatRp` early return)
  - Convert preview to server component (must stay `'use client'`)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `playwright`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T12, T13, T15-T19)
  - **Parallel Group**: Wave 2B
  - **Blocks**: T20-T24
  - **Blocked By**: T11

  **References**:
  - `src/app/catat/penjualan/page.tsx:1-180` — current page
  - `src/components/sales-form-preview.tsx:1-247` — current preview
  - `src/server/actions.ts` (DO NOT modify) — `createSalesAction` signature reference
  - `src/components/info-banner.tsx` — error banner primitive
  - `src/components/ui/button.tsx` — submit primitive
  - `.omo/notepads/ui-upgrade-umkm-tahu/learnings.md:204-263` (Task 11 preview redesign), `:319-341` (Task 9 form polish)

  **Acceptance Criteria**:
  - [ ] Page ≤ 180 lines, Preview ≤ 220 lines
  - [ ] `Select-String src/app/catat/penjualan/page.tsx -Pattern '#[0-9A-Fa-f]{6}'` returns 0
  - [ ] `Select-String src/components/sales-form-preview.tsx -Pattern '#[0-9A-Fa-f]{6}'` returns 0
  - [ ] Form action binding byte-identical to baseline (verified by diff vs T1 snapshot)
  - [ ] All 6 form field `name` attributes byte-identical to baseline
  - [ ] Submit button uses `<Button variant="primary">` primitive
  - [ ] InfoBanner renders when `state?.error` present (verified in QA)
  - [ ] `npm run typecheck && npm test && npm run build` pass

  **QA Scenarios**:
  ```
  Scenario: Submit valid sale completes
    Tool: Playwright
    Steps:
      1. Login as test user; visit /catat/penjualan
      2. Fill: customer_name="Test Buyer", packs=10, price_per_pack=6000, amount_paid=60000
      3. Click Simpan
      4. Assert redirect to /beranda OR /piutang per current behavior
      5. Verify no console error
    Expected Result: Form submits and navigates
    Evidence: .omo/evidence/task-14-submit-success.png

  Scenario: Empty submit shows error banner
    Tool: Playwright
    Steps:
      1. Visit /catat/penjualan, leave required fields empty
      2. Click Simpan
      3. Native HTML5 validation should block; assert input:invalid pseudo-class
      4. (If server returns error after JS-disabled submit) InfoBanner with role="status" rendered
    Expected Result: Validation prevents bad submit; error UI visible if server-rejected
    Evidence: .omo/evidence/task-14-validation.png

  Scenario: Live preview updates as user types
    Tool: Playwright
    Steps:
      1. Type packs=5, price_per_pack=6000
      2. Wait 500ms (input event debounce)
      3. Locate preview total; assert textContent contains "Rp 30.000"
    Expected Result: Preview reflects calculated total
    Evidence: .omo/evidence/task-14-preview-live.png
  ```

  **Commit**: NO

- [ ] 15. Catat Pengeluaran redesign + form errors

  **What to do**:
  - Mirror T14 for `src/app/catat/pengeluaran/page.tsx` and `src/components/expense-form-preview.tsx`.
  - Page already uses FormSection per Task 10 learnings — verify and tighten. Submit uses `<Button variant="danger" icon={TrendingDown}>Simpan Pengeluaran</Button>` (danger variant matches expense=loss palette).
  - Form error state: same `<InfoBanner variant="error">` pattern as T14.
  - Preview: drop remaining hardcoded hex via T2 reconciliation. Keep all calculation logic untouched.
  - Page file ≤ 200 lines. Preview file ≤ 220 lines.

  **Must NOT do**:
  - Modify `createExpenseAction` import or binding
  - Change form field `name` attributes (`date`, `category`, `item_name`, `quantity`, `unit`, `unit_price`, `confirmation_status`, `notes`)
  - Change CATEGORIES, STATUSES, UNITS array contents
  - Modify category-tone palette mapping in preview (keep as-is for visual continuity)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `playwright`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T12-T14, T16-T19)
  - **Parallel Group**: Wave 2B
  - **Blocks**: T20-T24
  - **Blocked By**: T11

  **References**:
  - `src/app/catat/pengeluaran/page.tsx:1-183` — current page
  - `src/components/expense-form-preview.tsx:1-240` — current preview
  - `src/server/actions.ts` — `createExpenseAction` (DO NOT modify)
  - `.omo/notepads/ui-upgrade-umkm-tahu/learnings.md:346-393` (Task 10 polish)

  **Acceptance Criteria**:
  - [ ] Page ≤ 200 lines, Preview ≤ 220 lines
  - [ ] No hardcoded hex in either file
  - [ ] All 8 form field `name` attributes byte-identical to baseline
  - [ ] Submit uses `<Button variant="danger">` primitive
  - [ ] `npm run typecheck && npm test && npm run build` pass

  **QA Scenarios**:
  ```
  Scenario: Submit valid expense completes
    Tool: Playwright
    Steps:
      1. Login; visit /catat/pengeluaran
      2. Fill: category="raw_material", item_name="Kedelai 50kg", quantity=50, unit="kg", unit_price=10900
      3. Click Simpan
      4. Assert redirect/success state per current behavior
    Expected Result: Form submits successfully
    Evidence: .omo/evidence/task-15-submit-success.png

  Scenario: Category select drives preview color
    Tool: Playwright
    Steps:
      1. Type item, set quantity + price
      2. Switch category through 5 options
      3. Read preview pill color for each
      4. Assert 5 distinct color tokens applied (per category-tone mapping)
    Expected Result: Preview pill recolors per category
    Evidence: .omo/evidence/task-15-category-colors.png
  ```

  **Commit**: NO

- [ ] 16. Piutang redesign

  **What to do**:
  - Edit `src/app/piutang/page.tsx`. Target: ≤ 180 lines (down from 215).
  - Replace inline-style hero with `<Card variant="hero" tone="warn">` + `<Pill tone="warn" dot>` for unpaid count.
  - Each unpaid receivable: `<Card variant="receipt" tone="warn">` with `<StatTile size="sm">` for the 3-column total/dibayar/sisa stats.
  - Payment form per row: `<Button variant="primary" size="sm" icon={Send}>Bayar</Button>`. Keep `<label htmlFor>` accessibility wins from Task 13.
  - Each paid receivable: `<Card variant="subtle">` (compact, muted).
  - Empty state: existing `<EmptyState>` component (CTA uses `<Button variant="primary">`).
  - Section heading: "Belum Dibayar" (NOT "Belum Lunas") and "Sudah Dibayar" (NOT "Sudah Lunas").

  **Must NOT do**:
  - Modify `createReceivablePaymentAction` binding
  - Change hidden inputs (`r.id`, `today`)
  - Change `min="1"`, `max={r.remaining}` validation
  - Modify `getReceivables()` query call
  - Add inline SQL or query logic

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `playwright`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T12-T15, T17-T19)
  - **Parallel Group**: Wave 2B
  - **Blocks**: T20-T24
  - **Blocked By**: T11

  **References**:
  - `src/app/piutang/page.tsx:1-215` — current
  - `src/server/queries.ts` — `getReceivables` (DO NOT modify)
  - `src/components/empty-state.tsx`, `status-badge.tsx` — existing primitives
  - `.omo/notepads/ui-upgrade-umkm-tahu/learnings.md:397-458` (Task 13 polish)

  **Acceptance Criteria**:
  - [ ] File ≤ 180 lines
  - [ ] No hardcoded hex
  - [ ] No "Belum Lunas" string
  - [ ] No "Sudah Lunas" string
  - [ ] Hidden inputs (r.id, today) byte-identical to baseline
  - [ ] `npm run typecheck && npm test && npm run build` pass

  **QA Scenarios**:
  ```
  Scenario: Empty receivables state shows EmptyState
    Tool: Playwright
    Steps:
      1. Login as user with no receivables; visit /piutang
      2. Assert "Belum ada tagihan" text visible
      3. Assert primary CTA Button rendered
    Expected Result: EmptyState rendered with CTA
    Evidence: .omo/evidence/task-16-empty.png

  Scenario: Partial payment flow
    Tool: Playwright
    Steps:
      1. Visit /piutang with seeded unpaid receivable
      2. Enter partial amount (less than remaining)
      3. Click Bayar
      4. Assert page reloads, receivable still in unpaid section, sisa decreased
    Expected Result: Partial payment recorded; receivable remains unpaid
    Evidence: .omo/evidence/task-16-partial-pay.png
  ```

  **Commit**: NO

- [ ] 17. Pengaturan redesign

  **What to do**:
  - Edit `src/app/pengaturan/page.tsx`. Target: ≤ 220 lines (down from 256).
  - Already uses FormSection + InfoBanner per Task 14 learnings — tighten + drop remaining hardcoded hex.
  - Submit: `<Button variant="primary" size="md" icon={Save}>Simpan Perubahan</Button>` (microcopy: "Simpan Perubahan" per AGENTS.md, NOT "Simpan Pengaturan").
  - Production math card: keep but use `<Card variant="subtle" tone="warn">` instead of inline gradient.
  - Header: "Profil Usaha Kamu" (NOT "Pengaturan Usaha") per AGENTS.md microcopy.

  **Must NOT do**:
  - Modify `updateBusinessProfileAction` binding
  - Change form field `name` attributes (8 fields)
  - Change validation (`required`, `min`, `max`, `defaultValue`)
  - Modify auth redirect

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `playwright`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T12-T16, T18-T19)
  - **Parallel Group**: Wave 2B
  - **Blocks**: T20-T24
  - **Blocked By**: T11

  **References**:
  - `src/app/pengaturan/page.tsx:1-256` — current
  - `src/server/actions.ts` — `updateBusinessProfileAction` (DO NOT modify)
  - `.omo/notepads/ui-upgrade-umkm-tahu/learnings.md:461-523` (Task 14 polish)

  **Acceptance Criteria**:
  - [ ] File ≤ 220 lines
  - [ ] No hardcoded hex
  - [ ] All 8 form field `name` attributes byte-identical to baseline
  - [ ] Submit text === "Simpan Perubahan"
  - [ ] Page heading === "Profil Usaha Kamu"
  - [ ] `npm run typecheck && npm test && npm run build` pass

  **QA Scenarios**:
  ```
  Scenario: Update business name persists
    Tool: Playwright
    Steps:
      1. Visit /pengaturan
      2. Edit business_name field, set "Tahu QA Test"
      3. Click Simpan Perubahan
      4. Reload page; assert input value === "Tahu QA Test"
    Expected Result: Update persists across reload
    Evidence: .omo/evidence/task-17-update-persist.png

  Scenario: Production math summary recomputes correctly
    Tool: Playwright
    Steps:
      1. Set boards_per_day=10, tofu_per_board=169, tofu_per_pack=10, days=25
      2. Read math card values
      3. Assert dailyTofu=1690, dailyPacks=169, monthlyPacks=4225
    Expected Result: Computed values match formula
    Evidence: .omo/evidence/task-17-math-card.png
  ```

  **Commit**: NO

- [ ] 18. Login rebuild on warm-cream

  **What to do**:
  - Edit `src/app/login/page.tsx`. Target: ≤ 180 lines (down from 214).
  - Drop hardcoded hex literals across the file — use Tailwind utilities (`bg-bg`, `text-text-primary`, `text-text-secondary`, `border-border`, etc.) and primitive components.
  - Drop the 3 floating radial-gradient blobs (`absolute top-16 right-16 ...`, etc.) — pure decoration.
  - Drop `dot-pattern gradient-mesh` classes from the right column wrapper (already removed from globals.css in T3).
  - Drop the `drop-shadow-filter` wrapper around the dashboard mockup.
  - Keep the inline `<DashboardMockup>` component but: convert its hardcoded hex to Tailwind utilities; reduce visual weight (drop the floating purple "Gratis selamanya" badge — info not critical for the mockup; let the form-side benefits convey the message).
  - Form: use `<Button variant="primary">` for submit. Email/password inputs use existing `.input-field` class (already a CSS class, no inline style).
  - Error banner: use `<InfoBanner variant="error">` instead of inline div.
  - Brand mark: use Tailwind utilities for the gradient (after T2 reconciliation) instead of inline `style={{ background: 'linear-gradient(...)' }}`.
  - Keep `useActionState`, `useState` (for showPassword) — `'use client'` directive stays.
  - File ≤ 180 lines.

  **Must NOT do**:
  - Modify `loginAction` import or binding
  - Change form field `name` attributes (`email`, `password`)
  - Change `autoComplete`, `required`, `type` attributes
  - Modify the show/hide password toggle behavior (just restyle)
  - Add a "forgot password" link (not in scope; no route exists)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `playwright`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T12-T17, T19)
  - **Parallel Group**: Wave 2B
  - **Blocks**: T20-T24
  - **Blocked By**: T11

  **References**:
  - `src/app/login/page.tsx:1-214` — current
  - `src/server/actions.ts` — `loginAction` (DO NOT modify)
  - `src/components/info-banner.tsx`, `src/components/ui/button.tsx`
  - `src/app/globals.css` (search `.input-field`, `.btn-primary`, `.field-label`)

  **Acceptance Criteria**:
  - [ ] File ≤ 180 lines
  - [ ] `Select-String src/app/login/page.tsx -Pattern '#[0-9A-Fa-f]{6}'` returns 0
  - [ ] No `.float`, `.float-slow`, `.dot-pattern`, `.gradient-mesh` class strings in JSX
  - [ ] No `drop-shadow-filter` wrapper
  - [ ] Form action binding byte-identical to baseline
  - [ ] `npm run typecheck && npm test && npm run build` pass

  **QA Scenarios**:
  ```
  Scenario: Login page renders without floating decorations
    Tool: Playwright
    Steps:
      1. Navigate to /login at 1440x900
      2. page.evaluate(() => document.querySelectorAll('.float,.float-slow,.dot-pattern').length)
      3. Assert result === 0
      4. Take screenshot
    Expected Result: No decorative floats visible; warm-cream identity consistent
    Evidence: .omo/evidence/task-18-login-clean.png

  Scenario: Show/hide password toggle still works
    Tool: Playwright
    Steps:
      1. Type "secret123" in password field
      2. Click eye icon
      3. Assert input type === "text" and value visible
      4. Click eye-off icon
      5. Assert input type === "password"
    Expected Result: Toggle works as before
    Evidence: .omo/evidence/task-18-password-toggle.png

  Scenario: Invalid credentials show error banner
    Tool: Playwright
    Steps:
      1. Submit invalid email + wrong password
      2. Wait for action response
      3. Assert InfoBanner rendered with role="status" and error text
    Expected Result: Error UI present
    Evidence: .omo/evidence/task-18-login-error.png
  ```

  **Commit**: NO

- [ ] 19. Register rebuild on warm-cream

  **What to do**:
  - Edit `src/app/register/page.tsx`. Target: ≤ 130 lines (down from 125 — slight increase ok if a11y improves).
  - Drop the right-panel solid-purple gradient (`linear-gradient(135deg, #7C3AED 0%, #6D28D9 50%, #5B21B6 100%)`) — replace with warm-cream brand panel matching login's right column tone.
  - New right panel composition: warm-cream bg + larger ReceiptText brand mark in a `<Card variant="subtle">` + the same 3-stat row (`169 / Rp 302 rb / 100%`) but in flat warm-tone cards instead of translucent-on-purple.
  - Form: `<Button variant="primary">` for submit. `<InfoBanner variant="error">` for state.error.
  - Drop hardcoded hex; use Tailwind utilities + primitives.
  - Keep `useActionState`, `useState` (showPassword).
  - File ≤ 130 lines.

  **Must NOT do**:
  - Modify `registerAction` binding
  - Change form field `name`, `type`, `required`, `minLength` attributes
  - Add a "terms of service" checkbox (out of scope)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `playwright`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T12-T18)
  - **Parallel Group**: Wave 2B
  - **Blocks**: T20-T24
  - **Blocked By**: T11

  **References**:
  - `src/app/register/page.tsx:1-125` — current
  - `src/server/actions.ts` — `registerAction` (DO NOT modify)
  - `src/app/login/page.tsx` (after T18) — for matching right-column tone

  **Acceptance Criteria**:
  - [ ] File ≤ 130 lines
  - [ ] No hardcoded hex
  - [ ] Right panel uses warm-cream bg, NOT solid purple
  - [ ] Form action binding byte-identical to baseline
  - [ ] `npm run typecheck && npm test && npm run build` pass

  **QA Scenarios**:
  ```
  Scenario: Right panel is warm-cream not purple
    Tool: Playwright
    Steps:
      1. Navigate /register at 1440x900
      2. Locate the right-half element (.flex-1 second child)
      3. Read getComputedStyle backgroundColor
      4. Assert color is in warm-cream family (R~250-255, G~245-251, B~230-245), NOT purple (R~91-124, G~33-58, B~182-237)
    Expected Result: Right panel matches in-app warm-cream identity
    Evidence: .omo/evidence/task-19-register-panel.png

  Scenario: Register form submits valid input
    Tool: Playwright
    Steps:
      1. Visit /register
      2. Fill email + password (≥6 chars)
      3. Click "Buat Akun Gratis"
      4. Assert redirect to /beranda OR /login on success
    Expected Result: Registration completes
    Evidence: .omo/evidence/task-19-register-submit.png
  ```

  **Commit**: NO

- [ ] 20. Microcopy audit + fixes

  **What to do**:
  - Run grep across `src/` for stale microcopy:
    - "Belum Lunas" → replace with "Belum Dibayar"
    - "Sudah Lunas" → replace with "Sudah Dibayar"
    - "Pengaturan Usaha" → replace with "Profil Usaha Kamu"
    - "Simpan Pengaturan" → replace with "Simpan Perubahan"
    - "Ringkasan Usaha" → replace with "Hari ini usaha kamu..." (only in dashboard headings)
    - "Catat Sekarang" → replace with "Mau catat apa hari ini?" (only on `/catat`)
    - "Data belum lengkap" → replace with "Belum semua dicatat, angka ini masih perkiraan"
    - "Semua sudah lunas" → replace with "Semua pembeli sudah lunas hari ini"
  - Audit verb-echo: confirm `/beranda` quick-actions section heading "Mau catat apa hari ini?" sits above buttons that say "Penjualan" / "Pengeluaran" (no "Catat" prefix on buttons).
  - Audit `/catat` section heading + button text — "Catat Apa?" + "Penjualan" / "Pengeluaran" pair is acceptable (verb echo OK at this level).
  - Document all changes in `.omo/evidence/task-20-microcopy-changes.md`.

  **Must NOT do**:
  - Translate any text from Bahasa Indonesia to English
  - Change route paths
  - Touch test files (assertions on text strings will be handled per-test in implementation tasks)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Pure string find-replace with manual review per match
  - **Skills**: none

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T21-T24)
  - **Parallel Group**: Wave 3
  - **Blocks**: F1-F4
  - **Blocked By**: T12-T19

  **References**:
  - `AGENTS.md:131-145` — microcopy table
  - `.omo/notepads/ui-upgrade-umkm-tahu/learnings.md` — prior microcopy decisions

  **Acceptance Criteria**:
  - [ ] `Select-String -Path 'src\**\*.tsx' -Pattern 'Belum Lunas'` returns 0 matches
  - [ ] `Select-String -Path 'src\**\*.tsx' -Pattern 'Sudah Lunas'` returns 0 matches
  - [ ] `Select-String -Path 'src\**\*.tsx' -Pattern 'Pengaturan Usaha'` returns 0 matches
  - [ ] `Select-String -Path 'src\**\*.tsx' -Pattern 'Simpan Pengaturan'` returns 0 matches
  - [ ] `.omo/evidence/task-20-microcopy-changes.md` exists with table of changes (file:line | before | after)
  - [ ] `npm run typecheck && npm test && npm run build` pass

  **QA Scenarios**:
  ```
  Scenario: Microcopy enforced across pages
    Tool: Bash (powershell)
    Steps:
      1. For each forbidden phrase: run Select-String across src/
      2. Assert all return 0 matches
    Expected Result: Zero stale microcopy in source
    Evidence: .omo/evidence/task-20-microcopy-changes.md
  ```

  **Commit**: NO

- [ ] 21. Cross-page responsive sweep + horizontal overflow check

  **What to do**:
  - Use Playwright to visit each of the 12 routes (with auth seeded) at viewports 375, 768, 1024, 1440.
  - For each route × viewport: capture screenshot, read `document.body.scrollWidth - document.documentElement.clientWidth` — assert ≤ 0 (no horizontal overflow).
  - Flag any overflow with file:line of likely cause (e.g., long money string, untruncated business name).
  - Apply targeted fixes: add `min-w-0 truncate` where needed, add `flex-wrap` where overflow caused by multi-element rows, ensure `overflow-x: hidden` is NEVER used as a workaround.
  - Save evidence to `.omo/evidence/task-21-overflow-{route}-{viewport}.txt` (per-viewport result).

  **Must NOT do**:
  - Add `overflow-x: hidden` as a workaround
  - Modify primitive components (apply fixes at consumer level only)
  - Change layout structure (only add safety classes)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Cross-page diagnostic + targeted fixes
  - **Skills**: `playwright`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T20, T22-T24)
  - **Parallel Group**: Wave 3
  - **Blocks**: F1-F4
  - **Blocked By**: T12-T19

  **References**:
  - `.omo/notepads/ui-upgrade-umkm-tahu/learnings.md:526-578` (Task 15 sweep history) — patterns that previously needed fixing

  **Acceptance Criteria**:
  - [ ] All 12 routes × 4 viewports = 48 overflow checks recorded
  - [ ] Zero `overflow-x: hidden` introduced (verified by grep)
  - [ ] All fixes use `min-w-0 truncate` or `flex-wrap` only
  - [ ] `npm run typecheck && npm test && npm run build` pass

  **QA Scenarios**:
  ```
  Scenario: No horizontal overflow at 360px on any route
    Tool: Playwright
    Steps:
      1. Set viewport 360x800 (extra-narrow safety check)
      2. For each route: navigate, read body.scrollWidth - clientWidth
      3. Assert ≤ 0 for all
    Expected Result: Zero overflow at the narrowest realistic viewport
    Evidence: .omo/evidence/task-21-360-sweep.json
  ```

  **Commit**: NO

- [ ] 22. WCAG AA accessibility pass

  **What to do**:
  - Use Playwright + axe-core (loaded via CDN script tag, NOT installed as dep) on every route.
  - Run only `color-contrast` rule first; fix any violations by adjusting token-derived utility classes (NOT inline styles).
  - Then run full ruleset; address `aria-valid-attr`, `button-name`, `link-name`, `label`, `landmark-one-main` if any violations.
  - Verify focus-visible rings are visible (not invisible / 1px) on every interactive element by tabbing through each page and capturing screenshot.
  - Specific color-pair checks (Metis-flagged risk):
    - body text on `bg` (warm cream) → must be ≥ 4.5:1
    - amber text (`warn-text`) on warn-bg (cream amber) → must be ≥ 4.5:1
    - white text on accent purple → must be ≥ 4.5:1 (CTA legibility)
    - profit-text on profit-bg → must be ≥ 4.5:1
    - loss-text on loss-bg → must be ≥ 4.5:1
  - Verify `prefers-reduced-motion` honored: add or confirm CSS `@media (prefers-reduced-motion: reduce) { animation: none !important; transition: none !important; }` for all `.slide-up*`, `.fade-in`, `.scale-in`.
  - Save evidence: `.omo/evidence/task-22-axe-{route}.json`, `task-22-focus-{route}.png`, `task-22-contrast-pairs.json`.

  **Must NOT do**:
  - Install `@axe-core/playwright` (no new deps)
  - Add ARIA attributes en-masse to non-interactive elements
  - Override focus styles to invisible variants
  - Modify focus behavior on form inputs (already accessible via `:focus-visible` global rule)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Accessibility verification + targeted fixes across multiple files
  - **Skills**: `playwright`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T20, T21, T23, T24)
  - **Parallel Group**: Wave 3
  - **Blocks**: F1-F4
  - **Blocked By**: T12-T19

  **References**:
  - axe-core CDN: `https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.0/axe.min.js`
  - `src/app/globals.css` — `:focus-visible` rules to verify
  - WCAG AA color contrast: 4.5:1 for body, 3:1 for large (≥18px or 14px+bold) and UI components

  **Acceptance Criteria**:
  - [ ] axe `color-contrast` violations === 0 across all 12 routes
  - [ ] All 5 specific color pairs pass 4.5:1 (recorded in `task-22-contrast-pairs.json`)
  - [ ] Focus-visible ring visible on every interactive (button/link/input) — verified by tabbing screenshots per route
  - [ ] `prefers-reduced-motion` confirmed: with reduced-motion forced, all animations are no-op (verified by Playwright `emulateMedia({ reducedMotion: 'reduce' })` then read computed `animation-name`)
  - [ ] `npm run typecheck && npm test && npm run build` pass

  **QA Scenarios**:
  ```
  Scenario: Zero contrast violations on every route
    Tool: Playwright + axe-core
    Steps:
      1. For each route in 12-route list:
         a. Navigate
         b. addScriptTag axe CDN
         c. evaluate axe.run({runOnly: ['color-contrast']})
         d. Save violations array
      2. Assert all violations.length === 0
    Expected Result: WCAG AA contrast pass
    Evidence: 12 JSON files in .omo/evidence/

  Scenario: Reduced motion respected
    Tool: Playwright
    Steps:
      1. context.emulateMedia({ reducedMotion: 'reduce' })
      2. Navigate /beranda
      3. evaluate getComputedStyle on .slide-up element
      4. Assert animationName === 'none' OR animationDuration === '0s'
    Expected Result: Animations disabled per user preference
    Evidence: .omo/evidence/task-22-reduced-motion.txt
  ```

  **Commit**: NO

- [ ] 23. Inline-style purge verification + remaining cleanup

  **What to do**:
  - Grep across `src/` for inline-style usage:
    - `Select-String -Path 'src\**\*.tsx' -Pattern 'style=\{\{[^}]*color\b'` → record count, target ≤ 5
    - `Select-String -Path 'src\**\*.tsx' -Pattern 'style=\{\{[^}]*backgroundColor'` → target ≤ 3
    - `Select-String -Path 'src\**\*.tsx' -Pattern 'style=\{\{[^}]*background\s*:'` → target ≤ 3 (verdict gradient + 2 dynamic spots)
    - `Select-String -Path 'src\**\*.tsx' -Pattern 'style=\{\{[^}]*border'` → target ≤ 3
    - `Select-String -Path 'src\**\*.tsx' -Pattern '#[0-9A-Fa-f]{6}'` → target 0 in `src/app/`, ≤ 5 total (existing primitives may have a few static refs)
  - For each remaining inline-style block, document in `.omo/evidence/task-23-inline-style-justification.md`:
    - file:line
    - The dynamic value being computed (must be a runtime expression — static colors are NOT acceptable)
    - Why a Tailwind utility cannot replace it
  - Convert any remaining static-color inline styles to Tailwind utilities.

  **Must NOT do**:
  - Add new color variants to tailwind.config.ts beyond what T2 already added
  - Use `dangerouslySetInnerHTML`
  - Touch primitive components (their inline styles, if any, are already audited in T4)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Mechanical purge with grep verification
  - **Skills**: none

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T20-T22, T24)
  - **Parallel Group**: Wave 3
  - **Blocks**: F1-F4
  - **Blocked By**: T12-T19

  **References**:
  - All page files post-redesign
  - `tailwind.config.ts` (post-T2) — utilities available
  - `.omo/evidence/task-1-inline-style-baseline.txt` — pre-redesign count for delta

  **Acceptance Criteria**:
  - [ ] `style={{...color...}}` count ≤ 5 across entire `src/`
  - [ ] `style={{...backgroundColor...}}` count ≤ 3
  - [ ] `style={{...background:...}}` count ≤ 3
  - [ ] All remaining inline-style instances justified in evidence document
  - [ ] No `#[0-9A-Fa-f]{6}` in `src/app/` (search returns 0)
  - [ ] `npm run typecheck && npm test && npm run build` pass

  **QA Scenarios**:
  ```
  Scenario: Inline-style budget enforced
    Tool: Bash (powershell)
    Steps:
      1. Run all 4 grep checks listed above
      2. Compare counts to budget
      3. Assert all within budget
    Expected Result: Inline-style count meets target
    Evidence: .omo/evidence/task-23-inline-style-justification.md
  ```

  **Commit**: NO

- [ ] 24. Form error state implementation (Penjualan + Pengeluaran)

  **What to do**:
  - This task complements T14 + T15 by ensuring `state.error` flows into UI without modifying server actions.
  - For Penjualan + Pengeluaran forms: convert from server-component form (no `useActionState`) to thin `'use client'` wrapper component that uses `useActionState` to capture action result, OR keep as server-component and rely on action's `redirect()` for success — verify which pattern current actions use.
  - Read `src/server/actions.ts` to understand `createSalesAction` / `createExpenseAction` return values:
    - If they `redirect()` on success and `return { error: '...' }` on failure → wrap form with thin `'use client'` shell that uses `useActionState`, render `<InfoBanner variant="error">{state.error}</InfoBanner>` above form on error.
    - If they always `redirect()` and never return → no error state to surface (Next.js shows error.tsx instead). In that case, ensure `error.tsx` exists for the route or document the behavior.
  - DO NOT modify `actions.ts` — only the consumer.
  - For the wrapper component pattern: create `src/components/sales-form-shell.tsx` and `src/components/expense-form-shell.tsx` (`'use client'`) that own `useActionState` and pass `state` + the bound `formAction` down to the existing form children via render-prop or by accepting children with cloned context.
  - Simpler path if wrapper feels overkill: convert `catat/penjualan/page.tsx` and `catat/pengeluaran/page.tsx` to `'use client'` server-component-shell that re-fetches data via existing query functions… no wait, queries are server-side. The shell pattern is the right call.

  **Must NOT do**:
  - Modify `src/server/actions.ts`
  - Convert the page-level component to `'use client'` (loses server-side auth check + queries)
  - Add new top-level state management (no Zustand, no Redux, no Context)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Cross-boundary refactor (server+client composition); needs careful auth-check preservation
  - **Skills**: `playwright`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T20-T23) — only conflicts with T14+T15 if they run concurrently; T14+T15 are W2B, T24 is W3
  - **Parallel Group**: Wave 3
  - **Blocks**: F1-F4
  - **Blocked By**: T14, T15

  **References**:
  - `src/server/actions.ts` — read only, document return shape
  - `src/app/login/page.tsx` (post-T18) — reference for `useActionState` pattern in a `'use client'` page
  - `src/app/catat/penjualan/page.tsx` and `pengeluaran/page.tsx` — current server-component shape

  **Acceptance Criteria**:
  - [ ] `src/server/actions.ts` byte-identical to T1 baseline (`Compare-Object` returns no diff)
  - [ ] If wrapper-shell approach: `sales-form-shell.tsx` and `expense-form-shell.tsx` exist, `'use client'` directive present
  - [ ] Page-level component remains server-component (preserves auth redirect)
  - [ ] Triggering a server-action error shows InfoBanner without page reload (verified in QA)
  - [ ] `npm run typecheck && npm test && npm run build` pass

  **QA Scenarios**:
  ```
  Scenario: Server-rejected sales submission shows InfoBanner
    Tool: Playwright
    Steps:
      1. Login; visit /catat/penjualan
      2. Submit with packs=0 (server rejects: must be >0)
      3. Wait for action response (no redirect on error)
      4. Assert InfoBanner with role="status" rendered with error text
      5. Assert form values preserved (browser default behavior — no React reset)
    Expected Result: User sees error inline, doesn't lose input
    Evidence: .omo/evidence/task-24-sales-error.png

  Scenario: Successful sales submission still redirects
    Tool: Playwright
    Steps:
      1. Submit valid sale
      2. Assert URL changes to /beranda OR /piutang
    Expected Result: Success path unchanged
    Evidence: .omo/evidence/task-24-sales-success.png
  ```

  **Commit**: NO

---

## Final Verification Wave

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and wait for explicit "okay" before marking work complete.

- [ ] F1. **Plan Compliance Audit** — `oracle`

  **What to do**: Read this plan end-to-end. For each "Must Have": verify implementation exists (read file, run command, inspect Playwright screenshot in `.omo/evidence/`). For each "Must NOT Have": grep codebase for forbidden patterns, reject with file:line if found. Check `.omo/evidence/` for screenshot artifacts (12 routes × 4 viewports = 48 PNGs). Verify acceptance criteria check-marks correspond to verifiable evidence. Compare deliverables list against actual changes via `git diff` (note: project is NOT a git repo per AGENTS.md — use file mtime + content inspection instead).

  **Commands to run**:
  ```bash
  grep -rE 'style=\\{\\{[^}]*color\\b' src/ --include='*.tsx' | wc -l
  grep -r 'Belum Lunas' src/ --include='*.tsx' | wc -l
  ls .omo/evidence/final-qa/*.png | wc -l
  diff <(grep -E '^\\s*"' package.json | sort) <(echo "$BASELINE_DEPS")
  npm run typecheck && npm test && npm run build
  ```

  **Output format**: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`. On REJECT, list file:line citations.

- [ ] F2. **Code Quality Review** — `unspecified-high`

  **What to do**: Run `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`. Review every file changed in `src/` for: `as any` / `@ts-ignore` (acceptable only on existing `(supabase as any)` casts per AGENTS.md), empty catches, `console.log` in prod paths, commented-out code, unused imports, generic variable names (`data`, `result`, `item`, `temp`, `foo`). Check primitive APIs for: variant-only props (no arbitrary className for color/typography), TypeScript types exhaustive (no `any`), no React 19 anti-patterns (effects in server components, async client components). Verify no AI slop: comments explaining obvious code, over-abstracted helpers used once, doc-string bloat.

  **Output format**: `Build [PASS/FAIL] | Typecheck [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N/N] | Files reviewed [N] | Issues found [N] | VERDICT: APPROVE/REJECT`. On REJECT, list specific file:line per issue.

- [ ] F3. **Real Playwright Manual QA** — `unspecified-high` + `playwright` skill

  **What to do**: Start dev server (`npm run dev` background, `localhost:3000`). Use Playwright to execute the FULL QA matrix: 12 routes × 4 viewports = 48 scenarios. For each: navigate, wait for content, take full-page screenshot, capture console messages, verify zero horizontal overflow, run axe-core (loaded via `<script src="https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.0/axe.min.js">` injected by `page.addScriptTag()`), assert zero contrast violations. Test cross-task integration: navigate Beranda → Catat → Penjualan → submit valid form → return to Beranda; verify state propagation. Test edge cases per page: empty piutang list, loss-state Beranda hero (mock by setting one expense without sales), long business name (60+ chars). Save evidence to `.omo/evidence/final-qa/`.

  **Output format**: `Routes [12/12] | Viewports [4/4] | Console errors [0/clean] | Contrast violations [0/N] | Integration scenarios [N/N] | Edge cases [N tested] | VERDICT: APPROVE/REJECT`.

- [ ] F4. **Scope Fidelity Check** — `deep`

  **What to do**: For each task T1-T24: read "What to do" section in this plan, then inspect actual changed files (diff against pre-Wave-0 baseline captured in T1). Verify 1:1 — everything in spec was built, nothing beyond spec was built. Check "Must NOT do" compliance per task. Specifically grep:
  ```bash
  diff baseline/server/actions.ts src/server/actions.ts        # MUST be empty
  diff baseline/server/queries.ts src/server/queries.ts        # MUST be empty
  diff baseline/domain/finance.ts src/domain/finance.ts        # MUST be empty
  diff baseline/lib/format.ts src/lib/format.ts                # MUST be empty
  diff baseline/supabase/schema.sql supabase/schema.sql        # MUST be empty
  grep -r 'data-testid' src/                                    # MUST match baseline data-testid set exactly
  grep -rE '\\bdark:' src/                                      # MUST be 0 (no dark mode)
  diff baseline/package.json package.json                       # diff scripts/version OK; deps section MUST be byte-identical
  ```
  Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes.

  **Output format**: `Tasks [N/N compliant] | Server actions untouched [YES/NO] | Queries untouched [YES/NO] | Schema untouched [YES/NO] | Deps unchanged [YES/NO] | Contamination [CLEAN/N] | VERDICT: APPROVE/REJECT`.

---

## Commit Strategy

> Project is NOT a git repo per AGENTS.md. No commits required. Each task's verification is its own checkpoint via `npm run typecheck && npm test && npm run build` + Playwright evidence in `.omo/evidence/`.

If git is later initialized, recommended commit boundaries:
- W0 → 1 commit: `chore(ui): baseline audit and decoration purge`
- W1 → 1 commit: `feat(ui): reconcile token system + extract primitives`
- W2A → 1 commit: `feat(ui): redesign Beranda on new primitives`
- W2B → 1 commit per page (8 commits): `feat(ui): redesign {page} on new primitives`
- W3 → 1 commit: `polish(ui): microcopy + a11y + responsive sweep`
- WFINAL → no commit (review only)

---

## Success Criteria

### Verification Commands
```powershell
npm run typecheck   # Expected: 0 errors
npm test            # Expected: 98/98 pass (or higher)
npm run build       # Expected: 12/12 pages compile

# Inline-style audit
(Select-String -Path 'src\**\*.tsx' -Pattern 'style=\{\{[^}]*color\b' -SimpleMatch:$false).Count   # Expected: ≤ 5
(Select-String -Path 'src\**\*.tsx' -Pattern 'style=\{\{[^}]*backgroundColor' -SimpleMatch:$false).Count   # Expected: ≤ 3

# Microcopy audit
(Select-String -Path 'src\**\*.tsx' -Pattern 'Belum Lunas').Count   # Expected: 0

# Decoration purge
(Select-String -Path 'src\app\globals.css' -Pattern 'gradient-mesh-warm|grain-overlay|float-slow|dot-pattern').Count   # Expected: 0

# Dependency immutability (project is NOT a git repo)
Compare-Object (Get-Content package.json) (Get-Content .omo/evidence/task-1-package-baseline.json) | Where-Object { $_.SideIndicator -in '=>','<=' -and $_.InputObject -match '"' -and $_.InputObject -notmatch '"version"|"scripts"' }   # Expected: empty
```

### Final Checklist
- [ ] All 12 routes redesigned with primitives + Tailwind utilities
- [ ] Zero `style={{ color: ... }}` or `style={{ backgroundColor: ... }}` blocks for static colors
- [ ] All "Must Have" items present and verified by command output
  - [ ] All "Must NOT Have" items absent (verified by grep + Compare-Object against T1 baseline)
- [ ] 98/98 tests pass (or higher with intentional updates)
- [ ] axe-core: 0 contrast violations across 12 routes
- [ ] 48 Playwright screenshots in `.omo/evidence/final-qa/`
- [ ] User-approval gate at T11 explicitly cleared
- [ ] User explicit "okay" after F1-F4 reviews complete
