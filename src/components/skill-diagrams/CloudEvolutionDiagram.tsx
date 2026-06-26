"use client";
import { useLocale } from "next-intl";

export default function CloudEvolutionDiagram() {
  const locale = useLocale();
  const de = locale === "de";

  const stages = de
    ? [
        { label: "Validate", note: "Schnell & einfach", services: ["Managed DB", "Object Storage", "Cloud Run / Lambda"] },
        { label: "Grow", note: "Skaliert mit Nutzern", services: ["Queue (SQS/PubSub)", "CDN", "Auth (Cognito)"] },
        { label: "Scale", note: "Nur bei realem Bedarf", services: ["Multi-Region", "IaC (Terraform)", "Observability Stack"] },
      ]
    : [
        { label: "Validate", note: "Fast & simple", services: ["Managed DB", "Object Storage", "Cloud Run / Lambda"] },
        { label: "Grow", note: "Scales with users", services: ["Queue (SQS/PubSub)", "CDN", "Auth (Cognito)"] },
        { label: "Scale", note: "Only when needed", services: ["Multi-Region", "IaC (Terraform)", "Observability Stack"] },
      ];

  const growthLabel = de ? "Produkt-Wachstum →" : "Product growth →";
  const opacities = [0.9, 0.6, 0.35];

  return (
    <svg viewBox="0 0 560 200" className="w-full" aria-label="Cloud Architecture Evolution">
      <defs>
        <marker id="evo-arrow" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#00e5ff" opacity="0.4" />
        </marker>
      </defs>
      <line x1="20" y1="170" x2="540" y2="170" stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.25" markerEnd="url(#evo-arrow)" />
      <text x="20" y="187" fill="#8b949e" fontSize="8" fontFamily="monospace">{growthLabel}</text>

      {stages.map((stage, i) => {
        const x = 20 + i * 180;
        const op = opacities[i];
        return (
          <g key={stage.label} transform={`translate(${x}, 10)`}>
            <rect width="165" height="148" rx="6" fill="#00e5ff" fillOpacity={op * 0.1} stroke="#00e5ff" strokeOpacity={op * 0.5} strokeWidth="1.5" />
            <text x="82" y="22" textAnchor="middle" fill="#00e5ff" fontSize="11" fontWeight="700" fontFamily="monospace" opacity={op}>{stage.label}</text>
            <text x="82" y="36" textAnchor="middle" fill="#8b949e" fontSize="8" fontFamily="monospace">{stage.note}</text>
            <line x1="12" y1="42" x2="153" y2="42" stroke="#00e5ff" strokeOpacity="0.15" strokeWidth="1" />
            {stage.services.map((svc, j) => (
              <g key={svc} transform={`translate(12, ${52 + j * 30})`}>
                <rect width="141" height="22" rx="3" fill="#161b22" stroke="#00e5ff" strokeOpacity={op * 0.3} strokeWidth="1" />
                <text x="70" y="14" textAnchor="middle" fill="#e8edf2" fontSize="9" fontFamily="monospace" opacity={op}>{svc}</text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
