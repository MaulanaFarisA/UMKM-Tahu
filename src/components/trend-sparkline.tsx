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

  // Smooth the line with a Catmull-Rom -> cubic Bézier conversion for a
  // crafted, fluid curve instead of jagged straight segments.
  const linePath = buildSmoothPath(points)
  const areaPath = `${linePath} L ${points[points.length - 1][0]} ${h - pad} L ${points[0][0]} ${h - pad} Z`
  const zeroY = flat ? midY : pad + (1 - (0 - min) / range) * (h - pad * 2)
  const lastNet = values[values.length - 1] ?? 0
  const positive = lastNet >= 0
  const lineColor = !hasData ? 'var(--text-muted)' : positive ? '#059669' : '#E11D48'
  const gridYs = [0.25, 0.5, 0.75]

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
            style={{ color: 'var(--text-muted)', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}
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
          <stop offset="0%" stopColor={lineColor} stopOpacity="0.28" />
          <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sparkLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={positive ? '#34D399' : '#FB7185'} />
          <stop offset="100%" stopColor={lineColor} />
        </linearGradient>
      </defs>
      {/* Faint horizontal grid lines */}
      {gridYs.map((g) => (
        <line key={g} x1={pad} y1={pad + g * (h - pad * 2)} x2={w - pad} y2={pad + g * (h - pad * 2)} stroke="var(--border-soft)" strokeWidth="1" />
      ))}
      {/* Zero baseline */}
      <line x1={pad} y1={zeroY} x2={w - pad} y2={zeroY} stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 4" />
      {/* Area */}
      <path d={areaPath} fill="url(#sparkArea)" opacity={draw} />
      {/* Line */}
      <path
        ref={pathRef}
        d={linePath}
        fill="none"
        stroke="url(#sparkLine)"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - draw)}
        style={{ filter: `drop-shadow(0 4px 8px ${positive ? 'rgba(5,150,105,0.3)' : 'rgba(225,29,72,0.3)'})` }}
      />
      {/* Last point dot with halo */}
      {points.length > 0 && (
        <g opacity={draw}>
          <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="6" fill={lineColor} opacity="0.18" />
          <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="3.5" fill="#fff" stroke={lineColor} strokeWidth="2.5" />
        </g>
      )}
    </svg>
  )
}

/** Build a smooth cubic-Bézier path through points (Catmull-Rom style). */
function buildSmoothPath(pts: ReadonlyArray<readonly [number, number]>): string {
  if (pts.length < 2) return pts.length ? `M ${pts[0][0]} ${pts[0][1]}` : ''
  const d: string[] = [`M ${pts[0][0]} ${pts[0][1]}`]
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? 0 : i - 1]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1]
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6
    d.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`)
  }
  return d.join(' ')
}
