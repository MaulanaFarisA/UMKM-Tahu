import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import StatusBadge from './status-badge'

describe('StatusBadge', () => {
  describe('receivable status variants', () => {
    it('renders LUNAS status with correct text', () => {
      render(<StatusBadge status="LUNAS" />)
      expect(screen.getByText('Sudah Lunas')).toBeTruthy()
    })

    it('renders BELUM_LUNAS status with correct text', () => {
      render(<StatusBadge status="BELUM_LUNAS" />)
      expect(screen.getByText('Belum Dibayar')).toBeTruthy()
    })
  })

  describe('data confidence variants', () => {
    it('renders actual status with correct text', () => {
      render(<StatusBadge status="actual" />)
      expect(screen.getByText('Aktual')).toBeTruthy()
    })

    it('renders estimated status with correct text', () => {
      render(<StatusBadge status="estimated" />)
      expect(screen.getByText('Perkiraan')).toBeTruthy()
    })

    it('renders unconfirmed status with correct text', () => {
      render(<StatusBadge status="unconfirmed" />)
      expect(screen.getByText('Belum Dikonfirmasi')).toBeTruthy()
    })
  })

  describe('badge rendering', () => {
    it('renders as inline element', () => {
      const { container } = render(<StatusBadge status="LUNAS" />)
      const badge = container.querySelector('span')
      expect(badge).toBeTruthy()
    })

    it('renders with rounded styling', () => {
      const { container } = render(<StatusBadge status="LUNAS" />)
      const badge = container.querySelector('span')
      expect(badge?.className).toContain('rounded-full')
    })
  })
})
