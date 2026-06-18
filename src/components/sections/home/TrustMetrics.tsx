"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { fadeUp } from "@/lib/animations";

function AnimatedCounter({ 
  value, 
  suffix = "", 
  isFloat = false 
}: { 
  value: number; 
  suffix?: string; 
  isFloat?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: 2
  });

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, spring, value]);

  const display = useTransform(spring, (current) => {
    if (isFloat) {
      return current.toFixed(1) + suffix;
    }
    return Math.round(current).toLocaleString() + suffix;
  });

  return <motion.span ref={ref}>{display}</motion.span>;
}

const metrics = [
  { label: "Campaigns Managed", value: 450, suffix: "+" },
  { label: "Revenue Generated", value: 120, suffix: "M+" },
  { label: "ROAS Achieved", value: 4.8, suffix: "x", isFloat: true },
  { label: "Years of Experience", value: 10, suffix: "+" },
];

export function TrustMetrics() {
  return (
    <motion.div 
      variants={fadeUp}
      className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
    >
      {metrics.map((metric, index) => (
        <motion.div 
          key={index}
          whileHover={{ y: -2 }}
          className="flex flex-col items-center justify-center p-8 rounded-xl bg-zinc-900/50 border border-zinc-800 shadow-md transition-all duration-300 hover:shadow-lg hover:border-zinc-700"
        >
          <div className="text-4xl md:text-5xl font-bold font-heading text-white mb-2 flex items-center justify-center min-h-[60px]">
            {metric.label === "Revenue Generated" && <span className="text-cyan-500 mr-1">$</span>}
            <AnimatedCounter 
              value={metric.value} 
              suffix={metric.suffix} 
              isFloat={metric.isFloat} 
            />
          </div>
          <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider text-center">
            {metric.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
