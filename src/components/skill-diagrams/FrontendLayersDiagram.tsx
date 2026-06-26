"use client";
import { useLocale } from "next-intl";

export default function FrontendLayersDiagram() {
  const locale = useLocale();
  const de = locale === "de";

  const layers = de
    ? [
        { label: "UI / Components", sub: "React · React Native · Next.js" },
        { label: "State Management", sub: "Context · Zustand · React Query" },
        { label: "API Layer", sub: "REST · GraphQL · Type-safe Clients" },
        { label: "Domain / Types", sub: "TypeScript · Interfaces · Business Logic" },
      ]
    : [
        { label: "UI / Components", sub: "React · React Native · Next.js" },
        { label: "State Management", sub: "Context · Zustand · React Query" },
        { label: "API Layer", sub: "REST · GraphQL · Type-safe Clients" },
        { label: "Domain / Types", sub: "TypeScript · Interfaces · Business Logic" },
      ];

  const tsLabel = de ? "TypeScript durchgehend" : "TypeScript throughout";

  return (
    <svg viewBox="0 0 560 220" className="w-full" aria-label="Frontend Architecture Layers">
      <defs>
        <marker id="fl-arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#00e5ff" opacity="0.3" />
        </marker>
      </defs>

      {layers.map((layer, i) => {
        const y = 14 + i * 44;
        const opacity = 1 - i * 0.2;
        return (
          <g key={layer.label}>
            {i > 0 && <line x1="280" y1={y - 4} x2="280" y2={y} stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.25" markerEnd="url(#fl-arr)" />}
            <rect x="60" y={y} width="440" height="36" rx="5"
              fill="#00e5ff" fillOpacity={opacity * 0.1}
              stroke="#00e5ff" strokeOpacity={opacity * 0.5} strokeWidth="1.5"
            />
            <text x="280" y={y + 15} textAnchor="middle" fill="#00e5ff" fontSize="11" fontWeight="700" fontFamily="monospace" opacity={opacity}>{layer.label}</text>
            <text x="280" y={y + 28} textAnchor="middle" fill="#8b949e" fontSize="8" fontFamily="monospace">{layer.sub}</text>
          </g>
        );
      })}

      <rect x="20" y="192" width="160" height="22" rx="11" fill="#00e5ff" fillOpacity="0.1" stroke="#00e5ff" strokeOpacity="0.35" strokeWidth="1" />
      <text x="100" y="207" textAnchor="middle" fill="#00e5ff" fontSize="9" fontFamily="monospace">{tsLabel}</text>

      <rect x="200" y="192" width="160" height="22" rx="11" fill="#161b22" stroke="#8b949e" strokeOpacity="0.3" strokeWidth="1" />
      <text x="280" y="207" textAnchor="middle" fill="#8b949e" fontSize="9" fontFamily="monospace">Expo (React Native)</text>

      <rect x="380" y="192" width="160" height="22" rx="11" fill="#161b22" stroke="#8b949e" strokeOpacity="0.3" strokeWidth="1" />
      <text x="460" y="207" textAnchor="middle" fill="#8b949e" fontSize="9" fontFamily="monospace">Next.js (Web)</text>
    </svg>
  );
}
