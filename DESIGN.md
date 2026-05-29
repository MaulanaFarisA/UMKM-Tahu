# Buku Tahu - Design Direction

## Product Identity

Buku Tahu is a mobile-first bookkeeping app for a tofu UMKM. The interface is Bahasa Indonesia throughout and should feel useful for a small producer who records money from a phone between daily production tasks.

## North Star

The app should feel like a warm, modern cash book: clear enough for someone who does not think in accounting terms, polished enough for a real production product, and fast enough for daily use.

The first screen must answer four questions immediately:

- Berapa uang masuk hari ini?
- Berapa uang keluar hari ini?
- Hari ini untung atau rugi?
- Apa yang perlu dicatat atau ditagih?

## Signature UX: Struk Hidup

The core product metaphor is a living receipt.

- Beranda shows the daily receipt summary.
- Catat Penjualan generates a live sales receipt.
- Catat Pengeluaran generates a live expense receipt.
- Tagihan shows unpaid receipt fragments.
- Success, paid, unpaid, and estimated states use stamp-like badges.

The receipt metaphor should help comprehension, not become decoration.

## Visual Language

Use warm receipt paper, tofu-block white surfaces, amber production cues, green profit cues, red loss cues, and a restrained purple action color.

### Color Tokens

- Background: `#FFFDF7`
- Surface: `#FFFFFF`
- Soft surface: `#F7F2E8`
- Muted surface: `#EFE7DA`
- Text primary: `#1C1917`
- Text secondary: `#44403C`
- Text muted: `#8D867C`
- Border: `#E7E3DC`
- Strong border: `#D4CFC5`
- Accent purple: `#7C3AED`
- Accent deep: `#5B21B6`
- Accent soft: `#F1EAFF`
- Soy amber: `#F59E0B`
- Soy soft: `#FFF3D6`
- Profit green: `#059669`
- Profit soft: `#E7F7EF`
- Loss red: `#DC2626`
- Loss soft: `#FDECEC`

## Typography

Use Plus Jakarta Sans.

- Money values use heavy weight, tabular numbers, and tight line-height.
- Page titles should be short and conversational.
- Labels use clear sentence case.
- Do not hide important instructions in tiny low-contrast text.

## Layout

Mobile is primary.

- One dominant job per screen.
- Dashboard is scannable in under five seconds.
- Forms are generous and thumb-friendly.
- Cards frame meaningful groups only.
- Avoid random gradients, decorative blobs, and generic SaaS chrome.

## Navigation

Mobile bottom navigation:

- Beranda
- Tagihan
- Catat as the central primary action
- Usaha

Desktop can keep a compact top navigation. Do not introduce a heavy sidebar.

## Pages

### Beranda

Beranda is the daily cash desk.

Primary module: Struk Harian.

It contains:

- untung/rugi verdict
- Uang Masuk
- Uang Keluar
- Belum Dibayar
- data confidence note if incomplete
- the next best action

### Catat Penjualan

Prioritize speed.

Recommended field order:

1. Jumlah bungkus
2. Harga / bungkus
3. Pembeli
4. Dibayar sekarang
5. Catatan

The live preview should look like a sales receipt and clearly show whether the buyer is paid, partial, or unpaid.

### Catat Pengeluaran

Make common production costs easy to recognize:

- Kedelai
- Kayu bakar
- Listrik
- Tenaga kerja
- Bensin
- Plastik
- Lainnya

Show the formula plainly: `jumlah x harga satuan = total`.

### Tagihan

Use the mental model "Belum Dibayar".

Cards should emphasize:

- buyer name
- remaining amount
- transaction date
- total / paid / remaining
- quick payment action

### Pengaturan

This page is Profil Usaha Kamu, not a technical settings page.

Use grouped sections:

- Identitas Usaha
- Produksi Harian
- Harga Jual
- Biaya Patokan

Show calculated hints when useful.

## Components

### Buttons

- Primary action is purple.
- Mobile height is at least 52px for important actions.
- Use icon plus Indonesian label.
- Active state scales gently to 0.98.

### Cards

- Use 8px to 16px radius.
- Use warm borders and soft shadows.
- Receipt cards may use dashed dividers and stamp badges.
- Interactive cards can lift slightly.

### Forms

- Inputs are 48px to 52px tall.
- Labels are always visible.
- Numeric inputs use numeric keyboards.
- Helper copy should reduce confusion.

### Badges

Use text and color together. Never rely on color alone.

Recommended labels:

- Untung
- Rugi
- Lunas
- Belum Dibayar
- Perkiraan
- Aktual

## Motion

Motion should confirm action, not decorate the app.

- Receipt previews update with a soft fade.
- Save success can stamp once.
- Number transitions can be subtle.
- Bottom sheets slide from the bottom.
- Respect `prefers-reduced-motion`.

Avoid looping decorative motion, pulsing buttons, and floating background shapes.

## Accessibility

- Maintain strong contrast.
- Show visible focus rings.
- Use `aria-live` for live receipt previews.
- Icon-only controls need labels.
- Errors need readable text.
- Currency values must not truncate critical information.

## Implementation Notes

- Tailwind CSS 3.4 only.
- Keep Server Components for data fetching.
- Keep client components only for live previews and local form interaction.
- Use CSS variables from `src/app/globals.css`.
- Use Lucide icons consistently.
- No chart library is needed.
