import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import { createSalesTransactionAction } from '@/server/actions'
import { getBusinessProfile, getCustomers } from '@/server/queries'
import AppShell from '@/components/app-shell'
import { todayISOString } from '@/lib/format'
import type { BusinessProfile, Customer } from '@/types/database'
import { User, Package, Banknote, FileText, Info } from 'lucide-react'
import SalesFormPreview from '@/components/sales-form-preview'

export default async function CatatPenjualanPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

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
      <form action={action} className="slide-up pb-4 grid grid-roomy lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="section-stack min-w-0">

        {/* Pembeli & Tanggal */}
        <div className="card card-roomy space-y-4" style={{ borderLeft: '3px solid #7C3AED' }}>
          <div className="flex items-center gap-2 mb-1">
            <User size={15} strokeWidth={2} color="#7C3AED" />
            <p className="text-sm font-bold" style={{ color: '#1C1917' }}>Pembeli</p>
          </div>
          <div>
            <label className="field-label">Tanggal</label>
            <input name="date" type="date" defaultValue={today} required className="input-field" />
          </div>
          <div>
            <label className="field-label">Nama Pembeli / Warung</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <User size={15} strokeWidth={2} color="#9C9690" />
              </div>
              <input
                name="customer_name"
                type="text"
                list="customers-list"
                placeholder="Ketik nama pembeli atau warung"
                className="input-field"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
            <datalist id="customers-list">
              {customers.map((c) => (
                <option key={c.id} value={c.name} />
              ))}
            </datalist>
            <p className="text-xs mt-1.5" style={{ color: '#9C9690' }}>
              Kosongkan jika pembeli tidak dikenal
            </p>
          </div>
        </div>

        {/* Jumlah */}
        <div className="card card-roomy space-y-4" style={{ borderLeft: '3px solid #7C3AED' }}>
          <div className="flex items-center gap-2 mb-1">
            <Package size={15} strokeWidth={2} color="#7C3AED" />
            <p className="text-sm font-bold" style={{ color: '#1C1917' }}>Jumlah Penjualan</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="field-label">Jumlah Bungkus</label>
              <input
                name="packs"
                type="number"
                min="1"
                required
                placeholder="0"
                className="input-field"
              />
            </div>
            <div>
              <label className="field-label">Harga / Bungkus</label>
              <div className="relative">
                <span
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold pointer-events-none"
                  style={{ color: '#9C9690' }}
                >Rp</span>
                <input
                  name="price_per_pack"
                  type="number"
                  min="0"
                  required
                  defaultValue={defaultPrice}
                  className="input-field"
                  style={{ paddingLeft: '2.25rem' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pembayaran */}
        <div className="card card-roomy space-y-3" style={{ borderLeft: '3px solid #F59E0B' }}>
          <div className="flex items-center gap-2 mb-1">
            <Banknote size={15} strokeWidth={2} color="#F59E0B" />
            <p className="text-sm font-bold" style={{ color: '#1C1917' }}>Pembayaran</p>
          </div>
          <div>
            <label className="field-label">Jumlah Dibayar</label>
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold pointer-events-none"
                style={{ color: '#9C9690' }}
              >Rp</span>
              <input
                name="amount_paid"
                type="number"
                min="0"
                defaultValue={0}
                placeholder="0"
                className="input-field"
                style={{ paddingLeft: '2.25rem' }}
              />
            </div>
          </div>
          <div
            className="flex items-start gap-2 rounded-xl p-3"
            style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}
          >
            <Info size={13} strokeWidth={2} color="#F59E0B" className="flex-shrink-0 mt-0.5" />
            <p className="text-xs font-medium" style={{ color: '#92400E' }}>
              Kalau belum dibayar penuh, sisanya otomatis masuk ke Tagihan.
            </p>
          </div>
        </div>

        {/* Catatan */}
        <div           className="card card-roomy">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={15} strokeWidth={2} color="#9C9690" />
            <label className="field-label" style={{ marginBottom: 0 }}>Catatan (opsional)</label>
          </div>
          <input
            name="notes"
            type="text"
            placeholder="Catatan tambahan"
            className="input-field"
          />
        </div>
        </div>

        {/* Sticky preview + submit (right column on desktop) */}
        <aside className="section-stack lg:sticky lg:top-20 h-fit min-w-0">
          <SalesFormPreview defaultPricePerPack={defaultPrice} />
          <button type="submit" className="btn-primary">
            Simpan Catatan Penjualan
          </button>
        </aside>

      </form>
    </AppShell>
  )
}
