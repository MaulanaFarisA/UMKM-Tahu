# Buku Tahu — Design Master Plan

> Goal: turn a clean-but-flat bookkeeping app into a **bold, premium, "wow-factor"** product
> that a tofu UMKM owner is *proud* to open every morning — while making the two daily jobs
> (**Catat Penjualan** + **Catat Pengeluaran**) the loudest, most reachable things on screen.

---

## 0. The Core Problem (why we are doing this)

Today the dashboard reads like a *report*: greeting → passive profit verdict → metrics →
cashflow meter → activity → receivables → monthly → **then finally** the record buttons.

The single most-used action in the whole app is parked at the **bottom**. That is backwards.

**The fix in one sentence:** the dashboard should open like a *cockpit* — "here's how today
is going" + "tap here to record" — everything else is supporting detail you scroll *into*,
not *through*.

---

## 1. Design Vision & North Star

**Personality:** confident, warm, money-smart. Think "Revolut meets a friendly warung
ledger." Premium fintech polish, but never cold or corporate.

**Three feelings we are engineering for:**
1. **Instant clarity** — in under 1 second the owner knows: am I up or down today?
2. **Effortless action** — recording a sale or cost is *one obvious tap* from anywhere.
3. **Delight** — numbers animate, profit days feel celebratory, the UI feels alive.

**What "wow" means here (not just gradients):**
- A **living hero** that changes mood with the day's result (color, motion, copy).
- **Big, tactile, dual action buttons** that dominate the first screen.
- **Animated money** (count-up), **animated charts**, **spring-based** interactions.
- A **persistent quick-record affordance** that follows the user everywhere.
- Cohesive **depth system** (layered shadows, glass, glow) used with restraint.


---

## 2. Design Language (the system that makes it cohesive)

### 2.1 Color & Mood
Keep the existing token architecture (CSS variables) but push it further:

- **Primary accent:** indigo `#6366F1` → deep `#4338CA` gradient (already in place). Keep.
- **Semantic money colors:** emerald (profit), rose (loss), amber (receivables/pending).
- **NEW — "mood surfaces":** the hero background is **driven by the day's verdict**:
  - Profit → emerald-tinted aurora gradient + soft green glow.
  - Loss → rose-tinted gradient + restrained red glow.
  - Break-even / empty → neutral indigo-tinted gradient (inviting, not alarming).
- **NEW — mesh/aurora backgrounds:** add 2–3 large, blurred radial color blobs behind the
  hero (very low opacity) for depth. This is the single biggest "premium" lever.

### 2.2 Typography
- Keep **Plus Jakarta Sans**. Introduce a clear **display tier** for money:
  - `display-money`: clamp(2.75rem → 4rem), weight 800, tabular-nums, tight tracking.
  - Big numbers are the *art* of this app — let them breathe and dominate.
- Tighten the type scale into 6 deliberate steps (display / h1 / h2 / body / small / micro).
- Use **tabular figures everywhere** money appears so digits don't jitter on update.

### 2.3 Spacing & Layout
- 8px base grid (already implied). Formalize: 4/8/12/16/24/32/48/64.
- Generous vertical rhythm on the dashboard — let sections feel like *rooms*, not a list.
- Max content width stays 1200px (wide) for dashboard; forms stay 960px.

### 2.4 Depth System (use sparingly, consistently)
- **Tier 1 (flat):** page background + aurora blobs.
- **Tier 2 (cards):** white, soft shadow, 18–24px radius.
- **Tier 3 (hero / primary actions):** elevated shadow + subtle inner highlight + glow.
- **Tier 4 (floating):** FAB, sticky record bar, toasts — strongest shadow, glass blur.

### 2.5 Motion (the soul of the "wow")
- **Entrance:** staggered slide-up (already have) — refine timing to 60ms steps.
- **Money count-up:** numbers animate from 0 → value on load (~700ms ease-out).
- **Charts draw in:** bars/rings animate width/stroke on mount.
- **Press feedback:** scale 0.97 + shadow compress on `:active` (tactile).
- **Hero shimmer:** very subtle moving highlight on profit days only.
- **Respect `prefers-reduced-motion`** — disable count-up + shimmer, keep instant states.


---

## 3. Information Architecture — the BIG reorder

### 3.1 Current order (problematic)
1. Greeting
2. Hero verdict (passive) + "next action" hints
3. Metric cards (in/out/unpaid)
4. Cashflow meter + activity
5. Receivables alert
6. Monthly summary
7. **Catat Penjualan / Pengeluaran ← buried here**
8. Secondary links

### 3.2 New order (action-first cockpit)
1. **Compact greeting bar** — name, date, tiny status chip. One line. Minimal.
2. **HERO ZONE (the wow):** a single composed band that contains BOTH:
   - Left/top: today's **verdict + animated profit number** + in/out micro-stats.
   - Right/bottom: the **two giant action buttons** (Catat Penjualan / Catat Pengeluaran).
   - On desktop these sit side-by-side; on mobile the actions sit immediately under the
     verdict, **above the fold**. This is the core fix.
