import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import BrandMark from '@/components/brand-mark'
import {
  ReceiptText,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Wallet,
  Smartphone,
  ShieldCheck,
  Sparkles,
  Check,
  NotebookPen,
  Calculator,
  CalendarClock,
  Banknote,
  Users,
  AlertCircle,
  PencilLine,
  ChevronRight,
  HeartHandshake,
} from 'lucide-react'

export default async function HomePage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/beranda')
  }

  return (
    <main
      className="min-h-screen w-full dot-pattern"
      style={{
        background: 'var(--bg)',
      }}
    >
      {/* ── Top nav ────────────────────────────────────────────────────── */}
      <header
        className="app-container app-container-wide"
        style={{ paddingTop: '1.5rem', paddingBottom: '0.5rem' }}
      >
        <nav className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <BrandMark size="sm" />
            <div className="flex flex-col leading-tight min-w-0">
              <span
                className="truncate"
                style={{
                  color: 'var(--text-primary)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  fontSize: '0.9375rem',
                }}
              >
                Buku Tahu
              </span>
              <span
                className="truncate"
                style={{
                  color: 'var(--text-tertiary)',
                  fontWeight: 600,
                  fontSize: '0.6875rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                Dapur kas harian
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold tap-highlight-none"
              style={{
                color: 'var(--text-secondary)',
                padding: '0.5rem 0.875rem',
                borderRadius: 'var(--radius-md)',
              }}
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 text-sm font-bold tap-highlight-none"
              style={{
                background: 'var(--accent-gradient)',
                color: 'white',
                padding: '0.625rem 1.125rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-accent-sm)',
                letterSpacing: '-0.012em',
                textDecoration: 'none',
              }}
            >
              Daftar Gratis
              <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
          </div>
        </nav>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        className="app-container app-container-wide"
        style={{ paddingTop: '1.25rem', paddingBottom: '3rem' }}
      >
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center">
          <div className="slide-up-1 min-w-0">
            <span
              className="inline-flex items-center gap-1.5"
              style={{
                background: 'var(--warn-bg)',
                color: 'var(--warn-text)',
                border: '1px solid var(--warn-border)',
                padding: '0.3125rem 0.6875rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              <Sparkles size={11} strokeWidth={2.5} />
              Buat UMKM Tahu Indonesia
            </span>
            <h1
              className="mt-3.5"
              style={{
                color: 'var(--text-primary)',
                fontSize: 'clamp(1.875rem, 6vw, 3.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
              }}
            >
              Catat tahu hari ini,
              <br />
              <span style={{ color: 'var(--accent)' }}>tahu untung</span>{' '}
              <span style={{ color: 'var(--text-primary)' }}>besok pagi.</span>
            </h1>
            <p
              className="mt-4 max-w-xl"
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                lineHeight: 1.55,
                letterSpacing: '-0.005em',
              }}
            >
              Pembukuan sederhana buat usaha tahu kamu. Catat penjualan, pengeluaran,
              dan tagihan langganan langsung dari HP, tanpa perlu paham akuntansi.
            </p>

            <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
              <Link
                href="/register"
                className="btn-primary tap-highlight-none"
                style={{ width: 'auto', padding: '0.95rem 1.625rem', minHeight: '52px' }}
              >
                Mulai Gratis Sekarang
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
              <Link
                href="/login"
                className="btn-secondary tap-highlight-none"
                style={{ width: 'auto', padding: '0.95rem 1.625rem', minHeight: '52px' }}
              >
                Sudah punya akun? Masuk
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              {[
                { icon: ShieldCheck, label: 'Data aman tersimpan online' },
                { icon: Smartphone, label: 'Pas di HP, pas di tangan' },
                { icon: Check, label: 'Bahasa Indonesia sehari-hari' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <item.icon size={13} strokeWidth={2.5} style={{ color: 'var(--profit)' }} />
                  <span
                    style={{
                      color: 'var(--text-tertiary)',
                      fontSize: '0.78125rem',
                      fontWeight: 600,
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual: today's struk preview */}
          <div className="slide-up-2 relative min-w-0">
            <div
              className="ledger-receipt relative rounded-3xl overflow-hidden"
              style={{
                background: 'var(--ledger-paper-bright)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-xl)',
                transform: 'rotate(-1deg)',
              }}
            >
              {/* Mini header */}
              <div
                className="px-5 py-3.5 flex items-center justify-between"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent-gradient)' }}
                  >
                    <ReceiptText size={11} strokeWidth={2.5} color="white" />
                  </div>
                  <span
                    className="truncate"
                    style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.8125rem' }}
                  >
                    Hari ini - Senin
                  </span>
                </div>
                <span
                  className="flex-shrink-0"
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--profit)',
                    background: 'var(--profit-bg)',
                    border: '1px solid var(--profit-border)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  Hari Untung
                </span>
              </div>

              <div className="p-5 space-y-4">
                {/* Verdict */}
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--profit-bg) 0%, var(--profit-bg-deep) 100%)',
                    border: '1px solid var(--profit-border)',
                  }}
                >
                  <p
                    style={{
                      color: 'var(--profit-text)',
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      letterSpacing: '0.09em',
                      textTransform: 'uppercase',
                      marginBottom: '0.375rem',
                    }}
                  >
                    Untung Hari Ini
                  </p>
                  <p className="money-lg" style={{ color: 'var(--profit-text)' }}>
                    Rp 302.556
                  </p>
                  <p
                    style={{
                      color: 'var(--profit)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      marginTop: '0.25rem',
                    }}
                  >
                    Margin 30% - 169 bungkus laku
                  </p>
                </div>

                {/* Stat row */}
                <div className="grid grid-cols-3 gap-2">
                  <div
                    className="rounded-xl p-2.5"
                    style={{ background: 'var(--profit-bg)', border: '1px solid var(--profit-border)' }}
                  >
                    <TrendingUp size={12} strokeWidth={2.5} style={{ color: 'var(--profit)', marginBottom: '0.25rem' }} />
                    <p
                      style={{
                        color: 'var(--text-tertiary)',
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Masuk
                    </p>
                    <p style={{ color: 'var(--profit)', fontSize: '0.75rem', fontWeight: 700, marginTop: '0.125rem' }}>
                      Rp 1,01 jt
                    </p>
                  </div>
                  <div
                    className="rounded-xl p-2.5"
                    style={{ background: 'var(--loss-bg)', border: '1px solid var(--loss-border)' }}
                  >
                    <TrendingDown size={12} strokeWidth={2.5} style={{ color: 'var(--loss)', marginBottom: '0.25rem' }} />
                    <p
                      style={{
                        color: 'var(--text-tertiary)',
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Keluar
                    </p>
                    <p style={{ color: 'var(--loss)', fontSize: '0.75rem', fontWeight: 700, marginTop: '0.125rem' }}>
                      Rp 711 rb
                    </p>
                  </div>
                  <div
                    className="rounded-xl p-2.5"
                    style={{ background: 'var(--warn-bg)', border: '1px solid var(--warn-border)' }}
                  >
                    <Wallet size={12} strokeWidth={2.5} style={{ color: 'var(--warn)', marginBottom: '0.25rem' }} />
                    <p
                      style={{
                        color: 'var(--text-tertiary)',
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Tagihan
                    </p>
                    <p style={{ color: 'var(--warn)', fontSize: '0.75rem', fontWeight: 700, marginTop: '0.125rem' }}>
                      Rp 180 rb
                    </p>
                  </div>
                </div>

                {/* Mini transaction list */}
                <div className="space-y-1.5">
                  <div
                    className="flex items-center justify-between py-2 px-2.5 rounded-lg"
                    style={{ background: 'var(--bg-subtle)' }}
                  >
                    <div className="min-w-0 flex-1">
                      <p
                        style={{ color: 'var(--text-primary)', fontSize: '0.8125rem', fontWeight: 700 }}
                        className="truncate"
                      >
                        Warung Bu Sari
                      </p>
                      <p style={{ color: 'var(--text-tertiary)', fontSize: '0.6875rem' }}>10 bungkus</p>
                    </div>
                    <span
                      style={{
                        color: 'var(--profit)',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      +Rp 60.000
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 px-2.5 rounded-lg">
                    <div className="min-w-0 flex-1">
                      <p
                        style={{ color: 'var(--text-primary)', fontSize: '0.8125rem', fontWeight: 700 }}
                        className="truncate"
                      >
                        Kedelai - 50 kg
                      </p>
                      <p style={{ color: 'var(--text-tertiary)', fontSize: '0.6875rem' }}>Bahan baku</p>
                    </div>
                    <span
                      style={{
                        color: 'var(--loss)',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      -Rp 545.000
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-between py-2 px-2.5 rounded-lg"
                    style={{ background: 'var(--bg-subtle)' }}
                  >
                    <div className="min-w-0 flex-1">
                      <p
                        style={{ color: 'var(--text-primary)', fontSize: '0.8125rem', fontWeight: 700 }}
                        className="truncate"
                      >
                        Warung Pak Budi
                      </p>
                      <p style={{ color: 'var(--text-tertiary)', fontSize: '0.6875rem' }}>8 bungkus - sebagian</p>
                    </div>
                    <span
                      style={{
                        color: 'var(--warn)',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      +Rp 30.000
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── Problem section ────────────────────────────────────────────── */}
      <section
        className="app-container app-container-wide"
        style={{ paddingTop: '3rem', paddingBottom: '3rem' }}
      >
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span
            className="inline-flex items-center gap-1.5 mb-4"
            style={{
              background: 'var(--loss-bg)',
              color: 'var(--loss-text)',
              border: '1px solid var(--loss-border)',
              padding: '0.375rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <AlertCircle size={12} strokeWidth={2.5} />
            Masalah yang sering kejadian
          </span>
          <h2
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1.15,
            }}
          >
            Pernah ngalamin ini di usaha tahu kamu?
          </h2>
          <p
            className="mt-3 max-w-xl mx-auto"
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              lineHeight: 1.6,
            }}
          >
            Pencatatan manual itu sering bocor di mana-mana. Akhirnya susah ngitung untung yang sebenarnya.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          <div
            className="card card-roomy"
            style={{ borderLeft: '3px solid var(--loss)' }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'var(--loss-bg)', border: '1px solid var(--loss-border)' }}
            >
              <PencilLine size={18} strokeWidth={2.5} style={{ color: 'var(--loss)' }} />
            </div>
            <h3
              style={{
                color: 'var(--text-primary)',
                fontSize: '1.0625rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                marginBottom: '0.5rem',
              }}
            >
              Catatan kertas hilang atau sobek
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.55 }}>
              Buku catatan ketinggalan, basah, atau coretan susah dibaca. Akhir bulan baru sadar
              ada transaksi yang nggak ke-input.
            </p>
          </div>
          <div
            className="card card-roomy"
            style={{ borderLeft: '3px solid var(--warn)' }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'var(--warn-bg)', border: '1px solid var(--warn-border)' }}
            >
              <Users size={18} strokeWidth={2.5} style={{ color: 'var(--warn)' }} />
            </div>
            <h3
              style={{
                color: 'var(--text-primary)',
                fontSize: '1.0625rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                marginBottom: '0.5rem',
              }}
            >
              Lupa siapa yang belum bayar
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.55 }}>
              Warung A bayar setengah, warung B nyicil, warung C lupa nyetor. Susah inget siapa
              yang masih punya tagihan dan berapa.
            </p>
          </div>
          <div
            className="card card-roomy"
            style={{ borderLeft: '3px solid var(--accent)' }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'var(--accent-light)', border: '1px solid var(--border-accent)' }}
            >
              <Calculator size={18} strokeWidth={2.5} style={{ color: 'var(--accent)' }} />
            </div>
            <h3
              style={{
                color: 'var(--text-primary)',
                fontSize: '1.0625rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                marginBottom: '0.5rem',
              }}
            >
              Nggak tahu untung beneran berapa
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.55 }}>
              Uang masuk kelihatan banyak, tapi setelah dipotong kedelai, kayu bakar, listrik,
              ternyata sisanya cuma sedikit. Atau malah rugi.
            </p>
          </div>
        </div>
      </section>


      {/* ── How it works ───────────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(180deg, transparent 0%, var(--bg-subtle) 50%, transparent 100%)',
          paddingTop: '3.5rem',
          paddingBottom: '3.5rem',
        }}
      >
        <div className="app-container app-container-wide">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span
              className="inline-flex items-center gap-1.5 mb-4"
              style={{
                background: 'var(--accent-light)',
                color: 'var(--accent-deep)',
                border: '1px solid var(--border-accent)',
                padding: '0.375rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              <Sparkles size={12} strokeWidth={2.5} />
              Cara pakainya gampang
            </span>
            <h2
              style={{
                color: 'var(--text-primary)',
                fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                fontWeight: 800,
                letterSpacing: '-0.035em',
                lineHeight: 1.15,
              }}
            >
              Tiga langkah, bukan tiga jam
            </h2>
            <p
              className="mt-3 max-w-xl mx-auto"
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                lineHeight: 1.6,
              }}
            >
              Cukup catat penjualan dan pengeluaran tiap hari. Sisanya kami yang hitung.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-6 relative">
            {/* Step 1 */}
            <div className="relative">
              <div
                className="card card-roomy h-full"
                style={{ borderTop: '3px solid var(--accent)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'var(--accent-gradient)',
                      boxShadow: 'var(--shadow-accent-sm)',
                    }}
                  >
                    <NotebookPen size={20} strokeWidth={2.5} color="white" />
                  </div>
                  <span
                    style={{
                      color: 'var(--accent)',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Langkah 1
                  </span>
                </div>
                <h3
                  style={{
                    color: 'var(--text-primary)',
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    marginBottom: '0.5rem',
                  }}
                >
                  Catat Penjualan
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.55 }}>
                  Setiap kali ada warung beli tahu, masukin nama, jumlah bungkus, dan berapa yang
                  dibayar. Kalau nyicil, sisanya otomatis jadi tagihan.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div
                className="card card-roomy h-full"
                style={{ borderTop: '3px solid var(--warn)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%)',
                      boxShadow: '0 4px 12px rgba(245,158,11,0.28)',
                    }}
                  >
                    <Banknote size={20} strokeWidth={2.5} color="white" />
                  </div>
                  <span
                    style={{
                      color: 'var(--warn-text)',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Langkah 2
                  </span>
                </div>
                <h3
                  style={{
                    color: 'var(--text-primary)',
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    marginBottom: '0.5rem',
                  }}
                >
                  Catat Pengeluaran
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.55 }}>
                  Beli kedelai, kayu bakar, plastik, atau bayar listrik? Catat di sini. Pilih
                  kategori, isi harganya, selesai.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div
                className="card card-roomy h-full"
                style={{ borderTop: '3px solid var(--profit)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)',
                      boxShadow: '0 4px 12px rgba(4,120,87,0.28)',
                    }}
                  >
                    <CalendarClock size={20} strokeWidth={2.5} color="white" />
                  </div>
                  <span
                    style={{
                      color: 'var(--profit-text)',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Langkah 3
                  </span>
                </div>
                <h3
                  style={{
                    color: 'var(--text-primary)',
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    marginBottom: '0.5rem',
                  }}
                >
                  Lihat Untung Hari Ini
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.55 }}>
                  Buka beranda, langsung kelihatan: hari ini untung berapa, bulan ini omzet berapa,
                  siapa yang masih punya tagihan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── Benefits ───────────────────────────────────────────────────── */}
      <section
        className="app-container app-container-wide"
        style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}
      >
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span
            className="inline-flex items-center gap-1.5 mb-4"
            style={{
              background: 'var(--profit-bg)',
              color: 'var(--profit-text)',
              border: '1px solid var(--profit-border)',
              padding: '0.375rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <HeartHandshake size={12} strokeWidth={2.5} />
            Yang kamu dapat
          </span>
          <h2
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1.15,
            }}
          >
            Lebih dari sekadar buku catatan
          </h2>
          <p
            className="mt-3 max-w-xl mx-auto"
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              lineHeight: 1.6,
            }}
          >
            Aplikasi yang ngerti cara kerja UMKM tahu, bukan istilah akuntansi yang ribet.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5 max-w-4xl mx-auto">
          <div className="flex items-start gap-3 card card-roomy">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--profit-bg)', border: '1px solid var(--profit-border)' }}
            >
              <Check size={16} strokeWidth={3} style={{ color: 'var(--profit)' }} />
            </div>
            <div className="min-w-0">
              <h3
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  letterSpacing: '-0.015em',
                  marginBottom: '0.25rem',
                }}
              >
                Untung-rugi langsung kelihatan
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.55 }}>
                Tiap kali catat, beranda otomatis update. Nggak perlu nunggu akhir bulan buat
                tahu hasilnya.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 card card-roomy">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--profit-bg)', border: '1px solid var(--profit-border)' }}
            >
              <Check size={16} strokeWidth={3} style={{ color: 'var(--profit)' }} />
            </div>
            <div className="min-w-0">
              <h3
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  letterSpacing: '-0.015em',
                  marginBottom: '0.25rem',
                }}
              >
                Tagihan warung nggak ada yang lolos
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.55 }}>
                Setiap warung yang nyicil atau belum bayar muncul di daftar tagihan.
                Catat pelunasan tinggal tap.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 card card-roomy">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--profit-bg)', border: '1px solid var(--profit-border)' }}
            >
              <Check size={16} strokeWidth={3} style={{ color: 'var(--profit)' }} />
            </div>
            <div className="min-w-0">
              <h3
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  letterSpacing: '-0.015em',
                  marginBottom: '0.25rem',
                }}
              >
                Bahasa yang biasa kamu pakai
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.55 }}>
                Uang Masuk, Uang Keluar, Belum Dibayar. Nggak ada istilah HPP, debit, kredit
                yang bikin pusing.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 card card-roomy">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--profit-bg)', border: '1px solid var(--profit-border)' }}
            >
              <Check size={16} strokeWidth={3} style={{ color: 'var(--profit)' }} />
            </div>
            <div className="min-w-0">
              <h3
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  letterSpacing: '-0.015em',
                  marginBottom: '0.25rem',
                }}
              >
                Cocok dipakai dari HP
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.55 }}>
                Catat sambil ngebungkus tahu, sambil ngantar ke warung. Pas di tangan, tombolnya
                gede-gede biar gampang.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ── Final CTA ──────────────────────────────────────────────────── */}
      <section
        className="app-container app-container-wide"
        style={{ paddingTop: '2rem', paddingBottom: '4rem' }}
      >
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: 'var(--accent-gradient)',
            boxShadow: 'var(--shadow-accent-lg)',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
          }}
        >
          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <h2
                style={{
                  color: '#FFFFFF',
                  fontSize: 'clamp(1.625rem, 4.5vw, 2.5rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.035em',
                  lineHeight: 1.1,
                }}
              >
                Mulai catat hari ini, lebih tenang besok pagi.
              </h2>
              <p
                className="mt-4 max-w-xl"
                style={{
                  color: 'rgba(255,255,255,0.88)',
                  fontSize: '1.0625rem',
                  lineHeight: 1.6,
                }}
              >
                Daftar gratis sekarang. Nggak perlu kartu kredit, nggak ada uji coba terbatas.
                Tinggal isi nama dan email, langsung bisa pakai dari HP.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 tap-highlight-none"
                style={{
                  background: '#FFFFFF',
                  color: 'var(--accent-deep)',
                  padding: '1.125rem 1.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  letterSpacing: '-0.015em',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  minHeight: '56px',
                }}
              >
                Daftar Gratis
                <ArrowRight size={18} strokeWidth={2.75} />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 tap-highlight-none"
                style={{
                  background: 'transparent',
                  color: '#FFFFFF',
                  border: '1.5px solid rgba(255,255,255,0.4)',
                  padding: '1rem 1.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  minHeight: '52px',
                }}
              >
                Sudah punya akun? Masuk
                <ChevronRight size={16} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer
        className="app-container app-container-wide"
        style={{ paddingTop: '1.5rem', paddingBottom: '2.5rem' }}
      >
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderTop: '1px solid var(--border-soft)', paddingTop: '1.5rem' }}
        >
          <div className="flex items-center gap-2.5">
            <BrandMark size="sm" />
            <span
              style={{
                color: 'var(--text-tertiary)',
                fontSize: '0.8125rem',
                fontWeight: 600,
              }}
            >
              Buku Tahu - Dapur kas harian UMKM lokal
            </span>
          </div>
          <span
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          >
            Dibuat dengan hati buat usaha tahu lokal
          </span>
        </div>
      </footer>
    </main>
  )
}
