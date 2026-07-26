import { behaviours } from '../data/portfolio'

export default function Behaviour() {
  return (
    <section id="behaviour" className="section">
      <div className="section__head" data-reveal>
        <span className="tag tag--blue">Behaviour</span>
        <h2 className="section__title">Claims you can check on this page.</h2>
      </div>

      <div className="rows" data-reveal-group>
        {behaviours.map((b) => (
          <div className="row" key={b.label}>
            <h3 className="row__label">{b.label}</h3>
            <p className="row__body">{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
