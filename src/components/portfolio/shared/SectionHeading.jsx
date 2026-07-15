const ACCENT_COLOR = {
  primary: "text-primary",
  accent: "text-accent",
};

export default function SectionHeading({
  index,
  label,
  title,
  accent,
  accentColor = "primary",
  suffix,
  meta,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <p className="font-mono text-xs tracking-[0.3em] text-primary uppercase mb-4">
          [{index}] // {label}
        </p>
        <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight leading-[0.95] text-stark">
          {title} <span className={ACCENT_COLOR[accentColor]}>{accent}</span>{" "}
          {suffix}
        </h2>
      </div>
      {meta && (
        <div className="hidden md:flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground shrink-0">
          {meta}
        </div>
      )}
    </div>
  );
}
