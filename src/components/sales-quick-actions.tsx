'use client'

import { Banknote, CircleDollarSign, PackageCheck } from 'lucide-react'

function dispatchInput(element: HTMLInputElement) {
  element.dispatchEvent(new Event('input', { bubbles: true }))
  element.dispatchEvent(new Event('change', { bubbles: true }))
}

function getNumber(name: string, fallback = 0) {
  const input = document.querySelector<HTMLInputElement>(`input[name="${name}"]`)
  const value = Number(input?.value ?? fallback)
  return Number.isFinite(value) ? value : fallback
}

function setInput(name: string, value: number | string) {
  const input = document.querySelector<HTMLInputElement>(`input[name="${name}"]`)
  if (!input) return
  input.value = String(value)
  dispatchInput(input)
}

export default function SalesQuickActions() {
  const setPacks = (packs: number) => setInput('packs', packs)
  const setPaid = (mode: 'full' | 'none') => {
    const packs = getNumber('packs', 10) || 10
    const price = getNumber('price_per_pack', 6000)
    if (!getNumber('packs', 0)) setInput('packs', packs)
    setInput('amount_paid', mode === 'full' ? packs * price : 0)
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
      {[5, 10, 20].map((packs) => (
        <button
          key={packs}
          type="button"
          onClick={() => setPacks(packs)}
          className="btn-secondary"
          style={{ padding: '0.7rem 0.75rem', fontSize: '0.8125rem' }}
        >
          <PackageCheck size={14} strokeWidth={2.4} />
          {packs} bungkus
        </button>
      ))}
      <button
        type="button"
        onClick={() => setPaid('full')}
        className="btn-secondary"
        style={{ padding: '0.7rem 0.75rem', fontSize: '0.8125rem' }}
      >
        <Banknote size={14} strokeWidth={2.4} />
        Lunas
      </button>
      <button
        type="button"
        onClick={() => setPaid('none')}
        className="btn-secondary"
        style={{ padding: '0.7rem 0.75rem', fontSize: '0.8125rem' }}
      >
        <CircleDollarSign size={14} strokeWidth={2.4} />
        Belum bayar
      </button>
    </div>
  )
}
