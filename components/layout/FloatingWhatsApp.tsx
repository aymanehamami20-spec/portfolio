"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { contact } from "@/content/site";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Always-reachable WhatsApp button on small screens (PRD §15). The hero carries
 * no CTA of its own and the nav pill is hidden below `sm`, so this is the only
 * WhatsApp affordance on a phone — it appears immediately rather than waiting
 * for the hero to scroll away.
 */
export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  // Mount-in rather than scroll-in, so it never blocks the first paint.
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <motion.a
      href={contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-glossy fixed right-4 bottom-4 z-[110] flex h-14 w-14 items-center justify-center rounded-full sm:hidden"
      aria-label={`${contact.whatsappLabel} — opens WhatsApp`}
      initial={false}
      animate={
        visible
          ? { opacity: 1, scale: 1, pointerEvents: "auto" }
          : { opacity: 0, scale: 0.7, pointerEvents: "none" }
      }
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
    >
      <MessageCircle size={24} aria-hidden="true" />
    </motion.a>
  );
}
