"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailPoint {
  id: number;
  x: number;
  y: number;
}

interface LinkTrailProps {
  color?: string; // e.g., bg-pink-500
  duration?: number; // seconds
}

export function LinkTrail({ color = "bg-pink-500", duration = 0.5 }: LinkTrailProps) {
  const [points, setPoints] = useState<TrailPoint[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const pointIdRef = useRef(0);

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;

    // ensure parent is relative to contain the absolute trail
    if (getComputedStyle(parent).position === "static") {
      parent.style.position = "relative";
    }

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newPoint: TrailPoint = {
        id: pointIdRef.current++,
        x,
        y,
      };

      setPoints((prev) => [...prev, newPoint]);

      // Remove point after duration to avoid array growing indefinitely
      setTimeout(() => {
        setPoints((prev) => prev.filter((p) => p.id !== newPoint.id));
      }, duration * 1000);
    };

    parent.addEventListener("mousemove", handleMouseMove);
    return () => {
      parent.removeEventListener("mousemove", handleMouseMove);
    };
  }, [duration]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-inherit"
    >
      <AnimatePresence>
        {points.map((point) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration, ease: "easeOut" }}
            style={{
              left: point.x,
              top: point.y,
              transform: "translate(-50%, -50%)",
            }}
            className={`absolute w-1 h-1 rounded-full ${color} shadow-[0_0_8px_currentColor]`}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
