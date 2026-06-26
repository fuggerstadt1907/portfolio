"use client";
import { useLocale } from "next-intl";

export default function UserStoryMapDiagram() {
  const locale = useLocale();
  const de = locale === "de";

  const activities = de
    ? ["Onboarding", "Entdecken", "Auswählen", "Kaufen"]
    : ["Onboarding", "Discover", "Select", "Purchase"];
  const tasks = de
    ? [["Registrieren", "Profil anlegen"], ["Suchen", "Filtern"], ["Vergleichen", "Merken"], ["Warenkorb", "Checkout"]]
    : [["Register", "Create profile"], ["Search", "Filter"], ["Compare", "Save"], ["Cart", "Checkout"]];
  const mvp = de
    ? ["E-Mail Sign-up", "Kategorien", "Produktliste", "Kauf-Flow"]
    : ["Email Sign-up", "Categories", "Product list", "Buy flow"];
  const release2 = de
    ? ["SSO / OAuth", "Empfehlungen", "Wishlist", "Gutscheine"]
    : ["SSO / OAuth", "Recommendations", "Wishlist", "Coupons"];
  const processLabel = de ? "Nutzerprozess →" : "User process →";
  const mvpLabel = "MVP";
  const release2Label = "Release 2";

  return (
    <svg viewBox="0 0 560 230" className="w-full" aria-label="User Story Map">
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#00e5ff" opacity="0.5" />
        </marker>
      </defs>

      <line x1="20" y1="24" x2="540" y2="24" stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.2" markerEnd="url(#arrow)" />
      <text x="20" y="18" fill="#8b949e" fontSize="9" fontFamily="monospace">{processLabel}</text>

      {activities.map((act, i) => (
        <g key={act} transform={`translate(${20 + i * 135}, 30)`}>
          <rect width="120" height="26" rx="4" fill="#00e5ff" fillOpacity="0.15" stroke="#00e5ff" strokeOpacity="0.5" strokeWidth="1" />
          <text x="60" y="17" textAnchor="middle" fill="#00e5ff" fontSize="10" fontWeight="600" fontFamily="monospace">{act}</text>
        </g>
      ))}

      {tasks.map((group, i) =>
        group.map((task, j) => (
          <g key={task} transform={`translate(${20 + i * 135}, ${66 + j * 32})`}>
            <rect width="115" height="24" rx="3" fill="#161b22" stroke="#00e5ff" strokeOpacity="0.25" strokeWidth="1" />
            <text x="57" y="15" textAnchor="middle" fill="#e8edf2" fontSize="9" fontFamily="monospace" opacity="0.85">{task}</text>
          </g>
        ))
      )}

      <line x1="14" y1="138" x2="546" y2="138" stroke="#00e5ff" strokeWidth="1.5" strokeDasharray="4 3" strokeOpacity="0.6" />
      <text x="14" y="134" fill="#00e5ff" fontSize="8" fontFamily="monospace" opacity="0.7">{mvpLabel}</text>

      {mvp.map((s, i) => (
        <g key={s} transform={`translate(${20 + i * 135}, 144)`}>
          <rect width="115" height="22" rx="3" fill="#00e5ff" fillOpacity="0.08" stroke="#00e5ff" strokeOpacity="0.3" strokeWidth="1" />
          <text x="57" y="14" textAnchor="middle" fill="#00e5ff" fontSize="9" fontFamily="monospace" opacity="0.9">{s}</text>
        </g>
      ))}

      <line x1="14" y1="188" x2="546" y2="188" stroke="#8b949e" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />
      <text x="14" y="184" fill="#8b949e" fontSize="8" fontFamily="monospace" opacity="0.6">{release2Label}</text>

      {release2.map((s, i) => (
        <g key={s} transform={`translate(${20 + i * 135}, 192)`}>
          <rect width="115" height="22" rx="3" fill="#161b22" stroke="#8b949e" strokeOpacity="0.2" strokeWidth="1" />
          <text x="57" y="14" textAnchor="middle" fill="#8b949e" fontSize="9" fontFamily="monospace" opacity="0.7">{s}</text>
        </g>
      ))}
    </svg>
  );
}
