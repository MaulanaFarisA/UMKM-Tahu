import { TriangleAlert } from 'lucide-react'
import CountUp from '@/components/count-up'
import { formatRupiah } from '@/lib/format'

type Tone = 'profit' | 'loss' | 'neutral'

interface HeroVerdictProps {
  netProfit: number
  todayOmzet: number
  todayExpenseTotal: number
  marginPercent: number
  hasData: boolean
  hasWarning: boolean
  dateLabel: string
  /** The two big action buttons are passed in as children */
  children: React.ReactNode
}

const toneStyles: Record<
  Tone,
  { money: string; chipBg: string; chipText: string; chipDot: string; auroraA: string; auroraB: string; surface: string; border: string }
> = {
  profit: {
    money: '#047857',
    chipBg: 'rgba(16,185,129,0.14)',
    chipText: '#065F46',
    chipDot: '#10B981',
    auroraA: 'rgba(16,185,129,0.40)',
    auroraB: 'rgba(45,212,191,0.34)',
    surface: 'linear-gradient(135deg, #FFFFFF 0%, #F0FDF9 100%)',
    border: 'rgba(16,185,129,0.28)',
  },
  loss: {
    money: '#BE123C',
    chipBg: 'rgba(244,63,94,0.14)',
    chipText: '#9F1239',
    chipDot: '#F43F5E',
    auroraA: 'rgba(244,63,94,0.36)',
    auroraB: 'rgba(251,113,133,0.30)',
    surface: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F6 100%)',
    border: 'rgba(244,63,94,0.26)',
  },
  neutral: {
    money: '#312E81',
    chipBg: 'rgba(99,102,241,0.14)',
    chipText: '#4338CA',
    chipDot: '#6366F1',
    auroraA: 'rgba(99,102,241,0.34)',
    auroraB: 'rgba(168,85,247,0.26)',
    surface: 'linear-gradient(135deg, #FFFFFF 0%, #F5F6FF 100%)',
    border: 'rgba(99,102,241,0.24)',
  },
}


export default function HeroVerdict({
  netProfit,
  todayOmzet,
  todayExpenseTotal,
  marginPercent,
  hasData,
  hasWarning,
  dateLabel,
  children,
}: HeroVerdictProps) {
  const isProfit = netProfit > 0
  const isLoss = netProfit < 0
  const tone: Tone = isProfit ? 'profit' : isLoss ? 'loss' : 'neutral'
  const t = toneStyles[tone]

  const headline = isProfit
    ? 'Untung hari ini'
    : isLoss
    ? 'Rugi hari ini'
    : hasData
    ? 'Impas hari ini'
    : 'Belum ada catatan hari ini'

  const statusLabel = isProfit ? 'Untung' : isLoss ? 'Rugi' : hasData ? 'Impas' : 'Mulai'

  return (
    <section
      className="relative overflow-hidden rounded-3xl slide-up-1"
      style={{ background: t.surface, border: `1px solid ${t.border}`, boxShadow: 'var(--shadow-xl)' }}
      aria-label="Ringkasan laba hari ini"
    >
      {/* Aurora depth */}
      <span aria-hidden className="aurora" style={{ width: 320, height: 320, top: -140, right: -70, background: t.auroraA }} />
      <span aria-hidden className="aurora" style={{ width: 240, height: 240, bottom: -120, left: -50, background: t.auroraB }} />
      {/* Decorative dotted texture, top-right */}
      <span
        aria-hidden
        className="texture-dots absolute top-0 right-0 w-40 h-40 pointer-events-none"
        style={{ color: t.chipDot, opacity: 0.12, maskImage: 'radial-gradient(circle at top right, black, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle at top right, black, transparent 70%)' }}
      />

      <div className="relative grid lg:grid-cols-[1.15fr_1fr] gap-5 lg:gap-8 p-6 md:p-7 lg:p-8">
        {/* Left: verdict */}
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider"
              style={{
                background: 'rgba(255,255,255,0.7)',
                color: t.chipText,
                border: `1px solid ${t.border}`,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.chipDot, boxShadow: `0 0 0 3px ${t.chipBg}` }} />
              {statusLabel}
            </span>
            <span className="text-xs font-medium capitalize" style={{ color: 'var(--text-tertiary)' }}>
              {dateLabel}
            </span>
          </div>

          <p className="text-sm font-semibold mt-5" style={{ color: 'var(--text-secondary)' }}>
            {headline}
          </p>

          <div className="flex items-baseline gap-2 mt-1.5 min-w-0">
            {hasData && isLoss && (
              <span className="text-3xl font-extrabold leading-none" style={{ color: t.money, opacity: 0.7 }}>
                -
              </span>
            )}
            <span className="relative inline-flex min-w-0">
              <CountUp
                value={Math.abs(netProfit)}
                className="money-hero block truncate"
                style={{ color: t.money, fontSize: 'clamp(2rem, 8vw, 3.5rem)' }}
              />
              {isProfit && hasData && <span aria-hidden className="money-sheen" />}
            </span>
          </div>

          {hasData ? (
            <div className="flex flex-wrap items-center gap-2 mt-5">
              <Stat dot="var(--profit)" label="Masuk" value={formatRupiah(todayOmzet)} />
              <Stat dot="var(--loss)" label="Keluar" value={formatRupiah(todayExpenseTotal)} />
              <Stat dot={t.chipDot} label="Margin" value={`${marginPercent}%`} />
            </div>
          ) : (
            <p className="text-sm mt-4 max-w-sm" style={{ color: 'var(--text-tertiary)' }}>
              Catat penjualan dan pengeluaran pertama kamu, laba hari ini langsung muncul di sini.
            </p>
          )}

          {hasWarning && hasData && (
            <div
              className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-xl"
              style={{ background: 'var(--warn-bg)', border: '1px solid var(--warn-border)' }}
            >
              <TriangleAlert size={13} strokeWidth={2.5} color="var(--warn-text)" />
              <span className="text-xs font-semibold" style={{ color: 'var(--warn-text)' }}>
                Belum semua dicatat, angka masih perkiraan
              </span>
            </div>
          )}
        </div>

        {/* Right: the two big actions */}
        <div className="flex flex-col gap-3 justify-center">
          <p className="section-heading">Catat sekarang</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ dot, label, value }: { dot: string; label: string; value: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full pl-2.5 pr-3 py-1.5"
      style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(15,23,42,0.06)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
    >
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: dot }} />
      <span className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>{label}</span>
      <span className="text-xs font-bold" style={{ color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </div>
  )
}
