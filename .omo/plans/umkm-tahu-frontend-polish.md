# UMKM Tahu Frontend Polish Plan

## TL;DR

> **Quick Summary**: Polish the full UMKM tahu user journey into a warm, locally grounded, hackathon-ready business dashboard while preserving existing behavior and tests.
>
> **Deliverables**:
> - Consistent warm design tokens across Tailwind, global CSS, root layout, landing/auth pages, dashboard, forms, receivables, and settings.
> - Full Bahasa Indonesia copy polish for user-facing visual text.
> - Desktop and mobile QA evidence for every route.
>
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 4 implementation waves + final verification
> **Critical Path**: 1 → 5 → 9 → 13 → F1-F4

---

## Context

### Original Request
The user wants the frontend design/style improved to be more eye-pleasing, hackathon-worthy, and likable for a business expense website for a tofu UMKM in Yogyakarta.

### Interview Summary
**Key Discussions**:
- Aesthetic direction confirmed: **Warm local business dashboard — modern financial clarity, with subtle Yogyakarta/tofu/UMKM personality**.
- User selected all recommended options: whole user journey scope, full Bahasa Indonesia copy, tests-after strategy.
- Hackathon-worthy means: consistent warm-token usage, no visual inconsistency between pages, mobile responsiveness at 375px, and a compelling landing/auth/dashboard narrative.

**Research Findings**:
- Stack: Next.js app router, Tailwind v3.4, Vitest/jsdom, Supabase.
- Current UI already has warm tokens in `src/app/globals.css` and reusable UI components.
- Key seams: `tailwind.config.ts` cool palette mismatch, `src/app/layout.tsx` hardcoded cool-gray body background, auth pages visually disjoint/hardcoded, leftover decoration utilities, and no installed e2e framework.
- Route inventory: `src/app/page.tsx`, `src/app/login/page.tsx`, `src/app/register/page.tsx`, `src/app/beranda/page.tsx`, `src/app/catat/page.tsx`, `src/app/catat/penjualan/page.tsx`, `src/app/catat/pengeluaran/page.tsx`, `src/app/piutang/page.tsx`, `src/app/pengaturan/page.tsx`, `src/app/layout.tsx`.
- Hardcoded Tailwind color-class search found no broad `bg-gray-`/`text-gray-` class sprawl in `src`.

### Metis Review
**Identified Gaps** (addressed):
- Define hackathon-worthy concretely: added visual consistency, mobile, and narrative acceptance criteria.
- Lock scope creep: no new dependencies, dark mode, charts, new pages, schema changes, server action changes, or animation libraries.
- Validate route inventory and color-class assumption: completed before plan generation.

---

## Work Objectives

### Core Objective
Make the complete UMKM tahu user journey feel cohesive, trustworthy, warm, and demo-ready without changing business logic or adding product scope.

### Concrete Deliverables
- Warm token alignment in `tailwind.config.ts`, `src/app/globals.css`, and `src/app/layout.tsx`.
- Landing/auth pages aligned with app visual identity.
- Dashboard, record menu, sales/expense forms, receivables, and settings polished for hierarchy, copy, spacing, responsive behavior, and evidence-backed QA.
- Tests-after updates where changed components require coverage.

### Definition of Done
- [ ] `npm run typecheck` exits 0.
- [ ] `npm run test` exits 0.
- [ ] `npm run build` exits 0.
- [ ] Desktop and mobile screenshots exist for all 9 user-facing routes.
- [ ] No new dependencies are added.
- [ ] No component prop/API, Supabase schema, or server action changes are introduced.

### Must Have
- Warm local UMKM visual identity.
- Full Bahasa Indonesia user-facing visual copy.
- Mobile-first quality at 375×812.
- Consistent auth → dashboard → forms narrative.
- Agent-executed QA evidence only; no human manual confirmation criteria.

### Must NOT Have (Guardrails)
- No dark mode.
- No new pages/routes.
- No charts or new dashboard analytics features.
- No new npm dependencies.
- No animation libraries.
- No Supabase schema, API route, or server action changes.
- No component TypeScript prop/interface changes unless explicitly required by an existing test-safe component API extension; default is restyle only.
- No generic AI-looking purple-gradient-on-white redesign.

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed.

### Test Decision
- **Infrastructure exists**: YES
- **Automated tests**: Tests-after
- **Framework**: Vitest/jsdom
- **Strategy**: Update/add tests after each wave only where changed reusable components or behavior-visible UI composition needs coverage.

### QA Policy
Every task includes agent-executed QA scenarios. Evidence goes to `.omo/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright tool/skill against local dev server.
- **Commands**: Run `npm run typecheck`, `npm run test`, and wave-appropriate build checks.
- **Visual evidence**: screenshots for desktop 1280×800 and mobile 375×812.

---

## Execution Strategy

### Parallel Execution Waves

```text
Wave 1 (Foundation, can start immediately):
├── 1. Token and root layout alignment [quick]
├── 2. Decoration cleanup and motion discipline [visual-engineering]
├── 3. Copy language audit map [writing]
└── 4. QA harness and route screenshot checklist [quick]

Wave 2 (Auth + landing, after Wave 1):
├── 5. Landing page narrative polish [visual-engineering]
├── 6. Login page warm identity rebuild [visual-engineering]
├── 7. Register page warm identity rebuild [visual-engineering]
└── 8. Auth/landing tests-after updates [quick]

Wave 3 (Core app screens, after Wave 1):
├── 9. Beranda dashboard hierarchy polish [visual-engineering]
├── 10. Catat menu and sales form polish [visual-engineering]
├── 11. Expense form and receipt preview polish [visual-engineering]
└── 12. Core screen tests-after updates [quick]

Wave 4 (Supporting screens + responsive sweep, after Waves 2-3):
├── 13. Piutang and Pengaturan polish [visual-engineering]
├── 14. AppShell mobile nav and responsive sweep [visual-engineering]
├── 15. Full-route browser QA evidence capture [unspecified-high]
└── 16. Build/test/typecheck verification and cleanup [quick]

