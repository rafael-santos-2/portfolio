import { useClock } from "@/hooks/useClock";
import { LOGO_URL } from "@/data/brand";
import StatusDot from "./shared/StatusDot";
import ThemeToggle from "./ThemeToggle";
import styles from "./SystemBar.module.css";

const TICKER_ITEMS = [
  "SYSTEM://ONLINE",
  "STACK: REACT / NODE / POSTGRES",
  "STATUS: AVAILABLE FOR HIRE",
  "BUILD: v4.2.0",
  "LATENCY: 12ms",
  "UPTIME: 99.99%",
];

const TICKER_LOOP = [...TICKER_ITEMS, ...TICKER_ITEMS];

export default function SystemBar() {
  const time = useClock();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-9 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        <div className="flex items-center gap-3">
          <img
            src={LOGO_URL}
            alt="RS monogram"
            className="w-6 h-6 object-contain [.light_&]:brightness-0"
          />
          <span className="text-stark font-display font-bold tracking-tight normal-case">
            RS//DEV
          </span>
          <span className="text-muted-foreground/40">|</span>
          <div className="flex items-center gap-2">
            <StatusDot color="accent" />
            <span>SYS::OK</span>
          </div>
        </div>
        <div className="hidden md:block">{time}</div>
        <div className="flex items-center gap-4">
          <span className="hidden md:block">UTC+2 · GENT</span>
          <ThemeToggle />
        </div>
      </div>
      <div className="border-t border-border overflow-hidden h-7 flex items-center">
        <div className={`flex whitespace-nowrap ${styles.tickerTrack}`}>
          {TICKER_LOOP.map((item, idx) => (
            <span
              key={idx}
              className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70 px-6"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
