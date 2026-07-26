import { useEffect, useState } from 'react'
import { profile } from '../data/portfolio'

const links = [
  { href: '#thesis', label: 'Approach' },
  { href: '#work', label: 'Artifacts' },
  { href: '#behaviour', label: 'Behaviour' },
  { href: '#about', label: 'About' },
]

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let raf = null
    const update = () => {
      raf = null
      setSolid(window.scrollY > 16)
    }
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (raf !== null) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <nav className={`nav ${solid ? 'nav--solid' : ''}`}>
      <a href="#top" className="nav__mark">
        {profile.wordmark}
      </a>

      <div className={`nav__links ${open ? 'is-open' : ''}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </div>

      <div className="nav__end">
        <a href="#contact" className="btn btn--blue">
          Get in touch
        </a>
        <button
          className="nav__burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
