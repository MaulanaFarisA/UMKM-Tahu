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
  title: 'Buku Tahu',
  description: 'Catat uang masuk, uang keluar, dan pembeli belum dibayar dari HP.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon-192.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Buku Tahu',
  },
}

export const viewport: Viewport = {
  themeColor: '#FFFDF7',
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
      <body className={plusJakartaSans.className} style={{ backgroundColor: 'var(--bg)' }}>
        {children}
      </body>
    </html>
  )
}