3. **Today's pulse:** 3 metric cards (Uang Masuk / Keluar / Belum Dibayar) — now with
   count-up + tiny sparkline/trend.
4. **Cashflow visual:** upgrade the flat meter into a proper animated chart
   (donut or stacked bar with drawing animation).
5. **Activity feed:** today's running receipt (keep, but restyle as a timeline).
6. **Receivables spotlight:** only if unpaid > 0 — bold amber call-to-collect.
7. **Monthly summary:** 3 stat cards + a 7/30-day mini trend line.
8. **Quiet footer links:** settings, etc.

### 3.3 Make "Catat" reachable from EVERYWHERE
- Keep the mobile **center FAB** (good) but make it the brand's hero color + gentle pulse.
- **NEW — desktop:** add a persistent **"+ Catat" primary button** in the header (right side),
  plus optionally a small sticky record bar on scroll.
- **NEW — speed-dial:** tapping the FAB can expand into two labeled choices
  (Penjualan / Pengeluaran) with a spring animation, instead of routing to a menu page.
  (Optional phase 2 — the menu page still works as fallback.)


---

## 4. Page-by-Page Redesign

### 4.1 Dashboard / Beranda (the flagship — 80% of the wow lives here)

**Hero band — the centerpiece.** A large rounded container (Tier 3 depth) with an
aurora/mesh background tinted by the verdict. Inside:

- **Eyebrow:** "Laba hari ini" + date + live status chip (Untung / Rugi / Impas).
- **Display money:** huge animated count-up number, color = verdict. If loss, show a
  minus and rose tone; if empty, show an inviting "Mulai catat hari ini" state.
- **Micro-stats row:** Masuk ● / Keluar ● / Margin % as small pills.
- **THE TWO ACTIONS (right side on desktop, directly below on mobile):**
  - **Catat Penjualan** — large emerald gradient button, shopping-bag icon, "Uang masuk".
  - **Catat Pengeluaran** — large rose/amber button, receipt icon, "Uang keluar".
  - Both are tall (min 96–120px), tactile, with icon + title + subtitle + arrow.
  - These are the visual anchors of the whole screen.

**Empty/first-time state:** if no data yet, the hero becomes an onboarding moment —
"Belum ada catatan hari ini. Yuk mulai!" with the two buttons even more prominent and a
subtle arrow/pulse pointing at Catat Penjualan.

**Metric trio:** restyle MetricCard with: count-up value, an up/down trend indicator, and
a faint sparkline background. Left-accent border keeps semantic color coding.

**Cashflow chart:** replace the flat bar with an **animated donut** (Masuk vs Keluar) OR a
stacked horizontal bar that *draws in*. Add a centered net figure.

**Activity timeline:** vertical timeline with colored nodes (green sale / red expense),
time stamps, amounts on the right. Empty state stays friendly.

**Monthly band:** 3 stat cards + a **7-day trend mini line chart** (sparkline) to give a
sense of momentum. This is where "rich, not simple" pays off.

### 4.2 Catat hub + forms
- The `/catat` menu page becomes a **bold two-choice splash** (big emerald + rose cards) —
  but since the dashboard now hosts the actions, this is mostly the FAB target/fallback.
- **Forms (penjualan/pengeluaran):** keep the strong live-preview layout. Upgrades:
  - Sticky, animated **"receipt preview"** that updates with spring as you type.
  - Larger, friendlier numeric inputs (big tap targets, Rp prefix, thousand separators).
  - A bold sticky submit bar at the bottom with the computed total shown on the button.
  - Quick-amount chips (e.g., +10, +50, +100 bungkus) for speed.

### 4.3 Piutang / Tagihan
- **Hero total** of outstanding receivables with count-up + "tagih" energy.
- Each debtor = a card with a **progress ring** (paid vs total), one-tap "Lunasi".
- Celebrate when a debt hits zero (micro-confetti / checkmark pop).
- Clear split: "Belum dibayar" (loud) vs "Sudah lunas" (quiet, collapsed).

### 4.4 Pengaturan / Profil Usaha
- Calmer, form-focused. Grouped cards with colored left accents (already good).
- Add a **live "production math" preview** card that recomputes as you edit assumptions.

### 4.5 Auth (Login / Register)
- Premium centered card on an **aurora background** (already moved this direction).
- Add a subtle animated product glimpse (mini dashboard) on desktop to sell the value.
- Strong single primary CTA; social-proof / "gratis untuk UMKM" reassurance line.


---

## 5. Navigation & Shell

- **Header:** glass blur (keep). Add right-side **"+ Catat"** primary button on desktop.
  Brand mark on left, nav center, actions right.
- **Desktop nav:** pill-style active states (keep), but make "Catat" the highlighted item.
- **Mobile bottom nav:** keep 4 items + center FAB. Upgrade FAB:
  - Brand gradient fill, soft pulsing glow ring, scale-press feedback.
  - Optional speed-dial expand → Penjualan / Pengeluaran.
