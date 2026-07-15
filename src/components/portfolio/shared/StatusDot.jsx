const COLOR_MAP = {
  accent: "bg-accent",
  primary: "bg-primary",
};

export default function StatusDot({ color = "accent", className = "" }) {
  const dotColor = COLOR_MAP[color] ?? COLOR_MAP.accent;

  return (
    <span className={`relative flex h-2 w-2 ${className}`}>
      <span
        className={`animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full ${dotColor} opacity-75`}
      />
      <span className={`relative inline-flex h-2 w-2 ${dotColor}`} />
    </span>
  );
}
