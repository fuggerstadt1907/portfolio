interface SkillCardProps {
  title: string;
  description: string;
  className?: string;
}

export default function SkillCard({ title, description, className = "" }: SkillCardProps) {
  return (
    <div
      className={`group relative rounded-xl border border-border bg-surface p-6 flex flex-col gap-3 overflow-hidden transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_24px_rgba(0,229,255,0.12)] ${className}`}
    >
      {/* Corner accents */}
      <span className="pointer-events-none absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--accent)] opacity-40 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-xl" />
      <span className="pointer-events-none absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--accent)] opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-br-xl" />

      {/* Glow sweep on hover */}
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,229,255,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <h3 className="relative text-foreground font-semibold text-base leading-snug tracking-wide">
        {title}
      </h3>
      <p className="relative text-muted text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
