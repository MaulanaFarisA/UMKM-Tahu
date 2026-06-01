'use client'

import { useEffect, useState } from 'react'
import { formatRupiah } from '@/lib/format'

interface CashflowChartProps {
  income: number
  expense: number
}

/**
 * Animated donut chart showing income vs expense, with the net figure in the center.
 * The ring strokes draw in on mount (skipped for reduced-motion users).
 */
export default function CashflowChart({ income, expense }: CashflowChartProps) {
  const total = income + expense
  const incomeRatio = total > 0 ? income / total : 0
  const expenseRatio = total > 0 ? expense / total : 0
  const net = income - expense

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || total === 0) {
      setProgress(1)
      return
    }
    let raf = 0
    const start = performance.now()
    const dur = 900
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      setProgress(ease(p))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [total])

  // Geometry
  const size = 148
  const stroke = 15
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const gap = total > 0 && income > 0 && expense > 0 ? 0.02 : 0 // small gap between segments
  const incomeLen = Math.max(0, (incomeRatio - gap) * c * progress)
  const expenseLen = Math.max(0, (expenseRatio - gap) * c * progress)
  const expenseOffset = incomeRatio * c

  return (
    <div className="flex items-center justify-center sm:justify-start gap-6 flex-wrap sm:flex-nowrap">
      <div className="relative flex-shrink-0 mx-auto sm:mx-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          {/* Track */}
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--bg-subtle)" strokeWidth={stroke} />
          {total > 0 ? (
            <>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke="url(#incomeGrad)"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${incomeLen} ${c - incomeLen}`}
                strokeDashoffset={0}
                style={{ filter: 'drop-shadow(0 2px 5px rgba(16,185,129,0.35))' }}
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke="url(#expenseGrad)"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${expenseLen} ${c - expenseLen}`}
                strokeDashoffset={-expenseOffset}
                style={{ filter: 'drop-shadow(0 2px 5px rgba(244,63,94,0.3))' }}
              />
            </>
          ) : null}
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
          </defs>
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3">
          <span className="text-[9px] font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>
            Selisih
          </span>
          <span
            className="font-extrabold leading-tight mt-0.5"
            style={{
              color: net >= 0 ? 'var(--profit)' : 'var(--loss)',
              fontSize: 'clamp(0.85rem, 4vw, 1rem)',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.02em',
            }}
          >
            {net < 0 ? '-' : ''}{formatRupiah(Math.abs(net))}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex-1 min-w-0 space-y-2.5 w-full">
        <LegendRow color="linear-gradient(135deg, #34D399, #059669)" label="Uang Masuk" value={income} pct={Math.round(incomeRatio * 100)} />
        <LegendRow color="linear-gradient(135deg, #FB7185, #E11D48)" label="Uang Keluar" value={expense} pct={Math.round(expenseRatio * 100)} />
      </div>
    </div>
  )
}

function LegendRow({ color, label, value, pct }: { color: string; label: string; value: number; pct: number }) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl px-3 py-2.5"
      style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-soft)' }}
    >
      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{label}</span>
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
            style={{ color: 'var(--text-tertiary)', background: 'var(--bg-white)' }}
          >
            {pct}%
          </span>
        </div>
        <p className="money-xs mt-0.5" style={{ color: 'var(--text-primary)' }}>{formatRupiah(value)}</p>
      </div>
    </div>
  )
}
