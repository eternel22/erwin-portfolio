export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
}

export interface SiteInfo {
  name: string;
  tagline: string;
  pitch: string;
  about: string[];
  location: string;
  photoHref?: string;
  resumeHref: string;
  socials: SocialLink[];
}

export interface ExperienceEntry {
  id: string;
  org: string;
  role: string;
  location: string;
  dateRange: string;
  bullets: string[];
  tags?: string[];
}

export interface ProjectEntry {
  id: string;
  slug: string;
  title: string;
  org?: string;
  period: string;
  summary: string;
  description: string;
  problem?: string;
  approach?: string;
  impact: string[];
  tech: string[];
  links?: { label: string; href: string }[];
  featured?: boolean;
  published: boolean;
}

export interface EducationEntry {
  id: string;
  institution: string;
  location: string;
  degree: string;
  dateRange: string;
  bullets: string[];
}

export interface SkillGroup {
  id: string;
  label: string;
  skills: string[];
}

export interface AwardEntry {
  id: string;
  title: string;
  year?: string;
}
