"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { gradients } from "@/lib/theme";
import {
  AlertTriangle,
  GitBranch,
  Layers,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Zap,
} from "lucide-react";

const ICONS = [AlertTriangle, GitBranch, Layers, MessageSquare];

type ProblemItem = {
  id: string;
  title: string;
  description: string;
  consequences: string[];
  resolution: string;
  outcomes: string[];
};

const storyVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.12 },
  }),
};

export default function ProblemSlider() {
  const t = useTranslations("problems");
  const items = t.raw("items") as ProblemItem[];
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);

  const item = items[active];

  return (
    <section id="problems" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("headline")}
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
            {t("subheadline")}
          </p>
        </motion.div>

        {/* Desktop: Tab Panel Layout */}
        <div className="hidden md:grid md:grid-cols-[280px_1fr] gap-8 items-start">
          {/* Left sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col border border-border rounded-xl overflow-hidden bg-surface/40"
          >
            {items.map((prob, i) => {
              const Icon = ICONS[i];
              const isActive = i === active;
              return (
                <button
                  key={prob.id}
                  onClick={() => setActive(i)}
                  className={`group flex items-center gap-3 px-5 py-4 text-left transition-all duration-200 relative cursor-pointer ${
                    i < items.length - 1 ? "border-b border-border" : ""
                  } ${
                    isActive
                      ? "bg-accent/5 text-accent"
                      : "text-muted hover:text-foreground hover:bg-surface-raised"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent rounded-r"
                    />
                  )}
                  <Icon
                    size={16}
                    strokeWidth={isActive ? 2 : 1.5}
                    className={`shrink-0 transition-colors ${isActive ? "text-accent" : "text-muted group-hover:text-foreground"}`}
                  />
                  <span className="text-sm font-medium leading-tight">
                    {prob.title}
                  </span>
                  {isActive && (
                    <ChevronRight size={14} className="ml-auto text-accent shrink-0" />
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* Right panel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-0 rounded-xl overflow-hidden border border-border"
              >
                {/* Section 1: Problem */}
                <motion.div
                  custom={0}
                  variants={storyVariants}
                  initial="hidden"
                  animate="visible"
                  className="px-8 py-6 bg-surface/40"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-xs tracking-widest uppercase text-warning">
                      {t("section_problem")}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted leading-relaxed text-sm">
                    {item.description}
                  </p>
                </motion.div>

                <div className="h-px bg-border" />

                {/* Section 2: Consequences */}
                <motion.div
                  custom={1}
                  variants={storyVariants}
                  initial="hidden"
                  animate="visible"
                  className="px-8 py-6 bg-surface/40"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-mono text-xs tracking-widest uppercase text-muted">
                      {t("section_consequences")}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {item.consequences.map((c, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-muted shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="h-px bg-border" />

                {/* Section 3: Resolution — cyan glow */}
                <motion.div
                  custom={2}
                  variants={storyVariants}
                  initial="hidden"
                  animate="visible"
                  className="px-8 py-6 relative overflow-hidden"
                  style={{ background: gradients.accentRadial }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none border border-accent/[0.08] rounded-none"
                  />
                  <div className="flex items-center gap-2 mb-4">
                    <Zap size={13} className="text-accent" />
                    <span className="font-mono text-xs tracking-widest uppercase text-accent">
                      {t("section_resolution")}
                    </span>
                  </div>
                  <p className="text-foreground leading-relaxed text-sm">
                    {item.resolution}
                  </p>
                </motion.div>

                <div className="h-px bg-border" />

                {/* Section 4: Outcomes */}
                <motion.div
                  custom={3}
                  variants={storyVariants}
                  initial="hidden"
                  animate="visible"
                  className="px-8 py-6 bg-surface/40"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-mono text-xs tracking-widest uppercase text-muted">
                      {t("section_outcomes")}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {item.outcomes.map((o, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground/85">
                        <CheckCircle2 size={15} className="text-success shrink-0 mt-0.5" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* CTA */}
                <motion.div
                  custom={4}
                  variants={storyVariants}
                  initial="hidden"
                  animate="visible"
                  className="px-8 py-6 border-t border-border bg-surface/60 flex items-center justify-between"
                >
                  <p className="text-muted text-sm">Klingt vertraut?</p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-accent text-background font-semibold text-sm hover:opacity-90 transition-opacity shrink-0"
                    style={{ boxShadow: gradients.accentCta }}
                  >
                    {t("cta")}
                    <ArrowRight size={14} />
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: Accordion */}
        <div className="md:hidden flex flex-col gap-3">
          {items.map((prob, i) => {
            const Icon = ICONS[i];
            const isOpen = open === i;
            return (
              <motion.div
                key={prob.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`rounded-xl border overflow-hidden transition-colors duration-200 ${
                  isOpen ? "border-accent/30" : "border-border"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-colors ${
                    isOpen ? "bg-accent/5" : "bg-surface/40 hover:bg-surface-raised"
                  }`}
                >
                  <Icon
                    size={16}
                    className={isOpen ? "text-accent" : "text-muted"}
                    strokeWidth={isOpen ? 2 : 1.5}
                  />
                  <span
                    className={`font-medium text-sm flex-1 ${isOpen ? "text-accent" : "text-foreground"}`}
                  >
                    {prob.title}
                  </span>
                  <ChevronRight
                    size={14}
                    className={`text-muted transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col divide-y divide-border">
                        <div className="px-5 py-5 bg-surface/40">
                          <p className="font-mono text-xs tracking-widest uppercase text-warning mb-2">
                            {t("section_problem")}
                          </p>
                          <p className="text-muted text-sm leading-relaxed">{prob.description}</p>
                        </div>
                        <div className="px-5 py-5 bg-surface/40">
                          <p className="font-mono text-xs tracking-widest uppercase text-muted mb-3">
                            {t("section_consequences")}
                          </p>
                          <ul className="flex flex-col gap-2">
                            {prob.consequences.map((c, ci) => (
                              <li key={ci} className="flex items-start gap-2.5 text-sm text-foreground/80">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-muted shrink-0" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div
                          className="px-5 py-5"
                          style={{ background: gradients.accentRadial }}
                        >
                          <div className="flex items-center gap-1.5 mb-2">
                            <Zap size={11} className="text-accent" />
                            <p className="font-mono text-xs tracking-widest uppercase text-accent">
                              {t("section_resolution")}
                            </p>
                          </div>
                          <p className="text-foreground text-sm leading-relaxed">{prob.resolution}</p>
                        </div>
                        <div className="px-5 py-5 bg-surface/40">
                          <p className="font-mono text-xs tracking-widest uppercase text-muted mb-3">
                            {t("section_outcomes")}
                          </p>
                          <ul className="flex flex-col gap-2">
                            {prob.outcomes.map((o, oi) => (
                              <li key={oi} className="flex items-start gap-2.5 text-sm text-foreground/85">
                                <CheckCircle2 size={13} className="text-success shrink-0 mt-0.5" />
                                {o}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="px-5 py-4 bg-surface/60 flex justify-end">
                          <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-accent text-background font-semibold text-sm hover:opacity-90 transition-opacity"
                          >
                            {t("cta")}
                            <ArrowRight size={13} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
