'use client'

import type { ExpenseCategory } from '@/types/database'
import type { ComponentType } from 'react'
import { Flame, Fuel, Package, Plug, Shirt, Users } from 'lucide-react'

type QuickExpense = {
  label: string
  item: string
  category: ExpenseCategory
  quantity: number
  unit: string
  unitPrice: number
  Icon: ComponentType<{ size?: number; strokeWidth?: number }>
}

const QUICK_EXPENSES: QuickExpense[] = [
  {
    label: 'Kedelai',
    item: 'Kedelai',
    category: 'raw_material',
    quantity: 50,
    unit: 'kg',
    unitPrice: 10900,
    Icon: Package,
  },
  {
    label: 'Kayu bakar',
    item: 'Kayu bakar',
    category: 'production',
    quantity: 1,
    unit: 'produksi',
    unitPrice: 57143,
    Icon: Flame,
  },
  {
    label: 'Tenaga kerja',
    item: 'Tenaga kerja',
    category: 'production',
    quantity: 5,
    unit: 'produksi',
    unitPrice: 15000,
    Icon: Users,
  },
  {
    label: 'Bensin',
    item: 'Bensin',
    category: 'distribution',
    quantity: 1,
    unit: 'hari',
    unitPrice: 15000,
    Icon: Fuel,
  },
  {
    label: 'Plastik',
    item: 'Plastik',
    category: 'additional_material',
    quantity: 1,
    unit: 'pack',
    unitPrice: 5000,
    Icon: Shirt,
  },
  {
    label: 'Listrik',
    item: 'Listrik',
    category: 'production',
    quantity: 1,
    unit: 'hari',
    unitPrice: 13151,
    Icon: Plug,
  },
]

function emit(element: HTMLInputElement | HTMLSelectElement) {
  element.dispatchEvent(new Event('input', { bubbles: true }))
  element.dispatchEvent(new Event('change', { bubbles: true }))
}

function setField(name: string, value: string | number) {
  const field = document.querySelector<HTMLInputElement | HTMLSelectElement>(
    `[name="${name}"]`
  )
  if (!field) return
  field.value = String(value)
  emit(field)
}

export default function ExpenseQuickActions() {
  const applyExpense = (expense: QuickExpense) => {
    setField('item_name', expense.item)
    setField('category', expense.category)
    setField('quantity', expense.quantity)
    setField('unit', expense.unit)
    setField('unit_price', expense.unitPrice)
    setField('confirmation_status', 'actual')
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {QUICK_EXPENSES.map(({ Icon, ...expense }) => (
        <button
          key={expense.label}
          type="button"
          onClick={() => applyExpense({ Icon, ...expense })}
          className="btn-secondary"
          style={{ padding: '0.75rem', fontSize: '0.8125rem' }}
        >
          <Icon size={14} strokeWidth={2.4} />
          {expense.label}
        </button>
      ))}
    </div>
  )
}
