"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/animations";

/**
 * Subtle circular cursor that scales up over hoverable elements.
 * Desktop / fine-pointer only — hidden on touch via CSS (see globals.css).
 * Renders nothing that interferes with keyboard navigation or screen readers.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const el = ref.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      el.style.top = `${e.clientY}px`;
      el.style.left = `${e.clientX}px`;
    };

    const onEnter = () => {
      el.style.width = "42px";
      el.style.height = "42px";
      el.style.backgroundColor = "rgba(197, 124, 138, 0.12)";
    };
    const onLeave = () => {
      el.style.width = "22px";
      el.style.height = "22px";
      el.style.backgroundColor = "transparent";
    };

    window.addEventListener("mousemove", move);
    const hoverables = document.querySelectorAll("a, button, [data-cursor-hover]");
    hoverables.forEach((h) => {
      h.addEventListener("mouseenter", onEnter);
      h.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      hoverables.forEach((h) => {
        h.removeEventListener("mouseenter", onEnter);
        h.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return <div ref={ref} className="custom-cursor" aria-hidden="true" />;
}
