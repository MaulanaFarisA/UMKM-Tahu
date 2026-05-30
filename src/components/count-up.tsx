'use client'

import { useEffect, useRef, useState } from 'react'
import { formatRupiah } from '@/lib/format'

type FormatVariant = 'rupiah' | 'number'

interface CountUpProps {
  value: number
  /**
   * How to format the animated value. A string variant is used (not a function)
   * so the component can be rendered by Server Components without crossing the
   * RSC boundary with a function prop.
   */
  format?: FormatVariant
  /** Duration in ms */
  duration?: number
  className?: string
  style?: React.CSSProperties
}

function formatValue(n: number, variant: FormatVariant): string {
  if (variant === 'number') return Math.round(n).toLocaleString('id-ID')
  return formatRupiah(n)
}

/**
 * Animates a number from 0 to value on mount using requestAnimationFrame.
 * Falls back to the final value instantly when the user prefers reduced motion.
 */
export default function CountUp({
  value,
  format = 'rupiah',
  duration = 750,
  className,
  style,
}: CountUpProps) {
  const [display, setDisplay] = useState(value)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced || value === 0) {
      setDisplay(value)
      return
    }

    const start = performance.now()
    const from = 0
    const to = value

    // easeOutExpo for a satisfying, snappy settle
    const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      setDisplay(from + (to - from) * ease(progress))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(to)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [value, duration])

  return (
    <span className={className} style={style}>
      {formatValue(display, format)}
    </span>
  )
}
