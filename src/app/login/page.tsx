'use client'

import { useActionState, useState } from 'react'
import { loginAction } from '@/server/actions'
import { ReceiptText, Eye, EyeOff, Mail, Lock, TrendingUp, ShieldCheck, Smartphone } from 'lucide-react'
import Link from 'next/link'

function DashboardMockup() {
  const bars = [55, 70, 45, 85, 65, 90, 100]
  return (
    <div
      className="rounded-2xl overflow-hidden w-full max-w-sm"
      style={{ border: '1px solid #E7E3DC', boxShadow: '0 20px 40px rgba(28,25,23,0.12)', background: '#FFFDF7' }}
    >
      {/* Mini header */}
      <div className="px-4 py-3 flex items-center gap-2" style={{ background: '#FFFFFF', borderBottom: '1px solid #E7E3DC' }}>
        <div className="w-5 h-5 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}>
          <ReceiptText size={10} strokeWidth={2.5} color="white" />
        </div>
        <span className="text-xs font-bold" style={{ color: '#1C1917' }}>Pembukuan Tahu</span>
        <div className="ml-auto flex gap-1">
          {['#E7E3DC','#E7E3DC','#E7E3DC'].map((c,i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Hero profit card */}
        <div className="rounded-xl p-4" style={{ background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)', border: '1.5px solid #A7F3D0' }}>
          <p className="text-xs font-bold uppercase mb-1" style={{ color: '#065F46', letterSpacing: '0.08em' }}>UNTUNG HARI INI</p>
          <p className="font-black" style={{ color: '#065F46', fontSize: '1.5rem', letterSpacing: '-0.04em', lineHeight: 1 }}>Rp 302.556</p>
          <p className="text-xs mt-1.5" style={{ color: '#059669' }}>Omzet Rp 1,01 jt · Biaya Rp 711 rb · Margin 30%</p>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Uang Masuk', value: 'Rp 1,01 jt', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0' },
            { label: 'Uang Keluar', value: 'Rp 711 rb', color: '#1C1917', bg: '#FFFFFF', border: '#E7E3DC' },
            { label: 'Tagihan', value: 'Rp 180 rb', color: '#F59E0B', bg: '#FFFBEB', border: '#FDE68A' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-2.5" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
              <p style={{ color: '#A8A29E', fontSize: '0.6rem', fontWeight: 600, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</p>
              <p className="font-bold" style={{ color: s.color, fontSize: '0.75rem' }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Mini bar chart */}
        <div className="rounded-xl p-3" style={{ background: '#FFFFFF', border: '1px solid #E7E3DC' }}>
          <p style={{ color: '#A8A29E', fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>7 Hari Terakhir</p>
          <div className="flex items-end gap-1" style={{ height: '40px' }}>
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t"
                style={{
                  height: `${h}%`,
                  background: i === 6 ? 'linear-gradient(to top, #7C3AED, #8B5CF6)' : '#E7E3DC',
                  transition: 'height 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* Transaction list */}
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E7E3DC' }}>
          {[
            { name: 'Warung Bu Sari', cat: 'Penjualan', amount: '+Rp 60.000', color: '#059669', dot: '#ECFDF5', dotBorder: '#A7F3D0' },
            { name: 'Kedelai 50 kg', cat: 'Bahan Baku', amount: '-Rp 545.000', color: '#DC2626', dot: '#FEF2F2', dotBorder: '#FECACA' },
            { name: 'Warung Pak Budi', cat: 'Penjualan', amount: '+Rp 48.000', color: '#059669', dot: '#ECFDF5', dotBorder: '#A7F3D0' },
          ].map((t, i) => (
            <div
              key={t.name}
              className="flex items-center justify-between px-3 py-2.5"
              style={{ background: '#FFFFFF', borderBottom: i < 2 ? '1px solid #F5F0E8' : 'none' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex-shrink-0" style={{ background: t.dot, border: `1px solid ${t.dotBorder}` }} />
                <div>
                  <p className="text-xs font-semibold" style={{ color: '#1C1917' }}>{t.name}</p>
                  <p style={{ color: '#A8A29E', fontSize: '0.6rem' }}>{t.cat}</p>
                </div>
              </div>
              <p className="text-xs font-bold" style={{ color: t.color }}>{t.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating badge */}
      <div className="mx-4 mb-4 rounded-xl px-3 py-2 flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}>
        <ShieldCheck size={12} strokeWidth={2.5} color="white" />
        <p className="text-xs font-bold text-white">Gratis selamanya untuk UMKM</p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, {})
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
            Pembukuan sederhana<br />untuk usaha tahu
          </h1>
          <p className="text-base" style={{ color: '#44403C', lineHeight: 1.6 }}>
            Catat penjualan, biaya, dan tagihan harian.<br />
            Lihat usaha hari ini untung atau rugi.
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
              <input name="password" type={showPassword ? 'text' : 'password'} required autoComplete="current-password" className="input-field" placeholder="••••••••" style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem' }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" tabIndex={-1} aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}>
                {showPassword ? <EyeOff size={16} strokeWidth={2} color="#A8A29E" /> : <Eye size={16} strokeWidth={2} color="#A8A29E" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={pending} className="btn-primary" style={{ marginTop: '0.25rem' }}>
            {pending ? 'Memproses...' : 'Masuk ke akun'}
          </button>
        </form>

        <p className="text-sm mb-8" style={{ color: '#44403C' }}>
          Belum punya akun?{' '}
          <Link href="/register" className="font-bold" style={{ color: '#7C3AED' }}>Daftar gratis →</Link>
        </p>

        {/* Benefits */}
        <div className="space-y-3">
          {[
            { icon: TrendingUp, text: 'Pantau omzet dan laba harian secara otomatis' },
            { icon: ShieldCheck, text: 'Data aman, hanya kamu yang bisa akses' },
            { icon: Smartphone, text: 'Gratis, tidak perlu install, langsung dari HP' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EDE9FE' }}>
                <Icon size={13} strokeWidth={2} color="#7C3AED" />
              </div>
              <p className="text-sm" style={{ color: '#44403C' }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Dashboard mockup (desktop only) */}
      <div
        className="hidden lg:flex flex-1 items-center justify-center p-12 xl:p-16"
        style={{ background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 40%, #C4B5FD 100%)' }}
      >
        <div className="w-full max-w-sm">
          <DashboardMockup />
        </div>
      </div>

    </div>
  )
}
