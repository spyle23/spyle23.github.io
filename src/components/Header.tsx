"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/content/types";
import { asset } from "@/lib/site";
import { Icon } from "./Icon";

export function Header({ dict }: { dict: Dictionary }) {
  const { nav, locale } = dict;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", menuOpen);
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Highlight the nav link of the section currently in view
  useEffect(() => {
    const sections = nav.links
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [nav.links]);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <nav className="container nav" aria-label="Main">
        <a href={asset(locale === "fr" ? "/" : "/en/")} className="logo" aria-label="Andriatiana Jean-Marie">
          <span className="logo-mark">JM</span>
          <span className="logo-text">
            Jean-Marie<small>Full Stack Freelance</small>
          </span>
        </a>

        <ul className="nav-links" id="nav-links">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={active === link.href ? "active" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="nav-mobile-cta">
            <a href="#contact" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
              {nav.cta}
              <Icon name="arrow" />
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <div className="lang-switch" role="group" aria-label={nav.langLabel}>
            <a href={asset("/")} hrefLang="fr" lang="fr" aria-current={locale === "fr" ? "true" : undefined}>
              FR
            </a>
            <a href={asset("/en/")} hrefLang="en" lang="en" aria-current={locale === "en" ? "true" : undefined}>
              EN
            </a>
          </div>
          <button className="icon-btn theme-toggle" type="button" onClick={toggleTheme} aria-label={nav.theme}>
            <Icon name="moon" className="moon" />
            <Icon name="sun" className="sun" />
          </button>
          <a href="#contact" className="btn btn-primary btn-sm nav-cta">
            {nav.cta}
          </a>
          <button
            className="icon-btn menu-toggle"
            type="button"
            aria-label={nav.menu}
            aria-expanded={menuOpen}
            aria-controls="nav-links"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Icon name="menu" className="open" />
            <Icon name="close" className="close" />
          </button>
        </div>
      </nav>
    </header>
  );
}
