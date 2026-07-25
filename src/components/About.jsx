import { motion } from 'framer-motion'
import { about } from '../data/portfolio'

export default function About() {
  return (
    <section id="about" className="section about">
      <motion.div
        className="section__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
      >
        <span className="mono-label">01 / About</span>
        <h2>Notes on the work</h2>
      </motion.div>

      <div className="about__grid">
        <motion.p
          className="about__bio"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {about.bio}
        </motion.p>

        <div className="about__stats">
          {about.stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <span className="stat-card__value">{s.value}</span>
              <span className="stat-card__label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
