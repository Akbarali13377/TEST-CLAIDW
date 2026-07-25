import { motion } from 'framer-motion'
import { profile } from '../data/portfolio'

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <motion.div
        className="contact__card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <span className="section__label">04 — Contact</span>
        <h2>
          Let's build something
          <br />
          <span className="gradient-text">amazing together.</span>
        </h2>
        <p>
          Have a project in mind or just want to say hi? My inbox is always
          open.
        </p>
        <a className="btn btn--primary" href={`mailto:${profile.email}`}>
          {profile.email}
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
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React &
          Three.js.
        </p>
      </footer>
    </section>
  )
}
