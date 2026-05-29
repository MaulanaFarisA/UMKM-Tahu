import { FileText } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
      <div className="relative mb-5">
        <div
          className="relative w-20 h-20 rounded-3xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, var(--bg-white) 0%, var(--warn-bg) 100%)',
            border: '1.5px solid var(--border)',
            boxShadow: '0 4px 12px rgba(28,25,23,0.06)',
          }}
        >
          <FileText size={28} strokeWidth={1.75} color="var(--accent)" />
        </div>
      </div>
      <h3
        className="text-base font-bold mb-1.5"
        style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
      >
        {title}
      </h3>
      {description && (
        <p
          className="text-xs mb-5 max-w-xs leading-relaxed"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-1">{action}</div>}
    </div>
  )
}
