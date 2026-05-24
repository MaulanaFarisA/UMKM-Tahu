import { Info, TriangleAlert, CheckCircle, Sparkles } from 'lucide-react'

type BannerVariant = 'info' | 'warn' | 'success' | 'tip'

interface InfoBannerProps {
  variant?: BannerVariant
  children: React.ReactNode
  className?: string
}

const variantConfig = {
  info: {
    bg: '#EDE9FE',
    border: '#C4B5FD',
    color: '#5B21B6',
    Icon: Info,
    iconColor: '#7C3AED',
  },
  warn: {
    bg: '#FFFBEB',
    border: '#FDE68A',
    color: '#92400E',
    Icon: TriangleAlert,
    iconColor: '#D97706',
  },
  success: {
    bg: '#ECFDF5',
    border: '#A7F3D0',
    color: '#065F46',
    Icon: CheckCircle,
    iconColor: '#059669',
  },
  tip: {
    bg: '#F5F4F0',
    border: '#E8E5DF',
    color: '#4A4540',
    Icon: Sparkles,
    iconColor: '#9C9690',
  },
}

export default function InfoBanner({ variant = 'info', children, className = '' }: InfoBannerProps) {
  const config = variantConfig[variant]
  const { Icon } = config

  return (
    <div
      className={`rounded-xl p-3.5 flex items-start gap-2.5 ${className}`}
      style={{ backgroundColor: config.bg, border: `1px solid ${config.border}` }}
    >
      <Icon size={14} strokeWidth={2} color={config.iconColor} className="flex-shrink-0 mt-0.5" />
      <div className="text-xs" style={{ color: config.color }}>
        {children}
      </div>
    </div>
  )
}
