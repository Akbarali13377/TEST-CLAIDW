import { motion } from 'framer-motion'
import { skills } from '../data/portfolio'

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <motion.div
        className="section__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
      >
        <span className="section__label">02 — Skills</span>
        <h2>What I work with</h2>
      </motion.div>

      <div className="skills__list">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="skill-bar"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div className="skill-bar__top">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="skill-bar__track">
              <motion.div
                className="skill-bar__fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1, delay: i * 0.08 + 0.2, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
