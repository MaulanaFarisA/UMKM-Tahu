import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import InfoBanner from './info-banner'

describe('InfoBanner', () => {
  describe('info variant', () => {
    it('renders info variant with correct text', () => {
      render(<InfoBanner variant="info">Ini adalah informasi penting</InfoBanner>)
      expect(screen.getByText('Ini adalah informasi penting')).toBeTruthy()
    })

    it('renders info icon for info variant', () => {
      const { container } = render(<InfoBanner variant="info">Info message</InfoBanner>)
      const svg = container.querySelector('svg')
      expect(svg).toBeTruthy()
    })
  })

  describe('warn variant', () => {
    it('renders warn variant with correct text', () => {
      render(<InfoBanner variant="warn">Perhatian: data belum lengkap</InfoBanner>)
      expect(screen.getByText('Perhatian: data belum lengkap')).toBeTruthy()
    })

    it('renders warn icon for warn variant', () => {
      const { container } = render(<InfoBanner variant="warn">Warning message</InfoBanner>)
      const svg = container.querySelector('svg')
      expect(svg).toBeTruthy()
    })
  })

  describe('success variant', () => {
    it('renders success variant with correct text', () => {
      render(<InfoBanner variant="success">Semua pembeli sudah lunas</InfoBanner>)
      expect(screen.getByText('Semua pembeli sudah lunas')).toBeTruthy()
    })

    it('renders success icon for success variant', () => {
      const { container } = render(<InfoBanner variant="success">Success message</InfoBanner>)
      const svg = container.querySelector('svg')
      expect(svg).toBeTruthy()
    })
  })

  describe('tip variant', () => {
    it('renders tip variant with correct text', () => {
      render(<InfoBanner variant="tip">Tips: catat setiap hari untuk hasil akurat</InfoBanner>)
      expect(screen.getByText('Tips: catat setiap hari untuk hasil akurat')).toBeTruthy()
    })

    it('renders tip icon for tip variant', () => {
      const { container } = render(<InfoBanner variant="tip">Tip message</InfoBanner>)
      const svg = container.querySelector('svg')
      expect(svg).toBeTruthy()
    })
  })

  describe('default variant', () => {
    it('defaults to info variant when not specified', () => {
      render(<InfoBanner>Default message</InfoBanner>)
      expect(screen.getByText('Default message')).toBeTruthy()
    })
  })

  describe('styling', () => {
    it('applies rounded-xl class', () => {
      const { container } = render(<InfoBanner>Message</InfoBanner>)
      const banner = container.firstChild as HTMLElement
      expect(banner.className).toContain('rounded-xl')
    })

    it('applies flex layout classes', () => {
      const { container } = render(<InfoBanner>Message</InfoBanner>)
      const banner = container.firstChild as HTMLElement
      expect(banner.className).toContain('flex')
      expect(banner.className).toContain('items-start')
      expect(banner.className).toContain('gap-')
    })

    it('applies custom className', () => {
      const { container } = render(
        <InfoBanner className="custom-class">Message</InfoBanner>
      )
      const banner = container.firstChild as HTMLElement
      expect(banner.className).toContain('custom-class')
    })
  })

  describe('children content', () => {
    it('renders children with JSX content', () => {
      render(
        <InfoBanner>
          <strong>Penting:</strong> Jangan lupa catat pengeluaran
        </InfoBanner>
      )
      expect(screen.getByText('Penting:')).toBeTruthy()
      expect(screen.getByText('Jangan lupa catat pengeluaran')).toBeTruthy()
    })

    it('renders multiline children content', () => {
      render(
        <InfoBanner variant="warn">
          Belum semua dicatat, angka ini masih perkiraan
        </InfoBanner>
      )
      expect(screen.getByText('Belum semua dicatat, angka ini masih perkiraan')).toBeTruthy()
    })
  })
})
