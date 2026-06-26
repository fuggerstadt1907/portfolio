"use client";
import { useLocale } from "next-intl";

export default function DocLayersDiagram() {
  const locale = useLocale();
  const de = locale === "de";

  const executiveTitle = de ? "Executive View" : "Executive View";
  const executiveAudience = de ? "Zielgruppe: Management, Product, Business" : "Audience: Management, Product, Business";
  const technicalTitle = de ? "Technical View" : "Technical View";
  const technicalAudience = de ? "Zielgruppe: Engineering, Architekten" : "Audience: Engineering, Architects";
  const separatorLabel = de ? "Getrennte Ebenen" : "Separate layers";

  const executiveItems = de
    ? ["Warum wurde entschieden?", "Auswirkungen & Trade-offs", "Risiken & Scope", "Roadmap-Relevanz"]
    : ["Why was this decided?", "Impact & trade-offs", "Risks & scope", "Roadmap relevance"];

  const technicalItems = de
    ? ["Wie ist es umgesetzt?", "API-Contracts & Datenflüsse", "Architekturentscheidungen (ADR)", "Edge Cases & Annahmen"]
    : ["How is it implemented?", "API contracts & data flows", "Architecture decisions (ADR)", "Edge cases & assumptions"];

  return (
    <svg viewBox="0 0 560 240" className="w-full" aria-label="Documentation Layers">
      <rect x="20" y="10" width="520" height="90" rx="6" fill="#00e5ff" fillOpacity="0.08" stroke="#00e5ff" strokeOpacity="0.4" strokeWidth="1.5" />
      <text x="30" y="28" fill="#00e5ff" fontSize="10" fontWeight="700" fontFamily="monospace">{executiveTitle}</text>
      <text x="30" y="42" fill="#8b949e" fontSize="8" fontFamily="monospace">{executiveAudience}</text>

      {executiveItems.map((item, i) => (
        <g key={item} transform={`translate(${30 + (i % 2) * 250}, ${54 + Math.floor(i / 2) * 22})`}>
          <text fill="#e8edf2" fontSize="9" fontFamily="monospace" opacity="0.85">◆ {item}</text>
        </g>
      ))}

      <line x1="60" y1="113" x2="230" y2="113" stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 3" />
      <line x1="330" y1="113" x2="500" y2="113" stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 3" />
      <text x="280" y="117" textAnchor="middle" fill="#8b949e" fontSize="8" fontFamily="monospace">{separatorLabel}</text>

      <rect x="20" y="128" width="520" height="90" rx="6" fill="#161b22" stroke="#00e5ff" strokeOpacity="0.2" strokeWidth="1.5" />
      <text x="30" y="146" fill="#e8edf2" fontSize="10" fontWeight="700" fontFamily="monospace">{technicalTitle}</text>
      <text x="30" y="162" fill="#8b949e" fontSize="8" fontFamily="monospace">{technicalAudience}</text>

      {technicalItems.map((item, i) => (
        <g key={item} transform={`translate(${30 + (i % 2) * 250}, ${174 + Math.floor(i / 2) * 22})`}>
          <text fill="#e8edf2" fontSize="9" fontFamily="monospace" opacity="0.7">◆ {item}</text>
        </g>
      ))}
    </svg>
  );
}
