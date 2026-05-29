# Business Expense Excel Accuracy Patch

## TL;DR

> **Quick Summary**: Update the UMKM Tahu website so its expense tracker, HPP, and profit/loss behavior match the newest authoritative workbook `C:\Users\FARIS\Downloads\Buku Pengeluaran.xlsx` for UMKM Tahu Pak Riyanto.
>
> **Deliverables**:
> - Excel-derived expense defaults, formulas, and category mapping captured in app domain code.
> - TDD coverage proving app calculations match workbook values.
> - Expense input UI aligned with the workbook's `Pengeluaran` sheet.
> - Dashboard/report calculations aligned with `HPP & Laba Rugi` and `Klarifikasi`.
>
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 3 waves + final verification
> **Critical Path**: 1 → 3 → 5 → 7 → F1-F4

---

## Context

### Original Request
The user asked to check `C:\Users\FARIS\OneDrive\Dokumen\Fullstack Journey\Projects\umkm_tahu` and fix it with the newest update/patch about business expenses using `C:\Users\FARIS\Downloads\Buku Pengeluaran.xlsx`.

### Interview Summary
**Key Discussions**:
- The app is specifically for **UMKM Tahu Pak Riyanto**, not a generic tracker.
- The newest Excel workbook is authoritative and should be used.
- The website should be as accurate as the Excel workbook.
- User selected **TDD**.

**Research Findings**:
- Stack: Next.js 15 App Router, React 19, TypeScript, Tailwind 3.4, Supabase, Vitest.
- Project has existing finance tests and expense UI tests.
- Relevant files include `src/domain/finance.ts`, `src/domain/finance.test.ts`, `src/domain/seed-defaults.ts`, `src/app/catat/pengeluaran/page.tsx`, `src/components/expense-form-preview.tsx`, `src/server/actions.ts`, `src/server/queries.ts`, `src/types/database.ts`, and `supabase/schema.sql`.
- Workbook sheets detected: `Pengeluaran`, `Penjualan`, `Piutang Warung`, `HPP & Laba Rugi`, `Klarifikasi`.
- Workbook values include Kedelai 10.900 × 50, Kain saring 60.000 × 2/365, Kayu bakar 400.000 × 1/7, Listrik 400.000 × 12/365, Tenaga kerja 75.000, Bensin 15.000, Plastik 5.000, 10 papan/day, 169 tahu/papan, 10 tahu/bungkus, harga jual 6.000/bungkus.

### Metis Review
**Identified Gaps** (addressed by plan defaults because agent quota prevented live Metis consultation):
- Historical import vs source-of-truth defaults: include workbook current rows/defaults in scope, but do not build a full generic Excel importer unless needed.
- Formula precision: preserve workbook formulas and rounding behavior with explicit tests.
- Scope creep: avoid generic accounting, inventory, payroll, tax, multi-business, or chart-library additions.

---

## Work Objectives

### Core Objective
Make the app's expense and financial reporting behavior match the newest Excel workbook for UMKM Tahu Pak Riyanto, verified through TDD and agent-executed QA.

### Concrete Deliverables
- Excel-derived expense model/constants or fixtures.
- Finance functions that calculate workbook-equivalent totals, subtotals, HPP, margins, and profit/loss.
- Updated seed defaults from the newest workbook.
- Expense form labels/options aligned with workbook groups and daily-business terms.
- Dashboard/report calculations aligned with workbook semantics.

### Definition of Done
- [ ] `npm run typecheck` passes with zero errors.
- [ ] `npm test` passes, including new Excel-accuracy tests.
- [ ] `npm run build` compiles all pages.
- [ ] Agent QA evidence exists under `.omo/evidence/`.

### Must Have
- Excel workbook is treated as the source of truth.
- TDD uses vertical RED → GREEN → REFACTOR cycles, not all-tests-first horizontal slicing.
- Tests verify behavior through public finance/domain/UI interfaces.
- Indonesian UI copy is preserved.
- Tailwind v3 conventions are preserved.
- Supabase RLS/security model is preserved.

