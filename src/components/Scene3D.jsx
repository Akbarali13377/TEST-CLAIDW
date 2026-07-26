import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { fragmentShader, vertexShader } from '../shaders/monolith'

const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function hasWebGL() {
  if (typeof window === 'undefined') return false
  try {
    const c = document.createElement('canvas')
    return Boolean(
      (window.WebGL2RenderingContext && c.getContext('webgl2')) ||
        (window.WebGLRenderingContext && c.getContext('webgl')),
    )
  } catch {
    return false
  }
}

function scrollProgress() {
  if (typeof window === 'undefined') return 0
  return Math.min(window.scrollY / (window.innerHeight * 0.9), 1)
}

function Monolith() {
  const meshRef = useRef()
  const matRef = useRef()
  const drift = useRef({ x: 0, y: 0 })

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.3 },
      uFreq: { value: 0.62 },
      uPulse: { value: 1 },
      uBase: { value: new THREE.Color('#0b0e11') },
      uAccent: { value: new THREE.Color('#ff5f1f') },
      uSheen: { value: new THREE.Color('#8ea6b8') },
    }),
    [],
  )

  useFrame((state, delta) => {
    const t = scrollProgress()
    const m = meshRef.current
    if (!m || !matRef.current) return

    matRef.current.uniforms.uTime.value += reducedMotion ? 0 : delta
    matRef.current.uniforms.uPulse.value = 1 - t * 0.55

    m.scale.setScalar(1 - t * 0.18)
    m.position.y = -t * 0.5

    if (reducedMotion) {
      m.rotation.set(0.2, 0.6, 0)
      return
    }

    drift.current.x += (state.pointer.x - drift.current.x) * 0.025
    drift.current.y += (state.pointer.y - drift.current.y) * 0.025

    m.rotation.y += delta * (0.1 + t * 0.55)
    m.rotation.x = drift.current.y * 0.3 + t * 0.5
    m.rotation.z = -drift.current.x * 0.14
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.55, 64]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

function Rig() {
  useFrame((state) => {
    state.camera.position.z = 5.2 - scrollProgress() * 0.9
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene3D() {
  const wrapRef = useRef(null)
  const [onScreen, setOnScreen] = useState(true)
  const [supported] = useState(hasWebGL)

  // Stop rendering entirely once the hero leaves the viewport. Without this the
  // GPU keeps drawing a 64-subdivision noise shader while the visitor reads the
  // work section — pure battery burn on a page that is about frame budget.
  useEffect(() => {
    const el = wrapRef.current
    if (!el || !supported) return
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: '120px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [supported])

  if (!supported) return <div className="scene-fallback" aria-hidden="true" />

  return (
    <div ref={wrapRef} className="scene-wrap">
      <Canvas
        frameloop={onScreen ? 'always' : 'never'}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Monolith />
        <Rig />
      </Canvas>
    </div>
  )
}
