"use client";

import React from "react";
import { ResultsCanvas } from "./ResultsCanvas";
import { motion } from "framer-motion";

export function ResultsUniverse() {
  return (
    <section className="relative w-full h-[100vh] min-h-[800px] bg-zinc-950 flex flex-col items-center justify-start overflow-hidden pt-24">
      {/* HTML Content (Foreground) */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none mt-12 max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white font-heading mb-6"
        >
          Results You Can Actually Measure
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-zinc-400 font-sans leading-relaxed"
        >
          Every decision is backed by systems, analytics, and continuous optimization.
        </motion.p>
      </div>

      {/* The 3D Canvas Environment */}
      <ResultsCanvas />
      
      {/* Gradient overlay to smoothly blend with other sections */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-zinc-950 to-transparent pointer-events-none z-10" />
    </section>
  );
}
