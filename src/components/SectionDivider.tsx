export default function SectionDivider() {
  return (
    <div className="relative flex items-center gap-3 px-8 py-6 select-none">
      {/* left label */}
      <span className="font-mono text-xs text-accent opacity-40 whitespace-nowrap tracking-widest uppercase">
        sys.layer
      </span>

      {/* line with nodes */}
      <div className="relative flex-1 flex items-center">
        {/* base line */}
        <div className="absolute inset-y-1/2 w-full h-px bg-border" />

        {/* nodes */}
        <div className="relative flex w-full justify-between items-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="block rounded-full"
              style={{
                width: i === 2 ? 5 : 3,
                height: i === 2 ? 5 : 3,
                background: i === 2 ? "var(--accent)" : "rgba(0,229,255,0.35)",
                boxShadow: i === 2 ? "0 0 6px rgba(0,229,255,0.7)" : undefined,
              }}
            />
          ))}
        </div>
      </div>

      {/* right label */}
      <span className="font-mono text-xs text-muted opacity-40 whitespace-nowrap tracking-widest">
        arch/v1
      </span>
    </div>
  );
}
