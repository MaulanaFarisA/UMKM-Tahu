import Link from 'next/link'
import { logoutAction } from '@/server/actions'
import BrandMark from '@/components/brand-mark'
import SubmitButton from '@/components/submit-button'
import {
  Home,
  Plus,
  Wallet,
  Store,
  LogOut,
  ChevronLeft,
  PlusCircle,
} from 'lucide-react'

interface AppShellProps {
  children: React.ReactNode
  active?: 'beranda' | 'catat' | 'piutang' | 'pengaturan'
  title?: string
  showBack?: boolean
  backHref?: string
  width?: 'narrow' | 'default' | 'wide'
  /** Hide the mobile bottom nav + FAB (used on focused flows like the record forms) */
  hideBottomNav?: boolean
}

const WIDTH_CLASS: Record<NonNullable<AppShellProps['width']>, string> = {
  narrow: 'app-container-narrow',
  default: 'app-container-default',
  wide: 'app-container-wide',
}

export default function AppShell({ children, active, title, showBack, backHref, width = 'default', hideBottomNav = false }: AppShellProps) {
  const containerClass = `app-container ${WIDTH_CLASS[width]}`
  return (
    <div className="min-h-screen flex flex-col tap-highlight-none gradient-mesh">
      <header
        className="sticky top-0 z-30 h-16 flex items-center"
        style={{
          backgroundColor: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(16px) saturate(1.2)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className={`${containerClass} flex items-center justify-between gap-3`}>
          {/* Brand / back button */}
          <div className="flex items-center gap-2.5 min-w-0">
            {showBack && backHref ? (
              <Link
                href={backHref}
                aria-label="Kembali"
                className="w-9 h-9 inline-flex items-center justify-center rounded-xl no-select transition-all hover:bg-[var(--bg-subtle)] active:scale-95"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                }}
              >
                <ChevronLeft size={17} strokeWidth={2.5} />
              </Link>
            ) : (
              <BrandMark size="sm" />
            )}
            <span
              className="font-extrabold text-[1rem] truncate"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}
            >
              {title ?? 'Buku Tahu'}
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="desktop-nav items-center gap-1" aria-label="Navigasi utama">
            <DesktopNavLink href="/beranda" label="Beranda" Icon={Home} active={active === 'beranda'} />
            <DesktopNavLink href="/piutang" label="Tagihan" Icon={Wallet} active={active === 'piutang'} />
            <DesktopNavLink href="/catat" label="Catat" Icon={PlusCircle} active={active === 'catat'} highlight />
            <DesktopNavLink href="/pengaturan" label="Usaha" Icon={Store} active={active === 'pengaturan'} />
          </nav>

          {/* Right cluster: quick record + logout */}
          <div className="flex items-center gap-2">
            <Link
              href="/catat"
              className="hidden md:inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-bold no-select transition-all hover:-translate-y-0.5 active:scale-[0.97]"
              style={{
                background: 'var(--accent-gradient)',
                color: '#FFFFFF',
                boxShadow: 'var(--shadow-accent-sm)',
                letterSpacing: '-0.01em',
              }}
            >
              <Plus size={16} strokeWidth={2.75} />
              Catat
            </Link>
            <form action={logoutAction}>
              <SubmitButton
                pendingLabel="Keluar..."
                className="btn-ghost"
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
              >
                <LogOut size={12} strokeWidth={2.5} />
                <span className="hidden sm:inline">Keluar</span>
              </SubmitButton>
            </form>
          </div>
        </div>
      </header>

      {/* Main */}
        <main className={`flex-1 ${hideBottomNav ? 'pb-6' : 'with-bottom-nav-pad'} pt-6 md:pt-8 lg:pt-10 ${containerClass}`}>
        {children}
      </main>

      {!hideBottomNav && (
        <>
      {/* Bottom nav (mobile/tablet only) */}
      <div
        className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-30 px-4"
        style={{
          paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
          paddingTop: '0.5rem',
          background:
            'linear-gradient(to top, var(--bg) 55%, rgba(250,251,252,0.9) 80%, rgba(250,251,252,0))',
          pointerEvents: 'none',
        }}
      >
        <nav
          className="max-w-sm mx-auto rounded-2xl grid grid-cols-4 items-stretch gap-1 px-2 py-2 no-select"
          aria-label="Navigasi bawah"
          style={{
            backgroundColor: 'rgba(255,255,255,0.96)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-lg)',
            backdropFilter: 'blur(24px) saturate(1.25)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.25)',
            pointerEvents: 'auto',
          }}
        >
          <NavItem href="/beranda" label="Beranda" active={active === 'beranda'}>
            <Home size={21} strokeWidth={active === 'beranda' ? 2.5 : 1.85} />
          </NavItem>

          <NavItem href="/piutang" label="Tagihan" active={active === 'piutang'}>
            <Wallet size={21} strokeWidth={active === 'piutang' ? 2.5 : 1.85} />
          </NavItem>

          <NavItem href="/catat" label="Catat" active={active === 'catat'} accent>
            <Plus size={21} strokeWidth={2.6} />
          </NavItem>

          <NavItem href="/pengaturan" label="Usaha" active={active === 'pengaturan'}>
            <Store size={21} strokeWidth={active === 'pengaturan' ? 2.5 : 1.85} />
          </NavItem>
        </nav>
      </div>
        </>
      )}
    </div>
  )
}

