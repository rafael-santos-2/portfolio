import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import styles from "./Hero.module.css";

const HEADLINE_LINES = [
  { text: "ENGINEERING", className: "text-stark" },
  { text: "LOGIC.", className: `text-primary ${styles.glow}` },
  { text: "MANIFESTING", className: "text-stark" },
  { text: "EXPERIENCE.", className: "text-accent" },
];

const META = [
  { key: "ROLE", value: "Fullstack Engineer" },
  { key: "LOC", value: "Gent, BE" },
  { key: "EXP", value: "3+ jaar in productie" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 opacity-25 ${styles.circuitBg}`}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 w-full">
        <p className="font-mono text-xs tracking-[0.3em] text-primary uppercase mb-6">
          [01] // FULLSTACK ENGINEER
        </p>

        <h1 className="font-display font-bold text-[12vw] md:text-[8vw] leading-[0.9] tracking-[-0.04em]">
          {HEADLINE_LINES.map((line, idx) => (
            <motion.span
              key={line.text}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.15, ease: "easeOut" }}
              className={`block ${line.className}`}
            >
              {line.text}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85, ease: "easeOut" }}
          className="grid md:grid-cols-2 gap-8 mt-12 max-w-4xl"
        >
          <p className="text-lg leading-relaxed text-foreground">
            Ik bouw schaalbare systemen van database tot pixel. Een
            fullstack developer die complexe backend-logica vertaalt naar
            soepele, betekenisvolle interfaces.
          </p>

          <dl className="font-mono text-sm space-y-2">
            {META.map(({ key, value }) => (
              <div key={key} className="flex gap-3">
                <dt className="text-muted-foreground w-14 shrink-0">{key}</dt>
                <dd className="text-foreground">{value}</dd>
              </div>
            ))}
            <div className="flex gap-3">
              <dt className="text-muted-foreground w-14 shrink-0">STATUS</dt>
              <dd className="text-accent flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-accent inline-block" />
                Available for hire
              </dd>
            </div>
          </dl>
        </motion.div>

        <motion.a
          href="#work"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mt-16"
        >
          <ArrowDown size={14} className={styles.bounce} aria-hidden="true" />
          Scroll om te verbinden
        </motion.a>
      </div>
    </section>
  );
}
