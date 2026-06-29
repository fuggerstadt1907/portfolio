"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

function item(delay: number) {
  return {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.65, ease: "easeOut" as const },
    },
  };
}

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="max-w-3xl w-full">
        <motion.p
          variants={item(0)}
          initial="hidden"
          animate="visible"
          className="font-mono text-muted text-xs tracking-widest uppercase mb-10"
        >
          {t("name")}
        </motion.p>

        <motion.h1
          variants={item(0.1)}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-2"
        >
          {t("headline_1")}
        </motion.h1>

        <motion.h1
          variants={item(0.22)}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-6xl font-bold text-accent leading-tight mb-10"
        >
          {t("headline_2")}
        </motion.h1>

        <motion.p
          variants={item(0.38)}
          initial="hidden"
          animate="visible"
          className="text-muted text-lg md:text-xl leading-relaxed max-w-2xl mb-12"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          variants={item(0.52)}
          initial="hidden"
          animate="visible"
        >
          <a
            href="#contact"
            className="inline-block px-7 py-3.5 rounded bg-accent text-background font-semibold text-sm hover:opacity-90 transition-opacity glow-box-accent"
          >
            {t("cta")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
