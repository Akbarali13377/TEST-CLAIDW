import { motion } from 'framer-motion'
import { profile } from '../data/portfolio'

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <span className="mono-label">04 / Contact</span>
        <h2 className="contact__heading">
          Got something worth <em>building</em>?
        </h2>
        <p className="contact__lede">
          I take on a handful of projects a year — mostly ones with a
          real technical problem in the middle of them.
        </p>
        <a className="contact__email" href={`mailto:${profile.email}`}>
          {profile.email} ↗
        </a>

        <div className="contact__social">
          <a href={profile.social.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.social.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.social.twitter} target="_blank" rel="noreferrer">
            Twitter
          </a>
        </div>
      </motion.div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} {profile.name}</p>
      </footer>
    </section>
  )
}