Wave FINAL:
├── F1. Plan Compliance Audit [oracle]
├── F2. Code Quality Review [unspecified-high]
├── F3. Real Manual QA [unspecified-high + playwright]
└── F4. Scope Fidelity Check [deep]
```

### Dependency Matrix

- **1**: blocked by none; blocks 5-16.
- **2**: blocked by none; blocks 5-16.
- **3**: blocked by none; blocks 5-13.
- **4**: blocked by none; blocks 15.
- **5**: blocked by 1, 2, 3; blocks 8, 15, 16.
- **6**: blocked by 1, 2, 3; blocks 8, 15, 16.
- **7**: blocked by 1, 2, 3; blocks 8, 15, 16.
- **8**: blocked by 5, 6, 7; blocks 16.
- **9**: blocked by 1, 2, 3; blocks 12, 15, 16.
- **10**: blocked by 1, 2, 3; blocks 12, 15, 16.
- **11**: blocked by 1, 2, 3; blocks 12, 15, 16.
- **12**: blocked by 9, 10, 11; blocks 16.
- **13**: blocked by 1, 2, 3; blocks 15, 16.
- **14**: blocked by 5-13; blocks 15, 16.
- **15**: blocked by 4-14; blocks 16, F1-F4.
- **16**: blocked by 8, 12, 13, 14, 15; blocks F1-F4.
- **F1-F4**: blocked by 16.

### Agent Dispatch Summary

- **Wave 1**: 4 tasks — quick, visual-engineering, writing, quick.
- **Wave 2**: 4 tasks — visual-engineering ×3, quick ×1.
- **Wave 3**: 4 tasks — visual-engineering ×3, quick ×1.
- **Wave 4**: 4 tasks — visual-engineering ×2, unspecified-high ×1, quick ×1.
- **FINAL**: 4 parallel reviews.

---

## TODOs

- [x] 1. Token and root layout alignment

  **What to do**:
  - Align `tailwind.config.ts` with warm CSS variables from `src/app/globals.css` without inventing a new palette.
  - Change `src/app/layout.tsx` body background from hardcoded cool-gray to the warm global background.
  - Preserve Tailwind v3.4 conventions and existing font setup.

  **Must NOT do**:
  - Do not add Tailwind v4 syntax or new dependencies.
  - Do not rewrite the entire token system.

  **Recommended Agent Profile**:
  - **Category**: `quick` — small config/layout alignment.
  - **Skills**: []
  - **Skills Evaluated but Omitted**: `frontend-ui-ux` — design direction already encoded; this task is mechanical.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 5-16
  - **Blocked By**: None

  **References**:
  - `src/app/globals.css` — source of truth for warm cream, accent, semantic, radius, and shadow tokens.
  - `tailwind.config.ts` — currently mismatched cool palette; align to CSS vars.
  - `src/app/layout.tsx` — root body background currently hardcoded.
  - `AGENTS.md` — confirms Tailwind v3.4 and warm UMKM identity constraints.

  **Acceptance Criteria**:
  - [ ] `tailwind.config.ts` maps project colors to the existing CSS variable vocabulary.
  - [ ] `src/app/layout.tsx` uses the warm background, not cool-gray hardcoded color.
  - [ ] `npm run typecheck` passes.
  - [ ] `npm run test` passes.

  **QA Scenarios**:
  ```text
  Scenario: Root background uses warm token
    Tool: Bash + Playwright
    Preconditions: Dev server running via npm run dev.
    Steps:
      1. Navigate to http://localhost:3000/login.
      2. Evaluate document.body computed backgroundColor.
      3. Compare it to the warm token expected from --bg, not #F5F7FA.
    Expected Result: Body background matches warm app background.
    Failure Indicators: Body background remains rgb(245, 247, 250) or another cool gray.
    Evidence: .omo/evidence/task-1-root-bg.json

  Scenario: Config alignment does not break build pipeline
    Tool: Bash
    Preconditions: Dependencies installed.
    Steps:
      1. Run npm run typecheck.
      2. Run npm run test.
    Expected Result: Both commands exit 0.
    Failure Indicators: TypeScript or Vitest failure.
    Evidence: .omo/evidence/task-1-commands.txt
  ```

  **Evidence to Capture**:
  - [ ] `.omo/evidence/task-1-root-bg.json`
  - [ ] `.omo/evidence/task-1-commands.txt`

  **Commit**: YES
  - Message: `style(tokens): align warm theme foundation`
  - Files: `tailwind.config.ts`, `src/app/layout.tsx`
  - Pre-commit: `npm run typecheck && npm run test`

- [x] 2. Decoration cleanup and motion discipline

  **What to do**:
  - Review decorative utilities in `src/app/globals.css` flagged as visual noise.
  - Remove or reduce unused/overbearing mesh, grain, float, and dot-pattern utilities only where not required.
  - Keep intentional warm depth, card shadows, transitions, and reduced-motion support.

  **Must NOT do**:
  - Do not make the site visually flat.
  - Do not add animation libraries.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering` — visual polish and CSS judgement.
  - **Skills**: [`frontend-ui-ux`]
  - **Skills Evaluated but Omitted**: `ai-slop-remover` — task spans visual system decisions, not one file only.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 5-16
  - **Blocked By**: None

  **References**:
  - `src/app/globals.css` — decorative utilities, transitions, reduced-motion rules.
  - `.omo/drafts/ui-overhaul-pro-max.md` — prior audit flagged decoration overload.
  - `.omo/notepads/ui-upgrade-umkm-tahu/learnings.md` — prior execution learnings.

  **Acceptance Criteria**:
  - [ ] Unused or excessive decoration utilities are removed/reduced.
  - [ ] Reduced motion behavior remains present.
  - [ ] No dependency added.
  - [ ] `npm run typecheck` and `npm run test` pass.

  **QA Scenarios**:
  ```text
  Scenario: Landing/auth pages keep atmosphere without visual noise
    Tool: Playwright
    Preconditions: Dev server running.
    Steps:
      1. Navigate to /login at 1280x800.
      2. Capture screenshot.
      3. Confirm no full-page harsh mesh/grain overlays obscure text by checking screenshot and computed opacity of decorative layers if present.
    Expected Result: Page has warm depth while text remains readable.
    Failure Indicators: Background overlays reduce readability or dominate content.
    Evidence: .omo/evidence/task-2-login-decoration.png

  Scenario: Reduced-motion preference remains respected
    Tool: Playwright
    Preconditions: Dev server running.
    Steps:
      1. Emulate prefers-reduced-motion: reduce.
      2. Navigate to /beranda.
      3. Inspect a transition/animation target computed animationDuration.
    Expected Result: Motion is disabled or significantly reduced per CSS policy.
    Failure Indicators: Persistent looping animation under reduced motion.
    Evidence: .omo/evidence/task-2-reduced-motion.json
  ```

  **Evidence to Capture**:
  - [ ] `.omo/evidence/task-2-login-decoration.png`
  - [ ] `.omo/evidence/task-2-reduced-motion.json`

  **Commit**: YES
  - Message: `style(css): refine decorative motion system`
  - Files: `src/app/globals.css`
  - Pre-commit: `npm run typecheck && npm run test`

