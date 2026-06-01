'use client'

import { useEffect, useRef, useState } from 'react'

interface TrendSparklineProps {
  data: { date: string; net: number }[]
  height?: number
}

/**
 * Small line+area sparkline for the last N days of net profit.
 * The line draws in on mount; baseline (zero) is marked subtly.
 */
export default function TrendSparkline({ data, height = 72 }: TrendSparklineProps) {
  const [draw, setDraw] = useState(0)
  const pathRef = useRef<SVGPathElement>(null)
  const [len, setLen] = useState(0)

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength())
  }, [data])

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDraw(1)
      return
    }
    let raf = 0
    const start = performance.now()
    const dur = 900
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      setDraw(ease(p))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [data, len])

  const w = 280
  const h = height
  const pad = 10
  const values = data.map((d) => d.net)
  const hasData = values.some((v) => v !== 0)
  const max = Math.max(...values, 0)
  const min = Math.min(...values, 0)
  const range = max - min || 1
  const stepX = (w - pad * 2) / Math.max(values.length - 1, 1)
  const midY = h / 2

  // When there is no data (all zero) or a perfectly flat series, draw the line
  // through the vertical centre instead of pinning it to the bottom.
  const flat = max === min
  const points = values.map((v, i) => {
    const x = pad + i * stepX
    const y = flat ? midY : pad + (1 - (v - min) / range) * (h - pad * 2)
    return [x, y] as const
  })

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')
  const areaPath = `${linePath} L ${points[points.length - 1][0]} ${h - pad} L ${points[0][0]} ${h - pad} Z`
  const zeroY = flat ? midY : pad + (1 - (0 - min) / range) * (h - pad * 2)
  const lastNet = values[values.length - 1] ?? 0
  const lineColor = !hasData ? 'var(--text-muted)' : lastNet >= 0 ? '#059669' : '#E11D48'

  // Empty state: friendly centred message + dotted baseline, no lonely line.
  if (!hasData) {
    return (
      <div className="relative" style={{ height: h }}>
        <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden>
          <line
            x1={pad}
            y1={midY}
            x2={w - pad}
            y2={midY}
            stroke="var(--border-strong)"
            strokeWidth="1.5"
            strokeDasharray="2 5"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ color: 'var(--text-muted)', background: 'var(--bg)' }}
          >
            Belum ada transaksi minggu ini
          </span>
        </div>
      </div>
    )
  }

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="sparkArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lineColor} stopOpacity="0.22" />
          <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Zero baseline */}
      <line x1={pad} y1={zeroY} x2={w - pad} y2={zeroY} stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 4" />
      {/* Area */}
      <path d={areaPath} fill="url(#sparkArea)" opacity={draw} />
      {/* Line */}
      <path
        ref={pathRef}
        d={linePath}
        fill="none"
        stroke={lineColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - draw)}
      />
      {/* Last point dot */}
      {points.length > 0 && (
        <circle
          cx={points[points.length - 1][0]}
          cy={points[points.length - 1][1]}
          r="3.5"
          fill={lineColor}
          opacity={draw}
        />
      )}
    </svg>
  )
}
