import { useEffect, useState } from 'react'

const links = [
  { href: '#about', label: 'About', n: '01' },
  { href: '#skills', label: 'Skills', n: '02' },
  { href: '#projects', label: 'Projects', n: '03' },
  { href: '#contact', label: 'Contact', n: '04' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
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
    </nav>
  )
}
