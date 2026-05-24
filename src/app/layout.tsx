import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
// Ignore missing type declarations for global CSS side-effect import
// @ts-ignore: Implicit any for CSS import
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pembukuan Tahu',
  description: 'Catat jualan, pengeluaran, dan uang belum dibayar dengan mudah.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Pembukuan Tahu',
  },
}

export const viewport: Viewport = {
  themeColor: '#6941C6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={plusJakartaSans.variable}>
      <body className={plusJakartaSans.className} style={{ backgroundColor: '#F5F7FA' }}>
        {children}
      </body>
    </html>
  )
}
