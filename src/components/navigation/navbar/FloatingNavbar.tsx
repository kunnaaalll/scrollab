"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { Search, Menu } from "lucide-react";
import Link from "next/link";
import { LogoMark } from "./LogoMark";
import { NavLinks } from "./NavLinks";
import { CommandPalette } from "../command/CommandPalette";
import { MobileNavigation } from "../mobile/MobileNavigation";
import { cn } from "@/lib/utils";

export function FloatingNavbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (y) => {
    setIsScrolled(y > 50);
  });

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-6 px-4 pointer-events-none"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div
          className={cn(
            "pointer-events-auto flex items-center justify-between px-4 sm:px-6 py-3 transition-all duration-500 rounded-full",
            "w-full max-w-5xl",
            isScrolled
              ? "bg-zinc-950/70 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-transparent border-transparent"
          )}
          layout={!shouldReduceMotion}
        >
          {/* Left: Logo */}
          <div className="flex-1">
            <LogoMark />
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden lg:flex flex-none justify-center">
            <NavLinks />
          </div>

          {/* Right: Actions */}
          <div className="flex-1 flex justify-end items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsCommandOpen(true)}
              className="flex items-center justify-center size-10 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors group outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label="Open Command Palette"
            >
              <Search className="size-5 group-hover:scale-110 transition-transform duration-300" />
            </button>

            <Link
              href="/strategy"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-cyan-500 hover:bg-cyan-400 transition-colors shadow-[0_0_16px_rgba(6,182,212,0.4)] hover:shadow-[0_0_24px_rgba(6,182,212,0.6)] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 focus-visible:ring-cyan-500"
            >
              Book Strategy Call
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden flex items-center justify-center size-10 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label="Open Mobile Menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </motion.div>
      </motion.header>

      {/* Overlays */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
      <MobileNavigation isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  );
}
