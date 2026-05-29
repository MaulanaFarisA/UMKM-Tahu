import { Info, TriangleAlert, CheckCircle, Sparkles } from 'lucide-react'

type BannerVariant = 'info' | 'warn' | 'success' | 'tip'

interface InfoBannerProps {
  variant?: BannerVariant
  children: React.ReactNode
  className?: string
}

const variantConfig = {
  info: {
    bg: 'var(--accent-light)',
    border: 'var(--border-accent)',
    accent: 'var(--accent)',
    color: 'var(--accent-deep)',
    iconBg: 'rgba(124,58,237,0.12)',
    Icon: Info,
    iconColor: 'var(--accent)',
  },
  warn: {
    bg: 'var(--warn-bg)',
    border: 'var(--warn-border)',
    accent: 'var(--warn)',
    color: 'var(--warn-text)',
    iconBg: 'rgba(245,158,11,0.14)',
    Icon: TriangleAlert,
    iconColor: '#D97706',
  },
  success: {
    bg: 'var(--profit-bg)',
    border: 'var(--profit-border)',
    accent: 'var(--profit)',
    color: 'var(--profit-text)',
    iconBg: 'rgba(5,150,105,0.12)',
    Icon: CheckCircle,
    iconColor: 'var(--profit)',
  },
  tip: {
    bg: 'var(--bg-subtle)',
    border: 'var(--border)',
    accent: 'var(--text-muted)',
    color: 'var(--text-secondary)',
    iconBg: 'rgba(168,162,158,0.18)',
    Icon: Sparkles,
    iconColor: 'var(--text-tertiary)',
  },
}

export default function InfoBanner({
  variant = 'info',
  children,
  className = '',
}: InfoBannerProps) {
  const config = variantConfig[variant]
  const { Icon } = config

  return (
    <div
      role="status"
      className={`surface-polish rounded-xl p-3.5 flex items-start gap-3 ${className}`}
      style={{
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        borderLeft: `4px solid ${config.accent}`,
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: config.iconBg, border: `1px solid ${config.border}` }}
      >
        <Icon size={14} strokeWidth={2.25} color={config.iconColor} />
      </div>
      <div
        className="text-xs leading-relaxed pt-1 flex-1 min-w-0"
        style={{ color: config.color }}
      >
        {children}
      </div>
    </div>
  )
}
