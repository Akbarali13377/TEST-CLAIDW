import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Thesis from './components/Thesis'
import Work from './components/Work'
import Behaviour from './components/Behaviour'
import About from './components/About'
import { useScrollReveals, useSmoothScroll } from './lib/motion'
import './App.css'

export default function App() {
  useSmoothScroll()
  useScrollReveals()

  return (
    <>
      <a href="#thesis" className="skip-link">Skip to content</a>
      <div className="ambient" aria-hidden="true" />
      <Navbar />
      <main id="content">
        <Hero />
        <Thesis />
        <Work />
        <Behaviour />
        <About />
      </main>
    </>
  )
}
