const VARIANTS = {
  default: "border-border text-muted-foreground",
  primary: "border-primary/50 text-primary",
};

export default function Tag({ children, variant = "default", className = "" }) {
  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-wider border px-1.5 py-0.5 ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
