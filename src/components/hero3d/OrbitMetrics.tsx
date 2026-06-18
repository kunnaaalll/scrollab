'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MetricPanel3D } from './MetricPanel3D';

const METRICS = [
  { label: 'ROAS',        value: '+327%',  color: '#06B6D4' },
  { label: 'Leads',       value: '14.2k',  color: '#EC4899' },
  { label: 'ROI',         value: '6.4x',   color: '#22D3EE' },
  { label: 'CAC',         value: '-31%',   color: '#F472B6' },
];

/** Orbit radius and height for each panel */
const ORBIT_PARAMS = [
  { r: 3.0, h:  0.4,  speed: 0.16,  phase: 0           },
  { r: 3.2, h: -0.3,  speed: 0.14,  phase: Math.PI / 2 },
  { r: 2.8, h:  0.6,  speed: 0.18,  phase: Math.PI     },
  { r: 3.1, h: -0.5,  speed: 0.15,  phase: Math.PI * 1.5 },
];

/**
 * OrbitMetrics — 4 MetricPanel3D objects orbiting the Revenue Engine core.
 * Panels orbit on slightly different ellipses, heights, and speeds for depth.
 * Uses `useFrame` accumulator angle for physics-feel (no easing lib needed here).
 */
export function OrbitMetrics() {
  // Individual angle accumulators
  const anglesRef = useRef(ORBIT_PARAMS.map((p) => p.phase));
  // group ref for overall slow Y rotation
  const groupRef = useRef<THREE.Group>(null);

  // We store computed positions so we can pass them to MetricPanel3D every frame
  const positionsRef = useRef<[number, number, number][]>(
    ORBIT_PARAMS.map(() => [0, 0, 0])
  );

  useFrame((_, delta) => {
    ORBIT_PARAMS.forEach((p, i) => {
      anglesRef.current[i] += delta * p.speed;
      const angle = anglesRef.current[i];
      positionsRef.current[i] = [
        Math.cos(angle) * p.r,
        p.h,
        Math.sin(angle) * p.r,
      ];
    });
    // Trigger re-render via group (minor cost, acceptable for 4 panels)
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
    }
  });

  // Since R3F is declarative but positions change every frame, we use
  // the MetricPanel3D `position` prop — but since we update positionsRef
  // without triggering re-renders, we need a different strategy:
  // each MetricPanel3D will handle its own orbit via the `angle` logic internally.

  return (
    <group ref={groupRef}>
      {METRICS.map((metric, i) => (
        <MetricPanel3DOrbit
          key={metric.label}
          {...metric}
          orbitRadius={ORBIT_PARAMS[i].r}
          orbitHeight={ORBIT_PARAMS[i].h}
          orbitSpeed={ORBIT_PARAMS[i].speed}
          phase={ORBIT_PARAMS[i].phase}
        />
      ))}
    </group>
  );
}

/** Helper: individual orbiting metric panel with its own useFrame */
interface OrbitingPanelProps {
  label: string;
  value: string;
  color: string;
  orbitRadius: number;
  orbitHeight: number;
  orbitSpeed: number;
  phase: number;
}

function MetricPanel3DOrbit({
  label,
  value,
  color,
  orbitRadius,
  orbitHeight,
  orbitSpeed,
  phase,
}: OrbitingPanelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const angleRef = useRef(phase);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    angleRef.current += delta * orbitSpeed;
    const a = angleRef.current;
    groupRef.current.position.set(
      Math.cos(a) * orbitRadius,
      orbitHeight + Math.sin(a * 0.5) * 0.15,
      Math.sin(a) * orbitRadius,
    );
  });

  return (
    <group ref={groupRef}>
      <MetricPanel3D
        label={label}
        value={value}
        color={color}
        position={[0, 0, 0]}
      />
    </group>
  );
}
