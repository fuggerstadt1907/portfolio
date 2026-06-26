"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Briefcase, Code2, Users } from "lucide-react";

const SUMMARY_CARDS = [
  { key: "business", icon: Briefcase },
  { key: "technology", icon: Code2 },
  { key: "people", icon: Users },
] as const;

export default function CareerSummary() {
  const t = useTranslations("career.summary");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-32 pb-8"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
          {t("headline")}
        </h2>
        <p className="text-2xl md:text-3xl font-bold" style={{ color: "var(--accent)" }}>
          {t("headline2")}
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-10">
        {SUMMARY_CARDS.map(({ key, icon: Icon }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col items-center gap-3 px-8 py-6 rounded-xl border w-full md:flex-1"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(0,229,255,0.1)" }}
            >
              <Icon className="w-5 h-5" style={{ color: "var(--accent)" }} />
            </div>
            <span className="text-sm font-medium text-center" style={{ color: "var(--foreground)" }}>
              {t(`cards.${key}`)}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="text-2xl" style={{ color: "var(--muted)" }}>↓</div>
        <div
          className="px-8 py-4 rounded-xl border-2 text-center"
          style={{ borderColor: "var(--accent)", backgroundColor: "rgba(0,229,255,0.06)" }}
        >
          <span className="text-xl font-bold" style={{ color: "var(--accent)" }}>
            {t("result")}
          </span>
        </div>
        <p className="text-center max-w-xl text-base mt-4" style={{ color: "var(--muted)" }}>
          {t("subtitle")}
        </p>
      </div>
    </motion.div>
  );
}
