'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

interface JourneyPathProps {
  points: THREE.Vector3[];
}

export function JourneyPath({ points }: JourneyPathProps) {
  const curvePoints = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points);
    return curve.getPoints(200);
  }, [points]);

  return (
    <Line 
      points={curvePoints} 
      color="#06B6D4" 
      lineWidth={2} 
      transparent 
      opacity={0.2} 
      blending={THREE.AdditiveBlending} 
    />
  );
}
