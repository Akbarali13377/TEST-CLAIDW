import { motion } from 'framer-motion'
import { projects } from '../data/portfolio'
import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <motion.div
        className="section__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
      >
        <span className="section__label">03 — Projects</span>
        <h2>Selected work</h2>
      </motion.div>

      <div className="projects__grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
