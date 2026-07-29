import type { EducationEntry } from "@/types/content";

export const education: EducationEntry[] = [
  {
    id: "mit",
    institution: "Massachusetts Institute of Technology",
    location: "Cambridge, MA",
    degree: "Candidate for Master of Business Analytics, Operations Research Center — GPA: 5.0/5.0",
    dateRange: "2025 – August 2026",
    bullets: [
      "Selected coursework: Machine Learning, Optimization, Advanced Analytics Edge, Hands-on Deep Learning, GenAI Lab, Power and Negotiation, Communication through Data",
    ],
  },
  {
    id: "centralesupelec",
    institution: "CentraleSupélec, Université Paris-Saclay",
    location: "Paris, France",
    degree: "Bachelor and Master of Engineering — GPA: 4.0/4.0",
    dateRange: "2022 – 2024",
    bullets: [
      "Coursework: Advanced Statistics, Partial Differential Equations, Software Engineering, Economics, Climate Sciences",
      "Teaching Assistant: Led algorithmics tutorials (graphs, dynamic programming, etc.) for 30 first-year undergraduate students",
      "Leadership: Awarded the CentraleSupélec scholarship for involvement in Student Life and Associations",
      "Community involvement: Raised $15,000 and organized a 5-week mission in Nepal supporting children's education",
    ],
  },
];
