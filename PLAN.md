# Aymen Hammami — Portfolio Build Plan

Source of truth: `ref/Aymen_Hammami_Portfolio_PRD.pdf` (content, structure, copy) + the blue reference
poster in `ref/` (visual language only — not its text, its person, or its Photoshop theme).

---

## 1. Positioning (PRD §01–§03, §12)

- **Who:** Aymen Hammami — @ah.cutos — Batna, Algeria — 6 years.
- **What:** Social Media Manager + Content Creator / Video Editor.
- **First impression:** "Hire me as a professional."
- **Differentiator:** solution finder — adapts to the situation, finds the solution, executes.
- **Mood:** Legacy · Premium · Diamond. Sharp, confident, visual-first. The work stays the hero.
- **Copy rules:** concise and confident. Never "passionate about social media". No invented stats,
  clients or testimonials — only the six PRD numbers.

---

## 2. Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 App Router, React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4, tokens as CSS variables in `app/globals.css` (`@theme inline`) |
| Component motion | `motion` (Framer Motion v12), imported from `motion/react` |
| Smooth scroll | Lenis, driven by the GSAP ticker |
| Scrubbed timelines | GSAP + ScrollTrigger — hero parallax and the pinned horizontal Work rail only |
| Icons | `lucide-react` plus hand-rolled SVG for the editor-tool glyphs |
| Fonts | Clash Display (Fontshare, self-hosted via `next/font/local`) + Plus Jakarta Sans (`next/font/google`) |
| Media | `next/image` for stills, native `<video>` for clips |
| Deploy | Vercel. `npm run build` and `npm run lint` must be clean. |

No UI kit. Every component is custom.

---

## 3. Design tokens (derived from the reference image)

```
--sky         #87ceeb   the brand colour — actions, accents, glow
--sky-light   #c2e6f5   highlights and rim light
--sky-deep    #216e8c   depth in gradients and shadows
--sky-deeper  #124154   deepest shade
--bg-0        #030a1c   near-black navy ground (edges)
--bg-1        #0b2a6e   deep royal blue mid ground (revised to match the reference)
--ink         #eef7fb   text
--muted       rgba(214, 233, 243, .76)
--glass       rgba(23, 74, 100, .42) + 1px rgba(255,255,255,.16) border + blur(18px)
radius        16px cards / 999px pills
```

One hue throughout: every tint and shade is derived from **#87ceeb** (HSL 197°, 71%, 73%), including
the near-black ground, so nothing falls outside the family.

Layered background: a sky bloom in the lower centre, a deeper sky through the middle, near-black at
the edges, plus a fixed SVG-noise film grain at ~5% opacity.

