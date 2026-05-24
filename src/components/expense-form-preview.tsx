'use client'

import { useState, useEffect } from 'react'
import { Receipt, Calculator } from 'lucide-react'

function formatRp(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const CATEGORY_LABELS: Record<string, string> = {
  raw_material: 'Bahan Baku',
  additional_material: 'Bahan Tambahan',
  production: 'Produksi',
  distribution: 'Distribusi',
  other: 'Lain-lain',
}

export default function ExpenseFormPreview() {
  const [quantity, setQuantity] = useState(1)
  const [unitPrice, setUnitPrice] = useState(0)
  const [unit, setUnit] = useState('item')
  const [itemName, setItemName] = useState('')
  const [category, setCategory] = useState('raw_material')

  const total = Math.round(quantity * unitPrice)
  const hasData = unitPrice > 0

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
        className="rounded-2xl p-4 flex items-center gap-3"
        style={{ backgroundColor: '#F5F4F0', border: '1px solid #E8E5DF' }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: '#EEECE8' }}
        >
          <Calculator size={16} strokeWidth={2} color="#9C9690" />
        </div>
        <p className="text-sm" style={{ color: '#9C9690' }}>
          Isi harga satuan untuk melihat total
        </p>
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl p-4 space-y-3"
      style={{ backgroundColor: '#FFFBEB', border: '1.5px solid #FDE68A' }}
    >
      <div className="flex items-center gap-2">
        <Receipt size={13} strokeWidth={2} color="#D97706" />
        <p className="section-heading" style={{ color: '#92400E' }}>Ringkasan Pengeluaran</p>
      </div>

      <div
        className="rounded-xl p-3"
        style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
      >
        {itemName && (
          <p className="text-xs font-semibold mb-1 truncate" style={{ color: '#1A1714' }}>
            {itemName}
          </p>
        )}
        <p className="text-xs mb-2" style={{ color: '#9C9690' }}>
          {quantity} {unit} × {formatRp(unitPrice)}
        </p>
        <div className="flex items-baseline gap-2">
          <p className="money-sm" style={{ color: '#D97706' }}>{formatRp(total)}</p>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
          >
            {CATEGORY_LABELS[category] ?? category}
          </span>
        </div>
      </div>

      <p className="text-xs" style={{ color: '#92400E' }}>
        Total dihitung otomatis: {quantity} × {formatRp(unitPrice)} = {formatRp(total)}
      </p>
    </div>
  )
}
