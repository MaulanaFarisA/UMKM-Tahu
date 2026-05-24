import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import { updateBusinessProfileAction } from '@/server/actions'
import { getBusinessProfile } from '@/server/queries'
import AppShell from '@/components/app-shell'
import type { BusinessProfile } from '@/types/database'
import { Building2, Package, Banknote, Info, Store } from 'lucide-react'

export default async function PengaturanPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profileData = await getBusinessProfile()
  const profile = profileData as BusinessProfile | null
  const action = updateBusinessProfileAction.bind(null, null)

  return (
    <AppShell active="pengaturan" title="Pengaturan Usaha" width="default">
      <div className="page-stack pb-4 slide-up">

        {/* Page header */}
        <div className="pt-1">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                boxShadow: '0 4px 12px rgba(124,58,237,0.25)',
              }}
            >
              <Store size={18} strokeWidth={2} color="white" />
            </div>
            <div>
              <p className="page-title" style={{ fontSize: '1.25rem' }}>Profil Usaha Kamu</p>
              <p className="page-subtitle text-xs">Angka ini dipakai sebagai patokan, tidak mengubah catatan lama</p>
            </div>
          </div>
        </div>

        {/* Info banner */}
        <div
          className="rounded-xl p-3.5 flex items-start gap-2.5"
          style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', borderLeft: '3px solid #F59E0B' }}
        >
          <Info size={14} strokeWidth={2} color="#F59E0B" className="flex-shrink-0 mt-0.5" />
          <p className="text-xs" style={{ color: '#92400E' }}>
            Perubahan di sini tidak mengubah data yang sudah tercatat sebelumnya.
          </p>
        </div>

        <form action={action} className="space-y-4">

          <div className="grid grid-roomy lg:grid-cols-2">

          {/* Informasi Usaha */}
          <div             className="card card-roomy space-y-4">
            <div className="flex items-center gap-2">
              <Building2 size={15} strokeWidth={2} color="#7C3AED" />
              <p className="text-sm font-bold" style={{ color: '#1A1714' }}>Informasi Usaha</p>
            </div>
            <div>
              <label className="field-label">Nama Usaha</label>
              <input
                name="business_name"
                type="text"
                required
                defaultValue={profile?.business_name ?? ''}
                className="input-field"
                placeholder="Nama usaha Anda"
              />
            </div>
            <div>
              <label className="field-label">Nama Produk</label>
              <input
                name="product_name"
                type="text"
                required
                defaultValue={profile?.product_name ?? ''}
                className="input-field"
                placeholder="Contoh: Tahu"
              />
            </div>
          </div>

          {/* Asumsi Produksi */}
          <div             className="card card-roomy space-y-4">
            <div className="flex items-center gap-2">
              <Package size={15} strokeWidth={2} color="#7C3AED" />
              <p className="text-sm font-bold" style={{ color: '#1A1714' }}>Asumsi Produksi</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="field-label">Tahu per Papan</label>
                <input
                  name="tofu_per_board"
                  type="number"
                  min="1"
                  required
                  defaultValue={profile?.tofu_per_board ?? 169}
                  className="input-field"
                />
              </div>
              <div>
                <label className="field-label">Tahu per Bungkus</label>
                <input
                  name="tofu_per_pack"
                  type="number"
                  min="1"
                  required
                  defaultValue={profile?.tofu_per_pack ?? 10}
                  className="input-field"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="field-label">Papan per Hari</label>
                <input
                  name="default_boards_per_day"
                  type="number"
                  min="1"
                  required
                  defaultValue={profile?.default_boards_per_day ?? 10}
                  className="input-field"
                />
              </div>
              <div>
                <label className="field-label">Hari Produksi/Bulan</label>
                <input
                  name="default_production_days_per_month"
                  type="number"
                  min="1"
                  max="31"
                  required
                  defaultValue={profile?.default_production_days_per_month ?? 25}
                  className="input-field"
                />
              </div>
            </div>

            {/* Production summary hint */}
            {profile && (
              <div
                className="rounded-xl p-3 flex items-start gap-2"
                style={{ backgroundColor: '#EDE9FE', border: '1px solid #C4B5FD' }}
              >
                <Info size={13} strokeWidth={2} color="#7C3AED" className="flex-shrink-0 mt-0.5" />
                <p className="text-xs" style={{ color: '#5B21B6' }}>
                  Setiap hari kamu produksi {Number(profile.default_boards_per_day) * Number(profile.tofu_per_board)} tahu dari {profile.default_boards_per_day} papan
                </p>
              </div>
            )}
          </div>

          {/* Harga Jual */}
          <div             className="card card-roomy space-y-4">
            <div className="flex items-center gap-2">
              <Banknote size={15} strokeWidth={2} color="#7C3AED" />
              <p className="text-sm font-bold" style={{ color: '#1A1714' }}>Harga Jual Default</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="field-label">Per Tahu (Rp)</label>
                <div className="relative">
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold pointer-events-none"
                    style={{ color: '#9C9690' }}
                  >Rp</span>
                  <input
                    name="default_price_per_tofu"
                    type="number"
                    min="0"
                    required
                    defaultValue={profile?.default_price_per_tofu ?? 600}
                    className="input-field"
                    style={{ paddingLeft: '2.25rem' }}
                  />
                </div>
              </div>
              <div>
                <label className="field-label">Per Bungkus (Rp)</label>
                <div className="relative">
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold pointer-events-none"
                    style={{ color: '#9C9690' }}
                  >Rp</span>
                  <input
                    name="default_price_per_pack"
                    type="number"
                    min="0"
                    required
                    defaultValue={profile?.default_price_per_pack ?? 6000}
                    className="input-field"
                    style={{ paddingLeft: '2.25rem' }}
                  />
                </div>
              </div>
            </div>
          </div>
          </div>

          <button type="submit" className="btn-primary">
            Simpan Perubahan
          </button>

        </form>
      </div>
    </AppShell>
  )
}
