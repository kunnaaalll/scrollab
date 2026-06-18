"use client";

import React from "react";
import { Html } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";

interface ServiceTooltip3DProps {
  title: string;
  description: string;
  color: string;
  visible: boolean;
}

export function ServiceTooltip3D({ title, description, color, visible }: ServiceTooltip3DProps) {
  return (
    <Html position={[0, 1.2, 0]} center className="pointer-events-none select-none z-50">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-48 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center text-center shadow-xl"
            style={{ boxShadow: `0 10px 30px -10px ${color}40` }}
          >
            <h4 className="text-sm font-bold text-white mb-1 font-heading" style={{ textShadow: `0 0 8px ${color}80` }}>
              {title}
            </h4>
            <p className="text-xs text-zinc-300 font-sans leading-snug">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Html>
  );
}
