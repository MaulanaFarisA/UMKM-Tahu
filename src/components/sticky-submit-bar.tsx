'use client'

import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { formatRupiah } from '@/lib/format'

type Variant = 'profit' | 'loss'

interface StickySubmitBarProps {
  /** Names of inputs to multiply for the live total (e.g. ['packs','price_per_pack']) */
  multiply: [string, string]
  label: string
  pendingLabel: string
  variant: Variant
  totalLabel?: string
}

/**
 * A scroll-aware sticky bar pinned to the bottom on mobile that shows the live
 * computed total and the submit button. Reads form inputs directly so it works
 * with React 19 server-action forms. Hidden on lg+ (desktop uses the side panel).
 */
export default function StickySubmitBar({
  multiply,
  label,
  pendingLabel,
  variant,
  totalLabel = 'Total',
}: StickySubmitBarProps) {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)

  useEffect(() => {
    const inA = document.querySelector<HTMLInputElement>(`input[name="${multiply[0]}"]`)
    const inB = document.querySelector<HTMLInputElement>(`input[name="${multiply[1]}"]`)
    const onA = () => setA(Number(inA?.value ?? 0))
    const onB = () => setB(Number(inB?.value ?? 0))
    inA?.addEventListener('input', onA)
    inB?.addEventListener('input', onB)
    onA(); onB()
    return () => {
      inA?.removeEventListener('input', onA)
      inB?.removeEventListener('input', onB)
    }
  }, [multiply])

  const total = (Number.isFinite(a) && a > 0 ? a : 0) * (Number.isFinite(b) && b > 0 ? b : 0)
  const accent = variant === 'profit' ? 'var(--profit)' : 'var(--loss)'

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-20 px-4 pt-3"
      style={{
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        background: 'linear-gradient(to top, var(--bg) 70%, transparent)',
      }}
    >
      <div
        className="rounded-2xl p-2.5 flex items-center gap-3"
        style={{
          background: 'rgba(255,255,255,0.95)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="pl-2 min-w-0 flex-shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>{totalLabel}</p>
          <p className="money-sm" style={{ color: accent, fontVariantNumeric: 'tabular-nums' }}>
            {variant === 'loss' && total > 0 ? '-' : ''}{formatRupiah(total)}
          </p>
        </div>
        <div className="flex-1">
          <BarButton label={label} pendingLabel={pendingLabel} variant={variant} />
        </div>
      </div>
    </div>
  )
}

function BarButton({ label, pendingLabel, variant }: { label: string; pendingLabel: string; variant: Variant }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${variant === 'profit' ? 'btn-primary' : 'btn-danger'} w-full`}
      style={{ minHeight: '52px' }}
    >
      {pending ? pendingLabel : label}
    </button>
  )
}
