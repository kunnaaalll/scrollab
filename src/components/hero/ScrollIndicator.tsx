"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export const ScrollIndicator = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
    >
      <span className="text-xs uppercase tracking-widest text-white/40 font-medium">Scroll to explore</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-8 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm"
      >
        <ArrowDown className="w-4 h-4 text-white/60" />
      </motion.div>
    </motion.div>
  );
};
