"use client";

import React from 'react';
import { TestimonialsScene } from './TestimonialsScene';

export function TestimonialUniverse() {
  return (
    <section className="relative w-full h-[100vh] min-h-[800px] overflow-hidden bg-[#050505] flex flex-col justify-between pt-24 pb-12">
      {/* 3D Canvas Layer - Absolute to act as background + interactive layer */}
      <TestimonialsScene />

      {/* DOM UI Layer - Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col justify-between h-full pointer-events-none">
        
        {/* Top Typography */}
        <div className="flex flex-col items-center text-center mt-8">
          <span className="text-pink-500 font-medium tracking-widest uppercase text-sm mb-4 bg-pink-500/10 px-4 py-1.5 rounded-full border border-pink-500/20 backdrop-blur-md">
            Trusted By Growing Brands
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight mb-6 max-w-4xl">
            Success Stories That <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
              Continue To Compound
            </span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl">
            Discover how we've engineered revenue engines that scale. These are not just clients, they are our partners in the universe.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mb-8 pointer-events-auto">
          <button className="relative group overflow-hidden rounded-full bg-white text-black px-8 py-4 font-semibold text-lg hover:scale-105 transition-transform duration-300">
            <span className="relative z-10">Book Strategy Call</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

      </div>
    </section>
  );
}
