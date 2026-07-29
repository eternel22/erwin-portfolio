import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="border-b border-border">
      <Container className="flex flex-col-reverse items-start gap-10 py-24 sm:py-32 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-6">
          <p className="text-sm font-medium tracking-wide text-accent uppercase">
            {site.location}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {site.name}
          </h1>
          <p className="text-xl text-muted">{site.tagline}</p>
          <p className="max-w-2xl leading-relaxed text-foreground/90">
            {site.pitch}
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link
              href="/#projects"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              View Projects
            </Link>
            <a
              href={site.resumeHref}
              download
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              Download Resume
            </a>
          </div>
        </div>
        {site.photoHref && (
          <Image
            src={site.photoHref}
            alt={site.name}
            width={176}
            height={176}
            priority
            className="h-32 w-32 shrink-0 rounded-full object-cover sm:h-44 sm:w-44"
          />
        )}
      </Container>
    </section>
  );
}
