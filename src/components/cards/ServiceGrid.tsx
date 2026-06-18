'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Target, Search, Share2, Cpu, Globe, FileText } from 'lucide-react';
import { ServiceCard } from './ServiceCard';
import { ServiceHighlightCard } from './ServiceHighlightCard';

const SERVICES = [
  {
    title: "AI Marketing",
    description: "Next-generation automated outreach, predictive analytics, and personalized customer journeys powered by proprietary LLMs.",
    outcomes: ["24/7 lead qualification", "Predictive churn reduction", "Automated CRM workflows"],
    href: "/services/ai-marketing",
    icon: Cpu,
    highlight: true,
  },
  {
    title: "Performance Marketing",
    description: "Data-driven paid acquisition strategies designed to scale revenue and optimize return on ad spend.",
    outcomes: ["Cross-channel attribution", "Dynamic creative optimization"],
    href: "/services/performance-marketing",
    icon: Target,
    highlight: false,
  },
  {
    title: "Website Development",
    description: "High-performance, conversion-optimized digital experiences engineered for speed and accessibility.",
    outcomes: ["Sub-second load times", "Headless architecture"],
    href: "/services/website-development",
    icon: Globe,
    highlight: false,
  },
  {
    title: "SEO",
    description: "High-authority organic growth and technical search dominance to capture intent-driven traffic predictably.",
    outcomes: ["Technical site audits", "High-DA link acquisition"],
    href: "/services/seo",
    icon: Search,
    highlight: false,
  },
  {
    title: "Social Media Marketing",
    description: "Premium brand presence and engagement strategies to build community and turn attention into loyal customers.",
    outcomes: ["Viral short-form content", "Community management", "Influencer partnerships"],
    href: "/services/social-media",
    icon: Share2,
    highlight: true,
  },
  {
    title: "Content Systems",
    description: "Scalable, authoritative content engines that position your brand as an industry leader while driving organic acquisition.",
    outcomes: ["Multimedia production", "Thought leadership ghostwriting"],
    href: "/services/content-systems",
    icon: FileText,
    highlight: false,
  }
];

export const ServiceGrid: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {SERVICES.map((service, index) => {
        const CardComponent = service.highlight ? ServiceHighlightCard : ServiceCard;
        // On smaller screens, if it's highlighted, we might want it to span the full width
        // On md (2 cols), col-span-2. On lg (3 cols), col-span-2.
        const spanClass = service.highlight ? "col-span-1 md:col-span-2 lg:col-span-2" : "col-span-1";
        
        return (
          <motion.div key={index} variants={itemVariants} className={spanClass}>
            <CardComponent {...service} />
          </motion.div>
        );
      })}
    </motion.div>
  );
};
