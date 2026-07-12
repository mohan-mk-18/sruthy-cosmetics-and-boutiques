"use client";

import { motion } from "framer-motion";
import { Instagram, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { telLink, whatsappLink } from "@/lib/utils";
import { floatingEntrance } from "@/lib/animations";

/**
 * Persistent floating action cluster: Instagram, WhatsApp, Call.
 * Anchored bottom-right on every page, positioned to never overlap
 * primary content (see `pb-24` spacer classes used on page footers).
 */
export default function FloatingActions() {
  const actions = [
    {
      key: "instagram",
      href: siteConfig.instagram,
      label: "Open Sruthy on Instagram",
      icon: Instagram,
      bg: "bg-gradient-rose",
      external: true,
    },
    {
      key: "whatsapp",
      href: whatsappLink(siteConfig.whatsapp),
      label: "Chat with Sruthy on WhatsApp",
      icon: MessageCircle,
      bg: "bg-[#25D366]",
      external: true,
    },
    {
      key: "call",
      href: telLink(siteConfig.phone),
      label: "Call Now",
      icon: Phone,
      bg: "bg-charcoal",
      external: false,
    },
  ];

  return (
    <div
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7"
      role="group"
      aria-label="Quick contact actions"
    >
      {actions.map((action, i) => {
        const Icon = action.icon;
        return (
          <motion.a
            key={action.key}
            href={action.href}
            aria-label={action.label}
            target={action.external ? "_blank" : undefined}
            rel={action.external ? "noopener noreferrer" : undefined}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={floatingEntrance}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`grid h-12 w-12 place-items-center rounded-full text-luxury-white shadow-soft animate-pulse-soft ${action.bg}`}
          >
            <Icon size={20} aria-hidden="true" />
          </motion.a>
        );
      })}
    </div>
  );
}
