'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * InnerRing — pink secondary ring, counter-rotating at ~35 seconds/revolution.
 * Tilted at a different angle to the OuterRing for orbital depth.
 */
export function InnerRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ringRef.current) return;
    // Counter-rotation: negative direction
    ringRef.current.rotation.z -= delta * (Math.PI * 2) / 35;
    ringRef.current.rotation.y += delta * (Math.PI * 2) / 90;
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
      <torusGeometry args={[1.55, 0.006, 16, 160]} />
      <meshStandardMaterial
        color="#EC4899"
        emissive="#EC4899"
        emissiveIntensity={3.0}
        transparent
        opacity={0.85}
        roughness={0}
        metalness={0.2}
      />
    </mesh>
  );
}
