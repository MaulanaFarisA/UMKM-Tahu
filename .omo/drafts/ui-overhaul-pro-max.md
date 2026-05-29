# Draft: UI Overhaul — Pembukuan Tahu (UI UX Pro Max)

## Original Request
> "i need you to check this website on everything that has been made. the ui ux and everything. i still feel that this website ui is bad and i need your evaluation for it. use the ui ux pro max repo to make this better and cleaner. no more old junk"

User wants: full UI/UX evaluation + clean rebuild grounded in the `ui-ux-pro-max` skill at `C:\Users\FARIS\CND-request-management\.opencode\skills\ui-ux-pro-max`. "No more old junk" = ready for surgical removal of accumulated visual noise / inline-style sprawl.

## Project Snapshot (verified from filesystem)
- Next.js 15.5 App Router, React 19, TypeScript 5.8, Tailwind v3.4
- Supabase (auth + DB w/ RLS), Vitest 3.2, lucide-react, Plus Jakarta Sans
- 12 routes: `/login`, `/register`, `/beranda`, `/catat`, `/catat/penjualan`, `/catat/pengeluaran`, `/piutang`, `/pengaturan` (+ root + 4 internal)
- 15 polish tasks already shipped (notepads/learnings.md, 578 lines of accumulated decisions)
- 98/98 tests passing, build clean, typecheck clean — code health is FINE; this is purely visual/UX

## Findings — What's Wrong (Evaluation)

### 1. Token system is fractured (HIGHEST LEVERAGE)
- `tailwind.config.ts` uses cool-gray `#F5F7FA`, purple `#6941C6`, ink `#101828` — a Untitled-UI-style theme.
- `globals.css` uses warm cream `#FBF8F1`, purple `#7C3AED`, charcoal `#1C1917` — the actual visual identity.
- Result: every page bypasses Tailwind utility classes (`bg-bg`, `text-ink-primary`) and uses `style={{ color: 'var(--...)' }}` inline. Reading the JSX is exhausting.
- Login/register pages don't even use CSS vars — they hardcode `#FFFDF7`, `#7C3AED`, `#FECACA` etc.

### 2. Inline-style sprawl (AI slop signature)
- `beranda/page.tsx` is 501 lines, of which ~180 lines are `style={{...}}` blocks.
- Same patterns repeated across 5+ files: card gradients, border-left accents, pill badges with bg+border+padding+letter-spacing inline.
- No `Button` / `Card` / `Stat` / `Pill` primitive — every page reinvents.

### 3. Visual decoration overload
- Hero card has: top accent bar gradient, status badge, margin pill with glassmorphism+backdrop-blur, money-hero, dashed divider, dot indicators, optional warning chip — 6 visual layers in one 300px card.
- Login dashboard mockup is a separate 90-line component with its own dot-pattern bg + 3 floating radial gradients + drop-shadow-filter — pure decoration.
- Every card has gradient backgrounds (`linear-gradient(135deg, ...)`) — when everything is a gradient, nothing reads as primary.
- `globals.css` has `.gradient-mesh-warm`, `.grain-overlay` (SVG noise), `.float`, `.float-slow`, `.dot-pattern`, body has fixed radial gradient mesh. Stacked decorations.

### 4. Information redundancy on Beranda
- "Uang Masuk" and the same number appear in: Hero card breakdown → Today stats row → (sometimes) Quick actions context.
- Receivables alert + month summary + secondary receivables CTA mention `/piutang` 3x.
- "Yang Perlu Dilakukan" next-action card duplicates the big quick-action CTAs at bottom.

### 5. Color signal-to-noise ratio is bad
- Single beranda view uses: green, red, amber, purple, warm cream, white, off-white, plus 4 gradients. No clear hierarchy of "this is the one thing".
- Profit-green and loss-red used both as accents AND as full-card gradient backgrounds, dilutes their meaning.

### 6. Mobile hierarchy is muddy
- Bottom nav FAB is heavy: 58×58 with 3px cream ring, sits -28px above nav, with a `pulse-ring` keyframe constantly animating.
- Top header is sticky with frosted blur. Bottom nav also has frosted blur. Two competing chrome surfaces.
- Header brand mark + page title both compete for attention in the header row.

### 7. Microcopy inconsistency
- AGENTS.md mandates "Belum Dibayar", but several spots still say "Belum Lunas".
- "Mau catat apa hari ini?" → button below says "Catat Penjualan / Catat Pengeluaran" — verb repeated, conversational tone broken.
- Mix of imperative ("Catat sekarang") and gentle ("Mau catat apa hari ini?") within same view.

