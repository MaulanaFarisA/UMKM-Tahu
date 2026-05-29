'use client'

import { useActionState, useState } from 'react'
import { loginAction } from '@/server/actions'
import BrandMark from '@/components/brand-mark'
import SubmitButton from '@/components/submit-button'
import {
  ReceiptText,
  Eye,
  EyeOff,
  Mail,
  Lock,
  TrendingUp,
  ShieldCheck,
  Smartphone,
  ShoppingBag,
  ArrowUp,
  ArrowDownRight,
} from 'lucide-react'
import Link from 'next/link'

function DashboardMockup() {
  return (
    <div
      className="rounded-2xl overflow-hidden w-full max-w-sm"
      style={{
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-xl)',
        background: 'var(--bg)',
      }}
    >
      {/* Mini app header */}
      <div
        className="px-4 py-3 flex items-center gap-2"
        style={{
          background: 'var(--bg-white)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center"
          style={{
            background: 'var(--accent-gradient)',
            boxShadow: 'var(--shadow-accent-sm)',
          }}
        >
          <ReceiptText size={11} strokeWidth={2.5} color="white" />
        </div>
        <span
          className="text-xs font-bold"
          style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
        >
          Buku Tahu
        </span>
        <div className="ml-auto flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--border-strong)' }}
            />
          ))}
        </div>
      </div>

      <div className="p-3.5 space-y-3">
        {/* Greeting + status chip — echoes beranda header */}
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p
              className="font-bold truncate"
              style={{
                color: 'var(--text-primary)',
                letterSpacing: '-0.015em',
                fontSize: '0.7rem',
              }}
            >
              Hari ini usaha kamu...
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>
              Senin, 25 Mei 2026
            </p>
          </div>
          <span
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full font-bold uppercase flex-shrink-0"
            style={{
              backgroundColor: 'var(--profit-bg)',
              color: 'var(--profit-text)',
              border: '1px solid var(--profit-border)',
              letterSpacing: '0.05em',
              fontSize: '0.55rem',
            }}
          >
            <span
              className="w-1 h-1 rounded-full"
              style={{ background: 'var(--profit)' }}
            />
            Untung
          </span>
        </div>

        {/* Hero verdict card — mirrors beranda profit verdict */}
        <div
          className="rounded-xl p-3.5 relative overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, var(--bg-white) 0%, #F0FDF4 55%, var(--profit-bg-deep) 100%)',
            border: '1.5px solid var(--profit-border)',
            boxShadow:
              '0 0 0 1px rgba(4,120,87,0.10), 0 8px 20px rgba(4,120,87,0.10)',
          }}
        >
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0"
            style={{
              height: '2px',
              background:
                'linear-gradient(90deg, #10B981 0%, var(--profit) 50%, #047857 100%)',
              opacity: 0.85,
            }}
          />
          <p
            className="font-semibold mb-1"
            style={{
              color: 'var(--profit)',
              opacity: 0.78,
              fontSize: '0.65rem',
            }}
          >
            Untung hari ini
          </p>
          <p
            className="font-black"
            style={{
              color: 'var(--profit)',
              fontSize: '1.5rem',
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            Rp 302.556
          </p>
          <div
            className="flex items-center gap-3 mt-2.5 pt-2.5 flex-wrap"
            style={{ borderTop: '1px dashed var(--profit-border)' }}
          >
            <div className="flex items-center gap-1">
              <span
                className="w-1 h-1 rounded-full"
                style={{ background: 'var(--profit)' }}
              />
              <span
                className="font-semibold"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '0.65rem',
                }}
              >
                Masuk Rp 1,01jt
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span
                className="w-1 h-1 rounded-full"
                style={{ background: 'var(--text-muted)' }}
              />
              <span
                className="font-semibold"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '0.65rem',
                }}
              >
                Keluar Rp 711rb
              </span>
            </div>
          </div>
        </div>

        {/* Today stats row — mini metric cards (left accent border) */}
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              label: 'Uang Masuk',
              value: 'Rp 1,01jt',
              accent: 'var(--profit)',
              valueColor: 'var(--profit)',
              bg: 'linear-gradient(135deg, var(--bg-white) 0%, var(--profit-bg) 100%)',
            },
            {
              label: 'Uang Keluar',
              value: 'Rp 711rb',
              accent: 'var(--loss)',
              valueColor: 'var(--loss)',
              bg: 'linear-gradient(135deg, var(--bg-white) 0%, var(--loss-bg) 100%)',
            },
            {
              label: 'Belum Dibayar',
              value: 'Rp 180rb',
              accent: 'var(--warn)',
              valueColor: '#D97706',
              bg: 'linear-gradient(135deg, var(--bg-white) 0%, var(--warn-bg) 100%)',
            },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg p-2 min-w-0"
              style={{
                background: s.bg,
                border: '1px solid var(--border)',
                borderLeft: `3px solid ${s.accent}`,
              }}
            >
              <p
                className="font-bold uppercase mb-0.5 truncate"
                style={{
                  color: 'var(--text-tertiary)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.06em',
                }}
              >
                {s.label}
              </p>
              <p
                className="font-bold truncate"
                style={{
                  color: s.valueColor,
                  fontSize: '0.7rem',
                  letterSpacing: '-0.02em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Quick action CTAs — mirrors beranda profit/warn pair */}
        <div className="grid grid-cols-2 gap-2">
          <div
            className="rounded-xl p-2.5"
            style={{
              background:
                'linear-gradient(135deg, var(--profit-bg) 0%, var(--profit-bg-deep) 100%)',
              border: '1px solid var(--profit-border)',
              boxShadow: '0 2px 6px rgba(4,120,87,0.08)',
            }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{
                  background: 'var(--bg-white)',
                  boxShadow: '0 1px 3px rgba(4,120,87,0.18)',
                }}
              >
                <ShoppingBag size={11} strokeWidth={2.2} color="#047857" />
              </div>
              <ArrowUp size={10} strokeWidth={2.5} color="var(--profit)" />
            </div>
            <p
              className="font-bold"
              style={{
                color: 'var(--profit-text)',
                fontSize: '0.65rem',
                letterSpacing: '-0.01em',
              }}
            >
              Catat Penjualan
            </p>
          </div>
          <div
            className="rounded-xl p-2.5"
            style={{
              background:
                'linear-gradient(135deg, var(--warn-bg) 0%, var(--warn-bg-deep) 100%)',
              border: '1px solid var(--warn-border)',
              boxShadow: '0 2px 6px rgba(245,158,11,0.08)',
            }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{
                  background: 'var(--bg-white)',
                  boxShadow: '0 1px 3px rgba(245,158,11,0.20)',
                }}
              >
                <ReceiptText size={11} strokeWidth={2.2} color="#D97706" />
              </div>
              <ArrowDownRight size={10} strokeWidth={2.5} color="#D97706" />
            </div>
            <p
              className="font-bold"
              style={{
                color: 'var(--warn-text)',
                fontSize: '0.65rem',
                letterSpacing: '-0.01em',
              }}
            >
              Catat Pengeluaran
            </p>
          </div>
        </div>
      </div>

      {/* Floating tagline */}
      <div
        className="mx-3.5 mb-3.5 rounded-xl px-3 py-2 flex items-center gap-2"
        style={{ background: 'var(--accent-gradient)' }}
      >
        <ShieldCheck size={11} strokeWidth={2.5} color="white" />
        <p className="text-[10px] font-bold text-white">
          Gratis selamanya untuk UMKM
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, {})
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5 py-8 relative overflow-hidden dot-pattern"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Left: Form */}
      <div
        className="w-full max-w-lg mx-auto rounded-[2rem] p-5 sm:p-7 lg:p-8 slide-up-1"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.94) 0%, rgba(255,253,247,0.88) 100%)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-xl)',
          backdropFilter: 'blur(18px) saturate(1.15)',
          WebkitBackdropFilter: 'blur(18px) saturate(1.15)',
        }}
      >
        {/* Brand */}
        <div className="mb-7 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <BrandMark size="md" />
            <span
              className="font-bold text-lg"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
            >
              Buku Tahu
            </span>
          </div>
          <h1
            className="font-black mb-2"
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
            }}
          >
            Buku kas tahu<br />yang rapi dan jelas.
          </h1>
          <p
            className="text-base mx-auto max-w-sm"
            style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}
          >
            Catat penjualan, pengeluaran, dan tagihan harian.<br />
            Lihat kondisi usaha tanpa hitung manual.
          </p>
        </div>

        {/* Form */}
        <form action={formAction} className="space-y-4 mb-5 slide-up-2">
          {state?.error && (
            <div
              role="alert"
              className="rounded-xl p-3.5"
              style={{
                backgroundColor: 'var(--loss-bg)',
                border: '1px solid var(--loss-border)',
              }}
            >
              <p
                className="text-sm font-medium"
                style={{ color: 'var(--loss-text)' }}
              >
                {state.error}
              </p>
            </div>
          )}
          <div>
            <label className="field-label" htmlFor="login-email">Email</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Mail size={16} strokeWidth={2} color="var(--text-muted)" />
              </div>
              <input
                id="login-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="input-field"
                placeholder="nama@email.com"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>
          <div>
            <label className="field-label" htmlFor="login-password">Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Lock size={16} strokeWidth={2} color="var(--text-muted)" />
              </div>
              <input
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                className="input-field"
                placeholder="••••••••"
                style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 inline-flex items-center justify-center p-0 bg-transparent border-0"
                tabIndex={-1}
                aria-label={
                  showPassword
                    ? 'Sembunyikan password'
                    : 'Tampilkan password'
                }
              >
                {showPassword ? (
                  <EyeOff size={16} strokeWidth={2} color="var(--text-muted)" />
                ) : (
                  <Eye size={16} strokeWidth={2} color="var(--text-muted)" />
                )}
              </button>
            </div>
          </div>
          <SubmitButton
            pendingLabel="Membuka buku kas..."
            disabled={pending}
            className="btn-primary"
            style={{ marginTop: '0.25rem' }}
          >
            Masuk ke akun
          </SubmitButton>
        </form>

        <p
          className="text-sm mb-6 slide-up-3 text-center"
          style={{ color: 'var(--text-secondary)' }}
        >
          Belum punya akun?{' '}
          <Link
            href="/register"
            className="font-bold"
            style={{ color: 'var(--accent)' }}
          >
            Daftar gratis →
          </Link>
        </p>

        {/* Benefits */}
        <div className="grid gap-2.5 slide-up-4">
          {[
            { icon: TrendingUp, text: 'Pantau omzet dan laba harian secara otomatis' },
            { icon: ShieldCheck, text: 'Data aman, hanya kamu yang bisa akses' },
            { icon: Smartphone, text: 'Gratis, tidak perlu install, langsung dari HP' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 rounded-2xl p-3" style={{ background: 'var(--bg-white)', border: '1px solid var(--border)' }}>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--accent-light)' }}
              >
                <Icon size={13} strokeWidth={2} color="var(--accent)" />
              </div>
              <p
                className="text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Dashboard mockup (desktop only) */}
      <div
        className="hidden"
        style={{
          backgroundColor: 'var(--bg)',
          borderLeft: '1px solid var(--border)',
        }}
      >
        <div
          className="w-full max-w-sm relative slide-up-2"
          style={{ filter: 'drop-shadow(0 24px 48px rgba(28,25,23,0.14))' }}
        >
          <DashboardMockup />
        </div>
      </div>
    </div>
  )
}
