import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Lenis smooth scroll, driven from GSAP's ticker so ScrollTrigger and the
 * scroll position never disagree by a frame. Disabled outright when the
 * visitor asked for reduced motion — hijacking scroll is exactly what that
 * preference is about.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReduced()) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Anchor links must go through Lenis, or they jump while it interpolates.
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -80 })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}

/**
 * Scroll-driven reveal for any element carrying [data-reveal]. Children of a
 * [data-reveal-group] stagger. Elements are visible by default in CSS, so a
 * failure here degrades to plain content rather than a blank page.
 */
export function useScrollReveals(deps = []) {
  useEffect(() => {
    if (prefersReduced()) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 34,
          opacity: 0,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })

      gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
        gsap.from(group.children, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.09,
          scrollTrigger: { trigger: group, start: 'top 84%', once: true },
        })
      })
    })

    ScrollTrigger.refresh()
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
