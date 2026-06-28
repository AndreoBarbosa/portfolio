import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { RootState } from '@react-three/fiber'
import * as THREE from 'three'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Wireframe() {
  const groupRef = useRef<THREE.Group | null>(null)

  const outerEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.8, 1)),
    []
  )
  const innerEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.0, 0)),
    []
  )

  useEffect(() => {
    return () => {
      outerEdges.dispose()
      innerEdges.dispose()
    }
  }, [outerEdges, innerEdges])

  useFrame((_state: RootState, delta: number) => {
    if (!prefersReducedMotion && groupRef.current) {
      groupRef.current.rotation.x += delta * 0.04
      groupRef.current.rotation.y += delta * 0.065
    }
  })

  return (
    <group ref={groupRef} position={[0, 0.2, 0]} rotation={[0.5, 0.3, 0.1]}>
      <lineSegments geometry={outerEdges}>
        <lineBasicMaterial color="#D99A4E" opacity={0.25} transparent />
      </lineSegments>
      <lineSegments geometry={innerEdges}>
        <lineBasicMaterial color="#F2EDE3" opacity={0.09} transparent />
      </lineSegments>
    </group>
  )
}

export default function HeroGeometry() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      dpr={[1, 2]}
    >
      <Wireframe />
    </Canvas>
  )
}
