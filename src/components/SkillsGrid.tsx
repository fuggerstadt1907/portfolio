"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import SkillModal from "./SkillModal";

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  product:      { bg: "rgba(255,100,80,0.12)",  text: "#ff6450", border: "rgba(255,100,80,0.35)" },
  architecture: { bg: "rgba(163,0,255,0.12)", text: "#c084fc", border: "rgba(163,0,255,0.35)" },
  process:      { bg: "rgba(0,255,128,0.12)",  text: "#00ff80", border: "rgba(0,255,128,0.35)" },
  tools:        { bg: "rgba(255,165,0,0.12)",  text: "#ffa500", border: "rgba(255,165,0,0.35)" },
};

type SkillItem = { category: string; name: string; level?: number; diagram?: string };

const sizeMap: Record<number, string> = {
  5: "text-sm px-5 py-2.5 font-semibold",
  4: "text-sm px-4 py-2 font-medium",
  3: "text-sm px-3 py-1.5 font-normal",
};

function tagSize(level = 3) {
  return sizeMap[level] ?? sizeMap[3];
}

export default function SkillsGrid() {
  const t = useTranslations("skills");
  const items = t.raw("items") as SkillItem[];
  const categories = t.raw("categories") as Record<string, string>;
  const details = t.raw("details") as Record<string, { text: string }>;
  const categoryKeys = Object.keys(categories);
  const [active, setActive] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const filtered = active ? items.filter((s) => s.category === active) : items;

  const selectedDetail = selectedSkill ? details[selectedSkill.name] : null;

  return (
    <>
      <section id="skills" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12"
          >
            {t("headline")}
          </motion.h2>

          <div className="flex justify-center gap-2 mb-12 flex-wrap">
            <button
              onClick={() => setActive(null)}
              className={`cursor-pointer font-mono text-sm px-5 py-2 rounded-full border transition-all duration-200 ${
                active === null
                  ? "border-accent bg-accent-muted text-accent"
                  : "border-border text-muted hover:text-foreground hover:border-muted"
              }`}
            >
              {t("filter_all")}
            </button>
            {categoryKeys.map((key) => {
              const c = categoryColors[key];
              const isActive = active === key;
              return (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`cursor-pointer font-mono text-sm px-5 py-2 rounded-full border transition-all duration-200 ${
                    isActive && !c ? "border-accent bg-accent-muted text-accent" : ""
                  } ${!isActive ? "border-border text-muted hover:text-foreground hover:border-muted" : ""}`}
                  style={
                    isActive && c
                      ? { background: c.bg, color: c.text, borderColor: c.border }
                      : undefined
                  }
                >
                  {categories[key]}
                </button>
              );
            })}
          </div>

          <motion.div layout className="flex flex-wrap justify-center gap-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((skill) => {
                const hasDetail = !!details[skill.name];
                return (
                  <motion.button
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.7, filter: "blur(6px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
                    onClick={() => hasDetail && setSelectedSkill(skill)}
                    className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-raised text-foreground select-none leading-none transition-colors duration-200 hover:border-accent hover:text-accent hover:bg-accent-muted ${tagSize(skill.level)} ${hasDetail ? "cursor-pointer" : "cursor-default"}`}
                  >
                    {skill.name}
                    {hasDetail && (
                      <span className="opacity-50 text-xs font-mono">↗</span>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <SkillModal
        skill={selectedSkill}
        description={selectedDetail?.text ?? ""}
        onClose={() => setSelectedSkill(null)}
      />
    </>
  );
}
