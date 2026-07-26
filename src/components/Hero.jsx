import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Magnetic from './Magnetic'
import { profile } from '../data/portfolio'

const Scene3D = lazy(() => import('./Scene3D'))
const EASE = [0.16, 1, 0.3, 1]

function useClock() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date())

  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

function Line({ children, delay, show }) {
  return (
    <span className="hero__line">
      <motion.span
        className="hero__line-inner"
        initial={{ y: '108%' }}
        // Gate on the target itself — changing only the delay would not
        // restart an animation that is already committed.
        animate={{ y: show ? '0%' : '108%' }}
        transition={{ duration: 1.15, ease: EASE, delay: show ? delay : 0 }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero({ ready }) {
  const clock = useClock()
  const base = 0.15

  return (
    <section id="top" className="hero">
      <div className="hero__object">
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </div>

      <h1 className="hero__type">
        <Line show={ready} delay={base}>Frontend</Line>
        <Line show={ready} delay={base + 0.09}>Engineer</Line>
      </h1>

      <motion.div
        className="hero__rail hero__rail--left"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, delay: base + 0.5 }}
      >
        <span className="mono-label">{profile.name}</span>
        <span className="mono-label">{profile.location}</span>
      </motion.div>

      <motion.div
        className="hero__rail hero__rail--right"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, delay: base + 0.5 }}
      >
        <span className="mono-label mono-label--live">
          <i className="dot" /> Available — Q3
        </span>
        <span className="mono-label">{clock} UTC</span>
      </motion.div>

      <motion.div
        className="hero__foot"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
        transition={{ duration: 0.9, ease: EASE, delay: base + 0.6 }}
      >
        <p className="hero__tagline">{profile.tagline}</p>
        <div className="hero__actions">
          <Magnetic>
            <a href="#work" className="btn btn--primary">
              Selected work
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="btn btn--ghost">
              Get in touch
            </a>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  )
}
