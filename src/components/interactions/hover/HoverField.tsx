"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { SPRING_PRESETS } from "@/lib/interactions/constants";
import { cn } from "@/lib/utils";

interface HoverFieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onAnimationStart" | "onDragStart" | "onDragEnd"> {
  children: React.ReactNode;
  maxTilt?: number; // max tilt in degrees (e.g., 5)
  glowOpacity?: number; // 0 to 1
  className?: string;
  glowColor?: string;
}

export function HoverField({
  children,
  maxTilt = 5,
  glowOpacity = 0.05,
  className,
  glowColor = "rgba(6, 182, 212, 1)", // Cyan 500 default
  ...props
}: HoverFieldProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = SPRING_PRESETS.smooth;
  const rotateX = useSpring(useMotionTemplate`calc(${y} * ${-maxTilt}deg)`, springConfig);
  const rotateY = useSpring(useMotionTemplate`calc(${x} * ${maxTilt}deg)`, springConfig);

  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const mouseXPos = e.clientX - left;
    const mouseYPos = e.clientY - top;

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);

    // Normalize from -1 to 1
    x.set((mouseXPos / width) * 2 - 1);
    y.set((mouseYPos / height) * 2 - 1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative overflow-hidden transition-shadow duration-300",
        className
      )}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${glowX}px ${glowY}px,
              ${glowColor.replace("1)", `${glowOpacity})`)},
              transparent 40%
            )
          `,
          opacity: useMotionTemplate`${x.get() !== 0 || y.get() !== 0 ? 1 : 0}`, // fade in when hovering
        }}
      />
      {children}
    </motion.div>
  );
}
