/**
 * Single source of truth for every non-project string on the site.
 * Values come from the PRD — do not add statistics, clients or testimonials
 * that are not listed there.
 */

export const site = {
  name: "Aymen Hammami",
  firstName: "Aymen",
  handle: "@ah.cutos",
  role: "Video Editor & Social Media Manager",
  roleLong: "Social Media Manager · Content Creator · Video Editor",
  location: "Batna, Algeria",
  yearsExperience: 6,
  url: "https://aymenhammami.com",

  kicker: "Hire me as a professional",
  positioning:
    "I turn ideas and business needs into content that gets attention, builds audiences and drives growth.",
  aboutStory:
    "6 years in the game. From short-form content and editing to social media management and growth, I adapt to the situation, find the solution and execute.",
  aboutDifferentiator:
    "I'm a solution finder. I can adapt to any situation at work.",
  metaDescription:
    "Aymen Hammami (@ah.cutos) — Social Media Manager, Content Creator and Video Editor in Batna, Algeria. 6 years turning short-form content into 50M+ views and 2M+ followers.",
} as const;

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

const whatsappNumber = "213673005578";
const whatsappMessage =
  "Hi Aymen, I saw your portfolio and I'd like to work with you.";

export const contact = {
  phoneDisplay: "0673005578",
  phoneHref: "tel:+213673005578",
  email: "aymanehamami20@gmail.com",
  emailHref: "mailto:aymanehamami20@gmail.com",
  whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  whatsappLabel: "WhatsApp Me",
} as const;

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
};

export const socials: SocialLink[] = [
  {
    label: "Instagram",
    handle: "@ah.cutos",
    href: "https://instagram.com/ah.cutos",
  },
  {
    label: "LinkedIn",
    handle: "Aymen Hammami",
    href: "https://linkedin.com/in/aymen-hammami-ba4aba39a",
  },
  { label: "WhatsApp", handle: "0673005578", href: contact.whatsapp },
  { label: "Email", handle: "aymanehamami20@gmail.com", href: contact.emailHref },
];

/* ------------------------------------------------------------------ */
/* Results — PRD §06. These six figures are the only numbers on site.  */
/* ------------------------------------------------------------------ */

export type Stat = {
  /** Numeric target for the count-up animation. */
  value: number;
  /** Rendered after the number, e.g. "M+". */
  suffix: string;
  /** Rendered before the number, e.g. "$". */
  prefix?: string;
  label: string;
  note?: string;
};

export const stats: Stat[] = [
  { value: 50, suffix: "M+", label: "Views generated" },
  { value: 2, suffix: "M+", label: "Followers generated & managed" },
  { value: 120, suffix: "M+", label: "Engagement" },
  { value: 100, suffix: "+", label: "Products above $1,000" },
  { value: 2000, suffix: "+", label: "Products below $100" },
  { value: 6, suffix: "", label: "Years in the game" },
];

/** The three headline figures used in the hero card. */
export const heroStats: Stat[] = stats.slice(0, 3);

/* ------------------------------------------------------------------ */
/* Services — PRD §04 (nine services, no additions)                    */
/* ------------------------------------------------------------------ */

export type Service = {
  id: string;
  title: string;
  line: string;
  /** Looping mini clip shown on expand. null renders a labelled placeholder. */
  clip: string | null;
  poster: string | null;
};

export const services: Service[] = [
  {
    id: "smm",
    title: "Social Media Management",
    line: "Full account ownership — calendar, publishing, community and reporting.",
    clip: null,
    poster: "/media/projects/jtech/clip-01.webp",
  },
  {
    id: "content-strategy",
    title: "Content Strategy",
    line: "A content system built around the business goal, not around the algorithm.",
    clip: null,
    poster: "/media/projects/millionaire-brain/insight-01.webp",
  },
  {
    id: "short-form",
    title: "Reels & TikTok / Short-Form",
    line: "Vertical content built to stop the scroll in the first second.",
    clip: "/media/projects/millionaire-brain/vid-13-preview.mp4",
    poster: "/media/projects/millionaire-brain/vid-13.webp",
  },
  {
    id: "video-editing",
    title: "Video Editing",
    line: "Pacing, sound design, motion and grade — edited to hold attention to the end.",
    clip: "/media/projects/adib-waez/reel-2-preview.mp4",
    poster: "/media/projects/adib-waez/reel-2.webp",
  },
  {
    id: "photography",
    title: "Photography",
    line: "Product and lifestyle stills shot and retouched for feed and paid use.",
    clip: null,
    poster: "/media/projects/pure-wear/clip-01.webp",
  },
  {
    id: "account-growth",
    title: "Account Growth",
    line: "Compounding output and iteration on what the data says is working.",
    clip: null,
    poster: "/media/projects/millionaire-brain/reel-thumb-01.webp",
  },
  {
    id: "hooks",
    title: "Hooks & Creative Concepts",
    line: "Concepts and openings written for the platform and the audience.",
    clip: null,
    poster: "/media/projects/dopamicafeine/clip-01.webp",
  },
  {
    id: "trend-research",
    title: "Trend Research",
    line: "Formats adapted to the brand before the trend peaks.",
    clip: null,
    poster: "/media/projects/lyceum/clip-01.webp",
  },
  {
    id: "problem-solving",
    title: "Creative Problem-Solving",
    line: "No brief, no crew, no time — I find the solution and execute.",
    clip: null,
    poster: "/media/projects/yr-smart-center/clip-01.webp",
  },
];

