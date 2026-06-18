'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';

interface JourneyPacketsProps {
  points: THREE.Vector3[];
  count?: number;
}

export function JourneyPackets({ points, count = 10 }: JourneyPacketsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const shouldReduceMotion = useReducedMotion();

  // Create curve for packets to follow
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

  // Initial offsets for packets along the curve
  const offsets = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = Math.random(); // Initial position (0 to 1) along the curve
    }
    return arr;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (shouldReduceMotion || !meshRef.current) return;

    for (let i = 0; i < count; i++) {
      // Move packet along curve
      offsets[i] = (offsets[i] + delta * 0.1) % 1; // Speed multiplier: 0.1
      
      const t = offsets[i];
      const position = curve.getPoint(t);
      
      dummy.position.copy(position);
      dummy.updateMatrix();
      
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshBasicMaterial color="#06B6D4" transparent opacity={0.6} />
    </instancedMesh>
  );
}
