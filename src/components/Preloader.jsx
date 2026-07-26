import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const EASE = [0.76, 0, 0.24, 1]

/**
 * Holds the page until webfonts have actually resolved, then wipes away.
 * The counter is driven by real elapsed progress toward that promise, with a
 * floor so it never flashes past too fast to read.
 */
export default function Preloader({ onDone }) {
  const [pct, setPct] = useState(0)
  const [gone, setGone] = useState(false)
  const done = useRef(false)

  useEffect(() => {
    const MIN_MS = 1100
    const start = performance.now()
    let raf

    const fontsReady =
      document.fonts?.ready ?? Promise.resolve()

    let fontsDone = false
    fontsReady.then(() => {
      fontsDone = true
    })

    const tick = () => {
      const elapsed = performance.now() - start
      const timeShare = Math.min(elapsed / MIN_MS, 1)
      // Cap at 92% until fonts resolve, then let it run to 100.
      const target = fontsDone ? timeShare : Math.min(timeShare, 0.92)
      const next = Math.round(target * 100)
      setPct(next)

      if (next >= 100 && !done.current) {
        done.current = true
        setTimeout(() => {
          setGone(true)
          onDone?.()
        }, 220)
        return
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="preloader__inner">
            <span className="mono-label">Alex Morgan — Portfolio</span>
            <span className="preloader__count">{String(pct).padStart(3, '0')}</span>
          </div>
          <div className="preloader__bar">
            <div className="preloader__bar-fill" style={{ width: `${pct}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
