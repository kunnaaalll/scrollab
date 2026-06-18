"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CommandCenterCore } from "./CommandCenterCore";
import { FloatingKPIs } from "./FloatingKPIs";
import { HolographicCharts } from "./HolographicCharts";
import { ResultsDataStreams } from "./ResultsDataStreams";
import { NeuralConnectionLines } from "./NeuralConnectionLines";
import { ResultsLighting } from "./ResultsLighting";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { BlendFunction } from "postprocessing";

export function ResultsScene() {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // Subtle parallax effect on the whole scene
  useFrame((state) => {
    if (groupRef.current && !prefersReducedMotion) {
      // Very subtle mouse movement parallax (5-10px equivalent)
      const targetX = (state.pointer.x * 0.2);
      const targetY = (state.pointer.y * 0.2);
      
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <>
      <ResultsLighting />
      
      <group ref={groupRef}>
        <CommandCenterCore />
        <NeuralConnectionLines />
        <ResultsDataStreams />
        
        {/* We arrange KPIs and Charts in Layers */}
        <FloatingKPIs />
        <HolographicCharts />
      </group>

      {/* Post Processing: Bloom and Chromatic Aberration */}
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.2} 
          luminanceSmoothing={0.9} 
          intensity={0.5} 
          mipmapBlur 
        />
        <ChromaticAberration 
          offset={new THREE.Vector2(0.002, 0.002)} 
          radialModulation={false} 
          modulationOffset={0} 
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </>
  );
}
