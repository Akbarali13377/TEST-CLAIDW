import { cloneElement, useRef } from 'react'

/**
 * Pulls its child toward the cursor while hovered, then releases.
 * No-ops on touch devices and when the visitor asked for reduced motion.
 */
export default function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null)

  const enabled = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMove = (e) => {
    const el = ref.current
    if (!el || !enabled()) return
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0px, 0px)'
  }

  return cloneElement(children, {
    ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    className: `${children.props.className || ''} magnetic`.trim(),
  })
}
