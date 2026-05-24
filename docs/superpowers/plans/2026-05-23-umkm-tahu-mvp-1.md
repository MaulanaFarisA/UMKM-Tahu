# UMKM Tahu MVP 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first online MVP of a simple bookkeeping PWA for a tofu UMKM, focused on daily sales, expenses, receivables, settings, and a clear home dashboard.

**Architecture:** Use a Next.js App Router web app with Supabase for online auth and PostgreSQL persistence. Keep business calculations in pure TypeScript domain modules with Vitest coverage, separate from UI and Supabase access. Treat all Excel-derived numbers as editable defaults, never permanent hardcoded business constants.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Supabase PostgreSQL, Supabase Auth with email/password, Vitest, PWA basics.

---

## Context

Read `project_brief.md` before implementing this plan. It is the source of product, business, and domain context.

This app supports a Beasiswa Bakti BCA initiative to help a local tofu UMKM improve bookkeeping and grow annual revenue. The target user is a non-technical, non-accounting UMKM owner/operator. The app must feel like a simple daily business notebook, not accounting software.

MVP 1 is intentionally reduced. Do not build production records, detailed reports, simulations, exports, charts, multi-user roles, or a native mobile app in this milestone.

## MVP 1 Scope

Build these user-facing areas:

- `Beranda`
- `Catat Penjualan`
- `Catat Pengeluaran`
- `Piutang`
- `Pengaturan`
- Auth pages for email/password login and registration
- Installable responsive PWA basics

Defer to MVP 2:

- Catat Produksi
- Laporan HPP detail
- Simulasi harga/biaya/produksi
- Export Excel/CSV/PDF
- Charts and advanced analytics
- Multi-business or multi-user role management
- Native mobile app

## Product Principles

- UI language is Bahasa Indonesia.
- Use plain terms: `Beranda`, `Catat`, `Penjualan`, `Pengeluaran`, `Piutang`, `Belum Lunas`, `Sudah Lunas`, `Perkiraan Untung`.
- Avoid exposing technical/accounting terms unless explained.
- The daily flow should be: login, open Beranda, catat penjualan/pengeluaran, check piutang, done.
- All business numbers from Excel are editable defaults.
- Separate actual transaction data from default assumptions.
- If data is incomplete, say so clearly: `Data belum lengkap, hasil ini masih perkiraan.`

## Final MVP 1 Navigation

Use this top-level navigation:

```text
Beranda
Catat
Piutang
Pengaturan
```

Inside `Catat`, provide two choices:

```text
Catat Penjualan
Catat Pengeluaran
```

## Supabase Data Model

Create these tables in Supabase.

### `business_profiles`

Purpose: stores editable defaults for one user's UMKM.

Columns:

```sql
id uuid primary key default gen_random_uuid(),
user_id uuid not null references auth.users(id) on delete cascade,
business_name text not null,
product_name text not null,
tofu_per_board numeric not null default 169,
tofu_per_pack numeric not null default 10,
default_boards_per_day numeric not null default 10,
default_price_per_tofu numeric not null default 600,
default_price_per_pack numeric not null default 6000,
default_production_days_per_month numeric not null default 25,
created_at timestamptz not null default now(),
updated_at timestamptz not null default now()
```

### `expenses`

Purpose: stores daily spending.

Columns:

```sql
id uuid primary key default gen_random_uuid(),
user_id uuid not null references auth.users(id) on delete cascade,
date date not null,
category text not null,
item_name text not null,
quantity numeric not null,
unit text not null,
unit_price numeric not null,
total numeric not null,
confirmation_status text not null default 'actual',
notes text,
created_at timestamptz not null default now(),
updated_at timestamptz not null default now()
```

Allowed `category` values in app code:

```text
raw_material
additional_material
production
distribution
other
```

Allowed `confirmation_status` values in app code:

```text
actual
estimated
unconfirmed
```

### `customers`

Purpose: stores buyers/warung names.

Columns:

