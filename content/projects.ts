/**
 * Projects (PRD §08). `featured` projects run in the homepage rail; the rest
 * appear under "More work". Every project has its own /work/<slug> page.
 *
 * Source: Aymen's PORTFOLIO Drive. Results come only from his CV, the PRD and
 * the Instagram insight screenshots in the Drive — never invent a figure.
 *
 * TODO(confirm with Aymen): client permissions to display each name/logo, and
 * exact roles. Projects whose source videos were too large for the Drive
 * connector currently use Drive preview frames — run scripts/compress-video.sh
 * on the originals and set `video` (and gallery `video`) once they're in.
 */

export type Media = {
  /** Still image (or video poster) under /public/media/… */
  src: string | null;
  alt: string;
  /** Optional playable clip — the gallery renders a video player. */
  video?: string;
  /** Intrinsic size — lets the gallery keep each piece at its native ratio. */
  width?: number;
  height?: number;
};

export type ProjectResult = {
  value: string;
  label: string;
};

export type Aspect = "9:16" | "3:4" | "4:5" | "1:1" | "16:9";

export type Project = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  year: string;
  /** Format label shown as a chip, e.g. "Reels · Podcast clips". */
  format: string;
  /** Shown in the homepage rail (true) or under "More work" (false). */
  featured: boolean;
  summary: string;
  cover: Media;
  poster: Media;
  /** Muted hover / in-view preview clip. */
  video: string | null;
  aspect: Aspect;
  challenge: string;
  role: string;
  approach: string;
  deliverables: string[];
  /** Real figures only. First entry shows on the work card. */
  results: ProjectResult[];
  gallery: Media[];
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "millionaire-brain",
    title: "Building my own audience from zero",
    client: "Millionaire Brain",
    industry: "Personal brand \u00b7 Self-development",
    year: "Since 2023",
    format: "Reels \u00b7 Own brand",
    featured: true,
    summary: "My own self-development brand across Instagram, TikTok and YouTube \u2014 scripted, shot, edited and grown from zero.",
    cover: { src: "/media/projects/millionaire-brain/vid-1.webp", alt: "Millionaire Brain reel", width: 720, height: 1280 },
    poster: { src: "/media/projects/millionaire-brain/vid-1.webp", alt: "Millionaire Brain reel", width: 720, height: 1280 },
    video: "/media/projects/millionaire-brain/vid-1-preview.mp4",
    aspect: "9:16",
    challenge: "Prove that the editing, the hooks and the strategy work on an account with no budget and no audience to start from.",
    role: "Everything \u2014 concept, scripting, editing, publishing and growth across Instagram, TikTok and YouTube.",
    approach: "Short, fast reels with a hard hook in the first second, bold Arabic captions on screen and an aspirational visual world \u2014 published consistently and iterated on what the insights showed.",
    deliverables: [
      "Daily short-form reels",
      "Arabic caption system",
      "Cross-platform publishing (IG, TikTok, YouTube)",
      "Analytics-driven iteration",
    ],
    results: [
      { value: "50M+", label: "Organic views" },
      { value: "90K+", label: "Followers" },
      { value: "5.8M", label: "Plays on one reel" },
      { value: "794K", label: "Plays on another" },
    ],
    gallery: [
      { src: "/media/projects/millionaire-brain/vid-1.webp", video: "/media/projects/millionaire-brain/vid-1.mp4", alt: "Millionaire Brain reel", width: 720, height: 1280 },
      { src: "/media/projects/millionaire-brain/vid-10-b.webp", video: "/media/projects/millionaire-brain/vid-10-b.mp4", alt: "Millionaire Brain reel", width: 720, height: 1280 },
      { src: "/media/projects/millionaire-brain/vid-13.webp", video: "/media/projects/millionaire-brain/vid-13.mp4", alt: "Millionaire Brain reel", width: 720, height: 1280 },
      { src: "/media/projects/millionaire-brain/vid-15.webp", video: "/media/projects/millionaire-brain/vid-15.mp4", alt: "Millionaire Brain reel", width: 720, height: 1280 },
      { src: "/media/projects/millionaire-brain/vid-17-a.webp", video: "/media/projects/millionaire-brain/vid-17-a.mp4", alt: "Millionaire Brain reel", width: 720, height: 1280 },
      { src: "/media/projects/millionaire-brain/vid-17-b.webp", video: "/media/projects/millionaire-brain/vid-17-b.mp4", alt: "Millionaire Brain reel", width: 720, height: 1280 },
      { src: "/media/projects/millionaire-brain/reel-thumb-01.webp", alt: "Reel with its play count on Instagram", width: 481, height: 427 },
      { src: "/media/projects/millionaire-brain/reel-thumb-02.webp", alt: "Reel with its play count on Instagram", width: 482, height: 429 },
      { src: "/media/projects/millionaire-brain/reel-thumb-03.webp", alt: "Reel with its play count on Instagram", width: 241, height: 421 },
      { src: "/media/projects/millionaire-brain/reel-thumb-04.webp", alt: "Reel with its play count on Instagram", width: 243, height: 423 },
      { src: "/media/projects/millionaire-brain/reel-thumb-05.webp", alt: "Reel with its play count on Instagram", width: 247, height: 433 },
      { src: "/media/projects/millionaire-brain/reel-thumb-06.webp", alt: "Reel with its play count on Instagram", width: 248, height: 424 },
      { src: "/media/projects/millionaire-brain/reel-thumb-07.webp", alt: "Reel with its play count on Instagram", width: 241, height: 424 },
      { src: "/media/projects/millionaire-brain/insight-01.webp", alt: "Instagram insights \u2014 plays and likes", width: 540, height: 1140 },
      { src: "/media/projects/millionaire-brain/insight-02.webp", alt: "Instagram insights \u2014 plays and likes", width: 540, height: 1140 },
      { src: "/media/projects/millionaire-brain/insight-03.webp", alt: "Instagram insights \u2014 plays and likes", width: 540, height: 1140 },
      { src: "/media/projects/millionaire-brain/insight-04.webp", alt: "Instagram insights \u2014 plays and likes", width: 540, height: 1140 },
      { src: "/media/projects/millionaire-brain/insight-05.webp", alt: "Instagram insights \u2014 plays and likes", width: 540, height: 1140 },
      { src: "/media/projects/millionaire-brain/insight-06.webp", alt: "Instagram insights \u2014 plays and likes", width: 540, height: 1140 },
      { src: "/media/projects/millionaire-brain/insight-07.webp", alt: "Instagram insights \u2014 plays and likes", width: 540, height: 1140 },
      { src: "/media/projects/millionaire-brain/insight-08.webp", alt: "Instagram insights \u2014 plays and likes", width: 540, height: 1140 },
      { src: "/media/projects/millionaire-brain/insight-09.webp", alt: "Instagram insights \u2014 plays and likes", width: 540, height: 1140 },
      { src: "/media/projects/millionaire-brain/insight-10.webp", alt: "Instagram insights \u2014 plays and likes", width: 540, height: 1140 },
    ],
    accent: "#87ceeb",
  },
  {
    slug: "adib-waez",
    title: "Podcast moments cut into reels",
    client: "Adib Waez",
    industry: "Creator \u00b7 Self-development",
    year: "Freelance",
    format: "Reels \u00b7 Podcast clips",
    featured: true,
    summary: "Clips from Adib Waez's long-form talks, re-cut for vertical with tight pacing and word-by-word Arabic captions.",
    cover: { src: "/media/projects/adib-waez/reel-1.webp", alt: "Adib Waez reel", width: 720, height: 1280 },
    poster: { src: "/media/projects/adib-waez/reel-1.webp", alt: "Adib Waez reel", width: 720, height: 1280 },
    video: "/media/projects/adib-waez/reel-1-preview.mp4",
    aspect: "9:16",
    challenge: "Long podcast conversations hold great moments, but nobody scrolling will sit through an hour to find them.",
    role: "Clip selection, editing, captions and sound for short-form.",
    approach: "Find the line that stands on its own, open on it, cut every pause, and carry the viewer with large word-by-word Arabic captions synced to the voice.",
    deliverables: [
      "Vertical podcast clips",
      "Word-by-word Arabic captions",
      "Sound clean-up and music",
      "Thumbnail frames",
    ],
    results: [],
    gallery: [
      { src: "/media/projects/adib-waez/reel-1.webp", video: "/media/projects/adib-waez/reel-1.mp4", alt: "Adib Waez reel 1", width: 720, height: 1280 },
      { src: "/media/projects/adib-waez/reel-2.webp", video: "/media/projects/adib-waez/reel-2.mp4", alt: "Adib Waez reel 2", width: 720, height: 1280 },
      { src: "/media/projects/adib-waez/reel-3.webp", video: "/media/projects/adib-waez/reel-3.mp4", alt: "Adib Waez reel 3", width: 720, height: 1280 },
      { src: "/media/projects/adib-waez/reel-4.webp", video: "/media/projects/adib-waez/reel-4.mp4", alt: "Adib Waez reel 4", width: 720, height: 1280 },
      { src: "/media/projects/adib-waez/channel.webp", alt: "Adib Waez YouTube channel", width: 720, height: 1558 },
    ],
    accent: "#87ceeb",
  },
  {
    slug: "jtech",
    title: "Showroom reels for a phone & car dealer",
    client: "J-Tech Media Service \u00b7 J-Tech Auto",
    industry: "Tech retail \u00b7 Automotive",
    year: "2026",
    format: "Reels \u00b7 On-site shoots",
    featured: true,
    summary: "On-location reels for J-Tech \u2014 new iPhone arrivals, customer moments and car deliveries at J-Tech Auto.",
    cover: { src: "/media/projects/jtech/clip-01.webp", alt: "J-Tech reel", width: 480, height: 853 },
    poster: { src: "/media/projects/jtech/clip-01.webp", alt: "J-Tech reel", width: 480, height: 853 },
    video: null,
    aspect: "9:16",
    challenge: "A retailer has to show up in the feed every week with something new \u2014 without it turning into a catalogue.",
    role: "Shooting, editing and social content for J-Tech Media Service and J-Tech Auto.",
    approach: "Film real moments in the store and on the street \u2014 unboxings, customers, deliveries \u2014 and edit them like creator content rather than ads.",
    deliverables: [
      "On-site reel shoots",
      "Product and delivery reels",
      "Edits for Instagram and TikTok",
    ],
    results: [],
    gallery: [
      { src: "/media/projects/jtech/clip-01.webp", alt: "J-Tech reel frame", width: 480, height: 853 },
      { src: "/media/projects/jtech/clip-02.webp", alt: "J-Tech reel frame", width: 480, height: 853 },
      { src: "/media/projects/jtech/clip-03.webp", alt: "J-Tech reel frame", width: 480, height: 853 },
      { src: "/media/projects/jtech/clip-04.webp", alt: "J-Tech reel frame", width: 480, height: 853 },
      { src: "/media/projects/jtech/clip-05.webp", alt: "J-Tech reel frame", width: 480, height: 853 },
      { src: "/media/projects/jtech/clip-06.webp", alt: "J-Tech reel frame", width: 480, height: 853 },
      { src: "/media/projects/jtech/clip-07.webp", alt: "J-Tech reel frame", width: 480, height: 853 },
      { src: "/media/projects/jtech/instagram.webp", alt: "J-Tech Media Service Instagram profile", width: 720, height: 1558 },
    ],
    accent: "#87ceeb",
  },
  {
    slug: "lyceum-club",
    title: "Launching a university club from zero",
    client: "Lyceum Scientific & Technical Club",
    industry: "Education \u00b7 Community",
    year: "2026",
    format: "Reels \u00b7 Launch campaign",
    featured: true,
    summary: "Media lead for a new university club: event coverage, launch reels and the whole social presence.",
    cover: { src: "/media/projects/lyceum/clip-01.webp", alt: "Lyceum Club reel", width: 480, height: 853 },
    poster: { src: "/media/projects/lyceum/clip-01.webp", alt: "Lyceum Club reel", width: 480, height: 853 },
    video: null,
    aspect: "9:16",
    challenge: "A brand-new club with no audience needed to become visible on campus \u2014 fast.",
    role: "Media & Content Management Lead \u2014 digital launch strategy, filming and editing.",
    approach: "Cover every event as it happens \u2014 workshops, school visits, Climate Day \u2014 and turn each one into a reel the members want to share.",
    deliverables: [
      "Launch strategy",
      "Event coverage reels",
      "Social media management",
    ],
    results: [
      { value: "25K", label: "Views in 2 months" },
      { value: "3K+", label: "Organic followers" },
    ],
    gallery: [
      { src: "/media/projects/lyceum/clip-01.webp", alt: "Lyceum Club reel frame", width: 480, height: 853 },
      { src: "/media/projects/lyceum/clip-02.webp", alt: "Lyceum Club reel frame", width: 480, height: 853 },
      { src: "/media/projects/lyceum/clip-03.webp", alt: "Lyceum Club reel frame", width: 480, height: 853 },
      { src: "/media/projects/lyceum/clip-04.webp", alt: "Lyceum Club reel frame", width: 480, height: 853 },
      { src: "/media/projects/lyceum/clip-05.webp", alt: "Lyceum Club reel frame", width: 480, height: 270 },
      { src: "/media/projects/lyceum/clip-06.webp", alt: "Lyceum Club reel frame", width: 480, height: 270 },
      { src: "/media/projects/lyceum/clip-07.webp", alt: "Lyceum Club reel frame", width: 480, height: 270 },
    ],
    accent: "#87ceeb",
  },
  {
    slug: "glamrdip",
    title: "Ads that make the product obvious",
    client: "Glamrdip Australia",
    industry: "Beauty \u00b7 E-commerce",
    year: "Freelance",
    format: "Ads \u00b7 Product demos",
    featured: true,
    summary: "Short product ads for an Australian dip-powder nail brand \u2014 before/after, demos and tutorials.",
    cover: { src: "/media/projects/glamrdip/clip-01.webp", alt: "Glamrdip ad", width: 360, height: 480 },
    poster: { src: "/media/projects/glamrdip/clip-01.webp", alt: "Glamrdip ad", width: 360, height: 480 },
    video: null,
    aspect: "3:4",
    challenge: "Dip-powder nails are new to most buyers \u2014 the ad has to show how it works and how it looks in seconds.",
    role: "Video editing for paid and organic social.",
    approach: "Split-screen comparisons, close-up application shots and clean on-screen text that explains the product without a voice-over.",
    deliverables: [
      "Paid social ads",
      "Product demo edits",
      "YouTube tutorials",
    ],
    results: [],
    gallery: [
      { src: "/media/projects/glamrdip/clip-01.webp", alt: "Glamrdip ad frame", width: 360, height: 480 },
      { src: "/media/projects/glamrdip/clip-02.webp", alt: "Glamrdip ad frame", width: 360, height: 450 },
      { src: "/media/projects/glamrdip/clip-03.webp", alt: "Glamrdip ad frame", width: 360, height: 360 },
      { src: "/media/projects/glamrdip/clip-04.webp", alt: "Glamrdip ad frame", width: 360, height: 360 },
      { src: "/media/projects/glamrdip/clip-05.webp", alt: "Glamrdip ad frame", width: 360, height: 202 },
      { src: "/media/projects/glamrdip/channel.webp", alt: "Glamrdip YouTube channel", width: 720, height: 1558 },
    ],
    accent: "#87ceeb",
  },
  {
    slug: "dopamicafeine",
    title: "Video built around the funnel",
    client: "Dopamicafeine",
    industry: "Media \u00b7 Affiliate marketing",
    year: "2024",
    format: "Shorts \u00b7 Affiliate",
    featured: true,
    summary: "Arabic self-development shorts edited for Dopamicafeine, tied to their affiliate offers.",
    cover: { src: "/media/projects/dopamicafeine/clip-01.webp", alt: "Dopamicafeine short", width: 360, height: 630 },
    poster: { src: "/media/projects/dopamicafeine/clip-01.webp", alt: "Dopamicafeine short", width: 360, height: 630 },
    video: null,
    aspect: "9:16",
    challenge: "Content had to entertain and educate while still moving viewers toward the affiliate offer.",
    role: "Editing and affiliate content strategy.",
    approach: "Punchy Arabic captions, quick cuts and a clear call-to-action placed where attention peaks.",
    deliverables: [
      "YouTube Shorts and reels",
      "Caption design",
      "Affiliate content strategy",
    ],
    results: [],
    gallery: [
      { src: "/media/projects/dopamicafeine/clip-01.webp", alt: "Dopamicafeine short frame", width: 360, height: 630 },
      { src: "/media/projects/dopamicafeine/clip-02.webp", alt: "Dopamicafeine short frame", width: 360, height: 630 },
      { src: "/media/projects/dopamicafeine/clip-03.webp", alt: "Dopamicafeine short frame", width: 360, height: 630 },
      { src: "/media/projects/dopamicafeine/clip-04.webp", alt: "Dopamicafeine short frame", width: 360, height: 630 },
      { src: "/media/projects/dopamicafeine/clip-05.webp", alt: "Dopamicafeine short frame", width: 360, height: 630 },
      { src: "/media/projects/dopamicafeine/clip-06.webp", alt: "Dopamicafeine short frame", width: 360, height: 630 },
      { src: "/media/projects/dopamicafeine/channel.webp", alt: "Dopamicafeine YouTube channel", width: 720, height: 1558 },
    ],
    accent: "#87ceeb",
  },
  {
    slug: "pure-wear",
    title: "A streetwear drop on the street",
    client: "Pure Wear",
    industry: "Fashion",
    year: "2026",
    format: "Reel \u00b7 Fashion",
    featured: false,
    summary: "Lifestyle reel for the Pure Wear clothing brand, shot on location.",
    cover: { src: "/media/projects/pure-wear/clip-01.webp", alt: "Pure Wear reel", width: 480, height: 580 },
    poster: { src: "/media/projects/pure-wear/clip-01.webp", alt: "Pure Wear reel", width: 480, height: 580 },
    video: null,
    aspect: "4:5",
    challenge: "Make a small clothing brand look established on a lean shoot.",
    role: "Shooting and editing.",
    approach: "Natural street locations, movement and a confident edit that puts the logo in frame without forcing it.",
    deliverables: [
      "Fashion reel",
    ],
    results: [],
    gallery: [
      { src: "/media/projects/pure-wear/clip-01.webp", alt: "Pure Wear campaign frame", width: 480, height: 580 },
    ],
    accent: "#87ceeb",
  },
  {
    slug: "yr-smart-center",
    title: "Enrolment reels for a training school",
    client: "YR Smart Center",
    industry: "Education",
    year: "2026",
    format: "Reels \u00b7 Promo",
    featured: false,
    summary: "Promo reels for YR Smart Center's courses \u2014 programming, robotics, languages and career training.",
    cover: { src: "/media/projects/yr-smart-center/clip-01.webp", alt: "YR Smart Center reel", width: 360, height: 640 },
    poster: { src: "/media/projects/yr-smart-center/clip-01.webp", alt: "YR Smart Center reel", width: 360, height: 640 },
    video: null,
    aspect: "9:16",
    challenge: "Turn a list of courses into content that makes people want to sign up.",
    role: "Filming and editing.",
    approach: "Real students and staff on camera, the school as the set, and a clear message: your future starts here.",
    deliverables: [
      "Promo reels",
      "Talking-head edits",
    ],
    results: [],
    gallery: [
      { src: "/media/projects/yr-smart-center/clip-01.webp", alt: "YR Smart Center reel frame", width: 360, height: 640 },
      { src: "/media/projects/yr-smart-center/clip-02.webp", alt: "YR Smart Center reel frame", width: 360, height: 640 },
      { src: "/media/projects/yr-smart-center/clip-03.webp", alt: "YR Smart Center reel frame", width: 360, height: 640 },
      { src: "/media/projects/yr-smart-center/clip-04.webp", alt: "YR Smart Center reel frame", width: 360, height: 640 },
    ],
    accent: "#87ceeb",
  },
  {
    slug: "design",
    title: "Thumbnails & social design",
    client: "Various clients",
    industry: "Design",
    year: "2022\u20132023",
    format: "Thumbnails \u00b7 Carousels",
    featured: false,
    summary: "YouTube thumbnails, carousel posts, course ads and artwork \u2014 the design side of the work.",
    cover: { src: "/media/projects/design/01.webp", alt: "Thumbnail design", width: 1280, height: 1280 },
    poster: { src: "/media/projects/design/01.webp", alt: "Thumbnail design", width: 1280, height: 1280 },
    video: null,
    aspect: "1:1",
    challenge: "A video only performs if someone clicks it first.",
    role: "Graphic design.",
    approach: "High-contrast thumbnails, bold Arabic type and clean carousel systems built for the feed.",
    deliverables: [
      "YouTube thumbnails",
      "Instagram carousels",
      "Course and offer ads",
      "Gaming & anime artwork",
    ],
    results: [],
    gallery: [
      { src: "/media/projects/design/01.webp", alt: "Thumbnail and social design", width: 1280, height: 1280 },
      { src: "/media/projects/design/02.webp", alt: "Thumbnail and social design", width: 1280, height: 720 },
      { src: "/media/projects/design/03.webp", alt: "Thumbnail and social design", width: 1280, height: 1033 },
      { src: "/media/projects/design/04.webp", alt: "Thumbnail and social design", width: 1200, height: 720 },
      { src: "/media/projects/design/05.webp", alt: "Thumbnail and social design", width: 1280, height: 720 },
      { src: "/media/projects/design/06.webp", alt: "Thumbnail and social design", width: 1200, height: 720 },
      { src: "/media/projects/design/07.webp", alt: "Thumbnail and social design", width: 1280, height: 720 },
      { src: "/media/projects/design/08.webp", alt: "Thumbnail and social design", width: 1280, height: 721 },
      { src: "/media/projects/design/09.webp", alt: "Thumbnail and social design", width: 1280, height: 720 },
      { src: "/media/projects/design/10.webp", alt: "Thumbnail and social design", width: 1200, height: 1200 },
      { src: "/media/projects/design/11.webp", alt: "Thumbnail and social design", width: 1200, height: 1200 },
      { src: "/media/projects/design/12.webp", alt: "Thumbnail and social design", width: 720, height: 1280 },
      { src: "/media/projects/design/13.webp", alt: "Thumbnail and social design", width: 1080, height: 1350 },
      { src: "/media/projects/design/14.webp", alt: "Thumbnail and social design", width: 1080, height: 1350 },
      { src: "/media/projects/design/15.webp", alt: "Thumbnail and social design", width: 1080, height: 1350 },
      { src: "/media/projects/design/16.webp", alt: "Thumbnail and social design", width: 1080, height: 1350 },
      { src: "/media/projects/design/17.webp", alt: "Thumbnail and social design", width: 1080, height: 1350 },
      { src: "/media/projects/design/18.webp", alt: "Thumbnail and social design", width: 1080, height: 1350 },
      { src: "/media/projects/design/19.webp", alt: "Thumbnail and social design", width: 1080, height: 1080 },
      { src: "/media/projects/design/20.webp", alt: "Thumbnail and social design", width: 1080, height: 1080 },
      { src: "/media/projects/design/21.webp", alt: "Thumbnail and social design", width: 1280, height: 1280 },
      { src: "/media/projects/design/22.webp", alt: "Thumbnail and social design", width: 1280, height: 720 },
    ],
    accent: "#87ceeb",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const moreProjects = projects.filter((project) => !project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

export const aspectRatio: Record<Aspect, string> = {
  "9:16": "9 / 16",
  "3:4": "3 / 4",
  "4:5": "4 / 5",
  "1:1": "1 / 1",
  "16:9": "16 / 9",
};
