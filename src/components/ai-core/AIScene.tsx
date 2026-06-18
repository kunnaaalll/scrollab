"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { AICoreSphere } from "./AICoreSphere";
import { AINodeOrbitSystem } from "./AINodeOrbitSystem";
import { AICoreLighting } from "./AICoreLighting";

export function AIScene({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Subtle mouse parallax
  useFrame((state) => {
    if (!reduceMotion && groupRef.current) {
      // Max ~10px movement depending on projection, keeps it subtle
      const targetX = (state.pointer.x * state.viewport.width) / 50;
      const targetY = (state.pointer.y * state.viewport.height) / 50;
      
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
      
      // Slight rotation based on pointer
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY * 0.05, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX * 0.05, 0.05);
    }
  });

  return (
    <>
      <AICoreLighting />
      <group ref={groupRef}>
        <AICoreSphere />
        <AINodeOrbitSystem reduceMotion={reduceMotion} />
      </group>
      
      {/* Post Processing */}
      <EffectComposer multisampling={4}>
        <Bloom 
          luminanceThreshold={0.5} 
          luminanceSmoothing={0.9} 
          intensity={1.2} 
          mipmapBlur 
        />
        <ChromaticAberration 
          blendFunction={BlendFunction.NORMAL} 
          offset={new THREE.Vector2(0.0008, 0.0008)} 
        />
      </EffectComposer>
    </>
  );
}
