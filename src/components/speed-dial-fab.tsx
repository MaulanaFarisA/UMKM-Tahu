'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, ShoppingBag, Receipt } from 'lucide-react'

/**
 * Mobile center FAB that expands into a speed-dial with the two record actions.
 * Rendered as a top-level fixed element (not inside the blurred nav) to avoid
 * the backdrop-filter containing-block trap for fixed children.
 */
export default function SpeedDialFab({ active }: { active?: boolean }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const actions = [
    {
      href: '/catat/penjualan',
      label: 'Catat Penjualan',
      Icon: ShoppingBag,
      bg: 'linear-gradient(135deg, #10B981, #059669)',
    },
    {
      href: '/catat/pengeluaran',
      label: 'Catat Pengeluaran',
      Icon: Receipt,
      bg: 'linear-gradient(135deg, #FB7185, #E11D48)',
    },
  ]

  return (
    <div className="mobile-bottom-nav">
      {/* Backdrop */}
      {open && (
        <button
          aria-label="Tutup menu catat"
          onClick={() => setOpen(false)}
          className="speeddial-backdrop fixed inset-0 z-40 cursor-default"
          style={{ background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
        />
      )}

      {/* FAB + expanding actions */}
      <div
        className="fixed left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.4rem)' }}
      >
        {/* Actions */}
        {open && (
          <div className="absolute bottom-full mb-4 flex flex-col items-center gap-3">
            {actions.map((a, i) => (
              <Link
                key={a.href}
                href={a.href}
                onClick={() => setOpen(false)}
                className="speeddial-item flex items-center gap-3 no-select"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span
                  className="text-sm font-bold px-3 py-1.5 rounded-lg whitespace-nowrap"
                  style={{ background: 'var(--bg-white)', color: 'var(--text-primary)', boxShadow: 'var(--shadow-md)' }}
                >
                  {a.label}
                </span>
                <span
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: a.bg, boxShadow: 'var(--shadow-lg)' }}
                >
                  <a.Icon size={20} strokeWidth={2.4} color="#FFFFFF" />
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Main FAB toggle */}
        <button
          type="button"
          aria-label={open ? 'Tutup menu catat' : 'Catat transaksi'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`${open ? '' : 'fab-glow'} inline-flex items-center justify-center w-[62px] h-[62px] rounded-2xl transition-all active:scale-90 no-select`}
          style={{
            background: 'var(--accent-gradient)',
            border: '4px solid var(--bg)',
            color: '#FFFFFF',
            boxShadow: active ? 'var(--shadow-accent-lg)' : 'var(--shadow-accent)',
          }}
        >
          <Plus
            size={26}
            strokeWidth={2.75}
            style={{ transition: 'transform 0.28s var(--ease-spring)', transform: open ? 'rotate(45deg)' : 'none' }}
          />
        </button>
      </div>
    </div>
  )
}
