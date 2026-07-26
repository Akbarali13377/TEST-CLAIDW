import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/portfolio'

function seed(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0
  return h
}

function rng(s) {
  let x = s
  return () => {
    x = (Math.imul(x, 1664525) + 1013904223) | 0
    return (x >>> 0) / 4294967296
  }
}

function plate(project) {
  const r = rng(seed(project.title))
  return Array.from({ length: 3 }, (_, i) => {
    const x = 12 + r() * 76
    const y = 12 + r() * 76
    const size = 38 + r() * 40
    return `radial-gradient(circle at ${x}% ${y}%, color-mix(in srgb, ${project.color} ${52 - i * 13}%, transparent) 0%, transparent ${size}%)`
  }).join(', ')
}

/**
 * Pinned horizontal gallery: a tall spacer drives vertical scroll, while the
 * sticky viewport inside translates the track sideways. Falls back to a plain
 * vertical stack on narrow screens, where sideways scroll is a nuisance.
 */
export default function Projects() {
  const outerRef = useRef(null)
  const trackRef = useRef(null)
  const [horizontal, setHorizontal] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)')
    const sync = () => setHorizontal(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!horizontal) {
      if (trackRef.current) trackRef.current.style.transform = ''
      if (outerRef.current) outerRef.current.style.height = ''
      return
    }

    let raf = null

    const update = () => {
      raf = null
      const outer = outerRef.current
      const track = trackRef.current
      if (!outer || !track) return

      const distance = track.scrollWidth - window.innerWidth
      if (distance <= 0) {
        track.style.transform = ''
        return
      }

      // One pixel of vertical scroll moves the track one pixel sideways,
      // so the gallery never feels heavier than the wheel.
      outer.style.height = `${window.innerHeight + distance}px`

      const travel = outer.offsetHeight - window.innerHeight
      const passed = -outer.getBoundingClientRect().top
      const p = Math.min(Math.max(passed / travel, 0), 1)
      track.style.transform = `translate3d(${-p * distance}px, 0, 0)`
    }

    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf !== null) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [horizontal])

  const cards = projects.map((p, i) => (
    <article className="card" key={p.title} style={{ '--tone': p.color }}>
      <div className="card__plate" style={{ backgroundImage: plate(p) }}>
        <span className="card__n">{String(i + 1).padStart(2, '0')}</span>
      </div>
      <div className="card__body">
        <h3 className="card__title">{p.title}</h3>
        <p className="card__desc">{p.description}</p>
        <ul className="card__tags">
          {p.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </article>
  ))

  return (
    <section id="work" className="work">
      <div className="work__head section">
        <div className="section__index">
          <span className="mono-label">03</span>
          <span className="mono-label">Selected work</span>
        </div>
        <h2 className="work__title">Four things worth showing</h2>
      </div>

      {horizontal ? (
        <div ref={outerRef} className="work__outer">
          <div className="work__sticky">
            <div ref={trackRef} className="work__track">
              {cards}
              <div className="work__end">
                <span className="mono-label">End of selection</span>
                <a href="#contact" className="work__end-link">
                  Start a project
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="work__stack section">{cards}</div>
      )}
    </section>
  )
}
