import { techStack } from "@/data/projects";
import SectionHeading from "./shared/SectionHeading";
import Reveal from "./shared/Reveal";

export default function TechStack() {
  return (
    <section id="stack" className="border-t border-border py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading
          index="03"
          label="Technische Laag"
          title="De"
          accent="stack"
          accentColor="accent"
          suffix="die ik beheers."
        />

        <div className="mt-16 grid md:grid-cols-4 border border-border">
          {techStack.map(({ group, items }, idx) => (
            <Reveal
              key={group}
              delay={idx * 0.1}
              y={20}
              className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-border last:border-b-0 last:border-r-0"
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-4">
                // {group}
              </p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-sm text-foreground flex items-center gap-2 transition-all duration-200 hover:text-primary hover:translate-x-1"
                  >
                    <span className="text-primary/40">▹</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
