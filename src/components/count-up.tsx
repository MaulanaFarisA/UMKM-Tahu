'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  value: number
  /** Format the numeric value into a display string (e.g. formatRupiah) */
  format?: (n: number) => string
  /** Duration in ms */
  duration?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * Animates a number from 0 to value on mount using requestAnimationFrame.
 * Falls back to the final value instantly when the user prefers reduced motion.
 */
export default function CountUp({
  value,
  format = (n) => String(Math.round(n)),
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
      {format(display)}
    </span>
  )
}
