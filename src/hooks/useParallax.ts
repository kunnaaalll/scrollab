'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import * as THREE from 'three';

export function useParallax(factor: number = 0.1, damp: number = 0.25) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Smoothly animate the position based on pointer position mapped from -1 to 1
    easing.damp3(
      ref.current.position,
      [state.pointer.x * factor, state.pointer.y * factor, 0],
      damp,
      delta
    );
  });
  
  return ref;
}
