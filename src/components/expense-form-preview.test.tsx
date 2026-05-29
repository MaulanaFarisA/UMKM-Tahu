import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import ExpenseFormPreview from './expense-form-preview'

describe('ExpenseFormPreview', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders empty state when no form data exists', () => {
    render(<ExpenseFormPreview />)
    expect(screen.getByText('Pratinjau Struk')).toBeTruthy()
    expect(screen.getByText('Isi jumlah & harga satuan untuk melihat total')).toBeTruthy()
  })

  it('shows dashed border in empty state', () => {
    const { container } = render(<ExpenseFormPreview />)
    const emptyDiv = container.querySelector('[aria-live="polite"]')
    expect(emptyDiv?.className).toContain('rounded-2xl')
  })

  it('displays Calculator icon in empty state', () => {
    const { container } = render(<ExpenseFormPreview />)
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
  })

  it('renders receipt header with item name when form has data', () => {
    const form = document.createElement('form')
    const qtyInput = document.createElement('input')
    qtyInput.name = 'quantity'
    qtyInput.value = '5'
    const priceInput = document.createElement('input')
    priceInput.name = 'unit_price'
    priceInput.value = '10000'
    const unitInput = document.createElement('select')
    unitInput.name = 'unit'
    unitInput.value = 'kg'
    const nameInput = document.createElement('input')
    nameInput.name = 'item_name'
    nameInput.value = 'Kedelai'
    const catInput = document.createElement('select')
    catInput.name = 'category'
    const rawMaterialOption = document.createElement('option')
    rawMaterialOption.value = 'raw_material'
    rawMaterialOption.textContent = 'Bahan Baku'
    catInput.appendChild(rawMaterialOption)
    catInput.value = 'raw_material'
    form.appendChild(qtyInput)
    form.appendChild(priceInput)
    form.appendChild(unitInput)
    form.appendChild(nameInput)
    form.appendChild(catInput)
    document.body.appendChild(form)

    render(<ExpenseFormPreview />)
    
    act(() => {
      qtyInput.dispatchEvent(new Event('input', { bubbles: true }))
      priceInput.dispatchEvent(new Event('input', { bubbles: true }))
      unitInput.dispatchEvent(new Event('change', { bubbles: true }))
      nameInput.dispatchEvent(new Event('input', { bubbles: true }))
      catInput.dispatchEvent(new Event('change', { bubbles: true }))
    })

    expect(screen.getByText('Struk Sementara')).toBeTruthy()
    expect(screen.getByText('Kedelai')).toBeTruthy()
  })

  it('displays total with minus prefix for expense', () => {
    const form = document.createElement('form')
    const qtyInput = document.createElement('input')
    qtyInput.name = 'quantity'
    qtyInput.value = '5'
    const priceInput = document.createElement('input')
    priceInput.name = 'unit_price'
    priceInput.value = '10000'
    const unitInput = document.createElement('select')
    unitInput.name = 'unit'
    unitInput.value = 'kg'
    const nameInput = document.createElement('input')
    nameInput.name = 'item_name'
    nameInput.value = 'Kedelai'
    const catInput = document.createElement('select')
    catInput.name = 'category'
    const rawMaterialOption = document.createElement('option')
    rawMaterialOption.value = 'raw_material'
    rawMaterialOption.textContent = 'Bahan Baku'
    catInput.appendChild(rawMaterialOption)
    catInput.value = 'raw_material'
    form.appendChild(qtyInput)
    form.appendChild(priceInput)
    form.appendChild(unitInput)
    form.appendChild(nameInput)
    form.appendChild(catInput)
    document.body.appendChild(form)

    render(<ExpenseFormPreview />)
    
    act(() => {
      qtyInput.dispatchEvent(new Event('input', { bubbles: true }))
      priceInput.dispatchEvent(new Event('input', { bubbles: true }))
      unitInput.dispatchEvent(new Event('change', { bubbles: true }))
      nameInput.dispatchEvent(new Event('input', { bubbles: true }))
      catInput.dispatchEvent(new Event('change', { bubbles: true }))
    })

    expect(screen.getByText(/−Rp 50/)).toBeTruthy()
  })

  it('shows category badge for raw_material', () => {
    const form = document.createElement('form')
    const qtyInput = document.createElement('input')
    qtyInput.name = 'quantity'
    qtyInput.value = '5'
    const priceInput = document.createElement('input')
    priceInput.name = 'unit_price'
    priceInput.value = '10000'
    const unitInput = document.createElement('select')
    unitInput.name = 'unit'
    unitInput.value = 'kg'
    const nameInput = document.createElement('input')
    nameInput.name = 'item_name'
    nameInput.value = 'Kedelai'
    const catInput = document.createElement('select')
    catInput.name = 'category'
    catInput.innerHTML = '<option value="raw_material">Bahan Baku</option>'
    catInput.value = 'raw_material'
    form.appendChild(qtyInput)
    form.appendChild(priceInput)
    form.appendChild(unitInput)
    form.appendChild(nameInput)
    form.appendChild(catInput)
    document.body.appendChild(form)

    const { container } = render(<ExpenseFormPreview />)
    
    act(() => {
      qtyInput.dispatchEvent(new Event('input', { bubbles: true }))
      priceInput.dispatchEvent(new Event('input', { bubbles: true }))
      unitInput.dispatchEvent(new Event('change', { bubbles: true }))
      nameInput.dispatchEvent(new Event('input', { bubbles: true }))
      catInput.dispatchEvent(new Event('change', { bubbles: true }))
    })

    expect(screen.getByText('Struk Sementara')).toBeTruthy()
    const badge = container.querySelector('[class*="rounded-full"]')
    expect(badge).toBeTruthy()
  })

  it('shows category badge for production', () => {
    const form = document.createElement('form')
    const qtyInput = document.createElement('input')
    qtyInput.name = 'quantity'
    qtyInput.value = '1'
    const priceInput = document.createElement('input')
    priceInput.name = 'unit_price'
    priceInput.value = '5000'
    const unitInput = document.createElement('select')
    unitInput.name = 'unit'
    unitInput.value = 'item'
    const nameInput = document.createElement('input')
    nameInput.name = 'item_name'
    nameInput.value = 'Kayu bakar'
    const catInput = document.createElement('select')
    catInput.name = 'category'
    catInput.value = 'production'
    form.appendChild(qtyInput)
    form.appendChild(priceInput)
    form.appendChild(unitInput)
    form.appendChild(nameInput)
    form.appendChild(catInput)
    document.body.appendChild(form)

    const { container } = render(<ExpenseFormPreview />)
    
    act(() => {
      qtyInput.dispatchEvent(new Event('input', { bubbles: true }))
      priceInput.dispatchEvent(new Event('input', { bubbles: true }))
      unitInput.dispatchEvent(new Event('change', { bubbles: true }))
      nameInput.dispatchEvent(new Event('input', { bubbles: true }))
      catInput.dispatchEvent(new Event('change', { bubbles: true }))
    })

    expect(screen.getByText('Kayu bakar')).toBeTruthy()
    const badge = container.querySelector('[class*="rounded-full"]')
    expect(badge).toBeTruthy()
  })

  it('shows UANG KELUAR status pill', () => {
    const form = document.createElement('form')
    const qtyInput = document.createElement('input')
    qtyInput.name = 'quantity'
    qtyInput.value = '5'
    const priceInput = document.createElement('input')
    priceInput.name = 'unit_price'
    priceInput.value = '10000'
    const unitInput = document.createElement('select')
    unitInput.name = 'unit'
    unitInput.value = 'kg'
    const nameInput = document.createElement('input')
    nameInput.name = 'item_name'
    nameInput.value = 'Kedelai'
    const catInput = document.createElement('select')
    catInput.name = 'category'
    catInput.innerHTML = '<option value="raw_material">Bahan Baku</option>'
    catInput.value = 'raw_material'
    form.appendChild(qtyInput)
    form.appendChild(priceInput)
    form.appendChild(unitInput)
    form.appendChild(nameInput)
    form.appendChild(catInput)
    document.body.appendChild(form)

    render(<ExpenseFormPreview />)
    
    act(() => {
      qtyInput.dispatchEvent(new Event('input', { bubbles: true }))
      priceInput.dispatchEvent(new Event('input', { bubbles: true }))
      unitInput.dispatchEvent(new Event('change', { bubbles: true }))
      nameInput.dispatchEvent(new Event('input', { bubbles: true }))
      catInput.dispatchEvent(new Event('change', { bubbles: true }))
    })

    expect(screen.getByText('UANG KELUAR')).toBeTruthy()
  })

  it('falls back to "Pengeluaran" when item name is empty', () => {
    const form = document.createElement('form')
    const qtyInput = document.createElement('input')
    qtyInput.name = 'quantity'
    qtyInput.value = '5'
    const priceInput = document.createElement('input')
    priceInput.name = 'unit_price'
    priceInput.value = '10000'
    const unitInput = document.createElement('select')
    unitInput.name = 'unit'
    unitInput.value = 'item'
    const nameInput = document.createElement('input')
    nameInput.name = 'item_name'
    nameInput.value = ''
    const catInput = document.createElement('select')
    catInput.name = 'category'
    catInput.value = 'other'
    form.appendChild(qtyInput)
    form.appendChild(priceInput)
    form.appendChild(unitInput)
    form.appendChild(nameInput)
    form.appendChild(catInput)
    document.body.appendChild(form)

    render(<ExpenseFormPreview />)
    
    act(() => {
      qtyInput.dispatchEvent(new Event('input', { bubbles: true }))
      priceInput.dispatchEvent(new Event('input', { bubbles: true }))
      unitInput.dispatchEvent(new Event('change', { bubbles: true }))
      nameInput.dispatchEvent(new Event('input', { bubbles: true }))
      catInput.dispatchEvent(new Event('change', { bubbles: true }))
    })

    expect(screen.getByText('Pengeluaran')).toBeTruthy()
  })

  it('handles zero values gracefully by showing empty state', () => {
    const form = document.createElement('form')
    const qtyInput = document.createElement('input')
    qtyInput.name = 'quantity'
    qtyInput.value = '0'
    const priceInput = document.createElement('input')
    priceInput.name = 'unit_price'
    priceInput.value = '0'
    const unitInput = document.createElement('select')
    unitInput.name = 'unit'
    unitInput.value = 'item'
    const nameInput = document.createElement('input')
    nameInput.name = 'item_name'
    nameInput.value = 'Test'
    const catInput = document.createElement('select')
    catInput.name = 'category'
    catInput.value = 'other'
    form.appendChild(qtyInput)
    form.appendChild(priceInput)
    form.appendChild(unitInput)
    form.appendChild(nameInput)
    form.appendChild(catInput)
    document.body.appendChild(form)

    render(<ExpenseFormPreview />)
    
    act(() => {
      qtyInput.dispatchEvent(new Event('input', { bubbles: true }))
      priceInput.dispatchEvent(new Event('input', { bubbles: true }))
      unitInput.dispatchEvent(new Event('change', { bubbles: true }))
      nameInput.dispatchEvent(new Event('input', { bubbles: true }))
      catInput.dispatchEvent(new Event('change', { bubbles: true }))
    })

    expect(screen.getByText('Pratinjau Struk')).toBeTruthy()
  })

  it('displays total area with Rupiah formatting', () => {
    const form = document.createElement('form')
    const qtyInput = document.createElement('input')
    qtyInput.name = 'quantity'
    qtyInput.value = '10'
    const priceInput = document.createElement('input')
    priceInput.name = 'unit_price'
    priceInput.value = '5000'
    const unitInput = document.createElement('select')
    unitInput.name = 'unit'
    unitInput.value = 'item'
    const nameInput = document.createElement('input')
    nameInput.name = 'item_name'
    nameInput.value = 'Plastik'
    const catInput = document.createElement('select')
    catInput.name = 'category'
    catInput.value = 'other'
    form.appendChild(qtyInput)
    form.appendChild(priceInput)
    form.appendChild(unitInput)
    form.appendChild(nameInput)
    form.appendChild(catInput)
    document.body.appendChild(form)

    render(<ExpenseFormPreview />)
    
    act(() => {
      qtyInput.dispatchEvent(new Event('input', { bubbles: true }))
      priceInput.dispatchEvent(new Event('input', { bubbles: true }))
      unitInput.dispatchEvent(new Event('change', { bubbles: true }))
      nameInput.dispatchEvent(new Event('input', { bubbles: true }))
      catInput.dispatchEvent(new Event('change', { bubbles: true }))
    })

    expect(screen.getByText('Total Pengeluaran')).toBeTruthy()
    const totalElements = screen.getAllByText(/−Rp 50/)
    expect(totalElements.length).toBeGreaterThan(0)
  })

  it('shows newest workbook Kedelai total in the live preview', () => {
    const form = document.createElement('form')
    const qtyInput = document.createElement('input')
    qtyInput.name = 'quantity'
    qtyInput.value = '50'
    const priceInput = document.createElement('input')
    priceInput.name = 'unit_price'
    priceInput.value = '10900'
    const unitInput = document.createElement('select')
    unitInput.name = 'unit'
    unitInput.value = 'kg'
    const nameInput = document.createElement('input')
    nameInput.name = 'item_name'
    nameInput.value = 'Kedelai'
    const catInput = document.createElement('select')
    catInput.name = 'category'
    catInput.appendChild(new Option('Bahan Baku', 'raw_material'))
    catInput.value = 'raw_material'
    form.appendChild(qtyInput)
    form.appendChild(priceInput)
    form.appendChild(unitInput)
    form.appendChild(nameInput)
    form.appendChild(catInput)
    document.body.appendChild(form)

    render(<ExpenseFormPreview />)

    act(() => {
      qtyInput.dispatchEvent(new Event('input', { bubbles: true }))
      priceInput.dispatchEvent(new Event('input', { bubbles: true }))
      unitInput.dispatchEvent(new Event('change', { bubbles: true }))
      nameInput.dispatchEvent(new Event('input', { bubbles: true }))
      catInput.dispatchEvent(new Event('change', { bubbles: true }))
    })

    expect(screen.getByText('Kedelai')).toBeTruthy()
    expect(screen.getAllByText('Bahan Baku').length).toBeGreaterThan(0)
    expect(screen.getAllByText((text) => text.includes('50') && text.includes('Rp') && text.includes('10.900')).length).toBeGreaterThan(0)
    expect(screen.getAllByText((text) => text.includes('Rp') && text.includes('545.000')).length).toBeGreaterThan(0)
  })
})