/* ------------------------------------------------------------------ */
/* Clients — PRD §07                                                   */
/*                                                                     */
/* TODO before publishing: verify the exact spelling of every name and */
/* get Aymen's confirmation that each client may be displayed publicly */
/* (and supply a logo file, otherwise the name renders as text).       */
/* ------------------------------------------------------------------ */

export type Client = {
  name: string;
  /** Path under /public/media/clients — null falls back to the name as text. */
  logo: string | null;
};

export const clients: Client[] = [
  { name: "Adib Waez", logo: "/media/clients/adib-waez.png" },
  { name: "Mike Thurston", logo: null },
  { name: "Dopamicafeine", logo: null },
  { name: "J-Tech Media Service", logo: "/media/clients/jtech.png" },
  { name: "J-Tech Auto", logo: "/media/clients/jtech-auto.png" },
  { name: "Glamrdip Australia", logo: "/media/clients/glamrdip.png" },
  { name: "Click-Buy DZ", logo: "/media/clients/click-buy-dz.png" },
  { name: "Lyceum Club", logo: "/media/clients/lyceum.png" },
  { name: "Pure Wear", logo: null },
  { name: "YR Smart Center", logo: null },
];

/** Channel / profile screenshots from the Drive ("People I worked with"). */
export const clientProof = [
  { name: "Mike Thurston", src: "/media/projects/clients/mike-thurston.webp" },
  { name: "Adib Waez", src: "/media/projects/adib-waez/channel.webp" },
  { name: "Dopamicafeine", src: "/media/projects/dopamicafeine/channel.webp" },
  { name: "Glamrdip", src: "/media/projects/glamrdip/channel.webp" },
  { name: "J-Tech Media Service", src: "/media/projects/jtech/instagram.webp" },
  { name: "Click-Buy DZ", src: "/media/projects/clients/click-buy-dz.webp" },
] as const;

/* ------------------------------------------------------------------ */
/* Industries — PRD §05                                                */
/* ------------------------------------------------------------------ */

export const industries = ["Fashion", "E-commerce", "Real Estate"] as const;

/* ------------------------------------------------------------------ */
/* Tools & production — PRD §11 (supporting proof, kept light)         */
/* ------------------------------------------------------------------ */

export const software = [
  "Premiere Pro",
  "After Effects",
  "Lightroom",
  "CapCut Pro",
  "Canva",
  "AI generators",
] as const;

export const gear = [
  "iPhone 16 Pro Max",
  "iPhone 15 Pro Max",
  "DJI Mini 3",
  "DJI 5",
] as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Results", href: "/#results" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

/* ------------------------------------------------------------------ */
/* Hero media                                                          */
/* ------------------------------------------------------------------ */

export const heroMedia = {
  /**
   * Transparent cut-out PNG of Aymen. Export it cropped tight to the subject —
   * transparent padding around the edges shrinks how large he renders.
   */
  portrait: "/media/hero/portrait.png" as string | null,
  portraitAlt: "Aymen Hammami",
  showreel: "/media/hero/showreel.mp4" as string | null,
  showreelPoster: "/media/hero/showreel.webp" as string | null,
  /** The current reel is a vertical (9:16) phone edit. */
  showreelVertical: true,
} as const;

/** Looping words on the arc ticker behind the portrait. */
export const tickerWords = [
  "HIRE ME AS A PROFESSIONAL",
  "REELS",
  "TIKTOK",
  "EDITING",
] as const;
