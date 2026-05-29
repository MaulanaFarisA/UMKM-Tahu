import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import { createSalesTransactionAction } from '@/server/actions'
import { getBusinessProfile, getCustomers } from '@/server/queries'
import AppShell from '@/components/app-shell'
import FormSection from '@/components/form-section'
import ActionMessage from '@/components/action-message'
import SubmitButton from '@/components/submit-button'
import SalesQuickActions from '@/components/sales-quick-actions'
import { todayISOString } from '@/lib/format'
import type { BusinessProfile, Customer } from '@/types/database'
import { User, Package, Banknote, FileText, Info, Calendar, ShoppingBag, Save } from 'lucide-react'
import SalesFormPreview from '@/components/sales-form-preview'

const SALES_ERROR_MESSAGES: Record<string, string> = {
  tanggal: 'Tanggal transaksi wajib diisi.',
  jumlah: 'Jumlah bungkus harus lebih dari 0.',
  harga: 'Harga per bungkus tidak boleh kosong atau negatif.',
  bayar: 'Jumlah dibayar harus angka yang benar.',
  bayar_lebih: 'Jumlah dibayar tidak boleh lebih besar dari total penjualan.',
  simpan: 'Catatan belum berhasil disimpan. Coba ulang sebentar lagi.',
}

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function CatatPenjualanPage({ searchParams }: PageProps) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const params = await searchParams
  const errorKey = typeof params?.gagal === 'string' ? params.gagal : undefined

  const [profileData, customersData] = await Promise.all([
    getBusinessProfile(),
    getCustomers(),
  ])

  const profile = profileData as BusinessProfile | null
  const customers = customersData as Customer[]
  const defaultPrice = profile?.default_price_per_pack ?? 6000
  const today = todayISOString()
  const action = createSalesTransactionAction.bind(null, null)

  return (
    <AppShell active="catat" title="Catat Penjualan" showBack backHref="/catat" width="default">
      <form action={action} className="pb-4 grid grid-roomy lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="section-stack min-w-0 slide-up-1">

        {/* Hero / context strip */}
        <div
          className="ledger-receipt rounded-2xl px-5 py-4 flex items-center gap-3.5 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--profit-bg) 0%, var(--bg-white) 100%)',
            border: '1px solid var(--profit-border)',
          }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 relative"
            style={{
              background: 'var(--bg-white)',
              boxShadow: '0 4px 12px rgba(4,120,87,0.18)',
            }}
          >
            <ShoppingBag size={20} strokeWidth={2.4} color="var(--profit)" />
          </div>
          <div className="min-w-0 flex-1 relative">
            <p
              className="text-[10px] font-bold uppercase tracking-wider"
              style={{ color: 'var(--profit)', letterSpacing: '0.1em' }}
            >
              Uang Masuk
            </p>
            <p
              className="text-base font-extrabold mt-0.5 leading-tight"
              style={{ color: 'var(--profit-text)', letterSpacing: '-0.02em' }}
            >
              Catat penjualan tahu hari ini
            </p>
            <p
              className="text-xs mt-0.5 leading-snug"
              style={{ color: 'var(--text-secondary)' }}
            >
              Isi setiap kolom di bawah, lihat pratinjau struk di samping.
            </p>
          </div>
        </div>

        {errorKey && (
          <ActionMessage variant="error" title="Catatan belum tersimpan">
            {SALES_ERROR_MESSAGES[errorKey] ?? SALES_ERROR_MESSAGES.simpan}
          </ActionMessage>
        )}

        {/* Jumlah */}
        <FormSection
          title="Jumlah & Harga"
          icon={Package}
          accent="accent"
          description="Berapa bungkus tahu dan harga jualnya"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="sale-packs" className="field-label">Jumlah Bungkus</label>
              <input
                id="sale-packs"
                name="packs"
                type="number"
                min="1"
                required
                placeholder="0"
                inputMode="numeric"
                className="input-field"
              />
              <p className="text-xs mt-1.5" style={{ color: 'var(--text-tertiary)' }}>
                Total bungkus yang terjual.
              </p>
            </div>
            <div>
              <label htmlFor="sale-price" className="field-label">Harga / Bungkus</label>
              <div className="relative">
                <span
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold pointer-events-none"
                  style={{ color: 'var(--text-tertiary)' }}
                >Rp</span>
                <input
                  id="sale-price"
                  name="price_per_pack"
                  type="number"
                  min="0"
                  required
                  defaultValue={defaultPrice}
                  inputMode="numeric"
                  className="input-field"
                  style={{ paddingLeft: '2.25rem' }}
                />
              </div>
              <p className="text-xs mt-1.5" style={{ color: 'var(--text-tertiary)' }}>
                Standar dari Profil Usaha.
              </p>
            </div>
          </div>
        </FormSection>

        <div className="section-stack">
          <p className="section-heading px-1" style={{ color: 'var(--text-tertiary)' }}>
            Tombol cepat
          </p>
          <SalesQuickActions />
        </div>

        {/* Pembeli & Tanggal */}
        <FormSection
          title="Pembeli & Tanggal"
          icon={User}
          accent="neutral"
          description="Siapa yang beli dan kapan transaksinya"
        >
          <div>
            <label htmlFor="sale-customer" className="field-label">Nama Pembeli / Warung</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <User size={15} strokeWidth={2} color="var(--text-tertiary)" />
              </div>
              <input
                id="sale-customer"
                name="customer_name"
                type="text"
                list="customers-list"
                placeholder="Contoh: Warung Bu Sari"
                className="input-field"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
            <datalist id="customers-list">
              {customers.map((c) => (
                <option key={c.id} value={c.name} />
              ))}
            </datalist>
            <p className="text-xs mt-1.5" style={{ color: 'var(--text-tertiary)' }}>
              Kosongkan kalau pembeli umum atau lewat (tidak rutin).
            </p>
          </div>
          <div>
            <label htmlFor="sale-date" className="field-label">Tanggal Transaksi</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Calendar size={15} strokeWidth={2} color="var(--text-tertiary)" />
              </div>
              <input
                id="sale-date"
                name="date"
                type="date"
                defaultValue={today}
                required
                className="input-field"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
            <p className="text-xs mt-1.5" style={{ color: 'var(--text-tertiary)' }}>
              Standarnya hari ini. Ubah kalau catat transaksi kemarin.
            </p>
          </div>
        </FormSection>

        {/* Pembayaran */}
        <FormSection
          title="Pembayaran Tunai"
          icon={Banknote}
          accent="warn"
          description="Berapa yang sudah dibayar saat ini"
        >
          <div>
            <label htmlFor="sale-paid" className="field-label">Jumlah Dibayar Sekarang</label>
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold pointer-events-none"
                style={{ color: 'var(--text-tertiary)' }}
              >Rp</span>
              <input
                id="sale-paid"
                name="amount_paid"
                type="number"
                min="0"
                defaultValue={0}
                placeholder="0"
                inputMode="numeric"
                className="input-field"
                style={{ paddingLeft: '2.25rem' }}
              />
            </div>
          </div>
          <div
            className="flex items-start gap-2.5 rounded-xl p-3"
            style={{ backgroundColor: 'var(--warn-bg)', border: '1px solid var(--warn-border)' }}
          >
            <Info size={14} strokeWidth={2.2} color="var(--warn)" className="flex-shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold leading-snug" style={{ color: 'var(--warn-text)' }}>
                Sisa otomatis masuk Tagihan
              </p>
              <p className="text-xs mt-0.5 leading-snug" style={{ color: 'var(--warn-text)', opacity: 0.85 }}>
                Kalau belum dibayar penuh, isi 0 atau jumlah parsial. Sisanya tercatat sebagai tagihan pembeli.
              </p>
            </div>
          </div>
        </FormSection>

        {/* Catatan */}
        <FormSection
          title="Catatan Tambahan"
          icon={FileText}
          accent="neutral"
          description="Opsional, untuk pengingat pribadi"
        >
          <label htmlFor="sale-notes" className="sr-only">Catatan</label>
          <input
            id="sale-notes"
            name="notes"
            type="text"
            placeholder="Contoh: Diantar pakai motor, ambil siang"
            className="input-field"
          />
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            Boleh dikosongkan kalau tidak ada keterangan khusus.
          </p>
        </FormSection>

        {/* Mobile submit — visible below the form on small screens */}
        <div className="lg:hidden section-stack">
          <SubmitButton
            pendingLabel="Menyimpan penjualan..."
            className="btn-primary w-full"
            style={{ minHeight: '52px' }}
          >
            <Save size={16} strokeWidth={2.5} />
            Simpan Catatan Penjualan
          </SubmitButton>
          <p
            className="text-xs text-center px-2"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Setelah disimpan, otomatis masuk ke Beranda dan Tagihan kalau ada sisa.
          </p>
        </div>
        </div>

        {/* Sticky preview + submit (right column on desktop) */}
        <aside className="section-stack lg:sticky lg:top-20 h-fit min-w-0 slide-up-2">
          <div>
            <p
              className="section-heading mb-2 px-1"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Pratinjau Langsung
            </p>
            <SalesFormPreview defaultPricePerPack={defaultPrice} />
          </div>
          <SubmitButton
            pendingLabel="Menyimpan penjualan..."
            className="btn-primary w-full hidden lg:inline-flex"
            style={{ minHeight: '52px' }}
          >
            <Save size={16} strokeWidth={2.5} />
            Simpan Catatan Penjualan
          </SubmitButton>
          <p
            className="text-xs text-center px-2 hidden lg:block"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Setelah disimpan, otomatis masuk ke Beranda dan Tagihan kalau ada sisa.
          </p>
        </aside>

      </form>
    </AppShell>
  )
}
