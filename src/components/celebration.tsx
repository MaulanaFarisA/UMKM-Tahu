'use client'

import { useEffect, useState } from 'react'

interface CelebrationProps {
  /** Unique key — when it changes, the celebration re-fires once */
  trigger: string
  pieces?: number
}

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#F43F5E', '#34D399', '#A5B4FC']

interface Piece {
  id: number
  left: number
  delay: number
  duration: number
  color: string
  size: number
  rotate: number
  drift: number
}

/**
 * Lightweight one-shot confetti burst — pure CSS/DOM, no dependencies.
 * Fires once per `trigger` value and auto-clears. Skipped for reduced-motion.
 */
export default function Celebration({ trigger, pieces = 70 }: CelebrationProps) {
  const [items, setItems] = useState<Piece[]>([])

  useEffect(() => {
    if (!trigger) return
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const next: Piece[] = Array.from({ length: pieces }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.25,
      duration: 1.6 + Math.random() * 1.2,
      color: COLORS[i % COLORS.length],
      size: 6 + Math.random() * 7,
      rotate: Math.random() * 360,
      drift: (Math.random() - 0.5) * 120,
    }))
    setItems(next)
    const t = setTimeout(() => setItems([]), 3200)
    return () => clearTimeout(t)
  }, [trigger, pieces])

  if (items.length === 0) return null

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden" aria-hidden>
      {items.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 0.5,
              background: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              ['--drift' as string]: `${p.drift}px`,
              ['--spin' as string]: `${p.rotate + 360}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