### 8. Login/register pages are visually disjoint from the app
- Login uses pure hex everywhere, never touches CSS vars.
- The register right panel uses `linear-gradient(135deg, #7C3AED 0%, #6D28D9 50%, #5B21B6 100%)` — solid purple panel that contradicts the warm-cream identity inside the app.
- Two different vibes for "outside auth" vs "inside app".

## Requirements (confirmed via Question tool 2026-05-25)
- **Direction**: Refine warm-cream UMKM identity (keep purple accent, strip decorations, unify tokens, build primitives)
- **Scope**: All 12 routes + AppShell + globals.css + tailwind.config.ts reconciliation
- **Token strategy**: Reconcile `tailwind.config.ts` to match `globals.css` so Tailwind utilities like `bg-bg`, `text-ink-primary`, `text-accent` work natively. CSS vars stay as source of truth and feed into Tailwind theme via `colors: { bg: 'var(--bg)', ... }` pattern.
- **Tests**: Tests-after + agent QA via Playwright. Existing 98 tests must still pass. No new test framework setup.

## Technical Decisions
- **Identity**: warm-cream `#FBF8F1` bg + charcoal `#1C1917` ink + purple `#7C3AED` accent (CTA-only) + semantic profit/loss/warn (kept) + WHITE cards on cream bg
- **Decoration policy**: REMOVE body radial gradient mesh, `.gradient-mesh-warm`, `.grain-overlay`, `.float`/`.float-slow`, `.dot-pattern`, login mockup floating gradients. KEEP `:focus-visible` rings, `.slide-up` entrance, hover transitions on interactive elements.
- **Card policy**: WHITE bg, warm border, NO gradients on cards by default. Receipt-style colored left border allowed. Hero card retains a single subtle status-tinted gradient for the verdict — the ONE place gradient earns its keep.
- **Color hierarchy**: Profit-green and loss-red ONLY on money values, status badges, verdict hero. NEVER as full-card gradient backgrounds. Amber for receivables/warnings only. Purple ONLY for primary CTA.
- **Primitive extraction**: `Button`, `Card`, `StatTile`, `Pill`, `Section`, `MoneyValue`, `EmptyState` (already exists, audit it), `InfoBanner` (already exists, audit it), `StatusBadge` (already exists, audit it). All accept `variant`/`tone` props. Pages stop emitting inline styles.
- **Information density**: Beranda hero + 3-tile stat row + receivables alert (when present) + month summary + ONE quick-action block. Remove "Yang Perlu Dilakukan" duplication.
- **Login/register**: rebuild on warm-cream tokens. Drop dashboard mockup decorative floats. Drop solid-purple register right panel — replace with same warm cream + brand-accented illustration / brand mark composition.
- **AppShell**: simplify header (drop competing brand+title — use one). Remove FAB pulse-ring. Reduce frosted-blur layers (keep top header blur only). Tighten bottom nav.
- **Tailwind config**: extend `theme.colors` with semantic names that resolve to CSS vars: `bg`, `card`, `subtle`, `muted`, `border`, `border-strong`, `text-{primary,secondary,tertiary,muted}`, `accent`, `profit`, `loss`, `warn`, `info` — each with sub-shades matching globals.css. After reconciliation, pages can write `bg-card text-text-primary border-border` instead of inline styles.
- **Microcopy**: enforce AGENTS.md microcopy table everywhere. Remove all stale "Belum Lunas" -> "Belum Dibayar". Quick action buttons drop verb echo: "Penjualan / Pengeluaran" with subtitle, since the section heading is already "Mau catat apa hari ini?".

## Decoration Removal Hit List (concrete)
1. `globals.css`: delete `.gradient-mesh-warm`, `.grain-overlay`, `.float`, `.float-slow`, `.dot-pattern`, body `background-image: radial-gradient(...)`. Total ~30 lines.
2. `login/page.tsx`: delete 3 floating radial-gradient divs, `dot-pattern gradient-mesh` classes, `drop-shadow-filter` wrapper.
3. `register/page.tsx`: delete solid-purple right panel, replace with warm-cream brand panel.
4. `beranda/page.tsx`: delete "Yang Perlu Dilakukan" card (duplicates quick actions). Delete secondary actions desktop grid (use AppShell desktop nav). Delete mobile tail-CTA "Lihat semua tagihan" (the alert card already deep-links).
5. `app-shell.tsx`: delete `pulse-ring` keyframe usage on FAB. Delete competing brand+title pattern (use title only when present, brand only on Beranda).
6. `pengaturan/page.tsx`: production math card stays but loses its warn-bg gradient — flat subtle bg.
7. ALL pages: remove inline `style={{}}` blocks once primitives + reconciled Tailwind are in place.

