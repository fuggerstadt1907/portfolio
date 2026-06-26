"use client";
import { useLocale } from "next-intl";

export default function ApiMatrixDiagram() {
  const locale = useLocale();
  const de = locale === "de";

  const rows = de
    ? [
        { criterion: "Ressourcenbasierte Domäne", rest: true, graphql: false },
        { criterion: "CRUD-lastige Use Cases", rest: true, graphql: false },
        { criterion: "Drittanbieter-Clients", rest: true, graphql: false },
        { criterion: "HTTP-Caching wichtig", rest: true, graphql: false },
        {
          criterion: "Stark unterschiedliche Clients",
          rest: false,
          graphql: true,
        },
        {
          criterion: "Over-/Underfetching-Problem",
          rest: false,
          graphql: true,
        },
        { criterion: "Komplexe Datenaggregation", rest: false, graphql: true },
        { criterion: "Frontend iteriert schnell", rest: false, graphql: true },
      ]
    : [
        { criterion: "Resource-based domain", rest: true, graphql: false },
        { criterion: "CRUD-heavy use cases", rest: true, graphql: false },
        { criterion: "Third-party clients", rest: true, graphql: false },
        { criterion: "HTTP caching matters", rest: true, graphql: false },
        { criterion: "Very different clients", rest: false, graphql: true },
        {
          criterion: "Over-/Underfetching problem",
          rest: false,
          graphql: true,
        },
        { criterion: "Complex data aggregation", rest: false, graphql: true },
        { criterion: "Frontend iterates fast", rest: false, graphql: true },
      ];

  const criterionLabel = de ? "Kriterium" : "Criterion";
  const bottomNote = de
    ? "↑ CRUD-Domänen  |  BFF (Backend-for-Frontend) ↓"
    : "↑ CRUD domains  |  BFF (Backend-for-Frontend) ↓";

  return (
    <svg
      viewBox="0 0 560 260"
      className="w-full"
      aria-label="REST vs GraphQL Matrix"
    >
      <rect x="10" y="10" width="340" height="26" rx="3" fill="#161b22" />
      <rect
        x="360"
        y="10"
        width="90"
        height="26"
        rx="3"
        fill="#00e5ff"
        fillOpacity="0.15"
        stroke="#00e5ff"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <rect
        x="460"
        y="10"
        width="90"
        height="26"
        rx="3"
        fill="#161b22"
        stroke="#00e5ff"
        strokeOpacity="0.2"
        strokeWidth="1"
      />

      <text
        x="180"
        y="27"
        textAnchor="middle"
        fill="#8b949e"
        fontSize="9"
        fontFamily="monospace"
      >
        {criterionLabel}
      </text>
      <text
        x="405"
        y="27"
        textAnchor="middle"
        fill="#00e5ff"
        fontSize="10"
        fontWeight="700"
        fontFamily="monospace"
      >
        REST
      </text>
      <text
        x="505"
        y="27"
        textAnchor="middle"
        fill="#e8edf2"
        fontSize="10"
        fontWeight="700"
        fontFamily="monospace"
      >
        GraphQL
      </text>

      {rows.map((row, i) => {
        const gap = i >= 4 ? 20 : 0;
        const y = 42 + i * 24 + gap;
        const bg = i % 2 === 0 ? "rgba(22,27,34,0.5)" : "transparent";
        return (
          <g key={row.criterion}>
            <rect x="10" y={y} width="340" height="22" rx="2" fill={bg} />
            <rect x="360" y={y} width="90" height="22" rx="2" fill={bg} />
            <rect x="460" y={y} width="90" height="22" rx="2" fill={bg} />
            <text
              x="20"
              y={y + 14}
              fill="#e8edf2"
              fontSize="9"
              fontFamily="monospace"
              opacity="0.85"
            >
              {row.criterion}
            </text>
            {row.rest && (
              <text
                x="405"
                y={y + 15}
                textAnchor="middle"
                fill="#00e5ff"
                fontSize="13"
                fontFamily="monospace"
              >
                ✓
              </text>
            )}
            {row.graphql && (
              <text
                x="505"
                y={y + 15}
                textAnchor="middle"
                fill="#00e5ff"
                fontSize="13"
                fontFamily="monospace"
              >
                ✓
              </text>
            )}
          </g>
        );
      })}

      <line
        x1="10"
        y1="148"
        x2="550"
        y2="148"
        stroke="#00e5ff"
        strokeOpacity="0.15"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <rect x="148" y="139" width="264" height="14" rx="2" fill="#0d1117" />
      <text
        x="280"
        y="149"
        textAnchor="middle"
        fill="#8b949e"
        fontSize="7"
        fontFamily="monospace"
        opacity="0.6"
      >
        {bottomNote}
      </text>
    </svg>
  );
}
