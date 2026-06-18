"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { LogoMark } from "../navbar/LogoMark";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOBILE_LINKS = [
  { label: "Performance Marketing", href: "/services/performance-marketing" },
  { label: "SEO & Content Systems", href: "/services/seo" },
  { label: "AI Marketing", href: "/services/ai-marketing" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const itemVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex flex-col bg-zinc-950/95 backdrop-blur-3xl overflow-y-auto"
        >
          {/* Ambient Noise / Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500/10 via-zinc-950 to-cyan-500/10 pointer-events-none" />

          {/* Header */}
          <div className="relative flex items-center justify-between px-4 sm:px-6 py-6">
            <LogoMark />
            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label="Close Mobile Menu"
            >
              <X className="size-6" />
            </button>
          </div>

          {/* Main Links */}
          <div className="relative flex-1 px-4 sm:px-6 py-8 flex flex-col justify-center gap-4">
            {MOBILE_LINKS.map((link) => (
              <motion.div key={link.href} variants={itemVariants}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-center justify-between p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-white/10 hover:bg-zinc-800/50 transition-all active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  <span className="text-xl font-medium text-zinc-200 group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                  <ArrowRight className="size-5 text-zinc-600 group-hover:text-cyan-500 transition-colors" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Footer CTA */}
          <motion.div 
            variants={itemVariants}
            className="relative p-4 sm:p-6 mt-auto"
          >
            <Link
              href="/strategy"
              onClick={onClose}
              className="flex items-center justify-center w-full py-4 rounded-xl text-lg font-semibold text-white bg-cyan-500 hover:bg-cyan-400 transition-colors shadow-[0_0_24px_rgba(6,182,212,0.3)] active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 focus-visible:ring-cyan-500"
            >
              Book Strategy Call
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
