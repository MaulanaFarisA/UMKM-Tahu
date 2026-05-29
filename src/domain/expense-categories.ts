import type { ExpenseCategory } from '@/types/database'

export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  raw_material: 'Bahan Baku',
  additional_material: 'Bahan Tambahan',
  production: 'Biaya Operasional / Produksi',
  distribution: 'Biaya Pemasaran / Distribusi',
  other: 'Biaya Lain-Lain',
}

export const EXPENSE_CATEGORY_OPTIONS: readonly {
  value: ExpenseCategory
  label: string
}[] = [
  { value: 'raw_material', label: EXPENSE_CATEGORY_LABELS.raw_material },
  { value: 'additional_material', label: EXPENSE_CATEGORY_LABELS.additional_material },
  { value: 'production', label: EXPENSE_CATEGORY_LABELS.production },
  { value: 'distribution', label: EXPENSE_CATEGORY_LABELS.distribution },
  { value: 'other', label: EXPENSE_CATEGORY_LABELS.other },
] as const

export const PRODUCTION_EXPENSE_CATEGORIES: readonly ExpenseCategory[] = [
  'raw_material',
  'additional_material',
  'production',
] as const

export const DISTRIBUTION_EXPENSE_CATEGORIES: readonly ExpenseCategory[] = [
  'distribution',
] as const

export const OTHER_EXPENSE_CATEGORIES: readonly ExpenseCategory[] = ['other'] as const

export function isProductionExpenseCategory(category: ExpenseCategory): boolean {
  return PRODUCTION_EXPENSE_CATEGORIES.includes(category)
}

export function isDistributionExpenseCategory(category: ExpenseCategory): boolean {
  return DISTRIBUTION_EXPENSE_CATEGORIES.includes(category)
}

export function isOtherExpenseCategory(category: ExpenseCategory): boolean {
  return OTHER_EXPENSE_CATEGORIES.includes(category)
}
