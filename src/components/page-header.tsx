interface PageHeaderProps {
  title: string
  subtitle?: string
  badge?: {
    label: string
    color?: 'warn' | 'profit' | 'accent' | 'neutral'
  }
}

const badgeStyles = {
  warn: { backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', color: '#92400E' },
  profit: { backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46' },
  accent: { backgroundColor: '#EDE9FE', border: '1px solid #C4B5FD', color: '#5B21B6' },
  neutral: { backgroundColor: '#F5F4F0', border: '1px solid #E8E5DF', color: '#4A4540' },
}

export default function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  const style = badge ? badgeStyles[badge.color ?? 'neutral'] : null

  return (
    <div className="pt-1 flex items-start justify-between">
      <div>
        <p className="page-title">{title}</p>
        {subtitle && (
          <p className="page-subtitle text-xs mt-0.5">{subtitle}</p>
        )}
      </div>
      {badge && style && (
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl flex-shrink-0 ml-3"
          style={style}
        >
          <span className="text-xs font-semibold">{badge.label}</span>
        </div>
      )}
    </div>
  )
}
