'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { ProcessTooltip } from './ProcessTooltip';
import { useReducedMotion } from 'framer-motion';

interface ProcessStation3DProps {
  position: [number, number, number];
  title: string;
  description: string;
  number: string;
  rotationSpeed?: number;
}

export function ProcessStation3D({ position, title, description, number, rotationSpeed = 0.5 }: ProcessStation3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  const [hovered, setHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  useCursor(hovered);

  useFrame((state, delta) => {
    if (shouldReduceMotion) return;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * rotationSpeed;
      ring1Ref.current.rotation.y += delta * (rotationSpeed * 0.8);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x -= delta * (rotationSpeed * 0.5);
      ring2Ref.current.rotation.z += delta * rotationSpeed;
    }

    if (groupRef.current) {
      // Smooth scale up on hover
      const targetScale = hovered ? 1.1 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }

    if (coreRef.current) {
      // Pulse emissive intensity on hover
      const material = coreRef.current.material as THREE.MeshStandardMaterial;
      const targetIntensity = hovered ? 4 : 2;
      material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, targetIntensity, 0.1);
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
    >
      <ProcessTooltip visible={hovered} title={title} description={description} number={number} />

      {/* Glass Platform */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.2, 32]} />
        <meshPhysicalMaterial 
          color="#FDF2F8"
          transmission={0.9}
          opacity={1}
          metalness={0.1}
          roughness={0.2}
          ior={1.5}
          thickness={0.5}
        />
      </mesh>

      {/* Inner Energy Sphere Core */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial 
          color="#EC4899" 
          emissive="#EC4899"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Rotating Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.6, 0.05, 16, 64]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.5} />
      </mesh>

      {/* Rotating Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.0, 0.03, 16, 64]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} opacity={0.5} transparent />
      </mesh>
    </group>
  );
}
