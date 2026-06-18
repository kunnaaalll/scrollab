import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, LucideIcon } from 'lucide-react';
import Link from 'next/link';

export interface ServiceCardProps {
  title: string;
  description: string;
  outcomes?: string[];
  href: string;
  icon: LucideIcon;
  highlight?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, outcomes, href, icon: Icon }) => {
  const shouldReduceMotion = useReducedMotion();

  const hoverVariants = {
    initial: {
      y: 0,
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      borderColor: "#27272a" // zinc-800
    },
    hover: {
      y: shouldReduceMotion ? 0 : -4,
      boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
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
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 transition-colors duration-200 h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-950 border border-zinc-800">
          <Icon className="h-6 w-6 text-pink-500" />
        </div>
        
        <h4 className="mb-3 text-2xl font-medium tracking-normal text-zinc-50 font-heading">
          {title}
        </h4>
        
        <p className="mb-6 text-base leading-relaxed text-zinc-400 font-sans flex-grow">
          {description}
        </p>

        {outcomes && outcomes.length > 0 && (
          <ul className="mb-8 space-y-2">
            {outcomes.map((outcome, idx) => (
              <li key={idx} className="flex items-start text-sm text-zinc-300 font-sans">
                <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
                {outcome}
              </li>
            ))}
          </ul>
        )}
        
        <Link href={href} className="mt-auto inline-flex items-center text-sm font-medium text-cyan-500 group-hover:text-cyan-400 transition-colors">
          <span>Learn more</span>
          <motion.span variants={arrowVariants} className="ml-2 inline-flex">
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
};
