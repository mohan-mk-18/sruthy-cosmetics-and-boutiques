"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { transition } from "@/lib/animations";

/**
 * Sticky, glassmorphic navbar. Hides on scroll-down, reappears on scroll-up.
 * Category items with `children` expand into a mega-menu on hover (desktop)
 * or an accordion (mobile). Fully keyboard-operable.
 */
export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 12);
    if (y > lastY.current && y > 120) setHidden(true);
    else setHidden(false);
    lastY.current = y;
  });

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenMega(null);
  }, [pathname]);

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={transition(0.3)}
      className={cn(
        "fixed inset-x-0 top-0 z-50 glass-navbar",
        scrolled ? "shadow-soft-sm" : "shadow-none"
      )}
    >
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <nav
        aria-label="Primary"
        className="container flex h-20 items-center justify-between"
      >
        <Link
          href="/"
          className="font-display text-lg tracking-wide text-charcoal sm:text-2xl"
        >
          Sruthy <span className="italic text-rose-gold">Cosmetics</span> &amp; Boutiques
        </Link>

        {/* Desktop nav */}
        <ul className="relative hidden items-center gap-8 lg:flex">
          {siteConfig.nav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenMega(item.label)}
                onMouseLeave={() => item.children && setOpenMega(null)}
              >
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  aria-expanded={item.children ? openMega === item.label : undefined}
                  className="flex items-center gap-1 font-body text-sm font-medium text-charcoal/80 transition-colors duration-300 hover:text-rose-gold"
                >
                  {item.label}
                  {item.children && <ChevronDown size={14} aria-hidden="true" />}
                </Link>

                {/* Animated active indicator */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute -bottom-2 left-0 h-[2px] w-full bg-gradient-rose"
                  />
                )}

                {/* Mega-menu */}
                <AnimatePresence>
                  {item.children && openMega === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={transition(0.2)}
                      className="glass-panel absolute left-1/2 top-full mt-3 w-72 -translate-x-1/2 rounded-card p-4 shadow-soft"
                    >
                      <ul className="grid gap-1">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className="block rounded-lg px-3 py-2 text-sm text-charcoal/80 transition-colors hover:bg-blush/50 hover:text-charcoal"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-luxury-white shadow-soft-sm transition-transform duration-300 hover:-translate-y-0.5"
          >
            {siteConfig.ctas.visitStore}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transition(0.3)}
            className="overflow-hidden glass-navbar lg:hidden"
          >
            <ul className="container flex flex-col gap-1 pb-6">
              {siteConfig.nav.map((item) => (
                <li key={item.label}>
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-2 py-3 text-base font-medium text-charcoal">
                      <Link href={item.href}>{item.label}</Link>
                      {item.children && (
                        <ChevronDown
                          size={16}
                          className="transition-transform group-open:rotate-180"
                          aria-hidden="true"
                        />
                      )}
                    </summary>
                    {item.children && (
                      <ul className="ml-3 flex flex-col gap-1 border-l border-blush pl-4">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className="block rounded-lg px-2 py-2 text-sm text-charcoal/75"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </details>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="block rounded-full bg-coral px-5 py-3 text-center text-sm font-semibold text-luxury-white"
                >
                  {siteConfig.ctas.visitStore}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