function NavItem({
  href,
  label,
  active,
  accent,
  children,
}: {
  href: string
  label: string
  active: boolean
  accent?: boolean
  children: React.ReactNode
}) {
  if (accent) {
    return (
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        className="flex flex-col items-center justify-center gap-1 py-1.5 rounded-xl transition-all active:scale-95 no-select"
      >
        <span
          className="inline-flex items-center justify-center w-9 h-9 rounded-xl"
          style={{
            background: 'var(--accent-gradient)',
            color: '#FFFFFF',
            boxShadow: active ? 'var(--shadow-accent)' : 'var(--shadow-accent-sm)',
          }}
        >
          {children}
        </span>
        <span
          className="font-bold"
          style={{ color: 'var(--accent)', fontSize: '0.6875rem', letterSpacing: '0.005em' }}
        >
          {label}
        </span>
      </Link>
    )
  }
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className="flex flex-col items-center justify-center gap-1 py-1.5 rounded-xl transition-all active:scale-95 no-select"
      style={{ backgroundColor: active ? 'var(--accent-light)' : 'transparent' }}
    >
      <span style={{ color: active ? 'var(--accent)' : 'var(--text-muted)' }}>{children}</span>
      <span
        className="font-semibold"
        style={{
          color: active ? 'var(--accent)' : 'var(--text-tertiary)',
          fontSize: '0.6875rem',
          letterSpacing: '0.005em',
        }}
      >
        {label}
      </span>
    </Link>
  )
}

function DesktopNavLink({
  href,
  label,
  Icon,
  active,
  highlight,
}: {
  href: string
  label: string
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>
  active: boolean
  highlight?: boolean
}) {
  if (highlight) {
    return (
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-sm font-bold transition-all active:scale-[0.97] no-select"
        style={{
          background: active ? 'var(--accent)' : 'var(--accent-light)',
          color: active ? '#FFFFFF' : 'var(--accent-deep)',
          border: active ? '1px solid var(--accent)' : '1px solid var(--border)',
          boxShadow: active ? 'var(--shadow-accent-sm)' : 'var(--shadow-xs)',
          letterSpacing: '-0.012em',
        }}
      >
        <Icon size={15} strokeWidth={2.25} color={active ? '#FFFFFF' : 'var(--accent)'} />
        {label}
      </Link>
    )
  }
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl text-sm font-semibold transition-all no-select"
      style={{
        backgroundColor: active ? 'var(--accent-light)' : 'transparent',
        color: active ? 'var(--accent)' : 'var(--text-secondary)',
        boxShadow: active ? 'var(--shadow-xs)' : 'none',
        letterSpacing: '-0.01em',
      }}
    >
      <Icon size={15} strokeWidth={2} color={active ? 'var(--accent)' : 'var(--text-tertiary)'} />
      {label}
    </Link>
  )
}
