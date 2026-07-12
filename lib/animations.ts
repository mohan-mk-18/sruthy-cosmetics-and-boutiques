/**
 * Central animation system for Sruthy Cosmetics And Boutiques.
 * Every Framer Motion variant on the site is composed from these primitives
 * so motion stays consistent across pages. Import from here — do not
 * hand-write one-off durations/easings in components.
 */
import type { Variants, Transition } from "framer-motion";

// Durations (ms), per design brief.
export const DURATION = {
  subtle: 0.15,
  default: 0.3,
  extended: 0.6,
  slow: 0.9,
} as const;

// Signature easing curve: a soft editorial ease-out (no linear/bounce — stays elegant).
export const EASE = [0.22, 1, 0.36, 1] as const;

export const transition = (duration: number = DURATION.default, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE,
});

/** Page-level enter/exit transition used by the root template. */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: transition(DURATION.extended),
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: transition(DURATION.default),
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition(DURATION.extended) },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: transition(DURATION.extended) },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: transition(DURATION.extended) },
};

/** Staggered container for reveal-on-scroll sections with multiple children. */
export const staggerContainer = (stagger = 0.12, delayChildren = 0.05): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Card hover: elevation lift + soft shadow (paired with image scale + glass sweep in ProductCard). */
export const hoverLift = {
  rest: { y: 0, boxShadow: "0 8px 24px -12px rgba(30,30,30,0.14)" },
  hover: {
    y: -8,
    boxShadow: "0 20px 45px -20px rgba(30,30,30,0.24)",
    transition: transition(DURATION.default),
  },
};

export const imageScaleOnHover = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: transition(DURATION.extended) },
};

/** Subtle parallax offset for hero imagery / cursor-follow product shots. Feed with motion values. */
export const parallax = {
  range: 18, // max px offset
};

/** Lightbox open/close: scale + fade, per animation priority list. */
export const lightboxVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transition(DURATION.default) },
  exit: { opacity: 0, scale: 0.98, transition: transition(DURATION.subtle) },
};

/** Floating action buttons (Instagram/WhatsApp/Call): entrance + idle pulse. */
export const floatingEntrance: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: transition(DURATION.default, 0.4 + i * 0.08),
  }),
};

/** Count-up numeric stat reveal — pair with a JS count-up hook on `whileInView`. */
export const countUpTrigger: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: transition(DURATION.default) },
};

/** Respect prefers-reduced-motion: call from client components before animating. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Returns a reduced-motion-safe variant set — replaces movement with plain opacity. */
export function safeVariants(v: Variants): Variants {
  if (!prefersReducedMotion()) return v;
  const safe: Variants = {};
  for (const key of Object.keys(v)) {
    safe[key] = { opacity: key === "hidden" ? 0 : 1, transition: { duration: 0.01 } };
  }
  return safe;
}

export const viewportOnce = { once: true, margin: "-80px" } as const;
