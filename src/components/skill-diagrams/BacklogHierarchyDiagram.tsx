"use client";
import { useLocale } from "next-intl";

export default function BacklogHierarchyDiagram() {
  const locale = useLocale();
  const de = locale === "de";

  const levels = de
    ? [
        { label: "Epic", example: "Checkout-Flow", width: 200 },
        { label: "Feature", example: "Warenkorb-Management", width: 260 },
        { label: "User Story", example: "Als Nutzer möchte ich...", width: 340 },
        { label: "Task", example: "API-Endpoint implementieren", width: 420, muted: true },
      ]
    : [
        { label: "Epic", example: "Checkout Flow", width: 200 },
        { label: "Feature", example: "Cart Management", width: 260 },
        { label: "User Story", example: "As a user I want to...", width: 340 },
        { label: "Task", example: "Implement API endpoint", width: 420, muted: true },
      ];

  const readyLabel = de ? "✓ Sprint-Ready Filter" : "✓ Sprint-Ready Filter";
  const readySub = de ? "Nur geschnittene, klare Stories" : "Only scoped, well-defined stories";
  const zombieLabel = de ? "✗ Zombie Backlog vermeiden" : "✗ Avoid zombie backlog";
  const zombieSub = de ? "Alte Items: konkretisieren oder löschen" : "Old items: refine or remove";

  return (
    <svg viewBox="0 0 560 236" className="w-full" aria-label="Backlog Hierarchy">
      <defs>
        <marker id="bh-arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#00e5ff" opacity="0.3" />
        </marker>
      </defs>

      {levels.map((lvl, i) => {
        const x = (560 - lvl.width) / 2;
        const y = 14 + i * 46;
        const color = lvl.muted ? "#8b949e" : "#00e5ff";
        const opacity = 1 - i * 0.2;
        return (
          <g key={lvl.label}>
            {i > 0 && <line x1="280" y1={y - 8} x2="280" y2={y} stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.3" markerEnd="url(#bh-arr)" />}
            <rect x={x} y={y} width={lvl.width} height="34" rx="5"
              fill={color} fillOpacity={opacity * 0.1}
              stroke={color} strokeOpacity={opacity * 0.5} strokeWidth="1.5"
            />
            <text x="280" y={y + 14} textAnchor="middle" fill={color} fontSize="10" fontWeight="700" fontFamily="monospace" opacity={opacity}>{lvl.label}</text>
            <text x="280" y={y + 27} textAnchor="middle" fill="#8b949e" fontSize="8" fontFamily="monospace">{lvl.example}</text>
          </g>
        );
      })}

      <rect x="20" y="194" width="240" height="32" rx="4" fill="#161b22" stroke="#00e5ff" strokeOpacity="0.3" strokeWidth="1" />
      <text x="140" y="208" textAnchor="middle" fill="#00e5ff" fontSize="9" fontFamily="monospace">{readyLabel}</text>
      <text x="140" y="220" textAnchor="middle" fill="#8b949e" fontSize="7" fontFamily="monospace">{readySub}</text>

      <rect x="300" y="194" width="240" height="32" rx="4" fill="#161b22" stroke="#8b949e" strokeOpacity="0.25" strokeWidth="1" />
      <text x="420" y="208" textAnchor="middle" fill="#8b949e" fontSize="9" fontFamily="monospace">{zombieLabel}</text>
      <text x="420" y="220" textAnchor="middle" fill="#8b949e" fontSize="7" fontFamily="monospace">{zombieSub}</text>
    </svg>
  );
}
