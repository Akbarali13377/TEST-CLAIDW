import { thesis } from '../data/portfolio'

export default function Thesis() {
  return (
    <section id="thesis" className="section">
      <div className="thesis glass" data-reveal>
        <span className="tag tag--blue">Approach</span>
        <h2 className="thesis__question">{thesis.question}</h2>
        <p className="thesis__body">{thesis.body}</p>
      </div>
    </section>
  )
}
