import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

function Gem() {
  const groupRef = useRef()
  const pointer = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    const scrollT = Math.min(window.scrollY / (window.innerHeight * 0.9), 1)

    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.02
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.02

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (0.12 + scrollT * 0.9)
      groupRef.current.rotation.x = pointer.current.y * 0.25 + scrollT * 0.9
      groupRef.current.rotation.z = -pointer.current.x * 0.12 + scrollT * 0.3
      const scale = 1 - scrollT * 0.25
      groupRef.current.scale.setScalar(scale)
      groupRef.current.position.y = -scrollT * 0.6
    }
  })

  return (
    <group ref={groupRef}>
      <mesh castShadow>
        <icosahedronGeometry args={[1.7, 0]} />
        <meshPhysicalMaterial
          color="#8a4326"
          roughness={0.28}
          metalness={0.55}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          flatShading
        />
      </mesh>
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
    if (ref.current) ref.current.rotation.y += delta * 0.015
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
      <pointsMaterial size={0.02} color="#948c7d" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

function Rig() {
  const { pointer } = useThree()
  const target = useRef({ x: 0, y: 0 })
  useFrame((state) => {
    const scrollT = Math.min(window.scrollY / (window.innerHeight * 0.9), 1)
    target.current.x += (pointer.x - target.current.x) * 0.03
    target.current.y += (pointer.y - target.current.y) * 0.03
    state.camera.position.x = target.current.x * 0.4
    state.camera.position.y = target.current.y * 0.25
    state.camera.position.z = 6 - scrollT * 1.2
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
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 5, 3]} intensity={1.6} color="#f2e6d3" />
        <pointLight position={[-4, -2, 2]} intensity={0.8} color="#c1502f" />
        <pointLight position={[0, -3, -4]} intensity={0.4} color="#3a3530" />

        <Gem />
        <Dust />
        <Rig />
      </Suspense>
    </Canvas>
  )
}
