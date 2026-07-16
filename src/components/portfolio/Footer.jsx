import { Link } from "react-router-dom";
import { LOGO_URL } from "@/data/brand";
import StatusDot from "./shared/StatusDot";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[11px] text-muted-foreground">
        <div className="flex items-center gap-3">
          <Link to="/" aria-label="Terug naar home">
            <img
              src={LOGO_URL}
              alt="RS monogram"
              className="w-7 h-7 object-contain [.light_&]:brightness-0"
            />
          </Link>
          <span>© 2026 — DEV//PORTFOLIO. Alle systemen operationeel.</span>
        </div>
        <div className="flex items-center gap-2">
          <StatusDot color="accent" />
          Built with precision in Gent
        </div>
      </div>
    </footer>
  );
}
