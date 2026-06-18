'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const CTAGroup = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, type: 'spring', stiffness: 280, damping: 26 }}
      className="flex flex-wrap items-center gap-4 mt-8 relative z-20"
    >
      {/* Primary CTA — Book Strategy Call */}
      <button
        className="group relative px-8 py-4 rounded-full font-semibold font-sans text-sm overflow-hidden cursor-pointer transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
          color: '#ffffff',
          boxShadow: '0 0 24px rgba(6,182,212,0.45), 0 4px 16px rgba(0,0,0,0.3)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            '0 0 36px rgba(6,182,212,0.6), 0 8px 24px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            '0 0 24px rgba(6,182,212,0.45), 0 4px 16px rgba(0,0,0,0.3)';
        }}
      >
        Book Strategy Call
      </button>

      {/* Secondary CTA — Explore Services */}
      <button
        className="px-8 py-4 rounded-full font-semibold font-sans text-sm cursor-pointer transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.04)',
          color: 'rgba(255,255,255,0.9)',
          border: '1px solid rgba(255,255,255,0.18)',
          backdropFilter: 'blur(8px)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.09)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(6,182,212,0.5)';
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.18)';
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
        }}
      >
        Explore Services
      </button>
    </motion.div>
  );
};
