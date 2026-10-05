import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/layout/Loader";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import PageTransition from "@/components/layout/PageTransition";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { IntroProvider } from "@/components/providers/IntroProvider";
import { contact, site, socials } from "@/content/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

const clash = localFont({
  src: [
    { path: "./fonts/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-clash",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.metaDescription,
  keywords: [
    "video editor",
    "social media manager",
    "content creator",
    "Reels editor",
    "TikTok editor",
    "short-form content",
    "Batna",
    "Algeria",
    "Aymen Hammami",
    "ah.cutos",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.metaDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.metaDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#06141d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.handle,
  jobTitle: site.roleLong,
  description: site.metaDescription,
  url: site.url,
  email: contact.email,
  telephone: "+213673005578",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Batna",
    addressCountry: "DZ",
  },
  knowsAbout: [
    "Social media management",
    "Short-form video editing",
    "Content strategy",
    "Account growth",
  ],
  sameAs: socials
    .filter((social) => social.href.startsWith("http"))
    .map((social) => social.href),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${clash.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          // Static, author-controlled JSON-LD.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />

        <div className="bg-field" aria-hidden="true" />
        <div className="bg-grain" aria-hidden="true" />

        <IntroProvider>
          <SmoothScroll />
          <Loader />
          <PageTransition />

          <a href="#main" className="skip-link">
            Skip to content
          </a>

          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </IntroProvider>
      </body>
    </html>
  );
}
