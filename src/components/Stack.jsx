import { motion } from 'framer-motion'
import { stack } from '../data/portfolio'

/**
 * Deliberately not skill bars — a percentage on "TypeScript" means nothing.
 * An editorial list: discipline, the tools, and how long it's been in hand.
 */
export default function Stack() {
  return (
    <section id="stack" className="section stack">
      <div className="section__index">
        <span className="mono-label">02</span>
        <span className="mono-label">Stack</span>
      </div>

      <ul className="stack__list">
        {stack.map((row, i) => (
          <motion.li
            className="stack__row"
            key={row.area}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          >
            <span className="stack__n mono-label">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="stack__area">{row.area}</h3>
            <p className="stack__tools">{row.tools.join(', ')}</p>
            <span className="stack__since mono-label">{row.since}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
