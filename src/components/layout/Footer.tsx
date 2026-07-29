import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";
import type { SocialLink } from "@/types/content";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

const icons: Record<SocialLink["icon"], React.ComponentType<{ className?: string }>> = {
  mail: Mail,
  linkedin: LinkedinIcon,
  github: GithubIcon,
};

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col items-center gap-4 py-10 text-sm text-muted sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex items-center gap-4">
          {site.socials.map((social) => {
            const Icon = icons[social.icon];
            return (
              <a
                key={social.label}
                href={social.href}
                target={social.icon === "mail" ? undefined : "_blank"}
                rel={social.icon === "mail" ? undefined : "noopener noreferrer"}
                aria-label={social.label}
                className="transition-colors hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </Container>
    </footer>
  );
}