- [x] 3. Copy language audit map

  **What to do**:
  - Audit all user-facing page copy across the 9 user-facing routes.
  - Create a replacement map for full Bahasa Indonesia warmth without changing field names, database keys, server action names, or internal identifiers.
  - Apply only copy changes that improve clarity and local UMKM tone.

  **Must NOT do**:
  - Do not change schema terminology or server-side data contracts.
  - Do not translate code identifiers.

  **Recommended Agent Profile**:
  - **Category**: `writing` — microcopy and localized language quality.
  - **Skills**: []
  - **Skills Evaluated but Omitted**: `frontend-ui-ux` — aesthetic direction already chosen; task is copy-focused.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 5-13
  - **Blocked By**: None

  **References**:
  - `AGENTS.md` — microcopy standards such as “Uang Masuk”, “Uang Keluar”, “Belum Dibayar”.
  - `project_brief.md` — domain vocabulary and target UMKM user.
  - `src/app/**/page.tsx` — route-level user-facing copy.

  **Acceptance Criteria**:
  - [ ] User-facing copy is Bahasa Indonesia across landing/auth/app screens.
  - [ ] Internal identifiers and data contracts are unchanged.
  - [ ] Copy avoids cold corporate wording and matches UMKM local tone.
  - [ ] `npm run typecheck` passes.

  **QA Scenarios**:
  ```text
  Scenario: Main routes use Bahasa Indonesia visual copy
    Tool: Bash
    Preconditions: Source files available.
    Steps:
      1. Search `src/app` for obvious English UI phrases introduced by the polish.
      2. Inspect route page text literals for Bahasa Indonesia equivalents.
    Expected Result: No prominent English CTA/heading remains unless already part of a proper noun.
    Failure Indicators: Headings like "Dashboard", "Settings", "Add Expense" remain visible.
    Evidence: .omo/evidence/task-3-copy-audit.txt

  Scenario: Data contracts unchanged
    Tool: Bash
    Preconditions: Git available.
    Steps:
      1. Compare changed-file list against `src/server`, `src/domain`, `src/types` using available workspace diff/status tooling or direct file inspection.
      2. Confirm no field/key rename occurred.
    Expected Result: No server/domain/type contract changes caused by copy polish.
    Failure Indicators: Renamed schema keys, action names, or domain function names.
    Evidence: .omo/evidence/task-3-contract-scope.txt
  ```

  **Evidence to Capture**:
  - [ ] `.omo/evidence/task-3-copy-audit.txt`
  - [ ] `.omo/evidence/task-3-contract-scope.txt`

  **Commit**: YES
  - Message: `content(ui): localize umkm microcopy`
  - Files: `src/app/**/*.tsx`, UI text only
  - Pre-commit: `npm run typecheck`

- [x] 4. QA harness and route screenshot checklist

  **What to do**:
  - Define exact QA route list and evidence filenames.
  - Ensure executor starts `npm run dev` before browser QA.
  - Prepare desktop 1280×800 and mobile 375×812 checks for every route.

  **Must NOT do**:
  - Do not install Playwright as a dependency unless separately approved.
  - Do not rely on “manually verify”.

  **Recommended Agent Profile**:
  - **Category**: `quick` — verification checklist setup.
  - **Skills**: [`playwright`]
  - **Skills Evaluated but Omitted**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 15
  - **Blocked By**: None

  **References**:
  - Route inventory from plan context — 9 user-facing routes.
  - `package.json` — `npm run dev`, `npm run typecheck`, `npm run test`, `npm run build` scripts.
  - `vitest.config.ts` — test environment.

  **Acceptance Criteria**:
  - [ ] QA checklist includes `/`, `/login`, `/register`, `/beranda`, `/catat`, `/catat/penjualan`, `/catat/pengeluaran`, `/piutang`, `/pengaturan`.
  - [ ] Evidence naming is deterministic.
  - [ ] Dev server startup is included before Playwright steps.

  **QA Scenarios**:
  ```text
  Scenario: Route checklist is complete
    Tool: Bash
    Preconditions: Plan file exists.
    Steps:
      1. Compare checklist routes against `src/app/**/page.tsx` inventory.
      2. Confirm every page route has desktop and mobile evidence path.
    Expected Result: 9 routes x 2 viewport evidence paths exist in checklist.
    Failure Indicators: Missing route or missing viewport.
    Evidence: .omo/evidence/task-4-route-checklist.txt

  Scenario: Dev server requirement is explicit
    Tool: Bash
    Preconditions: Plan file exists.
    Steps:
      1. Search verification instructions for `npm run dev`.
      2. Confirm Playwright QA depends on running localhost.
    Expected Result: Browser QA cannot be attempted without dev server startup step.
    Failure Indicators: Playwright steps omit localhost/server precondition.
    Evidence: .omo/evidence/task-4-devserver-check.txt
  ```

  **Evidence to Capture**:
  - [ ] `.omo/evidence/task-4-route-checklist.txt`
  - [ ] `.omo/evidence/task-4-devserver-check.txt`

  **Commit**: NO

