"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { LogoCloud } from "./LogoCloud";
import { TrustMetrics } from "./TrustMetrics";

export function SocialProofSection() {
  return (
    <section className="relative py-24 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center mb-16"
        >
          <motion.h2 
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold font-heading text-white mb-6"
          >
            Trusted by ambitious brands building for long-term growth.
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            className="text-lg text-zinc-400 max-w-2xl leading-relaxed"
          >
            We partner with industry leaders to engineer scalable revenue systems and deliver measurable, compounding outcomes.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <LogoCloud />
          <TrustMetrics />
        </motion.div>
        
      </div>
    </section>
  );
}
