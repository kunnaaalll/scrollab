"use client";

import React from 'react';
import { GlassPanel } from '@/components/spatial/panels/GlassPanel';
import { MouseParallax } from '@/components/parallax/MouseParallax';

export const DashboardPreview = () => {
  return (
    <MouseParallax depth={0.5} className="w-full max-w-2xl mx-auto mt-20 relative z-20">
      <GlassPanel 
        blur="heavy" 
        opacity="medium" 
        radius="lg" 
        className="w-full aspect-[16/9] border-white/20 p-6 flex flex-col gap-6 overflow-hidden shadow-2xl relative"
        withGlow
      >
        {/* Top Navigation Bar Mockup */}
        <div className="flex items-center justify-between w-full border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <div className="flex gap-4">
            <div className="w-16 h-4 rounded bg-white/10" />
            <div className="w-16 h-4 rounded bg-white/10" />
            <div className="w-16 h-4 rounded bg-white/10" />
          </div>
        </div>

        {/* Dashboard Grid Mockup */}
        <div className="grid grid-cols-3 gap-4 flex-1">
          <div className="col-span-2 flex flex-col gap-4">
            {/* Main Chart Area */}
            <div className="flex-1 rounded-xl bg-gradient-to-tr from-white/5 to-white/10 border border-white/5 relative overflow-hidden p-4">
               <div className="w-1/3 h-6 rounded bg-white/20 mb-4" />
               {/* Abstract Chart Line using SVG */}
               <svg viewBox="0 0 100 40" className="w-full h-full text-cyan-500" preserveAspectRatio="none">
                 <path d="M0 40 L10 35 L20 38 L30 25 L40 28 L50 15 L60 20 L70 5 L80 10 L90 0 L100 5 L100 40 Z" fill="currentColor" fillOpacity="0.2" />
                 <path d="M0 40 L10 35 L20 38 L30 25 L40 28 L50 15 L60 20 L70 5 L80 10 L90 0 L100 5" fill="none" stroke="currentColor" strokeWidth="2" />
               </svg>
            </div>
            {/* Bottom Row */}
            <div className="grid grid-cols-2 gap-4 h-24">
              <div className="rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col justify-center">
                <div className="w-1/2 h-3 rounded bg-white/20 mb-2" />
                <div className="w-3/4 h-6 rounded bg-white/40" />
              </div>
              <div className="rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col justify-center">
                <div className="w-1/2 h-3 rounded bg-white/20 mb-2" />
                <div className="w-3/4 h-6 rounded bg-white/40" />
              </div>
            </div>
          </div>
          {/* Right Sidebar Mockup */}
          <div className="col-span-1 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-4 p-4">
             <div className="w-1/2 h-4 rounded bg-white/20 mb-2" />
             <div className="w-full h-8 rounded bg-white/10" />
             <div className="w-full h-8 rounded bg-white/10" />
             <div className="w-full h-8 rounded bg-white/10" />
             <div className="w-full h-8 rounded bg-white/10" />
          </div>
        </div>

        {/* Ambient overlay glow for the dashboard panel */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-3xl rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none mix-blend-screen" />
      </GlassPanel>
    </MouseParallax>
  );
};