**Because the brand colour is light**, anything filled with it carries dark `--bg-0` text rather than
white — white on #87ceeb is about 1.9:1 and fails. That applies to the primary button, the nav
WhatsApp pill, the glass-card label tab and the floating chips (#06141d on #87ceeb is 10.6:1).

**Type scale:** display `clamp(3.5rem, 12vw, 9rem)`, leading `.88`, tracking `-0.03em`.
Body: Plus Jakarta Sans 400/500/600.

### Reference → primitive map

| Reference element | Component |
|---|---|
| Chrome headline | `.text-chrome` utility + `ChromeText` (slow light-sweep shimmer every ~6s) |
| Small bold line above the headline | `Kicker` |
| Outlined pill badge | `Pill` — glass fill, hairline border, backdrop blur |
| Electric blue accents | Recoloured to **#87ceeb** throughout — one accent token (`--sky`), no separate blue/cyan pair |
| Floating 3D glass app icons | `FloatingTiles` — generic glossy CSS/SVG tiles (Cut / Key / Ramp / Grade), idle bob + mouse parallax, one depth-blurred. No official logos. |
| 3D glass cursor arrow | Dropped after review — the site uses the standard system cursor |
| Curved ticker ribbon | `ArcTicker` — SVG `textPath` marquee behind the portrait, `HIRE ME AS A PROFESSIONAL • REELS • TIKTOK • EDITING •`, scroll speeds it up |
| Cut-out portrait with cyan halo | `Portrait` — transparent PNG slot with a breathing radial cyan glow |
| Side columns of faded tool icons | `ToolRails` — two vertical rails of video-editor glyphs (razor, ripple, pen, keyframe, speed ramp, text, crop, waveform, colour wheel…), gradient-masked, scrolling in opposite directions |
| Glass info card with pill header | `GlassCard label="…"` — stats, services, gear |
| Software window peeking bottom-left | `TimelinePanel` — stylised editing timeline; the playhead tracks scroll progress |

---

## 4. Site structure (PRD §10)

Single-page home plus dynamic `/work/[slug]` case studies.

1. **Hero** — kicker "Hire me as a professional" · chrome "Aymen Hammami" · sub-display
   "Video Editor & Social Media Manager" · pill "6 years in the game" · cut-out portrait + cyan halo +
   arc ticker + three floating glass chips + tool rails.
   *Revised after review:* the hero carries no buttons, results card or timeline panel — the first
   screen is the name and the face, nothing competing. Conversion lives in the nav's WhatsApp pill
   and the floating WhatsApp button (now visible from the top on mobile).
2. **Selected Work** — 3–5 hero projects in 9:16 media. Desktop: GSAP-pinned horizontal scroll with an
   editing-timeline scrubber. Mobile: vertical snap cards. Muted autoplay on hover (desktop) / in view
   (mobile), poster first. Each card: client · industry · one key result · View case.
3. **Results** — count-up counters in glass cards: 50M+ views · 2M+ followers · 120M+ engagement ·
   100+ products above $1,000 · 2,000+ products below $100. Only these numbers.
4. **Services** — the nine PRD services as an interactive list; a row expands on hover/tap with one line
   and a looping mini clip.
5. **About** — "6 years in the game…", solution finder highlighted as the differentiator, target
   industries as pills (Fashion · E-commerce · Real Estate).
6. **Clients** — infinite marquee: Adib Weaz, Dopamicafin, Jtech Media Service, Jtech Auto, Glamerdipp,
   Podcasts. Text fallback when there is no logo. Code comment: verify spelling and permission.
7. **Tools & Production** — software and gear as small glass chips. Supporting proof, kept light.
8. **Contact** — huge chrome "Let's work." with WhatsApp primary, plus email, Instagram, LinkedIn.

**Global:** sticky minimal nav (`AH.` + section links + WhatsApp pill) that turns glass on scroll;
floating WhatsApp button always visible on mobile; footer with socials.

**Case study** `/work/[slug]`: hero media → client / industry / year → challenge → role → creative
approach → deliverables → results (glass stat cards) → media gallery → next project link.

---

## 5. Animation list

| # | Where | What |
|---|---|---|
| 1 | Loader | ≤1.2s, once per session: a timeline playhead sweeps, the name cuts in, the hero is revealed |
| 2 | Hero | masked line-reveal stagger · chrome shimmer every ~6s · chip idle bob + mouse parallax · arc ticker loop · halo breathing |
| 3 | Scroll | Lenis smooth scroll · sections fade/slide up with blur-to-sharp · hero parallaxes apart on exit |
| 4 | Work | GSAP pinned horizontal scroll (desktop) · slight velocity-driven scale · timeline scrubber |
| 5 | Transitions | quick blue-panel "cut" wipe between home and case studies |
| 6 | Micro | magnetic buttons · counter roll-ups · hover video previews |

`prefers-reduced-motion` disables: parallax, marquee speed-ups, the loader and hover autoplay.

---

## 6. Data and media

```
content/site.ts       name, handle, taglines, stats, services, tools, gear, clients, socials, contact
content/projects.ts   Project[] — slug, title, client, industry, year, cover, poster, video, aspect,
                      challenge, role, approach, deliverables[], results[], gallery[]
public/media/hero/            portrait.png (transparent cutout), showreel.mp4 + poster
public/media/projects/<slug>/ cover, poster, video(s), gallery
public/media/clients/         logos (optional)
scripts/compress-video.sh     ffmpeg → H.264 MP4 + WebM + poster JPG at 720p/1080p, vertical + horizontal
```

Every media field is nullable, and a null renders a clearly-labelled gradient placeholder — no stock
people, and never the person from the reference image. The README documents "How to add a new project"
in three steps.

---

## 7. Performance, SEO, accessibility

- Mobile-first; checked at 360 / 768 / 1280 / 1920.
- Video: `preload="none"`, poster images, lazy load in view, pause off-screen, `playsInline muted loop`.
- Targets: Performance ≥ 90 mobile, Accessibility ≥ 95, SEO 100.
- Metadata API, `opengraph-image.tsx` in the blue/chrome style, `sitemap.ts`, `robots.ts`, JSON-LD `Person`.
- Semantic landmarks, keyboard-navigable modal and menu, visible focus rings, alt text carried in data.

---

## 8. Build order

1. Scaffold, tokens, fonts → 2. content data → 3. UI primitives (Pill, GlassCard, ChromeText, Magnetic,
Reveal, Cursor, Noise) → 4. Hero and its parts → 5. Work → 6. Results / Services / About / Clients /
Tools / Contact → 7. Nav, Footer, Loader, transition, WhatsApp → 8. `/work/[slug]` → 9. SEO, scripts,
README → 10. build, lint, responsive pass.
