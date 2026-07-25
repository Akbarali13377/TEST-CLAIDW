import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Scene3D from './Scene3D'
import { profile } from '../data/portfolio'

function useLocalTime() {
  const [time, setTime] = useState(() =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' }).format(new Date()),
  )

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' }).format(new Date()))
    }, 15000)
    return () => clearInterval(id)
  }, [])

  return time
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero() {
  const time = useLocalTime()

  return (
    <section id="top" className="hero">
      <div className="hero__grid">
        <div className="hero__text">
          <motion.p
            className="mono-label hero__eyebrow"
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
          >
            {profile.role} — {profile.location} — {time}
          </motion.p>

          <motion.h1
            className="hero__name"
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
          >
            {profile.name}
          </motion.h1>

          <motion.p
            className="hero__tagline"
            initial="hidden"
            animate="show"
            custom={2}
            variants={fadeUp}
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            className="hero__actions"
            initial="hidden"
            animate="show"
            custom={3}
            variants={fadeUp}
          >
            <a href="#projects" className="btn btn--primary">
              View work
            </a>
            <a href="#contact" className="btn btn--ghost">
              Say hello
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero__object"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <Scene3D />
        </motion.div>
      </div>

      <div className="hero__scroll">
        <span />
        <p className="mono-label">Scroll</p>
      </div>
    </section>
  )
}
