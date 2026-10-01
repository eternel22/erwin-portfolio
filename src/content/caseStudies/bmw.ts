// Real numbers come from the team's final report (Table 1). Everything under
// `pareto` is an illustrative example: the report doesn't publish per-document
// scores for each candidate prompt.

export const bmwCaseStudy = {
  tagline: "MIT Sloan Generative AI Lab × BMW Group · Spring 2026 · team of four",
  tldr: "We taught an AI system to get better at reading BMW repair orders without retraining it. After each attempt, it studies its own mistakes and rewrites its instructions.",

  stats: [
    { value: "0.33 → 0.83", label: "Mean extraction score across 6 repair orders" },
    { value: "0", label: "Model weights changed. Only the prompt evolves" },
    { value: "1 → 5", label: "Prompts kept on the Pareto front, each best at something" },
  ],

  sections: [
    { id: "problem", label: "The problem" },
    { id: "loop", label: "The loop" },
    { id: "evaluator", label: "The evaluator" },
    { id: "pareto", label: "Pareto frontier" },
    { id: "results", label: "Results" },
    { id: "takeaways", label: "Takeaways" },
  ],

  problem: {
    caption:
      "Each dealership repair order is a multi-page PDF, often scanned, containing several copies of the order (ASI, BWO, CSI…). BMW needed it as clean, nested JSON for its downstream systems.",
    sectionCodes: ["ASI", "BWO", "CSI", "ISI", "JSI", "WSI"],
    chips: ["Pages are scanned images", "6 section types, each with its own fields", "No model retraining allowed"],
  },

  loop: {
    caption:
      "The model's weights never change. Each round, the system tries, gets graded, figures out what went wrong, and writes a better prompt.",
    steps: [
      { name: "Extract", body: "A vision LLM reads the PDF pages and returns JSON." },
      { name: "Evaluate", body: "Each field is compared with the correct answer." },
      { name: "Reflect", body: "An LLM reads the mistakes and explains the pattern." },
      { name: "Mutate", body: "It rewrites the prompt with targeted new rules." },
      { name: "Select", body: "The Pareto frontier decides which prompts survive." },
    ],
  },

  evaluator: {
    caption:
      "A single score like 0.41 says nothing about how to improve. The evaluator returns a list of exact mistakes, and the reflection step turns that list into specific prompt fixes.",
    trace: [
      { path: "CSI.content.labor[1]", issue: "missing", detail: "row not extracted", penalty: "−0.08", category: "structure" },
      { path: "ASI.footer.labor_amount", issue: "type", detail: "\"142.50\" should be 142.5", penalty: "−0.06", category: "numbers" },
      { path: "WSI.header.advisor", issue: "value", detail: "\"J. SMlTH\" should be \"J. SMITH\"", penalty: "−0.04", category: "text" },
    ],
    diagnosis: "Only the first labor row is extracted, and dollar amounts come back as strings.",
    weights: [
      { label: "Structure", value: 45, color: "#2a78d6" },
      { label: "Numbers", value: 40, color: "#eb6834" },
      { label: "Text", value: 15, color: "#1baf7a" },
    ],
  },

  pareto: {
    prompts: ["p0", "p1", "p2", "p3", "p4"],
    docs: ["A", "B", "C", "D", "E", "F"],
    // Illustrative scores: rows = prompts, columns = documents.
    scores: [
      [0.3, 0.35, 0.28, 0.4, 0.25, 0.38],
      [0.62, 0.58, 0.4, 0.55, 0.42, 0.5],
      [0.48, 0.45, 0.72, 0.5, 0.68, 0.44],
      [0.55, 0.7, 0.5, 0.62, 0.45, 0.58],
      [0.78, 0.52, 0.55, 0.48, 0.5, 0.74],
    ],
    explorationBonus: 0.5,
  },

  // Report Table 1: six BMW repair orders, vision pipeline.
  iterations: [
    { iteration: 1, prompt: "p000", mean: 0.328, min: 0.232, front: 1 },
    { iteration: 2, prompt: "p001", mean: 0.383, min: 0.327, front: 1 },
    { iteration: 3, prompt: "p002", mean: 0.385, min: 0.286, front: 2 },
    { iteration: 4, prompt: "p003", mean: 0.397, min: 0.286, front: 3 },
    { iteration: 5, prompt: "p004", mean: 0.826, min: 0.448, front: 5 },
  ],

  resultsCaveat:
    "The iteration-5 jump reflects the whole pipeline. Fixes to the evaluator (section alignment, number normalization) landed alongside the prompt changes.",

  improved: [
    "Fewer missing sections",
    "All labor & parts rows captured, not just the first",
    "Numbers returned as numbers",
  ],

  takeaways: [
    {
      title: "The evaluator sets the ceiling",
      body: "The optimizer only learns what the evaluator can see. We had to fix the grader before the loop improved anything real.",
    },
    {
      title: "A better model beats a longer prompt",
      body: "Upgrading the base extractor gave the biggest jump. Prompt evolution added a real, smaller gain on top.",
    },
    {
      title: "Six documents is a start",
      body: "The next step is a held-out test set, to check whether the evolved rules transfer to unseen repair orders.",
    },
  ],
};
