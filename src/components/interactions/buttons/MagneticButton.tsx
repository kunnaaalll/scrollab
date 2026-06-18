"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { MAGNETIC_STRENGTHS, SPRING_PRESETS } from "@/lib/interactions/constants";
import { useInteractionStore } from "@/hooks/useInteractionStore";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onAnimationStart" | "onDragStart" | "onDragEnd"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  strength?: keyof typeof MAGNETIC_STRENGTHS;
  className?: string;
}

export function MagneticButton({
  children,
  variant = "primary",
  strength = "medium",
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { setCursorVariant } = useInteractionStore();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = SPRING_PRESETS.magnetic;
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const maxDistance = MAGNETIC_STRENGTHS[strength];

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Calculate normalized distance (-1 to 1) and apply max strength
    x.set((distanceX / (width / 2)) * maxDistance);
    y.set((distanceY / (height / 2)) * maxDistance);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCursorVariant("button");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCursorVariant("default");
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    return () => {
      if (isHovered) {
        setCursorVariant("default");
      }
    };
  }, [isHovered, setCursorVariant]);

  const variantStyles = {
    primary: "bg-cyan-500 text-white shadow-md hover:shadow-lg border border-transparent",
    secondary: "bg-pink-500 text-white shadow-md hover:shadow-lg border border-transparent",
    outline: "bg-transparent text-cyan-500 border-2 border-cyan-500 hover:bg-cyan-500/10",
    ghost: "bg-transparent text-zinc-300 hover:bg-zinc-800",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn(
        "relative flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
        variantStyles[variant],
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {/* Subtle Glow Expansion */}
      {isHovered && (
        <motion.div
          layoutId={`glow-${variant}`}
          className="absolute inset-0 -z-10 rounded-lg blur-md bg-current opacity-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1.2 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
