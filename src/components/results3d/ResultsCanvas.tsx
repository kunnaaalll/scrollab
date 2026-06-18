"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ResultsScene } from "./ResultsScene";
import { AdaptiveDpr, AdaptiveEvents, PerspectiveCamera } from "@react-three/drei";

export function ResultsCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas dpr={[1, 2]} gl={{ antialias: false, powerPreference: "high-performance" }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
        <Suspense fallback={null}>
          <ResultsScene />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Suspense>
      </Canvas>
    </div>
  );
}
