import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import { updateBusinessProfileAction } from '@/server/actions'
import { getBusinessProfile } from '@/server/queries'
import AppShell from '@/components/app-shell'
import FormSection from '@/components/form-section'
import InfoBanner from '@/components/info-banner'
import BrandMark from '@/components/brand-mark'
import ActionMessage from '@/components/action-message'
import SubmitButton from '@/components/submit-button'
import type { BusinessProfile } from '@/types/database'
import { Building2, Package, Banknote, Save, Calculator } from 'lucide-react'

const SETTINGS_ERROR_MESSAGES: Record<string, string> = {
  angka: 'Cek lagi angka produksi dan harga. Nilainya tidak boleh kosong, negatif, atau di luar batas.',
  simpan: 'Profil usaha belum berhasil disimpan. Coba ulang sebentar lagi.',
}

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function PengaturanPage({ searchParams }: PageProps) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const params = await searchParams
  const successKey = typeof params?.berhasil === 'string' ? params.berhasil : undefined
  const errorKey = typeof params?.gagal === 'string' ? params.gagal : undefined

  const profileData = await getBusinessProfile()
  const profile = profileData as BusinessProfile | null
  const action = updateBusinessProfileAction.bind(null, null)

  const dailyTofu = profile
    ? Number(profile.default_boards_per_day) * Number(profile.tofu_per_board)
    : null
  const dailyPacks = profile && Number(profile.tofu_per_pack) > 0
    ? Math.floor(Number(dailyTofu) / Number(profile.tofu_per_pack))
    : null
  const monthlyPacks = profile && dailyPacks !== null
    ? dailyPacks * Number(profile.default_production_days_per_month)
    : null

  return (
    <AppShell active="pengaturan" title="Profil Usaha Kamu" width="default">
      <div className="page-stack pb-4 slide-up">

        {/* Page header */}
        <div className="pt-1">
          <div className="flex items-center gap-3 mb-3">
            <BrandMark size="md" />
            <div className="min-w-0 flex-1">
              <h1 className="page-title" style={{ fontSize: '1.25rem' }}>Profil Usaha Kamu</h1>
              <p className="page-subtitle text-xs">Angka di sini jadi patokan, tidak mengubah catatan lama</p>
            </div>
          </div>
        </div>

        {successKey === 'profil' && (
          <ActionMessage variant="success" title="Profil usaha tersimpan">
            Angka baru sudah jadi patokan untuk catatan berikutnya.
          </ActionMessage>
        )}

        {errorKey && (
          <ActionMessage variant="error" title="Profil belum tersimpan">
            {SETTINGS_ERROR_MESSAGES[errorKey] ?? SETTINGS_ERROR_MESSAGES.simpan}
          </ActionMessage>
        )}

        {/* Top notice — perubahan tidak retroaktif */}
        <InfoBanner variant="warn">
          Mengubah angka di sini <strong>tidak</strong> mengubah data yang sudah tercatat sebelumnya. Hanya berlaku untuk catatan baru.
        </InfoBanner>

        <form action={action} className="space-y-4">

          <div className="grid grid-roomy lg:grid-cols-2">

            {/* Informasi Usaha — accent purple */}
            <FormSection
              title="Informasi Usaha"
              icon={Building2}
              accent="accent"
              description="Nama yang muncul di struk dan ringkasan harian"
            >
              <div>
                <label htmlFor="business_name" className="field-label">Nama Usaha</label>
                <input
                  id="business_name"
                  name="business_name"
                  type="text"
                  required
                  defaultValue={profile?.business_name ?? ''}
                  className="input-field"
                  placeholder="Nama usaha kamu"
                />
                <p className="text-xs mt-1.5" style={{ color: 'var(--text-tertiary)' }}>
                  Muncul di header aplikasi setiap hari.
                </p>
              </div>
              <div>
                <label htmlFor="product_name" className="field-label">Nama Produk</label>
                <input
                  id="product_name"
                  name="product_name"
                  type="text"
                  required
                  defaultValue={profile?.product_name ?? ''}
                  className="input-field"
                  placeholder="Contoh: Tahu"
                />
                <p className="text-xs mt-1.5" style={{ color: 'var(--text-tertiary)' }}>
                  Dipakai di label catat penjualan.
                </p>
              </div>
            </FormSection>

            {/* Asumsi Produksi — warn (kuning, karena ini patokan hitungan) */}
            <FormSection
              title="Asumsi Produksi"
              icon={Package}
              accent="warn"
              description="Dipakai untuk menghitung HPP, omzet, dan target harian"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="tofu_per_board" className="field-label">Tahu per Papan</label>
                  <input
                    id="tofu_per_board"
                    name="tofu_per_board"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    required
                    defaultValue={profile?.tofu_per_board ?? 169}
                    className="input-field"
                  />
                  <p className="text-xs mt-1.5 leading-snug" style={{ color: 'var(--text-tertiary)' }}>
                    Jumlah potong tahu dari satu papan cetakan.
                  </p>
                </div>
                <div>
                  <label htmlFor="tofu_per_pack" className="field-label">Tahu per Bungkus</label>
                  <input
                    id="tofu_per_pack"
                    name="tofu_per_pack"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    required
                    defaultValue={profile?.tofu_per_pack ?? 10}
                    className="input-field"
                  />
                  <p className="text-xs mt-1.5 leading-snug" style={{ color: 'var(--text-tertiary)' }}>
                    Isi per bungkus saat dijual ke pembeli.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="default_boards_per_day" className="field-label">Papan per Hari</label>
                  <input
                    id="default_boards_per_day"
                    name="default_boards_per_day"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    required
                    defaultValue={profile?.default_boards_per_day ?? 10}
                    className="input-field"
                  />
                  <p className="text-xs mt-1.5 leading-snug" style={{ color: 'var(--text-tertiary)' }}>
                    Rata-rata papan yang kamu masak setiap hari.
                  </p>
                </div>
                <div>
                  <label htmlFor="default_production_days_per_month" className="field-label">Hari Produksi/Bulan</label>
                  <input
                    id="default_production_days_per_month"
                    name="default_production_days_per_month"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    max="31"
                    required
                    defaultValue={profile?.default_production_days_per_month ?? 25}
                    className="input-field"
                  />
                  <p className="text-xs mt-1.5 leading-snug" style={{ color: 'var(--text-tertiary)' }}>
                    Hari aktif masak dalam sebulan, libur tidak dihitung.
                  </p>
                </div>
              </div>

              {/* Production summary — explains the math without changing it */}
              {profile && dailyTofu !== null && dailyPacks !== null && monthlyPacks !== null && (
                <div
                  className="rounded-xl p-3.5"
                  style={{
                    background: 'linear-gradient(135deg, var(--warn-bg) 0%, #FFFFFF 100%)',
                    border: '1px solid var(--warn-border)',
                  }}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(245,158,11,0.18)' }}
                    >
                      <Calculator size={14} strokeWidth={2.25} color="#D97706" />
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-xs font-bold mb-2" style={{ color: 'var(--warn-text)', letterSpacing: '-0.005em' }}>
                        Hitungan dari angka ini
                      </p>
                      <ul className="space-y-1 text-xs" style={{ color: 'var(--warn-text)' }}>
                        <li className="flex items-baseline justify-between gap-2">
                          <span>Per hari</span>
                          <span className="font-bold money-xs" style={{ fontFeatureSettings: '"tnum"' }}>
                            {dailyTofu.toLocaleString('id-ID')} tahu · {dailyPacks} bungkus
                          </span>
                        </li>
                        <li className="flex items-baseline justify-between gap-2">
                          <span>Per bulan</span>
                          <span className="font-bold money-xs" style={{ fontFeatureSettings: '"tnum"' }}>
                            ~{monthlyPacks.toLocaleString('id-ID')} bungkus
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </FormSection>

            {/* Harga Jual Default — profit green (income) */}
            <FormSection
              title="Harga Jual Default"
              icon={Banknote}
              accent="profit"
              description="Otomatis terisi saat catat penjualan baru"
              className="lg:col-span-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="default_price_per_tofu" className="field-label">Per Tahu</label>
                  <div className="relative">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold pointer-events-none"
                      style={{ color: 'var(--text-tertiary)' }}
                    >Rp</span>
                    <input
                      id="default_price_per_tofu"
                      name="default_price_per_tofu"
                      type="number"
                      inputMode="numeric"
                      min="0"
                      required
                      defaultValue={profile?.default_price_per_tofu ?? 600}
                      className="input-field"
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                  <p className="text-xs mt-1.5 leading-snug" style={{ color: 'var(--text-tertiary)' }}>
                    Harga jual eceran per potong tahu.
                  </p>
                </div>
                <div>
                  <label htmlFor="default_price_per_pack" className="field-label">Per Bungkus</label>
                  <div className="relative">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold pointer-events-none"
                      style={{ color: 'var(--text-tertiary)' }}
                    >Rp</span>
                    <input
                      id="default_price_per_pack"
                      name="default_price_per_pack"
                      type="number"
                      inputMode="numeric"
                      min="0"
                      required
                      defaultValue={profile?.default_price_per_pack ?? 6000}
                      className="input-field"
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                  <p className="text-xs mt-1.5 leading-snug" style={{ color: 'var(--text-tertiary)' }}>
                    Harga jual untuk satu bungkus penuh.
                  </p>
                </div>
              </div>

              <InfoBanner variant="tip">
                Bisa kamu ubah saat catat penjualan kalau hari itu pasangnya beda harga.
              </InfoBanner>
            </FormSection>

          </div>

          <SubmitButton
            pendingLabel="Menyimpan profil..."
            className="btn-primary w-full inline-flex items-center justify-center gap-2"
            style={{ minHeight: '52px' }}
          >
            <Save size={16} strokeWidth={2.5} />
            Simpan Perubahan
          </SubmitButton>

        </form>
      </div>
    </AppShell>
  )
}
