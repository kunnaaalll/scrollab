"use client";

import { useMotionValue, useSpring, SpringOptions } from "framer-motion";
import { useEffect } from "react";
import { SPRING_PRESETS } from "@/lib/interactions/constants";

export function useMotionMouse(springOptions?: SpringOptions) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = springOptions || SPRING_PRESETS.smooth;

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Avoid tracking on touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const updateMousePosition = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [x, y]);

  return { x: springX, y: springY, rawX: x, rawY: y };
}
