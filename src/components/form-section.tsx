import type { LucideIcon } from 'lucide-react'

type AccentTone = 'accent' | 'warn' | 'profit' | 'neutral'

interface FormSectionProps {
  title: string
  icon?: LucideIcon
  children: React.ReactNode
  className?: string
  accent?: AccentTone
  description?: string
}

const accentMap: Record<AccentTone, { border: string; iconColor: string; iconBg: string }> = {
  accent: { border: 'var(--accent)', iconColor: 'var(--accent)', iconBg: 'var(--accent-light)' },
  warn: { border: 'var(--warn)', iconColor: 'var(--warn-text)', iconBg: 'var(--warn-bg)' },
  profit: { border: 'var(--profit)', iconColor: 'var(--profit)', iconBg: 'var(--profit-bg)' },
  neutral: { border: 'var(--border-strong)', iconColor: 'var(--text-secondary)', iconBg: 'var(--bg-subtle)' },
}

export default function FormSection({ title, icon: Icon, children, className = '', accent = 'accent', description }: FormSectionProps) {
  const tone = accentMap[accent]
  return (
    <section className={`card card-roomy ${className}`} style={{ borderLeft: `3px solid ${tone.border}` }}>
      <header className="flex items-start gap-2.5 mb-4">
        {Icon && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: tone.iconBg }}>
            <Icon size={15} strokeWidth={2.25} color={tone.iconColor} />
          </div>
        )}
        <div className="min-w-0 flex-1 pt-0.5">
          <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h2>
          {description && <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{description}</p>}
        </div>
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  )
}
