# raphi.li — Portfolio

Personal portfolio of Raphaël Seiler, BSc Digital Design student at the OST (Ostschweizer Fachhochschule). It shows projects, awards and a CV. Live at [raphi.li](https://raphi.li).

## Features

- **Home** — intro, project carousel, awards, about me
- **Projects** — overview and a case-study page per project
- **Experience** — CV timeline (education, work) including awards
- **Contact** — chat-style form that sends via [Formspree](https://formspree.io) (no email address on the site) and social links
- **Accessibility** statement page
- German / English toggle and light / dark mode (both remembered per visitor)

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS 4 · React Router (hash router) · Motion / GSAP / OGL for animation · shadcn/ui + Radix primitives

## Getting started

```bash
npm install
npm run dev        # dev server
npm run typecheck  # TypeScript check (run before deploying)
npm run build      # production build into dist/
```

## Project structure

```
src/
├── app/
│   ├── pages/          Home, Projects, ProjectDetail, Experience, Contact, Accessibility
│   ├── components/     Layout, CircularGallery, MagicBento, ui/ (shadcn)
│   ├── context/        LanguageContext (DE/EN)
│   ├── translations.ts UI texts in German and English
│   └── routes.ts
├── content/            all content, independent of the design
│   ├── projects/       one folder per project (see below)
│   ├── experience.ts   CV entries
│   └── timeline.ts     CV entries + awards, as shown on the Experience page
├── assets/             images that are not tied to a project (home photo, logo)
└── styles/
```

### Project content

Every project lives in `src/content/projects/<id>/` and has the same files:

| File | Purpose |
|---|---|
| `meta.ts` | overview card: title, tagline, category, year, colors, stats |
| `content.ts` | case-study text (charter, goal, process, result, testing, highlight, reflection), German and English |
| `links.ts` | Figma prototype, website, repo — all optional |
| `awards.ts` | awards won with this project (an empty list if none) |
| `images/` | image files, plus `index.ts` that says what each image is for (card, logo, hero, figures, carousel) |
| `index.ts` | puts the files together into one `Project` |

The shape is defined in `src/content/projects/types.ts`. Optional sections left out of `content.ts` are simply not shown on the page.

**Add a project**

1. Copy an existing project folder and rename it (the folder name should match `meta.id`; it becomes the URL `/#/projects/<id>`).
2. Edit `meta.ts`, `content.ts`, `links.ts`, `awards.ts` and replace the images.
3. Import it and add it to the `projects` array in `src/content/projects/index.ts`. The first entry is the featured project.

Awards appear automatically on the Home page, the Experience timeline and in the awards count on the Projects page.

**Images:** use WebP where possible and keep photos under about 2000 px wide (`cwebp -q 82 -resize 2000 0 in.png -o out.webp`).

## Deployment

The site is hosted on **GitHub Pages** at the custom domain raphi.li (`public/CNAME`, DNS at Hostpoint).

```bash
npm run typecheck
npm run deploy     # builds and publishes dist/ to the gh-pages branch
```

Design versions live on separate branches, e.g. `apple-development` (Apple look) and `google-development` (Google look); `main` is the base branch for pull requests.

## Licenses

UI primitives from [shadcn/ui](https://ui.shadcn.com/) under the [MIT license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md). See `ATTRIBUTIONS.md`.
