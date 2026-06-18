"use client";

import { Line } from "@react-three/drei";
import * as THREE from "three";

// Predefined connections imitating neural/Jarvis networks connecting the slabs
const connections = [
  // Connect Center to slabs
  [[0, 0, 0], [-3, 1, 1]],
  [[0, 0, 0], [3, 2, -1]],
  [[0, 0, 0], [-2.5, -1.5, -0.5]],
  [[0, 0, 0], [3.5, -1, 1.5]],
  [[0, 0, 0], [0, 3, -2]],
  [[0, 0, 0], [0, -3, 0.5]],
  
  // Connect slabs to each other
  [[-3, 1, 1], [-2.5, -1.5, -0.5]],
  [[3, 2, -1], [3.5, -1, 1.5]],
  [[-3, 1, 1], [0, 3, -2]],
  [[3.5, -1, 1.5], [0, -3, 0.5]],
];

export function NeuralConnectionLines() {
  return (
    <group>
      {connections.map((points, idx) => (
        <Line
          key={idx}
          points={points.map(p => new THREE.Vector3(...p))}
          color="#06B6D4"
          lineWidth={1}
          transparent
          opacity={0.15}
          dashed={false}
        />
      ))}
    </group>
  );
}
