import type { IconName } from "@/components/Icon";

export type Locale = "fr" | "en";

/** Texts may contain **bold** segments, rendered by <Rich />. */
export type RichText = string;

export interface TerminalLine {
  text: string;
  tone?: "prompt" | "dim" | "ok" | "info" | "warn" | "purple";
}

export interface Service {
  icon: IconName;
  title: string;
  text: string;
  points: string[];
  ideal: string;
}

export interface Project {
  id: string;
  visual: "spa" | "hotel" | "golt" | "ngo";
  icon: IconName;
  tag: string;
  metric: string;
  metricLabel: string;
  meta: string[];
  title: string;
  pitch: string;
  points: RichText[];
  stack: string[];
}

export interface Job {
  period: string;
  duration: string;
  role: string;
  company: string;
  sector: string;
  points: string[];
  stack: string[];
}

export interface Dictionary {
  locale: Locale;
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogAlt: string;
  };
  nav: {
    skip: string;
    links: { href: string; label: string }[];
    cta: string;
    menu: string;
    theme: string;
    langLabel: string;
  };
  hero: {
    status: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    lead: RichText;
    ctaPrimary: string;
    ctaSecondary: string;
    meta: { icon: IconName; text: string }[];
    terminalTitle: string;
    terminal: TerminalLine[];
    profileRole: string;
  };
  marquee: string[];
  stats: { value: number; prefix?: string; suffix?: string; label: string }[];
  services: {
    eyebrow: string;
    title: string;
    text: string;
    items: Service[];
  };
  projects: {
    eyebrow: string;
    title: string;
    text: string;
    items: Project[];
    gallery: { open: string; close: string; prev: string; next: string; of: string };
    moreTitle: string;
    more: { icon: IconName; title: string; text: string }[];
  };
  ai: {
    eyebrow: string;
    title: string;
    text: string;
    benefits: RichText[];
    steps: { title: string; detail: string; badge: string }[];
  };
  experience: {
    eyebrow: string;
    title: string;
    text: string;
    jobs: Job[];
  };
  process: {
    eyebrow: string;
    title: string;
    text: string;
    steps: { title: string; text: string; time: string }[];
  };
  why: {
    eyebrow: string;
    title: string;
    items: { icon: IconName; title: string; text: string }[];
  };
  stack: {
    eyebrow: string;
    title: string;
    text: string;
    groups: { title: string; key: string[]; other: string[] }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    emailLabel: string;
    linkedinLabel: string;
    githubLabel: string;
    copy: string;
    copied: string;
    cvLabel: string;
    cvOther: string;
    form: {
      name: string;
      namePh: string;
      email: string;
      emailPh: string;
      type: string;
      types: string[];
      budget: string;
      budgets: string[];
      timeline: string;
      timelines: string[];
      message: string;
      messagePh: string;
      submit: string;
      sending: string;
      note: string;
      subject: string;
      successTitle: string;
      successText: string;
      again: string;
      error: string;
      bodyLabels: { name: string; email: string; type: string; budget: string; timeline: string };
    };
  };
  footer: {
    rights: string;
    built: string;
    top: string;
  };
}
