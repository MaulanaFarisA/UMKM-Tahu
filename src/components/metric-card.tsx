import { formatRupiah } from '@/lib/format'

interface MetricCardProps {
  label: string
  value: number
  type?: 'default' | 'profit' | 'loss' | 'warning'
  sublabel?: string
  href?: string
}

export default function MetricCard({ label, value, type = 'default', sublabel, href }: MetricCardProps) {
  const colorMap = {
    default: 'text-gray-900',
    profit: 'text-green-600',
    loss: 'text-red-600',
    warning: 'text-amber-600',
  }

  const content = (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-xl font-bold ${colorMap[type]}`}>
        {formatRupiah(value)}
      </p>
      {sublabel && <p className="text-xs text-gray-400 mt-1">{sublabel}</p>}
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block hover:opacity-80 transition-opacity">
        {content}
      </a>
    )
  }

  return content
}
