import { ProcessCanvas } from './ProcessCanvas';

export function ProcessJourney() {
  return (
    <section className="relative w-full h-[120vh] bg-[#020617] overflow-hidden flex flex-col items-center pt-32">
      {/* 3D Canvas Background Layer */}
      <ProcessCanvas />

      {/* Foreground Typography */}
      <div className="relative z-10 flex flex-col items-center text-center pointer-events-none px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-space-grotesk text-white tracking-tight mb-4">
          How Scrollab Scales Brands
        </h2>
        <p className="text-lg md:text-xl text-pink-100/70 font-dm-sans max-w-2xl">
          Every engagement follows a systematic growth framework.
        </p>
      </div>

      {/* Gradient Overlays for smooth blending into surrounding sections */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#020617] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none z-10" />
    </section>
  );
}
