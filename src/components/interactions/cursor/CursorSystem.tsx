"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMotionMouse } from "@/hooks/useMotionMouse";
import { useInteractionStore } from "@/hooks/useInteractionStore";
import { CURSOR_SIZES, SPRING_PRESETS } from "@/lib/interactions/constants";

export function CursorSystem() {
  const { rawX, rawY } = useMotionMouse(SPRING_PRESETS.smooth); // raw mouse values so we can spring the cursor smoothly without double-springing
  const { cursorVariant, cursorLabel } = useInteractionStore();
  
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // assume touch until we know otherwise

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);

    if (isTouch) return;

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    // Show cursor when it first moves
    const showInitial = () => {
      setIsVisible(true);
      document.removeEventListener("mousemove", showInitial);
    };
    document.addEventListener("mousemove", showInitial);

    return () => {
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousemove", showInitial);
    };
  }, []);

  if (isTouchDevice || cursorVariant === "hidden") return null;

  const size = CURSOR_SIZES[cursorVariant] || CURSOR_SIZES.default;
  
  const variants = {
    default: {
      width: size,
      height: size,
      backgroundColor: "rgba(255,255,255,0.8)",
      mixBlendMode: "difference" as const,
      border: "0px solid transparent",
    },
    link: {
      width: size,
      height: size,
      backgroundColor: "rgba(6, 182, 212, 0.2)", // Cyan with low opacity
      border: "1px solid rgba(6, 182, 212, 1)",
      mixBlendMode: "normal" as const,
    },
    button: {
      width: size,
      height: size,
      backgroundColor: "transparent",
      border: "2px solid rgba(255, 255, 255, 0.5)",
      mixBlendMode: "difference" as const,
    },
    cta: {
      width: size,
      height: size,
      backgroundColor: "rgba(236, 72, 153, 0.2)", // Pink
      border: "1px solid rgba(236, 72, 153, 1)",
      mixBlendMode: "normal" as const,
    },
    card: {
      width: size,
      height: size,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(4px)",
      mixBlendMode: "normal" as const,
    },
    text: {
      width: size,
      height: size,
      backgroundColor: "rgba(255,255,255,0.8)",
      mixBlendMode: "difference" as const,
      border: "0px solid transparent",
      borderRadius: "2px",
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full"
          style={{
            x: rawX,
            y: rawY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          {/* Main Cursor Shape */}
          <motion.div
            variants={variants}
            animate={cursorVariant}
            transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
            className="flex items-center justify-center rounded-full"
          >
            {/* Optional Cursor Label */}
            <AnimatePresence mode="wait">
              {cursorLabel && (
                <motion.span
                  key={cursorLabel}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute whitespace-nowrap text-[10px] font-medium tracking-widest uppercase text-white"
                >
                  {cursorLabel}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
