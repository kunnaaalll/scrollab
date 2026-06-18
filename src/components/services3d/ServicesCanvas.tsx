"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { ServicesScene } from "./ServicesScene";

export function ServicesCanvas() {
  // Use a media query hook or standard CSS to handle prefers-reduced-motion
  // For R3F, we can freeze by setting Frameloop to demand, but since we have continuous orbits,
  // we either pause the delta or just let OS handle standard motion reduction if needed.
  // We'll rely on the parent CSS and default R3F frameloop for now, ensuring AdaptiveDpr helps with performance.

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 2, 12], fov: 45 }}
        className="pointer-events-auto"
        dpr={[1, 2]} // Standard DPR clamp for performance
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ServicesScene />
          {/* Performance optimization: Drops resolution on fast movements */}
          <AdaptiveDpr pixelated />
        </Suspense>
      </Canvas>
    </div>
  );
}
