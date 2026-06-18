"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ServicesCore } from "./ServicesCore";
import { ServiceOrbitSystem } from "./ServiceOrbitSystem";
import { ServiceConnectionLines } from "./ServiceConnectionLines";
import { ServicesLighting } from "./ServicesLighting";
import { ParticleScene } from "../particles/ParticleField";

export function ServicesScene() {
  const sceneRef = useRef<THREE.Group>(null);
  
  // Subtle mouse parallax (max 10px equivalent in 3D space)
  useFrame((state, delta) => {
    if (!sceneRef.current) return;
    
    // Damp mouse coordinates to rotation
    const targetX = (state.pointer.y * Math.PI) / 30; // Max rotation
    const targetY = (state.pointer.x * Math.PI) / 30;
    
    sceneRef.current.rotation.x = THREE.MathUtils.damp(
      sceneRef.current.rotation.x,
      targetX,
      4,
      delta
    );
    
    sceneRef.current.rotation.y = THREE.MathUtils.damp(
      sceneRef.current.rotation.y,
      targetY,
      4,
      delta
    );
  });

  return (
    <group>
      <ServicesLighting />
      
      {/* Background Particles inside 3D space */}
      <ParticleScene variant="ai" density="low" />

      {/* Main interactive group */}
      <group ref={sceneRef}>
        {/* We tilt the whole scene to match the "45° perspective" described, 
            or we can just angle the camera. Let's angle the scene slightly here for isometric feel 
            if the camera is straight on, or let the camera handle it. 
            The prompt says: "Perspective: 45°". 
            Let's rotate the root group to X: 0.2, Y: 0.2 to give it a nice angle.
        */}
        <group rotation={[0.4, -0.2, 0]}>
          <ServicesCore />
          <ServiceConnectionLines />
          <ServiceOrbitSystem />
        </group>
      </group>
    </group>
  );
}
