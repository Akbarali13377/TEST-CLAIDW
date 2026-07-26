import { about, profile } from '../data/portfolio'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="about glass" data-reveal>
        <div className="about__main">
          <span className="tag tag--blue">About</span>
          <p className="about__body">{about.body}</p>
        </div>

        <dl className="about__facts">
          {about.facts.map(([k, v]) => (
            <div className="fact" key={k}>
              <dt className="tag">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div id="contact" className="cta glass" data-reveal>
        <h2 className="cta__title">Got something that has to be fast?</h2>
        <a className="cta__mail" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <div className="cta__links">
          <a href={profile.social.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={profile.social.twitter} target="_blank" rel="noreferrer">Twitter</a>
        </div>
      </div>

      <footer className="footer">
        <span className="tag">© {new Date().getFullYear()} {profile.name}</span>
        <span className="tag">React · Three.js · GLSL · GSAP · Lenis</span>
      </footer>
    </section>
  )
}
