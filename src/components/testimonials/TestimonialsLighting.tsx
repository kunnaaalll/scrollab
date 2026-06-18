"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

export function TestimonialsLighting() {
  const groupRef = useRef<THREE.Group>(null);
  const shouldReduceMotion = useReducedMotion();

  // Subtle pulsing of lights
  useFrame((state) => {
    if (shouldReduceMotion || !groupRef.current) return;
    const time = state.clock.elapsedTime;
    
    // Animate the cyan area light intensity slightly
    const cyanLight = groupRef.current.children[0] as THREE.PointLight;
    if (cyanLight) cyanLight.intensity = 1.5 + Math.sin(time * 0.5) * 0.2;
    
    // Animate the pink rim light
    const pinkLight = groupRef.current.children[1] as THREE.PointLight;
    if (pinkLight) pinkLight.intensity = 1.2 + Math.cos(time * 0.4) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* Cyan area light - Left */}
      <pointLight position={[-200, 100, 50]} color="#06B6D4" intensity={1.5} distance={600} decay={2} />
      
      {/* Pink rim light - Right */}
      <pointLight position={[200, -100, -50]} color="#EC4899" intensity={1.2} distance={500} decay={2} />
      
      {/* Soft white top light */}
      <directionalLight position={[0, 200, 100]} color="#ffffff" intensity={0.5} />
      
      {/* Subtle underglow */}
      <directionalLight position={[0, -200, -50]} color="#06B6D4" intensity={0.3} />
      
      {/* Ambient base */}
      <ambientLight color="#ffffff" intensity={0.1} />
    </group>
  );
}
