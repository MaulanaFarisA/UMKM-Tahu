interface StatusBadgeProps {
  status:
    | 'LUNAS'
    | 'BELUM_LUNAS'
    | 'actual'
    | 'estimated'
    | 'unconfirmed'
    | 'PROFIT'
    | 'LOSS'
    | 'BREAK_EVEN'
  size?: 'sm' | 'md'
  label?: string
}

const statusConfig = {
  LUNAS: {
    label: 'Sudah Lunas',
    bg: 'var(--profit-bg)',
    border: 'var(--profit-border)',
    color: 'var(--profit-text)',
    dot: 'var(--profit)',
  },
  BELUM_LUNAS: {
    label: 'Belum Dibayar',
    bg: 'var(--warn-bg)',
    border: 'var(--warn-border)',
    color: 'var(--warn-text)',
    dot: 'var(--warn)',
  },
  actual: {
    label: 'Aktual',
    bg: 'var(--profit-bg)',
    border: 'var(--profit-border)',
    color: 'var(--profit-text)',
    dot: 'var(--profit)',
  },
  estimated: {
    label: 'Perkiraan',
    bg: 'var(--warn-bg)',
    border: 'var(--warn-border)',
    color: 'var(--warn-text)',
    dot: 'var(--warn)',
  },
  unconfirmed: {
    label: 'Belum Dikonfirmasi',
    bg: 'var(--bg-subtle)',
    border: 'var(--border)',
    color: 'var(--text-secondary)',
    dot: 'var(--text-muted)',
  },
  PROFIT: {
    label: 'Untung',
    bg: 'var(--profit-bg)',
    border: 'var(--profit-border)',
    color: 'var(--profit-text)',
    dot: 'var(--profit)',
  },
  LOSS: {
    label: 'Rugi',
    bg: 'var(--loss-bg)',
    border: 'var(--loss-border)',
    color: 'var(--loss-text)',
    dot: 'var(--loss)',
  },
  BREAK_EVEN: {
    label: 'Impas',
    bg: 'var(--warn-bg)',
    border: 'var(--warn-border)',
    color: 'var(--warn-text)',
    dot: 'var(--warn)',
  },
} as const

export default function StatusBadge({ status, size = 'sm', label }: StatusBadgeProps) {
  const config = statusConfig[status]
  const isMd = size === 'md'
  const sizeClasses = isMd
    ? 'gap-2 px-3.5 py-1.5 text-[12px]'
    : 'gap-1.5 px-2.5 py-1 text-[11px]'
  const dotSize = isMd ? 'w-2 h-2' : 'w-1.5 h-1.5'
  return (
    <span
      className={`inline-flex items-center rounded-full font-bold uppercase tracking-wider ${sizeClasses}`}
      style={{
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        color: config.color,
        letterSpacing: '0.045em',
      }}
    >
      <span
        className={`${dotSize} rounded-full flex-shrink-0`}
        style={{ backgroundColor: config.dot }}
      />
      {label ?? config.label}
    </span>
  )
}
