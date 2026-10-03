import type { ComponentType } from "react";
import type { ProjectEntry } from "@/types/content";
import { BmwCaseStudy } from "./bmw/BmwCaseStudy";
import { EyCaseStudy } from "./ey/EyCaseStudy";
import { RichemontCaseStudy } from "./richemont/RichemontCaseStudy";

// Projects with a bespoke page; every other slug uses the generic template.
export const caseStudies: Record<string, ComponentType<{ project: ProjectEntry }>> = {
  "bmw-genai-evaluation-pipeline": BmwCaseStudy,
  "universal-watch-defect-detection": RichemontCaseStudy,
  "ey-open-science-storm-damage-assessment": EyCaseStudy,
};
