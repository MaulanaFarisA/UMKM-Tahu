import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import SalesFormPreview from './sales-form-preview'

describe('SalesFormPreview', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders empty state when no form data exists', () => {
    render(<SalesFormPreview defaultPricePerPack={6000} />)
    expect(screen.getByText('Pratinjau Struk')).toBeTruthy()
    expect(screen.getByText('Isi jumlah bungkus untuk melihat ringkasan')).toBeTruthy()
  })

  it('shows dashed border in empty state', () => {
    const { container } = render(<SalesFormPreview defaultPricePerPack={6000} />)
    const emptyDiv = container.querySelector('[aria-live="polite"]')
    expect(emptyDiv?.className).toContain('rounded-2xl')
  })

  it('displays Receipt icon in empty state', () => {
    const { container } = render(<SalesFormPreview defaultPricePerPack={6000} />)
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
  })

  it('renders receipt header with Tahu product when form has data', () => {
    const form = document.createElement('form')
    const packsInput = document.createElement('input')
    packsInput.name = 'packs'
    packsInput.value = '10'
    const priceInput = document.createElement('input')
    priceInput.name = 'price_per_pack'
    priceInput.value = '6000'
    const paidInput = document.createElement('input')
    paidInput.name = 'amount_paid'
    paidInput.value = '0'
    form.appendChild(packsInput)
    form.appendChild(priceInput)
    form.appendChild(paidInput)
    document.body.appendChild(form)

    render(<SalesFormPreview defaultPricePerPack={6000} />)
    
    act(() => {
      packsInput.dispatchEvent(new Event('input', { bubbles: true }))
      priceInput.dispatchEvent(new Event('input', { bubbles: true }))
      paidInput.dispatchEvent(new Event('input', { bubbles: true }))
    })

    expect(screen.getByText('Struk Sementara')).toBeTruthy()
    expect(screen.getByText('Tahu')).toBeTruthy()
  })

  it('shows LUNAS status when fully paid', () => {
    const form = document.createElement('form')
    const packsInput = document.createElement('input')
    packsInput.name = 'packs'
    packsInput.value = '10'
    const priceInput = document.createElement('input')
    priceInput.name = 'price_per_pack'
    priceInput.value = '6000'
    const paidInput = document.createElement('input')
    paidInput.name = 'amount_paid'
    paidInput.value = '60000'
    form.appendChild(packsInput)
    form.appendChild(priceInput)
    form.appendChild(paidInput)
    document.body.appendChild(form)

    render(<SalesFormPreview defaultPricePerPack={6000} />)
    
    act(() => {
      packsInput.dispatchEvent(new Event('input', { bubbles: true }))
      priceInput.dispatchEvent(new Event('input', { bubbles: true }))
      paidInput.dispatchEvent(new Event('input', { bubbles: true }))
    })

    expect(screen.getByText('LUNAS')).toBeTruthy()
  })

  it('shows SEBAGIAN status when partially paid', () => {
    const form = document.createElement('form')
    const packsInput = document.createElement('input')
    packsInput.name = 'packs'
    packsInput.value = '10'
    const priceInput = document.createElement('input')
    priceInput.name = 'price_per_pack'
    priceInput.value = '6000'
    const paidInput = document.createElement('input')
    paidInput.name = 'amount_paid'
    paidInput.value = '30000'
    form.appendChild(packsInput)
    form.appendChild(priceInput)
    form.appendChild(paidInput)
    document.body.appendChild(form)

    render(<SalesFormPreview defaultPricePerPack={6000} />)
    
    act(() => {
      packsInput.dispatchEvent(new Event('input', { bubbles: true }))
      priceInput.dispatchEvent(new Event('input', { bubbles: true }))
      paidInput.dispatchEvent(new Event('input', { bubbles: true }))
    })

    expect(screen.getByText('SEBAGIAN')).toBeTruthy()
  })

  it('shows BELUM DIBAYAR status when unpaid', () => {
    const form = document.createElement('form')
    const packsInput = document.createElement('input')
    packsInput.name = 'packs'
    packsInput.value = '10'
    const priceInput = document.createElement('input')
    priceInput.name = 'price_per_pack'
    priceInput.value = '6000'
    const paidInput = document.createElement('input')
    paidInput.name = 'amount_paid'
    paidInput.value = '0'
    form.appendChild(packsInput)
    form.appendChild(priceInput)
    form.appendChild(paidInput)
    document.body.appendChild(form)

    render(<SalesFormPreview defaultPricePerPack={6000} />)
    
    act(() => {
      packsInput.dispatchEvent(new Event('input', { bubbles: true }))
      priceInput.dispatchEvent(new Event('input', { bubbles: true }))
      paidInput.dispatchEvent(new Event('input', { bubbles: true }))
    })

    expect(screen.getByText('BELUM DIBAYAR')).toBeTruthy()
  })

  it('handles zero values gracefully by showing empty state', () => {
    const form = document.createElement('form')
    const packsInput = document.createElement('input')
    packsInput.name = 'packs'
    packsInput.value = '0'
    const priceInput = document.createElement('input')
    priceInput.name = 'price_per_pack'
    priceInput.value = '0'
    const paidInput = document.createElement('input')
    paidInput.name = 'amount_paid'
    paidInput.value = '0'
    form.appendChild(packsInput)
    form.appendChild(priceInput)
    form.appendChild(paidInput)
    document.body.appendChild(form)

    render(<SalesFormPreview defaultPricePerPack={6000} />)
    
    act(() => {
      packsInput.dispatchEvent(new Event('input', { bubbles: true }))
      priceInput.dispatchEvent(new Event('input', { bubbles: true }))
      paidInput.dispatchEvent(new Event('input', { bubbles: true }))
    })

    expect(screen.getByText('Pratinjau Struk')).toBeTruthy()
  })

  it('displays total area with Rupiah formatting', () => {
    const form = document.createElement('form')
    const packsInput = document.createElement('input')
    packsInput.name = 'packs'
    packsInput.value = '5'
    const priceInput = document.createElement('input')
    priceInput.name = 'price_per_pack'
    priceInput.value = '6000'
    const paidInput = document.createElement('input')
    paidInput.name = 'amount_paid'
    paidInput.value = '0'
    form.appendChild(packsInput)
    form.appendChild(priceInput)
    form.appendChild(paidInput)
    document.body.appendChild(form)

    render(<SalesFormPreview defaultPricePerPack={6000} />)
    
    act(() => {
      packsInput.dispatchEvent(new Event('input', { bubbles: true }))
      priceInput.dispatchEvent(new Event('input', { bubbles: true }))
      paidInput.dispatchEvent(new Event('input', { bubbles: true }))
    })

    expect(screen.getByText('Total Penjualan')).toBeTruthy()
    const totalElements = screen.getAllByText(/Rp 30/)
    expect(totalElements.length).toBeGreaterThan(0)
  })
})
