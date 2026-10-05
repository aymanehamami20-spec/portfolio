# Aymen Hammami — Portfolio

Premium one-page portfolio for **Aymen Hammami (@ah.cutos)** — Social Media Manager, Content
Creator and Video Editor, Batna, Algeria — plus dynamic case-study pages at `/work/[slug]`.

Built from `ref/Aymen_Hammami_Portfolio_PRD.pdf` (content, structure, copy) and the blue reference
poster in `ref/` (visual language). See [PLAN.md](PLAN.md) for the full design system and build plan.

---

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** — design tokens as CSS variables in [`app/globals.css`](app/globals.css)
- **Motion** (Framer Motion) for component animation · **Lenis** for smooth scroll
- **GSAP + ScrollTrigger** for the two scrubbed timelines (hero parallax, pinned horizontal work rail)
- **Clash Display** (self-hosted, Fontshare) + **Plus Jakarta Sans** (`next/font/google`)
- No UI kit — every component is custom

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Deploy target is Vercel — push the repo and import it; no environment variables are required.

---

## How to add a new project

Three steps.

### 1. Drop the media in

Create a folder named after the slug and put the media inside:

```
public/media/projects/<slug>/
  cover.jpg          # still used on the work card
  poster.jpg         # first frame of the preview clip
  clip.mp4           # muted hover / in-view preview
  gallery/01.jpg …   # optional extra stills
```

Run raw exports through the compressor first — it writes web-ready MP4, WebM and a poster:

```bash
./scripts/compress-video.sh raw/my-export.mov public/media/projects/<slug>
```

### 2. Add the entry to `content/projects.ts`

```ts
{
  slug: "glamerdipp-launch",
  title: "Launch content that sold out the drop",
  client: "Glamerdipp",
  industry: "Fashion",
  year: "2025",
  format: "Reel · 30s",                 // chip on the card + case study
  summary: "One line for the work card.",
  cover:  { src: "/media/projects/glamerdipp-launch/cover.jpg",  alt: "…" },
  poster: { src: "/media/projects/glamerdipp-launch/poster.jpg", alt: "…" },
  video: "/media/projects/glamerdipp-launch/clip.mp4",
  aspect: "9:16",                       // "9:16" | "3:4" | "4:5" | "1:1" | "16:9"
  challenge: "…",
  role: "…",
  approach: "…",
  deliverables: ["…"],
  results: [{ value: "4.2M", label: "Views" }],   // real figures only
  gallery: [{ src: "/media/projects/glamerdipp-launch/gallery/01.jpg", alt: "…", width: 1080, height: 1350 }],
  accent: "#3ec8ff",
}
```

### 3. Nothing else

The card, the case-study page at `/work/<slug>`, the sitemap entry and the next-project link are all
generated from that object. Keep the homepage curated — 3 to 5 projects (PRD §08).

Any media field left as `null` renders a clearly-marked placeholder, so the site is always
shippable while assets are still coming in.

---

## Adding the hero assets

In `content/site.ts`, `heroMedia`:

| Field | File | Notes |
|---|---|---|
| `portrait` | `/media/hero/portrait.png` | transparent cut-out — the cyan halo sits behind it |
| `showreel` | `/media/hero/showreel.mp4` | **currently unwired** — see note below |
| `showreelPoster` | `/media/hero/showreel-poster.jpg` | shown before playback |

`portrait.png` is cropped tight to Aymen; the original export is kept beside it as
`portrait-source.png`. Export replacements the same way — transparent padding around the subject
makes him render smaller — and at **1200px tall or more**, since the cut-out is scaled up in the hero.

The hero deliberately carries no buttons, so `ShowreelModal` has no trigger at the moment. The
component is complete and ready to wire to any button once a showreel file exists.

Client logos go in `public/media/clients/` and are wired up in the `clients` array; a client with
`logo: null` renders as text.

---

## Content rules

All copy and data live in [`content/site.ts`](content/site.ts) and
[`content/projects.ts`](content/projects.ts). Two rules from the PRD:

- **No invented numbers.** The only statistics on the site are the six from PRD §06 (50M+ views,
  2M+ followers, 120M+ engagement, 100+ products above $1,000, 2,000+ products below $100,
  6 years). Project results must be real figures from Aymen, or left empty.
- **Before publishing:** verify the exact spelling of every client name in the `clients` array and
  confirm with Aymen that each may be displayed publicly (PRD §07, §14).

Copy direction: concise and confident. Never "passionate about social media" — every claim ties to
a number or a project (PRD §12).

---

## Structure

```
app/
  layout.tsx            fonts, metadata, JSON-LD Person, global chrome
  page.tsx              the one-page home
  work/[slug]/page.tsx  case-study template
  opengraph-image.tsx   social preview, generated in the blue/chrome style
  icon.tsx              monogram favicon
  sitemap.ts robots.ts not-found.tsx
components/
  hero/       Hero, ArcTicker, FloatingTiles, Portrait, ToolRails, TimelinePanel
  sections/   Work, WorkCard, Results, Services, About, Clients, Tools, Contact
  layout/     Nav, Footer, Loader, FloatingWhatsApp, PageTransition ("cut" wipe)
  media/      HoverVideo, Placeholder, ShowreelModal (built, not currently wired)
  ui/         Button, Pill, GlassCard, ChromeText, Magnetic, Reveal, Counter,
              SectionHeading, SkyGlow
  providers/  SmoothScroll, IntroProvider
content/      site.ts, projects.ts   ← everything editable lives here
lib/          hooks, motion presets, scroll helpers, utils
scripts/      compress-video.sh
```

## Accessibility & motion

- `prefers-reduced-motion` disables the intro loader, smooth scroll, parallax, the pinned
  horizontal rail and every hover autoplay — the whole site stays usable and static.
- The showreel modal and mobile menu trap focus, close on Escape and restore focus on exit.
- Videos are `preload="none"`, poster-first, lazy-loaded in view and paused off-screen.

---

## Current content (from Aymen's PORTFOLIO Drive)

Nine projects in `content/projects.ts`, built from the Drive folders (new work, People I worked with, Arabic shorts, ecole, Design, Logos, Social Media results) and his CV:

- **Rail (featured):** Millionaire Brain (own page), Adib Waez, J-Tech Media Service / J-Tech Auto, Lyceum Club, Glamrdip Australia, Dopamicafeine.
- **More work:** Pure Wear, YR Smart Center, Thumbnails & social design.

Results only use figures from the CV, PRD and the Instagram insight screenshots.

### Videos still to add

Files over ~7 MB could not come through the Drive connector, so J-Tech, Lyceum, Glamrdip, Dopamicafeine, Pure Wear, YR Smart Center and the Arabic shorts currently use Drive preview frames. Put the originals in `ref/drive/`, then for each clip:

```bash
./scripts/compress-video.sh "ref/drive/new work/JTECH/0919(1).mp4" public/media/projects/jtech
```

and set `video` (card preview) and the gallery items' `video` in `content/projects.ts`. `public/media/hero/showreel.mp4` is an interim 24-second montage of the reels that were available — re-cut it with the new footage.

### Confirm with Aymen before publishing

- permission to show each client name, logo and channel screenshot,
- his exact role per project,
- a high-resolution chest-up cut-out for `public/media/hero/portrait.png`.
