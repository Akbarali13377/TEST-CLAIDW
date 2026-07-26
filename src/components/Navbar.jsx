import { useEffect, useRef, useState } from 'react'

const links = [
  { href: '#about', label: 'About', n: '01' },
  { href: '#stack', label: 'Stack', n: '02' },
  { href: '#work', label: 'Work', n: '03' },
  { href: '#contact', label: 'Contact', n: '04' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const bar = useRef(null)

  useEffect(() => {
    let raf = null
    const update = () => {
      raf = null
      setScrolled(window.scrollY > 24)
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`
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
    <nav className={`nav ${scrolled ? 'nav--solid' : ''}`}>
      <a href="#top" className="nav__brand">
        AM<span className="nav__brand-dot" />
      </a>

      <div className={`nav__links ${open ? 'is-open' : ''}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            <span className="mono-label">{l.n}</span>
            {l.label}
          </a>
        ))}
      </div>

      <button
        className={`nav__burger ${open ? 'is-open' : ''}`}
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
      </button>

      <div className="nav__progress" aria-hidden="true">
        <div ref={bar} className="nav__progress-fill" />
      </div>
    </nav>
  )
}
