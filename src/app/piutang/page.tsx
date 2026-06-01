import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import { createReceivablePaymentAction } from '@/server/actions'
import { getReceivables } from '@/server/queries'
import AppShell from '@/components/app-shell'
import EmptyState from '@/components/empty-state'
import ActionMessage from '@/components/action-message'
import SubmitButton from '@/components/submit-button'
import ProgressRing from '@/components/progress-ring'
import Celebration from '@/components/celebration'
import { formatRupiah, formatDate, todayISOString } from '@/lib/format'
import Link from 'next/link'
import {
  AlertCircle,
  CircleDollarSign,
  ShoppingBag,
  Calendar,
  CheckCircle2,
  Send,
  Users,
} from 'lucide-react'

const RECEIVABLE_ERROR_MESSAGES: Record<string, string> = {
  data: 'Data pembayaran belum lengkap.',
  bayar: 'Jumlah bayar harus lebih dari 0.',
  bayar_lebih: 'Jumlah bayar tidak boleh lebih besar dari sisa tagihan.',
  transaksi: 'Transaksi tagihan tidak ditemukan.',
  simpan: 'Pembayaran belum berhasil disimpan. Coba ulang sebentar lagi.',
}

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function PiutangPage({ searchParams }: PageProps) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const params = await searchParams
  const successKey = typeof params?.berhasil === 'string' ? params.berhasil : undefined
  const errorKey = typeof params?.gagal === 'string' ? params.gagal : undefined

  const receivables = await getReceivables()
  const unpaid = receivables.filter((r) => r.status === 'BELUM_LUNAS')
  const paid = receivables.filter((r) => r.status === 'LUNAS')
  const today = todayISOString()
  const paymentAction = createReceivablePaymentAction.bind(null, null)
  const totalUnpaid = unpaid.reduce((s, r) => s + r.remaining, 0)

  return (
    <AppShell active="piutang" title="Tagihan" width="default">
      <Celebration trigger={successKey === 'bayar' ? 'paid' : ''} />
      <div className="page-stack slide-up">

        {successKey === 'bayar' && (
          <ActionMessage variant="success" title="Pembayaran tercatat">
            Tagihan sudah diperbarui. Kalau sisa menjadi nol, pembeli pindah ke daftar sudah dibayar.
          </ActionMessage>
        )}

        {errorKey && (
          <ActionMessage variant="error" title="Pembayaran belum tercatat">
            {RECEIVABLE_ERROR_MESSAGES[errorKey] ?? RECEIVABLE_ERROR_MESSAGES.simpan}
          </ActionMessage>
        )}

        {/* Summary hero — urgency cue for unpaid receivables */}
        {unpaid.length > 0 && (
          <div
            className="ledger-receipt ledger-hero rounded-2xl p-5 md:p-6 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--warn-bg) 0%, var(--warn-bg-deep) 100%)',
              border: '1.5px solid var(--warn-border)',
              borderLeft: '4px solid var(--warn)',
            }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--warn-bg-deep)', border: '1px solid var(--warn-border)' }}
              >
                <CircleDollarSign size={16} strokeWidth={2.5} color="var(--warn)" />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: 'var(--warn-text)', letterSpacing: '0.08em' }}
                >
                  Total belum dibayar
                </p>
              </div>
              <span className="badge-warn">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: 'var(--warn)' }}
                />
                {unpaid.length} pembeli
              </span>
            </div>
            <p className="money-lg" style={{ color: 'var(--warn-text)' }}>
              {formatRupiah(totalUnpaid)}
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <Users size={12} strokeWidth={2.25} color="var(--warn-text)" />
              <p className="text-xs font-medium" style={{ color: 'var(--warn-text)' }}>
                Tagih pelan-pelan, arus kas tetap lancar
              </p>
            </div>
          </div>
        )}

        {/* Empty state — encouraging copy when no receivables exist */}
        {receivables.length === 0 && (
          <div className="card">
            <EmptyState
              title="Semua pembeli sudah lunas hari ini"
              description="Belum ada tagihan yang menunggu dibayar. Begitu kamu catat penjualan dengan pembayaran sebagian, sisanya otomatis muncul di sini."
              action={
                <Link
                  href="/catat/penjualan"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <ShoppingBag size={15} strokeWidth={2.25} />
                  Catat Penjualan
                </Link>
              }
            />
          </div>
        )}

        {/* Unpaid list — strong urgency, prominent payment CTA */}
        {unpaid.length > 0 && (
          <div className="section-stack">
            <div className="flex items-center gap-2">
              <AlertCircle size={14} strokeWidth={2.5} color="var(--warn)" />
              <p className="section-heading" style={{ marginBottom: 0 }}>
                Belum Dibayar ({unpaid.length})
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unpaid.map((r) => {
                const totalPaid = r.amount_paid + r.payments.reduce((s: number, p: { amount: number }) => s + p.amount, 0)
                const paidRatio = r.total_sales > 0 ? totalPaid / r.total_sales : 0
                const paidPct = Math.round(paidRatio * 100)
                return (
                  <div
                    key={r.id}
                    className="card card-roomy space-y-3"
                    style={{
                      borderLeft: '4px solid var(--warn)',
                      background: 'linear-gradient(135deg, var(--bg-white) 0%, var(--warn-bg) 100%)',
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3.5">
                      <ProgressRing ratio={paidRatio} label={`${paidPct}%`} sublabel="dibayar" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-base truncate" style={{ color: 'var(--text-primary)' }}>
                          {r.customer?.name ?? 'Pembeli tidak dikenal'}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1 mb-2">
                          <Calendar size={11} strokeWidth={2.25} color="var(--text-muted)" />
                          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{formatDate(r.date)}</p>
                        </div>
                        <span className="badge-warn">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--warn)' }} />
                          Belum Lunas
                        </span>
                      </div>
                    </div>

                    {/* Stats row */}
                    <div
                      className="grid grid-cols-3 gap-2 rounded-xl p-2.5"
                      style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-soft)' }}
                    >
                      <div className="text-center min-w-0">
                        <p className="text-[10px] uppercase tracking-wider mb-1 font-semibold" style={{ color: 'var(--text-muted)' }}>Total</p>
                        <p className="money-xs truncate" style={{ color: 'var(--text-primary)' }}>{formatRupiah(r.total_sales)}</p>
                      </div>
                      <div className="text-center min-w-0" style={{ borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
                        <p className="text-[10px] uppercase tracking-wider mb-1 font-semibold" style={{ color: 'var(--text-muted)' }}>Dibayar</p>
                        <p className="money-xs truncate" style={{ color: 'var(--profit)' }}>
                          {formatRupiah(totalPaid)}
                        </p>
                      </div>
                      <div className="text-center min-w-0">
                        <p className="text-[10px] uppercase tracking-wider mb-1 font-semibold" style={{ color: 'var(--text-muted)' }}>Sisa</p>
                        <p className="money-xs truncate" style={{ color: 'var(--warn-text)' }}>{formatRupiah(r.remaining)}</p>
                      </div>
                    </div>

                    {/* Payment form */}
                    <form action={paymentAction} className="space-y-2">
                      <input type="hidden" name="sales_transaction_id" value={r.id} />
                      <input type="hidden" name="date" value={today} />
                      <label htmlFor={`amount-${r.id}`} className="sr-only">
                        Jumlah pembayaran untuk {r.customer?.name ?? 'pembeli'}
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <span
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold pointer-events-none"
                            style={{ color: 'var(--text-tertiary)' }}
                          >Rp</span>
                          <input
                            id={`amount-${r.id}`}
                            name="amount"
                            type="number"
                            inputMode="numeric"
                            min="1"
                            max={r.remaining}
                            required
                            placeholder="Jumlah bayar"
                            className="input-field"
                            style={{ paddingLeft: '2.25rem' }}
                          />
                        </div>
                        <SubmitButton
                          pendingLabel="Mencatat..."
                          className="btn-primary flex-shrink-0"
                          style={{ minWidth: '52px', padding: '0 1rem' }}
                          aria-label={`Catat pembayaran dari ${r.customer?.name ?? 'pembeli'}`}
                        >
                          <Send size={15} strokeWidth={2.25} />
                          <span className="hidden sm:inline">Bayar</span>
                        </SubmitButton>
                      </div>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        Maks. {formatRupiah(r.remaining)} · isi sebagian juga boleh
                      </p>
                    </form>
                    <form action={paymentAction}>
                      <input type="hidden" name="sales_transaction_id" value={r.id} />
                      <input type="hidden" name="date" value={today} />
                      <input type="hidden" name="amount" value={r.remaining} />
                      <div className="flex justify-end">
                        <SubmitButton
                          pendingLabel="Melunasi..."
                          className="btn-secondary"
                        >
                          <CheckCircle2 size={15} strokeWidth={2.5} />
                          Lunasi tagihan ini
                        </SubmitButton>
                      </div>
                    </form>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Paid list — muted secondary visual weight */}
        {paid.length > 0 && (
          <div className="section-stack">
            <p className="section-heading" style={{ color: 'var(--text-tertiary)' }}>
              Sudah Dibayar ({paid.length})
            </p>
            <div className="grid grid-roomy md:grid-cols-2">
              {paid.map((r) => (
                <div
                  key={r.id}
                  className="card flex items-center justify-between gap-3"
                  style={{
                    padding: '0.875rem 1rem',
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--border-soft)',
                    boxShadow: 'none',
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: 'var(--text-secondary)' }}>
                      {r.customer?.name ?? 'Pembeli tidak dikenal'}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                      {formatDate(r.date)} · {formatRupiah(r.total_sales)}
                    </p>
                  </div>
                  <span className="badge-profit">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: 'var(--profit)' }}
                    />
                    Sudah Dibayar
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
