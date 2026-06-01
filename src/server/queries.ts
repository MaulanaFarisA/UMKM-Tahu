import { createServerClient } from '@/lib/supabase-server'
import { todayISOString } from '@/lib/format'
import {
  calculateRemainingReceivable,
  getReceivableStatus,
  calculateProfitSummary,
} from '@/domain/finance'
import {
  isDistributionExpenseCategory,
  isOtherExpenseCategory,
  isProductionExpenseCategory,
} from '@/domain/expense-categories'
import type { SalesTransaction, ReceivablePayment, Expense } from '@/types/database'

/** Returns the first day of the month after the given one as YYYY-MM-DD. */
function firstDayOfNextMonth(year: number, month: number): string {
  const nextYear = month === 12 ? year + 1 : year
  const nextMonth = month === 12 ? 1 : month + 1
  return `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`
}

// ─── Business Profile ─────────────────────────────────────────────────────────

export async function getBusinessProfile() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('business_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return data
}

// ─── Expenses ─────────────────────────────────────────────────────────────────

export async function getExpenses(date?: string) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return [] as Expense[]

  let query = supabase
    .from('expenses')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false })

  if (date) query = query.eq('date', date)

  const { data } = await query
  return (data ?? []) as Expense[]
}

export async function getExpensesByMonth(year: number, month: number) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return [] as Expense[]

  // Use [first day of month, first day of next month) so we never build an
  // invalid date like "2026-06-31" (which Postgres rejects, silently
  // returning zero rows and breaking the monthly summary).
  const from = `${year}-${String(month).padStart(2, '0')}-01`
  const to = firstDayOfNextMonth(year, month)

  const { data } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', user.id)
    .gte('date', from)
    .lt('date', to)
    .order('date', { ascending: false })

  return (data ?? []) as Expense[]
}

export async function getExpensesByDateRange(fromInclusive: string, toExclusive: string) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return [] as Expense[]

  const { data } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', user.id)
    .gte('date', fromInclusive)
    .lt('date', toExclusive)
    .order('date', { ascending: false })

  return (data ?? []) as Expense[]
}

// ─── Sales ────────────────────────────────────────────────────────────────────

type SalesWithCustomer = SalesTransaction & {
  customer: { id: string; name: string } | null
}

export async function getSalesTransactions(date?: string) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return [] as SalesWithCustomer[]

  let query = supabase
    .from('sales_transactions')
    .select('*, customer:customers(id, name)')
    .eq('user_id', user.id)
    .order('date', { ascending: false })

  if (date) query = query.eq('date', date)

  const { data } = await query
  return (data ?? []) as SalesWithCustomer[]
}

export async function getSalesByMonth(year: number, month: number) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return [] as SalesWithCustomer[]

  // [first day of month, first day of next month) — avoids invalid dates.
  const from = `${year}-${String(month).padStart(2, '0')}-01`
  const to = firstDayOfNextMonth(year, month)

  const { data } = await supabase
    .from('sales_transactions')
    .select('*, customer:customers(id, name)')
    .eq('user_id', user.id)
    .gte('date', from)
    .lt('date', to)
    .order('date', { ascending: false })

  return (data ?? []) as SalesWithCustomer[]
}

export async function getSalesByDateRange(fromInclusive: string, toExclusive: string) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return [] as SalesWithCustomer[]

  const { data } = await supabase
    .from('sales_transactions')
    .select('*, customer:customers(id, name)')
    .eq('user_id', user.id)
    .gte('date', fromInclusive)
    .lt('date', toExclusive)
    .order('date', { ascending: false })

  return (data ?? []) as SalesWithCustomer[]
}

// ─── Customers ────────────────────────────────────────────────────────────────

export async function getCustomers() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('customers')
    .select('*')
    .eq('user_id', user.id)
    .order('name')

  return data ?? []
}

// ─── Receivables ─────────────────────────────────────────────────────────────

