"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import type { StationData } from "./careerJourney.data";
import CareerSkills from "./CareerSkills";

type Props = {
  station: StationData;
  index: number;
  isActive: boolean;
  isLast?: boolean;
  onActive: (i: number) => void;
  chapterLabel: string;
};

export default function CareerContent({ station, index, isActive, isLast, onActive, chapterLabel }: Props) {
  const t = useTranslations();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0, once: false, margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  const skills = station.skillsKeys.map((k) => t(k));
  const year = station.yearKey ? t(station.yearKey) : station.year;

  return (
    <div ref={ref} className={`min-h-[50vh] flex ${isLast ? "pt-10 pb-4" : "py-10"} ${index === 0 ? "items-start" : "items-center"}`}>
      <motion.div
        animate={{
          opacity: isActive ? 1 : 0.35,
          y: isActive ? 0 : 12,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full"
      >
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-xs font-mono px-2 py-0.5 rounded border"
            style={{ color: "var(--muted)", borderColor: "var(--border)" }}
          >
            {year}
          </span>
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            {chapterLabel} {index + 1}
          </span>
        </div>

        <motion.h3
          animate={{ opacity: isActive ? 1 : 0.5 }}
          transition={{ duration: 0.35 }}
          className="text-2xl md:text-3xl font-bold mb-2"
          style={{ color: "var(--foreground)" }}
        >
          {t(station.titleKey)}
        </motion.h3>

        <motion.p
          animate={{ opacity: isActive ? 1 : 0.4 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="text-lg mb-4 font-medium"
          style={{ color: "var(--accent)" }}
        >
          {t(station.subtitleKey)}
        </motion.p>

        <motion.p
          animate={{ opacity: isActive ? 1 : 0.4 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="text-base leading-relaxed max-w-2xl"
          style={{ color: "var(--muted)" }}
        >
          {t(station.descriptionKey)}
        </motion.p>

        <CareerSkills skills={skills} isActive={isActive} />
      </motion.div>
    </div>
  );
}
