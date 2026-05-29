import type { ReactNode } from 'react'
import { AlertCircle, CheckCircle2, Sparkles } from 'lucide-react'

interface ActionMessageProps {
  variant: 'success' | 'error' | 'tip'
  title: string
  children: ReactNode
}

export default function ActionMessage({
  variant,
  title,
  children,
}: ActionMessageProps) {
  const tone = {
    success: {
      icon: CheckCircle2,
      bg: 'linear-gradient(135deg, var(--profit-bg) 0%, var(--bg-white) 100%)',
      border: 'var(--profit-border)',
      text: 'var(--profit-text)',
    },
    error: {
      icon: AlertCircle,
      bg: 'linear-gradient(135deg, var(--loss-bg) 0%, var(--bg-white) 100%)',
      border: 'var(--loss-border)',
      text: 'var(--loss-text)',
    },
    tip: {
      icon: Sparkles,
      bg: 'linear-gradient(135deg, var(--warn-bg) 0%, var(--bg-white) 100%)',
      border: 'var(--warn-border)',
      text: 'var(--warn-text)',
    },
  }[variant]
  const Icon = tone.icon

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className="ledger-receipt rounded-2xl p-3.5 flex items-start gap-3 slide-down"
      style={{
        background: tone.bg,
        border: `1px solid ${tone.border}`,
        borderLeft: `4px solid ${tone.text}`,
      }}
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'var(--bg-white)', border: `1px solid ${tone.border}` }}
      >
        <Icon size={16} strokeWidth={2.5} color={tone.text} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-extrabold" style={{ color: tone.text }}>
          {title}
        </p>
        <div className="text-xs leading-relaxed mt-0.5" style={{ color: tone.text }}>
          {children}
        </div>
      </div>
    </div>
  )
}
