import Magnetic from './Magnetic'
import Reveal from './Reveal'
import { profile } from '../data/portfolio'

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="section__index">
        <span className="mono-label">04</span>
        <span className="mono-label">Contact</span>
      </div>

      <Reveal as="h2" className="statement" text="Got something that needs to be fast?" />

      <Magnetic strength={0.18}>
        <a className="contact__email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </Magnetic>

      <div className="contact__meta">
        <div>
          <span className="mono-label">Elsewhere</span>
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
        </div>
        <div>
          <span className="mono-label">Availability</span>
          <p className="contact__note">
            Taking on two projects for Q3. Best reached by email.
          </p>
        </div>
      </div>

      <footer className="footer">
        <span className="mono-label">© {new Date().getFullYear()} {profile.name}</span>
        <span className="mono-label">Built with React, Three.js & GLSL</span>
      </footer>
    </section>
  )
}