- [ ] 5. Landing page narrative polish

  **What to do**:
  - Polish `src/app/page.tsx` as the opening pitch for the UMKM tahu expense product.
  - Make the narrative clear: problem, local solution, core benefit, and action path to login/register.
  - Use warm local identity and Bahasa Indonesia copy.

  **Must NOT do**:
  - Do not add new routes or product features.
  - Do not introduce charts or dependencies.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering` — visual storytelling and landing polish.
  - **Skills**: [`frontend-ui-ux`]
  - **Skills Evaluated but Omitted**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 8, 15, 16
  - **Blocked By**: 1, 2, 3

  **References**:
  - `src/app/page.tsx` — root landing page.
  - `src/app/globals.css` — warm token and button/card utilities.
  - `project_brief.md` — product problem and UMKM target user.

  **Acceptance Criteria**:
  - [ ] Landing page explains product value in Bahasa Indonesia within first viewport.
  - [ ] Primary CTA path to auth is visually obvious.
  - [ ] No new dependencies or routes.
  - [ ] Desktop and mobile layout do not overflow.

  **QA Scenarios**:
  ```text
  Scenario: Landing first viewport communicates product value
    Tool: Playwright
    Preconditions: Dev server running.
    Steps:
      1. Set viewport 1280x800 and open /.
      2. Capture screenshot.
      3. Assert visible heading contains UMKM/tahu/expense value in Bahasa Indonesia.
      4. Assert a primary auth CTA is visible above the fold.
    Expected Result: Judge can understand the app from first screen.
    Failure Indicators: Generic hero copy, missing CTA, or English default copy.
    Evidence: .omo/evidence/task-5-landing-desktop.png

  Scenario: Landing mobile has no horizontal overflow
    Tool: Playwright
    Preconditions: Dev server running.
    Steps:
      1. Set viewport 375x812 and open /.
      2. Compare documentElement.scrollWidth to clientWidth.
      3. Capture screenshot.
    Expected Result: scrollWidth <= clientWidth and content remains readable.
    Failure Indicators: Horizontal scrolling or clipped CTA.
    Evidence: .omo/evidence/task-5-landing-mobile.png
  ```

  **Evidence to Capture**:
  - [ ] `.omo/evidence/task-5-landing-desktop.png`
  - [ ] `.omo/evidence/task-5-landing-mobile.png`

  **Commit**: YES
  - Message: `style(landing): sharpen umkm product narrative`
  - Files: `src/app/page.tsx`
  - Pre-commit: `npm run typecheck && npm run test`

- [x] 6. Login page warm identity rebuild

  **What to do**:
  - Rebuild `src/app/login/page.tsx` visual styling to match warm app tokens.
  - Keep existing login behavior intact.
  - Improve mock dashboard preview so it feels like the same product as `/beranda`.

  **Must NOT do**:
  - Do not change authentication logic.
  - Do not add fields or validation behavior beyond visual styling.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering` — auth page visual identity work.
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 8, 15, 16
  - **Blocked By**: 1, 2, 3

  **References**:
  - `src/app/login/page.tsx` — current hardcoded visual page.
  - `src/app/beranda/page.tsx` — visual/dashboard pattern to echo.
  - `src/components/metric-card.tsx` — metric card pattern.
  - `src/app/globals.css` — tokens and form/button utilities.

  **Acceptance Criteria**:
  - [ ] Login page uses warm CSS variables or project utilities, not isolated hardcoded theme.
  - [ ] Login form labels/errors remain functional.
  - [ ] Visual dashboard mockup resembles the app’s actual dashboard language.

  **QA Scenarios**:
  ```text
  Scenario: Login page matches warm identity
    Tool: Playwright
    Preconditions: Dev server running.
    Steps:
      1. Open /login at 1280x800.
      2. Capture screenshot.
      3. Assert email/password fields and submit button are visible.
      4. Evaluate key surface colors use warm tokens rather than cool gray/purple block styling.
    Expected Result: Login visually belongs to the same warm UMKM product.
    Failure Indicators: Solid disjoint purple panel, cool-gray background, missing auth fields.
    Evidence: .omo/evidence/task-6-login-desktop.png

  Scenario: Login invalid state remains usable
    Tool: Playwright
    Preconditions: Dev server running.
    Steps:
      1. Open /login at 375x812.
      2. Submit with empty required fields.
      3. Assert browser/app validation is visible and form remains readable.
    Expected Result: Invalid login state is clear without layout break.
    Failure Indicators: Error/validation text clipped, submit button inaccessible.
    Evidence: .omo/evidence/task-6-login-invalid-mobile.png
  ```

  **Evidence to Capture**:
  - [ ] `.omo/evidence/task-6-login-desktop.png`
  - [ ] `.omo/evidence/task-6-login-invalid-mobile.png`

  **Commit**: YES
  - Message: `style(auth): warm up login experience`
  - Files: `src/app/login/page.tsx`
  - Pre-commit: `npm run typecheck && npm run test`

- [ ] 7. Register page warm identity rebuild

  **What to do**:
  - Rebuild `src/app/register/page.tsx` to visually pair with login.
  - Keep registration behavior intact.
  - Use warm local UMKM copy and clear onboarding hierarchy.

  **Must NOT do**:
  - Do not change auth/server behavior.
  - Do not add onboarding steps or new pages.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 8, 15, 16
  - **Blocked By**: 1, 2, 3

  **References**:
  - `src/app/register/page.tsx` — current register page.
  - `src/app/login/page.tsx` — paired auth visual pattern.
  - `src/app/globals.css` — form and card tokens.

  **Acceptance Criteria**:
  - [ ] Register visually matches login and app shell identity.
  - [ ] Form behavior and required inputs are preserved.
  - [ ] Bahasa Indonesia copy explains setup benefit for UMKM owner.

  **QA Scenarios**:
  ```text
  Scenario: Register page pairs with login
    Tool: Playwright
    Preconditions: Dev server running.
    Steps:
      1. Open /register at 1280x800.
      2. Capture screenshot.
      3. Assert register form fields and login link are visible.
    Expected Result: Register feels like the same auth system as login.
    Failure Indicators: Disjoint solid-purple panel or missing form/link.
    Evidence: .omo/evidence/task-7-register-desktop.png

  Scenario: Register mobile remains usable
    Tool: Playwright
    Preconditions: Dev server running.
    Steps:
      1. Open /register at 375x812.
      2. Assert no horizontal overflow.
      3. Submit empty form and confirm validation does not break layout.
    Expected Result: Register flow remains readable and usable on mobile.
    Failure Indicators: Horizontal overflow, clipped input, inaccessible submit.
    Evidence: .omo/evidence/task-7-register-mobile.png
  ```

  **Evidence to Capture**:
  - [ ] `.omo/evidence/task-7-register-desktop.png`
  - [ ] `.omo/evidence/task-7-register-mobile.png`

  **Commit**: YES
  - Message: `style(auth): align register experience`
  - Files: `src/app/register/page.tsx`
  - Pre-commit: `npm run typecheck && npm run test`

