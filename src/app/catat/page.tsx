import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import AppShell from '@/components/app-shell'
import Link from 'next/link'
import { TrendingUp, TrendingDown, ArrowRight, Sparkles, ReceiptText } from 'lucide-react'

export default async function CatatPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <AppShell active="catat" title="Catat" width="default">
      <div className="page-stack">

        {/* Header */}
        <div className="pt-1 slide-up-1">
          <div
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 mb-2"
            style={{ backgroundColor: 'var(--accent-light)', border: '1px solid var(--border-accent)' }}
          >
            <ReceiptText size={12} strokeWidth={2.4} color="var(--accent)" />
            <span className="text-[11px] font-bold" style={{ color: 'var(--accent-deep)' }}>
              Struk hidup
            </span>
          </div>
          <p className="page-title">Mau catat apa hari ini?</p>
          <p className="page-subtitle mt-1.5" style={{ maxWidth: '36rem' }}>
            Pilih salah satu di bawah. Catat segera supaya angka di Beranda selalu pas.
          </p>
        </div>

        {/* Action cards */}
        <div className="grid gap-4 md:grid-cols-2 slide-up-2">

          {/* Penjualan — bold profit card */}
          <Link
            href="/catat/penjualan"
            className="group ledger-receipt relative overflow-hidden rounded-2xl p-6 transition-all duration-300 tap-highlight-none focus:outline-none"
            style={{
              background: 'linear-gradient(135deg, var(--bg-white) 0%, var(--profit-bg) 100%)',
              border: '1px solid var(--profit-border)',
              boxShadow: 'var(--shadow-md)',
              minHeight: '11rem',
            }}
          >
            {/* Decorative dot grid */}
            <div
              aria-hidden
              className="absolute bottom-3 right-3 w-20 h-20 opacity-30 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(4,120,87,0.4) 1px, transparent 1px)',
                backgroundSize: '12px 12px',
              }}
            />
            <div className="relative flex flex-col h-full">
              <div className="flex items-start justify-between gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
                  style={{
                    background: 'var(--bg-white)',
                    boxShadow: '0 4px 12px rgba(4,120,87,0.18)',
                  }}
                >
                  <TrendingUp size={22} strokeWidth={2.5} color="var(--profit)" />
                </div>
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: 'var(--bg-white)',
                    color: 'var(--profit-text)',
                    border: '1px solid var(--profit-border)',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--profit)' }}
                  />
                  Uang Masuk
                </span>
              </div>
              <div className="mt-5 flex-1">
                <h2
                  className="text-lg font-extrabold leading-tight"
                  style={{ color: 'var(--profit-text)', letterSpacing: '-0.025em' }}
                >
                  Catat Penjualan
                </h2>
                <p
                  className="text-sm mt-1.5 leading-snug"
                  style={{ color: 'var(--profit-text)', opacity: 0.85 }}
                >
                  Setiap kali ada pembeli atau warung ambil tahu.
                </p>
              </div>
              <div
                className="mt-4 flex items-center gap-2 text-sm font-bold transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: 'var(--profit)' }}
              >
                Mulai catat
                <ArrowRight size={15} strokeWidth={2.6} />
              </div>
            </div>
          </Link>

          {/* Pengeluaran — bold loss card */}
          <Link
            href="/catat/pengeluaran"
            className="group ledger-receipt relative overflow-hidden rounded-2xl p-6 transition-all duration-300 tap-highlight-none focus:outline-none"
            style={{
              background: 'linear-gradient(135deg, var(--bg-white) 0%, var(--loss-bg) 100%)',
              border: '1px solid var(--loss-border)',
              boxShadow: 'var(--shadow-md)',
              minHeight: '11rem',
            }}
          >
            <div
              aria-hidden
              className="absolute bottom-3 right-3 w-20 h-20 opacity-30 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(220,38,38,0.4) 1px, transparent 1px)',
                backgroundSize: '12px 12px',
              }}
            />
            <div className="relative flex flex-col h-full">
              <div className="flex items-start justify-between gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
                  style={{
                    background: 'var(--bg-white)',
                    boxShadow: '0 4px 12px rgba(220,38,38,0.18)',
                  }}
                >
                  <TrendingDown size={22} strokeWidth={2.5} color="var(--loss)" />
                </div>
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: 'var(--bg-white)',
                    color: 'var(--loss-text)',
                    border: '1px solid var(--loss-border)',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--loss)' }}
                  />
                  Uang Keluar
                </span>
              </div>
              <div className="mt-5 flex-1">
                <h2
                  className="text-lg font-extrabold leading-tight"
                  style={{ color: 'var(--loss-text)', letterSpacing: '-0.025em' }}
                >
                  Catat Pengeluaran
                </h2>
                <p
                  className="text-sm mt-1.5 leading-snug"
                  style={{ color: 'var(--loss-text)', opacity: 0.85 }}
                >
                  Belanja kedelai, bayar pekerja, kayu bakar, listrik.
                </p>
              </div>
              <div
                className="mt-4 flex items-center gap-2 text-sm font-bold transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: 'var(--loss)' }}
              >
                Mulai catat
                <ArrowRight size={15} strokeWidth={2.6} />
              </div>
            </div>
          </Link>
        </div>

        {/* Tip */}
        <div
          className="rounded-xl p-4 flex items-start gap-3 slide-up-3"
          style={{
            background: 'var(--bg-white)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--accent-light)' }}
          >
            <Sparkles size={14} strokeWidth={2.5} color="var(--accent)" />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <p
              className="text-xs font-bold uppercase tracking-wider mb-0.5"
              style={{ color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}
            >
              Tips
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
            Catat segera setelah ada transaksi. Kalau menumpuk sampai sore, sering kelupaan satu-dua bungkus.
            </p>
          </div>
        </div>

      </div>
    </AppShell>
  )
}
