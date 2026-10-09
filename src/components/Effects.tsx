"use client";

import { useLayoutEffect } from "react";

/** Page-wide progressive enhancements: scroll reveal, card spotlight, animated counters. */
export function Effects({ locale }: { locale: string }) {
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
    const counters = document.querySelectorAll<HTMLElement>("[data-count]");

    if (reduced) return;

    // Items already on screen stay visible; only the rest get hidden and animated in
    const viewportBottom = window.innerHeight;
    reveals.forEach((el) => {
      if (el.getBoundingClientRect().top < viewportBottom) el.classList.add("in");
    });
    document.documentElement.classList.add("reveal-ready");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    reveals.forEach((el) => revealObserver.observe(el));

    const format = new Intl.NumberFormat(locale);
    const counterObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          counterObserver.unobserve(el);
          const target = Number(el.dataset.count);
          const start = performance.now();
          const duration = 1400;
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = format.format(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.6 },
    );
    counters.forEach((el) => counterObserver.observe(el));

    const onPointerMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>(".card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      document.documentElement.classList.remove("reveal-ready");
      revealObserver.disconnect();
      counterObserver.disconnect();
      document.removeEventListener("pointermove", onPointerMove);
    };
  }, [locale]);

  return null;
}