### Must NOT Have (Guardrails)
- Do not build a generic accounting system.
- Do not add tax, payroll, inventory, multi-business, or chart-library features unless already required by the workbook.
- Do not use English UI labels.
- Do not hardcode unexplained magic numbers outside a named Excel-derived source module/fixture.
- Do not alter `.env.local` or expose secrets.
- Do not use Tailwind v4 CSS-first syntax.
- Do not run git commands; this project is not a git repo.

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed.

### Test Decision
- **Infrastructure exists**: YES
- **Automated tests**: TDD
- **Framework**: Vitest
- **TDD Rule**: Each implementation task follows one behavior at a time: RED failing test → GREEN minimal implementation → REFACTOR.

### QA Policy
Every task includes agent-executed QA scenarios. Evidence must be saved to `.omo/evidence/task-{N}-{scenario-slug}.{ext}`.

---

## Execution Strategy

### Parallel Execution Waves

```text
Wave 1 (Start Immediately - source of truth + test seams):
├── Task 1: Extract workbook facts and source fixture [quick]
├── Task 2: Create Excel-accuracy test harness [quick]
├── Task 3: Map expense groups/categories [quick]
└── Task 4: Confirm current UI/test baseline [quick]

Wave 2 (After Wave 1 - domain + data model):
├── Task 5: TDD finance calculations against workbook [deep]
├── Task 6: TDD seed defaults from workbook [quick]
├── Task 7: TDD expense form semantics [visual-engineering]
└── Task 8: TDD dashboard/report summary alignment [deep]

Wave 3 (After Wave 2 - integration polish):
├── Task 9: Supabase schema/types compatibility audit [unspecified-high]
├── Task 10: UI copy and mobile workflow polish [visual-engineering]
└── Task 11: Full verification/evidence capture [unspecified-high]

Wave FINAL:
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)
```

### Dependency Matrix
- **1**: None → 2, 3, 5, 6
- **2**: 1 → 5, 6, 8, 11
- **3**: 1 → 7, 8, 9
- **4**: None → 7, 10, 11
- **5**: 1, 2 → 8, 11
- **6**: 1, 2 → 8, 11
- **7**: 3, 4 → 10, 11
- **8**: 2, 3, 5, 6 → 11
- **9**: 3 → 11
- **10**: 4, 7 → 11
- **11**: 5, 6, 7, 8, 9, 10 → F1-F4

### Agent Dispatch Summary
- **Wave 1**: 4 tasks — all `quick`
- **Wave 2**: 4 tasks — `deep`, `quick`, `visual-engineering`, `deep`
- **Wave 3**: 3 tasks — `unspecified-high`, `visual-engineering`, `unspecified-high`
- **FINAL**: 4 review agents

---

## TODOs

- [ ] 1. Extract workbook facts into a source-of-truth fixture

  **What to do**:
  - Read `C:\Users\FARIS\Downloads\Buku Pengeluaran.xlsx`.
  - Capture the workbook sheets, group names, line items, formulas, and expected numeric values in a test-friendly source file or fixture.
  - Keep this fixture focused on authoritative UMKM Tahu values, not a generic Excel parser.

  **Must NOT do**:
  - Do not implement a broad Excel import feature unless the current task requires it.
  - Do not silently change workbook values.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: focused extraction and fixture creation.
  - **Skills**: [`tdd`]
    - `tdd`: fixture exists to support behavior-first tests.
  - **Skills Evaluated but Omitted**:
    - `pdf`: workbook is XLSX, not PDF.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 2, 3, 5, 6
  - **Blocked By**: None

  **References**:
  - `C:\Users\FARIS\Downloads\Buku Pengeluaran.xlsx` - authoritative workbook.
  - `src/domain/seed-defaults.ts:1-52` - current stale/default source to compare against.
  - `src/domain/finance.test.ts:167-209` - existing real-world number test style.

  **Acceptance Criteria**:
  - [ ] Fixture/source captures `Pengeluaran`, `HPP & Laba Rugi`, and `Klarifikasi` key values.
  - [ ] Fixture includes exact expected values for Kedelai, Kain saring, Kayu bakar, Listrik, Tenaga kerja, Bensin, Plastik, papan/day, tahu/papan, tahu/bungkus, and harga jual.
  - [ ] No UI or database behavior is changed in this task.

  **QA Scenarios**:
  ```text
  Scenario: Workbook facts are visible to tests
    Tool: Bash
    Preconditions: Project dependencies installed
    Steps:
      1. Run `npm test -- src/domain/finance.test.ts`
      2. Confirm existing tests still pass after adding the fixture/source
    Expected Result: Vitest exits 0 and existing finance tests pass
    Failure Indicators: Any test failure or TypeScript import error
    Evidence: .omo/evidence/task-1-fixture-test.txt

  Scenario: Fixture rejects accidental genericization
    Tool: Bash
    Preconditions: Fixture/source created
    Steps:
      1. Search the fixture/source for `UMKM Tahu` and `Pak Riyanto`
      2. Search for key value `10900` and item `Kedelai`
    Expected Result: Business-specific labels and workbook values exist
    Evidence: .omo/evidence/task-1-business-specific.txt
  ```

  **Commit**: NO

