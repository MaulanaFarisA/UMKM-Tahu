'use client'

import { useEffect, useState } from 'react'

interface ProgressRingProps {
  /** 0..1 fraction completed */
  ratio: number
  size?: number
  stroke?: number
  /** Center label (e.g. "60%") */
  label?: string
  sublabel?: string
  tone?: 'profit' | 'warn'
}

/**
 * Small circular progress ring (paid vs total). Stroke draws in on mount.
 */
export default function ProgressRing({
  ratio,
  size = 64,
  stroke = 7,
  label,
  sublabel,
  tone = 'warn',
}: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(1, ratio))
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setProgress(clamped)
      return
    }
    let raf = 0
    const start = performance.now()
    const dur = 800
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      setProgress(clamped * ease(p))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [clamped])

  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const dash = c * progress
  const gradId = tone === 'profit' ? 'ringProfit' : 'ringWarn'

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--bg-muted)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
        />
        <defs>
          <linearGradient id="ringWarn" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="ringProfit" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
      {(label || sublabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
          {label && (
            <span className="font-extrabold" style={{ fontSize: size * 0.26, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
              {label}
            </span>
          )}
          {sublabel && (
            <span className="font-semibold mt-0.5" style={{ fontSize: size * 0.14, color: 'var(--text-muted)' }}>
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
