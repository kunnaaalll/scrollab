"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BarChart, Search, Zap, Layout, PenTool, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceItem {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
  colSpan?: 1 | 2;
}

const SERVICES: ServiceItem[] = [
  {
    title: "Performance Marketing",
    href: "/services/performance-marketing",
    description: "Data-driven campaigns that scale your revenue predictably.",
    icon: BarChart,
  },
  {
    title: "SEO & Content Systems",
    href: "/services/seo",
    description: "Dominate search rankings with AI-powered content.",
    icon: Search,
  },
  {
    title: "AI Marketing",
    href: "/services/ai-marketing",
    description: "Streamline operations and personalize at scale.",
    icon: Zap,
  },
  {
    title: "Social Media",
    href: "/services/social-media",
    description: "Build audience and authority across channels.",
    icon: Layout,
  },
  {
    title: "Website Development",
    href: "/services/website-development",
    description: "Immersive, spatial digital experiences.",
    icon: PenTool,
    colSpan: 2,
  },
];

interface MegaMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function MegaMenu({ isOpen, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] z-50 pt-2"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Glass Panel */}
          <div className="relative p-4 rounded-2xl bg-zinc-950/70 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden group/menu">
            {/* Ambient Background Glow inside Menu */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-cyan-500/5 pointer-events-none" />

            <div className="relative grid grid-cols-2 gap-3">
              {SERVICES.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className={cn(
                    "group flex items-start gap-4 p-4 rounded-xl transition-all duration-300",
                    "bg-zinc-900/50 border border-transparent hover:border-white/10 hover:bg-zinc-800/50",
                    service.colSpan === 2 && "col-span-2"
                  )}
                >
                  <div className="relative shrink-0 flex items-center justify-center size-10 rounded-lg bg-zinc-950 border border-zinc-800 group-hover:border-pink-500/50 transition-colors duration-300">
                    <service.icon className="size-5 text-zinc-400 group-hover:text-pink-500 transition-colors duration-300" />
                    {/* Mini Glow */}
                    <div className="absolute inset-0 bg-pink-500/20 blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="flex flex-col gap-1 flex-1">
                    <h4 className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  <ArrowRight className="size-4 text-zinc-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-cyan-500 transition-all duration-300 self-center" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
