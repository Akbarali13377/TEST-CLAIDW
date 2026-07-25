import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  MeshDistortMaterial,
  Stars,
  Sparkles,
} from '@react-three/drei'

function CentralShape() {
  const meshRef = useRef()

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={1.6}>
      <mesh ref={meshRef} position={[0, 0, -1.5]} scale={0.85}>
        <icosahedronGeometry args={[1.6, 1]} />
        <MeshDistortMaterial
          color="#7c5cff"
          emissive="#3a1e8f"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.6}
          distort={0.35}
          speed={1.5}
        />
      </mesh>
    </Float>
  )
}

function OrbitingRing({ radius, tilt, color, speed }) {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed
  })
  return (
    <group rotation={[tilt, 0, 0]}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, 0.015, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

function FloatingShapes() {
  const shapes = [
    { pos: [-3.2, 1.4, -2], geo: 'box', color: '#22d3ee' },
    { pos: [3.4, -1.2, -1.5], geo: 'octahedron', color: '#ff6b9d' },
    { pos: [-2.6, -1.8, -3], geo: 'torus', color: '#ffb84d' },
    { pos: [2.8, 2.1, -2.5], geo: 'tetrahedron', color: '#7c5cff' },
  ]

  return shapes.map((s, i) => (
    <Float key={i} speed={1 + i * 0.3} rotationIntensity={2} floatIntensity={2}>
      <mesh position={s.pos} scale={0.5}>
        {s.geo === 'box' && <boxGeometry args={[1, 1, 1]} />}
        {s.geo === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
        {s.geo === 'torus' && <torusGeometry args={[0.7, 0.25, 16, 32]} />}
        {s.geo === 'tetrahedron' && <tetrahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color={s.color}
          roughness={0.3}
          metalness={0.5}
          emissive={s.color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  ))
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#7c5cff" />
        <pointLight position={[-5, -3, -5]} intensity={0.8} color="#22d3ee" />

        <Stars radius={60} depth={40} count={2000} factor={2.5} fade speed={0.6} />
        <Sparkles count={60} scale={8} size={2} speed={0.3} color="#7c5cff" />

        <CentralShape />
        <FloatingShapes />
        <OrbitingRing radius={2.4} tilt={0.6} color="#7c5cff" speed={0.15} />
        <OrbitingRing radius={2.9} tilt={-0.4} color="#22d3ee" speed={-0.1} />
      </Suspense>
    </Canvas>
  )
}
