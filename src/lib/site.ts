export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://spyle23.github.io").replace(/\/$/, "");
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a public asset path with the deployment base path. */
export const asset = (path: string) => `${BASE_PATH}${path}`;

/** Absolute URL for canonical / Open Graph / sitemap entries. */
export const absoluteUrl = (path = "/") => `${SITE_URL}${BASE_PATH}${path}`;

/** Web3Forms access key: public by design, it only lets the contact form email the address it was created for */
export const WEB3FORMS_KEY = "93b1991e-9d03-4aaa-8783-607cfe493839";

export const PROFILE = {
  name: "Andriatiana Jean-Marie",
  email: "andriatianajeanmarie@gmail.com",
  linkedin: "https://www.linkedin.com/in/jean-marie-andriatiana-b1480221a",
  github: "https://github.com/spyle23",
  photo: "/img/profile.webp",
  cv: { fr: "/cv/CV-Andriatiana-Jean-Marie-FR.pdf", en: "/cv/Resume-Andriatiana-Jean-Marie-EN.pdf" },
} as const;
