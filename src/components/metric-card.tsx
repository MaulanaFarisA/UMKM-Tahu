import { formatRupiah } from '@/lib/format'
import { ArrowUpRight } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: number
  type?: 'default' | 'profit' | 'loss' | 'warning'
  sublabel?: string
  href?: string
}

const toneMap = {
  default: {
    accent: 'var(--border-strong)',
    valueColor: 'var(--text-primary)',
    bg: 'var(--bg-white)',
  },
  profit: {
    accent: 'var(--profit)',
    valueColor: 'var(--profit)',
    bg: 'linear-gradient(135deg, var(--bg-white) 0%, var(--profit-bg) 100%)',
  },
  loss: {
    accent: 'var(--loss)',
    valueColor: 'var(--loss)',
    bg: 'linear-gradient(135deg, var(--bg-white) 0%, var(--loss-bg) 100%)',
  },
  warning: {
    accent: 'var(--warn)',
    valueColor: 'var(--warn-text)',
    bg: 'linear-gradient(135deg, var(--bg-white) 0%, var(--warn-bg) 100%)',
  },
} as const

export default function MetricCard({
  label,
  value,
  type = 'default',
  sublabel,
  href,
}: MetricCardProps) {
  const tone = toneMap[type]

  const content = (
    <div
      className="card card-roomy h-full relative overflow-hidden transition-all"
      style={{
        border: '1px solid var(--border)',
        borderLeft: `4px solid ${tone.accent}`,
        background: tone.bg,
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="section-heading" style={{ color: 'var(--text-secondary)' }}>{label}</p>
         {href && (
           <ArrowUpRight
             size={14}
             strokeWidth={2}
             color="var(--text-muted)"
             className="flex-shrink-0 mt-0.5"
           />
         )}
      </div>
      <p className="money-md" style={{ color: tone.valueColor }}>
        {formatRupiah(value)}
      </p>
      {sublabel && (
        <p className="text-xs mt-2 leading-snug" style={{ color: 'var(--text-tertiary)' }}>
          {sublabel}
        </p>
      )}
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        className="block tap-highlight-none transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
      >
        {content}
      </a>
    )
  }

  return content
}