- [ ] 2. Create a TDD Excel-accuracy test harness

  **What to do**:
  - Add behavior tests that describe workbook-equivalent outcomes.
  - Start with one tracer bullet: total biaya bahan baku from Kedelai = 545.000.
  - Keep tests public-interface oriented.

  **Must NOT do**:
  - Do not write all planned tests before implementation.
  - Do not test private implementation details.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: focused test harness around existing Vitest setup.
  - **Skills**: [`tdd`]
    - `tdd`: enforce RED → GREEN cycles.

  **Parallelization**:
  - **Can Run In Parallel**: YES, after Task 1
  - **Parallel Group**: Wave 1
  - **Blocks**: 5, 6, 8, 11
  - **Blocked By**: 1

  **References**:
  - `src/domain/finance.test.ts:1-209` - test style and current financial tests.
  - `vitest.config.ts` - test environment configuration.
  - `package.json:10-12` - test/typecheck scripts.

  **Acceptance Criteria**:
  - [ ] First RED test fails for the missing workbook-equivalent behavior.
  - [ ] Test names use business language: `bahan baku`, `HPP`, `laba bersih`, not generic accounting labels.
  - [ ] Tests run through `npm test`.

  **QA Scenarios**:
  ```text
  Scenario: Tracer bullet fails before implementation
    Tool: Bash
    Preconditions: Test added before behavior implementation
    Steps:
      1. Run `npm test -- src/domain/finance.test.ts`
      2. Capture failing assertion for Kedelai total or equivalent first behavior
    Expected Result: Failure is specific to missing Excel-accuracy behavior
    Evidence: .omo/evidence/task-2-red.txt

  Scenario: Test harness is not horizontal
    Tool: Bash
    Preconditions: Test file updated
    Steps:
      1. Inspect changed test file
      2. Confirm only the next behavior test is added for the current TDD cycle
    Expected Result: No large all-tests-first block appears
    Evidence: .omo/evidence/task-2-tdd-shape.txt
  ```

  **Commit**: NO

- [ ] 3. Map workbook expense groups to app categories

  **What to do**:
  - Align workbook groups with current app categories.
  - Decide whether `production` should be displayed as `Biaya Operasional / Produksi`.
  - Ensure `other` can represent `Biaya Lain-Lain` and depreciation/cetakan.

  **Must NOT do**:
  - Do not add new database enum values unless necessary; prefer label/semantic mapping if current enum can represent workbook groups.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: mapping and labels are localized.
  - **Skills**: [`tdd`]

  **Parallelization**:
  - **Can Run In Parallel**: YES, after Task 1
  - **Parallel Group**: Wave 1
  - **Blocks**: 7, 8, 9
  - **Blocked By**: 1

  **References**:
  - `src/app/catat/pengeluaran/page.tsx:19-25` - current category options.
  - `src/components/expense-form-preview.tsx:20-34` - preview category labels/tones.
  - `src/types/database.ts:9-15` - existing `ExpenseCategory` type.
  - `supabase/schema.sql:9-15` - database enum values.

  **Acceptance Criteria**:
  - [ ] Workbook groups have explicit app mapping.
  - [ ] No unnecessary schema migration is introduced.
  - [ ] Labels are Bahasa Indonesia and match workbook meaning.

  **QA Scenarios**:
  ```text
  Scenario: Category mapping covers workbook groups
    Tool: Bash
    Preconditions: Mapping implemented
    Steps:
      1. Run `npm test`
      2. Confirm tests cover Bahan Baku, Bahan Tambahan, Operasional/Produksi, Pemasaran/Distribusi, and Lain-Lain
    Expected Result: Category mapping tests pass
    Evidence: .omo/evidence/task-3-category-tests.txt

  Scenario: Schema remains compatible
    Tool: Bash
    Preconditions: Mapping implemented
    Steps:
      1. Run `npm run typecheck`
      2. Confirm no enum/type mismatch appears
    Expected Result: Typecheck exits 0
    Evidence: .omo/evidence/task-3-typecheck.txt
  ```

  **Commit**: NO

