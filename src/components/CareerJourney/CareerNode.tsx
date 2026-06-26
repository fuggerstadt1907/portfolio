"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  isActive: boolean;
  isPast: boolean;
  year: string;
  index: number;
};

export default function CareerNode({ icon: Icon, isActive, isPast, year }: Props) {
  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        animate={{
          scale: isActive ? 1.15 : 1,
          opacity: isPast ? 0.6 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative"
      >
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ boxShadow: "0 0 20px 6px rgba(0,229,255,0.3)" }}
          />
        )}
        <div
          className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors duration-300"
          style={{
            borderColor: isActive || isPast ? "var(--accent)" : "var(--border)",
            backgroundColor: isActive
              ? "rgba(0,229,255,0.12)"
              : isPast
                ? "rgba(0,229,255,0.06)"
                : "var(--surface)",
          }}
        >
          <Icon
            className="w-4 h-4 transition-colors duration-300"
            style={{ color: isActive || isPast ? "var(--accent)" : "var(--muted)" }}
          />
        </div>
      </motion.div>
      <span
        className="mt-1.5 text-[10px] font-mono whitespace-nowrap transition-colors duration-300"
        style={{ color: isActive ? "var(--accent)" : "var(--muted)" }}
      >
        {year}
      </span>
    </div>
  );
}
