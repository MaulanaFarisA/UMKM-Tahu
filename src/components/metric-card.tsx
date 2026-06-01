import { formatRupiah } from '@/lib/format'
import { ArrowUpRight } from 'lucide-react'
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

const toneMap = {
  default: { accent: 'var(--border-strong)', valueColor: 'var(--text-primary)' },
  profit: { accent: 'var(--profit)', valueColor: 'var(--profit)' },
  loss: { accent: 'var(--loss)', valueColor: 'var(--loss)' },
  warning: { accent: 'var(--warn)', valueColor: 'var(--warn-text)' },
} as const

export default function MetricCard({ label, value, type = 'default', sublabel, href, animate = false }: MetricCardProps) {
  const tone = toneMap[type]
  const content = (
    <div className="card card-roomy h-full">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: tone.accent }} />
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>{label}</p>
        </div>
        {href && <ArrowUpRight size={14} strokeWidth={2} color="var(--text-muted)" className="flex-shrink-0" />}
      </div>
      {animate ? (
        <CountUp value={value} className="money-md" style={{ color: tone.valueColor }} />
      ) : (
        <p className="money-md" style={{ color: tone.valueColor }}>{formatRupiah(value)}</p>
      )}
      {sublabel && <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>{sublabel}</p>}
    </div>
  )
  if (href) return <a href={href} className="block tap-highlight-none transition-transform hover:-translate-y-0.5 active:scale-[0.98]">{content}</a>
  return content
}
