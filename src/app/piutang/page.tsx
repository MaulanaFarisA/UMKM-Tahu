import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import { createReceivablePaymentAction } from '@/server/actions'
import { getReceivables } from '@/server/queries'
import AppShell from '@/components/app-shell'
import { formatRupiah, formatDate, todayISOString } from '@/lib/format'
import Link from 'next/link'
import {
  CircleCheck,
  CircleDollarSign,
  ShoppingBag,
  ChevronRight,
  Calendar,
  Banknote,
} from 'lucide-react'

export default async function PiutangPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const receivables = await getReceivables()
  const unpaid = receivables.filter((r) => r.status === 'BELUM_LUNAS')
  const paid = receivables.filter((r) => r.status === 'LUNAS')
  const today = todayISOString()
  const paymentAction = createReceivablePaymentAction.bind(null, null)
  const totalUnpaid = unpaid.reduce((s, r) => s + r.remaining, 0)

  return (
    <AppShell active="piutang" title="Tagihan" width="default">
      <div className="page-stack slide-up">

        {/* Summary hero */}
        {unpaid.length > 0 && (
          <div
            className="hero-card"
            style={{ backgroundColor: '#FFFBEB', border: '1.5px solid #FDE68A', borderLeft: '4px solid #F59E0B' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#FEF3C7' }}
              >
                <CircleDollarSign size={14} strokeWidth={2.5} color="#D97706" />
              </div>
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: '#92400E', letterSpacing: '0.08em' }}
              >
                Total Belum Dibayar
              </p>
            </div>
            <p className="money-lg" style={{ color: '#F59E0B' }}>
              {formatRupiah(totalUnpaid)}
            </p>
            <p className="text-xs mt-1.5 font-medium" style={{ color: '#92400E' }}>
              dari {unpaid.length} pembeli belum lunas
            </p>
          </div>
        )}

        {/* Empty state */}
        {receivables.length === 0 && (
          <div className="card p-8 flex flex-col items-center text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)' }}
            >
              <CircleCheck size={30} strokeWidth={2} color="#059669" />
            </div>
            <p className="font-bold text-base mb-1" style={{ color: '#1A1714' }}>
              Semua sudah lunas
            </p>
            <p className="text-sm mb-5" style={{ color: '#44403C' }}>
              Semua pembeli sudah lunas hari ini.
            </p>
            <Link
              href="/catat/penjualan"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                boxShadow: '0 4px 12px rgba(124,58,237,0.3)',
              }}
            >
              <ShoppingBag size={15} strokeWidth={2} />
              Catat Penjualan
            </Link>
          </div>
        )}

        {/* Unpaid list */}
        {unpaid.length > 0 && (
          <div className="section-stack">
            <p className="section-heading">Belum Lunas ({unpaid.length})</p>
            <div className="grid grid-roomy lg:grid-cols-2">
              {unpaid.map((r) => (
              <div key={r.id} className="card card-roomy space-y-4" style={{ borderLeft: '3px solid #F59E0B' }}>
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-base truncate" style={{ color: '#1A1714' }}>
                      {r.customer?.name ?? 'Pembeli tidak dikenal'}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Calendar size={11} strokeWidth={2} color="#9C9690" />
                      <p className="text-xs" style={{ color: '#9C9690' }}>{formatDate(r.date)}</p>
                    </div>
                  </div>
                  <span className="badge-loss ml-2 flex-shrink-0">Belum Lunas</span>
                </div>

                {/* Stats row */}
                <div
                  className="grid grid-cols-3 gap-2 rounded-xl p-3"
                  style={{ backgroundColor: '#F5F4F0' }}
                >
                  <div className="text-center">
                    <p className="text-xs mb-1" style={{ color: '#9C9690' }}>Total</p>
                    <p className="money-xs" style={{ color: '#1A1714' }}>{formatRupiah(r.total_sales)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs mb-1" style={{ color: '#9C9690' }}>Dibayar</p>
                    <p className="money-xs" style={{ color: '#059669' }}>
                      {formatRupiah(r.amount_paid + r.payments.reduce((s: number, p: { amount: number }) => s + p.amount, 0))}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs mb-1" style={{ color: '#9C9690' }}>Sisa</p>
                    <p className="money-xs" style={{ color: '#DC2626' }}>{formatRupiah(r.remaining)}</p>
                  </div>
                </div>

                {/* Payment form */}
                <form action={paymentAction} className="space-y-2">
                  <input type="hidden" name="sales_transaction_id" value={r.id} />
                  <input type="hidden" name="date" value={today} />
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold pointer-events-none"
                        style={{ color: '#9C9690' }}
                      >Rp</span>
                      <input
                        name="amount"
                        type="number"
                        min="1"
                        max={r.remaining}
                        placeholder="Jumlah bayar"
                        className="input-field"
                        style={{ fontSize: '0.875rem', padding: '0.625rem 0.875rem', paddingLeft: '2.25rem' }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl font-bold text-sm flex-shrink-0 text-white transition-all active:scale-95"
                      style={{
                        background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                        boxShadow: '0 2px 8px rgba(124,58,237,0.25)',
                      }}
                    >
                      <Banknote size={15} strokeWidth={2} />
                    </button>
                  </div>
                  <p className="text-xs" style={{ color: '#9C9690' }}>
                    Maks. {formatRupiah(r.remaining)}
                  </p>
                </form>
              </div>
            ))}
            </div>
          </div>
        )}

        {/* Paid list */}
        {paid.length > 0 && (
          <div className="section-stack">
            <p className="section-heading">Sudah Lunas ({paid.length})</p>
            <div className="grid grid-roomy lg:grid-cols-2">
            {paid.map((r) => (
              <div
                key={r.id}
                className="card card-roomy flex items-center justify-between"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ color: '#1A1714' }}>
                    {r.customer?.name ?? 'Pembeli tidak dikenal'}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#9C9690' }}>
                    {formatDate(r.date)} · {formatRupiah(r.total_sales)}
                  </p>
                </div>
                <span className="badge-profit ml-3 flex-shrink-0">
                  <CircleCheck size={10} strokeWidth={2.5} />
                  Lunas
                </span>
              </div>
            ))}
            </div>
          </div>
        )}

      </div>
    </AppShell>
  )
}
