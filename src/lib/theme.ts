export const colors = {
  accent: "#00e5ff",
  accentMuted: "rgba(0, 229, 255, 0.15)",
  accentGlow: "rgba(0, 229, 255, 0.2)",
  accentGlowFaint: "rgba(0, 229, 255, 0.07)",
  surface: "#0d1117",
  background: "#080c10",
} as const;

export const gradients = {
  accentRadial: `radial-gradient(ellipse at 0% 50%, rgba(0,229,255,0.07) 0%, transparent 70%), var(--surface)`,
  accentCta: "0 0 20px rgba(0,229,255,0.2)",
} as const;
