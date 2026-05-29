import { describe, expect, it } from 'vitest'
import {
  EXPENSE_CATEGORY_LABELS,
  isDistributionExpenseCategory,
  isOtherExpenseCategory,
  isProductionExpenseCategory,
} from './expense-categories'

describe('workbook expense category mapping', () => {
  it('maps current database categories to workbook group labels without schema changes', () => {
    expect(EXPENSE_CATEGORY_LABELS.raw_material).toBe('Bahan Baku')
    expect(EXPENSE_CATEGORY_LABELS.additional_material).toBe('Bahan Tambahan')
    expect(EXPENSE_CATEGORY_LABELS.production).toBe('Biaya Operasional / Produksi')
    expect(EXPENSE_CATEGORY_LABELS.distribution).toBe('Biaya Pemasaran / Distribusi')
    expect(EXPENSE_CATEGORY_LABELS.other).toBe('Biaya Lain-Lain')
  })

  it('groups categories according to workbook HPP and laba rugi semantics', () => {
    expect(isProductionExpenseCategory('raw_material')).toBe(true)
    expect(isProductionExpenseCategory('additional_material')).toBe(true)
    expect(isProductionExpenseCategory('production')).toBe(true)
    expect(isProductionExpenseCategory('distribution')).toBe(false)
    expect(isDistributionExpenseCategory('distribution')).toBe(true)
    expect(isOtherExpenseCategory('other')).toBe(true)
  })
})
