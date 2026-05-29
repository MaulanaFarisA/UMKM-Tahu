# Pembukuan UMKM Tahu

Aplikasi pembukuan sederhana untuk UMKM tahu. Bagian dari inisiatif Beasiswa Bakti BCA untuk membantu UMKM lokal meningkatkan omzet dan mempermudah pembukuan.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Supabase PostgreSQL + Auth
- Vitest
- PWA (installable web app)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Setup Supabase

1. Buat project baru di [supabase.com](https://supabase.com)
2. Buka SQL Editor dan jalankan `supabase/schema.sql`
3. Copy URL dan anon key dari Settings > API

### 3. Environment variables

```bash
cp .env.example .env.local
```

Isi `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Jalankan dev server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Commands

```bash
npm run dev        # Development server
npm run build      # Production build
npm run typecheck  # TypeScript check
npm test           # Run Vitest tests
npm run lint       # ESLint
```

## AI Context Export

Use Repomix to generate an AI-friendly snapshot of the codebase when you need to share project context with an LLM.

```bash
npm run ai:pack           # Generate repomix-output.xml
npm run ai:pack:compress  # Generate a smaller compressed snapshot
npm run ai:pack:md        # Generate repomix-output.md
```

Before sharing generated output outside your machine:

1. Review `.repomixignore` and `.gitignore`.
2. Confirm `.env.local`, credentials, Supabase secrets, and private data are excluded.
3. Open and skim the generated `repomix-output.*` file.
4. Delete the generated output after use if you do not need it locally.

Generated `repomix-output.*` files are ignored and should not be committed.

## Domain Assumptions

Angka berikut adalah default awal dari Excel pembukuan. Semua bisa diubah di Pengaturan Usaha.

- 1 papan = 169 tahu (cetakan tetap)
- 1 bungkus = 10 tahu
- Harga jual default = Rp 600/tahu = Rp 6.000/bungkus
- Produksi default = 10 papan/hari
- Hari produksi default = 25 hari/bulan

**Penting:** Jangan hardcode angka bisnis sebagai konstanta permanen.

## MVP 1 Features

- Beranda: ringkasan omzet, pengeluaran, untung/rugi hari ini
- Catat Penjualan: catat transaksi penjualan harian
- Catat Pengeluaran: catat biaya usaha harian
- Piutang: kelola pembeli yang belum bayar
- Pengaturan Usaha: edit asumsi produksi dan harga default
- Auth: email + password sederhana
- PWA: bisa di-install di HP

## Project Brief

Lihat `project_brief.md` untuk konteks lengkap bisnis dan domain.

## Implementation Plan

Lihat `docs/superpowers/plans/2026-05-23-umkm-tahu-mvp-1.md`.
