import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import AppShell from '@/components/app-shell'
import Link from 'next/link'
import { ShoppingBag, Receipt, ChevronRight, Plus } from 'lucide-react'

export default async function CatatPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <AppShell active="catat" title="Catat">
      <div className="space-y-6 slide-up">

        <div className="pt-1">
          <p className="page-title">Catat Apa?</p>
          <p className="page-subtitle mt-1">Pilih jenis catatan yang ingin ditambahkan.</p>
        </div>

        <div className="space-y-3">
          {/* Penjualan */}
          <Link
            href="/catat/penjualan"
            className="flex items-center gap-4 rounded-2xl p-5 transition-all active:scale-98 tap-highlight-none"
            style={{
              background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
              border: '1.5px solid #C4B5FD',
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(124,58,237,0.15)' }}
            >
              <ShoppingBag size={22} strokeWidth={2} color="#7C3AED" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-base" style={{ color: '#1A1714' }}>Catat Penjualan</p>
              <p className="text-sm mt-0.5" style={{ color: '#4A4540' }}>Untuk omzet masuk hari ini</p>
            </div>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(124,58,237,0.12)' }}
            >
              <ChevronRight size={16} strokeWidth={2.5} color="#7C3AED" />
            </div>
          </Link>

          {/* Pengeluaran */}
          <Link
            href="/catat/pengeluaran"
            className="card flex items-center gap-4 rounded-2xl p-5 transition-all active:scale-98 tap-highlight-none"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#F5F4F0' }}
            >
              <Receipt size={22} strokeWidth={2} color="#4A4540" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-base" style={{ color: '#1A1714' }}>Catat Pengeluaran</p>
              <p className="text-sm mt-0.5" style={{ color: '#4A4540' }}>Untuk biaya yang dikeluarkan</p>
            </div>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#F5F4F0' }}
            >
              <ChevronRight size={16} strokeWidth={2.5} color="#9C9690" />
            </div>
          </Link>
        </div>

        {/* Tip */}
        <div
          className="rounded-xl p-3.5 flex items-start gap-3"
          style={{ backgroundColor: '#F5F4F0', border: '1px solid #E8E5DF' }}
        >
          <Plus size={14} strokeWidth={2.5} color="#9C9690" className="flex-shrink-0 mt-0.5" />
          <p className="text-xs" style={{ color: '#4A4540' }}>
            Catat setiap hari agar ringkasan di Beranda selalu akurat.
          </p>
        </div>

      </div>
    </AppShell>
  )
}
