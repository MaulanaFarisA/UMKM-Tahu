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
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  LineChart,
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
          <div className="card-premium card-roomy card-static">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="icon-tile w-9 h-9" style={{ background: 'linear-gradient(135deg, #EEF2FF, #E0E7FF)' }}>
                  <Activity size={17} strokeWidth={2.4} color="var(--accent)" />
                </span>
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
          <div className="card-premium card-roomy card-static">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="icon-tile w-9 h-9" style={{ background: 'linear-gradient(135deg, #F1F5F9, #E2E8F0)' }}>
                <ReceiptText size={17} strokeWidth={2.4} color="var(--text-secondary)" />
              </span>
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
          <Link href="/piutang" className="block tap-highlight-none slide-up-4 group">
            <div
              className="relative overflow-hidden rounded-2xl p-4 md:p-5 flex items-center justify-between gap-3 transition-all hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
                border: '1px solid var(--warn-border)',
                boxShadow: '0 8px 20px -10px rgba(217,119,6,0.35)',
              }}
            >
              <span aria-hidden className="blob" style={{ width: 140, height: 140, top: -50, right: 40, background: 'rgba(245,158,11,0.18)' }} />
              <div className="relative flex items-center gap-3.5">
                <span
                  className="icon-tile w-11 h-11 flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #FBBF24, #F59E0B)', boxShadow: '0 6px 14px -4px rgba(245,158,11,0.6)' }}
                >
                  <CircleDollarSign size={20} strokeWidth={2.4} color="#fff" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--warn-text)', opacity: 0.8 }}>Perlu ditagih</p>
                  <p className="money-sm mt-0.5" style={{ color: 'var(--warn-text)' }}>
                    {formatRupiah(summary.totalReceivables)}
                  </p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--warn-text)', opacity: 0.75 }}>
                    {summary.unpaidCount} pembeli belum lunas
                  </p>
                </div>
              </div>
              <span
                className="relative inline-flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 transition-transform group-hover:translate-x-1"
                style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid var(--warn-border)' }}
              >
                <ChevronRight size={18} strokeWidth={2.5} color="var(--warn-text)" />
              </span>
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
              <div className="card-premium card-roomy card-static relative overflow-hidden">
                <span className="icon-tile w-8 h-8 mb-3" style={{ background: 'linear-gradient(135deg, #D1FAE5, #A7F3D0)' }}>
                  <ArrowDownLeft size={15} strokeWidth={2.5} color="#047857" />
                </span>
                <p className="text-[0.7rem] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Pemasukan</p>
                <p className="kpi-value" style={{ color: 'var(--text-primary)' }}>{formatRupiah(summary.monthOmzet)}</p>
              </div>
              <div className="card-premium card-roomy card-static relative overflow-hidden">
                <span className="icon-tile w-8 h-8 mb-3" style={{ background: 'linear-gradient(135deg, #FFE4E6, #FECDD3)' }}>
                  <ArrowUpRight size={15} strokeWidth={2.5} color="#E11D48" />
                </span>
                <p className="text-[0.7rem] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Pengeluaran</p>
                <p className="kpi-value" style={{ color: 'var(--text-primary)' }}>{formatRupiah(summary.monthExpenseTotal)}</p>
              </div>
              <div
                className="col-span-2 md:col-span-1 lg:col-span-1 card-roomy relative overflow-hidden rounded-xl"
                style={{
                  background: monthNet >= 0
                    ? 'linear-gradient(140deg, #065F46 0%, #047857 60%, #10B981 100%)'
                    : 'linear-gradient(140deg, #9F1239 0%, #BE123C 60%, #F43F5E 100%)',
                  boxShadow: monthNet >= 0 ? '0 12px 28px -10px rgba(5,150,105,0.55)' : '0 12px 28px -10px rgba(225,29,72,0.5)',
                }}
              >
                <span aria-hidden className="texture-dots absolute inset-0 text-white pointer-events-none" style={{ opacity: 0.1 }} />
                <span className="relative icon-tile w-8 h-8 mb-3" style={{ background: 'rgba(255,255,255,0.18)' }}>
                  <Wallet size={15} strokeWidth={2.5} color="#fff" />
                </span>
                <p className="relative text-[0.7rem] font-bold uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.8)' }}>Laba Bersih</p>
                <p className="relative kpi-value" style={{ color: '#fff' }}>
                  {monthNet < 0 ? '-' : ''}{formatRupiah(Math.abs(monthNet))}
                </p>
                <p className="relative text-[0.7rem] mt-2 font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {monthNet >= 0 ? 'Selisih positif bulan ini' : 'Pengeluaran lebih besar'}
                </p>
              </div>
            </div>

            {/* 7-day momentum */}
            <div className="card-premium card-roomy card-static relative overflow-hidden">
              <span aria-hidden className="blob" style={{ width: 160, height: 160, top: -60, right: -40, background: weekNet >= 0 ? 'rgba(16,185,129,0.16)' : 'rgba(244,63,94,0.14)' }} />
              <div className="relative flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="icon-tile w-9 h-9" style={{ background: 'linear-gradient(135deg, #EEF2FF, #E0E7FF)' }}>
                    <LineChart size={17} strokeWidth={2.4} color="var(--accent)" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Tren 7 Hari</h3>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Laba bersih harian</p>
                  </div>
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
              <div className="relative">
                <TrendSparkline data={summary.dailyTrend} />
              </div>
              <div className="relative flex items-center justify-between mt-2">
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
