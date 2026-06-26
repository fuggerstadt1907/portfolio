"use client";
import { useLocale } from "next-intl";

export default function ReviewPyramid() {
  const locale = useLocale();
  const de = locale === "de";

  const levels = de
    ? [
        { label: "Fachliche Korrektheit", note: "Löst der Code das richtige Problem?" },
        { label: "Architektur & Struktur", note: "Unnötige Kopplungen?" },
        { label: "Wartbarkeit", note: "In 6 Monaten noch sicher änderbar?" },
        { label: "Nebenwirkungen", note: "Ungewollte Effekte?" },
        { label: "Testabdeckung", note: "Kritische Pfade abgesichert?" },
        { label: "Stil & Naming", note: "Teamkonvention", muted: true },
      ]
    : [
        { label: "Functional correctness", note: "Does the code solve the right problem?" },
        { label: "Architecture & structure", note: "Unnecessary coupling?" },
        { label: "Maintainability", note: "Still safely changeable in 6 months?" },
        { label: "Side effects", note: "Unintended consequences?" },
        { label: "Test coverage", note: "Critical paths covered?" },
        { label: "Style & naming", note: "Team convention", muted: true },
      ];

  const widths = [160, 220, 290, 360, 430, 500];
  const totalH = 200;
  const rowH = totalH / levels.length;
  const priorityLabel = de ? "Priorität (hoch → niedrig)" : "Priority (high → low)";

  return (
    <svg viewBox="0 0 560 220" className="w-full" aria-label="Code Review Priority Pyramid">
      <text x="280" y="14" textAnchor="middle" fill="#8b949e" fontSize="9" fontFamily="monospace">{priorityLabel}</text>

      {levels.map((lvl, i) => {
        const w = widths[i];
        const x = (560 - w) / 2;
        const y = 20 + i * rowH;
        const color = lvl.muted ? "#8b949e" : "#00e5ff";
        const opacity = lvl.muted ? 0.5 : 1 - i * 0.13;
        return (
          <g key={lvl.label}>
            <rect x={x} y={y} width={w} height={rowH - 2} rx="3"
              fill={color} fillOpacity={opacity * 0.15}
              stroke={color} strokeOpacity={opacity * 0.6} strokeWidth="1"
            />
            <text x="280" y={y + rowH / 2 - 2} textAnchor="middle" fill={color} fontSize="9" fontWeight="600" fontFamily="monospace" opacity={opacity}>{lvl.label}</text>
            <text x="280" y={y + rowH / 2 + 10} textAnchor="middle" fill="#8b949e" fontSize="7" fontFamily="monospace">{lvl.note}</text>
          </g>
        );
      })}

      <defs>
        <marker id="rev-arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#00e5ff" opacity="0.3" />
        </marker>
      </defs>
      <line x1="20" y1="22" x2="20" y2="210" stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.3" markerEnd="url(#rev-arr)" />
    </svg>
  );
}
