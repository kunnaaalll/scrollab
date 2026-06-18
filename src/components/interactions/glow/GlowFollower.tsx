"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { SPRING_PRESETS } from "@/lib/interactions/constants";
import { cn } from "@/lib/utils";

interface GlowFollowerProps {
  color?: string;
  size?: number;
  opacity?: number;
  className?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
}

export function GlowFollower({
  color = "rgba(236, 72, 153, 1)", // Pink 500
  size = 400,
  opacity = 0.05,
  className,
  containerRef,
}: GlowFollowerProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isHovered = useMotionValue(0);

  const springConfig = SPRING_PRESETS.slow;
  const glowX = useSpring(x, springConfig);
  const glowY = useSpring(y, springConfig);
  const opacitySpring = useSpring(isHovered, springConfig);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef && containerRef.current) {
        const { left, top } = containerRef.current.getBoundingClientRect();
        x.set(e.clientX - left);
        y.set(e.clientY - top);
      } else {
        x.set(e.clientX);
        y.set(e.clientY);
      }
    };

    const handleMouseEnter = () => isHovered.set(1);
    const handleMouseLeave = () => isHovered.set(0);

    const container = containerRef && containerRef.current ? containerRef.current : window;
    
    container.addEventListener("mousemove", handleMouseMove as EventListener, { passive: true });
    // @ts-ignore
    container.addEventListener("mouseenter", handleMouseEnter);
    // @ts-ignore
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove as EventListener);
      // @ts-ignore
      container.removeEventListener("mouseenter", handleMouseEnter);
      // @ts-ignore
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef, x, y, isHovered]);

  return (
    <motion.div
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      style={{
        opacity: opacitySpring,
        background: useMotionTemplate`
          radial-gradient(
            ${size}px circle at ${glowX}px ${glowY}px,
            ${color.replace("1)", `${opacity})`)},
            transparent 80%
          )
        `,
      }}
    />
  );
}
