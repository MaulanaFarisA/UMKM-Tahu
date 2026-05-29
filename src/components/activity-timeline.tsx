import { ShoppingBag, Receipt } from 'lucide-react'
import { formatRupiah } from '@/lib/format'

interface ActivityItem {
  id: string
  type: 'sale' | 'expense'
  label: string
  meta: string
  amount: number
  createdAt: string
}

function formatTime(iso: string): string {
  try {
    return new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit' }).format(new Date(iso))
  } catch {
    return ''
  }
}

export default function ActivityTimeline({ items }: { items: ActivityItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl p-6 text-center" style={{ background: 'var(--bg-subtle)', border: '1px dashed var(--border-strong)' }}>
        <p className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>Belum ada transaksi hari ini</p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Transaksi yang dicatat akan muncul di sini.</p>
      </div>
    )
  }

  return (
    <ol className="relative">
      {/* Connecting line */}
      <span
        aria-hidden
        className="absolute top-3 bottom-3 left-[18px] w-px"
        style={{ background: 'var(--border)' }}
      />
      {items.map((item, idx) => {
        const isSale = item.type === 'sale'
        const time = formatTime(item.createdAt)
        return (
          <li key={item.id} className="relative flex items-center gap-3 py-2.5" style={{ animation: `slideUp 0.4s var(--ease-spring) ${0.05 * idx}s both` }}>
            {/* Node */}
            <span
              className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: isSale ? 'var(--profit-bg)' : 'var(--loss-bg)',
                border: `2px solid ${isSale ? 'var(--profit-border)' : 'var(--loss-border)'}`,
                boxShadow: '0 0 0 4px var(--bg-white)',
              }}
            >
              {isSale ? (
                <ShoppingBag size={15} strokeWidth={2.4} color="var(--profit)" />
              ) : (
                <Receipt size={15} strokeWidth={2.4} color="var(--loss)" />
              )}
            </span>
            {/* Body */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
              <p className="text-xs truncate" style={{ color: 'var(--text-tertiary)' }}>
                {item.meta}{time ? ` · ${time}` : ''}
              </p>
            </div>
            {/* Amount */}
            <p className="money-xs flex-shrink-0" style={{ color: isSale ? 'var(--profit)' : 'var(--loss)' }}>
              {isSale ? '+' : '-'}{formatRupiah(item.amount)}
            </p>
          </li>
        )
      })}
    </ol>
  )
}
