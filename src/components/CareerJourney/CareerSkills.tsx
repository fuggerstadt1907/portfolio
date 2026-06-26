"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

type Props = { skills: string[]; isActive: boolean };

export default function CareerSkills({ skills, isActive }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {skills.map((skill, i) => (
        <motion.div
          key={skill}
          initial={{ opacity: 0, y: 8 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 0 }}
          transition={{ duration: 0.3, delay: isActive ? i * 0.07 : 0, ease: "easeOut" }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border"
          style={{
            borderColor: isActive ? "rgba(0,229,255,0.3)" : "var(--border)",
            backgroundColor: isActive ? "rgba(0,229,255,0.08)" : "var(--surface)",
            color: isActive ? "var(--accent)" : "var(--muted)",
          }}
        >
          <Check className="w-3 h-3" />
          {skill}
        </motion.div>
      ))}
    </div>
  );
}
