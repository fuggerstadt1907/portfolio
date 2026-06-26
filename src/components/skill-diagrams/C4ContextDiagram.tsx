"use client";
import { useLocale } from "next-intl";

export default function C4ContextDiagram() {
  const locale = useLocale();
  const de = locale === "de";

  const boundaryLabel = de ? "System Boundary" : "System Boundary";
  const internalLabel = de ? "Intern" : "Internal";
  const externalLabel = de ? "Extern" : "External";
  const userLabel = de ? "Nutzer" : "User";
  const externalApiLabel = de ? "3rd Party APIs" : "3rd Party APIs";

  return (
    <svg viewBox="0 0 560 260" className="w-full" aria-label="C4 Context Diagram">
      <rect x="140" y="20" width="280" height="180" rx="6" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="6 4" />
      <text x="148" y="36" fill="#00e5ff" fontSize="9" fontFamily="monospace" opacity="0.5">{boundaryLabel}</text>

      <rect x="195" y="60" width="170" height="52" rx="5" fill="#00e5ff" fillOpacity="0.12" stroke="#00e5ff" strokeWidth="1.5" strokeOpacity="0.6" />
      <text x="280" y="82" textAnchor="middle" fill="#00e5ff" fontSize="11" fontWeight="700" fontFamily="monospace">Core Platform</text>
      <text x="280" y="97" textAnchor="middle" fill="#00e5ff" fontSize="8" fontFamily="monospace" opacity="0.6">[System]</text>

      <rect x="155" y="148" width="100" height="38" rx="4" fill="#161b22" stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.3" />
      <text x="205" y="166" textAnchor="middle" fill="#e8edf2" fontSize="9" fontFamily="monospace">Service A</text>
      <text x="205" y="179" textAnchor="middle" fill="#8b949e" fontSize="7" fontFamily="monospace">[Microservice]</text>

      <rect x="305" y="148" width="100" height="38" rx="4" fill="#161b22" stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.3" />
      <text x="355" y="166" textAnchor="middle" fill="#e8edf2" fontSize="9" fontFamily="monospace">Data Layer</text>
      <text x="355" y="179" textAnchor="middle" fill="#8b949e" fontSize="7" fontFamily="monospace">[Postgres]</text>

      <line x1="205" y1="148" x2="248" y2="112" stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.4" markerEnd="url(#arr)" />
      <line x1="312" y1="112" x2="355" y2="148" stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.4" markerEnd="url(#arr)" />

      <ellipse cx="60" cy="86" rx="30" ry="20" fill="#161b22" stroke="#8b949e" strokeWidth="1" strokeOpacity="0.4" />
      <text x="60" y="90" textAnchor="middle" fill="#8b949e" fontSize="9" fontFamily="monospace">{userLabel}</text>
      <line x1="90" y1="86" x2="195" y2="86" stroke="#8b949e" strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.4" markerEnd="url(#arr2)" />

      <rect x="430" y="60" width="110" height="52" rx="4" fill="#161b22" stroke="#8b949e" strokeWidth="1" strokeOpacity="0.3" />
      <text x="485" y="82" textAnchor="middle" fill="#8b949e" fontSize="9" fontFamily="monospace">{externalApiLabel}</text>
      <text x="485" y="97" textAnchor="middle" fill="#8b949e" fontSize="7" fontFamily="monospace">[External System]</text>
      <line x1="430" y1="86" x2="365" y2="86" stroke="#8b949e" strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.4" markerEnd="url(#arr2)" />

      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#00e5ff" opacity="0.5" />
        </marker>
        <marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#8b949e" opacity="0.5" />
        </marker>
      </defs>

      <rect x="10" y="220" width="10" height="10" rx="2" fill="#00e5ff" fillOpacity="0.12" stroke="#00e5ff" strokeOpacity="0.5" strokeWidth="1" />
      <text x="26" y="229" fill="#8b949e" fontSize="8" fontFamily="monospace">{internalLabel}</text>
      <rect x="80" y="220" width="10" height="10" rx="2" fill="#161b22" stroke="#8b949e" strokeOpacity="0.4" strokeWidth="1" />
      <text x="96" y="229" fill="#8b949e" fontSize="8" fontFamily="monospace">{externalLabel}</text>
    </svg>
  );
}