- [ ] 8. Auth/landing tests-after updates

  **What to do**:
  - Add or update Vitest component/page-adjacent tests only if auth/landing extracted reusable components or altered testable composition.
  - Prefer behavior/visible-text assertions over brittle visual snapshots.
  - Run Wave 2 verification.

  **Must NOT do**:
  - Do not create brittle tests tied to exact class strings unless testing a shared component contract.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 finalizer
  - **Blocks**: 16
  - **Blocked By**: 5, 6, 7

  **References**:
  - `src/components/*.test.tsx` — existing test style.
  - `vitest.config.ts` — jsdom test setup.
  - `package.json` — scripts.

  **Acceptance Criteria**:
  - [ ] Relevant tests added/updated if reusable components changed.
  - [ ] `npm run typecheck` passes.
  - [ ] `npm run test` passes.

  **QA Scenarios**:
  ```text
  Scenario: Auth/landing wave commands pass
    Tool: Bash
    Preconditions: Tasks 5-7 complete.
    Steps:
      1. Run npm run typecheck.
      2. Run npm run test.
    Expected Result: Both commands exit 0.
    Failure Indicators: Type or test failure.
    Evidence: .omo/evidence/task-8-auth-tests.txt

  Scenario: Test additions are behavior-focused
    Tool: Bash
    Preconditions: Test diff exists or no test update was needed.
    Steps:
      1. Inspect changed test files.
      2. Confirm tests query visible text/roles rather than screenshot-like class dumps.
    Expected Result: Tests follow existing behavior-focused style.
    Failure Indicators: Brittle tests asserting many exact style classes.
    Evidence: .omo/evidence/task-8-test-style.txt
  ```

  **Evidence to Capture**:
  - [ ] `.omo/evidence/task-8-auth-tests.txt`
  - [ ] `.omo/evidence/task-8-test-style.txt`

  **Commit**: YES
  - Message: `test(auth): cover polished auth surfaces`
  - Files: test files as needed
  - Pre-commit: `npm run typecheck && npm run test`

- [x] 9. Beranda dashboard hierarchy polish

  **What to do**:
  - Polish `src/app/beranda/page.tsx` hierarchy for a strong hackathon dashboard moment.
  - Emphasize “kesehatan usaha hari ini”, money in/out, profit/loss clarity, and next best actions.
  - Preserve existing data queries and calculations.

  **Must NOT do**:
  - Do not add charts or new analytics features.
  - Do not change domain finance logic.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: 12, 15, 16
  - **Blocked By**: 1, 2, 3

  **References**:
  - `src/app/beranda/page.tsx` — dashboard surface.
  - `src/components/metric-card.tsx` — stat card pattern.
  - `src/lib/format.ts` — Rupiah formatting.
  - `src/domain/finance.ts` — calculations must remain unchanged.

  **Acceptance Criteria**:
  - [ ] Dashboard has exactly one visible h1-level page heading.
  - [ ] Profit/loss state uses consistent semantic colors.
  - [ ] No calculation/query behavior changes.
  - [ ] Mobile 375px layout has no horizontal overflow.

  **QA Scenarios**:
  ```text
  Scenario: Dashboard desktop hero is clear
    Tool: Playwright
    Preconditions: Dev server running and route accessible.
    Steps:
      1. Open /beranda at 1280x800.
      2. Capture screenshot.
      3. Capture accessibility snapshot and count h1 headings.
    Expected Result: One h1, clear financial hero, visible next actions.
    Failure Indicators: Multiple h1s, hidden primary metrics, confusing hierarchy.
    Evidence: .omo/evidence/task-9-beranda-desktop.png

  Scenario: Dashboard mobile does not overflow
    Tool: Playwright
    Preconditions: Dev server running.
    Steps:
      1. Open /beranda at 375x812.
      2. Compare scrollWidth to clientWidth.
      3. Capture screenshot.
    Expected Result: No horizontal overflow; cards stack cleanly.
    Failure Indicators: Clipped money values or horizontal scroll.
    Evidence: .omo/evidence/task-9-beranda-mobile.png
  ```

  **Evidence to Capture**:
  - [ ] `.omo/evidence/task-9-beranda-desktop.png`
  - [ ] `.omo/evidence/task-9-beranda-mobile.png`

  **Commit**: YES
  - Message: `style(dashboard): sharpen financial hierarchy`
  - Files: `src/app/beranda/page.tsx`
  - Pre-commit: `npm run typecheck && npm run test`

