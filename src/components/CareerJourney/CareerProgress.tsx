"use client";

import { motion } from "framer-motion";
import { STATIONS } from "./careerJourney.data";
import CareerNode from "./CareerNode";

type Props = { activeIndex: number; years: string[] };

export default function CareerProgress({ activeIndex, years }: Props) {
  const n = STATIONS.length;

  return (
    <div className="flex flex-col items-center select-none">
      {STATIONS.map((station, i) => (
        <div key={station.id} className="flex flex-col items-center">
          <CareerNode
            icon={station.icon}
            isActive={activeIndex === i}
            isPast={i < activeIndex}
            year={years[i]}
            index={i}
          />
          {i < n - 1 && (
            <div
              className="relative overflow-hidden"
              style={{ width: "2px", height: "80px", backgroundColor: "var(--border)" }}
            >
              <motion.div
                className="absolute top-0 left-0 right-0"
                style={{
                  height: "100%",
                  backgroundColor: "var(--accent)",
                  transformOrigin: "top",
                }}
                animate={{ scaleY: activeIndex > i ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                initial={false}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
