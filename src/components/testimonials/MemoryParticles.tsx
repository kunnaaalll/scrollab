"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

export function MemoryParticles() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const particleCount = 150;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate random positions and colors
  const { positions, colors, factors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const factors = new Float32Array(particleCount);
    
    const colorChoices = [
      new THREE.Color('#EC4899'), // Pink
      new THREE.Color('#06B6D4'), // Cyan
      new THREE.Color('#ffffff'), // White
    ];

    for (let i = 0; i < particleCount; i++) {
      // Widespread spatial distribution
      positions[i * 3] = (Math.random() - 0.5) * 800; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 600; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400 - 100; // z (slightly pushed back)

      const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      factors[i] = Math.random(); // Random factor for speed/phase
    }

    return { positions, colors, factors };
  }, [particleCount]);

  useFrame((state) => {
    if (shouldReduceMotion || !mesh.current) return;
    
    const time = state.clock.elapsedTime * 0.1;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const factor = factors[i];
      const x = positions[i3] + Math.sin(time * factor * 5) * 20;
      const y = positions[i3 + 1] + Math.cos(time * factor * 3) * 20;
      const z = positions[i3 + 2];

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(1 + Math.sin(time * 10 + factor) * 0.2); // Subtle pulsing
      dummy.updateMatrix();
      
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[1, 16, 16]}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </sphereGeometry>
      <meshBasicMaterial 
        vertexColors 
        transparent 
        opacity={0.15} 
        depthWrite={false} 
        blending={THREE.AdditiveBlending} 
      />
    </instancedMesh>
  );
}
