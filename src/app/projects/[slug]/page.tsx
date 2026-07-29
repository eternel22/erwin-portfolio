import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

async function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Erwin Deng`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const backLink = (
    <Link
      href="/#projects"
      className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      Back to projects
    </Link>
  );

  if (!project.published) {
    return (
      <article>
        <Container className="py-16 sm:py-20">
          {backLink}
          {project.org && (
            <p className="mb-2 text-sm font-medium tracking-wide text-accent uppercase">
              {project.org}
            </p>
          )}
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 text-sm text-muted">{project.period}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            This case study is a work in progress — check back soon for the full write-up.
          </p>
        </Container>
      </article>
    );
  }

  return (
    <article>
      <div className="border-b border-border">
        <Container className="py-16 sm:py-20">
          {backLink}
          {project.org && (
            <p className="mb-2 text-sm font-medium tracking-wide text-accent uppercase">
              {project.org}
            </p>
          )}
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 text-sm text-muted">{project.period}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/90">
            {project.description}
          </p>
        </Container>
      </div>

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          {project.problem && (
            <section>
              <h2 className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
                Problem
              </h2>
              <p className="leading-relaxed text-foreground/90">{project.problem}</p>
            </section>
          )}
          {project.approach && (
            <section>
              <h2 className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
                Approach
              </h2>
              <p className="leading-relaxed text-foreground/90">{project.approach}</p>
            </section>
          )}
          <section>
            <h2 className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
              Impact
            </h2>
            <ul className="list-disc space-y-2 pl-4 leading-relaxed text-foreground/90">
              {project.impact.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-8">
          <div>
            <h2 className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
              Tech
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </div>
          {project.links && project.links.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
                Links
              </h2>
              <ul className="space-y-2">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </Container>
    </article>
  );
}
