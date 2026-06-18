import { motion } from "framer-motion";

interface LogoItemProps {
  name: string;
}

export function LogoItem({ name }: LogoItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center justify-center px-6 py-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out cursor-pointer"
    >
      <span className="text-xl md:text-2xl font-bold font-heading tracking-tight text-zinc-300">
        {name}
      </span>
    </motion.div>
  );
}
