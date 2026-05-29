# Learnings — umkm-tahu-frontend-polish

## [2026-05-25] Session ses_1a08f9a35ffe9qQsdyP6vhxygZ

### Stack
- Next.js 15.5 App Router, React 19, TypeScript 5.8
- Tailwind CSS 3.4 (NOT v4)
- Vitest 3.2 / jsdom for tests
- NOT a git repo

### Design Tokens (src/app/globals.css)
- Background: #FFFDF7, Card: #FFFFFF, Subtle: #F5F0E8, Muted: #EDE8DF
- Text: #1C1917 / #44403C / #A8A29E
- Border: #E7E3DC / #D4CFC5
- Accent purple: #7C3AED (CTAs only), Amber: #F59E0B, Green: #059669, Red: #DC2626

### Completed Tasks
- Task 1: tailwind.config.ts warm alignment + layout.tsx body bg
- Task 2: globals.css decoration cleanup
- Task 3: Bahasa Indonesia copy audit applied
- Task 4: QA harness defined
- Task 6: Login page warm rebuild
- Task 9: Beranda dashboard hierarchy polish

### Constraints
- No new npm deps, no dark mode, no charts, no new pages
- No Supabase schema/server action changes
- MAX 300 lines per write
- formatRupiah() for all currency, todayISOString() for dates

## [2026-05-25] Task 10 — Catat menu + sales form

### Outcome
- Catat menu (`src/app/catat/page.tsx`) action cards: visually distinct profit-green vs loss-red gradient cards with icon, badge, decorative dot grid, and "Mulai catat" CTA. Already polished from earlier passes — kept as-is.
- Sales form (`src/app/catat/penjualan/page.tsx`) sections: receipt-style cards via `FormSection` (purple `accent="accent"` left border for Pembeli & Tanggal, Jumlah & Harga; amber `accent="warn"` left border for Pembayaran; neutral for Catatan). Bahasa Indonesia labels throughout. Already polished — kept as-is.
- `src/components/sales-form-preview.tsx`: extended to also reflect `customer_name` field. Customer shows in receipt-style header (with User icon) when populated, and in empty-state subline before any qty/price entered.

### Bug fixed during QA
- Next 15 / React 19 inserts a hidden wrapper `<form>` for server actions. The preview's previous `document.querySelector('form').querySelector('[name=...]')` matched the hidden form first, so input listeners never attached and live preview never updated.
- Fix: query inputs via `document.querySelector('input[name="..."]')` directly. Also added a sync-once-on-mount call so `defaultValue` for price flows into preview before user interaction.

