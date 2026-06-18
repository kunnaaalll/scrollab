'use client';

/**
 * HeroLights — cinematic 3D lighting for the Revenue Engine hero scene.
 *
 * Lighting philosophy (doc 17_3D_SYSTEM §12):
 * - Cyan key light from the LEFT  → cool, technical atmosphere
 * - Pink rim light from the RIGHT → warmth, contrast
 * - Soft white top light          → prevents pitch-black geometry
 * - Low ambient base              → no completely black faces
 */
export function HeroLights() {
  return (
    <>
      {/* ── Base ambient — very dim, just enough to prevent void blacks ── */}
      <ambientLight color="#0d0d1a" intensity={0.6} />

      {/* ── Cyan key light (left, front) ── */}
      <pointLight
        color="#06B6D4"
        intensity={80}
        position={[-8, 4, 6]}
        distance={40}
        decay={2}
      />

      {/* ── Secondary cyan fill (right, slightly behind) ── */}
      <pointLight
        color="#22D3EE"
        intensity={30}
        position={[6, 0, -4]}
        distance={30}
        decay={2}
      />

      {/* ── Pink rim light (right, behind) ── */}
      <pointLight
        color="#EC4899"
        intensity={40}
        position={[8, -2, -6]}
        distance={35}
        decay={2}
      />

      {/* ── Soft white top light — architectural feel ── */}
      <directionalLight
        color="#ffffff"
        intensity={0.4}
        position={[0, 10, 5]}
        castShadow={false}
      />

      {/* ── Environment glow — large atmospheric illumination below ── */}
      <pointLight
        color="#06B6D4"
        intensity={15}
        position={[0, -8, 0]}
        distance={25}
        decay={2}
      />
    </>
  );
}