```sql
id uuid primary key default gen_random_uuid(),
user_id uuid not null references auth.users(id) on delete cascade,
name text not null,
notes text,
created_at timestamptz not null default now(),
updated_at timestamptz not null default now()
```

### `sales_transactions`

Purpose: stores sales and initial receivable amount.

Columns:

```sql
id uuid primary key default gen_random_uuid(),
user_id uuid not null references auth.users(id) on delete cascade,
customer_id uuid references customers(id) on delete set null,
date date not null,
packs numeric not null,
price_per_pack numeric not null,
total_sales numeric not null,
amount_paid numeric not null,
receivable_amount numeric not null,
notes text,
created_at timestamptz not null default now(),
updated_at timestamptz not null default now()
```

### `receivable_payments`

Purpose: stores payments against unpaid sales.

Columns:

```sql
id uuid primary key default gen_random_uuid(),
user_id uuid not null references auth.users(id) on delete cascade,
sales_transaction_id uuid not null references sales_transactions(id) on delete cascade,
date date not null,
amount numeric not null,
notes text,
created_at timestamptz not null default now()
```

## Row Level Security Requirements

Enable RLS for every app table.

Required policy behavior:

```text
Authenticated users can select rows where user_id = auth.uid().
Authenticated users can insert rows where user_id = auth.uid().
Authenticated users can update rows where user_id = auth.uid().
Authenticated users can delete rows where user_id = auth.uid().
```

Do not add role systems, organizations, teams, or multi-business permissions in MVP 1.

## File Structure To Create

```text
umkm_tahu/
  project_brief.md
  README.md
  package.json
  next.config.ts
  tsconfig.json
  postcss.config.mjs
  tailwind.config.ts
  public/
    manifest.json
    icon-192.png
    icon-512.png
  src/
    app/
      globals.css
      layout.tsx
      page.tsx
      login/page.tsx
      register/page.tsx
      catat/page.tsx
      catat/penjualan/page.tsx
      catat/pengeluaran/page.tsx
      piutang/page.tsx
      pengaturan/page.tsx
    components/
      app-shell.tsx
      bottom-nav.tsx
      empty-state.tsx
      metric-card.tsx
      status-badge.tsx
    domain/
      finance.ts
      finance.test.ts
      money.ts
      receivables.ts
      receivables.test.ts
      seed-defaults.ts
    lib/
      supabase-browser.ts
      supabase-server.ts
      format.ts
    server/
      actions.ts
      queries.ts
    types/
      database.ts
  supabase/
    schema.sql
```

## Task 1: Scaffold Next.js, TypeScript, Tailwind, Vitest

**Files:**

- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `tailwind.config.ts`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `README.md`

- [ ] **Step 1: Initialize the app**

Run from project root:

```powershell
npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Expected: Next.js app files are created in the existing `umkm_tahu` folder.

- [ ] **Step 2: Install MVP dependencies**

```powershell
npm install @supabase/ssr @supabase/supabase-js
npm install -D vitest @vitejs/plugin-react jsdom
```

Expected: dependencies are added to `package.json`.

- [ ] **Step 3: Add test scripts**

Update `package.json` scripts to include:

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "typecheck": "tsc --noEmit"
}
```

Keep existing Next.js scripts.

- [ ] **Step 4: Verify scaffold**

Run:

```powershell
npm run typecheck
npm run build
```

Expected: both pass on the scaffold.

- [ ] **Step 5: Commit**

```powershell
git add .
git commit -m "chore: scaffold nextjs app"
```

If the project is not yet a git repository, initialize git first:

```powershell
git init
git add .
git commit -m "chore: scaffold nextjs app"
```

## Task 2: Add Supabase Schema And RLS

**Files:**

- Create: `supabase/schema.sql`

- [ ] **Step 1: Create schema SQL**

Create `supabase/schema.sql` with table definitions for:

- `business_profiles`
- `expenses`
- `customers`
- `sales_transactions`
- `receivable_payments`

Include `alter table ... enable row level security;` for each table.

