interface PageHeaderProps {
  title: string
  subtitle?: string
  badge?: {
    label: string
    color?: 'warn' | 'profit' | 'accent' | 'neutral'
  }
}

const badgeStyles = {
  warn: {
    backgroundColor: 'var(--warn-bg)',
    border: '1px solid var(--warn-border)',
    color: 'var(--warn-text)',
    boxShadow: '0 1px 2px rgba(245,158,11,0.12)',
  },
  profit: {
    backgroundColor: 'var(--profit-bg)',
    border: '1px solid var(--profit-border)',
    color: 'var(--profit-text)',
    boxShadow: '0 1px 2px rgba(5,150,105,0.12)',
  },
  accent: {
    backgroundColor: 'var(--accent-light)',
    border: '1px solid var(--border-accent)',
    color: 'var(--accent-deep)',
    boxShadow: '0 1px 2px rgba(124,58,237,0.14)',
  },
  neutral: {
    backgroundColor: 'var(--bg-subtle)',
    border: '1px solid var(--border)',
    color: 'var(--text-secondary)',
    boxShadow: '0 1px 2px rgba(28,25,23,0.04)',
  },
}

export default function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  const style = badge ? badgeStyles[badge.color ?? 'neutral'] : null

  return (
    <div className="pt-1 flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <h1 className="page-title">{title}</h1>
        {subtitle && (
          <p className="page-subtitle text-xs mt-1">{subtitle}</p>
        )}
      </div>
      {badge && style && (
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full flex-shrink-0 mt-0.5"
          style={style}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider">
            {badge.label}
          </span>
        </div>
      )}
    </div>
  )
}
