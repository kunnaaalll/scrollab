"use client";

import React from "react";
import { AICanvas } from "./AICanvas";
import { ParticleField } from "@/components/particles/ParticleField";

export function AISection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-hidden bg-[#020617] pt-24">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0 opacity-60">
        <ParticleField variant="ai" density="medium" />
      </div>

      {/* Typography Layer */}
      <div className="relative z-20 mt-12 flex w-full flex-col items-center px-4 text-center md:mt-20">
        <h2 className="font-space text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          AI Systems That Work Together
        </h2>
        <p className="mt-6 max-w-2xl font-sans text-lg font-light text-slate-300 md:text-xl">
          SEO, paid media, content, websites, and automation engineered as one intelligent ecosystem.
        </p>
      </div>

      {/* 3D Canvas Layer - Takes up remaining ~80% of screen */}
      <div className="relative z-10 mt-4 h-[75vh] min-h-[500px] w-full max-w-[1440px]">
        <AICanvas />
      </div>
    </section>
  );
}
