"use client";

import { Html } from "@react-three/drei";

interface NodeLabel3DProps {
  label: string;
  description: string;
  visible: boolean;
}

export function NodeLabel3D({ label, description, visible }: NodeLabel3DProps) {
  return (
    <Html
      position={[0, -1.2, 0]}
      center
      style={{
        transition: "all 0.3s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.8)",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <div className="flex w-56 flex-col items-center text-center">
        <div className="rounded-full border border-white/20 bg-black/40 px-4 py-1.5 backdrop-blur-md">
          <span className="font-space text-sm font-medium tracking-wide text-white">{label}</span>
        </div>
        <div className="mt-2 rounded-lg border border-white/10 bg-black/60 p-2.5 text-xs font-light leading-relaxed text-white/90 backdrop-blur-xl">
          {description}
        </div>
      </div>
    </Html>
  );
}
