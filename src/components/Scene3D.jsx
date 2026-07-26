import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Lightformer } from '@react-three/drei'
import { Bloom, EffectComposer, N8AO, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { fragmentShader, vertexShader } from '../shaders/monolith'

const reduced =
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

/** Centrepiece: the displaced shader mass. */
function Core() {
  const mesh = useRef()
  const mat = useRef()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.22 },
      uFreq: { value: 0.7 },
      uPulse: { value: 1 },
      uBase: { value: new THREE.Color('#0c1017') },
      uAccent: { value: new THREE.Color('#2f6bff') },
      uSheen: { value: new THREE.Color('#c2ceda') },
    }),
    [],
  )

  useFrame((_, delta) => {
    if (!mesh.current || !mat.current) return
    if (!reduced) {
      mat.current.uniforms.uTime.value += delta
      mesh.current.rotation.y += delta * 0.09
      mesh.current.rotation.x += delta * 0.025
    }
  })

  return (
    <mesh ref={mesh} position={[0, 0, -1.7]} scale={0.82}>
      <icosahedronGeometry args={[1.42, 64]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

/** Metallic satellites drifting at different depths — parallax material. */
function Satellites() {
  const items = useMemo(
    () => [
      { p: [-2.9, 1.15, -1.6], s: 0.34, geo: 'ico', speed: 1.1 },
      { p: [2.75, -0.85, -1.1], s: 0.26, geo: 'oct', speed: 1.5 },
      { p: [2.25, 1.5, -2.6], s: 0.2, geo: 'tet', speed: 0.9 },
      { p: [-2.35, -1.35, -2.2], s: 0.3, geo: 'oct', speed: 1.3 },
    ],
    [],
  )

  return items.map((it, i) => (
    <Float
      key={i}
      speed={reduced ? 0 : it.speed}
      rotationIntensity={reduced ? 0 : 0.8}
      floatIntensity={reduced ? 0 : 1.1}
    >
      <mesh position={it.p} scale={it.s}>
        {it.geo === 'ico' && <icosahedronGeometry args={[1, 0]} />}
        {it.geo === 'oct' && <octahedronGeometry args={[1, 0]} />}
        {it.geo === 'tet' && <tetrahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color="#aab6c6"
          metalness={1}
          roughness={0.18}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  ))
}

/** Slow-drifting dust for depth. */
function Particles({ count = 160 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 12
      a[i * 3 + 1] = (Math.random() - 0.5) * 9
      a[i * 3 + 2] = (Math.random() - 0.5) * 7 - 1.5
    }
    return a
  }, [count])

  useFrame((_, d) => {
    if (ref.current && !reduced) ref.current.rotation.y += d * 0.012
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#93a3b8" transparent opacity={0.62} sizeAttenuation />
    </points>
  )
}

/** Physics-ish camera: critically damped follow of the pointer. */
function CameraRig() {
  const { pointer } = useThree()
  const cur = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    if (reduced) {
      state.camera.position.set(0, 0, 5)
      state.camera.lookAt(0, 0, 0)
      return
    }
    // Frame-rate independent smoothing, so the feel is identical at 30 and 144.
    const k = 1 - Math.pow(0.0015, delta)
    cur.current.x += (pointer.x - cur.current.x) * k
    cur.current.y += (pointer.y - cur.current.y) * k
    state.camera.position.x = cur.current.x * 1.15
    state.camera.position.y = cur.current.y * 0.72
    state.camera.position.z = 5
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene3D() {
  const wrap = useRef(null)
  const [onScreen, setOnScreen] = useState(true)
  const [supported] = useState(hasWebGL)

  useEffect(() => {
    const el = wrap.current
    if (!el || !supported) return
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), {
      rootMargin: '150px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [supported])

  if (!supported) return <div className="scene-fallback" aria-hidden="true" />

  return (
    <div ref={wrap} className="scene-wrap">
      <Canvas
        frameloop={onScreen ? 'always' : 'never'}
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <fog attach="fog" args={['#05060a', 4.4, 12]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 5, 3]} intensity={1.5} color="#dbe6f2" />
        <pointLight position={[-4, -1.5, 2]} intensity={12} distance={14} color="#2f6bff" />
        {/* Reflections are built in-scene from lightformers rather than a
            preset, which would pull an HDR off a third-party CDN at runtime. */}
        <Environment resolution={256}>
          <Lightformer intensity={2.4} position={[0, 3.5, -2]} scale={[9, 3, 1]} color="#eaf1ff" />
          <Lightformer intensity={1.6} position={[-4, 0.5, 1]} scale={[3, 6, 1]} color="#2f6bff" />
          <Lightformer intensity={1.1} position={[4, -1, 1]} scale={[3, 5, 1]} color="#8fa4bd" />
          <Lightformer intensity={0.8} position={[0, -3.5, 1]} scale={[8, 2, 1]} color="#5a6b82" />
        </Environment>

        <Core />
        <Satellites />
        <Particles />
        <CameraRig />

        {/* Bloom + ambient occlusion. Skipped under reduced motion to keep
            the GPU cost proportionate to what is actually moving. */}
        {!reduced && (
          <EffectComposer enableNormalPass multisampling={0}>
            <N8AO intensity={1.6} aoRadius={1.1} distanceFalloff={0.9} />
            <Bloom intensity={0.42} luminanceThreshold={0.55} luminanceSmoothing={0.3} mipmapBlur />
            <Vignette eskil={false} offset={0.22} darkness={0.72} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}
