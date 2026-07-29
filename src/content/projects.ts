import type { ProjectEntry } from "@/types/content";

export const projects: ProjectEntry[] = [
  {
    id: "bmw-genai-eval",
    slug: "bmw-genai-evaluation-pipeline",
    title: "Closed-Loop LLM Evaluation & Prompt Optimization",
    org: "MIT Sloan / BMW Group",
    period: "Spring 2026",
    summary:
      "A closed-loop evaluation and prompt optimization pipeline that improved LLM extraction quality by 50% over five iterations.",
    description:
      "BMW's repair-order documents need to be converted into structured JSON before downstream systems can use them, but LLM extraction quality is hard to trust without a rigorous way to measure it. As part of the MIT Sloan Generative AI Lab, I built a closed-loop system that evaluates extraction quality and automatically evolves the prompts producing it.",
    problem:
      "Repair-order document extraction into structured JSON needed a way to measure quality that didn't rely on slow, inconsistent manual review, and a way to improve prompts systematically rather than by trial and error.",
    approach:
      "Developed a deterministic and LLM-as-judge evaluation framework in Python to score structured JSON extraction quality, then closed the loop by feeding evaluation results back into the prompts using LLM reflection and Pareto-based prompt evolution across successive iterations.",
    impact: [
      "Improved extraction performance by 50% over five iterations",
      "Replaced ad hoc prompt tweaking with a repeatable, measurable optimization loop",
    ],
    tech: ["Python", "LLM-as-Judge", "Prompt Engineering", "Pareto Optimization"],
    featured: true,
  },
  {
    id: "ford-defect-detection",
    slug: "ford-assembly-line-defect-detection",
    title: "Early Defect Detection on Car Assembly Lines",
    org: "MIT Sloan / Ford Motor Company",
    period: "2026 – Present",
    summary:
      "Computer vision models that catch assembly-line defects earlier, using images captured during production.",
    description:
      "As part of my MIT Capstone Project with Ford Motor Company, I'm developing computer vision models that identify defects earlier in the car assembly process, using image data captured on the line.",
    problem:
      "Defects caught late in assembly are far costlier to fix than defects caught early — the earlier a defect is flagged, the cheaper and faster it is to correct.",
    approach:
      "Building AI models in Python that analyze assembly-line images to detect defects as early in the process as possible, working directly with Ford's manufacturing and data teams.",
    impact: ["Ongoing capstone project — results in progress"],
    tech: ["Python", "Computer Vision", "Deep Learning"],
    featured: true,
  },
  {
    id: "wildfire-crew-effects",
    slug: "wildfire-crew-deployment-double-ml",
    title: "Quantifying Wildfire Crew Effects with Double ML",
    org: "MIT Operations Research Center — Research Assistant for Professor Jacquillat",
    period: "2025 – 2026",
    summary:
      "A double machine learning model that quantifies how firefighting crews affect wildfire outcomes, to guide resource deployment.",
    description:
      "Wildfire agencies must decide where to deploy limited firefighting crews, but isolating the causal effect of crew presence from confounding factors like weather and terrain is a hard statistical problem. Working with Professor Jacquillat at the MIT Operations Research Center, I developed a double ML approach to estimate this effect directly from operational data.",
    problem:
      "Deciding how to deploy firefighting crews requires knowing how much of a difference crew presence actually makes to fire outcomes — separate from confounding factors like weather, terrain, and fire behavior.",
    approach:
      "Developed a double machine learning model in Python to quantify crew effects on wildfire outcomes, and expanded the underlying wildfire crew dataset by integrating satellite embeddings and weather data to strengthen the analysis.",
    impact: [
      "Produced causal estimates of crew effects to guide resource deployment decisions",
      "Enriched the research dataset with satellite embeddings and weather data",
    ],
    tech: ["Python", "Double Machine Learning", "Causal Inference", "Geospatial Data"],
    featured: true,
  },
  {
    id: "suffolk-delay-prediction",
    slug: "suffolk-construction-delay-prediction",
    title: "Predicting Construction Project Delays",
    org: "MIT Sloan / Suffolk Construction",
    period: "Fall 2025",
    summary:
      "ML models predicting delays across 200+ construction projects, surfacing over $10M in future losses.",
    description:
      "Construction delays are expensive and hard to anticipate across a large, varied portfolio of projects. As part of the MIT Sloan Analytics Lab, I built machine learning models to predict which of Suffolk Construction's projects were at risk of delay.",
    problem:
      "With 200+ active construction projects, Suffolk Construction needed a data-driven way to flag which projects were likely to run late before the delays materialized and became costly.",
    approach:
      "Developed ML models in Python and SQL trained on project-level data to predict delay risk across the portfolio, surfacing at-risk projects for earlier intervention.",
    impact: [
      "Identified future losses of $10M+ across 200+ construction projects",
      "Gave Suffolk Construction an early-warning signal for at-risk projects",
    ],
    tech: ["Python", "SQL", "Predictive Modeling"],
    featured: true,
  },
  {
    id: "richemont-watch-defects",
    slug: "richemont-universal-watch-defect-detection",
    title: "Universal Defect Detection for Watch Components",
    org: "Richemont — Research & Innovation",
    period: "Spring 2025",
    summary:
      "A defect detection model that generalizes across watch components, enabling cost-free quality assessment.",
    description:
      "Richemont, the world's second-largest luxury group, needed a way to assess quality across a wide variety of watch components without building a separate model — or hiring separate labeling effort — for every single piece. I analyzed the existing labeled datasets, found labeling inconsistencies limiting model quality, and built a model that generalizes across component types.",
    problem:
      "Manually labeled datasets for watch components had inconsistent labeling, and building a bespoke defect model for every individual component type would be prohibitively expensive to scale.",
    approach:
      "Analyzed manually labeled watch component datasets to identify labeling issues, then developed a universal defect detection model in Python that works across any watch piece rather than requiring a model per component.",
    impact: [
      "Enabled cost-free defect assessment across watch component types",
      "Presented findings to multiple brands within the group and delivered a production-ready solution",
    ],
    tech: ["Python", "Computer Vision"],
    featured: true,
  },
  {
    id: "societe-generale-document-ai",
    slug: "societe-generale-document-structure-analysis",
    title: "Document Structure Analysis for Investment Banking",
    org: "Societe Generale — Investment Banking",
    period: "Fall 2024",
    summary:
      "Fine-tuned models for table parsing and reading order identification to improve document understanding.",
    description:
      "Investment banking workflows depend on accurately extracting structure from complex financial documents. I fine-tuned models on domain-specific data to improve document structure analysis, focusing on table parsing and reading order.",
    problem:
      "Generic document understanding models struggled with the specific structure and formatting conventions of investment banking documents, limiting extraction accuracy.",
    approach:
      "Fine-tuned AI models on domain-specific data for document structure analysis, and developed dedicated table parsing and reading order identification models in Python.",
    impact: ["Improved document structure analysis accuracy for investment banking use cases"],
    tech: ["Python", "Document AI", "Fine-Tuning"],
  },
  {
    id: "ey-storm-damage",
    slug: "ey-open-science-storm-damage-assessment",
    title: "Storm Damage Assessment from Satellite Imagery",
    org: "EY Open Science Data Challenge 2024",
    period: "2024",
    summary:
      "A fine-tuned computer vision model for storm damage assessment that placed 2nd runner-up out of 11,000 entrants and was presented at IEEE IGARSS 2024.",
    description:
      "The EY Open Science Data Challenge 2024 tasked entrants with assessing storm damage from satellite imagery. I fine-tuned a computer vision model for this task, finishing 2nd runner-up out of 11,000 participants, and later presented the work at IEEE IGARSS 2024.",
    problem:
      "Rapidly and accurately assessing storm damage over large areas from satellite imagery is critical for disaster response, but requires models that generalize well across varied terrain and damage types.",
    approach:
      "Fine-tuned a computer vision model in Python on satellite imagery for storm damage assessment as an independent entry to the global competition.",
    impact: [
      "2nd runner-up out of 11,000 entrants",
      "Presented at IEEE IGARSS 2024",
    ],
    tech: ["Python", "Computer Vision", "Remote Sensing"],
    featured: true,
  },
];
