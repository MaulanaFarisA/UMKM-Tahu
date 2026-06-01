import { formatRupiah } from '@/lib/format'
import { ArrowUpRight, TrendingUp, TrendingDown, Clock, Wallet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import CountUp from '@/components/count-up'

interface MetricCardProps {
  label: string
  value: number
  type?: 'default' | 'profit' | 'loss' | 'warning'
  sublabel?: string
  href?: string
  /** Animate the value with a count-up on mount */
  animate?: boolean
}

const toneMap: Record<
  NonNullable<MetricCardProps['type']>,
  { valueColor: string; iconBg: string; iconColor: string; glow: string; Icon: LucideIcon }
> = {
  default: {
    valueColor: 'var(--text-primary)',
    iconBg: 'linear-gradient(135deg, #F1F5F9, #E2E8F0)',
    iconColor: 'var(--text-tertiary)',
    glow: 'rgba(100,116,139,0.10)',
    Icon: Wallet,
  },
  profit: {
    valueColor: 'var(--profit-text)',
    iconBg: 'linear-gradient(135deg, #D1FAE5, #A7F3D0)',
    iconColor: '#047857',
    glow: 'rgba(16,185,129,0.18)',
    Icon: TrendingUp,
  },
  loss: {
    valueColor: 'var(--loss-text)',
    iconBg: 'linear-gradient(135deg, #FFE4E6, #FECDD3)',
    iconColor: '#E11D48',
    glow: 'rgba(244,63,94,0.16)',
    Icon: TrendingDown,
  },
  warning: {
    valueColor: 'var(--warn-text)',
    iconBg: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
    iconColor: '#B45309',
    glow: 'rgba(245,158,11,0.18)',
    Icon: Clock,
  },
}

export default function MetricCard({ label, value, type = 'default', sublabel, href, animate = false }: MetricCardProps) {
  const tone = toneMap[type]
  const Icon = tone.Icon

  const content = (
    <div className="card-premium card-roomy h-full relative">
      {/* Decorative tinted corner glow */}
      <span
        aria-hidden
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none"
        style={{ background: tone.glow, filter: 'blur(28px)' }}
      />

      <div className="relative flex items-start justify-between gap-2 mb-3">
        <span
          className="icon-tile w-9 h-9"
          style={{ background: tone.iconBg, boxShadow: `0 4px 10px -3px ${tone.glow}` }}
        >
          <Icon size={17} strokeWidth={2.4} color={tone.iconColor} />
        </span>
        {href && (
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-full transition-colors"
            style={{ background: 'var(--bg-subtle)' }}
          >
            <ArrowUpRight size={14} strokeWidth={2.4} color="var(--text-tertiary)" />
          </span>
        )}
      </div>

      <p className="relative text-[0.7rem] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
        {label}
      </p>
      {animate ? (
        <CountUp value={value} className="kpi-value relative block" style={{ color: tone.valueColor }} />
      ) : (
        <p className="kpi-value relative" style={{ color: tone.valueColor }}>{formatRupiah(value)}</p>
      )}
      {sublabel && <p className="relative text-xs mt-2 font-medium" style={{ color: 'var(--text-tertiary)' }}>{sublabel}</p>}
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block tap-highlight-none transition-transform hover:-translate-y-0.5 active:scale-[0.98]">
        {content}
      </a>
    )
  }
  return content
}
