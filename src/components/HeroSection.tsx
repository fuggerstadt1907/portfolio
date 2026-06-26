"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

function TriangleGraphic({ labels }: { labels: [string, string, string] }) {
  // Triangle vertices (centered in 380x240 viewBox, extra horizontal padding for labels)
  const cx = 190;
  const top = { x: cx, y: 24 };
  const left = { x: 52, y: 200 };
  const right = { x: 328, y: 200 };
  const center = {
    x: (top.x + left.x + right.x) / 3,
    y: (top.y + left.y + right.y) / 3,
  };

  const nodes = [
    { ...top, label: labels[0] },
    { ...left, label: labels[1] },
    { ...right, label: labels[2] },
  ];

  return (
    <svg
      viewBox="0 0 380 240"
      width="380"
      height="240"
      aria-hidden="true"
      className="opacity-80"
    >
      <defs>
        <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* subtle glow fill */}
      <polygon
        points={`${top.x},${top.y} ${left.x},${left.y} ${right.x},${right.y}`}
        fill="url(#glowGrad)"
      />

      {/* edges */}
      {[
        [top, left],
        [left, right],
        [right, top],
      ].map(([a, b], i) => (
        <line
          key={i}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke="#22d3ee"
          strokeWidth="1"
          strokeOpacity="0.35"
          strokeDasharray="4 4"
        />
      ))}

      {/* center lines */}
      {nodes.map((n, i) => (
        <line
          key={`cl-${i}`}
          x1={center.x}
          y1={center.y}
          x2={n.x}
          y2={n.y}
          stroke="#22d3ee"
          strokeWidth="0.75"
          strokeOpacity="0.2"
        />
      ))}

      {/* traveling dot clockwise: top → right → left → top */}
      {[
        { r: 12, opacity: 0.08 },
        { r: 7,  opacity: 0.18 },
        { r: 4,  opacity: 0.45 },
        { r: 2,  opacity: 1.0  },
      ].map(({ r, opacity }, i) => (
        <circle key={`td-${i}`} r={r} fill="#22d3ee" opacity={opacity}>
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path={`M ${top.x},${top.y} L ${right.x},${right.y} L ${left.x},${left.y} Z`}
          />
        </circle>
      ))}

      {/* center dot */}
      <circle
        cx={center.x}
        cy={center.y}
        r="3.5"
        fill="#22d3ee"
        opacity="0.5"
        filter="url(#glow)"
      >
        <animate
          attributeName="opacity"
          values="0.5;0.9;0.5"
          dur="2.8s"
          repeatCount="indefinite"
        />
      </circle>

      {/* nodes + labels */}
      {nodes.map((n, i) => (
        <g key={`n-${i}`}>
          <circle cx={n.x} cy={n.y} r="5" fill="#22d3ee" opacity="0.15" />
          <circle
            cx={n.x}
            cy={n.y}
            r="3"
            fill="#22d3ee"
            opacity="0.7"
            filter="url(#glow)"
          />
          <text
            x={n.x}
            y={n.y + (n.y < 100 ? -14 : 18)}
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill="#22d3ee"
            opacity="0.75"
            letterSpacing="0.08em"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function HeroSection() {
  const t = useTranslations("hero");
  const title = t("title");
  const [displayed, setDisplayed] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(title.slice(0, i + 1));
      i++;
      if (i >= title.length) clearInterval(interval);
    }, 38);
    return () => clearInterval(interval);
  }, [title]);

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  function item(delay: number) {
    return {
      hidden: { opacity: 0, y: 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.6, ease: "easeOut" as const },
      },
    };
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="text-center max-w-3xl">
        <motion.p
          variants={item(0)}
          initial="hidden"
          animate="visible"
          className="font-mono text-accent text-xs tracking-widest uppercase mb-6 inline-block border border-border px-4 py-1.5 rounded-full bg-accent-muted"
        >
          {t("badge")}
        </motion.p>

        <motion.h1
          variants={item(0.12)}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-6xl font-bold text-foreground mb-4 glow-accent"
        >
          {t("greeting")}
        </motion.h1>

        <motion.h2
          variants={item(0.24)}
          initial="hidden"
          animate="visible"
          className="text-2xl md:text-3xl font-mono text-accent min-h-10 mb-6"
        >
          {displayed}
          <span
            className={`${cursorVisible ? "opacity-100" : "opacity-0"} transition-opacity`}
          >
            _
          </span>
        </motion.h2>

        <motion.div
          variants={item(0.36)}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-10"
        >
          <TriangleGraphic
            labels={[
              t("triangle_product"),
              t("triangle_architecture"),
              t("triangle_engineering"),
            ]}
          />
        </motion.div>

        <motion.div
          variants={item(0.48)}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#skills"
            className="px-6 py-3 rounded bg-accent text-background font-semibold text-sm hover:opacity-90 transition-opacity glow-box-accent"
          >
            {t("cta_primary")}
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded border border-accent/60 text-foreground text-sm hover:bg-accent-muted hover:border-accent transition-colors"
          >
            {t("cta_secondary")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
