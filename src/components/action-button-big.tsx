import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Variant = 'profit' | 'loss'

interface ActionButtonBigProps {
  href: string
  title: string
  subtitle: string
  Icon: LucideIcon
  variant: Variant
  /** Adds a gentle attention pulse (used on the empty/first-time state) */
  pulse?: boolean
}

const variantMap: Record<
  Variant,
  { gradient: string; border: string; glow: string; iconColor: string; titleColor: string; subColor: string }
> = {
  profit: {
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    border: 'rgba(16,185,129,0.5)',
    glow: '0 14px 30px -8px rgba(16,185,129,0.55)',
    iconColor: '#059669',
    titleColor: '#FFFFFF',
    subColor: 'rgba(255,255,255,0.85)',
  },
  loss: {
    gradient: 'linear-gradient(135deg, #FB7185 0%, #E11D48 100%)',
    border: 'rgba(225,29,72,0.5)',
    glow: '0 14px 30px -8px rgba(225,29,72,0.5)',
    iconColor: '#E11D48',
    titleColor: '#FFFFFF',
    subColor: 'rgba(255,255,255,0.85)',
  },
}

export default function ActionButtonBig({
  href,
  title,
  subtitle,
  Icon,
  variant,
  pulse = false,
}: ActionButtonBigProps) {
  const v = variantMap[variant]
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-2xl flex items-center gap-4 p-5 transition-all duration-200 hover:-translate-y-1 active:scale-[0.98] tap-highlight-none no-select ${
        pulse ? 'action-pulse' : ''
      }`}
      style={{
        background: v.gradient,
        border: `1px solid ${v.border}`,
        boxShadow: v.glow,
        minHeight: '104px',
      }}
    >
      {/* Sheen highlight */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 55%)' }}
      />

      {/* Icon tile */}
      <span
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105 group-hover:rotate-3"
        style={{ background: '#FFFFFF', boxShadow: '0 6px 16px rgba(0,0,0,0.12)' }}
      >
        <Icon size={26} strokeWidth={2.4} color={v.iconColor} />
      </span>

      {/* Text */}
      <span className="relative min-w-0 flex-1">
        <span className="block text-lg font-extrabold leading-tight" style={{ color: v.titleColor, letterSpacing: '-0.02em' }}>
          {title}
        </span>
        <span className="block text-sm mt-0.5 font-medium" style={{ color: v.subColor }}>
          {subtitle}
        </span>
      </span>

      {/* Arrow */}
      <span
        className="relative w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={{ background: 'rgba(255,255,255,0.22)' }}
      >
        <ArrowUpRight size={18} strokeWidth={2.6} color="#FFFFFF" />
      </span>
    </Link>
  )
}
