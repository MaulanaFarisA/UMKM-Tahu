# Task 15 — Responsive & Overflow Polish Sweep

**Date**: 2026-05-25
**Plan**: `.omo/plans/ui-upgrade-umkm-tahu.md`

## Scope

Cross-page responsive and overflow polish sweep. Fix spacing consistency,
long-text wrapping, money readability, mobile bottom nav clearance, z-index
conflicts, and console errors across all redesigned pages.

## Audit Findings (per page)

### Mobile bottom nav clearance — PASS

`AppShell` already provides `with-bottom-nav-pad` (`padding-bottom: 8rem`) on
the `<main>` element for mobile/tablet, dropping to `3rem` on `lg:` screens.
That value sits above the `68px` bottom-nav pill plus its `-top-7` (28px) FAB
overflow plus safe-area inset, so content cannot hide behind the nav.

No per-page bottom padding hack is needed. The 4 page-level `pb-4` instances
(`pengaturan/page.tsx`, `catat/penjualan/page.tsx`, `catat/pengeluaran/page.tsx`)
are *additional* breathing room above that 8rem floor — they are not
clearance fixes. Left as-is to preserve their visual rhythm.

### Horizontal overflow — PASS

`grep "overflow-x"` across the entire `src/` tree returns **zero hits**. No
page uses `overflow-x: hidden` as a workaround, which is the right state.
All grids that contain user-supplied long text already pair `min-w-0` /
`truncate` on the inner cells (verified on receivables stats row, header
brand mark, paid-list customer name).

### Long business name handling — PASS

`AppShell` renders the title via `<span className="font-extrabold ... truncate">`
inside a `min-w-0` flex parent. A 60-char string like
`"Tahu Berkah Nusantara Cabang Pasar Pagi Kecamatan Selatan"` truncates with
`...` rather than overflowing. Confirmed by inspecting `app-shell.tsx:49-82`.

### Money readability — PASS (with one hardening)

`.money-*` classes use `font-variant-numeric: tabular-nums` plus
`font-feature-settings: 'tnum'` for column alignment. On the receivables
3-column stats row, very long money strings could expand the grid cell.
Hardened by adding `min-w-0` + `truncate` to each cell so the grid stays
within its parent card.

### Z-index conflicts — PASS

| Layer | z-index |
|---|---|
| `AppShell` header (sticky) | 30 |
| `AppShell` mobile-bottom-nav wrapper | 30 |
| Body content | default |

Form inputs and cards are within main flow — no z-index battles. The
mobile bottom nav uses `pointer-events: none` on the gradient veil with
`pointer-events: auto` only on the inner pill, so it never intercepts
clicks meant for content beneath.

### Focus states — PASS

Inherited from globals.css `:focus-visible` rules (`button`, `a`,
`[role="button"]`, `[tabindex]`, `input`, `select`, `textarea`). Every
interactive element on the redesigned pages picks up the accessible 3px
+ 1px ring without needing per-page additions.

## Fixes Applied (surgical only)

### 1. `src/app/beranda/page.tsx` — invalid Tailwind class

**Issue**: line 304 used `active:scale-98` which is **not** a valid Tailwind
v3 class (Tailwind only ships `scale-{0,50,75,90,95,100,105,110,125,150}`
unless extended). Bug noted in Task 7 learnings as "must use arbitrary
form `active:scale-[0.98]`" but had crept back into the receivables CTA.

**Fix**: `active:scale-98` -> `active:scale-[0.98]`.

### 2. `src/app/beranda/page.tsx` — verdict header overflow

**Issue**: hero verdict header was `flex items-center justify-between gap-3`
with no wrap. On viewports < ~340px the StatusBadge (md) plus the Margin
pill could compress text to ellipsis or push the right pill off-grid.

**Fix**: added `flex-wrap` so the Margin pill drops to a new line on
extremely narrow viewports rather than crowding the badge.

### 3. `src/app/catat/page.tsx` — design-system inconsistency

**Issue**: page used `space-y-6` while every other redesigned page uses
the responsive `.page-stack` utility (`gap-6 md:gap-8 lg:gap-10`).
Mobile spacing was tighter than peers; desktop spacing was less generous.

**Fix**: `space-y-6 slide-up` -> `page-stack slide-up`. Picks up the same
responsive vertical rhythm used elsewhere.

### 4. `src/app/piutang/page.tsx` — stats row money overflow

**Issue**: 3-column unpaid-stats grid had no `min-w-0` or `truncate` on its
cells. With `Rp 999.999.999` it would push past the column boundary on
360px viewports, breaking the visual receipt grid.

**Fix**: added `min-w-0` + `truncate` to all three stats cells (Total,
Dibayar, Sisa). Tabular-nums is preserved; only the safety net for
overflow is added.

## Pages Inspected (no change needed)

- `src/app/pengaturan/page.tsx` — clean. Long text truncates inside
  AppShell title; form inputs are all single-line; production math card
  uses `flex-1 min-w-0` correctly.
- `src/app/catat/penjualan/page.tsx` — clean. Form columns use
  `lg:grid-cols-[minmax(0,1fr)_380px]` with `min-w-0` on both children.
- `src/app/catat/pengeluaran/page.tsx` — clean (same shell as penjualan).
- `src/components/sales-form-preview.tsx` — clean. `truncate` on item
  name; `flex-shrink-0` on totals; tabular-nums everywhere.
- `src/components/expense-form-preview.tsx` — clean. Same pattern.
- `src/components/app-shell.tsx` — clean. `min-w-0 truncate` on brand,
  pointer-event isolation on nav veil, safe-area inset for FAB.

## Verification

```
> umkm-tahu@0.1.0 typecheck
> tsc --noEmit
[zero errors]

> umkm-tahu@0.1.0 test
> vitest run
 Test Files  7 passed (7)
      Tests  98 passed (98)

> umkm-tahu@0.1.0 build
> next build
 ✓ Compiled successfully in 4.1s
 ✓ Generating static pages (12/12)
```

All 98 tests still passing. All 12 pages still compiling. Bundle sizes
unchanged: `/beranda` 177 B, `/piutang` 177 B, `/catat` 177 B,
`/pengaturan` 171 B, sales/expense forms 2.74 / 2.87 kB.

## Files Modified

| File | Lines changed | Reason |
|---|---|---|
| `src/app/beranda/page.tsx` | 2 | invalid scale class + wrap on header |
| `src/app/catat/page.tsx` | 1 | adopt `page-stack` |
| `src/app/piutang/page.tsx` | 6 | `min-w-0 truncate` on stats cells |

Total: 9 line-level changes across 3 files. No new dependencies, no
component API changes, no `src/domain/` touches.
