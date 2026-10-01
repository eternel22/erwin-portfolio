import type { ComponentType } from "react";
import type { ProjectEntry } from "@/types/content";
import { BmwCaseStudy } from "./bmw/BmwCaseStudy";

// Projects with a bespoke page; every other slug uses the generic template.
export const caseStudies: Record<string, ComponentType<{ project: ProjectEntry }>> = {
  "bmw-genai-evaluation-pipeline": BmwCaseStudy,
};
