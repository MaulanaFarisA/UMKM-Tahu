import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import { ensureBusinessProfile } from '@/server/actions'
import { getDashboardSummary, getBusinessProfile } from '@/server/queries'
import AppShell from '@/components/app-shell'
import { formatRupiah } from '@/lib/format'
import Link from 'next/link'
import type { BusinessProfile } from '@/types/database'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ShoppingBag,
  Receipt,
  ChevronRight,
  TriangleAlert,
  CircleDollarSign,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react'

export default async function BerandaPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  await ensureBusinessProfile()
  const [summary, profileData] = await Promise.all([
    getDashboardSummary(),
    getBusinessProfile(),
  ])
  const profile = profileData as BusinessProfile | null
  const netProfit = summary.profitToday.netProfit
  const isProfit = netProfit > 0
  const isLoss = netProfit < 0
  const hasData = summary.todayOmzet > 0 || summary.todayExpenseTotal > 0
  const hasWarning = summary.hasIncompleteSalesData || summary.hasUnconfirmedExpenses

  const verdictColor = isProfit ? '#065F46' : isLoss ? '#991B1B' : '#4A4540'
  const verdictBg = isProfit ? '#ECFDF5' : isLoss ? '#FEF2F2' : '#F5F4F0'
  const verdictBorder = isProfit ? '#A7F3D0' : isLoss ? '#FECACA' : '#E8E5DF'
  const verdictLabel = isProfit ? 'Untung Hari Ini' : isLoss ? 'Rugi Hari Ini' : 'Impas Hari Ini'
  const VerdictIcon = isProfit ? TrendingUp : isLoss ? TrendingDown : Minus

  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <AppShell active="beranda" width="wide">
      <div className="page-stack slide-up">

        {/* Greeting header */}
        <div className="pt-1 flex items-start justify-between">
          <div>
            <p className="page-title" style={{ fontSize: '1.5rem' }}>
              Hari ini usaha kamu...
            </p>
            <p className="page-subtitle text-xs mt-0.5">{today}</p>
          </div>
          {!hasData && (
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
              style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}
            >
              <Sparkles size={11} strokeWidth={2} color="#D97706" />
              <span className="text-xs font-semibold" style={{ color: '#92400E' }}>Mulai catat</span>
            </div>
          )}
        </div>

        {/* Hero + quick actions row (desktop) */}
        <div className="grid grid-roomy lg:grid-cols-[1.4fr_1fr]">
          {/* Hero verdict card */}
          <div
            className="hero-card"
            style={{ backgroundColor: verdictBg, border: `1.5px solid ${verdictBorder}` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: isProfit ? '#A7F3D0' : isLoss ? '#FECACA' : '#E8E5DF' }}
                >
                  <VerdictIcon size={14} strokeWidth={2.5} color={verdictColor} />
                </div>
                <p
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: verdictColor, letterSpacing: '0.08em' }}
                >
                  {verdictLabel}
                </p>
              </div>
              {hasData && (
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: isProfit ? '#A7F3D0' : isLoss ? '#FECACA' : '#E8E5DF',
                    color: verdictColor,
                  }}
                >
                  {summary.profitToday.netMarginPercent}% margin
                </span>
              )}
            </div>

            <p className="money-hero" style={{ color: verdictColor }}>
              {formatRupiah(Math.abs(netProfit))}
            </p>

            {hasData && (
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="text-xs font-medium" style={{ color: verdictColor, opacity: 0.8 }}>
                  Omzet {formatRupiah(summary.todayOmzet)}
                </span>
                <span style={{ color: verdictColor, opacity: 0.4 }}>·</span>
                <span className="text-xs font-medium" style={{ color: verdictColor, opacity: 0.8 }}>
                  Biaya {formatRupiah(summary.todayExpenseTotal)}
                </span>
              </div>
            )}
            {!hasData && (
              <p className="text-xs mt-2" style={{ color: '#A8A29E' }}>
                Belum ada catatan hari ini
              </p>
            )}

            {hasWarning && hasData && (
              <div
                className="flex items-center gap-1.5 mt-3 pt-3"
                style={{ borderTop: `1px solid ${verdictBorder}` }}
              >
                <TriangleAlert size={12} strokeWidth={2} color="#D97706" />
                <p className="text-xs font-medium" style={{ color: '#92400E' }}>
                  Belum semua dicatat, angka ini masih perkiraan
                </p>
              </div>
            )}
          </div>

          {/* Next action card */}
          <div
            className="card card-roomy flex flex-col"
            style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFBEB 100%)' }}
          >
            <p className="section-heading mb-3">Yang Perlu Dilakukan</p>
            <div className="flex-1 space-y-2.5">
              {summary.todayOmzet === 0 && (
                <Link href="/catat/penjualan" className="flex items-center gap-2.5 group tap-highlight-none">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EDE9FE' }}>
                    <ShoppingBag size={14} strokeWidth={2} color="#7C3AED" />
                  </div>
                  <p className="text-sm font-medium flex-1" style={{ color: '#1A1714' }}>Catat penjualan hari ini</p>
                  <ChevronRight size={14} strokeWidth={2} color="#9C9690" />
                </Link>
              )}
              {summary.todayExpenseTotal === 0 && (
                <Link href="/catat/pengeluaran" className="flex items-center gap-2.5 group tap-highlight-none">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F5F4F0' }}>
                    <Receipt size={14} strokeWidth={2} color="#4A4540" />
                  </div>
                  <p className="text-sm font-medium flex-1" style={{ color: '#1A1714' }}>Catat pengeluaran</p>
                  <ChevronRight size={14} strokeWidth={2} color="#9C9690" />
                </Link>
              )}
              {summary.unpaidCount > 0 && (
                <Link href="/piutang" className="flex items-center gap-2.5 group tap-highlight-none">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FEF3C7' }}>
                    <CircleDollarSign size={14} strokeWidth={2} color="#D97706" />
                  </div>
                  <p className="text-sm font-medium flex-1" style={{ color: '#1A1714' }}>
                    Tagih {summary.unpaidCount} pembeli belum lunas
                  </p>
                  <ChevronRight size={14} strokeWidth={2} color="#9C9690" />
                </Link>
              )}
              {summary.todayOmzet > 0 && summary.todayExpenseTotal > 0 && summary.unpaidCount === 0 && (
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#ECFDF5' }}>
                    <Sparkles size={14} strokeWidth={2} color="#059669" />
                  </div>
                  <p className="text-sm font-medium" style={{ color: '#065F46' }}>Semua sudah tercatat hari ini</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Today stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-3 grid-roomy">
          <div className="card card-roomy" style={{ borderLeft: summary.todayOmzet > 0 ? '3px solid #059669' : '3px solid #E7E3DC' }}>
            <p className="section-heading mb-2">Uang Masuk</p>
            <p className="money-sm" style={{ color: summary.todayOmzet > 0 ? '#059669' : '#1C1917' }}>
              {formatRupiah(summary.todayOmzet)}
            </p>
            {summary.todayOmzet === 0 && (
              <p className="text-xs mt-1" style={{ color: '#A8A29E' }}>Belum ada penjualan</p>
            )}
            {summary.todayOmzet > 0 && (
              <p className="text-xs mt-1" style={{ color: '#A8A29E' }}>Hari ini</p>
            )}
          </div>
          <div className="card card-roomy">
            <p className="section-heading mb-2">Uang Keluar</p>
            <p className="money-sm" style={{ color: '#1C1917' }}>
              {formatRupiah(summary.todayExpenseTotal)}
            </p>
            {summary.todayExpenseTotal === 0 && (
              <p className="text-xs mt-1" style={{ color: '#A8A29E' }}>Belum ada catatan</p>
            )}
            {summary.todayExpenseTotal > 0 && (
              <p className="text-xs mt-1" style={{ color: '#A8A29E' }}>Hari ini</p>
            )}
          </div>
          <div className="card card-roomy col-span-2 lg:col-span-1" style={{ borderLeft: summary.unpaidCount > 0 ? '3px solid #F59E0B' : '3px solid #E7E3DC' }}>
            <p className="section-heading mb-2">Belum Dibayar</p>
            <p className="money-sm" style={{ color: summary.unpaidCount > 0 ? '#F59E0B' : '#1C1917' }}>
              {formatRupiah(summary.totalReceivables)}
            </p>
            <p className="text-xs mt-1" style={{ color: '#A8A29E' }}>
              {summary.unpaidCount > 0 ? `${summary.unpaidCount} pembeli` : 'Semua sudah lunas'}
            </p>
          </div>
        </div>

        {/* Unpaid receivables alert */}
        {summary.unpaidCount > 0 && (
          <Link href="/piutang" className="block tap-highlight-none">
            <div
              className="rounded-2xl p-4 flex items-center justify-between transition-all active:scale-98"
              style={{ backgroundColor: '#FFFBEB', border: '1.5px solid #FDE68A' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#FEF3C7' }}
                >
                  <CircleDollarSign size={20} strokeWidth={2} color="#D97706" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: '#92400E' }}>
                    Belum Dibayar
                  </p>
                  <p className="money-xs" style={{ color: '#D97706' }}>
                    {formatRupiah(summary.totalReceivables)}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#B45309' }}>
                    {summary.unpaidCount} pembeli belum lunas
                  </p>
                </div>
              </div>
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#FEF3C7' }}
              >
                <ChevronRight size={16} strokeWidth={2.5} color="#D97706" />
              </div>
            </div>
          </Link>
        )}

        {/* Month summary */}
        <div>
          <p className="section-heading mb-3">Ringkasan Bulan Ini</p>
          <div className="grid grid-roomy lg:grid-cols-3">
            <div
              className="card card-roomy"
              style={{ background: 'linear-gradient(135deg, #FAFAF8 0%, #F5F4F0 100%)' }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: '#9C9690' }}>Total Omzet</p>
              <p className="money-sm" style={{ color: '#1A1714' }}>{formatRupiah(summary.monthOmzet)}</p>
            </div>
            <div
              className="card card-roomy"
              style={{ background: 'linear-gradient(135deg, #FAFAF8 0%, #F5F4F0 100%)' }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: '#9C9690' }}>Total Keluar</p>
              <p className="money-sm" style={{ color: '#1A1714' }}>{formatRupiah(summary.monthExpenseTotal)}</p>
            </div>
            <div
              className="card card-roomy"
              style={{ background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)', border: '1px solid #A7F3D0' }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: '#065F46' }}>Selisih</p>
              <p className="money-sm" style={{ color: '#065F46' }}>
                {formatRupiah(summary.monthOmzet - summary.monthExpenseTotal)}
              </p>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <p className="section-heading mb-3">Mau catat apa hari ini?</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 grid-roomy">
            <Link
              href="/catat/penjualan"
              className="rounded-2xl p-4 flex flex-col gap-3 transition-all active:scale-95 tap-highlight-none"
              style={{
                background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
                border: '1.5px solid #C4B5FD',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(124,58,237,0.15)' }}
              >
                <ShoppingBag size={20} strokeWidth={2} color="#7C3AED" />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: '#1A1714' }}>Penjualan</p>
                <p className="text-xs mt-0.5" style={{ color: '#4A4540' }}>Catat tahu terjual</p>
              </div>
            </Link>

            <Link
              href="/catat/pengeluaran"
              className="rounded-2xl p-4 flex flex-col gap-3 transition-all active:scale-95 tap-highlight-none"
              style={{ background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)', border: '1.5px solid #FDE68A' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(245,158,11,0.15)' }}
              >
                <Receipt size={20} strokeWidth={2} color="#F59E0B" />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: '#1C1917' }}>Pengeluaran</p>
                <p className="text-xs mt-0.5" style={{ color: '#44403C' }}>Catat biaya keluar</p>
              </div>
            </Link>

            <Link
              href="/piutang"
              className="card rounded-2xl p-4 flex flex-col gap-3 transition-all active:scale-95 tap-highlight-none hidden lg:flex"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#FFFBEB' }}
              >
                <CircleDollarSign size={20} strokeWidth={2} color="#D97706" />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: '#1A1714' }}>Tagihan</p>
                <p className="text-xs mt-0.5" style={{ color: '#4A4540' }}>Lihat piutang</p>
              </div>
            </Link>

            <Link
              href="/pengaturan"
              className="card rounded-2xl p-4 flex flex-col gap-3 transition-all active:scale-95 tap-highlight-none hidden lg:flex"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#F5F4F0' }}
              >
                <Sparkles size={20} strokeWidth={2} color="#4A4540" />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: '#1A1714' }}>Pengaturan</p>
                <p className="text-xs mt-0.5" style={{ color: '#4A4540' }}>Profil usaha</p>
              </div>
            </Link>
          </div>
        </div>

        {/* View receivables CTA if any */}
        {summary.unpaidCount > 0 && (
          <Link
            href="/piutang"
            className="flex items-center justify-between p-4 rounded-2xl transition-all active:scale-98 tap-highlight-none"
            style={{ backgroundColor: '#F5F4F0', border: '1px solid #E8E5DF' }}
          >
            <span className="text-sm font-semibold" style={{ color: '#4A4540' }}>
              Lihat semua tagihan
            </span>
            <ArrowUpRight size={16} strokeWidth={2} color="#9C9690" />
          </Link>
        )}

      </div>
    </AppShell>
  )
}
