import type { SkillGroup } from "@/types/content";

export const skills: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    skills: ["Python", "R", "SQL", "Julia", "Java", "C++"],
  },
  {
    id: "ml-data",
    label: "ML & Data",
    skills: [
      "PyTorch",
      "Keras",
      "Hugging Face",
      "MLflow",
      "Pandas",
      "Scikit-learn",
      "NumPy",
      "Matplotlib",
      "Streamlit",
    ],
  },
  {
    id: "tools-web",
    label: "Tools & Web",
    skills: ["Git", "FastAPI", "HTML/CSS/PHP"],
  },
];
