"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractionFeedbackProps {
  children: React.ReactNode;
  className?: string;
  success?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export function InteractionFeedback({
  children,
  className,
  success = false,
  loading = false,
  disabled = false,
}: InteractionFeedbackProps) {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "relative flex w-max items-center justify-center",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onHoverStart={() => !disabled && setIsHovered(true)}
      onHoverEnd={() => !disabled && setIsHovered(false)}
      onTapStart={() => !disabled && setIsActive(true)}
      onTap={() => !disabled && setIsActive(false)}
      onTapCancel={() => !disabled && setIsActive(false)}
      animate={{
        scale: isActive ? 0.96 : isHovered ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}

      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center rounded-inherit bg-zinc-950/50 backdrop-blur-sm"
          >
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Overlay */}
      <AnimatePresence>
        {success && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="absolute inset-0 z-10 flex items-center justify-center rounded-inherit bg-emerald-500/90 text-white backdrop-blur-sm"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
