import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import { ensureBusinessProfile } from '@/server/actions'
import { getDashboardSummary } from '@/server/queries'
import AppShell from '@/components/app-shell'
import MetricCard from '@/components/metric-card'
import ActionMessage from '@/components/action-message'
import HeroVerdict from '@/components/hero-verdict'
import ActionButtonBig from '@/components/action-button-big'
import CashflowChart from '@/components/cashflow-chart'
import ActivityTimeline from '@/components/activity-timeline'
import TrendSparkline from '@/components/trend-sparkline'
import { formatRupiah } from '@/lib/format'
import Link from 'next/link'
import {
  ShoppingBag,
  Receipt,
  ReceiptText,
  ChevronRight,
  CircleDollarSign,
  Activity,
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
  const hasData = summary.todayOmzet > 0 || summary.todayExpenseTotal > 0
  const hasWarning = summary.hasIncompleteSalesData || summary.hasUnconfirmedExpenses

  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
  const monthLabel = new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
  const monthNet = summary.monthOmzet - summary.monthExpenseTotal
  const weekNet = summary.dailyTrend.reduce((s, d) => s + d.net, 0)
  const flowTotal = summary.todayOmzet + summary.todayExpenseTotal
  const incomePercent = flowTotal > 0 ? Math.round((summary.todayOmzet / flowTotal) * 100) : 0


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

        {/* HERO ZONE — verdict + the two primary actions, above the fold */}
        <HeroVerdict
          netProfit={netProfit}
          todayOmzet={summary.todayOmzet}
          todayExpenseTotal={summary.todayExpenseTotal}
          marginPercent={summary.profitToday.netMarginPercent}
          hasData={hasData}
          hasWarning={hasWarning}
          dateLabel={today}
        >
          <ActionButtonBig
            href="/catat/penjualan"
            title="Catat Penjualan"
            subtitle="Tahu terjual hari ini"
            Icon={ShoppingBag}
            variant="profit"
            pulse={!hasData}
          />
          <ActionButtonBig
            href="/catat/pengeluaran"
            title="Catat Pengeluaran"
            subtitle="Biaya keluar hari ini"
            Icon={Receipt}
            variant="loss"
          />
        </HeroVerdict>

        {/* Today's pulse — metric trio */}
        <div className="grid grid-cols-2 md:grid-cols-3 grid-roomy slide-up-2">
          <MetricCard
            label="Uang Masuk"
            value={summary.todayOmzet}
            type={summary.todayOmzet > 0 ? 'profit' : 'default'}
            sublabel={summary.todayOmzet > 0 ? 'Hari ini' : 'Belum ada penjualan'}
            animate
          />
          <MetricCard
            label="Uang Keluar"
            value={summary.todayExpenseTotal}
            type={summary.todayExpenseTotal > 0 ? 'loss' : 'default'}
            sublabel={summary.todayExpenseTotal > 0 ? 'Hari ini' : 'Belum ada catatan'}
            animate
          />
          <div className="col-span-2 md:col-span-1">
            <MetricCard
              label="Belum Dibayar"
              value={summary.totalReceivables}
              type={summary.unpaidCount > 0 ? 'warning' : 'default'}
              sublabel={summary.unpaidCount > 0 ? `${summary.unpaidCount} pembeli` : 'Semua lunas hari ini'}
              href={summary.unpaidCount > 0 ? '/piutang' : undefined}
              animate
            />
          </div>
        </div>


        {/* Cashflow + activity */}
        <div className="grid grid-roomy md:grid-cols-2 lg:grid-cols-[0.95fr_1.05fr] slide-up-3">
          <div className="card card-roomy">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--accent-light)' }}>
                  <Activity size={16} strokeWidth={2.25} color="var(--accent)" />
                </div>
                <div>
                  <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Arus Kas Hari Ini</h2>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Masuk vs keluar</p>
                </div>
              </div>
              <span className="badge-neutral">{flowTotal > 0 ? `${incomePercent}% masuk` : 'Belum ada'}</span>
            </div>

            <CashflowChart income={summary.todayOmzet} expense={summary.todayExpenseTotal} />

            <div className="grid grid-cols-3 gap-2 mt-6">
              {[
                { label: 'Penjualan', done: summary.todayOmzet > 0 },
                { label: 'Biaya', done: summary.todayExpenseTotal > 0 },
                { label: 'Tagihan', done: summary.unpaidCount === 0 },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl px-3 py-2.5 text-center"
                  style={{
                    background: item.done ? 'var(--profit-bg)' : 'var(--bg-subtle)',
                    border: item.done ? '1px solid var(--profit-border)' : '1px solid var(--border)',
                  }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: item.done ? 'var(--profit-text)' : 'var(--text-muted)' }}>
                    {item.label}
                  </p>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: item.done ? 'var(--profit-text)' : 'var(--text-muted)' }}>
                    {item.done ? 'Tercatat' : 'Belum'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div className="card card-roomy">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--bg-subtle)' }}>
                <ReceiptText size={16} strokeWidth={2.25} color="var(--text-secondary)" />
              </div>
              <div>
                <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Transaksi Terbaru</h2>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Aktivitas hari ini</p>
              </div>
            </div>

            <ActivityTimeline items={summary.todayActivity} />
          </div>
        </div>


        {/* Receivables spotlight */}
        {summary.unpaidCount > 0 && (
          <Link href="/piutang" className="block tap-highlight-none slide-up-4">
            <div
              className="rounded-2xl p-4 flex items-center justify-between gap-3 transition-all hover:shadow-md active:scale-[0.99]"
              style={{ backgroundColor: 'var(--warn-bg)', border: '1.5px solid var(--warn-border)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--warn-bg-deep)' }}>
                  <CircleDollarSign size={20} strokeWidth={2} color="var(--warn-text)" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--warn-text)' }}>Belum Dibayar</p>
                  <p className="money-xs mt-0.5" style={{ color: 'var(--warn-text)' }}>
                    {formatRupiah(summary.totalReceivables)} &middot; {summary.unpaidCount} pembeli
                  </p>
                </div>
              </div>
              <ChevronRight size={18} strokeWidth={2} color="var(--warn-text)" />
            </div>
          </Link>
        )}

        {/* Monthly summary */}
        <div className="slide-up-5">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="section-heading">Ringkasan Bulan Ini</h2>
            <p className="text-xs font-medium capitalize" style={{ color: 'var(--text-muted)' }}>{monthLabel}</p>
          </div>
          <div className="grid grid-roomy lg:grid-cols-[1fr_1.1fr]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 grid-roomy lg:col-span-1">
              <div className="card card-roomy">
                <p className="text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Pemasukan</p>
                <p className="money-sm" style={{ color: 'var(--text-primary)' }}>{formatRupiah(summary.monthOmzet)}</p>
              </div>
              <div className="card card-roomy">
                <p className="text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Pengeluaran</p>
                <p className="money-sm" style={{ color: 'var(--text-primary)' }}>{formatRupiah(summary.monthExpenseTotal)}</p>
              </div>
              <div
                className="col-span-2 md:col-span-1 lg:col-span-1 card card-roomy"
                style={{
                  background: monthNet >= 0
                    ? 'linear-gradient(135deg, var(--profit-bg), var(--profit-bg-deep))'
                    : 'linear-gradient(135deg, var(--loss-bg), var(--loss-bg-deep))',
                  border: monthNet >= 0 ? '1px solid var(--profit-border)' : '1px solid var(--loss-border)',
                }}
              >
                <p className="text-xs font-medium mb-1.5" style={{ color: monthNet >= 0 ? 'var(--profit-text)' : 'var(--loss-text)' }}>Laba Bersih</p>
                <p className="money-sm" style={{ color: monthNet >= 0 ? 'var(--profit-text)' : 'var(--loss-text)' }}>
                  {monthNet < 0 ? '-' : ''}{formatRupiah(Math.abs(monthNet))}
                </p>
              </div>
            </div>

            {/* 7-day momentum */}
            <div className="card card-roomy">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Tren 7 Hari</h3>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Laba bersih harian</p>
                </div>
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold"
                  style={{
                    background: weekNet === 0 ? 'var(--bg-subtle)' : weekNet > 0 ? 'var(--profit-bg)' : 'var(--loss-bg)',
                    color: weekNet === 0 ? 'var(--text-tertiary)' : weekNet > 0 ? 'var(--profit-text)' : 'var(--loss-text)',
                    border: `1px solid ${weekNet === 0 ? 'var(--border)' : weekNet > 0 ? 'var(--profit-border)' : 'var(--loss-border)'}`,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {weekNet > 0 ? '+' : weekNet < 0 ? '−' : ''}{formatRupiah(Math.abs(weekNet))}
                </span>
              </div>
              <TrendSparkline data={summary.dailyTrend} />
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>7 hari lalu</span>
                <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>Hari ini</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </AppShell>
  )
}
