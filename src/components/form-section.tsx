import type { LucideIcon } from 'lucide-react'

interface FormSectionProps {
  title: string
  icon?: LucideIcon
  children: React.ReactNode
  className?: string
}

export default function FormSection({ title, icon: Icon, children, className = '' }: FormSectionProps) {
  return (
    <div className={`card p-4 space-y-4 ${className}`}>
      <div className="flex items-center gap-2">
        {Icon && <Icon size={15} strokeWidth={2} color="#7C3AED" />}
        <p className="text-sm font-bold" style={{ color: '#1A1714' }}>{title}</p>
      </div>
      {children}
    </div>
  )
}
