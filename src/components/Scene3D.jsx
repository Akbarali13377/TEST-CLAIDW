import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Gem() {
  const groupRef = useRef()
  const pointer = useRef({ x: 0, y: 0 })
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.7, 0)), [])

  useFrame((state, delta) => {
    const scrollT = Math.min(window.scrollY / (window.innerHeight * 0.9), 1)
    if (!groupRef.current) return

    const scale = 1 - scrollT * 0.25
    groupRef.current.scale.setScalar(scale)
    groupRef.current.position.y = -scrollT * 0.6

    if (prefersReducedMotion) {
      groupRef.current.rotation.set(0.3, 0.5, 0)
      return
    }

    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.02
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.02

    groupRef.current.rotation.y += delta * (0.12 + scrollT * 0.9)
    groupRef.current.rotation.x = pointer.current.y * 0.25 + scrollT * 0.9
    groupRef.current.rotation.z = -pointer.current.x * 0.12 + scrollT * 0.3
  })

  return (
    <group ref={groupRef}>
      <mesh castShadow>
        <icosahedronGeometry args={[1.7, 0]} />
        <meshPhysicalMaterial
          color="#232a30"
          roughness={0.32}
          metalness={0.8}
          clearcoat={0.4}
          clearcoatRoughness={0.3}
          flatShading
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#ff5f1f" transparent opacity={0.5} />
      </lineSegments>
    </group>
  )
}

function Dust() {
  const count = 90
  const ref = useRef()
  const positions = useRef(
    Float32Array.from(
      Array.from({ length: count }, () => [
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 6 - 1,
      ]).flat(),
    ),
  )

  useFrame((_, delta) => {
    if (ref.current && !prefersReducedMotion) ref.current.rotation.y += delta * 0.015
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#5b6670" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

function Rig() {
  const { pointer } = useThree()
  const target = useRef({ x: 0, y: 0 })
  useFrame((state) => {
    const scrollT = Math.min(window.scrollY / (window.innerHeight * 0.9), 1)
    state.camera.position.z = 6 - scrollT * 1.2
    if (!prefersReducedMotion) {
      target.current.x += (pointer.x - target.current.x) * 0.03
      target.current.y += (pointer.y - target.current.y) * 0.03
      state.camera.position.x = target.current.x * 0.4
      state.camera.position.y = target.current.y * 0.25
    }
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 38 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 5, 3]} intensity={1.4} color="#dfe6ec" />
        <pointLight position={[-4, -2, 2]} intensity={0.9} color="#ff5f1f" />
        <pointLight position={[0, -3, -4]} intensity={0.5} color="#2a3238" />

        <Gem />
        <Dust />
        <Rig />
      </Suspense>
    </Canvas>
  )
}
