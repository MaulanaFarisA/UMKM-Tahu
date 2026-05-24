import Link from 'next/link'
import { logoutAction } from '@/server/actions'
import {
  Home,
  Plus,
  Wallet,
  Store,
  LogOut,
  ChevronLeft,
  ReceiptText,
  PlusCircle,
} from 'lucide-react'

interface AppShellProps {
  children: React.ReactNode
  active?: 'beranda' | 'catat' | 'piutang' | 'pengaturan'
  title?: string
  showBack?: boolean
  backHref?: string
  width?: 'narrow' | 'default' | 'wide'
}

const WIDTH_CLASS: Record<NonNullable<AppShellProps['width']>, string> = {
  narrow: 'app-container-narrow',
  default: 'app-container-default',
  wide: 'app-container-wide',
}

export default function AppShell({ children, active, title, showBack, backHref, width = 'default' }: AppShellProps) {
  const containerClass = `app-container ${WIDTH_CLASS[width]}`
  return (
    <div className="min-h-screen flex flex-col tap-highlight-none" style={{ backgroundColor: '#FFFDF7' }}>

      {/* Header */}
      <header
        className="sticky top-0 z-20 px-4 h-14 flex items-center justify-between"
        style={{
          backgroundColor: 'rgba(255,253,247,0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(231,227,220,0.8)',
        }}
      >
        <div className={`${containerClass} flex items-center justify-between`}>
          <div className="flex items-center gap-2.5">
            {showBack && backHref ? (
              <Link
                href={backHref}
                className="w-8 h-8 flex items-center justify-center rounded-xl transition-all active:scale-95"
                style={{ backgroundColor: '#F5F4F0', border: '1px solid #E8E5DF' }}
              >
                <ChevronLeft size={16} strokeWidth={2.5} color="#4A4540" />
              </Link>
            ) : (
              <div
                className="w-8 h-8 flex items-center justify-center rounded-xl flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                  boxShadow: '0 2px 8px rgba(124,58,237,0.3)',
                }}
              >
                <ReceiptText size={15} strokeWidth={2.5} color="white" />
              </div>
            )}
            <span
              className="font-bold text-base tracking-tight"
              style={{ color: '#1A1714', letterSpacing: '-0.02em' }}
            >
              {title ?? 'Pembukuan Tahu'}
            </span>
          </div>

          {/* Desktop nav links */}
          <nav className="desktop-nav items-center gap-1">
            <DesktopNavLink href="/beranda" label="Beranda" Icon={Home} active={active === 'beranda'} />
            <DesktopNavLink href="/piutang" label="Tagihan" Icon={Wallet} active={active === 'piutang'} />
            <DesktopNavLink href="/catat" label="Catat" Icon={PlusCircle} active={active === 'catat'} highlight />
            <DesktopNavLink href="/pengaturan" label="Usaha" Icon={Store} active={active === 'pengaturan'} />
          </nav>

          <form action={logoutAction}>
            <button
              type="submit"
              className="btn-ghost"
              style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
            >
              <LogOut size={11} strokeWidth={2.5} />
              Keluar
            </button>
          </form>
        </div>
      </header>

      {/* Main content */}
      <main className={`flex-1 with-bottom-nav-pad pt-6 md:pt-8 lg:pt-10 ${containerClass}`}>
        {children}
      </main>

      {/* Bottom nav (mobile/tablet only) */}
      <div
        className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-20 px-4 safe-bottom"
        style={{
          paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))',
          paddingTop: '0.5rem',
          background: 'linear-gradient(to top, rgba(255,253,247,1) 60%, rgba(255,253,247,0))',
        }}
      >
        <nav
          className="max-w-lg mx-auto rounded-2xl px-2 h-16 flex items-center justify-around relative"
          style={{
            backgroundColor: 'rgba(255,253,247,0.97)',
            border: '1px solid rgba(231,227,220,0.9)',
            boxShadow: '0 -1px 0 rgba(232,229,223,0.5), 0 8px 32px rgba(26,23,20,0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <NavItem href="/beranda" label="Beranda" active={active === 'beranda'}>
            <Home size={20} strokeWidth={active === 'beranda' ? 2.5 : 1.75} />
          </NavItem>

          <NavItem href="/piutang" label="Tagihan" active={active === 'piutang'}>
            <Wallet size={20} strokeWidth={active === 'piutang' ? 2.5 : 1.75} />
          </NavItem>

          {/* Central FAB */}
          <Link
            href="/catat"
            className="flex items-center justify-center w-14 h-14 rounded-2xl -mt-7 transition-all active:scale-95 no-select"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
              boxShadow: '0 8px 20px rgba(124,58,237,0.4), 0 2px 8px rgba(124,58,237,0.2)',
            }}
            aria-label="Catat"
          >
            <Plus size={26} strokeWidth={2.5} color="white" />
          </Link>

          <NavItem href="/pengaturan" label="Usaha" active={active === 'pengaturan'}>
            <Store size={20} strokeWidth={active === 'pengaturan' ? 2.5 : 1.75} />
          </NavItem>

          {/* Spacer for FAB */}
          <div className="w-14" aria-hidden="true" />
        </nav>
      </div>
    </div>
  )
}

function NavItem({
  href,
  label,
  active,
  children,
}: {
  href: string
  label: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl min-w-[56px] transition-all no-select"
      style={{
        backgroundColor: active ? 'rgba(124,58,237,0.08)' : 'transparent',
      }}
    >
      <span style={{ color: active ? '#7C3AED' : '#9C9690' }}>{children}</span>
      <span
        className="text-xs font-semibold"
        style={{
          color: active ? '#7C3AED' : '#9C9690',
          fontSize: '0.6875rem',
          letterSpacing: '0.01em',
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
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 no-select"
        style={{
          background: active
            ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
            : 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
          color: active ? '#FFFFFF' : '#5B21B6',
          border: active ? 'none' : '1px solid #C4B5FD',
          boxShadow: active ? '0 4px 12px rgba(124,58,237,0.3)' : 'none',
          letterSpacing: '-0.01em',
        }}
      >
        <Icon size={15} strokeWidth={2.25} color={active ? '#FFFFFF' : '#7C3AED'} />
        {label}
      </Link>
    )
  }
  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all no-select"
      style={{
        backgroundColor: active ? 'rgba(124,58,237,0.08)' : 'transparent',
        color: active ? '#7C3AED' : '#4A4540',
        letterSpacing: '-0.01em',
      }}
    >
      <Icon size={15} strokeWidth={2} color={active ? '#7C3AED' : '#9C9690'} />
      {label}
    </Link>
  )
}
