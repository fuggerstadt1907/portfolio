"use client";
import { useLocale } from "next-intl";

export default function FigmaPipelineDiagram() {
  const locale = useLocale();
  const de = locale === "de";

  const designItems = de
    ? ["Components & Variants", "Auto Layout", "Design Tokens"]
    : ["Components & Variants", "Auto Layout", "Design Tokens"];

  const devItems = de
    ? ["React Components", "Code Connect", "Dev Mode Export"]
    : ["React Components", "Code Connect", "Dev Mode Export"];

  const bridgeLabel = de ? "Alessandro" : "Alessandro";
  const bridgeSub = de ? "Design ↔ Engineering" : "Design ↔ Engineering";
  const designLabel = "Figma";
  const devLabel = de ? "Code" : "Code";

  return (
    <svg viewBox="0 0 560 200" className="w-full" aria-label="Figma Design to Engineering Bridge">
      <rect x="20" y="20" width="160" height="160" rx="8" fill="#00e5ff" fillOpacity="0.06" stroke="#00e5ff" strokeOpacity="0.3" strokeWidth="1.5" />
      <text x="100" y="44" textAnchor="middle" fill="#00e5ff" fontSize="11" fontWeight="700" fontFamily="monospace">{designLabel}</text>
      {designItems.map((item, i) => (
        <g key={item} transform={`translate(30, ${58 + i * 36})`}>
          <rect width="140" height="26" rx="4" fill="#161b22" stroke="#00e5ff" strokeOpacity="0.2" strokeWidth="1" />
          <text x="70" y="17" textAnchor="middle" fill="#e8edf2" fontSize="8.5" fontFamily="monospace" opacity="0.85">{item}</text>
        </g>
      ))}

      <rect x="380" y="20" width="160" height="160" rx="8" fill="#161b22" stroke="#00e5ff" strokeOpacity="0.2" strokeWidth="1.5" />
      <text x="460" y="44" textAnchor="middle" fill="#e8edf2" fontSize="11" fontWeight="700" fontFamily="monospace">{devLabel}</text>
      {devItems.map((item, i) => (
        <g key={item} transform={`translate(390, ${58 + i * 36})`}>
          <rect width="140" height="26" rx="4" fill="#0d1117" stroke="#00e5ff" strokeOpacity="0.15" strokeWidth="1" />
          <text x="70" y="17" textAnchor="middle" fill="#e8edf2" fontSize="8.5" fontFamily="monospace" opacity="0.75">{item}</text>
        </g>
      ))}

      <circle cx="280" cy="100" r="44" fill="#0d2830" stroke="#00e5ff" strokeWidth="1.5" strokeOpacity="0.6" />
      <text x="280" y="92" textAnchor="middle" fill="#00e5ff" fontSize="10" fontWeight="700" fontFamily="monospace">{bridgeLabel}</text>
      <text x="280" y="108" textAnchor="middle" fill="#00e5ff" fontSize="8" fontFamily="monospace" opacity="0.8">{bridgeSub}</text>

      <line x1="180" y1="100" x2="236" y2="100" stroke="#00e5ff" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 3" />
      <line x1="324" y1="100" x2="380" y2="100" stroke="#00e5ff" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 3" />
    </svg>
  );
}
