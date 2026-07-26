const ITEMS = [
  'WebGL',
  'GLSL',
  'React',
  'Three.js',
  'TypeScript',
  'Shaders',
  'Motion',
  'Performance',
]

export default function Marquee() {
  // Two identical tracks so the loop has no visible seam.
  const track = (key) => (
    <div className="marquee__track" key={key} aria-hidden={key === 'b'}>
      {ITEMS.map((item) => (
        <span className="marquee__item" key={item}>
          {item}
          <i className="marquee__sep">✳</i>
        </span>
      ))}
    </div>
  )

  // Purely decorative: the same tools are listed properly in the Stack section,
  // so let assistive tech skip the repeated loop rather than read it twice.
  return (
    <div className="marquee" aria-hidden="true">
      {track('a')}
      {track('b')}
    </div>
  )
}