Add policies using `auth.uid() = user_id` for select/insert/update/delete.

- [ ] **Step 2: Apply schema in Supabase**

Open Supabase SQL editor and run `supabase/schema.sql`.

Expected: all tables and RLS policies are created.

- [ ] **Step 3: Confirm RLS behavior**

In Supabase Table Editor, verify RLS is enabled for each table.

- [ ] **Step 4: Commit**

```powershell
git add supabase/schema.sql
git commit -m "feat: add supabase schema"
```

## Task 3: Add Supabase Clients And Environment Setup

**Files:**

- Create: `.env.example`
- Create: `src/lib/supabase-browser.ts`
- Create: `src/lib/supabase-server.ts`
- Create: `src/types/database.ts`

- [ ] **Step 1: Add environment example**

Create `.env.example`:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Do not commit real secrets.

- [ ] **Step 2: Add browser client**

Create `src/lib/supabase-browser.ts` with a browser client from `@supabase/ssr`.

- [ ] **Step 3: Add server client**

Create `src/lib/supabase-server.ts` with a server client that reads cookies.

- [ ] **Step 4: Add minimal database types**

Create `src/types/database.ts` with typed table shapes for MVP 1 tables. If using generated Supabase types later, replace this file.

- [ ] **Step 5: Verify**

Run:

```powershell
npm run typecheck
```

Expected: pass.

- [ ] **Step 6: Commit**

```powershell
git add .env.example src/lib/supabase-browser.ts src/lib/supabase-server.ts src/types/database.ts
git commit -m "feat: add supabase clients"
```

## Task 4: Add Domain Calculation Functions And Tests

**Files:**

- Create: `src/domain/finance.ts`
- Create: `src/domain/finance.test.ts`
- Create: `src/domain/receivables.ts`
- Create: `src/domain/receivables.test.ts`
- Create: `src/domain/money.ts`
- Create: `src/domain/seed-defaults.ts`

- [ ] **Step 1: Write finance tests**

Test these cases:

```text
10 papan x 169 tahu = 1690 tahu.
1690 tahu / 10 tahu per bungkus = 169 bungkus.
659286 / 169 = about 3901 HPP per bungkus.
659286 / 1690 = about 390 HPP per tahu.
169 bungkus x 6000 = 1014000 omzet.
6000 - 3901 = about 2099 margin per bungkus.
division by zero returns 0.
```

- [ ] **Step 2: Write receivable tests**

Test these cases:

```text
total sales 60000 paid 0 creates receivable 60000.
total sales 60000 paid 30000 leaves 30000.
receivable is LUNAS when payments cover full amount.
receivable is BELUM_LUNAS when remaining amount is above 0.
```

- [ ] **Step 3: Run tests and confirm fail**

```powershell
npm test
```

Expected: fail because functions do not exist yet.

- [ ] **Step 4: Implement finance functions**

Implement pure functions:

```text
calculateProductionFromDefaults
calculateHpp
calculateSalesTotal
calculateProfitSummary
safeDivide
```

- [ ] **Step 5: Implement receivable functions**

Implement pure functions:

```text
calculateReceivableAmount
calculateRemainingReceivable
getReceivableStatus
```

- [ ] **Step 6: Add seed defaults**

Create `src/domain/seed-defaults.ts` with editable default values from `project_brief.md`. Use them only for first profile creation and examples, not as permanent hidden constants.

- [ ] **Step 7: Verify**

```powershell
npm test
npm run typecheck
```

Expected: pass.

- [ ] **Step 8: Commit**

```powershell
git add src/domain
git commit -m "test: add financial domain calculations"
```

## Task 5: Add Auth Pages And Protected App Shell

**Files:**

