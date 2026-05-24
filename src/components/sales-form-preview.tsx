'use client'

import { useState, useEffect } from 'react'
import { ShoppingBag, CircleDollarSign, CheckCircle } from 'lucide-react'

function formatRp(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

interface SalesFormPreviewProps {
  defaultPricePerPack: number
}

export default function SalesFormPreview({ defaultPricePerPack }: SalesFormPreviewProps) {
  const [packs, setPacks] = useState(0)
  const [pricePerPack, setPricePerPack] = useState(defaultPricePerPack)
  const [amountPaid, setAmountPaid] = useState(0)

  const totalSales = packs * pricePerPack
  const remaining = Math.max(0, totalSales - amountPaid)
  const isFullyPaid = totalSales > 0 && remaining === 0
  const hasData = totalSales > 0

  useEffect(() => {
    // Sync with form inputs via DOM events
    const form = document.querySelector('form')
    if (!form) return

    const packsInput = form.querySelector<HTMLInputElement>('[name="packs"]')
    const priceInput = form.querySelector<HTMLInputElement>('[name="price_per_pack"]')
    const paidInput = form.querySelector<HTMLInputElement>('[name="amount_paid"]')

    const handlePacksChange = () => setPacks(Number(packsInput?.value ?? 0))
    const handlePriceChange = () => setPricePerPack(Number(priceInput?.value ?? defaultPricePerPack))
    const handlePaidChange = () => setAmountPaid(Number(paidInput?.value ?? 0))

    packsInput?.addEventListener('input', handlePacksChange)
    priceInput?.addEventListener('input', handlePriceChange)
    paidInput?.addEventListener('input', handlePaidChange)

    return () => {
      packsInput?.removeEventListener('input', handlePacksChange)
      priceInput?.removeEventListener('input', handlePriceChange)
      paidInput?.removeEventListener('input', handlePaidChange)
    }
  }, [defaultPricePerPack])

  if (!hasData) {
    return (
      <div
        className="rounded-2xl p-4 flex items-center gap-3"
        style={{ backgroundColor: '#F5F4F0', border: '1px solid #E8E5DF' }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: '#EEECE8' }}
        >
          <ShoppingBag size={16} strokeWidth={2} color="#9C9690" />
        </div>
        <p className="text-sm" style={{ color: '#9C9690' }}>
          Isi jumlah bungkus untuk melihat ringkasan
        </p>
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl p-4 space-y-3"
      style={{
        background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
        border: '1.5px solid #C4B5FD',
      }}
    >
      <p className="section-heading" style={{ color: '#5B21B6' }}>Ringkasan Transaksi</p>

      <div className="grid grid-cols-2 gap-3">
        <div
          className="rounded-xl p-3"
          style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: '#7C3AED' }}>
            {packs} bungkus × {formatRp(pricePerPack)}
          </p>
          <p className="money-sm" style={{ color: '#1A1714' }}>
            {formatRp(totalSales)}
          </p>
          <p className="text-xs mt-0.5" style={{ color: '#9C9690' }}>Total penjualan</p>
        </div>

        <div
          className="rounded-xl p-3"
          style={{
            backgroundColor: isFullyPaid ? 'rgba(236,253,245,0.9)' : remaining > 0 ? 'rgba(255,251,235,0.9)' : 'rgba(255,255,255,0.7)',
          }}
        >
          {isFullyPaid ? (
            <>
              <div className="flex items-center gap-1 mb-1">
                <CheckCircle size={11} strokeWidth={2.5} color="#059669" />
                <p className="text-xs font-semibold" style={{ color: '#059669' }}>Lunas</p>
              </div>
              <p className="money-sm" style={{ color: '#059669' }}>{formatRp(0)}</p>
              <p className="text-xs mt-0.5" style={{ color: '#059669' }}>Sisa tagihan</p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1 mb-1">
                <CircleDollarSign size={11} strokeWidth={2} color="#D97706" />
                <p className="text-xs font-semibold" style={{ color: '#D97706' }}>Belum lunas</p>
              </div>
              <p className="money-sm" style={{ color: '#D97706' }}>{formatRp(remaining)}</p>
              <p className="text-xs mt-0.5" style={{ color: '#9C9690' }}>Masuk ke Tagihan</p>
            </>
          )}
        </div>
      </div>

      {remaining > 0 && (
        <p className="text-xs font-medium" style={{ color: '#5B21B6' }}>
          Sisa {formatRp(remaining)} akan otomatis tercatat sebagai tagihan.
        </p>
      )}
    </div>
  )
}
