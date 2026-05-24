import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import { createExpenseAction } from '@/server/actions'
import AppShell from '@/components/app-shell'
import { todayISOString } from '@/lib/format'
import { Tag, Banknote, FileText, Info, Package } from 'lucide-react'
import ExpenseFormPreview from '@/components/expense-form-preview'

const CATEGORIES = [
  { value: 'raw_material', label: 'Bahan Baku' },
  { value: 'additional_material', label: 'Bahan Tambahan' },
  { value: 'production', label: 'Produksi' },
  { value: 'distribution', label: 'Distribusi' },
  { value: 'other', label: 'Lain-lain' },
]

const STATUSES = [
  { value: 'actual', label: 'Aktual' },
  { value: 'estimated', label: 'Perkiraan' },
  { value: 'unconfirmed', label: 'Belum Dikonfirmasi' },
]

const UNITS = ['kg', 'liter', 'ikat', 'buah', 'pack', 'item', 'hari', 'minggu']

export default async function CatatPengeluaranPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const today = todayISOString()
  const action = createExpenseAction.bind(null, null)

  return (
    <AppShell active="catat" title="Catat Pengeluaran" showBack backHref="/catat" width="default">
      <form action={action} className="slide-up pb-4 grid grid-roomy lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="section-stack min-w-0">

        {/* Tanggal & Kategori */}
        <div className="card card-roomy space-y-4" style={{ borderLeft: '3px solid #F59E0B' }}>
          <div className="flex items-center gap-2 mb-1">
            <Tag size={15} strokeWidth={2} color="#F59E0B" />
            <p className="text-sm font-bold" style={{ color: '#1C1917' }}>Informasi Pengeluaran</p>
          </div>
          <div>
            <label className="field-label">Tanggal</label>
            <input name="date" type="date" defaultValue={today} required className="input-field" />
          </div>
          <div>
            <label className="field-label">Kategori</label>
            <select name="category" required className="input-field">
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Detail */}
        <div className="card card-roomy space-y-4" style={{ borderLeft: '3px solid #7C3AED' }}>
          <div className="flex items-center gap-2 mb-1">
            <Banknote size={15} strokeWidth={2} color="#7C3AED" />
            <p className="text-sm font-bold" style={{ color: '#1C1917' }}>Detail Pengeluaran</p>
          </div>
          <div>
            <label className="field-label">Nama Pengeluaran</label>
            <input
              name="item_name"
              type="text"
              required
              placeholder="Contoh: Kedelai, Kayu bakar, Bensin"
              className="input-field"
            />
          </div>

          {/* Quantity + Unit row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="field-label">Jumlah</label>
              <input
                name="quantity"
                type="number"
                min="0.01"
                step="0.01"
                required
                defaultValue={1}
                placeholder="1"
                className="input-field"
              />
            </div>
            <div>
              <label className="field-label">Satuan</label>
              <select name="unit" className="input-field">
                {UNITS.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Harga & Total */}
        <div className="card card-roomy space-y-4" style={{ borderLeft: '3px solid #7C3AED' }}>
          <div className="flex items-center gap-2 mb-1">
            <Package size={15} strokeWidth={2} color="#7C3AED" />
            <p className="text-sm font-bold" style={{ color: '#1C1917' }}>Harga</p>
          </div>
          <div>
            <label className="field-label">Harga Satuan</label>
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold pointer-events-none"
                style={{ color: '#9C9690' }}
              >Rp</span>
              <input
                name="unit_price"
                type="number"
                min="0"
                required
                placeholder="0"
                className="input-field"
                style={{ paddingLeft: '2.25rem' }}
              />
            </div>
            <p className="text-xs mt-1.5" style={{ color: '#9C9690' }}>
              Total = jumlah × harga satuan (dihitung otomatis)
            </p>
          </div>
        </div>

        {/* Status */}
        <div           className="card card-roomy">
          <div className="flex items-center gap-2 mb-3">
            <Info size={15} strokeWidth={2} color="#9C9690" />
            <label className="field-label" style={{ marginBottom: 0 }}>Status Data</label>
          </div>
          <select name="confirmation_status" className="input-field">
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <p className="text-xs mt-1.5" style={{ color: '#9C9690' }}>
            Pilih &quot;Belum Dikonfirmasi&quot; jika angka masih perkiraan
          </p>
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

        {/* Tip */}
        <div
          className="rounded-xl p-3 flex items-start gap-2"
          style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}
        >
          <Info size={13} strokeWidth={2} color="#D97706" className="flex-shrink-0 mt-0.5" />
          <p className="text-xs" style={{ color: '#92400E' }}>
            Contoh: Kedelai 50 kg × Rp 10.900 = Total Rp 545.000
          </p>
        </div>
        </div>

        {/* Sticky preview + submit (right column on desktop) */}
        <aside className="section-stack lg:sticky lg:top-20 h-fit min-w-0">
          <ExpenseFormPreview />
          <button type="submit" className="btn-primary">
            Simpan Catatan Pengeluaran
          </button>
        </aside>

      </form>
    </AppShell>
  )
}
