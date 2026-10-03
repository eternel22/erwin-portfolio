import type { ProjectEntry } from "@/types/content";

export const projects: ProjectEntry[] = [
  {
    id: "bmw-genai-eval",
    published: true,
    slug: "bmw-genai-evaluation-pipeline",
    title: "Continual Prompt Optimization for Document Extraction",
    org: "MIT Sloan / BMW Group",
    period: "Spring 2026",
    summary:
      "A GEPA-style closed loop that extracts, evaluates, and rewrites its own prompts. Our team raised mean extraction score on BMW repair orders from 0.33 to 0.83 without retraining any model.",
    description:
      "BMW needed structured JSON extracted from scanned, multi-section repair-order PDFs. Our team of four at the MIT Sloan Generative AI Lab built a closed-loop pipeline in which an evaluator diagnoses each extraction, a reflection model rewrites the prompt, and a Pareto frontier keeps the best candidates. No model weights are updated.",
    problem:
      "Repair orders are scanned, split into multiple section types, and map to deeply nested JSON. Hand-tuning prompts doesn't scale, and retraining is impractical.",
    approach:
      "Two-tool vision extraction, a deterministic field-level scorer with an LLM diagnosis, and GEPA-style reflection, mutation, and Pareto selection. A text-first variant caches OCR so iterations are cheaper.",
    impact: [
      "Team pipeline raised mean extraction score from 0.328 to 0.826 across six BMW repair orders",
      "Pareto-frontier selection kept prompts that specialize on different documents instead of a single winner",
      "Showed that the evaluator sets the ceiling: section-aware alignment and normalization mattered as much as prompt edits",
    ],
    tech: ["Python", "Vision LLMs", "GEPA", "Pareto Optimization", "LLM-as-Judge"],
    featured: true,
  },
  {
    id: "ford-defect-detection",
    published: false,
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
    published: false,
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
    published: false,
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
    published: true,
    slug: "universal-watch-defect-detection",
    title: "Universal Defect Detection for Watch Components",
    period: "Spring 2025",
    summary:
      "An anomaly detector that learns what a good watch part looks like from a few dozen images, so a new component needs no defect labeling.",
    description:
      "A luxury watchmaking group needed a way to assess quality across a wide variety of watch components without building a separate model — or hiring separate labeling effort — for every single piece. I found that the supposedly clean training data contained hidden defects, and built a memory-bank anomaly detector that is robust to that noise and generalizes across component types.",
    problem:
      "Watch components are inspected by hand, and building a clean labeled dataset of OK and defective examples for every individual component type would be prohibitively slow to scale.",
    approach:
      "A PatchCore-style memory bank over pretrained backbone features, with SoftPatch-inspired outlier cleaning (Local Outlier Factor, multivariate Gaussian) to handle noisy training data. Served through a Dockerized FastAPI service on a GPU computer next to the acquisition machine.",
    impact: [
      "A useful detector for a new component from a few dozen images, with no defect labels",
      "Robust to hidden defects in the training set",
      "Presented a live demo to several brands within the group and delivered a production-ready service",
    ],
    tech: ["Python", "Computer Vision", "Anomaly Detection", "PatchCore", "DINOv2", "FastAPI", "Docker", "MLflow"],
    featured: true,
  },
  {
    id: "societe-generale-document-ai",
    published: false,
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
    published: true,
    slug: "ey-open-science-storm-damage-assessment",
    title: "Storm Damage Assessment from Satellite Imagery",
    org: "EY Open Science Data Challenge 2024",
    period: "2024",
    summary:
      "A Co-DETR model that finds damaged buildings in post-hurricane satellite images. 2nd runner-up out of 11,000 entrants, presented at IEEE IGARSS 2024.",
    description:
      "The EY Open Science Data Challenge 2024 tasked entrants with assessing storm damage from satellite imagery of Puerto Rico after Hurricane Maria. I built and annotated my own training set, fine-tuned a Co-DETR object detector on it, finished 2nd runner-up out of 11,000 participants, and later presented the work at IEEE IGARSS 2024.",
    problem:
      "Rapidly and accurately assessing storm damage over large areas from satellite imagery is critical for disaster response, but requires models that generalize well across varied terrain and damage types.",
    approach:
      "Selected the most relevant image patches with color and texture features and nearest neighbors, annotated them with a YOLO-assisted loop, then fine-tuned a COCO-pretrained Co-DETR to detect buildings and classify them as damaged or undamaged, residential or commercial.",
    impact: [
      "2nd runner-up out of 11,000 entrants",
      "Presented at IEEE IGARSS 2024",
      "Validation mAP of 0.50 across four building classes",
    ],
    tech: ["Python", "Computer Vision", "Object Detection", "Co-DETR", "YOLO", "Remote Sensing"],
    links: [{ label: "IGARSS 2024 paper", href: "https://doi.org/10.1109/IGARSS53475.2024.10642784" }],
    featured: true,
  },
];
