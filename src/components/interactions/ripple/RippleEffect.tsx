"use client";

import React, { useState, MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RIPPLE_DURATIONS } from "@/lib/interactions/constants";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface RippleEffectProps {
  color?: string; // e.g. "bg-cyan-500/20"
}

export function RippleEffect({ color = "bg-white/10" }: RippleEffectProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Size should be enough to cover the element
    const size = Math.max(rect.width, rect.height) * 2;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-inherit pointer-events-none"
      onClick={addRipple}
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{
              top: ripple.y - ripple.size / 2,
              left: ripple.x - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
              scale: 0,
              opacity: 0.8,
            }}
            animate={{
              scale: 1,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: RIPPLE_DURATIONS.standard / 1000,
              ease: "easeOut",
            }}
            onAnimationComplete={() => {
              setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
            }}
            className={`absolute rounded-full ${color}`}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
