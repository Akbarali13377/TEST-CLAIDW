import { motion } from 'framer-motion'
import Scene3D from './Scene3D'
import { profile } from '../data/portfolio'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' },
  }),
}

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__canvas">
        <Scene3D />
      </div>

      <div className="hero__content">
        <motion.p
          className="hero__eyebrow"
          initial="hidden"
          animate="show"
          custom={0}
          variants={fadeUp}
        >
          {profile.role}
        </motion.p>
        <motion.h1
          initial="hidden"
          animate="show"
          custom={1}
          variants={fadeUp}
        >
          Hi, I'm {profile.name.split(' ')[0]}.
          <br />I craft <span className="gradient-text">3D experiences</span>
          <br />for the web.
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
            View Work
          </a>
          <a href="#contact" className="btn btn--ghost">
            Get in Touch
          </a>
        </motion.div>
      </div>

      <div className="hero__scroll">
        <span />
        <p>Scroll</p>
      </div>
    </section>
  )
}
