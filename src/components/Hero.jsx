import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { hero, profile } from '../data/portfolio'

const Scene3D = lazy(() => import('./Scene3D'))

function Telemetry() {
  const start = useRef(Date.now())
  const [t, setT] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setT((Date.now() - start.current) / 1000), 200)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="viewport__telemetry">
      <span className="tag">
        <i className="pulse" /> Live · Ferrite-1
      </span>
      <span className="tag">{t.toFixed(1)}s</span>
    </div>
  )
}

export default function Hero() {
  return (
    <header id="top" className="hero">
      <div className="hero__stage">
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </div>

      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero__inner">
        <span className="tag tag--blue hero__eyebrow">
          {hero.eyebrow} — {profile.location}
        </span>
        <h1 className="hero__headline">{hero.headline}</h1>
        <p className="hero__sub">{hero.sub}</p>

        <div className="hero__actions">
          <a href="#work" className="btn btn--glow">
            See the artifacts
          </a>
          <a href="#thesis" className="btn btn--glass">
            Read the approach
          </a>
        </div>
      </div>

      <div className="hero__hud glass">
        <Telemetry />
      </div>
    </header>
  )
}
