'use client'

import { useEffect } from 'react'

/**
 * Prevents the annoying default behavior where scrolling the mouse wheel /
 * touchpad over a focused <input type="number"> increments or decrements its
 * value. When a wheel event happens while a number input is focused, we blur it
 * so the page scrolls normally and the typed value is preserved.
 *
 * Mounted once at the root layout so it applies app-wide.
 */
export default function NumberInputGuard() {
  useEffect(() => {
    const onWheel = () => {
      const el = document.activeElement
      if (el instanceof HTMLInputElement && el.type === 'number') {
        el.blur()
      }
    }
    document.addEventListener('wheel', onWheel, { passive: true })
    return () => document.removeEventListener('wheel', onWheel)
  }, [])

  return null
}
