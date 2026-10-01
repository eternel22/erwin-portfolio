// Numbers come from the IGARSS 2024 paper (dataset table, confusion matrix,
// mAP). The drawn satellite scene and the feature-space scatter are
// illustrative examples.

export const eyCaseStudy = {
  tagline: "EY Open Science Data Challenge 2024 · solo entry · presented at IEEE IGARSS 2024",
  tldr: "I built a model that finds every building in satellite images taken after a hurricane and says whether it is damaged. Most of the work was choosing and annotating the right training images.",

  stats: [
    { value: "2nd runner-up", label: "Out of 11,000 entrants worldwide" },
    { value: "4,000+", label: "Building annotations in the training and validation sets" },
    { value: "0.50", label: "Validation mAP after 8 epochs of fine-tuning" },
  ],

  sections: [
    { id: "problem", label: "The problem" },
    { id: "dataset", label: "The dataset" },
    { id: "annotation", label: "Annotation" },
    { id: "model", label: "The model" },
    { id: "results", label: "Results" },
    { id: "takeaways", label: "Takeaways" },
  ],

  problem: {
    caption:
      "After Hurricane Maria hit Puerto Rico in September 2017, responders needed to know where the damage was. Satellite images exist, but they are usually inspected by hand. The challenge: locate each building and classify it into one of four classes.",
    classes: [
      { key: "ur", label: "Undamaged residential", color: "#1baf7a" },
      { key: "dr", label: "Damaged residential", color: "#eb6834" },
      { key: "uc", label: "Undamaged commercial", color: "#2a78d6" },
      { key: "dc", label: "Damaged commercial", color: "#9b59d0" },
    ],
  },

  dataset: {
    caption:
      "The challenge came with satellite images but no labels. Building a relevant training set was the hardest part, and the most important one.",
    stride: {
      title: "Overlapping patches keep buildings whole",
      body: "The large satellite image is cut into 512 × 512 pixel patches, each covering about 170 × 170 m. Halving the stride from 512 to 256 pixels gives more images and avoids buildings cut at a border.",
      modes: [
        { stride: 512, status: "The building sits on a border. Neither patch sees it whole." },
        { stride: 256, status: "Patches overlap by half. One of them contains the whole building, and there are more images to train on." },
      ],
    },
    neighbors: {
      title: "Label the patches that look like the test",
      body: "Not every patch is worth labeling, and finding the relevant ones by eye is slow. I described every patch with 18 simple features and kept the patches closest to the validation images.",
      features: [
        { name: "9 color features", body: "Color histograms: what the patch is made of." },
        { name: "9 texture features", body: "Local binary patterns: how fine or coarse it looks." },
        { name: "Nearest neighbors", body: "Keep the training patches closest to each validation image." },
      ],
      k: 5,
    },
  },

  annotation: {
    caption:
      "Drawing boxes from scratch is slow. Correcting boxes that are mostly right is fast. So a small model did the first pass, and I fixed its mistakes.",
    steps: [
      { name: "Label", body: "Annotate a first small batch of patches by hand." },
      { name: "Train YOLO", body: "Train a small detector on what is labeled so far." },
      { name: "Pre-label", body: "Run it on new patches to get draft boxes and classes." },
      { name: "Correct", body: "Fix the drafts by hand and add them to the dataset." },
    ],
    hints: [
      {
        title: "Before and after images",
        body: "Only post-storm images are used for training. But cutting the pre-storm images into the same patches let me compare both and spot what changed.",
      },
      {
        title: "Building footprints",
        body: "Outlines from Microsoft's Global ML Building Footprints gave a second reference for where the buildings are.",
      },
    ],
  },

  model: {
    caption:
      "Damage assessment does not need real-time speed, so I picked the most accurate detector available over the fastest. Co-DETR, published in 2023, is an improved DETR-style transformer.",
    flow: [
      { title: "Co-DETR", body: "Pretrained on COCO: 200,000+ labeled images, 80 categories" },
      { title: "Fine-tune", body: "8 epochs on my Puerto Rico patches, with crops, translations and contrast changes" },
      { title: "Prediction", body: "For each building: a box, one of 4 classes and a confidence score" },
    ],
    chips: [
      "Imagery: Maxar GEO-1, Puerto Rico after Hurricane Maria",
      "Train, validation and test splits",
      "Checkpoint with the best validation score kept",
    ],
  },

  results: {
    caption:
      "The model reached a mAP of 0.60 on the training set and 0.50 on validation. It is strong on the common class and struggles on the rare ones.",
    // Paper Figure 2. Rows = ground truth, columns = prediction, in percent.
    confusion: {
      labels: ["Undamaged res.", "Undamaged com.", "Damaged res.", "Damaged com.", "Background"],
      rows: [
        [90, 0, 1, 0, 7],
        [35, 46, 0, 0, 17],
        [28, 0, 49, 0, 22],
        [31, 18, 6, 0, 43],
        [84, 5, 9, 0, 0],
      ],
      readings: [
        "90% of undamaged residential buildings are found with the right class. 7% are missed.",
        "46% of undamaged commercial buildings are right. 35% are taken for residential and 17% are missed.",
        "49% of damaged residential buildings are right. 28% are taken for undamaged and 22% are missed.",
        "Damaged commercial buildings are never classified correctly. 43% are missed and the rest get another class.",
        "When the model draws a box where there is no building, it calls it undamaged residential 84% of the time.",
      ],
    },
    // Paper Figure 3.
    balance: [
      { label: "Undamaged residential", train: 2857, val: 496, color: "#1baf7a" },
      { label: "Damaged residential", train: 366, val: 49, color: "#eb6834" },
      { label: "Undamaged commercial", train: 200, val: 50, color: "#2a78d6" },
      { label: "Damaged commercial", train: 20, val: 7, color: "#9b59d0" },
    ],
    balanceNote:
      "The errors follow the data. Undamaged residential buildings make up most of the training set, and damaged commercial ones appear only 20 times.",
  },

  takeaways: [
    {
      title: "The dataset is the model",
      body: "Patch selection and annotation took most of the effort and decided most of the result. The model was fine-tuned with the standard Co-DETR recipe.",
    },
    {
      title: "Draft labels cut both ways",
      body: "Correcting a model's boxes is much faster than drawing them. It also takes less attention, so some of its mistakes slip into the labels.",
    },
    {
      title: "More labels did not help",
      body: "I labeled more rare-class examples to fix the imbalance, and the test score dropped. Telling the four classes apart from above is hard, even for the annotator.",
    },
  ],

  paper: {
    citation:
      "E. Deng, \"Coastline Resilience: Leveraging Satellite Imagery and the Co-Detr Model for Storm Damage Assessment,\" IGARSS 2024 - 2024 IEEE International Geoscience and Remote Sensing Symposium, Athens, Greece, 2024, pp. 609-613.",
    href: "https://doi.org/10.1109/IGARSS53475.2024.10642784",
  },
};
