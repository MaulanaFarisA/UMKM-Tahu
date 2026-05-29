# UI Max Everything — Plan + Implement Evidence

Target: all primary routes (`/login`, `/register`, `/beranda`, `/catat`, `/catat/penjualan`, `/catat/pengeluaran`, `/piutang`, `/pengaturan`)

Register:
- Brand / landing: `/login`, `/register`
- Product UI: authenticated app routes

Direction:
- Keep the warm UMKM identity, but sharpen it into a modern clean “premium receipt ledger” system.
- Avoid generic SaaS styling and preserve Bahasa Indonesia microcopy.
- Improve cohesion through shared background texture, glass navigation, softer cards, stronger hierarchy, and consistent interaction polish.

Audit Findings:
- Global system already has strong tokens, but the app surface is mostly flat cream; add subtle ambient background and receipt-paper texture for modern depth.
- Cards share structure but need clearer hover/active motion and more refined shadows.
- Mobile bottom nav works well; improve it with active affordance and calmer glass treatment.
- Form sections are functional; improve section rhythm and icon treatment without changing form behavior.
- Metric cards and banners can feel too plain; add consistent top-light and lift treatment.
- Public auth pages already use mockups; global polish will improve them without risky rewrites.

Implementation Checklist:
- Add global ambient background layers to `body`.
- Add subtle paper/noise texture to app root and major cards.
- Refine `.card`, `.receipt-card`, `.input-field`, buttons, badges, and spacing utilities.
- Improve `AppShell` header/nav/bottom nav affordance while preserving routes and copy.
- Improve shared `FormSection`, `MetricCard`, and `InfoBanner` treatments.
- Keep Tailwind v3, Plus Jakarta Sans, existing color tokens, and Bahasa Indonesia UI.

Verification Checklist:
- Run LSP diagnostics for changed files.
- Run `npm run typecheck`.
- Run `npm test`.
- Run `npm run build`.
- Smoke test rendered routes in browser and check console.
