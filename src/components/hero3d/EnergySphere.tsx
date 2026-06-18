'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * EnergySphere — the dark translucent glass sphere at the heart of the Revenue Engine.
 *
 * Construction:
 * - Outer shell: dark glass material (MeshPhysicalMaterial with transmission)
 * - Inner energy core: small emissive sphere that pulses
 * - Internal glow point light
 */
export function EnergySphere() {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      // Slow pulsing scale
      const scale = 0.7 + Math.sin(t * 0.5) * 0.15;
      coreRef.current.scale.setScalar(scale);
      coreRef.current.rotation.y += 0.003;
      coreRef.current.rotation.x += 0.002;
    }
    if (glowRef.current) {
      glowRef.current.intensity = 8 + Math.sin(t * 0.4) * 3;
    }
  });

  return (
    <group>
      {/* ── Outer glass sphere shell ── */}
      <mesh>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshPhysicalMaterial
          color="#080c18"
          roughness={0}
          metalness={0}
          transmission={0.85}
          thickness={1.2}
          ior={1.4}
          transparent
          opacity={0.6}
          reflectivity={0.3}
          envMapIntensity={0.5}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* ── Inner energy core — rotating gradient mesh ── */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={2.5}
          roughness={1}
          metalness={0}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* ── Secondary pink inner orb ── */}
      <mesh position={[0.1, -0.1, 0.1]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color="#EC4899"
          emissive="#EC4899"
          emissiveIntensity={2.0}
          roughness={1}
          metalness={0}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* ── Internal glow point light ── */}
      <pointLight
        ref={glowRef}
        color="#06B6D4"
        intensity={10}
        distance={8}
        decay={2}
        position={[0, 0, 0]}
      />
    </group>
  );
}
