import { ReceiptText } from 'lucide-react'

interface BrandMarkProps {
  size?: 'sm' | 'md' | 'lg'
}

const sizeClass = { sm: 'w-9 h-9 rounded-xl', md: 'w-11 h-11 rounded-2xl', lg: 'w-14 h-14 rounded-2xl' } as const
const iconSize = { sm: 16, md: 20, lg: 24 } as const

export default function BrandMark({ size = 'md' }: BrandMarkProps) {
  return (
    <div
      className={`${sizeClass[size]} inline-flex items-center justify-center flex-shrink-0`}
      style={{ background: 'var(--accent-gradient)', boxShadow: 'var(--shadow-accent-sm)' }}
      aria-hidden="true"
    >
      <ReceiptText size={iconSize[size]} strokeWidth={2.25} color="#FFFFFF" />
    </div>
  )
}
