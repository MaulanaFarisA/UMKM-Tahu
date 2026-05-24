'use client'

import { useActionState, useState } from 'react'
import { registerAction } from '@/server/actions'
import { ReceiptText, Eye, EyeOff, Mail, Lock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerAction, {})
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#FFFDF7' }}>

      {/* Left: Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 xl:px-16 max-w-lg mx-auto lg:mx-0 w-full">

        {/* Brand */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)', boxShadow: '0 4px 12px rgba(124,58,237,0.3)' }}
            >
              <ReceiptText size={20} strokeWidth={2} color="white" />
            </div>
            <span className="font-bold text-lg" style={{ color: '#1C1917', letterSpacing: '-0.02em' }}>Pembukuan Tahu</span>
          </div>
          <h1 className="font-black mb-2" style={{ color: '#1C1917', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Mulai catat usaha tahu<br />hari ini
          </h1>
          <p className="text-base" style={{ color: '#44403C', lineHeight: 1.6 }}>
            Daftar gratis, langsung bisa dipakai.<br />
            Tidak perlu paham akuntansi.
          </p>
        </div>

        {/* Form */}
        <form action={formAction} className="space-y-4 mb-6">
          {state?.error && (
            <div className="rounded-xl p-3.5" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
              <p className="text-sm font-medium" style={{ color: '#991B1B' }}>{state.error}</p>
            </div>
          )}
          <div>
            <label className="field-label">Email</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Mail size={16} strokeWidth={2} color="#A8A29E" />
              </div>
              <input name="email" type="email" required autoComplete="email" className="input-field" placeholder="nama@email.com" style={{ paddingLeft: '2.5rem' }} />
            </div>
          </div>
          <div>
            <label className="field-label">Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Lock size={16} strokeWidth={2} color="#A8A29E" />
              </div>
              <input name="password" type={showPassword ? 'text' : 'password'} required autoComplete="new-password" minLength={6} className="input-field" placeholder="Minimal 6 karakter" style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem' }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" tabIndex={-1} aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}>
                {showPassword ? <EyeOff size={16} strokeWidth={2} color="#A8A29E" /> : <Eye size={16} strokeWidth={2} color="#A8A29E" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={pending} className="btn-primary" style={{ marginTop: '0.25rem' }}>
            {pending ? 'Memproses...' : 'Buat Akun Gratis'}
          </button>
        </form>

        <p className="text-sm mb-8" style={{ color: '#44403C' }}>
          Sudah punya akun?{' '}
          <Link href="/login" className="font-bold" style={{ color: '#7C3AED' }}>Masuk →</Link>
        </p>

        {/* Benefits */}
        <div className="space-y-3">
          {[
            'Gratis selamanya untuk UMKM kecil',
            'Tidak perlu paham akuntansi',
            'Data aman, hanya kamu yang bisa akses',
            'Bisa dipakai langsung dari HP',
          ].map((text) => (
            <div key={text} className="flex items-center gap-3">
              <CheckCircle size={16} strokeWidth={2} color="#059669" className="flex-shrink-0" />
              <p className="text-sm" style={{ color: '#44403C' }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Brand panel (desktop only) */}
      <div
        className="hidden lg:flex flex-1 flex-col items-center justify-center p-12 xl:p-16 text-center"
        style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 50%, #5B21B6 100%)' }}
      >
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8"
          style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <ReceiptText size={36} strokeWidth={1.75} color="white" />
        </div>
        <h2 className="font-black text-white mb-4" style={{ fontSize: '2rem', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
          Pembukuan yang<br />benar-benar mudah
        </h2>
        <p className="text-base mb-10" style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, maxWidth: '320px' }}>
          Dirancang khusus untuk usaha tahu dan UMKM kecil. Tidak perlu kursus akuntansi.
        </p>
        <div className="space-y-3 w-full max-w-xs">
          {[
            { num: '169', label: 'bungkus tahu per hari' },
            { num: 'Rp 302 rb', label: 'rata-rata laba harian' },
            { num: '100%', label: 'gratis selamanya' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4 rounded-2xl px-5 py-3.5" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <p className="font-black text-white" style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', minWidth: '80px' }}>{s.num}</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
