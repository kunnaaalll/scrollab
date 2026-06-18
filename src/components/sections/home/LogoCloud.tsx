"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { LogoItem } from "./LogoItem";

const logos = [
  "Linear",
  "Stripe",
  "Vercel",
  "Framer",
  "Apple",
  "Ramp"
];

export function LogoCloud() {
  return (
    <motion.div 
      variants={fadeUp}
      className="w-full flex flex-wrap justify-center items-center gap-8 md:gap-16 py-8"
    >
      {logos.map((logo, index) => (
        <LogoItem key={index} name={logo} />
      ))}
    </motion.div>
  );
}
