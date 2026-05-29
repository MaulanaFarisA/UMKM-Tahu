import { FileText } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'var(--accent-light)', boxShadow: 'var(--shadow-sm)' }}>
        <FileText size={24} strokeWidth={1.75} color="var(--accent)" />
      </div>
      <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      {description && <p className="text-sm mb-6 max-w-xs" style={{ color: 'var(--text-tertiary)' }}>{description}</p>}
      {action && <div>{action}</div>}
    </div>
  )
}
