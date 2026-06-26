"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { parseWithHints } from "./parseWithHints";

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  product:      { bg: "rgba(255,100,80,0.12)",  text: "#ff6450", border: "rgba(255,100,80,0.35)" },
  architecture: { bg: "rgba(163,0,255,0.12)", text: "#c084fc", border: "rgba(163,0,255,0.35)" },
  process:      { bg: "rgba(0,255,128,0.12)",  text: "#00ff80", border: "rgba(0,255,128,0.35)" },
  tools:        { bg: "rgba(255,165,0,0.12)",  text: "#ffa500", border: "rgba(255,165,0,0.35)" },
};

const diagrams: Record<string, React.ComponentType> = {
  "user-story-map": dynamic(() => import("./skill-diagrams/UserStoryMapDiagram")),
  "stakeholder-hub": dynamic(() => import("./skill-diagrams/StakeholderHubDiagram")),
  "c4-context": dynamic(() => import("./skill-diagrams/C4ContextDiagram")),
  "api-matrix": dynamic(() => import("./skill-diagrams/ApiMatrixDiagram")),
  "cloud-evolution": dynamic(() => import("./skill-diagrams/CloudEvolutionDiagram")),
  "context-map": dynamic(() => import("./skill-diagrams/ContextMapDiagram")),
  "scrum-kanban-matrix": dynamic(() => import("./skill-diagrams/ScrumKanbanMatrix")),
  "doc-layers": dynamic(() => import("./skill-diagrams/DocLayersDiagram")),
  "review-pyramid": dynamic(() => import("./skill-diagrams/ReviewPyramid")),
  "figma-pipeline": dynamic(() => import("./skill-diagrams/FigmaPipelineDiagram")),
  "backlog-hierarchy": dynamic(() => import("./skill-diagrams/BacklogHierarchyDiagram")),
  "frontend-layers": dynamic(() => import("./skill-diagrams/FrontendLayersDiagram")),
};

type Props = {
  skill: { name: string; category: string; diagram?: string } | null;
  description: string;
  onClose: () => void;
};

export default function SkillModal({ skill, description, onClose }: Props) {
  const t = useTranslations("skills");
  const categories = t.raw("categories") as Record<string, string>;
  const diagramCaptions = t.raw("diagram_captions") as Record<string, string>;
  const glossary = t.raw("glossary") as Record<string, string>;
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!skill) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [skill, onClose]);

  const Diagram = skill?.diagram ? diagrams[skill.diagram] : null;

  const paragraphs = description.split("\n\n").filter(Boolean);

  return (
    <AnimatePresence>
      {skill && (
        <motion.div
          ref={overlayRef}
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4 pt-20"
          style={{ background: "rgba(13,17,23,0.85)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-2xl max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl border scrollbar-hide"
            style={{
              background: "var(--surface-raised)",
              borderColor: "rgba(0,229,255,0.2)",
              boxShadow: "0 0 60px rgba(0,229,255,0.08), 0 24px 48px rgba(0,0,0,0.5)",
            }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-7 pt-7 pb-4"
              style={{ background: "var(--surface-raised)", borderBottom: "1px solid rgba(0,229,255,0.08)" }}>
              <div>
                {(() => {
                  const c = categoryColors[skill.category];
                  return (
                    <span
                      className="inline-block font-mono text-xs px-2.5 py-0.5 rounded-full mb-2"
                      style={c
                        ? { background: c.bg, color: c.text, border: `1px solid ${c.border}` }
                        : { background: "rgba(255,255,255,0.08)", color: "var(--muted)", border: "1px solid rgba(255,255,255,0.15)" }
                      }
                    >
                      {categories[skill.category] ?? skill.category}
                    </span>
                  );
                })()}
                <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
                  {skill.name}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="mt-1 shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150 font-mono text-base cursor-pointer"
                style={{ color: "var(--muted)", border: "1px solid rgba(0,229,255,0.15)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,229,255,0.4)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,229,255,0.15)";
                }}
                aria-label={t("modal_close")}
              >
                ✕
              </button>
            </div>

            <div className="px-7 py-6 space-y-6">
              {/* Description */}
              <div className="space-y-3">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed" style={{ color: "var(--foreground)", opacity: 0.85 }}>
                    {parseWithHints(p, glossary)}
                  </p>
                ))}
              </div>

              {/* Diagram */}
              {Diagram && (
                <figure className="space-y-2">
                  <div
                    className="rounded-xl p-4"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid rgba(0,229,255,0.1)",
                    }}
                  >
                    <Diagram />
                  </div>
                  {skill.diagram && diagramCaptions[skill.diagram] && (
                    <figcaption
                      className="font-mono text-xs px-1 leading-relaxed"
                      style={{ color: "var(--muted)", opacity: 0.7 }}
                    >
                      {diagramCaptions[skill.diagram]}
                    </figcaption>
                  )}
                </figure>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