- **Scroll behavior:** header condenses slightly on scroll; FAB always reachable.

---

## 6. Signature "Wow" Moments (the memorable details)

1. **Verdict-driven hero** — the whole top of the app changes color & copy with the result.
2. **Count-up money** — every key figure animates up on load. Feels alive & premium.
3. **Drawing charts** — donut/sparkline/progress rings animate their values in.
4. **Profit celebration** — on a strongly profitable day, a tasteful one-time shimmer or
   micro-confetti behind the hero number (subtle, never childish, dismissible).
5. **Tactile actions** — spring press, glow on hover, satisfying button depth.
6. **Speed-dial FAB** — playful, fast access to the two record flows.
7. **Receipt-preview that breathes** — the live form preview springs as values change.
8. **Aurora depth** — soft blurred color fields give the flat UI real dimension.

> Rule: wow comes from **motion + hierarchy + depth**, not from clutter. Every effect must
> serve clarity. If an animation distracts from "am I up or down?", cut it.

---

## 7. Component System (what to build/upgrade)

| Component | Change |
|---|---|
| `HeroVerdict` (new) | Verdict band: mood bg, count-up money, micro-stats, slots for actions |
| `ActionButtonBig` (new) | Tall tactile record button (icon + title + subtitle + arrow) |
| `MetricCard` | Add count-up, trend chip, faint sparkline |
| `CashflowChart` (new) | Animated donut or stacked bar w/ net figure |
| `ActivityTimeline` (new) | Timeline-style today feed with colored nodes |
| `TrendSparkline` (new) | Tiny 7/30-day line for momentum |
| `ProgressRing` (new) | Paid-vs-total ring for receivables |
| `CountUp` (new, client) | Reusable animated number (respects reduced-motion) |
| `Fab` / `SpeedDial` | Pulsing brand FAB with optional expand |
| `StickyRecordBar` (new) | Optional scroll-aware quick-record bar |

Most are presentational/client components layered over existing server data — **no data
model changes required**.

---

## 8. Accessibility & Quality Guardrails
- All animated numbers have a static fallback; honor `prefers-reduced-motion`.
- Maintain WCAG AA contrast on all verdict moods (test rose/emerald text on tinted bg).
- Every action button has a real focus ring + aria-label; FAB speed-dial is keyboard-usable.
- Charts have text equivalents (the numbers are always visible, chart is enhancement).
- Tap targets ≥ 44px; bottom nav + FAB never overlap content (safe-area padding).


---

## 9. Implementation Roadmap (phased, prioritized)

### Phase 1 — Fix the hierarchy (highest impact, do first)
- [ ] Build `HeroVerdict` band with mood background + display money.
- [ ] Build `ActionButtonBig` and place **both record actions in the hero**, above the fold.
- [ ] Reorder Beranda sections per §3.2.
- [ ] Add `CountUp` to the hero number + metric cards.
- [ ] Add `+ Catat` button to desktop header; upgrade mobile FAB (glow + press).
> Outcome: the #1 daily action is unmissable; the app already feels dramatically better.

### Phase 2 — Add the polish & depth
- [ ] Aurora/mesh background layer behind hero (verdict-tinted).
- [ ] `CashflowChart` (animated donut/stacked bar) replacing the flat meter.
- [ ] `ActivityTimeline` restyle.
- [ ] `MetricCard` trend chips + faint sparkline.
- [ ] Form pages: sticky submit bar with live total, quick-amount chips, springy preview.

### Phase 3 — Signature delight
- [ ] `TrendSparkline` for monthly momentum.
- [ ] `ProgressRing` + zero-debt celebration on Piutang.
- [ ] Profit-day shimmer / micro-confetti on hero (subtle, reduced-motion aware).
- [ ] Speed-dial FAB expand (Penjualan / Pengeluaran).
- [ ] Auth page product-glimpse animation.

### Phase 4 — Refine & QA
- [ ] Cross-device pass (mobile / tablet / desktop), light perf check.
- [ ] Reduced-motion + contrast + keyboard audit.
- [ ] Tune motion timings; remove anything that distracts from the verdict.

---

## 10. Success Criteria
- "Catat Penjualan" + "Catat Pengeluaran" are visible **without scrolling** on a phone.
- A first-time visitor says "whoa" within the first 2 seconds (hero + motion).
- Owner can record a transaction in **≤ 2 taps** from any screen.
- The result of the day (up/down) is readable in **< 1 second**.
- Nothing decorative obscures the money. Depth and motion *serve* clarity.

---

### Appendix — Quick "before vs after" of the dashboard fold

**Before (mobile, above the fold):** greeting → verdict number → (scroll) → metrics →
(scroll) → meter → (scroll) → activity → ... → **finally** record buttons.

**After (mobile, above the fold):** compact greeting → **verdict number (animated)** →
**[ Catat Penjualan ] [ Catat Pengeluaran ]** → everything else lives below.
