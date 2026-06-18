"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

export function MemoryCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const shouldReduceMotion = useReducedMotion();

  useFrame((state, delta) => {
    if (shouldReduceMotion) return;
    
    // Very slow rotations for the 20-40s duration requested
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.05;
      coreRef.current.rotation.z += delta * 0.02;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.x += delta * 0.1;
      ringRef1.current.rotation.y += delta * 0.05;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y -= delta * 0.08;
      ringRef2.current.rotation.z -= delta * 0.04;
    }
  });

  return (
    <group position={[0, 0, -300]}>
      {/* Inner glowing sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[40, 64, 64]} />
        <meshPhysicalMaterial 
          color="#06B6D4" // Cyan
          emissive="#06B6D4"
          emissiveIntensity={1.5}
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Orbital Ring 1 */}
      <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[70, 0.5, 16, 100]} />
        <meshBasicMaterial color="#EC4899" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh ref={ringRef2} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[90, 0.2, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}
