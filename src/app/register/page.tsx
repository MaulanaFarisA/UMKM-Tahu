'use client'

import { useActionState, useState } from 'react'
import { registerAction } from '@/server/actions'
import BrandMark from '@/components/brand-mark'
import SubmitButton from '@/components/submit-button'
import {
  ReceiptText,
  Eye,
  EyeOff,
  Mail,
  Lock,
  PenLine,
  Wallet,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Heart,
} from 'lucide-react'
import Link from 'next/link'

function OnboardingMockup() {
  const steps = [
    {
      num: '01',
      icon: PenLine,
      title: 'Daftar gratis',
      desc: 'Cukup email dan password',
      tone: 'accent' as const,
    },
    {
      num: '02',
      icon: Wallet,
      title: 'Catat penjualan & biaya',
      desc: 'Setiap hari, dari HP',
      tone: 'warn' as const,
    },
    {
      num: '03',
      icon: TrendingUp,
      title: 'Lihat laba otomatis',
      desc: 'Untung atau rugi, jelas',
      tone: 'profit' as const,
    },
  ]

  const tones: Record<
    'accent' | 'warn' | 'profit',
    { bg: string; border: string; text: string; iconColor: string }
  > = {
    accent: {
      bg: 'var(--accent-light)',
      border: 'var(--border-accent)',
      text: 'var(--accent-deep)',
      iconColor: 'var(--accent-deep)',
    },
    warn: {
      bg: 'var(--warn-bg-deep)',
      border: 'var(--warn-border)',
      text: 'var(--warn-text)',
      iconColor: '#D97706',
    },
    profit: {
      bg: 'var(--profit-bg-deep)',
      border: 'var(--profit-border)',
      text: 'var(--profit-text)',
      iconColor: 'var(--profit)',
    },
  }

  return (
    <div
      className="rounded-2xl overflow-hidden w-full max-w-sm"
      style={{
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-xl)',
        background: 'var(--bg)',
      }}
    >
      {/* Receipt header */}
      <div
        className="px-4 py-3 flex items-center gap-2"
        style={{
          background: 'var(--bg-white)',
          borderBottom: '1px dashed var(--border-strong)',
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
          Mulai pakai dalam 3 langkah
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

      <div className="p-4 space-y-2.5">
        {/* Greeting eyebrow — echoes login mockup */}
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
              Halo, calon pengguna baru!
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>
              Tiga langkah, lima menit selesai
            </p>
          </div>
          <span
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full font-bold uppercase flex-shrink-0"
            style={{
              backgroundColor: 'var(--accent-light)',
              color: 'var(--accent-deep)',
              border: '1px solid var(--border-accent)',
              letterSpacing: '0.05em',
              fontSize: '0.55rem',
            }}
          >
            <Sparkles size={9} strokeWidth={2.5} />
            Baru
          </span>
        </div>

        {steps.map((s, i) => {
          const t = tones[s.tone]
          const Icon = s.icon
          return (
            <div
              key={s.num}
              className="rounded-xl p-3 flex items-center gap-3"
              style={{
                background: 'var(--bg-white)',
                border: '1px solid var(--border)',
                borderLeft: `3px solid ${t.border}`,
                animation: `slideUp 0.42s var(--ease-spring) ${0.18 + i * 0.08}s both`,
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: t.bg, border: `1px solid ${t.border}` }}
              >
                <Icon size={16} strokeWidth={2} color={t.iconColor} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      fontFeatureSettings: "'tnum'",
                    }}
                  >
                    {s.num}
                  </span>
                  <p
                    className="text-xs font-bold truncate"
                    style={{
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {s.title}
                  </p>
                </div>
                <p
                  className="truncate"
                  style={{
                    color: 'var(--text-tertiary)',
                    fontSize: '0.7rem',
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          )
        })}

        {/* Estimated daily profit — mirrors verdict block from login mockup */}
        <div
          className="rounded-xl p-3 relative overflow-hidden"
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
          <div className="flex items-center justify-between">
            <p
              className="font-bold uppercase"
              style={{
                color: 'var(--profit)',
                letterSpacing: '0.08em',
                fontSize: '0.6rem',
              }}
            >
              Estimasi laba harian
            </p>
            <p
              className="font-black"
              style={{
                color: 'var(--profit)',
                fontSize: '1rem',
                letterSpacing: '-0.03em',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              Rp 302 rb
            </p>
          </div>
          <p
            className="mt-1"
            style={{ color: 'var(--profit-text)', fontSize: '0.65rem' }}
          >
            Berdasarkan rata-rata UMKM tahu kecil
          </p>
        </div>
      </div>

      {/* Footer ribbon */}
      <div
        className="mx-4 mb-4 rounded-xl px-3 py-2 flex items-center gap-2"
        style={{ background: 'var(--accent-gradient)' }}
      >
        <ShieldCheck size={11} strokeWidth={2.5} color="white" />
        <p className="text-[10px] font-bold text-white">
          Tidak perlu kartu kredit
        </p>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerAction, {})
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
            Mulai buku kas<br />yang lebih tertata.
          </h1>
          <p
            className="text-base mx-auto max-w-sm"
            style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}
          >
            Daftar gratis, langsung bisa dipakai.<br />
            Penjualan, biaya, dan tagihan jadi mudah dipantau.
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
            <label className="field-label" htmlFor="register-email">Email</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Mail size={16} strokeWidth={2} color="var(--text-muted)" />
              </div>
              <input
                id="register-email"
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
            <label className="field-label" htmlFor="register-password">Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Lock size={16} strokeWidth={2} color="var(--text-muted)" />
              </div>
              <input
                id="register-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                minLength={6}
                className="input-field"
                placeholder="Minimal 6 karakter"
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
            <p
              className="text-xs mt-1.5"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Minimal 6 karakter, simpan baik-baik ya.
            </p>
          </div>
          <SubmitButton
            pendingLabel="Membuat buku kas..."
            disabled={pending}
            className="btn-primary"
            style={{ marginTop: '0.25rem' }}
          >
            Buat Akun Gratis
          </SubmitButton>
        </form>

        <p
          className="text-sm mb-6 slide-up-3 text-center"
          style={{ color: 'var(--text-secondary)' }}
        >
          Sudah punya akun?{' '}
          <Link
            href="/login"
            className="font-bold"
            style={{ color: 'var(--accent)' }}
          >
            Masuk →
          </Link>
        </p>

        {/* Benefits — uniform accent treatment, mirrors login */}
        <div className="grid gap-2.5 slide-up-4">
          {[
            { icon: Heart, text: 'Gratis selamanya untuk UMKM kecil' },
            { icon: Sparkles, text: 'Tidak perlu paham akuntansi, langsung pakai' },
            { icon: ShieldCheck, text: 'Data aman, hanya kamu yang bisa akses' },
            { icon: Smartphone, text: 'Cukup dari HP, tanpa install aplikasi' },
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

      {/* Right: Onboarding mockup (desktop only) */}
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
          <OnboardingMockup />
        </div>
      </div>
    </div>
  )
}
