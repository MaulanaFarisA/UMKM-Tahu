'use client'

import { useState, useEffect } from 'react'
import { Receipt, Calculator, Tag } from 'lucide-react'
import { formatRupiah } from '@/lib/format'
import { EXPENSE_CATEGORY_LABELS } from '@/domain/expense-categories'

function formatRp(amount: number): string {
  if (!Number.isFinite(amount)) return 'Rp 0'
  return formatRupiah(amount)
}

function formatDateID(d: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(d)
}

const CATEGORY_TONES: Record<string, { fg: string; bg: string; border: string }> = {
  raw_material: { fg: 'var(--warn-text)', bg: 'var(--warn-bg-deep)', border: 'var(--warn-border)' },
  additional_material: { fg: 'var(--accent-deep)', bg: 'var(--accent-light)', border: 'var(--border-accent)' },
  production: { fg: 'var(--info-text)', bg: 'var(--info-bg)', border: 'var(--info-border)' },
  distribution: { fg: 'var(--profit-text)', bg: 'var(--profit-bg)', border: 'var(--profit-border)' },
  other: { fg: 'var(--text-secondary)', bg: 'var(--bg-subtle)', border: 'var(--border)' },
}

export default function ExpenseFormPreview() {
  const [quantity, setQuantity] = useState(1)
  const [unitPrice, setUnitPrice] = useState(0)
  const [unit, setUnit] = useState('item')
  const [itemName, setItemName] = useState('')
  const [category, setCategory] = useState('raw_material')
  const [todayLabel, setTodayLabel] = useState('')

  useEffect(() => {
    setTodayLabel(formatDateID(new Date()))
  }, [])

  const safeQty = Number.isFinite(quantity) && quantity > 0 ? quantity : 0
  const safePrice = Number.isFinite(unitPrice) && unitPrice >= 0 ? unitPrice : 0
  const total = Math.round(safeQty * safePrice)
  const hasData = safePrice > 0 && safeQty > 0
  const tone = CATEGORY_TONES[category] ?? CATEGORY_TONES.other
  const categoryLabel = EXPENSE_CATEGORY_LABELS[category as keyof typeof EXPENSE_CATEGORY_LABELS] ?? category
  const displayName = itemName.trim() || 'Pengeluaran'

  useEffect(() => {
    const form = document.querySelector('form')
    if (!form) return

    const qtyInput = form.querySelector<HTMLInputElement>('[name="quantity"]')
    const priceInput = form.querySelector<HTMLInputElement>('[name="unit_price"]')
    const unitInput = form.querySelector<HTMLSelectElement>('[name="unit"]')
    const nameInput = form.querySelector<HTMLInputElement>('[name="item_name"]')
    const catInput = form.querySelector<HTMLSelectElement>('[name="category"]')

    const onQty = () => setQuantity(Number(qtyInput?.value ?? 1))
    const onPrice = () => setUnitPrice(Number(priceInput?.value ?? 0))
    const onUnit = () => setUnit(unitInput?.value ?? 'item')
    const onName = () => setItemName(nameInput?.value ?? '')
    const onCat = () => setCategory(catInput?.value ?? 'raw_material')

    qtyInput?.addEventListener('input', onQty)
    priceInput?.addEventListener('input', onPrice)
    unitInput?.addEventListener('change', onUnit)
    nameInput?.addEventListener('input', onName)
    catInput?.addEventListener('change', onCat)

    return () => {
      qtyInput?.removeEventListener('input', onQty)
      priceInput?.removeEventListener('input', onPrice)
      unitInput?.removeEventListener('change', onUnit)
      nameInput?.removeEventListener('input', onName)
      catInput?.removeEventListener('change', onCat)
    }
  }, [])

  if (!hasData) {
    return (
      <div
        className="ledger-receipt rounded-2xl"
        style={{
          background: 'var(--bg-white)',
          borderTop: '1.5px dashed var(--border-strong)',
          borderRight: '1.5px dashed var(--border-strong)',
          borderBottom: '1.5px dashed var(--border-strong)',
          borderLeft: '3px solid var(--warn)',
        }}
        aria-live="polite"
      >
        {/* Header — mirrors filled-state structure */}
        <div
          className="px-5 py-4 flex items-start justify-between gap-3"
          style={{
            background: 'linear-gradient(135deg, var(--warn-bg) 0%, rgba(255,255,255,0) 100%)',
            borderBottom: '1px dashed var(--border)',
          }}
        >
          <div className="min-w-0">
            <p className="section-heading" style={{ color: 'var(--warn-text)' }}>
              Pratinjau · Pengeluaran
            </p>
            <p
              className="text-base font-bold mt-0.5"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
            >
              Pratinjau Struk
            </p>
          </div>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--bg-muted)' }}
          >
            <Calculator size={18} strokeWidth={2} color="var(--text-tertiary)" />
          </div>
        </div>

        {/* Empty body */}
        <div className="px-5 py-6 text-center">
          <p
            className="text-xs font-medium leading-relaxed"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Isi jumlah & harga satuan untuk melihat total
          </p>
          <p
            className="text-[10px] mt-1.5"
            style={{ color: 'var(--text-muted)' }}
          >
            Total akan muncul di sini secara otomatis
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="ledger-receipt"
      style={{
        background: 'var(--bg-white)',
        borderTop: '1px solid var(--border)',
        borderRight: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        borderLeft: '3px solid var(--warn)',
        boxShadow: 'var(--shadow-md)',
      }}
      aria-live="polite"
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-start justify-between gap-3"
        style={{
          background: 'linear-gradient(135deg, var(--warn-bg) 0%, rgba(255,255,255,0) 100%)',
          borderBottom: '1px dashed var(--border)',
        }}
      >
        <div className="min-w-0">
          <p className="section-heading" style={{ color: 'var(--warn-text)' }}>Pratinjau · Pengeluaran</p>
          <p className="text-base font-bold mt-0.5" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Struk Sementara
          </p>
        </div>
        {todayLabel && (
          <div className="text-right flex-shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
              Hari ini
            </p>
            <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              {todayLabel}
            </p>
          </div>
        )}
      </div>

      {/* Line item */}
      <div className="px-5 py-4 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Receipt size={13} strokeWidth={2.5} color="var(--warn)" className="flex-shrink-0" />
              <p className="text-sm font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                {displayName}
              </p>
            </div>
            <p className="text-xs mt-1 font-medium" style={{ color: 'var(--text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>
              {safeQty.toLocaleString('id-ID')} {unit} × {formatRp(safePrice)}
            </p>
          </div>
          <p className="money-xs flex-shrink-0" style={{ color: 'var(--text-primary)' }}>
            {formatRp(total)}
          </p>
        </div>

        {/* Category badge */}
        <div className="flex items-center gap-1.5">
          <Tag size={11} strokeWidth={2.5} color="var(--text-tertiary)" />
          <span
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full"
            style={{
              background: tone.bg,
              color: tone.fg,
              border: `1px solid ${tone.border}`,
            }}
          >
            <span className="text-[10px] font-bold tracking-wider uppercase">
              {categoryLabel}
            </span>
          </span>
        </div>
      </div>

      {/* Dashed divider */}
      <div
        className="mx-5"
        style={{
          height: '1px',
          backgroundImage: 'repeating-linear-gradient(90deg, var(--border-strong) 0 6px, transparent 6px 12px)',
        }}
      />

      {/* Total block */}
      <div className="px-5 py-4">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="section-heading" style={{ color: 'var(--text-tertiary)' }}>Total Pengeluaran</p>
            <p className="money-lg mt-1" style={{ color: 'var(--loss-text)' }}>
              −{formatRp(total)}
            </p>
          </div>
          <span
            className="stamp-badge flex-shrink-0"
            style={{
              background: 'var(--loss-bg)',
              color: 'var(--loss-text)',
              border: '1px solid var(--loss-border)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: 'var(--loss)' }}
            />
            <span className="text-[10px] font-bold tracking-wider">UANG KELUAR</span>
          </span>
        </div>
      </div>

      {/* Formula helper */}
      <div
        className="mx-5 mb-4 px-3 py-2 rounded-lg"
        style={{
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border)',
        }}
      >
        <p className="text-[11px] font-medium leading-snug" style={{ color: 'var(--text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>
          {safeQty.toLocaleString('id-ID')} {unit} × {formatRp(safePrice)} ={' '}
          <span className="font-bold" style={{ color: 'var(--text-secondary)' }}>{formatRp(total)}</span>
        </p>
      </div>
    </div>
  )
}
