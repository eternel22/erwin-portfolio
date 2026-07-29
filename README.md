# Erwin Deng — Portfolio

Personal portfolio site built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

All resume content lives in typed data files under `src/content/` — edit these to update the site without touching layout or component code:

- `site.ts` — name, tagline, social links, resume link
- `experience.ts` — work experience entries
- `projects.ts` — project case studies (each renders at `/projects/[slug]`)
- `education.ts` — degrees
- `skills.ts` — grouped technical skills
- `additionalInfo.ts` — awards, languages, interests

Shapes for all of the above are defined in `src/types/content.ts`.

## Build

```bash
npm run build
```

## Deploy

Deployed on [Vercel](https://vercel.com). Push to `main` to trigger a production deploy once the repo is connected.