- [ ] 10. Catat menu and sales form polish

  **What to do**:
  - Polish `src/app/catat/page.tsx` and `src/app/catat/penjualan/page.tsx` for clear action choice and sales recording.
  - Improve spacing, section hierarchy, copy clarity, and preview relationship.
  - Preserve form field names and server action behavior.

  **Must NOT do**:
  - Do not change sales submission logic.
  - Do not introduce new sale fields.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: 12, 15, 16
  - **Blocked By**: 1, 2, 3

  **References**:
  - `src/app/catat/page.tsx` — record menu choice cards.
  - `src/app/catat/penjualan/page.tsx` — sales form.
  - `src/components/form-section.tsx` — section pattern.
  - `src/components/sales-form-preview.tsx` — live receipt preview.

  **Acceptance Criteria**:
  - [ ] Catat menu clearly distinguishes sales vs expense actions.
  - [ ] Sales form sections have clear Bahasa Indonesia labels and helper text.
  - [ ] Live preview remains functional.
  - [ ] Existing tests pass.

  **QA Scenarios**:
  ```text
  Scenario: Catat menu action choice is obvious
    Tool: Playwright
    Preconditions: Dev server running.
    Steps:
      1. Open /catat at 1280x800.
      2. Assert links to /catat/penjualan and /catat/pengeluaran are visible.
      3. Capture screenshot.
    Expected Result: User can immediately choose what to record.
    Failure Indicators: Ambiguous CTA or missing route links.
    Evidence: .omo/evidence/task-10-catat-menu.png

  Scenario: Sales preview updates from form input
    Tool: Playwright
    Preconditions: Dev server running.
    Steps:
      1. Open /catat/penjualan at 1280x800.
      2. Fill concrete sale data: pembeli "Warung Bu Sari", jumlah 20, harga 15000.
      3. Assert preview contains "Warung Bu Sari" and formatted Rupiah value.
      4. Capture screenshot.
    Expected Result: Preview reflects entered sale data without layout break.
    Failure Indicators: Preview stale, NaN, unformatted number, or clipped receipt.
    Evidence: .omo/evidence/task-10-sales-preview.png
  ```

  **Evidence to Capture**:
  - [ ] `.omo/evidence/task-10-catat-menu.png`
  - [ ] `.omo/evidence/task-10-sales-preview.png`

  **Commit**: YES
  - Message: `style(record): polish sales recording flow`
  - Files: `src/app/catat/page.tsx`, `src/app/catat/penjualan/page.tsx`, sales preview if needed
  - Pre-commit: `npm run typecheck && npm run test`

- [ ] 11. Expense form and receipt preview polish

  **What to do**:
  - Polish `src/app/catat/pengeluaran/page.tsx` and `src/components/expense-form-preview.tsx`.
  - Make expense category, data status, and cost meaning visually clear.
  - Preserve form field names, server action behavior, and calculation display.

  **Must NOT do**:
  - Do not change expense categories or database fields.
  - Do not alter server-side create expense behavior.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: 12, 15, 16
  - **Blocked By**: 1, 2, 3

  **References**:
  - `src/app/catat/pengeluaran/page.tsx` — expense form.
  - `src/components/expense-form-preview.tsx` — live expense receipt.
  - `src/components/form-section.tsx` — form section layout.
  - `src/lib/format.ts` — Rupiah formatting.

  **Acceptance Criteria**:
  - [ ] Expense form maintains visual hierarchy across sections.
  - [ ] Receipt preview handles empty and filled states gracefully.
  - [ ] Error/invalid states are readable on mobile.
  - [ ] Existing expense preview tests pass or are updated.

  **QA Scenarios**:
  ```text
  Scenario: Expense preview updates from form input
    Tool: Playwright
    Preconditions: Dev server running.
    Steps:
      1. Open /catat/pengeluaran at 1280x800.
      2. Fill concrete expense data: nama "Kedelai 25kg", jumlah 1, harga 350000.
      3. Assert preview contains "Kedelai 25kg" and a formatted Rupiah amount.
      4. Capture screenshot.
    Expected Result: Expense receipt preview updates correctly and stays readable.
    Failure Indicators: NaN, stale values, clipped preview, or unreadable amount.
    Evidence: .omo/evidence/task-11-expense-preview.png

  Scenario: Expense invalid state is readable
    Tool: Playwright
    Preconditions: Dev server running.
    Steps:
      1. Open /catat/pengeluaran at 375x812.
      2. Submit with missing required fields.
      3. Assert validation/error indication is visible and not clipped.
      4. Capture screenshot.
    Expected Result: Invalid state is clear and mobile-safe.
    Failure Indicators: Hidden validation, clipped error, inaccessible submit.
    Evidence: .omo/evidence/task-11-expense-invalid-mobile.png
  ```

  **Evidence to Capture**:
  - [ ] `.omo/evidence/task-11-expense-preview.png`
  - [ ] `.omo/evidence/task-11-expense-invalid-mobile.png`

  **Commit**: YES
  - Message: `style(expense): clarify expense recording flow`
  - Files: `src/app/catat/pengeluaran/page.tsx`, `src/components/expense-form-preview.tsx`
  - Pre-commit: `npm run typecheck && npm run test`

- [ ] 12. Core screen tests-after updates

  **What to do**:
  - Update Vitest tests for changed reusable components/previews from Tasks 9-11.
  - Add behavior-focused tests for any newly introduced reusable UI composition.
  - Run Wave 3 verification.

  **Must NOT do**:
  - Do not create visual snapshot tests as a substitute for browser QA.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 finalizer
  - **Blocks**: 16
  - **Blocked By**: 9, 10, 11

  **References**:
  - `src/components/sales-form-preview.test.tsx` — sales preview test style.
  - `src/components/expense-form-preview.test.tsx` — expense preview test style.
  - `src/components/form-section.test.tsx` — shared section test style.

  **Acceptance Criteria**:
  - [ ] Changed component tests pass.
  - [ ] `npm run typecheck` passes.
  - [ ] `npm run test` passes.

  **QA Scenarios**:
  ```text
  Scenario: Core UI test suite passes
    Tool: Bash
    Preconditions: Tasks 9-11 complete.
    Steps:
      1. Run npm run typecheck.
      2. Run npm run test.
    Expected Result: Both commands exit 0.
    Failure Indicators: Any type or test failure.
    Evidence: .omo/evidence/task-12-core-tests.txt

  Scenario: Preview tests still cover filled states
    Tool: Bash
    Preconditions: Test files available.
    Steps:
      1. Inspect sales and expense preview tests.
      2. Confirm tests cover filled input and formatted Rupiah output.
    Expected Result: Preview behavior coverage remains present.
    Failure Indicators: Filled-state assertions removed or skipped.
    Evidence: .omo/evidence/task-12-preview-coverage.txt
  ```

  **Evidence to Capture**:
  - [ ] `.omo/evidence/task-12-core-tests.txt`
  - [ ] `.omo/evidence/task-12-preview-coverage.txt`

  **Commit**: YES
  - Message: `test(ui): update core screen coverage`
  - Files: test files as needed
  - Pre-commit: `npm run typecheck && npm run test`

