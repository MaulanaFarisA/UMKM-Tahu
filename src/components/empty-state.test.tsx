import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EmptyState from './empty-state'

describe('EmptyState', () => {
  describe('title rendering', () => {
    it('renders title text', () => {
      render(<EmptyState title="Belum ada data" />)
      expect(screen.getByText('Belum ada data')).toBeTruthy()
    })

    it('renders title with custom text', () => {
      render(<EmptyState title="Tidak ada penjualan hari ini" />)
      expect(screen.getByText('Tidak ada penjualan hari ini')).toBeTruthy()
    })
  })

  describe('description rendering', () => {
    it('renders description when provided', () => {
      render(
        <EmptyState
          title="Belum ada data"
          description="Mulai dengan mencatat penjualan pertama Anda"
        />
      )
      expect(screen.getByText('Mulai dengan mencatat penjualan pertama Anda')).toBeTruthy()
    })

    it('does not render description when not provided', () => {
      const { container } = render(<EmptyState title="Belum ada data" />)
      const descriptionElement = container.querySelector('p')
      expect(descriptionElement).toBeFalsy()
    })

    it('renders description with multiple lines', () => {
      render(
        <EmptyState
          title="Belum ada data"
          description="Ini adalah deskripsi yang panjang untuk menjelaskan keadaan kosong"
        />
      )
      expect(
        screen.getByText('Ini adalah deskripsi yang panjang untuk menjelaskan keadaan kosong')
      ).toBeTruthy()
    })
  })

  describe('action rendering', () => {
    it('renders action button when provided', () => {
      render(
        <EmptyState
          title="Belum ada data"
          action={<button>Catat Sekarang</button>}
        />
      )
      expect(screen.getByRole('button', { name: 'Catat Sekarang' })).toBeTruthy()
    })

    it('does not render action when not provided', () => {
      const { container } = render(<EmptyState title="Belum ada data" />)
      const button = container.querySelector('button')
      expect(button).toBeFalsy()
    })

    it('renders custom action element', () => {
      render(
        <EmptyState
          title="Belum ada data"
          action={<a href="/catat">Mulai Catat</a>}
        />
      )
      expect(screen.getByRole('link', { name: 'Mulai Catat' })).toBeTruthy()
    })
  })

  describe('layout structure', () => {
    it('renders as flex column container', () => {
      const { container } = render(<EmptyState title="Belum ada data" />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('flex')
      expect(wrapper.className).toContain('flex-col')
    })

    it('centers content', () => {
      const { container } = render(<EmptyState title="Belum ada data" />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('items-center')
      expect(wrapper.className).toContain('justify-center')
    })
  })

  describe('complete empty state', () => {
    it('renders title, description, and action together', () => {
      render(
        <EmptyState
          title="Belum ada penjualan"
          description="Catat penjualan pertama Anda untuk melihat ringkasan"
          action={<button>Catat Penjualan</button>}
        />
      )
      expect(screen.getByText('Belum ada penjualan')).toBeTruthy()
      expect(screen.getByText('Catat penjualan pertama Anda untuk melihat ringkasan')).toBeTruthy()
      expect(screen.getByRole('button', { name: 'Catat Penjualan' })).toBeTruthy()
    })
  })
})
