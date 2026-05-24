# umkm_tahu — Project Context

These instructions are injected into every AI agent working on this project.
Global rules in ~/.config/opencode/AGENTS.md still apply. This file adds project-specific context.

## Business Domain

- Bookkeeping app for tofu UMKM (Ibu Pak Riyanto)
- Bahasa Indonesia UI throughout — no English labels in the UI
- Target user: small tofu producer, uses app on mobile phone daily

### Confirmed Cost Structure (May 2026 interview)
| Item | Value |
|---|---|
| Kedelai | 50 kg × Rp 10.900 = Rp 545.000/hari |
| Kain saring | ~Rp 329/hari |
| Kayu bakar | ~Rp 57.143/hari |
| Listrik | ~Rp 13.151/hari |
| Tenaga kerja | 5 masak × Rp 15.000 = Rp 75.000/hari |
| Bensin | Rp 15.000/hari |
| Plastik | Rp 5.000/hari |
| Penyusutan cetakan | ~Rp 822/hari |
| **TOTAL** | **Rp 711.444/hari** |

- HPP per bungkus: ~Rp 4.087
- Margin per bungkus: ~Rp 1.913
- Laba/hari: ~Rp 302.556
- Omzet/hari: Rp 1.014.000 (169 bungkus × Rp 6.000)

## Tech Stack

- Next.js 15.5 (App Router, Server Actions, `experimental.serverActions`)
- React 19, TypeScript 5.8
- Tailwind CSS **3.4** — NOT v4. Config is `tailwind.config.ts`. Do NOT use v4 CSS-first syntax.
- Supabase (auth + database, RLS on all tables)
- Vitest 3.2 for tests
- Lucide React for icons
- Plus Jakarta Sans font (loaded via `next/font/google`)

## Design System — Warm UMKM Identity

```
Background:    #FFFDF7  (warm cream — like receipt paper)
Card:          #FFFFFF  with warm shadow rgba(28,25,23,0.06)
Subtle bg:     #F5F0E8
Muted bg:      #EDE8DF
Text primary:  #1C1917  (deep charcoal)
Text secondary:#44403C
Text muted:    #A8A29E
Border:        #E7E3DC  (warm, not cold gray)
Border strong: #D4CFC5
Accent purple: #7C3AED  (CTAs ONLY — not on every element)
Soy amber:     #F59E0B  (receivables, warnings — BukuWarung-inspired)
Profit green:  #059669
Loss red:      #DC2626
```

### CSS Utility Classes (defined in src/app/globals.css)
- Layout: `.app-container`, `.app-container-narrow`, `.app-container-default`, `.app-container-wide`
- Spacing: `.page-stack`, `.section-stack`, `.grid-roomy`, `.card-roomy`
- Cards: `.card`, `.hero-card`, `.receipt-card` (left accent border)
- Buttons: `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-danger`
- Inputs: `.input-field`, `.field-label`, `.section-heading`
- Money: `.money-hero`, `.money-lg`, `.money-md`, `.money-sm`, `.money-xs`
- Badges: `.badge-profit`, `.badge-loss`, `.badge-warn`, `.badge-neutral`
- Animation: `.slide-up`, `.fade-in`, `.tap-highlight-none`, `.no-select`

### Receipt-Style Cards
Form section cards use colored left borders:
- Purple sections (Pembeli, Jumlah): `borderLeft: '3px solid #7C3AED'`
- Amber sections (Pembayaran, Pengeluaran): `borderLeft: '3px solid #F59E0B'`

## Architecture

- **Server components** for all data fetching — no `useEffect` for data
- **Server actions** in `src/server/actions.ts` for all mutations
- **Client components** ONLY for live form previews (`sales-form-preview`, `expense-form-preview`)
- **AppShell** wraps all authenticated pages — accepts `width` prop: `narrow` | `default` | `wide`
- **Supabase**: `createServerClient()` for server, `createBrowserClient()` for client

## File Structure

```
src/
  app/                    Next.js App Router pages
    beranda/page.tsx      Dashboard (width="wide")
    catat/page.tsx        Record menu
    catat/penjualan/      Sales form (width="default")
    catat/pengeluaran/    Expense form (width="default")
    piutang/page.tsx      Receivables (width="default")
    pengaturan/page.tsx   Settings (width="default")
    login/page.tsx        Landing page with dashboard mockup
    register/page.tsx     Landing page with brand panel
    globals.css           Full design system
    layout.tsx            Root layout with Plus Jakarta Sans
  components/
    app-shell.tsx         Main layout shell
    sales-form-preview.tsx  Live sales preview (client)
    expense-form-preview.tsx  Live expense preview (client)
    page-header.tsx       Reusable page header
    form-section.tsx      Reusable form section card
    info-banner.tsx       Reusable info/warn/success banner
  domain/
    finance.ts            Pure business logic (HPP, profit, margin)
    finance.test.ts       32 tests — all must pass
    seed-defaults.ts      Confirmed default values from interview
  lib/
    format.ts             formatRupiah(), todayISOString()
    supabase-server.ts    Server Supabase client
    supabase-browser.ts   Browser Supabase client
  server/
    actions.ts            All server actions (mutations)
    queries.ts            All server queries (reads)
  types/
    database.ts           TypeScript types for Supabase tables
supabase/
  schema.sql              Full schema with RLS policies
public/
  manifest.json           PWA manifest
```

## Key Conventions

- `formatRupiah()` for ALL currency display — never raw numbers
- `todayISOString()` for date field defaults
- Indonesian copy throughout — see microcopy standards below
- **MAX 300 lines per write operation** — always chunk large files
- Surgical edits preferred over full rewrites
- Always run verification after changes

## Microcopy Standards

| Avoid | Use instead |
|---|---|
| Ringkasan Usaha | Hari ini usaha kamu... |
| Omzet Hari Ini | Uang Masuk |
| Pengeluaran | Uang Keluar |
| Masih Ditagih | Belum Dibayar |
| Catat Sekarang | Mau catat apa hari ini? |
| Data belum lengkap | Belum semua dicatat, angka ini masih perkiraan |
| Simpan Pengaturan | Simpan Perubahan |
| Pengaturan Usaha | Profil Usaha Kamu |
| Semua sudah lunas | Semua pembeli sudah lunas hari ini |
| Isi 0 jika belum dibayar | Kalau belum dibayar penuh, sisanya otomatis masuk ke Tagihan |

## Verification Commands (always run in this order)

```powershell
npm run typecheck   # must pass clean — zero errors
npm test            # must pass 32/32
npm run build       # must compile all 12 pages
npm run dev         # for smoke testing only
```

## Known Constraints

- **Not a git repo** — no .git directory. Do not run git commands.
- `.env.local` exists — never commit, never echo its contents
- `package-lock.json` is gitignored — intentional
- Tailwind v3 — do NOT use v4 CSS-first config syntax
- Server actions require `'use server'` directive
- Client components require `'use client'` directive
- `(supabase as any)` casts exist in actions.ts — acceptable short-term
- No chart library installed — use CSS-only charts if needed
