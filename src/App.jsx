import { useCallback, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Stack from './components/Stack'
import Projects from './components/Projects'
import Contact from './components/Contact'
import './App.css'

export default function App() {
  const [ready, setReady] = useState(false)
  const onDone = useCallback(() => setReady(true), [])

  return (
    <MotionConfig reducedMotion="user">
      <Preloader onDone={onDone} />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </main>
    </MotionConfig>
  )
}
