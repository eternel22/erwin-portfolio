import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectEntry } from "@/types/content";
import { Tag } from "@/components/ui/Tag";

export function ProjectCard({ project }: { project: ProjectEntry }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40 hover:bg-white"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-foreground">{project.title}</h3>
        <ArrowUpRight
          className="mt-1 h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent"
          aria-hidden
        />
      </div>
      {project.org && <p className="mt-1 text-sm text-muted">{project.org}</p>}
      <p className="mt-3 text-sm leading-relaxed text-foreground/90">
        {project.summary}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.slice(0, 3).map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
    </Link>
  );
}
