import type { SiteInfo } from "@/types/content";

export const site: SiteInfo = {
  name: "Erwin Deng",
  tagline: "Aspiring AI / ML Engineer",
  pitch:
    "Graduate student at MIT, focused on applying machine learning and operations research to real-world decisions, from manufacturing defect detection to wildfire resource deployment.",
  about: [
    "I'm a graduate student at the MIT Master of Business Analytics, Operations Research Center, where I work on machine learning and analytics problems that sit close to real operational decisions: assembly lines, wildfire crews, construction schedules, and financial documents.",
    "Before MIT, I studied engineering at CentraleSupélec in France, and worked as a data scientist intern across manufacturing, luxury goods, and investment banking.",
  ],
  location: "Cambridge, MA",
  photoHref: "/profile.jpeg",
  resumeHref: "/resume.pdf",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/erwin-deng/", icon: "linkedin" },
  ],
};
