# /ui-max — UMKM UI Direction + Polish Orchestrator

**Purpose**: Combine UI UX Pro Max (design direction engine) and Impeccable (critique/audit/polish layer) for the UMKM tofu bookkeeping app.

**Invocation**: `ui-max <target-route>`

**Example**: `ui-max beranda` or `ui-max catat/penjualan`

---

## Workflow

### 1. Classify Target Register

Determine which design register applies:

- **Product UI** (authenticated screens): `/beranda`, `/catat/penjualan`, `/catat/pengeluaran`, `/laporan`, `/profil`
  - Treatment: Bookkeeping dashboard, functional clarity, warm UMKM identity
  
- **Brand/Landing** (public screens): `/login`, `/register`, `/` (landing)
  - Treatment: Warm UMKM brand presence, welcoming, accessible

### 2. Run UI UX Pro Max Direction Phase

Invoke the UI UX Pro Max skill to establish design direction:

```
skill(name="ui-ux-pro-max", user_message="Target: {target-route}, Register: {product|brand}, Constraints: Bahasa Indonesia microcopy only, Tailwind v3, warm UMKM tokens (--color-primary, --color-secondary), Plus Jakarta Sans font")
```

**Direction phase outputs**:
- Design system recommendations (color, typography, spacing)
- Component patterns aligned to register
- Micro-interaction guidance
- Accessibility checklist

### 3. Run Impeccable Critique + Polish Phase

Invoke Impeccable commands in sequence:

```
skill(name="impeccable", user_message="critique: {target-route} — audit visual hierarchy, spacing, color contrast, typography consistency")
skill(name="impeccable", user_message="polish: {target-route} — refine micro-interactions, hover states, transitions, accessibility")
```

**Critique phase outputs**:
- Visual hierarchy audit
- Spacing/alignment violations
- Color contrast issues
- Typography consistency gaps

**Polish phase outputs**:
- Refined interaction patterns
- Smooth transitions and animations
- Accessibility hardening
- Final design recommendations

### 4. Synthesize + Save Evidence

Combine direction + critique + polish into a single evidence file:

**Path**: `.omo/evidence/ui-max-{target}-{timestamp}.md`

**Contents**:
- Target route and register classification
- Design direction (from UI UX Pro Max)
- Critique findings (from Impeccable critique)
- Polish recommendations (from Impeccable polish)
- Implementation checklist

---

## Constraints (Non-Negotiable)

- ✅ **Bahasa Indonesia only** — All user-facing microcopy must be in Bahasa Indonesia. No English in UMKM app UI.
- ✅ **Tailwind CSS v3** — Use Tailwind v3 syntax only. No v4 features.
- ✅ **Warm UMKM tokens** — Preserve existing CSS tokens: `--color-primary`, `--color-secondary`, `--color-accent`, `--color-neutral-*`
- ✅ **Plus Jakarta Sans** — Preserve existing font stack. Do not introduce new typefaces.
- ✅ **Planning-only** — Do NOT edit app source files during direction/critique/polish runs. Generate recommendations only.
- ✅ **Evidence required** — All runs must save findings to `.omo/evidence/` with timestamp.

---

## Implementation Notes

- **No wholesale skill copying**: Reference UI UX Pro Max and Impeccable by skill name only. Do not embed their full content.
- **Register-aware**: Tailor design direction and critique to the target register (product vs brand).
- **Iterative**: Run critique → polish → refine in cycles until design direction is locked.
- **Accessible**: All recommendations must meet WCAG 2.1 AA minimum.

---

## Success Criteria

✅ Direction phase completes with design system recommendations  
✅ Critique phase identifies visual/spacing/color/typography issues  
✅ Polish phase refines interactions and accessibility  
✅ Evidence file saved with all findings and implementation checklist  
✅ No source files modified (planning-only)  
✅ All microcopy recommendations are in Bahasa Indonesia  