- [ ] 13. Piutang and Pengaturan polish

  **What to do**:
  - Polish `src/app/piutang/page.tsx` and `src/app/pengaturan/page.tsx` for consistency with the dashboard and forms.
  - Make receivables/payment status and business assumptions visually scannable.
  - Preserve existing forms, names, and server actions.

  **Must NOT do**:
  - Do not add reports, exports, or payment history features.
  - Do not alter production assumption formulas.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4
  - **Blocks**: 15, 16
  - **Blocked By**: 1, 2, 3

  **References**:
  - `src/app/piutang/page.tsx` — receivables list and payment forms.
  - `src/app/pengaturan/page.tsx` — settings/assumptions forms.
  - `src/components/status-badge.tsx` — payment/data status style.
  - `src/components/info-banner.tsx` — contextual guidance pattern.

  **Acceptance Criteria**:
  - [ ] Piutang status hierarchy is clear for unpaid vs paid items.
  - [ ] Pengaturan assumptions are readable and locally understandable.
  - [ ] No server action, formula, or schema changes.
  - [ ] Mobile layouts do not overflow.

  **QA Scenarios**:
  ```text
  Scenario: Piutang page is scannable
    Tool: Playwright
    Preconditions: Dev server running.
    Steps:
      1. Open /piutang at 1280x800.
      2. Capture screenshot.
      3. Assert page heading and payment status badges are visible when data exists, or EmptyState is visible when no data exists.
    Expected Result: Receivable state is understandable without explanation.
    Failure Indicators: Ambiguous status, missing empty state, or cluttered cards.
    Evidence: .omo/evidence/task-13-piutang-desktop.png

  Scenario: Pengaturan mobile assumptions remain readable
    Tool: Playwright
    Preconditions: Dev server running.
    Steps:
      1. Open /pengaturan at 375x812.
      2. Assert no horizontal overflow.
      3. Capture screenshot.
    Expected Result: Settings fields and helper text are readable on mobile.
    Failure Indicators: Clipped labels, horizontal scroll, unreadable helper copy.
    Evidence: .omo/evidence/task-13-pengaturan-mobile.png
  ```

  **Evidence to Capture**:
  - [ ] `.omo/evidence/task-13-piutang-desktop.png`
  - [ ] `.omo/evidence/task-13-pengaturan-mobile.png`

  **Commit**: YES
  - Message: `style(settings): polish support screens`
  - Files: `src/app/piutang/page.tsx`, `src/app/pengaturan/page.tsx`
  - Pre-commit: `npm run typecheck && npm run test`

- [ ] 14. AppShell mobile nav and responsive sweep

  **What to do**:
  - Review `src/components/app-shell.tsx` for header, desktop nav, mobile bottom nav, and FAB behavior.
  - Ensure the shell supports polished screens at 375, 768, 1024, and 1440 widths.
  - Tune spacing only; preserve navigation routes and behavior.

  **Must NOT do**:
  - Do not add or remove navigation destinations.
  - Do not change logout behavior.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4
  - **Blocks**: 15, 16
  - **Blocked By**: 5-13

  **References**:
  - `src/components/app-shell.tsx` — navigation shell.
  - `src/app/globals.css` — app container spacing and nav styles.
  - `src/components/page-header.tsx` — page heading pattern.

  **Acceptance Criteria**:
  - [ ] Mobile bottom nav remains reachable and does not cover primary form submit actions.
  - [ ] Desktop header/nav active states remain clear.
  - [ ] No route or logout behavior change.
  - [ ] No horizontal overflow at 375px on all user-facing routes.

  **QA Scenarios**:
  ```text
  Scenario: Mobile bottom nav does not block forms
    Tool: Playwright
    Preconditions: Dev server running.
    Steps:
      1. Open /catat/penjualan at 375x812.
      2. Scroll to bottom of form.
      3. Assert submit button is visible and not overlapped by bottom nav.
      4. Capture screenshot.
    Expected Result: Form submit remains accessible above nav clearance.
    Failure Indicators: Submit button hidden behind nav/FAB.
    Evidence: .omo/evidence/task-14-mobile-nav-form.png

  Scenario: Desktop active nav is clear
    Tool: Playwright
    Preconditions: Dev server running.
    Steps:
      1. Open /beranda at 1280x800.
      2. Assert Beranda nav item has active styling.
      3. Capture screenshot.
    Expected Result: Current route is visually identifiable.
    Failure Indicators: No active state or wrong nav item highlighted.
    Evidence: .omo/evidence/task-14-desktop-nav.png
  ```

  **Evidence to Capture**:
  - [ ] `.omo/evidence/task-14-mobile-nav-form.png`
  - [ ] `.omo/evidence/task-14-desktop-nav.png`

  **Commit**: YES
  - Message: `style(shell): refine navigation responsiveness`
  - Files: `src/components/app-shell.tsx`, `src/app/globals.css` if needed
  - Pre-commit: `npm run typecheck && npm run test`

