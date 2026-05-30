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
      style={{ background: t.surface, border: `1px solid ${t.border}`, boxShadow: 'var(--shadow-lg)' }}
      aria-label="Ringkasan laba hari ini"
    >
      {/* Aurora depth */}
      <span aria-hidden className="aurora" style={{ width: 280, height: 280, top: -120, right: -60, background: t.auroraA }} />
      <span aria-hidden className="aurora" style={{ width: 220, height: 220, bottom: -110, left: -40, background: t.auroraB }} />

      <div className="relative grid lg:grid-cols-[1.15fr_1fr] gap-6 lg:gap-8 p-6 md:p-8">
        {/* Left: verdict */}
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
              style={{ background: t.chipBg, color: t.chipText }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.chipDot }} />
              {statusLabel}
            </span>
            <span className="text-xs font-medium capitalize" style={{ color: 'var(--text-tertiary)' }}>
              {dateLabel}
            </span>
          </div>

          <p className="text-sm font-semibold mt-4" style={{ color: 'var(--text-secondary)' }}>
            {headline}
          </p>

          <div className="flex items-baseline gap-2 mt-1">
            {hasData && isLoss && (
              <span className="text-3xl font-extrabold leading-none" style={{ color: t.money, opacity: 0.7 }}>
                -
              </span>
            )}
            <span className="relative inline-flex">
              <CountUp
                value={Math.abs(netProfit)}
                className="money-hero"
                style={{ color: t.money, fontSize: 'clamp(2.5rem, 9vw, 3.75rem)' }}
              />
              {isProfit && hasData && <span aria-hidden className="money-sheen" />}
            </span>
          </div>

          {hasData ? (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5">
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
          {children}
        </div>
      </div>
    </section>
  )
}

function Stat({ dot, label, value }: { dot: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: dot }} />
      <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{label}</span>
      <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{value}</span>
    </div>
  )
}
