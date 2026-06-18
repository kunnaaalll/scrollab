"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { SERVICES_DATA } from "./ServiceOrbitSystem";

// We need to access the same orbital params, or recalculate them similarly. 
// A better pattern for the connections is to render them inside the same component 
// or pass the positions via a store.
// Since ServiceOrbitSystem handles positions, we can move the connection logic there, 
// OR we can export the orbital params generator and use a shared ref or context.
// For simplicity and decoupling, we will recalculate positions here using the same deterministic seed if needed, 
// or just draw abstract rays from the center that fade out.
// Actually, it's best if we track the positions of the nodes.
// Let's create an independent connection system that draws abstract glowing lines outwards,
// acting like a neural network.

export function ServiceConnectionLines() {
  const linesRef = useRef<THREE.Group>(null);

  // Generate 20 abstract connection lines radiating from the center
  const linesData = useMemo(() => {
    return Array.from({ length: 20 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 4;
      const height = (Math.random() - 0.5) * 3;
      const speed = 0.1 + Math.random() * 0.3;
      const offset = Math.random() * Math.PI * 2;
      return { angle, radius, height, speed, offset };
    });
  }, []);

  useFrame((state) => {
    if (!linesRef.current) return;
    const time = state.clock.elapsedTime;
    
    linesRef.current.children.forEach((child, i) => {
      const data = linesData[i];
      if (child.type === 'Line') {
        // Rotate slowly
        child.rotation.y = time * data.speed + data.offset;
      }
    });
  });

  return (
    <group ref={linesRef}>
      {linesData.map((data, i) => {
        const endPoint = new THREE.Vector3(
          Math.cos(data.angle) * data.radius,
          data.height,
          Math.sin(data.angle) * data.radius
        );
        
        // Fading colors for the line
        const color = i % 3 === 0 ? "#ec4899" : "#06b6d4";
        
        return (
          <Line
            key={i}
            points={[[0, 0, 0], endPoint.toArray()]}
            color={color}
            lineWidth={1}
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        );
      })}
    </group>
  );
}
