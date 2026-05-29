# QA Route Checklist — Full-Route Browser Pass (Task 15)

## Precondition
**Dev server MUST be running before starting QA:**
```bash
npm run dev
```
Server will start at `http://localhost:3000`

---

## Route Inventory

### 1. Landing / Login Page
- **Route:** `/`
- **Purpose:** Public landing page with login CTA
- **Desktop (1280×800):** `full-route-qa/landing-desktop.png`
- **Mobile (375×812):** `full-route-qa/landing-mobile.png`
- **Mobile Overflow Check:** Verify no horizontal scroll, all CTAs tappable

### 2. Login Form
- **Route:** `/login`
- **Purpose:** Email/password login form
- **Desktop (1280×800):** `full-route-qa/login-desktop.png`
- **Mobile (375×812):** `full-route-qa/login-mobile.png`
- **Mobile Overflow Check:** Verify form fields stack vertically, no horizontal scroll

### 3. Register Form
- **Route:** `/register`
- **Purpose:** Email/password registration form
- **Desktop (1280×800):** `full-route-qa/register-desktop.png`
- **Mobile (375×812):** `full-route-qa/register-mobile.png`
- **Mobile Overflow Check:** Verify form fields stack vertically, no horizontal scroll

### 4. Dashboard (Beranda)
- **Route:** `/beranda`
- **Purpose:** Main dashboard with daily summary, sales/expense cards
- **Desktop (1280×800):** `full-route-qa/beranda-desktop.png`
- **Mobile (375×812):** `full-route-qa/beranda-mobile.png`
- **Mobile Overflow Check:** Verify cards stack vertically, summary section scrolls without horizontal overflow

### 5. Record Menu (Catat)
- **Route:** `/catat`
- **Purpose:** Menu to choose between sales or expense recording
- **Desktop (1280×800):** `full-route-qa/catat-desktop.png`
- **Mobile (375×812):** `full-route-qa/catat-mobile.png`
- **Mobile Overflow Check:** Verify menu buttons are tappable, no horizontal scroll

### 6. Sales Form (Catat Penjualan)
- **Route:** `/catat/penjualan`
- **Purpose:** Form to record daily sales with buyer name, quantity, payment status
- **Desktop (1280×800):** `full-route-qa/catat-penjualan-desktop.png`
- **Mobile (375×812):** `full-route-qa/catat-penjualan-mobile.png`
- **Mobile Overflow Check:** Verify form sections scroll vertically, no horizontal scroll, all inputs accessible

### 7. Expense Form (Catat Pengeluaran)
- **Route:** `/catat/pengeluaran`
- **Purpose:** Form to record daily expenses (ingredients, utilities, labor)
- **Desktop (1280×800):** `full-route-qa/catat-pengeluaran-desktop.png`
- **Mobile (375×812):** `full-route-qa/catat-pengeluaran-mobile.png`
- **Mobile Overflow Check:** Verify form sections scroll vertically, no horizontal scroll, all inputs accessible

### 8. Receivables (Piutang)
- **Route:** `/piutang`
- **Purpose:** List of unpaid invoices with payment tracking
- **Desktop (1280×800):** `full-route-qa/piutang-desktop.png`
- **Mobile (375×812):** `full-route-qa/piutang-mobile.png`
- **Mobile Overflow Check:** Verify receivables list scrolls vertically, no horizontal scroll, payment buttons tappable

### 9. Settings (Pengaturan)
- **Route:** `/pengaturan`
- **Purpose:** User profile and business settings
- **Desktop (1280×800):** `full-route-qa/pengaturan-desktop.png`
- **Mobile (375×812):** `full-route-qa/pengaturan-mobile.png`
- **Mobile Overflow Check:** Verify settings form scrolls vertically, no horizontal scroll, all inputs accessible

---

## Evidence Storage
All screenshots saved to: `.omo/evidence/full-route-qa/`

## Verification Checklist
- [ ] Dev server running at localhost:3000
- [ ] All 9 routes accessible
- [ ] Desktop screenshots (1280×800) captured for all routes
- [ ] Mobile screenshots (375×812) captured for all routes
- [ ] No horizontal overflow on mobile viewports
- [ ] All interactive elements (buttons, inputs, links) visible and tappable on mobile
- [ ] Evidence filenames match naming convention
