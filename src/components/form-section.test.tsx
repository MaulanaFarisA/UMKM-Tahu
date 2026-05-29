import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FormSection from './form-section'
import { Package } from 'lucide-react'

describe('FormSection', () => {
  describe('title rendering', () => {
    it('renders title text', () => {
      render(<FormSection title="Pembeli">Content</FormSection>)
      expect(screen.getByText('Pembeli')).toBeTruthy()
    })

    it('renders title with custom text', () => {
      render(<FormSection title="Jumlah Penjualan">Content</FormSection>)
      expect(screen.getByText('Jumlah Penjualan')).toBeTruthy()
    })
  })

  describe('children rendering', () => {
    it('renders children content', () => {
      render(
        <FormSection title="Pembeli">
          <input type="text" placeholder="Nama pembeli" />
        </FormSection>
      )
      expect(screen.getByPlaceholderText('Nama pembeli')).toBeTruthy()
    })

    it('renders multiple children elements', () => {
      render(
        <FormSection title="Pembeli">
          <label>Nama</label>
          <input type="text" />
          <label>Alamat</label>
          <input type="text" />
        </FormSection>
      )
      expect(screen.getByText('Nama')).toBeTruthy()
      expect(screen.getByText('Alamat')).toBeTruthy()
    })

    it('renders children with JSX content', () => {
      render(
        <FormSection title="Pembeli">
          <div>
            <p>Informasi pembeli</p>
          </div>
        </FormSection>
      )
      expect(screen.getByText('Informasi pembeli')).toBeTruthy()
    })
  })

  describe('icon rendering', () => {
    it('renders icon when provided', () => {
      const { container } = render(
        <FormSection title="Pembeli" icon={Package}>
          Content
        </FormSection>
      )
      const svg = container.querySelector('svg')
      expect(svg).toBeTruthy()
    })

    it('does not render icon when not provided', () => {
      const { container } = render(
        <FormSection title="Pembeli">
          Content
        </FormSection>
      )
      const svg = container.querySelector('svg')
      expect(svg).toBeFalsy()
    })

    it('renders icon with correct size', () => {
      const { container } = render(
        <FormSection title="Pembeli" icon={Package}>
          Content
        </FormSection>
      )
      const svg = container.querySelector('svg')
      expect(svg?.getAttribute('width')).toBe('15')
      expect(svg?.getAttribute('height')).toBe('15')
    })
  })

  describe('styling', () => {
    it('applies card class', () => {
      const { container } = render(
        <FormSection title="Pembeli">Content</FormSection>
      )
      const card = container.firstChild as HTMLElement
      expect(card.className).toContain('card')
    })

    it('applies custom className', () => {
      const { container } = render(
        <FormSection title="Pembeli" className="custom-class">
          Content
        </FormSection>
      )
      const card = container.firstChild as HTMLElement
      expect(card.className).toContain('custom-class')
    })
  })

  describe('layout structure', () => {
    it('renders header with flex layout', () => {
      const { container } = render(
        <FormSection title="Pembeli" icon={Package}>
          Content
        </FormSection>
      )
      const header = container.querySelector('header')
      expect(header).toBeTruthy()
      expect(header?.className).toContain('flex')
    })

    it('renders title element', () => {
      const { container } = render(
        <FormSection title="Pembeli">Content</FormSection>
      )
      const title = container.querySelector('h2')
      expect(title).toBeTruthy()
      expect(title?.textContent).toBe('Pembeli')
    })
  })

  describe('complete form section', () => {
    it('renders title, icon, and children together', () => {
      render(
        <FormSection title="Pembeli" icon={Package}>
          <input type="text" placeholder="Nama pembeli" />
        </FormSection>
      )
      expect(screen.getByText('Pembeli')).toBeTruthy()
      expect(screen.getByPlaceholderText('Nama pembeli')).toBeTruthy()
    })

    it('renders with custom className and all content', () => {
      const { container } = render(
        <FormSection title="Jumlah" icon={Package} className="mt-4">
          <input type="number" placeholder="Jumlah bungkus" />
        </FormSection>
      )
      expect(screen.getByText('Jumlah')).toBeTruthy()
      expect(screen.getByPlaceholderText('Jumlah bungkus')).toBeTruthy()
      expect((container.firstChild as HTMLElement).className).toContain('mt-4')
    })
  })
})
