import type { ExperienceEntry } from "@/types/content";

export const experience: ExperienceEntry[] = [
  {
    id: "ford",
    org: "MIT Sloan / Ford Motor Company",
    role: "Data Scientist Intern, MIT Capstone Project",
    location: "Cambridge, MA",
    dateRange: "2026 – Present",
    bullets: [
      "Developing AI models for early defect detection in car assembly lines using images (Python)",
    ],
    tags: ["Python", "Computer Vision"],
  },
  {
    id: "bmw",
    org: "MIT Sloan / BMW Group",
    role: "Generative AI Lab Team Member",
    location: "Cambridge, MA",
    dateRange: "Spring 2026",
    bullets: [
      "Built a closed-loop LLM evaluation and prompt optimization pipeline for repair-order document extraction",
      "Developed deterministic and LLM-as-judge evaluation framework in Python to assess structured JSON extraction quality",
      "Improved extraction performance by 50% over five iterations using LLM reflection and Pareto-based prompt evolution",
    ],
    tags: ["Python", "LLM Evaluation", "Prompt Optimization"],
  },
  {
    id: "mit-orc",
    org: "MIT Operations Research Center",
    role: "Graduate Research Assistant for Professor Jacquillat",
    location: "Cambridge, MA",
    dateRange: "2025 – 2026",
    bullets: [
      "Developed a double ML model to quantify crew effects on wildfires and guide resource deployment decisions (Python)",
      "Expanded a wildfire crew dataset by integrating satellite embeddings and weather data",
    ],
    tags: ["Python", "Causal Inference", "Geospatial Data"],
  },
  {
    id: "suffolk",
    org: "MIT Sloan / Suffolk Construction",
    role: "Analytics Lab Team Member",
    location: "Cambridge, MA",
    dateRange: "Fall 2025",
    bullets: [
      "Developed ML models to predict delays on 200+ construction projects, identifying future losses of $10M+ (Python, SQL)",
    ],
    tags: ["Python", "SQL", "Predictive Modeling"],
  },
  {
    id: "richemont",
    org: "Richemont",
    role: "Data Scientist Intern, Research & Innovation",
    location: "Buttes, Switzerland",
    dateRange: "Spring 2025",
    bullets: [
      "Analyzed manually labeled datasets for watch components, identifying issues such as inconsistent labeling",
      "Developed universal defect detection model that works across any watch piece, enabling cost-free assessment (Python)",
      "Presented findings to multiple brands and delivered a production-ready solution (Python)",
    ],
    tags: ["Python", "Computer Vision"],
  },
  {
    id: "societe-generale",
    org: "Societe Generale",
    role: "Data Scientist Intern, Investment Banking",
    location: "Paris, France",
    dateRange: "Fall 2024",
    bullets: [
      "Fine-tuned AI models on domain-specific data for document structure analysis, improving accuracy for investment banking",
      "Developed table parsing and reading order identification models to enhance document understanding (Python)",
    ],
    tags: ["Python", "Document AI"],
  },
];
