import { ReceiptText } from 'lucide-react'

interface BrandMarkProps {
  size?: 'sm' | 'md' | 'lg'
}

const sizeClass = {
  sm: 'w-9 h-9 rounded-xl',
  md: 'w-11 h-11 rounded-2xl',
  lg: 'w-14 h-14 rounded-2xl',
} as const

const iconSize = {
  sm: 16,
  md: 20,
  lg: 24,
} as const

export default function BrandMark({ size = 'md' }: BrandMarkProps) {
  return (
    <div
      className={`${sizeClass[size]} inline-flex items-center justify-center flex-shrink-0 relative overflow-hidden`}
      style={{
        background: 'linear-gradient(135deg, #FFFDF7 0%, #FFF3D6 48%, #FDE8A7 100%)',
        border: '1px solid rgba(124,58,237,0.22)',
        boxShadow: '0 10px 22px rgba(120,85,50,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
      }}
      aria-hidden="true"
    >
      <span
        className="absolute -right-2 -top-2 w-6 h-6 rounded-full"
        style={{ background: 'rgba(124,58,237,0.16)' }}
      />
      <span
        className="absolute left-1.5 bottom-1.5 w-2.5 h-2.5 rounded-sm"
        style={{ background: '#FFFFFF', border: '1px solid rgba(245,158,11,0.38)' }}
      />
      <ReceiptText size={iconSize[size]} strokeWidth={2.35} color="var(--accent-deep)" />
    </div>
  )
}
