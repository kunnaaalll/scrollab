'use client';

import React from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 280, damping: 26 },
  },
};

export const HeroTextBlock = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6 max-w-xl relative z-20"
    >
      {/* Eyebrow label */}
      <motion.div variants={item} className="flex items-center gap-3">
        <span className="w-8 h-[1px] bg-cyan-400" />
        <span className="uppercase tracking-widest text-xs font-semibold text-cyan-400 font-sans">
          AI-First Growth Agency
        </span>
      </motion.div>

      {/* Headline — per spec: "Scale Revenue With Systems, Not Guesswork" */}
      <motion.h1
        variants={item}
        className="font-display font-bold tracking-tight leading-[1.08]"
        style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
      >
        <span className="block text-white">Scale Revenue</span>
        <span className="block text-white">With Systems,</span>
        <span
          className="block text-transparent bg-clip-text"
          style={{
            backgroundImage:
              'linear-gradient(100deg, #06B6D4 0%, #22D3EE 40%, #EC4899 100%)',
          }}
        >
          Not Guesswork.
        </span>
      </motion.h1>

      {/* Subtext — per spec */}
      <motion.p
        variants={item}
        className="text-base md:text-lg text-white/65 font-sans leading-relaxed max-w-lg"
      >
        AI-first growth systems that compound revenue across SEO, paid media,
        content, and automation.
      </motion.p>
    </motion.div>
  );
};
