import StatusDot from "./shared/StatusDot";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[11px] text-muted-foreground">
        <p>© 2026 — DEV//PORTFOLIO. Alle systemen operationeel.</p>
        <div className="flex items-center gap-2">
          <StatusDot color="accent" />
          Built with precision in Gent
        </div>
      </div>
    </footer>
  );
}
