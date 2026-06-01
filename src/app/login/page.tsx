'use client'

import { useActionState, useState } from 'react'
import { loginAction } from '@/server/actions'
import BrandMark from '@/components/brand-mark'
import SubmitButton from '@/components/submit-button'
import AuthShowcase from '@/components/auth-showcase'
import { Eye, EyeOff, Mail, Lock, TrendingUp, ShieldCheck, Smartphone } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, {})
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10 relative overflow-hidden gradient-mesh">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left: Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0 slide-up-1">
          {/* Brand */}
          <div className="flex items-center gap-2.5 mb-8">
            <BrandMark size="md" />
            <span className="font-bold text-lg" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Buku Tahu
            </span>
          </div>

          <h1
            className="font-extrabold mb-2"
            style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', letterSpacing: '-0.03em', lineHeight: 1.15 }}
          >
            Selamat datang kembali
          </h1>
          <p className="text-base mb-8" style={{ color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
            Masuk untuk lihat kondisi usaha kamu hari ini.
          </p>

          <form action={formAction} className="space-y-4 slide-up-2">
            {state?.error && (
              <div role="alert" className="rounded-xl p-3.5" style={{ backgroundColor: 'var(--loss-bg)', border: '1px solid var(--loss-border)' }}>
                <p className="text-sm font-medium" style={{ color: 'var(--loss-text)' }}>{state.error}</p>
              </div>
            )}

            <div>
              <label className="field-label" htmlFor="login-email">Email</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Mail size={16} strokeWidth={2} color="var(--text-muted)" />
                </div>
                <input id="login-email" name="email" type="email" required autoComplete="email" className="input-field" placeholder="nama@email.com" style={{ paddingLeft: '2.75rem' }} />
              </div>
            </div>

            <div>
              <label className="field-label" htmlFor="login-password">Password</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Lock size={16} strokeWidth={2} color="var(--text-muted)" />
                </div>
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  className="input-field"
                  placeholder="Password kamu"
                  style={{ paddingLeft: '2.75rem', paddingRight: '2.75rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 inline-flex items-center justify-center bg-transparent border-0 cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? <EyeOff size={16} strokeWidth={2} color="var(--text-muted)" /> : <Eye size={16} strokeWidth={2} color="var(--text-muted)" />}
                </button>
              </div>
            </div>

            <SubmitButton pendingLabel="Memproses..." disabled={pending} className="btn-primary w-full" style={{ marginTop: '0.5rem' }}>
              Masuk
            </SubmitButton>
          </form>

          <p className="text-sm text-center mt-6 slide-up-3" style={{ color: 'var(--text-tertiary)' }}>
            Belum punya akun?{' '}
            <Link href="/register" className="font-bold" style={{ color: 'var(--accent)' }}>Daftar gratis</Link>
          </p>

          {/* Benefits (mobile + small screens) */}
          <div className="mt-8 space-y-3 lg:hidden slide-up-4">
            {[
              { icon: TrendingUp, text: 'Pantau omzet dan laba harian otomatis' },
              { icon: ShieldCheck, text: 'Data aman, hanya kamu yang bisa akses' },
              { icon: Smartphone, text: 'Gratis selamanya, langsung dari HP' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--accent-light)' }}>
                  <Icon size={14} strokeWidth={2.25} color="var(--accent)" />
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Animated product glimpse (desktop) */}
        <div className="hidden lg:flex justify-center slide-up-3">
          <AuthShowcase
            eyebrow="Buku kas digital"
            headline="Lihat untung-rugi usaha kamu tiap hari."
            sub="Catat penjualan dan pengeluaran, laba harian dihitung otomatis. Tanpa rumus, tanpa ribet."
          />
        </div>
      </div>
    </div>
  )
}
