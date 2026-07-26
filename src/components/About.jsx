import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { about } from '../data/portfolio'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="section__index">
        <span className="mono-label">01</span>
        <span className="mono-label">About</span>
      </div>

      <Reveal
        as="h2"
        className="statement"
        text="I build things that have to hold sixty frames a second — and still say something."
      />

      <div className="about__grid">
        <div className="about__col">
          <p className="about__bio">{about.bio}</p>
        </div>

        <ul className="ledger">
          {about.stats.map((s, i) => (
            <motion.li
              className="ledger__row"
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
            >
              <span className="ledger__value">{s.value}</span>
              <span className="ledger__label">{s.label}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
