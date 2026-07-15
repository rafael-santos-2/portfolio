import { Link } from "react-router-dom";
import { ArrowUpRight, Terminal } from "lucide-react";
import Tag from "./shared/Tag";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }) {
  const { id, name, tagline, category, description, stack, endpoints, metric } =
    project;

  return (
    <Link
      to={`/project/${id}`}
      className={`group relative block border border-border bg-card overflow-hidden ${styles.scanCard}`}
    >
      <div className="grid md:grid-cols-[70%_30%]">
        <div className="md:border-r border-border p-6 md:p-10 min-h-[280px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">[{id}]</span>
            <Tag variant="primary">{category}</Tag>
          </div>

          <div className="my-6">
            <h3 className="font-display font-bold text-3xl md:text-4xl text-stark tracking-tight">
              {name}
            </h3>
            <p className="text-foreground text-sm mt-2">{tagline}</p>
            <p className="text-foreground leading-relaxed max-w-lg mt-4">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-accent">{metric}</span>
            <span className="font-mono text-sm text-muted-foreground group-hover:text-primary transition-colors inline-flex items-center gap-1">
              View case
              <ArrowUpRight size={14} aria-hidden="true" />
            </span>
          </div>
        </div>

        <div className="bg-secondary/40 p-5">
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
              <li
                key={endpoint}
                className={`font-mono text-[10px] text-muted-foreground ${styles.endpoint}`}
              >
                {endpoint}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
