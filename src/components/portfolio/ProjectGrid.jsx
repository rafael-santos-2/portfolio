import { projects } from "@/data/projects";
import SectionHeading from "./shared/SectionHeading";
import StatusDot from "./shared/StatusDot";
import Reveal from "./shared/Reveal";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid() {
  return (
    <section id="work" className="border-t border-border py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading
          index="02"
          label="Module Registry"
          title="Geselecteerde"
          accent="systemen."
          meta={
            <>
              <span>{projects.length} MODULES</span>
              <span className="flex items-center gap-1.5">
                <StatusDot color="primary" /> ACTIVE
              </span>
            </>
          }
        />

        <div className="mt-16 space-y-px bg-border">
          {projects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
