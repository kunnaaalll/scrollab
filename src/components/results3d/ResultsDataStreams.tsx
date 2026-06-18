"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function ResultsDataStreams() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Respect user preference for reduced motion
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // Particle configuration
  const count = 150;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Pre-calculate random positions and speeds for the data particles
  const particles = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      angle: Math.random() * Math.PI * 2,
      radius: 3 + Math.random() * 4,
      speed: 0.1 + Math.random() * 0.3,
      yOffset: (Math.random() - 0.5) * 8,
      zOffset: (Math.random() - 0.5) * 6,
    }));
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current || prefersReducedMotion) return;

    particles.forEach((particle, i) => {
      // Update angle for circular motion
      particle.angle += particle.speed * delta;
      
      // Calculate new position
      const x = Math.cos(particle.angle) * particle.radius;
      const y = particle.yOffset + Math.sin(state.clock.elapsedTime + i) * 0.5; // Slight bobbing
      const z = Math.sin(particle.angle) * particle.radius + particle.zOffset;

      dummy.position.set(x, y, z);
      // Small scale variation
      const scale = 0.5 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.5;
      dummy.scale.setScalar(scale);
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#06B6D4" transparent opacity={0.6} />
    </instancedMesh>
  );
}