- [ ] 4. Confirm current UI and test baseline

  **What to do**:
  - Run the existing verification commands before behavior changes.
  - Capture current failures if any.

  **Must NOT do**:
  - Do not fix unrelated failures in this task; record them and continue only if they block the plan.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: command-only baseline capture.
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 7, 10, 11
  - **Blocked By**: None

  **References**:
  - `AGENTS.md` - required verification order.
  - `package.json:10-12` - verification scripts.

  **Acceptance Criteria**:
  - [ ] Baseline `npm run typecheck`, `npm test`, and `npm run build` results are captured.
  - [ ] Any pre-existing failures are documented as pre-existing.

  **QA Scenarios**:
  ```text
  Scenario: Baseline command evidence captured
    Tool: Bash
    Preconditions: Clean project workspace
    Steps:
      1. Run `npm run typecheck`
      2. Run `npm test`
      3. Run `npm run build`
    Expected Result: Outputs are saved even if a command fails
    Evidence: .omo/evidence/task-4-baseline.txt

  Scenario: No unrelated edits made
    Tool: Bash
    Preconditions: Baseline captured
    Steps:
      1. Inspect changed files list through filesystem timestamps or available diff tooling
      2. Confirm no source files were modified by this task
    Expected Result: Only evidence files changed
    Evidence: .omo/evidence/task-4-no-source-edits.txt
  ```

  **Commit**: NO

- [ ] 5. TDD finance calculations against workbook formulas

  **What to do**:
  - Add one behavior test at a time for workbook-equivalent calculations.
  - Implement minimal finance/domain code to pass each test.
  - Cover subtotals, total biaya produksi, total bungkus/day, HPP/bungkus, margin/bungkus, laba kotor, and laba bersih.

  **Must NOT do**:
  - Do not replace existing public finance behavior without preserving sales/receivable tests.
  - Do not hide formula differences with broad tolerances.

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: financial correctness and formula semantics are high-risk.
  - **Skills**: [`tdd`]

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2
  - **Blocks**: 8, 11
  - **Blocked By**: 1, 2

  **References**:
  - `src/domain/finance.ts:1-118` - current public finance functions.
  - `src/domain/finance.test.ts:167-209` - current real-world tests.
  - Workbook `HPP & Laba Rugi` formulas - source of truth.
  - Workbook `Klarifikasi` summary - expected business interpretation.

  **Acceptance Criteria**:
  - [ ] `npm test -- src/domain/finance.test.ts` passes.
  - [ ] Tests prove workbook formula equivalence for expense totals and HPP/laba outputs.
  - [ ] Existing sales and receivable tests still pass.

  **QA Scenarios**:
  ```text
  Scenario: HPP matches workbook semantics
    Tool: Bash
    Preconditions: Finance TDD cycles completed
    Steps:
      1. Run `npm test -- src/domain/finance.test.ts`
      2. Confirm HPP per bungkus is around Rp 4.087 from workbook values
    Expected Result: Finance tests pass with exact or explicitly rounded workbook expectations
    Evidence: .omo/evidence/task-5-hpp-tests.txt

  Scenario: Zero and missing cost lines are safe
    Tool: Bash
    Preconditions: Finance TDD cycles completed
    Steps:
      1. Run targeted tests for Air = 0 and empty optional rows
      2. Confirm no NaN/Infinity outputs
    Expected Result: Zero-cost lines produce valid totals and no runtime invalid numbers
    Evidence: .omo/evidence/task-5-zero-cost.txt
  ```

  **Commit**: YES
  - Message: `test(finance): lock expense workbook formulas`
  - Pre-commit: `npm test -- src/domain/finance.test.ts`