- [ ] 15. Full-route browser QA evidence capture

  **What to do**:
  - Start `npm run dev` and capture browser QA evidence for all user-facing routes.
  - Use desktop 1280×800 and mobile 375×812.
  - Capture accessibility snapshot for `/beranda` and verify exactly one h1-level heading.

  **Must NOT do**:
  - Do not mark any route as “visually okay” without screenshot evidence.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`playwright`]

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4
  - **Blocks**: 16, F1-F4
  - **Blocked By**: 4-14

  **References**:
  - `package.json` — dev server script.
  - Route inventory in this plan.
  - `.omo/evidence/` — evidence destination.

  **Acceptance Criteria**:
  - [ ] Desktop screenshots exist for `/`, `/login`, `/register`, `/beranda`, `/catat`, `/catat/penjualan`, `/catat/pengeluaran`, `/piutang`, `/pengaturan`.
  - [ ] Mobile screenshots exist for the same routes.
  - [ ] `/beranda` accessibility snapshot has exactly one h1-level heading.
  - [ ] Every route has no horizontal overflow at 375×812.

  **QA Scenarios**:
  ```text
  Scenario: All routes have desktop and mobile screenshots
    Tool: Playwright
    Preconditions: npm run dev is running at localhost:3000.
    Steps:
      1. For each route, set viewport 1280x800 and capture screenshot.
      2. For each route, set viewport 375x812 and capture screenshot.
      3. Save files under .omo/evidence/full-route-qa/.
    Expected Result: 18 screenshots exist and all routes load without console-breaking visual errors.
    Failure Indicators: Missing screenshot, route error, horizontal overflow.
    Evidence: .omo/evidence/full-route-qa/report.md

  Scenario: Beranda accessibility heading check
    Tool: Playwright
    Preconditions: npm run dev is running.
    Steps:
      1. Open /beranda.
      2. Capture accessibility snapshot.
      3. Count heading level 1 nodes.
    Expected Result: Exactly one h1-level heading.
    Failure Indicators: Zero or multiple h1-level headings.
    Evidence: .omo/evidence/task-15-beranda-a11y.json
  ```

  **Evidence to Capture**:
  - [ ] `.omo/evidence/full-route-qa/report.md`
  - [ ] `.omo/evidence/task-15-beranda-a11y.json`

  **Commit**: NO

- [ ] 16. Build/test/typecheck verification and cleanup

  **What to do**:
  - Run final implementation-wave verification commands.
  - Inspect changed files for prohibited scope changes and debug leftovers.
  - Ensure no new dependencies were added unless explicitly approved.

  **Must NOT do**:
  - Do not skip failed verification.
  - Do not hide unrelated changes.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4 finalizer
  - **Blocks**: F1-F4
  - **Blocked By**: 8, 12, 13, 14, 15

  **References**:
  - `package.json` — verification scripts.
  - `package-lock.json` — lockfile/dependency changes are out of scope unless separately approved.
  - Guardrails in this plan.

  **Acceptance Criteria**:
  - [ ] `npm run typecheck` exits 0.
  - [ ] `npm run test` exits 0.
  - [ ] `npm run build` exits 0.
  - [ ] Changed-file inspection shows no server/schema/domain logic changes except tests if explicitly justified.
  - [ ] No debug `console.log`, commented-out code, or unused imports remain.

  **QA Scenarios**:
  ```text
  Scenario: Final commands pass
    Tool: Bash
    Preconditions: Tasks 1-15 complete.
    Steps:
      1. Run npm run typecheck.
      2. Run npm run test.
      3. Run npm run build.
    Expected Result: All commands exit 0.
    Failure Indicators: Any command exits non-zero.
    Evidence: .omo/evidence/task-16-final-commands.txt

  Scenario: Scope guardrails are clean
    Tool: Bash
    Preconditions: Git diff available.
    Steps:
      1. Inspect changed files affecting package manifests, lockfiles, `src/server`, `src/domain`, and `src/types`.
      2. Search changed files for console.log and commented-out blocks.
      3. Confirm no new dependency or server/schema logic change.
    Expected Result: Diff stays within frontend polish scope.
    Failure Indicators: New dependency, Supabase schema/server action changes, debug leftovers.
    Evidence: .omo/evidence/task-16-scope-inspection.txt
  ```

  **Evidence to Capture**:
  - [ ] `.omo/evidence/task-16-final-commands.txt`
  - [ ] `.omo/evidence/task-16-scope-inspection.txt`

  **Commit**: YES
  - Message: `chore(ui): verify frontend polish`
  - Files: evidence/checklist docs only if tracked; otherwise no commit needed
  - Pre-commit: `npm run typecheck && npm run test && npm run build`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each Must Have, verify implementation exists using files, commands, and browser evidence. For each Must NOT Have, search codebase for forbidden changes. Check evidence files exist in `.omo/evidence/`. Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`.

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `npm run typecheck`, `npm run test`, and `npm run build`. Review changed files for debug leftovers, unused imports, broad rewrites, prop/API changes, server/schema changes, dependency changes, and AI slop. Output: `Build [PASS/FAIL] | Tests [PASS/FAIL] | Files [N clean/N issues] | VERDICT`.

- [ ] F3. **Real Manual QA** — `unspecified-high` + `playwright`
  Execute every QA scenario from Tasks 1-16. Capture missing evidence under `.omo/evidence/final-qa/`. Verify full route desktop/mobile screenshots and no horizontal overflow. Output: `Scenarios [N/N pass] | Routes [9/9] | Evidence [N/N] | VERDICT`.

- [ ] F4. **Scope Fidelity Check** — `deep`
  Compare actual diff against every task. Verify everything planned was built and nothing outside scope was added. Reject dark mode, new pages, charts, dependencies, server/schema/domain changes, or component API churn. Output: `Tasks [N/N compliant] | Scope Creep [CLEAN/N issues] | VERDICT`.

---

## Change Grouping Strategy

> This workspace is noted as **not a git repo** in project instructions. Treat these as logical checkpoints/change groups, not required git commits.

- **Foundation**: token and root layout alignment — `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/globals.css`.
- **Auth/Landing**: entry experience alignment — `src/app/page.tsx`, `src/app/login/page.tsx`, `src/app/register/page.tsx`.
- **Core Screens**: UMKM financial journey polish — dashboard, catat, form pages, previews.
- **Support Screens**: support screens and responsiveness — piutang, pengaturan, app shell.
- **Tests**: frontend polish coverage — changed tests only.

---

## Success Criteria

### Verification Commands
```bash
npm run typecheck  # Expected: exit 0
npm run test       # Expected: all tests pass
npm run build      # Expected: production build succeeds
```

### Final Checklist
- [ ] Full user journey feels cohesive from `/` through auth and app screens.
- [ ] Bahasa Indonesia copy is warm, practical, and UMKM-appropriate.
- [ ] Warm design tokens are consistently used.
- [ ] Desktop and mobile screenshots exist for all 9 user-facing routes.
- [ ] No horizontal overflow at 375×812.
- [ ] All Must NOT guardrails are respected.
- [ ] Final verification agents F1-F4 approve, then user gives explicit okay.
