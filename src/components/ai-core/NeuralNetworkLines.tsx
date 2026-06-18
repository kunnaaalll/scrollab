"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function NeuralNetworkLines({ nodePositions }: { nodePositions: THREE.Vector3[] }) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const positions = useMemo(() => new Float32Array(nodePositions.length * 2 * 3), [nodePositions]);
  
  useFrame(() => {
    if (lineRef.current) {
      const geo = lineRef.current.geometry;
      const posAttribute = geo.attributes.position;
      
      nodePositions.forEach((pos, i) => {
        // Line from center (0,0,0)
        posAttribute.setXYZ(i * 2, 0, 0, 0);
        // To node
        posAttribute.setXYZ(i * 2 + 1, pos.x, pos.y, pos.z);
      });
      
      posAttribute.needsUpdate = true;
    }
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.15} linewidth={1} />
    </lineSegments>
  );
}
