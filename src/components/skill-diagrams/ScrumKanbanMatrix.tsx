"use client";
import { useLocale } from "next-intl";

export default function ScrumKanbanMatrix() {
  const locale = useLocale();
  const de = locale === "de";

  const scrumRows = de
    ? ["Aktiver Produktaufbau", "MVP / Release-Phasen", "Team braucht Struktur", "Regelmäßige Priorisierung"]
    : ["Active product development", "MVP / Release phases", "Team benefits from structure", "Regular re-prioritization"];

  const kanbanRows = de
    ? ["Kontinuierlicher Flow", "Support / Maintenance", "Stark variable Anforderungen", "Schnelle Reaktionsfähigkeit"]
    : ["Continuous flow", "Support / Maintenance", "Highly variable requirements", "Fast responsiveness"];

  const contextLabel = de ? "Wann passt was?" : "When to use which?";
  const bottomNote = de
    ? "In der Praxis: Mischformen (Scrumban) oft am sinnvollsten"
    : "In practice: hybrid setups (Scrumban) are often the best fit";

  // Layout constants
  const headerY = 26;
  const rowsStartY = 72;
  const rowHeight = 30;
  const rowGap = 38;
  const numRows = 4;
  // Scrum box: x=20..260, Kanban box: x=300..540 → gap center = 280
  const dividerX = 280;
  const dividerEnd = rowsStartY + numRows * rowGap; // stop exactly at end of last row
  const bottomNoteY = dividerEnd + 16;
  const viewH = bottomNoteY + 8;

  return (
    <svg viewBox={`0 0 560 ${viewH}`} className="w-full" aria-label="Scrum vs Kanban">
      {/* Title */}
      <text x="280" y="14" textAnchor="middle" fill="#8b949e" fontSize="8" fontFamily="monospace">{contextLabel}</text>

      {/* Headers */}
      <rect x="20" y={headerY} width="240" height="34" rx="5" fill="#00e5ff" fillOpacity="0.15" stroke="#00e5ff" strokeOpacity="0.5" strokeWidth="1.5" />
      <text x="140" y={headerY + 22} textAnchor="middle" fill="#00e5ff" fontSize="13" fontWeight="700" fontFamily="monospace">Scrum</text>

      <rect x="300" y={headerY} width="240" height="34" rx="5" fill="#161b22" stroke="#00e5ff" strokeOpacity="0.25" strokeWidth="1.5" />
      <text x="420" y={headerY + 22} textAnchor="middle" fill="#e8edf2" fontSize="13" fontWeight="700" fontFamily="monospace">Kanban</text>

      {/* Divider line — stops at end of last row, not into the footnote */}
      <line x1={dividerX} y1={headerY} x2={dividerX} y2={dividerEnd} stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 3" />

      {/* Rows */}
      {scrumRows.map((row, i) => (
        <g key={row} transform={`translate(20, ${rowsStartY + i * rowGap})`}>
          <rect width="240" height={rowHeight} rx="3" fill={i % 2 === 0 ? "rgba(0,229,255,0.04)" : "transparent"} stroke="#00e5ff" strokeOpacity="0.12" strokeWidth="1" />
          <text x="16" y="19" fill="#e8edf2" fontSize="9" fontFamily="monospace" opacity="0.85">→ {row}</text>
        </g>
      ))}

      {kanbanRows.map((row, i) => (
        <g key={row} transform={`translate(300, ${rowsStartY + i * rowGap})`}>
          <rect width="240" height={rowHeight} rx="3" fill={i % 2 === 0 ? "rgba(22,27,34,0.5)" : "transparent"} stroke="#00e5ff" strokeOpacity="0.08" strokeWidth="1" />
          <text x="16" y="19" fill="#e8edf2" fontSize="9" fontFamily="monospace" opacity="0.75">→ {row}</text>
        </g>
      ))}

      <text x="280" y={bottomNoteY} textAnchor="middle" fill="#8b949e" fontSize="8" fontFamily="monospace">{bottomNote}</text>
    </svg>
  );
}
