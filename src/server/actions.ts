'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import { SEED_DEFAULTS } from '@/domain/seed-defaults'
import { calculateReceivableAmount, calculateSalesTotal } from '@/domain/finance'
import type { Database, ExpenseCategory, ConfirmationStatus } from '@/types/database'

type SupabaseInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function loginAction(_prev: unknown, formData: FormData): Promise<{ error?: string }> {
  const supabase = await createServerClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }
  redirect('/beranda')
}

export async function registerAction(_prev: unknown, formData: FormData): Promise<{ error?: string }> {
  const supabase = await createServerClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const { error } = await supabase.auth.signUp({ email, password })
  if (error) return { error: error.message }
  redirect('/beranda')
}

export async function logoutAction(): Promise<void> {
  const supabase = await createServerClient()
  await supabase.auth.signOut()
  redirect('/login')
}

// ─── Business Profile ─────────────────────────────────────────────────────────

export async function ensureBusinessProfile() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: existing } = await supabase
    .from('business_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (existing) return existing

  const { data: created } = await (supabase as any)
    .from('business_profiles')
    .insert({
      user_id: user.id,
      business_name: SEED_DEFAULTS.businessName,
      product_name: SEED_DEFAULTS.productName,
      tofu_per_board: SEED_DEFAULTS.tofuPerBoard,
      tofu_per_pack: SEED_DEFAULTS.tofuPerPack,
      default_boards_per_day: SEED_DEFAULTS.defaultBoardsPerDay,
      default_price_per_tofu: SEED_DEFAULTS.defaultPricePerTofu,
      default_price_per_pack: SEED_DEFAULTS.defaultPricePerPack,
      default_production_days_per_month: SEED_DEFAULTS.defaultProductionDaysPerMonth,
    })
    .select()
    .single()

  return created
}

export async function updateBusinessProfileAction(_prev: unknown, formData: FormData): Promise<void> {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Tidak terautentikasi')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from('business_profiles')
    .update({
      business_name: formData.get('business_name') as string,
      product_name: formData.get('product_name') as string,
      tofu_per_board: Number(formData.get('tofu_per_board')),
      tofu_per_pack: Number(formData.get('tofu_per_pack')),
      default_boards_per_day: Number(formData.get('default_boards_per_day')),
      default_price_per_tofu: Number(formData.get('default_price_per_tofu')),
      default_price_per_pack: Number(formData.get('default_price_per_pack')),
      default_production_days_per_month: Number(formData.get('default_production_days_per_month')),
    })
    .eq('user_id', user.id)

  if (error) throw new Error(error.message)
  revalidatePath('/pengaturan')
}

// ─── Sales ────────────────────────────────────────────────────────────────────

export async function createSalesTransactionAction(_prev: unknown, formData: FormData): Promise<void> {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Tidak terautentikasi')

  const packs = Number(formData.get('packs'))
  const pricePerPack = Number(formData.get('price_per_pack'))
  const amountPaid = Number(formData.get('amount_paid') ?? 0)
  const customerName = (formData.get('customer_name') as string)?.trim()
  const date = formData.get('date') as string
  const notes = (formData.get('notes') as string) || null

  const totalSales = calculateSalesTotal(packs, pricePerPack)
  const receivableAmount = calculateReceivableAmount(totalSales, amountPaid)

  if (packs <= 0) throw new Error('Jumlah bungkus harus lebih dari 0')
  if (pricePerPack < 0) throw new Error('Harga tidak boleh negatif')
  if (amountPaid < 0) throw new Error('Jumlah dibayar tidak boleh negatif')
  if (amountPaid > totalSales) throw new Error('Jumlah dibayar tidak boleh lebih dari total penjualan')

  let customerId: string | null = null
  if (customerName) {
    const { data: existing } = await (supabase as any)
      .from('customers')
      .select('id')
      .eq('user_id', user.id)
      .ilike('name', customerName)
      .single()

    if (existing) {
      customerId = (existing as { id: string }).id
    } else {
      const { data: created } = await (supabase as any)
        .from('customers')
        .insert({ user_id: user.id, name: customerName })
        .select('id')
        .single()
      customerId = created?.id ?? null
    }
  }

  const { error } = await (supabase as any)
    .from('sales_transactions')
    .insert({
      user_id: user.id,
      customer_id: customerId,
      date,
      packs,
      price_per_pack: pricePerPack,
      total_sales: totalSales,
      amount_paid: amountPaid,
      receivable_amount: receivableAmount,
      notes,
    })

  if (error) throw new Error(error.message)
  revalidatePath('/beranda')
  revalidatePath('/piutang')
}

// ─── Expenses ─────────────────────────────────────────────────────────────────

export async function createExpenseAction(_prev: unknown, formData: FormData): Promise<void> {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Tidak terautentikasi')

  const quantity = Number(formData.get('quantity') ?? 1)
  const unit = (formData.get('unit') as string) || 'item'
  const unitPrice = Number(formData.get('unit_price') ?? formData.get('total'))
  const total = Math.round(quantity * unitPrice)
  const date = formData.get('date') as string
  const category = formData.get('category') as ExpenseCategory
  const itemName = formData.get('item_name') as string
  const confirmationStatus = (formData.get('confirmation_status') as ConfirmationStatus) || 'actual'
  const notes = (formData.get('notes') as string) || null

  if (total < 0) throw new Error('Total tidak boleh negatif')
  if (!itemName?.trim()) throw new Error('Nama pengeluaran wajib diisi')

  const { error } = await (supabase as any)
    .from('expenses')
    .insert({
      user_id: user.id,
      date,
      category,
      item_name: itemName.trim(),
      quantity,
      unit,
      unit_price: unitPrice,
      total,
      confirmation_status: confirmationStatus,
      notes,
    })

  if (error) throw new Error(error.message)
  revalidatePath('/beranda')
}

// ─── Receivable Payments ──────────────────────────────────────────────────────

export async function createReceivablePaymentAction(_prev: unknown, formData: FormData): Promise<void> {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Tidak terautentikasi')

  const salesTransactionId = formData.get('sales_transaction_id') as string
  const amount = Number(formData.get('amount'))
  const date = formData.get('date') as string
  const notes = (formData.get('notes') as string) || null

  if (amount <= 0) throw new Error('Jumlah bayar harus lebih dari 0')

  // Get transaction to check remaining
  const { data: tx } = await (supabase as any)
    .from('sales_transactions')
    .select('receivable_amount')
    .eq('id', salesTransactionId)
    .eq('user_id', user.id)
    .single()

  if (!tx) throw new Error('Transaksi tidak ditemukan')

  const { data: existingPayments } = await (supabase as any)
    .from('receivable_payments')
    .select('amount')
    .eq('sales_transaction_id', salesTransactionId)

  const totalPaid = (existingPayments ?? []).reduce((s: number, p: { amount: number }) => s + p.amount, 0)
  const remaining = tx.receivable_amount - totalPaid
  if (amount > remaining) throw new Error('Jumlah bayar tidak boleh lebih dari sisa piutang')

  const { error } = await (supabase as any)
    .from('receivable_payments')
    .insert({
      user_id: user.id,
      sales_transaction_id: salesTransactionId,
      date,
      amount,
      notes,
    })

  if (error) throw new Error(error.message)
  revalidatePath('/piutang')
  revalidatePath('/beranda')
}
