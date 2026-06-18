"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MegaMenu } from "../mega-menu/MegaMenu";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function NavLinks() {
  const pathname = usePathname();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterServices = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeaveServices = () => {
    closeTimeout.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  return (
    <div className="hidden lg:flex items-center gap-2">
      {/* Services Hub with Mega Menu */}
      <div 
        className="relative"
        onMouseEnter={handleMouseEnterServices}
        onMouseLeave={handleMouseLeaveServices}
      >
        <button
          className={cn(
            "relative px-4 py-2 text-sm font-medium transition-colors duration-300 outline-none rounded-md group",
            isServicesOpen ? "text-white" : "text-zinc-400 hover:text-white"
          )}
          aria-expanded={isServicesOpen}
        >
          Services
          
          {/* Depth Hover Background */}
          {isServicesOpen && (
            <motion.div
              layoutId="nav-hover-bg"
              className="absolute inset-0 bg-white/5 rounded-md -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </button>

        <MegaMenu 
          isOpen={isServicesOpen} 
          onMouseEnter={handleMouseEnterServices} 
          onMouseLeave={handleMouseLeaveServices} 
        />
      </div>

      {/* Static Links */}
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors duration-300 outline-none rounded-md group",
              isActive ? "text-white" : "text-zinc-400 hover:text-white"
            )}
          >
            {item.label}

            {/* Active / Hover Background */}
            <div className="absolute inset-0 bg-white/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

            {/* Glow Underline on Active */}
            {isActive && (
              <motion.div
                layoutId="nav-underline"
                className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-pink-500/0 via-pink-500 to-pink-500/0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
