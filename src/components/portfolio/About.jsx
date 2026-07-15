import Reveal from "./shared/Reveal";

const STATS = [
  { value: "3+", label: "Jaar in productie" },
  { value: "40+", label: "Projecten geleverd" },
  { value: "∞", label: "Koffie verwerkt" },
];

export default function About() {
  return (
    <section id="about" className="border-t border-border py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-[30%_70%] gap-8 md:gap-16">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] text-primary uppercase mb-4">
            [04] // Engineer
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-[0.95] text-stark">
            Wie er <span className="text-primary">bouwt.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-lg leading-[1.7] text-foreground">
            Ik ben een fullstack developer met een obsessie voor systemen die
            schaalbaar én menselijk voelen. Van het ontwerpen van
            data-modellen en API-contracten tot het finetunen van
            micro-interacties — ik vind het allemaal even fascinerend.
          </p>
          <p className="leading-[1.7] text-foreground mt-6">
            Mijn werk draait om het overbruggen van de kloof tussen
            technische complexiteit en intuïtieve ervaring. Ik geloof dat
            goede code niet alleen functioneel moet zijn, maar ook
            leesbaar, testbaar en onderhoudbaar.
          </p>

          <div className="grid grid-cols-3 border-t border-border mt-10 pt-8 gap-4">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="font-display font-bold text-3xl md:text-4xl text-stark">
                  {value}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