- [ ] 6. TDD seed defaults from newest workbook

  **What to do**:
  - Update seed defaults to reflect the newest workbook.
  - Add tests that assert seed defaults match the workbook fixture/source.

  **Must NOT do**:
  - Do not make seed defaults permanent uneditable business rules.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: localized defaults and tests.
  - **Skills**: [`tdd`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 8, 11
  - **Blocked By**: 1, 2

  **References**:
  - `src/domain/seed-defaults.ts:1-52` - current seed defaults.
  - `src/server/actions.ts:41-71` - profile creation uses seed defaults.
  - Workbook `Pengeluaran` and `Klarifikasi` - authoritative defaults.

  **Acceptance Criteria**:
  - [ ] Defaults represent newest workbook values.
  - [ ] Tests fail if defaults drift from workbook fixture.
  - [ ] Comments state values are editable starting values, not immutable rules.

  **QA Scenarios**:
  ```text
  Scenario: Seed defaults match workbook fixture
    Tool: Bash
    Preconditions: Defaults updated through TDD
    Steps:
      1. Run `npm test -- src/domain/*.test.ts`
      2. Confirm seed/default accuracy tests pass
    Expected Result: Vitest exits 0
    Evidence: .omo/evidence/task-6-seed-tests.txt

  Scenario: Business profile creation still typechecks
    Tool: Bash
    Preconditions: Defaults updated
    Steps:
      1. Run `npm run typecheck`
    Expected Result: Typecheck exits 0
    Evidence: .omo/evidence/task-6-typecheck.txt
  ```

  **Commit**: YES
  - Message: `fix(seed): update UMKM expense defaults from workbook`
  - Pre-commit: `npm test -- src/domain/*.test.ts && npm run typecheck`

- [ ] 7. TDD expense form semantics and preview labels

  **What to do**:
  - Update expense form copy/options to mirror workbook groups and line-item semantics.
  - Keep mobile-first Indonesian UI.
  - Add/update component tests for behavior visible to the user.

  **Must NOT do**:
  - Do not add English labels.
  - Do not overcomplicate the form with accounting jargon.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI semantics and mobile UX.
  - **Skills**: [`tdd`, `frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 10, 11
  - **Blocked By**: 3, 4

  **References**:
  - `src/app/catat/pengeluaran/page.tsx:19-315` - expense form.
  - `src/components/expense-form-preview.tsx:20-268` - live preview.
  - `src/components/expense-form-preview.test.tsx:1-330` - component test pattern.
  - `AGENTS.md` - Indonesian UI and warm UMKM design system.

  **Acceptance Criteria**:
  - [ ] Expense category labels reflect workbook groups.
  - [ ] Preview still calculates total = qty × unit price.
  - [ ] Component tests cover one workbook-real example such as Kedelai 50 kg × 10.900.

  **QA Scenarios**:
  ```text
  Scenario: Kedelai preview shows workbook total
    Tool: Bash
    Preconditions: Component tests updated
    Steps:
      1. Run `npm test -- src/components/expense-form-preview.test.tsx`
      2. Confirm Kedelai 50 kg × Rp 10.900 displays Rp 545.000 as uang keluar
    Expected Result: Test passes and expected formatted currency appears
    Evidence: .omo/evidence/task-7-kedelai-preview.txt

  Scenario: UI remains Indonesian
    Tool: Bash
    Preconditions: UI updated
    Steps:
      1. Search changed UI files for English labels such as `Expense`, `Category`, `Production Cost`
      2. Confirm no user-facing English labels were introduced
    Expected Result: No English UI labels found
    Evidence: .omo/evidence/task-7-indonesian-copy.txt
  ```

  **Commit**: YES
  - Message: `fix(expense): align form with workbook categories`
  - Pre-commit: `npm test -- src/components/expense-form-preview.test.tsx && npm run typecheck`

- [ ] 8. TDD dashboard and report summary alignment

  **What to do**:
  - Align dashboard/profit summary grouping with workbook `HPP & Laba Rugi`.
  - Production costs should include bahan baku, bahan tambahan, and operasional/produksi.
  - Distribution/pemasaran and other/lain-lain should reduce net profit after gross profit.

  **Must NOT do**:
  - Do not add a charting dependency.
  - Do not change sales/piutang semantics beyond workbook-equivalent grouping.

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: cross-module calculation accuracy.
  - **Skills**: [`tdd`]

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2
  - **Blocks**: 11
  - **Blocked By**: 2, 3, 5, 6

  **References**:
  - `src/server/queries.ts:161-208` - dashboard summary and grouping.
  - `src/domain/finance.ts:98-118` - profit summary function.
  - Workbook `HPP & Laba Rugi` rows 23-37 - report grouping.

  **Acceptance Criteria**:
  - [ ] Tests prove dashboard/report grouping matches workbook semantics.
  - [ ] `getDashboardSummary` remains server-side and does not introduce client data fetching.
  - [ ] Profit summary differentiates gross vs net profit consistently with workbook.

  **QA Scenarios**:
  ```text
  Scenario: Dashboard grouping matches workbook
    Tool: Bash
    Preconditions: Summary tests implemented
    Steps:
      1. Run `npm test`
      2. Confirm tests cover production, distribution, and other expense grouping
    Expected Result: Tests pass with workbook-equivalent grouping
    Evidence: .omo/evidence/task-8-dashboard-tests.txt

  Scenario: Build includes report changes
    Tool: Bash
    Preconditions: Summary implementation complete
    Steps:
      1. Run `npm run build`
    Expected Result: Next build completes successfully
    Evidence: .omo/evidence/task-8-build.txt
  ```

  **Commit**: YES
  - Message: `fix(report): match workbook profit grouping`
  - Pre-commit: `npm test && npm run build`

- [ ] 9. Supabase schema/types compatibility audit

  **What to do**:
  - Verify whether current schema can support workbook-aligned expense rows and reports.
  - If schema changes are needed, keep them minimal and update `schema.sql` plus `src/types/database.ts` together.

  **Must NOT do**:
  - Do not add migrations for speculative future fields.
  - Do not weaken RLS policies.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: schema/security compatibility needs careful review.
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: 11
  - **Blocked By**: 3

  **References**:
  - `supabase/schema.sql:49-63` - expenses table.
  - `supabase/schema.sql:126-142` - expense RLS policies.
  - `src/types/database.ts:96-142` - expense types.

  **Acceptance Criteria**:
  - [ ] Current schema is explicitly accepted or minimal required changes are documented and implemented.
  - [ ] RLS policies remain user-scoped.
  - [ ] `npm run typecheck` passes.

  **QA Scenarios**:
  ```text
  Scenario: Schema and generated types remain aligned
    Tool: Bash
    Preconditions: Schema/type audit complete
    Steps:
      1. Run `npm run typecheck`
    Expected Result: No database type errors
    Evidence: .omo/evidence/task-9-typecheck.txt

  Scenario: RLS policies remain scoped
    Tool: Bash
    Preconditions: Schema reviewed
    Steps:
      1. Search `supabase/schema.sql` for expense policies
      2. Confirm policies still use `user_id = auth.uid()`
    Expected Result: User-scoped RLS remains present
    Evidence: .omo/evidence/task-9-rls.txt
  ```

  **Commit**: YES if schema/types changed, otherwise NO

- [ ] 10. UI copy and mobile workflow polish

  **What to do**:
  - Polish expense UI so it feels like the workbook's business flow while staying mobile-friendly.
  - Use project design system classes and warm UMKM identity.

  **Must NOT do**:
  - Do not add new visual systems or dependencies.
  - Do not exceed the requested expense-tracker scope.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: frontend UI/UX polish.
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: 11
  - **Blocked By**: 4, 7

  **References**:
  - `AGENTS.md` - design system and microcopy standards.
  - `src/app/globals.css` - utility classes.
  - `src/app/catat/pengeluaran/page.tsx` - target page.

  **Acceptance Criteria**:
  - [ ] UI is usable on mobile.
  - [ ] All copy is Indonesian and understandable to small-business user.
  - [ ] Existing design system is reused.

  **QA Scenarios**:
  ```text
  Scenario: Mobile expense page renders
    Tool: Playwright
    Preconditions: Dev server running with authenticated test state if available
    Steps:
      1. Navigate to `/catat/pengeluaran` at mobile viewport 390x844
      2. Assert date, category, item name, quantity, unit, and price fields are visible
      3. Capture screenshot
    Expected Result: Form is visible without horizontal scrolling
    Evidence: .omo/evidence/task-10-mobile-expense.png

  Scenario: Workbook example can be entered
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Fill item name `Kedelai`
      2. Fill quantity `50`
      3. Select unit `kg`
      4. Fill price `10900`
      5. Assert preview contains `Rp 545.000`
    Expected Result: Preview matches workbook total
    Evidence: .omo/evidence/task-10-kedelai-flow.png
  ```

  **Commit**: YES
  - Message: `ui(expense): polish workbook-based entry flow`
  - Pre-commit: `npm test && npm run build`

- [ ] 11. Full verification and evidence capture

  **What to do**:
  - Run final project verification in required order.
  - Capture evidence for tests, typecheck, build, and key QA scenarios.

  **Must NOT do**:
  - Do not claim completion if any command fails.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: cross-task verification and evidence collection.
  - **Skills**: [`verification-before-completion`]

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 final integration
  - **Blocks**: F1-F4
  - **Blocked By**: 5, 6, 7, 8, 9, 10

  **References**:
  - `AGENTS.md` - verification command order.
  - `package.json:10-12` - scripts.
  - `.omo/evidence/` - expected evidence directory.

  **Acceptance Criteria**:
  - [ ] `npm run typecheck` passes.
  - [ ] `npm test` passes.
  - [ ] `npm run build` passes.
  - [ ] Evidence files exist for all task QA scenarios.

  **QA Scenarios**:
  ```text
  Scenario: Required verification order passes
    Tool: Bash
    Preconditions: All implementation tasks complete
    Steps:
      1. Run `npm run typecheck`
      2. Run `npm test`
      3. Run `npm run build`
    Expected Result: All commands exit 0
    Evidence: .omo/evidence/task-11-final-commands.txt

  Scenario: Evidence completeness check
    Tool: Bash
    Preconditions: All QA scenarios executed
    Steps:
      1. List `.omo/evidence/`
      2. Confirm each task has at least one evidence artifact
    Expected Result: Evidence exists for tasks 1-11
    Evidence: .omo/evidence/task-11-evidence-index.txt
  ```

  **Commit**: NO

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. Verify every Must Have exists and every Must NOT Have is absent. Confirm evidence files exist. Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`.

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `npm run typecheck`, `npm test`, and `npm run build`. Review changed files for debug leftovers, English UI labels, excessive abstractions, `as any` additions, and unrelated changes. Output: `Build [PASS/FAIL] | Tests [N/N] | Files [N clean/N issues] | VERDICT`.

- [ ] F3. **Real Manual QA** — `unspecified-high` + `playwright` if UI is reachable
  Execute all QA scenarios, including Kedelai 50 kg × 10.900 = Rp 545.000 and mobile expense form rendering. Save evidence to `.omo/evidence/final-qa/`. Output: `Scenarios [N/N pass] | VERDICT`.

- [ ] F4. **Scope Fidelity Check** — `deep`
  Compare actual changes to this plan. Reject generic accounting/inventory/tax/payroll scope creep. Output: `Tasks [N/N compliant] | Creep [CLEAN/N issues] | VERDICT`.

---

## Commit Strategy

- **Finance formulas**: `test(finance): lock expense workbook formulas`
- **Seed defaults**: `fix(seed): update UMKM expense defaults from workbook`
- **Expense form**: `fix(expense): align form with workbook categories`
- **Reports**: `fix(report): match workbook profit grouping`
- **UI polish**: `ui(expense): polish workbook-based entry flow`

> Project is not a git repo, so these are recommended commit boundaries only if execution occurs in a repo-enabled copy.

---

## Success Criteria

### Verification Commands
```powershell
npm run typecheck
npm test
npm run build
```

### Final Checklist
- [ ] Workbook source values represented in tests/source fixture.
- [ ] Expense totals match workbook formula `Jumlah × Qty`.
- [ ] HPP and laba/rugi match workbook semantics.
- [ ] UI remains Indonesian and mobile-friendly.
- [ ] No generic accounting scope creep.
- [ ] All final verification agents approve before completion.
