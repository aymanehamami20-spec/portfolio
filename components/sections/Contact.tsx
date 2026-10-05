import { ArrowUpRight, MessageCircle } from "lucide-react";
import ChromeText from "@/components/ui/ChromeText";
import Magnetic from "@/components/ui/Magnetic";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import SkyGlow from "@/components/ui/SkyGlow";
import { contact, site, socials } from "@/content/site";

/** Contact (PRD §10.08) — one conversion target: WhatsApp. */
export default function Contact() {
  const directLinks = socials.filter((social) => social.label !== "WhatsApp");

  return (
    <section
      id="contact"
      className="section-pad relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Sky bloom anchoring the final screen, echoing the hero. */}
      <SkyGlow
        className="bottom-[-46%] left-1/2 h-[38rem] w-[56rem] -translate-x-1/2"
        intensity={0.32}
        blur="100px"
      />

      <div className="shell relative flex flex-col items-center text-center">
        <Reveal>
          <p className="eyebrow">08 — Contact</p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 id="contact-heading" className="display display-lg mt-5">
            <ChromeText>Let&rsquo;s work.</ChromeText>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="muted mt-5 max-w-lg text-pretty sm:text-[1.05rem]">
            Tell me the goal and the deadline. I&rsquo;ll tell you what
            I&rsquo;d make and how fast it ships.
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mt-9 w-full sm:w-auto">
          <Magnetic className="w-full sm:w-auto">
            <ButtonLink
              href={contact.whatsapp}
              external
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <MessageCircle size={18} aria-hidden="true" />
              {contact.whatsappLabel}
            </ButtonLink>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.24} className="mt-4">
          <a
            href={contact.emailHref}
            className="text-[clamp(1.05rem,3vw,1.5rem)] font-semibold text-white/90 underline decoration-white/20 underline-offset-[6px] transition-colors hover:text-[var(--sky)] hover:decoration-[var(--sky)]/50"
          >
            {contact.email}
          </a>
        </Reveal>

        <Reveal delay={0.3} className="mt-10 w-full">
          <ul className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-2.5">
            {directLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="glass group flex items-center gap-2 rounded-full px-4 py-2.5 text-[0.85rem] font-medium text-white/80 transition hover:border-white/35 hover:text-white"
                >
                  {social.label}
                  <span className="text-white/70">{social.handle}</span>
                  <ArrowUpRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.36}>
          <p className="muted mt-8 text-[0.85rem]">
            {site.location} · Clients in Algeria and internationally
          </p>
        </Reveal>
      </div>
    </section>
  );
}
