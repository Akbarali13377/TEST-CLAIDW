import { useMemo, useRef } from 'react'
import { motion } from 'framer-motion'

function seedFromString(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0
  }
  return h
}

function makeRng(seed) {
  let s = seed
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) | 0
    return ((s >>> 0) / 4294967296)
  }
}

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null)

  const cover = useMemo(() => {
    const rng = makeRng(seedFromString(project.title))
    const blobs = Array.from({ length: 3 }, () => ({
      x: 10 + rng() * 80,
      y: 10 + rng() * 80,
      size: 40 + rng() * 40,
    }))
    return blobs
      .map(
        (b, i) =>
          `radial-gradient(circle at ${b.x}% ${b.y}%, color-mix(in srgb, var(--accent) ${45 - i * 10}%, transparent) 0%, transparent ${b.size}%)`,
      )
      .join(', ')
  }, [project.title])

  function handleMouseMove(e) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateX = ((y / rect.height) - 0.5) * -4
    const rotateY = ((x / rect.width) - 0.5) * 4
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  function handleMouseLeave() {
    const card = cardRef.current
    if (card) card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)'
  }

  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--accent': project.color }}
    >
      <div className="project-card__cover" style={{ backgroundImage: cover }}>
        <span className="mono-label">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="project-card__body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
