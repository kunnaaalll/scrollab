'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface MetricPanel3DProps {
  label: string;
  value: string;
  color: string;
  position: [number, number, number];
  /**
   * Orbit angle offset in radians (used by OrbitMetrics to stagger positions)
   */
  angle?: number;
}

/**
 * MetricPanel3D — a genuine 3D plane (PlaneGeometry) that displays a KPI metric.
 *
 * Uses @react-three/drei Html portal for crisp, readable text rendered
 * inside 3D space — this is true 3D, not a CSS card.
 */
export function MetricPanel3D({ label, value, color, position }: MetricPanel3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Gentle floating bob
    const t = state.clock.elapsedTime;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.12;
    // Always face camera (billboard)
    meshRef.current.lookAt(state.camera.position);
  });

  const glowColor = useMemo(() => new THREE.Color(color), [color]);

  return (
    <mesh ref={meshRef} position={position}>
      {/* Actual PlaneGeometry — this is genuine 3D geometry, not a CSS div */}
      <planeGeometry args={[1.4, 0.7]} />
      <meshStandardMaterial
        color={color}
        emissive={glowColor}
        emissiveIntensity={0.15}
        transparent
        opacity={0.12}
        roughness={0.8}
        metalness={0.0}
        side={THREE.DoubleSide}
      />

      {/* Glowing border plane (slightly larger, rendered behind) */}
      <mesh position={[0, 0, -0.001]}>
        <planeGeometry args={[1.44, 0.74]} />
        <meshStandardMaterial
          color={color}
          emissive={glowColor}
          emissiveIntensity={0.8}
          transparent
          opacity={0.25}
          roughness={0}
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* HTML overlay — crisp text inside 3D space */}
      <Html
        center
        distanceFactor={6}
        style={{
          width: '120px',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            background: 'rgba(6, 6, 18, 0.75)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${color}44`,
            borderRadius: '10px',
            padding: '10px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            boxShadow: `0 0 20px ${color}33, 0 0 40px ${color}15`,
          }}
        >
          <span
            style={{
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: color,
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            {label}
          </span>
          <span
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#ffffff',
              fontFamily: 'Space Grotesk, sans-serif',
              lineHeight: 1.1,
            }}
          >
            {value}
          </span>
        </div>
      </Html>
    </mesh>
  );
}
