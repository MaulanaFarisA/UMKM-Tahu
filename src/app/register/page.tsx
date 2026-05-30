'use client'

import { useActionState, useState } from 'react'
import { registerAction } from '@/server/actions'
import BrandMark from '@/components/brand-mark'
import SubmitButton from '@/components/submit-button'
import AuthShowcase from '@/components/auth-showcase'
import { Eye, EyeOff, Mail, Lock, Heart, ShieldCheck, Smartphone } from 'lucide-react'
import Link from 'next/link'

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerAction, {})
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10 relative overflow-hidden gradient-mesh">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left: Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0 slide-up-1">
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
            Buat akun gratis
          </h1>
          <p className="text-base mb-8" style={{ color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
            Daftar sekali, langsung bisa catat transaksi dari HP.
          </p>

          <form action={formAction} className="space-y-4 slide-up-2">
            {state?.error && (
              <div role="alert" className="rounded-xl p-3.5" style={{ backgroundColor: 'var(--loss-bg)', border: '1px solid var(--loss-border)' }}>
                <p className="text-sm font-medium" style={{ color: 'var(--loss-text)' }}>{state.error}</p>
              </div>
            )}

            <div>
              <label className="field-label" htmlFor="register-email">Email</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Mail size={16} strokeWidth={2} color="var(--text-muted)" />
                </div>
                <input id="register-email" name="email" type="email" required autoComplete="email" className="input-field" placeholder="nama@email.com" style={{ paddingLeft: '2.75rem' }} />
              </div>
            </div>

            <div>
              <label className="field-label" htmlFor="register-password">Password</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
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
              <p className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>Minimal 6 karakter</p>
            </div>

            <SubmitButton pendingLabel="Memproses..." disabled={pending} className="btn-primary" style={{ marginTop: '0.5rem' }}>
              Buat Akun
            </SubmitButton>
          </form>

          <p className="text-sm text-center mt-6 slide-up-3" style={{ color: 'var(--text-tertiary)' }}>
            Sudah punya akun?{' '}
            <Link href="/login" className="font-bold" style={{ color: 'var(--accent)' }}>Masuk</Link>
          </p>

          <div className="mt-8 space-y-3 lg:hidden slide-up-4">
            {[
              { icon: Heart, text: 'Gratis selamanya untuk UMKM kecil' },
              { icon: ShieldCheck, text: 'Data aman, hanya kamu yang bisa akses' },
              { icon: Smartphone, text: 'Cukup dari HP, tanpa install aplikasi' },
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
            eyebrow="Mulai dalam 2 menit"
            headline="Usaha tahu kamu, tercatat rapi."
            sub="Tidak perlu paham akuntansi. Catat sekali sehari, semua angka tersusun otomatis."
          />
        </div>
      </div>
    </div>
  )
}
