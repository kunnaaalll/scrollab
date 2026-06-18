'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * ConnectionBeam — a thin glowing line (Jarvis hologram aesthetic).
 *
 * Implemented as a Three.js Line with BufferGeometry.
 * Much cheaper than Line2 from three/examples for this use case.
 */
interface ConnectionBeamProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  opacity?: number;
}

export function ConnectionBeam({
  start,
  end,
  color = '#06B6D4',
  opacity = 0.4,
}: ConnectionBeamProps) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pts = new Float32Array([...start, ...end]);
    geo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    return geo;
  }, [start, end]);

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity,
      linewidth: 1,
    });
  }, [color, opacity]);

  const line = useMemo(() => new THREE.Line(geometry, material), [geometry, material]);

  useFrame((state) => {
    // Subtle pulse on opacity
    (line.material as THREE.LineBasicMaterial).opacity = 
      opacity * (0.7 + Math.sin(state.clock.elapsedTime * 1.5) * 0.3);
  });

  return <primitive object={line} />;
}

/**
 * ConnectionBeams — composite set of beams radiating from the sphere to orbit points.
 * Positions are approximate — they pulse with the OrbitMetrics orbit.
 * We keep them static for performance (no per-frame position updates).
 */
export function ConnectionBeams() {
  const beams: ConnectionBeamProps[] = useMemo(
    () => [
      { start: [0, 0, 0], end: [3.0, 0.4, 0],    color: '#06B6D4', opacity: 0.35 },
      { start: [0, 0, 0], end: [-3.2, -0.3, 0],   color: '#EC4899', opacity: 0.30 },
      { start: [0, 0, 0], end: [0, 0.6, -2.8],     color: '#22D3EE', opacity: 0.28 },
      { start: [0, 0, 0], end: [0, -0.5, 3.1],    color: '#F472B6', opacity: 0.28 },
      // Additional cross-connections for hologram feel
      { start: [3.0, 0.4, 0],  end: [0, 0.6, -2.8], color: '#06B6D4', opacity: 0.15 },
      { start: [-3.2, -0.3, 0], end: [0, -0.5, 3.1], color: '#EC4899', opacity: 0.12 },
    ],
    []
  );

  return (
    <group>
      {beams.map((beam, i) => (
        <ConnectionBeam key={i} {...beam} />
      ))}
    </group>
  );
}
