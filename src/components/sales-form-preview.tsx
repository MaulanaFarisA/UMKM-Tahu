'use client'

import { useState, useEffect } from 'react'
import { ShoppingBag, CheckCircle2, CircleDollarSign, Receipt, User } from 'lucide-react'

function formatRp(amount: number): string {
  if (!Number.isFinite(amount)) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDateID(d: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(d)
}

interface SalesFormPreviewProps {
  defaultPricePerPack: number
}

export default function SalesFormPreview({ defaultPricePerPack }: SalesFormPreviewProps) {
  const [packs, setPacks] = useState(0)
  const [pricePerPack, setPricePerPack] = useState(defaultPricePerPack)
  const [amountPaid, setAmountPaid] = useState(0)
  const [customerName, setCustomerName] = useState('')
  const [todayLabel, setTodayLabel] = useState('')

  // Compute date on mount to avoid hydration mismatch
  useEffect(() => {
    setTodayLabel(formatDateID(new Date()))
  }, [])

  const safePacks = Number.isFinite(packs) && packs > 0 ? packs : 0
  const safePrice = Number.isFinite(pricePerPack) && pricePerPack > 0 ? pricePerPack : 0
  const safePaid = Number.isFinite(amountPaid) && amountPaid >= 0 ? amountPaid : 0
  const trimmedCustomer = customerName.trim()

  const totalSales = safePacks * safePrice
  const remaining = Math.max(0, totalSales - safePaid)
  const paidApplied = Math.min(safePaid, totalSales)
  const isFullyPaid = totalSales > 0 && remaining === 0
  const isPartial = totalSales > 0 && safePaid > 0 && remaining > 0
  const hasData = totalSales > 0

  useEffect(() => {
    // Inputs are queried directly from document. Next 15 / React 19 renders
    // an extra hidden wrapper <form> for server actions, so scoping to the
    // first <form> would miss the visible inputs.
    const packsInput = document.querySelector<HTMLInputElement>('input[name="packs"]')
    const priceInput = document.querySelector<HTMLInputElement>('input[name="price_per_pack"]')
    const paidInput = document.querySelector<HTMLInputElement>('input[name="amount_paid"]')
    const customerInput = document.querySelector<HTMLInputElement>('input[name="customer_name"]')
    if (!packsInput && !priceInput && !paidInput && !customerInput) return

    const handlePacksChange = () => setPacks(Number(packsInput?.value ?? 0))
    const handlePriceChange = () => setPricePerPack(Number(priceInput?.value ?? defaultPricePerPack))
    const handlePaidChange = () => setAmountPaid(Number(paidInput?.value ?? 0))
    const handleCustomerChange = () => setCustomerName(customerInput?.value ?? '')

    packsInput?.addEventListener('input', handlePacksChange)
    priceInput?.addEventListener('input', handlePriceChange)
    paidInput?.addEventListener('input', handlePaidChange)
    customerInput?.addEventListener('input', handleCustomerChange)

    // Sync once on mount in case fields already have values (e.g. defaultValue)
    if (priceInput) handlePriceChange()
    if (customerInput) handleCustomerChange()

    return () => {
      packsInput?.removeEventListener('input', handlePacksChange)
      priceInput?.removeEventListener('input', handlePriceChange)
      paidInput?.removeEventListener('input', handlePaidChange)
      customerInput?.removeEventListener('input', handleCustomerChange)
    }
  }, [defaultPricePerPack])

  // Empty state — keep familiar dashed-receipt look, but reflect customer name if typed
  if (!hasData) {
    return (
      <div
        className="ledger-receipt rounded-2xl p-5 flex items-center gap-3"
        style={{
          background: 'var(--bg-subtle)',
          borderTop: '1.5px dashed var(--border-strong)',
          borderRight: '1.5px dashed var(--border-strong)',
          borderBottom: '1.5px dashed var(--border-strong)',
          borderLeft: '1.5px dashed var(--border-strong)',
        }}
        aria-live="polite"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--bg-muted)' }}
        >
          <Receipt size={18} strokeWidth={2} color="var(--text-tertiary)" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Pratinjau Struk
          </p>
          {trimmedCustomer ? (
            <p
              className="text-xs mt-0.5 truncate"
              style={{ color: 'var(--text-secondary)' }}
            >
              Pembeli: <span className="font-semibold">{trimmedCustomer}</span>
            </p>
          ) : (
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
              Isi jumlah bungkus untuk melihat ringkasan
            </p>
          )}
        </div>
      </div>
    )
  }

  // Status palette
  const statusColor = isFullyPaid
    ? { fg: 'var(--profit-text)', bg: 'var(--profit-bg)', border: 'var(--profit-border)', dot: 'var(--profit)' }
    : isPartial
    ? { fg: 'var(--warn-text)', bg: 'var(--warn-bg-deep)', border: 'var(--warn-border)', dot: 'var(--warn)' }
    : { fg: 'var(--loss-text)', bg: 'var(--loss-bg)', border: 'var(--loss-border)', dot: 'var(--loss)' }

  const statusLabel = isFullyPaid ? 'LUNAS' : isPartial ? 'SEBAGIAN' : 'BELUM DIBAYAR'

  return (
    <div
      className="ledger-receipt"
      style={{
        background: 'var(--bg-white)',
        borderTop: '1px solid var(--border)',
        borderRight: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        borderLeft: '3px solid var(--profit)',
        boxShadow: 'var(--shadow-md)',
      }}
      aria-live="polite"
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-start justify-between gap-3"
        style={{
          background: 'linear-gradient(135deg, var(--profit-bg) 0%, rgba(255,255,255,0) 100%)',
          borderBottom: '1px dashed var(--border)',
        }}
      >
        <div className="min-w-0">
          <p className="section-heading" style={{ color: 'var(--profit-text)' }}>Pratinjau · Penjualan</p>
          <p className="text-base font-bold mt-0.5" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Struk Sementara
          </p>
          {trimmedCustomer && (
            <p
              className="text-xs font-semibold mt-1 flex items-center gap-1 truncate"
              style={{ color: 'var(--text-secondary)' }}
            >
              <User size={11} strokeWidth={2.5} color="var(--profit)" className="flex-shrink-0" />
              <span className="truncate">{trimmedCustomer}</span>
            </p>
          )}
        </div>
        {todayLabel && (
          <div className="text-right flex-shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
              Hari ini
            </p>
            <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              {todayLabel}
            </p>
          </div>
        )}
      </div>

      {/* Line items */}
      <div className="px-5 py-4 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <ShoppingBag size={13} strokeWidth={2.5} color="var(--profit)" className="flex-shrink-0" />
              <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Tahu</p>
            </div>
            <p className="text-xs mt-1 font-medium" style={{ color: 'var(--text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>
              {safePacks.toLocaleString('id-ID')} bungkus × {formatRp(safePrice)}
            </p>
          </div>
          <p className="money-xs flex-shrink-0" style={{ color: 'var(--text-primary)' }}>
            {formatRp(totalSales)}
          </p>
        </div>
      </div>

      {/* Dashed divider */}
      <div
        className="mx-5"
        style={{
          height: '1px',
          backgroundImage: 'repeating-linear-gradient(90deg, var(--border-strong) 0 6px, transparent 6px 12px)',
        }}
      />

      {/* Total block */}
      <div className="px-5 py-4">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="section-heading" style={{ color: 'var(--text-tertiary)' }}>Total Penjualan</p>
            <p className="money-lg mt-1" style={{ color: 'var(--profit-text)' }}>
              {formatRp(totalSales)}
            </p>
          </div>
          <span
            className="stamp-badge flex-shrink-0"
            style={{
              background: statusColor.bg,
              color: statusColor.fg,
              border: `1px solid ${statusColor.border}`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: statusColor.dot }}
            />
            <span className="text-[10px] font-bold tracking-wider">{statusLabel}</span>
          </span>
        </div>
      </div>

      {/* Payment breakdown — shown when there's any payment activity */}
      {(safePaid > 0 || remaining > 0) && (
        <>
          <div
            className="mx-5"
            style={{
              height: '1px',
              backgroundImage: 'repeating-linear-gradient(90deg, var(--border) 0 6px, transparent 6px 12px)',
            }}
          />
          <div className="px-5 py-3 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle2 size={12} strokeWidth={2.5} color="var(--profit)" className="flex-shrink-0" />
                <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Dibayar</p>
              </div>
              <p className="text-xs font-bold flex-shrink-0" style={{ color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                {formatRp(paidApplied)}
              </p>
            </div>
            {remaining > 0 && (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <CircleDollarSign size={12} strokeWidth={2.5} color="var(--warn)" className="flex-shrink-0" />
                  <p className="text-xs font-semibold" style={{ color: 'var(--warn-text)' }}>Sisa Tagihan</p>
                </div>
                <p className="text-xs font-bold flex-shrink-0" style={{ color: 'var(--warn-text)', fontVariantNumeric: 'tabular-nums' }}>
                  {formatRp(remaining)}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Tagihan note */}
      {remaining > 0 && (
        <div
          className="mx-5 mb-4 px-3 py-2 rounded-lg flex items-start gap-2"
          style={{
            background: 'var(--warn-bg)',
            border: '1px solid var(--warn-border)',
          }}
        >
          <CircleDollarSign size={12} strokeWidth={2.5} color="var(--warn)" className="flex-shrink-0 mt-0.5" />
          <p className="text-[11px] font-medium leading-snug" style={{ color: 'var(--warn-text)' }}>
            Sisa <span className="font-bold" style={{ fontVariantNumeric: 'tabular-nums' }}>{formatRp(remaining)}</span> otomatis tercatat sebagai tagihan.
          </p>
        </div>
      )}
    </div>
  )
}
