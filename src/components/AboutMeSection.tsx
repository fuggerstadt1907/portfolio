"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SkillCard from "./SkillCard";

const CARD_KEYS = [
  "ScopeControl",
  "ProductAlignment",
  "ScalableArchitecture",
  "UXInteraction",
  "LegacyIntegration",
  "PerformanceScaling",
  "SystemThinking",
  "StakeholderAlignment",
  "ProductOrientedEngineering",
] as const;

export default function AboutMeSection() {
  const t = useTranslations("about_me");

  return (
    <section id="about" className="py-24 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
        {t("headline")}
      </h2>
      <p className="text-muted text-lg mb-12 max-w-2xl mx-auto text-center">{t("intro")}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARD_KEYS.map((key, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" as const, delay: i * 0.08 }}
          >
            <SkillCard
              title={t(`cards.${key}.title`)}
              description={t(`cards.${key}.description`)}
              className="h-full"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
