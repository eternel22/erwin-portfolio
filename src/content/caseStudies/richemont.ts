// Exact results are confidential, so this page is qualitative. Every chart is
// an illustrative example; none of the numbers under `patches`, `threshold`
// or `tiling` are measurements.

export const richemontCaseStudy = {
  tagline: "Spring 2025",
  tldr: "I built a defect detector that learns what a good watch part looks like from a few dozen images. A new component no longer needs months of defect labeling before inspection can be automated.",

  stats: [
    { value: "0", label: "Defect labels needed to start on a new component" },
    { value: "20–50", label: "Images are enough to get a useful detector" },
    { value: "3", label: "Backbones benchmarked: CNN, DINOv2, RADIO" },
  ],

  sections: [
    { id: "problem", label: "The problem" },
    { id: "idea", label: "The idea" },
    { id: "catch", label: "The catch" },
    { id: "results", label: "Results" },
    { id: "tradeoff", label: "Speed vs. detail" },
    { id: "production", label: "In production" },
    { id: "takeaways", label: "Takeaways" },
  ],

  problem: {
    caption:
      "Watch components must be aesthetically perfect, so they are inspected by hand. Automating that with a classic classifier means collecting and labeling OK and defective examples again for every new part.",
    supervised: ["Collect OK + KO", "Label", "Train", "Debug with the factory"],
    chips: [
      "Manual inspection is slow",
      "Borderline defects split even expert inspectors",
      "The imaging hardware was already in place",
    ],
  },

  idea: {
    caption:
      "Instead of teaching a model every possible defect, show it good parts only. Anything that doesn't look like what it has seen gets a high anomaly score.",
    steps: [
      { name: "Cut", body: "Each image is split into small patches." },
      { name: "Embed", body: "A pretrained backbone turns every patch into a feature vector." },
      { name: "Remember", body: "Features from good parts are stored in a memory bank." },
      { name: "Compare", body: "A new patch far from everything in the bank is flagged." },
    ],
    // 8 x 8 grid over the drawn part; listed cells sit on the scratch.
    patches: {
      grid: 8,
      threshold: 0.5,
      hot: [
        { col: 5, row: 2, score: 0.91 },
        { col: 5, row: 3, score: 0.74 },
        { col: 4, row: 2, score: 0.46 },
        { col: 6, row: 3, score: 0.42 },
      ],
    },
    alternative:
      "I also explored teacher-student models: a pretrained teacher such as DINOv2 and a small student trained on good parts only. Where the two disagree, something is unusual.",
  },

  catch: {
    caption:
      "The main issue I found was in the data, not the model. The training images labeled OK contained some defects. A memory bank memorizes them and then treats the same defect as normal.",
    steps: [
      "Extract patch features from all training images",
      "Score how isolated each feature is (Local Outlier Factor or a multivariate Gaussian)",
      "Remove or down-weight the outliers",
      "Build the memory bank from what is left",
    ],
    assumption:
      "The key assumption, borrowed from SoftPatch: defects are rare. So a feature with few close neighbors is more likely a hidden defect than a normal pattern.",
  },

  results: {
    caption:
      "The metric: place the threshold so that only 5% of defective pieces slip through, then count how many good pieces are accepted with no human look.",
    threshold: {
      ok: { mean: 0.32, sd: 0.12 },
      ko: { mean: 0.66, sd: 0.13 },
      koTarget: 0.05,
    },
    recollection:
      "Exact figures are confidential. From memory, with only 20 to 50 unlabeled images of a component, the scores of good and defective pieces separated cleanly, and at the 5% operating point roughly 80% or more of good pieces passed automatically.",
    achieved: [
      "Tested on several components from several brands",
      "No defect labeling needed for a new component",
      "Live demo to stakeholders across several brands",
    ],
  },

  tradeoff: {
    caption:
      "The detector also had to be fast enough for the inspection workflow. I tested resizing the image to several sizes, and cutting it into a grid of cells with one memory bank per cell.",
    tiling: [
      {
        label: "Full image",
        cells: 1,
        resolution: 1,
        cost: 1,
        generalization: 3,
        note: "One memory bank for the whole part. Fastest, but small defects cover few pixels.",
      },
      {
        label: "3 × 3 grid",
        cells: 3,
        resolution: 2,
        cost: 2,
        generalization: 2,
        note: "Each cell is processed at higher resolution and has its own memory bank, which helps with defects tied to one location.",
      },
      {
        label: "5 × 5 grid",
        cells: 5,
        resolution: 3,
        cost: 3,
        generalization: 1,
        note: "Finest detail, but 25 separate memory banks. Each one sees less variety, and inference can get more expensive.",
      },
    ],
    backbones: [
      { name: "CNN", body: "The classic choice for memory-bank methods." },
      { name: "DINOv2", body: "Self-supervised vision transformer with 16 × 16 pixel patches." },
      { name: "RADIO", body: "NVIDIA's vision foundation model." },
    ],
    tracking:
      "Results varied by component, so there was no single winner. Every run was tracked in MLflow to compare detection quality against inference latency.",
  },

  production: {
    caption:
      "The acquisition machine does not run the model. A separate computer with a GPU sits next to it and exposes the detector as a small web service.",
    chips: [
      { name: "Docker", body: "Model code and dependencies ship as one image, so the setup is reproducible." },
      { name: "Pydantic", body: "Inputs and outputs are validated, so the contract with the acquisition software is explicit." },
      { name: "MLflow", body: "Each candidate was benchmarked on accuracy and latency before deployment." },
    ],
  },

  takeaways: [
    {
      title: "Check the \"clean\" data first",
      body: "The biggest gain came from questioning the training set. A method that tolerates a few hidden defects beats one that assumes perfect data.",
    },
    {
      title: "Ease of use was the requirement",
      body: "The brands already had cameras. What they lacked was a model that works on a new part without a data science team in the loop.",
    },
    {
      title: "Agree on the operating point",
      body: "A score means little on its own. Fixing the share of defects allowed through made results comparable across components.",
    },
  ],
};
