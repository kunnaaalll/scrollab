import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { ServiceCardProps } from './ServiceCard';

export const ServiceHighlightCard: React.FC<ServiceCardProps> = ({ title, description, outcomes, href, icon: Icon }) => {
  const shouldReduceMotion = useReducedMotion();

  const hoverVariants = {
    initial: {
      y: 0,
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      borderColor: "#27272a" // zinc-800
    },
    hover: {
      y: shouldReduceMotion ? 0 : -4,
      boxShadow: "0 20px 25px -5px rgba(6,182,212,0.1)", // shadow-xl with cyan hint
      borderColor: "#3f3f46" // zinc-700
    }
  };

  const arrowVariants = {
    initial: { x: 0 },
    hover: { x: shouldReduceMotion ? 0 : 4 }
  };

  return (
    <motion.div
      variants={hoverVariants}
      whileHover="hover"
      initial="initial"
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/80 p-8 sm:p-10 transition-colors duration-200 md:col-span-2 lg:col-span-2 h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-pink-500/5 pointer-events-none" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row h-full gap-8">
        <div className="flex-1 flex flex-col">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-950 border border-zinc-800 shadow-sm">
            <Icon className="h-7 w-7 text-cyan-500" />
          </div>
          
          <h4 className="mb-4 text-3xl font-semibold tracking-tight text-zinc-50 font-heading">
            {title}
          </h4>
          
          <p className="mb-6 text-lg leading-relaxed text-zinc-400 font-sans max-w-lg">
            {description}
          </p>
          
          <Link href={href} className="mt-auto inline-flex items-center text-base font-medium text-cyan-500 group-hover:text-cyan-400 transition-colors">
            <span>Explore full capabilities</span>
            <motion.span variants={arrowVariants} className="ml-2 inline-flex">
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          {outcomes && outcomes.length > 0 && (
            <div className="bg-zinc-950/50 rounded-xl p-6 border border-zinc-800/50">
              <h5 className="text-sm font-semibold text-zinc-50 uppercase tracking-wider mb-4 font-sans">Key Outcomes</h5>
              <ul className="space-y-4">
                {outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start text-base text-zinc-300 font-sans">
                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 rounded-full bg-pink-500 shrink-0" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
