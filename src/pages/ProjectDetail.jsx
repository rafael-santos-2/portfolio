import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Terminal } from "lucide-react";
import { projects } from "@/data/projects";
import SystemBar from "@/components/portfolio/SystemBar";
import CodeBlock from "@/components/portfolio/CodeBlock";
import Tag from "@/components/portfolio/shared/Tag";

const navItems = [
  { id: "overview", label: "Overview", num: "01" },
  { id: "problem", label: "Problem", num: "02" },
  { id: "architecture", label: "System Architecture", num: "03" },
  { id: "implementation", label: "Frontend Implementation", num: "04" },
];

const CODE_SECTIONS = new Set(["architecture", "implementation"]);

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <>
        <SystemBar />
        <main className="min-h-screen flex flex-col items-center justify-center gap-4 pt-28 text-center px-4">
          <p className="font-mono text-2xl text-stark">404 // MODULE_NOT_FOUND</p>
          <Link
            to="/"
            className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Terug naar alle projecten
          </Link>
        </main>
      </>
    );
  }

  const { name, tagline, category, metric, stack, endpoints, caseStudy } = project;

  return (
    <>
      <SystemBar />
      <main>
        <header className="border-b border-border pt-28 md:pt-36 pb-12 md:pb-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Terug naar alle projecten
            </Link>

            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
              [CASE STUDY] // {category}
            </p>
            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-stark tracking-[-0.04em] leading-[0.9]">
              {name}
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mt-6">{tagline}</p>

            <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs mt-8">
              <div>
                <span className="text-muted-foreground">METRIC </span>
                <span className="text-accent">{metric}</span>
              </div>
              <div>
                <span className="text-muted-foreground">STACK </span>
                <span className="text-foreground">{stack.join(" / ")}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-[25%_75%] gap-8 md:gap-16 py-12 md:py-20">
          <aside className="hidden md:block sticky top-28 self-start">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-4">
              // Execution Path
            </p>
            <nav className="space-y-3">
              {navItems.map(({ id: navId, label, num }) => (
                <a
                  key={navId}
                  href={`#${navId}`}
                  className="flex items-center gap-3 font-mono text-xs text-foreground hover:text-primary transition-colors"
                >
                  <span className="text-primary/40">{num}</span>
                  {label}
                </a>
              ))}
            </nav>

            <div className="border-t border-border mt-8 pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Terminal size={12} className="text-muted-foreground" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Logic Manifest
                </span>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                // Stack
              </p>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>

              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                // Endpoints
              </p>
              <ul className="space-y-1.5">
                {endpoints.map((endpoint) => (
                  <li key={endpoint} className="font-mono text-[10px] text-muted-foreground">
                    {endpoint}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="space-y-16">
            {navItems.map(({ id: navId, label, num }) => (
              <motion.section
                key={navId}
                id={navId}
                className="scroll-mt-28"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
                  [{num}] // {label}
                </p>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-stark tracking-tight mb-4">
                  {label}
                </h2>
                <p className="text-foreground leading-[1.7] max-w-2xl">
                  {caseStudy[navId]}
                </p>

                {CODE_SECTIONS.has(navId) && (
                  <div className="max-w-2xl mt-8">
                    <CodeBlock language={stack[0]} code={caseStudy.code} />
                  </div>
                )}
              </motion.section>
            ))}
          </div>
        </div>

        <footer className="border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[11px] text-muted-foreground">
            <Link to="/" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
              <ArrowLeft size={14} aria-hidden="true" />
              Terug naar alle projecten
            </Link>
            <span>
              CASE_{project.id} // STATUS: ARCHIVED
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
