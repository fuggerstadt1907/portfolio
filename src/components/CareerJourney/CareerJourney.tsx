"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { STATIONS } from "./careerJourney.data";
import CareerProgress from "./CareerProgress";
import CareerContent from "./CareerContent";
import CareerEMTCard from "./CareerEMTCard";
import CareerSummary from "./CareerSummary";

export default function CareerJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useTranslations("career.hero");
  const tStations = useTranslations("career.stations");

  const handleActive = useCallback((i: number) => setActiveIndex(i), []);
  const chapterLabel = tStations("chapter");
  const years = STATIONS.map((s) => (s.yearKey ? tStations(s.yearKey.replace("career.stations.", "")) : s.year));

  return (
    <section id="journey" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
            {t("headline")}
          </h2>
          <p className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "var(--accent)" }}>
            {t("headline2")}
          </p>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="relative">
          {/* Desktop */}
          <div className="hidden md:flex gap-16">
            <div
              className="flex-shrink-0 w-28"
              style={{
                position: "sticky",
                top: "calc(50vh - 260px)",
                height: "fit-content",
                alignSelf: "flex-start",
              }}
            >
              <CareerProgress activeIndex={activeIndex} years={years} />
            </div>
            <div className="flex-1 min-w-0">
              {STATIONS.map((station, i) => (
                <CareerContent
                  key={station.id}
                  station={station}
                  index={i}
                  isActive={activeIndex === i}
                  isLast={i === STATIONS.length - 1}
                  onActive={handleActive}
                  chapterLabel={chapterLabel}
                />
              ))}
              <CareerEMTCard />
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-4">
            {STATIONS.map((station, i) => (
              <CareerContent
                key={station.id}
                station={station}
                index={i}
                isActive={true}
                onActive={handleActive}
                chapterLabel={chapterLabel}
              />
            ))}
            <CareerEMTCard />
          </div>
        </div>

        <CareerSummary />
      </div>
    </section>
  );
}
