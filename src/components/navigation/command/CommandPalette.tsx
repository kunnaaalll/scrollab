"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, Briefcase, Zap, PhoneCall } from "lucide-react";
import { useRouter } from "next/navigation";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const ITEMS = [
  { id: "services", title: "All Services", type: "Page", icon: Zap, href: "/services" },
  { id: "seo", title: "SEO & Content Systems", type: "Service", icon: FileText, href: "/services/seo" },
  { id: "case-studies", title: "Case Studies", type: "Page", icon: Briefcase, href: "/case-studies" },
  { id: "contact", title: "Contact Us", type: "Action", icon: PhoneCall, href: "/contact" },
];

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          document.dispatchEvent(new CustomEvent('open-command'));
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleOpen = () => {
      // In a real app we'd lift state, but for standalone dispatch we can do:
      // We rely on FloatingNavbar to actually pass isOpen=true, but we can also set internal state if needed.
      // Currently handled by FloatingNavbar.
    };
    document.addEventListener('open-command', handleOpen);
    return () => document.removeEventListener('open-command', handleOpen);
  }, []);

  const filteredItems = useMemo(() => {
    if (!query) return ITEMS;
    return ITEMS.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4">
          {/* Dark Atmospheric Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Palette Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative w-full max-w-2xl bg-zinc-900/80 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.6)] overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Ambient Inner Glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            
            <div className="flex items-center px-4 py-4 border-b border-white/10">
              <Search className="size-5 text-zinc-400 mr-3 shrink-0" />
              <input
                autoFocus
                className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none text-lg"
                placeholder="Search pages, services, or actions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-none">
              {filteredItems.length === 0 ? (
                <div className="py-14 text-center text-zinc-500">
                  <p>No results found for &quot;{query}&quot;</p>
                </div>
              ) : (
                <ul className="flex flex-col gap-1">
                  {filteredItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => handleSelect(item.href)}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left hover:bg-white/5 focus:bg-white/5 outline-none transition-colors group"
                      >
                        <div className="flex items-center justify-center size-10 rounded-lg bg-zinc-950 border border-zinc-800 group-hover:border-cyan-500/30 transition-colors">
                          <item.icon className="size-5 text-zinc-400 group-hover:text-cyan-500 transition-colors" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-zinc-500">{item.type}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-white/5 bg-zinc-950/50 flex items-center justify-between text-xs text-zinc-500">
              <span>Navigate with arrow keys & enter</span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded-md bg-zinc-800 border border-zinc-700">ESC</kbd> to close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
