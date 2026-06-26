"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";

export default function CareerEMTCard() {
  const t = useTranslations("career.emt");

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl border p-5 mt-8"
      style={{
        borderColor: "rgba(239,68,68,0.25)",
        backgroundColor: "rgba(239,68,68,0.05)",
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ backgroundColor: "rgba(239,68,68,0.12)" }}
        >
          <Heart className="w-4 h-4" style={{ color: "rgb(239,68,68)" }} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <h4 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              {t("headline")}
            </h4>
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded-full animate-pulse"
              style={{
                backgroundColor: "rgba(239,68,68,0.2)",
                color: "rgb(239,68,68)",
              }}
            >
              {t("badge")}
            </span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            {t("description")}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
