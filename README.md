# Maren Takeda — Ceramic Artist (portfolio)

A fictional portfolio for **Maren Takeda**, a Porto-based ceramic artist working from Estúdio Cinza.
Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Motion · GSAP (ScrollTrigger) · Lenis · Lucide.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # exports the static site to out/
npm run check:images # confirms every Unsplash photo URL responds
```

## Deploy

Pushes to `main` are published automatically with GitHub Actions:
https://tarqkop.github.io/maren-takeda-portfolio/

## Structure

- `data/content.ts` — all copy, projects, timeline and the Unsplash photo ids (no photo is reused)
- `components/sections/` — the six sections: Hero, About, Work, Expertise, Experience, Contact
- `components/` — Loader, Nav (animated mobile menu), Frame (image reveal + parallax), Reveal, Cursor, ProjectDialog…
- `app/globals.css` — design tokens (palette, fonts, easing)
- `lib/images.ts` — custom image loader: each device asks Unsplash's CDN for exactly the width it needs

## Design system

| Role | Colour |
| --- | --- |
| Background (bone) | `#efe8dc` |
| Surface (sand) | `#e4dac9` |
| Text / dark (ink) | `#241d19` |
| Primary (clay) | `#a24a2e` |
| Secondary (celadon) | `#7e9489` |
| Accent (ochre) | `#c8943a` |

Fonts: Fraunces (display) and Instrument Sans (text), self-hosted via Fontsource, so the build needs no network.

## Notes

- The contact form has no backend: on submit it validates, then opens the visitor's mail app with the enquiry pre-written.
- Social links point to the platforms' home pages because the persona is fictional; replace them in `data/content.ts`.
- `prefers-reduced-motion` disables smooth scrolling, parallax, the cursor and long transitions.
