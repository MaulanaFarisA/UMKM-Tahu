interface StatusBadgeProps {
  status: 'LUNAS' | 'BELUM_LUNAS' | 'actual' | 'estimated' | 'unconfirmed'
}

const statusConfig = {
  LUNAS: { label: 'Sudah Lunas', className: 'bg-green-100 text-green-700' },
  BELUM_LUNAS: { label: 'Belum Lunas', className: 'bg-red-100 text-red-700' },
  actual: { label: 'Aktual', className: 'bg-green-100 text-green-700' },
  estimated: { label: 'Perkiraan', className: 'bg-amber-100 text-amber-700' },
  unconfirmed: { label: 'Belum Dikonfirmasi', className: 'bg-gray-100 text-gray-600' },
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  )
}