- Create: `src/app/login/page.tsx`
- Create: `src/app/register/page.tsx`
- Create: `src/components/app-shell.tsx`
- Create: `src/components/bottom-nav.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Build register page**

Create a simple Bahasa Indonesia form:

```text
Email
Password
Buat Akun
Sudah punya akun? Masuk
```

- [ ] **Step 2: Build login page**

Create a simple Bahasa Indonesia form:

```text
Email
Password
Masuk
Belum punya akun? Daftar
```

- [ ] **Step 3: Add protected shell**

Authenticated area uses navigation:

```text
Beranda
Catat
Piutang
Pengaturan
```

- [ ] **Step 4: Add logout action**

Provide a simple `Keluar` button in the shell.

- [ ] **Step 5: Verify auth manually**

Run:

```powershell
npm run dev
```

Expected:

```text
User can register.
User can login.
User can logout.
Unauthenticated user is sent to login.
```

- [ ] **Step 6: Commit**

```powershell
git add src/app src/components
git commit -m "feat: add simple email password auth"
```

## Task 6: Add Server Queries And Actions

**Files:**

- Create: `src/server/queries.ts`
- Create: `src/server/actions.ts`

- [ ] **Step 1: Add profile helpers**

Implement:

```text
getCurrentUser
getBusinessProfile
ensureBusinessProfile
updateBusinessProfile
```

`ensureBusinessProfile` creates one profile using seed defaults when a user logs in for the first time.

- [ ] **Step 2: Add sales helpers**

Implement:

```text
getSalesTransactions
createSalesTransaction
```

Validation:

```text
packs > 0
price_per_pack >= 0
amount_paid >= 0
amount_paid <= total_sales
```

- [ ] **Step 3: Add expense helpers**

Implement:

```text
getExpenses
createExpense
```

Validation:

```text
quantity > 0
unit_price >= 0
total = quantity * unit_price
```

- [ ] **Step 4: Add customer helpers**

Implement:

```text
getCustomers
findOrCreateCustomerByName
```

- [ ] **Step 5: Add receivable helpers**

Implement:

```text
getReceivables
createReceivablePayment
```

Validation:

```text
payment amount > 0
payment amount <= remaining receivable
```

- [ ] **Step 6: Add dashboard query**

Implement:

```text
getDashboardSummary
```

It returns:

```text
todaySales
monthSales
todayExpenses
monthExpenses
estimatedProfitToday
totalReceivables
hasUnconfirmedExpenses
hasIncompleteSalesData
```

- [ ] **Step 7: Verify**

```powershell
npm run typecheck
npm test
```

Expected: pass.

- [ ] **Step 8: Commit**

```powershell
git add src/server
git commit -m "feat: add supabase data actions"
```

## Task 7: Build Pengaturan Page

**Files:**

- Create: `src/app/pengaturan/page.tsx`
- Use: `src/server/queries.ts`
- Use: `src/server/actions.ts`

- [ ] **Step 1: Render current settings**

Show fields:

```text
Nama usaha
Nama produk
Tahu per papan
Tahu per bungkus
Produksi papan per hari
Harga jual per tahu
Harga jual per bungkus
Hari produksi per bulan
```

- [ ] **Step 2: Add helper copy**

Show:

```text
Angka ini adalah patokan awal. Bisa diubah jika kondisi usaha berubah.
```

- [ ] **Step 3: Save updates**

Use `updateBusinessProfile`.

- [ ] **Step 4: Verify manually**

Expected: user can edit and reload settings.

- [ ] **Step 5: Commit**

```powershell
git add src/app/pengaturan
git commit -m "feat: add business settings page"
```

## Task 8: Build Catat Page And Catat Penjualan

**Files:**

- Create: `src/app/catat/page.tsx`
- Create: `src/app/catat/penjualan/page.tsx`
- Use: `src/server/actions.ts`
- Use: `src/server/queries.ts`

- [ ] **Step 1: Build Catat menu**

Show two large choices:

```text
Catat Penjualan
Catat Pengeluaran
```

- [ ] **Step 2: Build sales form**

Fields:

```text
Tanggal
Nama pembeli/warung
Jumlah bungkus
Harga per bungkus
Jumlah dibayar
Catatan
```

- [ ] **Step 3: Show live calculated values**

Display:

```text
Total penjualan
Belum dibayar
```

- [ ] **Step 4: Save sales transaction**

Use `createSalesTransaction`.

- [ ] **Step 5: Use simple UX copy**

If amount paid is less than total:

```text
Sisa belum dibayar akan masuk ke Piutang.
```

- [ ] **Step 6: Verify manually**

Create a sale with:

```text
Pembeli: Pelanggan tetap pasar
Bungkus: 10
Harga: 6000
Dibayar: 0
```

Expected: sales transaction is saved and receivable amount is `60000`.

- [ ] **Step 7: Commit**

```powershell
git add src/app/catat
git commit -m "feat: add sales entry flow"
```

## Task 9: Build Catat Pengeluaran

**Files:**

- Create: `src/app/catat/pengeluaran/page.tsx`
- Use: `src/server/actions.ts`
- Use: `src/server/queries.ts`

- [ ] **Step 1: Build expense form**

Fields:

```text
Tanggal
Kategori
Nama pengeluaran
Jumlah
Satuan
Harga satuan
Status data
Catatan
```

- [ ] **Step 2: Use categories**

Display categories in Bahasa Indonesia:

```text
Bahan baku
Bahan tambahan
Produksi
Distribusi
Lain-lain
```

- [ ] **Step 3: Use confirmation statuses**

Display statuses:

```text
Aktual
Perkiraan
Belum dikonfirmasi
```

- [ ] **Step 4: Show calculated total**

```text
Total = jumlah x harga satuan
```

- [ ] **Step 5: Save expense**

Use `createExpense`.

- [ ] **Step 6: Verify manually**

Create expense:

```text
Kategori: Bahan baku
Nama: Kedelai
Jumlah: 50
Satuan: kg
Harga satuan: 10900
```

Expected: total is `545000`.

- [ ] **Step 7: Commit**

```powershell
git add src/app/catat/pengeluaran
git commit -m "feat: add expense entry flow"
```

## Task 10: Build Piutang Page

**Files:**

- Create: `src/app/piutang/page.tsx`
- Create: `src/components/status-badge.tsx`
- Use: `src/server/actions.ts`
- Use: `src/server/queries.ts`
- Use: `src/domain/receivables.ts`

- [ ] **Step 1: Render unpaid receivables**

Show:

```text
Nama pembeli
Total penjualan
Sudah dibayar
Belum dibayar
Status
```

- [ ] **Step 2: Add payment form**

Fields:

```text
Tanggal bayar
Jumlah bayar
Catatan
```

- [ ] **Step 3: Add status badges**

Use labels:

```text
Belum Lunas
Sudah Lunas
```

- [ ] **Step 4: Verify manually**

Pay `30000` against a `60000` receivable.

Expected:

```text
Sudah dibayar: 30000
Belum dibayar: 30000
Status: Belum Lunas
```

Pay remaining `30000`.

Expected:

```text
Belum dibayar: 0
Status: Sudah Lunas
```

- [ ] **Step 5: Commit**

```powershell
git add src/app/piutang src/components/status-badge.tsx
git commit -m "feat: add receivables page"
```

## Task 11: Build Beranda Dashboard

**Files:**

- Modify: `src/app/page.tsx`
- Create: `src/components/metric-card.tsx`
- Create: `src/components/empty-state.tsx`
- Use: `src/server/queries.ts`
- Use: `src/domain/finance.ts`

- [ ] **Step 1: Add metric cards**

Show:

```text
Omzet hari ini
Omzet bulan ini
Pengeluaran hari ini
Pengeluaran bulan ini
Perkiraan untung hari ini
Uang belum dibayar
```

- [ ] **Step 2: Add warnings**

Show warning if relevant:

```text
Data belum lengkap, hasil ini masih perkiraan.
Ada biaya yang belum dikonfirmasi.
Ada pembeli yang belum membayar.
```

- [ ] **Step 3: Add quick actions**

Buttons:

```text
Catat Penjualan
Catat Pengeluaran
Lihat Piutang
```

- [ ] **Step 4: Verify manually**

Expected: dashboard updates after adding sales, expenses, and payments.

- [ ] **Step 5: Commit**

```powershell
git add src/app/page.tsx src/components/metric-card.tsx src/components/empty-state.tsx
git commit -m "feat: add home dashboard"
```

## Task 12: Add PWA Basics

**Files:**

- Create: `public/manifest.json`
- Add: `public/icon-192.png`
- Add: `public/icon-512.png`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create manifest**

Use:

```json
{
  "name": "Pembukuan UMKM Tahu",
  "short_name": "UMKM Tahu",
  "description": "Aplikasi pembukuan sederhana untuk UMKM tahu",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0f766e",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

- [ ] **Step 2: Add metadata**

Update `src/app/layout.tsx` metadata with app name, manifest path, viewport, and theme color.

- [ ] **Step 3: Verify on mobile browser**

Expected: browser offers install/add-to-home-screen behavior where supported.

- [ ] **Step 4: Commit**

```powershell
git add public src/app/layout.tsx
git commit -m "feat: add pwa basics"
```

## Task 13: Documentation And Final Verification

**Files:**

- Modify: `README.md`

- [ ] **Step 1: Update README**

Include:

```text
Project purpose
Tech stack
Setup instructions
Supabase environment variables
How to run dev server
How to run tests
How to build
Important domain assumptions
Warning that Excel numbers are editable defaults
```

- [ ] **Step 2: Run automated verification**

```powershell
npm run typecheck
npm test
npm run build
```

Expected: all pass.

- [ ] **Step 3: Manual smoke test**

Run:

```powershell
npm run dev
```

Verify:

```text
Register account.
Login.
Open Pengaturan and see default UMKM tahu values.
Catat Penjualan with unpaid amount.
See unpaid amount in Piutang.
Add partial payment.
Catat Pengeluaran.
Open Beranda and confirm metrics update.
Open on mobile viewport.
Confirm PWA manifest is detected.
Logout.
```

- [ ] **Step 4: Commit**

```powershell
git add README.md
git commit -m "docs: add mvp usage guide"
```

## Testing Requirements

Minimum tests required before demo:

- Production defaults produce correct pack count.
- HPP calculation handles normal values.
- HPP calculation handles zero production without `Infinity` or `NaN`.
- Sales total calculation is correct.
- Receivable amount calculation is correct.
- Payment reduces receivable correctly.
- Receivable status changes from `Belum Lunas` to `Sudah Lunas`.
- Profit summary handles incomplete or zero data safely.

## Final Acceptance Criteria

MVP 1 is acceptable when:

- A user can register with email/password.
- A user can login and logout.
- A user only sees their own data through Supabase RLS.
- A first-time user gets editable default business settings from the tofu UMKM assumptions.
- A user can record sales.
- A user can record expenses.
- Unpaid sales appear in Piutang.
- A user can record receivable payments.
- Beranda shows omzet, expenses, estimated profit, and unpaid money.
- The app is responsive on mobile.
- PWA manifest exists and supports add-to-home-screen basics.
- `npm run typecheck` passes.
- `npm test` passes.
- `npm run build` passes.

## Important Implementation Guardrails

- Do not add MVP 2 features during MVP 1 implementation.
- Do not build complex accounting or inventory.
- Do not add roles, teams, or multi-business management.
- Do not hardcode Excel numbers as permanent hidden constants.
- Do not expose Supabase service role keys to the client.
- Do not disable RLS for convenience.
- Do not make the UMKM owner fill long forms for daily use.
- Prefer clarity over visual complexity.

## Execution Recommendation

Use Subagent-Driven execution if available:

```text
Task 1: scaffold
Task 2: Supabase schema
Task 3: Supabase clients
Task 4: domain tests
Task 5: auth shell
Task 6: server actions
Task 7: settings
Task 8: sales entry
Task 9: expenses entry
Task 10: receivables
Task 11: dashboard
Task 12: PWA
Task 13: docs and verification
```

Review after every task before continuing.