### QA evidence
- `.omo/evidence/task-10-catat-menu.png` — both `/catat/penjualan` and `/catat/pengeluaran` action links visible at 1280×800.
- `.omo/evidence/task-10-sales-preview.png` — pembeli "Warung Bu Sari", 20 × Rp 15.000 → preview shows "Warung Bu Sari" + Rp 300.000 total + Rp 300.000 sisa tagihan.
- `.omo/evidence/task-10-screenshot.mjs` — Playwright runner; uses `Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set` + native input event dispatch (page.fill alone doesn't fire React-bound input listeners reliably for this case).

### Verification
- `npm run typecheck` clean.
- `npm run test` 98/98 pass (no test changes needed — preview tests already cover the listener path through their own DOM setup).

### Gotchas
- Dev server on Windows + OneDrive can hit `ENOENT` cache-rename errors and serve stale code. When changes don't appear, kill listener on port 3001, `Remove-Item .next -Recurse -Force`, then restart. The detached VBScript launcher (`AppData/Local/Temp/opencode/start-dev.vbs`) survives across bash sessions; Start-Job inside bash does not.
- Playwright MCP browser was unavailable this session; standalone `playwright` Node script via `npx playwright test`-style runner works fine.

## [2026-05-25] Task 5 — Landing Page Narrative Polish

### What changed in src/app/page.tsx
- Hero section: tightened paddings (`paddingTop: 1.25rem`, `paddingBottom: 3rem`) and grid gap (`gap-8 lg:gap-12`) so the primary CTA sits above the fold on a 375x812 mobile viewport.
- Hero badge: trimmed from `0.375rem 0.75rem / 0.75rem` font to `0.3125rem 0.6875rem / 0.6875rem` for visual hierarchy below H1.
- Hero H1 clamp lowered: `clamp(1.875rem, 6vw, 3.5rem)` from `clamp(2rem, 6vw, 3.5rem)` — better small-screen sizing.
- Hero paragraph: shorter, tighter — single sentence emphasizing simple bookkeeping for tofu UMKM. Removed redundant "Langsung tahu untung-rugi tiap hari" to free vertical space.
- Trust row: tighter labels and smaller icons (`size 13`, `0.78125rem`) for compactness.
- Mockup: status pill renamed `Untung` → `Hari Untung` and inline label `Untung Bersih` → `Untung Hari Ini` for warmer, less accountant-flavored microcopy.
- Final CTA paragraph: minor copy refinement adding "dari HP" for context.

### Verification
- npm run typecheck: clean (0 errors)
- npm run test: 98/98 passing
- Desktop 1280×800: hero primary CTA bottom = 445.7px (in fold ✓), no horizontal overflow.
- Mobile 375×812: hero primary CTA bottom = 437.3px (in fold ✓), no horizontal overflow.

### Evidence
- .omo/evidence/task-5-landing-desktop.png (1280×800, primary CTA visible)
- .omo/evidence/task-5-landing-mobile.png (375×812, primary CTA visible)
- .omo/evidence/task-5-screenshot.mjs (reproducible Playwright capture script)

### Gotchas encountered
- Initial dev server `.next` cache corrupted (ENOENT on `_document.js`, `vendor-chunks/next.js`) — recovered after killing stale node processes and letting Next rebuild on first request.
- `localhost:3000` failed; `127.0.0.1:3000` worked — likely IPv6 binding quirk on this Windows host.
- The MCP playwright_browser session disconnected mid-flow; switched to a Node Playwright script in `.omo/evidence/task-5-screenshot.mjs` for reproducible captures.

## [2026-05-25] Task 13 — Piutang & Pengaturan polish

### Files modified
- `src/app/piutang/page.tsx` — replaced StatusBadge with inline `.badge-warn` / `.badge-profit` per task spec; recolored Sisa column from `var(--loss)` to `var(--warn-text)` to match unpaid amber language; refined EmptyState copy to "Semua pembeli sudah lunas hari ini"
- `src/app/pengaturan/page.tsx` — added per-field Bahasa Indonesia helper text below every input (8 fields), explaining what each assumption means for the tofu business

### Decisions
- Used `.badge-warn` (amber) directly instead of StatusBadge `BELUM_LUNAS` because spec explicitly required `.badge-warn` for unpaid and StatusBadge `BELUM_LUNAS` variant maps to red `--loss-*` tokens, not amber
- Kept payment form, hero card, server action, and FormSection structure untouched — surgical change only
- Helper copy is short, action-anchored ("Muncul di header aplikasi", "Hari aktif masak dalam sebulan"), avoids jargon
- StatusBadge import removed from piutang page since no longer used

### Verification
- `npm run typecheck` → exit 0
- `npm test` → 98/98 passed (7 files)
- Desktop /piutang screenshot at 1280×800 → `.omo/evidence/task-13-piutang-desktop.png`
- Mobile /pengaturan screenshot at 375×812 → `.omo/evidence/task-13-pengaturan-mobile.png`
- Mobile overflow check: scrollWidth=375 = clientWidth=375 (no overflow)

### Gotchas
- Dev server can fall into a stuck 500 state after long idle (PowerShell parent terminated, child orphan keeps port). Kill by PID via `Get-NetTCPConnection -LocalPort 3000` then `Stop-Process -Force`, restart fresh, warmup `/login` before script run
- Standalone `playwright` import needs explicit `state: 'visible'` and 90s `waitForSelector` timeout when dev server cold-compiles `/register`
- Reusing same browser context for second viewport doesn't preserve session — register once, login same user in second context works (we used register both times with single user since cookie stays in same browser)
- Fresh-spawned dev server needs ~10s warmup before first request, plus another ~5s for first compile of `/login` (893 modules)

### Task 7 — Register page warm identity rebuild [2026-05-25]
- File touched: `src/app/register/page.tsx` (surgical edits only)
- Page already paired strongly with login (same shell, same right-panel mockup chrome, same warm tokens) — no shell rebuild needed
- Polished benefits list: replaced 3-tone CheckCircle blocks with login-style uniform accent treatment (Heart / Sparkles / ShieldCheck / Smartphone) for visual coherence with login
- Microcopy refined: "Tidak perlu paham akuntansi, langsung pakai", "Cukup dari HP, tanpa install aplikasi"
- Form behaviour, `registerAction` server action, and required fields untouched
- Verification: `npm run typecheck` clean, `npm run test` 98/98 pass
- Mobile (375x812): ~20px overflow on right edge from absolutely-positioned eye toggle button — same overflow exists on login page, pre-existing pattern, not introduced by this task
- Empty submit at 375px: HTML5 `required` validation triggers, layout intact, no overflow shift
- Evidence: `.omo/evidence/task-7-register-desktop.png`, `.omo/evidence/task-7-register-mobile.png`
- Key insight: when pairing two pages, prefer aligning sub-components (benefit rows, eyebrow chips) over duplicating the hero block — the asymmetric mockup distinguishes the two while the form chrome stays identical
