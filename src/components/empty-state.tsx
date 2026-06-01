import { FileText } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="relative mb-5">
        {/* Soft halo */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-2xl"
          style={{ background: 'rgba(99,102,241,0.18)', filter: 'blur(18px)' }}
        />
        <div
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #EEF2FF, #E0E7FF)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 8px 18px -6px rgba(99,102,241,0.4)',
          }}
        >
          <FileText size={24} strokeWidth={2} color="var(--accent)" />
        </div>
      </div>
      <h3 className="text-base font-bold mb-1.5" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      {description && <p className="text-sm mb-6 max-w-xs leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{description}</p>}
      {action && <div>{action}</div>}
    </div>
  )
}
