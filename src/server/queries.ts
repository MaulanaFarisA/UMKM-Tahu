import { createServerClient } from '@/lib/supabase-server'
import {
  calculateRemainingReceivable,
  getReceivableStatus,
  calculateProfitSummary,
} from '@/domain/finance'
import type { SalesTransaction, ReceivablePayment, Expense } from '@/types/database'

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

  const from = `${year}-${String(month).padStart(2, '0')}-01`
  const to = `${year}-${String(month).padStart(2, '0')}-31`

  const { data } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', user.id)
    .gte('date', from)
    .lte('date', to)
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

  const from = `${year}-${String(month).padStart(2, '0')}-01`
  const to = `${year}-${String(month).padStart(2, '0')}-31`

  const { data } = await supabase
    .from('sales_transactions')
    .select('*, customer:customers(id, name)')
    .eq('user_id', user.id)
    .gte('date', from)
    .lte('date', to)
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
  const today = new Date().toISOString().split('T')[0]
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  const [todaySales, monthSales, todayExpenses, monthExpenses, receivables] =
    await Promise.all([
      getSalesTransactions(today),
      getSalesByMonth(year, month),
      getExpenses(today),
      getExpensesByMonth(year, month),
      getReceivables(),
    ])

  const todayOmzet = todaySales.reduce((s: number, t: SalesWithCustomer) => s + t.total_sales, 0)
  const monthOmzet = monthSales.reduce((s: number, t: SalesWithCustomer) => s + t.total_sales, 0)
  const todayExpenseTotal = todayExpenses.reduce((s: number, e: Expense) => s + e.total, 0)
  const monthExpenseTotal = monthExpenses.reduce((s: number, e: Expense) => s + e.total, 0)
  const totalReceivables = receivables.reduce((s: number, r: { remaining: number }) => s + r.remaining, 0)
  const hasUnconfirmedExpenses = monthExpenses.some((e: Expense) => e.confirmation_status === 'unconfirmed')
  const hasIncompleteSalesData = todaySales.length === 0

  const profitToday = calculateProfitSummary({
    totalSales: todayOmzet,
    totalProductionCost: todayExpenses
      .filter((e: Expense) => ['raw_material', 'additional_material', 'production'].includes(e.category))
      .reduce((s: number, e: Expense) => s + e.total, 0),
    distributionCost: todayExpenses
      .filter((e: Expense) => e.category === 'distribution')
      .reduce((s: number, e: Expense) => s + e.total, 0),
    otherCost: todayExpenses
      .filter((e: Expense) => e.category === 'other')
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
  }
}
