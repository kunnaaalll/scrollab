"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { BackgroundLayer } from "@/components/background/BackgroundLayer";
import { HeroBadge } from "./HeroBadge";
import { HeroStats } from "./HeroStats";
import { staggerContainer, heroReveal, fadeUp } from "@/lib/animations";

export function HeroSection() {
  return (
    <BackgroundLayer variant="hero" className="flex items-center pt-32 pb-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col items-start max-w-2xl"
          >
            <HeroBadge />
            
            <motion.h1 
              variants={heroReveal}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading text-white tracking-tighter leading-[1.1] mb-6"
            >
              Scale your revenue with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">intelligent</span> systems.
            </motion.h1>
            
            <motion.p 
              variants={fadeUp}
              className="text-lg sm:text-xl text-zinc-400 mb-10 leading-relaxed max-w-xl"
            >
              We build, scale, and automate your revenue systems using proprietary AI and elite growth strategy to outpace the competition.
            </motion.p>
            
            <motion.div 
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link 
                href="/strategy"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-all hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 shadow-lg shadow-cyan-500/20"
              >
                Book Strategy Call
                <ArrowRight className="size-5" />
              </Link>
              
              <Link 
                href="/case-studies"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-zinc-800 text-zinc-300 rounded-lg font-semibold hover:bg-zinc-900 hover:text-white hover:border-zinc-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                <Play className="size-5" />
                View Our Results
              </Link>
            </motion.div>

            <HeroStats />
          </motion.div>

          {/* Right Column: Visuals */}
          <motion.div 
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="relative lg:block mt-12 lg:mt-0"
          >
            {/* Dashboard Mockup / Abstract UI */}
            <div 
              className="relative w-full aspect-[4/3] sm:aspect-video lg:aspect-square rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md overflow-hidden shadow-2xl shadow-cyan-500/10" 
              style={{ transform: "perspective(1000px) rotateY(-5deg) rotateX(5deg)" }}
              aria-hidden="true"
            >
              {/* Fake Browser Header */}
              <div className="h-12 border-b border-zinc-800/80 bg-zinc-950/80 flex items-center px-4 gap-2">
                <div className="size-3 rounded-full bg-zinc-800" />
                <div className="size-3 rounded-full bg-zinc-800" />
                <div className="size-3 rounded-full bg-zinc-800" />
              </div>
              
              {/* Dashboard Content */}
              <div className="p-6 grid gap-6">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-32 bg-zinc-800/50 rounded-md animate-pulse" />
                  <div className="h-8 w-24 bg-cyan-500/20 rounded-md" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 sm:h-32 bg-zinc-800/40 rounded-xl border border-zinc-800/80 p-4 flex flex-col justify-between">
                    <div className="h-4 w-20 bg-zinc-700/80 rounded" />
                    <div className="h-8 sm:h-10 w-24 sm:w-32 bg-zinc-600/80 rounded" />
                  </div>
                  <div className="h-24 sm:h-32 bg-zinc-800/40 rounded-xl border border-zinc-800/80 p-4 flex flex-col justify-between">
                    <div className="h-4 w-20 bg-zinc-700/80 rounded" />
                    <div className="h-8 sm:h-10 w-24 sm:w-32 bg-pink-500/50 rounded" />
                  </div>
                </div>

                <div className="h-32 sm:h-48 bg-zinc-800/40 rounded-xl border border-zinc-800/80 p-4 flex flex-col">
                  <div className="h-4 w-32 bg-zinc-700/80 rounded mb-4" />
                  {/* Fake Chart lines */}
                  <div className="flex items-end gap-2 h-full mt-auto">
                    {[40, 70, 45, 90, 65, 100, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-cyan-500/20 rounded-t-sm relative h-full">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                          className="absolute bottom-0 left-0 right-0 bg-cyan-500 rounded-t-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Trust Indicator / Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 lg:-right-8 top-1/4 bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-xl flex items-center gap-4 hidden sm:flex"
            >
              <div className="size-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <div className="size-6 rounded-full bg-emerald-500" />
              </div>
              <div>
                <div className="text-sm text-zinc-400">System Status</div>
                <div className="font-semibold text-emerald-400">Optimized</div>
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </BackgroundLayer>
  );
}
