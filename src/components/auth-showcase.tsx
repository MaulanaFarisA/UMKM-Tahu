'use client'

import CountUp from '@/components/count-up'
import {
  ReceiptText,
  ShoppingBag,
  Receipt,
  ArrowUp,
  ArrowDownRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'

interface AuthShowcaseProps {
  eyebrow: string
  headline: string
  sub: string
}

/**
 * Animated product glimpse shown on the right side of the auth pages (desktop).
 * A floating mini-dashboard with a counting-up profit number + sheen, plus
 * floating accent chips. Sells the value at a glance. Reduced-motion safe.
 */
export default function AuthShowcase({ eyebrow, headline, sub }: AuthShowcaseProps) {
  return (
    <div className="relative w-full max-w-md">
      {/* Aurora depth */}
      <span aria-hidden className="aurora" style={{ width: 320, height: 320, top: -80, right: -40, background: 'rgba(99,102,241,0.35)' }} />
      <span aria-hidden className="aurora" style={{ width: 260, height: 260, bottom: -60, left: -50, background: 'rgba(16,185,129,0.30)' }} />

      <div className="relative">
        {/* Marketing copy */}
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
          style={{ background: 'var(--accent-light)', color: 'var(--accent-deep)' }}
        >
          <Sparkles size={12} strokeWidth={2.5} />
          {eyebrow}
        </span>
        <h2 className="mt-4 font-extrabold" style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.5rem, 2vw, 1.875rem)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
          {headline}
        </h2>
        <p className="mt-2 text-sm max-w-sm" style={{ color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
          {sub}
        </p>

        {/* Floating mini dashboard */}
        <div className="relative mt-8 float">
          <MiniDashboard />

          {/* Floating chips */}
          <div
            className="absolute -left-5 top-16 rounded-xl px-3 py-2 flex items-center gap-2 speeddial-item"
            style={{ background: 'var(--bg-white)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)', animationDelay: '0.5s' }}
          >
            <CheckCircle2 size={15} strokeWidth={2.5} color="var(--profit)" />
            <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Penjualan tersimpan</span>
          </div>
          <div
            className="absolute -right-4 bottom-10 rounded-xl px-3 py-2 flex items-center gap-1.5 speeddial-item"
            style={{ background: 'var(--accent-gradient)', boxShadow: 'var(--shadow-accent)', animationDelay: '0.7s' }}
          >
            <span className="text-xs font-extrabold text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>+Rp 50.000</span>
          </div>
        </div>
      </div>
    </div>
  )
}


function MiniDashboard() {
  return (
    <div
      className="rounded-2xl overflow-hidden w-full"
      style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-xl)', background: 'var(--bg-white)' }}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-2" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-gradient)' }}>
          <ReceiptText size={11} strokeWidth={2.5} color="white" />
        </div>
        <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Buku Tahu</span>
        <div className="ml-auto flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--border-strong)' }} />
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Verdict */}
        <div
          className="rounded-xl p-4 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F0FDF9 100%)', border: '1.5px solid var(--profit-border)' }}
        >
          <div aria-hidden className="absolute top-0 left-0 right-0" style={{ height: '2px', background: 'linear-gradient(90deg, #34D399, #059669)' }} />
          <p className="font-bold uppercase" style={{ color: 'var(--profit)', fontSize: '0.6rem', letterSpacing: '0.08em' }}>Untung hari ini</p>
          <span className="relative inline-flex mt-1">
            <CountUp
              value={302556}
              className="font-extrabold"
              style={{ color: '#047857', fontSize: '1.65rem', letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums' }}
            />
            <span aria-hidden className="money-sheen" />
          </span>
          <div className="flex items-center gap-3 mt-2.5 pt-2.5" style={{ borderTop: '1px dashed var(--profit-border)' }}>
            <span className="text-[0.65rem] font-semibold" style={{ color: 'var(--text-secondary)' }}>Masuk Rp 1,01jt</span>
            <span className="text-[0.65rem] font-semibold" style={{ color: 'var(--text-tertiary)' }}>Keluar Rp 711rb</span>
          </div>
        </div>

        {/* Action pair */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl p-2.5" style={{ background: 'linear-gradient(135deg, var(--profit-bg), var(--profit-bg-deep))', border: '1px solid var(--profit-border)' }}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-white)' }}>
                <ShoppingBag size={11} strokeWidth={2.2} color="var(--profit)" />
              </div>
              <ArrowUp size={10} strokeWidth={2.5} color="var(--profit)" />
            </div>
            <p className="font-bold" style={{ color: 'var(--profit-text)', fontSize: '0.65rem' }}>Catat Penjualan</p>
          </div>
          <div className="rounded-xl p-2.5" style={{ background: 'linear-gradient(135deg, var(--loss-bg), var(--loss-bg-deep))', border: '1px solid var(--loss-border)' }}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-white)' }}>
                <Receipt size={11} strokeWidth={2.2} color="var(--loss)" />
              </div>
              <ArrowDownRight size={10} strokeWidth={2.5} color="var(--loss)" />
            </div>
            <p className="font-bold" style={{ color: 'var(--loss-text)', fontSize: '0.65rem' }}>Catat Pengeluaran</p>
          </div>
        </div>
      </div>
    </div>
  )
}
