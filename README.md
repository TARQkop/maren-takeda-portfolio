<div align="center">

# Maren Takeda

### Ceramic Artist Portfolio

An editorial portfolio concept for a fictional ceramic artist based in Porto, Portugal.

[View the live portfolio](https://tarqkop.github.io/maren-takeda-portfolio/)

[![Deploy to GitHub Pages](https://github.com/TARQkop/maren-takeda-portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/TARQkop/maren-takeda-portfolio/actions/workflows/deploy.yml)
![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)
![React 19](https://img.shields.io/badge/React-19-149eca?logo=react)
![TypeScript 5.9](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)

</div>

## Contents

- [Highlights](#highlights)
- [Technology](#technology)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Design system](#design-system)
- [Deployment](#deployment)
- [Project structure](#project-structure)
- [Customization](#customization)

## Highlights

- Responsive, editorial-inspired layout with a warm, ceramic-led visual identity
- Motion and scroll effects, with reduced-motion preferences respected
- Project details, studio experience, and a contact form that opens a pre-filled email
- Self-hosted Fraunces and Instrument Sans fonts
- Static export for deployment to GitHub Pages

## Technology

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Motion · GSAP · Lenis · Lucide

## Getting started

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run typecheck` | Check TypeScript types |
| `npm run check:images` | Verify that the portfolio's Unsplash images are reachable |
| `npm run build` | Create the static site in `out/` |

## Design system

The visual language pairs warm, material-inspired colors with Fraunces display typography and Instrument Sans for body text.

| Token | Color |
| --- | --- |
| Bone | `#efe8dc` |
| Sand | `#e4dac9` |
| Ink | `#241d19` |
| Clay | `#a24a2e` |
| Celadon | `#7e9489` |
| Ochre | `#c8943a` |

## Deployment

GitHub Actions builds and deploys the site to [GitHub Pages](https://tarqkop.github.io/maren-takeda-portfolio/) whenever changes are pushed to `main`. The build uses Next.js static export and the deployment workflow is in `.github/workflows/deploy.yml`.

## Project structure

| Path | Purpose |
| --- | --- |
| `app/` | Application entry point, layout, metadata, and global styles |
| `components/sections/` | Hero, About, Work, Expertise, Experience, and Contact sections |
| `components/` | Shared navigation, animation, image, and project components |
| `data/content.ts` | Portfolio copy, project details, timeline, and image references |
| `lib/` | Image URL, class-name, and scroll utilities |
| `.github/workflows/deploy.yml` | GitHub Pages deployment workflow |

## Customization

- Update copy, projects, experience, social links, and image references in `data/content.ts`.
- Adjust visual tokens and typography in `app/globals.css`.
- Portfolio photographs are served by the Unsplash CDN and require an internet connection.

## Notes

- The contact form has no backend. After validation, it opens the visitor's email application with the enquiry pre-filled.
- The persona is fictional. Replace the sample contact and social details in `data/content.ts` before adapting this project for a real portfolio.
