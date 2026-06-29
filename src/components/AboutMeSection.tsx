"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

function item(delay: number) {
  return {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.55, ease: "easeOut" as const },
    },
  };
}

export default function AboutMeSection() {
  const t = useTranslations("about_me");
  const questions = t.raw("questions") as string[];

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.p
          variants={item(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="font-mono text-accent text-xs tracking-widest uppercase mb-10"
        >
          {t("headline")}
        </motion.p>

        <motion.div
          variants={item(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-1">
            {t("lead")}
          </p>
          <p className="text-3xl md:text-4xl font-bold text-accent leading-tight mb-10">
            {t("lead2")}
          </p>
        </motion.div>

        <motion.p
          variants={item(0.16)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-muted text-base mb-6"
        >
          {t("questions_intro")}
        </motion.p>

        <ul className="flex flex-col gap-0 mb-8 border border-border rounded-xl overflow-hidden">
          {questions.map((q, i) => (
            <motion.li
              key={i}
              variants={item(0.2 + i * 0.07)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={`flex items-start gap-4 px-6 py-4 bg-surface/40 text-foreground/85 text-sm leading-relaxed ${
                i < questions.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="text-accent font-mono mt-0.5 shrink-0 text-xs">›</span>
              {q}
            </motion.li>
          ))}
        </ul>

        <motion.p
          variants={item(0.6)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-muted text-base italic mb-12"
        >
          {t("observation")}
        </motion.p>

        <motion.div
          variants={item(0.68)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="border-l-2 border-accent pl-6"
        >
          <p className="text-foreground font-semibold mb-3">{t("code_headline")}</p>
          <p className="text-muted text-sm leading-relaxed">{t("code_body")}</p>
        </motion.div>
      </div>
    </section>
  );
}
