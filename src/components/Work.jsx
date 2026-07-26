import { artifacts } from '../data/portfolio'

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="section__head" data-reveal>
        <span className="tag tag--blue">Artifacts</span>
        <h2 className="section__title">Things built, and what they cost.</h2>
      </div>

      <div className="cards" data-reveal-group>
        {artifacts.map((a) => (
          <article className="card glass" key={a.name}>
            <span className="tag">{a.category}</span>
            <h3 className="card__name">{a.name}</h3>
            <p className="card__line">{a.line}</p>
            <span className="card__cta">
              {a.cta}
              <i className="card__arrow" aria-hidden="true">→</i>
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}