export async function getReceivables() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data: transactions } = await supabase
    .from('sales_transactions')
    .select('*, customer:customers(id, name)')
    .eq('user_id', user.id)
    .gt('receivable_amount', 0)
    .order('date', { ascending: false })

  if (!transactions) return []

  const { data: payments } = await supabase
    .from('receivable_payments')
    .select('*')
    .eq('user_id', user.id)

  return (transactions as SalesWithCustomer[]).map((tx) => {
    const txPayments = (payments ?? [])
      .filter((p: ReceivablePayment) => p.sales_transaction_id === tx.id)
      .map((p: ReceivablePayment) => p.amount)
    const remaining = calculateRemainingReceivable(tx.receivable_amount, txPayments)
    const status = getReceivableStatus(remaining)
    return {
      ...tx,
      payments: (payments ?? []).filter(
        (p: ReceivablePayment) => p.sales_transaction_id === tx.id
      ),
      remaining,
      status,
    }
  })
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export async function getDashboardSummary() {
  const today = todayISOString()
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  // 7-day window: [6 days ago, tomorrow) — inclusive of today, robust across months.
  const sevenDaysAgo = new Date(now)
  sevenDaysAgo.setDate(now.getDate() - 6)
  const trendFrom = todayISOString(sevenDaysAgo)
  const tomorrow = new Date(now)
  tomorrow.setDate(now.getDate() + 1)
  const trendTo = todayISOString(tomorrow)

  const [todaySales, monthSales, todayExpenses, monthExpenses, receivables, trendSales, trendExpenses] =
    await Promise.all([
      getSalesTransactions(today),
      getSalesByMonth(year, month),
      getExpenses(today),
      getExpensesByMonth(year, month),
      getReceivables(),
      getSalesByDateRange(trendFrom, trendTo),
      getExpensesByDateRange(trendFrom, trendTo),
    ])

  const todayOmzet = todaySales.reduce((s: number, t: SalesWithCustomer) => s + t.total_sales, 0)
  const monthOmzet = monthSales.reduce((s: number, t: SalesWithCustomer) => s + t.total_sales, 0)
  const todayExpenseTotal = todayExpenses.reduce((s: number, e: Expense) => s + e.total, 0)
  const monthExpenseTotal = monthExpenses.reduce((s: number, e: Expense) => s + e.total, 0)
  const totalReceivables = receivables.reduce((s: number, r: { remaining: number }) => s + r.remaining, 0)
  const hasUnconfirmedExpenses = monthExpenses.some((e: Expense) => e.confirmation_status === 'unconfirmed')
  const hasIncompleteSalesData = todaySales.length === 0
  const todayActivity = [
    ...todaySales.map((sale: SalesWithCustomer) => ({
      id: `sale-${sale.id}`,
      type: 'sale' as const,
      label: sale.customer?.name ?? 'Pembeli umum',
      meta: `${sale.packs} bungkus`,
      amount: sale.total_sales,
      createdAt: sale.created_at,
    })),
    ...todayExpenses.map((expense: Expense) => ({
      id: `expense-${expense.id}`,
      type: 'expense' as const,
      label: expense.item_name,
      meta: expense.unit ? `${expense.quantity} ${expense.unit}` : 'Biaya',
      amount: expense.total,
      createdAt: expense.created_at,
    })),
  ]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 6)

  // Last 7 days net trend (omzet - expense per day) for the momentum sparkline.
  const salesByDate = new Map<string, number>()
  for (const s of trendSales) {
    salesByDate.set(s.date, (salesByDate.get(s.date) ?? 0) + s.total_sales)
  }
  const expenseByDate = new Map<string, number>()
  for (const e of trendExpenses) {
    expenseByDate.set(e.date, (expenseByDate.get(e.date) ?? 0) + e.total)
  }
  const dailyTrend: { date: string; net: number }[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(now.getDate() - i)
    const iso = todayISOString(d)
    dailyTrend.push({ date: iso, net: (salesByDate.get(iso) ?? 0) - (expenseByDate.get(iso) ?? 0) })
  }

  const profitToday = calculateProfitSummary({
    totalSales: todayOmzet,
    totalProductionCost: todayExpenses
      .filter((e: Expense) => isProductionExpenseCategory(e.category))
      .reduce((s: number, e: Expense) => s + e.total, 0),
    distributionCost: todayExpenses
      .filter((e: Expense) => isDistributionExpenseCategory(e.category))
      .reduce((s: number, e: Expense) => s + e.total, 0),
    otherCost: todayExpenses
      .filter((e: Expense) => isOtherExpenseCategory(e.category))
      .reduce((s: number, e: Expense) => s + e.total, 0),
  })

  return {
    todayOmzet,
    monthOmzet,
    todayExpenseTotal,
    monthExpenseTotal,
    totalReceivables,
    profitToday,
    hasUnconfirmedExpenses,
    hasIncompleteSalesData,
    unpaidCount: receivables.filter((r: { status: string }) => r.status === 'BELUM_LUNAS').length,
    todayActivity,
    dailyTrend,
  }
}
