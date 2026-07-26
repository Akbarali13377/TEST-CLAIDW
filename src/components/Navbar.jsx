import { useEffect, useRef, useState } from 'react'

const links = [
  { href: '#about', label: 'About', n: '01' },
  { href: '#skills', label: 'Skills', n: '02' },
  { href: '#projects', label: 'Projects', n: '03' },
  { href: '#contact', label: 'Contact', n: '04' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const progressRef = useRef(null)

  useEffect(() => {
    let ticking = false

    const update = () => {
      setScrolled(window.scrollY > 20)
      const height = document.documentElement.scrollHeight - window.innerHeight
      const pct = height > 0 ? (window.scrollY / height) * 100 : 0
      if (progressRef.current) progressRef.current.style.width = `${pct}%`
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a href="#top" className="navbar__brand">
        Alex Morgan
      </a>
      <div className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            <span className="mono-label">{l.n}</span> {l.label}
          </a>
        ))}
      </div>
      <button
        className="navbar__toggle"
        aria-label="Toggle menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
      <div className="navbar__progress" aria-hidden="true">
        <div ref={progressRef} className="navbar__progress-fill" />
      </div>
    </nav>
  )
}
