"use client";

import { motion } from "framer-motion";
import { staggerItem } from "@/lib/animations";

const stats = [
  { value: "300%", label: "Average ROI" },
  { value: "$50M+", label: "Revenue Generated" },
  { value: "98%", label: "Client Retention" },
];

export function HeroStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 mt-12 pt-12 border-t border-zinc-800/50 w-full">
      {stats.map((stat, i) => (
        <motion.div key={i} variants={staggerItem} className="flex flex-col gap-2">
          <div className="text-3xl md:text-4xl font-bold font-heading text-white tracking-tight">
            {stat.value}
          </div>
          <div className="text-sm font-medium text-zinc-400">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