## Research Findings
- ui-ux-pro-max skill at `C:/Users/FARIS/CND-request-management/.opencode/skills/ui-ux-pro-max/`
  - Generic `--design-system` output not directly applicable (returns landing-page templates). Use targeted domain searches in plan tasks: `--domain ux animation accessibility`, `--domain ux z-index loading`, `--domain typography neutral functional`, `--stack nextjs`.
  - Pre-delivery checklist (mandatory): no emoji icons, cursor-pointer on clickable, hover transitions 150-300ms, light-mode contrast 4.5:1, focus-visible, prefers-reduced-motion, responsive 375/768/1024/1440px.
- Existing strengths to preserve:
  - `formatRupiah()` consistency
  - `font-variant-numeric: tabular-nums` on money classes (alignment is good)
  - `min-w-0 truncate` patterns from Task 15 sweep (responsive safety nets)
  - Server-component-first architecture
  - All test infrastructure and test count (98/98)

## Open Questions — RESOLVED
- ~~Direction~~: Refine warm-cream
- ~~Scope~~: All 12 routes
- ~~Token resolution~~: Reconcile tailwind.config.ts -> CSS vars
- ~~Decoration cleanup~~: Remove (see hit list above)
- ~~Login redesign~~: Rebuild on warm-cream
- ~~Test strategy~~: Tests-after + Playwright
- ~~Component primitives~~: Extract Button/Card/StatTile/Pill/Section/MoneyValue + audit existing

## Scope Boundaries (FINAL)
- INCLUDE:
  - Token reconciliation (tailwind.config.ts + globals.css cleanup)
  - Primitive component extraction (Button, Card, StatTile, Pill, Section, MoneyValue) + audit existing (EmptyState, InfoBanner, StatusBadge, MetricCard, FormSection, PageHeader)
  - All 12 routes redesigned to use primitives + utility classes (zero inline `style` for color/border/bg/shadow — only allowed for true one-offs like dynamic verdict colors)
  - AppShell simplification
  - Login + register rebuild on warm-cream
  - Microcopy audit per AGENTS.md
  - Final cross-page responsive sweep
  - Playwright QA scenarios for every redesigned page
- EXCLUDE:
  - Server actions (`src/server/actions.ts`) — untouched
  - Finance domain logic (`src/domain/finance.ts`, `seed-defaults.ts`) — untouched
  - Supabase schema, RLS policies — untouched
  - Auth flows (login/register form behavior unchanged, only visual)
  - New dependencies (no chart lib, no UI lib, no test lib additions)
  - Database queries (`src/server/queries.ts`) — untouched
  - Adding/removing routes
  - i18n / language (stays Bahasa Indonesia)

## Research Findings
- ui-ux-pro-max skill found at `C:/Users/FARIS/CND-request-management/.opencode/skills/ui-ux-pro-max/`
- Tooling: `python scripts/search.py "<keywords>" --design-system -p "<project>" -f markdown` — to be run during plan generation
- Stack data: `data/stacks/nextjs.csv` — gives Next.js-specific guidance
- Common rules: no emojis as icons, stable hover (no scale-shift), cursor-pointer on interactive, contrast 4.5:1, focus-visible

## Open Questions (in interview)
1. Direction: keep the warm-cream UMKM identity (refined+simplified) OR pivot to something different?
2. Scope: all 12 routes OR a subset (e.g., Beranda + auth + AppShell first)?
3. Tailwind config conflict: reconcile config to match globals.css OR replace globals.css with Tailwind theme?
4. Decoration cleanup: remove gradient meshes, grain overlay, float animations entirely OR keep some?
5. Login redesign: full rebuild with new identity OR align to warm-cream system without redesign?
6. Test strategy: TDD / tests-after / none?
7. Component primitives: extract `Button`, `Card`, `Stat`, `Pill` OR keep current pattern?

## Scope Boundaries
- INCLUDE (proposed): _pending_
- EXCLUDE (proposed): server actions, finance domain logic, Supabase schema, auth flows
