'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * OuterRing — thin, illuminated cyan torus ring.
 * Slow rotation: ~50 seconds per revolution.
 * Geometry: TorusGeometry (thin tube radius).
 */
export function OuterRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ringRef.current) return;
    // ~50s revolution = 2π / 50 radians per second
    ringRef.current.rotation.z += delta * (Math.PI * 2) / 50;
    ringRef.current.rotation.x += delta * (Math.PI * 2) / 120;
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 6, 0, 0]}>
      <torusGeometry args={[2.2, 0.008, 16, 200]} />
      <meshStandardMaterial
        color="#06B6D4"
        emissive="#06B6D4"
        emissiveIntensity={3.5}
        transparent
        opacity={0.9}
        roughness={0}
        metalness={0.2}
      />
    </mesh>
  );
}
