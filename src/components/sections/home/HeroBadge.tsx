"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { fadeUp } from "@/lib/animations";

export function HeroBadge() {
  return (
    <motion.div 
      variants={fadeUp}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm mb-8 shadow-sm"
    >
      <Sparkles className="size-4 text-cyan-500" />
      <span className="text-sm font-medium text-zinc-300">
        The AI-First Growth Engine
      </span>
    </motion.div>
  );
}
