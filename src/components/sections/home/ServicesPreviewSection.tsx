'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ServiceGrid } from '../../cards/ServiceGrid';
import Link from 'next/link';

export const ServicesPreviewSection: React.FC = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-zinc-950">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-zinc-950 to-zinc-950 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 text-cyan-500 text-sm font-semibold tracking-wide uppercase mb-6 border border-cyan-500/20 font-sans">
              Our Expertise
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-50 font-heading mb-6"
          >
            Systems designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">exponential growth.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-zinc-400 leading-relaxed font-sans"
          >
            We don't just run ads. We build, scale, and automate your entire revenue engine using proprietary AI and elite growth strategy.
          </motion.p>
        </div>

        {/* Grid */}
        <ServiceGrid />

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-16 md:mt-24 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="/services" 
            className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-50 font-medium hover:bg-zinc-800 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-[1px]"
          >
            Explore Services
          </Link>
          <Link 
            href="/strategy-call" 
            className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:-translate-y-[1px]"
          >
            Book Strategy Call
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
