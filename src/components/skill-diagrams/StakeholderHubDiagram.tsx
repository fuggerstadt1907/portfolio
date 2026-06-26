"use client";
import { useLocale } from "next-intl";

export default function StakeholderHubDiagram() {
  const locale = useLocale();
  const de = locale === "de";

  const nodes = de
    ? [
        { label: "C-Level", x: 280, y: 40 },
        { label: "Engineering", x: 460, y: 110 },
        { label: "UX / Design", x: 420, y: 210 },
        { label: "Kunden", x: 280, y: 260 },
        { label: "Vertrieb", x: 140, y: 210 },
        { label: "Fachbereich", x: 100, y: 110 },
      ]
    : [
        { label: "C-Level", x: 280, y: 40 },
        { label: "Engineering", x: 460, y: 110 },
        { label: "UX / Design", x: 420, y: 210 },
        { label: "Customers", x: 280, y: 260 },
        { label: "Sales", x: 140, y: 210 },
        { label: "Business", x: 100, y: 110 },
      ];

  const hubSub1 = de ? "Übersetzer &" : "Translator &";
  const hubSub2 = de ? "Moderator" : "Facilitator";
  const cx = 280, cy = 150;

  return (
    <svg viewBox="0 0 560 300" className="w-full" aria-label="Stakeholder Hub">
      {nodes.map((n) => (
        <line key={n.label} x1={cx} y1={cy} x2={n.x} y2={n.y}
          stroke="#00e5ff" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="4 3" />
      ))}

      <circle cx={cx} cy={cy} r="56" fill="#0d2830" stroke="#00e5ff" strokeWidth="1.5" strokeOpacity="0.6" />
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#00e5ff" fontSize="9" fontWeight="700" fontFamily="monospace">Alessandro</text>
      <text x={cx} y={cy + 3} textAnchor="middle" fill="#00e5ff" fontSize="9" fontWeight="700" fontFamily="monospace">Orlandi</text>
      <text x={cx} y={cy + 16} textAnchor="middle" fill="#00e5ff" fontSize="7.5" fontFamily="monospace" opacity="0.7">{hubSub1} {hubSub2}</text>

      {nodes.map((n) => (
        <g key={n.label} transform={`translate(${n.x}, ${n.y})`}>
          <circle r="36" fill="#161b22" stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.3" />
          <text textAnchor="middle" y="4" fill="#e8edf2" fontSize="9" fontFamily="monospace" opacity="0.85">{n.label}</text>
        </g>
      ))}
    </svg>
  );
}
