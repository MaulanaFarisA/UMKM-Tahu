import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import { createExpenseAction } from '@/server/actions'
import AppShell from '@/components/app-shell'
import FormSection from '@/components/form-section'
import ActionMessage from '@/components/action-message'
import SubmitButton from '@/components/submit-button'
import ExpenseQuickActions from '@/components/expense-quick-actions'
import { todayISOString } from '@/lib/format'
import {
  Calendar,
  Tag,
  Package,
  Coins,
  ShieldCheck,
  StickyNote,
  Info,
  TrendingDown,
  ReceiptText,
} from 'lucide-react'
import ExpenseFormPreview from '@/components/expense-form-preview'
import { EXPENSE_CATEGORY_OPTIONS } from '@/domain/expense-categories'

const STATUSES = [
  { value: 'actual', label: 'Aktual' },
  { value: 'estimated', label: 'Perkiraan' },
  { value: 'unconfirmed', label: 'Belum Dikonfirmasi' },
]

const UNITS = ['kg', 'liter', 'ikat', 'buah', 'pack', 'item', 'hari', 'minggu', 'bulan', 'tahun', 'produksi']

const EXPENSE_ERROR_MESSAGES: Record<string, string> = {
  tanggal: 'Tanggal pengeluaran wajib diisi.',
  jumlah: 'Jumlah harus lebih dari 0.',
  harga: 'Harga satuan tidak boleh kosong atau negatif.',
  nama: 'Nama pengeluaran wajib diisi.',
  simpan: 'Catatan pengeluaran belum berhasil disimpan. Coba ulang sebentar lagi.',
}

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function CatatPengeluaranPage({ searchParams }: PageProps) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const params = await searchParams
  const errorKey = typeof params?.gagal === 'string' ? params.gagal : undefined

  const today = todayISOString()
  const action = createExpenseAction.bind(null, null)

  return (
    <AppShell active="catat" title="Catat Pengeluaran" showBack backHref="/catat" width="default">
      <form action={action} className="slide-up pb-4 grid grid-roomy lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="section-stack min-w-0">

          <div
            className="ledger-receipt rounded-2xl px-5 py-4 flex items-center gap-3.5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--warn-bg) 0%, var(--bg-white) 100%)',
              border: '1px solid var(--warn-border)',
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 relative"
              style={{
                background: 'var(--bg-white)',
                boxShadow: '0 4px 12px rgba(245,158,11,0.18)',
              }}
            >
              <ReceiptText size={20} strokeWidth={2.4} color="var(--warn-text)" />
            </div>
            <div className="min-w-0 flex-1 relative">
              <p
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: 'var(--warn-text)', letterSpacing: '0.1em' }}
              >
                Uang Keluar
              </p>
              <p
                className="text-base font-extrabold mt-0.5 leading-tight"
                style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
              >
                Catat biaya produksi tahu
              </p>
              <p
                className="text-xs mt-0.5 leading-snug"
                style={{ color: 'var(--text-secondary)' }}
              >
                Isi jumlah dan harga, struk biaya langsung dihitung di samping.
              </p>
            </div>
          </div>

          {errorKey && (
            <ActionMessage variant="error" title="Catatan belum tersimpan">
              {EXPENSE_ERROR_MESSAGES[errorKey] ?? EXPENSE_ERROR_MESSAGES.simpan}
            </ActionMessage>
          )}

          <div className="section-stack">
            <div className="px-1">
              <p className="section-heading" style={{ color: 'var(--text-tertiary)' }}>
                Biaya cepat
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                Pilih biaya yang sering muncul, lalu ubah kalau angkanya berbeda.
              </p>
            </div>
            <ExpenseQuickActions />
          </div>

          {/* Tanggal & Kategori */}
          <FormSection
            title="Informasi Pengeluaran"
            description="Kapan dan kategori biayanya"
            icon={Calendar}
            accent="warn"
          >
            <div>
              <label htmlFor="expense-date" className="field-label">Tanggal</label>
              <input
                id="expense-date"
                name="date"
                type="date"
                defaultValue={today}
                required
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="expense-category" className="field-label">Kategori</label>
              <div className="relative">
                <Tag
                  size={14}
                  strokeWidth={2.25}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: 'var(--text-tertiary)' }}
                />
                <select
                  id="expense-category"
                  name="category"
                  required
                  className="input-field"
                  style={{ paddingLeft: '2.25rem' }}
                >
                  {EXPENSE_CATEGORY_OPTIONS.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </FormSection>

          {/* Detail */}
          <FormSection
            title="Detail Pengeluaran"
            description="Apa yang dibeli atau dikeluarkan"
            icon={Package}
            accent="warn"
          >
            <div>
              <label htmlFor="expense-name" className="field-label">Nama Pengeluaran</label>
              <input
                id="expense-name"
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
                <label htmlFor="expense-qty" className="field-label">Jumlah</label>
                <input
                  id="expense-qty"
                  name="quantity"
                  type="number"
                  inputMode="decimal"
                  min="0.01"
                  step="0.01"
                  required
                  defaultValue={1}
                  placeholder="1"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="expense-unit" className="field-label">Satuan</label>
                <select id="expense-unit" name="unit" className="input-field">
                  {UNITS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>
          </FormSection>

          {/* Harga */}
          <FormSection
            title="Harga"
            description="Harga per satuan, total dihitung otomatis"
            icon={Coins}
            accent="warn"
          >
            <div>
              <label htmlFor="expense-price" className="field-label">Harga Satuan</label>
              <div className="relative">
                <span
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold pointer-events-none"
                  style={{ color: 'var(--text-tertiary)' }}
                >Rp</span>
                <input
                  id="expense-price"
                  name="unit_price"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  required
                  placeholder="0"
                  className="input-field"
                  style={{ paddingLeft: '2.25rem' }}
                />
              </div>
            </div>

            {/* Cost-meaning helper — visible formula with semantic emphasis */}
            <div
              className="rounded-lg px-3 py-2.5 flex items-center gap-2.5"
              style={{
                background: 'var(--warn-bg)',
                border: '1px solid var(--warn-border)',
              }}
            >
              <Coins
                size={14}
                strokeWidth={2.5}
                style={{ color: 'var(--warn-text)' }}
                className="flex-shrink-0"
              />
              <p
                className="text-[11px] font-medium leading-snug"
                style={{ color: 'var(--warn-text)', fontVariantNumeric: 'tabular-nums' }}
              >
                Total biaya ={' '}
                <span className="font-bold">jumlah</span> ×{' '}
                <span className="font-bold">harga satuan</span>
              </p>
            </div>
          </FormSection>

          {/* Status */}
          <FormSection
            title="Status Data"
            description="Pilih sesuai keyakinan kamu pada angkanya"
            icon={ShieldCheck}
            accent="neutral"
          >
            <div>
              <label htmlFor="expense-status" className="field-label sr-only">Status Data</label>
              <select id="expense-status" name="confirmation_status" className="input-field">
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            {/* Status meanings — make options self-explanatory */}
            <ul className="space-y-1.5 mt-1">
              <li className="flex items-start gap-2 text-[11px] leading-snug">
                <span
                  className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: 'var(--profit)' }}
                />
                <span style={{ color: 'var(--text-secondary)' }}>
                  <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Aktual</span>{' '}
                  · sudah ada nota atau angkanya pasti
                </span>
              </li>
              <li className="flex items-start gap-2 text-[11px] leading-snug">
                <span
                  className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: 'var(--warn)' }}
                />
                <span style={{ color: 'var(--text-secondary)' }}>
                  <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Perkiraan</span>{' '}
                  · ngira-ngira berdasarkan biasanya
                </span>
              </li>
              <li className="flex items-start gap-2 text-[11px] leading-snug">
                <span
                  className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: 'var(--text-muted)' }}
                />
                <span style={{ color: 'var(--text-secondary)' }}>
                  <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Belum Dikonfirmasi</span>{' '}
                  · masih ragu, mau dicek lagi nanti
                </span>
              </li>
            </ul>
          </FormSection>

          {/* Catatan */}
          <FormSection
            title="Catatan"
            description="Tambah catatan kalau perlu (opsional)"
            icon={StickyNote}
            accent="neutral"
          >
            <div>
              <label htmlFor="expense-notes" className="field-label sr-only">Catatan</label>
              <input
                id="expense-notes"
                name="notes"
                type="text"
                placeholder="Catatan tambahan"
                className="input-field"
              />
            </div>
          </FormSection>

          {/* Tip — concrete real-world example */}
          <div
            className="rounded-xl p-3.5 flex items-start gap-2.5"
            style={{
              background: 'var(--warn-bg)',
              border: '1px solid var(--warn-border)',
            }}
          >
            <Info
              size={14}
              strokeWidth={2.25}
              className="flex-shrink-0 mt-0.5"
              style={{ color: 'var(--warn-text)' }}
            />
            <div className="min-w-0">
              <p className="text-xs font-bold leading-snug" style={{ color: 'var(--warn-text)' }}>
                Contoh nyata
              </p>
              <p
                className="text-xs leading-relaxed mt-0.5"
                style={{ color: 'var(--warn-text)', fontVariantNumeric: 'tabular-nums' }}
              >
                Kedelai 50 kg × Rp 10.900 ={' '}
                <span className="font-bold">Rp 545.000</span>
              </p>
            </div>
          </div>

          {/* Mobile-only submit (sticky preview lives below on mobile) */}
          <SubmitButton
            pendingLabel="Menyimpan pengeluaran..."
            className="btn-danger w-full lg:hidden"
            style={{ minHeight: '52px' }}
          >
            <TrendingDown size={16} strokeWidth={2.5} />
            Simpan Catatan Pengeluaran
          </SubmitButton>
        </div>

        {/* Sticky preview + submit (right column on desktop) */}
        <aside className="section-stack lg:sticky lg:top-20 h-fit min-w-0">
          <ExpenseFormPreview />
          <SubmitButton
            pendingLabel="Menyimpan pengeluaran..."
            className="btn-danger w-full hidden lg:inline-flex"
            style={{ minHeight: '52px' }}
          >
            <TrendingDown size={16} strokeWidth={2.5} />
            Simpan Catatan Pengeluaran
          </SubmitButton>
        </aside>

      </form>
    </AppShell>
  )
}
