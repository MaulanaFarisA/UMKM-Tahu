import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import { ensureBusinessProfile } from '@/server/actions'
import { getDashboardSummary } from '@/server/queries'
import AppShell from '@/components/app-shell'
import StatusBadge from '@/components/status-badge'
import MetricCard from '@/components/metric-card'
import ActionMessage from '@/components/action-message'
import { formatRupiah } from '@/lib/format'
import Link from 'next/link'
import {
  ShoppingBag,
  Receipt,
  ReceiptText,
  ChevronRight,
  TriangleAlert,
  CircleDollarSign,
  Sparkles,
  ArrowDownRight,
  ArrowUp,
} from 'lucide-react'

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function BerandaPage({ searchParams }: PageProps) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const params = await searchParams
  const successKey = typeof params?.berhasil === 'string' ? params.berhasil : undefined

  await ensureBusinessProfile()
  const summary = await getDashboardSummary()
  const netProfit = summary.profitToday.netProfit
  const isProfit = netProfit > 0
  const isLoss = netProfit < 0
  const hasData = summary.todayOmzet > 0 || summary.todayExpenseTotal > 0
  const hasWarning = summary.hasIncompleteSalesData || summary.hasUnconfirmedExpenses

  // Verdict palette — drives the hero gradient + money color + accent ring
  const verdictTone = isProfit ? 'profit' : isLoss ? 'loss' : 'neutral'
  const verdictStatus: 'PROFIT' | 'LOSS' | 'BREAK_EVEN' = isProfit
    ? 'PROFIT'
    : isLoss
    ? 'LOSS'
    : 'BREAK_EVEN'
  const verdictMoneyColor = isProfit ? 'var(--profit)' : isLoss ? 'var(--loss-text)' : 'var(--text-primary)'
  const verdictRing = isProfit
    ? '0 0 0 1px rgba(4,120,87,0.16), 0 16px 40px rgba(4,120,87,0.14)'
    : isLoss
    ? '0 0 0 1px rgba(220,38,38,0.18), 0 16px 40px rgba(220,38,38,0.14)'
    : '0 0 0 1px rgba(28,25,23,0.06), 0 12px 32px rgba(28,25,23,0.06)'
  const verdictBg = isProfit
    ? 'linear-gradient(135deg, var(--bg-white) 0%, #F0FDF4 55%, var(--profit-bg-deep) 100%)'
    : isLoss
    ? 'linear-gradient(135deg, var(--bg-white) 0%, #FEF7F7 55%, var(--loss-bg-deep) 100%)'
    : 'linear-gradient(135deg, var(--bg-white) 0%, var(--bg) 55%, var(--bg-subtle) 100%)'
  const verdictBorder = isProfit ? 'var(--profit-border)' : isLoss ? 'var(--loss-border)' : 'var(--border)'
  const verdictHeadline = isProfit
    ? 'Untung hari ini'
    : isLoss
    ? 'Rugi hari ini'
    : hasData
    ? 'Impas hari ini'
    : 'Belum ada catatan'

  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const monthLabel = new Date().toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric',
  })
  const monthNet = summary.monthOmzet - summary.monthExpenseTotal
  const flowTotal = summary.todayOmzet + summary.todayExpenseTotal
  const incomePercent = flowTotal > 0 ? Math.round((summary.todayOmzet / flowTotal) * 100) : 0
  const expensePercent = flowTotal > 0 ? 100 - incomePercent : 0

  return (
    <AppShell active="beranda" width="wide">
      <div className="page-stack">

        {successKey === 'penjualan' && (
          <ActionMessage variant="success" title="Penjualan tersimpan">
            Beranda sudah diperbarui. Kalau ada sisa pembayaran, tagihannya otomatis masuk ke Tagihan.
          </ActionMessage>
        )}

        {successKey === 'pengeluaran' && (
          <ActionMessage variant="success" title="Pengeluaran tersimpan">
            Biaya hari ini sudah masuk hitungan laba-rugi.
          </ActionMessage>
        )}

        {/* Greeting header */}
        <div className="pt-1 flex items-start justify-between slide-up-1">
          <div>
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 mb-2"
              style={{ backgroundColor: 'var(--warn-bg)', border: '1px solid var(--warn-border)' }}
            >
              <ReceiptText size={12} strokeWidth={2.4} color="var(--warn-text)" />
              <span className="text-[11px] font-bold" style={{ color: 'var(--warn-text)' }}>
                Struk harian
              </span>
            </div>
            <h1 className="page-title" style={{ fontSize: '1.6rem' }}>
              Hari ini usaha kamu...
            </h1>
            <p className="page-subtitle text-xs mt-0.5">{today}</p>
          </div>
           {!hasData && (
             <div
               className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
               style={{ backgroundColor: 'var(--warn-bg)', border: '1px solid var(--warn-border)' }}
             >
                <Sparkles size={11} strokeWidth={2} color="var(--warn-text)" />
               <span className="text-xs font-semibold" style={{ color: 'var(--warn-text)' }}>Mulai catat</span>
             </div>
           )}
        </div>

        {/* Hero + quick actions row (desktop) */}
        <div className="grid grid-roomy lg:grid-cols-[1.4fr_1fr] slide-up-2">
          {/* Hero verdict card */}
          <div
            className="ledger-receipt ledger-hero rounded-2xl p-5 md:p-6 lg:p-7 relative"
            style={{
              background: verdictBg,
              border: `1px solid ${verdictBorder}`,
              boxShadow: verdictRing,
            }}
          >
            <div
              aria-hidden
              className="absolute top-0 left-0 right-0 h-1 rounded-t-[inherit]"
              style={{
                background:
                  verdictTone === 'profit'
                    ? 'linear-gradient(90deg, #10B981 0%, var(--profit) 50%, #047857 100%)'
                    : verdictTone === 'loss'
                    ? 'linear-gradient(90deg, #F87171 0%, var(--loss) 50%, #B91C1C 100%)'
                    : 'linear-gradient(90deg, var(--border) 0%, var(--border-strong) 50%, var(--border) 100%)',
                opacity: 0.85,
              }}
            />

            <div className="relative z-10 flex items-center justify-between gap-3 mb-4 flex-wrap">
              <StatusBadge status={verdictStatus} size="md" />
              {hasData && (
                <span
                  className="stamp-badge stamp-tilt"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.65)',
                    color: verdictMoneyColor,
                    border: `1px solid ${verdictBorder}`,
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  Margin {summary.profitToday.netMarginPercent}%
                </span>
              )}
            </div>

            <p
              className="relative z-10 text-base font-bold mb-1.5"
              style={{ color: verdictMoneyColor, opacity: 0.85, letterSpacing: '-0.012em' }}
            >
              {verdictHeadline}
            </p>

            <div className="relative z-10 flex items-baseline gap-2 flex-wrap">
              {hasData && isLoss && (
                <span
                  className="text-2xl font-bold leading-none"
                  style={{ color: verdictMoneyColor, opacity: 0.7 }}
                >
                  −
                </span>
              )}
              <p className="money-hero" style={{ color: verdictMoneyColor }}>
                {formatRupiah(Math.abs(netProfit))}
              </p>
            </div>

            {hasData && (
              <div className="relative z-10 mt-4 pt-4">
                <div className="receipt-rule mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                 <div className="flex items-center gap-1.5">
                   <span
                     className="w-1.5 h-1.5 rounded-full"
                     style={{ backgroundColor: 'var(--profit)' }}
                   />
                   <span
                     className="text-[13px] font-semibold"
                     style={{ color: 'var(--text-secondary)' }}
                   >
                     Masuk {formatRupiah(summary.todayOmzet)}
                   </span>
                 </div>
                 <div className="flex items-center gap-1.5">
                   <span
                     className="w-1.5 h-1.5 rounded-full"
                     style={{ backgroundColor: 'var(--loss)' }}
                   />
                   <span
                     className="text-[13px] font-semibold"
                     style={{ color: 'var(--text-secondary)' }}
                   >
                     Keluar {formatRupiah(summary.todayExpenseTotal)}
                   </span>
                 </div>
                </div>
              </div>
            )}
             {!hasData && (
               <p
                 className="relative z-10 text-sm font-medium mt-3"
                 style={{ color: 'var(--text-tertiary)' }}
               >
                 Catat penjualan dan pengeluaran biar laba hari ini muncul
               </p>
             )}

             {hasWarning && hasData && (
               <div
                 className="relative z-10 flex items-center gap-2 mt-4 px-3 py-2 rounded-xl"
                 style={{
                   backgroundColor: 'var(--warn-bg)',
                   border: '1px solid var(--warn-border)',
                 }}
               >
                  <TriangleAlert size={13} strokeWidth={2.5} color="var(--warn-text)" />
                 <p
                   className="text-xs font-semibold"
                   style={{ color: 'var(--warn-text)' }}
                 >
                   Belum semua dicatat, angka ini masih perkiraan
                 </p>
               </div>
             )}
          </div>

          {/* Next action card */}
           <div
             className="card card-roomy flex flex-col"
             style={{ background: 'linear-gradient(135deg, var(--bg-white) 0%, var(--warn-bg) 100%)' }}
           >
            <h2 className="section-heading mb-3">Meja kas berikutnya</h2>
            <div className="flex-1 space-y-2.5">
               {summary.todayOmzet === 0 && (
                 <Link href="/catat/penjualan" className="flex items-center gap-2.5 group tap-highlight-none">
                   <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--accent-light)' }}>
                     <ShoppingBag size={14} strokeWidth={2} color="var(--accent)" />
                   </div>
                   <p className="text-sm font-medium flex-1" style={{ color: 'var(--text-primary)' }}>Catat penjualan hari ini</p>
                   <ChevronRight size={14} strokeWidth={2} color="var(--text-muted)" />
                 </Link>
               )}
               {summary.todayExpenseTotal === 0 && (
                 <Link href="/catat/pengeluaran" className="flex items-center gap-2.5 group tap-highlight-none">
                   <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--bg-subtle)' }}>
                     <Receipt size={14} strokeWidth={2} color="var(--text-secondary)" />
                   </div>
                   <p className="text-sm font-medium flex-1" style={{ color: 'var(--text-primary)' }}>Catat pengeluaran</p>
                   <ChevronRight size={14} strokeWidth={2} color="var(--text-muted)" />
                 </Link>
               )}
               {summary.unpaidCount > 0 && (
                 <Link href="/piutang" className="flex items-center gap-2.5 group tap-highlight-none">
                   <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--warn-bg-deep)' }}>
                     <CircleDollarSign size={14} strokeWidth={2} color="var(--warn-text)" />
                   </div>
                   <p className="text-sm font-medium flex-1" style={{ color: 'var(--text-primary)' }}>
                     Tagih {summary.unpaidCount} pembeli belum dibayar
                   </p>
                   <ChevronRight size={14} strokeWidth={2} color="var(--text-muted)" />
                 </Link>
               )}
               {summary.todayOmzet > 0 && summary.todayExpenseTotal > 0 && summary.unpaidCount === 0 && (
                 <div className="flex items-center gap-2.5">
                   <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--profit-bg)' }}>
                     <Sparkles size={14} strokeWidth={2} color="var(--profit)" />
                   </div>
                   <p className="text-sm font-medium" style={{ color: 'var(--profit-text)' }}>Semua sudah tercatat hari ini</p>
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* Today stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-3 grid-roomy slide-up-3">
          <MetricCard
            label="Uang Masuk"
            value={summary.todayOmzet}
            type={summary.todayOmzet > 0 ? 'profit' : 'default'}
            sublabel={summary.todayOmzet > 0 ? 'Hari ini' : 'Belum ada penjualan'}
          />
          <MetricCard
            label="Uang Keluar"
            value={summary.todayExpenseTotal}
            type={summary.todayExpenseTotal > 0 ? 'loss' : 'default'}
            sublabel={summary.todayExpenseTotal > 0 ? 'Hari ini' : 'Belum ada catatan'}
          />
          <div className="col-span-2 lg:col-span-1">
            <MetricCard
              label="Belum Dibayar"
              value={summary.totalReceivables}
              type={summary.unpaidCount > 0 ? 'warning' : 'default'}
              sublabel={summary.unpaidCount > 0 ? `${summary.unpaidCount} pembeli` : 'Semua pembeli sudah lunas hari ini'}
              href={summary.unpaidCount > 0 ? '/piutang' : undefined}
            />
          </div>
        </div>

        <div className="grid grid-roomy lg:grid-cols-[0.95fr_1.05fr] slide-up-4">
          <div className="card card-roomy">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <p className="section-heading">Kasmeter hari ini</p>
                <p className="text-sm font-bold mt-1" style={{ color: 'var(--text-primary)' }}>
                  Aliran uang masuk dan keluar
                </p>
              </div>
              <span className="badge-neutral">
                {flowTotal > 0 ? `${incomePercent}% masuk` : 'Belum ada data'}
              </span>
            </div>
            <div
              className="h-4 rounded-full overflow-hidden flex"
              style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}
              aria-label="Perbandingan uang masuk dan keluar hari ini"
            >
              <div
                style={{
                  width: `${incomePercent}%`,
                  background: 'linear-gradient(90deg, #10B981 0%, var(--profit) 100%)',
                }}
              />
              <div
                style={{
                  width: `${expensePercent}%`,
                  background: 'linear-gradient(90deg, #F87171 0%, var(--loss) 100%)',
                }}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                {
                  label: 'Penjualan',
                  done: summary.todayOmzet > 0,
                  text: summary.todayOmzet > 0 ? 'Sudah masuk' : 'Belum dicatat',
                },
                {
                  label: 'Biaya',
                  done: summary.todayExpenseTotal > 0,
                  text: summary.todayExpenseTotal > 0 ? 'Sudah masuk' : 'Belum dicatat',
                },
                {
                  label: 'Tagihan',
                  done: summary.unpaidCount === 0,
                  text: summary.unpaidCount === 0 ? 'Aman' : `${summary.unpaidCount} pembeli`,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-2.5 min-w-0"
                  style={{
                    background: item.done ? 'var(--profit-bg)' : 'var(--warn-bg)',
                    border: item.done ? '1px solid var(--profit-border)' : '1px solid var(--warn-border)',
                  }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: item.done ? 'var(--profit-text)' : 'var(--warn-text)' }}>
                    {item.label}
                  </p>
                  <p className="text-xs font-semibold truncate mt-1" style={{ color: item.done ? 'var(--profit-text)' : 'var(--warn-text)' }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="ledger-receipt card-roomy">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <p className="section-heading">Struk berjalan hari ini</p>
                <p className="text-sm font-bold mt-1" style={{ color: 'var(--text-primary)' }}>
                  Transaksi terbaru langsung muncul di sini
                </p>
              </div>
              <ReceiptText size={20} strokeWidth={2.4} color="var(--warn-text)" />
            </div>
            {summary.todayActivity.length > 0 ? (
              <div className="space-y-2">
                {summary.todayActivity.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5"
                    style={{ background: 'var(--bg-white)', border: '1px solid var(--border)' }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: item.type === 'sale' ? 'var(--profit-bg)' : 'var(--loss-bg)',
                          border: item.type === 'sale' ? '1px solid var(--profit-border)' : '1px solid var(--loss-border)',
                        }}
                      >
                        {item.type === 'sale' ? (
                          <ShoppingBag size={15} strokeWidth={2.4} color="var(--profit)" />
                        ) : (
                          <Receipt size={15} strokeWidth={2.4} color="var(--loss)" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                          {item.label}
                        </p>
                        <p className="text-xs truncate" style={{ color: 'var(--text-tertiary)' }}>
                          {item.meta}
                        </p>
                      </div>
                    </div>
                    <p
                      className="money-xs flex-shrink-0"
                      style={{ color: item.type === 'sale' ? 'var(--profit)' : 'var(--loss)' }}
                    >
                      {item.type === 'sale' ? '+' : '-'}{formatRupiah(item.amount)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="rounded-xl p-4 text-center"
                style={{ background: 'var(--bg-subtle)', border: '1px dashed var(--border-strong)' }}
              >
                <p className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Belum ada transaksi hari ini
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                  Begitu penjualan atau biaya disimpan, struknya muncul di sini.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Unpaid receivables alert */}
        {summary.unpaidCount > 0 && (
          <Link href="/piutang" className="block tap-highlight-none">
            <div
              className="rounded-2xl p-4 flex items-center justify-between transition-all active:scale-[0.98]"
              style={{ backgroundColor: 'var(--warn-bg)', border: '1.5px solid var(--warn-border)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--warn-bg-deep)' }}
                >
                  <CircleDollarSign size={20} strokeWidth={2} color="var(--warn-text)" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: 'var(--warn-text)' }}>
                    Belum Dibayar
                  </p>
                  <p className="money-xs" style={{ color: 'var(--warn-text)' }}>
                    {formatRupiah(summary.totalReceivables)}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--warn-text)', opacity: 0.85 }}>
                    {summary.unpaidCount} pembeli belum dibayar
                  </p>
                </div>
              </div>
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--warn-bg-deep)' }}
              >
                <ChevronRight size={16} strokeWidth={2.5} color="var(--warn-text)" />
              </div>
            </div>
          </Link>
        )}

        {/* Month summary */}
        <div className="slide-up-4">
          <div className="flex items-baseline justify-between mb-3 gap-2 flex-wrap">
            <h2 className="section-heading">Bulan ini</h2>
            <p className="text-xs font-semibold capitalize" style={{ color: 'var(--text-tertiary)' }}>
              {monthLabel}
            </p>
          </div>
          <div className="grid grid-roomy lg:grid-cols-3">
            <div
              className="card card-roomy"
              style={{ background: 'linear-gradient(135deg, var(--bg-white) 0%, var(--bg-subtle) 100%)' }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Uang Masuk Bulan Ini</p>
              <p className="money-sm" style={{ color: 'var(--text-primary)' }}>{formatRupiah(summary.monthOmzet)}</p>
            </div>
            <div
              className="card card-roomy"
              style={{ background: 'linear-gradient(135deg, var(--bg-white) 0%, var(--bg-subtle) 100%)' }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Total Keluar</p>
              <p className="money-sm" style={{ color: 'var(--text-primary)' }}>{formatRupiah(summary.monthExpenseTotal)}</p>
            </div>
            <div
              className="card card-roomy"
              style={{
                background: monthNet >= 0
                  ? 'linear-gradient(135deg, var(--profit-bg) 0%, var(--profit-bg-deep) 100%)'
                  : 'linear-gradient(135deg, var(--loss-bg) 0%, var(--loss-bg-deep) 100%)',
                border: monthNet >= 0 ? '1px solid var(--profit-border)' : '1px solid var(--loss-border)',
              }}
            >
              <p
                className="text-xs font-semibold mb-1"
                style={{ color: monthNet >= 0 ? 'var(--profit-text)' : 'var(--loss-text)' }}
              >
                Selisih
              </p>
              <p
                className="money-sm"
                style={{ color: monthNet >= 0 ? 'var(--profit-text)' : 'var(--loss-text)' }}
              >
                {monthNet < 0 ? '−' : ''}{formatRupiah(Math.abs(monthNet))}
              </p>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="slide-up-5">
          <h2 className="section-heading mb-3">Mau catat apa hari ini?</h2>
          <div className="grid grid-cols-2 grid-roomy">
             <Link
               href="/catat/penjualan"
               className="rounded-2xl p-5 flex flex-col gap-3 transition-all active:scale-[0.97] tap-highlight-none relative overflow-hidden"
               style={{
                  background: 'linear-gradient(135deg, var(--profit-bg) 0%, var(--profit-bg-deep) 100%)',
                  border: '1.5px solid var(--profit-border)',
                  boxShadow: 'var(--shadow-sm)',
                 minHeight: '124px',
               }}
             >
               <div className="flex items-center justify-between">
                 <div
                   className="w-12 h-12 rounded-2xl flex items-center justify-center"
                   style={{
                     backgroundColor: 'var(--bg-white)',
                     boxShadow: '0 2px 6px rgba(4,120,87,0.18)',
                   }}
                 >
                   <ShoppingBag size={22} strokeWidth={2.2} color="var(--profit)" />
                 </div>
                 <ArrowUp size={16} strokeWidth={2.5} color="var(--profit)" />
               </div>
               <div>
                 <p className="text-base font-bold" style={{ color: 'var(--profit-text)', letterSpacing: '-0.018em' }}>
                   Catat Penjualan
                 </p>
                 <p className="text-xs mt-0.5 font-medium" style={{ color: 'var(--profit)' }}>
                   Tahu terjual hari ini
                 </p>
               </div>
             </Link>

             <Link
               href="/catat/pengeluaran"
               className="rounded-2xl p-5 flex flex-col gap-3 transition-all active:scale-[0.97] tap-highlight-none relative overflow-hidden"
               style={{
                  background: 'linear-gradient(135deg, var(--warn-bg) 0%, var(--warn-bg-deep) 100%)',
                  border: '1.5px solid var(--warn-border)',
                  boxShadow: 'var(--shadow-sm)',
                 minHeight: '124px',
               }}
             >
               <div className="flex items-center justify-between">
                 <div
                   className="w-12 h-12 rounded-2xl flex items-center justify-center"
                   style={{
                     backgroundColor: 'var(--bg-white)',
                     boxShadow: '0 2px 6px rgba(245,158,11,0.20)',
                   }}
                 >
                   <Receipt size={22} strokeWidth={2.2} color="var(--warn-text)" />
                 </div>
                 <ArrowDownRight size={16} strokeWidth={2.5} color="var(--warn-text)" />
               </div>
               <div>
                 <p className="text-base font-bold" style={{ color: 'var(--warn-text)', letterSpacing: '-0.018em' }}>
                   Catat Pengeluaran
                 </p>
                 <p className="text-xs mt-0.5 font-medium" style={{ color: 'var(--warn-text)' }}>
                   Biaya keluar hari ini
                 </p>
               </div>
             </Link>
          </div>

          {/* Secondary actions — desktop only */}
          <div className="hidden lg:grid grid-cols-2 grid-roomy mt-4">
             <Link
               href="/piutang"
               className="card rounded-2xl p-4 flex items-center gap-3 transition-all active:scale-[0.98] tap-highlight-none"
             >
               <div
                 className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                 style={{ backgroundColor: 'var(--warn-bg)' }}
               >
                 <CircleDollarSign size={18} strokeWidth={2} color="var(--warn-text)" />
               </div>
               <div className="flex-1 min-w-0">
                 <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Tagihan</p>
                 <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>Lihat semua piutang</p>
               </div>
               <ChevronRight size={16} strokeWidth={2} color="var(--text-muted)" />
             </Link>

             <Link
               href="/pengaturan"
               className="card rounded-2xl p-4 flex items-center gap-3 transition-all active:scale-[0.98] tap-highlight-none"
             >
               <div
                 className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                 style={{ backgroundColor: 'var(--bg-subtle)' }}
               >
                 <Sparkles size={18} strokeWidth={2} color="var(--text-secondary)" />
               </div>
               <div className="flex-1 min-w-0">
                 <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Pengaturan</p>
                 <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>Profil usaha</p>
               </div>
               <ChevronRight size={16} strokeWidth={2} color="var(--text-muted)" />
             </Link>
          </div>
        </div>

        {/* View receivables CTA if any */}
         {summary.unpaidCount > 0 && (
           <Link
             href="/piutang"
             className="flex items-center justify-between p-4 rounded-2xl transition-all active:scale-[0.98] tap-highlight-none lg:hidden"
             style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}
           >
             <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
               Lihat semua tagihan
             </span>
             <ChevronRight size={16} strokeWidth={2} color="var(--text-muted)" />
           </Link>
         )}

      </div>
    </AppShell>
  )
}
