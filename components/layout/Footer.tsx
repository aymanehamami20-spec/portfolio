import Link from "next/link";
import { contact, site, socials } from "@/content/site";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/12 bg-[rgba(7,32,46,.62)] backdrop-blur-md">
      <div className="shell flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/"
            className="display text-[1.35rem] font-semibold tracking-tight text-white"
          >
            AH<span className="text-[var(--sky)]">.</span>
          </Link>
          <p className="muted mt-2 text-sm">
            {site.name} — {site.roleLong}
          </p>
          <p className="mt-1 text-sm text-white/70">
            {site.location} · {site.handle}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white/75 transition-colors hover:text-[var(--sky)]"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-white/8 py-5 text-[0.78rem] text-white/65 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-[var(--sky)]"
        >
          {contact.phoneDisplay}
        </a>
      </div>
    </footer>
  );
}
