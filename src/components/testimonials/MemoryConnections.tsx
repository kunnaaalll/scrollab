"use client";

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import { TestimonialData } from './TestimonialsData';

interface Props {
  testimonials: TestimonialData[];
}

export function MemoryConnections({ testimonials }: Props) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const shouldReduceMotion = useReducedMotion();

  // Create a fixed set of connections between some nodes
  const { geometry, material } = useMemo(() => {
    const points: THREE.Vector3[] = [];
    
    // Connect node i to i+1
    for (let i = 0; i < testimonials.length - 1; i++) {
      points.push(testimonials[i].position);
      points.push(testimonials[i + 1].position);
    }
    
    // Add one random cross-connection
    if (testimonials.length > 3) {
      points.push(testimonials[0].position);
      points.push(testimonials[3].position);
    }

    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: 0x06B6D4, // Cyan
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, [testimonials]);

  useFrame((state) => {
    if (shouldReduceMotion || !lineRef.current) return;
    
    // Subtle pulsing of the connections
    const time = state.clock.elapsedTime;
    (lineRef.current.material as THREE.LineBasicMaterial).opacity = 0.1 + Math.sin(time * 0.8) * 0.05;
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry} material={material} />
  );
}
