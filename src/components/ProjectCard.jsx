import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null)

  function handleMouseMove(e) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateX = ((y / rect.height) - 0.5) * -12
    const rotateY = ((x / rect.width) - 0.5) * 12
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
  }

  function handleMouseLeave() {
    const card = cardRef.current
    if (card) card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)'
  }

  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--accent': project.color }}
    >
      <div className="project-card__glow" />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-card__tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </motion.div>
  )
}
