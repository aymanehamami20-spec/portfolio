"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, MessageCircle, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { contact, navLinks } from "@/content/site";
import { lockScroll, scrollToId, unlockScroll } from "@/lib/scroll";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Minimal sticky nav that turns glass once the page scrolls. */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    lockScroll();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [menuOpen]);

  /**
   * `/#work` from the home page is a same-route navigation: Next scrolls the
   * window itself and never changes the pathname, so Lenis is left holding a
   * stale target and the next wheel event lerps back. Drive those jumps
   * through Lenis instead, and let every other link navigate normally.
   */
  const handleAnchorClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const [path, id] = href.split("#");
      if (!id || (path || "/") !== pathname) return;
      if (!document.getElementById(id)) return;

      event.preventDefault();
      setMenuOpen(false);
      // Next frame, so closing the menu has released its scroll lock before
      // the scroll starts — Lenis ignores `scrollTo` while it is stopped.
      requestAnimationFrame(() => scrollToId(id));
    },
    [pathname],
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-[rgba(6,20,29,.78)] backdrop-blur-xl"
          : "border-b border-transparent",
      )}
      style={{ height: "var(--nav-h)" }}
    >
      <nav
        className="shell flex h-full items-center justify-between gap-4"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="display text-[1.35rem] font-semibold tracking-tight text-white"
          aria-label="Aymen Hammami — home"
        >
          AH<span className="text-[var(--sky)]">.</span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(event) => handleAnchorClick(event, link.href)}
                className="text-[0.9rem] font-medium text-white/75 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <ButtonLink
              href={contact.whatsapp}
              external
              variant="primary"
              size="md"
            >
              <MessageCircle size={16} aria-hidden="true" />
              {contact.whatsappLabel}
            </ButtonLink>
          </span>

          <button
            type="button"
            className="glass flex h-10 w-10 items-center justify-center rounded-full md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X size={18} aria-hidden="true" />
            ) : (
              <Menu size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="glass mx-4 mt-2 overflow-hidden rounded-[var(--radius-card)] p-4 md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(event) => {
                      setMenuOpen(false);
                      handleAnchorClick(event, link.href);
                    }}
                    className="block border-b border-white/8 py-3.5 text-[1.05rem] font-medium text-white/85 last:border-0"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink
              href={contact.whatsapp}
              external
              variant="primary"
              size="lg"
              className="mt-4 w-full"
              onClick={() => setMenuOpen(false)}
            >
              <MessageCircle size={18} aria-hidden="true" />
              {contact.whatsappLabel}
            </ButtonLink>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
