"use client";
import { useLocale } from "next-intl";

export default function ContextMapDiagram() {
  const locale = useLocale();
  const de = locale === "de";

  const bcLabel = de ? "Bounded Context" : "Bounded Context";
  const aclLabel = de ? "Anti-Corruption\nLayer" : "Anti-Corruption\nLayer";
  const translationLabel = de ? "[Übersetzung]" : "[Translation]";
  const domainALabel = de ? "Order Domain" : "Order Domain";
  const domainBLabel = de ? "Inventory Domain" : "Inventory Domain";
  const langALabel = de ? "Ubiquitous Language:" : "Ubiquitous Language:";
  const langAItems = de ? "Order, Place, Fulfill, Ship" : "Order, Place, Fulfill, Ship";
  const langBItems = de ? "SKU, Reserve, Replenish" : "SKU, Reserve, Replenish";
  const legendBCLabel = de ? "Bounded Context" : "Bounded Context";
  const legendACLLabel = de ? "Anti-Corruption Layer" : "Anti-Corruption Layer";

  return (
    <svg viewBox="0 0 560 220" className="w-full" aria-label="DDD Context Map">
      <defs>
        <marker id="cm-arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#00e5ff" opacity="0.5" />
        </marker>
      </defs>

      <rect x="20" y="20" width="200" height="140" rx="6" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="6 4" />
      <text x="30" y="36" fill="#00e5ff" fontSize="9" fontFamily="monospace" opacity="0.6">{bcLabel}</text>
      <text x="120" y="60" textAnchor="middle" fill="#00e5ff" fontSize="12" fontWeight="700" fontFamily="monospace">{domainALabel}</text>

      <rect x="35" y="72" width="80" height="28" rx="3" fill="#161b22" stroke="#00e5ff" strokeOpacity="0.3" strokeWidth="1" />
      <text x="75" y="90" textAnchor="middle" fill="#e8edf2" fontSize="9" fontFamily="monospace">Order</text>
      <rect x="125" y="72" width="80" height="28" rx="3" fill="#161b22" stroke="#00e5ff" strokeOpacity="0.3" strokeWidth="1" />
      <text x="165" y="90" textAnchor="middle" fill="#e8edf2" fontSize="9" fontFamily="monospace">LineItem</text>

      <text x="120" y="130" textAnchor="middle" fill="#8b949e" fontSize="8" fontFamily="monospace">{langALabel}</text>
      <text x="120" y="143" textAnchor="middle" fill="#8b949e" fontSize="8" fontFamily="monospace">{langAItems}</text>

      <rect x="230" y="70" width="100" height="50" rx="4" fill="#00e5ff" fillOpacity="0.08" stroke="#00e5ff" strokeOpacity="0.4" strokeWidth="1" />
      <text x="280" y="91" textAnchor="middle" fill="#00e5ff" fontSize="8" fontWeight="600" fontFamily="monospace">Anti-Corruption</text>
      <text x="280" y="103" textAnchor="middle" fill="#00e5ff" fontSize="8" fontFamily="monospace">Layer</text>
      <text x="280" y="115" textAnchor="middle" fill="#8b949e" fontSize="7" fontFamily="monospace">{translationLabel}</text>

      <line x1="220" y1="95" x2="230" y2="95" stroke="#00e5ff" strokeWidth="1.5" strokeOpacity="0.5" markerEnd="url(#cm-arr)" />
      <line x1="330" y1="95" x2="340" y2="95" stroke="#00e5ff" strokeWidth="1.5" strokeOpacity="0.5" markerEnd="url(#cm-arr)" />

      <rect x="340" y="20" width="200" height="140" rx="6" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="6 4" />
      <text x="350" y="36" fill="#00e5ff" fontSize="9" fontFamily="monospace" opacity="0.4">{bcLabel}</text>
      <text x="440" y="60" textAnchor="middle" fill="#e8edf2" fontSize="12" fontWeight="700" fontFamily="monospace">{domainBLabel}</text>

      <rect x="355" y="72" width="80" height="28" rx="3" fill="#161b22" stroke="#8b949e" strokeOpacity="0.3" strokeWidth="1" />
      <text x="395" y="90" textAnchor="middle" fill="#e8edf2" fontSize="9" fontFamily="monospace">Product</text>
      <rect x="445" y="72" width="80" height="28" rx="3" fill="#161b22" stroke="#8b949e" strokeOpacity="0.3" strokeWidth="1" />
      <text x="485" y="90" textAnchor="middle" fill="#e8edf2" fontSize="9" fontFamily="monospace">Stock</text>

      <text x="440" y="130" textAnchor="middle" fill="#8b949e" fontSize="8" fontFamily="monospace">{langALabel}</text>
      <text x="440" y="143" textAnchor="middle" fill="#8b949e" fontSize="8" fontFamily="monospace">{langBItems}</text>

      <line x1="20" y1="190" x2="60" y2="190" stroke="#00e5ff" strokeWidth="1.5" strokeDasharray="6 4" strokeOpacity="0.5" />
      <text x="66" y="194" fill="#8b949e" fontSize="8" fontFamily="monospace">{legendBCLabel}</text>
      <rect x="200" y="183" width="14" height="14" rx="2" fill="#00e5ff" fillOpacity="0.08" stroke="#00e5ff" strokeOpacity="0.4" strokeWidth="1" />
      <text x="220" y="194" fill="#8b949e" fontSize="8" fontFamily="monospace">{legendACLLabel}</text>
    </svg>
  );
}
