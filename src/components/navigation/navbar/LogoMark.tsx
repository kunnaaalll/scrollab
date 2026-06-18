"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <Link href="/" aria-label="Scrollab Home" className="relative group outline-none">
      <motion.div
        className={cn("flex items-center gap-3", className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className="relative flex items-center justify-center size-10">
          {/* Animated Glow Behind Logo */}
          <motion.div
            className="absolute inset-0 bg-pink-500/20 blur-xl rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Logo Geometric Primitives */}
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Pink Arc */}
            <motion.svg
              viewBox="0 0 100 100"
              className="absolute w-full h-full text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 45 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <path d="M 50 10 A 40 40 0 0 1 90 50" />
            </motion.svg>
            {/* Cyan Center */}
            <div className="w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
          </div>
        </div>

        {/* Text Mark */}
        <span className="font-space-grotesk text-xl font-bold tracking-tight text-zinc-50 group-hover:text-white transition-colors duration-300">
          Scrollab<span className="text-pink-500">.</span>
        </span>
      </motion.div>
    </Link>
  );
}
